"use client";

import { getAllStays, whatsappLink, type Stay } from "@/data";
import {
  DiscoveryCategoryStrip,
  DiscoveryProductCard,
  DiscoveryQuickNav,
  DiscoveryRail,
  DiscoverySearchBanner,
  DiscoveryShell,
  DiscoverySidebar,
  DiscoveryThemeTiles,
  DiscoveryTipBar,
  DiscoveryWhyUs,
  type SidebarGroup,
} from "@/components/discovery";
import { formatINR } from "@/lib/price";
import {
  Award,
  Home,
  MapPin,
  Shield,
  Sparkles,
  ThumbsUp,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

function StayCardItem({
  stay,
  index,
  layout = "rail",
  badge,
}: {
  stay: Stay;
  index: number;
  layout?: "rail" | "grid";
  badge?: string;
}) {
  return (
    <DiscoveryProductCard
      href={`/stays/${stay.slug}`}
      imageSrc={stay.imageUrl}
      imageAlt={`${stay.name} in ${stay.location}`}
      title={stay.name}
      meta={`${stay.stayType} · ${stay.location.split(",")[0]}`}
      subtitle={stay.location}
      priceLabel={`${formatINR(stay.pricePerNightMin)} / night`}
      primaryLabel="Stay Details"
      secondaryLabel="Enquire"
      secondaryHref={whatsappLink(
        `Hi TrekRoots! I'd like to enquire about ${stay.name}.`,
      )}
      badge={badge}
      ocid={`stays.card.${stay.slug}`}
      priority={index < 2}
      layout={layout}
    />
  );
}

function regionOf(stay: Stay): string {
  const loc = stay.location.toLowerCase();
  if (loc.includes("munsiyari") || loc.includes("pithoragarh")) return "Kumaon";
  if (
    loc.includes("sankri") ||
    loc.includes("chopta") ||
    loc.includes("auli") ||
    loc.includes("lohajung") ||
    loc.includes("rishikesh") ||
    loc.includes("uttarakhand")
  )
    return "Garhwal";
  if (loc.includes("himachal")) return "Himachal";
  return "Uttarakhand";
}

export default function StaysPage() {
  const stays = getAllStays();
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("All");
  const [stayType, setStayType] = useState("All");

  const types = useMemo(
    () => [...new Set(stays.map((s) => s.stayType))].sort(),
    [stays],
  );

  const filtered = useMemo(() => {
    let list = stays;
    if (region !== "All")
      list = list.filter((s) => regionOf(s) === region);
    if (stayType !== "All") list = list.filter((s) => s.stayType === stayType);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.location.toLowerCase().includes(q) ||
          s.stayType.toLowerCase().includes(q),
      );
    }
    return list;
  }, [stays, region, stayType, search]);

  const hasActiveFilters =
    region !== "All" || stayType !== "All" || search.trim().length > 0;

  const clearFilters = () => {
    setRegion("All");
    setStayType("All");
    setSearch("");
  };

  const sidebarGroups: SidebarGroup[] = [
    {
      title: "Explore By Region",
      items: [
        {
          label: "All regions",
          active: region === "All" && !hasActiveFilters,
          onClick: clearFilters,
          count: stays.length,
        },
        ...(["Garhwal", "Kumaon"] as const).map((r) => ({
          label: r,
          active: region === r,
          onClick: () => setRegion(r),
          count: stays.filter((s) => regionOf(s) === r).length,
        })),
      ],
    },
    {
      title: "Stay Type",
      items: types.map((t) => ({
        label: t,
        active: stayType === t,
        onClick: () => setStayType(t),
        count: stays.filter((s) => s.stayType === t).length,
      })),
    },
  ];

  const homestays = stays.filter((s) =>
    /homestay/i.test(s.stayType),
  );
  const camps = stays.filter((s) => /camp|tent/i.test(s.stayType));
  const boutique = stays.filter((s) =>
    /boutique|cottage|eco/i.test(s.stayType),
  );

  const categories = stays.map((s) => ({
    label: s.name.replace(/^Manya |^TrekRoots /i, "").split(" ")[0] ?? s.name,
    href: `/stays/${s.slug}`,
    imageSrc: s.imageUrl,
    imageAlt: s.name,
  }));

  const themeTiles = [
    {
      title: "Homestays",
      onClick: () => setStayType("Homestay"),
      imageSrc: homestays[0]?.imageUrl ?? stays[0]?.imageUrl ?? "",
      imageAlt: "Homestays",
      caption: "Village warmth near trek bases",
    },
    {
      title: "Camps & Tents",
      onClick: () => {
        const camp = camps[0];
        if (camp) setStayType(camp.stayType);
      },
      imageSrc: camps[0]?.imageUrl ?? stays[0]?.imageUrl ?? "",
      imageAlt: "Camps",
      caption: "Riverside nights under open sky",
    },
    {
      title: "Boutique Stays",
      onClick: () => {
        const b = boutique[0];
        if (b) setStayType(b.stayType);
      },
      imageSrc: boutique[0]?.imageUrl ?? stays[0]?.imageUrl ?? "",
      imageAlt: "Boutique stays",
      caption: "Comfort with mountain character",
    },
  ].filter((t) => t.imageSrc);

  return (
    <div>
      <DiscoverySearchBanner
        title="Looking for a Himalayan stay?"
        placeholder="Search by village, property or stay type…"
        value={search}
        onChange={setSearch}
        ocid="stays.search"
      />
      <DiscoveryQuickNav
        items={[
          { label: "Homestays", href: "/stays" },
          { label: "Garhwal", href: "/stays" },
          { label: "Kumaon", href: "/stays" },
          { label: "Boutique", href: "/stays" },
          { label: "Camps", href: "/stays" },
          { label: "All Stays", href: "/stays" },
        ]}
        ocid="stays.quicknav"
      />

      <DiscoveryShell
        ocid="stays.shell"
        sidebar={
          <DiscoverySidebar
            groups={sidebarGroups}
            hasActiveFilters={hasActiveFilters}
            onClear={clearFilters}
            ocid="stays.sidebar"
          />
        }
      >
        {hasActiveFilters ? (
          <section className="pb-8 pt-2">
            <h2 className="mb-1 font-display text-xl font-bold text-[#06281E] md:text-2xl">
              Matching stays
            </h2>
            <p className="mb-5 font-body text-sm text-[#5A6B62]">
              Showing {filtered.length} propert
              {filtered.length === 1 ? "y" : "ies"}
            </p>
            {filtered.length === 0 ? (
              <div className="rounded-xl border border-[#E8E4D4] bg-[#FFFBEB] px-6 py-16 text-center">
                <p className="font-display text-lg font-bold text-[#06281E]">
                  No stays match
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
                {filtered.map((s, i) => (
                  <StayCardItem
                    key={s.slug}
                    stay={s}
                    index={i}
                    layout="grid"
                  />
                ))}
              </div>
            )}
          </section>
        ) : (
          <>
            <DiscoveryCategoryStrip
              title="Explore Our Properties"
              items={categories}
              ocid="stays.categories"
            />

            <div className="py-5 md:py-6">
              <DiscoveryTipBar icon={Home} ocid="stays.tip.pair">
                Pair your stay with a trek — Sankri for Kedarkantha, Lohajung for
                Brahmatal, Chopta for Tungnath.{" "}
                <Link
                  href="/treks"
                  className="font-semibold text-[#0B3D2E] underline underline-offset-2"
                >
                  Browse treks
                </Link>{" "}
                or message us to build one itinerary.
              </DiscoveryTipBar>
            </div>

            <DiscoveryRail
              title="Handpicked Mountain Stays"
              aside="TrekRoots-owned and partner properties at the heart of Himalayan base villages."
              ocid="stays.rail.all"
            >
              {stays.map((s, i) => (
                <StayCardItem
                  key={s.slug}
                  stay={s}
                  index={i}
                  badge={i === 0 ? "Featured" : undefined}
                />
              ))}
            </DiscoveryRail>

            <DiscoveryTipBar icon={MapPin} ocid="stays.tip.base">
              Base villages fill fast before winter and Char Dham season. Enquire
              early for Sankri, Chopta and Auli weekends.
            </DiscoveryTipBar>

            {homestays.length > 0 ? (
              <DiscoveryRail
                title="Village Homestays"
                aside="Home-cooked meals, warm hosts and the night-before comfort every trekker needs."
                ocid="stays.rail.homestay"
              >
                {homestays.map((s, i) => (
                  <StayCardItem key={s.slug} stay={s} index={i} />
                ))}
              </DiscoveryRail>
            ) : null}

            {boutique.length > 0 ? (
              <DiscoveryRail
                title="Boutique & Eco Cottages"
                aside="Character stays with mountain views — Chopta meadows to Auli ridges."
                ocid="stays.rail.boutique"
              >
                {boutique.map((s, i) => (
                  <StayCardItem key={s.slug} stay={s} index={i} />
                ))}
              </DiscoveryRail>
            ) : null}

            {camps.length > 0 ? (
              <DiscoveryRail
                title="Camps by the River"
                aside="Canvas nights near Rishikesh — stars, water and trail-ready mornings."
                ocid="stays.rail.camp"
              >
                {camps.map((s, i) => (
                  <StayCardItem key={s.slug} stay={s} index={i} />
                ))}
              </DiscoveryRail>
            ) : null}

            <DiscoveryThemeTiles
              title="Stay Your Way"
              aside="Homestay warmth, boutique comfort or riverside camps."
              tiles={themeTiles}
              ocid="stays.themes"
            />

            <DiscoveryWhyUs
              title="Why Guests Love Staying With Us"
              items={[
                {
                  icon: Shield,
                  title: "Handpicked properties",
                  body: "Every stay personally vetted — location, cleanliness and trail access come first.",
                },
                {
                  icon: ThumbsUp,
                  title: "Book-direct rates",
                  body: "Enquire with us for the clearest pricing and availability on our own properties.",
                },
                {
                  icon: MapPin,
                  title: "Right at the trailhead",
                  body: "Sankri, Chopta, Lohajung, Auli and more — wake up where the trek begins.",
                },
                {
                  icon: Award,
                  title: "Local hospitality",
                  body: "Home-cooked Garhwali meals and hosts who know the mountains like neighbours.",
                },
                {
                  icon: Home,
                  title: "Owned & partner-run",
                  body: "A mix of TrekRoots-managed stays and trusted partners we would host family in.",
                },
                {
                  icon: Sparkles,
                  title: "Pair with your trek",
                  body: "We help you combine stays with treks and yatras into one seamless itinerary.",
                },
              ]}
              ocid="stays.why"
            />
          </>
        )}
      </DiscoveryShell>
    </div>
  );
}
