"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { SectionHead } from "@/components/home/SectionHead";
import { HOME_FAQS } from "@/data/home-faqs";

export function HomeFaq() {
  const [open, setOpen] = useState<number | null>(null);
  const columns = [HOME_FAQS.slice(0, 5), HOME_FAQS.slice(5)];

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
