import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  MapPin,
  Mountain,
  Shield,
  Star,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

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
    typeColor: "#C04000",
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
      "The Char Dham Yatra with Manya was transcendent. Their expert guides made the spiritual journey as smooth as it was profound.",
    name: "Priya Sharma",
    location: "Bengaluru, Karnataka",
    trip: "Char Dham Yatra",
    rating: 5,
  },
  {
    id: 3,
    quote:
      "Spiti Valley left me speechless. Manya's local knowledge opened doors — remote monasteries, hidden villages — that no other operator offered.",
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

// ─── Sub-components ──────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: string }) {
  return (
    <p
      className="text-[11px] font-body font-semibold uppercase tracking-[0.2em] mb-4"
      style={{ color: "#C04000" }}
    >
      {children}
    </p>
  );
}

function SectionTitle({
  children,
  centered = false,
}: { children: React.ReactNode; centered?: boolean }) {
  return (
    <h2
      className={`font-display text-[36px] md:text-[48px] font-bold leading-[1.1] mb-5 ${
        centered ? "text-center" : ""
      }`}
      style={{ fontStyle: "italic", color: "#1A1A1A" }}
    >
      {children}
    </h2>
  );
}

function SubSectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-start mb-6">
      <h3
        className="font-display text-[28px] md:text-[34px] font-bold leading-[1.1]"
        style={{ fontStyle: "italic", color: "#1A1A1A" }}
      >
        {children}
      </h3>
      <div
        className="w-12 h-[3px] mt-3"
        style={{ backgroundColor: "#C04000" }}
      />
    </div>
  );
}

function TrekCard({
  item,
  index,
}: { item: (typeof FEATURED_TREKS)[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group rounded-2xl overflow-hidden cursor-pointer flex-shrink-0 w-[280px] md:w-auto"
      style={{ boxShadow: "0 2px 16px rgba(60,20,20,0.08)" }}
    >
      <Link to={item.slug} data-ocid={`treks.item.${index + 1}`}>
        <div className="relative" style={{ height: "280px" }}>
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, transparent 40%, rgba(28,10,10,0.9) 100%)",
            }}
          />
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span
              className="text-[10px] font-body font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full"
              style={{ backgroundColor: "#E6BE8A", color: "#3C1414" }}
            >
              TREK
            </span>
            <span
              className="text-[10px] font-body font-medium px-2 py-0.5 rounded-full"
              style={{
                backgroundColor: `${item.difficultyColor}30`,
                color: item.difficultyColor,
              }}
            >
              {item.difficulty}
            </span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <h4
              className="font-display text-[17px] font-bold text-white leading-snug mb-2"
              style={{ fontStyle: "italic" }}
            >
              {item.name}
            </h4>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1 text-[11px] font-body text-white/70">
                  <Clock size={10} /> {item.duration}
                </span>
                <span className="flex items-center gap-1 text-[11px] font-body text-white/70">
                  <Mountain size={10} /> {item.altitude}
                </span>
              </div>
              <span
                className="text-[14px] font-body font-bold"
                style={{ color: "#ED872D" }}
              >
                {item.price}
              </span>
            </div>
          </div>
        </div>
        <div
          className="px-5 py-4 flex items-center justify-between"
          style={{ backgroundColor: "#FAFAF7", borderTop: "1px solid #E5DDD0" }}
        >
          <div className="flex items-center gap-2">
            <MapPin size={12} style={{ color: "#C04000" }} />
            <span
              className="font-body text-[12px]"
              style={{ color: "#7A7A7A" }}
            >
              {item.region}
            </span>
            <span
              className="font-body text-[11px] px-2 py-0.5 rounded"
              style={{ backgroundColor: "#F5F0E8", color: "#4A4A4A" }}
            >
              {item.season}
            </span>
          </div>
          <span
            className="flex items-center gap-1 text-[11px] font-body font-semibold transition-colors group-hover:opacity-70"
            style={{ color: "#C04000" }}
          >
            Explore <ArrowRight size={11} />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

function YatraCard({
  item,
  index,
}: { item: (typeof FEATURED_YATRAS)[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group rounded-2xl overflow-hidden cursor-pointer flex-shrink-0 w-[280px] md:w-auto"
      style={{ boxShadow: "0 2px 16px rgba(60,20,20,0.08)" }}
    >
      <Link to={item.slug} data-ocid={`yatras.item.${index + 1}`}>
        <div className="relative" style={{ height: "300px" }}>
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div
            className="absolute top-4 right-4 w-12 h-12 rounded-full flex items-center justify-center text-2xl"
            style={{
              backgroundColor: "rgba(237,135,45,0.85)",
              backdropFilter: "blur(4px)",
              border: "2px solid rgba(230,190,138,0.6)",
            }}
            aria-hidden
          >
            🕉️
          </div>
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, transparent 35%, rgba(60,20,20,0.92) 100%)",
            }}
          />
          <div className="absolute top-4 left-4">
            <span
              className="text-[10px] font-body font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full"
              style={{ backgroundColor: "#ED872D", color: "#fff" }}
            >
              YATRA
            </span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <span
              className="text-[10px] font-body font-medium px-2.5 py-1 rounded-full mb-2 inline-block"
              style={{
                backgroundColor: `${item.typeColor}25`,
                color: item.typeColor,
              }}
            >
              {item.type}
            </span>
            <h4
              className="font-display text-[18px] font-bold text-white leading-snug mb-2"
              style={{ fontStyle: "italic" }}
            >
              {item.name}
            </h4>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1 text-[11px] font-body text-white/70">
                  <Clock size={10} /> {item.duration}
                </span>
                <span className="text-[11px] font-body text-white/60">
                  {item.temples}
                </span>
              </div>
              <span
                className="text-[14px] font-body font-bold"
                style={{ color: "#ED872D" }}
              >
                {item.price}
              </span>
            </div>
          </div>
        </div>
        <div
          className="px-5 py-4 flex items-center justify-between"
          style={{ backgroundColor: "#FAFAF7", borderTop: "1px solid #E5DDD0" }}
        >
          <div className="flex items-center gap-2">
            <MapPin size={12} style={{ color: "#ED872D" }} />
            <span
              className="font-body text-[12px]"
              style={{ color: "#7A7A7A" }}
            >
              {item.region}
            </span>
            <span
              className="font-body text-[11px] px-2 py-0.5 rounded"
              style={{ backgroundColor: "#FFF3E8", color: "#C04000" }}
            >
              {item.season}
            </span>
          </div>
          <span
            className="flex items-center gap-1 text-[11px] font-body font-semibold transition-colors group-hover:opacity-70"
            style={{ color: "#ED872D" }}
          >
            Explore <ArrowRight size={11} />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

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
    timerRef.current = setTimeout(goNext, 5000);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [goNext]);

  const item = CAROUSEL_ITEMS[current];

  return (
    <section
      data-ocid="carousel.section"
      className="relative overflow-hidden"
      style={{ height: "90vh", minHeight: "580px" }}
    >
      {CAROUSEL_ITEMS.map((slide, i) => (
        <div
          key={slide.id}
          className="absolute inset-0 transition-opacity duration-700"
          style={{
            opacity: i === current ? 1 : 0,
            zIndex: i === current ? 1 : 0,
          }}
          aria-hidden={i !== current}
        >
          <img
            src={slide.image}
            alt={slide.name}
            className="w-full h-full object-cover object-center"
            loading={i === 0 ? "eager" : "lazy"}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.04) 35%, rgba(0,0,0,0.68) 100%)",
            }}
          />
        </div>
      ))}

      <div className="absolute inset-0 z-10 flex flex-col justify-end pb-20 px-6 md:px-16 max-w-[1200px] mx-auto left-0 right-0">
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-[720px]"
        >
          <div className="flex items-center gap-3 mb-4">
            <span
              className="text-[11px] font-body font-bold uppercase tracking-[0.22em] px-3 py-1.5 rounded-full"
              style={{
                backgroundColor:
                  item.category === "YATRA" ? "#ED872D" : "#E6BE8A",
                color: "#3C1414",
              }}
            >
              {item.category}
            </span>
            <span className="text-white/60 font-body text-[12px] uppercase tracking-widest">
              {item.duration} &bull; {item.altitude}
            </span>
          </div>

          <h2
            className="font-display font-bold text-white leading-[1.0] mb-4"
            style={{
              fontStyle: "italic",
              fontSize: "clamp(32px, 5vw, 64px)",
              textShadow: "0 2px 24px rgba(0,0,0,0.35)",
            }}
          >
            {item.name}
          </h2>

          <p
            className="font-body text-white/85 leading-relaxed mb-8"
            style={{ fontSize: "clamp(14px, 1.6vw, 17px)", maxWidth: "520px" }}
          >
            {item.tagline}
          </p>

          <Link
            to={item.slug}
            data-ocid={`carousel.explore_button.${current + 1}`}
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-body font-semibold text-[14px] transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
            style={{ backgroundColor: "#3C1414", color: "#E6BE8A" }}
          >
            Explore {item.category === "YATRA" ? "Yatra" : "Trek"}{" "}
            <ArrowRight size={15} />
          </Link>
        </motion.div>
      </div>

      <button
        type="button"
        onClick={goPrev}
        data-ocid="carousel.prev_button"
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
        aria-label="Previous slide"
        style={{
          backgroundColor: "rgba(255,255,255,0.18)",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(255,255,255,0.25)",
        }}
      >
        <ArrowLeft size={18} color="white" />
      </button>
      <button
        type="button"
        onClick={goNext}
        data-ocid="carousel.next_button"
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
        aria-label="Next slide"
        style={{
          backgroundColor: "rgba(255,255,255,0.18)",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(255,255,255,0.25)",
        }}
      >
        <ArrowRight size={18} color="white" />
      </button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5">
        {CAROUSEL_ITEMS.map((_, i) => (
          <button
            // biome-ignore lint/suspicious/noArrayIndexKey: fixed carousel dot order
            key={`dot-${i}`}
            type="button"
            onClick={() => goTo(i)}
            data-ocid={`carousel.dot.${i + 1}`}
            className="transition-all duration-300 rounded-full"
            aria-label={`Go to slide ${i + 1}`}
            style={{
              width: i === current ? "28px" : "8px",
              height: "8px",
              backgroundColor:
                i === current ? "#E6BE8A" : "rgba(255,255,255,0.45)",
            }}
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
    <div style={{ backgroundColor: "#FAFAF7" }}>
      {/* ── Hero ───────────────────────────────────────────────────── */}
      <section
        data-ocid="hero.section"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0">
          <img
            src="/assets/generated/hero-himalaya.dim_1920x1080.jpg"
            alt="Himalayan mountains at golden hour"
            className="w-full h-full object-cover object-center"
            fetchPriority="high"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.05) 40%, rgba(0,0,0,0.55) 100%)",
            }}
          />
        </div>

        <div className="relative z-10 text-center px-6 max-w-[860px] mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[11px] font-body font-semibold uppercase tracking-[0.3em] text-white/80 mb-6"
          >
            Uttarakhand &bull; Himachal Pradesh
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="font-display font-bold text-white leading-[1.05] mb-6"
            style={{
              fontStyle: "italic",
              fontSize: "clamp(42px, 7vw, 88px)",
              textShadow: "0 2px 32px rgba(0,0,0,0.3)",
            }}
          >
            Journeys That Stay With You Forever
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="font-body text-white/85 leading-relaxed mb-10 mx-auto"
            style={{ fontSize: "clamp(15px, 2vw, 18px)", maxWidth: "560px" }}
          >
            Expert-guided treks, sacred yatras, and handcrafted Himalayan
            experiences — from our family to yours.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <Link
              to="/treks"
              data-ocid="hero.explore_treks_button"
              className="flex items-center gap-2 px-7 py-3.5 rounded-full font-body font-semibold text-[14px] transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
              style={{ backgroundColor: "#3C1414", color: "#E6BE8A" }}
            >
              Explore Treks <ArrowRight size={14} />
            </Link>
            <Link
              to="/packages"
              data-ocid="hero.view_packages_button"
              className="flex items-center gap-2 px-7 py-3.5 rounded-full font-body font-semibold text-[14px] border border-white/50 text-white backdrop-blur-sm bg-white/10 transition-all duration-200 hover:bg-white/20"
            >
              View Packages
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="absolute bottom-8 left-0 right-0 z-10 px-6"
        >
          <div
            className="max-w-2xl mx-auto flex items-center justify-center gap-6 md:gap-10 py-4 px-8 rounded-2xl"
            style={{
              backgroundColor: "rgba(255,255,255,0.12)",
              backdropFilter: "blur(16px)",
              border: "1px solid rgba(255,255,255,0.2)",
            }}
          >
            {PAGE_STATS.map((s) => (
              <div key={s.label} className="text-center">
                <div
                  className="font-display font-bold text-white"
                  style={{
                    fontSize: "clamp(16px, 2.5vw, 22px)",
                    fontStyle: "italic",
                  }}
                >
                  {s.value}
                </div>
                <div className="font-body text-white/70 text-[10px] tracking-wide uppercase">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="absolute bottom-32 left-1/2 -translate-x-1/2 z-10"
          aria-hidden
        >
          <div
            className="w-[1px] h-12 mx-auto"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.6), transparent)",
            }}
          />
        </motion.div>
      </section>

      {/* ── Sliding Carousel ──────────────────────────────────────────────── */}
      <HeroCarousel />

      {/* ── How It Works ─────────────────────────────────────────────────── */}
      <section
        data-ocid="how_it_works.section"
        className="py-24 md:py-32 px-6"
        style={{ backgroundColor: "#FAFAF7" }}
      >
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <SectionLabel>Simple Process</SectionLabel>
            <SectionTitle centered>How It Works</SectionTitle>
            <p
              className="font-body text-[16px] leading-relaxed mx-auto"
              style={{ maxWidth: "480px", color: "#7A7A7A" }}
            >
              From choosing your adventure to summiting the peak — we handle
              every detail.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative p-8 rounded-2xl"
                style={{
                  backgroundColor: "#F5F0E8",
                  border: "1px solid #E5DDD0",
                }}
              >
                <div
                  className="font-display font-bold text-[44px] leading-none mb-5 block"
                  style={{ color: "#E6BE8A", fontStyle: "italic" }}
                >
                  {step.num}
                </div>
                <h3
                  className="font-display font-bold text-[18px] mb-3 leading-snug"
                  style={{ color: "#1A1A1A", fontStyle: "italic" }}
                >
                  {step.title}
                </h3>
                <p
                  className="font-body text-[13px] leading-relaxed"
                  style={{ color: "#7A7A7A" }}
                >
                  {step.desc}
                </p>
                {i < STEPS.length - 1 && (
                  <div
                    className="hidden lg:flex absolute top-1/2 -translate-y-1/2 -right-3 z-10 w-6 h-6 rounded-full items-center justify-center"
                    style={{ backgroundColor: "#E6BE8A" }}
                    aria-hidden
                  >
                    <ArrowRight size={12} color="#3C1414" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Treks ─────────────────────────────────────────────── */}
      <section
        data-ocid="treks.section"
        className="py-24 md:py-32 px-6"
        style={{ backgroundColor: "#EDE8DC" }}
      >
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4"
          >
            <div>
              <SectionLabel>Curated Experiences</SectionLabel>
              <SubSectionHeading>Featured Treks</SubSectionHeading>
              <p
                className="font-body text-[15px]"
                style={{ color: "#7A7A7A", maxWidth: "440px" }}
              >
                Snow-dusted winter trails, monsoon meadows, and granite
                ridgelines — the finest Himalayan treks, curated for all levels.
              </p>
            </div>
            <Link
              to="/treks"
              data-ocid="treks.view_all_link"
              className="flex items-center gap-2 font-body text-[13px] font-semibold shrink-0 transition-opacity hover:opacity-70"
              style={{ color: "#3C1414" }}
            >
              View All Treks <ArrowRight size={14} />
            </Link>
          </motion.div>

          <div
            className="flex gap-5 overflow-x-auto pb-4 md:pb-0 md:grid md:grid-cols-4 md:overflow-visible -mx-6 px-6 md:mx-0 md:px-0"
            style={{ scrollbarWidth: "none" }}
          >
            {FEATURED_TREKS.map((item, i) => (
              <TrekCard key={item.id} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Sacred Yatras ─────────────────────────────────────────────── */}
      <section
        data-ocid="yatras.section"
        className="py-24 md:py-32 px-6"
        style={{ backgroundColor: "#FAFAF7" }}
      >
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4"
          >
            <div>
              <SectionLabel>Curated Experiences</SectionLabel>
              <SubSectionHeading>Sacred Yatras</SubSectionHeading>
              <p
                className="font-body text-[15px]"
                style={{ color: "#7A7A7A", maxWidth: "440px" }}
              >
                Ancient temples, holy rivers, and divine Himalayan abodes —
                guided pilgrimages that nourish the soul.
              </p>
            </div>
            <Link
              to="/yatra"
              data-ocid="yatras.view_all_link"
              className="flex items-center gap-2 font-body text-[13px] font-semibold shrink-0 transition-opacity hover:opacity-70"
              style={{ color: "#C04000" }}
            >
              View All Yatras <ArrowRight size={14} />
            </Link>
          </motion.div>

          <div
            className="flex gap-5 overflow-x-auto pb-4 md:pb-0 md:grid md:grid-cols-4 md:overflow-visible -mx-6 px-6 md:mx-0 md:px-0"
            style={{ scrollbarWidth: "none" }}
          >
            {FEATURED_YATRAS.map((item, i) => (
              <YatraCard key={item.id} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats ─────────────────────────────────────────────────────── */}
      <section
        data-ocid="stats.section"
        className="py-20 px-6"
        style={{ backgroundColor: "#3C1414" }}
      >
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-white/10">
            {PAGE_STATS.map((s, i) => (
              <motion.div
                key={`stat-${s.label}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="text-center py-8 px-6"
              >
                <div
                  className="font-display font-bold text-[52px] md:text-[64px] leading-none mb-2"
                  style={{ color: "#E6BE8A", fontStyle: "italic" }}
                >
                  {s.value}
                </div>
                <div
                  className="font-body text-[12px] font-medium uppercase tracking-widest"
                  style={{ color: "rgba(230,190,138,0.6)" }}
                >
                  {s.label}
                </div>
                <div
                  className="w-8 h-[2px] mx-auto mt-4"
                  style={{ backgroundColor: "#E6BE8A" }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────────────── */}
      <section
        data-ocid="testimonials.section"
        className="py-24 md:py-32 px-6"
        style={{ backgroundColor: "#FAFAF7" }}
      >
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <SectionLabel>Voices from the Trail</SectionLabel>
            <SectionTitle centered>What Our Travellers Say</SectionTitle>
            <div className="flex items-center justify-center gap-2 mt-2">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} size={16} fill="#E6BE8A" color="#E6BE8A" />
              ))}
              <span
                className="font-body text-[13px] ml-2"
                style={{ color: "#7A7A7A" }}
              >
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
                className="p-8 rounded-2xl flex flex-col"
                style={{
                  backgroundColor: "#F5F0E8",
                  border: "1px solid #E5DDD0",
                }}
                data-ocid={`testimonials.item.${i + 1}`}
              >
                <div className="flex items-center gap-1 mb-5">
                  {Array.from({ length: t.rating }).map((_, si) => (
                    <Star
                      key={`star-${t.name}-${si}`}
                      size={13}
                      fill="#E6BE8A"
                      color="#E6BE8A"
                    />
                  ))}
                </div>
                <p
                  className="font-display text-[17px] leading-relaxed flex-1 mb-6"
                  style={{ fontStyle: "italic", color: "#1A1A1A" }}
                >
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div
                  className="w-12 h-[1px] mb-5"
                  style={{ backgroundColor: "#E6BE8A" }}
                />
                <div>
                  <p
                    className="font-body font-semibold text-[13px]"
                    style={{ color: "#1A1A1A" }}
                  >
                    {t.name}
                  </p>
                  <p
                    className="font-body text-[12px] mt-0.5"
                    style={{ color: "#7A7A7A" }}
                  >
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
        className="py-16 px-6"
        style={{
          backgroundColor: "#F5F0E8",
          borderTop: "1px solid #E5DDD0",
          borderBottom: "1px solid #E5DDD0",
        }}
      >
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {(
              [
                {
                  icon: <Mountain size={20} />,
                  label: "Uttarakhand Tourism",
                  sub: "Registered Operator",
                },
                {
                  icon: <Shield size={20} />,
                  label: "IMF Affiliated",
                  sub: "Indian Mountaineering Foundation",
                },
                {
                  icon: <Star size={20} />,
                  label: "4.9 / 5 Google",
                  sub: "2,400+ Verified Reviews",
                },
                {
                  icon: <Users size={20} />,
                  label: "10,000+ Travellers",
                  sub: "Across 30+ Himalayan Routes",
                },
                {
                  icon: <MapPin size={20} />,
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
                className="flex items-center gap-3 py-4 px-5 rounded-xl"
                style={{
                  backgroundColor: "#FAFAF7",
                  border: "1px solid #E5DDD0",
                }}
                data-ocid={`trust.item.${i + 1}`}
              >
                <div style={{ color: "#C04000" }}>{badge.icon}</div>
                <div>
                  <p
                    className="font-body font-semibold text-[13px]"
                    style={{ color: "#1A1A1A" }}
                  >
                    {badge.label}
                  </p>
                  <p
                    className="font-body text-[11px]"
                    style={{ color: "#7A7A7A" }}
                  >
                    {badge.sub}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Newsletter CTA ────────────────────────────────────────────── */}
      <section
        data-ocid="newsletter.section"
        className="py-20 px-6"
        style={{ backgroundColor: "#3C1414" }}
      >
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p
                className="text-[11px] font-body font-semibold uppercase tracking-[0.2em] mb-4"
                style={{ color: "#ED872D" }}
              >
                Stay Informed
              </p>
              <h2
                className="font-display font-bold text-white mb-4 leading-[1.1]"
                style={{
                  fontStyle: "italic",
                  fontSize: "clamp(28px, 3.5vw, 40px)",
                }}
              >
                Plan Your Himalayan Journey
              </h2>
              <p
                className="font-body text-[14px] leading-relaxed mb-8"
                style={{ color: "rgba(255,255,255,0.65)" }}
              >
                Get seasonal trek updates, yatra opening dates, weather
                advisories and exclusive early-bird deals.
              </p>
              {subscribed ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  data-ocid="newsletter.success_state"
                  className="flex items-center gap-3 px-5 py-3.5 rounded-xl"
                  style={{
                    backgroundColor: "rgba(230,190,138,0.15)",
                    border: "1px solid rgba(230,190,138,0.3)",
                  }}
                >
                  <Star size={16} fill="#E6BE8A" color="#E6BE8A" />
                  <span
                    className="font-body text-[13px] font-medium"
                    style={{ color: "#E6BE8A" }}
                  >
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
                    className="flex-1 px-5 py-3.5 rounded-full font-body text-[14px] outline-none bg-white/10 border border-white/20 text-white placeholder-white/40 focus:border-[#E6BE8A]/60 transition-colors"
                  />
                  <button
                    type="submit"
                    data-ocid="newsletter.submit_button"
                    className="px-7 py-3.5 rounded-full font-body font-semibold text-[13px] shrink-0 transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
                    style={{ backgroundColor: "#E6BE8A", color: "#3C1414" }}
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
              className="p-8 rounded-2xl"
              style={{
                backgroundColor: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.12)",
              }}
            >
              <h3
                className="font-display font-bold text-white text-[22px] mb-3"
                style={{ fontStyle: "italic" }}
              >
                Need Help Planning?
              </h3>
              <p
                className="font-body text-[13px] leading-relaxed mb-6"
                style={{ color: "rgba(255,255,255,0.6)" }}
              >
                Talk to a Himalayan travel expert. Free 30-minute consultation —
                no commitment required.
              </p>
              <div className="flex flex-col gap-3">
                <a
                  href="tel:+919999999999"
                  data-ocid="newsletter.call_button"
                  className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-body font-semibold text-[13px] transition-all duration-200 hover:opacity-90"
                  style={{ backgroundColor: "#E6BE8A", color: "#3C1414" }}
                >
                  Call +91 99999 99999
                </a>
                <a
                  href="https://wa.me/919999999999?text=Hi%20Manya%20Destination!%20I'd%20like%20to%20plan%20a%20Himalayan%20trip."
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ocid="newsletter.whatsapp_button"
                  className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-body font-medium text-[13px] transition-all duration-200 hover:bg-white/15"
                  style={{
                    border: "1px solid rgba(255,255,255,0.25)",
                    color: "rgba(255,255,255,0.8)",
                  }}
                >
                  <svg
                    width="16"
                    height="16"
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
      <section
        data-ocid="blog.section"
        className="py-24 md:py-32 px-6"
        style={{ backgroundColor: "#FAFAF7" }}
      >
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4"
          >
            <div>
              <SectionLabel>Stories from the Mountains</SectionLabel>
              <SectionTitle>Travel Guides &amp; Insights</SectionTitle>
            </div>
            <Link
              to="/blog"
              data-ocid="blog.view_all_link"
              className="flex items-center gap-2 font-body text-[13px] font-semibold shrink-0 transition-opacity hover:opacity-70"
              style={{ color: "#3C1414" }}
            >
              All Articles <ArrowRight size={14} />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ARTICLES.map((post, i) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                data-ocid={`blog.item.${i + 1}`}
              >
                <Link to={post.slug} className="group block">
                  <div
                    className="relative rounded-xl overflow-hidden mb-5"
                    style={{ height: "220px" }}
                  >
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-4">
                      <span
                        className="text-[10px] font-body font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full"
                        style={{ backgroundColor: "#E6BE8A", color: "#3C1414" }}
                      >
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <h3
                    className="font-display font-bold text-[18px] leading-snug mb-2 group-hover:opacity-70 transition-opacity"
                    style={{ fontStyle: "italic", color: "#1A1A1A" }}
                  >
                    {post.title}
                  </h3>
                  <p
                    className="font-body text-[13px] leading-relaxed mb-3"
                    style={{ color: "#7A7A7A" }}
                  >
                    {post.excerpt}
                  </p>
                  <span
                    className="font-body text-[11px] font-medium uppercase tracking-wide"
                    style={{ color: "#C04000" }}
                  >
                    {post.readTime}
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
