import type { Trek } from "./types"

export type TrekFact = {
  id: string
  label: string
  value: string
  href?: string
}

/** Indiahikes-style fact grid overrides per trek slug */
const TREK_FACT_OVERRIDES: Record<string, Partial<Record<string, string>>> = {
  kedarkantha: {
    difficulty: "Easy Moderate",
    duration: "6 days / 23 km",
    altitude: "12,500 feet",
    suitableFor: "8 years and above",
    basecamp: "Kotgaon/Gaichawan Gaon, Uttarakhand",
    accommodation: "Tents (2-sharing)",
    fitness: "5 km in 40 mins",
    pickup: "Asli Pappu Da Dhaba, Dehradun at 6:30 AM",
    dropoff: "Asli Pappu Da Dhaba, Dehradun at 6:00 PM",
    packing: "Click to view checklist",
    cloakroom: "Available",
    offloading: "Available",
  },
}

export function getTrekFacts(trek: Trek): TrekFact[] {
  const o = TREK_FACT_OVERRIDES[trek.slug] ?? {}
  const distance =
    Number(trek.distanceKm) > 0
      ? `${Number(trek.durationDays)} days / ${trek.distanceKm} km`
      : `${Number(trek.durationDays)} days / ${Number(trek.durationNights)} nights`

  return [
    {
      id: "difficulty",
      label: "Trek Difficulty",
      value: o.difficulty ?? trek.difficulty,
    },
    {
      id: "duration",
      label: "Trek Duration",
      value: o.duration ?? distance,
    },
    {
      id: "altitude",
      label: "Highest Altitude",
      value:
        o.altitude ??
        `${Number(trek.maxAltitudeFt).toLocaleString("en-IN")} feet`,
    },
    {
      id: "suitableFor",
      label: "Suitable For",
      value: o.suitableFor ?? "Fit beginners & above",
      href: "#section-faqs",
    },
    {
      id: "basecamp",
      label: "Basecamp",
      value: o.basecamp ?? `${trek.startPoint}, ${trek.state}`,
      href: "#section-how-to-reach",
    },
    {
      id: "accommodation",
      label: "Accommodation Type",
      value: o.accommodation ?? "Tents / Guesthouse",
      href: "#section-inclusions",
    },
    {
      id: "fitness",
      label: "Fitness Criteria",
      value: o.fitness ?? "Basic cardio fitness required",
      href: "#section-packing",
    },
    {
      id: "pickup",
      label: "Pickup Details",
      value: o.pickup ?? `${trek.startPoint} (as per batch)`,
      href: "#section-how-to-reach",
    },
    {
      id: "dropoff",
      label: "Dropoff Details",
      value: o.dropoff ?? `${trek.endPoint} (as per batch)`,
      href: "#section-how-to-reach",
    },
    {
      id: "packing",
      label: "Packing Checklist",
      value: o.packing ?? "Click to view checklist",
      href: "#section-packing",
    },
    {
      id: "cloakroom",
      label: "Cloakroom",
      value: o.cloakroom ?? "Available on request",
      href: "#section-faqs",
    },
    {
      id: "offloading",
      label: "Offloading",
      value: o.offloading ?? "Available on request",
      href: "#section-faqs",
    },
  ]
}
