import type { PriceRange } from "@/data";

export function formatINR(value: number): string {
  return `₹${Number(value).toLocaleString("en-IN")}`;
}

export type TripPrice = {
  /** True when there is no published rate and we ask people to enquire. */
  onRequest: boolean;
  /** Selling price, or a range when the trip has tiers. */
  label: string;
  /** List price before the discount, when the trip is on offer. */
  original?: string;
  /** Whole-number discount, e.g. 33 for 33% off. */
  discountPercent?: number;
};

export function tripPrice(range: PriceRange): TripPrice {
  const min = Number(range.minINR);
  const max = Number(range.maxINR);
  if (min <= 0) return { onRequest: true, label: "On Request" };

  const original = Number(range.originalINR ?? 0);
  const discounted = original > min;

  return {
    onRequest: false,
    label: max > min ? `${formatINR(min)}–${formatINR(max)}` : formatINR(min),
    original: discounted ? formatINR(original) : undefined,
    discountPercent: discounted
      ? Math.round(((original - min) / original) * 100)
      : undefined,
  };
}
