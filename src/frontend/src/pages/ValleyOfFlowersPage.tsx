import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Award,
  Calendar,
  Camera,
  CheckCircle,
  ChevronDown,
  ChevronRight,
  Clock,
  Flower2,
  Leaf,
  MapPin,
  MessageCircle,
  Mountain,
  Phone,
  Shield,
  Star,
  Sun,
  Tent,
  TreePine,
  Users,
  X,
  XCircle,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

// ─── Data ───────────────────────────────────────────────────────────────────

const HIGHLIGHTS = [
  {
    icon: <Award size={24} />,
    title: "UNESCO World Heritage Site",
    desc: "One of only two UNESCO Valley biosphere reserves in Uttarakhand, protected since 1982.",
  },
  {
    icon: <Flower2 size={24} />,
    title: "500+ Wildflower Species",
    desc: "Himalayan blue poppies, brahmakamal, cobra lilies, orchids and alpine flora carpet the valley.",
  },
  {
    icon: <Tent size={24} />,
    title: "Alpine Meadow Camping",
    desc: "Camp at Ghangaria base, surrounded by towering peaks and the sound of glacial streams.",
  },
  {
    icon: <TreePine size={24} />,
    title: "Expert-Guided Trek",
    desc: "Certified mountain guides with deep knowledge of local flora, fauna, and trail safety.",
  },
];

const GALLERY = [
  {
    src: "/assets/generated/vof-hero-cinematic.dim_1920x1080.jpg",
    alt: "Valley of Flowers panoramic view",
    span: "col-span-2 row-span-2",
  },
  {
    src: "/assets/generated/vof-gallery-blue-poppies.dim_800x600.jpg",
    alt: "Himalayan blue poppies",
    span: "col-span-1",
  },
  {
    src: "/assets/generated/vof-gallery-ghangaria.dim_800x600.jpg",
    alt: "Ghangaria base camp",
    span: "col-span-1",
  },
  {
    src: "/assets/generated/vof-gallery-trekkers.dim_800x600.jpg",
    alt: "Trekkers in the valley",
    span: "col-span-1",
  },
  {
    src: "/assets/generated/vof-gallery-hemkund.dim_800x600.jpg",
    alt: "Hemkund Sahib",
    span: "col-span-1",
  },
];

const SEASON_DATA = [
  {
    months: "July",
    condition: "Opening",
    temp: "12–18°C",
    flowers: "Early bloomers — wild berries, anemones, saxifrage",
    crowd: "Moderate",
    color: "#5A8A6A",
  },
  {
    months: "August",
    condition: "Peak",
    temp: "14–20°C",
    flowers:
      "Full bloom — blue poppies, brahmakamal, cobra lilies, 500+ species",
    crowd: "High",
    color: "#C04000",
  },
  {
    months: "September",
    condition: "Late Season",
    temp: "8–16°C",
    flowers: "Autumn colors — late orchids, asters, golden meadows",
    crowd: "Low",
    color: "#ED872D",
  },
];

const ITINERARY = [
  {
    day: 1,
    title: "Rishikesh → Govindghat",
    route: "Rishikesh to Govindghat",
    distance: "200 km drive",
    altitude: "1,828 m",
    summary:
      "Depart Rishikesh early morning for the scenic drive through Devprayag, Rudraprayag, Joshimath and onward to Govindghat. Check into guesthouse, acclimatize, and enjoy a briefing on the trek ahead.",
    overnight: "Govindghat",
  },
  {
    day: 2,
    title: "Govindghat → Ghangaria",
    route: "Trek to Base Camp",
    distance: "9 km trek",
    altitude: "3,050 m",
    summary:
      "Trek begins at Govindghat along the Pushpawati river. The trail passes through dense oak and rhododendron forests, with cascading waterfalls. Ghangaria is a small hamlet at the base of both the Valley and Hemkund Sahib.",
    overnight: "Ghangaria guesthouse",
  },
  {
    day: 3,
    title: "Valley of Flowers — Day 1",
    route: "Entry & Exploration",
    distance: "8 km round trip",
    altitude: "3,658 m",
    summary:
      "Enter the UNESCO Valley of Flowers National Park with forest permit. The first half reveals meadows of Himalayan blue poppies and brahmakamal. Expert naturalist guide introduces you to alpine flora and fauna.",
    overnight: "Ghangaria guesthouse",
  },
  {
    day: 4,
    title: "Valley of Flowers — Full Exploration",
    route: "Deep Valley Trek",
    distance: "10 km",
    altitude: "3,658 m",
    summary:
      "A full day inside the valley — venture deeper toward the Tipra Glacier. Photograph cobra lilies, wild orchids, aconite and the rare Saussurea obvallata (brahmakamal). Packed lunch amidst flowers.",
    overnight: "Ghangaria guesthouse",
  },
  {
    day: 5,
    title: "Hemkund Sahib",
    route: "Sacred Lake & Gurudwara",
    distance: "12 km round trip",
    altitude: "4,329 m",
    summary:
      "Trek to Hemkund Sahib, the highest Sikh shrine in the world. The glacial lake at 4,329 m is breathtaking. Visit the Gurudwara, take a holy dip in the lake, and begin the descent back to Ghangaria.",
    overnight: "Ghangaria guesthouse",
  },
  {
    day: 6,
    title: "Ghangaria → Govindghat",
    route: "Descent to Valley Floor",
    distance: "9 km descent",
    altitude: "1,828 m",
    summary:
      "Descend along the Pushpawati river trail, bidding farewell to the valley. Photographs of the journey, final meals in Ghangaria, then trek back to Govindghat before nightfall.",
    overnight: "Govindghat",
  },
  {
    day: 7,
    title: "Govindghat → Rishikesh",
    route: "Return Journey",
    distance: "200 km drive",
    altitude: "360 m",
    summary:
      "After breakfast, transfer to Rishikesh via Joshimath. Enjoy the scenic Alaknanda river valley drive. Arrive Rishikesh by late afternoon — end of an unforgettable Himalayan journey.",
    overnight: "Home",
  },
];

const INCLUDED = [
  "6 nights accommodation (guesthouses/camps)",
  "All meals from Day 2–6 (breakfast, lunch, dinner)",
  "Certified mountain guide + naturalist",
  "Valley of Flowers Forest Entry Permit",
  "First aid kit & oxygen cylinder",
  "All ground transportation Rishikesh–Govindghat",
  "Porters for group equipment",
  "Manya Destination trekking T-shirt & bandana",
];

const EXCLUDED = [
  "Flights or train tickets to Rishikesh",
  "Personal porter (₹1,200/day, optional)",
  "Travel insurance (strongly recommended)",
  "Tips for guides and staff",
  "Personal trekking gear",
  "Anything not mentioned in inclusions",
];

const PRACTICAL_DETAILS = [
  {
    title: "How to Reach",
    icon: <MapPin size={20} />,
    content: [
      "Nearest Airport: Jolly Grant Airport, Dehradun (247 km)",
      "Nearest Railway: Haridwar Junction (295 km) or Rishikesh (300 km)",
      "Drive: Rishikesh → Govindghat is ~9 hours via Joshimath",
      "We arrange group pickup from Rishikesh Bus Stand",
    ],
  },
  {
    title: "Permits & Regulations",
    icon: <Shield size={20} />,
    content: [
      "Forest entry permit: ₹150/day (Indian), ₹600/day (Foreign)",
      "No overnight stay inside the Valley allowed",
      "Plastic bags strictly prohibited inside the park",
      "We arrange all permits — no separate action required",
    ],
  },
  {
    title: "Physical Fitness",
    icon: <Mountain size={20} />,
    content: [
      "Grade: Moderate — suitable for fit beginners",
      "Daily trekking: 8–12 km over 4–6 hours",
      "Altitude gain up to 4,329 m (Hemkund Sahib)",
      "Recommended: Cardio fitness 3–4 weeks before departure",
    ],
  },
];

const WHAT_TO_PACK = [
  "Waterproof trekking shoes (ankle support)",
  "Rain jacket and poncho",
  "Fleece jacket and thermal innerwear",
  "Trekking pants (quick-dry)",
  "Sunscreen SPF 50+ and UV sunglasses",
  "Personal medication and first aid basics",
  "Water bottle (1.5–2 liters)",
  "Camera and extra batteries",
];

const TESTIMONIALS = [
  {
    name: "Rohan Kapoor",
    nationality: "Mumbai, India",
    rating: 5,
    quote:
      "Walking through a sea of Himalayan blue poppies was unlike anything I've ever experienced. Manya's naturalist guide named every flower — it was like a private botany class at 3,600 metres.",
    trip: "Valley of Flowers, August 2024",
  },
  {
    name: "Isabelle Fontaine",
    nationality: "Lyon, France",
    rating: 5,
    quote:
      "I've trekked in the Alps and Patagonia, but the Valley of Flowers surpassed them all in sheer colour and serenity. The Hemkund Sahib day was spiritually moving. Absolutely world-class.",
    trip: "Valley of Flowers, September 2024",
  },
  {
    name: "Priya Nambiar",
    nationality: "Bengaluru, India",
    rating: 5,
    quote:
      "Our guide Raju knew every bloom by name in Latin and local dialect. The campfire stories about Hindu mythology and botanical history made this much more than just a trek — it was a true expedition.",
    trip: "Valley of Flowers, August 2023",
  },
];

const PRICE_TIERS = [
  {
    label: "Budget",
    price: 18500,
    desc: "Shared dorms, packed meals, standard guide",
  },
  {
    label: "Standard",
    price: 28500,
    desc: "Twin sharing, restaurant meals, expert guide",
  },
  {
    label: "Premium",
    price: 38500,
    desc: "Private room, chef meals, naturalist + guide",
  },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: string }) {
  return (
    <p
      className="text-[11px] font-body font-semibold uppercase tracking-[0.2em] mb-3"
      style={{ color: "#C04000" }}
    >
      {children}
    </p>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="font-display font-bold leading-[1.1] mb-4"
      style={{
        fontStyle: "italic",
        fontSize: "clamp(26px, 3.5vw, 40px)",
        color: "#1A1A1A",
      }}
    >
      {children}
    </h2>
  );
}

function ItineraryItem({
  item,
  index,
}: { item: (typeof ITINERARY)[0]; index: number }) {
  const [open, setOpen] = useState(index === 0);
  return (
    <div
      className="border-b last:border-b-0"
      style={{ borderColor: "#E5DDD0" }}
      data-ocid={`itinerary.item.${item.day}`}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full text-left py-5 px-0 flex items-start gap-4 group"
        aria-expanded={open}
      >
        <div
          className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-body font-bold text-[13px] mt-0.5"
          style={
            open
              ? { backgroundColor: "#3C1414", color: "#E6BE8A" }
              : { backgroundColor: "#F5F0E8", color: "#7A7A7A" }
          }
        >
          {item.day}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p
                className="font-body text-[11px] font-semibold uppercase tracking-widest mb-0.5"
                style={{ color: "#C04000" }}
              >
                Day {item.day} · {item.route}
              </p>
              <h4
                className="font-display font-bold text-[18px] leading-snug"
                style={{ fontStyle: "italic", color: "#1A1A1A" }}
              >
                {item.title}
              </h4>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <span
                className="hidden sm:flex items-center gap-1 font-body text-[11px]"
                style={{ color: "#7A7A7A" }}
              >
                <Mountain size={11} /> {item.altitude}
              </span>
              <span
                className="hidden sm:flex items-center gap-1 font-body text-[11px]"
                style={{ color: "#7A7A7A" }}
              >
                <Clock size={11} /> {item.distance}
              </span>
              <ChevronDown
                size={16}
                className="transition-transform duration-200"
                style={{
                  color: "#C04000",
                  transform: open ? "rotate(180deg)" : "rotate(0deg)",
                }}
              />
            </div>
          </div>
        </div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pl-14 pb-5 pr-2">
              <p
                className="font-body text-[14px] leading-relaxed mb-3"
                style={{ color: "#4A4A4A" }}
              >
                {item.summary}
              </p>
              <div className="flex flex-wrap gap-3">
                <span
                  className="flex items-center gap-1.5 font-body text-[12px] px-3 py-1 rounded-full"
                  style={{ backgroundColor: "#F5F0E8", color: "#3C1414" }}
                >
                  <Mountain size={11} /> {item.altitude}
                </span>
                <span
                  className="flex items-center gap-1.5 font-body text-[12px] px-3 py-1 rounded-full"
                  style={{ backgroundColor: "#F5F0E8", color: "#3C1414" }}
                >
                  <Clock size={11} /> {item.distance}
                </span>
                <span
                  className="flex items-center gap-1.5 font-body text-[12px] px-3 py-1 rounded-full"
                  style={{ backgroundColor: "#FFF3E8", color: "#C04000" }}
                >
                  <MapPin size={11} /> Stay: {item.overnight}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function PracticalCard({ item }: { item: (typeof PRACTICAL_DETAILS)[0] }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ border: "1px solid #E5DDD0", backgroundColor: "#FAFAF7" }}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-3 p-5 text-left"
      >
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
            style={{ backgroundColor: "#F5F0E8", color: "#C04000" }}
          >
            {item.icon}
          </div>
          <h4
            className="font-display font-bold text-[17px]"
            style={{ fontStyle: "italic", color: "#1A1A1A" }}
          >
            {item.title}
          </h4>
        </div>
        <ChevronDown
          size={16}
          style={{
            color: "#C04000",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s",
          }}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <ul className="px-5 pb-5 space-y-2">
              {item.content.map((line) => (
                <li
                  key={line}
                  className="flex items-start gap-2 font-body text-[13px]"
                  style={{ color: "#4A4A4A" }}
                >
                  <ChevronRight
                    size={13}
                    className="mt-0.5 shrink-0"
                    style={{ color: "#C04000" }}
                  />
                  {line}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function BookingSidebar() {
  const [groupSize, setGroupSize] = useState(2);
  const [tier, setTier] = useState(1); // 0=budget, 1=standard, 2=premium
  const price = PRICE_TIERS[tier].price;
  const total = price * groupSize;

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        border: "1px solid #E5DDD0",
        backgroundColor: "#FAFAF7",
        boxShadow: "0 8px 32px rgba(60,20,20,0.1)",
      }}
      data-ocid="booking.card"
    >
      {/* Price header */}
      <div className="p-6" style={{ backgroundColor: "#3C1414" }}>
        <p
          className="font-body text-[11px] font-semibold uppercase tracking-[0.2em] mb-1"
          style={{ color: "rgba(230,190,138,0.7)" }}
        >
          Starting from
        </p>
        <div className="flex items-baseline gap-2">
          <span
            className="font-display font-bold"
            style={{
              fontStyle: "italic",
              fontSize: "clamp(30px, 3vw, 38px)",
              color: "#E6BE8A",
            }}
          >
            ₹{price.toLocaleString("en-IN")}
          </span>
          <span
            className="font-body text-[13px]"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            / person
          </span>
        </div>
        <p
          className="font-body text-[12px] mt-1"
          style={{ color: "rgba(230,190,138,0.6)" }}
        >
          {PRICE_TIERS[tier].desc}
        </p>
      </div>

      <div className="p-5 space-y-4">
        {/* Accommodation tier */}
        <div>
          <p
            className="font-body text-[12px] font-semibold uppercase tracking-wide block mb-2"
            style={{ color: "#7A7A7A" }}
          >
            Accommodation Type
          </p>
          <div className="grid grid-cols-3 gap-1.5">
            {PRICE_TIERS.map((t, i) => (
              <button
                key={t.label}
                type="button"
                onClick={() => setTier(i)}
                data-ocid={`booking.tier_${t.label.toLowerCase()}`}
                className="py-2 px-1 rounded-lg font-body text-[12px] font-semibold transition-all duration-200"
                style={{
                  backgroundColor: tier === i ? "#3C1414" : "#F5F0E8",
                  color: tier === i ? "#E6BE8A" : "#7A7A7A",
                  border:
                    tier === i ? "1px solid #3C1414" : "1px solid #E5DDD0",
                }}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Group size */}
        <div>
          <p
            className="font-body text-[12px] font-semibold uppercase tracking-wide block mb-2"
            style={{ color: "#7A7A7A" }}
          >
            Group Size
          </p>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setGroupSize((g) => Math.max(1, g - 1))}
              data-ocid="booking.group_decrease"
              className="w-9 h-9 rounded-full flex items-center justify-center font-body font-bold transition-all hover:opacity-80"
              style={{
                backgroundColor: "#F5F0E8",
                color: "#3C1414",
                border: "1px solid #E5DDD0",
              }}
            >
              −
            </button>
            <span
              className="font-body font-bold text-[18px] w-8 text-center"
              style={{ color: "#1A1A1A" }}
              data-ocid="booking.group_size"
            >
              {groupSize}
            </span>
            <button
              type="button"
              onClick={() => setGroupSize((g) => Math.min(12, g + 1))}
              data-ocid="booking.group_increase"
              className="w-9 h-9 rounded-full flex items-center justify-center font-body font-bold transition-all hover:opacity-80"
              style={{
                backgroundColor: "#F5F0E8",
                color: "#3C1414",
                border: "1px solid #E5DDD0",
              }}
            >
              +
            </button>
            <span
              className="font-body text-[12px]"
              style={{ color: "#7A7A7A" }}
            >
              people (max 12)
            </span>
          </div>
        </div>

        {/* Total */}
        <div
          className="flex items-center justify-between py-3 px-4 rounded-xl"
          style={{ backgroundColor: "#F5F0E8", border: "1px solid #E5DDD0" }}
        >
          <span className="font-body text-[13px]" style={{ color: "#7A7A7A" }}>
            Total Estimate
          </span>
          <span
            className="font-body font-bold text-[18px]"
            style={{ color: "#3C1414" }}
          >
            ₹{total.toLocaleString("en-IN")}
          </span>
        </div>

        {/* CTA Buttons */}
        <Link
          to="/booking/valley-of-flowers"
          data-ocid="booking.book_now_button"
          className="block w-full text-center py-3.5 rounded-xl font-body font-semibold text-[14px] transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
          style={{ backgroundColor: "#C04000", color: "#fff" }}
        >
          Book Now — Confirm Spot
        </Link>

        <a
          href="https://wa.me/919999999999?text=Hi!%20I%27m%20interested%20in%20the%20Valley%20of%20Flowers%20Trek"
          target="_blank"
          rel="noopener noreferrer"
          data-ocid="booking.whatsapp_button"
          className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-body font-semibold text-[14px] transition-all duration-200 hover:opacity-80"
          style={{ backgroundColor: "#25D366", color: "#fff" }}
        >
          <MessageCircle size={16} /> WhatsApp Enquiry
        </a>

        <a
          href="tel:+919999999999"
          data-ocid="booking.call_button"
          className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-body font-medium text-[14px] transition-all duration-200 hover:opacity-80"
          style={{
            border: "1px solid #E5DDD0",
            color: "#3C1414",
            backgroundColor: "#fff",
          }}
        >
          <Phone size={14} /> Call +91 99999 99999
        </a>

        {/* Trust Badges */}
        <div
          className="pt-3 border-t space-y-2"
          style={{ borderColor: "#E5DDD0" }}
        >
          {[
            {
              icon: <Shield size={13} />,
              text: "Free cancellation 30 days before",
            },
            {
              icon: <CheckCircle size={13} />,
              text: "30% advance, balance before trek",
            },
            {
              icon: <Users size={13} />,
              text: "Expert certified mountain guides",
            },
            {
              icon: <Award size={13} />,
              text: "Uttarakhand Tourism registered",
            },
          ].map((b) => (
            <div key={b.text} className="flex items-center gap-2">
              <span style={{ color: "#5A8A6A" }}>{b.icon}</span>
              <span
                className="font-body text-[11px]"
                style={{ color: "#7A7A7A" }}
              >
                {b.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Price Calculator ─────────────────────────────────────────────────────────

function PriceCalculator() {
  const [numPeople, setNumPeople] = useState(2);
  const [tier, setTier] = useState(1);
  const [extras, setExtras] = useState({
    porter: false,
    insurance: false,
    photography: false,
  });

  const basePrice = PRICE_TIERS[tier].price * numPeople;
  const porterCost = extras.porter ? 1200 * 6 * numPeople : 0;
  const insuranceCost = extras.insurance ? 899 * numPeople : 0;
  const photographyCost = extras.photography ? 4999 : 0;
  const total = basePrice + porterCost + insuranceCost + photographyCost;
  const discount = numPeople >= 6 ? Math.round(total * 0.05) : 0;
  const finalTotal = total - discount;

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ border: "1px solid #E5DDD0", backgroundColor: "#FAFAF7" }}
      data-ocid="calculator.section"
    >
      <div
        className="p-5"
        style={{
          backgroundColor: "#F5F0E8",
          borderBottom: "1px solid #E5DDD0",
        }}
      >
        <SectionLabel>Trip Cost Estimator</SectionLabel>
        <h3
          className="font-display font-bold text-[22px]"
          style={{ fontStyle: "italic", color: "#1A1A1A" }}
        >
          Calculate Your Journey Cost
        </h3>
      </div>

      <div className="p-5 space-y-5">
        {/* Tier select */}
        <div>
          <p
            className="font-body text-[12px] font-semibold uppercase tracking-wide block mb-2"
            style={{ color: "#7A7A7A" }}
          >
            Accommodation Package
          </p>
          <div className="grid grid-cols-3 gap-2">
            {PRICE_TIERS.map((t, i) => (
              <button
                key={t.label}
                type="button"
                onClick={() => setTier(i)}
                data-ocid={`calculator.tier_${t.label.toLowerCase()}`}
                className="py-2.5 rounded-lg font-body text-[12px] font-semibold transition-all"
                style={{
                  backgroundColor: tier === i ? "#3C1414" : "#fff",
                  color: tier === i ? "#E6BE8A" : "#4A4A4A",
                  border:
                    tier === i ? "1px solid #3C1414" : "1px solid #E5DDD0",
                }}
              >
                <div>{t.label}</div>
                <div className="text-[10px] mt-0.5" style={{ opacity: 0.7 }}>
                  ₹{t.price.toLocaleString("en-IN")}/pp
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* People count */}
        <div>
          <p
            className="font-body text-[12px] font-semibold uppercase tracking-wide block mb-2"
            style={{ color: "#7A7A7A" }}
          >
            Number of Travelers
          </p>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setNumPeople((n) => Math.max(1, n - 1))}
              data-ocid="calculator.people_decrease"
              className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-[18px] transition-all hover:opacity-80"
              style={{
                backgroundColor: "#F5F0E8",
                color: "#3C1414",
                border: "1px solid #E5DDD0",
              }}
            >
              −
            </button>
            <span
              className="font-body font-bold text-[20px] w-8 text-center"
              style={{ color: "#1A1A1A" }}
              data-ocid="calculator.people_count"
            >
              {numPeople}
            </span>
            <button
              type="button"
              onClick={() => setNumPeople((n) => Math.min(20, n + 1))}
              data-ocid="calculator.people_increase"
              className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-[18px] transition-all hover:opacity-80"
              style={{
                backgroundColor: "#F5F0E8",
                color: "#3C1414",
                border: "1px solid #E5DDD0",
              }}
            >
              +
            </button>
            {numPeople >= 6 && (
              <span
                className="font-body text-[11px] px-2 py-1 rounded-full"
                style={{ backgroundColor: "#DCFCE7", color: "#166534" }}
              >
                5% group discount!
              </span>
            )}
          </div>
        </div>

        {/* Optional add-ons */}
        <div>
          <p
            className="font-body text-[12px] font-semibold uppercase tracking-wide block mb-2"
            style={{ color: "#7A7A7A" }}
          >
            Optional Add-ons
          </p>
          <div className="space-y-2">
            {[
              {
                key: "porter" as const,
                label: "Personal Porter",
                price: "₹1,200/day × 6 days/person",
              },
              {
                key: "insurance" as const,
                label: "Travel Insurance",
                price: "₹899/person",
              },
              {
                key: "photography" as const,
                label: "Professional Photography",
                price: "₹4,999 (group)",
              },
            ].map((addon) => (
              <label
                key={addon.key}
                className="flex items-center justify-between gap-3 py-2 px-3 rounded-lg cursor-pointer transition-all hover:opacity-80"
                style={{
                  backgroundColor: extras[addon.key] ? "#FFF3E8" : "#F5F0E8",
                  border: `1px solid ${extras[addon.key] ? "#ED872D" : "#E5DDD0"}`,
                }}
              >
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={extras[addon.key]}
                    onChange={(e) =>
                      setExtras((prev) => ({
                        ...prev,
                        [addon.key]: e.target.checked,
                      }))
                    }
                    className="w-4 h-4 accent-orange-600"
                    data-ocid={`calculator.addon_${addon.key}`}
                  />
                  <span
                    className="font-body text-[13px]"
                    style={{ color: "#1A1A1A" }}
                  >
                    {addon.label}
                  </span>
                </div>
                <span
                  className="font-body text-[11px]"
                  style={{ color: "#7A7A7A" }}
                >
                  {addon.price}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Cost breakdown */}
        <div
          className="rounded-xl p-4 space-y-2"
          style={{ backgroundColor: "#F5F0E8", border: "1px solid #E5DDD0" }}
        >
          <div
            className="flex justify-between font-body text-[13px]"
            style={{ color: "#4A4A4A" }}
          >
            <span>
              Base ({PRICE_TIERS[tier].label} × {numPeople} pax)
            </span>
            <span>₹{basePrice.toLocaleString("en-IN")}</span>
          </div>
          {porterCost > 0 && (
            <div
              className="flex justify-between font-body text-[13px]"
              style={{ color: "#4A4A4A" }}
            >
              <span>Porter cost</span>
              <span>₹{porterCost.toLocaleString("en-IN")}</span>
            </div>
          )}
          {insuranceCost > 0 && (
            <div
              className="flex justify-between font-body text-[13px]"
              style={{ color: "#4A4A4A" }}
            >
              <span>Insurance</span>
              <span>₹{insuranceCost.toLocaleString("en-IN")}</span>
            </div>
          )}
          {photographyCost > 0 && (
            <div
              className="flex justify-between font-body text-[13px]"
              style={{ color: "#4A4A4A" }}
            >
              <span>Photography</span>
              <span>₹{photographyCost.toLocaleString("en-IN")}</span>
            </div>
          )}
          {discount > 0 && (
            <div
              className="flex justify-between font-body text-[13px]"
              style={{ color: "#5A8A6A" }}
            >
              <span>Group discount (5%)</span>
              <span>−₹{discount.toLocaleString("en-IN")}</span>
            </div>
          )}
          <div
            className="flex justify-between font-body font-bold text-[16px] pt-2 mt-2"
            style={{ color: "#3C1414", borderTop: "1px solid #E5DDD0" }}
          >
            <span>Total Estimate</span>
            <span>₹{finalTotal.toLocaleString("en-IN")}</span>
          </div>
          <p className="font-body text-[10px]" style={{ color: "#7A7A7A" }}>
            * Flights and personal gear not included. Prices subject to seasonal
            variation.
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ValleyOfFlowersPage() {
  const [galleryOpen, setGalleryOpen] = useState<number | null>(null);
  const [packOpen, setPackOpen] = useState(false);

  return (
    <div style={{ backgroundColor: "#FAFAF7" }}>
      {/* ── Cinematic Hero ──────────────────────────────────────────────── */}
      <section
        data-ocid="vof.hero.section"
        className="relative overflow-hidden"
        style={{ height: "100vh", minHeight: "640px" }}
      >
        <img
          src="/assets/generated/vof-hero-cinematic.dim_1920x1080.jpg"
          alt="Valley of Flowers National Park"
          className="absolute inset-0 w-full h-full object-cover object-center"
          fetchPriority="high"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.05) 40%, rgba(0,0,0,0.78) 100%)",
          }}
        />

        {/* Hero content */}
        <div className="absolute bottom-0 left-0 right-0 z-10 px-6 md:px-16 pb-28 max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <div className="flex items-center gap-3 mb-5">
              <span
                className="text-[10px] font-body font-bold uppercase tracking-[0.22em] px-3 py-1.5 rounded-full"
                style={{ backgroundColor: "#E6BE8A", color: "#3C1414" }}
              >
                TREK
              </span>
              <span
                className="text-[10px] font-body font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full"
                style={{
                  backgroundColor: "rgba(255,255,255,0.15)",
                  color: "rgba(255,255,255,0.9)",
                  backdropFilter: "blur(8px)",
                }}
              >
                UNESCO World Heritage
              </span>
            </div>
            <h1
              className="font-display font-bold text-white leading-[1.0] mb-3"
              style={{
                fontStyle: "italic",
                fontSize: "clamp(42px, 7vw, 96px)",
                textShadow: "0 2px 40px rgba(0,0,0,0.4)",
              }}
            >
              Valley of Flowers
            </h1>
            <p
              className="font-body text-white/80 mb-0"
              style={{
                fontSize: "clamp(15px, 2vw, 20px)",
                letterSpacing: "0.04em",
              }}
            >
              A UNESCO World Heritage Trek
            </p>
          </motion.div>
        </div>

        {/* Key stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="absolute bottom-0 left-0 right-0 z-20"
        >
          <div
            className="flex flex-wrap items-center justify-center gap-0 divide-x"
            style={{
              backgroundColor: "rgba(20,8,8,0.85)",
              backdropFilter: "blur(16px)",
              borderTop: "1px solid rgba(230,190,138,0.25)",
            }}
          >
            {[
              {
                icon: <Calendar size={14} />,
                label: "Duration",
                value: "7 Days",
              },
              {
                icon: <Mountain size={14} />,
                label: "Max Altitude",
                value: "3,658 m",
              },
              {
                icon: <Sun size={14} />,
                label: "Difficulty",
                value: "Moderate",
              },
              { icon: <Leaf size={14} />, label: "Season", value: "Jul–Sep" },
              {
                icon: <Users size={14} />,
                label: "Group",
                value: "2–12 People",
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center py-4 px-6 sm:px-8"
                style={{ borderColor: "rgba(230,190,138,0.2)" }}
              >
                <div
                  className="flex items-center gap-1.5 mb-1"
                  style={{ color: "#E6BE8A" }}
                >
                  {stat.icon}
                  <span
                    className="font-body text-[10px] font-semibold uppercase tracking-widest"
                    style={{ color: "rgba(230,190,138,0.7)" }}
                  >
                    {stat.label}
                  </span>
                </div>
                <span
                  className="font-display font-bold text-white text-[16px]"
                  style={{ fontStyle: "italic" }}
                >
                  {stat.value}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── Breadcrumb ─────────────────────────────────────────────────── */}
      <nav
        className="px-6 md:px-16 py-4 max-w-[1400px] mx-auto"
        aria-label="breadcrumb"
        data-ocid="vof.breadcrumb"
      >
        <ol
          className="flex items-center gap-2 font-body text-[12px]"
          style={{ color: "#7A7A7A" }}
        >
          <li>
            <Link
              to="/"
              className="hover:underline"
              style={{ color: "#C04000" }}
            >
              Home
            </Link>
          </li>
          <li>
            <ChevronRight size={12} />
          </li>
          <li>
            <Link
              to="/treks"
              className="hover:underline"
              style={{ color: "#C04000" }}
            >
              Treks
            </Link>
          </li>
          <li>
            <ChevronRight size={12} />
          </li>
          <li style={{ color: "#1A1A1A", fontWeight: 500 }}>
            Valley of Flowers
          </li>
        </ol>
      </nav>

      {/* ── Main Two-Column Layout ────────────────────────────────────── */}
      <div className="px-6 md:px-16 max-w-[1400px] mx-auto pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12 xl:gap-16">
          {/* ── LEFT: Content ─────────────────────────────── */}
          <div className="min-w-0">
            {/* Journey Highlights */}
            <motion.section
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="py-10"
              data-ocid="vof.highlights.section"
            >
              <SectionLabel>Why This Trek</SectionLabel>
              <SectionHeading>Journey Highlights</SectionHeading>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                {HIGHLIGHTS.map((h, i) => (
                  <motion.div
                    key={h.title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="flex gap-4 p-5 rounded-xl"
                    style={{
                      backgroundColor: "#F5F0E8",
                      border: "1px solid #E5DDD0",
                    }}
                    data-ocid={`vof.highlight.${i + 1}`}
                  >
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                      style={{ backgroundColor: "#3C1414", color: "#E6BE8A" }}
                    >
                      {h.icon}
                    </div>
                    <div>
                      <h4
                        className="font-display font-bold text-[16px] mb-1"
                        style={{ fontStyle: "italic", color: "#1A1A1A" }}
                      >
                        {h.title}
                      </h4>
                      <p
                        className="font-body text-[13px] leading-relaxed"
                        style={{ color: "#7A7A7A" }}
                      >
                        {h.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Gallery */}
            <section
              className="py-10 border-t"
              style={{ borderColor: "#E5DDD0" }}
              data-ocid="vof.gallery.section"
            >
              <SectionLabel>Photo Journal</SectionLabel>
              <SectionHeading>The Valley in Every Season</SectionHeading>
              <div
                className="grid grid-cols-4 gap-3 mt-6"
                style={{ gridAutoRows: "180px" }}
              >
                {GALLERY.map((img, i) => (
                  <motion.button
                    key={img.alt}
                    type="button"
                    initial={{ opacity: 0, scale: 0.97 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.07 }}
                    className={`${img.span} rounded-xl overflow-hidden relative group cursor-pointer`}
                    onClick={() => setGalleryOpen(i)}
                    aria-label={`View ${img.alt}`}
                    data-ocid={`vof.gallery.item.${i + 1}`}
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div
                      className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ backgroundColor: "rgba(60,20,20,0.45)" }}
                    >
                      <Camera size={24} color="white" />
                    </div>
                  </motion.button>
                ))}
              </div>
            </section>

            {/* Best Time to Visit */}
            <section
              className="py-10 border-t"
              style={{ borderColor: "#E5DDD0" }}
              data-ocid="vof.season.section"
            >
              <SectionLabel>Seasonal Guide</SectionLabel>
              <SectionHeading>Best Time to Visit</SectionHeading>
              <p
                className="font-body text-[14px] leading-relaxed mb-6"
                style={{ color: "#7A7A7A" }}
              >
                The Valley is open from mid-June to mid-October. The peak bloom
                window is late July to late August — when hundreds of species
                flower simultaneously.
              </p>
              <div className="space-y-4">
                {SEASON_DATA.map((s, i) => (
                  <motion.div
                    key={s.months}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: i * 0.1 }}
                    className="flex flex-col sm:flex-row sm:items-start gap-4 p-5 rounded-xl"
                    style={{
                      border: `1px solid ${s.color}30`,
                      backgroundColor: `${s.color}08`,
                    }}
                    data-ocid={`vof.season.item.${i + 1}`}
                  >
                    <div className="shrink-0">
                      <div
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full font-body text-[11px] font-bold uppercase tracking-widest"
                        style={{ backgroundColor: s.color, color: "#fff" }}
                      >
                        {s.months}
                      </div>
                      <div className="mt-2">
                        <span
                          className="font-body text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded"
                          style={{
                            backgroundColor: `${s.color}20`,
                            color: s.color,
                          }}
                        >
                          {s.condition}
                        </span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap gap-3 mb-2">
                        <span
                          className="flex items-center gap-1 font-body text-[12px]"
                          style={{ color: "#7A7A7A" }}
                        >
                          <Sun size={12} /> {s.temp}
                        </span>
                        <span
                          className="flex items-center gap-1 font-body text-[12px]"
                          style={{ color: "#7A7A7A" }}
                        >
                          <Users size={12} /> Crowd: {s.crowd}
                        </span>
                      </div>
                      <p
                        className="font-body text-[13px] leading-relaxed"
                        style={{ color: "#4A4A4A" }}
                      >
                        {s.flowers}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Itinerary Accordion */}
            <section
              className="py-10 border-t"
              style={{ borderColor: "#E5DDD0" }}
              data-ocid="vof.itinerary.section"
            >
              <SectionLabel>Day-by-Day Plan</SectionLabel>
              <SectionHeading>7-Day Itinerary</SectionHeading>
              <p
                className="font-body text-[14px] leading-relaxed mb-6"
                style={{ color: "#7A7A7A" }}
              >
                A carefully paced journey to acclimatize, explore, and fully
                immerse in the Valley's seasonal spectacle.
              </p>
              <div
                style={{
                  border: "1px solid #E5DDD0",
                  borderRadius: "16px",
                  overflow: "hidden",
                  padding: "0 20px",
                }}
              >
                {ITINERARY.map((item, i) => (
                  <ItineraryItem key={item.day} item={item} index={i} />
                ))}
              </div>
            </section>

            {/* Included / Excluded */}
            <section
              className="py-10 border-t"
              style={{ borderColor: "#E5DDD0" }}
              data-ocid="vof.inclusions.section"
            >
              <SectionLabel>What You Get</SectionLabel>
              <SectionHeading>Included &amp; Excluded</SectionHeading>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div
                  className="p-6 rounded-xl"
                  style={{
                    backgroundColor: "#F0FFF4",
                    border: "1px solid #BBF7D0",
                  }}
                >
                  <h4
                    className="font-display font-bold text-[17px] mb-4"
                    style={{ fontStyle: "italic", color: "#1A1A1A" }}
                  >
                    ✓ What's Included
                  </h4>
                  <ul className="space-y-2">
                    {INCLUDED.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 font-body text-[13px]"
                        style={{ color: "#4A4A4A" }}
                      >
                        <CheckCircle
                          size={14}
                          className="mt-0.5 shrink-0"
                          style={{ color: "#5A8A6A" }}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div
                  className="p-6 rounded-xl"
                  style={{
                    backgroundColor: "#FFF5F5",
                    border: "1px solid #FECACA",
                  }}
                >
                  <h4
                    className="font-display font-bold text-[17px] mb-4"
                    style={{ fontStyle: "italic", color: "#1A1A1A" }}
                  >
                    ✗ Not Included
                  </h4>
                  <ul className="space-y-2">
                    {EXCLUDED.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 font-body text-[13px]"
                        style={{ color: "#4A4A4A" }}
                      >
                        <XCircle
                          size={14}
                          className="mt-0.5 shrink-0"
                          style={{ color: "#C04000" }}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Practical Details */}
            <section
              className="py-10 border-t"
              style={{ borderColor: "#E5DDD0" }}
              data-ocid="vof.practical.section"
            >
              <SectionLabel>Essential Information</SectionLabel>
              <SectionHeading>Practical Details</SectionHeading>
              <div className="space-y-3 mt-6">
                {PRACTICAL_DETAILS.map((item) => (
                  <PracticalCard key={item.title} item={item} />
                ))}

                {/* What to Pack accordion */}
                <div
                  className="rounded-2xl overflow-hidden"
                  style={{
                    border: "1px solid #E5DDD0",
                    backgroundColor: "#FAFAF7",
                  }}
                  data-ocid="vof.pack.accordion"
                >
                  <button
                    type="button"
                    onClick={() => setPackOpen((o) => !o)}
                    className="w-full flex items-center justify-between gap-3 p-5 text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                        style={{ backgroundColor: "#F5F0E8", color: "#C04000" }}
                      >
                        <Camera size={18} />
                      </div>
                      <h4
                        className="font-display font-bold text-[17px]"
                        style={{ fontStyle: "italic", color: "#1A1A1A" }}
                      >
                        What to Pack
                      </h4>
                    </div>
                    <ChevronDown
                      size={16}
                      style={{
                        color: "#C04000",
                        transform: packOpen ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 0.2s",
                      }}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {packOpen && (
                      <motion.div
                        key="pack"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <ul className="px-5 pb-5 grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {WHAT_TO_PACK.map((item) => (
                            <li
                              key={item}
                              className="flex items-start gap-2 font-body text-[13px]"
                              style={{ color: "#4A4A4A" }}
                            >
                              <ChevronRight
                                size={13}
                                className="mt-0.5 shrink-0"
                                style={{ color: "#C04000" }}
                              />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </section>

            {/* Price Calculator */}
            <section
              className="py-10 border-t"
              style={{ borderColor: "#E5DDD0" }}
              data-ocid="vof.calculator.section"
            >
              <PriceCalculator />
            </section>

            {/* Testimonials */}
            <section
              className="py-10 border-t"
              style={{ borderColor: "#E5DDD0" }}
              data-ocid="vof.testimonials.section"
            >
              <SectionLabel>Voices from the Valley</SectionLabel>
              <SectionHeading>Traveller Testimonials</SectionHeading>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
                {TESTIMONIALS.map((t, i) => (
                  <motion.div
                    key={t.name}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="p-6 rounded-2xl flex flex-col"
                    style={{
                      backgroundColor: "#F5F0E8",
                      border: "1px solid #E5DDD0",
                    }}
                    data-ocid={`vof.testimonial.${i + 1}`}
                  >
                    <div className="flex items-center gap-1 mb-4">
                      {Array.from({ length: t.rating }, (_, si) => (
                        <Star
                          key={`${t.name}-star-${si}`}
                          size={12}
                          fill="#E6BE8A"
                          color="#E6BE8A"
                        />
                      ))}
                    </div>
                    <p
                      className="font-display text-[16px] leading-relaxed flex-1 mb-5"
                      style={{ fontStyle: "italic", color: "#1A1A1A" }}
                    >
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <div
                      className="w-10 h-[1px] mb-4"
                      style={{ backgroundColor: "#E6BE8A" }}
                    />
                    <div className="flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center font-body font-bold text-[14px]"
                        style={{ backgroundColor: "#3C1414", color: "#E6BE8A" }}
                      >
                        {t.name[0]}
                      </div>
                      <div>
                        <p
                          className="font-body font-semibold text-[13px]"
                          style={{ color: "#1A1A1A" }}
                        >
                          {t.name}
                        </p>
                        <p
                          className="font-body text-[11px]"
                          style={{ color: "#7A7A7A" }}
                        >
                          {t.nationality} · {t.trip}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          </div>

          {/* ── RIGHT: Sticky Sidebar ─────────────────────── */}
          <div className="hidden lg:block">
            <div className="sticky" style={{ top: "100px" }}>
              <BookingSidebar />

              {/* Quick Trek Facts */}
              <div
                className="mt-4 rounded-2xl p-5"
                style={{
                  border: "1px solid #E5DDD0",
                  backgroundColor: "#F5F0E8",
                }}
                data-ocid="vof.quick_facts.card"
              >
                <h4
                  className="font-display font-bold text-[16px] mb-4"
                  style={{ fontStyle: "italic", color: "#1A1A1A" }}
                >
                  Trek at a Glance
                </h4>
                {[
                  { label: "Starting Point", value: "Govindghat, Chamoli" },
                  { label: "Max Altitude", value: "3,658 m (Valley)" },
                  { label: "Hemkund Altitude", value: "4,329 m" },
                  { label: "Total Distance", value: "38 km round trip" },
                  { label: "Difficulty", value: "Moderate" },
                  { label: "Permit", value: "Forest permit required" },
                  { label: "Group Size", value: "2–12 people" },
                  { label: "Season", value: "July – September" },
                ].map((fact) => (
                  <div
                    key={fact.label}
                    className="flex justify-between items-center py-2"
                    style={{ borderBottom: "1px solid #E5DDD0" }}
                  >
                    <span
                      className="font-body text-[12px]"
                      style={{ color: "#7A7A7A" }}
                    >
                      {fact.label}
                    </span>
                    <span
                      className="font-body font-semibold text-[12px]"
                      style={{ color: "#1A1A1A" }}
                    >
                      {fact.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile Booking CTA ───────────────────────────────────────── */}
      <div
        className="lg:hidden fixed bottom-16 left-0 right-0 z-50 px-4 pb-2"
        data-ocid="vof.mobile_cta"
      >
        <div
          className="flex items-center gap-2 p-3 rounded-2xl"
          style={{
            backgroundColor: "#3C1414",
            boxShadow: "0 8px 32px rgba(60,20,20,0.35)",
          }}
        >
          <div className="flex-1">
            <p
              className="font-body text-[10px]"
              style={{ color: "rgba(230,190,138,0.7)" }}
            >
              From
            </p>
            <p
              className="font-display font-bold text-[20px]"
              style={{ fontStyle: "italic", color: "#E6BE8A" }}
            >
              ₹18,500
            </p>
          </div>
          <Link
            to="/booking/valley-of-flowers"
            className="px-5 py-3 rounded-xl font-body font-semibold text-[13px] transition-all hover:opacity-90"
            style={{ backgroundColor: "#C04000", color: "#fff" }}
            data-ocid="vof.mobile_book_button"
          >
            Book Now
          </Link>
          <a
            href="https://wa.me/919999999999?text=Hi!%20Valley%20of%20Flowers%20Trek%20enquiry"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-3 rounded-xl font-body font-semibold text-[13px] transition-all hover:opacity-90"
            style={{ backgroundColor: "#25D366", color: "#fff" }}
            data-ocid="vof.mobile_whatsapp_button"
          >
            <MessageCircle size={16} />
          </a>
        </div>
      </div>

      {/* ── Gallery Lightbox ─────────────────────────────────────────── */}
      <AnimatePresence>
        {galleryOpen !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            style={{ backgroundColor: "rgba(0,0,0,0.92)" }}
            onClick={() => setGalleryOpen(null)}
            data-ocid="vof.gallery.lightbox"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative max-w-5xl w-full max-h-[90vh] rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={GALLERY[galleryOpen].src}
                alt={GALLERY[galleryOpen].alt}
                className="w-full h-full object-contain"
              />
              <button
                type="button"
                onClick={() => setGalleryOpen(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all hover:opacity-80"
                style={{
                  backgroundColor: "rgba(0,0,0,0.6)",
                  backdropFilter: "blur(8px)",
                }}
                aria-label="Close gallery"
                data-ocid="vof.gallery.close_button"
              >
                <X size={18} color="white" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
