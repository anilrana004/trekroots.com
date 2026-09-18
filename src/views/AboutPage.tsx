"use client";

import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  Award,
  Briefcase,
  Building2,
  Compass,
  Flag,
  Handshake,
  HeartHandshake,
  Home,
  Leaf,
  MapPin,
  Mountain,
  Phone,
  Shield,
  Sparkles,
  Users,
  UserRound,
} from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import {
  CONTACT_EMAIL,
  CONTACT_EMAIL_HREF,
  PHONE_DISPLAY,
  PHONE_HREF,
  whatsappLink,
} from "@/data/contact";

const INK = "#1A1A1A";
const INK_DEEP = "#111111";
const GOLD = "#FFC107";
const CREAM = "#FFFBEB";

const STATS = [
  { value: "10,000+", label: "Travellers guided" },
  { value: "50+", label: "Himalayan treks" },
  { value: "12+", label: "Sacred yatras" },
  { value: "6", label: "Owned stays" },
  { value: "4.9/5", label: "Google rating" },
  { value: "2018", label: "Operating since" },
] as const;

const TIMELINE = [
  {
    year: "2018",
    title: "TrekRoots begins in Dehradun",
    body: "A small mountain desk opens with a simple promise — honest itineraries, local guides, and departures we would send our own family on.",
  },
  {
    year: "2019–21",
    title: "Routes deepen across Garhwal",
    body: "Kedarkantha, Brahmatal, Har Ki Dun and Chopta–Tungnath become flagship winter and shoulder-season batches. We start owning base stays so the night before a trek is never left to chance.",
  },
  {
    year: "2022–23",
    title: "Yatras & Himachal join the map",
    body: "Char Dham, Kedarnath and Adi Kailash circuits run with permit support. Hampta Pass and Sar Pass extend the catalogue into Himachal.",
  },
  {
    year: "2024–26",
    title: "Full Himalayan desk",
    body: "Treks, yatras, curated packages and six mountain stays under one WhatsApp-first planning team — still based in Dehradun, still walking the routes we sell.",
  },
] as const;

const ORG_NODES = [
  {
    title: "Sales Team",
    body: "Enquiries, quotes, batch matching and WhatsApp planning from first message to booking.",
  },
  {
    title: "Operations Team",
    body: "Permits, transport, stays, equipment and day-of logistics across every departure.",
  },
  {
    title: "Trek Leaders",
    body: "Certified batch leaders who set pace, turn-back times and on-trail decisions.",
  },
  {
    title: "Mountain Guides",
    body: "Local trail guides from the villages at the trailhead — terrain, weather and culture.",
  },
  {
    title: "Yatra Concierge",
    body: "Temple timings, registration help, helicopter windows and pilgrim pacing.",
  },
  {
    title: "Stays & Homestays",
    body: "Owned and partner properties at Sankri, Chopta, Auli, Lohajung and beyond.",
  },
] as const;

const LEADERSHIP = [
  {
    role: "Founder",
    focus: "Vision & brand",
    body: "Built TrekRoots in 2018 from Dehradun with a simple brief — honest itineraries, local leaders, and trips we would send our own family on. Owns the long-term vision, partnerships and the standard every departure must meet.",
    icon: Flag,
    initials: "F",
  },
  {
    role: "Chief Executive Officer",
    focus: "Company direction",
    body: "Runs the desk day to day — season calendars, safety policy, pricing integrity and growth across treks, yatras, packages and stays. The final call when a route is unsafe or a batch should not go.",
    icon: Briefcase,
    initials: "CEO",
  },
] as const;

const TEAMS = [
  {
    role: "Sales Team",
    focus: "Planning & bookings",
    body: "Your first human contact. Matches fitness and dates to the right trek or yatra, sends clear quotes, and keeps one WhatsApp thread from enquiry to departure.",
    icon: Handshake,
    points: [
      "Trek, yatra & package recommendations",
      "Transparent pricing and inclusions",
      "Packing lists and pre-trip briefings",
    ],
  },
  {
    role: "Operations Team",
    focus: "Logistics that hold",
    body: "The engine behind every batch — forest permits, jeep pickups, stay confirmations, gear checks and contingency plans when weather shifts.",
    icon: Building2,
    points: [
      "Permits, transport & stay coordination",
      "Equipment and basecamp readiness",
      "Live updates when plans change",
    ],
  },
  {
    role: "Trek Leaders",
    focus: "On-trail command",
    body: "Certified leaders who have walked that route in that season. They set the pace, hold summit turn-back times, and put the group before the photo.",
    icon: Mountain,
    points: [
      "Batch leadership & route decisions",
      "First-aid and altitude awareness",
      "Weather calls and turn-back authority",
    ],
  },
  {
    role: "Mountain Guides",
    focus: "Local trail expertise",
    body: "Guides hired from the villages where your trek starts. They know the streams, the late snow, the short-cuts that are safe — and the ones that are not.",
    icon: Compass,
    points: [
      "Trail navigation & local knowledge",
      "Support for cooks and porters",
      "Culture and terrain storytelling",
    ],
  },
] as const;

const JOURNEY_STEPS = [
  {
    step: "01",
    title: "Enquire",
    body: "Tell us your dates, fitness and dream route on WhatsApp or the enquiry form.",
  },
  {
    step: "02",
    title: "Match",
    body: "We recommend a trek, yatra, package or stay — or a blend — with honest altitude and difficulty.",
  },
  {
    step: "03",
    title: "Prepare",
    body: "Packing list, fitness plan, permits and pickup points land in your chat before you leave home.",
  },
  {
    step: "04",
    title: "Travel",
    body: "Meet your leader at the trailhead or base stay. Small batches. Clear turn-back rules.",
  },
  {
    step: "05",
    title: "Summit & return",
    body: "Summit when the mountain allows. We carry trash down. You leave with the story — and a team that still answers after you get home.",
  },
] as const;

const PILLARS = [
  {
    icon: Mountain,
    title: "Expert leaders on every trail",
    body: "Certified guides who have walked that route in that season — not a leader hired for the week.",
  },
  {
    icon: Shield,
    title: "Safety before the booking",
    body: "First-aid trained staff, oxygen where altitude demands it, and conservative weather calls. We cancel rather than gamble.",
  },
  {
    icon: Home,
    title: "Owned mountain stays",
    body: "Homestays and cottages we run ourselves at key base villages — so the night before your trek is part of the product.",
  },
  {
    icon: Users,
    title: "Hired from the trailhead",
    body: "Guides, cooks and porters from the villages where your trek starts. Money stays in the mountains.",
  },
  {
    icon: Leaf,
    title: "Leave no trace",
    body: "We carry our trash down, ban single-use plastic on trail, and rotate campsites so meadows recover.",
  },
  {
    icon: HeartHandshake,
    title: "WhatsApp-first planning",
    body: "One conversation covers dates, inclusions and packing — from real mountain people, not a chatbot script.",
  },
] as const;

const OFFERINGS = [
  {
    title: "Himalayan Treks",
    href: "/treks",
    body: "Winter summits, monsoon meadows and high passes across Uttarakhand, Himachal and the Sahyadris.",
    cta: "Browse treks",
  },
  {
    title: "Sacred Yatras",
    href: "/yatra",
    body: "Char Dham, Kedarnath, Do Dham and Adi Kailash — darshan windows, permits and pacing handled.",
    cta: "Browse yatras",
  },
  {
    title: "Curated Packages",
    href: "/packages",
    body: "Spiti, Ladakh, Himachal and Kerala circuits with stays and transfers already sequenced.",
    cta: "Browse packages",
  },
  {
    title: "Mountain Stays",
    href: "/stays",
    body: "Homestays, eco cottages and riverside camps at the villages where the trail begins.",
    cta: "Browse stays",
  },
] as const;

const TRUST = [
  { label: "Uttarakhand Tourism registered" },
  { label: "GMVN-aligned operations" },
  { label: "4.9/5 from 800+ Google reviews" },
  { label: "Eco-tourism committed" },
] as const;

function SectionLabel({ children }: { children: string }) {
  return (
    <p
      className="mb-3 font-body text-[11px] font-bold uppercase tracking-[0.16em]"
      style={{ color: INK }}
    >
      {children}
    </p>
  );
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section
        className="relative overflow-hidden px-4 py-16 md:py-24"
        style={{ background: INK_DEEP }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-50"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 70% 55% at 15% 85%, rgba(255,193,7,0.45), transparent 55%), radial-gradient(ellipse 45% 40% at 90% 10%, rgba(255,193,7,0.12), transparent 50%)",
          }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-4xl text-center">
          <Breadcrumbs
            tone="dark"
            className="mb-6 justify-center"
            items={[
              { name: "Home", path: "/" },
              { name: "About", path: "/about" },
            ]}
          />
          <p className="mb-4 font-body text-xs font-semibold uppercase tracking-[0.18em] text-[#FFC107]">
            Est. 2018 · Dehradun, Uttarakhand
          </p>
          <h1 className="mb-5 font-display text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
            Born in the mountains.
            <br />
            Built for the mountains.
          </h1>
          <p className="mx-auto max-w-2xl font-body text-base leading-relaxed text-white/80 md:text-lg">
            TrekRoots is a Dehradun-based Himalayan travel desk — treks, sacred
            yatras, curated packages and owned mountain stays — run by people who
            walk the routes they sell.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href={whatsappLink(
                "Hi TrekRoots! I'd like to know more about planning a trip with you.",
              )}
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="about.hero_whatsapp"
              className="inline-flex items-center gap-2 rounded-md px-5 py-2.5 font-body text-sm font-bold text-[#1A1A1A]"
              style={{ background: GOLD }}
            >
              Plan on WhatsApp
              <ArrowRight size={15} />
            </a>
            <Link
              href="/treks"
              data-ocid="about.hero_treks"
              className="inline-flex items-center gap-2 rounded-md border-2 px-5 py-2.5 font-body text-sm font-semibold text-white hover:bg-[#FFC107]/15"
              style={{ borderColor: GOLD }}
            >
              Explore treks
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section
        className="border-b px-4 py-10"
        style={{ borderColor: "#E8E4D4", background: CREAM }}
      >
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <p
                className="font-display text-2xl font-bold md:text-3xl"
                style={{ color: INK_DEEP }}
              >
                {stat.value}
              </p>
              <p className="mt-1 font-body text-xs text-[#5A6B62]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Story */}
      <section className="px-4 py-16 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start lg:gap-16">
          <div>
            <SectionLabel>Our story</SectionLabel>
            <h2
              className="font-display text-3xl font-bold leading-tight md:text-4xl"
              style={{ color: INK_DEEP }}
            >
              A mountain desk that grew into a full Himalayan company
            </h2>
          </div>
          <div className="space-y-4 font-body text-[15px] leading-relaxed text-[#3D4F46]">
            <p>
              TrekRoots started in 2018 from Dehradun with a narrow brief: run
              Himalayan trips the way we would want them for ourselves — clear
              pricing, local leaders, and no surprises at basecamp.
            </p>
            <p>
              We built our own stays in places like Sankri, Chopta, Munsiyari,
              Auli, Lohajung and Rishikesh because where you sleep the night
              before a summit shapes the entire journey. Today the same desk
              plans treks, Char Dham–class yatras, road packages and homestays
              under one standard of care.
            </p>
            <p>
              Every itinerary we publish is walked by our own people. Altitudes
              and seasons are checked against what the trail is actually doing —
              not a brochure written five years ago.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="px-4 py-16 md:py-20" style={{ background: CREAM }}>
        <div className="mx-auto max-w-6xl">
          <SectionLabel>Milestones</SectionLabel>
          <h2
            className="mb-10 font-display text-3xl font-bold md:text-4xl"
            style={{ color: INK_DEEP }}
          >
            How TrekRoots grew
          </h2>
          <ol className="relative space-y-0 border-l-2 pl-8 md:pl-10" style={{ borderColor: INK }}>
            {TIMELINE.map((item) => (
              <li key={item.year} className="relative pb-10 last:pb-0">
                <span
                  className="absolute -left-[41px] top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 bg-white md:-left-[49px]"
                  style={{ borderColor: INK }}
                >
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ background: GOLD }}
                  />
                </span>
                <p
                  className="mb-1 font-body text-xs font-bold uppercase tracking-wider"
                  style={{ color: INK }}
                >
                  {item.year}
                </p>
                <h3
                  className="mb-2 font-display text-xl font-bold"
                  style={{ color: INK_DEEP }}
                >
                  {item.title}
                </h3>
                <p className="max-w-2xl font-body text-sm leading-relaxed text-[#5A6B62]">
                  {item.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Company flowchart */}
      <section className="px-4 py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 max-w-2xl">
            <SectionLabel>Company structure</SectionLabel>
            <h2
              className="font-display text-3xl font-bold md:text-4xl"
              style={{ color: INK_DEEP }}
            >
              How TrekRoots is organised
            </h2>
            <p className="mt-3 font-body text-sm leading-relaxed text-[#5A6B62]">
              One Dehradun HQ. Six desks that hand off cleanly — so your enquiry
              never gets lost between &ldquo;trek guy&rdquo; and &ldquo;hotel
              guy.&rdquo;
            </p>
          </div>

          {/* Flowchart */}
          <div className="flex flex-col items-center">
            <div
              className="w-full max-w-lg rounded-xl border-2 px-6 py-5 text-center shadow-sm"
              style={{ borderColor: INK, background: CREAM }}
            >
              <Building2
                size={22}
                className="mx-auto mb-2"
                style={{ color: INK }}
              />
              <p
                className="font-display text-lg font-bold"
                style={{ color: INK_DEEP }}
              >
                TrekRoots HQ · Dehradun
              </p>
              <p className="mt-1 font-body text-xs text-[#5A6B62]">
                Founder · CEO · Season planning &amp; safety standards
              </p>
            </div>

            <div className="mt-3 grid w-full max-w-lg grid-cols-2 gap-3">
              <div
                className="rounded-lg border bg-white px-3 py-3 text-center"
                style={{ borderColor: GOLD }}
              >
                <p className="font-body text-xs font-bold" style={{ color: INK_DEEP }}>
                  Founder
                </p>
                <p className="mt-0.5 font-body text-[10px] text-[#5A6B62]">
                  Vision &amp; brand
                </p>
              </div>
              <div
                className="rounded-lg border bg-white px-3 py-3 text-center"
                style={{ borderColor: GOLD }}
              >
                <p className="font-body text-xs font-bold" style={{ color: INK_DEEP }}>
                  CEO
                </p>
                <p className="mt-0.5 font-body text-[10px] text-[#5A6B62]">
                  Direction &amp; standards
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center py-2" aria-hidden>
              <ArrowDown size={18} style={{ color: INK }} />
              <div className="h-4 w-px" style={{ background: INK }} />
            </div>

            <div
              className="mb-3 rounded-full px-4 py-1.5 font-body text-[11px] font-bold uppercase tracking-wider text-[#1A1A1A]"
              style={{ background: GOLD }}
            >
              Sales · Operations · Leaders · Guides
            </div>

            <div className="hidden w-full max-w-4xl items-center md:flex" aria-hidden>
              <div className="h-px flex-1" style={{ background: INK }} />
            </div>

            <div className="mt-4 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {ORG_NODES.map((node) => (
                <div
                  key={node.title}
                  className="relative rounded-xl border bg-white p-5 shadow-sm"
                  style={{ borderColor: "#E8E4D4" }}
                >
                  <div
                    className="absolute -top-3 left-1/2 hidden h-3 w-px -translate-x-1/2 md:block"
                    style={{ background: INK }}
                    aria-hidden
                  />
                  <h3
                    className="mb-2 font-body text-sm font-bold"
                    style={{ color: INK_DEEP }}
                  >
                    {node.title}
                  </h3>
                  <p className="font-body text-[12.5px] leading-relaxed text-[#5A6B62]">
                    {node.body}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-col items-center py-4" aria-hidden>
              <div className="h-4 w-px" style={{ background: INK }} />
              <ArrowDown size={18} style={{ color: INK }} />
            </div>

            <div
              className="w-full max-w-lg rounded-xl border-2 px-6 py-5 text-center"
              style={{ borderColor: GOLD, background: "#FFF8E1" }}
            >
              <Users
                size={20}
                className="mx-auto mb-2"
                style={{ color: INK }}
              />
              <p
                className="font-display text-base font-bold"
                style={{ color: INK_DEEP }}
              >
                You — the trekker / pilgrim / guest
              </p>
              <p className="mt-1 font-body text-xs text-[#5A6B62]">
                One WhatsApp thread. One standard of care from enquiry to
                homecoming.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership & teams */}
      <section className="px-4 py-16 md:py-20" style={{ background: CREAM }}>
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 max-w-2xl">
            <SectionLabel>Leadership &amp; field teams</SectionLabel>
            <h2
              className="font-display text-3xl font-bold md:text-4xl"
              style={{ color: INK_DEEP }}
            >
              The people behind every departure
            </h2>
            <p className="mt-3 font-body text-sm leading-relaxed text-[#5A6B62]">
              From the founder&apos;s desk to the guide at your trailhead —
              everyone owns a clear piece of your journey.
            </p>
          </div>

          {/* Founder + CEO */}
          <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-2">
            {LEADERSHIP.map(({ role, focus, body, icon: Icon, initials }) => (
              <article
                key={role}
                className="rounded-2xl border bg-white p-6 shadow-sm md:p-8"
                style={{ borderColor: "#E8E4D4" }}
              >
                <div className="mb-5 flex items-start gap-4">
                  <div
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full font-body text-sm font-bold text-[#1A1A1A]"
                    style={{ background: GOLD }}
                    aria-hidden
                  >
                    {initials}
                  </div>
                  <div>
                    <p
                      className="font-body text-[11px] font-bold uppercase tracking-[0.14em]"
                      style={{ color: INK }}
                    >
                      {focus}
                    </p>
                    <h3
                      className="font-display text-xl font-bold md:text-2xl"
                      style={{ color: INK_DEEP }}
                    >
                      {role}
                    </h3>
                  </div>
                  <Icon
                    size={20}
                    className="ml-auto mt-1 shrink-0 opacity-40"
                    style={{ color: INK }}
                  />
                </div>
                <p className="font-body text-sm leading-relaxed text-[#5A6B62]">
                  {body}
                </p>
              </article>
            ))}
          </div>

          {/* Sales, Ops, Leaders, Guides */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {TEAMS.map(({ role, focus, body, icon: Icon, points }) => (
              <article
                key={role}
                className="flex flex-col rounded-2xl border bg-white p-6 shadow-sm"
                style={{ borderColor: "#E8E4D4" }}
              >
                <div className="mb-4 flex items-center gap-3">
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-full"
                    style={{ background: "rgba(255,193,7,0.35)" }}
                  >
                    <Icon size={20} style={{ color: INK }} />
                  </div>
                  <div>
                    <h3
                      className="font-body text-base font-bold"
                      style={{ color: INK_DEEP }}
                    >
                      {role}
                    </h3>
                    <p className="font-body text-[11px] font-semibold uppercase tracking-wider text-[#888]">
                      {focus}
                    </p>
                  </div>
                </div>
                <p className="mb-4 font-body text-sm leading-relaxed text-[#5A6B62]">
                  {body}
                </p>
                <ul className="mt-auto space-y-2 border-t pt-4" style={{ borderColor: "#F0EDE0" }}>
                  {points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-2 font-body text-[12.5px] text-[#3D4F46]"
                    >
                      <UserRound
                        size={13}
                        className="mt-0.5 shrink-0"
                        style={{ color: GOLD }}
                      />
                      {point}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Journey flow */}
      <section className="px-4 py-16 md:py-20 bg-white">
        <div className="mx-auto max-w-6xl">
          <SectionLabel>How a trip works</SectionLabel>
          <h2
            className="mb-3 font-display text-3xl font-bold md:text-4xl"
            style={{ color: INK_DEEP }}
          >
            From first message to summit morning
          </h2>
          <p className="mb-10 max-w-2xl font-body text-sm text-[#5A6B62]">
            A clear path — no opaque &ldquo;we&apos;ll get back to you&rdquo;
            loops.
          </p>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-5 md:gap-3">
            {JOURNEY_STEPS.map((item, i) => (
              <div key={item.step} className="relative">
                <div
                  className="h-full rounded-xl border bg-white p-4 shadow-sm"
                  style={{ borderColor: "#E8E4D4" }}
                >
                  <p
                    className="mb-2 font-mono text-xs font-bold"
                    style={{ color: INK }}
                  >
                    {item.step}
                  </p>
                  <h3
                    className="mb-2 font-body text-sm font-bold"
                    style={{ color: INK_DEEP }}
                  >
                    {item.title}
                  </h3>
                  <p className="font-body text-[12px] leading-relaxed text-[#5A6B62]">
                    {item.body}
                  </p>
                </div>
                {i < JOURNEY_STEPS.length - 1 ? (
                  <ArrowRight
                    size={16}
                    className="absolute -right-2.5 top-1/2 z-10 hidden -translate-y-1/2 text-[#1A1A1A] md:block"
                    aria-hidden
                  />
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="px-4 py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <SectionLabel>What we stand for</SectionLabel>
            <h2
              className="font-display text-3xl font-bold md:text-4xl"
              style={{ color: INK_DEEP }}
            >
              Six principles on every departure
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PILLARS.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="rounded-xl border bg-white p-6 shadow-sm"
                style={{ borderColor: "#E8E4D4" }}
              >
                <div
                  className="mb-4 flex h-11 w-11 items-center justify-center rounded-full"
                  style={{ background: "rgba(255,193,7,0.35)" }}
                >
                  <Icon size={20} style={{ color: INK }} />
                </div>
                <h3
                  className="mb-2 font-body text-base font-bold"
                  style={{ color: INK_DEEP }}
                >
                  {title}
                </h3>
                <p className="font-body text-sm leading-relaxed text-[#5A6B62]">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Offerings */}
      <section className="px-4 py-16 md:py-20" style={{ background: INK_DEEP }}>
        <div className="mx-auto max-w-6xl">
          <p className="mb-3 font-body text-[11px] font-bold uppercase tracking-[0.16em] text-[#FFC107]">
            What we run
          </p>
          <h2 className="mb-10 font-display text-3xl font-bold text-white md:text-4xl">
            Four ways to travel with TrekRoots
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {OFFERINGS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                data-ocid={`about.offer.${item.href.slice(1)}`}
                className="group rounded-xl border border-white/15 bg-white/5 p-6 transition-colors hover:border-[#FFC107]/50 hover:bg-white/10"
              >
                <div className="mb-3 flex items-center justify-between gap-3">
                  <h3 className="font-display text-xl font-bold text-white">
                    {item.title}
                  </h3>
                  <Compass
                    size={18}
                    className="text-[#FFD54F] opacity-70 transition-opacity group-hover:opacity-100"
                  />
                </div>
                <p className="mb-4 font-body text-sm leading-relaxed text-white/70">
                  {item.body}
                </p>
                <span className="inline-flex items-center gap-1.5 font-body text-xs font-bold text-[#FFC107]">
                  {item.cta}
                  <ArrowRight size={13} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Safety + base */}
      <section className="px-4 py-16 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <SectionLabel>Safety & responsibility</SectionLabel>
            <h2
              className="mb-4 font-display text-3xl font-bold"
              style={{ color: INK_DEEP }}
            >
              The mountain comes first
            </h2>
            <ul className="space-y-3 font-body text-sm leading-relaxed text-[#3D4F46]">
              <li className="flex gap-3">
                <Shield size={16} className="mt-0.5 shrink-0" style={{ color: INK }} />
                Turn-back times on summit days — written down, not improvised.
              </li>
              <li className="flex gap-3">
                <Award size={16} className="mt-0.5 shrink-0" style={{ color: INK }} />
                Fitness guidance before you book; we move you to an easier trek
                when the mountain is not right yet.
              </li>
              <li className="flex gap-3">
                <Leaf size={16} className="mt-0.5 shrink-0" style={{ color: INK }} />
                Trash carried down. No single-use plastic on trail. Campsites
                rotated to protect meadows.
              </li>
              <li className="flex gap-3">
                <Sparkles size={16} className="mt-0.5 shrink-0" style={{ color: INK }} />
                Price you see covers stay, trail meals, permits and camping gear
                — GST is the only checkout add-on.
              </li>
            </ul>
          </div>
          <div
            className="rounded-2xl border p-6 md:p-8"
            style={{ background: CREAM, borderColor: "#E8E4D4" }}
          >
            <SectionLabel>Home base</SectionLabel>
            <h2
              className="mb-4 font-display text-2xl font-bold"
              style={{ color: INK_DEEP }}
            >
              Dehradun, Uttarakhand
            </h2>
            <p className="mb-6 font-body text-sm leading-relaxed text-[#5A6B62]">
              Our planning desk sits where the Himalayas begin for most
              travellers — close to Jolly Grant Airport and the roadheads that
              feed Garhwal and beyond.
            </p>
            <div className="space-y-3 font-body text-sm text-[#1A1A1A]">
              <p className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 shrink-0" style={{ color: INK }} />
                Dehradun, Uttarakhand 248001
              </p>
              <a
                href={PHONE_HREF}
                className="flex items-center gap-2 hover:underline"
              >
                <Phone size={16} style={{ color: INK }} />
                {PHONE_DISPLAY}
              </a>
              <a
                href={CONTACT_EMAIL_HREF}
                className="flex items-center gap-2 hover:underline"
              >
                <Sparkles size={16} style={{ color: INK }} />
                {CONTACT_EMAIL}
              </a>
            </div>
            <Link
              href="/contact"
              data-ocid="about.base_contact"
              className="mt-6 inline-flex items-center gap-2 rounded-md px-4 py-2.5 font-body text-xs font-bold text-[#1A1A1A]"
              style={{ background: GOLD }}
            >
              Contact the desk
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Trust */}
      <section
        className="border-y px-4 py-12"
        style={{ borderColor: "#E8E4D4", background: "#FAFAF7" }}
      >
        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-4">
          {TRUST.map((item) => (
            <div
              key={item.label}
              className="rounded-lg border bg-white px-3 py-5 text-center"
              style={{ borderColor: "#E8E4D4" }}
            >
              <Award
                size={18}
                className="mx-auto mb-2"
                style={{ color: INK }}
              />
              <p className="font-body text-[11px] font-semibold leading-snug text-[#3D4F46]">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-16 md:py-20" style={{ background: GOLD }}>
        <div className="mx-auto max-w-2xl text-center">
          <h2
            className="mb-4 font-display text-3xl font-bold md:text-4xl"
            style={{ color: INK_DEEP }}
          >
            Ready when the mountains are
          </h2>
          <p className="mb-8 font-body text-sm leading-relaxed text-[#3D4F46] md:text-base">
            Tell us your dates and fitness. We&apos;ll match a trek, yatra,
            package or stay — and send a packing list before you pack a bag.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={whatsappLink(
                "Hi TrekRoots! I want to plan a Himalayan trip.",
              )}
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="about.cta_whatsapp"
              className="inline-flex items-center gap-2 rounded-md px-6 py-3 font-body text-sm font-bold text-white"
              style={{ background: INK_DEEP }}
            >
              Message on WhatsApp
              <ArrowRight size={15} />
            </a>
            <Link
              href="/treks"
              data-ocid="about.cta_treks"
              className="inline-flex items-center gap-2 rounded-md border-2 px-6 py-3 font-body text-sm font-bold"
              style={{ borderColor: INK_DEEP, color: INK_DEEP }}
            >
              Explore treks
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
