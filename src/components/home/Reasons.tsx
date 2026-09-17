"use client";

import { motion } from "motion/react";
import { CloudinaryImage } from "@/components/CloudinaryImage";
import { SectionHead } from "@/components/home/SectionHead";
import { getTrekCoverImage } from "@/data";

const REASONS = [
  {
    title: "Trek Leaders Who Know The Trail",
    caption: "Led by people who walked it",
    slug: "kedarkantha",
    body: "Every departure is led by a certified leader who has walked that route in that season, not a guide hired for the week. They know where the snow sits late, which stream runs high in the afternoon, and when a group needs to stop.",
  },
  {
    title: "Small Groups, Always",
    caption: "Capped batch sizes",
    slug: "brahmatal",
    body: "Batches are capped so the leader-to-trekker ratio stays high and nobody walks the last kilometre alone. It costs us places on every departure, and it is the single thing we are least willing to change.",
  },
  {
    title: "Fitness Before The Summit",
    caption: "Prepared, not surprised",
    slug: "har-ki-dun",
    body: "We tell you the fitness you need months ahead and send a preparation plan the day you book. If the mountain is not right for you yet, we will move you to an easier trek rather than take the booking.",
  },
  {
    title: "Honest About The Weather",
    caption: "The turn-back call",
    slug: "chopta-tungnath",
    body: "If a route is unsafe we cancel it. Summit day carries a turn-back time written down in advance, and the leader calls it. We would rather lose a booking than send a batch into a storm.",
  },
  {
    title: "No Hidden Costs",
    caption: "What you see is the price",
    slug: "valley-of-flowers",
    body: "The price you see covers your stay, meals on the trail, permits and forest fees, and camping equipment. GST is the only line added at checkout — there is no gear rental or permit surprise at basecamp.",
  },
];

export function Reasons() {
  return (
    <section
      data-ocid="reasons.section"
      className="py-12 md:py-16"
      style={{ backgroundColor: "#FDF8E7" }}
    >
      <div className="lux-container">
        <SectionHead title="5 Reasons Why TrekRoots" className="mb-8 md:mb-10" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
          {REASONS.map((reason, i) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
              data-ocid={`reasons.item.${i + 1}`}
              className="px-0 sm:px-5 lg:px-4 first:lg:pl-0 last:lg:pr-0 py-5 sm:py-0 sm:border-l first:sm:border-l-0 lg:first:border-l-0"
              style={{ borderColor: "#EBD9A4" }}
            >
              <h3 className="font-body text-[13px] font-bold text-[#1A1A1A] leading-snug mb-3 min-h-[2.6rem]">
                {reason.title}
              </h3>

              <div className="relative mb-3.5 overflow-hidden">
                <CloudinaryImage
                  src={getTrekCoverImage(reason.slug)}
                  alt={reason.title}
                  width={320}
                  height={180}
                  sizes="(max-width: 639px) 100vw, (max-width: 1023px) 45vw, 18vw"
                  className="w-full h-auto object-cover"
                  transform={{
                    width: 320,
                    height: 180,
                    crop: "fill",
                    gravity: "auto",
                    quality: "auto:good",
                  }}
                />
                <div className="absolute inset-x-0 bottom-0 bg-black/65 px-2 py-1.5">
                  <p
                    className="font-body text-[10px] font-bold uppercase tracking-[0.1em] leading-tight"
                    style={{ color: "#FFC107" }}
                  >
                    {reason.caption}
                  </p>
                </div>
              </div>

              <p className="lux-body text-[12px] leading-relaxed">{reason.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
