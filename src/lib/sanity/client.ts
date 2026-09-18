import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "./env";

/**
 * Public published-content client. Uses the CDN.
 * Never put a write token or privileged token here.
 */
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published",
  stega: { enabled: false },
});

/** Non-CDN client for sitemap / generateStaticParams freshness. */
export const staticClient = client.withConfig({ useCdn: false });

/**
 * Optional server-only read token for future draft mode.
 * Must never be imported into Client Components.
 */
export function getServerReadToken(): string | undefined {
  return process.env.SANITY_API_READ_TOKEN || undefined;
}
