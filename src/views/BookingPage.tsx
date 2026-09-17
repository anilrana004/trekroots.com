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
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, MessageCircle, Mountain, Users } from "lucide-react";
import { useMemo, useState } from "react";

function resolveTrip(id: string): { name: string; type: string; slug: string } | null {
  if (!id) return null;

  // Prefixed forms: yatra-slug, stay-slug, trek-slug, package-slug
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

  // Plain slug lookups
  const trek = getTrekBySlug(id);
  if (trek) return { name: trek.name, type: "Trek", slug: trek.slug };
  const yatra = getYatraBySlug(id);
  if (yatra) return { name: yatra.name, type: "Yatra", slug: yatra.slug };
  const pkg = getPackageBySlug(id);
  if (pkg) return { name: pkg.name, type: "Package", slug: pkg.slug };
  const stay = getStayBySlug(id);
  if (stay) return { name: stay.name, type: "Stay", slug: stay.slug };

  // Numeric id lookups
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

  const tripLabel = trip?.name ?? (id ? id.replace(/-/g, " ") : "Himalayan Journey");

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
  };

  return (
    <div className="min-h-screen" style={{ background: "#FAF6F0" }}>
      <section
        className="relative overflow-hidden"
        style={{ background: "#F7F7F7" }}
      >
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 40%, #FFC107 0%, transparent 50%), radial-gradient(circle at 80% 10%, #FFE082 0%, transparent 40%)",
          }}
        />
        <div className="relative max-w-3xl mx-auto px-6 pt-16 pb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-body mb-6 transition-opacity hover:opacity-80"
            style={{ color: "#FFE082" }}
          >
            <ArrowLeft size={15} /> Back to home
          </Link>
          <p
            className="text-xs font-body font-semibold uppercase tracking-widest mb-3"
            style={{ color: "#FFE082" }}
          >
            WhatsApp Enquiry
          </p>
          <h1
            className="font-display text-4xl md:text-5xl font-bold leading-tight mb-3"
            style={{ color: "#FFF8F0" }}
          >
            Plan Your Journey
          </h1>
          <p className="font-body text-base max-w-xl" style={{ color: "rgba(255,248,240,0.7)" }}>
            Share a few details and we&apos;ll reply on WhatsApp with availability,
            pricing, and a tailored itinerary.
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 -mt-6 pb-20 relative z-10">
        <div
          className="rounded-2xl border p-6 md:p-8 shadow-sm"
          style={{
            background: "#FFFDF8",
            borderColor: "#E8D9BC",
          }}
        >
          {trip && (
            <div
              className="flex items-start gap-4 mb-8 p-4 rounded-xl"
              style={{ background: "#F7F7F7" }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                style={{ background: "#FFC107" }}
              >
                <Mountain size={18} color="#fff" />
              </div>
              <div>
                <p
                  className="text-[11px] font-body font-semibold uppercase tracking-wider mb-1"
                  style={{ color: "#FF9A40" }}
                >
                  {trip.type}
                </p>
                <h2
                  className="font-display text-xl font-bold"
                  style={{ color: "#1A1A1A" }}
                >
                  {trip.name}
                </h2>
              </div>
            </div>
          )}

          {!trip && id && (
            <div
              className="mb-8 p-4 rounded-xl text-sm font-body"
              style={{ background: "#F7F7F7", color: "#FF9A40" }}
            >
              Enquiry for: <strong className="capitalize">{tripLabel}</strong>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5" data-ocid="booking.enquiry_form">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <label className="block">
                <span className="block text-xs font-body font-semibold uppercase tracking-wider mb-2" style={{ color: "#FF9A40" }}>
                  Full name *
                </span>
                <input
                  required
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  data-ocid="booking.name"
                  className="w-full px-4 py-3 rounded-xl border font-body text-sm outline-none focus:ring-2 focus:ring-[#FFC107]/30"
                  style={{ borderColor: "#E8D9BC", background: "#fff", color: "#1A1A1A" }}
                  placeholder="Your name"
                />
              </label>
              <label className="block">
                <span className="block text-xs font-body font-semibold uppercase tracking-wider mb-2" style={{ color: "#FF9A40" }}>
                  Phone / WhatsApp *
                </span>
                <input
                  required
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  data-ocid="booking.phone"
                  className="w-full px-4 py-3 rounded-xl border font-body text-sm outline-none focus:ring-2 focus:ring-[#FFC107]/30"
                  style={{ borderColor: "#E8D9BC", background: "#fff", color: "#1A1A1A" }}
                  placeholder="+91 98765 43210"
                />
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <label className="block">
                <span className="block text-xs font-body font-semibold uppercase tracking-wider mb-2" style={{ color: "#FF9A40" }}>
                  Email
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  data-ocid="booking.email"
                  className="w-full px-4 py-3 rounded-xl border font-body text-sm outline-none focus:ring-2 focus:ring-[#FFC107]/30"
                  style={{ borderColor: "#E8D9BC", background: "#fff", color: "#1A1A1A" }}
                  placeholder="you@email.com"
                />
              </label>
              <label className="block">
                <span className="block text-xs font-body font-semibold uppercase tracking-wider mb-2" style={{ color: "#FF9A40" }}>
                  Preferred travel dates
                </span>
                <input
                  type="text"
                  value={travelDates}
                  onChange={(e) => setTravelDates(e.target.value)}
                  data-ocid="booking.dates"
                  className="w-full px-4 py-3 rounded-xl border font-body text-sm outline-none focus:ring-2 focus:ring-[#FFC107]/30"
                  style={{ borderColor: "#E8D9BC", background: "#fff", color: "#1A1A1A" }}
                  placeholder="e.g. 10–18 Oct 2026"
                />
              </label>
            </div>

            <label className="block">
              <span className="block text-xs font-body font-semibold uppercase tracking-wider mb-2" style={{ color: "#FF9A40" }}>
                Group size
              </span>
              <div className="relative">
                <Users
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2"
                  style={{ color: "#FFC107" }}
                />
                <input
                  type="number"
                  min={1}
                  max={50}
                  value={groupSize}
                  onChange={(e) => setGroupSize(e.target.value)}
                  data-ocid="booking.group_size"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border font-body text-sm outline-none focus:ring-2 focus:ring-[#FFC107]/30"
                  style={{ borderColor: "#E8D9BC", background: "#fff", color: "#1A1A1A" }}
                />
              </div>
            </label>

            <label className="block">
              <span className="block text-xs font-body font-semibold uppercase tracking-wider mb-2" style={{ color: "#FF9A40" }}>
                Message
              </span>
              <textarea
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                data-ocid="booking.message"
                className="w-full px-4 py-3 rounded-xl border font-body text-sm outline-none focus:ring-2 focus:ring-[#FFC107]/30 resize-y"
                style={{ borderColor: "#E8D9BC", background: "#fff", color: "#1A1A1A" }}
                placeholder="Tell us about your group, fitness level, or any special requests…"
              />
            </label>

            <button
              type="submit"
              data-ocid="booking.submit_whatsapp"
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-semibold font-body text-white transition-opacity hover:opacity-90"
              style={{ background: "#25D366" }}
            >
              <MessageCircle size={18} />
              Send Enquiry on WhatsApp
            </button>
            <p className="text-center text-xs font-body" style={{ color: "#8A7A6A" }}>
              Opens WhatsApp with your details pre-filled. No payment required.
            </p>
          </form>
        </div>
      </section>
    </div>
  );
}
