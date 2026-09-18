"use client";

import type { ReactNode } from "react";
import { DiscoveryDivider } from "./DiscoveryDivider";

type DiscoverySectionProps = {
  children: ReactNode;
  /** Hide the green rule above this block (e.g. first section). */
  hideDivider?: boolean;
  className?: string;
  ocid?: string;
};

/** Wraps a content block with the signature green horizontal rule. */
export function DiscoverySection({
  children,
  hideDivider = false,
  className = "",
  ocid,
}: DiscoverySectionProps) {
  return (
    <div data-ocid={ocid} className={className}>
      {!hideDivider ? <DiscoveryDivider className="mb-1" /> : null}
      {children}
    </div>
  );
}
