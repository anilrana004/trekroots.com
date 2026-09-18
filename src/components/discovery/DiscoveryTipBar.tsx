"use client";

import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Lightbulb } from "lucide-react";
import { DISCOVER } from "./tokens";

type DiscoveryTipBarProps = {
  children: ReactNode;
  icon?: LucideIcon;
  ocid?: string;
};

/** Cream highlight strip between rails — quotes, tips, first-timer nudges. */
export function DiscoveryTipBar({
  children,
  icon: Icon = Lightbulb,
  ocid = "discovery.tip",
}: DiscoveryTipBarProps) {
  return (
    <aside
      data-ocid={ocid}
      className="my-1 flex items-start gap-3 rounded-lg px-4 py-3.5 md:items-center md:px-5 md:py-4"
      style={{
        background: DISCOVER.cream,
        borderLeft: `3px solid ${DISCOVER.greenLine}`,
      }}
    >
      <span
        className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full md:mt-0"
        style={{ background: "rgba(27,94,59,0.12)" }}
      >
        <Icon size={15} style={{ color: DISCOVER.ink }} aria-hidden />
      </span>
      <p className="font-body text-[12.5px] leading-relaxed text-[#3D4F46] md:text-[13px]">
        {children}
      </p>
    </aside>
  );
}
