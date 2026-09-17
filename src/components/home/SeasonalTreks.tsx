"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { CloudinaryImage } from "@/components/CloudinaryImage";
import { SectionHead } from "@/components/home/SectionHead";
import { getTrekCoverImage, hasTrekGallery, treksForMonth } from "@/data";
import { formatINR } from "@/lib/price";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/** "September-October" — the window the picks below are valid for. */
function seasonWindow(): string {
  const now = new Date().getMonth();
  return `${MONTHS[now]}-${MONTHS[(now + 1) % 12]}`;
}

export function SeasonalTreks() {
  const month = new Date().getMonth() + 1;
  // Treks we have shot ourselves lead the row; the rest only carry a stock
  // fallback image, which reads badly next to real trail photography.
  const picks = treksForMonth(month, 12)
    .sort(
      (a, b) =>
        Number(hasTrekGallery(b.slug)) - Number(hasTrekGallery(a.slug)),
    )
    .slice(0, 5);
  const railRef = useRef<HTMLDivElement>(null);
  const [saved, setSaved] = useState<Record<string, boolean>>({});

  const scrollBy = useCallback((direction: 1 | -1) => {
    const rail = railRef.current;
    if (!rail) return;
    rail.scrollBy({
      left: direction * (rail.clientWidth * 0.8),
      behavior: "smooth",
    });
  }, []);

  if (picks.length === 0) return null;

  return (
    <section data-ocid="seasonal.section" className="py-12 md:py-16 bg-white">
      <div className="lux-container">
        <SectionHead
          title={`Top ${picks.length} Treks for ${seasonWindow()}`}
          aside={
            <>
              These are the trails at their best right now — the season our trek
              leaders would pick themselves. Book early; the batches on these
              dates fill first.
            </>
          }
          className="mb-8 md:mb-10"
        />

        <div className="relative">
          <button
            type="button"
            aria-label="Previous treks"
            onClick={() => scrollBy(-1)}
            className="no-retro hidden lg:flex absolute -left-4 top-[38%] z-10 w-8 h-8 rounded-full bg-white border border-[#E8E8E8] items-center justify-center text-[#1A1A1A] hover:border-[#FFC107] transition-colors"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            aria-label="Next treks"
            onClick={() => scrollBy(1)}
            className="no-retro hidden lg:flex absolute -right-4 top-[38%] z-10 w-8 h-8 rounded-full bg-white border border-[#E8E8E8] items-center justify-center text-[#1A1A1A] hover:border-[#FFC107] transition-colors"
          >
            <ChevronRight size={16} />
          </button>

          <div
            ref={railRef}
            className="flex gap-4 overflow-x-auto hide-scrollbar snap-x snap-mandatory pb-1"
          >
            {picks.map((trek, i) => {
              const isSaved = saved[trek.slug] ?? false;
              return (
                <article
                  key={trek.slug}
                  data-ocid={`seasonal.item.${i + 1}`}
                  className="min-w-[80%] sm:min-w-[46%] lg:min-w-0 lg:w-[calc((100%-3rem)/4)] shrink-0 snap-start bg-white border border-[#E8E8E8] flex flex-col"
                >
                  <div className="relative">
                    <Link href={`/treks/${trek.slug}`} tabIndex={-1}>
                      <CloudinaryImage
                        src={getTrekCoverImage(trek.slug, trek.imageUrl)}
                        alt={trek.name}
                        width={420}
                        height={280}
                        sizes="(max-width: 639px) 80vw, (max-width: 1023px) 46vw, 24vw"
                        className="w-full h-auto object-cover"
                        transform={{
                          width: 420,
                          height: 280,
                          crop: "fill",
                          gravity: "auto",
                          quality: "auto:good",
                        }}
                      />
                    </Link>
                    <button
                      type="button"
                      aria-label={
                        isSaved
                          ? `Remove ${trek.name} from saved treks`
                          : `Save ${trek.name}`
                      }
                      aria-pressed={isSaved}
                      onClick={() =>
                        setSaved((prev) => ({
                          ...prev,
                          [trek.slug]: !prev[trek.slug],
                        }))
                      }
                      className="no-retro absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/95 flex items-center justify-center text-[#1A1A1A] hover:text-[#FFC107] transition-colors"
                    >
                      <Heart
                        size={13}
                        className={isSaved ? "fill-[#FFC107] text-[#FFC107]" : ""}
                      />
                    </button>
                  </div>

                  <div className="p-3.5 flex flex-col flex-1">
                    <p
                      className="font-body text-[10px] font-bold uppercase tracking-[0.12em] mb-1.5"
                      style={{ color: "#5A8A6A" }}
                    >
                      {trek.difficulty} · {trek.durationDays}{" "}
                      {trek.durationDays === 1 ? "Day" : "Days"}
                    </p>
                    <h3 className="font-body text-sm font-bold text-[#1A1A1A] leading-snug mb-1">
                      <Link href={`/treks/${trek.slug}`}>{trek.name}</Link>
                    </h3>
                    <p className="lux-body text-[11.5px] leading-snug mb-3 line-clamp-2">
                      {trek.region} · {trek.maxAltitudeFt.toLocaleString("en-IN")} ft
                      · from {formatINR(trek.priceRange.minINR)}
                    </p>

                    <div className="mt-auto flex items-center gap-2">
                      <Link
                        href={`/treks/${trek.slug}`}
                        data-ocid={`seasonal.item.${i + 1}.details`}
                        className="no-retro px-2.5 py-1.5 font-body text-[10.5px] font-bold text-white"
                        style={{ backgroundColor: "#2E6B43" }}
                      >
                        View Trek
                      </Link>
                      <Link
                        href={`/treks/${trek.slug}#dates`}
                        data-ocid={`seasonal.item.${i + 1}.dates`}
                        className="no-retro px-2.5 py-1.5 font-body text-[10.5px] font-bold text-[#1A1A1A]"
                        style={{ backgroundColor: "#FFC107" }}
                      >
                        View Dates
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <Link
            href="/treks"
            data-ocid="seasonal.view_all"
            className="no-retro inline-flex items-center px-5 py-2 font-body text-xs font-bold text-[#1A1A1A]"
            style={{ backgroundColor: "#FFC107" }}
          >
            View All Treks
          </Link>
        </div>
      </div>
    </section>
  );
}
