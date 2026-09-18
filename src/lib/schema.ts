import { LOGO_URL } from "@/lib/cloudinary";
import { absoluteUrl, SITE_NAME, SITE_URL } from "@/lib/site";
import {
  CONTACT_EMAIL,
  PHONE_NUMBER,
  SOCIAL_SAME_AS,
} from "@/data/contact";
import type { FaqPair } from "@/data/home-faqs";
import type { BlogPost, Package, Stay, Trek, Yatra } from "@/data/types";
import { truncateMeta } from "@/lib/seo";
import { sanityImageUrl } from "@/lib/sanity/image";
import type { SanityImage } from "@/lib/sanity/types";

export const ORG_ID = `${SITE_URL}/#organization`;

type JsonLd = Record<string, unknown>;

export type Crumb = { name: string; path: string };

/** Organization / TravelAgency — no aggregateRating until a verified review source exists. */
export function organizationSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": ["TravelAgency", "Organization", "LocalBusiness"],
    "@id": ORG_ID,
    name: SITE_NAME,
    url: SITE_URL,
    logo: LOGO_URL,
    image: LOGO_URL,
    email: CONTACT_EMAIL,
    telephone: PHONE_NUMBER,
    foundingDate: "2018",
    address: {
      "@type": "PostalAddress",
      streetAddress: "17, Rajpur Road, Near ONGC Chowk",
      addressLocality: "Dehradun",
      addressRegion: "Uttarakhand",
      postalCode: "248001",
      addressCountry: "IN",
    },
    areaServed: [
      { "@type": "State", name: "Uttarakhand" },
      { "@type": "State", name: "Himachal Pradesh" },
      { "@type": "State", name: "Maharashtra" },
    ],
    sameAs: [...SOCIAL_SAME_AS],
    priceRange: "₹₹",
  };
}

export function breadcrumbSchema(crumbs: Crumb[]): JsonLd | null {
  if (crumbs.length < 2) return null;
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  };
}

export function faqPageSchema(faqs: FaqPair[]): JsonLd | null {
  if (!faqs.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };
}

function providerRef() {
  return { "@id": ORG_ID };
}

function offerBlock(price: number, url: string) {
  return {
    "@type": "Offer",
    url,
    priceCurrency: "INR",
    price: String(price),
    availability: "https://schema.org/InStock",
  };
}

export function trekSchema(trek: Trek): JsonLd {
  const url = absoluteUrl(`/treks/${trek.slug}`);

  const itinerary =
    trek.itinerary?.length > 0
      ? {
          "@type": "ItemList",
          numberOfItems: trek.itinerary.length,
          itemListElement: trek.itinerary.map((day, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: `Day ${day.day}: ${day.title}`,
            description: truncateMeta(day.description, 300),
          })),
        }
      : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    "@id": `${url}#trip`,
    name: trek.name,
    description: truncateMeta(trek.tagline || trek.description, 300),
    image: trek.imageUrl,
    url,
    touristType: trek.difficulty,
    itinerary,
    offers: offerBlock(trek.priceRange.minINR, url),
    provider: providerRef(),
  };
}

export function yatraSchema(yatra: Yatra): JsonLd {
  const url = absoluteUrl(`/yatra/${yatra.slug}`);

  const itinerary =
    yatra.itinerary && yatra.itinerary.length > 0
      ? {
          "@type": "ItemList",
          numberOfItems: yatra.itinerary.length,
          itemListElement: yatra.itinerary.map((day, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: `Day ${day.day}: ${day.title}`,
            description: truncateMeta(day.description, 300),
          })),
        }
      : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    "@id": `${url}#trip`,
    name: yatra.name,
    description: truncateMeta(yatra.tagline || yatra.description, 300),
    image: yatra.imageUrl,
    url,
    touristType: "Pilgrimage",
    itinerary,
    offers: offerBlock(yatra.priceRange.minINR, url),
    provider: providerRef(),
  };
}

export function packageSchema(pkg: Package): JsonLd {
  const url = absoluteUrl(`/packages/${pkg.slug}`);

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: pkg.name,
    description: truncateMeta(pkg.tagline || pkg.description, 300),
    image: pkg.imageUrl,
    url,
    brand: { "@type": "Brand", name: SITE_NAME },
    offers: offerBlock(pkg.priceRange.minINR, url),
  };
}

/** LodgingBusiness for owned/partner stays with distinct locations. */
export function staySchema(stay: Stay): JsonLd {
  const url = absoluteUrl(`/stays/${stay.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    "@id": `${url}#lodging`,
    name: stay.name,
    description: truncateMeta(stay.description, 300),
    image: stay.imageUrl,
    url,
    telephone: PHONE_NUMBER,
    email: CONTACT_EMAIL,
    address: {
      "@type": "PostalAddress",
      streetAddress: stay.location,
      addressRegion: "Uttarakhand",
      addressCountry: "IN",
    },
    priceRange: `₹${stay.pricePerNightMin}–₹${stay.pricePerNightMax} per night`,
    amenityFeature: stay.amenities.map((a) => ({
      "@type": "LocationFeatureSpecification",
      name: a,
    })),
    parentOrganization: providerRef(),
  };
}

export function articleSchema(post: BlogPost): JsonLd {
  const url = absoluteUrl(`/blog/${post.slug}`);
  const published = new Date(post.publishedAt).toISOString();
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline: post.title,
    description: truncateMeta(post.excerpt, 200),
    image: post.imageUrl,
    datePublished: published,
    dateModified: published,
    author: {
      "@type": "Person",
      name: post.authorName || "TrekRoots Team",
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: { "@type": "ImageObject", url: LOGO_URL },
      "@id": ORG_ID,
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };
}

/** Article JSON-LD from Sanity blog posts (published content only). */
export function articleSchemaFromSanity(post: {
  title: string;
  slug: string;
  excerpt?: string | null;
  publishedAt?: string | null;
  updatedAt?: string | null;
  author?: { name?: string | null } | null;
  heroImage?: SanityImage | null;
  seo?: { ogImage?: SanityImage | null } | null;
}): JsonLd {
  const url = absoluteUrl(`/blog/${post.slug}`);
  const published = post.publishedAt
    ? new Date(post.publishedAt).toISOString()
    : new Date().toISOString();
  const modified = post.updatedAt
    ? new Date(post.updatedAt).toISOString()
    : published;
  const image =
    sanityImageUrl(post.seo?.ogImage || post.heroImage, 1200, 630) || undefined;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline: post.title,
    description: truncateMeta(post.excerpt || post.title, 200),
    ...(image ? { image } : {}),
    datePublished: published,
    dateModified: modified,
    author: {
      "@type": "Person",
      name: post.author?.name || "TrekRoots Team",
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: { "@type": "ImageObject", url: LOGO_URL },
      "@id": ORG_ID,
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };
}
