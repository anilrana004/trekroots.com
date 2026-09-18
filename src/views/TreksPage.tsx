"use client";

import type { Trek } from "@/data";
import {
  DURATION_BUCKETS,
  getAllTreks,
  matchesDuration,
  matchesSeason,
  SEASON_BUCKETS,
} from "@/data";
import { SectionHeader } from "@/components/SectionHeader";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { TrekCard } from "@/components/TrekCard";
import { X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const STATES = ["All", "Uttarakhand", "Himachal Pradesh", "Maharashtra"];
const DIFFICULTIES = ["All", "Easy", "Moderate", "Difficult", "Extreme"];
const SORT_OPTIONS = [
  { label: "Popularity", value: "popularity" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Duration: Short First", value: "duration_asc" },
];

const SKELETON_TREKS = [1, 2, 3, 4, 5, 6, 7, 8];

export default function TreksPage() {
  const treks = getAllTreks();
  const isLoading = false;
  const params = useSearchParams();
  const [stateFilter, setStateFilter] = useState("All");
  const [diffFilter, setDiffFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("popularity");
  // Set by the "All Treks" menu; these two have no chips in the filter bar.
  const [duration, setDuration] = useState("");
  const [season, setSeason] = useState("");

  useEffect(() => {
    setStateFilter(params.get("state") ?? "All");
    setDiffFilter(params.get("difficulty") ?? "All");
    setDuration(params.get("duration") ?? "");
    setSeason(params.get("season") ?? "");
  }, [params]);

  const filtered = useMemo(() => {
    let result: Trek[] = treks;
    if (stateFilter !== "All")
      result = result.filter((t) => t.state === stateFilter);
    if (diffFilter !== "All")
      result = result.filter((t) =>
        t.difficulty.toLowerCase().includes(diffFilter.toLowerCase()),
      );
    if (duration) result = result.filter((t) => matchesDuration(t, duration));
    if (season) result = result.filter((t) => matchesSeason(t, season));
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.region.toLowerCase().includes(q),
      );
    }
    return [...result].sort((a, b) => {
      if (sort === "price_asc")
        return Number(a.priceRange.minINR) - Number(b.priceRange.minINR);
      if (sort === "price_desc")
        return Number(b.priceRange.minINR) - Number(a.priceRange.minINR);
      if (sort === "duration_asc")
        return Number(a.durationDays) - Number(b.durationDays);
      return 0;
    });
  }, [treks, stateFilter, diffFilter, duration, season, search, sort]);

  const appliedFacets: { label: string; clear: () => void }[] = [];
  const durationLabel = DURATION_BUCKETS.find((b) => b.key === duration)?.label;
  if (durationLabel) {
    appliedFacets.push({
      label: durationLabel,
      clear: () => setDuration(""),
    });
  }
  const seasonLabel = SEASON_BUCKETS.find((b) => b.key === season)?.label;
  if (seasonLabel) {
    appliedFacets.push({ label: seasonLabel, clear: () => setSeason("") });
  }

  return (
    <div className="bg-background min-h-screen">
      {/* Page Header */}
      <div className="bg-card border-b border-border py-10 px-4">
        <div className="container mx-auto">
          <Breadcrumbs
            className="mb-4"
            items={[
              { name: "Home", path: "/" },
              { name: "Treks", path: "/treks" },
            ]}
          />
          <SectionHeader
            as="h1"
            title="Himalayan Treks"
            subtitle="From snow-dusted winter trails to monsoon meadow bursts — every route, every season."
          />
        </div>
      </div>

      {/* Filters Bar — rides under the header, flush to top once it hides on phones */}
      <div className="detail-section-nav bg-card border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-2 md:py-3 flex flex-col md:flex-row gap-2 md:gap-3 md:items-center">
          {/* Search + sort share a row on phones to keep the bar short */}
          <div className="flex items-center gap-2 md:contents">
            <div className="relative flex-1 min-w-0 md:flex-1 md:min-w-0">
              <svg
                aria-hidden="true"
                className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 md:w-4 md:h-4 text-muted-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
                />
              </svg>
              <input
                data-ocid="treks.search_input"
                type="text"
                placeholder="Search treks..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-8 md:pl-9 pr-2 py-1.5 md:py-2 text-xs md:text-sm border border-input rounded-md bg-background font-body focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            {/* Sits beside search on phones, trails the chips on desktop */}
            <select
              data-ocid="treks.sort_select"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="text-xs border border-input rounded-md px-2 py-1.5 md:py-2 bg-background font-body focus:outline-none focus:ring-2 focus:ring-primary/30 shrink-0 max-w-[40%] md:max-w-none md:order-last"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>

          {/* Chips: one swipeable row on phones, wrapped groups on desktop */}
          <div className="flex md:contents gap-1.5 overflow-x-auto hide-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
            <div className="flex gap-1.5 shrink-0 md:flex-wrap">
              {STATES.map((s) => (
                <button
                  key={s}
                  type="button"
                  data-ocid={`treks.state_filter.${s.replace(/ /g, "_").toLowerCase()}`}
                  onClick={() => setStateFilter(s)}
                  className={`px-2.5 md:px-3 py-1 md:py-1.5 rounded-full text-[11px] md:text-xs font-semibold font-body whitespace-nowrap transition-colors ${
                    stateFilter === s
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/70"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
            <span
              aria-hidden="true"
              className="md:hidden self-center shrink-0 w-px h-4 bg-border mx-0.5"
            />
            <div className="flex gap-1.5 shrink-0 md:flex-wrap">
              {DIFFICULTIES.map((d) => (
                <button
                  key={d}
                  type="button"
                  data-ocid={`treks.diff_filter.${d.toLowerCase()}`}
                  onClick={() => setDiffFilter(d)}
                  className={`px-2.5 md:px-3 py-1 md:py-1.5 rounded-full text-[11px] md:text-xs font-semibold font-body whitespace-nowrap transition-colors ${
                    diffFilter === d
                      ? "bg-accent text-accent-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/70"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Results */}
      <div className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {SKELETON_TREKS.map((n) => (
              <div key={n} className="h-72 rounded-lg bg-muted animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div data-ocid="treks.empty_state" className="text-center py-24">
            <p className="text-4xl mb-4">🏔️</p>
            <p className="font-display text-xl text-foreground mb-2">
              No treks found
            </p>
            <p className="text-muted-foreground font-body text-sm">
              Try adjusting your filters or search term.
            </p>
            <button
              type="button"
              onClick={() => {
                setStateFilter("All");
                setDiffFilter("All");
                setSearch("");
                setDuration("");
                setSeason("");
              }}
              className="mt-4 px-4 py-2 text-sm bg-primary text-primary-foreground rounded-md font-body"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <>
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <p className="text-sm text-muted-foreground font-body">
                Showing {filtered.length} trek{filtered.length !== 1 ? "s" : ""}
              </p>
              {appliedFacets.map(({ label, clear }) => (
                <button
                  key={label}
                  type="button"
                  onClick={clear}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium font-body hover:bg-primary/20 transition-colors"
                >
                  {label}
                  <X size={12} />
                </button>
              ))}
            </div>
            <div
              key={`${stateFilter}|${diffFilter}|${duration}|${season}|${search}|${sort}`}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filtered.map((trek, i) => (
                <TrekCard key={String(trek.id)} trek={trek} index={i} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
