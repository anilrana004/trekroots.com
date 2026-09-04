"use client";

import { useEffect } from "react";

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
    root.style.setProperty("--site-header-h", `${HEADER_HEIGHT}px`);
    root.style.setProperty("--site-header-offset", `${HEADER_HEIGHT}px`);

    let lastY = window.scrollY;
    let ticking = false;
    const mq = window.matchMedia(MOBILE_MQ);

    const apply = (state: "shown" | "hidden") => {
      if (root.dataset.headerState === state) return;
      root.dataset.headerState = state;
      const offset =
        state === "shown" || !mq.matches ? HEADER_HEIGHT : 0;
      root.style.setProperty("--site-header-offset", `${offset}px`);
    };

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
      root.dataset.headerState = "shown";
      root.style.setProperty("--site-header-offset", `${HEADER_HEIGHT}px`);
    };
  }, []);
}
