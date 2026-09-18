"use client";

import Link from "next/link";
import { CloudinaryImage } from "@/components/CloudinaryImage";
import { DISCOVER } from "./tokens";

type DiscoveryProductCardProps = {
  href: string;
  imageSrc: string;
  imageAlt: string;
  title: string;
  meta: string;
  subtitle?: string;
  priceLabel?: string;
  primaryLabel: string;
  secondaryLabel: string;
  secondaryHref?: string;
  badge?: string;
  ocid?: string;
  priority?: boolean;
  /** Use in wrapped grids instead of horizontal rails. */
  layout?: "rail" | "grid";
};

export function DiscoveryProductCard({
  href,
  imageSrc,
  imageAlt,
  title,
  meta,
  subtitle,
  priceLabel,
  primaryLabel,
  secondaryLabel,
  secondaryHref,
  badge,
  ocid = "discovery.card",
  priority = false,
  layout = "rail",
}: DiscoveryProductCardProps) {
  const sizeClass =
    layout === "grid"
      ? "w-full"
      : "w-[78%] shrink-0 snap-start sm:w-[46%] lg:w-[calc((100%-3rem)/4)]";

  return (
    <article
      data-ocid={ocid}
      className={`flex flex-col overflow-hidden rounded-xl border bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg ${sizeClass}`}
      style={{ borderColor: DISCOVER.cardBorder }}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-[#F0F0F0]">
        <Link href={href} tabIndex={-1} className="block h-full w-full">
          <CloudinaryImage
            src={imageSrc}
            alt={imageAlt}
            width={480}
            height={360}
            sizes="(max-width: 639px) 78vw, (max-width: 1023px) 46vw, 24vw"
            priority={priority}
            className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.04]"
            transform={{
              width: 480,
              height: 360,
              crop: "fill",
              gravity: "auto",
              quality: "auto:good",
            }}
          />
        </Link>
        {badge ? (
          <span
            className="absolute left-2.5 top-2.5 rounded-full px-2.5 py-1 font-body text-[10px] font-bold uppercase tracking-wide text-[#0B3D2E]"
            style={{ background: DISCOVER.gold }}
          >
            {badge}
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-3.5 md:p-4">
        <p
          className="mb-1.5 font-body text-[10px] font-bold uppercase tracking-[0.12em]"
          style={{ color: "#5A8A6A" }}
        >
          {meta}
        </p>
        <h3 className="mb-1 font-body text-[15px] font-bold leading-snug text-[#1A1A1A]">
          <Link href={href} className="hover:underline">
            {title}
          </Link>
        </h3>
        {subtitle ? (
          <p className="mb-2 line-clamp-2 font-body text-[12px] leading-snug text-[#666]">
            {subtitle}
          </p>
        ) : null}
        {priceLabel ? (
          <p className="mb-3 font-body text-[12.5px] font-semibold text-[#1A1A1A]">
            From <span style={{ color: DISCOVER.ink }}>{priceLabel}</span>
          </p>
        ) : (
          <div className="mb-3" />
        )}

        <div className="mt-auto flex items-center gap-2">
          <Link
            href={href}
            data-ocid={`${ocid}.primary`}
            className="flex-1 rounded-md px-2.5 py-2 text-center font-body text-[11px] font-bold text-white transition-opacity hover:opacity-90"
            style={{ background: DISCOVER.greenBtn }}
          >
            {primaryLabel}
          </Link>
          <Link
            href={secondaryHref ?? href}
            data-ocid={`${ocid}.secondary`}
            className="flex-1 rounded-md px-2.5 py-2 text-center font-body text-[11px] font-bold text-[#1A1A1A] transition-opacity hover:opacity-90"
            style={{ background: DISCOVER.gold }}
            {...(secondaryHref?.startsWith("http")
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
          >
            {secondaryLabel}
          </Link>
        </div>
      </div>
    </article>
  );
}
