"use client";

import { Filter, X } from "lucide-react";
import { useState, type ReactNode } from "react";
import { DISCOVER } from "./tokens";

export type SidebarLink = {
  label: string;
  active?: boolean;
  onClick: () => void;
  count?: number;
};

export type SidebarGroup = {
  title: string;
  items: SidebarLink[];
};

type DiscoverySidebarProps = {
  groups: SidebarGroup[];
  searchSlot?: ReactNode;
  onClear?: () => void;
  hasActiveFilters?: boolean;
  ocid?: string;
};

export function DiscoverySidebar({
  groups,
  searchSlot,
  onClear,
  hasActiveFilters,
  ocid = "discovery.sidebar",
}: DiscoverySidebarProps) {
  const [open, setOpen] = useState(false);

  const body = (
    <div className="space-y-6">
      {searchSlot}
      {hasActiveFilters && onClear ? (
        <button
          type="button"
          onClick={onClear}
          data-ocid={`${ocid}.clear`}
          className="inline-flex items-center gap-1.5 font-body text-xs font-semibold text-[#0B3D2E] underline-offset-2 hover:underline"
        >
          <X size={12} />
          Clear filters
        </button>
      ) : null}
      {groups.map((group) => (
        <div key={group.title}>
          <p
            className="mb-2.5 font-body text-[11px] font-bold uppercase tracking-[0.14em]"
            style={{ color: DISCOVER.ink }}
          >
            {group.title}
          </p>
          <ul className="space-y-0.5">
            {group.items.map((item) => (
              <li key={item.label}>
                <button
                  type="button"
                  onClick={() => {
                    item.onClick();
                    setOpen(false);
                  }}
                  data-ocid={`${ocid}.${group.title}.${item.label}`
                    .toLowerCase()
                    .replace(/\s+/g, "_")}
                  className={`flex w-full items-center justify-between rounded-md px-2.5 py-1.5 text-left font-body text-[13px] transition-colors ${
                    item.active
                      ? "font-semibold text-[#0B3D2E]"
                      : "text-[#3D4F46] hover:bg-white/70"
                  }`}
                  style={
                    item.active
                      ? { background: "rgba(255,193,7,0.35)" }
                      : undefined
                  }
                >
                  <span>{item.label}</span>
                  {typeof item.count === "number" ? (
                    <span className="text-[11px] text-[#8A9A90]">
                      {item.count}
                    </span>
                  ) : null}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );

  return (
    <>
      {/* Mobile filter trigger */}
      <div className="mb-4 lg:hidden">
        <button
          type="button"
          onClick={() => setOpen(true)}
          data-ocid={`${ocid}.mobile_open`}
          className="inline-flex items-center gap-2 rounded-full px-4 py-2 font-body text-xs font-bold text-white"
          style={{ background: DISCOVER.ink }}
        >
          <Filter size={14} />
          Explore &amp; filter
        </button>
      </div>

      {/* Desktop sticky sidebar */}
      <aside
        data-ocid={ocid}
        className="hidden lg:block lg:sticky lg:top-24 lg:self-start"
      >
        <div
          className="rounded-2xl p-5"
          style={{ background: DISCOVER.cream, border: `1px solid ${DISCOVER.line}` }}
        >
          {body}
        </div>
      </aside>

      {/* Mobile sheet */}
      {open ? (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal>
          <button
            type="button"
            aria-label="Close filters"
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
          />
          <div
            className="absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto rounded-t-2xl p-5 pb-10 shadow-2xl"
            style={{ background: DISCOVER.cream }}
          >
            <div className="mb-4 flex items-center justify-between">
              <p
                className="font-display text-lg font-bold"
                style={{ color: DISCOVER.ink }}
              >
                Explore
              </p>
              <button
                type="button"
                aria-label="Close"
                onClick={() => setOpen(false)}
                className="rounded-full p-2 hover:bg-white/60"
              >
                <X size={18} />
              </button>
            </div>
            {body}
          </div>
        </div>
      ) : null}
    </>
  );
}
