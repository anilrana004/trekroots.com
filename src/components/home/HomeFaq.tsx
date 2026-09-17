"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { SectionHead } from "@/components/home/SectionHead";

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
  {
    q: "How do I book, and what do I pay upfront?",
    a: "Pick a departure and send us an enquiry on WhatsApp — we hold your slot while you confirm. A 30% advance secures it, and the balance is due 30 days before departure.",
  },
  {
    q: "Which yatras do you run?",
    a: "Char Dham and Do Dham, Kedarnath on its own, and Adi Kailash with Om Parvat. Helicopter transfers can be added to most of them, subject to availability in that window.",
  },
  {
    q: "Do you arrange stays before and after the trek?",
    a: "Yes. We run six homestays across Uttarakhand, and we will book you a night at the basecamp town on either side of the trek if you ask when booking.",
  },
  {
    q: "What is your cancellation policy?",
    a: "Cancel more than 30 days out and the advance moves to another date. Inside 30 days a part of it is retained. If we call off a departure, you choose between a new date and a refund.",
  },
];

export function HomeFaq() {
  const [open, setOpen] = useState<number | null>(null);
  const columns = [FAQS.slice(0, 5), FAQS.slice(5)];

  return (
    <section data-ocid="faq.section" className="py-12 md:py-16 bg-white">
      <div className="lux-container">
        <SectionHead title="Frequently Asked Questions" className="mb-8 md:mb-10" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-2.5">
          {columns.map((column, colIndex) => (
            <div key={`faq-col-${colIndex}`} className="space-y-2.5">
              {column.map((faq, rowIndex) => {
                const index = colIndex * 5 + rowIndex;
                const isOpen = open === index;
                return (
                  <div key={faq.q} style={{ backgroundColor: "#F5F5F5" }}>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpen(isOpen ? null : index)}
                      data-ocid={`faq.item.${index + 1}`}
                      className="no-retro w-full flex items-center justify-between gap-4 px-4 py-3 text-left"
                    >
                      <span className="font-body text-[13px] font-medium text-[#1A1A1A] leading-snug">
                        {faq.q}
                      </span>
                      <ChevronDown
                        size={15}
                        className={`shrink-0 text-muted-foreground transition-transform ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <p className="lux-body text-[12.5px] leading-relaxed px-4 pb-3.5">
                        {faq.a}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            href="/contact"
            data-ocid="faq.all"
            className="no-retro inline-flex items-center px-5 py-2 font-body text-xs font-bold text-[#1A1A1A]"
            style={{ backgroundColor: "#FFC107" }}
          >
            View All FAQs
          </Link>
        </div>
      </div>
    </section>
  );
}
