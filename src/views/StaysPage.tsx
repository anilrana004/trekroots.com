"use client";

import { getAllStays, whatsappLink } from "@/data";
import { StayCard } from "@/components/StayCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Award,
  ChevronDown,
  Home,
  MapPin,
  Shield,
  Sparkles,
  ThumbsUp,
} from "lucide-react";
import { useMemo, useState } from "react";

const REGIONS = ["All", "Garhwal", "Kumaon", "Himachal"] as const;
const PROPERTY_TYPES = [
  "All",
  "Homestay",
  "Boutique Hotel",
  "Tented Camp",
  "Cottage",
  "Resort",
] as const;
const PRICE_RANGES = [
  { label: "All", min: 0, max: Number.POSITIVE_INFINITY },
  { label: "Under ₹2,500", min: 0, max: 2500 },
  { label: "₹2,500 – ₹5,000", min: 2500, max: 5000 },
  { label: "₹5,000+", min: 5000, max: Number.POSITIVE_INFINITY },
] as const;
const SORT_OPTIONS = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Name: A–Z", value: "name_asc" },
] as const;
const USP_ITEMS = [
  {
    icon: Shield,
    title: "Handpicked Properties",
    desc: "Every property personally inspected by the Manya team",
  },
  {
    icon: ThumbsUp,
    title: "Best Price Guarantee",
    desc: "Book direct for the lowest rates, always",
  },
  {
    icon: MapPin,
    title: "Local Expertise",
    desc: "Hosts with deep knowledge of Himalayan terrain",
  },
  {
    icon: Award,
    title: "Breakfast Included",
    desc: "Home-cooked Garhwali & Himachali meals at every stay",
  },
];
const SKELETON_STAYS = [1, 2, 3, 4, 5, 6];

type SortValue = (typeof SORT_OPTIONS)[number]["value"];

function StaySkeleton() {
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ background: "var(--bg-secondary)" }}
    >
      <Skeleton className="h-56 w-full" />
      <div className="p-5 space-y-2.5">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-1/3 mt-2" />
      </div>
    </div>
  );
}

export default function StaysPage() {
  const stays = getAllStays();
  const isLoading = false;
  const [region, setRegion] = useState<string>("All");
  const [stayType, setStayType] = useState<string>("All");
  const [priceRange, setPriceRange] = useState<string>("All");
  const [sortBy, setSortBy] = useState<SortValue>("featured");

  const filtered = useMemo(() => {
    const pr = PRICE_RANGES.find((p) => p.label === priceRange)!;
    let result = stays.filter((s) => {
      const matchRegion =
        region === "All" ||
        s.location.toLowerCase().includes(region.toLowerCase());
      const matchType = stayType === "All" || s.stayType === stayType;
      const minPrice = Number(s.pricePerNightMin);
      const matchPrice = minPrice >= pr.min && minPrice <= pr.max;
      return matchRegion && matchType && matchPrice;
    });
    if (sortBy === "price_asc")
      result = [...result].sort(
        (a, b) => Number(a.pricePerNightMin) - Number(b.pricePerNightMin),
      );
    else if (sortBy === "price_desc")
      result = [...result].sort(
        (a, b) => Number(b.pricePerNightMin) - Number(a.pricePerNightMin),
      );
    else if (sortBy === "name_asc")
      result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    return result;
  }, [stays, region, stayType, priceRange, sortBy]);

  const resetFilters = () => {
    setRegion("All");
    setStayType("All");
    setPriceRange("All");
    setSortBy("featured");
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-primary)" }}>
      {/* Hero */}
      <section
        className="relative overflow-hidden"
        style={{ background: "var(--brand-primary)" }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 70% 30%, var(--brand-gold) 0%, transparent 60%), radial-gradient(circle at 20% 80%, var(--brand-secondary) 0%, transparent 50%)",
          }}
        />
        <div className="relative container mx-auto px-6 py-24 md:py-32 text-center">
          <div
            className="inline-flex items-center gap-2 text-xs font-body font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-8"
            style={{
              background: "rgba(255,193,7,0.15)",
              color: "var(--brand-gold)",
              border: "1px solid rgba(255,193,7,0.3)",
            }}
          >
            <Sparkles size={12} />
            Manya-Owned &amp; Managed Stays
          </div>
          <h1
            className="font-display text-5xl md:text-7xl font-bold leading-[0.95] tracking-tight mb-6"
            style={{ color: "#fff" }}
          >
            Where You Stay
            <br />
            <span style={{ color: "var(--brand-gold)" }}>Matters</span>
          </h1>
          <div
            className="w-16 h-0.5 mx-auto mb-6 rounded-full"
            style={{ background: "var(--brand-gold)" }}
          />
          <p
            className="font-body text-lg md:text-xl leading-relaxed max-w-2xl mx-auto"
            style={{ color: "rgba(255,255,255,0.72)" }}
          >
            Handpicked homestays and boutique properties placed at the heart of
            the Himalayas — each one telling a story of mountains and tradition.
          </p>
        </div>
      </section>

      {/* USP Strip */}
      <section style={{ background: "#2a0d0d" }}>
        <div className="container mx-auto px-6 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {USP_ITEMS.map((item) => (
              <div key={item.title} className="flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{
                    background: "rgba(255,193,7,0.12)",
                    border: "1px solid rgba(255,193,7,0.25)",
                  }}
                >
                  <item.icon size={18} style={{ color: "var(--brand-gold)" }} />
                </div>
                <div>
                  <p
                    className="text-sm font-body font-semibold mb-0.5"
                    style={{ color: "var(--brand-gold)" }}
                  >
                    {item.title}
                  </p>
                  <p
                    className="text-xs font-body leading-relaxed"
                    style={{ color: "rgba(255,255,255,0.55)" }}
                  >
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter Bar — one swipeable strip on phones, wrapped groups on desktop */}
      <section
        className="detail-section-nav border-b"
        style={{
          background: "var(--bg-primary)",
          borderColor: "var(--border-light)",
          boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
        }}
      >
        <div className="container mx-auto px-6 py-2.5 md:py-4">
          <div className="flex items-center gap-3 md:gap-x-6 md:gap-y-3 md:flex-wrap overflow-x-auto md:overflow-visible hide-scrollbar -mx-6 px-6 md:mx-0 md:px-0">
            <div className="flex items-center gap-2 shrink-0">
              <span
                className="text-[10px] md:text-[11px] font-body font-semibold uppercase tracking-widest shrink-0"
                style={{ color: "var(--text-muted)" }}
              >
                Region
              </span>
              <div className="flex gap-1.5 shrink-0">
                {REGIONS.map((r) => (
                  <button
                    key={r}
                    type="button"
                    data-ocid={`stay.filter.region.${r.toLowerCase()}`}
                    onClick={() => setRegion(r)}
                    className="px-2.5 md:px-3 py-1 md:py-1.5 rounded-full text-[11px] md:text-xs font-body font-medium whitespace-nowrap transition-all duration-200"
                    style={{
                      background:
                        region === r
                          ? "var(--brand-primary)"
                          : "var(--bg-tertiary)",
                      color: region === r ? "#fff" : "var(--text-secondary)",
                      border:
                        region === r
                          ? "1px solid var(--brand-primary)"
                          : "1px solid var(--border-light)",
                    }}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span
                className="text-[10px] md:text-[11px] font-body font-semibold uppercase tracking-widest shrink-0"
                style={{ color: "var(--text-muted)" }}
              >
                Type
              </span>
              <div className="flex gap-1.5 shrink-0 md:flex-wrap">
                {PROPERTY_TYPES.map((t) => (
                  <button
                    key={t}
                    type="button"
                    data-ocid={`stay.filter.type.${t.toLowerCase().replace(/\s+/g, "-")}`}
                    onClick={() => setStayType(t)}
                    className="px-2.5 md:px-3 py-1 md:py-1.5 rounded-full text-[11px] md:text-xs font-body font-medium whitespace-nowrap transition-all duration-200"
                    style={{
                      background:
                        stayType === t
                          ? "var(--brand-secondary)"
                          : "var(--bg-tertiary)",
                      color: stayType === t ? "#fff" : "var(--text-secondary)",
                      border:
                        stayType === t
                          ? "1px solid var(--brand-secondary)"
                          : "1px solid var(--border-light)",
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span
                className="text-[10px] md:text-[11px] font-body font-semibold uppercase tracking-widest shrink-0"
                style={{ color: "var(--text-muted)" }}
              >
                Price
              </span>
              <div className="flex gap-1.5 shrink-0">
                {PRICE_RANGES.map((p) => (
                  <button
                    key={p.label}
                    type="button"
                    data-ocid={`stay.filter.price.${p.label.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
                    onClick={() => setPriceRange(p.label)}
                    className="px-2.5 md:px-3 py-1 md:py-1.5 rounded-full text-[11px] md:text-xs font-body font-medium whitespace-nowrap transition-all duration-200"
                    style={{
                      background:
                        priceRange === p.label
                          ? "var(--accent-orange)"
                          : "var(--bg-tertiary)",
                      color:
                        priceRange === p.label
                          ? "#fff"
                          : "var(--text-secondary)",
                      border:
                        priceRange === p.label
                          ? "1px solid var(--accent-orange)"
                          : "1px solid var(--border-light)",
                    }}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0 md:ml-auto">
              <span
                className="text-[10px] md:text-[11px] font-body font-semibold uppercase tracking-widest shrink-0"
                style={{ color: "var(--text-muted)" }}
              >
                Sort
              </span>
              <div className="relative shrink-0">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortValue)}
                  data-ocid="stay.sort_select"
                  className="appearance-none pl-2.5 md:pl-3 pr-7 md:pr-8 py-1 md:py-1.5 rounded-full text-[11px] md:text-xs font-body font-medium cursor-pointer focus:outline-none"
                  style={{
                    background: "var(--bg-tertiary)",
                    color: "var(--text-secondary)",
                    border: "1px solid var(--border-light)",
                  }}
                >
                  {SORT_OPTIONS.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={12}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none"
                  style={{ color: "var(--text-muted)" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="container mx-auto px-6 py-14">
        {!isLoading && (
          <div className="flex items-center justify-between mb-8">
            <p
              className="text-sm font-body"
              style={{ color: "var(--text-muted)" }}
            >
              <span
                className="font-semibold text-base"
                style={{ color: "var(--brand-primary)" }}
              >
                {filtered.length}
              </span>{" "}
              {filtered.length === 1 ? "property" : "properties"} found
            </p>
            {(region !== "All" ||
              stayType !== "All" ||
              priceRange !== "All") && (
              <button
                type="button"
                onClick={resetFilters}
                data-ocid="stay.reset_filters"
                className="text-xs font-body font-medium"
                style={{ color: "var(--brand-secondary)" }}
              >
                Clear filters ×
              </button>
            )}
          </div>
        )}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SKELETON_STAYS.map((n) => (
              <StaySkeleton key={n} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div
            className="text-center py-24 rounded-2xl"
            data-ocid="stay.empty_state"
            style={{ background: "var(--bg-secondary)" }}
          >
            <Home
              size={48}
              className="mx-auto mb-5"
              style={{ color: "var(--brand-gold)" }}
            />
            <h3
              className="font-display text-2xl font-semibold mb-2"
              style={{ color: "var(--brand-primary)" }}
            >
              No stays match your filters
            </h3>
            <p
              className="font-body text-sm mb-6"
              style={{ color: "var(--text-muted)" }}
            >
              Try adjusting your region, type, or price range.
            </p>
            <Button
              variant="outline"
              onClick={resetFilters}
              data-ocid="stay.reset_filters_btn"
              style={{
                borderColor: "var(--brand-primary)",
                color: "var(--brand-primary)",
              }}
            >
              Reset Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((stay, i) => (
              <StayCard key={String(stay.id)} stay={stay} index={i} />
            ))}
          </div>
        )}
      </section>

      {/* Bottom CTA */}
      <section
        className="border-t"
        style={{
          background: "var(--bg-secondary)",
          borderColor: "var(--border-light)",
        }}
      >
        <div className="container mx-auto px-6 py-16 text-center">
          <p
            className="font-body text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ color: "var(--accent-orange)" }}
          >
            Need Help Choosing?
          </p>
          <h2
            className="font-display text-3xl md:text-4xl font-bold mb-4"
            style={{ color: "var(--brand-primary)" }}
          >
            Let Manya Be Your Guide
          </h2>
          <p
            className="font-body text-base max-w-xl mx-auto mb-8"
            style={{ color: "var(--text-secondary)" }}
          >
            Our mountain experts will help you pick the perfect property for
            your itinerary — whether it's a cosy homestay or an alpine tented
            camp.
          </p>
          <a
            href={whatsappLink("Hi TrekRoots! I need help choosing a stay.")}
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="stay.consult_cta"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-body font-semibold text-sm transition-all duration-300 hover:opacity-90 hover:-translate-y-0.5"
            style={{
              background: "var(--brand-primary)",
              color: "#fff",
              boxShadow: "var(--shadow-md)",
            }}
          >
            Talk to an Expert
          </a>
        </div>
      </section>
    </div>
  );
}
