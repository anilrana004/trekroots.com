import { j as jsxRuntimeExports, L as Link, d as Calendar, C as Clock, b as MapPin, l as ChevronRight } from "./index-B8T7PWVC.js";
function GaneshWatermark() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      viewBox: "0 0 200 240",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: "absolute bottom-0 right-0 w-36 h-44 pointer-events-none select-none",
      "aria-hidden": "true",
      style: { opacity: 0.15, color: "#ED872D" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M80 10 L100 2 L120 10 L115 28 L85 28 Z", fill: "#ED872D" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "100", cy: "8", r: "5", fill: "#ED872D" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ellipse", { cx: "55", cy: "70", rx: "22", ry: "30", fill: "#ED872D" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ellipse", { cx: "145", cy: "70", rx: "22", ry: "30", fill: "#ED872D" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "100", cy: "65", r: "48", fill: "#ED872D" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            d: "M80 90 Q55 110 60 130 Q65 148 80 145 Q90 142 88 130 Q86 118 75 115 Q70 112 75 105 Z",
            fill: "#ED872D"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "84", cy: "55", r: "5", fill: "white" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "116", cy: "55", r: "5", fill: "white" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "85", cy: "56", r: "2.5", fill: "#3C1414" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "117", cy: "56", r: "2.5", fill: "#3C1414" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ellipse", { cx: "100", cy: "165", rx: "52", ry: "55", fill: "#ED872D" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "circle",
          {
            cx: "100",
            cy: "170",
            r: "25",
            fill: "#ED872D",
            stroke: "white",
            strokeWidth: "2",
            strokeOpacity: "0.3"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "ellipse",
          {
            cx: "52",
            cy: "145",
            rx: "14",
            ry: "28",
            fill: "#ED872D",
            transform: "rotate(-20 52 145)"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "ellipse",
          {
            cx: "148",
            cy: "145",
            rx: "14",
            ry: "28",
            fill: "#ED872D",
            transform: "rotate(20 148 145)"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ellipse", { cx: "100", cy: "228", rx: "30", ry: "8", fill: "#ED872D" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            d: "M80 220 Q100 208 120 220",
            stroke: "#ED872D",
            strokeWidth: "3",
            fill: "none"
          }
        )
      ]
    }
  );
}
function YatraCard({ yatra, index = 0 }) {
  var _a;
  const minPrice = Number(yatra.priceRange.minINR).toLocaleString("en-IN");
  const startPoint = ((_a = yatra.route.split("→")[0]) == null ? void 0 : _a.trim()) ?? "";
  const templeCount = yatra.temples.length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Link,
    {
      to: "/yatra/$slug",
      params: { slug: yatra.slug },
      "data-ocid": `yatra.item.${index + 1}`,
      className: "group flex flex-col rounded-xl overflow-hidden bg-card border border-border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300",
      style: { minHeight: "460px" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-56 overflow-hidden bg-muted flex-shrink-0", children: [
          yatra.imageUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: yatra.imageUrl,
              alt: yatra.name,
              className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500",
              loading: "lazy"
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-5xl", children: "🛕" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-3 left-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold font-body backdrop-blur-sm",
              style: { backgroundColor: "rgba(192,64,0,0.85)", color: "white" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { size: 11 }),
                yatra.season
              ]
            }
          ) }),
          templeCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-3 right-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold font-body backdrop-blur-sm bg-black/40 text-white", children: [
            "🛕 ",
            templeCount,
            " Temples"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-3 left-3 right-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-white/80 font-body tracking-wide uppercase", children: startPoint }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex flex-col flex-1 p-5 overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(GaneshWatermark, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-bold text-foreground leading-tight mb-2 relative z-10", children: yatra.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground font-body mb-4 line-clamp-2 leading-relaxed relative z-10", children: yatra.spiritualSignificance }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2 mb-4 relative z-10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-muted text-xs font-medium font-body text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 11 }),
              yatra.duration
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-muted text-xs font-medium font-body text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 11 }),
              startPoint
            ] }),
            yatra.helicopterInfo && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium font-body",
                style: { backgroundColor: "#FFF3E0", color: "#C04000" },
                children: "🚁 Heli Available"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pt-4 border-t border-border relative z-10", children: [
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
                  "Explore Yatra",
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
  YatraCard as Y
};
