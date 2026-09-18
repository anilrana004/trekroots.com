/** Fallback FAQs shown on trek pages when the trek has no faqs[] — keep in sync with schema. */

import type { FaqPair } from "@/data/home-faqs";

export const DEFAULT_TREK_FAQS: FaqPair[] = [
  {
    q: "What fitness level is required for this trek?",
    a: "You should be able to walk 8–12 km daily on uneven terrain. Start a 4-week pre-trek training plan with daily cardio (running/cycling), squats, and lunges.",
  },
  {
    q: "Are the treks suitable for beginners?",
    a: "Treks rated Easy or Moderate are suitable for first-timers with average fitness. Difficult and Extreme treks require prior high-altitude experience.",
  },
  {
    q: "What is the cancellation policy?",
    a: "Full refund if cancelled 30+ days before trek. 50% refund for 15–29 days. No refund within 14 days of departure.",
  },
  {
    q: "Are permits included in the price?",
    a: "Yes. Forest department permits, national park entry fees, and required government clearances are all included in the package price.",
  },
  {
    q: "What is the accommodation like on the trail?",
    a: "Accommodation varies by trek — mix of high-quality camping tents, fixed-camp setups, and guesthouses at lower altitudes. Sleeping bags and mats are provided.",
  },
  {
    q: "What happens in case of bad weather or emergency?",
    a: "Our leaders carry satellite communication devices. In emergencies, we coordinate helicopter evacuation. Safety of trekkers is our top priority.",
  },
  {
    q: "Can I join as a solo traveller?",
    a: "Absolutely. Solo trekkers are paired with group batches. We also offer women-only group departures for solo female travellers.",
  },
  {
    q: "What meals are provided on the trek?",
    a: "All meals from Day 1 dinner to last-day breakfast are included — hot nutritious Himalayan meals cooked by our camp staff.",
  },
];
