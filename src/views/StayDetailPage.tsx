"use client";

import { getStayBySlug } from "@/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  CalendarDays,
  Car,
  Check,
  ChevronLeft,
  Clock,
  Droplets,
  Flame,
  Heater,
  Home,
  MapPin,
  MessageCircle,
  Mountain,
  Phone,
  Star,
  Users,
  UtensilsCrossed,
  Wifi,
  X,
} from "lucide-react";
import { useState } from "react";

const AMENITY_ICONS: Record<string, React.ReactNode> = {
  WiFi: <Wifi size={18} />,
  Parking: <Car size={18} />,
  Meals: <UtensilsCrossed size={18} />,
  Bonfire: <Flame size={18} />,
  "Hot Water": <Droplets size={18} />,
  "Room Heater": <Heater size={18} />,
};

const GALLERY_IMAGES = [
  "https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=800&q=80",
  "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800&q=80",
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80",
  "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&q=80",
];

const ROOM_TYPES = [
  {
    name: "Standard Room",
    description:
      "Cozy room with mountain views, attached bathroom, and essential amenities. Perfect for solo travellers and couples.",
    price: 1800,
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80",
  },
  {
    name: "Deluxe Room",
    description:
      "Spacious room with premium furnishings, private balcony, and panoramic Himalayan views. Includes room heater and hot water kettle.",
    price: 2800,
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80",
  },
  {
    name: "Suite / Cottage",
    description:
      "Independent cottage with living area, fireplace, and private garden. Ideal for families or those seeking ultimate privacy in the mountains.",
    price: 4500,
    image:
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=600&q=80",
  },
];

const SAMPLE_REVIEWS = [
  {
    name: "Rahul Sharma",
    location: "Delhi",
    rating: 5,
    text: "The homestay exceeded all expectations. The host family treated us like their own. Waking up to Swargarohini views was magical.",
    date: "March 2026",
  },
  {
    name: "Priya & Family",
    location: "Mumbai",
    rating: 5,
    text: "Perfect base for our Kedarkantha trek. Hot meals, warm rooms, and the bonfire stories made this unforgettable.",
    date: "January 2026",
  },
  {
    name: "James Wilson",
    location: "London, UK",
    rating: 4,
    text: "Authentic Himalayan experience. The local Garhwali food was incredible. Would recommend the Deluxe Room for the balcony alone.",
    date: "February 2026",
  },
  {
    name: "Ananya Gupta",
    location: "Bangalore",
    rating: 5,
    text: "Clean, comfortable, and culturally rich. The owner personally helped us plan our trek route. Manya truly cares about every guest.",
    date: "April 2026",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          size={14}
          style={{
            color: rating >= n ? "var(--brand-gold)" : "rgba(0,0,0,0.15)",
            fill: rating >= n ? "var(--brand-gold)" : "transparent",
          }}
        />
      ))}
    </div>
  );
}

export default function StayDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const stay = getStayBySlug(slug);
  const isLoading = false;
  const [selectedImage, setSelectedImage] = useState(0);
  const [guests, setGuests] = useState(2);
  const router = useRouter();

  if (isLoading) {
    return (
      <div className="min-h-screen" style={{ background: "var(--bg-primary)" }}>
        <div className="container mx-auto px-6 py-8">
          <Skeleton className="h-8 w-32 mb-6" />
          <Skeleton className="h-96 w-full rounded-2xl mb-6" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
            <Skeleton className="h-80 w-full rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  if (!stay) {
    return (
      <div className="container mx-auto px-6 py-20 text-center">
        <Home
          size={48}
          className="mx-auto mb-4"
          style={{ color: "var(--brand-gold)" }}
        />
        <h1
          className="font-display text-2xl font-bold mb-2"
          style={{ color: "var(--brand-primary)" }}
        >
          Stay not found
        </h1>
        <p className="font-body mb-6" style={{ color: "var(--text-muted)" }}>
          The property you are looking for does not exist.
        </p>
        <Link href="/stays">
          <Button data-ocid="stay.back_to_list">Browse All Stays</Button>
        </Link>
      </div>
    );
  }

  const minPrice = Number(stay.pricePerNightMin);
  const maxPrice = Number(stay.pricePerNightMax);
  const priceDisplay =
    minPrice === maxPrice
      ? `₹${minPrice.toLocaleString("en-IN")}`
      : `₹${minPrice.toLocaleString("en-IN")} – ₹${maxPrice.toLocaleString("en-IN")}`;

  const gallery = stay.imageUrl
    ? [stay.imageUrl, ...GALLERY_IMAGES.slice(0, 5)]
    : GALLERY_IMAGES;

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-primary)" }}>
      {/* Breadcrumb */}
      <div className="container mx-auto px-6 pt-6 pb-2">
        <Link
          href="/stays"
          className="inline-flex items-center gap-1 text-sm font-body transition-colors"
          style={{ color: "var(--text-muted)" }}
          data-ocid="stay.back_to_list"
        >
          <ChevronLeft size={16} />
          Back to Stays
        </Link>
      </div>

      {/* Hero Gallery */}
      <section className="container mx-auto px-6 pb-6">
        <div
          className="relative rounded-2xl overflow-hidden"
          style={{ background: "var(--bg-secondary)" }}
        >
          <div className="aspect-[21/9] md:aspect-[21/8]">
            <img
              src={gallery[selectedImage]}
              alt={stay.name}
              className="w-full h-full object-cover"
            />
            <div
              className="absolute inset-0"
              style={{ background: "var(--gradient-hero)" }}
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span
                  className="text-[11px] font-body font-semibold px-2.5 py-1 rounded-full"
                  style={{
                    background: "var(--brand-gold)",
                    color: "var(--brand-primary)",
                  }}
                >
                  {stay.stayType}
                </span>
                <span
                  className="flex items-center gap-1 text-[11px] font-body px-2.5 py-1 rounded-full backdrop-blur-sm"
                  style={{
                    background: "rgba(255,255,255,0.18)",
                    color: "#fff",
                    border: "1px solid rgba(255,255,255,0.25)",
                  }}
                >
                  <MapPin size={11} /> {stay.location}
                </span>
                <span
                  className="flex items-center gap-1 text-[11px] font-body px-2.5 py-1 rounded-full backdrop-blur-sm"
                  style={{
                    background: "rgba(255,255,255,0.18)",
                    color: "#fff",
                    border: "1px solid rgba(255,255,255,0.25)",
                  }}
                >
                  <Star
                    size={11}
                    style={{
                      fill: "var(--brand-gold)",
                      color: "var(--brand-gold)",
                    }}
                  />{" "}
                  4.9
                </span>
              </div>
              <h1 className="font-display text-3xl md:text-5xl font-bold text-white leading-tight">
                {stay.name}
              </h1>
            </div>
          </div>
        </div>
        <div className="flex gap-2 mt-3 overflow-x-auto pb-2">
          {gallery.map((img, idx) => (
            <button
              key={img.slice(-20)}
              type="button"
              onClick={() => setSelectedImage(idx)}
              className="shrink-0 w-20 h-14 rounded-lg overflow-hidden transition-all duration-200"
              style={{
                border:
                  selectedImage === idx
                    ? "2px solid var(--brand-secondary)"
                    : "2px solid transparent",
                opacity: selectedImage === idx ? 1 : 0.65,
              }}
              data-ocid={`stay.gallery.thumb.${idx + 1}`}
            >
              <img
                src={img}
                alt={`${stay.name} ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </section>

      {/* Quick Info Bar */}
      <section className="container mx-auto px-6 pb-8">
        <div
          className="flex flex-wrap items-center gap-4 md:gap-8 rounded-2xl p-5"
          style={{
            background: "var(--bg-secondary)",
            border: "1px solid var(--border-light)",
          }}
        >
          <div className="flex items-baseline gap-1.5">
            <span
              className="text-xl font-bold font-body"
              style={{ color: "var(--brand-secondary)" }}
            >
              {priceDisplay}
            </span>
            <span
              className="text-xs font-body"
              style={{ color: "var(--text-muted)" }}
            >
              /night
            </span>
          </div>
          <div
            className="flex items-center gap-2 text-sm font-body"
            style={{ color: "var(--text-secondary)" }}
          >
            <Clock size={16} style={{ color: "var(--accent-orange)" }} />{" "}
            Check-in: 2:00 PM
          </div>
          <div
            className="flex items-center gap-2 text-sm font-body"
            style={{ color: "var(--text-secondary)" }}
          >
            <Clock size={16} style={{ color: "var(--accent-orange)" }} />{" "}
            Check-out: 11:00 AM
          </div>
          <div
            className="flex items-center gap-2 text-sm font-body"
            style={{ color: "var(--text-secondary)" }}
          >
            <Users size={16} style={{ color: "var(--accent-orange)" }} /> Max 4
            guests / room
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-12">
            {/* Overview */}
            <div>
              <h2
                className="font-display text-2xl font-bold mb-4"
                style={{ color: "var(--brand-primary)" }}
              >
                About this Property
              </h2>
              <div
                className="w-10 h-0.5 mb-5 rounded-full"
                style={{ background: "var(--brand-gold)" }}
              />
              <p
                className="font-body leading-relaxed whitespace-pre-line"
                style={{ color: "var(--text-secondary)" }}
              >
                {stay.description}
              </p>
            </div>

            {/* Amenities */}
            <div>
              <h2
                className="font-display text-2xl font-bold mb-4"
                style={{ color: "var(--brand-primary)" }}
              >
                Amenities
              </h2>
              <div
                className="w-10 h-0.5 mb-5 rounded-full"
                style={{ background: "var(--brand-gold)" }}
              />
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {stay.amenities.map((amenity) => (
                  <div
                    key={amenity}
                    className="flex items-center gap-2.5 p-3 rounded-xl"
                    style={{
                      background: "var(--bg-secondary)",
                      border: "1px solid var(--border-light)",
                    }}
                  >
                    <span style={{ color: "var(--accent-orange)" }}>
                      {AMENITY_ICONS[amenity] || <Home size={18} />}
                    </span>
                    <span
                      className="text-sm font-body"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {amenity}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Room Types */}
            <div>
              <h2
                className="font-display text-2xl font-bold mb-4"
                style={{ color: "var(--brand-primary)" }}
              >
                Room Types
              </h2>
              <div
                className="w-10 h-0.5 mb-5 rounded-full"
                style={{ background: "var(--brand-gold)" }}
              />
              <div className="space-y-4">
                {ROOM_TYPES.map((room) => (
                  <div
                    key={room.name}
                    className="flex flex-col sm:flex-row gap-4 rounded-2xl overflow-hidden"
                    style={{
                      background: "var(--bg-secondary)",
                      border: "1px solid var(--border-light)",
                    }}
                  >
                    <div className="sm:w-48 h-40 sm:h-auto shrink-0">
                      <img
                        src={room.image}
                        alt={room.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-5 flex flex-col justify-between">
                      <div>
                        <h3
                          className="font-display text-lg font-semibold mb-1"
                          style={{ color: "var(--brand-primary)" }}
                        >
                          {room.name}
                        </h3>
                        <p
                          className="text-sm font-body leading-relaxed"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          {room.description}
                        </p>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <span
                          className="text-lg font-bold font-body"
                          style={{ color: "var(--brand-secondary)" }}
                        >
                          ₹{room.price.toLocaleString("en-IN")}/night
                        </span>
                        <button
                          type="button"
                          data-ocid="stay.select_room_button"
                          className="px-5 py-2 rounded-full text-sm font-body font-semibold transition-all duration-200 hover:opacity-90"
                          style={{
                            background: "var(--accent-orange)",
                            color: "#fff",
                          }}
                        >
                          Select
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* What's Nearby */}
            <div>
              <h2
                className="font-display text-2xl font-bold mb-4"
                style={{ color: "var(--brand-primary)" }}
              >
                What's Nearby
              </h2>
              <div
                className="w-10 h-0.5 mb-5 rounded-full"
                style={{ background: "var(--brand-gold)" }}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(stay.nearbyAttractions ?? []).map((attr) => (
                  <div
                    key={attr}
                    className="flex items-center gap-3 p-3 rounded-xl"
                    style={{
                      background: "var(--bg-secondary)",
                      border: "1px solid var(--border-light)",
                    }}
                  >
                    <Mountain
                      size={18}
                      className="shrink-0"
                      style={{ color: "var(--brand-secondary)" }}
                    />
                    <span
                      className="text-sm font-body"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {attr}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Location */}
            <div>
              <h2
                className="font-display text-2xl font-bold mb-4"
                style={{ color: "var(--brand-primary)" }}
              >
                Location &amp; How to Reach
              </h2>
              <div
                className="w-10 h-0.5 mb-5 rounded-full"
                style={{ background: "var(--brand-gold)" }}
              />
              <div
                className="rounded-2xl p-6"
                style={{
                  background: "var(--bg-secondary)",
                  border: "1px solid var(--border-light)",
                }}
              >
                <div
                  className="aspect-video rounded-xl flex items-center justify-center mb-5"
                  style={{ background: "var(--bg-tertiary)" }}
                >
                  <div className="text-center">
                    <MapPin
                      size={32}
                      className="mx-auto mb-2"
                      style={{ color: "var(--brand-gold)" }}
                    />
                    <p
                      className="text-sm font-body"
                      style={{ color: "var(--text-muted)" }}
                    >
                      Map view — {stay.location}
                    </p>
                  </div>
                </div>
                <div
                  className="space-y-2 text-sm font-body"
                  style={{ color: "var(--text-secondary)" }}
                >
                  <p>
                    <span
                      className="font-semibold"
                      style={{ color: "var(--brand-primary)" }}
                    >
                      Nearest City:
                    </span>{" "}
                    Dehradun / Haridwar
                  </p>
                  <p>
                    <span
                      className="font-semibold"
                      style={{ color: "var(--brand-primary)" }}
                    >
                      By Road:
                    </span>{" "}
                    Well-connected via mountain roads. Private taxi or shared
                    jeep from Dehradun.
                  </p>
                  <p>
                    <span
                      className="font-semibold"
                      style={{ color: "var(--brand-primary)" }}
                    >
                      By Rail:
                    </span>{" "}
                    Dehradun Railway Station (~200 km)
                  </p>
                  <p>
                    <span
                      className="font-semibold"
                      style={{ color: "var(--brand-primary)" }}
                    >
                      By Air:
                    </span>{" "}
                    Jolly Grant Airport, Dehradun (~220 km)
                  </p>
                </div>
              </div>
            </div>

            {/* Owner's Note */}
            {stay.ownerNote && (
              <div
                className="rounded-2xl p-6"
                style={{
                  background: "var(--brand-primary)",
                  border: "1px solid rgba(255,193,7,0.2)",
                }}
              >
                <h2
                  className="font-display text-2xl font-bold mb-5"
                  style={{ color: "var(--brand-gold)" }}
                >
                  Meet the Manya Family
                </h2>
                <div className="flex items-start gap-4">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center shrink-0"
                    style={{
                      background: "rgba(255,193,7,0.15)",
                      border: "1px solid rgba(255,193,7,0.3)",
                    }}
                  >
                    <Home size={22} style={{ color: "var(--brand-gold)" }} />
                  </div>
                  <div>
                    <p
                      className="text-lg leading-relaxed italic"
                      style={{
                        color: "rgba(255,255,255,0.88)",
                        fontFamily: "var(--font-display)",
                      }}
                    >
                      \u201c{stay.ownerNote}\u201d
                    </p>
                    <p
                      className="text-sm font-body mt-3"
                      style={{ color: "rgba(255,193,7,0.7)" }}
                    >
                      — The Manya Family, Your Hosts
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* House Rules */}
            <div>
              <h2
                className="font-display text-2xl font-bold mb-4"
                style={{ color: "var(--brand-primary)" }}
              >
                House Rules
              </h2>
              <div
                className="w-10 h-0.5 mb-5 rounded-full"
                style={{ background: "var(--brand-gold)" }}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { ok: true, text: "Check-in: 2:00 PM" },
                  { ok: true, text: "Check-out: 11:00 AM" },
                  { ok: false, text: "No smoking inside rooms" },
                  { ok: true, text: "Pets allowed on request" },
                  { ok: true, text: "Quiet hours: 10:00 PM – 7:00 AM" },
                  { ok: true, text: "ID proof required at check-in" },
                ].map((rule) => (
                  <div
                    key={rule.text}
                    className="flex items-center gap-2 text-sm font-body"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {rule.ok ? (
                      <Check
                        size={16}
                        style={{ color: "#22c55e" }}
                        className="shrink-0"
                      />
                    ) : (
                      <X
                        size={16}
                        style={{ color: "#ef4444" }}
                        className="shrink-0"
                      />
                    )}
                    {rule.text}
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div>
              <h2
                className="font-display text-2xl font-bold mb-4"
                style={{ color: "var(--brand-primary)" }}
              >
                Guest Reviews
              </h2>
              <div
                className="w-10 h-0.5 mb-5 rounded-full"
                style={{ background: "var(--brand-gold)" }}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {SAMPLE_REVIEWS.map((review, i) => (
                  <div
                    key={review.name || `review-${i}`}
                    className="rounded-2xl p-5"
                    data-ocid={`stay.review.${i + 1}`}
                    style={{
                      background: "var(--bg-secondary)",
                      border: "1px solid var(--border-light)",
                    }}
                  >
                    <StarRating rating={review.rating} />
                    <p
                      className="text-sm font-body mt-3 leading-relaxed"
                      style={{ color: "var(--text-primary)" }}
                    >
                      \u201c{review.text}\u201d
                    </p>
                    <div className="mt-3 flex items-center justify-between">
                      <span
                        className="text-xs font-body font-semibold"
                        style={{ color: "var(--brand-primary)" }}
                      >
                        {review.name}, {review.location}
                      </span>
                      <span
                        className="text-xs font-body"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {review.date}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sticky Booking Widget */}
          <div className="lg:col-span-1">
            <div
              className="sticky top-[140px] rounded-2xl p-6"
              style={{
                background: "var(--bg-secondary)",
                border: "1px solid var(--border-medium)",
                boxShadow: "var(--shadow-md)",
              }}
            >
              <h3
                className="font-display text-xl font-bold mb-1"
                style={{ color: "var(--brand-primary)" }}
              >
                Book a Stay
              </h3>
              <p
                className="text-sm font-body mb-5"
                style={{ color: "var(--text-muted)" }}
              >
                Select your dates to check availability
              </p>
              <div className="space-y-4">
                <div>
                  <p
                    className="text-xs font-body font-semibold mb-1.5"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Check-in Date
                  </p>
                  <div
                    className="flex items-center gap-2 px-3 py-2.5 rounded-xl"
                    style={{
                      border: "1px solid var(--border-medium)",
                      background: "var(--bg-primary)",
                    }}
                  >
                    <CalendarDays
                      size={16}
                      style={{ color: "var(--accent-orange)" }}
                    />
                    <input
                      type="date"
                      className="flex-1 bg-transparent text-sm font-body outline-none"
                      style={{ color: "var(--text-primary)" }}
                      data-ocid="stay.checkin_input"
                    />
                  </div>
                </div>
                <div>
                  <p
                    className="text-xs font-body font-semibold mb-1.5"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Check-out Date
                  </p>
                  <div
                    className="flex items-center gap-2 px-3 py-2.5 rounded-xl"
                    style={{
                      border: "1px solid var(--border-medium)",
                      background: "var(--bg-primary)",
                    }}
                  >
                    <CalendarDays
                      size={16}
                      style={{ color: "var(--accent-orange)" }}
                    />
                    <input
                      type="date"
                      className="flex-1 bg-transparent text-sm font-body outline-none"
                      style={{ color: "var(--text-primary)" }}
                      data-ocid="stay.checkout_input"
                    />
                  </div>
                </div>
                <div>
                  <p
                    className="text-xs font-body font-semibold mb-1.5"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Guests
                  </p>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setGuests((g) => Math.max(1, g - 1))}
                      className="w-9 h-9 rounded-xl flex items-center justify-center font-semibold transition-colors"
                      style={{
                        border: "1px solid var(--border-medium)",
                        background: "var(--bg-primary)",
                        color: "var(--brand-primary)",
                      }}
                      data-ocid="stay.guests_decrement"
                    >
                      -
                    </button>
                    <span
                      className="text-sm font-body w-6 text-center font-semibold"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {guests}
                    </span>
                    <button
                      type="button"
                      onClick={() => setGuests((g) => Math.min(8, g + 1))}
                      className="w-9 h-9 rounded-xl flex items-center justify-center font-semibold transition-colors"
                      style={{
                        border: "1px solid var(--border-medium)",
                        background: "var(--bg-primary)",
                        color: "var(--brand-primary)",
                      }}
                      data-ocid="stay.guests_increment"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  type="button"
                  data-ocid="stay.check_availability_button"
                  onClick={() => {
                    router.push(`/booking/stay-${stay.slug}`);
                  }}
                  className="w-full py-3.5 rounded-xl font-body font-semibold text-sm transition-all duration-300 hover:opacity-90"
                  style={{
                    background: "var(--accent-orange)",
                    color: "#fff",
                    boxShadow: "0 4px 14px rgba(255,193,7,0.35)",
                  }}
                >
                  Check Availability &amp; Book
                </button>
                <a
                  href={`https://wa.me/919999999999?text=Hi TrekRoots! I'm interested in staying at ${encodeURIComponent(stay.name)}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl text-sm font-semibold font-body transition-colors"
                  style={{ background: "#22c55e", color: "#fff" }}
                  data-ocid="stay.whatsapp_button"
                >
                  <MessageCircle size={16} />
                  Chat on WhatsApp
                </a>
                <div
                  className="pt-4 border-t space-y-2"
                  style={{ borderColor: "var(--border-light)" }}
                >
                  {[
                    "Free cancellation up to 48 hours",
                    "Best price guarantee",
                    "Instant confirmation",
                  ].map((text) => (
                    <div
                      key={text}
                      className="flex items-center gap-2 text-xs font-body"
                      style={{ color: "var(--text-muted)" }}
                    >
                      <Check size={12} style={{ color: "#22c55e" }} />
                      {text}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Band */}
      <section style={{ background: "var(--brand-primary)" }}>
        <div className="container mx-auto px-6 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3
                className="font-display text-xl font-bold"
                style={{ color: "var(--brand-gold)" }}
              >
                {stay.name}
              </h3>
              <p
                className="text-sm font-body"
                style={{ color: "rgba(255,255,255,0.65)" }}
              >
                From {priceDisplay} / night · {stay.location}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <a
                href={`https://wa.me/919999999999?text=Hi TrekRoots! I'm interested in staying at ${encodeURIComponent(stay.name)}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold font-body transition-colors"
                style={{
                  background: "rgba(255,255,255,0.12)",
                  color: "#fff",
                  border: "1px solid rgba(255,255,255,0.2)",
                }}
                data-ocid="stay.bottom_whatsapp"
              >
                <Phone size={16} /> Call Expert
              </a>
              <button
                type="button"
                data-ocid="stay.book_now_button"
                onClick={() => {
                  router.push(`/booking/stay-${stay.slug}`);
                }}
                className="px-6 py-2.5 rounded-full text-sm font-body font-semibold transition-all duration-200 hover:opacity-90"
                style={{
                  background: "var(--accent-orange)",
                  color: "#fff",
                  boxShadow: "0 4px 14px rgba(255,193,7,0.4)",
                }}
              >
                Book This Property
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
