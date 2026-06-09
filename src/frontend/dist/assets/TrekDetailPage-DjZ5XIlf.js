import { u as useParams, r as reactExports, j as jsxRuntimeExports, L as Link } from "./index-B8T7PWVC.js";
import { T as TrekCard } from "./TrekCard-CszFP695.js";
import { a as useTrekBySlug, u as useAllTreks } from "./useBackendQuery-DADe_-Iy.js";
import { T as TripCostCalculator } from "./TripCostCalculator-Cix2h2Q5.js";
import "./backend-BHRKQ7VT.js";
const DIFFICULTY_COLOR = {
  Easy: "bg-emerald-100 text-emerald-800",
  Moderate: "bg-yellow-100 text-yellow-800",
  Difficult: "bg-orange-100 text-orange-800",
  Extreme: "bg-red-100 text-red-800"
};
const WEATHER_TABLE = [
  { month: "Jan", temp: "-5°/5°", condition: "Snow", status: "avoid" },
  { month: "Feb", temp: "-3°/7°", condition: "Snow", status: "caution" },
  { month: "Mar", temp: "2°/12°", condition: "Mixed", status: "caution" },
  { month: "Apr", temp: "5°/18°", condition: "Clear", status: "ideal" },
  { month: "May", temp: "10°/22°", condition: "Clear", status: "ideal" },
  {
    month: "Jun",
    temp: "12°/24°",
    condition: "Pre-monsoon",
    status: "caution"
  },
  { month: "Jul", temp: "10°/20°", condition: "Monsoon", status: "avoid" },
  { month: "Aug", temp: "10°/20°", condition: "Monsoon", status: "avoid" },
  { month: "Sep", temp: "8°/18°", condition: "Post-monsoon", status: "ideal" },
  { month: "Oct", temp: "4°/15°", condition: "Clear", status: "ideal" },
  { month: "Nov", temp: "-2°/10°", condition: "Cold", status: "caution" },
  { month: "Dec", temp: "-6°/4°", condition: "Snow", status: "avoid" }
];
const PACKING_SECTIONS = [
  {
    label: "Clothing",
    items: [
      "Moisture-wicking base layers (2 sets)",
      "Insulating mid-layer (fleece/down jacket)",
      "Waterproof outer shell jacket",
      "Trekking pants (2 pairs)",
      "Warm socks (4 pairs)",
      "Thermal inner socks",
      "Lightweight gloves + heavy gloves",
      "Woollen cap / balaclava"
    ]
  },
  {
    label: "Footwear",
    items: [
      "Waterproof trekking boots (ankle support)",
      "Camp sandals / flip-flops",
      "Gaiters for snow treks"
    ]
  },
  {
    label: "Equipment",
    items: [
      "Trekking poles (collapsible)",
      "Headlamp + extra batteries",
      "Sleeping bag liner",
      "Daypack (20–25L)",
      "Rain cover for backpack"
    ]
  },
  {
    label: "Personal Medical Kit",
    items: [
      "Diamox tablets (AMS prevention)",
      "ORS sachets",
      "Ibuprofen / Paracetamol",
      "Bandages, antiseptic cream",
      "Blister plasters",
      "Sunscreen SPF 50+",
      "Lip balm"
    ]
  },
  {
    label: "Documents & Essentials",
    items: [
      "Government-issued photo ID (original + 2 copies)",
      "Booking confirmation printout",
      "Travel insurance documents",
      "Emergency contact card"
    ]
  }
];
const FAQS = [
  {
    q: "What fitness level is required for this trek?",
    a: "You should be able to walk 8–12 km daily on uneven terrain. Start a 4-week pre-trek training plan with daily cardio (running/cycling), squats, and lunges."
  },
  {
    q: "Are the treks suitable for beginners?",
    a: "Treks rated Easy or Moderate are suitable for first-timers with average fitness. Difficult and Extreme treks require prior high-altitude experience."
  },
  {
    q: "What is the cancellation policy?",
    a: "Full refund if cancelled 30+ days before trek. 50% refund for 15–29 days. No refund within 14 days of departure."
  },
  {
    q: "Are permits included in the price?",
    a: "Yes. Forest department permits, national park entry fees, and required government clearances are all included in the package price."
  },
  {
    q: "What is the accommodation like on the trail?",
    a: "Accommodation varies by trek — mix of high-quality camping tents, fixed-camp setups, and guesthouses at lower altitudes. Sleeping bags and mats are provided."
  },
  {
    q: "What happens in case of bad weather or emergency?",
    a: "Our leaders carry satellite communication devices. In emergencies, we coordinate helicopter evacuation. Safety of trekkers is our top priority."
  },
  {
    q: "Can I join as a solo traveller?",
    a: "Absolutely. Solo trekkers are paired with group batches. We also offer women-only group departures for solo female travellers."
  },
  {
    q: "What meals are provided on the trek?",
    a: "All meals from Day 1 dinner to last-day breakfast are included — hot nutritious Himalayan meals cooked by our camp staff."
  }
];
const STATS_TABS = [
  "Overview",
  "Itinerary",
  "Inclusions",
  "Packing",
  "How to Reach",
  "Gallery",
  "Weather",
  "Reviews",
  "FAQs"
];
function StatBadge({
  icon,
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-0.5 px-3 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 min-w-[80px]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg", children: icon }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-white/70 font-body uppercase tracking-wider", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-white font-body leading-tight text-center", children: value })
  ] });
}
function DayBlock({ day }) {
  const [open, setOpen] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-border rounded-lg overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => setOpen((o) => !o),
        className: "w-full flex items-center justify-between px-5 py-4 bg-card hover:bg-muted/40 transition-colors text-left",
        "data-ocid": `trek.itinerary.day.${Number(day.day)}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold font-mono", children: Number(day.day) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground font-body text-sm leading-snug truncate", children: day.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground font-body", children: [
                day.route,
                " · ",
                day.distanceKm,
                " km"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "svg",
            {
              "aria-hidden": "true",
              className: `w-4 h-4 text-muted-foreground shrink-0 transition-transform ${open ? "rotate-180" : ""}`,
              fill: "none",
              stroke: "currentColor",
              viewBox: "0 0 24 24",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "path",
                {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: 2,
                  d: "M19 9l-7 7-7-7"
                }
              )
            }
          )
        ]
      }
    ),
    open && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-4 bg-background border-t border-border space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2 text-xs font-body", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "px-2 py-0.5 bg-muted rounded-full", children: [
          "📍 ",
          day.campsite
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "px-2 py-0.5 bg-muted rounded-full", children: [
          "🍽️ ",
          day.mealsIncluded
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "px-2 py-0.5 bg-muted rounded-full", children: [
          "⬆ ",
          Number(day.startAltitudeM),
          "m → ",
          Number(day.endAltitudeM),
          "m"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground font-body leading-relaxed", children: day.description }),
      day.landmarks.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: day.landmarks.map((lm) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: "text-xs bg-accent/10 text-accent-foreground px-2 py-0.5 rounded-full font-body",
          children: lm
        },
        lm
      )) })
    ] })
  ] });
}
function BookingWidget({ trek }) {
  var _a, _b, _c, _d;
  const minPrice = Number(trek.priceRange.minINR).toLocaleString("en-IN");
  const maxPrice = Number(trek.priceRange.maxINR).toLocaleString("en-IN");
  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ title: trek.name, url: window.location.href }).catch(() => {
      });
    } else {
      await navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };
  const handleDownload = () => {
    window.print();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-5 shadow-md sticky top-[80px]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-body mb-1", children: "Starting from" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono text-3xl font-bold text-primary mb-0.5", children: [
      "₹",
      minPrice
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground font-body mb-4", children: [
      "Up to ₹",
      maxPrice,
      " · per person · GST incl."
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      TripCostCalculator,
      {
        tripName: trek.name || "Trek",
        baseDurationDays: Number(trek.durationDays) || 7,
        pricePerPersonBudget: Math.round(
          Number((_a = trek.priceRange) == null ? void 0 : _a.minINR) || 8500
        ),
        pricePerPersonStandard: Math.round(
          ((Number((_b = trek.priceRange) == null ? void 0 : _b.minINR) || 8500) + (Number((_c = trek.priceRange) == null ? void 0 : _c.maxINR) || 18500)) / 2
        ),
        pricePerPersonPremium: Math.round(
          Number((_d = trek.priceRange) == null ? void 0 : _d.maxINR) || 18500
        ),
        tripType: "trek"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/booking/$id",
        params: { id: String(trek.id) },
        "data-ocid": "trek.book_button",
        className: "block w-full text-center py-3 font-semibold font-body text-sm rounded-lg hover:opacity-90 transition-colors mb-3",
        style: { backgroundColor: "#C04000", color: "#fff" },
        children: "Book This Trek"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2 mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          "data-ocid": "trek.wishlist_button",
          onClick: () => alert("Added to wishlist!"),
          className: "flex items-center justify-center gap-1.5 py-2 rounded-lg border border-border text-xs font-semibold font-body text-foreground hover:bg-muted/40 transition-colors",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "svg",
              {
                xmlns: "http://www.w3.org/2000/svg",
                width: "13",
                height: "13",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: "2",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                "aria-hidden": "true",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" })
              }
            ),
            "Wishlist"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          "data-ocid": "trek.share_button",
          onClick: handleShare,
          className: "flex items-center justify-center gap-1.5 py-2 rounded-lg border border-border text-xs font-semibold font-body text-foreground hover:bg-muted/40 transition-colors",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "svg",
              {
                xmlns: "http://www.w3.org/2000/svg",
                width: "13",
                height: "13",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: "2",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                "aria-hidden": "true",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "18", cy: "5", r: "3" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "6", cy: "12", r: "3" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "18", cy: "19", r: "3" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "8.59", y1: "13.51", x2: "15.42", y2: "17.49" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "15.41", y1: "6.51", x2: "8.59", y2: "10.49" })
                ]
              }
            ),
            "Share"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          "data-ocid": "trek.download_itinerary_button",
          onClick: handleDownload,
          className: "flex items-center justify-center gap-1.5 py-2 rounded-lg border border-border text-xs font-semibold font-body text-foreground hover:bg-muted/40 transition-colors",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "svg",
              {
                xmlns: "http://www.w3.org/2000/svg",
                width: "13",
                height: "13",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: "2",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                "aria-hidden": "true",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("polyline", { points: "7 10 12 15 17 10" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "12", y1: "15", x2: "12", y2: "3" })
                ]
              }
            ),
            "Itinerary"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "a",
        {
          href: `https://wa.me/919876543210?text=${encodeURIComponent(`Hi! I'm interested in ${trek.name}. Can you help me plan?`)}`,
          target: "_blank",
          rel: "noopener noreferrer",
          "data-ocid": "trek.whatsapp_button",
          className: "flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold font-body text-white transition-colors",
          style: { backgroundColor: "#25D366" },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "svg",
              {
                xmlns: "http://www.w3.org/2000/svg",
                width: "13",
                height: "13",
                viewBox: "0 0 24 24",
                fill: "currentColor",
                "aria-hidden": "true",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.535 5.859L0 24l6.335-1.52A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.006-1.373l-.36-.213-3.73.895.928-3.617-.235-.373A9.786 9.786 0 0 1 2.182 12C2.182 6.58 6.58 2.182 12 2.182S21.818 6.58 21.818 12 17.42 21.818 12 21.818z" })
                ]
              }
            ),
            "WhatsApp"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "a",
      {
        href: "tel:+919876543210",
        "data-ocid": "trek.call_button",
        className: "flex items-center justify-center gap-2 w-full py-2.5 rounded-lg border border-border text-xs font-semibold font-body text-foreground hover:bg-muted/40 transition-colors mb-4",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "svg",
            {
              xmlns: "http://www.w3.org/2000/svg",
              width: "13",
              height: "13",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "#C04000",
              strokeWidth: "2",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              "aria-hidden": "true",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.7h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 10.1a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 17.55z" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#C04000" }, children: "Call Now: +91-98765-43210" })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2 pt-3 border-t border-border", children: [
      {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "svg",
          {
            xmlns: "http://www.w3.org/2000/svg",
            width: "16",
            height: "16",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "#C04000",
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            "aria-hidden": "true",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" })
          }
        ),
        label: "Secure Payment"
      },
      {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "svg",
          {
            xmlns: "http://www.w3.org/2000/svg",
            width: "16",
            height: "16",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "#C04000",
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            "aria-hidden": "true",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "12", cy: "8", r: "6" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" })
            ]
          }
        ),
        label: "Certified Guides"
      },
      {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "svg",
          {
            xmlns: "http://www.w3.org/2000/svg",
            width: "16",
            height: "16",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "#C04000",
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            "aria-hidden": "true",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.7h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 10.1a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 17.55z" })
          }
        ),
        label: "24/7 Support"
      },
      {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "svg",
          {
            xmlns: "http://www.w3.org/2000/svg",
            width: "16",
            height: "16",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "#C04000",
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            "aria-hidden": "true",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "7", y1: "7", x2: "7.01", y2: "7" })
            ]
          }
        ),
        label: "Best Price Guarantee"
      }
    ].map(({ icon, label }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-center gap-2 p-2 rounded-lg",
        style: { background: "#FDF5F0", border: "1px solid #F0E0D5" },
        children: [
          icon,
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "text-[10px] font-semibold font-body leading-tight",
              style: { color: "#3C1414" },
              children: label
            }
          )
        ]
      },
      label
    )) })
  ] });
}
function TrekDetailPage() {
  const { slug } = useParams({ from: "/treks/$slug" });
  const { data: trek, isLoading } = useTrekBySlug(slug);
  const { data: allTreks = [] } = useAllTreks();
  const [activeTab, setActiveTab] = reactExports.useState("Overview");
  const [openFaq, setOpenFaq] = reactExports.useState(null);
  const [lightboxImg, setLightboxImg] = reactExports.useState(null);
  const [showInclusions, setShowInclusions] = reactExports.useState(true);
  if (isLoading)
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center min-h-[60vh]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" }) });
  if (!trek)
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-16 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-5xl mb-4", children: "🏔️" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground mb-2", children: "Trek not found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/treks", className: "text-primary underline font-body text-sm", children: "Browse all treks" })
    ] });
  DIFFICULTY_COLOR[trek.difficulty] ?? "bg-muted text-muted-foreground";
  const relatedTreks = allTreks.filter((t) => t.slug !== trek.slug && t.state === trek.state).slice(0, 3);
  const scrollTo = (id) => {
    var _a;
    (_a = document.getElementById(id)) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-background min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-[60vh] md:h-[70vh] overflow-hidden bg-muted", children: [
      trek.imageUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: trek.imageUrl,
          alt: trek.name,
          className: "w-full h-full object-cover"
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-8xl", children: "🏔️" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 flex flex-col justify-end px-4 md:px-8 pb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "flex items-center gap-1.5 text-xs text-white/70 font-body mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "hover:text-white", children: "Home" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "/" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/treks", className: "hover:text-white", children: "Treks" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "/" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/50", children: trek.state }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "/" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white", children: trek.name })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl md:text-5xl font-bold text-white mb-4 leading-tight", children: trek.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatBadge,
            {
              icon: "📅",
              label: "Duration",
              value: `${Number(trek.durationDays)}D / ${Number(trek.durationNights)}N`
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatBadge,
            {
              icon: "⛰️",
              label: "Max Altitude",
              value: `${Number(trek.maxAltitudeM).toLocaleString()}m`
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(StatBadge, { icon: "💪", label: "Difficulty", value: trek.difficulty }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(StatBadge, { icon: "🌸", label: "Best Season", value: trek.bestSeason }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(StatBadge, { icon: "📍", label: "Start Point", value: trek.startPoint })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/booking/$id",
              params: { id: String(trek.id) },
              "data-ocid": "trek.hero_book_button",
              className: "px-5 py-2.5 bg-primary text-primary-foreground font-semibold font-body text-sm rounded-lg hover:bg-primary/90 transition-colors",
              children: "Book This Trek"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              "data-ocid": "trek.download_itinerary_button",
              className: "px-5 py-2.5 bg-white/10 backdrop-blur-sm border border-white/30 text-white font-semibold font-body text-sm rounded-lg hover:bg-white/20 transition-colors",
              children: "Download Itinerary"
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sticky top-[72px] z-10 bg-card border-b border-border shadow-sm overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-0 min-w-max", children: STATS_TABS.map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        "data-ocid": `trek.tab.${tab.toLowerCase().replace(/ /g, "_")}`,
        onClick: () => {
          setActiveTab(tab);
          scrollTo(`section-${tab.toLowerCase().replace(/ /g, "-")}`);
        },
        className: `px-4 py-3.5 text-xs font-semibold font-body border-b-2 transition-colors whitespace-nowrap ${activeTab === tab ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"} ${tab === "Book Now" ? "text-primary" : ""}`,
        children: tab
      },
      tab
    )) }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-8 items-start", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 space-y-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "section-overview", className: "scroll-mt-36", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground mb-4", children: "Overview" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground font-body leading-relaxed mb-5", children: trek.description }),
          trek.highlights.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 rounded-lg p-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground font-body mb-3", children: "Trek Highlights" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "grid sm:grid-cols-2 gap-2", children: trek.highlights.map((h) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "li",
              {
                className: "flex items-start gap-2 text-sm font-body text-foreground",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary mt-0.5 shrink-0", children: "✦" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: h })
                ]
              },
              h
            )) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 border border-border rounded-lg overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("table", { className: "w-full text-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: [
            [
              "Duration",
              `${Number(trek.durationDays)} days / ${Number(trek.durationNights)} nights`
            ],
            ["Distance", `${trek.distanceKm} km`],
            ["Starting Point", trek.startPoint],
            ["Ending Point", trek.endPoint],
            [
              "Highest Altitude",
              `${Number(trek.maxAltitudeM).toLocaleString()} m (${Number(trek.maxAltitudeFt).toLocaleString()} ft)`
            ],
            ["Difficulty", trek.difficulty],
            ["Best Season", trek.bestSeason],
            ["State", trek.state],
            ["Region", trek.region]
          ].map(([label, val], i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "tr",
            {
              className: i % 2 === 0 ? "bg-muted/30" : "bg-background",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 font-semibold text-foreground font-body w-1/3 border-r border-border", children: label }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 text-foreground font-body", children: val })
              ]
            },
            label
          )) }) }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "section-itinerary", className: "scroll-mt-36", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground mb-4", children: "Day-by-Day Itinerary" }),
          trek.itinerary.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-body text-sm", children: "Detailed itinerary available on request." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: trek.itinerary.map((day) => /* @__PURE__ */ jsxRuntimeExports.jsx(DayBlock, { day }, Number(day.day))) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "section-inclusions", className: "scroll-mt-36", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground mb-4", children: "Inclusions & Exclusions" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setShowInclusions(true),
                "data-ocid": "trek.inclusions_tab",
                className: `px-4 py-2 text-sm font-semibold font-body rounded-md transition-colors ${showInclusions ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`,
                children: "✓ Inclusions"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setShowInclusions(false),
                "data-ocid": "trek.exclusions_tab",
                className: `px-4 py-2 text-sm font-semibold font-body rounded-md transition-colors ${!showInclusions ? "bg-destructive text-destructive-foreground" : "bg-muted text-muted-foreground"}`,
                children: "✗ Exclusions"
              }
            )
          ] }),
          showInclusions ? /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: trek.inclusions.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "li",
            {
              className: "flex items-start gap-2 text-sm font-body text-foreground",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-emerald-600 mt-0.5 shrink-0 font-bold", children: "✓" }),
                item
              ]
            },
            item
          )) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: trek.exclusions.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "li",
            {
              className: "flex items-start gap-2 text-sm font-body text-foreground",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-500 mt-0.5 shrink-0 font-bold", children: "✗" }),
                item
              ]
            },
            item
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "section-packing", className: "scroll-mt-36", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground mb-4", children: "Packing List" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 gap-5", children: PACKING_SECTIONS.map((sec) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 rounded-lg p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground font-body mb-2 text-sm", children: sec.label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1", children: sec.items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "li",
              {
                className: "text-sm font-body text-foreground flex items-start gap-2",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary shrink-0 mt-0.5", children: "·" }),
                  item
                ]
              },
              item
            )) })
          ] }, sec.label)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "section-how-to-reach", className: "scroll-mt-36", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-2xl font-bold text-foreground mb-4", children: [
            "How to Reach ",
            trek.startPoint
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-3 gap-4", children: [
            {
              icon: "✈️",
              mode: "By Air",
              detail: "Jolly Grant Airport, Dehradun (DED) is the nearest airport. From there, hire a taxi or take GMOU bus service to the trek base."
            },
            {
              icon: "🚆",
              mode: "By Train",
              detail: "Dehradun Railway Station and Haridwar Junction are the nearest railheads. Overnight trains available from Delhi (NDLS)."
            },
            {
              icon: "🚌",
              mode: "By Road",
              detail: `Regular GMOU/private buses and shared taxis operate from Dehradun, Haridwar, and Rishikesh to ${trek.startPoint}.`
            }
          ].map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "bg-card border border-border rounded-lg p-4",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl mb-2", children: opt.icon }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground font-body text-sm mb-1", children: opt.mode }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-body leading-relaxed", children: opt.detail })
              ]
            },
            opt.mode
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "section-gallery", className: "scroll-mt-36", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground mb-4", children: "Gallery" }),
          trek.imageUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 gap-3", children: Array.from({ length: 6 }, (_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              "data-ocid": `trek.gallery.item.${i + 1}`,
              onClick: () => setLightboxImg(trek.imageUrl),
              className: "aspect-square overflow-hidden rounded-lg bg-muted hover:opacity-90 transition-opacity",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: trek.imageUrl,
                  alt: `${trek.name} view ${i + 1}`,
                  className: "w-full h-full object-cover"
                }
              )
            },
            `gallery-img-${i + 1}`
          )) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-body text-sm", children: "Gallery images coming soon." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "section-weather", className: "scroll-mt-36", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground mb-4", children: "Best Time to Trek" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm border border-border rounded-lg overflow-hidden", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "bg-muted", children: ["Month", "Temp (Day/Night)", "Condition", "Status"].map(
              (h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "th",
                {
                  className: "px-3 py-2.5 text-left font-semibold text-foreground font-body text-xs",
                  children: h
                },
                h
              )
            ) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: WEATHER_TABLE.map((row, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "tr",
              {
                className: i % 2 === 0 ? "bg-background" : "bg-muted/20",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 font-semibold font-body text-foreground", children: row.month }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 font-mono text-sm text-foreground", children: row.temp }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 font-body text-foreground", children: row.condition }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: `px-2 py-0.5 rounded-full text-xs font-semibold font-body ${row.status === "ideal" ? "bg-emerald-100 text-emerald-800" : row.status === "caution" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"}`,
                      children: row.status === "ideal" ? "✓ Ideal" : row.status === "caution" ? "~ Caution" : "✗ Avoid"
                    }
                  ) })
                ]
              },
              row.month
            )) })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "section-reviews", className: "scroll-mt-36", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground mb-4", children: "Reviews" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-4 mb-6 p-4 bg-muted/40 rounded-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-4xl font-bold text-primary", children: "4.9" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-yellow-500 text-sm", children: "★★★★★" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-body", children: "2,400+ reviews" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", "data-ocid": "trek.reviews_list", children: [1, 2, 3].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "bg-card border border-border rounded-lg p-4",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-bold font-body", children: "T" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground font-body", children: "[REVIEW PENDING]" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground font-body", children: [
                      "Verified Traveller · ",
                      trek.name
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-auto text-yellow-500 text-sm", children: "★★★★★" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground font-body italic", children: "[REVIEW PENDING — This section will display verified trekker reviews once collected.]" })
              ]
            },
            n
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "section-faqs", className: "scroll-mt-36", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground mb-4", children: "Frequently Asked Questions" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: FAQS.map((faq, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "border border-border rounded-lg overflow-hidden",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    "data-ocid": `trek.faq.${i + 1}`,
                    onClick: () => setOpenFaq(openFaq === i ? null : i),
                    className: "w-full flex items-center justify-between px-4 py-3.5 bg-card hover:bg-muted/30 text-left transition-colors",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground font-body text-sm pr-4", children: faq.q }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "svg",
                        {
                          "aria-hidden": "true",
                          className: `w-4 h-4 text-muted-foreground shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`,
                          fill: "none",
                          stroke: "currentColor",
                          viewBox: "0 0 24 24",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              strokeLinecap: "round",
                              strokeLinejoin: "round",
                              strokeWidth: 2,
                              d: "M19 9l-7 7-7-7"
                            }
                          )
                        }
                      )
                    ]
                  }
                ),
                openFaq === i && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-3 bg-background border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground font-body leading-relaxed", children: faq.a }) })
              ]
            },
            faq.q
          )) })
        ] }),
        relatedTreks.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "section-related", className: "scroll-mt-36", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground mb-4", children: "You Might Also Like" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-5", children: relatedTreks.map((t, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(TrekCard, { trek: t, index: i }, String(t.id))) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden lg:block w-80 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookingWidget, { trek }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:hidden fixed bottom-0 left-0 right-0 z-20 bg-card border-t border-border p-3 flex gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/booking/$id",
          params: { id: String(trek.id) },
          "data-ocid": "trek.mobile_book_button",
          className: "flex-1 py-3 text-center bg-primary text-primary-foreground font-semibold font-body text-sm rounded-lg",
          children: [
            "Book This Trek — ₹",
            Number(trek.priceRange.minINR).toLocaleString("en-IN")
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: `https://wa.me/919876543210?text=${encodeURIComponent(`Hi! I'm interested in ${trek.name}. Can you help me plan?`)}`,
          target: "_blank",
          rel: "noopener noreferrer",
          className: "px-4 py-3 bg-[#25D366] text-white font-body text-sm font-semibold rounded-lg",
          "data-ocid": "trek.mobile_whatsapp_button",
          children: "💬"
        }
      )
    ] }),
    lightboxImg && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        className: "fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4",
        onClick: () => setLightboxImg(null),
        onKeyDown: (e) => e.key === "Escape" && setLightboxImg(null),
        "data-ocid": "trek.lightbox",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: lightboxImg,
              alt: "Gallery",
              className: "max-w-full max-h-full object-contain rounded-lg"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: (e) => {
                e.stopPropagation();
                setLightboxImg(null);
              },
              "data-ocid": "trek.lightbox_close_button",
              className: "absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30",
              children: "✕"
            }
          )
        ]
      }
    )
  ] });
}
export {
  TrekDetailPage as default
};
