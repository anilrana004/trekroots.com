"use client";

import Link from "next/link";
import { CloudinaryImage } from "@/components/CloudinaryImage";
import { DiscoveryDivider } from "./DiscoveryDivider";
import { DISCOVER } from "./tokens";

export type CategoryItem = {
  label: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
};

type DiscoveryCategoryStripProps = {
  title?: string;
  items: CategoryItem[];
  ocid?: string;
  showDivider?: boolean;
};

export function DiscoveryCategoryStrip({
  title = "Explore Our Top Categories",
  items,
  ocid = "discovery.categories",
  showDivider = false,
}: DiscoveryCategoryStripProps) {
  if (items.length === 0) return null;

  return (
    <section data-ocid={ocid} className="pb-2 pt-2 md:pt-4">
      {showDivider ? <DiscoveryDivider className="mb-7 md:mb-9" /> : null}
      <h2
        className="mb-5 font-display text-xl font-bold md:mb-6 md:text-2xl"
        style={{ color: DISCOVER.inkDeep }}
      >
        {title}
      </h2>
      <div className="flex gap-5 overflow-x-auto hide-scrollbar pb-2 sm:gap-6 md:flex-wrap md:overflow-visible">
        {items.map((item, i) => (
          <Link
            key={item.label}
            href={item.href}
            data-ocid={`${ocid}.${i + 1}`}
            className="group flex w-[88px] shrink-0 flex-col items-center gap-2.5 sm:w-[100px]"
          >
            <span
              className="relative block h-[72px] w-[72px] overflow-hidden rounded-full border-2 shadow-sm transition-transform duration-300 group-hover:scale-105 sm:h-[88px] sm:w-[88px]"
              style={{ borderColor: DISCOVER.gold }}
            >
              <CloudinaryImage
                src={item.imageSrc}
                alt={item.imageAlt}
                width={176}
                height={176}
                sizes="88px"
                className="h-full w-full object-cover"
                transform={{
                  width: 176,
                  height: 176,
                  crop: "fill",
                  gravity: "auto",
                }}
              />
            </span>
            <span className="text-center font-body text-[11px] font-semibold leading-tight text-[#1A1A1A] group-hover:text-[#0B3D2E] sm:text-[12px]">
              {item.label}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
