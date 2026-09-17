import type { Trek } from "./types";
import { treks } from "./treks";

/** Groupings behind the "All Treks" menu, derived from the catalog itself. */

export type FacetItem = {
  label: string;
  href: string;
  count: number;
};

export type FacetGroup = {
  title: string;
  items: FacetItem[];
};

export const DURATION_BUCKETS = [
  { key: "weekend", label: "Weekend (1–2 days)", min: 1, max: 2 },
  { key: "short", label: "Short (3–4 days)", min: 3, max: 4 },
  { key: "week", label: "A week (5–7 days)", min: 5, max: 7 },
  { key: "long", label: "Long (8+ days)", min: 8, max: 365 },
] as const;

export const SEASON_BUCKETS = [
  { key: "winter", label: "Winter treks", months: [12, 1, 2] },
  { key: "spring", label: "Spring treks", months: [3, 4, 5] },
  { key: "monsoon", label: "Monsoon treks", months: [6, 7, 8] },
  { key: "autumn", label: "Autumn treks", months: [9, 10, 11] },
] as const;

const MONTHS: Record<string, number> = {
  jan: 1,
  feb: 2,
  mar: 3,
  apr: 4,
  may: 5,
  jun: 6,
  jul: 7,
  aug: 8,
  sep: 9,
  oct: 10,
  nov: 11,
  dec: 12,
};

/**
 * Turns a season label such as "December to March" or "Nov - March" into the
 * months it covers, wrapping across the year end.
 */
function seasonMonths(bestSeason: string): number[] {
  const found = bestSeason
    .toLowerCase()
    .split(/[^a-z]+/)
    .map((word) => MONTHS[word.slice(0, 3)])
    .filter((month): month is number => Boolean(month));

  if (found.length === 0) return [];
  if (found.length === 1) return found;

  const [start, end] = [found[0], found[found.length - 1]];
  const months: number[] = [];
  for (let m = start, guard = 0; guard < 12; guard++) {
    months.push(m);
    if (m === end) break;
    m = m === 12 ? 1 : m + 1;
  }
  return months;
}

export function matchesDuration(trek: Trek, key: string): boolean {
  const bucket = DURATION_BUCKETS.find((b) => b.key === key);
  if (!bucket) return true;
  const days = Number(trek.durationDays);
  return days >= bucket.min && days <= bucket.max;
}

export function matchesSeason(trek: Trek, key: string): boolean {
  const bucket = SEASON_BUCKETS.find((b) => b.key === key);
  if (!bucket) return true;
  const months = seasonMonths(trek.bestSeason);
  return bucket.months.some((month) => months.includes(month));
}

/** Difficulty labels the catalog actually uses, coarsest first. */
const DIFFICULTIES = ["Easy", "Easy to Moderate", "Moderate"];

function count(predicate: (trek: Trek) => boolean): number {
  return treks.filter(predicate).length;
}

function withoutEmpty(items: FacetItem[]): FacetItem[] {
  return items.filter((item) => item.count > 0);
}

export function trekFacetGroups(): FacetGroup[] {
  const states = [...new Set(treks.map((trek) => trek.state))].sort();

  return [
    {
      title: "By region",
      items: withoutEmpty(
        states.map((state) => ({
          label: state,
          href: `/treks?state=${encodeURIComponent(state)}`,
          count: count((trek) => trek.state === state),
        })),
      ),
    },
    {
      title: "By difficulty",
      items: withoutEmpty(
        DIFFICULTIES.map((difficulty) => ({
          label: difficulty,
          href: `/treks?difficulty=${encodeURIComponent(difficulty)}`,
          count: count((trek) => trek.difficulty === difficulty),
        })),
      ),
    },
    {
      title: "By duration",
      items: withoutEmpty(
        DURATION_BUCKETS.map((bucket) => ({
          label: bucket.label,
          href: `/treks?duration=${bucket.key}`,
          count: count((trek) => matchesDuration(trek, bucket.key)),
        })),
      ),
    },
    {
      title: "By season",
      items: withoutEmpty(
        SEASON_BUCKETS.map((bucket) => ({
          label: bucket.label,
          href: `/treks?season=${bucket.key}`,
          count: count((trek) => matchesSeason(trek, bucket.key)),
        })),
      ),
    },
  ];
}

/**
 * Treks whose best season covers the given month (1-12), in catalog order.
 * Catalog order is the curated one, so the flagship Himalayan treks lead
 * rather than whichever day trek happens to be cheapest.
 */
export function treksForMonth(month: number, limit = 5): Trek[] {
  return treks
    .filter((trek) => seasonMonths(trek.bestSeason).includes(month))
    .slice(0, limit);
}

/** Front of the catalog, which is ordered by how much we sell them. */
export function popularTreks(limit = 6): Trek[] {
  return treks.slice(0, limit);
}
