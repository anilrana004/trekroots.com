"use client";

import Link from "next/link";
import { ArrowRight, Clock, Mountain } from "lucide-react";
import { motion } from "motion/react";
import { CloudinaryImage } from "@/components/CloudinaryImage";
import { getTrekCoverImage, treksForMonth } from "@/data";
import { tripPrice } from "@/lib/price";

const MONTH_NAMES = [
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

/**
 * Seasonal picks for the month you are actually browsing in, so the homepage
 * leads with treks that are open rather than a fixed list.
 */
export function SeasonalTreks() {
  const now = new Date();
  const month = now.getMonth() + 1;
  const next = month === 12 ? 1 : month + 1;
  const picks = treksForMonth(month, 5);

  if (picks.length === 0) return null;

  return (
    <section data-ocid="seasonal.section" className="lux-section-muted">
      <div className="lux-container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10 md:mb-12"
        >
          <div>
            <p className="lux-label mb-4">In season now</p>
            <h2 className="lux-heading-lg text-[#1A1A1A] mb-3">
              Top treks for {MONTH_NAMES[month - 1]}–{MONTH_NAMES[next - 1]}
            </h2>
            <p className="lux-body text-base max-w-lg">
              Trails that are open, safe and at their best right now — picked by
              our trek leaders.
            </p>
          </div>
          <Link
            href="/treks"
            data-ocid="seasonal.view_all"
            className="hidden lg:inline-flex items-center gap-1.5 text-sm font-body font-semibold text-[#1A1A1A] hover:gap-2.5 transition-all"
          >
            View all treks <ArrowRight size={15} />
          </Link>
        </motion.div>

        {/* Swipeable until there is room for all five across, to avoid an orphan row */}
        <div className="flex gap-4 overflow-x-auto hide-scrollbar snap-x snap-mandatory lg:grid lg:grid-cols-5 lg:overflow-visible">
          {picks.map((trek, i) => {
            const price = tripPrice(trek.priceRange);
            return (
              <motion.div
                key={trek.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="min-w-[78%] sm:min-w-[45%] md:min-w-[31%] lg:min-w-0 snap-start"
              >
                <Link
                  href={`/treks/${trek.slug}`}
                  data-ocid={`seasonal.item.${i + 1}`}
                  className="group block h-full border border-border bg-white overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <CloudinaryImage
                      src={getTrekCoverImage(trek.slug)}
                      alt={trek.name}
                      width={480}
                      height={600}
                      sizes="(max-width: 767px) 78vw, (max-width: 1023px) 33vw, 20vw"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      transform={{
                        width: 480,
                        height: 600,
                        crop: "fill",
                        gravity: "auto",
                        quality: "auto:good",
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                    <span className="absolute top-3 left-3 px-2 py-1 bg-[#FFC107] text-black text-[10px] font-body font-bold uppercase tracking-wider">
                      #{i + 1}
                    </span>
                    <div className="absolute bottom-3 left-3 right-3">
                      <h3 className="font-display text-base text-white leading-snug mb-1">
                        {trek.name}
                      </h3>
                      <p className="text-[11px] text-white/75 font-body">
                        {trek.region}, {trek.state}
                      </p>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-3 text-[11px] font-body text-muted-foreground mb-3">
                      <span className="inline-flex items-center gap-1">
                        <Clock size={11} />
                        {Number(trek.durationDays)}D
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Mountain size={11} />
                        {Number(trek.maxAltitudeFt).toLocaleString("en-IN")} ft
                      </span>
                      <span>{trek.difficulty}</span>
                    </div>
                    <div className="flex items-baseline gap-1.5">
                      <span
                        className="text-base font-bold font-body"
                        style={{ color: "#FFC107" }}
                      >
                        {price.label}
                      </span>
                      {price.original && (
                        <span className="text-[11px] font-body text-muted-foreground line-through">
                          {price.original}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <Link
          href="/treks"
          className="lg:hidden mt-6 inline-flex items-center gap-1.5 text-sm font-body font-semibold text-[#1A1A1A]"
        >
          View all treks <ArrowRight size={15} />
        </Link>
      </div>
    </section>
  );
}
