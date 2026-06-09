import { j as jsxRuntimeExports } from "./index-B8T7PWVC.js";
import { S as SectionHeader } from "./SectionHeader-BjMG7KKM.js";
import { Y as YatraCard } from "./YatraCard-DOeLSd-n.js";
import { b as useAllYatras } from "./useBackendQuery-DADe_-Iy.js";
import "./backend-BHRKQ7VT.js";
const SKELETON_YATRAS = [1, 2, 3, 4, 5, 6];
function SectionGaneshDecor() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "pointer-events-none select-none absolute inset-0 overflow-hidden",
      "aria-hidden": "true",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "svg",
          {
            viewBox: "0 0 200 240",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg",
            className: "absolute -left-16 top-8 w-64 h-80",
            style: { opacity: 0.06, color: "#ED872D" },
            "aria-hidden": "true",
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
              /* @__PURE__ */ jsxRuntimeExports.jsx("ellipse", { cx: "100", cy: "165", rx: "52", ry: "55", fill: "#ED872D" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "100", cy: "170", r: "25", fill: "#ED872D" }),
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
              /* @__PURE__ */ jsxRuntimeExports.jsx("ellipse", { cx: "100", cy: "228", rx: "30", ry: "8", fill: "#ED872D" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "svg",
          {
            viewBox: "0 0 200 240",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg",
            className: "absolute -right-16 bottom-8 w-72 h-96",
            style: { opacity: 0.05, color: "#ED872D" },
            "aria-hidden": "true",
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
              /* @__PURE__ */ jsxRuntimeExports.jsx("ellipse", { cx: "100", cy: "165", rx: "52", ry: "55", fill: "#ED872D" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "100", cy: "170", r: "25", fill: "#ED872D" }),
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
              /* @__PURE__ */ jsxRuntimeExports.jsx("ellipse", { cx: "100", cy: "228", rx: "30", ry: "8", fill: "#ED872D" })
            ]
          }
        )
      ]
    }
  );
}
function YatraPage() {
  const { data: yatras = [], isLoading } = useAllYatras();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "relative min-h-screen",
      style: {
        background: "linear-gradient(to bottom, #FFF8F0 0%, #FFFAF5 100%)"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "w-full py-2 text-center text-sm font-body tracking-[0.4em] overflow-hidden",
            style: {
              color: "#ED872D",
              opacity: 0.6,
              borderBottom: "1px solid #ED872D22"
            },
            children: "ॐ    ॐ    ॐ    ॐ    ॐ    ॐ    ॐ    ॐ    ॐ    ॐ    ॐ    ॐ"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative container mx-auto px-4 py-12", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SectionGaneshDecor, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SectionHeader,
              {
                title: "Yatra & Pilgrimage",
                subtitle: "Sacred journeys to the abode of the gods — char dham, panch kedar, and beyond."
              }
            ),
            isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6", children: SKELETON_YATRAS.map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "rounded-xl bg-muted animate-pulse",
                style: { minHeight: "460px" }
              },
              n
            )) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6", children: yatras.map((y, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(YatraCard, { yatra: y, index: i }, String(y.id))) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "w-full py-2 text-center text-sm font-body tracking-[0.4em]",
            style: {
              color: "#ED872D",
              opacity: 0.5,
              borderTop: "1px solid #ED872D22"
            },
            children: "ॐ    ॐ    ॐ    ॐ    ॐ    ॐ    ॐ    ॐ"
          }
        )
      ]
    }
  );
}
export {
  YatraPage as default
};
