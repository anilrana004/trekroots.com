"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";
import { SectionHead } from "@/components/home/SectionHead";
import { reviews, type Review } from "@/data/reviews";

const PER_PAGE = 4;
const PREVIEW_CHARS = 160;

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function pageWindow(current: number, total: number): Array<number | "…"> {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  const pages: Array<number | "…"> = [1];
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  if (start > 2) pages.push("…");
  for (let p = start; p <= end; p++) pages.push(p);
  if (end < total - 1) pages.push("…");
  pages.push(total);
  return pages;
}

function ReviewCard({
  review,
  index,
}: {
  review: Review;
  index: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const needsMore = review.quote.length > PREVIEW_CHARS;
  const body =
    expanded || !needsMore
      ? review.quote
      : `${review.quote.slice(0, PREVIEW_CHARS).trimEnd()}…`;

  return (
    <article
      data-ocid={`stories.item.${index + 1}`}
      className="flex flex-col min-w-0"
    >
      <div className="flex items-start gap-3 pb-3 mb-3 border-b border-[#E8E8E8]">
        <span
          className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-body text-[12px] font-bold text-[#1A1A1A]"
          style={{ backgroundColor: "#FFE082" }}
          aria-hidden
        >
          {initials(review.name)}
        </span>
        <div className="min-w-0">
          <p className="font-body text-[12px] md:text-[13px] font-bold uppercase tracking-[0.04em] text-[#1A1A1A] leading-snug">
            {review.name}
          </p>
          <p className="font-body text-[11.5px] text-[#555555] leading-snug mt-0.5">
            {review.role}
          </p>
          <p className="font-body text-[11.5px] text-[#555555] leading-snug">
            {review.location}
          </p>
        </div>
      </div>

      <h3 className="font-body text-[14px] font-bold text-[#1A1A1A] leading-snug mb-2">
        {review.headline}
      </h3>

      <p className="font-body text-[13px] text-[#1A1A1A] leading-relaxed">
        {body}
        {needsMore ? (
          <>
            {" "}
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              data-ocid={`stories.read_more.${review.id}`}
              className="no-retro inline font-body text-[13px] font-semibold text-[#1A73E8] underline underline-offset-2 hover:text-[#1558B0]"
            >
              {expanded ? "Show less" : "Read More"}
            </button>
          </>
        ) : null}
      </p>
    </article>
  );
}

export function TrekkerStories() {
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(reviews.length / PER_PAGE));

  const pageItems = useMemo(() => {
    const start = (page - 1) * PER_PAGE;
    return reviews.slice(start, start + PER_PAGE);
  }, [page]);

  const pages = pageWindow(page, totalPages);

  const go = (next: number) => {
    setPage(Math.min(totalPages, Math.max(1, next)));
  };

  return (
    <section data-ocid="stories.section" className="py-12 md:py-16 bg-white">
      <div className="lux-container">
        <SectionHead
          title="Read Why Trekkers Love Our Transformative Treks"
          className="mb-8 md:mb-10"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
          {pageItems.map((review, i) => (
            <ReviewCard
              key={review.id}
              review={review}
              index={(page - 1) * PER_PAGE + i}
            />
          ))}
        </div>

        {totalPages > 1 ? (
          <nav
            className="mt-10 md:mt-12 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2"
            aria-label="Trekker stories pages"
            data-ocid="stories.pagination"
          >
            <button
              type="button"
              onClick={() => go(page - 1)}
              disabled={page <= 1}
              data-ocid="stories.prev"
              className="no-retro inline-flex items-center gap-1 px-2 py-1.5 font-body text-[13px] text-[#1A1A1A] disabled:opacity-35 disabled:cursor-not-allowed hover:text-[#555555]"
            >
              <ChevronLeft size={14} strokeWidth={2} aria-hidden />
              Previous
            </button>

            {pages.map((p, i) =>
              p === "…" ? (
                <span
                  key={`ellipsis-${i}`}
                  className="px-1.5 font-body text-[13px] text-[#555555]"
                  aria-hidden
                >
                  …
                </span>
              ) : (
                <button
                  key={p}
                  type="button"
                  onClick={() => go(p)}
                  data-ocid={`stories.page.${p}`}
                  aria-label={`Page ${p}`}
                  aria-current={p === page ? "page" : undefined}
                  className={`no-retro min-w-8 h-8 px-2 font-body text-[13px] font-semibold transition-colors ${
                    p === page
                      ? "bg-[#FFC107] text-[#1A1A1A]"
                      : "text-[#1A1A1A] hover:bg-[#F5F5F5]"
                  }`}
                >
                  {p}
                </button>
              ),
            )}

            <button
              type="button"
              onClick={() => go(page + 1)}
              disabled={page >= totalPages}
              data-ocid="stories.next"
              className="no-retro inline-flex items-center gap-1 px-2 py-1.5 font-body text-[13px] text-[#1A1A1A] disabled:opacity-35 disabled:cursor-not-allowed hover:text-[#555555]"
            >
              Next
              <ChevronRight size={14} strokeWidth={2} aria-hidden />
            </button>
          </nav>
        ) : null}
      </div>
    </section>
  );
}
