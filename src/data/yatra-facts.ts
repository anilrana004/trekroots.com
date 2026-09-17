import type { Yatra } from "./types"
import type { TrekFact } from "./trek-facts"

/**
 * Indiahikes-style 12-cell facts for a yatra. Uses catalog fields and sensible
 * defaults so every yatra detail page gets a full grid without per-slug data.
 */
export function getYatraFacts(yatra: Yatra): TrekFact[] {
  const shrineCount = yatra.temples?.length ?? 0
  return [
    {
      id: "difficulty",
      label: "Yatra Difficulty",
      value: "Easy to Moderate",
    },
    {
      id: "duration",
      label: "Yatra Duration",
      value: yatra.duration,
    },
    {
      id: "altitude",
      label: "Highest Altitude",
      value: "Up to 3,583 m",
    },
    {
      id: "suitableFor",
      label: "Suitable For",
      value: "Families & first-time pilgrims",
      href: "#section-FAQ",
    },
    {
      id: "basecamp",
      label: "Route",
      value: yatra.route,
      href: "#section-Overview",
    },
    {
      id: "accommodation",
      label: "Accommodation",
      value: "Hotels & guesthouses",
    },
    {
      id: "fitness",
      label: "Fitness",
      value: "Basic walking fitness",
      href: "#section-Medical",
    },
    {
      id: "pickup",
      label: "Season",
      value: yatra.season,
    },
    {
      id: "dropoff",
      label: "Temples",
      value:
        shrineCount > 0
          ? `${shrineCount} sacred shrine${shrineCount === 1 ? "" : "s"}`
          : "As per itinerary",
    },
    {
      id: "packing",
      label: "Registration",
      value: yatra.registration || "Required — see details",
      href: "#section-Registration",
    },
    {
      id: "cloakroom",
      label: "Helicopter",
      value: yatra.helicopterInfo ? "Available" : "On request",
      href: "#section-Helicopter",
    },
    {
      id: "offloading",
      label: "Permits",
      value: yatra.permits || "Included where required",
    },
  ]
}
