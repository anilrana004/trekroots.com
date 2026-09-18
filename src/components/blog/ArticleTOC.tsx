"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export type TocItem = { id: string; text: string; level: 2 | 3 };

type Props = {
  items: TocItem[];
  className?: string;
};

export function ArticleTOC({ items, className }: Props) {
  const panelId = useId();
  const [open, setOpen] = useState(false);

  if (!items.length) return null;

  return (
    <>
      {/* Mobile expandable */}
      <div className={cn("lg:hidden", className)}>
        <button
          type="button"
          className="flex w-full items-center justify-between border border-[#E8E8E8] bg-[#FAFAFA] px-4 py-3.5 text-left text-[11px] font-semibold uppercase tracking-[0.16em] text-[#1A1A1A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rootsYellow"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
        >
          On this page
          <ChevronDown
            className={cn(
              "h-4 w-4 transition-transform motion-reduce:transition-none",
              open && "rotate-180",
            )}
            aria-hidden
          />
        </button>
        <nav
          id={panelId}
          hidden={!open}
          aria-label="Table of contents"
          className="border border-t-0 border-[#E8E8E8] bg-white px-2 py-2"
        >
          <TocLinks items={items} onNavigate={() => setOpen(false)} />
        </nav>
      </div>

      {/* Desktop sticky */}
      <nav
        aria-label="Table of contents"
        className={cn(
          "hidden lg:block lg:sticky lg:top-28 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto",
          className,
        )}
      >
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#888888]">
          On this page
        </p>
        <TocLinks items={items} />
      </nav>
    </>
  );
}

function TocLinks({
  items,
  onNavigate,
}: {
  items: TocItem[];
  onNavigate?: () => void;
}) {
  return (
    <ol className="space-y-1">
      {items.map((item) => (
        <li key={item.id}>
          <a
            href={`#${item.id}`}
            onClick={onNavigate}
            className={cn(
              "block rounded-sm py-2 text-sm leading-snug text-[#555555] transition-colors hover:text-[#1A1A1A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rootsYellow",
              item.level === 3 ? "pl-4 text-[13px]" : "font-medium",
            )}
          >
            {item.text}
          </a>
        </li>
      ))}
    </ol>
  );
}
