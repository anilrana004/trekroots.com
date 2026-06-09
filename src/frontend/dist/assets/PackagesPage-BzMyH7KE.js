import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports } from "./index-B8T7PWVC.js";
import { P as PackageCard } from "./PackageCard-DjUUkDVY.js";
import { S as SectionHeader } from "./SectionHeader-BjMG7KKM.js";
import { d as useAllPackages } from "./useBackendQuery-DADe_-Iy.js";
import "./backend-BHRKQ7VT.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m21 16-4 4-4-4", key: "f6ql7i" }],
  ["path", { d: "M17 20V4", key: "1ejh1v" }],
  ["path", { d: "m3 8 4-4 4 4", key: "11wl7u" }],
  ["path", { d: "M7 4v16", key: "1glfcx" }]
];
const ArrowUpDown = createLucideIcon("arrow-up-down", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["line", { x1: "21", x2: "14", y1: "4", y2: "4", key: "obuewd" }],
  ["line", { x1: "10", x2: "3", y1: "4", y2: "4", key: "1q6298" }],
  ["line", { x1: "21", x2: "12", y1: "12", y2: "12", key: "1iu8h1" }],
  ["line", { x1: "8", x2: "3", y1: "12", y2: "12", key: "ntss68" }],
  ["line", { x1: "21", x2: "16", y1: "20", y2: "20", key: "14d8ph" }],
  ["line", { x1: "12", x2: "3", y1: "20", y2: "20", key: "m0wm8r" }],
  ["line", { x1: "14", x2: "14", y1: "2", y2: "6", key: "14e1ph" }],
  ["line", { x1: "8", x2: "8", y1: "10", y2: "14", key: "1i6ji0" }],
  ["line", { x1: "16", x2: "16", y1: "18", y2: "22", key: "1lctlv" }]
];
const SlidersHorizontal = createLucideIcon("sliders-horizontal", __iconNode);
const CATEGORIES = [
  "All",
  "Adventure",
  "Spiritual",
  "Luxury",
  "Family",
  "Solo",
  "Corporate"
];
const SORT_OPTIONS = [
  { label: "Popularity", value: "popularity" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Duration", value: "duration" }
];
const SKELETON_PACKAGES = [1, 2, 3, 4, 5, 6];
function PackagesPage() {
  var _a;
  const { data: packages = [], isLoading } = useAllPackages();
  const [activeCategory, setActiveCategory] = reactExports.useState("All");
  const [sortBy, setSortBy] = reactExports.useState("popularity");
  const [showSort, setShowSort] = reactExports.useState(false);
  const filtered = reactExports.useMemo(() => {
    let list = [...packages];
    if (activeCategory !== "All") {
      list = list.filter(
        (p) => p.category.toLowerCase() === activeCategory.toLowerCase()
      );
    }
    switch (sortBy) {
      case "price-asc":
        list.sort(
          (a, b) => Number(a.priceRange.minINR) - Number(b.priceRange.minINR)
        );
        break;
      case "price-desc":
        list.sort(
          (a, b) => Number(b.priceRange.minINR) - Number(a.priceRange.minINR)
        );
        break;
      case "duration": {
        const dur = (d) => {
          const m = d.match(/(\d+)/);
          return m ? Number.parseInt(m[1]) : 0;
        };
        list.sort((a, b) => dur(a.duration) - dur(b.duration));
        break;
      }
    }
    return list;
  }, [packages, activeCategory, sortBy]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "relative bg-muted/30 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-16 md:py-24", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      SectionHeader,
      {
        label: "Curated Himalayan Packages",
        title: "Curated Himalayan Packages",
        subtitle: "Every detail handled. Every memory earned.",
        centered: true
      }
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "sticky top-[72px] z-30 bg-card/95 backdrop-blur-sm border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 overflow-x-auto scrollbar-hide", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SlidersHorizontal,
        {
          size: 16,
          className: "text-muted-foreground shrink-0"
        }
      ),
      CATEGORIES.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          "data-ocid": `package.filter.${cat.toLowerCase()}`,
          onClick: () => setActiveCategory(cat),
          className: `px-3 py-1.5 rounded-full text-xs font-body font-medium whitespace-nowrap transition-colors ${activeCategory === cat ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"}`,
          children: cat
        },
        cat
      )),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-auto relative shrink-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            "data-ocid": "package.sort_toggle",
            onClick: () => setShowSort((v) => !v),
            className: "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-body font-medium bg-muted text-muted-foreground hover:text-foreground transition-colors",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpDown, { size: 13 }),
              (_a = SORT_OPTIONS.find((s) => s.value === sortBy)) == null ? void 0 : _a.label
            ]
          }
        ),
        showSort && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute right-0 top-full mt-2 w-48 bg-card border border-border rounded-lg shadow-lg z-40 py-1", children: SORT_OPTIONS.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => {
              setSortBy(opt.value);
              setShowSort(false);
            },
            className: `w-full text-left px-4 py-2 text-xs font-body transition-colors ${sortBy === opt.value ? "text-primary bg-primary/8" : "text-foreground hover:bg-muted"}`,
            children: opt.label
          },
          opt.value
        )) })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "container mx-auto px-4 py-10", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6", children: SKELETON_PACKAGES.map((n) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "rounded-xl overflow-hidden border border-border bg-card",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-52 bg-muted animate-pulse" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 bg-muted rounded animate-pulse w-1/3" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-5 bg-muted rounded animate-pulse w-3/4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 bg-muted rounded animate-pulse w-full" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 bg-muted rounded animate-pulse w-1/4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 bg-muted rounded animate-pulse w-1/4" })
            ] })
          ] })
        ]
      },
      n
    )) }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-body text-lg", children: "No packages found in this category." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => setActiveCategory("All"),
          className: "mt-4 px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-body font-medium",
          children: "View All Packages"
        }
      )
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground font-body mb-4", children: [
        filtered.length,
        " package",
        filtered.length !== 1 ? "s" : "",
        " found"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6", children: filtered.map((pkg, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(PackageCard, { pkg, index: i }, String(pkg.id))) })
    ] }) })
  ] });
}
export {
  PackagesPage as default
};
