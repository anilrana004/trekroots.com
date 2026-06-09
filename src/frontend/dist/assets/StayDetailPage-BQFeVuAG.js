import { c as createLucideIcon, u as useParams, r as reactExports, i as useNavigate, j as jsxRuntimeExports, H as House, L as Link, b as MapPin, S as Star, C as Clock, U as Users, M as Mountain, X, f as MessageCircle, P as Phone } from "./index-B8T7PWVC.js";
import { B as Button } from "./button-BUBLzLP_.js";
import { S as Skeleton } from "./skeleton-3Cu02kmY.js";
import { g as useStayBySlug } from "./useBackendQuery-DADe_-Iy.js";
import { C as ChevronLeft } from "./chevron-left-CX7tlb0a.js";
import { C as Check } from "./check-B5ODmzX0.js";
import { C as CalendarDays } from "./calendar-days-C5oCkp3S.js";
import { F as Flame } from "./flame-Bi_aUBBP.js";
import { U as UtensilsCrossed, C as Car, W as Wifi } from "./wifi-Ci5gKLUK.js";
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
      d: "M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z",
      key: "1ptgy4"
    }
  ],
  [
    "path",
    {
      d: "M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97",
      key: "1sl1rz"
    }
  ]
];
const Droplets = createLucideIcon("droplets", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M11 8c2-3-2-3 0-6", key: "1ldv5m" }],
  ["path", { d: "M15.5 8c2-3-2-3 0-6", key: "1otqoz" }],
  ["path", { d: "M6 10h.01", key: "1lbq93" }],
  ["path", { d: "M6 14h.01", key: "zudwn7" }],
  ["path", { d: "M10 16v-4", key: "1c25yv" }],
  ["path", { d: "M14 16v-4", key: "1dkbt8" }],
  ["path", { d: "M18 16v-4", key: "1yg9me" }],
  [
    "path",
    { d: "M20 6a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3", key: "1ubg90" }
  ],
  ["path", { d: "M5 20v2", key: "1abpe8" }],
  ["path", { d: "M19 20v2", key: "kqn6ft" }]
];
const Heater = createLucideIcon("heater", __iconNode);
const AMENITY_ICONS = {
  WiFi: /* @__PURE__ */ jsxRuntimeExports.jsx(Wifi, { size: 18 }),
  Parking: /* @__PURE__ */ jsxRuntimeExports.jsx(Car, { size: 18 }),
  Meals: /* @__PURE__ */ jsxRuntimeExports.jsx(UtensilsCrossed, { size: 18 }),
  Bonfire: /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { size: 18 }),
  "Hot Water": /* @__PURE__ */ jsxRuntimeExports.jsx(Droplets, { size: 18 }),
  "Room Heater": /* @__PURE__ */ jsxRuntimeExports.jsx(Heater, { size: 18 })
};
const GALLERY_IMAGES = [
  "https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=800&q=80",
  "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800&q=80",
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80",
  "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&q=80"
];
const ROOM_TYPES = [
  {
    name: "Standard Room",
    description: "Cozy room with mountain views, attached bathroom, and essential amenities. Perfect for solo travellers and couples.",
    price: 1800,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80"
  },
  {
    name: "Deluxe Room",
    description: "Spacious room with premium furnishings, private balcony, and panoramic Himalayan views. Includes room heater and hot water kettle.",
    price: 2800,
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80"
  },
  {
    name: "Suite / Cottage",
    description: "Independent cottage with living area, fireplace, and private garden. Ideal for families or those seeking ultimate privacy in the mountains.",
    price: 4500,
    image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=600&q=80"
  }
];
const SAMPLE_REVIEWS = [
  {
    name: "Rahul Sharma",
    location: "Delhi",
    rating: 5,
    text: "The homestay exceeded all expectations. The host family treated us like their own. Waking up to Swargarohini views was magical.",
    date: "March 2026"
  },
  {
    name: "Priya & Family",
    location: "Mumbai",
    rating: 5,
    text: "Perfect base for our Kedarkantha trek. Hot meals, warm rooms, and the bonfire stories made this unforgettable.",
    date: "January 2026"
  },
  {
    name: "James Wilson",
    location: "London, UK",
    rating: 4,
    text: "Authentic Himalayan experience. The local Garhwali food was incredible. Would recommend the Deluxe Room for the balcony alone.",
    date: "February 2026"
  },
  {
    name: "Ananya Gupta",
    location: "Bangalore",
    rating: 5,
    text: "Clean, comfortable, and culturally rich. The owner personally helped us plan our trek route. Manya truly cares about every guest.",
    date: "April 2026"
  }
];
function StarRating({ rating }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-0.5", children: [1, 2, 3, 4, 5].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    Star,
    {
      size: 14,
      style: {
        color: rating >= n ? "var(--brand-gold)" : "rgba(60,20,20,0.15)",
        fill: rating >= n ? "var(--brand-gold)" : "transparent"
      }
    },
    n
  )) });
}
function StayDetailPage() {
  const { slug } = useParams({ from: "/stays/$slug" });
  const { data: stay, isLoading } = useStayBySlug(slug);
  const [selectedImage, setSelectedImage] = reactExports.useState(0);
  const [guests, setGuests] = reactExports.useState(2);
  const navigate = useNavigate();
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen", style: { background: "var(--bg-primary)" }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-6 py-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-32 mb-6" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-96 w-full rounded-2xl mb-6" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-3/4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-5/6" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-80 w-full rounded-2xl" })
      ] })
    ] }) });
  }
  if (!stay) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-6 py-20 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        House,
        {
          size: 48,
          className: "mx-auto mb-4",
          style: { color: "var(--brand-gold)" }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "h1",
        {
          className: "font-display text-2xl font-bold mb-2",
          style: { color: "var(--brand-primary)" },
          children: "Stay not found"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body mb-6", style: { color: "var(--text-muted)" }, children: "The property you are looking for does not exist." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/stays", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { "data-ocid": "stay.back_to_list", children: "Browse All Stays" }) })
    ] });
  }
  const minPrice = Number(stay.pricePerNightMin);
  const maxPrice = Number(stay.pricePerNightMax);
  const priceDisplay = minPrice === maxPrice ? `₹${minPrice.toLocaleString("en-IN")}` : `₹${minPrice.toLocaleString("en-IN")} – ₹${maxPrice.toLocaleString("en-IN")}`;
  const gallery = stay.imageUrl ? [stay.imageUrl, ...GALLERY_IMAGES.slice(0, 5)] : GALLERY_IMAGES;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen", style: { background: "var(--bg-primary)" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-6 pt-6 pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Link,
      {
        to: "/stays",
        className: "inline-flex items-center gap-1 text-sm font-body transition-colors",
        style: { color: "var(--text-muted)" },
        "data-ocid": "stay.back_to_list",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { size: 16 }),
          "Back to Stays"
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "container mx-auto px-6 pb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "relative rounded-2xl overflow-hidden",
          style: { background: "var(--bg-secondary)" },
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "aspect-[21/9] md:aspect-[21/8]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: gallery[selectedImage],
                alt: stay.name,
                className: "w-full h-full object-cover"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "absolute inset-0",
                style: { background: "var(--gradient-hero)" }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-0 left-0 right-0 p-6 md:p-8", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2 mb-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "text-[11px] font-body font-semibold px-2.5 py-1 rounded-full",
                    style: {
                      background: "var(--brand-gold)",
                      color: "var(--brand-primary)"
                    },
                    children: stay.stayType
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: "flex items-center gap-1 text-[11px] font-body px-2.5 py-1 rounded-full backdrop-blur-sm",
                    style: {
                      background: "rgba(255,255,255,0.18)",
                      color: "#fff",
                      border: "1px solid rgba(255,255,255,0.25)"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 11 }),
                      " ",
                      stay.location
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: "flex items-center gap-1 text-[11px] font-body px-2.5 py-1 rounded-full backdrop-blur-sm",
                    style: {
                      background: "rgba(255,255,255,0.18)",
                      color: "#fff",
                      border: "1px solid rgba(255,255,255,0.25)"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Star,
                        {
                          size: 11,
                          style: {
                            fill: "var(--brand-gold)",
                            color: "var(--brand-gold)"
                          }
                        }
                      ),
                      " ",
                      "4.9"
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl md:text-5xl font-bold text-white leading-tight", children: stay.name })
            ] })
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 mt-3 overflow-x-auto pb-2", children: gallery.map((img, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => setSelectedImage(idx),
          className: "shrink-0 w-20 h-14 rounded-lg overflow-hidden transition-all duration-200",
          style: {
            border: selectedImage === idx ? "2px solid var(--brand-secondary)" : "2px solid transparent",
            opacity: selectedImage === idx ? 1 : 0.65
          },
          "data-ocid": `stay.gallery.thumb.${idx + 1}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: img,
              alt: `${stay.name} ${idx + 1}`,
              className: "w-full h-full object-cover"
            }
          )
        },
        img.slice(-20)
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "container mx-auto px-6 pb-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-wrap items-center gap-4 md:gap-8 rounded-2xl p-5",
        style: {
          background: "var(--bg-secondary)",
          border: "1px solid var(--border-light)"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "text-xl font-bold font-body",
                style: { color: "var(--brand-secondary)" },
                children: priceDisplay
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "text-xs font-body",
                style: { color: "var(--text-muted)" },
                children: "/night"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center gap-2 text-sm font-body",
              style: { color: "var(--text-secondary)" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 16, style: { color: "var(--accent-orange)" } }),
                " ",
                "Check-in: 2:00 PM"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center gap-2 text-sm font-body",
              style: { color: "var(--text-secondary)" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 16, style: { color: "var(--accent-orange)" } }),
                " ",
                "Check-out: 11:00 AM"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center gap-2 text-sm font-body",
              style: { color: "var(--text-secondary)" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 16, style: { color: "var(--accent-orange)" } }),
                " Max 4 guests / room"
              ]
            }
          )
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "container mx-auto px-6 pb-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 space-y-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "h2",
            {
              className: "font-display text-2xl font-bold mb-4",
              style: { color: "var(--brand-primary)" },
              children: "About this Property"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-10 h-0.5 mb-5 rounded-full",
              style: { background: "var(--brand-gold)" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "font-body leading-relaxed whitespace-pre-line",
              style: { color: "var(--text-secondary)" },
              children: stay.description
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "h2",
            {
              className: "font-display text-2xl font-bold mb-4",
              style: { color: "var(--brand-primary)" },
              children: "Amenities"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-10 h-0.5 mb-5 rounded-full",
              style: { background: "var(--brand-gold)" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3", children: stay.amenities.map((amenity) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center gap-2.5 p-3 rounded-xl",
              style: {
                background: "var(--bg-secondary)",
                border: "1px solid var(--border-light)"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "var(--accent-orange)" }, children: AMENITY_ICONS[amenity] || /* @__PURE__ */ jsxRuntimeExports.jsx(House, { size: 18 }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "text-sm font-body",
                    style: { color: "var(--text-primary)" },
                    children: amenity
                  }
                )
              ]
            },
            amenity
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "h2",
            {
              className: "font-display text-2xl font-bold mb-4",
              style: { color: "var(--brand-primary)" },
              children: "Room Types"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-10 h-0.5 mb-5 rounded-full",
              style: { background: "var(--brand-gold)" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: ROOM_TYPES.map((room) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex flex-col sm:flex-row gap-4 rounded-2xl overflow-hidden",
              style: {
                background: "var(--bg-secondary)",
                border: "1px solid var(--border-light)"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sm:w-48 h-40 sm:h-auto shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: room.image,
                    alt: room.name,
                    className: "w-full h-full object-cover"
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 flex flex-col justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "h3",
                      {
                        className: "font-display text-lg font-semibold mb-1",
                        style: { color: "var(--brand-primary)" },
                        children: room.name
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "text-sm font-body leading-relaxed",
                        style: { color: "var(--text-secondary)" },
                        children: room.description
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "span",
                      {
                        className: "text-lg font-bold font-body",
                        style: { color: "var(--brand-secondary)" },
                        children: [
                          "₹",
                          room.price.toLocaleString("en-IN"),
                          "/night"
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        "data-ocid": "stay.select_room_button",
                        className: "px-5 py-2 rounded-full text-sm font-body font-semibold transition-all duration-200 hover:opacity-90",
                        style: {
                          background: "var(--accent-orange)",
                          color: "#fff"
                        },
                        children: "Select"
                      }
                    )
                  ] })
                ] })
              ]
            },
            room.name
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "h2",
            {
              className: "font-display text-2xl font-bold mb-4",
              style: { color: "var(--brand-primary)" },
              children: "What's Nearby"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-10 h-0.5 mb-5 rounded-full",
              style: { background: "var(--brand-gold)" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: stay.nearbyAttractions.map((attr) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center gap-3 p-3 rounded-xl",
              style: {
                background: "var(--bg-secondary)",
                border: "1px solid var(--border-light)"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Mountain,
                  {
                    size: 18,
                    className: "shrink-0",
                    style: { color: "var(--brand-secondary)" }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "text-sm font-body",
                    style: { color: "var(--text-primary)" },
                    children: attr
                  }
                )
              ]
            },
            attr
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "h2",
            {
              className: "font-display text-2xl font-bold mb-4",
              style: { color: "var(--brand-primary)" },
              children: "Location & How to Reach"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-10 h-0.5 mb-5 rounded-full",
              style: { background: "var(--brand-gold)" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "rounded-2xl p-6",
              style: {
                background: "var(--bg-secondary)",
                border: "1px solid var(--border-light)"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "aspect-video rounded-xl flex items-center justify-center mb-5",
                    style: { background: "var(--bg-tertiary)" },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        MapPin,
                        {
                          size: 32,
                          className: "mx-auto mb-2",
                          style: { color: "var(--brand-gold)" }
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "p",
                        {
                          className: "text-sm font-body",
                          style: { color: "var(--text-muted)" },
                          children: [
                            "Map view — ",
                            stay.location
                          ]
                        }
                      )
                    ] })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "space-y-2 text-sm font-body",
                    style: { color: "var(--text-secondary)" },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: "font-semibold",
                            style: { color: "var(--brand-primary)" },
                            children: "Nearest City:"
                          }
                        ),
                        " ",
                        "Dehradun / Haridwar"
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: "font-semibold",
                            style: { color: "var(--brand-primary)" },
                            children: "By Road:"
                          }
                        ),
                        " ",
                        "Well-connected via mountain roads. Private taxi or shared jeep from Dehradun."
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: "font-semibold",
                            style: { color: "var(--brand-primary)" },
                            children: "By Rail:"
                          }
                        ),
                        " ",
                        "Dehradun Railway Station (~200 km)"
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: "font-semibold",
                            style: { color: "var(--brand-primary)" },
                            children: "By Air:"
                          }
                        ),
                        " ",
                        "Jolly Grant Airport, Dehradun (~220 km)"
                      ] })
                    ]
                  }
                )
              ]
            }
          )
        ] }),
        stay.ownerNote && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "rounded-2xl p-6",
            style: {
              background: "var(--brand-primary)",
              border: "1px solid rgba(230,190,138,0.2)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "h2",
                {
                  className: "font-display text-2xl font-bold mb-5",
                  style: { color: "var(--brand-gold)" },
                  children: "Meet the Manya Family"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "w-14 h-14 rounded-full flex items-center justify-center shrink-0",
                    style: {
                      background: "rgba(230,190,138,0.15)",
                      border: "1px solid rgba(230,190,138,0.3)"
                    },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(House, { size: 22, style: { color: "var(--brand-gold)" } })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "p",
                    {
                      className: "text-lg leading-relaxed italic",
                      style: {
                        color: "rgba(255,255,255,0.88)",
                        fontFamily: "var(--font-display)"
                      },
                      children: [
                        "\\u201c",
                        stay.ownerNote,
                        "\\u201d"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "text-sm font-body mt-3",
                      style: { color: "rgba(230,190,138,0.7)" },
                      children: "— The Manya Family, Your Hosts"
                    }
                  )
                ] })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "h2",
            {
              className: "font-display text-2xl font-bold mb-4",
              style: { color: "var(--brand-primary)" },
              children: "House Rules"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-10 h-0.5 mb-5 rounded-full",
              style: { background: "var(--brand-gold)" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: [
            { ok: true, text: "Check-in: 2:00 PM" },
            { ok: true, text: "Check-out: 11:00 AM" },
            { ok: false, text: "No smoking inside rooms" },
            { ok: true, text: "Pets allowed on request" },
            { ok: true, text: "Quiet hours: 10:00 PM – 7:00 AM" },
            { ok: true, text: "ID proof required at check-in" }
          ].map((rule) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center gap-2 text-sm font-body",
              style: { color: "var(--text-secondary)" },
              children: [
                rule.ok ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Check,
                  {
                    size: 16,
                    style: { color: "#22c55e" },
                    className: "shrink-0"
                  }
                ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                  X,
                  {
                    size: 16,
                    style: { color: "#ef4444" },
                    className: "shrink-0"
                  }
                ),
                rule.text
              ]
            },
            rule.text
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "h2",
            {
              className: "font-display text-2xl font-bold mb-4",
              style: { color: "var(--brand-primary)" },
              children: "Guest Reviews"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-10 h-0.5 mb-5 rounded-full",
              style: { background: "var(--brand-gold)" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: SAMPLE_REVIEWS.map((review, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "rounded-2xl p-5",
              "data-ocid": `stay.review.${i + 1}`,
              style: {
                background: "var(--bg-secondary)",
                border: "1px solid var(--border-light)"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(StarRating, { rating: review.rating }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "p",
                  {
                    className: "text-sm font-body mt-3 leading-relaxed",
                    style: { color: "var(--text-primary)" },
                    children: [
                      "\\u201c",
                      review.text,
                      "\\u201d"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      className: "text-xs font-body font-semibold",
                      style: { color: "var(--brand-primary)" },
                      children: [
                        review.name,
                        ", ",
                        review.location
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "text-xs font-body",
                      style: { color: "var(--text-muted)" },
                      children: review.date
                    }
                  )
                ] })
              ]
            },
            review.name || `review-${i}`
          )) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "sticky top-[140px] rounded-2xl p-6",
          style: {
            background: "var(--bg-secondary)",
            border: "1px solid var(--border-medium)",
            boxShadow: "var(--shadow-md)"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "h3",
              {
                className: "font-display text-xl font-bold mb-1",
                style: { color: "var(--brand-primary)" },
                children: "Book a Stay"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-sm font-body mb-5",
                style: { color: "var(--text-muted)" },
                children: "Select your dates to check availability"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-xs font-body font-semibold mb-1.5",
                    style: { color: "var(--text-secondary)" },
                    children: "Check-in Date"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "flex items-center gap-2 px-3 py-2.5 rounded-xl",
                    style: {
                      border: "1px solid var(--border-medium)",
                      background: "var(--bg-primary)"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        CalendarDays,
                        {
                          size: 16,
                          style: { color: "var(--accent-orange)" }
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          type: "date",
                          className: "flex-1 bg-transparent text-sm font-body outline-none",
                          style: { color: "var(--text-primary)" },
                          "data-ocid": "stay.checkin_input"
                        }
                      )
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-xs font-body font-semibold mb-1.5",
                    style: { color: "var(--text-secondary)" },
                    children: "Check-out Date"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "flex items-center gap-2 px-3 py-2.5 rounded-xl",
                    style: {
                      border: "1px solid var(--border-medium)",
                      background: "var(--bg-primary)"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        CalendarDays,
                        {
                          size: 16,
                          style: { color: "var(--accent-orange)" }
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          type: "date",
                          className: "flex-1 bg-transparent text-sm font-body outline-none",
                          style: { color: "var(--text-primary)" },
                          "data-ocid": "stay.checkout_input"
                        }
                      )
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-xs font-body font-semibold mb-1.5",
                    style: { color: "var(--text-secondary)" },
                    children: "Guests"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setGuests((g) => Math.max(1, g - 1)),
                      className: "w-9 h-9 rounded-xl flex items-center justify-center font-semibold transition-colors",
                      style: {
                        border: "1px solid var(--border-medium)",
                        background: "var(--bg-primary)",
                        color: "var(--brand-primary)"
                      },
                      "data-ocid": "stay.guests_decrement",
                      children: "-"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "text-sm font-body w-6 text-center font-semibold",
                      style: { color: "var(--text-primary)" },
                      children: guests
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setGuests((g) => Math.min(8, g + 1)),
                      className: "w-9 h-9 rounded-xl flex items-center justify-center font-semibold transition-colors",
                      style: {
                        border: "1px solid var(--border-medium)",
                        background: "var(--bg-primary)",
                        color: "var(--brand-primary)"
                      },
                      "data-ocid": "stay.guests_increment",
                      children: "+"
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  "data-ocid": "stay.check_availability_button",
                  onClick: () => {
                    void navigate({
                      to: `/booking?type=stay&id=${stay.id}`
                    });
                  },
                  className: "w-full py-3.5 rounded-xl font-body font-semibold text-sm transition-all duration-300 hover:opacity-90",
                  style: {
                    background: "var(--accent-orange)",
                    color: "#fff",
                    boxShadow: "0 4px 14px rgba(237,135,45,0.35)"
                  },
                  children: "Check Availability & Book"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "a",
                {
                  href: `https://wa.me/919999999999?text=Hi Manya Destination! I'm interested in staying at ${encodeURIComponent(stay.name)}.`,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl text-sm font-semibold font-body transition-colors",
                  style: { background: "#22c55e", color: "#fff" },
                  "data-ocid": "stay.whatsapp_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { size: 16 }),
                    "Chat on WhatsApp"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "pt-4 border-t space-y-2",
                  style: { borderColor: "var(--border-light)" },
                  children: [
                    "Free cancellation up to 48 hours",
                    "Best price guarantee",
                    "Instant confirmation"
                  ].map((text) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "flex items-center gap-2 text-xs font-body",
                      style: { color: "var(--text-muted)" },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 12, style: { color: "#22c55e" } }),
                        text
                      ]
                    },
                    text
                  ))
                }
              )
            ] })
          ]
        }
      ) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { style: { background: "var(--brand-primary)" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-6 py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "h3",
          {
            className: "font-display text-xl font-bold",
            style: { color: "var(--brand-gold)" },
            children: stay.name
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "p",
          {
            className: "text-sm font-body",
            style: { color: "rgba(255,255,255,0.65)" },
            children: [
              "From ",
              priceDisplay,
              " / night · ",
              stay.location
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "a",
          {
            href: `https://wa.me/919999999999?text=Hi Manya Destination! I'm interested in staying at ${encodeURIComponent(stay.name)}.`,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold font-body transition-colors",
            style: {
              background: "rgba(255,255,255,0.12)",
              color: "#fff",
              border: "1px solid rgba(255,255,255,0.2)"
            },
            "data-ocid": "stay.bottom_whatsapp",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 16 }),
              " Call Expert"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            "data-ocid": "stay.book_now_button",
            onClick: () => {
              void navigate({
                to: `/booking?type=stay&id=${stay.id}`
              });
            },
            className: "px-6 py-2.5 rounded-full text-sm font-body font-semibold transition-all duration-200 hover:opacity-90",
            style: {
              background: "var(--accent-orange)",
              color: "#fff",
              boxShadow: "0 4px 14px rgba(237,135,45,0.4)"
            },
            children: "Book This Property"
          }
        )
      ] })
    ] }) }) })
  ] });
}
export {
  StayDetailPage as default
};
