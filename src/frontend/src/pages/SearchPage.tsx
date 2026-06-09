import { PackageCard } from "@/components/PackageCard";
import { StayCard } from "@/components/StayCard";
import { TrekCard } from "@/components/TrekCard";
import { YatraCard } from "@/components/YatraCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useSearch } from "@/hooks/useBackendQuery";
import { Search, X } from "lucide-react";
import { useState } from "react";

export default function SearchPage() {
  const [term, setTerm] = useState("");
  const [activeTab, setActiveTab] = useState<
    "all" | "treks" | "yatras" | "packages" | "stays" | "blog"
  >("all");
  const { data, isLoading } = useSearch(term);

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
              "radial-gradient(circle at 30% 50%, var(--brand-gold) 0%, transparent 55%), radial-gradient(circle at 80% 20%, var(--brand-secondary) 0%, transparent 45%)",
          }}
        />
        <div className="relative container mx-auto px-6 pt-20 pb-16 text-center">
          <h1
            className="font-display text-5xl md:text-7xl font-bold leading-[0.95] tracking-tight mb-4"
            style={{ color: "#fff" }}
          >
            Find Your
            <br />
            <span style={{ color: "var(--brand-gold)" }}>
              Himalayan Adventure
            </span>
          </h1>
          <div
            className="w-16 h-0.5 mx-auto mt-5 mb-8 rounded-full"
            style={{ background: "var(--brand-gold)" }}
          />

          {/* Large Search Input */}
          <div className="max-w-2xl mx-auto">
            <div
              className="relative flex items-center rounded-2xl overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.2)",
                backdropFilter: "blur(12px)",
              }}
            >
              <Search
                size={22}
                className="absolute left-5 shrink-0"
                style={{ color: "var(--brand-gold)" }}
              />
              <input
                type="search"
                data-ocid="search.input"
                placeholder="Search treks, yatras, packages, stays\u2026"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                className="w-full pl-14 pr-6 py-5 bg-transparent font-body text-lg outline-none placeholder:opacity-50"
                style={{ color: "#fff" }}
              />
              {term && (
                <button
                  type="button"
                  onClick={() => setTerm("")}
                  className="absolute right-5 flex items-center justify-center w-6 h-6 rounded-full"
                  style={{ background: "rgba(255,255,255,0.2)", color: "#fff" }}
                  data-ocid="search.clear_button"
                >
                  ×
                </button>
              )}
            </div>
            <p
              className="text-xs font-body mt-3"
              style={{ color: "rgba(255,255,255,0.45)" }}
            >
              Try: \u201cKedarkantha\u201d, \u201cChar Dham\u201d,
              \u201cHoneymoon\u201d, \u201cGarhwal\u201d
            </p>
          </div>
        </div>
      </section>

      {/* Results area */}
      <section className="container mx-auto px-6 py-12">
        {/* Category Tabs (visible when results exist) */}
        {hasResults && (
          <div
            className="flex gap-2 flex-wrap mb-10 pb-6 border-b"
            style={{ borderColor: "var(--border-light)" }}
          >
            {tabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                data-ocid={`search.tab.${tab.key}`}
                onClick={() => setActiveTab(tab.key)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-body font-medium transition-all duration-200"
                style={{
                  background:
                    activeTab === tab.key
                      ? "var(--brand-primary)"
                      : "var(--bg-tertiary)",
                  color:
                    activeTab === tab.key ? "#fff" : "var(--text-secondary)",
                  border:
                    activeTab === tab.key
                      ? "1px solid var(--brand-primary)"
                      : "1px solid var(--border-light)",
                }}
              >
                {tab.label}
                {tab.count !== undefined && tab.count > 0 && (
                  <span
                    className="text-[11px] px-1.5 py-0.5 rounded-full font-semibold"
                    style={{
                      background:
                        activeTab === tab.key
                          ? "rgba(255,255,255,0.2)"
                          : "var(--brand-gold)",
                      color:
                        activeTab === tab.key ? "#fff" : "var(--brand-primary)",
                    }}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        )}

        {/* Loading state */}
        {isLoading && (
          <div className="space-y-10" data-ocid="search.loading_state">
            {["Treks", "Yatras"].map((section) => (
              <div key={section}>
                <div
                  className="h-7 w-32 rounded-lg mb-4"
                  style={{ background: "var(--bg-tertiary)" }}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[1, 2, 3, 4].map((n) => (
                    <div
                      key={n}
                      className="rounded-2xl overflow-hidden"
                      style={{ background: "var(--bg-secondary)" }}
                    >
                      <Skeleton className="h-44 w-full" />
                      <div className="p-4 space-y-2">
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

        {/* Empty state */}
        {noResults && (
          <div
            className="flex flex-col items-center justify-center py-24 rounded-2xl"
            data-ocid="search.empty_state"
            style={{ background: "var(--bg-secondary)" }}
          >
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
              style={{
                background: "var(--bg-tertiary)",
                border: "1px solid var(--border-light)",
              }}
            >
              <Search size={32} style={{ color: "var(--brand-gold)" }} />
            </div>
            <h3
              className="font-display text-2xl font-bold mb-2"
              style={{ color: "var(--brand-primary)" }}
            >
              No results for \u201c{term}\u201d
            </h3>
            <p
              className="font-body text-sm mb-6 max-w-sm text-center"
              style={{ color: "var(--text-muted)" }}
            >
              Try different keywords — like a trek name, region, or travel
              style.
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {["Kedarkantha", "Char Dham", "Spiti Valley", "Garhwal"].map(
                (s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setTerm(s)}
                    data-ocid={`search.suggestion.${s.toLowerCase().replace(/\s+/g, "-")}`}
                    className="px-4 py-1.5 rounded-full text-xs font-body font-medium transition-all duration-200 hover:opacity-80"
                    style={{
                      background: "var(--bg-tertiary)",
                      color: "var(--text-secondary)",
                      border: "1px solid var(--border-light)",
                    }}
                  >
                    {s}
                  </button>
                ),
              )}
            </div>
          </div>
        )}

        {/* Idle state (no query yet) */}
        {!term && !isLoading && (
          <div className="text-center py-16">
            <p
              className="font-body text-base"
              style={{ color: "var(--text-muted)" }}
            >
              Start typing to explore treks, yatras, packages, and stays across
              the Himalayas.
            </p>
          </div>
        )}

        {/* Results */}
        {data && !isLoading && (
          <div className="space-y-14">
            {showTreks && (
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <h2
                    className="font-display text-2xl font-bold"
                    style={{ color: "var(--brand-primary)" }}
                  >
                    Treks
                  </h2>
                  <span
                    className="text-xs font-body font-semibold px-2.5 py-1 rounded-full"
                    style={{
                      background: "var(--brand-gold)",
                      color: "var(--brand-primary)",
                    }}
                  >
                    {data.treks.length}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {data.treks.map((t, i) => (
                    <TrekCard key={String(t.id)} trek={t} index={i} />
                  ))}
                </div>
              </section>
            )}
            {showYatras && (
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <h2
                    className="font-display text-2xl font-bold"
                    style={{ color: "var(--brand-primary)" }}
                  >
                    Yatras
                  </h2>
                  <span
                    className="text-xs font-body font-semibold px-2.5 py-1 rounded-full"
                    style={{
                      background: "var(--brand-gold)",
                      color: "var(--brand-primary)",
                    }}
                  >
                    {data.yatras.length}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {data.yatras.map((y, i) => (
                    <YatraCard key={String(y.id)} yatra={y} index={i} />
                  ))}
                </div>
              </section>
            )}
            {showPackages && (
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <h2
                    className="font-display text-2xl font-bold"
                    style={{ color: "var(--brand-primary)" }}
                  >
                    Packages
                  </h2>
                  <span
                    className="text-xs font-body font-semibold px-2.5 py-1 rounded-full"
                    style={{
                      background: "var(--brand-gold)",
                      color: "var(--brand-primary)",
                    }}
                  >
                    {data.packages.length}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {data.packages.map((p, i) => (
                    <PackageCard key={String(p.id)} pkg={p} index={i} />
                  ))}
                </div>
              </section>
            )}
            {showStays && (
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <h2
                    className="font-display text-2xl font-bold"
                    style={{ color: "var(--brand-primary)" }}
                  >
                    Stays
                  </h2>
                  <span
                    className="text-xs font-body font-semibold px-2.5 py-1 rounded-full"
                    style={{
                      background: "var(--brand-gold)",
                      color: "var(--brand-primary)",
                    }}
                  >
                    {data.stays.length}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
