import type { DayItinerary, Trek } from "@/backend";
import { TrekCard } from "@/components/TrekCard";
import { useAllTreks, useTrekBySlug } from "@/hooks/useBackendQuery";
import { Link, useParams } from "@tanstack/react-router";
import { useState } from "react";
import { TripCostCalculator } from "../components/TripCostCalculator";

const DIFFICULTY_COLOR: Record<string, string> = {
  Easy: "bg-emerald-100 text-emerald-800",
  Moderate: "bg-yellow-100 text-yellow-800",
  Difficult: "bg-orange-100 text-orange-800",
  Extreme: "bg-red-100 text-red-800",
};

const WEATHER_TABLE = [
  { month: "Jan", temp: "-5°/5°", condition: "Snow", status: "avoid" },
  { month: "Feb", temp: "-3°/7°", condition: "Snow", status: "caution" },
  { month: "Mar", temp: "2°/12°", condition: "Mixed", status: "caution" },
  { month: "Apr", temp: "5°/18°", condition: "Clear", status: "ideal" },
  { month: "May", temp: "10°/22°", condition: "Clear", status: "ideal" },
  {
    month: "Jun",
    temp: "12°/24°",
    condition: "Pre-monsoon",
    status: "caution",
  },
  { month: "Jul", temp: "10°/20°", condition: "Monsoon", status: "avoid" },
  { month: "Aug", temp: "10°/20°", condition: "Monsoon", status: "avoid" },
  { month: "Sep", temp: "8°/18°", condition: "Post-monsoon", status: "ideal" },
  { month: "Oct", temp: "4°/15°", condition: "Clear", status: "ideal" },
  { month: "Nov", temp: "-2°/10°", condition: "Cold", status: "caution" },
  { month: "Dec", temp: "-6°/4°", condition: "Snow", status: "avoid" },
];

const PACKING_SECTIONS = [
  {
    label: "Clothing",
    items: [
      "Moisture-wicking base layers (2 sets)",
      "Insulating mid-layer (fleece/down jacket)",
      "Waterproof outer shell jacket",
      "Trekking pants (2 pairs)",
      "Warm socks (4 pairs)",
      "Thermal inner socks",
      "Lightweight gloves + heavy gloves",
      "Woollen cap / balaclava",
    ],
  },
  {
    label: "Footwear",
    items: [
      "Waterproof trekking boots (ankle support)",
      "Camp sandals / flip-flops",
      "Gaiters for snow treks",
    ],
  },
  {
    label: "Equipment",
    items: [
      "Trekking poles (collapsible)",
      "Headlamp + extra batteries",
      "Sleeping bag liner",
      "Daypack (20–25L)",
      "Rain cover for backpack",
    ],
  },
  {
    label: "Personal Medical Kit",
    items: [
      "Diamox tablets (AMS prevention)",
      "ORS sachets",
      "Ibuprofen / Paracetamol",
      "Bandages, antiseptic cream",
      "Blister plasters",
      "Sunscreen SPF 50+",
      "Lip balm",
    ],
  },
  {
    label: "Documents & Essentials",
    items: [
      "Government-issued photo ID (original + 2 copies)",
      "Booking confirmation printout",
      "Travel insurance documents",
      "Emergency contact card",
    ],
  },
];

const FAQS = [
  {
    q: "What fitness level is required for this trek?",
    a: "You should be able to walk 8–12 km daily on uneven terrain. Start a 4-week pre-trek training plan with daily cardio (running/cycling), squats, and lunges.",
  },
  {
    q: "Are the treks suitable for beginners?",
    a: "Treks rated Easy or Moderate are suitable for first-timers with average fitness. Difficult and Extreme treks require prior high-altitude experience.",
  },
  {
    q: "What is the cancellation policy?",
    a: "Full refund if cancelled 30+ days before trek. 50% refund for 15–29 days. No refund within 14 days of departure.",
  },
  {
    q: "Are permits included in the price?",
    a: "Yes. Forest department permits, national park entry fees, and required government clearances are all included in the package price.",
  },
  {
    q: "What is the accommodation like on the trail?",
    a: "Accommodation varies by trek — mix of high-quality camping tents, fixed-camp setups, and guesthouses at lower altitudes. Sleeping bags and mats are provided.",
  },
  {
    q: "What happens in case of bad weather or emergency?",
    a: "Our leaders carry satellite communication devices. In emergencies, we coordinate helicopter evacuation. Safety of trekkers is our top priority.",
  },
  {
    q: "Can I join as a solo traveller?",
    a: "Absolutely. Solo trekkers are paired with group batches. We also offer women-only group departures for solo female travellers.",
  },
  {
    q: "What meals are provided on the trek?",
    a: "All meals from Day 1 dinner to last-day breakfast are included — hot nutritious Himalayan meals cooked by our camp staff.",
  },
];

const STATS_TABS = [
  "Overview",
  "Itinerary",
  "Inclusions",
  "Packing",
  "How to Reach",
  "Gallery",
  "Weather",
  "Reviews",
  "FAQs",
];

function StatBadge({
  icon,
  label,
  value,
}: { icon: string; label: string; value: string }) {
  return (
    <div className="flex flex-col items-center gap-0.5 px-3 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 min-w-[80px]">
      <span className="text-lg">{icon}</span>
      <span className="text-[10px] text-white/70 font-body uppercase tracking-wider">
        {label}
      </span>
      <span className="text-xs font-semibold text-white font-body leading-tight text-center">
        {value}
      </span>
    </div>
  );
}

function DayBlock({ day }: { day: DayItinerary }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-5 py-4 bg-card hover:bg-muted/40 transition-colors text-left"
        data-ocid={`trek.itinerary.day.${Number(day.day)}`}
      >
        <div className="flex items-center gap-4 min-w-0">
          <span className="shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold font-mono">
            {Number(day.day)}
          </span>
          <div className="min-w-0">
            <p className="font-semibold text-foreground font-body text-sm leading-snug truncate">
              {day.title}
            </p>
            <p className="text-xs text-muted-foreground font-body">
              {day.route} · {day.distanceKm} km
            </p>
          </div>
        </div>
        <svg
          aria-hidden="true"
          className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {open && (
        <div className="px-5 py-4 bg-background border-t border-border space-y-3">
          <div className="flex flex-wrap gap-2 text-xs font-body">
            <span className="px-2 py-0.5 bg-muted rounded-full">
              📍 {day.campsite}
            </span>
            <span className="px-2 py-0.5 bg-muted rounded-full">
              🍽️ {day.mealsIncluded}
            </span>
            <span className="px-2 py-0.5 bg-muted rounded-full">
              ⬆ {Number(day.startAltitudeM)}m → {Number(day.endAltitudeM)}m
            </span>
          </div>
          <p className="text-sm text-foreground font-body leading-relaxed">
            {day.description}
          </p>
          {day.landmarks.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {day.landmarks.map((lm) => (
                <span
                  key={lm}
                  className="text-xs bg-accent/10 text-accent-foreground px-2 py-0.5 rounded-full font-body"
                >
                  {lm}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function BookingWidget({ trek }: { trek: Trek }) {
  const minPrice = Number(trek.priceRange.minINR).toLocaleString("en-IN");
  const maxPrice = Number(trek.priceRange.maxINR).toLocaleString("en-IN");

  const handleShare = async () => {
    if (navigator.share) {
      await navigator
        .share({ title: trek.name, url: window.location.href })
        .catch(() => {});
    } else {
      await navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  const handleDownload = () => {
    window.print();
  };

  return (
    <div className="bg-card border border-border rounded-xl p-5 shadow-md sticky top-[80px]">
      <p className="text-xs text-muted-foreground font-body mb-1">
        Starting from
      </p>
      <p className="font-mono text-3xl font-bold text-primary mb-0.5">
        ₹{minPrice}
      </p>
      <p className="text-xs text-muted-foreground font-body mb-4">
        Up to ₹{maxPrice} · per person · GST incl.
      </p>

      <TripCostCalculator
        tripName={trek.name || "Trek"}
        baseDurationDays={Number(trek.durationDays) || 7}
        pricePerPersonBudget={Math.round(
          Number(trek.priceRange?.minINR) || 8500,
        )}
        pricePerPersonStandard={Math.round(
          ((Number(trek.priceRange?.minINR) || 8500) +
            (Number(trek.priceRange?.maxINR) || 18500)) /
            2,
        )}
        pricePerPersonPremium={Math.round(
          Number(trek.priceRange?.maxINR) || 18500,
        )}
        tripType="trek"
      />
      {/* Book Now CTA */}
      <Link
        to="/booking/$id"
        params={{ id: String(trek.id) }}
        data-ocid="trek.book_button"
        className="block w-full text-center py-3 font-semibold font-body text-sm rounded-lg hover:opacity-90 transition-colors mb-3"
        style={{ backgroundColor: "#C04000", color: "#fff" }}
      >
        Book This Trek
      </Link>

      {/* Convenience Buttons */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        <button
          type="button"
          data-ocid="trek.wishlist_button"
          onClick={() => alert("Added to wishlist!")}
          className="flex items-center justify-center gap-1.5 py-2 rounded-lg border border-border text-xs font-semibold font-body text-foreground hover:bg-muted/40 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          Wishlist
        </button>
        <button
          type="button"
          data-ocid="trek.share_button"
          onClick={handleShare}
          className="flex items-center justify-center gap-1.5 py-2 rounded-lg border border-border text-xs font-semibold font-body text-foreground hover:bg-muted/40 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
          </svg>
          Share
        </button>
        <button
          type="button"
          data-ocid="trek.download_itinerary_button"
          onClick={handleDownload}
          className="flex items-center justify-center gap-1.5 py-2 rounded-lg border border-border text-xs font-semibold font-body text-foreground hover:bg-muted/40 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Itinerary
        </button>
        <a
          href={`https://wa.me/919876543210?text=${encodeURIComponent(`Hi! I'm interested in ${trek.name}. Can you help me plan?`)}`}
          target="_blank"
          rel="noopener noreferrer"
          data-ocid="trek.whatsapp_button"
          className="flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold font-body text-white transition-colors"
          style={{ backgroundColor: "#25D366" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.535 5.859L0 24l6.335-1.52A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.006-1.373l-.36-.213-3.73.895.928-3.617-.235-.373A9.786 9.786 0 0 1 2.182 12C2.182 6.58 6.58 2.182 12 2.182S21.818 6.58 21.818 12 17.42 21.818 12 21.818z" />
          </svg>
          WhatsApp
        </a>
      </div>

      {/* Call Now */}
      <a
        href="tel:+919876543210"
        data-ocid="trek.call_button"
        className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg border border-border text-xs font-semibold font-body text-foreground hover:bg-muted/40 transition-colors mb-4"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#C04000"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.7h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 10.1a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 17.55z" />
        </svg>
        <span style={{ color: "#C04000" }}>Call Now: +91-98765-43210</span>
      </a>

      {/* Trust Badge Grid */}
      <div className="grid grid-cols-2 gap-2 pt-3 border-t border-border">
        {[
          {
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#C04000"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            ),
            label: "Secure Payment",
          },
          {
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#C04000"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="8" r="6" />
                <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
              </svg>
            ),
            label: "Certified Guides",
          },
          {
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#C04000"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.7h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 10.1a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 17.55z" />
              </svg>
            ),
            label: "24/7 Support",
          },
          {
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#C04000"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                <line x1="7" y1="7" x2="7.01" y2="7" />
              </svg>
            ),
            label: "Best Price Guarantee",
          },
        ].map(({ icon, label }) => (
          <div
            key={label}
            className="flex items-center gap-2 p-2 rounded-lg"
            style={{ background: "#FDF5F0", border: "1px solid #F0E0D5" }}
          >
            {icon}
            <span
              className="text-[10px] font-semibold font-body leading-tight"
              style={{ color: "#3C1414" }}
            >
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TrekDetailPage() {
  const { slug } = useParams({ from: "/treks/$slug" });
  const { data: trek, isLoading } = useTrekBySlug(slug);
  const { data: allTreks = [] } = useAllTreks();
  const [activeTab, setActiveTab] = useState("Overview");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  const [showInclusions, setShowInclusions] = useState(true);

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );

  if (!trek)
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-5xl mb-4">🏔️</p>
        <h1 className="font-display text-2xl font-bold text-foreground mb-2">
          Trek not found
        </h1>
        <Link to="/treks" className="text-primary underline font-body text-sm">
          Browse all treks
        </Link>
      </div>
    );

  const _diffColor =
    DIFFICULTY_COLOR[trek.difficulty] ?? "bg-muted text-muted-foreground";
  const relatedTreks = allTreks
    .filter((t) => t.slug !== trek.slug && t.state === trek.state)
    .slice(0, 3);

  const scrollTo = (id: string) => {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="bg-background min-h-screen">
      {/* Hero */}
      <div className="relative h-[60vh] md:h-[70vh] overflow-hidden bg-muted">
        {trek.imageUrl ? (
          <img
            src={trek.imageUrl}
            alt={trek.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-muted">
            <span className="text-8xl">🏔️</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end px-4 md:px-8 pb-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-white/70 font-body mb-3">
            <Link to="/" className="hover:text-white">
              Home
            </Link>
            <span>/</span>
            <Link to="/treks" className="hover:text-white">
              Treks
            </Link>
            <span>/</span>
            <span className="text-white/50">{trek.state}</span>
            <span>/</span>
            <span className="text-white">{trek.name}</span>
          </nav>
          <h1 className="font-display text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
            {trek.name}
          </h1>
          {/* Stat badges */}
          <div className="flex flex-wrap gap-2 mb-4">
            <StatBadge
              icon="📅"
              label="Duration"
              value={`${Number(trek.durationDays)}D / ${Number(trek.durationNights)}N`}
            />
            <StatBadge
              icon="⛰️"
              label="Max Altitude"
              value={`${Number(trek.maxAltitudeM).toLocaleString()}m`}
            />
            <StatBadge icon="💪" label="Difficulty" value={trek.difficulty} />
            <StatBadge icon="🌸" label="Best Season" value={trek.bestSeason} />
            <StatBadge icon="📍" label="Start Point" value={trek.startPoint} />
          </div>
          {/* Hero CTAs */}
          <div className="flex gap-3">
            <Link
              to="/booking/$id"
              params={{ id: String(trek.id) }}
              data-ocid="trek.hero_book_button"
              className="px-5 py-2.5 bg-primary text-primary-foreground font-semibold font-body text-sm rounded-lg hover:bg-primary/90 transition-colors"
            >
              Book This Trek
            </Link>
            <button
              type="button"
              data-ocid="trek.download_itinerary_button"
              className="px-5 py-2.5 bg-white/10 backdrop-blur-sm border border-white/30 text-white font-semibold font-body text-sm rounded-lg hover:bg-white/20 transition-colors"
            >
              Download Itinerary
            </button>
          </div>
        </div>
      </div>

      {/* Sticky Tab Nav */}
      <div className="sticky top-[72px] z-10 bg-card border-b border-border shadow-sm overflow-x-auto">
        <div className="container mx-auto px-4">
          <div className="flex gap-0 min-w-max">
            {STATS_TABS.map((tab) => (
              <button
                key={tab}
                type="button"
                data-ocid={`trek.tab.${tab.toLowerCase().replace(/ /g, "_")}`}
                onClick={() => {
                  setActiveTab(tab);
                  scrollTo(`section-${tab.toLowerCase().replace(/ /g, "-")}`);
                }}
                className={`px-4 py-3.5 text-xs font-semibold font-body border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                } ${tab === "Book Now" ? "text-primary" : ""}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8 items-start">
          {/* Left Column */}
          <div className="flex-1 min-w-0 space-y-10">
            {/* Overview */}
            <section id="section-overview" className="scroll-mt-36">
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                Overview
              </h2>
              <p className="text-foreground font-body leading-relaxed mb-5">
                {trek.description}
              </p>
              {/* Highlights */}
              {trek.highlights.length > 0 && (
                <div className="bg-muted/40 rounded-lg p-5">
                  <h3 className="font-semibold text-foreground font-body mb-3">
                    Trek Highlights
                  </h3>
                  <ul className="grid sm:grid-cols-2 gap-2">
                    {trek.highlights.map((h) => (
                      <li
                        key={h}
                        className="flex items-start gap-2 text-sm font-body text-foreground"
                      >
                        <span className="text-primary mt-0.5 shrink-0">✦</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {/* Quick Stats Table */}
              <div className="mt-6 border border-border rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <tbody>
                    {[
                      [
                        "Duration",
                        `${Number(trek.durationDays)} days / ${Number(trek.durationNights)} nights`,
                      ],
                      ["Distance", `${trek.distanceKm} km`],
                      ["Starting Point", trek.startPoint],
                      ["Ending Point", trek.endPoint],
                      [
                        "Highest Altitude",
                        `${Number(trek.maxAltitudeM).toLocaleString()} m (${Number(trek.maxAltitudeFt).toLocaleString()} ft)`,
                      ],
                      ["Difficulty", trek.difficulty],
                      ["Best Season", trek.bestSeason],
                      ["State", trek.state],
                      ["Region", trek.region],
                    ].map(([label, val], i) => (
                      <tr
                        key={label}
                        className={
                          i % 2 === 0 ? "bg-muted/30" : "bg-background"
                        }
                      >
                        <td className="px-4 py-2.5 font-semibold text-foreground font-body w-1/3 border-r border-border">
                          {label}
                        </td>
                        <td className="px-4 py-2.5 text-foreground font-body">
                          {val}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Itinerary */}
            <section id="section-itinerary" className="scroll-mt-36">
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                Day-by-Day Itinerary
              </h2>
              {trek.itinerary.length === 0 ? (
                <p className="text-muted-foreground font-body text-sm">
                  Detailed itinerary available on request.
                </p>
              ) : (
                <div className="space-y-3">
                  {trek.itinerary.map((day) => (
                    <DayBlock key={Number(day.day)} day={day} />
                  ))}
                </div>
              )}
            </section>

            {/* Inclusions & Exclusions */}
            <section id="section-inclusions" className="scroll-mt-36">
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                Inclusions & Exclusions
              </h2>
              <div className="flex gap-2 mb-4">
                <button
                  type="button"
                  onClick={() => setShowInclusions(true)}
                  data-ocid="trek.inclusions_tab"
                  className={`px-4 py-2 text-sm font-semibold font-body rounded-md transition-colors ${showInclusions ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
                >
                  ✓ Inclusions
                </button>
                <button
                  type="button"
                  onClick={() => setShowInclusions(false)}
                  data-ocid="trek.exclusions_tab"
                  className={`px-4 py-2 text-sm font-semibold font-body rounded-md transition-colors ${!showInclusions ? "bg-destructive text-destructive-foreground" : "bg-muted text-muted-foreground"}`}
                >
                  ✗ Exclusions
                </button>
              </div>
              {showInclusions ? (
                <ul className="space-y-2">
                  {trek.inclusions.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm font-body text-foreground"
                    >
                      <span className="text-emerald-600 mt-0.5 shrink-0 font-bold">
                        ✓
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              ) : (
                <ul className="space-y-2">
                  {trek.exclusions.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm font-body text-foreground"
                    >
                      <span className="text-red-500 mt-0.5 shrink-0 font-bold">
                        ✗
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </section>

            {/* Packing List */}
            <section id="section-packing" className="scroll-mt-36">
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                Packing List
              </h2>
              <div className="grid sm:grid-cols-2 gap-5">
                {PACKING_SECTIONS.map((sec) => (
                  <div key={sec.label} className="bg-muted/40 rounded-lg p-4">
                    <h3 className="font-semibold text-foreground font-body mb-2 text-sm">
                      {sec.label}
                    </h3>
                    <ul className="space-y-1">
                      {sec.items.map((item) => (
                        <li
                          key={item}
                          className="text-sm font-body text-foreground flex items-start gap-2"
                        >
                          <span className="text-primary shrink-0 mt-0.5">
                            ·
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* How to Reach */}
            <section id="section-how-to-reach" className="scroll-mt-36">
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                How to Reach {trek.startPoint}
              </h2>
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  {
                    icon: "✈️",
                    mode: "By Air",
                    detail:
                      "Jolly Grant Airport, Dehradun (DED) is the nearest airport. From there, hire a taxi or take GMOU bus service to the trek base.",
                  },
                  {
                    icon: "🚆",
                    mode: "By Train",
                    detail:
                      "Dehradun Railway Station and Haridwar Junction are the nearest railheads. Overnight trains available from Delhi (NDLS).",
                  },
                  {
                    icon: "🚌",
                    mode: "By Road",
                    detail: `Regular GMOU/private buses and shared taxis operate from Dehradun, Haridwar, and Rishikesh to ${trek.startPoint}.`,
                  },
                ].map((opt) => (
                  <div
                    key={opt.mode}
                    className="bg-card border border-border rounded-lg p-4"
                  >
                    <p className="text-2xl mb-2">{opt.icon}</p>
                    <p className="font-semibold text-foreground font-body text-sm mb-1">
                      {opt.mode}
                    </p>
                    <p className="text-xs text-muted-foreground font-body leading-relaxed">
                      {opt.detail}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Gallery */}
            <section id="section-gallery" className="scroll-mt-36">
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                Gallery
              </h2>
              {trek.imageUrl ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {Array.from({ length: 6 }, (_, i) => (
                    <button
                      key={`gallery-img-${i + 1}`}
                      type="button"
                      data-ocid={`trek.gallery.item.${i + 1}`}
                      onClick={() => setLightboxImg(trek.imageUrl)}
                      className="aspect-square overflow-hidden rounded-lg bg-muted hover:opacity-90 transition-opacity"
                    >
                      <img
                        src={trek.imageUrl}
                        alt={`${trek.name} view ${i + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground font-body text-sm">
                  Gallery images coming soon.
                </p>
              )}
            </section>

            {/* Weather Table */}
            <section id="section-weather" className="scroll-mt-36">
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                Best Time to Trek
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-muted">
                      {["Month", "Temp (Day/Night)", "Condition", "Status"].map(
                        (h) => (
                          <th
                            key={h}
                            className="px-3 py-2.5 text-left font-semibold text-foreground font-body text-xs"
                          >
                            {h}
                          </th>
                        ),
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {WEATHER_TABLE.map((row, i) => (
                      <tr
                        key={row.month}
                        className={
                          i % 2 === 0 ? "bg-background" : "bg-muted/20"
                        }
                      >
                        <td className="px-3 py-2 font-semibold font-body text-foreground">
                          {row.month}
                        </td>
                        <td className="px-3 py-2 font-mono text-sm text-foreground">
                          {row.temp}
                        </td>
                        <td className="px-3 py-2 font-body text-foreground">
                          {row.condition}
                        </td>
                        <td className="px-3 py-2">
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs font-semibold font-body ${
                              row.status === "ideal"
                                ? "bg-emerald-100 text-emerald-800"
                                : row.status === "caution"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                            }`}
                          >
                            {row.status === "ideal"
                              ? "✓ Ideal"
                              : row.status === "caution"
                                ? "~ Caution"
                                : "✗ Avoid"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Reviews */}
            <section id="section-reviews" className="scroll-mt-36">
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                Reviews
              </h2>
              <div className="flex items-center gap-4 mb-6 p-4 bg-muted/40 rounded-lg">
                <div className="text-center">
                  <p className="font-mono text-4xl font-bold text-primary">
                    4.9
                  </p>
                  <p className="text-yellow-500 text-sm">★★★★★</p>
                  <p className="text-xs text-muted-foreground font-body">
                    2,400+ reviews
                  </p>
                </div>
              </div>
              <div className="space-y-4" data-ocid="trek.reviews_list">
                {[1, 2, 3].map((n) => (
                  <div
                    key={n}
                    className="bg-card border border-border rounded-lg p-4"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-bold font-body">
                        T
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground font-body">
                          [REVIEW PENDING]
                        </p>
                        <p className="text-xs text-muted-foreground font-body">
                          Verified Traveller · {trek.name}
                        </p>
                      </div>
                      <span className="ml-auto text-yellow-500 text-sm">
                        ★★★★★
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground font-body italic">
                      [REVIEW PENDING — This section will display verified
                      trekker reviews once collected.]
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQs */}
            <section id="section-faqs" className="scroll-mt-36">
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                Frequently Asked Questions
              </h2>
              <div className="space-y-2">
                {FAQS.map((faq, i) => (
                  <div
                    key={faq.q}
                    className="border border-border rounded-lg overflow-hidden"
                  >
                    <button
                      type="button"
                      data-ocid={`trek.faq.${i + 1}`}
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-center justify-between px-4 py-3.5 bg-card hover:bg-muted/30 text-left transition-colors"
                    >
                      <span className="font-semibold text-foreground font-body text-sm pr-4">
                        {faq.q}
                      </span>
                      <svg
                        aria-hidden="true"
                        className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    {openFaq === i && (
                      <div className="px-4 py-3 bg-background border-t border-border">
                        <p className="text-sm text-foreground font-body leading-relaxed">
                          {faq.a}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Related Treks */}
            {relatedTreks.length > 0 && (
              <section id="section-related" className="scroll-mt-36">
                <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                  You Might Also Like
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {relatedTreks.map((t, i) => (
                    <TrekCard key={String(t.id)} trek={t} index={i} />
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Column — Booking Widget (desktop only) */}
          <div className="hidden lg:block w-80 shrink-0">
            <BookingWidget trek={trek} />
          </div>
        </div>
      </div>

      {/* Mobile Sticky Book Now */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-20 bg-card border-t border-border p-3 flex gap-3">
        <Link
          to="/booking/$id"
          params={{ id: String(trek.id) }}
          data-ocid="trek.mobile_book_button"
          className="flex-1 py-3 text-center bg-primary text-primary-foreground font-semibold font-body text-sm rounded-lg"
        >
          Book This Trek — ₹
          {Number(trek.priceRange.minINR).toLocaleString("en-IN")}
        </Link>
        <a
          href={`https://wa.me/919876543210?text=${encodeURIComponent(`Hi! I'm interested in ${trek.name}. Can you help me plan?`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-3 bg-[#25D366] text-white font-body text-sm font-semibold rounded-lg"
          data-ocid="trek.mobile_whatsapp_button"
        >
          💬
        </a>
      </div>

      {/* Lightbox */}
      {lightboxImg && (
        <button
          type="button"
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightboxImg(null)}
          onKeyDown={(e) => e.key === "Escape" && setLightboxImg(null)}
          data-ocid="trek.lightbox"
        >
          <img
            src={lightboxImg}
            alt="Gallery"
            className="max-w-full max-h-full object-contain rounded-lg"
          />
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxImg(null);
            }}
            data-ocid="trek.lightbox_close_button"
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30"
          >
            ✕
          </button>
        </button>
      )}
    </div>
  );
}
