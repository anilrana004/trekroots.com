import type { MetadataRoute } from "next";
import {
  getAllPackages,
  getAllStays,
  getAllTreks,
  getAllYatras,
} from "@/data";
import { getBlogSitemapEntries } from "@/lib/sanity";
import { absoluteUrl } from "@/lib/site";

/** Catalog is well under 500 URLs — single sitemap (no index split required). */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/treks"), lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: absoluteUrl("/easy-treks"), lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    {
      url: absoluteUrl("/easy-moderate-treks"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    { url: absoluteUrl("/yatra"), lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/packages"), lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: absoluteUrl("/stays"), lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: absoluteUrl("/blog"), lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: absoluteUrl("/about"), lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: absoluteUrl("/contact"), lastModified: now, changeFrequency: "monthly", priority: 0.85 },
  ];

  const treks = getAllTreks().map((t) => ({
    url: absoluteUrl(`/treks/${t.slug}`),
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  const yatras = getAllYatras().map((y) => ({
    url: absoluteUrl(`/yatra/${y.slug}`),
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  const packages = getAllPackages().map((p) => ({
    url: absoluteUrl(`/packages/${p.slug}`),
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.75,
  }));

  const stays = getAllStays().map((s) => ({
    url: absoluteUrl(`/stays/${s.slug}`),
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const sanityBlog = await getBlogSitemapEntries();
  const blog = sanityBlog.map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: post.updatedAt
      ? new Date(post.updatedAt)
      : post.publishedAt
        ? new Date(post.publishedAt)
        : now,
    changeFrequency: "monthly" as const,
    priority: 0.65,
  }));

  return [...staticPages, ...treks, ...yatras, ...packages, ...stays, ...blog];
}
