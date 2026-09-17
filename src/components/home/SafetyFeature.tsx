"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CloudinaryImage } from "@/components/CloudinaryImage";
import { SectionHead } from "@/components/home/SectionHead";
import { getTrekCoverImage } from "@/data";

const PARAGRAPHS = [
  "n the mountains, altitude and weather do not negotiate. So our safety process is not a document filed away somewhere — it is what the trek leader carries up the mountain, and it is the reason we will turn a group around a hundred metres below a summit.",
  "Every camp above 9,000 feet runs twice-daily health checks, and every trekker is read on an oximeter morning and evening. The readings go into a log the leader reviews before clearing anyone for the next ascent.",
  "Each departure carries bottled oxygen, a stretcher and a full first-aid kit, and every trek leader is certified in wilderness first aid. Evacuation routes are mapped campsite by campsite before the batch ever leaves basecamp.",
  "Summit day has a turn-back time written down in advance. The leader calls it, and that call is final — whatever the weather looks like from the tents at 4 am.",
];

export function SafetyFeature() {
  return (
    <section data-ocid="safety.section" className="py-12 md:py-16 bg-white">
      <div className="lux-container">
        <SectionHead
          title="What Safety Means To Us At TrekRoots"
          aside={
            <Link
              href="/about"
              data-ocid="safety.about"
              className="no-retro inline-flex items-center gap-1.5 font-body text-xs font-semibold text-[#1A1A1A] hover:gap-2.5 transition-all"
            >
              Read our safety promise <ArrowRight size={14} />
            </Link>
          }
          className="mb-8 md:mb-10"
        />

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] gap-8 lg:gap-12">
          <div className="relative overflow-hidden self-start">
            <CloudinaryImage
              src={getTrekCoverImage("brahmatal")}
              alt="Trek leader checking on trekkers at a high-altitude camp"
              width={640}
              height={400}
              sizes="(max-width: 1023px) 100vw, 40vw"
              className="w-full h-auto object-cover"
              transform={{
                width: 640,
                height: 400,
                crop: "fill",
                gravity: "auto",
                quality: "auto:good",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/25 to-transparent" />
            <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-center">
              <p className="font-body text-[10px] font-bold uppercase tracking-[0.2em] text-white/80">
                What
              </p>
              <p
                className="font-display text-3xl md:text-4xl leading-none"
                style={{ color: "#FFC107" }}
              >
                SAFETY
              </p>
              <p className="font-display text-lg md:text-xl text-white leading-tight">
                means to us
              </p>
              <p className="font-body text-[10px] font-semibold uppercase tracking-[0.18em] text-white/70 mt-1">
                At TrekRoots
              </p>
            </div>
          </div>

          <div>
            {PARAGRAPHS.map((text, i) => (
              <p
                key={text.slice(0, 24)}
                className="lux-body text-[13px] leading-relaxed mb-4 last:mb-0"
              >
                {i === 0 ? (
                  <>
                    <span
                      className="float-left font-display text-4xl leading-none mr-1.5 mt-0.5"
                      style={{ color: "#FFC107" }}
                    >
                      I
                    </span>
                    {text}
                  </>
                ) : (
                  text
                )}
              </p>
            ))}

            <div className="mt-6">
              <p className="font-body text-sm font-semibold text-[#1A1A1A]">
                Priya Sharma
              </p>
              <p className="font-body text-xs text-muted-foreground mt-0.5">
                Founder &amp; Lead Guide, TrekRoots
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
