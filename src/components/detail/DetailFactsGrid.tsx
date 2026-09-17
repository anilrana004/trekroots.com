"use client";

import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import type { TrekFact } from "@/data";

type DetailFactsGridProps = {
  facts: TrekFact[];
  icons: Record<string, LucideIcon>;
  ocid?: string;
};

/**
 * 12-cell Indiahikes facts strip: icon left, bold label + value right.
 */
export function DetailFactsGrid({
  facts,
  icons,
  ocid = "detail.facts",
}: DetailFactsGridProps) {
  return (
    <section
      data-ocid={ocid}
      className="border-b"
      style={{ backgroundColor: "#F7F7F7", borderColor: "#E8E8E8" }}
    >
      <div className="lux-container py-6 md:py-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-5 md:gap-y-6">
          {facts.map((fact) => {
            const Icon = icons[fact.id];
            return (
              <div key={fact.id} className="flex items-start gap-3 min-w-0">
                <span
                  className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-[#1A1A1A]"
                  style={{ backgroundColor: "#FFE082" }}
                  aria-hidden
                >
                  {Icon ? <Icon size={16} strokeWidth={2} /> : null}
                </span>
                <div className="min-w-0">
                  <p className="font-body text-[10px] font-bold uppercase tracking-[0.08em] text-[#1A1A1A] mb-0.5">
                    {fact.label}
                  </p>
                  {fact.href ? (
                    <a
                      href={fact.href}
                      className="font-body text-[12.5px] font-semibold text-[#1A73E8] leading-snug hover:underline break-words"
                    >
                      {fact.value}
                    </a>
                  ) : (
                    <p className="font-body text-[12.5px] font-semibold text-[#1A1A1A] leading-snug break-words">
                      {fact.value}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function DetailSectionHeading({
  title,
  aside,
}: {
  title: string;
  aside?: ReactNode;
}) {
  return (
    <div className="flex items-start gap-4 mb-5">
      <h2 className="font-serif italic text-2xl md:text-[28px] text-[#1A1A1A] shrink-0 leading-none pt-0.5">
        {title}
      </h2>
      {aside ? (
        <>
          <span
            className="hidden sm:block w-px self-stretch shrink-0 mt-1"
            style={{ backgroundColor: "#D0D0D0" }}
            aria-hidden
          />
          <div className="min-w-0 flex-1">{aside}</div>
        </>
      ) : null}
    </div>
  );
}
