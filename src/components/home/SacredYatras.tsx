"use client";

import Link from "next/link";
import { CloudinaryImage } from "@/components/CloudinaryImage";
import { SectionHead } from "@/components/home/SectionHead";
import { getYatraCoverImage, yatras } from "@/data";
import { formatINR } from "@/lib/price";

export function SacredYatras() {
  const picks = yatras.slice(0, 4);
  if (picks.length === 0) return null;

  return (
    <section data-ocid="yatras.section" className="py-12 md:py-16 bg-white">
      <div className="lux-container">
        <SectionHead
          title="Sacred Yatras For This Season"
          aside={
            <>
              Ancient temples, holy rivers and the high Himalayan abodes —
              guided pilgrimages with permits, stays and helicopter transfers
              arranged end to end.
            </>
          }
          className="mb-8 md:mb-10"
        />

        <div className="flex gap-4 overflow-x-auto hide-scrollbar snap-x snap-mandatory pb-1">
          {picks.map((yatra, i) => (
            <article
              key={yatra.slug}
              data-ocid={`yatras.item.${i + 1}`}
              className="min-w-[80%] sm:min-w-[46%] lg:min-w-0 lg:w-[calc((100%-3rem)/4)] shrink-0 snap-start bg-white border border-[#E8E8E8] flex flex-col"
            >
              <Link href={`/yatra/${yatra.slug}`} tabIndex={-1}>
                <CloudinaryImage
                  src={getYatraCoverImage(yatra.slug, yatra.imageUrl)}
                  alt={`${yatra.name} sacred yatra`}
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

              <div className="p-3.5 flex flex-col flex-1">
                <p
                  className="font-body text-[10px] font-bold uppercase tracking-[0.12em] mb-1.5"
                  style={{ color: "#C9973A" }}
                >
                  {yatra.duration} · {yatra.season}
                </p>
                <h3 className="font-body text-sm font-bold text-[#1A1A1A] leading-snug mb-1">
                  <Link href={`/yatra/${yatra.slug}`}>{yatra.name}</Link>
                </h3>
                <p className="lux-body text-[11.5px] leading-snug mb-3">
                  {yatra.temples.length}{" "}
                  {yatra.temples.length === 1 ? "shrine" : "shrines"} · from{" "}
                  {formatINR(yatra.priceRange.minINR)}
                </p>

                <div className="mt-auto flex items-center gap-2">
                  <Link
                    href={`/yatra/${yatra.slug}`}
                    data-ocid={`yatras.item.${i + 1}.details`}
                    className="no-retro px-2.5 py-1.5 font-body text-[10.5px] font-bold text-white"
                    style={{ backgroundColor: "#2E6B43" }}
                  >
                    View Yatra
                  </Link>
                  <Link
                    href={`/yatra/${yatra.slug}#dates`}
                    data-ocid={`yatras.item.${i + 1}.dates`}
                    className="no-retro px-2.5 py-1.5 font-body text-[10.5px] font-bold text-[#1A1A1A]"
                    style={{ backgroundColor: "#FFC107" }}
                  >
                    View Dates
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-6 flex justify-center">
          <Link
            href="/yatra"
            data-ocid="yatras.view_all"
            className="no-retro inline-flex items-center px-5 py-2 font-body text-xs font-bold text-[#1A1A1A]"
            style={{ backgroundColor: "#FFC107" }}
          >
            View All Yatras
          </Link>
        </div>
      </div>
    </section>
  );
}
