"use client";

import Link from "next/link";
import { DISCOVER } from "./tokens";

export type QuickNavItem = {
  label: string;
  href: string;
};

type DiscoveryQuickNavProps = {
  items: QuickNavItem[];
  ocid?: string;
};

/** Yellow category strip under the green search banner. */
export function DiscoveryQuickNav({
  items,
  ocid = "discovery.quicknav",
}: DiscoveryQuickNavProps) {
  if (items.length === 0) return null;

  return (
    <nav
      data-ocid={ocid}
      className="border-b"
      style={{
        background: DISCOVER.gold,
        borderColor: "rgba(0,0,0,0.06)",
      }}
      aria-label="Browse by category"
    >
      <div className="mx-auto flex max-w-[1400px] gap-1 overflow-x-auto hide-scrollbar px-2 py-2 md:justify-center md:gap-2 md:px-6">
        {items.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="shrink-0 rounded-md px-3 py-1.5 font-body text-[10.5px] font-bold uppercase tracking-[0.08em] text-[#1A1A1A] transition-colors hover:bg-black/10 md:text-[11px]"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
