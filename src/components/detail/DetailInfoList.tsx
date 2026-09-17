"use client";

import { ChevronRight } from "lucide-react";
import { useState, type ReactNode } from "react";

export type InfoRow = {
  id: string;
  title: string;
  icon?: ReactNode;
  content: ReactNode;
};

type DetailInfoListProps = {
  title: string;
  rows: InfoRow[];
  ocidPrefix: string;
};

/**
 * "Complete Trek Information" accordion — icon + title + chevron rows.
 */
export function DetailInfoList({
  title,
  rows,
  ocidPrefix,
}: DetailInfoListProps) {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section data-ocid={`${ocidPrefix}.info_list`} className="scroll-mt-36">
      <h2 className="font-serif italic text-2xl md:text-[28px] text-[#1A1A1A] mb-5">
        {title}
      </h2>
      <div className="border-t" style={{ borderColor: "#E8E8E8" }}>
        {rows.map((row) => {
          const isOpen = open === row.id;
          return (
            <div
              key={row.id}
              className="border-b"
              style={{ borderColor: "#E8E8E8" }}
            >
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : row.id)}
                data-ocid={`${ocidPrefix}.info.${row.id}`}
                className="no-retro w-full flex items-center gap-3 px-1 py-4 text-left hover:bg-[#FAFAFA] transition-colors"
              >
                {row.icon ? (
                  <span
                    className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-[#1A1A1A]"
                    style={{ backgroundColor: "#FFE082" }}
                    aria-hidden
                  >
                    {row.icon}
                  </span>
                ) : null}
                <span className="flex-1 font-body text-[13px] md:text-sm font-semibold text-[#1A1A1A]">
                  {row.title}
                </span>
                <ChevronRight
                  size={16}
                  className={`shrink-0 text-muted-foreground transition-transform ${
                    isOpen ? "rotate-90" : ""
                  }`}
                />
              </button>
              {isOpen ? (
                <div className="px-1 pb-5 pl-12 font-body text-[13px] text-[#555555] leading-relaxed">
                  {row.content}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}
