export type SanityImageAsset = {
  _id?: string;
  url?: string;
  metadata?: {
    lqip?: string;
    dimensions?: { width?: number; height?: number; aspectRatio?: number };
  };
};

export type SanityImage = {
  _type?: string;
  asset?: SanityImageAsset;
  alt?: string;
  caption?: string;
  credit?: string;
  layout?: "standard" | "wide" | "fullBleed";
  hotspot?: { x: number; y: number };
  crop?: { top: number; bottom: number; left: number; right: number };
};

export type SanityAuthor = {
  _id: string;
  name: string;
  slug?: string | null;
  role?: string | null;
  bio?: string | null;
  photo?: SanityImage | null;
};

export type SanityCategory = {
  _id: string;
  title: string;
  slug?: string | null;
  description?: string | null;
  postCount?: number;
};

export type SanityTag = {
  _id: string;
  title: string;
  slug?: string | null;
};

export type SanityTrek = {
  _id: string;
  name: string;
  slug?: string | null;
  location?: string | null;
  duration?: string | null;
  altitude?: string | null;
  difficulty?: string | null;
  season?: string | null;
  startingPoint?: string | null;
  distance?: string | null;
  url?: string | null;
  excerpt?: string | null;
  heroImage?: SanityImage | null;
};

export type SanityTrekInfo = {
  startingPoint?: string | null;
  duration?: string | null;
  altitude?: string | null;
  difficulty?: string | null;
  bestSeason?: string | null;
  distance?: string | null;
  location?: string | null;
};

export type SanityItineraryDay = {
  _key: string;
  dayNumber: number;
  title: string;
  description?: string | null;
  distance?: string | null;
  duration?: string | null;
  altitude?: string | null;
  accommodation?: string | null;
  meals?: string | null;
  notes?: string | null;
  image?: SanityImage | null;
};

export type SanityFaq = {
  _key: string;
  question: string;
  answer: string;
};

export type SanityPostCard = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  publishedAt?: string | null;
  updatedAt?: string | null;
  readingTime?: number | null;
  featured?: boolean | null;
  heroImage?: SanityImage | null;
  category?: SanityCategory | null;
  author?: { name?: string | null; slug?: string | null; photo?: SanityImage | null } | null;
  seoNoIndex?: boolean;
};

export type SanityBlogPost = SanityPostCard & {
  tags?: SanityTag[] | null;
  author?: SanityAuthor | null;
  content?: unknown[] | null;
  trek?: SanityTrek | null;
  trekInfo?: SanityTrekInfo | null;
  itinerary?: SanityItineraryDay[] | null;
  faqs?: SanityFaq[] | null;
  relatedTreks?: SanityTrek[] | null;
  relatedArticles?: SanityPostCard[] | null;
  seo?: {
    metaTitle?: string | null;
    metaDescription?: string | null;
    canonicalUrl?: string | null;
    noIndex?: boolean | null;
    ogImage?: SanityImage | null;
  } | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
};

export type BlogIndexData = {
  featured: SanityPostCard | null;
  latest: SanityPostCard[];
  categories: SanityCategory[];
};
