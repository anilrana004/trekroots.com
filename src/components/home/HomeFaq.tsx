"use client";

import Link from "next/link";
import { ArrowRight, Minus, Plus } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const FAQS = [
  {
    q: "I have never trekked before. Where should I start?",
    a: "Kedarkantha, Dayara Bugyal and Nag Tibba are our usual first treks — short, well-marked and low enough that altitude is rarely an issue. Tell us your fitness level on WhatsApp and we will point you at the right one.",
  },
  {
    q: "How fit do I need to be?",
    a: "For an easy-moderate trek, being able to cover 5 km in about 40 minutes on flat ground is the benchmark. We send a preparation plan once you book, and we would rather you postpone than arrive underprepared.",
  },
  {
    q: "What does the price include?",
    a: "Stay through the trek, all meals on the trail, permits and forest fees, camping or lodge equipment, and a certified trek leader with a support team. Travel to the basecamp, personal gear and 5% GST sit outside it.",
  },
  {
    q: "What happens if the weather turns?",
    a: "The trek leader can shorten, reroute or call off a summit attempt, and that call is final. If we cancel a departure ourselves, you can move to another date or take a refund as per our booking policy.",
  },
  {
    q: "Can I offload my backpack?",
    a: "On most Uttarakhand treks, yes — arrange it in advance and a porter or mule carries it between camps. It has to be booked before the trek starts rather than on the trail.",
  },
  {
    q: "Do you run private or group departures?",
    a: "Both. Fixed departures run on published dates, and we set up private batches for families, friends and corporate groups. Send us the group size and rough dates and we will put together an itinerary.",
  },
];

export function HomeFaq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section data-ocid="faq.section" className="lux-section-muted">
      <div className="lux-container">
        <div className="grid grid-cols-1 lg:grid-cols-[0.75fr_1.25fr] gap-10 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="lux-label mb-4">Before you book</p>
            <h2 className="lux-heading-lg text-[#1A1A1A] mb-5">
              Frequently asked questions
            </h2>
            <p className="lux-body text-base mb-7">
              Still unsure about something? Our trek experts answer on WhatsApp
              within a few minutes.
            </p>
            <Link
              href="/contact"
              data-ocid="faq.contact_link"
              className="inline-flex items-center gap-1.5 text-sm font-body font-semibold text-[#1A1A1A] hover:gap-2.5 transition-all"
            >
              Talk to an expert <ArrowRight size={15} />
            </Link>
          </motion.div>

          <div className="divide-y" style={{ borderColor: "#E0E0E0" }}>
            {FAQS.map((faq, i) => {
              const isOpen = open === i;
              return (
                <div key={faq.q} className="border-t first:border-t-0" style={{ borderColor: "#E0E0E0" }}>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? null : i)}
                    data-ocid={`faq.item.${i + 1}`}
                    className="w-full flex items-start justify-between gap-5 py-5 text-left"
                  >
                    <span className="font-display text-base md:text-lg text-[#1A1A1A] leading-snug">
                      {faq.q}
                    </span>
                    <span
                      className="mt-1 shrink-0 w-6 h-6 flex items-center justify-center"
                      style={{ color: "#FFC107" }}
                    >
                      {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                    </span>
                  </button>
                  {isOpen && (
                    <p className="lux-body text-sm pb-5 pr-10">{faq.a}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
