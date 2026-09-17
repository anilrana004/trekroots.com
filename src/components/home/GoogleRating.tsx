"use client";

import { Star } from "lucide-react";
import { SectionHead } from "@/components/home/SectionHead";
import { REVIEW_SUMMARY } from "@/data/reviews";

const GOOGLE_REVIEWS_URL =
  "https://www.google.com/search?q=TrekRoots+Uttarakhand+reviews";

export function GoogleRating() {
  return (
    <section data-ocid="google.section" className="py-12 md:py-16 bg-white">
      <div className="lux-container">
        <SectionHead
          title={`Read why ${REVIEW_SUMMARY.trekkers} trekkers rate us with ${REVIEW_SUMMARY.rating} stars on Google`}
          className="mb-8"
        />

        <div
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 border p-5 md:p-6"
          style={{ borderColor: "#E8E8E8" }}
        >
          <div className="flex items-center gap-5">
            <div>
              <p className="font-body text-sm font-semibold text-[#1A1A1A]">
                Google Reviews
              </p>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="font-display text-2xl leading-none text-[#1A1A1A]">
                  {REVIEW_SUMMARY.rating}
                </span>
                <span className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      size={13}
                      className="fill-[#FFC107] text-[#FFC107]"
                    />
                  ))}
                </span>
              </div>
              <p className="font-body text-xs text-muted-foreground mt-1.5">
                {REVIEW_SUMMARY.count} verified reviews
              </p>
            </div>
          </div>

          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="google.read_reviews"
            className="no-retro inline-flex items-center justify-center px-5 py-2.5 font-body text-xs font-bold text-white shrink-0"
            style={{ backgroundColor: "#1A73E8" }}
          >
            Read Our Reviews On Google
          </a>
        </div>
      </div>
    </section>
  );
}
