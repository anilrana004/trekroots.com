"use client";

import Link from "next/link";
import { Star } from "lucide-react";
import { reviews } from "@/data/reviews";

type DetailReviewsProps = {
  tripName: string;
  ocidPrefix: string;
};

export function DetailReviews({ tripName, ocidPrefix }: DetailReviewsProps) {
  return (
    <section
      id="section-reviews"
      data-ocid={`${ocidPrefix}.reviews`}
      className="scroll-mt-36"
    >
      <h2 className="font-serif italic text-2xl md:text-[28px] text-[#1A1A1A] mb-6">
        Trekkers&apos; Experiences
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {reviews.map((review, i) => (
          <article
            key={review.id}
            data-ocid={`${ocidPrefix}.reviews.item.${i + 1}`}
          >
            <div className="flex items-center gap-0.5 mb-2.5">
              {Array.from({ length: review.rating }).map((_, si) => (
                <Star
                  key={`${review.id}-s${si}`}
                  size={11}
                  className="fill-[#FFC107] text-[#FFC107]"
                />
              ))}
            </div>
            <h3 className="font-body text-sm font-bold text-[#1A1A1A] mb-2">
              {review.trip}
            </h3>
            <p className="font-body text-[13px] text-[#555555] leading-relaxed mb-3">
              &ldquo;{review.quote}&rdquo;
            </p>
            <p className="font-body text-[11.5px] font-semibold text-[#1A1A1A]">
              {review.name}
            </p>
            <p className="font-body text-[11px] text-muted-foreground">
              {review.location}
            </p>
          </article>
        ))}
      </div>
      <p className="mt-6 font-body text-[12px] text-muted-foreground">
        Planning {tripName}?{" "}
        <Link
          href="/contact"
          className="font-semibold text-[#1A73E8] hover:underline"
        >
          Talk to a trek expert
        </Link>
        .
      </p>
    </section>
  );
}
