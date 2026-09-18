import type { Metadata } from "next";
import { SITE_NAME, SITE_URL, absoluteUrl } from "@/lib/site";

/** Truncate for meta description (~155 chars). Prefer whole words. */
export function truncateMeta(text: string, max = 155): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const sliced = clean.slice(0, max - 1);
  const lastSpace = sliced.lastIndexOf(" ");
  return `${(lastSpace > 80 ? sliced.slice(0, lastSpace) : sliced).trim()}…`;
}

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  /**
   * When true, title is final as written (ignores layout `%s | TrekRoots` template).
   * Use for detail pages like "Kedarkantha Trek | Uttarakhand".
   */
  absoluteTitle?: boolean;
  noIndex?: boolean;
  ogImage?: string;
};

/** Shared metadata: description, self-canonical, OG/Twitter. Title uses layout template unless absolute. */
export function buildPageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
  noIndex = false,
  ogImage,
}: PageMetaInput): Metadata {
  const displayTitle = absoluteTitle ? title : `${title} | ${SITE_NAME}`;
  const url = absoluteUrl(path);
  const desc = truncateMeta(description);

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description: desc,
    alternates: { canonical: url },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title: displayTitle,
      description: desc,
      url,
      siteName: SITE_NAME,
      type: "website",
      locale: "en_IN",
      ...(ogImage ? { images: [{ url: ogImage }] } : {}),
    },
    twitter: {
      card: ogImage ? "summary_large_image" : "summary",
      title: displayTitle,
      description: desc,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
  };
}

export { SITE_NAME, SITE_URL, absoluteUrl };
