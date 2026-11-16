/** Canonical production origin for SEO (robots, sitemap, canonicals). */

export const SITE_NAME = "TrekRoots";

/**
 * Prefer env so preview/staging can override without code changes.
 * Must match the live preferred host. Vercel serves www and 308s apex → www,
 * so the default is https://www.trekroots.com (not the bare domain).
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.trekroots.com"
).replace(/\/$/, "");

export function absoluteUrl(path = "/"): string {
  if (!path || path === "/") return SITE_URL;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
