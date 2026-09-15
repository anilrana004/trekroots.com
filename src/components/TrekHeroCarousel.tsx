"use client";

import { CloudinaryImage } from "@/components/CloudinaryImage";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const INTERVAL_MS = 5500;

type TrekHeroCarouselProps = {
  images: string[];
  alt: string;
  className?: string;
  onIndexChange?: (index: number) => void;
};

/** Only keep current + neighbors in the DOM so the browser isn't downloading 6× hero assets. */
function shouldMountSlide(i: number, index: number, total: number): boolean {
  if (total <= 2) return true;
  const prev = (index - 1 + total) % total;
  const next = (index + 1) % total;
  return i === index || i === prev || i === next;
}

export function TrekHeroCarousel({
  images,
  alt,
  className = "",
  onIndexChange,
}: TrekHeroCarouselProps) {
  const slides = useMemo(() => images.filter(Boolean), [images]);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reduceMotion = useRef(false);

  useEffect(() => {
    setHydrated(true);
    reduceMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
  }, []);

  const goTo = useCallback(
    (next: number) => {
      if (!slides.length) return;
      const i = ((next % slides.length) + slides.length) % slides.length;
      setIndex(i);
      onIndexChange?.(i);
    },
    [slides.length, onIndexChange],
  );

  const goNext = useCallback(() => goTo(index + 1), [goTo, index]);
  const goPrev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    if (slides.length < 2 || paused || reduceMotion.current) return;
    timerRef.current = setTimeout(goNext, INTERVAL_MS);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [goNext, paused, slides.length, index]);

  if (!slides.length) {
    return (
      <div
        className={`w-full h-full flex items-center justify-center bg-muted ${className}`}
      >
        <span className="text-8xl">🏔️</span>
      </div>
    );
  }

  return (
    <div
      className={`relative w-full h-full ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      role="region"
      aria-roledescription="carousel"
      aria-label={`${alt} photo gallery`}
    >
      {slides.map((src, i) => {
        if (!shouldMountSlide(i, index, slides.length)) return null;
        const active = i === index;
        return (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-700 ease-out ${
              active ? "opacity-100 z-[1]" : "opacity-0 z-0"
            }`}
            aria-hidden={!active}
          >
            <CloudinaryImage
              src={src}
              alt={`${alt} — photo ${i + 1}`}
              width={1920}
              height={1080}
              priority={i === 0 && (!hydrated || index === 0)}
              sizes="100vw"
              className="w-full h-full object-cover object-center"
              transform={{
                width: 1600,
                height: 900,
                crop: "fill",
                gravity: "auto",
                quality: "auto",
                format: "auto",
                dpr: "auto",
              }}
              lazy={!(i === index || i === (index + 1) % slides.length)}
            />
          </div>
        );
      })}

      {slides.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous photo"
            onClick={goPrev}
            className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-[5] inline-flex h-11 w-11 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm border border-white/20 hover:bg-black/70 transition-colors"
          >
            <ChevronLeft size={22} strokeWidth={1.75} />
          </button>
          <button
            type="button"
            aria-label="Next photo"
            onClick={goNext}
            className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-[5] inline-flex h-11 w-11 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm border border-white/20 hover:bg-black/70 transition-colors"
          >
            <ChevronRight size={22} strokeWidth={1.75} />
          </button>

          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-[5] flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-black/35 backdrop-blur-sm border border-white/15">
            {slides.map((src, i) => (
              <button
                key={`dot-${src}`}
                type="button"
                aria-label={`Show photo ${i + 1}`}
                aria-current={i === index}
                onClick={() => goTo(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === index
                    ? "w-5 bg-[#FFC107]"
                    : "w-1.5 bg-white/55 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
