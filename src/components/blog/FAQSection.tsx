"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { SanityFaq } from "@/lib/sanity/types";

export function FAQSection({ faqs }: { faqs: SanityFaq[] }) {
  if (!faqs?.length) return null;

  return (
    <section aria-labelledby="faq-heading" className="mt-14 border-t border-[#E8E8E8] pt-12 md:mt-16 md:pt-14">
      <h2
        id="faq-heading"
        className="scroll-mt-28 text-2xl font-semibold tracking-tight text-[#1A1A1A] md:text-[1.75rem]"
      >
        Frequently asked questions
      </h2>
      <Accordion type="single" collapsible className="mt-6">
        {faqs.map((faq) => (
          <AccordionItem key={faq._key} value={faq._key} className="border-[#E8E8E8]">
            <AccordionTrigger className="py-5 text-left text-base font-semibold text-[#1A1A1A] hover:no-underline md:text-[1.05rem]">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="pb-5 text-[0.975rem] leading-relaxed text-[#444444] md:text-base">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
