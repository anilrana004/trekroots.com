"use client";

import {
  DURATION_BUCKETS,
  getAllTreks,
  getTrekCoverImage,
  matchesDuration,
  matchesSeason,
  SEASON_BUCKETS,
  treksForMonth,
  whatsappLink,
  type Trek,
} from "@/data";
import {
  DiscoveryCategoryStrip,
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
  HeartHandshake,
  Leaf,
  Mountain,
  Shield,
  Users,
  Users2,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const MONTH_LABELS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function TrekDiscoveryCard({
  trek,
  index,
  badge,
  layout = "rail",
}: {
  trek: Trek;
  index: number;
  badge?: string;
  layout?: "rail" | "grid";
}) {
  const price = tripPrice(trek.priceRange);
  return (
    <DiscoveryProductCard
      href={`/treks/${trek.slug}`}
      imageSrc={getTrekCoverImage(trek.slug, trek.imageUrl)}
      imageAlt={`${trek.name} in ${trek.region}`}
      title={trek.name}
      meta={`${trek.difficulty} · ${trek.durationDays} ${trek.durationDays === 1 ? "Day" : "Days"}`}
      subtitle={`${trek.region}, ${trek.state} · ${Number(trek.maxAltitudeFt).toLocaleString("en-IN")} ft`}
      priceLabel={price.onRequest ? "On request" : price.label}
      primaryLabel="Trek Details"
      secondaryLabel="Enquire"
      secondaryHref={whatsappLink(
        `Hi TrekRoots! I'd like to enquire about ${trek.name}.`,
      )}
      badge={badge}
      ocid={`treks.card.${trek.slug}`}
      priority={index < 2}
      layout={layout}
    />
  );
}

function uniqueBySlug(list: Trek[]): Trek[] {
  const seen = new Set<string>();
  return list.filter((t) => {
    if (seen.has(t.slug)) return false;
    seen.add(t.slug);
    return true;
  });
}

export default function TreksPage() {
  const treks = getAllTreks();
  const params = useSearchParams();
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [stateFilter, setStateFilter] = useState("All");
  const [diffFilter, setDiffFilter] = useState("All");
  const [duration, setDuration] = useState("");
  const [season, setSeason] = useState("");
  const [monthFilter, setMonthFilter] = useState(0);

  useEffect(() => {
    setStateFilter(params.get("state") ?? "All");
    setDiffFilter(params.get("difficulty") ?? "All");
    setDuration(params.get("duration") ?? "");
    setSeason(params.get("season") ?? "");
    const m = Number(params.get("month") ?? 0);
    setMonthFilter(m >= 1 && m <= 12 ? m : 0);
  }, [params]);

  const states = useMemo(
    () => [...new Set(treks.map((t) => t.state))].sort(),
    [treks],
  );

  const difficulties = useMemo(() => {
    const preferred = ["Easy", "Easy to Moderate", "Moderate"];
    const present = [...new Set(treks.map((t) => t.difficulty))];
    return preferred.filter((d) => present.includes(d));
  }, [treks]);

  const filtered = useMemo(() => {
    let result = treks;
    if (stateFilter !== "All")
      result = result.filter((t) => t.state === stateFilter);
    if (diffFilter !== "All")
      result = result.filter((t) =>
        t.difficulty.toLowerCase().includes(diffFilter.toLowerCase()),
      );
    if (duration) result = result.filter((t) => matchesDuration(t, duration));
    if (season) result = result.filter((t) => matchesSeason(t, season));
    if (monthFilter)
      result = result.filter((t) =>
        treksForMonth(monthFilter, 100).some((m) => m.slug === t.slug),
      );
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.region.toLowerCase().includes(q) ||
          t.state.toLowerCase().includes(q),
      );
    }
    return result;
  }, [
    treks,
    stateFilter,
    diffFilter,
    duration,
    season,
    monthFilter,
    search,
  ]);

  const hasActiveFilters =
    stateFilter !== "All" ||
    diffFilter !== "All" ||
    Boolean(duration) ||
    Boolean(season) ||
    monthFilter > 0 ||
    search.trim().length > 0;

  const clearFilters = () => {
    setStateFilter("All");
    setDiffFilter("All");
    setDuration("");
    setSeason("");
    setMonthFilter(0);
    setSearch("");
    router.replace("/treks");
  };

  const sidebarGroups: SidebarGroup[] = [
    {
      title: "Explore By Region",
      items: [
        {
          label: "All regions",
          active: stateFilter === "All" && !hasActiveFilters,
          onClick: clearFilters,
          count: treks.length,
        },
        ...states.map((state) => ({
          label: state,
          active: stateFilter === state,
          onClick: () => setStateFilter(state),
          count: treks.filter((t) => t.state === state).length,
        })),
      ],
    },
    {
      title: "Explore By Month",
      items: MONTH_LABELS.map((label, i) => {
        const month = i + 1;
        return {
          label,
          active: monthFilter === month,
          onClick: () => setMonthFilter(month),
          count: treksForMonth(month, 100).length,
        };
      }).filter((item) => (item.count ?? 0) > 0),
    },
    {
      title: "Trek Difficulty",
      items: difficulties.map((d) => ({
        label: d,
        active: diffFilter === d,
        onClick: () => setDiffFilter(d),
        count: treks.filter((t) => t.difficulty === d).length,
      })),
    },
    {
      title: "Trek Duration",
      items: DURATION_BUCKETS.map((bucket) => ({
        label: bucket.label,
        active: duration === bucket.key,
        onClick: () => setDuration(bucket.key),
        count: treks.filter((t) => matchesDuration(t, bucket.key)).length,
      })).filter((item) => (item.count ?? 0) > 0),
    },
    {
      title: "By Season",
      items: SEASON_BUCKETS.map((bucket) => ({
        label: bucket.label,
        active: season === bucket.key,
        onClick: () => setSeason(bucket.key),
        count: treks.filter((t) => matchesSeason(t, bucket.key)).length,
      })).filter((item) => (item.count ?? 0) > 0),
    },
  ];

  const nowMonth = new Date().getMonth() + 1;
  const seasonal = uniqueBySlug(treksForMonth(nowMonth, 8));
  const beginners = uniqueBySlug(
    treks.filter(
      (t) =>
        t.difficulty.toLowerCase().includes("easy") &&
        Number(t.durationDays) <= 6,
    ),
  ).slice(0, 8);
  const mountainViews = uniqueBySlug(
    [...treks].sort(
      (a, b) => Number(b.maxAltitudeFt) - Number(a.maxAltitudeFt),
    ),
  ).slice(0, 8);
  const highAltitude = treks
    .filter((t) => Number(t.maxAltitudeFt) >= 12000)
    .slice(0, 8);
  const winter = uniqueBySlug(
    treks.filter((t) => matchesSeason(t, "winter")),
  ).slice(0, 8);
  const weekend = treks.filter((t) => matchesDuration(t, "weekend")).slice(0, 8);
  const autumn = uniqueBySlug(
    treks.filter((t) => matchesSeason(t, "autumn")),
  ).slice(0, 8);

  const categories = [
    {
      label: "Winter Treks",
      href: "/treks?season=winter",
      imageSrc: getTrekCoverImage(
        "kedarkantha",
        treks.find((t) => t.slug === "kedarkantha")?.imageUrl ?? "",
      ),
      imageAlt: "Winter treks",
    },
    {
      label: "Easy Himalayan",
      href: "/treks?difficulty=Easy",
      imageSrc: getTrekCoverImage(
        "nag-tibba",
        treks.find((t) => t.slug === "nag-tibba")?.imageUrl ?? "",
      ),
      imageAlt: "Easy Himalayan treks",
    },
    {
      label: "Best for Families",
      href: "/treks?difficulty=Easy%20to%20Moderate",
      imageSrc: getTrekCoverImage(
        "dayara-bugyal",
        treks.find((t) => t.slug === "dayara-bugyal")?.imageUrl ?? "",
      ),
      imageAlt: "Family-friendly treks",
    },
    {
      label: "Weekend Escapes",
      href: "/treks?duration=weekend",
      imageSrc: getTrekCoverImage(
        "chopta-tungnath",
        treks.find((t) => t.slug === "chopta-tungnath")?.imageUrl ?? "",
      ),
      imageAlt: "Weekend treks",
    },
    {
      label: "High Passes",
      href: "/treks?difficulty=Moderate",
      imageSrc: getTrekCoverImage(
        "hampta-pass",
        treks.find((t) => t.slug === "hampta-pass")?.imageUrl ?? "",
      ),
      imageAlt: "High mountain passes",
    },
    {
      label: "Uttarakhand",
      href: "/treks?state=Uttarakhand",
      imageSrc: getTrekCoverImage(
        "valley-of-flowers",
        treks.find((t) => t.slug === "valley-of-flowers")?.imageUrl ?? "",
      ),
      imageAlt: "Uttarakhand treks",
    },
    {
      label: "Himachal",
      href: "/treks?state=Himachal%20Pradesh",
      imageSrc: getTrekCoverImage(
        "sar-pass",
        treks.find((t) => t.slug === "sar-pass")?.imageUrl ?? "",
      ),
      imageAlt: "Himachal treks",
    },
    {
      label: "Maharashtra",
      href: "/treks?state=Maharashtra",
      imageSrc: getTrekCoverImage(
        "devkund-waterfall",
        treks.find((t) => t.slug === "devkund-waterfall")?.imageUrl ?? "",
      ),
      imageAlt: "Maharashtra treks",
    },
  ].filter((c) => c.imageSrc);

  const themeTiles = [
    {
      title: "Family Treks",
      href: "/treks?difficulty=Easy",
      imageSrc: categories[1]?.imageSrc ?? "",
      imageAlt: "Family treks",
      caption: "Gentle trails, big memories",
    },
    {
      title: "Group Treks",
      href: "/treks?duration=week",
      imageSrc: categories[4]?.imageSrc ?? "",
      imageAlt: "Group treks",
      caption: "Shared summits with new friends",
    },
    {
      title: "Beginner Treks",
      href: "/treks?difficulty=Easy%20to%20Moderate",
      imageSrc: categories[2]?.imageSrc ?? "",
      imageAlt: "Beginner treks",
      caption: "Your first Himalayan high",
    },
  ].filter((t) => t.imageSrc);

  return (
    <div>
      <DiscoverySearchBanner
        title="Looking for a specific trek?"
        placeholder="Search by trek name, region or state…"
        value={search}
        onChange={setSearch}
        ocid="treks.search"
      />

      <DiscoveryShell
        ocid="treks.shell"
        sidebar={
          <DiscoverySidebar
            groups={sidebarGroups}
            hasActiveFilters={hasActiveFilters}
            onClear={clearFilters}
            ocid="treks.sidebar"
          />
        }
      >
        {hasActiveFilters ? (
          <section className="pb-8 pt-2">
            <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 className="font-display text-xl font-bold text-[#06281E] md:text-2xl">
                  Matching treks
                </h2>
                <p className="mt-1 font-body text-sm text-[#5A6B62]">
                  Showing {filtered.length} trek
                  {filtered.length === 1 ? "" : "s"}
                </p>
              </div>
            </div>
            {filtered.length === 0 ? (
              <div className="rounded-xl border border-[#E8E4D4] bg-[#FFFBEB] px-6 py-16 text-center">
                <p className="font-display text-lg font-bold text-[#06281E]">
                  No treks match these filters
                </p>
                <p className="mt-2 font-body text-sm text-[#5A6B62]">
                  Try another region, month or difficulty.
                </p>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-5 rounded-full px-5 py-2.5 font-body text-xs font-bold text-[#1A1A1A]"
                  style={{ background: "#FFC107" }}
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filtered.map((trek, i) => (
                  <TrekDiscoveryCard
                    key={trek.slug}
                    trek={trek}
                    index={i}
                    layout="grid"
                  />
                ))}
              </div>
            )}
          </section>
        ) : (
          <>
            <DiscoveryCategoryStrip items={categories} ocid="treks.categories" />

            {seasonal.length > 0 ? (
              <DiscoveryRail
                title={`Top Treks for ${MONTH_LABELS[nowMonth - 1]}`}
                aside="Trails at their best right now — the batches our trek leaders would pick themselves."
                ocid="treks.rail.seasonal"
              >
                {seasonal.map((trek, i) => (
                  <TrekDiscoveryCard
                    key={trek.slug}
                    trek={trek}
                    index={i}
                    badge={i === 0 ? "Popular" : undefined}
                  />
                ))}
              </DiscoveryRail>
            ) : null}

            {autumn.length > 0 ? (
              <DiscoveryRail
                title="The Treks in Autumn"
                aside="Clear skies, golden meadows and the last warm windows before winter snow."
                ocid="treks.rail.autumn"
              >
                {autumn.map((trek, i) => (
                  <TrekDiscoveryCard key={trek.slug} trek={trek} index={i} />
                ))}
              </DiscoveryRail>
            ) : null}

            {mountainViews.length > 0 ? (
              <DiscoveryRail
                title="Treks with Greatest Mountain Views"
                aside="Ridges and summits where the Himalayas fill the entire horizon."
                ocid="treks.rail.views"
              >
                {mountainViews.map((trek, i) => (
                  <TrekDiscoveryCard key={trek.slug} trek={trek} index={i} />
                ))}
              </DiscoveryRail>
            ) : null}

            {beginners.length > 0 ? (
              <DiscoveryRail
                title="Best Treks for Beginners"
                aside="Gentle gradients, short itineraries and the confidence to go higher next season."
                ocid="treks.rail.beginners"
              >
                {beginners.map((trek, i) => (
                  <TrekDiscoveryCard key={trek.slug} trek={trek} index={i} />
                ))}
              </DiscoveryRail>
            ) : null}

            {highAltitude.length > 0 ? (
              <DiscoveryRail
                title="Adventure Above 12,000 ft"
                aside="High camps, thin air and summit mornings worth the acclimatisation."
                ocid="treks.rail.high"
              >
                {highAltitude.map((trek, i) => (
                  <TrekDiscoveryCard key={trek.slug} trek={trek} index={i} />
                ))}
              </DiscoveryRail>
            ) : null}

            {winter.length > 0 ? (
              <DiscoveryRail
                title="Top Winter Treks"
                aside="Snow trails, frozen lakes and the classic Himalayan winter experience."
                ocid="treks.rail.winter"
              >
                {winter.map((trek, i) => (
                  <TrekDiscoveryCard key={trek.slug} trek={trek} index={i} />
                ))}
              </DiscoveryRail>
            ) : null}

            {weekend.length > 0 ? (
              <DiscoveryRail
                title="Weekend & Short Treks"
                aside="Leave Friday, return Sunday — waterfalls, fireflies and Himalayan foothills."
                ocid="treks.rail.weekend"
              >
                {weekend.map((trek, i) => (
                  <TrekDiscoveryCard key={trek.slug} trek={trek} index={i} />
                ))}
              </DiscoveryRail>
            ) : null}

            <DiscoveryThemeTiles
              title="Themed Treks"
              aside="Pick the vibe — family, group or first-timer."
              tiles={themeTiles}
              ocid="treks.themes"
            />

            <div className="pb-10 pt-4">
              <DiscoveryWhyUs
                title="Why Trekkers Love Trekking With Us"
                items={[
                  {
                    icon: Shield,
                    title: "Safety-first batches",
                    body: "Experienced trek leaders, checked gear and conservative calls on weather — so you can focus on the trail.",
                  },
                  {
                    icon: Mountain,
                    title: "50+ curated Himalayan routes",
                    body: "Winter summits, monsoon meadows and high passes across Uttarakhand, Himachal and beyond.",
                  },
                  {
                    icon: Users,
                    title: "Local guides at the trailhead",
                    body: "Guides, cooks and porters hired from the villages where your trek starts.",
                  },
                  {
                    icon: Leaf,
                    title: "Leave no trace",
                    body: "We carry our trash down, ban single-use plastic on trail and rotate campsites to protect meadows.",
                  },
                  {
                    icon: HeartHandshake,
                    title: "WhatsApp-first planning",
                    body: "Enquire once — itineraries, dates and packing lists come back from real mountain experts.",
                  },
                  {
                    icon: Users2,
                    title: "Operating since 2018",
                    body: "Thousands of trekkers have walked with TrekRoots — from first summits to Char Dham yatras.",
                  },
                ]}
                ocid="treks.why"
              />
            </div>
          </>
        )}
      </DiscoveryShell>
    </div>
  );
}
