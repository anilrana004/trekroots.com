"use client";

import { getAllPackages, whatsappLink, type Package } from "@/data";
import { CloudinaryImage } from "@/components/CloudinaryImage";
import {
  DiscoveryProductCard,
  DiscoveryRail,
  DiscoverySearchBanner,
  DiscoveryShell,
  DiscoverySidebar,
  DiscoveryThemeTiles,
  DiscoveryWhyUs,
  type SidebarGroup,
} from "@/components/discovery";
import { tripPrice } from "@/lib/price";
import {
  Compass,
  HeartHandshake,
  Map,
  Sparkles,
  Users,
  Wallet,
} from "lucide-react";
import { useMemo, useState } from "react";

function PackageCardItem({
  pkg,
  index,
  layout = "rail",
  badge,
}: {
  pkg: Package;
  index: number;
  layout?: "rail" | "grid";
  badge?: string;
}) {
  const price = tripPrice(pkg.priceRange);
  return (
    <DiscoveryProductCard
      href={`/packages/${pkg.slug}`}
      imageSrc={pkg.imageUrl}
      imageAlt={`${pkg.name} package`}
      title={pkg.name}
      meta={`${pkg.category} · ${pkg.duration}`}
      subtitle={pkg.problemSolved || pkg.description.slice(0, 90)}
      priceLabel={price.onRequest ? "On request" : price.label}
      primaryLabel="Package Details"
      secondaryLabel="Enquire"
      secondaryHref={whatsappLink(
        `Hi TrekRoots! I'd like to enquire about ${pkg.name}.`,
      )}
      badge={badge}
      ocid={`packages.card.${pkg.slug}`}
      priority={index < 2}
      layout={layout}
    />
  );
}

export default function PackagesPage() {
  const packages = getAllPackages();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [durationKey, setDurationKey] = useState("All");

  const categories = useMemo(
    () => [...new Set(packages.map((p) => p.category))].sort(),
    [packages],
  );

  const durationDays = (duration: string) => {
    const m = duration.match(/(\d+)/);
    return m ? Number.parseInt(m[1], 10) : 0;
  };

  const filtered = useMemo(() => {
    let list = packages;
    if (category !== "All")
      list = list.filter(
        (p) => p.category.toLowerCase() === category.toLowerCase(),
      );
    if (durationKey === "short")
      list = list.filter((p) => durationDays(p.duration) <= 5);
    if (durationKey === "week")
      list = list.filter((p) => {
        const d = durationDays(p.duration);
        return d >= 6 && d <= 8;
      });
    if (durationKey === "long")
      list = list.filter((p) => durationDays(p.duration) >= 9);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q),
      );
    }
    return list;
  }, [packages, category, durationKey, search]);

  const hasActiveFilters =
    category !== "All" ||
    durationKey !== "All" ||
    search.trim().length > 0;

  const clearFilters = () => {
    setCategory("All");
    setDurationKey("All");
    setSearch("");
  };

  const sidebarGroups: SidebarGroup[] = [
    {
      title: "Explore By Region",
      items: [
        {
          label: "All packages",
          active: category === "All" && !hasActiveFilters,
          onClick: clearFilters,
          count: packages.length,
        },
        ...categories.map((c) => ({
          label: c,
          active: category === c,
          onClick: () => setCategory(c),
          count: packages.filter((p) => p.category === c).length,
        })),
      ],
    },
    {
      title: "By Duration",
      items: [
        {
          label: "Short (≤ 5 nights)",
          active: durationKey === "short",
          onClick: () => setDurationKey("short"),
          count: packages.filter((p) => durationDays(p.duration) <= 5).length,
        },
        {
          label: "A week (6–8 nights)",
          active: durationKey === "week",
          onClick: () => setDurationKey("week"),
          count: packages.filter((p) => {
            const d = durationDays(p.duration);
            return d >= 6 && d <= 8;
          }).length,
        },
        {
          label: "Long (9+ nights)",
          active: durationKey === "long",
          onClick: () => setDurationKey("long"),
          count: packages.filter((p) => durationDays(p.duration) >= 9).length,
        },
      ],
    },
  ];

  const byCat = (name: string) =>
    packages.filter((p) => p.category.toLowerCase() === name.toLowerCase());

  const ladakh = byCat("Ladakh");
  const spiti = byCat("Spiti");
  const himachal = byCat("Himachal");
  const kerala = byCat("Kerala");
  const uttarakhand = byCat("Uttarakhand");

  const categoryStrip = categories.map((c) => {
    const sample = packages.find((p) => p.category === c)!;
    return {
      label: c,
      href: `/packages`,
      imageSrc: sample.imageUrl,
      imageAlt: `${c} packages`,
      // We'll handle click via filter — use hash-less and set on click in strip
    };
  });

  // Make category strip set filter instead of dead links — override with interactive strip below
  const themeTiles = [
    {
      title: "Ladakh Adventures",
      onClick: () => setCategory("Ladakh"),
      imageSrc: ladakh[0]?.imageUrl ?? packages[0]?.imageUrl ?? "",
      imageAlt: "Ladakh",
      caption: "Bike trips across high passes",
    },
    {
      title: "Spiti Circuits",
      onClick: () => setCategory("Spiti"),
      imageSrc: spiti[0]?.imageUrl ?? packages[0]?.imageUrl ?? "",
      imageAlt: "Spiti",
      caption: "Cold desert monasteries & valleys",
    },
    {
      title: "Himachal Escapes",
      onClick: () => setCategory("Himachal"),
      imageSrc: himachal[0]?.imageUrl ?? packages[0]?.imageUrl ?? "",
      imageAlt: "Himachal",
      caption: "Kasol, Manali, Bir & beyond",
    },
  ].filter((t) => t.imageSrc);

  return (
    <div>
      <DiscoverySearchBanner
        title="Looking for a curated package?"
        placeholder="Search Spiti, Ladakh, Kerala, Himachal…"
        value={search}
        onChange={setSearch}
        ocid="packages.search"
      />

      <DiscoveryShell
        ocid="packages.shell"
        sidebar={
          <DiscoverySidebar
            groups={sidebarGroups}
            hasActiveFilters={hasActiveFilters}
            onClear={clearFilters}
            ocid="packages.sidebar"
          />
        }
      >
        {hasActiveFilters ? (
          <section className="pb-8 pt-2">
            <h2 className="mb-1 font-display text-xl font-bold text-[#06281E] md:text-2xl">
              Matching packages
            </h2>
            <p className="mb-5 font-body text-sm text-[#5A6B62]">
              Showing {filtered.length} package
              {filtered.length === 1 ? "" : "s"}
            </p>
            {filtered.length === 0 ? (
              <div className="rounded-xl border border-[#E8E4D4] bg-[#FFFBEB] px-6 py-16 text-center">
                <p className="font-display text-lg font-bold text-[#06281E]">
                  No packages match
                </p>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-5 rounded-full px-5 py-2.5 font-body text-xs font-bold"
                  style={{ background: "#FFC107" }}
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filtered.map((p, i) => (
                  <PackageCardItem
                    key={p.slug}
                    pkg={p}
                    index={i}
                    layout="grid"
                  />
                ))}
              </div>
            )}
          </section>
        ) : (
          <>
            <section className="pb-2 pt-2 md:pt-4">
              <h2 className="mb-5 font-display text-xl font-bold text-[#06281E] md:mb-6 md:text-2xl">
                Explore Our Top Categories
              </h2>
              <div className="flex gap-5 overflow-x-auto hide-scrollbar pb-2 sm:gap-6">
                {categoryStrip.map((item, i) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => setCategory(item.label)}
                    data-ocid={`packages.categories.${i + 1}`}
                    className="group flex w-[88px] shrink-0 flex-col items-center gap-2.5 sm:w-[100px]"
                  >
                    <span
                      className="relative block h-[72px] w-[72px] overflow-hidden rounded-full border-2 border-[#FFC107] shadow-sm transition-transform group-hover:scale-105 sm:h-[88px] sm:w-[88px]"
                    >
                      <CloudinaryImage
                        src={item.imageSrc}
                        alt={item.imageAlt}
                        width={176}
                        height={176}
                        sizes="88px"
                        className="h-full w-full object-cover"
                        transform={{
                          width: 176,
                          height: 176,
                          crop: "fill",
                          gravity: "auto",
                        }}
                      />
                    </span>
                    <span className="text-center font-body text-[11px] font-semibold leading-tight text-[#1A1A1A] sm:text-[12px]">
                      {item.label}
                    </span>
                  </button>
                ))}
              </div>
            </section>

            <DiscoveryRail
              title="Curated Himalayan Packages"
              aside="Stays, transfers and day plans handled — every detail earned on the road."
              ocid="packages.rail.all"
            >
              {packages.slice(0, 8).map((p, i) => (
                <PackageCardItem
                  key={p.slug}
                  pkg={p}
                  index={i}
                  badge={i === 0 ? "Popular" : undefined}
                />
              ))}
            </DiscoveryRail>

            {ladakh.length > 0 ? (
              <DiscoveryRail
                title="Ladakh Bike & Road Trips"
                aside="High passes, monastic valleys and the classic Leh loops."
                ocid="packages.rail.ladakh"
              >
                {ladakh.map((p, i) => (
                  <PackageCardItem key={p.slug} pkg={p} index={i} />
                ))}
              </DiscoveryRail>
            ) : null}

            {spiti.length > 0 ? (
              <DiscoveryRail
                title="Spiti Valley Circuits"
                aside="Cold-desert monasteries, fossil villages and sky-high roads."
                ocid="packages.rail.spiti"
              >
                {spiti.map((p, i) => (
                  <PackageCardItem key={p.slug} pkg={p} index={i} />
                ))}
              </DiscoveryRail>
            ) : null}

            {himachal.length > 0 ? (
              <DiscoveryRail
                title="Best of Himachal"
                aside="Kasol, Manali, Bir, McLeodganj — mountain towns linked into one trip."
                ocid="packages.rail.himachal"
              >
                {himachal.map((p, i) => (
                  <PackageCardItem key={p.slug} pkg={p} index={i} />
                ))}
              </DiscoveryRail>
            ) : null}

            {uttarakhand.length > 0 ? (
              <DiscoveryRail
                title="Uttarakhand Highlights"
                aside="The best of Devbhoomi in one curated circuit."
                ocid="packages.rail.uk"
              >
                {uttarakhand.map((p, i) => (
                  <PackageCardItem key={p.slug} pkg={p} index={i} />
                ))}
              </DiscoveryRail>
            ) : null}

            {kerala.length > 0 ? (
              <DiscoveryRail
                title="Kerala Getaways"
                aside="Backwaters, hills and coast — when you want green after the high mountains."
                ocid="packages.rail.kerala"
              >
                {kerala.map((p, i) => (
                  <PackageCardItem key={p.slug} pkg={p} index={i} />
                ))}
              </DiscoveryRail>
            ) : null}

            <DiscoveryThemeTiles
              title="Trip Themes"
              aside="Pick a region — we handle the rest."
              tiles={themeTiles}
              ocid="packages.themes"
            />

            <div className="pb-10 pt-4">
              <DiscoveryWhyUs
                title="Why Travellers Book Packages With Us"
                items={[
                  {
                    icon: Map,
                    title: "Logistics, done",
                    body: "Stays, transfers and day sequencing planned so you travel — not troubleshoot.",
                  },
                  {
                    icon: Compass,
                    title: "Routes we actually run",
                    body: "Spiti, Ladakh, Himachal and Kerala circuits refined across many departures.",
                  },
                  {
                    icon: Wallet,
                    title: "Clear pricing",
                    body: "Transparent inclusions and WhatsApp quotes — no surprise add-ons on the road.",
                  },
                  {
                    icon: Users,
                    title: "Groups & private",
                    body: "Join a departure or ask us to craft a private itinerary for your dates.",
                  },
                  {
                    icon: Sparkles,
                    title: "Mix with treks & stays",
                    body: "Add a Himalayan trek or our homestays to turn a package into a fuller journey.",
                  },
                  {
                    icon: HeartHandshake,
                    title: "Human support",
                    body: "Real mountain experts on WhatsApp before you leave and while you are on the road.",
                  },
                ]}
                ocid="packages.why"
              />
            </div>
          </>
        )}
      </DiscoveryShell>
    </div>
  );
}
