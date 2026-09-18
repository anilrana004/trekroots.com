"use client";

import Link from "next/link";
import { CloudinaryImage } from "@/components/CloudinaryImage";
import { DiscoveryDivider } from "./DiscoveryDivider";
import { DISCOVER } from "./tokens";

export type ThemeTile = {
  title: string;
  href?: string;
  onClick?: () => void;
  imageSrc: string;
  imageAlt: string;
  caption?: string;
};

type DiscoveryThemeTilesProps = {
  title: string;
  aside?: string;
  tiles: ThemeTile[];
  ocid?: string;
  showDivider?: boolean;
};

export function DiscoveryThemeTiles({
  title,
  aside,
  tiles,
  ocid = "discovery.themes",
  showDivider = true,
}: DiscoveryThemeTilesProps) {
  if (tiles.length === 0) return null;

  return (
    <section data-ocid={ocid} className="py-7 md:py-9">
      {showDivider ? <DiscoveryDivider className="mb-7 md:mb-9" /> : null}
      <div className="mb-5 flex flex-col gap-2 md:mb-6 md:flex-row md:items-end md:justify-between">
        <h2
          className="font-display text-xl font-bold md:text-2xl"
          style={{ color: DISCOVER.inkDeep }}
        >
          {title}
        </h2>
        {aside ? (
          <p className="max-w-md font-body text-[13px] text-[#5A6B62] md:text-right">
            {aside}
          </p>
        ) : null}
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {tiles.map((tile, i) => {
          const inner = (
            <>
              <CloudinaryImage
                src={tile.imageSrc}
                alt={tile.imageAlt}
                width={640}
                height={512}
                sizes="(max-width: 639px) 100vw, 33vw"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                transform={{
                  width: 640,
                  height: 512,
                  crop: "fill",
                  gravity: "auto",
                }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 35%, rgba(6,40,30,0.88) 100%)",
                }}
              />
              <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
                <p className="font-display text-lg font-bold text-white md:text-xl">
                  {tile.title}
                </p>
                {tile.caption ? (
                  <p className="mt-1 font-body text-[12px] text-white/80">
                    {tile.caption}
                  </p>
                ) : null}
              </div>
            </>
          );

          const className =
            "group relative aspect-[5/4] overflow-hidden rounded-xl text-left";

          if (tile.onClick) {
            return (
              <button
                key={tile.title}
                type="button"
                onClick={tile.onClick}
                data-ocid={`${ocid}.${i + 1}`}
                className={className}
              >
                {inner}
              </button>
            );
          }

          return (
            <Link
              key={tile.title}
              href={tile.href ?? "#"}
              data-ocid={`${ocid}.${i + 1}`}
              className={className}
            >
              {inner}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
