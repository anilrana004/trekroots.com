"use client";

import type { LucideIcon } from "lucide-react";
import { DISCOVER } from "./tokens";

export type WhyUsItem = {
  title: string;
  body: string;
  icon: LucideIcon;
};

type DiscoveryWhyUsProps = {
  title?: string;
  items: WhyUsItem[];
  ocid?: string;
};

export function DiscoveryWhyUs({
  title = "Why Trekkers Love Travelling With Us",
  items,
  ocid = "discovery.why",
}: DiscoveryWhyUsProps) {
  return (
    <section
      data-ocid={ocid}
      className="rounded-2xl px-5 py-10 md:px-8 md:py-12"
      style={{ background: DISCOVER.cream }}
    >
      <h2
        className="mb-8 text-center font-display text-xl font-bold md:mb-10 md:text-2xl"
        style={{ color: DISCOVER.inkDeep }}
      >
        {title}
      </h2>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              data-ocid={`${ocid}.${i + 1}`}
              className="rounded-xl border bg-white p-5 shadow-sm"
              style={{ borderColor: DISCOVER.line }}
            >
              <div
                className="mb-3 flex h-10 w-10 items-center justify-center rounded-full"
                style={{ background: "rgba(255,193,7,0.35)" }}
              >
                <Icon size={18} style={{ color: DISCOVER.ink }} />
              </div>
              <h3
                className="mb-1.5 font-body text-sm font-bold"
                style={{ color: DISCOVER.inkDeep }}
              >
                {item.title}
              </h3>
              <p className="font-body text-[12.5px] leading-relaxed text-[#5A6B62]">
                {item.body}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
