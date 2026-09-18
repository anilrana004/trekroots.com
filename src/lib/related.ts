import type { BlogPost, Stay, Trek, Yatra } from "@/data/types";
import { getAllBlogPosts, getAllStays, getAllTreks, getAllYatras } from "@/data";

/** Match blog posts that mention a trek/yatra by name or slug tokens. */
export function relatedBlogPostsForTrip(
  name: string,
  slug: string,
  limit = 3,
): BlogPost[] {
  const tokens = [
    ...slug.split("-").filter((t) => t.length > 3),
    ...name
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, " ")
      .split(/\s+/)
      .filter((t) => t.length > 3 && !["trek", "yatra", "with", "from"].includes(t)),
  ];
  const unique = [...new Set(tokens)];

  return getAllBlogPosts()
    .filter((post) => {
      const hay = `${post.title} ${post.slug} ${post.excerpt}`.toLowerCase();
      return unique.some((t) => hay.includes(t));
    })
    .slice(0, limit);
}

/** Stays whose location or nearby attractions overlap the trek region/base. */
export function relatedStaysForTrek(trek: Trek, limit = 2): Stay[] {
  const hayNeedles = [
    trek.region.toLowerCase(),
    trek.state.toLowerCase(),
    trek.startPoint.toLowerCase(),
    trek.slug.split("-")[0],
  ];

  const scored = getAllStays().map((stay) => {
    const hay =
      `${stay.name} ${stay.location} ${(stay.nearbyAttractions ?? []).join(" ")}`.toLowerCase();
    const score = hayNeedles.reduce(
      (n, needle) => (needle && hay.includes(needle) ? n + 1 : n),
      0,
    );
    return { stay, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.stay);
}

export function relatedTreksForTrek(trek: Trek, limit = 3): Trek[] {
  const sameState = getAllTreks().filter(
    (t) => t.slug !== trek.slug && t.state === trek.state,
  );
  if (sameState.length >= limit) return sameState.slice(0, limit);

  const sameDiff = getAllTreks().filter(
    (t) =>
      t.slug !== trek.slug &&
      !sameState.some((s) => s.slug === t.slug) &&
      t.difficulty.split(/\s+/)[0] === trek.difficulty.split(/\s+/)[0],
  );
  return [...sameState, ...sameDiff].slice(0, limit);
}

/** Catalog pages a blog post should link back to. */
export function catalogLinksForBlog(post: BlogPost): {
  treks: Trek[];
  yatras: Yatra[];
} {
  const hay = `${post.title} ${post.slug} ${post.excerpt}`.toLowerCase();
  const treks = getAllTreks()
    .filter((t) => {
      const key = t.slug.replace(/-trek$/, "").replace(/-/g, " ");
      return (
        hay.includes(t.slug.replace(/-/g, " ")) ||
        hay.includes(t.name.toLowerCase()) ||
        hay.includes(key)
      );
    })
    .slice(0, 3);

  const yatras = getAllYatras()
    .filter((y) => {
      return (
        hay.includes(y.slug.replace(/-/g, " ")) ||
        hay.includes(y.name.toLowerCase())
      );
    })
    .slice(0, 2);

  return { treks, yatras };
}
