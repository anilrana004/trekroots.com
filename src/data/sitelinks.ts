import { PHONE_DISPLAY } from "@/data/contact";

/**
 * Primary Google sitelink candidates — clear titles + unique URLs.
 * Google chooses sitelinks algorithmically; this keeps nav, footer, sitemap
 * and JSON-LD aligned so TrekRoots can surface like Indiahikes brand results.
 */
export const SITE_SITELINKS = [
  {
    name: "Upcoming Treks",
    path: "/treks",
    description:
      "Best Treks for Beginners · Kedarkantha · Valley of Flowers · Brahmatal · Hampta Pass",
  },
  {
    name: "Contact Us",
    path: "/contact",
    description: `Call ${PHONE_DISPLAY} · WhatsApp enquiry · Dehradun office`,
  },
  {
    name: "Easy–moderate treks",
    path: "/easy-moderate-treks",
    description:
      "Kedarkantha · Dayara Bugyal · Chopta Tungnath · Valley of Flowers · Har Ki Dun",
  },
  {
    name: "Latest News",
    path: "/blog",
    description:
      "Trek guides · Char Dham updates · Winter trek tips · Himalayan travel news",
  },
  {
    name: "Easy Treks",
    path: "/easy-treks",
    description:
      "Nag Tibba · Devkund · Andharban · Rajmachi — best beginner Himalayan treks",
  },
] as const;

export type SiteSitelink = (typeof SITE_SITELINKS)[number];
