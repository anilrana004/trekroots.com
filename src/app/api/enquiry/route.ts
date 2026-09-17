import { NextResponse } from "next/server";

import { CONTACT_EMAIL } from "@/data/contact";
import type { Enquiry, EnquiryKind } from "@/lib/enquiry";

const KINDS: EnquiryKind[] = ["contact", "booking", "newsletter"];

const SUBJECTS: Record<EnquiryKind, string> = {
  contact: "New contact enquiry",
  booking: "New booking enquiry",
  newsletter: "New newsletter signup",
};

/** Resend rejects unverified senders, so this stays overridable per environment. */
const FROM = process.env.ENQUIRY_FROM_EMAIL ?? "TrekRoots <onboarding@resend.dev>";
const TO = process.env.ENQUIRY_TO_EMAIL ?? CONTACT_EMAIL;

function isEnquiry(value: unknown): value is Enquiry {
  if (typeof value !== "object" || value === null) return false;
  const { kind } = value as { kind?: unknown };
  return typeof kind === "string" && KINDS.includes(kind as EnquiryKind);
}

/** Rejects the field values that would let a sender inject extra mail headers. */
function clean(value: string | undefined, limit = 2000): string | undefined {
  const trimmed = value?.replace(/[\r\n]+/g, " ").trim();
  return trimmed ? trimmed.slice(0, limit) : undefined;
}

function body(enquiry: Enquiry): string {
  const rows: [string, string | undefined][] = [
    ["Trip", clean(enquiry.trip, 200)],
    ["Name", clean(enquiry.name, 200)],
    ["Email", clean(enquiry.email, 200)],
    ["Phone", clean(enquiry.phone, 50)],
    ["Interested in", clean(enquiry.interest, 100)],
    ["Travel dates", clean(enquiry.travelDates, 100)],
    ["Group size", clean(enquiry.groupSize, 50)],
  ];

  const lines = rows
    .filter((row): row is [string, string] => Boolean(row[1]))
    .map(([label, value]) => `${label}: ${value}`);

  const message = enquiry.message?.trim().slice(0, 5000);
  if (message) lines.push("", "Message:", message);

  return lines.join("\n");
}

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  if (!isEnquiry(payload)) {
    return NextResponse.json({ error: "Invalid enquiry." }, { status: 400 });
  }

  const email = clean(payload.email, 200);
  if (payload.kind === "newsletter" && !email) {
    return NextResponse.json(
      { error: "An email address is required." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Email delivery is not configured yet." },
      { status: 503 },
    );
  }

  const name = clean(payload.name, 200);
  const subject = name
    ? `${SUBJECTS[payload.kind]} — ${name}`
    : SUBJECTS[payload.kind];

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM,
      to: [TO],
      subject,
      text: body(payload),
      // Lets the team reply straight to the traveller from their inbox.
      ...(email ? { reply_to: email } : {}),
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    console.error("Enquiry email failed:", res.status, detail);
    return NextResponse.json(
      { error: "We could not send your enquiry. Please try WhatsApp." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
