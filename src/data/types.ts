export interface DayItinerary {
  day: number
  title: string
  route: string
  distanceKm: number
  startAltitudeM: number
  endAltitudeM: number
  description: string
  campsite: string
  mealsIncluded: string
  difficulty: string
  landmarks: string[]
}

export interface PriceRange {
  minINR: number
  maxINR: number
}

export interface FaqItem {
  q: string
  a: string
}

export interface PackingSection {
  label: string
  items: string[]
}

export interface HowToReachSection {
  title: string
  steps: string[]
}

export interface PolicySection {
  title: string
  items: string[]
}

/** Shared detail-page enrichment copied from Secure Travels trip pages */
export interface CatalogEnrichment {
  tagline?: string
  faqs?: FaqItem[]
  packing?: PackingSection[]
  howToReach?: HowToReachSection[]
  policies?: PolicySection[]
  fitnessTips?: string[]
  medicalNotes?: string[]
  sourceUrl?: string
}

export interface Trek extends CatalogEnrichment {
  id: number
  name: string
  slug: string
  state: string
  region: string
  durationDays: number
  durationNights: number
  distanceKm: number
  maxAltitudeM: number
  maxAltitudeFt: number
  difficulty: string
  bestSeason: string
  startPoint: string
  endPoint: string
  description: string
  highlights: string[]
  itinerary: DayItinerary[]
  inclusions: string[]
  exclusions: string[]
  priceRange: PriceRange
  imageUrl: string
  category: string
}

export interface Yatra extends CatalogEnrichment {
  id: number
  name: string
  slug: string
  duration: string
  season: string
  route: string
  description: string
  spiritualSignificance: string
  temples: string[]
  registration: string
  priceRange: PriceRange
  imageUrl: string
  helicopterInfo?: string
  permits?: string
  pujaGuide?: string
  templeTimings?: string
  registrationInfo?: string
  itinerary?: DayItinerary[]
  accessibility?: string
  inclusions?: string[]
  exclusions?: string[]
}

export interface PackageTier {
  name: string
  pricePerPerson: number
}

export interface Package extends CatalogEnrichment {
  id: number
  name: string
  slug: string
  duration: string
  problemSolved: string
  description: string
  itinerary: DayItinerary[]
  inclusions: string[]
  exclusions: string[]
  priceRange: PriceRange
  groupSize: string
  imageUrl: string
  category: string
  tiers?: PackageTier[]
  accommodationType?: string
  groupSizeMax?: number
}

export interface Stay {
  id: number
  name: string
  slug: string
  location: string
  stayType: string
  description: string
  amenities: string[]
  pricePerNightMin: number
  pricePerNightMax: number
  imageUrl: string
  nearbyAttractions?: string[]
  ownerNote?: string
}

export interface BlogPost {
  id: number
  title: string
  slug: string
  category: string
  excerpt: string
  content: string
  readTime: number
  imageUrl: string
  publishedAt: number
  authorName?: string
  readTimeMin?: number
}

export interface SearchResults {
  treks: Trek[]
  yatras: Yatra[]
  packages: Package[]
  stays: Stay[]
  blogPosts: BlogPost[]
}
