import type { FacetGroup } from "./trek-facets";
import { packages } from "./packages";
import { stays } from "./stays";
import { yatras } from "./yatras";

export type MegaPopularItem = {
  label: string;
  href: string;
  meta: string;
};

function formatMinINR(minINR: number): string {
  if (minINR <= 0) return "On request";
  return `₹${Number(minINR).toLocaleString("en-IN")}`;
}

export type MegaMenuConfig = {
  id: "treks" | "yatra" | "packages" | "stays";
  label: string;
  href: string;
  groups: FacetGroup[];
  popularTitle: string;
  popular: MegaPopularItem[];
  footerHint: string;
  footerCta: string;
};

function nightsFromDuration(duration: string): number {
  const m = duration.match(/(\d+)\s*Nights?/i);
  if (m) return Number.parseInt(m[1], 10);
  const d = duration.match(/(\d+)/);
  return d ? Number.parseInt(d[1], 10) : 0;
}

function stayRegion(location: string): string {
  const loc = location.toLowerCase();
  if (loc.includes("munsiyari") || loc.includes("pithoragarh")) return "Kumaon";
  if (loc.includes("himachal")) return "Himachal";
  return "Garhwal";
}

export function yatraFacetGroups(): FacetGroup[] {
  const circuits: { label: string; test: (name: string) => boolean }[] = [
    {
      label: "Char & Do Dham",
      test: (n) => /char dham|do dham/i.test(n),
    },
    {
      label: "Kedarnath",
      test: (n) => /kedarnath|kedar/i.test(n),
    },
    {
      label: "Adi Kailash",
      test: (n) => /kailash|om parvat/i.test(n),
    },
    {
      label: "Yatra + Trek",
      test: (n) => /trek|chopta|tungnath/i.test(n),
    },
  ];

  const seasons = [...new Set(yatras.map((y) => y.season))].sort();

  return [
    {
      title: "Sacred circuits",
      items: circuits
        .map((c) => ({
          label: c.label,
          href: `/yatra?circuit=${encodeURIComponent(c.label)}`,
          count: yatras.filter((y) => c.test(y.name)).length,
        }))
        .filter((i) => i.count > 0),
    },
    {
      title: "By season",
      items: seasons.map((season) => ({
        label: season,
        href: `/yatra?season=${encodeURIComponent(season)}`,
        count: yatras.filter((y) => y.season === season).length,
      })),
    },
    {
      title: "All yatras",
      items: yatras.map((y) => ({
        label: y.name,
        href: `/yatra/${y.slug}`,
        count: 1,
      })),
    },
  ];
}

export function packageFacetGroups(): FacetGroup[] {
  const categories = [...new Set(packages.map((p) => p.category))].sort();
  const durationBuckets = [
    { key: "short", label: "Short (≤ 5 nights)", max: 5, min: 0 },
    { key: "week", label: "A week (6–8 nights)", min: 6, max: 8 },
    { key: "long", label: "Long (9+ nights)", min: 9, max: 365 },
  ] as const;

  return [
    {
      title: "By region",
      items: categories.map((category) => ({
        label: category,
        href: `/packages?category=${encodeURIComponent(category)}`,
        count: packages.filter((p) => p.category === category).length,
      })),
    },
    {
      title: "By duration",
      items: durationBuckets
        .map((bucket) => ({
          label: bucket.label,
          href: `/packages?duration=${bucket.key}`,
          count: packages.filter((p) => {
            const n = nightsFromDuration(p.duration);
            return n >= bucket.min && n <= bucket.max;
          }).length,
        }))
        .filter((i) => i.count > 0),
    },
  ];
}

export function stayFacetGroups(): FacetGroup[] {
  const types = [...new Set(stays.map((s) => s.stayType))].sort();
  const regions = [...new Set(stays.map((s) => stayRegion(s.location)))].sort();

  return [
    {
      title: "By type",
      items: types.map((type) => ({
        label: type,
        href: `/stays?type=${encodeURIComponent(type)}`,
        count: stays.filter((s) => s.stayType === type).length,
      })),
    },
    {
      title: "By region",
      items: regions.map((region) => ({
        label: region,
        href: `/stays?region=${encodeURIComponent(region)}`,
        count: stays.filter((s) => stayRegion(s.location) === region).length,
      })),
    },
    {
      title: "All stays",
      items: stays.map((s) => ({
        label: s.name,
        href: `/stays/${s.slug}`,
        count: 1,
      })),
    },
  ];
}

export function popularYatras(limit = 6): MegaPopularItem[] {
  return yatras.slice(0, limit).map((y) => ({
    label: y.name,
    href: `/yatra/${y.slug}`,
    meta: `${y.duration} · ${formatMinINR(Number(y.priceRange.minINR))}`,
  }));
}

export function popularPackages(limit = 6): MegaPopularItem[] {
  return packages.slice(0, limit).map((p) => ({
    label: p.name,
    href: `/packages/${p.slug}`,
    meta: `${p.category} · ${formatMinINR(Number(p.priceRange.minINR))}`,
  }));
}

export function popularStays(limit = 6): MegaPopularItem[] {
  return stays.slice(0, limit).map((s) => ({
    label: s.name,
    href: `/stays/${s.slug}`,
    meta: `${s.stayType} · from ₹${Number(s.pricePerNightMin).toLocaleString("en-IN")}/night`,
  }));
}

export function yatraMegaMenu(): Omit<MegaMenuConfig, "id" | "label" | "href"> {
  return {
    groups: yatraFacetGroups(),
    popularTitle: "Popular yatras",
    popular: popularYatras(6),
    footerHint: "Planning Char Dham or Kedarnath? Talk to our yatra desk.",
    footerCta: "Browse all yatras",
  };
}

export function packageMegaMenu(): Omit<
  MegaMenuConfig,
  "id" | "label" | "href"
> {
  return {
    groups: packageFacetGroups(),
    popularTitle: "Popular packages",
    popular: popularPackages(6),
    footerHint: "Not sure Spiti or Ladakh? Ask someone who has driven both.",
    footerCta: "Browse all packages",
  };
}

export function stayMegaMenu(): Omit<MegaMenuConfig, "id" | "label" | "href"> {
  return {
    groups: stayFacetGroups(),
    popularTitle: "Featured stays",
    popular: popularStays(6),
    footerHint: "Need a base near your trek trailhead? We’ll match the stay.",
    footerCta: "Browse all stays",
  };
}
