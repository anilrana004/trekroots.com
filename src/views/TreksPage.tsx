"use client";

import type { Trek } from "@/data";
import { getAllTreks } from "@/data";
import { SectionHeader } from "@/components/SectionHeader";
import { TrekCard } from "@/components/TrekCard";
import { useMemo, useState } from "react";

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
  const [stateFilter, setStateFilter] = useState("All");
  const [diffFilter, setDiffFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("popularity");

  const filtered = useMemo(() => {
    let result: Trek[] = treks;
    if (stateFilter !== "All")
      result = result.filter((t) => t.state === stateFilter);
    if (diffFilter !== "All")
      result = result.filter((t) =>
        t.difficulty.toLowerCase().includes(diffFilter.toLowerCase()),
      );
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
  }, [treks, stateFilter, diffFilter, search, sort]);

  return (
    <div className="bg-background min-h-screen">
      {/* Page Header */}
      <div className="bg-card border-b border-border py-10 px-4">
        <div className="container mx-auto">
          <SectionHeader
            title="Himalayan Treks"
            subtitle="From snow-dusted winter trails to monsoon meadow bursts — every route, every season."
          />
        </div>
      </div>

      {/* Filters Bar */}
      <div className="sticky top-[72px] z-10 bg-card border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-3 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          {/* Search */}
          <div className="relative flex-1 min-w-0">
            <svg
              aria-hidden="true"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
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
              className="w-full pl-9 pr-3 py-2 text-sm border border-input rounded-md bg-background font-body focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          {/* State filter */}
          <div className="flex gap-1.5 flex-wrap">
            {STATES.map((s) => (
              <button
                key={s}
                type="button"
                data-ocid={`treks.state_filter.${s.replace(/ /g, "_").toLowerCase()}`}
                onClick={() => setStateFilter(s)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold font-body transition-colors ${
                  stateFilter === s
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/70"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
          {/* Difficulty filter */}
          <div className="flex gap-1.5 flex-wrap">
            {DIFFICULTIES.map((d) => (
              <button
                key={d}
                type="button"
                data-ocid={`treks.diff_filter.${d.toLowerCase()}`}
                onClick={() => setDiffFilter(d)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold font-body transition-colors ${
                  diffFilter === d
                    ? "bg-accent text-accent-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/70"
                }`}
              >
                {d}
              </button>
            ))}
          </div>
          {/* Sort */}
          <select
            data-ocid="treks.sort_select"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="text-xs border border-input rounded-md px-2 py-2 bg-background font-body focus:outline-none focus:ring-2 focus:ring-primary/30 shrink-0"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
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
              }}
              className="mt-4 px-4 py-2 text-sm bg-primary text-primary-foreground rounded-md font-body"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <>
            <p className="text-sm text-muted-foreground font-body mb-4">
              Showing {filtered.length} trek{filtered.length !== 1 ? "s" : ""}
            </p>
            <div
              key={`${stateFilter}|${diffFilter}|${search}|${sort}`}
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
