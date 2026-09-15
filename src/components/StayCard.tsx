"use client";

import type { Stay } from "@/data";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Car, Flame, MapPin, Star, UtensilsCrossed, Wifi } from "lucide-react";
import { ZoomInCard } from "@/components/ZoomInCard";
import { CloudinaryImage } from "@/components/CloudinaryImage";

interface StayCardProps {
  stay: Stay;
  index?: number;
}

const AMENITY_ICON_MAP: Record<string, React.ReactNode> = {
  WiFi: <Wifi size={12} />,
  Parking: <Car size={12} />,
  Meals: <UtensilsCrossed size={12} />,
  Bonfire: <Flame size={12} />,
};

export function StayCard({ stay, index = 0 }: StayCardProps) {
  const minPrice = Number(stay.pricePerNightMin).toLocaleString("en-IN");
  const maxPrice = Number(stay.pricePerNightMax).toLocaleString("en-IN");
  const router = useRouter();

  const handleBook = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push(`/booking/stay-${stay.slug}`);
  };

  return (
    <ZoomInCard index={index}>
      <Link
        href={`/stays/${stay.slug}`}
        data-ocid={`stay.item.${index + 1}`}
        className="group block h-full rounded-2xl overflow-hidden bg-card border border-[var(--border-light)] shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-1 transition-all duration-300"
      >
      <div className="relative h-56 overflow-hidden bg-muted">
        {stay.imageUrl ? (
          <CloudinaryImage
            src={stay.imageUrl}
            alt={stay.name}
            width={800}
            height={448}
            className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500"
            transform={{ width: 800, height: 448, crop: "fill", gravity: "auto" }}
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ background: "var(--bg-secondary)" }}
          >
            <span className="text-5xl">🏡</span>
          </div>
        )}
        <div
          className="absolute inset-0"
          style={{ background: "var(--gradient-card)" }}
        />
        {/* Type badge */}
        <span
          className="absolute top-3 left-3 text-[11px] font-semibold px-2.5 py-1 rounded-full font-body tracking-wide"
          style={{
            background: "var(--brand-gold)",
            color: "var(--brand-primary)",
          }}
        >
          {stay.stayType}
        </span>
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-xs text-white/90 font-body">
            <MapPin size={12} />
            {stay.location}
          </span>
          <span className="flex items-center gap-1 text-xs text-white/90 font-body">
            <Star size={12} className="fill-amber-400 text-amber-400" />
            4.9
          </span>
        </div>
      </div>
      <div className="p-5">
        <h3
          className="font-display text-[1.15rem] font-semibold leading-snug mb-1.5 group-hover:text-[var(--brand-secondary)] transition-colors"
          style={{ color: "var(--brand-primary)" }}
        >
          {stay.name}
        </h3>
        <p className="text-xs text-[var(--text-secondary)] font-body mb-4 line-clamp-2 leading-relaxed">
          {stay.description}
        </p>
        <div className="flex items-center gap-1.5 mb-4 flex-wrap">
          {stay.amenities.slice(0, 4).map((a) => (
            <span
              key={a}
              className="inline-flex items-center gap-1 text-[10px] font-body px-2 py-0.5 rounded-full"
              style={{
                background: "var(--bg-tertiary)",
                color: "var(--text-secondary)",
              }}
              title={a}
            >
              {AMENITY_ICON_MAP[a] || null}
              {a}
            </span>
          ))}
        </div>
        <div
          className="flex items-center justify-between pt-3 border-t"
          style={{ borderColor: "var(--border-light)" }}
        >
          <p
            className="text-sm font-bold font-body"
            style={{ color: "var(--brand-secondary)" }}
          >
            ₹{minPrice}
            {minPrice !== maxPrice && (
              <span
                className="text-xs font-normal"
                style={{ color: "var(--text-muted)" }}
              >
                {" "}
                – ₹{maxPrice}
              </span>
            )}
            <span
              className="text-xs font-normal"
              style={{ color: "var(--text-muted)" }}
            >
              {" "}
              /night
            </span>
          </p>
          <div className="flex items-center gap-2">
            <span
              className="text-xs font-body font-semibold tracking-wide group-hover:underline"
              style={{ color: "var(--accent-orange)" }}
            >
              View Stay →
            </span>
            <button
              type="button"
              data-ocid={`stay.book_button.${index + 1}`}
              onClick={handleBook}
              className="text-xs font-body font-semibold px-3 py-1.5 rounded-lg text-black transition-colors hover:opacity-90"
              style={{ backgroundColor: "var(--brand-primary)" }}
            >
              Book
            </button>
          </div>
        </div>
      </div>
    </Link>
    </ZoomInCard>
  );
}
