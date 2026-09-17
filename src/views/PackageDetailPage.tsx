"use client";

import {
  CONTACT_EMAIL,
  CONTACT_EMAIL_HREF,
  getPackageBySlug,
  PHONE_DISPLAY,
  PHONE_HREF,
  whatsappLink,
} from "@/data";
import { tripPrice } from "@/lib/price";
import Link from "next/link";
import { useParams } from "next/navigation";
import { CloudinaryImage } from "@/components/CloudinaryImage";
import {
  ArrowRight,
  BedDouble,
  Calendar,
  Check,
  ChevronDown,
  Clock,
  IndianRupee,
  Mail,
  MapPin,
  MessageCircle,
  Mountain,
  Phone,
  Shield,
  Star,
  Users,
  Utensils,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "itinerary", label: "Itinerary" },
  { id: "inclusions", label: "Inclusions" },
  { id: "accommodation", label: "Accommodation" },
  { id: "pricing", label: "Price Breakdown" },
  { id: "reviews", label: "Reviews" },
  { id: "faq", label: "FAQ" },
  { id: "book", label: "Book Now" },
] as const;

const SAMPLE_REVIEWS = [
  {
    name: "Rahul Sharma",
    location: "Delhi",
    rating: 5,
    date: "March 2026",
    text: "An absolutely seamless experience from start to finish. The team handled every detail and the trek was magical.",
  },
  {
    name: "Priya Patel",
    location: "Mumbai",
    rating: 5,
    date: "February 2026",
    text: "Best Himalayan experience we've had as a family. The guides were knowledgeable and the accommodation was cozy.",
  },
  {
    name: "Arjun Mehta",
    location: "Bangalore",
    rating: 4,
    date: "January 2026",
    text: "Great value for money. The itinerary was well-paced and the food was surprisingly good at altitude.",
  },
  {
    name: "Sneha Gupta",
    location: "Pune",
    rating: 5,
    date: "December 2025",
    text: "Solo female traveller and felt completely safe. The women-only group was supportive and fun.",
  },
];

const SAMPLE_FAQS = [
  {
    q: "What is the cancellation policy?",
    a: "Full refund if cancelled 30 days before departure. 50% refund for 15-30 days. No refund within 15 days, but you can reschedule once.",
  },
  {
    q: "Is travel insurance included?",
    a: "Travel insurance is not included by default but can be added as an optional add-on during booking. We strongly recommend it for all high-altitude treks.",
  },
  {
    q: "What fitness level is required?",
    a: "Most packages require a basic level of fitness — ability to walk 5-7 km comfortably. Difficult treks require prior high-altitude experience.",
  },
  {
    q: "Are meals included?",
    a: "Yes, all meals from Day 1 dinner to the last day breakfast are included. We serve vegetarian and non-vegetarian options with local Himalayan flavours.",
  },
  {
    q: "Can I customize the itinerary?",
    a: "Absolutely. Contact us via WhatsApp or email and our team will tailor the package to your preferences, group size, and dates.",
  },
  {
    q: "What is the group size?",
    a: "Group sizes vary by package — typically 8-20 people for standard departures. Private groups can be arranged for 4+ travellers.",
  },
];

const HIGHLIGHT_ICONS: Record<string, React.ReactNode> = {
  Expert: <Shield size={16} />,
  Guide: <Users size={16} />,
  Meals: <Utensils size={16} />,
  Accommodation: <BedDouble size={16} />,
  Transport: <MapPin size={16} />,
  Safety: <Shield size={16} />,
};

function getHighlightIcon(text: string) {
  for (const key of Object.keys(HIGHLIGHT_ICONS)) {
    if (text.toLowerCase().includes(key.toLowerCase())) {
      return HIGHLIGHT_ICONS[key];
    }
  }
  return <Mountain size={16} />;
}

export default function PackageDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const pkg = getPackageBySlug(slug);
  const isLoading = false;
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [openDay, setOpenDay] = useState<number | null>(0);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  useEffect(() => {
    const onScroll = () => {
      const offsets = TABS.map((t) => {
        const el = sectionRefs.current[t.id];
        return {
          id: t.id,
          top: el ? el.offsetTop - 120 : Number.POSITIVE_INFINITY,
        };
      });
      const current = offsets
        .filter((o) => o.top <= window.scrollY)
        .sort((a, b) => b.top - a.top)[0];
      if (current) setActiveTab(current.id);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = sectionRefs.current[id];
    if (el) {
      window.scrollTo({ top: el.offsetTop - 100, behavior: "smooth" });
      setActiveTab(id);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!pkg) {
    return (
      <div className="container mx-auto px-4 py-12">
        <p className="text-muted-foreground font-body">Package not found.</p>
      </div>
    );
  }

  const min = Number(pkg.priceRange.minINR);
  const max = Number(pkg.priceRange.maxINR);
  const minPrice = min.toLocaleString("en-IN");
  const maxPrice = max.toLocaleString("en-IN");
  const onRequest = min <= 0;
  const price = tripPrice(pkg.priceRange);
  const hasTiers = pkg.tiers && pkg.tiers.length > 0;
  const faqItems = pkg.faqs && pkg.faqs.length > 0 ? pkg.faqs : SAMPLE_FAQS;
  const packingSections = pkg.packing ?? [];
  const howToReachSections = pkg.howToReach ?? [];
  const policySections = pkg.policies ?? [];

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-primary)" }}>
      {/* Hero */}
      <section className="relative h-[75vh] min-h-[520px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          {pkg.imageUrl ? (
            <CloudinaryImage
              src={pkg.imageUrl}
              alt={pkg.name}
              width={1920}
              height={1080}
              priority
              sizes="100vw"
              className="w-full h-full object-cover"
              transform={{
                width: 1920,
                height: 1080,
                crop: "fill",
                gravity: "auto",
                quality: "auto:good",
              }}
            />
          ) : (
            <div
              className="w-full h-full"
              style={{ background: "var(--bg-tertiary)" }}
            />
          )}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(20,8,8,0.78) 100%)",
            }}
          />
        </div>
        <div className="relative w-full max-w-[1400px] mx-auto px-6 pb-14 md:pb-20">
          <nav className="flex items-center gap-2 text-white/60 text-xs font-body mb-5">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/packages" className="hover:text-white transition-colors">
              Packages
            </Link>
            <span>/</span>
            <span className="text-white/90">{pkg.name}</span>
          </nav>
          <span
            className="inline-block px-3 py-1 text-xs font-body font-semibold mb-4 rounded-full"
            style={{ background: "var(--accent-orange)", color: "#fff" }}
          >
            {pkg.category} Package
          </span>
          <h1 className="font-display italic text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-white leading-tight mb-5 max-w-3xl">
            {pkg.name}
          </h1>
          <div className="flex flex-wrap items-center gap-3 mb-6">
            {(
              [
                { icon: <Clock size={14} />, text: pkg.duration },
                { icon: <Users size={14} />, text: pkg.groupSize },
                { icon: <BedDouble size={14} />, text: pkg.accommodationType },
                { icon: <IndianRupee size={14} />, text: `From ₹${minPrice}` },
              ] as { icon: React.ReactNode; text: string }[]
            ).map(({ icon, text }) => (
              <span
                key={text}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-white text-xs font-body"
                style={{
                  background: "rgba(255,255,255,0.15)",
                  backdropFilter: "blur(4px)",
                }}
              >
                {icon} {text}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Problem Solved Callout */}
      <section
        style={{
          background: "var(--bg-secondary)",
          borderBottom: "1px solid var(--border-light)",
        }}
      >
        <div className="w-full max-w-[1400px] mx-auto px-6 py-8">
          <div
            className="rounded-2xl p-6 md:p-8 max-w-4xl"
            style={{
              background: "var(--bg-primary)",
              border: "1px solid var(--border-light)",
            }}
          >
            <p
              className="text-[10px] font-body font-semibold uppercase tracking-[0.15em] mb-2"
              style={{ color: "var(--brand-secondary)" }}
            >
              Why this trip is perfect for you
            </p>
            <p
              className="font-display italic text-xl md:text-2xl leading-relaxed"
              style={{ color: "var(--text-primary)" }}
            >
              “{pkg.problemSolved}”
            </p>
          </div>
        </div>
      </section>

      {/* Sticky Tab Nav */}
      <nav
        className="detail-section-nav backdrop-blur-sm"
        style={{
          background: "rgba(250,250,247,0.96)",
          borderBottom: "1px solid var(--border-light)",
        }}
      >
        <div className="w-full max-w-[1400px] mx-auto px-6">
          <div className="flex items-center gap-1 overflow-x-auto hide-scrollbar py-2.5">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                data-ocid={`package.tab.${tab.id}`}
                onClick={() => scrollTo(tab.id)}
                className="px-4 py-2 rounded-lg text-xs font-body font-medium whitespace-nowrap transition-colors"
                style={{
                  background:
                    activeTab === tab.id
                      ? tab.id === "book"
                        ? "var(--brand-primary)"
                        : "rgba(0,0,0,0.08)"
                      : "transparent",
                  color:
                    activeTab === tab.id
                      ? tab.id === "book"
                        ? "#fff"
                        : "var(--brand-primary)"
                      : "var(--text-muted)",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="w-full max-w-[1400px] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column */}
          <div className="lg:col-span-8 space-y-16">
            {/* Overview */}
            <section
              ref={(el) => {
                sectionRefs.current.overview = el;
              }}
              id="overview"
            >
              <h2
                className="font-display italic text-2xl md:text-3xl font-bold mb-5"
                style={{ color: "var(--text-primary)" }}
              >
                Overview
              </h2>
              <p
                className="font-body leading-relaxed mb-8 text-base"
                style={{ color: "var(--text-secondary)" }}
              >
                {pkg.description}
              </p>
              {pkg.inclusions.length > 0 && (
                <>
                  <h3
                    className="font-display text-lg font-semibold mb-4"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Package Highlights
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {pkg.inclusions.slice(0, 8).map((h) => (
                      <div
                        key={h}
                        className="flex items-start gap-3 p-3.5 rounded-xl"
                        style={{
                          background: "var(--bg-secondary)",
                          border: "1px solid var(--border-light)",
                        }}
                      >
                        <span
                          className="mt-0.5 shrink-0"
                          style={{ color: "var(--brand-secondary)" }}
                        >
                          {getHighlightIcon(h)}
                        </span>
                        <span
                          className="text-sm font-body"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {h}
                        </span>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* Tier Pricing Cards */}
              {hasTiers && (
                <div className="mt-8">
                  <h3
                    className="font-display text-lg font-semibold mb-4"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Choose Your Experience
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {(pkg.tiers ?? []).map((tier, ti) => (
                      <div
                        key={tier.name}
                        className="rounded-2xl p-5 text-center"
                        style={{
                          background:
                            ti === 1
                              ? "var(--brand-primary)"
                              : "var(--bg-secondary)",
                          border:
                            ti === 1 ? "none" : "1px solid var(--border-light)",
                          color: ti === 1 ? "#fff" : "var(--text-primary)",
                        }}
                      >
                        {ti === 1 && (
                          <span
                            className="inline-block px-2 py-0.5 rounded-full text-[10px] font-body font-semibold mb-2"
                            style={{
                              background: "var(--accent-orange)",
                              color: "#fff",
                            }}
                          >
                            MOST POPULAR
                          </span>
                        )}
                        <p
                          className="font-body font-semibold text-sm mb-1"
                          style={{
                            color:
                              ti === 1
                                ? "rgba(255,255,255,0.7)"
                                : "var(--text-muted)",
                          }}
                        >
                          {tier.name}
                        </p>
                        <p
                          className="font-mono text-2xl font-bold"
                          style={{
                            color: ti === 1 ? "#fff" : "var(--brand-secondary)",
                          }}
                        >
                          ₹{Number(tier.pricePerPerson).toLocaleString("en-IN")}
                        </p>
                        <p
                          className="text-xs font-body mt-0.5"
                          style={{
                            color:
                              ti === 1
                                ? "rgba(255,255,255,0.6)"
                                : "var(--text-muted)",
                          }}
                        >
                          per person
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>

            {/* Itinerary */}
            <section
              ref={(el) => {
                sectionRefs.current.itinerary = el;
              }}
              id="itinerary"
            >
              <h2
                className="font-display italic text-2xl md:text-3xl font-bold mb-6"
                style={{ color: "var(--text-primary)" }}
              >
                Day-by-Day Itinerary
              </h2>
              <div className="space-y-3">
                {pkg.itinerary.map((day, i) => (
                  <div
                    key={`day-${Number(day.day)}`}
                    className="rounded-xl overflow-hidden"
                    style={{
                      border: "1px solid var(--border-light)",
                      background: "var(--bg-secondary)",
                    }}
                  >
                    <button
                      type="button"
                      data-ocid={`package.itinerary.day.${i + 1}`}
                      onClick={() => setOpenDay(openDay === i ? null : i)}
                      className="w-full flex items-center justify-between p-4 text-left transition-colors"
                      style={{
                        background:
                          openDay === i ? "var(--bg-tertiary)" : undefined,
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className="flex items-center justify-center w-8 h-8 rounded-full text-xs font-mono font-semibold shrink-0 text-white"
                          style={{ background: "var(--brand-primary)" }}
                        >
                          {Number(day.day)}
                        </span>
                        <div>
                          <p
                            className="font-display font-semibold text-sm md:text-base"
                            style={{ color: "var(--text-primary)" }}
                          >
                            {day.title}
                          </p>
                          <p
                            className="text-xs font-body mt-0.5"
                            style={{ color: "var(--text-muted)" }}
                          >
                            {day.route} · {day.distanceKm} km
                          </p>
                        </div>
                      </div>
                      <ChevronDown
                        size={18}
                        style={{
                          color:
                            openDay === i
                              ? "var(--brand-secondary)"
                              : "var(--text-muted)",
                        }}
                        className={`transition-transform ${openDay === i ? "rotate-180" : ""}`}
                      />
                    </button>
                    {openDay === i && (
                      <div
                        className="px-4 pb-4"
                        style={{ borderTop: "1px solid var(--border-light)" }}
                      >
                        <div
                          className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-body"
                          style={{ color: "var(--text-muted)" }}
                        >
                          <div>
                            <span className="block text-[10px] uppercase tracking-wider mb-0.5">
                              Start Alt
                            </span>
                            {day.startAltitudeM} m
                          </div>
                          <div>
                            <span className="block text-[10px] uppercase tracking-wider mb-0.5">
                              End Alt
                            </span>
                            {day.endAltitudeM} m
                          </div>
                          <div>
                            <span className="block text-[10px] uppercase tracking-wider mb-0.5">
                              Difficulty
                            </span>
                            {day.difficulty}
                          </div>
                          <div>
                            <span className="block text-[10px] uppercase tracking-wider mb-0.5">
                              Meals
                            </span>
                            {day.mealsIncluded}
                          </div>
                        </div>
                        <p
                          className="mt-3 text-sm font-body leading-relaxed"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          {day.description}
                        </p>
                        {day.landmarks.length > 0 && (
                          <div className="mt-3 flex flex-wrap gap-2">
                            {day.landmarks.map((lm) => (
                              <span
                                key={`lm-${lm}`}
                                className="px-2 py-0.5 rounded-full text-xs font-body"
                                style={{
                                  background: "var(--bg-tertiary)",
                                  color: "var(--text-secondary)",
                                  border: "1px solid var(--border-light)",
                                }}
                              >
                                {lm}
                              </span>
                            ))}
                          </div>
                        )}
                        <p
                          className="mt-2 text-xs font-body"
                          style={{ color: "var(--text-muted)" }}
                        >
                          <BedDouble size={12} className="inline mr-1" />
                          Stay: {day.campsite}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Inclusions & Exclusions */}
            <section
              ref={(el) => {
                sectionRefs.current.inclusions = el;
              }}
              id="inclusions"
            >
              <h2
                className="font-display italic text-2xl md:text-3xl font-bold mb-6"
                style={{ color: "var(--text-primary)" }}
              >
                Inclusions & Exclusions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div
                  className="rounded-xl p-5"
                  style={{
                    background: "var(--bg-secondary)",
                    border: "1px solid var(--border-light)",
                  }}
                >
                  <h3
                    className="font-display font-semibold mb-4 flex items-center gap-2"
                    style={{ color: "var(--text-primary)" }}
                  >
                    <Check size={18} style={{ color: "#16a34a" }} /> What's
                    Included
                  </h3>
                  <ul className="space-y-2.5">
                    {pkg.inclusions.map((inc) => (
                      <li
                        key={inc}
                        className="flex items-start gap-2 text-sm font-body"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        <Check
                          size={14}
                          className="mt-0.5 shrink-0"
                          style={{ color: "#16a34a" }}
                        />
                        {inc}
                      </li>
                    ))}
                  </ul>
                </div>
                <div
                  className="rounded-xl p-5"
                  style={{
                    background: "var(--bg-secondary)",
                    border: "1px solid var(--border-light)",
                  }}
                >
                  <h3
                    className="font-display font-semibold mb-4 flex items-center gap-2"
                    style={{ color: "var(--text-primary)" }}
                  >
                    <X size={18} style={{ color: "#dc2626" }} /> Not Included
                  </h3>
                  <ul className="space-y-2.5">
                    {pkg.exclusions.map((exc) => (
                      <li
                        key={exc}
                        className="flex items-start gap-2 text-sm font-body"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        <X
                          size={14}
                          className="mt-0.5 shrink-0"
                          style={{ color: "#dc2626" }}
                        />
                        {exc}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Accommodation */}
            <section
              ref={(el) => {
                sectionRefs.current.accommodation = el;
              }}
              id="accommodation"
            >
              <h2
                className="font-display italic text-2xl md:text-3xl font-bold mb-4"
                style={{ color: "var(--text-primary)" }}
              >
                Accommodation
              </h2>
              <div
                className="rounded-xl p-6"
                style={{
                  background: "var(--bg-secondary)",
                  border: "1px solid var(--border-light)",
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <BedDouble
                    size={22}
                    style={{ color: "var(--brand-secondary)" }}
                  />
                  <h3
                    className="font-display font-semibold text-lg"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {pkg.accommodationType}
                  </h3>
                </div>
                <p
                  className="font-body leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  All accommodation is carefully selected and personally
                  inspected by the Manya team. Depending on the package tier,
                  you will stay in comfortable guesthouses, alpine camps, and
                  boutique mountain lodges. Every property includes clean
                  bedding, hot water (where available), and wholesome Himalayan
                  meals.
                </p>
                <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    { icon: "🛏️", label: "Clean Bedding" },
                    { icon: "🚿", label: "Hot Water" },
                    { icon: "🔥", label: "Heating" },
                    { icon: "🍽️", label: "Meals Included" },
                    { icon: "🏠", label: "Local Hosts" },
                    { icon: "📶", label: "WiFi (where available)" },
                  ].map((a) => (
                    <div
                      key={a.label}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-body"
                      style={{
                        background: "var(--bg-tertiary)",
                        color: "var(--text-secondary)",
                        border: "1px solid var(--border-light)",
                      }}
                    >
                      <span>{a.icon}</span>
                      <span>{a.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Pricing Breakdown */}
            <section
              ref={(el) => {
                sectionRefs.current.pricing = el;
              }}
              id="pricing"
            >
              <h2
                className="font-display italic text-2xl md:text-3xl font-bold mb-4"
                style={{ color: "var(--text-primary)" }}
              >
                Price Breakdown
              </h2>
              <div
                className="rounded-xl overflow-hidden"
                style={{ border: "1px solid var(--border-light)" }}
              >
                <div className="overflow-x-auto">
                  <table className="w-full text-sm font-body">
                    <thead>
                      <tr
                        style={{
                          background: "var(--bg-secondary)",
                          borderBottom: "1px solid var(--border-light)",
                        }}
                      >
                        <th
                          className="text-left py-3 px-5 font-semibold"
                          style={{ color: "var(--text-primary)" }}
                        >
                          Item
                        </th>
                        <th
                          className="text-right py-3 px-5 font-semibold"
                          style={{ color: "var(--text-primary)" }}
                        >
                          Cost (per person)
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        style={{
                          background: "var(--bg-primary)",
                          borderBottom: "1px solid var(--border-light)",
                        }}
                      >
                        <td
                          className="py-3 px-5"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          Base Package
                        </td>
                        <td
                          className="text-right py-3 px-5 font-mono"
                          style={{ color: "var(--brand-secondary)" }}
                        >
                          {onRequest ? "On Request" : `₹${minPrice}`}
                        </td>
                      </tr>
                      <tr
                        style={{
                          background: "var(--bg-secondary)",
                          borderBottom: "1px solid var(--border-light)",
                        }}
                      >
                        <td
                          className="py-3 px-5"
                          style={{ color: "var(--text-muted)" }}
                        >
                          Travel Insurance{" "}
                          <span className="text-xs">(optional)</span>
                        </td>
                        <td
                          className="text-right py-3 px-5 font-mono"
                          style={{ color: "var(--text-muted)" }}
                        >
                          + ₹500
                        </td>
                      </tr>
                      <tr
                        style={{
                          background: "var(--bg-primary)",
                          borderBottom: "1px solid var(--border-light)",
                        }}
                      >
                        <td
                          className="py-3 px-5"
                          style={{ color: "var(--text-muted)" }}
                        >
                          Airport/Station Pickup{" "}
                          <span className="text-xs">(optional)</span>
                        </td>
                        <td
                          className="text-right py-3 px-5 font-mono"
                          style={{ color: "var(--text-muted)" }}
                        >
                          + ₹2,500
                        </td>
                      </tr>
                      <tr
                        style={{
                          background: "var(--bg-secondary)",
                          borderBottom: "1px solid var(--border-light)",
                        }}
                      >
                        <td
                          className="py-3 px-5"
                          style={{ color: "var(--text-muted)" }}
                        >
                          Single Room Supplement{" "}
                          <span className="text-xs">(optional)</span>
                        </td>
                        <td
                          className="text-right py-3 px-5 font-mono"
                          style={{ color: "var(--text-muted)" }}
                        >
                          + ₹3,000
                        </td>
                      </tr>
                      <tr style={{ background: "var(--bg-tertiary)" }}>
                        <td
                          className="py-4 px-5 font-semibold"
                          style={{ color: "var(--text-primary)" }}
                        >
                          Total (with all add-ons)
                        </td>
                        <td
                          className="text-right py-4 px-5 font-mono font-bold"
                          style={{
                            color: "var(--brand-primary)",
                            fontSize: "1.05rem",
                          }}
                        >
                          ₹{maxPrice}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div
                  className="px-5 py-3 text-xs font-body"
                  style={{
                    background: "var(--bg-primary)",
                    color: "var(--text-muted)",
                    borderTop: "1px solid var(--border-light)",
                  }}
                >
                  * All prices include GST. Group discounts available for 6+
                  travellers.
                </div>
              </div>
            </section>

            {/* Reviews */}
            <section
              ref={(el) => {
                sectionRefs.current.reviews = el;
              }}
              id="reviews"
            >
              <div className="flex items-end justify-between mb-6">
                <h2
                  className="font-display italic text-2xl md:text-3xl font-bold"
                  style={{ color: "var(--text-primary)" }}
                >
                  Traveller Reviews
                </h2>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        size={15}
                        style={{
                          color: "var(--brand-gold)",
                          fill: "var(--brand-gold)",
                        }}
                      />
                    ))}
                  </div>
                  <span
                    className="text-sm font-body font-semibold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    4.9
                  </span>
                  <span
                    className="text-xs font-body"
                    style={{ color: "var(--text-muted)" }}
                  >
                    (2,400+)
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {SAMPLE_REVIEWS.map((r) => (
                  <div
                    key={r.name}
                    className="rounded-xl p-5"
                    style={{
                      background: "var(--bg-secondary)",
                      border: "1px solid var(--border-light)",
                    }}
                  >
                    <div className="flex items-center gap-0.5 mb-3">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          size={13}
                          style={
                            s <= r.rating
                              ? {
                                  color: "var(--brand-gold)",
                                  fill: "var(--brand-gold)",
                                }
                              : { color: "var(--border-medium)" }
                          }
                        />
                      ))}
                    </div>
                    <p
                      className="text-sm leading-relaxed italic"
                      style={{
                        color: "var(--text-secondary)",
                        fontFamily: "'Playfair Display', serif",
                      }}
                    >
                      “{r.text}”
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <div>
                        <p
                          className="text-sm font-semibold font-body"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {r.name}
                        </p>
                        <p
                          className="text-xs font-body"
                          style={{ color: "var(--text-muted)" }}
                        >
                          {r.location}
                        </p>
                      </div>
                      <span
                        className="text-xs font-body"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {r.date}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {packingSections.length > 0 && (
              <section id="packing" className="scroll-mt-28">
                <h2
                  className="font-display italic text-2xl md:text-3xl font-bold mb-6"
                  style={{ color: "var(--text-primary)" }}
                >
                  What to Pack
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {packingSections.map((sec) => (
                    <div
                      key={sec.label}
                      className="rounded-xl p-4"
                      style={{
                        background: "var(--bg-secondary)",
                        border: "1px solid var(--border-light)",
                      }}
                    >
                      <h3
                        className="font-body font-semibold text-sm mb-2"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {sec.label}
                      </h3>
                      <ul className="space-y-1.5">
                        {sec.items.map((item) => (
                          <li
                            key={item}
                            className="text-sm font-body"
                            style={{ color: "var(--text-secondary)" }}
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {howToReachSections.length > 0 && (
              <section id="how-to-reach" className="scroll-mt-28">
                <h2
                  className="font-display italic text-2xl md:text-3xl font-bold mb-6"
                  style={{ color: "var(--text-primary)" }}
                >
                  How to Reach
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {howToReachSections.map((section) => (
                    <div
                      key={section.title}
                      className="rounded-xl p-4"
                      style={{
                        background: "var(--bg-secondary)",
                        border: "1px solid var(--border-light)",
                      }}
                    >
                      <h3
                        className="font-body font-semibold text-sm mb-2"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {section.title}
                      </h3>
                      <ol className="space-y-2 list-decimal list-inside">
                        {section.steps.map((step) => (
                          <li
                            key={step}
                            className="text-sm font-body"
                            style={{ color: "var(--text-secondary)" }}
                          >
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {policySections.length > 0 && (
              <section id="policies" className="scroll-mt-28">
                <h2
                  className="font-display italic text-2xl md:text-3xl font-bold mb-6"
                  style={{ color: "var(--text-primary)" }}
                >
                  Booking Terms
                </h2>
                <div className="grid sm:grid-cols-3 gap-4">
                  {policySections.map((policy) => (
                    <div
                      key={policy.title}
                      className="rounded-xl p-4"
                      style={{
                        background: "var(--bg-secondary)",
                        border: "1px solid var(--border-light)",
                      }}
                    >
                      <h3
                        className="font-body font-semibold text-sm mb-2"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {policy.title}
                      </h3>
                      <ul className="space-y-1.5">
                        {policy.items.map((item) => (
                          <li
                            key={item}
                            className="text-xs font-body leading-relaxed"
                            style={{ color: "var(--text-secondary)" }}
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* FAQ */}
            <section
              ref={(el) => {
                sectionRefs.current.faq = el;
              }}
              id="faq"
            >
              <h2
                className="font-display italic text-2xl md:text-3xl font-bold mb-6"
                style={{ color: "var(--text-primary)" }}
              >
                Frequently Asked Questions
              </h2>
              <div className="space-y-3">
                {faqItems.map((faq, idx) => (
                  <div
                    key={faq.q}
                    className="rounded-xl overflow-hidden"
                    style={{
                      border: "1px solid var(--border-light)",
                      background: "var(--bg-secondary)",
                    }}
                  >
                    <button
                      type="button"
                      data-ocid={`package.faq.${idx + 1}`}
                      onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                      className="w-full flex items-center justify-between p-4 text-left transition-colors"
                      style={{
                        background:
                          openFaq === idx ? "var(--bg-tertiary)" : undefined,
                      }}
                    >
                      <span
                        className="font-body font-medium text-sm pr-4"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {faq.q}
                      </span>
                      <ChevronDown
                        size={18}
                        className={`shrink-0 transition-transform ${openFaq === idx ? "rotate-180" : ""}`}
                        style={{
                          color:
                            openFaq === idx
                              ? "var(--brand-secondary)"
                              : "var(--text-muted)",
                        }}
                      />
                    </button>
                    {openFaq === idx && (
                      <div
                        className="px-4 pb-4"
                        style={{ borderTop: "1px solid var(--border-light)" }}
                      >
                        <p
                          className="mt-3 text-sm font-body leading-relaxed"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          {faq.a}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Book Now Section */}
            <section
              ref={(el) => {
                sectionRefs.current.book = el;
              }}
              id="book"
            >
              <div
                className="rounded-2xl p-7 md:p-10 text-center"
                style={{ background: "var(--brand-primary)" }}
              >
                <p
                  className="text-[10px] font-body font-semibold uppercase tracking-[0.18em] mb-3"
                  style={{ color: "var(--accent-orange)" }}
                >
                  Reserve Your Spot
                </p>
                <h2 className="font-display italic text-2xl md:text-3xl font-bold text-white mb-3">
                  Ready for your Himalayan journey?
                </h2>
                <p className="font-body mb-1 text-white/75">
                  From {onRequest ? "On Request" : `₹${minPrice}`} per person ·{" "}
                  {pkg.duration}
                </p>
                <p className="font-body text-white/60 mb-7 max-w-lg mx-auto text-sm">
                  Secure your spot today. Limited group sizes ensure an
                  intimate, personalised experience.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Link
                    href={`/booking/${String(pkg.id) }`}
                    data-ocid="package.book_button"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg font-body font-semibold text-white transition-opacity hover:opacity-90"
                    style={{ background: "var(--accent-orange)" }}
                  >
                    Book This Package <ArrowRight size={16} />
                  </Link>
                  <a
                    href={whatsappLink(`Hi TrekRoots! I'm interested in the ${pkg.name} package.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-ocid="package.whatsapp_button"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg font-body font-medium text-white"
                    style={{
                      background: "rgba(255,255,255,0.12)",
                      border: "1px solid rgba(255,255,255,0.2)",
                    }}
                  >
                    <MessageCircle size={16} /> Chat on WhatsApp
                  </a>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column — Sticky Sidebar */}
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-[140px] space-y-4">
              {/* Price Card */}
              <div
                className="rounded-xl p-5"
                style={{
                  background: "var(--bg-secondary)",
                  border: "1px solid var(--border-light)",
                }}
              >
                <p
                  className="text-[10px] font-body font-semibold uppercase tracking-[0.15em] mb-1"
                  style={{ color: "var(--text-muted)" }}
                >
                  Starting From
                </p>
                <div className="flex items-baseline gap-2">
                  <p
                    className="font-mono text-3xl font-bold"
                    style={{ color: "var(--brand-secondary)" }}
                  >
                    {price.label}
                  </p>
                  {price.original && (
                    <span
                      className="font-mono text-base line-through"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {price.original}
                    </span>
                  )}
                </div>
                {price.discountPercent ? (
                  <p
                    className="text-xs font-body font-semibold mt-0.5"
                    style={{ color: "#16A34A" }}
                  >
                    Save {price.discountPercent}% · limited batches
                  </p>
                ) : null}
                <p
                  className="text-xs font-body mt-0.5"
                  style={{ color: "var(--text-muted)" }}
                >
                  {price.onRequest
                    ? "Contact for current pricing"
                    : "per person · 5% GST extra"}
                </p>

                {hasTiers && (
                  <div className="mt-4 space-y-2">
                    <p
                      className="text-[10px] font-semibold font-body uppercase tracking-[0.15em]"
                      style={{ color: "var(--text-muted)" }}
                    >
                      Package Tiers
                    </p>
                    {(pkg.tiers ?? []).map((tier, ti) => (
                      <div
                        key={tier.name}
                        className="flex items-center justify-between p-3 rounded-lg"
                        style={{
                          background:
                            ti === 1
                              ? "var(--brand-primary)"
                              : "var(--bg-tertiary)",
                          border:
                            ti === 1 ? "none" : "1px solid var(--border-light)",
                        }}
                      >
                        <div>
                          {ti === 1 && (
                            <span
                              className="block text-[9px] font-body font-bold uppercase tracking-wider mb-0.5"
                              style={{ color: "var(--accent-orange)" }}
                            >
                              Popular
                            </span>
                          )}
                          <span
                            className="text-sm font-body"
                            style={{
                              color:
                                ti === 1
                                  ? "rgba(255,255,255,0.85)"
                                  : "var(--text-secondary)",
                            }}
                          >
                            {tier.name}
                          </span>
                        </div>
                        <span
                          className="text-sm font-mono font-bold"
                          style={{
                            color: ti === 1 ? "#fff" : "var(--brand-secondary)",
                          }}
                        >
                          ₹{Number(tier.pricePerPerson).toLocaleString("en-IN")}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                <div
                  className="mt-4 space-y-2 text-sm font-body"
                  style={{ color: "var(--text-muted)" }}
                >
                  <div className="flex items-center gap-2">
                    <Users
                      size={15}
                      style={{ color: "var(--brand-primary)" }}
                    />
                    Group size: {pkg.groupSize}
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar
                      size={15}
                      style={{ color: "var(--brand-primary)" }}
                    />
                    Duration: {pkg.duration}
                  </div>
                  <div className="flex items-center gap-2">
                    <BedDouble
                      size={15}
                      style={{ color: "var(--brand-primary)" }}
                    />
                    {pkg.accommodationType}
                  </div>
                </div>

                <Link
                  href={`/booking/${String(pkg.id) }`}
                  data-ocid="package.sidebar_book_button"
                  className="mt-5 block w-full text-center px-4 py-3 rounded-lg text-white font-body font-semibold transition-opacity hover:opacity-90"
                  style={{ background: "var(--brand-primary)" }}
                >
                  Book This Package
                </Link>
                <a
                  href={whatsappLink(`Hi TrekRoots! I'm interested in the ${pkg.name} package.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ocid="package.sidebar_whatsapp_button"
                  className="mt-2 block w-full text-center px-4 py-3 rounded-lg font-body font-medium transition-colors"
                  style={{
                    border: "1px solid var(--border-medium)",
                    color: "var(--text-secondary)",
                  }}
                >
                  <MessageCircle size={16} className="inline mr-1.5" />
                  WhatsApp Enquiry
                </a>
              </div>

              {/* Trust Card */}
              <div
                className="rounded-xl p-5"
                style={{
                  background: "var(--bg-secondary)",
                  border: "1px solid var(--border-light)",
                }}
              >
                <p
                  className="text-[10px] font-semibold font-body uppercase tracking-[0.15em] mb-3"
                  style={{ color: "var(--text-muted)" }}
                >
                  Why Book With Manya
                </p>
                <ul
                  className="space-y-2.5 text-sm font-body"
                  style={{ color: "var(--text-secondary)" }}
                >
                  <li className="flex items-start gap-2">
                    <Shield
                      size={15}
                      className="mt-0.5 shrink-0"
                      style={{ color: "var(--brand-secondary)" }}
                    />
                    Expert local guides with 10+ years experience
                  </li>
                  <li className="flex items-start gap-2">
                    <Check
                      size={15}
                      className="mt-0.5 shrink-0"
                      style={{ color: "var(--brand-secondary)" }}
                    />
                    All permits and forest fees handled
                  </li>
                  <li className="flex items-start gap-2">
                    <Users
                      size={15}
                      className="mt-0.5 shrink-0"
                      style={{ color: "var(--brand-secondary)" }}
                    />
                    Small groups for personalised attention
                  </li>
                  <li className="flex items-start gap-2">
                    <Phone
                      size={15}
                      className="mt-0.5 shrink-0"
                      style={{ color: "var(--brand-secondary)" }}
                    />
                    24/7 support during your journey
                  </li>
                </ul>
              </div>

              {/* Contact Card */}
              <div
                className="rounded-xl p-5"
                style={{
                  background: "var(--bg-secondary)",
                  border: "1px solid var(--border-light)",
                }}
              >
                <p
                  className="text-[10px] font-semibold font-body uppercase tracking-[0.15em] mb-3"
                  style={{ color: "var(--text-muted)" }}
                >
                  Need Help Planning?
                </p>
                <div className="space-y-2 text-sm font-body">
                  <a
                    href={PHONE_HREF}
                    className="flex items-center gap-2 transition-colors"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    <Phone
                      size={15}
                      style={{ color: "var(--brand-primary)" }}
                    />{" "}
                    {PHONE_DISPLAY}
                  </a>
                  <a
                    href={CONTACT_EMAIL_HREF}
                    className="flex items-center gap-2 transition-colors"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    <Mail size={15} style={{ color: "var(--brand-primary)" }} />{" "}
                    {CONTACT_EMAIL}
                  </a>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Bottom CTA Band */}
      <section className="py-8" style={{ background: "var(--brand-primary)" }}>
        <div className="w-full max-w-[1400px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-display italic text-xl font-bold text-white">
              {pkg.name}
            </h3>
            <p
              className="font-body text-sm mt-0.5"
              style={{ color: "rgba(255,255,255,0.65)" }}
            >
              From {onRequest ? "On Request" : `₹${minPrice}`} per person ·{" "}
              {pkg.duration} · {pkg.groupSize}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href={`/booking/${String(pkg.id) }`}
              data-ocid="package.bottom_cta_book"
              className="px-6 py-3 rounded-lg font-body font-semibold text-white transition-opacity hover:opacity-90"
              style={{ background: "var(--accent-orange)" }}
            >
              Book Now
            </Link>
            <a
              href={whatsappLink(`Hi TrekRoots! I'm interested in the ${pkg.name} package.`)}
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="package.bottom_cta_whatsapp"
              className="px-6 py-3 rounded-lg font-body font-medium text-white"
              style={{
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.2)",
              }}
            >
              <MessageCircle size={16} className="inline mr-1.5" />
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
