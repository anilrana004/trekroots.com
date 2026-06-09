import { r as reactExports, j as jsxRuntimeExports } from "./index-B8T7PWVC.js";
import { S as SectionHeader } from "./SectionHeader-BjMG7KKM.js";
import { T as TrekCard } from "./TrekCard-CszFP695.js";
import { u as useAllTreks } from "./useBackendQuery-DADe_-Iy.js";
import "./backend-BHRKQ7VT.js";
const STATES = ["All", "Uttarakhand", "Himachal Pradesh"];
const DIFFICULTIES = ["All", "Easy", "Moderate", "Difficult", "Extreme"];
const SORT_OPTIONS = [
  { label: "Popularity", value: "popularity" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Duration: Short First", value: "duration_asc" }
];
const SKELETON_TREKS = [1, 2, 3, 4, 5, 6, 7, 8];
function TreksPage() {
  const { data: treks = [], isLoading } = useAllTreks();
  const [stateFilter, setStateFilter] = reactExports.useState("All");
  const [diffFilter, setDiffFilter] = reactExports.useState("All");
  const [search, setSearch] = reactExports.useState("");
  const [sort, setSort] = reactExports.useState("popularity");
  const filtered = reactExports.useMemo(() => {
    let result = treks;
    if (stateFilter !== "All")
      result = result.filter((t) => t.state === stateFilter);
    if (diffFilter !== "All")
      result = result.filter((t) => t.difficulty === diffFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (t) => t.name.toLowerCase().includes(q) || t.region.toLowerCase().includes(q)
      );
    }
    return [...result].sort((a, b) => {
      if (sort === "price_asc")
        return Number(a.priceRange.minINR) - Number(b.priceRange.minINR);
      if (sort === "price_desc")
        return Number(b.priceRange.minINR) - Number(a.priceRange.minINR);
      if (sort === "duration_asc")
        return Number(a.durationDays) - Number(b.durationDays);
      return 0;
    });
  }, [treks, stateFilter, diffFilter, search, sort]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-background min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border py-10 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      SectionHeader,
      {
        title: "Himalayan Treks",
        subtitle: "From snow-dusted winter trails to monsoon meadow bursts — every route, every season."
      }
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sticky top-[72px] z-10 bg-card border-b border-border shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-3 flex flex-col sm:flex-row gap-3 items-start sm:items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "svg",
          {
            "aria-hidden": "true",
            className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground",
            fill: "none",
            stroke: "currentColor",
            viewBox: "0 0 24 24",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "path",
              {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: 2,
                d: "M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            "data-ocid": "treks.search_input",
            type: "text",
            placeholder: "Search treks...",
            value: search,
            onChange: (e) => setSearch(e.target.value),
            className: "w-full pl-9 pr-3 py-2 text-sm border border-input rounded-md bg-background font-body focus:outline-none focus:ring-2 focus:ring-primary/30"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1.5 flex-wrap", children: STATES.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          "data-ocid": `treks.state_filter.${s.replace(/ /g, "_").toLowerCase()}`,
          onClick: () => setStateFilter(s),
          className: `px-3 py-1.5 rounded-full text-xs font-semibold font-body transition-colors ${stateFilter === s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/70"}`,
          children: s
        },
        s
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1.5 flex-wrap", children: DIFFICULTIES.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          "data-ocid": `treks.diff_filter.${d.toLowerCase()}`,
          onClick: () => setDiffFilter(d),
          className: `px-3 py-1.5 rounded-full text-xs font-semibold font-body transition-colors ${diffFilter === d ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground hover:bg-muted/70"}`,
          children: d
        },
        d
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "select",
        {
          "data-ocid": "treks.sort_select",
          value: sort,
          onChange: (e) => setSort(e.target.value),
          className: "text-xs border border-input rounded-md px-2 py-2 bg-background font-body focus:outline-none focus:ring-2 focus:ring-primary/30 shrink-0",
          children: SORT_OPTIONS.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: o.value, children: o.label }, o.value))
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-8", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6", children: SKELETON_TREKS.map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-72 rounded-lg bg-muted animate-pulse" }, n)) }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "treks.empty_state", className: "text-center py-24", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-4xl mb-4", children: "🏔️" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-xl text-foreground mb-2", children: "No treks found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-body text-sm", children: "Try adjusting your filters or search term." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => {
            setStateFilter("All");
            setDiffFilter("All");
            setSearch("");
          },
          className: "mt-4 px-4 py-2 text-sm bg-primary text-primary-foreground rounded-md font-body",
          children: "Clear Filters"
        }
      )
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground font-body mb-4", children: [
        "Showing ",
        filtered.length,
        " trek",
        filtered.length !== 1 ? "s" : ""
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6", children: filtered.map((trek, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(TrekCard, { trek, index: i }, String(trek.id))) })
    ] }) })
  ] });
}
export {
  TreksPage as default
};
