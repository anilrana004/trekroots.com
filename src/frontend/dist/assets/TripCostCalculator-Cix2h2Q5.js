import { r as reactExports, j as jsxRuntimeExports } from "./index-B8T7PWVC.js";
function TripCostCalculator({
  tripName,
  baseDurationDays,
  pricePerPersonBudget,
  pricePerPersonStandard,
  pricePerPersonPremium,
  tripType
}) {
  const [adults, setAdults] = reactExports.useState(2);
  const [children, setChildren] = reactExports.useState(0);
  const [accommodationType, setAccommodationType] = reactExports.useState("standard");
  const basePrice = accommodationType === "budget" ? pricePerPersonBudget : accommodationType === "premium" ? pricePerPersonPremium : pricePerPersonStandard;
  const perPerson = basePrice;
  const childrenCost = children * basePrice * 0.5;
  const groupTotal = adults * perPerson + childrenCost;
  const accommodationOptions = [
    { value: "budget", label: "Budget", price: pricePerPersonBudget },
    { value: "standard", label: "Standard", price: pricePerPersonStandard },
    { value: "premium", label: "Premium", price: pricePerPersonPremium }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "rounded-2xl p-5 space-y-4",
      style: { backgroundColor: "#F5F0E8", border: "1px solid #E5DDD0" },
      "data-ocid": "calculator.card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "h3",
            {
              className: "font-display text-xl font-bold",
              style: { color: "#3C1414" },
              children: "Trip Cost Estimator"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-body text-xs mt-0.5", style: { color: "#7A7A7A" }, children: [
            tripName,
            " · ",
            baseDurationDays,
            " Days"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "font-body text-sm font-semibold",
                  style: { color: "#3C1414" },
                  children: "Adults"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-xs", style: { color: "#7A7A7A" }, children: "Age 12+" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  "data-ocid": "calculator.adults_minus",
                  onClick: () => setAdults((v) => Math.max(1, v - 1)),
                  disabled: adults <= 1,
                  className: "w-8 h-8 rounded-full flex items-center justify-center font-semibold text-base transition-colors disabled:opacity-40",
                  style: {
                    backgroundColor: "#fff",
                    border: "1px solid #C04000",
                    color: "#C04000"
                  },
                  children: "−"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "font-body font-bold text-base w-5 text-center",
                  style: { color: "#3C1414" },
                  "data-ocid": "calculator.adults_count",
                  children: adults
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  "data-ocid": "calculator.adults_plus",
                  onClick: () => setAdults((v) => Math.min(20, v + 1)),
                  disabled: adults >= 20,
                  className: "w-8 h-8 rounded-full flex items-center justify-center font-semibold text-base transition-colors disabled:opacity-40",
                  style: {
                    backgroundColor: "#C04000",
                    border: "1px solid #C04000",
                    color: "#fff"
                  },
                  children: "+"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "font-body text-sm font-semibold",
                  style: { color: "#3C1414" },
                  children: "Children"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-xs", style: { color: "#7A7A7A" }, children: "Age 5–11 · 50% off" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  "data-ocid": "calculator.children_minus",
                  onClick: () => setChildren((v) => Math.max(0, v - 1)),
                  disabled: children <= 0,
                  className: "w-8 h-8 rounded-full flex items-center justify-center font-semibold text-base transition-colors disabled:opacity-40",
                  style: {
                    backgroundColor: "#fff",
                    border: "1px solid #C04000",
                    color: "#C04000"
                  },
                  children: "−"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "font-body font-bold text-base w-5 text-center",
                  style: { color: "#3C1414" },
                  "data-ocid": "calculator.children_count",
                  children
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  "data-ocid": "calculator.children_plus",
                  onClick: () => setChildren((v) => Math.min(10, v + 1)),
                  disabled: children >= 10,
                  className: "w-8 h-8 rounded-full flex items-center justify-center font-semibold text-base transition-colors disabled:opacity-40",
                  style: {
                    backgroundColor: "#C04000",
                    border: "1px solid #C04000",
                    color: "#fff"
                  },
                  children: "+"
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "font-body text-xs font-semibold uppercase tracking-wider mb-2",
              style: { color: "#7A7A7A" },
              children: "Accommodation"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-1.5", children: accommodationOptions.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              "data-ocid": `calculator.accom_${opt.value}`,
              onClick: () => setAccommodationType(opt.value),
              className: "py-2 px-1 rounded-lg text-center transition-all",
              style: {
                border: accommodationType === opt.value ? "2px solid #C04000" : "1px solid #D9D0C4",
                backgroundColor: accommodationType === opt.value ? "#C04000" : "#fff",
                color: accommodationType === opt.value ? "#fff" : "#3C1414"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-xs font-semibold", children: opt.label }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "p",
                  {
                    className: "font-body text-[10px] mt-0.5",
                    style: {
                      color: accommodationType === opt.value ? "#FFD9C4" : "#7A7A7A"
                    },
                    children: [
                      "₹",
                      opt.price.toLocaleString("en-IN")
                    ]
                  }
                )
              ]
            },
            opt.value
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center justify-between py-2 border-b",
            style: { borderColor: "#D9D0C4" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm", style: { color: "#7A7A7A" }, children: "Duration" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "p",
                {
                  className: "font-body text-sm font-semibold",
                  style: { color: "#3C1414" },
                  children: [
                    baseDurationDays,
                    " Days"
                  ]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm", style: { color: "#7A7A7A" }, children: "Per Person" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "p",
              {
                className: "font-body text-base font-semibold",
                style: { color: "#3C1414" },
                children: [
                  "₹",
                  perPerson.toLocaleString("en-IN")
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "font-body text-sm font-bold",
                style: { color: "#3C1414" },
                children: "Group Total"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "p",
              {
                className: "font-display text-2xl font-bold",
                style: { color: "#C04000" },
                "data-ocid": "calculator.group_total",
                children: [
                  "₹",
                  groupTotal.toLocaleString("en-IN")
                ]
              }
            )
          ] }),
          children > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-body text-xs", style: { color: "#7A7A7A" }, children: [
            "Includes ",
            adults,
            " adult",
            adults > 1 ? "s" : "",
            " + ",
            children,
            " child",
            children > 1 ? "ren" : "",
            " (50% rate)"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-[11px] italic", style: { color: "#9A8F85" }, children: "Estimates only — final price confirmed at booking." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            "data-ocid": "calculator.book_button",
            onClick: () => window.scrollTo({ top: 0, behavior: "smooth" }),
            className: "w-full py-3 rounded-xl font-body text-sm font-semibold text-white transition-opacity hover:opacity-90",
            style: { backgroundColor: "#C04000" },
            children: [
              "Book This ",
              tripType === "trek" ? "Trek" : "Yatra"
            ]
          }
        )
      ]
    }
  );
}
export {
  TripCostCalculator as T
};
