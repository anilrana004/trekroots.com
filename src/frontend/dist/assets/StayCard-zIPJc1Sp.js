import { i as useNavigate, j as jsxRuntimeExports, L as Link, b as MapPin, S as Star } from "./index-B8T7PWVC.js";
import { F as Flame } from "./flame-Bi_aUBBP.js";
import { U as UtensilsCrossed, C as Car, W as Wifi } from "./wifi-Ci5gKLUK.js";
const AMENITY_ICON_MAP = {
  WiFi: /* @__PURE__ */ jsxRuntimeExports.jsx(Wifi, { size: 12 }),
  Parking: /* @__PURE__ */ jsxRuntimeExports.jsx(Car, { size: 12 }),
  Meals: /* @__PURE__ */ jsxRuntimeExports.jsx(UtensilsCrossed, { size: 12 }),
  Bonfire: /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { size: 12 })
};
function StayCard({ stay, index = 0 }) {
  const minPrice = Number(stay.pricePerNightMin).toLocaleString("en-IN");
  const maxPrice = Number(stay.pricePerNightMax).toLocaleString("en-IN");
  const navigate = useNavigate();
  const handleBook = (e) => {
    e.preventDefault();
    void navigate({ to: `/booking?type=stay&id=${stay.id}` });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Link,
    {
      to: "/stays/$slug",
      params: { slug: stay.slug },
      "data-ocid": `stay.item.${index + 1}`,
      className: "group block rounded-2xl overflow-hidden bg-card border border-[var(--border-light)] shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-1 transition-all duration-300",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-56 overflow-hidden bg-muted", children: [
          stay.imageUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: stay.imageUrl,
              alt: stay.name,
              className: "w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500"
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-full h-full flex items-center justify-center",
              style: { background: "var(--bg-secondary)" },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-5xl", children: "🏡" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute inset-0",
              style: { background: "var(--gradient-card)" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "absolute top-3 left-3 text-[11px] font-semibold px-2.5 py-1 rounded-full font-body tracking-wide",
              style: {
                background: "var(--brand-gold)",
                color: "var(--brand-primary)"
              },
              children: stay.stayType
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-3 left-3 right-3 flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5 text-xs text-white/90 font-body", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 12 }),
              stay.location
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-xs text-white/90 font-body", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { size: 12, className: "fill-amber-400 text-amber-400" }),
              "4.9"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "h3",
            {
              className: "font-display text-[1.15rem] font-semibold leading-snug mb-1.5 group-hover:text-[var(--brand-secondary)] transition-colors",
              style: { color: "var(--brand-primary)" },
              children: stay.name
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[var(--text-secondary)] font-body mb-4 line-clamp-2 leading-relaxed", children: stay.description }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1.5 mb-4 flex-wrap", children: stay.amenities.slice(0, 4).map((a) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: "inline-flex items-center gap-1 text-[10px] font-body px-2 py-0.5 rounded-full",
              style: {
                background: "var(--bg-tertiary)",
                color: "var(--text-secondary)"
              },
              title: a,
              children: [
                AMENITY_ICON_MAP[a] || null,
                a
              ]
            },
            a
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center justify-between pt-3 border-t",
              style: { borderColor: "var(--border-light)" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "p",
                  {
                    className: "text-sm font-bold font-body",
                    style: { color: "var(--brand-secondary)" },
                    children: [
                      "₹",
                      minPrice,
                      minPrice !== maxPrice && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "span",
                        {
                          className: "text-xs font-normal",
                          style: { color: "var(--text-muted)" },
                          children: [
                            " ",
                            "– ₹",
                            maxPrice
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "span",
                        {
                          className: "text-xs font-normal",
                          style: { color: "var(--text-muted)" },
                          children: [
                            " ",
                            "/night"
                          ]
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "text-xs font-body font-semibold tracking-wide group-hover:underline",
                      style: { color: "var(--accent-orange)" },
                      children: "View Stay →"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      "data-ocid": `stay.book_button.${index + 1}`,
                      onClick: handleBook,
                      className: "text-xs font-body font-semibold px-3 py-1.5 rounded-lg text-white transition-colors hover:opacity-90",
                      style: { backgroundColor: "var(--brand-secondary)" },
                      children: "Book"
                    }
                  )
                ] })
              ]
            }
          )
        ] })
      ]
    }
  );
}
export {
  StayCard as S
};
