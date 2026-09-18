"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { CloudinaryImage } from "@/components/CloudinaryImage";
import { AdvantageGrid } from "@/components/home/AdvantageGrid";
import { ExpertBand } from "@/components/home/ExpertBand";
import { GoogleRating } from "@/components/home/GoogleRating";
import { HomeFaq } from "@/components/home/HomeFaq";
import { HomeJournal } from "@/components/home/HomeJournal";
import { PromoBanner } from "@/components/home/PromoBanner";
import { Reasons } from "@/components/home/Reasons";
import { SacredYatras } from "@/components/home/SacredYatras";
import { SafetyFeature } from "@/components/home/SafetyFeature";
import { SeasonalTreks } from "@/components/home/SeasonalTreks";
import { TreksByCategory } from "@/components/home/TreksByCategory";
import { TrekkerStories } from "@/components/home/TrekkerStories";
import { TrustedBy } from "@/components/home/TrustedBy";
import { getTrekCoverImage, getYatraCoverImage } from "@/data";
import type { HomeJournalData } from "@/lib/sanity/fetch";

// ─── Hero Slides ──────────────────────────────────────────────────────────────

const CAROUSEL_ITEMS = [
  {
    id: 1,
    slug: "/treks/valley-of-flowers",
    name: "Valley of Flowers Trek",
    category: "TREK",
    duration: "6 Days",
    altitude: "3,962 m",
    tagline:
      "A monsoon meadow of 300+ Himalayan wildflower species — UNESCO World Heritage.",
    image: getTrekCoverImage("valley-of-flowers"),
  },
  {
    id: 2,
    slug: "/treks/kedarkantha",
    name: "Kedarkantha Trek",
    category: "TREK",
    duration: "6 Days",
    altitude: "3,811 m",
    tagline:
      "India's finest winter trek — a snow-clad summit at sunrise above the clouds.",
    image: getTrekCoverImage("kedarkantha"),
  },
  {
    id: 3,
    slug: "/treks/brahmatal",
    name: "Brahmatal Trek",
    category: "TREK",
    duration: "6 Days",
    altitude: "12,250 ft",
    tagline:
      "Frozen alpine lake, oak forests, and Mt. Trishul views — a classic winter Himalayan trek.",
    image: getTrekCoverImage("brahmatal"),
  },
  {
    id: 4,
    slug: "/yatra/char-dham",
    name: "Char Dham Yatra",
    category: "YATRA",
    duration: "12 Days",
    altitude: "3,583 m",
    tagline:
      "Walk the four sacred shrines of Uttarakhand — a journey of a lifetime.",
    image: getYatraCoverImage("char-dham"),
  },
  {
    id: 5,
    slug: "/yatra/kedarnath",
    name: "Kedarnath Yatra",
    category: "YATRA",
    duration: "4 Days",
    altitude: "3,583 m",
    tagline:
      "Lord Shiva's high abode — one of the 12 Jyotirlingas in the Himalayas.",
    image: getYatraCoverImage("kedarnath"),
  },
];

// ─── Hero ─────────────────────────────────────────────────────────────────────

/** Keep current + neighbors only so LCP isn't competing with 5 full-bleed downloads. */
function shouldMountHeroSlide(i: number, current: number, total: number) {
  if (total <= 2) return true;
  const prev = (current - 1 + total) % total;
  const next = (current + 1) % total;
  return i === current || i === prev || i === next;
}

function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = useCallback(
    (index: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setCurrent(index);
      setTimeout(() => setIsTransitioning(false), 700);
    },
    [isTransitioning],
  );

  const goNext = useCallback(() => {
    goTo((current + 1) % CAROUSEL_ITEMS.length);
  }, [current, goTo]);

  const goPrev = useCallback(() => {
    goTo((current - 1 + CAROUSEL_ITEMS.length) % CAROUSEL_ITEMS.length);
  }, [current, goTo]);

  useEffect(() => {
    timerRef.current = setTimeout(goNext, 6000);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [goNext]);

  useEffect(() => {
    setHasAnimated(true);
  }, []);

  const item = CAROUSEL_ITEMS[current];
  const isYatra = item.category === "YATRA";

  return (
    <section
      data-ocid="carousel.section"
      className="relative h-[460px] md:h-[560px] overflow-hidden"
    >
      {CAROUSEL_ITEMS.map((slide, i) => {
        if (!shouldMountHeroSlide(i, current, CAROUSEL_ITEMS.length)) {
          return null;
        }
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ${
              i === current ? "opacity-100 z-[1]" : "opacity-0 z-0"
            }`}
            aria-hidden={i !== current}
          >
            <CloudinaryImage
              src={slide.image}
              alt={`${slide.name} — Himalayan ${slide.category === "YATRA" ? "yatra" : "trek"}`}
              width={1920}
              height={1080}
              priority={i === 0}
              sizes="100vw"
              lazy={i !== current && i !== (current + 1) % CAROUSEL_ITEMS.length}
              className="w-full h-full object-cover object-center"
              transform={{
                width: 1920,
                height: 1080,
                crop: "fill",
                gravity: "auto",
                quality: i === 0 ? "auto:good" : "auto:eco",
                format: "auto",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/50 to-black/70 md:bg-gradient-to-r md:from-black/75 md:via-black/40 md:to-black/10" />
          </div>
        );
      })}

      <div className="absolute inset-0 z-10 flex items-center">
        <div className="lux-container w-full">
          <motion.div
            key={current}
            initial={hasAnimated ? { opacity: 0, y: 24 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mx-auto max-w-xl text-center md:mx-0 md:text-left"
          >
            <h1 className="font-display text-3xl md:text-4xl lg:text-[44px] leading-tight text-white mb-4">
              {item.name}
            </h1>

            <p className="font-body text-[13px] md:text-sm text-white/85 mb-6 mx-auto md:mx-0 max-w-md">
              {item.tagline}
            </p>

            <Link
              href={item.slug}
              data-ocid={`carousel.explore.${current + 1}`}
              className="no-retro inline-flex items-center px-5 py-2.5 font-body text-xs font-bold text-[#1A1A1A] mx-auto md:mx-0"
              style={{ backgroundColor: "#FFC107" }}
            >
              Explore The {isYatra ? "Yatra" : "Trek"}
            </Link>

            <p className="font-body text-[11.5px] text-white/70 mt-5 mx-auto md:mx-0 max-w-sm md:max-w-none">
              {item.duration} · {item.altitude} · Registered with Uttarakhand
              Tourism. See every departure under{" "}
              <Link
                href={isYatra ? "/yatra" : "/treks"}
                data-ocid="carousel.browse_all"
                className="no-retro font-semibold text-white underline underline-offset-2"
              >
                {isYatra ? "sacred yatras" : "all treks"}
              </Link>
              .
            </p>
          </motion.div>
        </div>
      </div>

      <button
        type="button"
        onClick={goPrev}
        data-ocid="carousel.prev_button"
        className="no-retro absolute left-3 md:left-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full flex items-center justify-center bg-white/20 backdrop-blur-sm text-white transition-colors hover:bg-white/30"
        aria-label="Previous slide"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        type="button"
        onClick={goNext}
        data-ocid="carousel.next_button"
        className="no-retro absolute right-3 md:right-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full flex items-center justify-center bg-white/20 backdrop-blur-sm text-white transition-colors hover:bg-white/30"
        aria-label="Next slide"
      >
        <ChevronRight size={18} />
      </button>

      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {CAROUSEL_ITEMS.map((slide, i) => (
          <button
            key={`dot-${slide.id}`}
            type="button"
            onClick={() => goTo(i)}
            data-ocid={`carousel.dot.${i + 1}`}
            className={`no-retro transition-all duration-300 ${
              i === current
                ? "w-6 h-1 bg-[#FFC107]"
                : "w-1.5 h-1.5 rounded-full bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

// ─── Notice Strip ─────────────────────────────────────────────────────────────

function NoticeStrip() {
  return (
    <div
      data-ocid="notice.strip"
      className="py-2.5 border-b"
      style={{ backgroundColor: "#FDF8E7", borderColor: "#F0E3B8" }}
    >
      <div className="lux-container text-center">
        <p className="font-body text-[11.5px] text-[#1A1A1A]">
          Booking a trek for the first time? Start with our{" "}
          <Link
            href="/treks?difficulty=Easy"
            data-ocid="notice.easy_treks"
            className="no-retro font-semibold text-[#1A73E8] hover:underline"
          >
            easy Himalayan treks
          </Link>{" "}
          or read the{" "}
          <Link
            href="/blog"
            data-ocid="notice.guides"
            className="no-retro font-semibold text-[#1A73E8] hover:underline"
          >
            trekking guides
          </Link>
          .
        </p>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage({
  journal,
}: {
  journal?: HomeJournalData | null;
}) {
  return (
    <div className="bg-white">
      <HeroCarousel />
      <NoticeStrip />
      <SafetyFeature />
      <TrekkerStories />
      {journal ? <HomeJournal data={journal} /> : null}
      <SeasonalTreks />
      <HomeFaq />
      <Reasons />
      <PromoBanner />
      <GoogleRating />
      <SacredYatras />
      <AdvantageGrid />
      <TrustedBy />
      <TreksByCategory />
      <ExpertBand />
    </div>
  );
}
