"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  MapPin,
  Mountain,
  Shield,
  Star,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { FeaturedCardCarousel } from "@/components/FeaturedCardCarousel";

// ─── Carousel Data ────────────────────────────────────────────────────────────

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
    image: "/assets/generated/carousel-valley-of-flowers.dim_1920x900.jpg",
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
    image: "/assets/generated/carousel-kedarkantha.dim_1920x900.jpg",
  },
  {
    id: 3,
    slug: "/treks/roopkund",
    name: "Roopkund Trek",
    category: "TREK",
    duration: "8 Days",
    altitude: "5,029 m",
    tagline:
      "The mysterious Skeleton Lake sits atop a dramatic glacial ridge at 5,000 m.",
    image: "/assets/generated/carousel-roopkund.dim_1920x900.jpg",
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
    image: "/assets/generated/carousel-char-dham.dim_1920x900.jpg",
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
    image: "/assets/generated/carousel-kedarnath.dim_1920x900.jpg",
  },
];

// ─── Trek Data ────────────────────────────────────────────────────────────────

const FEATURED_TREKS = [
  {
    id: 1,
    slug: "/treks/kedarkantha",
    name: "Kedarkantha Trek",
    region: "Uttarakhand",
    difficulty: "Easy–Moderate",
    difficultyColor: "#5A8A6A",
    duration: "6 Days",
    altitude: "3,811 m",
    price: "₹8,500",
    image: "/assets/generated/trek-kedarkantha.dim_800x600.jpg",
    season: "Dec–Apr",
  },
  {
    id: 2,
    slug: "/treks/valley-of-flowers",
    name: "Valley of Flowers",
    region: "Uttarakhand",
    difficulty: "Moderate",
    difficultyColor: "#3D7A8A",
    duration: "6 Days",
    altitude: "3,962 m",
    price: "₹9,500",
    image: "/assets/generated/trek-valley-flowers.dim_800x600.jpg",
    season: "Jul–Sep",
  },
  {
    id: 3,
    slug: "/treks/roopkund",
    name: "Roopkund Trek",
    region: "Uttarakhand",
    difficulty: "Difficult",
    difficultyColor: "#8B2635",
    duration: "8 Days",
    altitude: "5,029 m",
    price: "₹14,000",
    image: "/assets/generated/trek-roopkund.dim_800x600.jpg",
    season: "May–Jun, Sep–Oct",
  },
  {
    id: 4,
    slug: "/treks/hampta-pass",
    name: "Hampta Pass",
    region: "Himachal Pradesh",
    difficulty: "Moderate",
    difficultyColor: "#3D7A8A",
    duration: "5 Days",
    altitude: "4,270 m",
    price: "₹9,500",
    image: "/assets/generated/trek-hampta-pass.dim_800x600.jpg",
    season: "Jun–Sep",
  },
];

// ─── Yatra Data ───────────────────────────────────────────────────────────────

const FEATURED_YATRAS = [
  {
    id: 1,
    slug: "/yatra/char-dham",
    name: "Char Dham Yatra",
    region: "Uttarakhand",
    type: "Grand Pilgrimage",
    typeColor: "#C9973A",
    duration: "12 Days",
    temples: "4 Sacred Shrines",
    price: "₹22,000",
    image: "/assets/generated/yatra-chardham.dim_800x600.jpg",
    season: "May–Nov",
  },
  {
    id: 2,
    slug: "/yatra/kedarnath",
    name: "Kedarnath Yatra",
    region: "Uttarakhand",
    type: "Jyotirlinga",
    typeColor: "#FFC107",
    duration: "4 Days",
    temples: "1 Jyotirlinga",
    price: "₹6,500",
    image: "/assets/generated/yatra-kedarnath.dim_800x600.jpg",
    season: "May–Nov",
  },
  {
    id: 3,
    slug: "/yatra/badrinath",
    name: "Badrinath Yatra",
    region: "Uttarakhand",
    type: "Char Dham",
    typeColor: "#C9973A",
    duration: "3 Days",
    temples: "Vishnu Dham",
    price: "₹5,500",
    image: "/assets/generated/yatra-chardham.dim_800x600.jpg",
    season: "May–Nov",
  },
  {
    id: 4,
    slug: "/yatra/gangotri-yamunotri",
    name: "Gangotri–Yamunotri",
    region: "Uttarakhand",
    type: "Source Pilgrimage",
    typeColor: "#5A8A6A",
    duration: "5 Days",
    temples: "2 Sacred Sources",
    price: "₹9,000",
    image: "/assets/generated/yatra-chardham.dim_800x600.jpg",
    season: "May–Nov",
  },
];

const PAGE_STATS = [
  { value: "50+", label: "Himalayan Treks" },
  { value: "12+", label: "Sacred Yatras" },
  { value: "10,000+", label: "Happy Travellers" },
  { value: "6", label: "Owned Homestays" },
];

const STEPS = [
  {
    num: "01",
    title: "Choose Your Adventure",
    desc: "Browse our curated treks, yatras, and packages. Filter by difficulty, region, or season to find your perfect journey.",
  },
  {
    num: "02",
    title: "Pick Dates & Group",
    desc: "Select your departure dates from available slots and tell us your group size. Group discounts from 6+ people.",
  },
  {
    num: "03",
    title: "Customize Add-ons",
    desc: "Add helicopter transfers, travel insurance, airport pickups, or photography packages to complete your experience.",
  },
  {
    num: "04",
    title: "Confirm & Pay",
    desc: "Secure your spot with a 30% advance. Pay the balance 30 days before departure. Full refund guarantee.",
  },
];

const REVIEWS = [
  {
    id: 1,
    quote:
      "Every detail was handled with such care. The Kedarkantha summit at sunrise, surrounded by snow-laden pines, is a memory I'll carry forever.",
    name: "Arjun Mehta",
    location: "Mumbai, Maharashtra",
    trip: "Kedarkantha Trek",
    rating: 5,
  },
  {
    id: 2,
    quote:
      "The Char Dham Yatra with TrekRoots was transcendent. Their expert guides made the spiritual journey as smooth as it was profound.",
    name: "Priya Sharma",
    location: "Bengaluru, Karnataka",
    trip: "Char Dham Yatra",
    rating: 5,
  },
  {
    id: 3,
    quote:
      "Spiti Valley left me speechless. TrekRoots' local knowledge opened doors — remote monasteries, hidden villages — that no other operator offered.",
    name: "Vikram Nair",
    location: "Delhi, NCR",
    trip: "Spiti Valley Expedition",
    rating: 5,
  },
];

const ARTICLES = [
  {
    slug: "/blog/kedarkantha-complete-guide",
    category: "Trekking Guide",
    title: "Complete Guide to Kedarkantha Trek 2025–26",
    excerpt:
      "Everything you need — gear, fitness prep, itinerary, what to expect on the summit.",
    readTime: "8 min read",
    image: "/assets/generated/trek-kedarkantha.dim_800x600.jpg",
  },
  {
    slug: "/blog/char-dham-yatra-guide",
    category: "Yatra Guide",
    title: "Char Dham Yatra: Registration & Planning Guide",
    excerpt:
      "How to register, what to carry, which season to go, and how to make the most of your pilgrimage.",
    readTime: "10 min read",
    image: "/assets/generated/yatra-chardham.dim_800x600.jpg",
  },
  {
    slug: "/blog/spiti-valley-itinerary",
    category: "Destination Guide",
    title: "Spiti Valley Road Trip: The Complete Itinerary",
    excerpt:
      "Monasteries, permits, road conditions, best stays — a practical guide to the cold desert.",
    readTime: "12 min read",
    image: "/assets/generated/package-spiti.dim_800x600.jpg",
  },
];

// ─── Hero Carousel ────────────────────────────────────────────────────────────

function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
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

  const item = CAROUSEL_ITEMS[current];

  return (
    <section
      data-ocid="carousel.section"
      className="relative h-screen min-h-[600px] overflow-hidden"
    >
      {CAROUSEL_ITEMS.map((slide, i) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === current ? "opacity-100 z-[1]" : "opacity-0 z-0"
          }`}
          aria-hidden={i !== current}
        >
          <img
            src={slide.image}
            alt={slide.name}
            className="w-full h-full object-cover object-center"
            loading={i === 0 ? "eager" : "lazy"}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/5 to-black/70" />
        </div>
      ))}

      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pb-16 md:pb-20">
        <div className="lux-container flex justify-center">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="max-w-2xl w-full text-center"
          >
            <div className="flex items-center justify-center gap-4 mb-5 flex-wrap">
              <span className="lux-label text-[#FFC107]">Featured</span>
              <span className="w-px h-3 bg-white/30" aria-hidden />
              <span className="lux-label text-white/50">
                {item.category}
              </span>
              <span className="hidden sm:inline lux-label text-white/40">
                {item.duration} · {item.altitude}
              </span>
            </div>

            <h1 className="lux-heading-xl text-white mb-5 text-balance">
              {item.name}
            </h1>

            <p className="lux-body text-white/80 text-sm md:text-base max-w-lg mx-auto mb-8">
              {item.tagline}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href={item.slug}
                data-ocid={`carousel.explore_button.${current + 1}`}
                className="lux-btn-primary"
              >
                Explore {item.category === "YATRA" ? "Yatra" : "Trek"}
                <ArrowRight size={14} />
              </Link>
              <Link
                href={item.category === "YATRA" ? "/yatra" : "/treks"}
                data-ocid="carousel.view_all_button"
                className="lux-btn-outline"
              >
                View All Journeys
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      <button
        type="button"
        onClick={goPrev}
        data-ocid="carousel.prev_button"
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center border border-white/25 bg-white/10 backdrop-blur-sm text-white transition-all duration-300 hover:bg-white/20"
        aria-label="Previous slide"
      >
        <ArrowLeft size={16} />
      </button>
      <button
        type="button"
        onClick={goNext}
        data-ocid="carousel.next_button"
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center border border-white/25 bg-white/10 backdrop-blur-sm text-white transition-all duration-300 hover:bg-white/20"
        aria-label="Next slide"
      >
        <ArrowRight size={16} />
      </button>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {CAROUSEL_ITEMS.map((_, i) => (
          <button
            // biome-ignore lint/suspicious/noArrayIndexKey: fixed carousel dot order
            key={`dot-${i}`}
            type="button"
            onClick={() => goTo(i)}
            data-ocid={`carousel.dot.${i + 1}`}
            className={`transition-all duration-300 ${
              i === current
                ? "w-7 h-1 bg-[#FFE082]"
                : "w-1.5 h-1.5 bg-white/40 hover:bg-white/60"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function HomePage() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <div className="bg-white">
      <HeroCarousel />

      {/* ── How It Works ─────────────────────────────────────────────────── */}
      <section data-ocid="how_it_works.section" className="lux-section-white">
        <div className="lux-container">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14 md:mb-16"
          >
            <p className="lux-label mb-4">Simple Process</p>
            <h2 className="lux-heading-lg text-[#1A1A1A] mb-5">How It Works</h2>
            <p className="lux-body text-base max-w-md mx-auto">
              From choosing your adventure to summiting the peak — we handle
              every detail.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative bg-white p-8 md:p-10"
              >
                <span className="font-display text-5xl text-[#FFC107] leading-none mb-6 block">
                  {step.num}
                </span>
                <h3 className="font-display text-lg text-[#1A1A1A] mb-3 leading-snug">
                  {step.title}
                </h3>
                <p className="lux-body text-sm">{step.desc}</p>
                {i < STEPS.length - 1 && (
                  <div
                    className="hidden lg:flex absolute top-1/2 -translate-y-1/2 -right-3 z-10 w-6 h-6 bg-[#FFE082] items-center justify-center"
                    aria-hidden
                  >
                    <ArrowRight size={12} className="text-[#1A1A1A]" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Treks ─────────────────────────────────────────────── */}
      <section data-ocid="treks.section" className="lux-section-muted">
        <div className="lux-container">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4"
          >
            <div>
              <p className="lux-label mb-4">Curated Experiences</p>
              <h2 className="lux-heading-lg text-[#1A1A1A] mb-3">Featured Treks</h2>
              <div className="w-10 h-px bg-[#FFC107] mb-4" />
              <p className="lux-body text-sm max-w-md">
                Snow-dusted winter trails, monsoon meadows, and granite
                ridgelines — the finest Himalayan treks, curated for all levels.
              </p>
            </div>
            <Link
              href="/treks"
              data-ocid="treks.view_all_link"
              className="lux-link shrink-0"
            >
              View All Treks <ArrowRight size={14} />
            </Link>
          </motion.div>

          <FeaturedCardCarousel
            ocidPrefix="treks"
            surface="muted"
            items={FEATURED_TREKS.map((t) => ({
              ...t,
              badge: "Trek",
              badgeTone: "trek" as const,
            }))}
          />
        </div>
      </section>

      {/* ── Sacred Yatras ─────────────────────────────────────────────── */}
      <section data-ocid="yatras.section" className="lux-section-white">
        <div className="lux-container">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4"
          >
            <div>
              <p className="lux-label mb-4">Curated Experiences</p>
              <h2 className="lux-heading-lg text-[#1A1A1A] mb-3">Sacred Yatras</h2>
              <div className="w-10 h-px bg-[#FFC107] mb-4" />
              <p className="lux-body text-sm max-w-md">
                Ancient temples, holy rivers, and divine Himalayan abodes —
                guided pilgrimages that nourish the soul.
              </p>
            </div>
            <Link
              href="/yatra"
              data-ocid="yatras.view_all_link"
              className="lux-link shrink-0"
            >
              View All Yatras <ArrowRight size={14} />
            </Link>
          </motion.div>

          <FeaturedCardCarousel
            ocidPrefix="yatras"
            surface="white"
            items={FEATURED_YATRAS.map((y) => ({
              id: y.id,
              slug: y.slug,
              name: y.name,
              region: y.region,
              duration: y.duration,
              temples: y.temples,
              price: y.price,
              image: y.image,
              season: y.season,
              type: y.type,
              typeColor: y.typeColor,
              badge: "Yatra",
              badgeTone: "yatra" as const,
            }))}
          />
        </div>
      </section>

      {/* ── Stats ─────────────────────────────────────────────────────── */}
      <section data-ocid="stats.section" className="lux-section-dark py-16 md:py-20">
        <div className="lux-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-white/10">
            {PAGE_STATS.map((s, i) => (
              <motion.div
                key={`stat-${s.label}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="text-center py-8 px-4 md:px-6"
              >
                <div className="font-display text-5xl md:text-6xl text-[#FFC107] leading-none mb-2">
                  {s.value}
                </div>
                <div className="font-body text-[10px] md:text-xs font-medium uppercase tracking-[0.18em] text-white/50">
                  {s.label}
                </div>
                <div className="w-6 h-px bg-[#FFE082]/40 mx-auto mt-4" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────────────── */}
      <section data-ocid="testimonials.section" className="lux-section-white">
        <div className="lux-container">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14 md:mb-16"
          >
            <p className="lux-label mb-4">Voices from the Trail</p>
            <h2 className="lux-heading-lg text-[#1A1A1A] mb-4">
              What Our Travellers Say
            </h2>
            <div className="flex items-center justify-center gap-1.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  size={14}
                  className="fill-sand text-[#FFC107]"
                />
              ))}
              <span className="font-body text-xs text-muted-foreground ml-2">
                4.9/5 · 2,400+ reviews
              </span>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {REVIEWS.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="p-8 border border-border bg-white flex flex-col"
                data-ocid={`testimonials.item.${i + 1}`}
              >
                <div className="flex items-center gap-1 mb-5">
                  {Array.from({ length: t.rating }).map((_, si) => (
                    <Star
                      key={`star-${t.name}-${si}`}
                      size={12}
                      className="fill-sand text-[#FFC107]"
                    />
                  ))}
                </div>
                <p className="font-quote text-base leading-relaxed text-[#1A1A1A] flex-1 mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="w-8 h-px bg-[#FFE082] mb-5" />
                <div>
                  <p className="font-body font-semibold text-sm text-[#1A1A1A]">
                    {t.name}
                  </p>
                  <p className="font-body text-xs text-muted-foreground mt-0.5">
                    {t.location} · {t.trip}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trust Badges ─────────────────────────────────────────────── */}
      <section
        data-ocid="trust.section"
        className="py-12 md:py-16 bg-canvas border-y border-border"
      >
        <div className="lux-container">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-px bg-border">
            {(
              [
                {
                  icon: <Mountain size={18} />,
                  label: "Uttarakhand Tourism",
                  sub: "Registered Operator",
                },
                {
                  icon: <Shield size={18} />,
                  label: "IMF Affiliated",
                  sub: "Indian Mountaineering Foundation",
                },
                {
                  icon: <Star size={18} />,
                  label: "4.9 / 5 Google",
                  sub: "2,400+ Verified Reviews",
                },
                {
                  icon: <Users size={18} />,
                  label: "10,000+ Travellers",
                  sub: "Across 30+ Himalayan Routes",
                },
                {
                  icon: <MapPin size={18} />,
                  label: "Owned Homestays",
                  sub: "6 Properties in Uttarakhand",
                },
              ] as { icon: React.ReactNode; label: string; sub: string }[]
            ).map((badge, i) => (
              <motion.div
                key={badge.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
                className="flex items-center gap-3 py-5 px-5 bg-white"
                data-ocid={`trust.item.${i + 1}`}
              >
                <div className="text-[#FFC107] shrink-0">{badge.icon}</div>
                <div>
                  <p className="font-body font-semibold text-xs text-[#1A1A1A]">
                    {badge.label}
                  </p>
                  <p className="font-body text-[10px] text-muted-foreground mt-0.5">
                    {badge.sub}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Newsletter CTA ────────────────────────────────────────────── */}
      <section data-ocid="newsletter.section" className="lux-section-dark">
        <div className="lux-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="lux-label text-[#FFC107] mb-4">Stay Informed</p>
              <h2 className="lux-heading-lg text-white mb-4">
                Plan Your Himalayan Journey
              </h2>
              <p className="lux-body text-sm text-white/60 mb-8">
                Get seasonal trek updates, yatra opening dates, weather
                advisories and exclusive early-bird deals.
              </p>
              {subscribed ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  data-ocid="newsletter.success_state"
                  className="flex items-center gap-3 px-5 py-4 border border-sienna/30 bg-[#FFC107]/10"
                >
                  <CheckCircle2 size={16} className="text-[#FFC107] shrink-0" />
                  <span className="font-body text-sm text-[#FFC107]">
                    You're in! Watch your inbox for Himalayan updates.
                  </span>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubscribe}
                  className="flex flex-col sm:flex-row gap-3"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    data-ocid="newsletter.input"
                    required
                    className="flex-1 px-5 py-3.5 font-body text-sm bg-white/5 border border-white/20 text-white placeholder:text-white/30 focus:outline-none focus:border-[#FFC107] transition-colors"
                  />
                  <button
                    type="submit"
                    data-ocid="newsletter.submit_button"
                    className="lux-btn-accent shrink-0"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="p-8 border border-white/10 bg-white/5"
            >
              <h3 className="font-display text-xl text-white mb-3">
                Need Help Planning?
              </h3>
              <p className="lux-body text-sm text-white/55 mb-6">
                Talk to a Himalayan travel expert. Free 30-minute consultation —
                no commitment required.
              </p>
              <div className="flex flex-col gap-3">
                <a
                  href="tel:+919999999999"
                  data-ocid="newsletter.call_button"
                  className="lux-btn-accent"
                >
                  Call +91 99999 99999
                </a>
                <a
                  href="https://wa.me/919999999999?text=Hi%20TrekRoots!%20I'd%20like%20to%20plan%20a%20Himalayan%20trip."
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ocid="newsletter.whatsapp_button"
                  className="lux-btn-outline"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Chat on WhatsApp
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Blog Teaser ───────────────────────────────────────────────── */}
      <section data-ocid="blog.section" className="lux-section-white">
        <div className="lux-container">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4"
          >
            <div>
              <p className="lux-label mb-4">Stories from the Mountains</p>
              <h2 className="lux-heading-lg text-[#1A1A1A]">
                Travel Guides &amp; Insights
              </h2>
            </div>
            <Link
              href="/blog"
              data-ocid="blog.view_all_link"
              className="lux-link shrink-0"
            >
              All Articles <ArrowRight size={14} />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ARTICLES.map((post, i) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                data-ocid={`blog.item.${i + 1}`}
              >
                <Link href={post.slug} className="group block">
                  <div className="lux-editorial-card mb-5">
                    <div className="relative h-[240px]">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                        loading="lazy"
                      />
                      <div className="lux-editorial-overlay opacity-60" />
                      <div className="absolute top-4 left-4 z-10">
                        <span className="lux-label text-[9px] tracking-[0.18em] px-2.5 py-1 bg-[#FFE082]/90 text-[#1A1A1A]">
                          {post.category}
                        </span>
                      </div>
                    </div>
                  </div>
                  <h3 className="font-display text-lg text-[#1A1A1A] leading-snug mb-2 group-hover:text-[#FFC107] transition-colors duration-300">
                    {post.title}
                  </h3>
                  <p className="lux-body text-sm mb-3">{post.excerpt}</p>
                  <span className="lux-label text-[10px] text-[#FFC107]">
                    {post.readTime}
                  </span>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
