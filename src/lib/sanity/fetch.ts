import { client, staticClient } from "./client";
import {
  BLOG_INDEX_QUERY,
  BLOG_POST_BY_SLUG_QUERY,
  BLOG_SITEMAP_QUERY,
  BLOG_SLUGS_QUERY,
  CATEGORY_BY_SLUG_QUERY,
  HOME_JOURNAL_QUERY,
  RELATED_BLOGS_FOR_TRIP_QUERY,
  TAG_BY_SLUG_QUERY,
} from "./queries";
import type {
  BlogIndexData,
  SanityBlogPost,
  SanityCategory,
  SanityPostCard,
  SanityTag,
} from "./types";

const revalidate = Number(process.env.SANITY_REVALIDATE_SECONDS || 60);

export type HomeJournalData = {
  featured: SanityPostCard | null;
  latest: SanityPostCard[];
  categories: SanityCategory[];
};

export async function getHomeJournal(): Promise<HomeJournalData> {
  try {
    const data = await client.fetch<HomeJournalData>(
      HOME_JOURNAL_QUERY,
      {},
      { next: { revalidate, tags: ["blog", "home-journal"] } },
    );
    return {
      featured: data?.featured ?? null,
      latest: data?.latest ?? [],
      categories: data?.categories ?? [],
    };
  } catch (error) {
    console.error("[sanity] getHomeJournal failed", error);
    return { featured: null, latest: [], categories: [] };
  }
}

export async function getRelatedBlogCardsForTrip(
  name: string,
  slug: string,
  limit = 3,
): Promise<SanityPostCard[]> {
  try {
    const token = name.trim().split(/\s+/)[0] || slug;
    const needle = `*${token}*`;
    const posts = await client.fetch<SanityPostCard[]>(
      RELATED_BLOGS_FOR_TRIP_QUERY,
      { slug, needle, limit },
      { next: { revalidate, tags: ["blog", `trek-guides:${slug}`] } },
    );
    return posts || [];
  } catch (error) {
    console.error("[sanity] getRelatedBlogCardsForTrip failed", error);
    return [];
  }
}

export async function getBlogIndex(): Promise<BlogIndexData> {
  try {
    const data = await client.fetch<BlogIndexData>(
      BLOG_INDEX_QUERY,
      {},
      { next: { revalidate, tags: ["blog"] } },
    );
    return {
      featured: data?.featured ?? null,
      latest: data?.latest ?? [],
      categories: data?.categories ?? [],
    };
  } catch (error) {
    console.error("[sanity] getBlogIndex failed", error);
    return { featured: null, latest: [], categories: [] };
  }
}

export async function getBlogPostBySlug(
  slug: string,
): Promise<SanityBlogPost | null> {
  try {
    const post = await client.fetch<SanityBlogPost | null>(
      BLOG_POST_BY_SLUG_QUERY,
      { slug },
      { next: { revalidate, tags: ["blog", `blog:${slug}`] } },
    );
    if (!post?.slug) return null;
    if (post.seoNoIndex) {
      // Still render publicly but metadata will noindex; allow preview of published noindex pages.
    }
    return post;
  } catch (error) {
    console.error("[sanity] getBlogPostBySlug failed", error);
    return null;
  }
}

export async function getBlogSlugs(): Promise<string[]> {
  try {
    const rows = await staticClient.fetch<{ slug: string }[]>(
      BLOG_SLUGS_QUERY,
      {},
      { next: { revalidate: 300, tags: ["blog"] } },
    );
    return (rows || []).map((r) => r.slug).filter(Boolean);
  } catch (error) {
    console.error("[sanity] getBlogSlugs failed", error);
    return [];
  }
}

export async function getBlogSitemapEntries(): Promise<
  { slug: string; publishedAt?: string | null; updatedAt?: string | null }[]
> {
  try {
    return (
      (await staticClient.fetch(BLOG_SITEMAP_QUERY, {}, { next: { revalidate: 300, tags: ["blog"] } })) ||
      []
    );
  } catch (error) {
    console.error("[sanity] getBlogSitemapEntries failed", error);
    return [];
  }
}

export async function getCategoryBySlug(slug: string): Promise<
  | (SanityCategory & { posts: SanityPostCard[] })
  | null
> {
  try {
    return await client.fetch(
      CATEGORY_BY_SLUG_QUERY,
      { slug },
      { next: { revalidate, tags: ["blog", `category:${slug}`] } },
    );
  } catch (error) {
    console.error("[sanity] getCategoryBySlug failed", error);
    return null;
  }
}

export async function getTagBySlug(slug: string): Promise<
  | (SanityTag & { posts: SanityPostCard[] })
  | null
> {
  try {
    return await client.fetch(
      TAG_BY_SLUG_QUERY,
      { slug },
      { next: { revalidate, tags: ["blog", `tag:${slug}`] } },
    );
  } catch (error) {
    console.error("[sanity] getTagBySlug failed", error);
    return null;
  }
}

/** Extract plain-text headings from Portable Text for TOC. */
export function extractToc(
  content: unknown[] | null | undefined,
): { id: string; text: string; level: 2 | 3 }[] {
  if (!Array.isArray(content)) return [];
  const items: { id: string; text: string; level: 2 | 3 }[] = [];
  const seen = new Map<string, number>();

  for (const block of content) {
    if (!block || typeof block !== "object") continue;
    const b = block as {
      _type?: string;
      style?: string;
      children?: { text?: string }[];
    };
    if (b._type !== "block") continue;
    if (b.style !== "h2" && b.style !== "h3") continue;
    const text = (b.children || []).map((c) => c.text || "").join("").trim();
    if (!text) continue;
    const base = slugify(text);
    const count = (seen.get(base) || 0) + 1;
    seen.set(base, count);
    const id = count > 1 ? `${base}-${count}` : base;
    items.push({ id, text, level: b.style === "h2" ? 2 : 3 });
  }
  return items;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 80);
}

export function mergeTrekFacts(
  trek: SanityBlogPost["trek"],
  trekInfo: SanityBlogPost["trekInfo"],
): { label: string; value: string }[] {
  const source = {
    startingPoint: trekInfo?.startingPoint || trek?.startingPoint,
    duration: trekInfo?.duration || trek?.duration,
    altitude: trekInfo?.altitude || trek?.altitude,
    difficulty: trekInfo?.difficulty || trek?.difficulty,
    bestSeason: trekInfo?.bestSeason || trek?.season,
    distance: trekInfo?.distance || trek?.distance,
    location: trekInfo?.location || trek?.location,
  };
  const labels: Record<string, string> = {
    startingPoint: "Starting point",
    duration: "Duration",
    altitude: "Altitude",
    difficulty: "Difficulty",
    bestSeason: "Best season",
    distance: "Distance",
    location: "Location",
  };
  return Object.entries(source)
    .filter(([, v]) => Boolean(v && String(v).trim()))
    .map(([k, v]) => ({ label: labels[k], value: String(v) }));
}

export function resolveTrekHref(trek: {
  url?: string | null;
  slug?: string | null;
}): string | null {
  if (trek.url) {
    if (trek.url.startsWith("http") || trek.url.startsWith("/")) return trek.url;
  }
  if (trek.slug) return `/treks/${trek.slug}`;
  return null;
}
