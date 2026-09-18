"use client";

import { Volume2, VolumeX, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { r2VideoUrl } from "@/lib/r2-media";

const SESSION_KEY = "trekroots-intro-dismissed";

/**
 * Full-viewport entry film. Fixed overlay only — homepage underneath is
 * unchanged (no layout shift). Cut closes; volume toggles audio.
 */
export function IntroVideoOverlay() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const mutedRef = useRef(true);
  /** null = deciding (black gate); true = playing; false = gone */
  const [open, setOpen] = useState<boolean | null>(null);
  const [muted, setMuted] = useState(true);

  const dismiss = useCallback(() => {
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      /* private mode */
    }
    const el = videoRef.current;
    if (el) {
      el.pause();
      el.removeAttribute("src");
      el.load();
    }
    setOpen(false);
  }, []);

  useEffect(() => {
    let show = true;
    try {
      if (sessionStorage.getItem(SESSION_KEY) === "1") show = false;
    } catch {
      /* ignore */
    }
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      show = false;
    }
    setOpen(show);
  }, []);

  // Lock scroll while the intro covers the page — body only, no reflow of content.
  useEffect(() => {
    if (open !== true) return;
    const html = document.documentElement;
    const body = document.body;
    const prevHtml = html.style.overflow;
    const prevBody = body.style.overflow;
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    return () => {
      html.style.overflow = prevHtml;
      body.style.overflow = prevBody;
    };
  }, [open]);

  // Autoplay muted on phones + desktop.
  useEffect(() => {
    if (open !== true) return;
    const el = videoRef.current;
    if (!el) return;

    const tryPlay = () => {
      el.muted = mutedRef.current;
      if (mutedRef.current) el.setAttribute("muted", "");
      else el.removeAttribute("muted");
      void el.play().catch(() => {});
    };

    tryPlay();
    el.addEventListener("loadeddata", tryPlay);
    el.addEventListener("canplay", tryPlay);

    const onGesture = () => tryPlay();
    document.addEventListener("touchstart", onGesture, {
      once: true,
      passive: true,
    });

    return () => {
      el.removeEventListener("loadeddata", tryPlay);
      el.removeEventListener("canplay", tryPlay);
      document.removeEventListener("touchstart", onGesture);
    };
  }, [open]);

  useEffect(() => {
    if (open !== true) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, dismiss]);

  const toggleMute = useCallback(() => {
    const el = videoRef.current;
    const next = !mutedRef.current;
    mutedRef.current = next;
    setMuted(next);
    if (!el) return;
    el.muted = next;
    if (next) {
      el.setAttribute("muted", "");
    } else {
      el.removeAttribute("muted");
      void el.play().catch(() => {});
    }
  }, []);

  // Opaque gate until we know whether to show — prevents homepage flash.
  if (open === null) {
    return (
      <div
        className="fixed inset-0 z-[200] bg-black"
        aria-hidden
        data-ocid="intro.gate"
      />
    );
  }

  if (!open) return null;

  const src = r2VideoUrl("intro");

  return (
    <div
      className="fixed inset-0 z-[200] bg-black"
      role="dialog"
      aria-modal="true"
      aria-label="TrekRoots introductory film"
      data-ocid="intro.overlay"
    >
      <video
        ref={videoRef}
        src={src}
        className="absolute inset-0 h-full w-full object-cover object-center"
        autoPlay
        muted={muted}
        playsInline
        loop={false}
        controls={false}
        disablePictureInPicture
        preload="auto"
        onEnded={dismiss}
        aria-label="TrekRoots introductory film"
      />

      {/* Soft edge vignette — keeps controls readable on bright frames */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/40"
        aria-hidden
      />

      <button
        type="button"
        onClick={dismiss}
        data-ocid="intro.cut_button"
        className="no-retro absolute top-[max(1rem,env(safe-area-inset-top))] right-[max(1rem,env(safe-area-inset-right))] z-10 flex h-11 w-11 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-sm transition-colors hover:bg-black/60 md:h-12 md:w-12"
        aria-label="Skip intro and enter site"
      >
        <X size={20} strokeWidth={2} />
      </button>

      <button
        type="button"
        onClick={toggleMute}
        data-ocid="intro.sound_button"
        className="no-retro absolute bottom-[max(1.25rem,env(safe-area-inset-bottom))] left-[max(1rem,env(safe-area-inset-left))] z-10 flex h-11 w-11 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-sm transition-colors hover:bg-black/60 md:h-12 md:w-12"
        aria-label={muted ? "Unmute intro video" : "Mute intro video"}
        aria-pressed={!muted}
      >
        {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
      </button>

      <p className="pointer-events-none absolute bottom-[max(1.5rem,env(safe-area-inset-bottom))] left-1/2 z-10 max-w-[80%] -translate-x-1/2 text-center font-body text-[11px] tracking-wide text-white/55 md:text-xs">
        Close to enter the site
      </p>
    </div>
  );
}
