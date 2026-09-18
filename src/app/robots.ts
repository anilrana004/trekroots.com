import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

const DISALLOW = ["/search", "/api/", "/booking/"] as const;

const AI_AGENTS = [
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "ClaudeBot",
  "Claude-Web",
  "PerplexityBot",
  "Google-Extended",
  "Amazonbot",
  "Applebot-Extended",
  "Bytespider",
] as const;

/**
 * Crawl rules for search + answer engines.
 * Filter query params on /treks are allowed but canonicalized to /treks in metadata.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [...DISALLOW],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: [...DISALLOW],
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: [...DISALLOW],
      },
      // Explicit allow for AI / answer-engine crawlers (GEO) — same path policy
      ...AI_AGENTS.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: [...DISALLOW],
      })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
