"use client";

import type { BlogPost } from "@/data";
import { getAllBlogPosts } from "@/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { ArrowRight, CalendarDays, Clock, Search, User } from "lucide-react";
import { useMemo, useState } from "react";
import { ZoomInCard } from "@/components/ZoomInCard";

const CATEGORIES = [
  "All",
  "Treks",
  "Yatras",
  "Packages",
  "Culture",
  "Photography",
] as const;

const MOCK_POSTS: BlogPost[] = [
  {
    id: 1,
    title: "Valley of Flowers: The Ultimate Photography Guide",
    content: "",
    readTimeMin: 8,
    readTime: 8,
    slug: "valley-of-flowers-photo-guide",
    authorName: "Arjun Mehta",
    publishedAt: new Date("2025-07-15").getTime(),
    imageUrl:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80",
    excerpt:
      "Discover the finest vantage points, golden-hour windows, and lens choices for capturing the riot of colours that bloom each monsoon in this UNESCO World Heritage valley.",
    category: "Photography",
  },
  {
    id: 2,
    title: "Kedarnath Yatra 2025: The Complete Pilgrim's Handbook",
    content: "",
    readTimeMin: 12,
    readTime: 12,
    slug: "kedarnath-yatra-complete-guide",
    authorName: "Priya Sharma",
    publishedAt: new Date("2025-06-01").getTime(),
    imageUrl:
      "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=1200&q=80",
    excerpt:
      "From Gaurikund to the sacred Jyotirlinga — everything a first-time devotee needs to plan a safe, spiritually enriching Kedarnath Yatra, including helicopter booking tips.",
    category: "Yatras",
  },
  {
    id: 3,
    title: "10 Best Treks in Uttarakhand for Every Level of Adventurer",
    content: "",
    readTimeMin: 10,
    readTime: 10,
    slug: "best-treks-uttarakhand",
    authorName: "Vikram Nair",
    publishedAt: new Date("2025-05-20").getTime(),
    imageUrl:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=80",
    excerpt:
      "From the beginner-friendly meadows of Chopta to the technical ridges of Roopkund, we rank the finest trails across Garhwal and Kumaon — with season guides and distance data.",
    category: "Treks",
  },
  {
    id: 4,
    title: "Char Dham Yatra: Planning Your Sacred Circuit in 2025",
    content: "",
    readTimeMin: 14,
    readTime: 14,
    slug: "char-dham-yatra-planning",
    authorName: "Sunita Rawat",
    publishedAt: new Date("2025-04-10").getTime(),
    imageUrl:
      "https://images.unsplash.com/photo-1598977052854-f09a61d8b671?w=1200&q=80",
    excerpt:
      "An authoritative guide to covering Yamunotri, Gangotri, Kedarnath, and Badrinath in a single journey — with route options, lodging tips, and the best departure windows.",
    category: "Yatras",
  },
  {
    id: 5,
    title: "Himalayan Photography: Light, Composition & Ethics on the Trail",
    content: "",
    readTimeMin: 9,
    readTime: 9,
    slug: "himalayan-photography-tips",
    authorName: "Arjun Mehta",
    publishedAt: new Date("2025-03-28").getTime(),
    imageUrl:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&q=80",
    excerpt:
      "Professional field notes on shooting at altitude — managing dynamic range above 4,000 m, respecting local customs at sacred sites, and gear that survives monsoon and snowfall alike.",
    category: "Photography",
  },
  {
    id: 6,
    title: "Roopkund Trek Solo Guide: Is It Possible?",
    content: "",
    readTimeMin: 11,
    readTime: 11,
    slug: "roopkund-trek-solo-guide",
    authorName: "Vikram Nair",
    publishedAt: new Date("2025-02-14").getTime(),
    imageUrl:
      "https://images.unsplash.com/photo-1456926631375-92c8ce872def?w=1200&q=80",
    excerpt:
      "The Skeleton Lake trek demands respect. We break down permits, porter logistics, acclimatisation schedules, and the honest risk assessment that every solo trekker must read.",
    category: "Treks",
  },
];

function formatDate(ts: number): string {
  try {
    const d = new Date(ts);
    return d.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return "";
  }
}

function CategoryBadge({ category }: { category: string }) {
  const colorMap: Record<string, string> = {
    Photography: "bg-amber-50 text-amber-700 border-amber-200",
    Treks: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Yatras: "bg-orange-50 text-orange-700 border-orange-200",
    Culture: "bg-purple-50 text-purple-700 border-purple-200",
    Packages: "bg-blue-50 text-blue-700 border-blue-200",
  };
  const cls =
    colorMap[category] ?? "bg-muted text-muted-foreground border-border";
  return (
    <span
      className={`inline-block px-2.5 py-0.5 text-xs font-body font-semibold uppercase tracking-wider rounded-full border ${cls}`}
    >
      {category}
    </span>
  );
}

function ArticleSkeleton() {
  return (
    <div className="rounded-xl overflow-hidden bg-card border border-border">
      <Skeleton className="aspect-[4/3] w-full" />
      <div className="p-5 space-y-3">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>
    </div>
  );
}

function BlogPage() {
  const backendPosts = getAllBlogPosts();
  const isLoading = false;
  const [category, setCategory] = useState<string>("All");
  const [search, setSearch] = useState("");

  // Merge backend posts + mock posts; deduplicate by slug
  const allPosts = useMemo(() => {
    const slugSet = new Set(backendPosts.map((p) => p.slug));
    const extras = MOCK_POSTS.filter((p) => !slugSet.has(p.slug));
    return [...backendPosts, ...extras];
  }, [backendPosts]);

  const filtered = useMemo(() => {
    let posts = allPosts;
    if (category !== "All")
      posts = posts.filter((p) => p.category === category);
    if (search.trim()) {
      const q = search.toLowerCase();
      posts = posts.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q),
      );
    }
    return posts;
  }, [allPosts, category, search]);

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <div className="min-h-screen bg-background">
      {/* Masthead */}
      <section
        className="relative border-b border-border"
        style={{ background: "var(--color-black-bean)" }}
      >
        <div className="container mx-auto px-4 pt-16 pb-12 md:pt-20 md:pb-16 text-center">
          <p
            className="text-xs font-body font-semibold uppercase tracking-[0.35em] mb-4"
            style={{ color: "var(--color-gold)" }}
          >
            TrekRoots
          </p>
          <h1
            className="font-display text-6xl md:text-8xl font-bold leading-none mb-4"
            style={{ color: "var(--color-cream, #FFFFFF)" }}
          >
            The Journal
          </h1>
          <div
            className="w-16 h-px mx-auto mb-5"
            style={{ background: "var(--color-mahogany)" }}
          />
          <p
            className="font-body text-base md:text-lg max-w-md mx-auto leading-relaxed mb-8"
            style={{ color: "rgba(245,236,215,0.7)" }}
          >
            Stories, guides &amp; wisdom from the Himalayas
          </p>
          {/* Search */}
          <div className="relative max-w-sm mx-auto">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2"
              style={{ color: "rgba(245,236,215,0.5)" }}
            />
            <Input
              data-ocid="blog.search_input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search stories\u2026"
              className="pl-9 font-body"
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "#FFFFFF",
              }}
            />
          </div>
        </div>
      </section>

      {/* Category Pills */}
      <section className="detail-section-nav bg-card border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-1.5 py-2.5 md:py-3 overflow-x-auto hide-scrollbar">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                type="button"
                data-ocid={`blog.filter.${c.toLowerCase()}`}
                onClick={() => setCategory(c)}
                className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-body font-semibold uppercase tracking-wider transition-colors ${
                  category === c
                    ? "text-white"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
                style={
                  category === c ? { background: "var(--color-mahogany)" } : {}
                }
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 md:py-16">
        {isLoading ? (
          <>
            <Skeleton className="h-[420px] w-full rounded-2xl mb-10" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5].map((n) => (
                <ArticleSkeleton key={n} />
              ))}
            </div>
          </>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24" data-ocid="blog.empty_state">
            <p className="font-display text-3xl text-foreground mb-2">
              No stories found
            </p>
            <p className="font-body text-muted-foreground">
              Try a different category or search term.
            </p>
          </div>
        ) : (
          <>
            {/* Featured Article */}
            {featured && (
              <div className="mb-12" data-ocid="blog.featured">
                <p
                  className="font-body text-xs font-semibold uppercase tracking-[0.3em] mb-4"
                  style={{ color: "var(--color-mahogany)" }}
                >
                  Featured Story
                </p>
                <ZoomInCard index={0} className="w-full">
                  <Link
                  href={`/blog/${featured.slug }`}
                  className="group block rounded-2xl overflow-hidden bg-card border border-border shadow-md hover:shadow-xl transition-all duration-500"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-[1fr_460px]">
                    <div className="aspect-video lg:aspect-auto min-h-[300px] overflow-hidden relative">
                      <img
                        src={featured.imageUrl}
                        alt={featured.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    <div className="p-8 md:p-10 flex flex-col justify-center">
                      <div className="mb-4">
                        <CategoryBadge category={featured.category} />
                      </div>
                      <h2
                        className="font-display text-3xl md:text-4xl font-bold leading-tight mb-4 group-hover:opacity-75 transition-opacity"
                        style={{ color: "var(--color-black-bean)" }}
                      >
                        {featured.title}
                      </h2>
                      <p className="font-body text-muted-foreground leading-relaxed mb-6 line-clamp-3">
                        {featured.excerpt}
                      </p>
                      <div className="flex flex-wrap items-center gap-4 text-xs font-body text-muted-foreground mb-6">
                        <span className="flex items-center gap-1.5">
                          <User size={12} />
                          {featured.authorName}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <CalendarDays size={12} />
                          {formatDate(featured.publishedAt)}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock size={12} />
                          {Number(featured.readTimeMin || featured.readTime)}{" "}
                          min read
                        </span>
                      </div>
                      <Button
                        type="button"
                        className="w-fit gap-2 font-body font-semibold text-white"
                        style={{ background: "var(--color-mahogany)" }}
                      >
                        Read Story <ArrowRight size={14} />
                      </Button>
                    </div>
                  </div>
                </Link>
                </ZoomInCard>
              </div>
            )}

            {rest.length > 0 && (
              <div className="flex items-center gap-4 mb-8">
                <div className="flex-1 h-px bg-border" />
                <p className="font-body text-xs text-muted-foreground uppercase tracking-widest shrink-0">
                  More Stories
                </p>
                <div className="flex-1 h-px bg-border" />
              </div>
            )}

            {/* Article Grid */}
            <div
              key={`${category}|${search}`}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            >
              {rest.map((post, i) => (
                <ZoomInCard key={String(post.id)} index={i + 1}>
                  <Link
                    href={`/blog/${post.slug }`}
                    data-ocid={`blog.item.${i + 2}`}
                    className="group flex flex-col h-full rounded-xl overflow-hidden bg-card border border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
                  >
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <div className="mb-3">
                      <CategoryBadge category={post.category} />
                    </div>
                    <h3
                      className="font-display text-xl font-bold leading-snug mb-3 line-clamp-2 group-hover:opacity-75 transition-opacity"
                      style={{ color: "var(--color-black-bean)" }}
                    >
                      {post.title}
                    </h3>
                    <p className="font-body text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1 mb-4">
                      {post.excerpt}
                    </p>
                    <div className="pt-4 border-t border-border flex items-center justify-between">
                      <div className="flex items-center gap-3 text-xs font-body text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <User size={11} />
                          {post.authorName}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={11} />
                          {Number(post.readTimeMin || post.readTime)} min
                        </span>
                      </div>
                      <span
                        className="text-xs font-body font-semibold flex items-center gap-1 group-hover:gap-2 transition-all"
                        style={{ color: "var(--color-mahogany)" }}
                      >
                        Read <ArrowRight size={11} />
                      </span>
                    </div>
                  </div>
                </Link>
                </ZoomInCard>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default BlogPage;
