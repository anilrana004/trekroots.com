"use client";

import {
  getAllPackages,
  getAllStays,
  getAllTreks,
  getAllYatras,
  getPackageBySlug,
  getStayBySlug,
  getTrekBySlug,
  getYatraBySlug,
  whatsappLink,
} from "@/data";
import { sendEnquiry } from "@/lib/enquiry";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, MessageCircle, Mountain, Users } from "lucide-react";
import { useMemo, useState } from "react";

function resolveTrip(
  id: string,
): { name: string; type: string; slug: string } | null {
  if (!id) return null;

  const prefixMatch = id.match(/^(yatra|stay|trek|package|pkg)-(.+)$/i);
  if (prefixMatch) {
    const kind = prefixMatch[1].toLowerCase();
    const slug = prefixMatch[2];
    if (kind === "yatra") {
      const y = getYatraBySlug(slug);
      if (y) return { name: y.name, type: "Yatra", slug: y.slug };
    }
    if (kind === "stay") {
      const s = getStayBySlug(slug);
      if (s) return { name: s.name, type: "Stay", slug: s.slug };
    }
    if (kind === "trek") {
      const t = getTrekBySlug(slug);
      if (t) return { name: t.name, type: "Trek", slug: t.slug };
    }
    if (kind === "package" || kind === "pkg") {
      const p = getPackageBySlug(slug);
      if (p) return { name: p.name, type: "Package", slug: p.slug };
    }
  }

  const trek = getTrekBySlug(id);
  if (trek) return { name: trek.name, type: "Trek", slug: trek.slug };
  const yatra = getYatraBySlug(id);
  if (yatra) return { name: yatra.name, type: "Yatra", slug: yatra.slug };
  const pkg = getPackageBySlug(id);
  if (pkg) return { name: pkg.name, type: "Package", slug: pkg.slug };
  const stay = getStayBySlug(id);
  if (stay) return { name: stay.name, type: "Stay", slug: stay.slug };

  const num = Number(id);
  if (!Number.isNaN(num) && num > 0) {
    const t = getAllTreks().find((x) => x.id === num);
    if (t) return { name: t.name, type: "Trek", slug: t.slug };
    const y = getAllYatras().find((x) => x.id === num);
    if (y) return { name: y.name, type: "Yatra", slug: y.slug };
    const p = getAllPackages().find((x) => x.id === num);
    if (p) return { name: p.name, type: "Package", slug: p.slug };
    const s = getAllStays().find((x) => x.id === num);
    if (s) return { name: s.name, type: "Stay", slug: s.slug };
  }

  return null;
}

const fieldClass =
  "w-full px-4 py-3 font-body text-sm text-[#1A1A1A] bg-white border border-[#E0E0E0] outline-none focus:border-[#FFC107] transition-colors";

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="block text-[11px] font-body font-bold uppercase tracking-[0.1em] mb-2 text-[#1A1A1A]">
      {children}
    </span>
  );
}

export default function BookingPage() {
  const params = useParams();
  const id = (params.id as string) || "";
  const trip = useMemo(() => resolveTrip(id), [id]);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [travelDates, setTravelDates] = useState("");
  const [groupSize, setGroupSize] = useState("2");
  const [message, setMessage] = useState("");

  const tripLabel =
    trip?.name ?? (id ? id.replace(/-/g, " ") : "Himalayan Journey");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const lines = [
      `Hi TrekRoots! I'd like to enquire about: ${tripLabel}`,
      trip ? `Type: ${trip.type}` : null,
      `Name: ${name}`,
      `Phone: ${phone}`,
      email ? `Email: ${email}` : null,
      travelDates ? `Travel dates: ${travelDates}` : null,
      `Group size: ${groupSize}`,
      message ? `Message: ${message}` : null,
    ].filter(Boolean);

    window.open(whatsappLink(lines.join("\n")), "_blank");

    void sendEnquiry({
      kind: "booking",
      trip: trip ? `${tripLabel} (${trip.type})` : tripLabel,
      name,
      phone,
      email,
      travelDates,
      groupSize,
      message,
    });
  };

  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      <section className="border-b bg-white" style={{ borderColor: "#E8E8E8" }}>
        <div className="max-w-3xl mx-auto px-6 pt-10 pb-8 md:pt-14 md:pb-10">
          <Link
            href={
              trip?.type === "Yatra"
                ? `/yatra/${trip.slug}`
                : trip?.type === "Trek"
                  ? `/treks/${trip.slug}`
                  : "/"
            }
            className="inline-flex items-center gap-1.5 text-sm font-body font-medium text-[#1A1A1A] hover:text-[#FFC107] transition-colors mb-6"
          >
            <ArrowLeft size={15} />
            {trip ? `Back to ${trip.name}` : "Back to home"}
          </Link>

          <p className="font-body text-[11px] font-bold uppercase tracking-[0.16em] text-[#FFC107] mb-2">
            WhatsApp enquiry
          </p>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-[#1A1A1A] leading-tight mb-3">
            Plan Your Journey
          </h1>
          <p className="font-body text-[14px] text-[#555555] max-w-xl leading-relaxed">
            Share a few details and we&apos;ll reply on WhatsApp with
            availability, pricing, and a tailored itinerary.
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-8 md:py-10 pb-20">
        <div
          className="bg-white border p-6 md:p-8"
          style={{ borderColor: "#E8E8E8" }}
        >
          {trip ? (
            <div
              className="flex items-start gap-4 mb-8 p-4 border"
              style={{ borderColor: "#E8E8E8", backgroundColor: "#FAFAFA" }}
            >
              <div
                className="w-10 h-10 flex items-center justify-center shrink-0"
                style={{ backgroundColor: "#FFC107" }}
              >
                <Mountain size={18} className="text-[#1A1A1A]" />
              </div>
              <div>
                <p className="text-[11px] font-body font-bold uppercase tracking-wider mb-1 text-[#888888]">
                  {trip.type}
                </p>
                <h2 className="font-display text-xl font-bold text-[#1A1A1A]">
                  {trip.name}
                </h2>
              </div>
            </div>
          ) : null}

          {!trip && id ? (
            <div
              className="mb-8 p-4 border text-sm font-body text-[#1A1A1A]"
              style={{ borderColor: "#E8E8E8", backgroundColor: "#FAFAFA" }}
            >
              Enquiry for:{" "}
              <strong className="capitalize">{tripLabel}</strong>
            </div>
          ) : null}

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
            data-ocid="booking.enquiry_form"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <label className="block">
                <FieldLabel>Full name *</FieldLabel>
                <input
                  required
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  data-ocid="booking.name"
                  className={fieldClass}
                  placeholder="Your name"
                />
              </label>
              <label className="block">
                <FieldLabel>Phone / WhatsApp *</FieldLabel>
                <input
                  required
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  data-ocid="booking.phone"
                  className={fieldClass}
                  placeholder="+91 98765 43210"
                />
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <label className="block">
                <FieldLabel>Email</FieldLabel>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  data-ocid="booking.email"
                  className={fieldClass}
                  placeholder="you@email.com"
                />
              </label>
              <label className="block">
                <FieldLabel>Preferred travel dates</FieldLabel>
                <input
                  type="text"
                  value={travelDates}
                  onChange={(e) => setTravelDates(e.target.value)}
                  data-ocid="booking.dates"
                  className={fieldClass}
                  placeholder="e.g. 10–18 Oct 2026"
                />
              </label>
            </div>

            <label className="block">
              <FieldLabel>Group size</FieldLabel>
              <div className="relative">
                <Users
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#888888]"
                />
                <input
                  type="number"
                  min={1}
                  max={50}
                  value={groupSize}
                  onChange={(e) => setGroupSize(e.target.value)}
                  data-ocid="booking.group_size"
                  className={`${fieldClass} pl-11`}
                />
              </div>
            </label>

            <label className="block">
              <FieldLabel>Message</FieldLabel>
              <textarea
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                data-ocid="booking.message"
                className={`${fieldClass} resize-y`}
                placeholder="Tell us about your group, fitness level, or any special requests…"
              />
            </label>

            <button
              type="submit"
              data-ocid="booking.submit_whatsapp"
              className="w-full flex items-center justify-center gap-2 py-3.5 font-body text-sm font-bold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#25D366" }}
            >
              <MessageCircle size={18} />
              Send Enquiry on WhatsApp
            </button>
            <p className="text-center text-xs font-body text-[#888888]">
              Opens WhatsApp with your details pre-filled. No payment required.
            </p>
          </form>
        </div>
      </section>
    </div>
  );
}
