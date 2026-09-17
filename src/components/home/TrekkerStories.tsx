"use client";

import Link from "next/link";
import { Star } from "lucide-react";
import { motion } from "motion/react";
import { SectionHead } from "@/components/home/SectionHead";
import { reviews } from "@/data/reviews";

function initials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");
}

export function TrekkerStories() {
  return (
    <section data-ocid="stories.section" className="py-12 md:py-16 bg-white">
      <div className="lux-container">
        <SectionHead
          title="Read Why Trekkers Love Our Transformational Treks"
          className="mb-8 md:mb-10"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
          {reviews.map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              data-ocid={`stories.item.${i + 1}`}
            >
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="w-9 h-9 rounded-full flex items-center justify-center font-body text-[11px] font-bold text-[#1A1A1A] shrink-0"
                  style={{ backgroundColor: "#FFE082" }}
                  aria-hidden
                >
                  {initials(review.name)}
                </span>
                <div className="min-w-0">
                  <p className="font-body text-xs font-semibold text-[#1A1A1A] truncate">
                    {review.name}
                  </p>
                  <p className="font-body text-[11px] text-muted-foreground truncate">
                    {review.location}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-0.5 mb-3">
                {Array.from({ length: review.rating }).map((_, si) => (
                  <Star
                    key={`star-${review.id}-${si}`}
                    size={11}
                    className="fill-[#FFC107] text-[#FFC107]"
                  />
                ))}
              </div>

              <h3 className="font-body text-sm font-bold text-[#1A1A1A] mb-2 leading-snug">
                {review.trip}
              </h3>
              <p className="lux-body text-[13px] leading-relaxed">
                {review.quote}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/contact"
            data-ocid="stories.all"
            className="no-retro inline-flex items-center px-5 py-2 font-body text-xs font-bold text-[#1A1A1A]"
            style={{ backgroundColor: "#FFC107" }}
          >
            Talk To An Expert
          </Link>
        </div>
      </div>
    </section>
  );
}
