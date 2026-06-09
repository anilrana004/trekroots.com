import { j as jsxRuntimeExports } from "./index-B8T7PWVC.js";
function SectionHeader({
  label,
  title,
  subtitle,
  centered = false
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `mb-10 ${centered ? "text-center" : ""}`, children: [
    label && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold tracking-widest uppercase text-accent mb-2 font-body", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl md:text-4xl font-bold text-foreground leading-tight", children: title }),
    subtitle && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "p",
      {
        className: "mt-3 text-muted-foreground font-body text-base max-w-2xl",
        style: centered ? { margin: "12px auto 0" } : {},
        children: subtitle
      }
    )
  ] });
}
export {
  SectionHeader as S
};
