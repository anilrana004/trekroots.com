import { r as reactExports, j as jsxRuntimeExports, k as Search } from "./index-B8T7PWVC.js";
import { P as PackageCard } from "./PackageCard-DjUUkDVY.js";
import { S as StayCard } from "./StayCard-zIPJc1Sp.js";
import { T as TrekCard } from "./TrekCard-CszFP695.js";
import { Y as YatraCard } from "./YatraCard-DOeLSd-n.js";
import { S as Skeleton } from "./skeleton-3Cu02kmY.js";
import { j as useSearch } from "./useBackendQuery-DADe_-Iy.js";
import "./flame-Bi_aUBBP.js";
import "./wifi-Ci5gKLUK.js";
import "./backend-BHRKQ7VT.js";
function SearchPage() {
  const [term, setTerm] = reactExports.useState("");
  const [activeTab, setActiveTab] = reactExports.useState("all");
  const { data, isLoading } = useSearch(term);
  const totalCount = data ? data.treks.length + data.yatras.length + data.packages.length + data.stays.length : 0;
  const tabs = [
    { key: "all", label: "All", count: totalCount },
    { key: "treks", label: "Treks", count: data == null ? void 0 : data.treks.length },
    { key: "yatras", label: "Yatras", count: data == null ? void 0 : data.yatras.length },
    { key: "packages", label: "Packages", count: data == null ? void 0 : data.packages.length },
    { key: "stays", label: "Stays", count: data == null ? void 0 : data.stays.length }
  ];
  const hasResults = data && totalCount > 0;
  const noResults = data && totalCount === 0 && term.length >= 2;
  const showTreks = (activeTab === "all" || activeTab === "treks") && ((data == null ? void 0 : data.treks.length) ?? 0) > 0;
  const showYatras = (activeTab === "all" || activeTab === "yatras") && ((data == null ? void 0 : data.yatras.length) ?? 0) > 0;
  const showPackages = (activeTab === "all" || activeTab === "packages") && ((data == null ? void 0 : data.packages.length) ?? 0) > 0;
  const showStays = (activeTab === "all" || activeTab === "stays") && ((data == null ? void 0 : data.stays.length) ?? 0) > 0;
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
                backgroundImage: "radial-gradient(circle at 30% 50%, var(--brand-gold) 0%, transparent 55%), radial-gradient(circle at 80% 20%, var(--brand-secondary) 0%, transparent 45%)"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative container mx-auto px-6 pt-20 pb-16 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "h1",
              {
                className: "font-display text-5xl md:text-7xl font-bold leading-[0.95] tracking-tight mb-4",
                style: { color: "#fff" },
                children: [
                  "Find Your",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "var(--brand-gold)" }, children: "Himalayan Adventure" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "w-16 h-0.5 mx-auto mt-5 mb-8 rounded-full",
                style: { background: "var(--brand-gold)" }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "relative flex items-center rounded-2xl overflow-hidden",
                  style: {
                    background: "rgba(255,255,255,0.12)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    backdropFilter: "blur(12px)"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Search,
                      {
                        size: 22,
                        className: "absolute left-5 shrink-0",
                        style: { color: "var(--brand-gold)" }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        type: "search",
                        "data-ocid": "search.input",
                        placeholder: "Search treks, yatras, packages, stays\\u2026",
                        value: term,
                        onChange: (e) => setTerm(e.target.value),
                        className: "w-full pl-14 pr-6 py-5 bg-transparent font-body text-lg outline-none placeholder:opacity-50",
                        style: { color: "#fff" }
                      }
                    ),
                    term && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => setTerm(""),
                        className: "absolute right-5 flex items-center justify-center w-6 h-6 rounded-full",
                        style: { background: "rgba(255,255,255,0.2)", color: "#fff" },
                        "data-ocid": "search.clear_button",
                        children: "×"
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-xs font-body mt-3",
                  style: { color: "rgba(255,255,255,0.45)" },
                  children: "Try: \\u201cKedarkantha\\u201d, \\u201cChar Dham\\u201d, \\u201cHoneymoon\\u201d, \\u201cGarhwal\\u201d"
                }
              )
            ] })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "container mx-auto px-6 py-12", children: [
      hasResults && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "flex gap-2 flex-wrap mb-10 pb-6 border-b",
          style: { borderColor: "var(--border-light)" },
          children: tabs.map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              "data-ocid": `search.tab.${tab.key}`,
              onClick: () => setActiveTab(tab.key),
              className: "flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-body font-medium transition-all duration-200",
              style: {
                background: activeTab === tab.key ? "var(--brand-primary)" : "var(--bg-tertiary)",
                color: activeTab === tab.key ? "#fff" : "var(--text-secondary)",
                border: activeTab === tab.key ? "1px solid var(--brand-primary)" : "1px solid var(--border-light)"
              },
              children: [
                tab.label,
                tab.count !== void 0 && tab.count > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "text-[11px] px-1.5 py-0.5 rounded-full font-semibold",
                    style: {
                      background: activeTab === tab.key ? "rgba(255,255,255,0.2)" : "var(--brand-gold)",
                      color: activeTab === tab.key ? "#fff" : "var(--brand-primary)"
                    },
                    children: tab.count
                  }
                )
              ]
            },
            tab.key
          ))
        }
      ),
      isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-10", "data-ocid": "search.loading_state", children: ["Treks", "Yatras"].map((section) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "h-7 w-32 rounded-lg mb-4",
            style: { background: "var(--bg-tertiary)" }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4", children: [1, 2, 3, 4].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "rounded-2xl overflow-hidden",
            style: { background: "var(--bg-secondary)" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-44 w-full" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-3/4" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-1/2" })
              ] })
            ]
          },
          n
        )) })
      ] }, section)) }),
      noResults && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex flex-col items-center justify-center py-24 rounded-2xl",
          "data-ocid": "search.empty_state",
          style: { background: "var(--bg-secondary)" },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "w-20 h-20 rounded-full flex items-center justify-center mb-6",
                style: {
                  background: "var(--bg-tertiary)",
                  border: "1px solid var(--border-light)"
                },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { size: 32, style: { color: "var(--brand-gold)" } })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "h3",
              {
                className: "font-display text-2xl font-bold mb-2",
                style: { color: "var(--brand-primary)" },
                children: [
                  "No results for \\u201c",
                  term,
                  "\\u201d"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "font-body text-sm mb-6 max-w-sm text-center",
                style: { color: "var(--text-muted)" },
                children: "Try different keywords — like a trek name, region, or travel style."
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 justify-center", children: ["Kedarkantha", "Char Dham", "Spiti Valley", "Garhwal"].map(
              (s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setTerm(s),
                  "data-ocid": `search.suggestion.${s.toLowerCase().replace(/\s+/g, "-")}`,
                  className: "px-4 py-1.5 rounded-full text-xs font-body font-medium transition-all duration-200 hover:opacity-80",
                  style: {
                    background: "var(--bg-tertiary)",
                    color: "var(--text-secondary)",
                    border: "1px solid var(--border-light)"
                  },
                  children: s
                },
                s
              )
            ) })
          ]
        }
      ),
      !term && !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "p",
        {
          className: "font-body text-base",
          style: { color: "var(--text-muted)" },
          children: "Start typing to explore treks, yatras, packages, and stays across the Himalayas."
        }
      ) }),
      data && !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-14", children: [
        showTreks && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "h2",
              {
                className: "font-display text-2xl font-bold",
                style: { color: "var(--brand-primary)" },
                children: "Treks"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "text-xs font-body font-semibold px-2.5 py-1 rounded-full",
                style: {
                  background: "var(--brand-gold)",
                  color: "var(--brand-primary)"
                },
                children: data.treks.length
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4", children: data.treks.map((t, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(TrekCard, { trek: t, index: i }, String(t.id))) })
        ] }),
        showYatras && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "h2",
              {
                className: "font-display text-2xl font-bold",
                style: { color: "var(--brand-primary)" },
                children: "Yatras"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "text-xs font-body font-semibold px-2.5 py-1 rounded-full",
                style: {
                  background: "var(--brand-gold)",
                  color: "var(--brand-primary)"
                },
                children: data.yatras.length
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", children: data.yatras.map((y, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(YatraCard, { yatra: y, index: i }, String(y.id))) })
        ] }),
        showPackages && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "h2",
              {
                className: "font-display text-2xl font-bold",
                style: { color: "var(--brand-primary)" },
                children: "Packages"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "text-xs font-body font-semibold px-2.5 py-1 rounded-full",
                style: {
                  background: "var(--brand-gold)",
                  color: "var(--brand-primary)"
                },
                children: data.packages.length
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", children: data.packages.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(PackageCard, { pkg: p, index: i }, String(p.id))) })
        ] }),
        showStays && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "h2",
              {
                className: "font-display text-2xl font-bold",
                style: { color: "var(--brand-primary)" },
                children: "Stays"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "text-xs font-body font-semibold px-2.5 py-1 rounded-full",
                style: {
                  background: "var(--brand-gold)",
                  color: "var(--brand-primary)"
                },
                children: data.stays.length
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", children: data.stays.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(StayCard, { stay: s, index: i }, String(s.id))) })
        ] })
      ] })
    ] })
  ] });
}
export {
  SearchPage as default
};
