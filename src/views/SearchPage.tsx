"use client";

import { PackageCard } from "@/components/PackageCard";
import { StayCard } from "@/components/StayCard";
import { TrekCard } from "@/components/TrekCard";
import { YatraCard } from "@/components/YatraCard";
import { Skeleton } from "@/components/ui/skeleton";
import { searchAll } from "@/data";
import { Search, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const SUGGESTIONS = [
  "Kedarkantha",
  "Char Dham",
  "Honeymoon",
  "Garhwal",
  "Spiti Valley",
] as const;

export default function SearchPage() {
  const router = useRouter();
  const params = useSearchParams();
  const [term, setTerm] = useState("");
  const [activeTab, setActiveTab] = useState<
    "all" | "treks" | "yatras" | "packages" | "stays" | "blog"
  >("all");

  useEffect(() => {
    const q = params.get("q")?.trim() ?? "";
    if (q) setTerm(q);
  }, [params]);

  const setQuery = (value: string) => {
    setTerm(value);
    const next = value.trim();
    const url = next
      ? `/search?q=${encodeURIComponent(next)}`
      : "/search";
    router.replace(url, { scroll: false });
  };

  const data = useMemo(() => (term.length >= 2 ? searchAll(term) : null), [term]);
  const isLoading = false;

  const totalCount = data
    ? data.treks.length +
      data.yatras.length +
      data.packages.length +
      data.stays.length
    : 0;

  const tabs: Array<{ key: typeof activeTab; label: string; count?: number }> =
    [
      { key: "all", label: "All", count: totalCount },
      { key: "treks", label: "Treks", count: data?.treks.length },
      { key: "yatras", label: "Yatras", count: data?.yatras.length },
      { key: "packages", label: "Packages", count: data?.packages.length },
      { key: "stays", label: "Stays", count: data?.stays.length },
    ];

  const hasResults = data && totalCount > 0;
  const noResults = data && totalCount === 0 && term.length >= 2;
  const showTreks =
    (activeTab === "all" || activeTab === "treks") &&
    (data?.treks.length ?? 0) > 0;
  const showYatras =
    (activeTab === "all" || activeTab === "yatras") &&
    (data?.yatras.length ?? 0) > 0;
  const showPackages =
    (activeTab === "all" || activeTab === "packages") &&
    (data?.packages.length ?? 0) > 0;
  const showStays =
    (activeTab === "all" || activeTab === "stays") &&
    (data?.stays.length ?? 0) > 0;

  return (
    <div className="min-h-screen bg-white">
      <section
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(165deg, #FFC107 0%, #FFB300 55%, #FFA000 100%)",
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 18% 20%, #fff 0%, transparent 42%), radial-gradient(circle at 88% 70%, #FFE082 0%, transparent 40%)",
          }}
        />
        <div className="relative mx-auto max-w-[900px] px-5 pt-14 pb-12 md:pt-20 md:pb-16 text-center">
          <p className="mb-3 font-body text-[11px] font-semibold uppercase tracking-[0.2em] text-[#1A1A1A]/90">
            Search TrekRoots
          </p>
          <h1 className="font-display text-[2rem] md:text-5xl font-bold leading-[1.1] tracking-tight text-[#1A1A1A]">
            Find your Himalayan
            <br />
            adventure
          </h1>
          <div className="mx-auto mt-4 mb-8 h-1 w-12 rounded-full bg-[#1A1A1A]/80" />

          <div className="mx-auto max-w-xl">
            <label className="sr-only" htmlFor="site-search">
              Search treks, yatras, packages, and stays
            </label>
            <div className="relative flex items-center rounded-xl bg-white shadow-[0_8px_28px_rgba(0,0,0,0.12)] ring-1 ring-black/5">
              <Search
                size={20}
                className="pointer-events-none absolute left-4 shrink-0 text-[#888888]"
                aria-hidden
              />
              <input
                id="site-search"
                type="search"
                autoFocus
                autoComplete="off"
                data-ocid="search.input"
                placeholder="Search treks, yatras, packages, stays…"
                value={term}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full rounded-xl bg-transparent py-4 pl-12 pr-12 font-body text-[15px] text-[#1A1A1A] outline-none placeholder:text-[#888888] md:py-[1.15rem] md:text-base"
              />
              {term ? (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="absolute right-3 flex h-8 w-8 items-center justify-center rounded-full text-[#555555] transition-colors hover:bg-[#F0F0F0]"
                  data-ocid="search.clear_button"
                  aria-label="Clear search"
                >
                  <X size={16} />
                </button>
              ) : null}
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
              <span className="font-body text-[12px] font-medium text-[#1A1A1A]/70">
                Try
              </span>
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setQuery(s)}
                  data-ocid={`search.suggestion.${s.toLowerCase().replace(/\s+/g, "-")}`}
                  className="rounded-full border border-[#1A1A1A]/15 bg-white/55 px-3 py-1 font-body text-[12px] font-medium text-[#1A1A1A] backdrop-blur-sm transition-colors hover:border-[#1A1A1A]/35 hover:bg-white"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-5 py-10 md:px-6 md:py-12">
        {hasResults && (
          <div className="mb-8 flex flex-wrap gap-2 border-b border-[#E8E8E8] pb-5 md:mb-10 md:pb-6">
            {tabs.map((tab) => {
              const active = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  data-ocid={`search.tab.${tab.key}`}
                  onClick={() => setActiveTab(tab.key)}
                  className="flex items-center gap-1.5 rounded-full px-4 py-2 font-body text-sm font-medium transition-colors"
                  style={{
                    background: active ? "#1A1A1A" : "#F5F5F5",
                    color: active ? "#FFFFFF" : "#555555",
                    border: active ? "1px solid #1A1A1A" : "1px solid #E8E8E8",
                  }}
                >
                  {tab.label}
                  {tab.count !== undefined && tab.count > 0 && (
                    <span
                      className="rounded-full px-1.5 py-0.5 text-[11px] font-semibold"
                      style={{
                        background: active ? "rgba(255,255,255,0.18)" : "#FFC107",
                        color: active ? "#fff" : "#1A1A1A",
                      }}
                    >
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}

        {isLoading && (
          <div className="space-y-10" data-ocid="search.loading_state">
            {["Treks", "Yatras"].map((section) => (
              <div key={section}>
                <div className="mb-4 h-7 w-32 rounded-lg bg-[#EEEEEE]" />
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {[1, 2, 3, 4].map((n) => (
                    <div
                      key={n}
                      className="overflow-hidden rounded-2xl bg-[#F5F5F5]"
                    >
                      <Skeleton className="h-44 w-full" />
                      <div className="space-y-2 p-4">
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-3 w-1/2" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {noResults && (
          <div
            className="flex flex-col items-center justify-center rounded-2xl border border-[#E8E8E8] bg-[#F7F7F7] py-20"
            data-ocid="search.empty_state"
          >
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-[#E8E8E8] bg-white">
              <Search size={28} className="text-[#FFC107]" />
            </div>
            <h3 className="mb-2 font-display text-2xl font-bold text-[#1A1A1A]">
              No results for “{term}”
            </h3>
            <p className="mb-6 max-w-sm text-center font-body text-sm text-[#666666]">
              Try a trek name, region, or travel style — or pick a suggestion
              below.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setTerm(s)}
                  data-ocid={`search.empty_suggestion.${s.toLowerCase().replace(/\s+/g, "-")}`}
                  className="rounded-full border border-[#E0E0E0] bg-white px-4 py-1.5 font-body text-xs font-medium text-[#555555] transition-colors hover:border-[#FFC107] hover:text-[#1A1A1A]"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {!term && !isLoading && (
          <div className="mx-auto max-w-lg py-10 text-center md:py-14">
            <p className="font-body text-base text-[#666666]">
              Start typing to explore treks, yatras, packages, and stays across
              the Himalayas.
            </p>
          </div>
        )}

        {term.length === 1 && !isLoading && (
          <div className="py-10 text-center">
            <p className="font-body text-sm text-[#888888]">
              Type at least 2 characters to search.
            </p>
          </div>
        )}

        {data && !isLoading && (
          <div className="space-y-14">
            {showTreks && (
              <section>
                <SectionHeading label="Treks" count={data.treks.length} />
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {data.treks.map((t, i) => (
                    <TrekCard key={String(t.id)} trek={t} index={i} />
                  ))}
                </div>
              </section>
            )}
            {showYatras && (
              <section>
                <SectionHeading label="Yatras" count={data.yatras.length} />
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {data.yatras.map((y, i) => (
                    <YatraCard key={String(y.id)} yatra={y} index={i} />
                  ))}
                </div>
              </section>
            )}
            {showPackages && (
              <section>
                <SectionHeading label="Packages" count={data.packages.length} />
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {data.packages.map((p, i) => (
                    <PackageCard key={String(p.id)} pkg={p} index={i} />
                  ))}
                </div>
              </section>
            )}
            {showStays && (
              <section>
                <SectionHeading label="Stays" count={data.stays.length} />
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {data.stays.map((s, i) => (
                    <StayCard key={String(s.id)} stay={s} index={i} />
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </section>
    </div>
  );
}

function SectionHeading({ label, count }: { label: string; count: number }) {
  return (
    <div className="mb-6 flex items-center gap-3">
      <h2 className="font-display text-2xl font-bold text-[#1A1A1A]">{label}</h2>
      <span className="rounded-full bg-[#FFC107] px-2.5 py-1 font-body text-xs font-semibold text-[#1A1A1A]">
        {count}
      </span>
    </div>
  );
}
