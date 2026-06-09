import { j as jsxRuntimeExports, L as Link, M as Mountain, C as Clock, d as Calendar, l as ChevronRight } from "./index-B8T7PWVC.js";
const DIFFICULTY_CONFIG = {
  Easy: {
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    dot: "bg-emerald-500"
  },
  Moderate: { bg: "bg-amber-50", text: "text-amber-700", dot: "bg-amber-500" },
  Difficult: {
    bg: "bg-orange-50",
    text: "text-orange-700",
    dot: "bg-orange-500"
  },
  Extreme: { bg: "bg-red-50", text: "text-red-700", dot: "bg-red-500" }
};
function TrekCard({ trek, index = 0 }) {
  const diff = DIFFICULTY_CONFIG[trek.difficulty] ?? {
    bg: "bg-muted",
    text: "text-muted-foreground",
    dot: "bg-muted-foreground"
  };
  const minPrice = Number(trek.priceRange.minINR).toLocaleString("en-IN");
  const altitudeFt = Number(trek.maxAltitudeFt).toLocaleString("en-IN");
  const firstHighlight = trek.highlights[0] ?? "";
  const secondHighlight = trek.highlights[1] ?? "";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Link,
    {
      to: "/treks/$slug",
      params: { slug: trek.slug },
      "data-ocid": `trek.item.${index + 1}`,
      className: "group flex flex-col rounded-xl overflow-hidden bg-card border border-border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300",
      style: { minHeight: "460px" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-56 overflow-hidden bg-muted flex-shrink-0", children: [
          trek.imageUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: trek.imageUrl,
              alt: trek.name,
              className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Mountain, { className: "text-muted-foreground", size: 48 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: `absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold font-body ${diff.bg} ${diff.text}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `w-1.5 h-1.5 rounded-full ${diff.dot}` }),
                trek.difficulty
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-3 left-3 right-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-white/80 font-body tracking-wide uppercase", children: [
            trek.region,
            ", ",
            trek.state
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col flex-1 p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-bold text-foreground leading-tight mb-3", children: trek.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2 mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-muted text-xs font-medium font-body text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 11 }),
              Number(trek.durationDays),
              " Days / ",
              Number(trek.durationNights),
              " ",
              "Nights"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-muted text-xs font-medium font-body text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Mountain, { size: 11 }),
              altitudeFt,
              " ft"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-muted text-xs font-medium font-body text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { size: 11 }),
              trek.bestSeason
            ] })
          ] }),
          (firstHighlight || secondHighlight) && /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "mb-4 space-y-1", children: [
            firstHighlight && /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2 text-xs text-muted-foreground font-body", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-1.5 w-1 h-1 rounded-full bg-primary flex-shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "line-clamp-1", children: firstHighlight })
            ] }),
            secondHighlight && /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2 text-xs text-muted-foreground font-body", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-1.5 w-1 h-1 rounded-full bg-primary flex-shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "line-clamp-1", children: secondHighlight })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pt-4 border-t border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-body", children: "Starting from" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "p",
                {
                  className: "text-lg font-bold font-body",
                  style: { color: "#C04000" },
                  children: [
                    "₹",
                    minPrice
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-body", children: "per person" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                className: "inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold font-body text-white transition-all duration-200 hover:opacity-90 active:scale-95",
                style: { backgroundColor: "#C04000" },
                children: [
                  "Explore Trek",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 15 })
                ]
              }
            )
          ] })
        ] })
      ]
    }
  );
}
export {
  TrekCard as T
};
