"use client";

import { getAllPackages } from "@/data";
import { PackageCard } from "@/components/PackageCard";
import { SectionHeader } from "@/components/SectionHeader";
import { ArrowUpDown, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";

const CATEGORIES = [
  "All",
  "Ladakh",
  "Spiti",
  "Himachal",
  "Uttarakhand",
  "Kerala",
  "Adventure",
] as const;

const SORT_OPTIONS = [
  { label: "Popularity", value: "popularity" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Duration", value: "duration" },
] as const;

const SKELETON_PACKAGES = [1, 2, 3, 4, 5, 6];

export default function PackagesPage() {
  const packages = getAllPackages();
  const isLoading = false;
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [sortBy, setSortBy] = useState<string>("popularity");
  const [showSort, setShowSort] = useState(false);

  const filtered = useMemo(() => {
    let list = [...packages];
    if (activeCategory !== "All") {
      list = list.filter(
        (p) => p.category.toLowerCase() === activeCategory.toLowerCase(),
      );
    }
    switch (sortBy) {
      case "price-asc":
        list.sort(
          (a, b) => Number(a.priceRange.minINR) - Number(b.priceRange.minINR),
        );
        break;
      case "price-desc":
        list.sort(
          (a, b) => Number(b.priceRange.minINR) - Number(a.priceRange.minINR),
        );
        break;
      case "duration": {
        const dur = (d: string) => {
          const m = d.match(/(\d+)/);
          return m ? Number.parseInt(m[1]) : 0;
        };
        list.sort((a, b) => dur(a.duration) - dur(b.duration));
        break;
      }
      default:
        break;
    }
    return list;
  }, [packages, activeCategory, sortBy]);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative bg-muted/30 border-b border-border">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <SectionHeader
            label="Curated Himalayan Packages"
            title="Curated Himalayan Packages"
            subtitle="Every detail handled. Every memory earned."
            centered
          />
        </div>
      </section>

      {/* Filters & Sort */}
      <section className="detail-section-nav bg-card/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-2.5 md:py-3">
          <div className="flex items-center gap-2 md:gap-3 overflow-x-auto hide-scrollbar">
            <SlidersHorizontal
              size={16}
              className="text-muted-foreground shrink-0"
            />
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                data-ocid={`package.filter.${cat.toLowerCase()}`}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-body font-medium whitespace-nowrap transition-colors ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
            <div className="ml-auto relative shrink-0">
              <button
                type="button"
                data-ocid="package.sort_toggle"
                onClick={() => setShowSort((v) => !v)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-body font-medium bg-muted text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowUpDown size={13} />
                {SORT_OPTIONS.find((s) => s.value === sortBy)?.label}
              </button>
              {showSort && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-card border border-border rounded-lg shadow-lg z-40 py-1">
                  {SORT_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => {
                        setSortBy(opt.value);
                        setShowSort(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-xs font-body transition-colors ${
                        sortBy === opt.value
                          ? "text-primary bg-primary/8"
                          : "text-foreground hover:bg-muted"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="container mx-auto px-4 py-10">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SKELETON_PACKAGES.map((n) => (
              <div
                key={n}
                className="rounded-xl overflow-hidden border border-border bg-card"
              >
                <div className="h-52 bg-muted animate-pulse" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-muted rounded animate-pulse w-1/3" />
                  <div className="h-5 bg-muted rounded animate-pulse w-3/4" />
                  <div className="h-3 bg-muted rounded animate-pulse w-full" />
                  <div className="flex justify-between">
                    <div className="h-3 bg-muted rounded animate-pulse w-1/4" />
                    <div className="h-3 bg-muted rounded animate-pulse w-1/4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground font-body text-lg">
              No packages found in this category.
            </p>
            <button
              type="button"
              onClick={() => setActiveCategory("All")}
              className="mt-4 px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-body font-medium"
            >
              View All Packages
            </button>
          </div>
        ) : (
          <>
            <p className="text-xs text-muted-foreground font-body mb-4">
              {filtered.length} package{filtered.length !== 1 ? "s" : ""} found
            </p>
            <div
              key={activeCategory}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((pkg, i) => (
                <PackageCard key={String(pkg.id)} pkg={pkg} index={i} />
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
}
