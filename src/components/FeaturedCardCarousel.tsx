"use client";

import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  MapPin,
  Mountain,
} from "lucide-react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { CloudinaryImage } from "@/components/CloudinaryImage";

const AUTO_MS = 3800;
const CARD_W = "min(78vw, 300px)";

export type FeaturedCarouselItem = {
  id: number | string;
  slug: string;
  name: string;
  region: string;
  duration: string;
  altitude?: string;
  temples?: string;
  price: string;
  image: string;
  /** Optional multi-image set — card crossfades through these when present */
  images?: string[];
  season: string;
  badge: string;
  badgeTone: "trek" | "yatra";
  difficulty?: string;
  difficultyColor?: string;
  type?: string;
  typeColor?: string;
};

type ToneMap = Record<string, { text: string; bg: string }>;

const BADGE_STYLES: ToneMap = {
  "#5A8A6A": { text: "text-[#5A8A6A]", bg: "bg-[#5A8A6A]/20" },
  "#3D7A8A": { text: "text-[#3D7A8A]", bg: "bg-[#3D7A8A]/20" },
  "#8B2635": { text: "text-[#8B2635]", bg: "bg-[#8B2635]/20" },
  "#C9973A": { text: "text-[#C9973A]", bg: "bg-[#C9973A]/20" },
  "#FFC107": { text: "text-[#FFC107]", bg: "bg-[#FFC107]/20" },
};

function tone(hex?: string) {
  return BADGE_STYLES[hex ?? ""] ?? {
    text: "text-muted-foreground",
    bg: "bg-muted",
  };
}

function FeaturedSlide({
  item,
  index,
  active,
  jumble,
}: {
  item: FeaturedCarouselItem;
  index: number;
  active: boolean;
  jumble: boolean;
}) {
  const chip = tone(item.difficultyColor ?? item.typeColor);
  const meta = item.altitude ?? item.temples ?? "";
  const gallery =
    item.images && item.images.length > 0 ? item.images : [item.image];
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    if (!active || gallery.length < 2) return;
    const id = setInterval(
      () => setFrame((f) => (f + 1) % gallery.length),
      3200,
    );
    return () => clearInterval(id);
  }, [active, gallery.length]);

  useEffect(() => {
    if (!active) setFrame(0);
  }, [active]);

  return (
    <div
      className="featured-slide embla__slide shrink-0 px-2.5"
      style={{ flex: `0 0 ${CARD_W}` }}
      data-active={active ? "true" : "false"}
      data-jumble={jumble ? "true" : "false"}
    >
      <Link
        href={item.slug}
        data-ocid={`${item.badgeTone}s.item.${index + 1}`}
        className="lux-editorial-card featured-card block shadow-card h-full"
        tabIndex={active ? 0 : -1}
        aria-current={active ? "true" : undefined}
      >
        <div className="relative h-[300px] md:h-[320px] overflow-hidden">
          {gallery.map((src, i) => (
            <div
              key={src}
              className={`absolute inset-0 transition-opacity duration-700 ${
                i === frame ? "opacity-100" : "opacity-0"
              }`}
            >
              <CloudinaryImage
                src={src}
                alt={`${item.name} — ${i + 1}`}
                width={600}
                height={320}
                className="w-full h-full object-cover"
                transform={{
                  width: 600,
                  height: 320,
                  crop: "fill",
                  gravity: "auto",
                }}
              />
            </div>
          ))}
          <div className="lux-editorial-overlay" />
          <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
            <span
              className={`lux-label text-[9px] tracking-[0.18em] px-2.5 py-1 ${
                item.badgeTone === "trek"
                  ? "bg-[#FFE082]/90 text-[#1A1A1A]"
                  : "bg-[#FFC107] text-white"
              }`}
            >
              {item.badge}
            </span>
            {(item.difficulty || item.type) && (
              <span
                className={`text-[9px] font-body font-medium uppercase tracking-wider px-2 py-0.5 ${chip.bg} ${chip.text}`}
              >
                {item.difficulty ?? item.type}
              </span>
            )}
          </div>
          {gallery.length > 1 && (
            <div className="absolute top-4 right-4 z-10 flex gap-1">
              {gallery.map((src, i) => (
                <span
                  key={`pip-${src}`}
                  className={`h-1 rounded-full transition-all ${
                    i === frame ? "w-3 bg-[#FFC107]" : "w-1 bg-white/50"
                  }`}
                />
              ))}
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
            <h4 className="font-display text-lg text-white leading-snug mb-2">
              {item.name}
            </h4>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-3 min-w-0">
                <span className="flex items-center gap-1 text-[11px] font-body text-white/70">
                  <Clock size={10} /> {item.duration}
                </span>
                {meta ? (
                  <span className="flex items-center gap-1 text-[11px] font-body text-white/70 truncate">
                    <Mountain size={10} /> {meta}
                  </span>
                ) : null}
              </div>
              <span className="text-sm font-body font-semibold text-[#FFC107] shrink-0">
                {item.price}
              </span>
            </div>
          </div>
        </div>
        <div className="px-5 py-4 flex items-center justify-between bg-white border-t border-border">
          <div className="flex items-center gap-2 min-w-0">
            <MapPin size={12} className="text-[#FFC107] shrink-0" />
            <span className="font-body text-xs text-muted-foreground truncate">
              {item.region}
            </span>
            <span className="font-body text-[10px] px-2 py-0.5 bg-canvas text-muted-foreground uppercase tracking-wide shrink-0">
              {item.season}
            </span>
          </div>
          <span className="lux-link text-[10px] shrink-0">
            Explore <ArrowRight size={11} />
          </span>
        </div>
      </Link>
    </div>
  );
}

type Props = {
  items: FeaturedCarouselItem[];
  ocidPrefix: string;
  /** Match parent section background for edge fades */
  surface?: "muted" | "white";
};

/**
 * Center-focus auto carousel: each card snaps to the middle with a
 * brief jumble (scale + tilt) so the active trek reads clearly.
 */
export function FeaturedCardCarousel({
  items,
  ocidPrefix,
  surface = "muted",
}: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    skipSnaps: false,
    containScroll: false,
    duration: 28,
  });
  const [selected, setSelected] = useState(0);
  const [jumbleIndex, setJumbleIndex] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(true);
  const jumbleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    const next = emblaApi.selectedScrollSnap();
    setJumbleIndex(next);
    setSelected(next);
    if (jumbleTimer.current) clearTimeout(jumbleTimer.current);
    jumbleTimer.current = setTimeout(() => setJumbleIndex(null), 520);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!emblaApi || paused || !inView || items.length < 2) return;
    const id = setInterval(() => {
      emblaApi.scrollNext();
    }, AUTO_MS);
    return () => clearInterval(id);
  }, [emblaApi, paused, inView, items.length, selected]);

  useEffect(() => {
    return () => {
      if (jumbleTimer.current) clearTimeout(jumbleTimer.current);
    };
  }, []);

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  return (
    <div
      ref={rootRef}
      className="featured-carousel relative"
      data-ocid={`${ocidPrefix}.carousel`}
      data-surface={surface}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
          setPaused(false);
        }
      }}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
    >
      <div className="overflow-hidden py-4 md:py-6" ref={emblaRef}>
        <div className="flex touch-pan-y items-stretch">
          {items.map((item, i) => (
            <FeaturedSlide
              key={item.id}
              item={item}
              index={i}
              active={i === selected}
              jumble={i === jumbleIndex}
            />
          ))}
        </div>
      </div>

      {/* Edge fades so side cards feel recessed */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-10 md:w-16 z-[1]"
        style={{
          background:
            "linear-gradient(90deg, var(--featured-fade) 0%, transparent 100%)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-10 md:w-16 z-[1]"
        style={{
          background:
            "linear-gradient(270deg, var(--featured-fade) 0%, transparent 100%)",
        }}
        aria-hidden
      />

      <div className="flex items-center justify-center gap-3 mt-2">
        <button
          type="button"
          aria-label="Previous trek"
          data-ocid={`${ocidPrefix}.carousel.prev`}
          onClick={scrollPrev}
          className="no-retro w-9 h-9 rounded-full border border-[#E8E8E8] bg-white flex items-center justify-center text-[#1A1A1A] hover:border-[#FFC107] transition-colors"
        >
          <ArrowLeft size={16} />
        </button>
        <div className="flex items-center gap-1.5" role="tablist" aria-label="Featured slides">
          {items.map((item, i) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={i === selected}
              aria-label={`Show ${item.name}`}
              data-ocid={`${ocidPrefix}.carousel.dot.${i + 1}`}
              onClick={() => emblaApi?.scrollTo(i)}
              className="no-retro h-1.5 rounded-full transition-all duration-300"
              style={{
                width: i === selected ? 22 : 6,
                backgroundColor: i === selected ? "#FFC107" : "#D4D4D4",
              }}
            />
          ))}
        </div>
        <button
          type="button"
          aria-label="Next trek"
          data-ocid={`${ocidPrefix}.carousel.next`}
          onClick={scrollNext}
          className="no-retro w-9 h-9 rounded-full border border-[#E8E8E8] bg-white flex items-center justify-center text-[#1A1A1A] hover:border-[#FFC107] transition-colors"
        >
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
