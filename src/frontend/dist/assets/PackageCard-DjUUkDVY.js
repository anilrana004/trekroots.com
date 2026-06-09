import { j as jsxRuntimeExports, L as Link, C as Clock, U as Users, A as ArrowRight } from "./index-B8T7PWVC.js";
const CATEGORY_COLORS = {
  Adventure: "bg-emerald-100 text-emerald-700",
  Spiritual: "bg-amber-100 text-amber-700",
  Luxury: "bg-purple-100 text-purple-700",
  Family: "bg-sky-100 text-sky-700",
  Solo: "bg-rose-100 text-rose-700",
  Corporate: "bg-slate-100 text-slate-700"
};
function PackageCard({ pkg, index = 0 }) {
  const minPrice = Number(pkg.priceRange.minINR).toLocaleString("en-IN");
  const maxPrice = Number(pkg.priceRange.maxINR).toLocaleString("en-IN");
  const catClass = CATEGORY_COLORS[pkg.category] || "bg-muted text-muted-foreground";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Link,
    {
      to: "/packages/$slug",
      params: { slug: pkg.slug },
      "data-ocid": `package.item.${index + 1}`,
      className: "group block rounded-xl overflow-hidden bg-card border border-border shadow-sm hover:shadow-md transition-smooth",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-52 overflow-hidden bg-muted", children: [
          pkg.imageUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: pkg.imageUrl,
              alt: pkg.name,
              className: "w-full h-full object-cover group-hover:scale-105 transition-smooth",
              loading: "lazy"
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-4xl", children: "🏔️" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: `absolute top-3 left-3 text-[11px] font-semibold px-2.5 py-1 rounded-full font-body ${catClass}`,
              children: pkg.category
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "absolute top-3 right-3 text-[11px] font-medium px-2 py-1 rounded-full font-body bg-black/50 text-white backdrop-blur-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 11, className: "inline mr-1" }),
            pkg.duration
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-semibold text-foreground leading-snug mb-1.5 group-hover:text-primary transition-colors", children: pkg.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-accent font-quote italic mb-3 line-clamp-2", children: pkg.problemSolved }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-xs text-muted-foreground font-body mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 12 }),
              pkg.groupSize
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "·" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: pkg.accommodationType })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pt-3 border-t border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-body", children: "From" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-1 text-sm font-semibold text-foreground font-mono", children: [
                "₹",
                minPrice
              ] }),
              minPrice !== maxPrice && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground font-mono", children: [
                " ",
                "- ₹",
                maxPrice
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-xs font-semibold text-primary font-body group-hover:gap-2 transition-all", children: [
              "View Package ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 13 })
            ] })
          ] })
        ] })
      ]
    }
  );
}
export {
  PackageCard as P
};
