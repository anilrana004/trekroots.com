import { j as jsxRuntimeExports, r as reactExports, k as Search, L as Link, C as Clock, A as ArrowRight } from "./index-B8T7PWVC.js";
import { B as Button } from "./button-BUBLzLP_.js";
import { c as cn, S as Skeleton } from "./skeleton-3Cu02kmY.js";
import { h as useAllBlogPosts } from "./useBackendQuery-DADe_-Iy.js";
import { U as User } from "./user-DmB3013L.js";
import { C as CalendarDays } from "./calendar-days-C5oCkp3S.js";
import "./backend-BHRKQ7VT.js";
function Input({ className, type, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "input",
    {
      type,
      "data-slot": "input",
      className: cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      ),
      ...props
    }
  );
}
const CATEGORIES = [
  "All",
  "Treks",
  "Yatras",
  "Packages",
  "Culture",
  "Photography"
];
const MOCK_POSTS = [
  {
    id: 1n,
    title: "Valley of Flowers: The Ultimate Photography Guide",
    content: "",
    readTimeMin: 8n,
    readTime: 8n,
    slug: "valley-of-flowers-photo-guide",
    authorName: "Arjun Mehta",
    publishedAt: BigInt((/* @__PURE__ */ new Date("2025-07-15")).getTime()) * 1000000n,
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80",
    excerpt: "Discover the finest vantage points, golden-hour windows, and lens choices for capturing the riot of colours that bloom each monsoon in this UNESCO World Heritage valley.",
    category: "Photography"
  },
  {
    id: 2n,
    title: "Kedarnath Yatra 2025: The Complete Pilgrim's Handbook",
    content: "",
    readTimeMin: 12n,
    readTime: 12n,
    slug: "kedarnath-yatra-complete-guide",
    authorName: "Priya Sharma",
    publishedAt: BigInt((/* @__PURE__ */ new Date("2025-06-01")).getTime()) * 1000000n,
    imageUrl: "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=1200&q=80",
    excerpt: "From Gaurikund to the sacred Jyotirlinga — everything a first-time devotee needs to plan a safe, spiritually enriching Kedarnath Yatra, including helicopter booking tips.",
    category: "Yatras"
  },
  {
    id: 3n,
    title: "10 Best Treks in Uttarakhand for Every Level of Adventurer",
    content: "",
    readTimeMin: 10n,
    readTime: 10n,
    slug: "best-treks-uttarakhand",
    authorName: "Vikram Nair",
    publishedAt: BigInt((/* @__PURE__ */ new Date("2025-05-20")).getTime()) * 1000000n,
    imageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=80",
    excerpt: "From the beginner-friendly meadows of Chopta to the technical ridges of Roopkund, we rank the finest trails across Garhwal and Kumaon — with season guides and distance data.",
    category: "Treks"
  },
  {
    id: 4n,
    title: "Char Dham Yatra: Planning Your Sacred Circuit in 2025",
    content: "",
    readTimeMin: 14n,
    readTime: 14n,
    slug: "char-dham-yatra-planning",
    authorName: "Sunita Rawat",
    publishedAt: BigInt((/* @__PURE__ */ new Date("2025-04-10")).getTime()) * 1000000n,
    imageUrl: "https://images.unsplash.com/photo-1598977052854-f09a61d8b671?w=1200&q=80",
    excerpt: "An authoritative guide to covering Yamunotri, Gangotri, Kedarnath, and Badrinath in a single journey — with route options, lodging tips, and the best departure windows.",
    category: "Yatras"
  },
  {
    id: 5n,
    title: "Himalayan Photography: Light, Composition & Ethics on the Trail",
    content: "",
    readTimeMin: 9n,
    readTime: 9n,
    slug: "himalayan-photography-tips",
    authorName: "Arjun Mehta",
    publishedAt: BigInt((/* @__PURE__ */ new Date("2025-03-28")).getTime()) * 1000000n,
    imageUrl: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&q=80",
    excerpt: "Professional field notes on shooting at altitude — managing dynamic range above 4,000 m, respecting local customs at sacred sites, and gear that survives monsoon and snowfall alike.",
    category: "Photography"
  },
  {
    id: 6n,
    title: "Roopkund Trek Solo Guide: Is It Possible?",
    content: "",
    readTimeMin: 11n,
    readTime: 11n,
    slug: "roopkund-trek-solo-guide",
    authorName: "Vikram Nair",
    publishedAt: BigInt((/* @__PURE__ */ new Date("2025-02-14")).getTime()) * 1000000n,
    imageUrl: "https://images.unsplash.com/photo-1456926631375-92c8ce872def?w=1200&q=80",
    excerpt: "The Skeleton Lake trek demands respect. We break down permits, porter logistics, acclimatisation schedules, and the honest risk assessment that every solo trekker must read.",
    category: "Treks"
  }
];
function formatDate(ts) {
  try {
    const d = new Date(Number(ts) / 1e6);
    return d.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  } catch {
    return "";
  }
}
function CategoryBadge({ category }) {
  const colorMap = {
    Photography: "bg-amber-50 text-amber-700 border-amber-200",
    Treks: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Yatras: "bg-orange-50 text-orange-700 border-orange-200",
    Culture: "bg-purple-50 text-purple-700 border-purple-200",
    Packages: "bg-blue-50 text-blue-700 border-blue-200"
  };
  const cls = colorMap[category] ?? "bg-muted text-muted-foreground border-border";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: `inline-block px-2.5 py-0.5 text-xs font-body font-semibold uppercase tracking-wider rounded-full border ${cls}`,
      children: category
    }
  );
}
function ArticleSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl overflow-hidden bg-card border border-border", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-[4/3] w-full" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-16" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-full" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-3/4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-1/2" })
    ] })
  ] });
}
function BlogPage() {
  const { data: backendPosts = [], isLoading } = useAllBlogPosts();
  const [category, setCategory] = reactExports.useState("All");
  const [search, setSearch] = reactExports.useState("");
  const allPosts = reactExports.useMemo(() => {
    const slugSet = new Set(backendPosts.map((p) => p.slug));
    const extras = MOCK_POSTS.filter((p) => !slugSet.has(p.slug));
    return [...backendPosts, ...extras];
  }, [backendPosts]);
  const filtered = reactExports.useMemo(() => {
    let posts = allPosts;
    if (category !== "All")
      posts = posts.filter((p) => p.category === category);
    if (search.trim()) {
      const q = search.toLowerCase();
      posts = posts.filter(
        (p) => p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q)
      );
    }
    return posts;
  }, [allPosts, category, search]);
  const featured = filtered[0];
  const rest = filtered.slice(1);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "relative border-b border-border",
        style: { background: "var(--color-black-bean)" },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 pt-16 pb-12 md:pt-20 md:pb-16 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "text-xs font-body font-semibold uppercase tracking-[0.35em] mb-4",
              style: { color: "var(--color-gold)" },
              children: "Manya Destination"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "h1",
            {
              className: "font-display text-6xl md:text-8xl font-bold leading-none mb-4",
              style: { color: "var(--color-cream, #F5ECD7)" },
              children: "The Journal"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-16 h-px mx-auto mb-5",
              style: { background: "var(--color-mahogany)" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "font-body text-base md:text-lg max-w-md mx-auto leading-relaxed mb-8",
              style: { color: "rgba(245,236,215,0.7)" },
              children: "Stories, guides & wisdom from the Himalayas"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-w-sm mx-auto", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Search,
              {
                size: 16,
                className: "absolute left-3 top-1/2 -translate-y-1/2",
                style: { color: "rgba(245,236,215,0.5)" }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                "data-ocid": "blog.search_input",
                value: search,
                onChange: (e) => setSearch(e.target.value),
                placeholder: "Search stories\\u2026",
                className: "pl-9 font-body",
                style: {
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "#F5ECD7"
                }
              }
            )
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-card border-b border-border sticky top-[72px] z-30", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1.5 py-3 overflow-x-auto", children: CATEGORIES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        "data-ocid": `blog.filter.${c.toLowerCase()}`,
        onClick: () => setCategory(c),
        className: `shrink-0 px-4 py-1.5 rounded-full text-xs font-body font-semibold uppercase tracking-wider transition-colors ${category === c ? "text-white" : "bg-muted text-muted-foreground hover:bg-muted/80"}`,
        style: category === c ? { background: "var(--color-mahogany)" } : {},
        children: c
      },
      c
    )) }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-12 md:py-16", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-[420px] w-full rounded-2xl mb-10" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: [1, 2, 3, 4, 5].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(ArticleSkeleton, {}, n)) })
    ] }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-24", "data-ocid": "blog.empty_state", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-3xl text-foreground mb-2", children: "No stories found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-muted-foreground", children: "Try a different category or search term." })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      featured && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-12", "data-ocid": "blog.featured", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: "font-body text-xs font-semibold uppercase tracking-[0.3em] mb-4",
            style: { color: "var(--color-mahogany)" },
            children: "Featured Story"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/blog/$slug",
            params: { slug: featured.slug },
            className: "group block rounded-2xl overflow-hidden bg-card border border-border shadow-md hover:shadow-xl transition-all duration-500",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-[1fr_460px]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-video lg:aspect-auto min-h-[300px] overflow-hidden relative", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: featured.imageUrl,
                  alt: featured.title,
                  className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-8 md:p-10 flex flex-col justify-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CategoryBadge, { category: featured.category }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "h2",
                  {
                    className: "font-display text-3xl md:text-4xl font-bold leading-tight mb-4 group-hover:opacity-75 transition-opacity",
                    style: { color: "var(--color-black-bean)" },
                    children: featured.title
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-muted-foreground leading-relaxed mb-6 line-clamp-3", children: featured.excerpt }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-4 text-xs font-body text-muted-foreground mb-6", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 12 }),
                    featured.authorName
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { size: 12 }),
                    formatDate(featured.publishedAt)
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 12 }),
                    Number(featured.readTimeMin || featured.readTime),
                    " ",
                    "min read"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    type: "button",
                    className: "w-fit gap-2 font-body font-semibold text-white",
                    style: { background: "var(--color-mahogany)" },
                    children: [
                      "Read Story ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 14 })
                    ]
                  }
                )
              ] })
            ] })
          }
        )
      ] }),
      rest.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-px bg-border" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-xs text-muted-foreground uppercase tracking-widest shrink-0", children: "More Stories" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-px bg-border" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8", children: rest.map((post, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/blog/$slug",
          params: { slug: post.slug },
          "data-ocid": `blog.item.${i + 2}`,
          className: "group flex flex-col rounded-xl overflow-hidden bg-card border border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[16/10] overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: post.imageUrl,
                alt: post.title,
                className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 flex flex-col flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CategoryBadge, { category: post.category }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "h3",
                {
                  className: "font-display text-xl font-bold leading-snug mb-3 line-clamp-2 group-hover:opacity-75 transition-opacity",
                  style: { color: "var(--color-black-bean)" },
                  children: post.title
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1 mb-4", children: post.excerpt }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-4 border-t border-border flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-xs font-body text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 11 }),
                    post.authorName
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 11 }),
                    Number(post.readTimeMin || post.readTime),
                    " min"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: "text-xs font-body font-semibold flex items-center gap-1 group-hover:gap-2 transition-all",
                    style: { color: "var(--color-mahogany)" },
                    children: [
                      "Read ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 11 })
                    ]
                  }
                )
              ] })
            ] })
          ]
        },
        String(post.id)
      )) })
    ] }) })
  ] });
}
export {
  BlogPage as default
};
