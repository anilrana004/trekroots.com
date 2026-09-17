"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";

const REASONS = [
  {
    title: "Trek leaders who know the trail",
    body: "Every departure is led by a certified leader who has walked that route in that season, not a guide hired for the week.",
  },
  {
    title: "Small groups, always",
    body: "Batches are capped so the leader-to-trekker ratio stays high and nobody walks the last kilometre alone.",
  },
  {
    title: "Fitness before the summit",
    body: "We tell you the fitness you need months ahead, and we will move you to an easier trek if the mountain is not right for you yet.",
  },
  {
    title: "Honest about the weather",
    body: "If a route is unsafe we cancel it. We would rather lose a booking than send you into a storm.",
  },
  {
    title: "No hidden costs",
    body: "The price you see covers stay, meals on the trail, permits and equipment. GST is the only line added.",
  },
];

export function Advantage() {
  return (
    <section data-ocid="advantage.section" className="lux-section-muted">
      <div className="lux-container">
        <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="lux-label mb-4">Why us</p>
            <h2 className="lux-heading-lg text-[#1A1A1A] mb-5">
              5 reasons trekkers choose TrekRoots
            </h2>
            <p className="lux-body text-base mb-7">
              We have run Himalayan departures since 2012. These are the things
              we refuse to compromise on.
            </p>
            <Link
              href="/about"
              data-ocid="advantage.about"
              className="inline-flex items-center gap-1.5 text-sm font-body font-semibold text-[#1A1A1A] hover:gap-2.5 transition-all"
            >
              Read our story <ArrowRight size={15} />
            </Link>
          </motion.div>

          <ol className="space-y-px bg-border">
            {REASONS.map((reason, i) => (
              <motion.li
                key={reason.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                className="flex gap-5 bg-[#F5F5F5] py-5 md:py-6"
              >
                <span
                  className="font-display text-3xl md:text-4xl leading-none shrink-0 w-10 text-right"
                  style={{ color: "#FFC107" }}
                >
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-display text-base md:text-lg text-[#1A1A1A] mb-1.5 leading-snug">
                    {reason.title}
                  </h3>
                  <p className="lux-body text-sm">{reason.body}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
