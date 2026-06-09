import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, a as Shield, b as MapPin, h as Award, e as ChevronDown, H as House } from "./index-B8T7PWVC.js";
import { S as StayCard } from "./StayCard-zIPJc1Sp.js";
import { B as Button } from "./button-BUBLzLP_.js";
import { S as Skeleton } from "./skeleton-3Cu02kmY.js";
import { f as useAllStays } from "./useBackendQuery-DADe_-Iy.js";
import "./flame-Bi_aUBBP.js";
import "./wifi-Ci5gKLUK.js";
import "./backend-BHRKQ7VT.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",
      key: "4pj2yx"
    }
  ],
  ["path", { d: "M20 3v4", key: "1olli1" }],
  ["path", { d: "M22 5h-4", key: "1gvqau" }],
  ["path", { d: "M4 17v2", key: "vumght" }],
  ["path", { d: "M5 18H3", key: "zchphs" }]
];
const Sparkles = createLucideIcon("sparkles", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M7 10v12", key: "1qc93n" }],
  [
    "path",
    {
      d: "M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z",
      key: "emmmcr"
    }
  ]
];
const ThumbsUp = createLucideIcon("thumbs-up", __iconNode);
const REGIONS = ["All", "Garhwal", "Kumaon", "Himachal"];
const PROPERTY_TYPES = [
  "All",
  "Homestay",
  "Boutique Hotel",
  "Tented Camp",
  "Cottage",
  "Resort"
];
const PRICE_RANGES = [
  { label: "All", min: 0, max: Number.POSITIVE_INFINITY },
  { label: "Under ₹2,500", min: 0, max: 2500 },
  { label: "₹2,500 – ₹5,000", min: 2500, max: 5e3 },
  { label: "₹5,000+", min: 5e3, max: Number.POSITIVE_INFINITY }
];
const SORT_OPTIONS = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Name: A–Z", value: "name_asc" }
];
const USP_ITEMS = [
  {
    icon: Shield,
    title: "Handpicked Properties",
    desc: "Every property personally inspected by the Manya team"
  },
  {
    icon: ThumbsUp,
    title: "Best Price Guarantee",
    desc: "Book direct for the lowest rates, always"
  },
  {
    icon: MapPin,
    title: "Local Expertise",
    desc: "Hosts with deep knowledge of Himalayan terrain"
  },
  {
    icon: Award,
    title: "Breakfast Included",
    desc: "Home-cooked Garhwali & Himachali meals at every stay"
  }
];
const SKELETON_STAYS = [1, 2, 3, 4, 5, 6];
function StaySkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "rounded-2xl overflow-hidden",
      style: { background: "var(--bg-secondary)" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-56 w-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 space-y-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-3/4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-1/3 mt-2" })
        ] })
      ]
    }
  );
}
function StaysPage() {
  const { data: stays = [], isLoading } = useAllStays();
  const [region, setRegion] = reactExports.useState("All");
  const [stayType, setStayType] = reactExports.useState("All");
  const [priceRange, setPriceRange] = reactExports.useState("All");
  const [sortBy, setSortBy] = reactExports.useState("featured");
  const filtered = reactExports.useMemo(() => {
    const pr = PRICE_RANGES.find((p) => p.label === priceRange);
    let result = stays.filter((s) => {
      const matchRegion = region === "All" || s.location.toLowerCase().includes(region.toLowerCase());
      const matchType = stayType === "All" || s.stayType === stayType;
      const minPrice = Number(s.pricePerNightMin);
      const matchPrice = minPrice >= pr.min && minPrice <= pr.max;
      return matchRegion && matchType && matchPrice;
    });
    if (sortBy === "price_asc")
      result = [...result].sort(
        (a, b) => Number(a.pricePerNightMin) - Number(b.pricePerNightMin)
      );
    else if (sortBy === "price_desc")
      result = [...result].sort(
        (a, b) => Number(b.pricePerNightMin) - Number(a.pricePerNightMin)
      );
    else if (sortBy === "name_asc")
      result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    return result;
  }, [stays, region, stayType, priceRange, sortBy]);
  const resetFilters = () => {
    setRegion("All");
    setStayType("All");
    setPriceRange("All");
    setSortBy("featured");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen", style: { background: "var(--bg-primary)" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "relative overflow-hidden",
        style: { background: "var(--brand-primary)" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute inset-0 opacity-10",
              style: {
                backgroundImage: "radial-gradient(circle at 70% 30%, var(--brand-gold) 0%, transparent 60%), radial-gradient(circle at 20% 80%, var(--brand-secondary) 0%, transparent 50%)"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative container mx-auto px-6 py-24 md:py-32 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "inline-flex items-center gap-2 text-xs font-body font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-8",
                style: {
                  background: "rgba(230,190,138,0.15)",
                  color: "var(--brand-gold)",
                  border: "1px solid rgba(230,190,138,0.3)"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { size: 12 }),
                  "Manya-Owned & Managed Stays"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "h1",
              {
                className: "font-display text-5xl md:text-7xl font-bold leading-[0.95] tracking-tight mb-6",
                style: { color: "#fff" },
                children: [
                  "Where You Stay",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "var(--brand-gold)" }, children: "Matters" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "w-16 h-0.5 mx-auto mb-6 rounded-full",
                style: { background: "var(--brand-gold)" }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "font-body text-lg md:text-xl leading-relaxed max-w-2xl mx-auto",
                style: { color: "rgba(255,255,255,0.72)" },
                children: "Handpicked homestays and boutique properties placed at the heart of the Himalayas — each one telling a story of mountains and tradition."
              }
            )
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { style: { background: "#2a0d0d" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-6 py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6", children: USP_ITEMS.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
          style: {
            background: "rgba(230,190,138,0.12)",
            border: "1px solid rgba(230,190,138,0.25)"
          },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(item.icon, { size: 18, style: { color: "var(--brand-gold)" } })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: "text-sm font-body font-semibold mb-0.5",
            style: { color: "var(--brand-gold)" },
            children: item.title
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: "text-xs font-body leading-relaxed",
            style: { color: "rgba(255,255,255,0.55)" },
            children: item.desc
          }
        )
      ] })
    ] }, item.title)) }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "sticky top-[72px] z-30 border-b",
        style: {
          background: "var(--bg-primary)",
          borderColor: "var(--border-light)",
          boxShadow: "0 2px 12px rgba(60,20,20,0.06)"
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-6 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-x-6 gap-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "text-[11px] font-body font-semibold uppercase tracking-widest",
                style: { color: "var(--text-muted)" },
                children: "Region"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1.5", children: REGIONS.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                "data-ocid": `stay.filter.region.${r.toLowerCase()}`,
                onClick: () => setRegion(r),
                className: "px-3 py-1.5 rounded-full text-xs font-body font-medium transition-all duration-200",
                style: {
                  background: region === r ? "var(--brand-primary)" : "var(--bg-tertiary)",
                  color: region === r ? "#fff" : "var(--text-secondary)",
                  border: region === r ? "1px solid var(--brand-primary)" : "1px solid var(--border-light)"
                },
                children: r
              },
              r
            )) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "text-[11px] font-body font-semibold uppercase tracking-widest",
                style: { color: "var(--text-muted)" },
                children: "Type"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1.5 flex-wrap", children: PROPERTY_TYPES.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                "data-ocid": `stay.filter.type.${t.toLowerCase().replace(/\s+/g, "-")}`,
                onClick: () => setStayType(t),
                className: "px-3 py-1.5 rounded-full text-xs font-body font-medium transition-all duration-200",
                style: {
                  background: stayType === t ? "var(--brand-secondary)" : "var(--bg-tertiary)",
                  color: stayType === t ? "#fff" : "var(--text-secondary)",
                  border: stayType === t ? "1px solid var(--brand-secondary)" : "1px solid var(--border-light)"
                },
                children: t
              },
              t
            )) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "text-[11px] font-body font-semibold uppercase tracking-widest",
                style: { color: "var(--text-muted)" },
                children: "Price"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1.5", children: PRICE_RANGES.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                "data-ocid": `stay.filter.price.${p.label.toLowerCase().replace(/[^a-z0-9]/g, "-")}`,
                onClick: () => setPriceRange(p.label),
                className: "px-3 py-1.5 rounded-full text-xs font-body font-medium transition-all duration-200",
                style: {
                  background: priceRange === p.label ? "var(--accent-orange)" : "var(--bg-tertiary)",
                  color: priceRange === p.label ? "#fff" : "var(--text-secondary)",
                  border: priceRange === p.label ? "1px solid var(--accent-orange)" : "1px solid var(--border-light)"
                },
                children: p.label
              },
              p.label
            )) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 ml-auto", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "text-[11px] font-body font-semibold uppercase tracking-widest shrink-0",
                style: { color: "var(--text-muted)" },
                children: "Sort"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "select",
                {
                  value: sortBy,
                  onChange: (e) => setSortBy(e.target.value),
                  "data-ocid": "stay.sort_select",
                  className: "appearance-none pl-3 pr-8 py-1.5 rounded-full text-xs font-body font-medium cursor-pointer focus:outline-none",
                  style: {
                    background: "var(--bg-tertiary)",
                    color: "var(--text-secondary)",
                    border: "1px solid var(--border-light)"
                  },
                  children: SORT_OPTIONS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: s.value, children: s.label }, s.value))
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                ChevronDown,
                {
                  size: 12,
                  className: "absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none",
                  style: { color: "var(--text-muted)" }
                }
              )
            ] })
          ] })
        ] }) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "container mx-auto px-6 py-14", children: [
      !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "p",
          {
            className: "text-sm font-body",
            style: { color: "var(--text-muted)" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "font-semibold text-base",
                  style: { color: "var(--brand-primary)" },
                  children: filtered.length
                }
              ),
              " ",
              filtered.length === 1 ? "property" : "properties",
              " found"
            ]
          }
        ),
        (region !== "All" || stayType !== "All" || priceRange !== "All") && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: resetFilters,
            "data-ocid": "stay.reset_filters",
            className: "text-xs font-body font-medium",
            style: { color: "var(--brand-secondary)" },
            children: "Clear filters ×"
          }
        )
      ] }),
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6", children: SKELETON_STAYS.map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(StaySkeleton, {}, n)) }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "text-center py-24 rounded-2xl",
          "data-ocid": "stay.empty_state",
          style: { background: "var(--bg-secondary)" },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              House,
              {
                size: 48,
                className: "mx-auto mb-5",
                style: { color: "var(--brand-gold)" }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "h3",
              {
                className: "font-display text-2xl font-semibold mb-2",
                style: { color: "var(--brand-primary)" },
                children: "No stays match your filters"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "font-body text-sm mb-6",
                style: { color: "var(--text-muted)" },
                children: "Try adjusting your region, type, or price range."
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                onClick: resetFilters,
                "data-ocid": "stay.reset_filters_btn",
                style: {
                  borderColor: "var(--brand-primary)",
                  color: "var(--brand-primary)"
                },
                children: "Reset Filters"
              }
            )
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6", children: filtered.map((stay, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(StayCard, { stay, index: i }, String(stay.id))) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "border-t",
        style: {
          background: "var(--bg-secondary)",
          borderColor: "var(--border-light)"
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-6 py-16 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "font-body text-xs font-semibold uppercase tracking-widest mb-4",
              style: { color: "var(--accent-orange)" },
              children: "Need Help Choosing?"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "h2",
            {
              className: "font-display text-3xl md:text-4xl font-bold mb-4",
              style: { color: "var(--brand-primary)" },
              children: "Let Manya Be Your Guide"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "font-body text-base max-w-xl mx-auto mb-8",
              style: { color: "var(--text-secondary)" },
              children: "Our mountain experts will help you pick the perfect property for your itinerary — whether it's a cosy homestay or an alpine tented camp."
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: "https://wa.me/919999999999?text=Hi Manya Destination! I need help choosing a stay.",
              target: "_blank",
              rel: "noopener noreferrer",
              "data-ocid": "stay.consult_cta",
              className: "inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-body font-semibold text-sm transition-all duration-300 hover:opacity-90 hover:-translate-y-0.5",
              style: {
                background: "var(--brand-primary)",
                color: "#fff",
                boxShadow: "var(--shadow-md)"
              },
              children: "Talk to an Expert"
            }
          )
        ] })
      }
    )
  ] });
}
export {
  StaysPage as default
};
