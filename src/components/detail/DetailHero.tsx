"use client";

import Link from "next/link";
import { HeroCarousel } from "@/components/HeroCarousel";

type DetailHeroProps = {
  images: string[];
  title: string;
  tagline?: string | null;
  /** Primary CTA — usually "View Trek Dates" / book */
  primaryHref: string;
  primaryLabel: string;
  primaryOcid: string;
  /** Secondary CTA — itinerary / watch */
  secondaryLabel?: string;
  secondaryOcid?: string;
  onSecondary?: () => void;
};

/**
 * Indiahikes-style detail hero: full-bleed carousel, centered ALL-CAPS title,
 * tagline, and yellow primary CTA.
 */
export function DetailHero({
  images,
  title,
  tagline,
  primaryHref,
  primaryLabel,
  primaryOcid,
  secondaryLabel,
  secondaryOcid,
  onSecondary,
}: DetailHeroProps) {
  return (
    <section
      data-ocid="detail.hero"
      className="relative h-[420px] md:h-[520px] overflow-hidden bg-muted"
    >
      <HeroCarousel images={images} alt={title} />
      <div className="absolute inset-0 z-[3] bg-gradient-to-t from-black/70 via-black/35 to-black/20 pointer-events-none" />

      <div className="absolute inset-0 z-[4] flex flex-col items-center justify-center px-4 pointer-events-none">
        <div className="w-full max-w-3xl mx-auto text-center">
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-bold text-white uppercase tracking-[0.04em] leading-tight mb-3">
            {title}
          </h1>
          {tagline ? (
            <p className="max-w-2xl mx-auto font-body text-sm md:text-base text-white/90 leading-relaxed mb-7">
              {tagline}
            </p>
          ) : (
            <div className="mb-7" />
          )}

          <div className="flex flex-wrap items-center justify-center gap-3 pointer-events-auto">
            <Link
              href={primaryHref}
              data-ocid={primaryOcid}
              className="no-retro inline-flex items-center px-6 py-2.5 font-body text-xs font-bold uppercase tracking-wide text-[#1A1A1A]"
              style={{ backgroundColor: "#FFC107" }}
            >
              {primaryLabel}
            </Link>
            {secondaryLabel && onSecondary ? (
              <button
                type="button"
                onClick={onSecondary}
                data-ocid={secondaryOcid}
                className="no-retro inline-flex items-center px-6 py-2.5 font-body text-xs font-bold uppercase tracking-wide text-white border border-white/50 bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
              >
                {secondaryLabel}
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
