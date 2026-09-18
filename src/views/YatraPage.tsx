"use client";

import {
  getAllYatras,
  getYatraCoverImage,
  whatsappLink,
  type Yatra,
} from "@/data";
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
import { tripPrice } from "@/lib/price";
import {
  HeartHandshake,
  Landmark,
  MapPinned,
  Shield,
  Sparkles,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

function YatraCardItem({
  yatra,
  index,
  layout = "rail",
  badge,
}: {
  yatra: Yatra;
  index: number;
  layout?: "rail" | "grid";
  badge?: string;
}) {
  const price = tripPrice(yatra.priceRange);
  return (
    <DiscoveryProductCard
      href={`/yatra/${yatra.slug}`}
      imageSrc={getYatraCoverImage(yatra.slug, yatra.imageUrl)}
      imageAlt={`${yatra.name} pilgrimage`}
      title={yatra.name}
      meta={`${yatra.duration} · ${yatra.season}`}
      subtitle={yatra.route}
      priceLabel={price.onRequest ? "On request" : price.label}
      primaryLabel="Yatra Details"
      secondaryLabel="Enquire"
      secondaryHref={whatsappLink(
        `Hi TrekRoots! I'd like to enquire about ${yatra.name}.`,
      )}
      badge={badge}
      ocid={`yatra.card.${yatra.slug}`}
      priority={index < 2}
      layout={layout}
    />
  );
}

export default function YatraPage() {
  const yatras = getAllYatras();
  const params = useSearchParams();
  const [search, setSearch] = useState("");
  const [season, setSeason] = useState("All");
  const [focus, setFocus] = useState("All");

  useEffect(() => {
    setSeason(params.get("season") ?? "All");
    const circuit = params.get("circuit");
    if (circuit === "Char & Do Dham") setFocus("Char Dham");
    else if (circuit === "Yatra + Trek") setFocus("With Trek");
    else if (circuit === "Kedarnath") setFocus("Kedarnath");
    else if (circuit === "Adi Kailash") setFocus("Adi Kailash");
    else if (!circuit) setFocus("All");
  }, [params]);

  const seasons = useMemo(
    () => [...new Set(yatras.map((y) => y.season))].sort(),
    [yatras],
  );

  const filtered = useMemo(() => {
    let list = yatras;
    if (season !== "All") list = list.filter((y) => y.season === season);
    if (focus === "Char Dham")
      list = list.filter((y) => /char dham|do dham/i.test(y.name));
    if (focus === "Kedarnath")
      list = list.filter((y) => /kedarnath|kedar/i.test(y.name));
    if (focus === "Adi Kailash")
      list = list.filter((y) => /kailash|om parvat/i.test(y.name));
    if (focus === "With Trek")
      list = list.filter((y) => /trek|chopta|tungnath/i.test(y.name));
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (y) =>
          y.name.toLowerCase().includes(q) ||
          y.route.toLowerCase().includes(q) ||
          y.description.toLowerCase().includes(q),
      );
    }
    return list;
  }, [yatras, season, focus, search]);

  const hasActiveFilters =
    season !== "All" || focus !== "All" || search.trim().length > 0;

  const clearFilters = () => {
    setSeason("All");
    setFocus("All");
    setSearch("");
  };

  const sidebarGroups: SidebarGroup[] = [
    {
      title: "Sacred Circuits",
      items: [
        {
          label: "All yatras",
          active: focus === "All" && !hasActiveFilters,
          onClick: clearFilters,
          count: yatras.length,
        },
        {
          label: "Char & Do Dham",
          active: focus === "Char Dham",
          onClick: () => setFocus("Char Dham"),
          count: yatras.filter((y) =>
            /char dham|do dham|kedar|badri/i.test(y.name),
          ).length,
        },
        {
          label: "Kedarnath",
          active: focus === "Kedarnath",
          onClick: () => setFocus("Kedarnath"),
          count: yatras.filter((y) => /kedarnath|kedar/i.test(y.name)).length,
        },
        {
          label: "Adi Kailash",
          active: focus === "Adi Kailash",
          onClick: () => setFocus("Adi Kailash"),
          count: yatras.filter((y) => /kailash|om parvat/i.test(y.name))
            .length,
        },
        {
          label: "Yatra + Trek",
          active: focus === "With Trek",
          onClick: () => setFocus("With Trek"),
          count: yatras.filter((y) =>
            /trek|chopta|tungnath/i.test(y.name),
          ).length,
        },
      ],
    },
    {
      title: "By Season",
      items: seasons.map((s) => ({
        label: s,
        active: season === s,
        onClick: () => setSeason(s),
        count: yatras.filter((y) => y.season === s).length,
      })),
    },
  ];

  const flagship = yatras.slice(0, 6);
  const charDham = yatras.filter((y) =>
    /char dham|do dham/i.test(y.name),
  );
  const withTrek = yatras.filter((y) =>
    /trek|chopta|tungnath/i.test(y.name),
  );
  const kailash = yatras.filter((y) => /kailash|om parvat/i.test(y.name));

  const categories = yatras.map((y) => ({
    label: y.name.replace(/ Yatra$/i, ""),
    href: `/yatra/${y.slug}`,
    imageSrc: getYatraCoverImage(y.slug, y.imageUrl),
    imageAlt: y.name,
  }));

  const themeTiles = [
    {
      title: "Char Dham",
      href: "/yatra/char-dham",
      imageSrc: getYatraCoverImage(
        "char-dham",
        yatras.find((y) => y.slug === "char-dham")?.imageUrl ??
          yatras[0]?.imageUrl ??
          "",
      ),
      imageAlt: "Char Dham Yatra",
      caption: "Yamunotri · Gangotri · Kedarnath · Badrinath",
    },
    {
      title: "Kedarnath",
      href: "/yatra/kedarnath",
      imageSrc: getYatraCoverImage(
        "kedarnath",
        yatras.find((y) => y.slug === "kedarnath")?.imageUrl ?? "",
      ),
      imageAlt: "Kedarnath Yatra",
      caption: "The abode of Lord Shiva",
    },
    {
      title: "Adi Kailash",
      href: "/yatra/adi-kailash-om-parvat",
      imageSrc: getYatraCoverImage(
        "adi-kailash-om-parvat",
        yatras.find((y) => y.slug === "adi-kailash-om-parvat")?.imageUrl ?? "",
      ),
      imageAlt: "Adi Kailash Yatra",
      caption: "Om Parvat & the inner Kailash",
    },
  ].filter((t) => t.imageSrc);

  return (
    <div>
      <DiscoverySearchBanner
        title="Looking for a sacred yatra?"
        placeholder="Search Char Dham, Kedarnath, Adi Kailash…"
        value={search}
        onChange={setSearch}
        ocid="yatra.search"
      />
      <DiscoveryQuickNav
        items={[
          { label: "Char Dham", href: "/yatra/char-dham" },
          { label: "Kedarnath", href: "/yatra/kedarnath" },
          { label: "Do Dham", href: "/yatra/do-dham-yatra" },
          { label: "Adi Kailash", href: "/yatra/adi-kailash-om-parvat" },
          { label: "Yatra + Trek", href: "/yatra/kedarnath-chopta-tungnath" },
          { label: "All Yatras", href: "/yatra" },
        ]}
        ocid="yatra.quicknav"
      />

      <DiscoveryShell
        ocid="yatra.shell"
        sidebar={
          <DiscoverySidebar
            groups={sidebarGroups}
            hasActiveFilters={hasActiveFilters}
            onClear={clearFilters}
            ocid="yatra.sidebar"
          />
        }
      >
        {hasActiveFilters ? (
          <section className="pb-8 pt-2">
            <h2 className="mb-1 font-display text-xl font-bold text-[#06281E] md:text-2xl">
              Matching yatras
            </h2>
            <p className="mb-5 font-body text-sm text-[#5A6B62]">
              Showing {filtered.length} journey
              {filtered.length === 1 ? "" : "s"}
            </p>
            {filtered.length === 0 ? (
              <div className="rounded-xl border border-[#E8E4D4] bg-[#FFFBEB] px-6 py-16 text-center">
                <p className="font-display text-lg font-bold text-[#06281E]">
                  No yatras match
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
                {filtered.map((y, i) => (
                  <YatraCardItem
                    key={y.slug}
                    yatra={y}
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
              title="Explore Sacred Journeys"
              items={categories}
              ocid="yatra.categories"
            />

            <div className="py-5 md:py-6">
              <DiscoveryTipBar icon={Landmark} ocid="yatra.tip.first">
                First Himalayan pilgrimage? Start with{" "}
                <Link
                  href="/yatra/kedarnath"
                  className="font-semibold text-[#0B3D2E] underline underline-offset-2"
                >
                  Kedarnath
                </Link>{" "}
                or the fuller{" "}
                <Link
                  href="/yatra/char-dham"
                  className="font-semibold text-[#0B3D2E] underline underline-offset-2"
                >
                  Char Dham circuit
                </Link>
                — we handle registration and stays.
              </DiscoveryTipBar>
            </div>

            <DiscoveryRail
              title="Flagship Himalayan Yatras"
              aside="Permits, stays and local expertise handled — from Dehradun to the abode of the gods."
              ocid="yatra.rail.flagship"
            >
              {flagship.map((y, i) => (
                <YatraCardItem
                  key={y.slug}
                  yatra={y}
                  index={i}
                  badge={i === 0 ? "Most loved" : undefined}
                />
              ))}
            </DiscoveryRail>

            <DiscoveryTipBar icon={MapPinned} ocid="yatra.tip.season">
              Char Dham and Kedarnath run May–October. Adi Kailash needs more
              buffer for weather — message us early with your preferred month.
            </DiscoveryTipBar>

            {charDham.length > 0 ? (
              <DiscoveryRail
                title="Char Dham & Do Dham Circuits"
                aside="Complete or condensed — the four dhams that define a Himalayan pilgrimage."
                ocid="yatra.rail.chardham"
              >
                {charDham.map((y, i) => (
                  <YatraCardItem key={y.slug} yatra={y} index={i} />
                ))}
              </DiscoveryRail>
            ) : null}

            {withTrek.length > 0 ? (
              <DiscoveryRail
                title="Yatra with Trek"
                aside="Blend darshan with Chopta–Tungnath trails for a fuller mountain journey."
                ocid="yatra.rail.trek"
              >
                {withTrek.map((y, i) => (
                  <YatraCardItem key={y.slug} yatra={y} index={i} />
                ))}
              </DiscoveryRail>
            ) : null}

            {kailash.length > 0 ? (
              <DiscoveryRail
                title="Adi Kailash & Om Parvat"
                aside="The remote inner Kailash — high passes, sacred lakes and Om Parvat views."
                ocid="yatra.rail.kailash"
              >
                {kailash.map((y, i) => (
                  <YatraCardItem key={y.slug} yatra={y} index={i} />
                ))}
              </DiscoveryRail>
            ) : null}

            <DiscoveryRail
              title="Complete Yatra Catalogue"
              aside={`All ${yatras.length} sacred journeys — filter by circuit or season anytime.`}
              ocid="yatra.rail.all"
            >
              {yatras.map((y, i) => (
                <YatraCardItem key={`all-${y.slug}`} yatra={y} index={i} />
              ))}
            </DiscoveryRail>

            <DiscoveryThemeTiles
              title="Pilgrimage Themes"
              aside="Choose the circuit that calls you."
              tiles={themeTiles}
              ocid="yatra.themes"
            />

            <DiscoveryWhyUs
              title="Why Pilgrims Choose TrekRoots"
              items={[
                {
                  icon: Landmark,
                  title: "Temple-first itineraries",
                  body: "Darshan windows, puja guidance and realistic travel days — not rushed tourist loops.",
                },
                {
                  icon: MapPinned,
                  title: "Permits & logistics handled",
                  body: "Registration help, stays near trailheads and helicopter options where the season allows.",
                },
                {
                  icon: Sparkles,
                  title: "Sacred + trail blends",
                  body: "Combine Kedarnath or Char Dham with Chopta–Tungnath when you want both darshan and altitude.",
                },
                {
                  icon: Shield,
                  title: "Mountain-safe pacing",
                  body: "Acclimatisation-aware days and conservative weather calls on high routes like Adi Kailash.",
                },
                {
                  icon: Users,
                  title: "Small, guided groups",
                  body: "Experienced leaders who know the routes, the rituals and the villages along the way.",
                },
                {
                  icon: HeartHandshake,
                  title: "WhatsApp planning",
                  body: "One message starts your yatra plan — dates, inclusions and packing lists from our team.",
                },
              ]}
              ocid="yatra.why"
            />
          </>
        )}
      </DiscoveryShell>
    </div>
  );
}
