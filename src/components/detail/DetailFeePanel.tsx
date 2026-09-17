"use client";

import Link from "next/link";
import { useState } from "react";
import { PHONE_DISPLAY, PHONE_HREF, whatsappLink } from "@/data";
import { tripPrice, type TripPrice } from "@/lib/price";
import type { PriceRange } from "@/data/types";

type DetailFeePanelProps = {
  name: string;
  priceRange: PriceRange;
  bookHref: string;
  bookLabel: string;
  bookOcid: string;
  /** Route / pickup summary under the fee. */
  routeLine: string;
  facts: { label: string; value: string }[];
  enquiryMessage: string;
  kind: "trek" | "yatra";
};

/**
 * Yellow-bordered trek/yatra fee box — the Indiahikes sidebar signature.
 */
export function DetailFeePanel({
  name,
  priceRange,
  bookHref,
  bookLabel,
  bookOcid,
  routeLine,
  facts,
  enquiryMessage,
  kind,
}: DetailFeePanelProps) {
  const price: TripPrice = tripPrice(priceRange);
  const [nameField, setNameField] = useState("");
  const [phone, setPhone] = useState("");

  const waHref = whatsappLink(
    nameField.trim()
      ? `Hi TrekRoots, I'm ${nameField.trim()}. ${enquiryMessage}${phone.trim() ? ` My number: ${phone.trim()}.` : ""}`
      : enquiryMessage,
  );

  return (
    <aside
      data-ocid={`${kind}.fee_panel`}
      className="sticky top-[calc(var(--site-header-offset,68px)+48px)] border-[3px] bg-white p-5"
      style={{ borderColor: "#FFC107" }}
    >
      <p className="font-body text-[11px] font-bold uppercase tracking-[0.12em] text-[#1A1A1A] mb-2">
        {kind === "yatra" ? "Yatra Fee" : "Trek Fee"}
      </p>

      <div className="mb-1">
        {price.onRequest ? (
          <p className="font-display text-2xl font-bold text-[#1A1A1A]">
            On Request
          </p>
        ) : (
          <p className="font-display text-2xl md:text-[26px] font-bold text-[#1A1A1A] leading-none">
            {price.label}
            <span className="font-body text-sm font-semibold text-[#555555]">
              {" "}
              + 5% GST
            </span>
          </p>
        )}
        {price.original ? (
          <p className="mt-1.5 font-body text-xs text-muted-foreground">
            <span className="line-through">{price.original}</span>
            {price.discountPercent ? (
              <span className="ml-2 font-semibold" style={{ color: "#16A34A" }}>
                Save {price.discountPercent}%
              </span>
            ) : null}
          </p>
        ) : null}
      </div>

      <p className="font-body text-[12px] text-muted-foreground mb-4">
        {routeLine}
      </p>

      <ul className="border-t border-b divide-y mb-4" style={{ borderColor: "#E8E8E8" }}>
        {facts.map((f) => (
          <li
            key={f.label}
            className="flex items-baseline justify-between gap-3 py-2.5"
            style={{ borderColor: "#E8E8E8" }}
          >
            <span className="font-body text-[11.5px] text-muted-foreground">
              {f.label}
            </span>
            <span className="font-body text-[12px] font-semibold text-[#1A1A1A] text-right">
              {f.value}
            </span>
          </li>
        ))}
      </ul>

      <Link
        href={bookHref}
        data-ocid={bookOcid}
        className="no-retro block w-full text-center py-3 mb-3 font-body text-xs font-bold uppercase tracking-wide text-[#1A1A1A]"
        style={{ backgroundColor: "#FFC107" }}
      >
        {bookLabel}
      </Link>

      <a
        href={PHONE_HREF}
        data-ocid={`${kind}.fee_call`}
        className="no-retro block w-full text-center py-2.5 mb-5 font-body text-xs font-bold uppercase tracking-wide text-white bg-[#1A1A1A] hover:bg-black transition-colors"
      >
        Call {PHONE_DISPLAY}
      </a>

      <div
        className="p-4"
        style={{ backgroundColor: "#FDF8E7" }}
        data-ocid={`${kind}.fee_whatsapp_form`}
      >
        <p className="font-body text-[12px] font-bold text-[#1A1A1A] mb-3 flex items-center gap-1.5">
          <span aria-hidden>💬</span>
          Get itinerary on WhatsApp
        </p>
        <label className="block mb-2">
          <span className="sr-only">Your name</span>
          <input
            type="text"
            value={nameField}
            onChange={(e) => setNameField(e.target.value)}
            placeholder="Your name"
            className="no-retro w-full px-3 py-2 font-body text-[12.5px] border bg-white outline-none focus:border-[#FFC107]"
            style={{ borderColor: "#E0E0E0" }}
          />
        </label>
        <label className="block mb-3">
          <span className="sr-only">Phone number</span>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone number"
            className="no-retro w-full px-3 py-2 font-body text-[12.5px] border bg-white outline-none focus:border-[#FFC107]"
            style={{ borderColor: "#E0E0E0" }}
          />
        </label>
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          data-ocid={`${kind}.fee_whatsapp_submit`}
          className="no-retro block w-full text-center py-2.5 font-body text-xs font-bold text-white"
          style={{ backgroundColor: "#25D366" }}
        >
          Send on WhatsApp
        </a>
        <p className="font-body text-[10.5px] text-muted-foreground mt-2 text-center">
          For {name}
        </p>
      </div>
    </aside>
  );
}
