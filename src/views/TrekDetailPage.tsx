"use client";

import type { DayItinerary, Trek } from "@/data";
import {
  getAllTreks,
  getTrekBySlug,
  getTrekHeroImages,
  getTrekFacts,
} from "@/data";
import { TrekCard } from "@/components/TrekCard";
import { AdvantageGrid } from "@/components/home/AdvantageGrid";
import { TreksByCategory } from "@/components/home/TreksByCategory";
import { DetailFeePanel } from "@/components/detail/DetailFeePanel";
import {
  DetailFactsGrid,
  DetailSectionHeading,
} from "@/components/detail/DetailFactsGrid";
import { DetailGallery } from "@/components/detail/DetailGallery";
import { DetailHero } from "@/components/detail/DetailHero";
import {
  DetailInfoList,
  type InfoRow,
} from "@/components/detail/DetailInfoList";
import { DetailMobileBar } from "@/components/detail/DetailMobileBar";
import { DetailReviews } from "@/components/detail/DetailReviews";
import { DetailSectionNav } from "@/components/detail/DetailSectionNav";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  Backpack,
  BarChart3,
  Car,
  Clock,
  HelpCircle,
  Luggage,
  MapPin,
  Mountain,
  Package,
  RotateCcw,
  RotateCw,
  Tent,
  Timer,
  Users,
  type LucideIcon,
} from "lucide-react";

const TREK_FACT_ICONS: Record<string, LucideIcon> = {
  difficulty: BarChart3,
  duration: Timer,
  altitude: Mountain,
  suitableFor: Users,
  basecamp: MapPin,
  accommodation: Tent,
  fitness: Activity,
  pickup: RotateCw,
  dropoff: RotateCcw,
  packing: Backpack,
  cloakroom: Luggage,
  offloading: Package,
};

const WEATHER_TABLE = [
  { month: "Jan", temp: "-5°/5°", condition: "Snow", status: "avoid" },
  { month: "Feb", temp: "-3°/7°", condition: "Snow", status: "caution" },
  { month: "Mar", temp: "2°/12°", condition: "Mixed", status: "caution" },
  { month: "Apr", temp: "5°/18°", condition: "Clear", status: "ideal" },
  { month: "May", temp: "10°/22°", condition: "Clear", status: "ideal" },
  { month: "Jun", temp: "12°/24°", condition: "Pre-monsoon", status: "caution" },
  { month: "Jul", temp: "10°/20°", condition: "Monsoon", status: "avoid" },
  { month: "Aug", temp: "10°/20°", condition: "Monsoon", status: "avoid" },
  { month: "Sep", temp: "8°/18°", condition: "Post-monsoon", status: "ideal" },
  { month: "Oct", temp: "4°/15°", condition: "Clear", status: "ideal" },
  { month: "Nov", temp: "-2°/10°", condition: "Cold", status: "caution" },
  { month: "Dec", temp: "-6°/4°", condition: "Snow", status: "avoid" },
];

const PACKING_SECTIONS = [
  {
    label: "Clothing",
    items: [
      "Moisture-wicking base layers (2 sets)",
      "Insulating mid-layer (fleece/down jacket)",
      "Waterproof outer shell jacket",
      "Trekking pants (2 pairs)",
      "Warm socks (4 pairs)",
      "Thermal inner socks",
      "Lightweight gloves + heavy gloves",
      "Woollen cap / balaclava",
    ],
  },
  {
    label: "Footwear",
    items: [
      "Waterproof trekking boots (ankle support)",
      "Camp sandals / flip-flops",
      "Gaiters for snow treks",
    ],
  },
  {
    label: "Equipment",
    items: [
      "Trekking poles (collapsible)",
      "Headlamp + extra batteries",
      "Sleeping bag liner",
      "Daypack (20–25L)",
      "Rain cover for backpack",
    ],
  },
  {
    label: "Personal Medical Kit",
    items: [
      "Diamox tablets (AMS prevention)",
      "ORS sachets",
      "Ibuprofen / Paracetamol",
      "Bandages, antiseptic cream",
      "Blister plasters",
      "Sunscreen SPF 50+",
      "Lip balm",
    ],
  },
  {
    label: "Documents & Essentials",
    items: [
      "Government-issued photo ID (original + 2 copies)",
      "Booking confirmation printout",
      "Travel insurance documents",
      "Emergency contact card",
    ],
  },
];

const FAQS = [
  {
    q: "What fitness level is required for this trek?",
    a: "You should be able to walk 8–12 km daily on uneven terrain. Start a 4-week pre-trek training plan with daily cardio (running/cycling), squats, and lunges.",
  },
  {
    q: "Are the treks suitable for beginners?",
    a: "Treks rated Easy or Moderate are suitable for first-timers with average fitness. Difficult and Extreme treks require prior high-altitude experience.",
  },
  {
    q: "What is the cancellation policy?",
    a: "Full refund if cancelled 30+ days before trek. 50% refund for 15–29 days. No refund within 14 days of departure.",
  },
  {
    q: "Are permits included in the price?",
    a: "Yes. Forest department permits, national park entry fees, and required government clearances are all included in the package price.",
  },
  {
    q: "What is the accommodation like on the trail?",
    a: "Accommodation varies by trek — mix of high-quality camping tents, fixed-camp setups, and guesthouses at lower altitudes. Sleeping bags and mats are provided.",
  },
  {
    q: "What happens in case of bad weather or emergency?",
    a: "Our leaders carry satellite communication devices. In emergencies, we coordinate helicopter evacuation. Safety of trekkers is our top priority.",
  },
  {
    q: "Can I join as a solo traveller?",
    a: "Absolutely. Solo trekkers are paired with group batches. We also offer women-only group departures for solo female travellers.",
  },
  {
    q: "What meals are provided on the trek?",
    a: "All meals from Day 1 dinner to last-day breakfast are included — hot nutritious Himalayan meals cooked by our camp staff.",
  },
];

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "itinerary", label: "Itinerary" },
  { id: "inclusions", label: "Inclusions" },
  { id: "info", label: "Complete Info" },
  { id: "gallery", label: "Gallery" },
  { id: "reviews", label: "Reviews" },
  { id: "faqs", label: "FAQs" },
];

function DayBlock({ day }: { day: DayItinerary }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border" style={{ borderColor: "#E8E8E8" }}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="no-retro w-full flex items-center justify-between px-4 py-3.5 text-left hover:bg-[#FAFAFA] transition-colors"
        data-ocid={`trek.itinerary.day.${Number(day.day)}`}
      >
        <div className="flex items-center gap-3 min-w-0">
          <span
            className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold font-mono text-[#1A1A1A]"
            style={{ backgroundColor: "#FFC107" }}
          >
            {Number(day.day)}
          </span>
          <div className="min-w-0">
            <p className="font-body text-sm font-semibold text-[#1A1A1A] leading-snug truncate">
              {day.title}
            </p>
            <p className="font-body text-[11.5px] text-muted-foreground">
              {day.route} · {day.distanceKm} km
            </p>
          </div>
        </div>
        <span
          className={`text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden
        >
          ▾
        </span>
      </button>
      {open ? (
        <div
          className="px-4 py-4 border-t space-y-3"
          style={{ borderColor: "#E8E8E8", backgroundColor: "#FAFAFA" }}
        >
          <div className="flex flex-wrap gap-2 font-body text-[11px]">
            <span className="px-2 py-0.5 bg-white border" style={{ borderColor: "#E8E8E8" }}>
              {day.campsite}
            </span>
            <span className="px-2 py-0.5 bg-white border" style={{ borderColor: "#E8E8E8" }}>
              {day.mealsIncluded}
            </span>
            <span className="px-2 py-0.5 bg-white border" style={{ borderColor: "#E8E8E8" }}>
              {Number(day.startAltitudeM)}m → {Number(day.endAltitudeM)}m
            </span>
          </div>
          <p className="font-body text-[13px] text-[#555555] leading-relaxed">
            {day.description}
          </p>
          {day.landmarks?.length ? (
            <ul className="space-y-1">
              {day.landmarks.map((l) => (
                <li key={l} className="font-body text-[12px] text-[#1A1A1A]">
                  · {l}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

export default function TrekDetailPage() {
  const params = useParams();
  const slug = String(params?.slug ?? "");
  const trek = getTrekBySlug(slug);
  const [activeTab, setActiveTab] = useState("overview");
  const [showInclusions, setShowInclusions] = useState(true);

  const heroImages = useMemo(
    () => (trek ? getTrekHeroImages(trek.slug, trek.imageUrl) : []),
    [trek],
  );

  const related = useMemo(() => {
    if (!trek) return [];
    return getAllTreks()
      .filter((t) => t.state === trek.state && t.slug !== trek.slug)
      .slice(0, 3);
  }, [trek]);

  useEffect(() => {
    const ids = TABS.map((t) => `section-${t.id}`);
    const onScroll = () => {
      const offset = 140;
      let current = TABS[0].id;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top - offset <= 0) {
          current = id.replace("section-", "");
        }
      }
      setActiveTab(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(`section-${id}`)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  if (!trek) {
    return (
      <div className="lux-container py-24 text-center">
        <h1 className="font-display text-2xl font-bold mb-3">Trek not found</h1>
        <Link href="/treks" className="text-[#1A73E8] font-semibold text-sm">
          Browse all treks
        </Link>
      </div>
    );
  }

  const packingSections =
    trek.packing && trek.packing.length > 0 ? trek.packing : PACKING_SECTIONS;
  const faqs = trek.faqs && trek.faqs.length > 0 ? trek.faqs : FAQS;
  const howToReachSections = trek.howToReach ?? [];

  const infoRows: InfoRow[] = [
    {
      id: "itinerary",
      title: "Quick itinerary overview",
      icon: <Clock size={14} />,
      content: (
        <ol className="space-y-2 list-decimal list-inside">
          {trek.itinerary.map((d) => (
            <li key={d.day}>
              Day {d.day}: {d.title} ({d.distanceKm} km)
            </li>
          ))}
        </ol>
      ),
    },
    {
      id: "how-to-reach",
      title: `How to reach ${trek.startPoint}`,
      icon: <Car size={14} />,
      content:
        howToReachSections.length > 0 ? (
          <div className="space-y-4">
            {howToReachSections.map((section) => (
              <div key={section.title}>
                <p className="font-semibold text-[#1A1A1A] mb-1">{section.title}</p>
                <ol className="list-decimal list-inside space-y-1">
                  {section.steps.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            <p>
              <strong>By Air:</strong> Jolly Grant Airport, Dehradun (DED) is the
              nearest airport. From there, hire a taxi or take GMOU bus service
              to the trek base.
            </p>
            <p>
              <strong>By Train:</strong> Dehradun Railway Station and Haridwar
              Junction are the nearest railheads. Overnight trains available
              from Delhi (NDLS).
            </p>
            <p>
              <strong>By Road:</strong> Regular GMOU/private buses and shared
              taxis operate from Dehradun, Haridwar, and Rishikesh to{" "}
              {trek.startPoint}.
            </p>
          </div>
        ),
    },
    {
      id: "packing",
      title: "What to carry — packing list",
      icon: <Backpack size={14} />,
      content: (
        <div className="grid sm:grid-cols-2 gap-4">
          {packingSections.map((sec) => (
            <div key={sec.label}>
              <p className="font-semibold text-[#1A1A1A] mb-1">{sec.label}</p>
              <ul className="space-y-1">
                {sec.items.map((item) => (
                  <li key={item}>· {item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: "fitness",
      title: "Fitness & medical readiness",
      icon: <Activity size={14} />,
      content: (
        <div className="space-y-3">
          {(trek.fitnessTips?.length
            ? trek.fitnessTips
            : [
                "Be able to cover 5 km in about 40 minutes on flat ground.",
                "Start cardio and stair practice 4–6 weeks before departure.",
              ]
          ).map((tip) => (
            <p key={tip}>· {tip}</p>
          ))}
          {trek.medicalNotes?.map((note) => (
            <p key={note}>· {note}</p>
          ))}
        </div>
      ),
    },
    {
      id: "weather",
      title: "Month-by-month weather",
      icon: <Mountain size={14} />,
      content: (
        <div className="overflow-x-auto">
          <table className="w-full text-left font-body text-[12px]">
            <thead>
              <tr className="border-b" style={{ borderColor: "#E8E8E8" }}>
                <th className="py-2 pr-3 font-semibold">Month</th>
                <th className="py-2 pr-3 font-semibold">Temp</th>
                <th className="py-2 pr-3 font-semibold">Condition</th>
                <th className="py-2 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {WEATHER_TABLE.map((row) => (
                <tr
                  key={row.month}
                  className="border-b"
                  style={{ borderColor: "#F0F0F0" }}
                >
                  <td className="py-1.5 pr-3">{row.month}</td>
                  <td className="py-1.5 pr-3">{row.temp}</td>
                  <td className="py-1.5 pr-3">{row.condition}</td>
                  <td className="py-1.5 capitalize">{row.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ),
    },
    {
      id: "faqs-quick",
      title: "Frequently asked questions",
      icon: <HelpCircle size={14} />,
      content: (
        <div className="space-y-3">
          {faqs.slice(0, 4).map((f) => (
            <div key={f.q}>
              <p className="font-semibold text-[#1A1A1A] mb-0.5">{f.q}</p>
              <p>{f.a}</p>
            </div>
          ))}
        </div>
      ),
    },
  ];

  if (trek.policies && trek.policies.length > 0) {
    infoRows.push({
      id: "policies",
      title: "Booking terms & policies",
      icon: <HelpCircle size={14} />,
      content: (
        <div className="grid sm:grid-cols-2 gap-4">
          {trek.policies.map((policy) => (
            <div key={policy.title}>
              <p className="font-semibold text-[#1A1A1A] mb-1">{policy.title}</p>
              <ul className="space-y-1">
                {policy.items.map((item) => (
                  <li key={item}>· {item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ),
    });
  }

  return (
    <div className="bg-white min-h-screen pb-28 lg:pb-0">
      <DetailHero
        images={heroImages}
        title={trek.name}
        tagline={trek.tagline ?? trek.description.slice(0, 120)}
        primaryHref={`/booking/${trek.id}`}
        primaryLabel="View Trek Dates"
        primaryOcid="trek.hero_book"
        secondaryLabel="Download Itinerary"
        secondaryOcid="trek.hero_itinerary"
        onSecondary={() => window.print()}
      />

      <DetailFactsGrid facts={getTrekFacts(trek)} icons={TREK_FACT_ICONS} ocid="trek.facts" />

      <DetailSectionNav
        tabs={TABS}
        activeId={activeTab}
        onSelect={(id) => {
          setActiveTab(id);
          scrollTo(id);
        }}
        ocidPrefix="trek"
      />

      <div className="lux-container py-8 md:py-10">
        <div className="flex gap-8 lg:gap-10 items-start">
          <div className="flex-1 min-w-0 space-y-12 md:space-y-14">
            {/* Overview + Highlights */}
            <section id="section-overview" className="scroll-mt-36">
              <DetailSectionHeading
                title="Highlights"
                aside={
                  trek.highlights.length > 0 ? (
                    <ul className="space-y-1.5 font-body text-[13px] text-[#555555]">
                      {trek.highlights.slice(0, 5).map((h) => (
                        <li key={h} className="flex gap-2">
                          <span style={{ color: "#FFC107" }}>●</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null
                }
              />

              <h3 className="font-display text-lg font-bold text-[#1A1A1A] mb-3">
                Why choose the {trek.name}
              </h3>
              <p className="font-body text-[14px] text-[#555555] leading-relaxed mb-5">
                {trek.description}
              </p>

              <div
                className="relative overflow-hidden mb-5"
                data-ocid="trek.why_we_love"
              >
                {heroImages[0] ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={heroImages[Math.min(1, heroImages.length - 1)]}
                    alt={trek.name}
                    className="w-full h-[220px] md:h-[280px] object-cover"
                  />
                ) : null}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <p className="absolute bottom-4 left-4 right-4 font-display text-sm md:text-base font-bold uppercase tracking-[0.12em] text-white">
                  Why we love {trek.name.replace(/ trek$/i, "")}
                </p>
              </div>

              <div
                className="px-4 py-4 font-body text-[13px] text-[#1A1A1A] leading-relaxed"
                style={{ backgroundColor: "#FDF8E7" }}
              >
                Best season: <strong>{trek.bestSeason}</strong> · Max altitude{" "}
                <strong>
                  {Number(trek.maxAltitudeFt).toLocaleString("en-IN")} ft
                </strong>{" "}
                · Difficulty <strong>{trek.difficulty}</strong>
              </div>
            </section>

            {/* Itinerary */}
            <section id="section-itinerary" className="scroll-mt-36">
              <h2 className="font-serif italic text-2xl md:text-[28px] text-[#1A1A1A] mb-5">
                Itinerary
              </h2>
              <div className="space-y-2">
                {trek.itinerary.map((day) => (
                  <DayBlock key={day.day} day={day} />
                ))}
              </div>
            </section>

            {/* Inclusions */}
            <section id="section-inclusions" className="scroll-mt-36">
              <h2 className="font-serif italic text-2xl md:text-[28px] text-[#1A1A1A] mb-5">
                Inclusions &amp; Exclusions
              </h2>
              <div className="flex gap-2 mb-4">
                <button
                  type="button"
                  onClick={() => setShowInclusions(true)}
                  data-ocid="trek.inclusions_tab"
                  className={`no-retro px-4 py-2 text-xs font-bold font-body uppercase tracking-wide ${
                    showInclusions
                      ? "text-[#1A1A1A]"
                      : "bg-[#F5F5F5] text-muted-foreground"
                  }`}
                  style={
                    showInclusions ? { backgroundColor: "#FFC107" } : undefined
                  }
                >
                  Inclusions
                </button>
                <button
                  type="button"
                  onClick={() => setShowInclusions(false)}
                  data-ocid="trek.exclusions_tab"
                  className={`no-retro px-4 py-2 text-xs font-bold font-body uppercase tracking-wide ${
                    !showInclusions
                      ? "bg-[#1A1A1A] text-white"
                      : "bg-[#F5F5F5] text-muted-foreground"
                  }`}
                >
                  Exclusions
                </button>
              </div>
              <ul className="space-y-2">
                {(showInclusions ? trek.inclusions : trek.exclusions).map(
                  (item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 font-body text-[13px] text-[#1A1A1A]"
                    >
                      <span
                        className="mt-0.5 shrink-0 font-bold"
                        style={{
                          color: showInclusions ? "#16A34A" : "#DC2626",
                        }}
                      >
                        {showInclusions ? "✓" : "✗"}
                      </span>
                      {item}
                    </li>
                  ),
                )}
              </ul>
            </section>

            {/* Complete info accordion */}
            <div id="section-info" className="scroll-mt-36">
              <DetailInfoList
                title={`${trek.name} — Complete Trek Information`}
                rows={infoRows}
                ocidPrefix="trek"
              />
            </div>

            <DetailGallery
              images={heroImages}
              alt={trek.name}
              ocidPrefix="trek"
            />

            <DetailReviews tripName={trek.name} ocidPrefix="trek" />

            {/* FAQs */}
            <section id="section-faqs" className="scroll-mt-36">
              <h2 className="font-serif italic text-2xl md:text-[28px] text-[#1A1A1A] mb-5">
                Frequently Asked Questions
              </h2>
              <div className="space-y-2.5">
                {faqs.map((faq, i) => (
                  <FaqRow key={faq.q} faq={faq} index={i} />
                ))}
              </div>
            </section>

            {related.length > 0 ? (
              <section data-ocid="trek.related">
                <h2 className="font-serif italic text-2xl md:text-[28px] text-[#1A1A1A] mb-5">
                  Similar Treks
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {related.map((t) => (
                    <TrekCard key={t.slug} trek={t} />
                  ))}
                </div>
              </section>
            ) : null}
          </div>

          {/* Fee sidebar */}
          <div className="hidden lg:block w-[320px] shrink-0">
            <DetailFeePanel
              name={trek.name}
              priceRange={trek.priceRange}
              bookHref={`/booking/${trek.id}`}
              bookLabel="Register for this trek"
              bookOcid="trek.book_button"
              routeLine={`${trek.startPoint} to ${trek.endPoint}`}
              facts={[
                {
                  label: "Duration",
                  value: `${trek.durationDays} Days / ${trek.durationNights} Nights`,
                },
                { label: "Difficulty", value: trek.difficulty },
                {
                  label: "Highest Altitude",
                  value: `${Number(trek.maxAltitudeFt).toLocaleString("en-IN")} ft`,
                },
                { label: "Best Season", value: trek.bestSeason },
                { label: "Region", value: `${trek.region}, ${trek.state}` },
              ]}
              enquiryMessage={`Hi! I'm interested in the ${trek.name}. Please share dates and the itinerary.`}
              kind="trek"
            />
          </div>
        </div>
      </div>

      {/* Brand values + categories — full width like the reference */}
      <AdvantageGrid />
      <TreksByCategory />

      <DetailMobileBar
        bookHref={`/booking/${trek.id}`}
        bookOcid="trek.mobile_book"
        priceINR={Number(trek.priceRange.minINR) || 0}
        enquiryMessage={`Hi! I'm interested in ${trek.name}. Can you help me plan?`}
        waOcid="trek.mobile_whatsapp"
        label="Book This Trek"
      />
    </div>
  );
}

function FaqRow({
  faq,
  index,
}: {
  faq: { q: string; a: string };
  index: number;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ backgroundColor: "#F5F5F5" }}>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        data-ocid={`trek.faq.${index + 1}`}
        className="no-retro w-full flex items-center justify-between gap-4 px-4 py-3.5 text-left"
      >
        <span className="font-body text-[13px] font-medium text-[#1A1A1A]">
          {faq.q}
        </span>
        <span className="shrink-0 text-muted-foreground">{open ? "−" : "+"}</span>
      </button>
      {open ? (
        <p className="font-body text-[12.5px] text-[#555555] leading-relaxed px-4 pb-3.5">
          {faq.a}
        </p>
      ) : null}
    </div>
  );
}
