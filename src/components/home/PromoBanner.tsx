"use client";

import Link from "next/link";
import { CloudinaryImage } from "@/components/CloudinaryImage";
import { getTrekCoverImage } from "@/data";

/**
 * Mid-page banner: full-bleed image with the copy held to the left, matching
 * the hero's alignment so the page reads as one column of text.
 */
export function PromoBanner() {
  return (
    <section data-ocid="promo.section" className="relative overflow-hidden">
      <div className="relative h-[320px] md:h-[380px]">
        <CloudinaryImage
          src={getTrekCoverImage("kuari-pass")}
          alt="Trail winding through the forest on the Kuari Pass trek"
          width={1920}
          height={760}
          sizes="100vw"
          className="absolute inset-0 w-full h-full object-cover"
          transform={{
            width: 1920,
            height: 760,
            crop: "fill",
            gravity: "auto",
            quality: "auto:good",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-black/10" />

        <div className="relative h-full flex items-center">
          <div className="lux-container">
            <div className="max-w-xl">
              <p className="font-body text-sm font-bold text-white mb-2">
                Kuari Pass Trek
              </p>
              <h2
                className="font-display text-2xl md:text-3xl lg:text-[34px] leading-tight mb-4"
                style={{ color: "#FFC107" }}
              >
                A six-day walk to the balcony of the Nanda Devi sanctuary
              </h2>
              <p className="font-body text-[13px] text-white/85 mb-6 max-w-md">
                Oak and rhododendron forest, high meadows, and the Himalayan
                giants lined up across the horizon at dawn.
              </p>
              <Link
                href="/treks/kuari-pass"
                data-ocid="promo.cta"
                className="no-retro inline-flex items-center px-5 py-2.5 font-body text-xs font-bold text-[#1A1A1A]"
                style={{ backgroundColor: "#FFC107" }}
              >
                Explore The Kuari Pass Trek
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
