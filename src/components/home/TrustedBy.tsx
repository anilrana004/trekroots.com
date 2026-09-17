"use client";

import { Award, Shield, Star } from "lucide-react";
import { SectionHead } from "@/components/home/SectionHead";
import { REVIEW_SUMMARY } from "@/data/reviews";

const CREDENTIALS = [
  {
    icon: <Award size={20} />,
    label: "Uttarakhand Tourism",
    sub: "Registered trekking operator",
  },
  {
    icon: <Shield size={20} />,
    label: "IMF Affiliated",
    sub: "Indian Mountaineering Foundation",
  },
  {
    icon: <Star size={20} />,
    label: `${REVIEW_SUMMARY.rating} / 5 on Google`,
    sub: `${REVIEW_SUMMARY.count} verified reviews`,
  },
];

export function TrustedBy() {
  return (
    <section data-ocid="trust.section" className="py-12 md:py-16 bg-white">
      <div className="lux-container">
        <SectionHead title="Trusted by" className="mb-8" />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {CREDENTIALS.map((item, i) => (
            <div
              key={item.label}
              data-ocid={`trust.item.${i + 1}`}
              className="flex items-center gap-4 border px-5 py-5"
              style={{ borderColor: "#E8E8E8" }}
            >
              <span
                className="shrink-0 w-11 h-11 rounded-full flex items-center justify-center text-[#1A1A1A]"
                style={{ backgroundColor: "#FFE082" }}
                aria-hidden
              >
                {item.icon}
              </span>
              <div>
                <p className="font-body text-[13px] font-bold text-[#1A1A1A]">
                  {item.label}
                </p>
                <p className="font-body text-[11.5px] text-muted-foreground mt-0.5">
                  {item.sub}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
