"use client";

import { useEffect } from "react";

/** Fallback until the header is measured; it is shorter on phones. */
const HEADER_HEIGHT = 68;
const DELTA = 8;
const TOP_SHOW = 48;
const MOBILE_MQ = "(max-width: 767px)";

/**
 * Phone scroll behavior (Roopkund Heaven style):
 * - scroll down → hide main header; jump-to-section sticks to top
 * - scroll up → show header again; jump nav sits under it
 * Desktop: header always shown.
 */
export function useScrollHeaderVisibility() {
  useEffect(() => {
    const root = document.documentElement;
    root.dataset.headerState = "shown";

    // The bar is 60px on phones and 68px on desktop, so measure rather than
    // assume; sticky sub-navs are positioned from this.
    const header = document.querySelector<HTMLElement>("[data-ocid='navbar']");
    let headerHeight = header?.offsetHeight || HEADER_HEIGHT;

    let lastY = window.scrollY;
    let ticking = false;
    const mq = window.matchMedia(MOBILE_MQ);

    const apply = (state: "shown" | "hidden", force = false) => {
      if (!force && root.dataset.headerState === state) return;
      root.dataset.headerState = state;
      const offset = state === "shown" || !mq.matches ? headerHeight : 0;
      root.style.setProperty("--site-header-h", `${headerHeight}px`);
      root.style.setProperty("--site-header-offset", `${offset}px`);
    };

    apply("shown", true);

    const observer =
      header && typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => {
            const next = header.offsetHeight;
            if (!next || next === headerHeight) return;
            headerHeight = next;
            apply(
              root.dataset.headerState === "hidden" ? "hidden" : "shown",
              true,
            );
          })
        : null;
    if (header) observer?.observe(header);

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        if (!mq.matches) {
          apply("shown");
          lastY = window.scrollY;
          ticking = false;
          return;
        }

        // Keep header visible while mobile drawer is open
        if (document.body.style.overflow === "hidden") {
          apply("shown");
          lastY = window.scrollY;
          ticking = false;
          return;
        }

        const y = window.scrollY;
        const dy = y - lastY;

        if (y <= TOP_SHOW) {
          apply("shown");
        } else if (dy > DELTA) {
          apply("hidden");
        } else if (dy < -DELTA) {
          apply("shown");
        }

        lastY = y;
        ticking = false;
      });
    };

    const onMqChange = () => apply("shown");

    window.addEventListener("scroll", onScroll, { passive: true });
    mq.addEventListener("change", onMqChange);
    return () => {
      window.removeEventListener("scroll", onScroll);
      mq.removeEventListener("change", onMqChange);
      observer?.disconnect();
      root.dataset.headerState = "shown";
      root.style.setProperty("--site-header-offset", `${headerHeight}px`);
    };
  }, []);
}
