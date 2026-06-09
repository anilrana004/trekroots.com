import { c as createLucideIcon, u as useParams, r as reactExports, j as jsxRuntimeExports, L as Link, C as Clock, U as Users, B as BedDouble, e as ChevronDown, X, S as Star, A as ArrowRight, f as MessageCircle, d as Calendar, a as Shield, P as Phone, g as Mail, M as Mountain, b as MapPin } from "./index-B8T7PWVC.js";
import { e as usePackageBySlug } from "./useBackendQuery-DADe_-Iy.js";
import { C as Check } from "./check-B5ODmzX0.js";
import "./backend-BHRKQ7VT.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M6 3h12", key: "ggurg9" }],
  ["path", { d: "M6 8h12", key: "6g4wlu" }],
  ["path", { d: "m6 13 8.5 8", key: "u1kupk" }],
  ["path", { d: "M6 13h3", key: "wdp6ag" }],
  ["path", { d: "M9 13c6.667 0 6.667-10 0-10", key: "1nkvk2" }]
];
const IndianRupee = createLucideIcon("indian-rupee", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2", key: "cjf0a3" }],
  ["path", { d: "M7 2v20", key: "1473qp" }],
  ["path", { d: "M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7", key: "j28e5" }]
];
const Utensils = createLucideIcon("utensils", __iconNode);
const TABS = [
  { id: "overview", label: "Overview" },
  { id: "itinerary", label: "Itinerary" },
  { id: "inclusions", label: "Inclusions" },
  { id: "accommodation", label: "Accommodation" },
  { id: "pricing", label: "Price Breakdown" },
  { id: "reviews", label: "Reviews" },
  { id: "faq", label: "FAQ" },
  { id: "book", label: "Book Now" }
];
const SAMPLE_REVIEWS = [
  {
    name: "Rahul Sharma",
    location: "Delhi",
    rating: 5,
    date: "March 2026",
    text: "An absolutely seamless experience from start to finish. The team handled every detail and the trek was magical."
  },
  {
    name: "Priya Patel",
    location: "Mumbai",
    rating: 5,
    date: "February 2026",
    text: "Best Himalayan experience we've had as a family. The guides were knowledgeable and the accommodation was cozy."
  },
  {
    name: "Arjun Mehta",
    location: "Bangalore",
    rating: 4,
    date: "January 2026",
    text: "Great value for money. The itinerary was well-paced and the food was surprisingly good at altitude."
  },
  {
    name: "Sneha Gupta",
    location: "Pune",
    rating: 5,
    date: "December 2025",
    text: "Solo female traveller and felt completely safe. The women-only group was supportive and fun."
  }
];
const SAMPLE_FAQS = [
  {
    q: "What is the cancellation policy?",
    a: "Full refund if cancelled 30 days before departure. 50% refund for 15-30 days. No refund within 15 days, but you can reschedule once."
  },
  {
    q: "Is travel insurance included?",
    a: "Travel insurance is not included by default but can be added as an optional add-on during booking. We strongly recommend it for all high-altitude treks."
  },
  {
    q: "What fitness level is required?",
    a: "Most packages require a basic level of fitness — ability to walk 5-7 km comfortably. Difficult treks require prior high-altitude experience."
  },
  {
    q: "Are meals included?",
    a: "Yes, all meals from Day 1 dinner to the last day breakfast are included. We serve vegetarian and non-vegetarian options with local Himalayan flavours."
  },
  {
    q: "Can I customize the itinerary?",
    a: "Absolutely. Contact us via WhatsApp or email and our team will tailor the package to your preferences, group size, and dates."
  },
  {
    q: "What is the group size?",
    a: "Group sizes vary by package — typically 8-20 people for standard departures. Private groups can be arranged for 4+ travellers."
  }
];
const HIGHLIGHT_ICONS = {
  Expert: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { size: 16 }),
  Guide: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 16 }),
  Meals: /* @__PURE__ */ jsxRuntimeExports.jsx(Utensils, { size: 16 }),
  Accommodation: /* @__PURE__ */ jsxRuntimeExports.jsx(BedDouble, { size: 16 }),
  Transport: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 16 }),
  Safety: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { size: 16 })
};
function getHighlightIcon(text) {
  for (const key of Object.keys(HIGHLIGHT_ICONS)) {
    if (text.toLowerCase().includes(key.toLowerCase())) {
      return HIGHLIGHT_ICONS[key];
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Mountain, { size: 16 });
}
function PackageDetailPage() {
  const { slug } = useParams({ from: "/packages/$slug" });
  const { data: pkg, isLoading } = usePackageBySlug(slug);
  const [activeTab, setActiveTab] = reactExports.useState("overview");
  const [openFaq, setOpenFaq] = reactExports.useState(null);
  const [openDay, setOpenDay] = reactExports.useState(0);
  const sectionRefs = reactExports.useRef({});
  reactExports.useEffect(() => {
    const onScroll = () => {
      const offsets = TABS.map((t) => {
        const el = sectionRefs.current[t.id];
        return {
          id: t.id,
          top: el ? el.offsetTop - 120 : Number.POSITIVE_INFINITY
        };
      });
      const current = offsets.filter((o) => o.top <= window.scrollY).sort((a, b) => b.top - a.top)[0];
      if (current) setActiveTab(current.id);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const scrollTo = (id) => {
    const el = sectionRefs.current[id];
    if (el) {
      window.scrollTo({ top: el.offsetTop - 100, behavior: "smooth" });
      setActiveTab(id);
    }
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center min-h-[60vh]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" }) });
  }
  if (!pkg) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-body", children: "Package not found." }) });
  }
  const minPrice = Number(pkg.priceRange.minINR).toLocaleString("en-IN");
  const maxPrice = Number(pkg.priceRange.maxINR).toLocaleString("en-IN");
  const hasTiers = pkg.tiers && pkg.tiers.length > 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen", style: { background: "var(--bg-primary)" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative h-[75vh] min-h-[520px] flex items-end overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0", children: [
        pkg.imageUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: pkg.imageUrl,
            alt: pkg.name,
            className: "w-full h-full object-cover"
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "w-full h-full",
            style: { background: "var(--bg-tertiary)" }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0",
            style: {
              background: "linear-gradient(180deg, rgba(60,20,20,0.1) 0%, rgba(20,8,8,0.78) 100%)"
            }
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full max-w-[1400px] mx-auto px-6 pb-14 md:pb-20", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "flex items-center gap-2 text-white/60 text-xs font-body mb-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "hover:text-white transition-colors", children: "Home" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "/" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/packages", className: "hover:text-white transition-colors", children: "Packages" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "/" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/90", children: pkg.name })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "span",
          {
            className: "inline-block px-3 py-1 text-xs font-body font-semibold mb-4 rounded-full",
            style: { background: "var(--accent-orange)", color: "#fff" },
            children: [
              pkg.category,
              " Package"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display italic text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-white leading-tight mb-5 max-w-3xl", children: pkg.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap items-center gap-3 mb-6", children: [
          { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 14 }), text: pkg.duration },
          { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 14 }), text: pkg.groupSize },
          { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(BedDouble, { size: 14 }), text: pkg.accommodationType },
          { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(IndianRupee, { size: 14 }), text: `From ₹${minPrice}` }
        ].map(({ icon, text }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "span",
          {
            className: "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-white text-xs font-body",
            style: {
              background: "rgba(255,255,255,0.15)",
              backdropFilter: "blur(4px)"
            },
            children: [
              icon,
              " ",
              text
            ]
          },
          text
        )) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        style: {
          background: "var(--bg-secondary)",
          borderBottom: "1px solid var(--border-light)"
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full max-w-[1400px] mx-auto px-6 py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "rounded-2xl p-6 md:p-8 max-w-4xl",
            style: {
              background: "var(--bg-primary)",
              border: "1px solid var(--border-light)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-[10px] font-body font-semibold uppercase tracking-[0.15em] mb-2",
                  style: { color: "var(--brand-secondary)" },
                  children: "Why this trip is perfect for you"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "p",
                {
                  className: "font-display italic text-xl md:text-2xl leading-relaxed",
                  style: { color: "var(--text-primary)" },
                  children: [
                    "“",
                    pkg.problemSolved,
                    "”"
                  ]
                }
              )
            ]
          }
        ) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "nav",
      {
        className: "sticky top-[72px] z-30 backdrop-blur-sm",
        style: {
          background: "rgba(250,250,247,0.96)",
          borderBottom: "1px solid var(--border-light)"
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full max-w-[1400px] mx-auto px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1 overflow-x-auto scrollbar-hide py-2.5", children: TABS.map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            "data-ocid": `package.tab.${tab.id}`,
            onClick: () => scrollTo(tab.id),
            className: "px-4 py-2 rounded-lg text-xs font-body font-medium whitespace-nowrap transition-colors",
            style: {
              background: activeTab === tab.id ? tab.id === "book" ? "var(--brand-primary)" : "rgba(60,20,20,0.08)" : "transparent",
              color: activeTab === tab.id ? tab.id === "book" ? "#fff" : "var(--brand-primary)" : "var(--text-muted)"
            },
            children: tab.label
          },
          tab.id
        )) }) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full max-w-[1400px] mx-auto px-6 py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-8 space-y-16", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "section",
          {
            ref: (el) => {
              sectionRefs.current.overview = el;
            },
            id: "overview",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "h2",
                {
                  className: "font-display italic text-2xl md:text-3xl font-bold mb-5",
                  style: { color: "var(--text-primary)" },
                  children: "Overview"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "font-body leading-relaxed mb-8 text-base",
                  style: { color: "var(--text-secondary)" },
                  children: pkg.description
                }
              ),
              pkg.inclusions.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "h3",
                  {
                    className: "font-display text-lg font-semibold mb-4",
                    style: { color: "var(--text-primary)" },
                    children: "Package Highlights"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: pkg.inclusions.slice(0, 8).map((h) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "flex items-start gap-3 p-3.5 rounded-xl",
                    style: {
                      background: "var(--bg-secondary)",
                      border: "1px solid var(--border-light)"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "mt-0.5 shrink-0",
                          style: { color: "var(--brand-secondary)" },
                          children: getHighlightIcon(h)
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "text-sm font-body",
                          style: { color: "var(--text-primary)" },
                          children: h
                        }
                      )
                    ]
                  },
                  h
                )) })
              ] }),
              hasTiers && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "h3",
                  {
                    className: "font-display text-lg font-semibold mb-4",
                    style: { color: "var(--text-primary)" },
                    children: "Choose Your Experience"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: pkg.tiers.map((tier, ti) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "rounded-2xl p-5 text-center",
                    style: {
                      background: ti === 1 ? "var(--brand-primary)" : "var(--bg-secondary)",
                      border: ti === 1 ? "none" : "1px solid var(--border-light)",
                      color: ti === 1 ? "#fff" : "var(--text-primary)"
                    },
                    children: [
                      ti === 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "inline-block px-2 py-0.5 rounded-full text-[10px] font-body font-semibold mb-2",
                          style: {
                            background: "var(--accent-orange)",
                            color: "#fff"
                          },
                          children: "MOST POPULAR"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          className: "font-body font-semibold text-sm mb-1",
                          style: {
                            color: ti === 1 ? "rgba(255,255,255,0.7)" : "var(--text-muted)"
                          },
                          children: tier.name
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "p",
                        {
                          className: "font-mono text-2xl font-bold",
                          style: {
                            color: ti === 1 ? "#fff" : "var(--brand-secondary)"
                          },
                          children: [
                            "₹",
                            Number(tier.pricePerPerson).toLocaleString("en-IN")
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          className: "text-xs font-body mt-0.5",
                          style: {
                            color: ti === 1 ? "rgba(255,255,255,0.6)" : "var(--text-muted)"
                          },
                          children: "per person"
                        }
                      )
                    ]
                  },
                  tier.name
                )) })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "section",
          {
            ref: (el) => {
              sectionRefs.current.itinerary = el;
            },
            id: "itinerary",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "h2",
                {
                  className: "font-display italic text-2xl md:text-3xl font-bold mb-6",
                  style: { color: "var(--text-primary)" },
                  children: "Day-by-Day Itinerary"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: pkg.itinerary.map((day, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "rounded-xl overflow-hidden",
                  style: {
                    border: "1px solid var(--border-light)",
                    background: "var(--bg-secondary)"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "button",
                      {
                        type: "button",
                        "data-ocid": `package.itinerary.day.${i + 1}`,
                        onClick: () => setOpenDay(openDay === i ? null : i),
                        className: "w-full flex items-center justify-between p-4 text-left transition-colors",
                        style: {
                          background: openDay === i ? "var(--bg-tertiary)" : void 0
                        },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "span",
                              {
                                className: "flex items-center justify-center w-8 h-8 rounded-full text-xs font-mono font-semibold shrink-0 text-white",
                                style: { background: "var(--brand-primary)" },
                                children: Number(day.day)
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "p",
                                {
                                  className: "font-display font-semibold text-sm md:text-base",
                                  style: { color: "var(--text-primary)" },
                                  children: day.title
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                "p",
                                {
                                  className: "text-xs font-body mt-0.5",
                                  style: { color: "var(--text-muted)" },
                                  children: [
                                    day.route,
                                    " · ",
                                    day.distanceKm,
                                    " km"
                                  ]
                                }
                              )
                            ] })
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            ChevronDown,
                            {
                              size: 18,
                              style: {
                                color: openDay === i ? "var(--brand-secondary)" : "var(--text-muted)"
                              },
                              className: `transition-transform ${openDay === i ? "rotate-180" : ""}`
                            }
                          )
                        ]
                      }
                    ),
                    openDay === i && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "px-4 pb-4",
                        style: { borderTop: "1px solid var(--border-light)" },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "div",
                            {
                              className: "mt-3 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-body",
                              style: { color: "var(--text-muted)" },
                              children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-[10px] uppercase tracking-wider mb-0.5", children: "Start Alt" }),
                                  day.startAltitudeM,
                                  " m"
                                ] }),
                                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-[10px] uppercase tracking-wider mb-0.5", children: "End Alt" }),
                                  day.endAltitudeM,
                                  " m"
                                ] }),
                                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-[10px] uppercase tracking-wider mb-0.5", children: "Difficulty" }),
                                  day.difficulty
                                ] }),
                                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-[10px] uppercase tracking-wider mb-0.5", children: "Meals" }),
                                  day.mealsIncluded
                                ] })
                              ]
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "p",
                            {
                              className: "mt-3 text-sm font-body leading-relaxed",
                              style: { color: "var(--text-secondary)" },
                              children: day.description
                            }
                          ),
                          day.landmarks.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 flex flex-wrap gap-2", children: day.landmarks.map((lm) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "span",
                            {
                              className: "px-2 py-0.5 rounded-full text-xs font-body",
                              style: {
                                background: "var(--bg-tertiary)",
                                color: "var(--text-secondary)",
                                border: "1px solid var(--border-light)"
                              },
                              children: lm
                            },
                            `lm-${lm}`
                          )) }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "p",
                            {
                              className: "mt-2 text-xs font-body",
                              style: { color: "var(--text-muted)" },
                              children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx(BedDouble, { size: 12, className: "inline mr-1" }),
                                "Stay: ",
                                day.campsite
                              ]
                            }
                          )
                        ]
                      }
                    )
                  ]
                },
                `day-${Number(day.day)}`
              )) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "section",
          {
            ref: (el) => {
              sectionRefs.current.inclusions = el;
            },
            id: "inclusions",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "h2",
                {
                  className: "font-display italic text-2xl md:text-3xl font-bold mb-6",
                  style: { color: "var(--text-primary)" },
                  children: "Inclusions & Exclusions"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "rounded-xl p-5",
                    style: {
                      background: "var(--bg-secondary)",
                      border: "1px solid var(--border-light)"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "h3",
                        {
                          className: "font-display font-semibold mb-4 flex items-center gap-2",
                          style: { color: "var(--text-primary)" },
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 18, style: { color: "#16a34a" } }),
                            " What's Included"
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2.5", children: pkg.inclusions.map((inc) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "li",
                        {
                          className: "flex items-start gap-2 text-sm font-body",
                          style: { color: "var(--text-secondary)" },
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              Check,
                              {
                                size: 14,
                                className: "mt-0.5 shrink-0",
                                style: { color: "#16a34a" }
                              }
                            ),
                            inc
                          ]
                        },
                        inc
                      )) })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "rounded-xl p-5",
                    style: {
                      background: "var(--bg-secondary)",
                      border: "1px solid var(--border-light)"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "h3",
                        {
                          className: "font-display font-semibold mb-4 flex items-center gap-2",
                          style: { color: "var(--text-primary)" },
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 18, style: { color: "#dc2626" } }),
                            " Not Included"
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2.5", children: pkg.exclusions.map((exc) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "li",
                        {
                          className: "flex items-start gap-2 text-sm font-body",
                          style: { color: "var(--text-secondary)" },
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              X,
                              {
                                size: 14,
                                className: "mt-0.5 shrink-0",
                                style: { color: "#dc2626" }
                              }
                            ),
                            exc
                          ]
                        },
                        exc
                      )) })
                    ]
                  }
                )
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "section",
          {
            ref: (el) => {
              sectionRefs.current.accommodation = el;
            },
            id: "accommodation",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "h2",
                {
                  className: "font-display italic text-2xl md:text-3xl font-bold mb-4",
                  style: { color: "var(--text-primary)" },
                  children: "Accommodation"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "rounded-xl p-6",
                  style: {
                    background: "var(--bg-secondary)",
                    border: "1px solid var(--border-light)"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        BedDouble,
                        {
                          size: 22,
                          style: { color: "var(--brand-secondary)" }
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "h3",
                        {
                          className: "font-display font-semibold text-lg",
                          style: { color: "var(--text-primary)" },
                          children: pkg.accommodationType
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "font-body leading-relaxed",
                        style: { color: "var(--text-secondary)" },
                        children: "All accommodation is carefully selected and personally inspected by the Manya team. Depending on the package tier, you will stay in comfortable guesthouses, alpine camps, and boutique mountain lodges. Every property includes clean bedding, hot water (where available), and wholesome Himalayan meals."
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 grid grid-cols-2 sm:grid-cols-3 gap-2", children: [
                      { icon: "🛏️", label: "Clean Bedding" },
                      { icon: "🚿", label: "Hot Water" },
                      { icon: "🔥", label: "Heating" },
                      { icon: "🍽️", label: "Meals Included" },
                      { icon: "🏠", label: "Local Hosts" },
                      { icon: "📶", label: "WiFi (where available)" }
                    ].map((a) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-body",
                        style: {
                          background: "var(--bg-tertiary)",
                          color: "var(--text-secondary)",
                          border: "1px solid var(--border-light)"
                        },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: a.icon }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: a.label })
                        ]
                      },
                      a.label
                    )) })
                  ]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "section",
          {
            ref: (el) => {
              sectionRefs.current.pricing = el;
            },
            id: "pricing",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "h2",
                {
                  className: "font-display italic text-2xl md:text-3xl font-bold mb-4",
                  style: { color: "var(--text-primary)" },
                  children: "Price Breakdown"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "rounded-xl overflow-hidden",
                  style: { border: "1px solid var(--border-light)" },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm font-body", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "tr",
                        {
                          style: {
                            background: "var(--bg-secondary)",
                            borderBottom: "1px solid var(--border-light)"
                          },
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "th",
                              {
                                className: "text-left py-3 px-5 font-semibold",
                                style: { color: "var(--text-primary)" },
                                children: "Item"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "th",
                              {
                                className: "text-right py-3 px-5 font-semibold",
                                style: { color: "var(--text-primary)" },
                                children: "Cost (per person)"
                              }
                            )
                          ]
                        }
                      ) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "tr",
                          {
                            style: {
                              background: "var(--bg-primary)",
                              borderBottom: "1px solid var(--border-light)"
                            },
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "td",
                                {
                                  className: "py-3 px-5",
                                  style: { color: "var(--text-secondary)" },
                                  children: "Base Package"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                "td",
                                {
                                  className: "text-right py-3 px-5 font-mono",
                                  style: { color: "var(--brand-secondary)" },
                                  children: [
                                    "₹",
                                    minPrice
                                  ]
                                }
                              )
                            ]
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "tr",
                          {
                            style: {
                              background: "var(--bg-secondary)",
                              borderBottom: "1px solid var(--border-light)"
                            },
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                "td",
                                {
                                  className: "py-3 px-5",
                                  style: { color: "var(--text-muted)" },
                                  children: [
                                    "Travel Insurance",
                                    " ",
                                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs", children: "(optional)" })
                                  ]
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "td",
                                {
                                  className: "text-right py-3 px-5 font-mono",
                                  style: { color: "var(--text-muted)" },
                                  children: "+ ₹500"
                                }
                              )
                            ]
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "tr",
                          {
                            style: {
                              background: "var(--bg-primary)",
                              borderBottom: "1px solid var(--border-light)"
                            },
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                "td",
                                {
                                  className: "py-3 px-5",
                                  style: { color: "var(--text-muted)" },
                                  children: [
                                    "Airport/Station Pickup",
                                    " ",
                                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs", children: "(optional)" })
                                  ]
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "td",
                                {
                                  className: "text-right py-3 px-5 font-mono",
                                  style: { color: "var(--text-muted)" },
                                  children: "+ ₹2,500"
                                }
                              )
                            ]
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "tr",
                          {
                            style: {
                              background: "var(--bg-secondary)",
                              borderBottom: "1px solid var(--border-light)"
                            },
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                "td",
                                {
                                  className: "py-3 px-5",
                                  style: { color: "var(--text-muted)" },
                                  children: [
                                    "Single Room Supplement",
                                    " ",
                                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs", children: "(optional)" })
                                  ]
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "td",
                                {
                                  className: "text-right py-3 px-5 font-mono",
                                  style: { color: "var(--text-muted)" },
                                  children: "+ ₹3,000"
                                }
                              )
                            ]
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { style: { background: "var(--bg-tertiary)" }, children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "td",
                            {
                              className: "py-4 px-5 font-semibold",
                              style: { color: "var(--text-primary)" },
                              children: "Total (with all add-ons)"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "td",
                            {
                              className: "text-right py-4 px-5 font-mono font-bold",
                              style: {
                                color: "var(--brand-primary)",
                                fontSize: "1.05rem"
                              },
                              children: [
                                "₹",
                                maxPrice
                              ]
                            }
                          )
                        ] })
                      ] })
                    ] }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "px-5 py-3 text-xs font-body",
                        style: {
                          background: "var(--bg-primary)",
                          color: "var(--text-muted)",
                          borderTop: "1px solid var(--border-light)"
                        },
                        children: "* All prices include GST. Group discounts available for 6+ travellers."
                      }
                    )
                  ]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "section",
          {
            ref: (el) => {
              sectionRefs.current.reviews = el;
            },
            id: "reviews",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between mb-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "h2",
                  {
                    className: "font-display italic text-2xl md:text-3xl font-bold",
                    style: { color: "var(--text-primary)" },
                    children: "Traveller Reviews"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-0.5", children: [1, 2, 3, 4, 5].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Star,
                    {
                      size: 15,
                      style: {
                        color: "var(--brand-gold)",
                        fill: "var(--brand-gold)"
                      }
                    },
                    s
                  )) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "text-sm font-body font-semibold",
                      style: { color: "var(--text-primary)" },
                      children: "4.9"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "text-xs font-body",
                      style: { color: "var(--text-muted)" },
                      children: "(2,400+)"
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: SAMPLE_REVIEWS.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "rounded-xl p-5",
                  style: {
                    background: "var(--bg-secondary)",
                    border: "1px solid var(--border-light)"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-0.5 mb-3", children: [1, 2, 3, 4, 5].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Star,
                      {
                        size: 13,
                        style: s <= r.rating ? {
                          color: "var(--brand-gold)",
                          fill: "var(--brand-gold)"
                        } : { color: "var(--border-medium)" }
                      },
                      s
                    )) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "p",
                      {
                        className: "text-sm leading-relaxed italic",
                        style: {
                          color: "var(--text-secondary)",
                          fontFamily: "'Playfair Display', serif"
                        },
                        children: [
                          "“",
                          r.text,
                          "”"
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-center justify-between", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "p",
                          {
                            className: "text-sm font-semibold font-body",
                            style: { color: "var(--text-primary)" },
                            children: r.name
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "p",
                          {
                            className: "text-xs font-body",
                            style: { color: "var(--text-muted)" },
                            children: r.location
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "text-xs font-body",
                          style: { color: "var(--text-muted)" },
                          children: r.date
                        }
                      )
                    ] })
                  ]
                },
                r.name
              )) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "section",
          {
            ref: (el) => {
              sectionRefs.current.faq = el;
            },
            id: "faq",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "h2",
                {
                  className: "font-display italic text-2xl md:text-3xl font-bold mb-6",
                  style: { color: "var(--text-primary)" },
                  children: "Frequently Asked Questions"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: SAMPLE_FAQS.map((faq, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "rounded-xl overflow-hidden",
                  style: {
                    border: "1px solid var(--border-light)",
                    background: "var(--bg-secondary)"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "button",
                      {
                        type: "button",
                        "data-ocid": `package.faq.${idx + 1}`,
                        onClick: () => setOpenFaq(openFaq === idx ? null : idx),
                        className: "w-full flex items-center justify-between p-4 text-left transition-colors",
                        style: {
                          background: openFaq === idx ? "var(--bg-tertiary)" : void 0
                        },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "span",
                            {
                              className: "font-body font-medium text-sm pr-4",
                              style: { color: "var(--text-primary)" },
                              children: faq.q
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            ChevronDown,
                            {
                              size: 18,
                              className: `shrink-0 transition-transform ${openFaq === idx ? "rotate-180" : ""}`,
                              style: {
                                color: openFaq === idx ? "var(--brand-secondary)" : "var(--text-muted)"
                              }
                            }
                          )
                        ]
                      }
                    ),
                    openFaq === idx && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "px-4 pb-4",
                        style: { borderTop: "1px solid var(--border-light)" },
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "p",
                          {
                            className: "mt-3 text-sm font-body leading-relaxed",
                            style: { color: "var(--text-secondary)" },
                            children: faq.a
                          }
                        )
                      }
                    )
                  ]
                },
                faq.q
              )) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "section",
          {
            ref: (el) => {
              sectionRefs.current.book = el;
            },
            id: "book",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "rounded-2xl p-7 md:p-10 text-center",
                style: { background: "var(--brand-primary)" },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "text-[10px] font-body font-semibold uppercase tracking-[0.18em] mb-3",
                      style: { color: "var(--accent-orange)" },
                      children: "Reserve Your Spot"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display italic text-2xl md:text-3xl font-bold text-white mb-3", children: "Ready for your Himalayan journey?" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-body mb-1 text-white/75", children: [
                    "From ₹",
                    minPrice,
                    " per person · ",
                    pkg.duration
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-white/60 mb-7 max-w-lg mx-auto text-sm", children: "Secure your spot today. Limited group sizes ensure an intimate, personalised experience." }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-center justify-center gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Link,
                      {
                        to: "/booking/$id",
                        params: { id: String(pkg.id) },
                        "data-ocid": "package.book_button",
                        className: "inline-flex items-center gap-2 px-7 py-3.5 rounded-lg font-body font-semibold text-white transition-opacity hover:opacity-90",
                        style: { background: "var(--accent-orange)" },
                        children: [
                          "Book This Package ",
                          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 16 })
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "a",
                      {
                        href: `https://wa.me/919999999999?text=Hi%20Manya%20Destination!%20I'm%20interested%20in%20the%20${encodeURIComponent(pkg.name)}%20package.`,
                        target: "_blank",
                        rel: "noopener noreferrer",
                        "data-ocid": "package.whatsapp_button",
                        className: "inline-flex items-center gap-2 px-7 py-3.5 rounded-lg font-body font-medium text-white",
                        style: {
                          background: "rgba(255,255,255,0.12)",
                          border: "1px solid rgba(255,255,255,0.2)"
                        },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { size: 16 }),
                          " Chat on WhatsApp"
                        ]
                      }
                    )
                  ] })
                ]
              }
            )
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: "lg:col-span-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:sticky lg:top-[140px] space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "rounded-xl p-5",
            style: {
              background: "var(--bg-secondary)",
              border: "1px solid var(--border-light)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-[10px] font-body font-semibold uppercase tracking-[0.15em] mb-1",
                  style: { color: "var(--text-muted)" },
                  children: "Starting From"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "p",
                {
                  className: "font-mono text-3xl font-bold",
                  style: { color: "var(--brand-secondary)" },
                  children: [
                    "₹",
                    minPrice
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-xs font-body mt-0.5",
                  style: { color: "var(--text-muted)" },
                  children: "per person · incl. GST"
                }
              ),
              hasTiers && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-[10px] font-semibold font-body uppercase tracking-[0.15em]",
                    style: { color: "var(--text-muted)" },
                    children: "Package Tiers"
                  }
                ),
                pkg.tiers.map((tier, ti) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "flex items-center justify-between p-3 rounded-lg",
                    style: {
                      background: ti === 1 ? "var(--brand-primary)" : "var(--bg-tertiary)",
                      border: ti === 1 ? "none" : "1px solid var(--border-light)"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        ti === 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: "block text-[9px] font-body font-bold uppercase tracking-wider mb-0.5",
                            style: { color: "var(--accent-orange)" },
                            children: "Popular"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: "text-sm font-body",
                            style: {
                              color: ti === 1 ? "rgba(255,255,255,0.85)" : "var(--text-secondary)"
                            },
                            children: tier.name
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "span",
                        {
                          className: "text-sm font-mono font-bold",
                          style: {
                            color: ti === 1 ? "#fff" : "var(--brand-secondary)"
                          },
                          children: [
                            "₹",
                            Number(tier.pricePerPerson).toLocaleString("en-IN")
                          ]
                        }
                      )
                    ]
                  },
                  tier.name
                ))
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "mt-4 space-y-2 text-sm font-body",
                  style: { color: "var(--text-muted)" },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Users,
                        {
                          size: 15,
                          style: { color: "var(--brand-primary)" }
                        }
                      ),
                      "Group size: ",
                      pkg.groupSize
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Calendar,
                        {
                          size: 15,
                          style: { color: "var(--brand-primary)" }
                        }
                      ),
                      "Duration: ",
                      pkg.duration
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        BedDouble,
                        {
                          size: 15,
                          style: { color: "var(--brand-primary)" }
                        }
                      ),
                      pkg.accommodationType
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: "/booking/$id",
                  params: { id: String(pkg.id) },
                  "data-ocid": "package.sidebar_book_button",
                  className: "mt-5 block w-full text-center px-4 py-3 rounded-lg text-white font-body font-semibold transition-opacity hover:opacity-90",
                  style: { background: "var(--brand-primary)" },
                  children: "Book This Package"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "a",
                {
                  href: `https://wa.me/919999999999?text=Hi%20Manya%20Destination!%20I'm%20interested%20in%20the%20${encodeURIComponent(pkg.name)}%20package.`,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  "data-ocid": "package.sidebar_whatsapp_button",
                  className: "mt-2 block w-full text-center px-4 py-3 rounded-lg font-body font-medium transition-colors",
                  style: {
                    border: "1px solid var(--border-medium)",
                    color: "var(--text-secondary)"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { size: 16, className: "inline mr-1.5" }),
                    "WhatsApp Enquiry"
                  ]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "rounded-xl p-5",
            style: {
              background: "var(--bg-secondary)",
              border: "1px solid var(--border-light)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-[10px] font-semibold font-body uppercase tracking-[0.15em] mb-3",
                  style: { color: "var(--text-muted)" },
                  children: "Why Book With Manya"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "ul",
                {
                  className: "space-y-2.5 text-sm font-body",
                  style: { color: "var(--text-secondary)" },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Shield,
                        {
                          size: 15,
                          className: "mt-0.5 shrink-0",
                          style: { color: "var(--brand-secondary)" }
                        }
                      ),
                      "Expert local guides with 10+ years experience"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Check,
                        {
                          size: 15,
                          className: "mt-0.5 shrink-0",
                          style: { color: "var(--brand-secondary)" }
                        }
                      ),
                      "All permits and forest fees handled"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Users,
                        {
                          size: 15,
                          className: "mt-0.5 shrink-0",
                          style: { color: "var(--brand-secondary)" }
                        }
                      ),
                      "Small groups for personalised attention"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Phone,
                        {
                          size: 15,
                          className: "mt-0.5 shrink-0",
                          style: { color: "var(--brand-secondary)" }
                        }
                      ),
                      "24/7 support during your journey"
                    ] })
                  ]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "rounded-xl p-5",
            style: {
              background: "var(--bg-secondary)",
              border: "1px solid var(--border-light)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-[10px] font-semibold font-body uppercase tracking-[0.15em] mb-3",
                  style: { color: "var(--text-muted)" },
                  children: "Need Help Planning?"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 text-sm font-body", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "a",
                  {
                    href: "tel:+919999999999",
                    className: "flex items-center gap-2 transition-colors",
                    style: { color: "var(--text-secondary)" },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Phone,
                        {
                          size: 15,
                          style: { color: "var(--brand-primary)" }
                        }
                      ),
                      " ",
                      "+91 99999 99999"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "a",
                  {
                    href: "mailto:hello@manyadestination.com",
                    className: "flex items-center gap-2 transition-colors",
                    style: { color: "var(--text-secondary)" },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { size: 15, style: { color: "var(--brand-primary)" } }),
                      " ",
                      "hello@manyadestination.com"
                    ]
                  }
                )
              ] })
            ]
          }
        )
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-8", style: { background: "var(--brand-primary)" }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-[1400px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display italic text-xl font-bold text-white", children: pkg.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "p",
          {
            className: "font-body text-sm mt-0.5",
            style: { color: "rgba(255,255,255,0.65)" },
            children: [
              "From ₹",
              minPrice,
              " per person · ",
              pkg.duration,
              " · ",
              pkg.groupSize
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/booking/$id",
            params: { id: String(pkg.id) },
            "data-ocid": "package.bottom_cta_book",
            className: "px-6 py-3 rounded-lg font-body font-semibold text-white transition-opacity hover:opacity-90",
            style: { background: "var(--accent-orange)" },
            children: "Book Now"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "a",
          {
            href: `https://wa.me/919999999999?text=Hi%20Manya%20Destination!%20I'm%20interested%20in%20the%20${encodeURIComponent(pkg.name)}%20package.`,
            target: "_blank",
            rel: "noopener noreferrer",
            "data-ocid": "package.bottom_cta_whatsapp",
            className: "px-6 py-3 rounded-lg font-body font-medium text-white",
            style: {
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.2)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { size: 16, className: "inline mr-1.5" }),
              "WhatsApp"
            ]
          }
        )
      ] })
    ] }) })
  ] });
}
export {
  PackageDetailPage as default
};
