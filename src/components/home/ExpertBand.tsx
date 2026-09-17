"use client";

import { Mountain } from "lucide-react";
import { PHONE_DISPLAY, PHONE_HREF, whatsappLink } from "@/data";

export function ExpertBand() {
  return (
    <section
      data-ocid="expert_band.section"
      className="py-10 md:py-12"
      style={{ backgroundColor: "#FDF8E7" }}
    >
      <div className="lux-container text-center">
        <span
          className="inline-flex w-10 h-10 rounded-full items-center justify-center text-[#1A1A1A] mb-4"
          style={{ backgroundColor: "#FFC107" }}
          aria-hidden
        >
          <Mountain size={18} />
        </span>
        <p className="font-body text-sm font-bold text-[#1A1A1A] mb-2">
          Not sure which trek is right for you? Ask someone who has walked it.
        </p>
        <p className="font-body text-[13px] text-muted-foreground">
          Call us on{" "}
          <a
            href={PHONE_HREF}
            data-ocid="expert_band.phone"
            className="no-retro font-semibold text-[#1A73E8] hover:underline"
          >
            {PHONE_DISPLAY}
          </a>{" "}
          or{" "}
          <a
            href={whatsappLink("Hi TrekRoots, I need help picking a trek.")}
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="expert_band.whatsapp"
            className="no-retro font-semibold text-[#1A73E8] hover:underline"
          >
            message us on WhatsApp
          </a>
          {" "}— our trek experts reply within a few minutes.
        </p>
      </div>
    </section>
  );
}
