export type Review = {
  id: number
  name: string
  location: string
  /** Trek, yatra or package the review is about. Doubles as the card headline. */
  trip: string
  quote: string
  rating: number
}

/**
 * Trekker reviews shown on the landing page. Add entries here and the stories
 * grid fills out to four columns on its own.
 */
export const reviews: Review[] = [
  {
    id: 1,
    name: "Arjun Mehta",
    location: "Mumbai, Maharashtra",
    trip: "Kedarkantha Trek",
    quote:
      "Every detail was handled with such care. The Kedarkantha summit at sunrise, surrounded by snow-laden pines, is a memory I'll carry forever.",
    rating: 5,
  },
  {
    id: 2,
    name: "Priya Sharma",
    location: "Bengaluru, Karnataka",
    trip: "Char Dham Yatra",
    quote:
      "The Char Dham Yatra with TrekRoots was transcendent. Their expert guides made the spiritual journey as smooth as it was profound.",
    rating: 5,
  },
  {
    id: 3,
    name: "Vikram Nair",
    location: "Delhi, NCR",
    trip: "Spiti Valley Expedition",
    quote:
      "Spiti Valley left me speechless. TrekRoots' local knowledge opened doors — remote monasteries, hidden villages — that no other operator offered.",
    rating: 5,
  },
]

export const REVIEW_SUMMARY = {
  rating: "4.9",
  count: "2,400+",
  trekkers: "10,000+",
} as const
