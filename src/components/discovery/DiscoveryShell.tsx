"use client";

import type { ReactNode } from "react";
import { DISCOVER } from "./tokens";

type DiscoveryShellProps = {
  sidebar: ReactNode;
  children: ReactNode;
  ocid?: string;
};

/** Cream-edged discovery page: sticky filter sidebar + main content. */
export function DiscoveryShell({
  sidebar,
  children,
  ocid = "discovery.shell",
}: DiscoveryShellProps) {
  return (
    <div
      data-ocid={ocid}
      className="min-h-screen"
      style={{ background: "#FFFFFF" }}
    >
      <div className="mx-auto grid max-w-[1400px] gap-6 px-4 py-6 md:px-6 md:py-8 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-8 xl:grid-cols-[260px_minmax(0,1fr)]">
        {sidebar}
        <main
          className="min-w-0"
          style={{
            background: "linear-gradient(180deg, #FFFDF8 0%, #FFFFFF 120px)",
          }}
        >
          {children}
        </main>
      </div>
      <div
        className="h-2 w-full"
        style={{ background: DISCOVER.cream }}
        aria-hidden
      />
    </div>
  );
}
