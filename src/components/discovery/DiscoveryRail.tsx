"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useRef, type ReactNode } from "react";
import { DISCOVER } from "./tokens";

type DiscoveryRailProps = {
  title: string;
  aside?: ReactNode;
  children: ReactNode;
  ocid?: string;
};

export function DiscoveryRail({
  title,
  aside,
  children,
  ocid = "discovery.rail",
}: DiscoveryRailProps) {
  const railRef = useRef<HTMLDivElement>(null);

  const scrollBy = useCallback((direction: 1 | -1) => {
    const rail = railRef.current;
    if (!rail) return;
    rail.scrollBy({
      left: direction * Math.min(rail.clientWidth * 0.75, 360),
      behavior: "smooth",
    });
  }, []);

  return (
    <section data-ocid={ocid} className="py-8 md:py-10">
      <div className="mb-5 flex flex-col gap-2 md:mb-6 md:flex-row md:items-end md:justify-between md:gap-8">
        <h2
          className="font-display text-xl font-bold leading-tight md:text-2xl"
          style={{ color: DISCOVER.inkDeep }}
        >
          {title}
        </h2>
        {aside ? (
          <p className="max-w-xl font-body text-[13px] leading-relaxed text-[#5A6B62] md:text-right">
            {aside}
          </p>
        ) : null}
      </div>

      <div className="relative">
        <button
          type="button"
          aria-label="Previous"
          onClick={() => scrollBy(-1)}
          className="absolute -left-3 top-[38%] z-10 hidden h-9 w-9 items-center justify-center rounded-full border border-[#E8E8E8] bg-white text-[#1A1A1A] shadow-sm transition-colors hover:border-[#FFC107] lg:flex"
        >
          <ChevronLeft size={16} />
        </button>
        <button
          type="button"
          aria-label="Next"
          onClick={() => scrollBy(1)}
          className="absolute -right-3 top-[38%] z-10 hidden h-9 w-9 items-center justify-center rounded-full border border-[#E8E8E8] bg-white text-[#1A1A1A] shadow-sm transition-colors hover:border-[#FFC107] lg:flex"
        >
          <ChevronRight size={16} />
        </button>

        <div
          ref={railRef}
          className="flex gap-4 overflow-x-auto hide-scrollbar snap-x snap-mandatory pb-1"
        >
          {children}
        </div>
      </div>
    </section>
  );
}
