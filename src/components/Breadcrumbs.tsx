import Link from "next/link";
import type { Crumb } from "@/lib/schema";

type BreadcrumbsProps = {
  items: Crumb[];
  /** Dark overlay on hero images vs light page chrome */
  tone?: "light" | "dark";
  className?: string;
};

export function Breadcrumbs({
  items,
  tone = "light",
  className = "",
}: BreadcrumbsProps) {
  if (items.length < 2) return null;

  const muted = tone === "dark" ? "text-white/70" : "text-[#888888]";
  const current = tone === "dark" ? "text-white" : "text-[#1A1A1A]";
  const sep = tone === "dark" ? "text-white/40" : "text-[#CCCCCC]";

  return (
    <nav
      aria-label="Breadcrumb"
      data-ocid="breadcrumbs"
      className={`flex font-body text-[11px] md:text-[12px] ${className}`}
    >
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={`${item.path}-${item.name}`} className="flex items-center gap-1.5">
              {i > 0 ? (
                <span className={sep} aria-hidden>
                  /
                </span>
              ) : null}
              {isLast ? (
                <span className={`font-medium ${current}`} aria-current="page">
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.path}
                  className={`${muted} hover:underline underline-offset-2`}
                >
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
