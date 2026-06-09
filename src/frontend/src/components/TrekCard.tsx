import type { Trek } from "@/backend";
import { Link } from "@tanstack/react-router";
import { Calendar, ChevronRight, Clock, Mountain } from "lucide-react";

const DIFFICULTY_CONFIG: Record<
  string,
  { bg: string; text: string; dot: string }
> = {
  Easy: {
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    dot: "bg-emerald-500",
  },
  Moderate: { bg: "bg-amber-50", text: "text-amber-700", dot: "bg-amber-500" },
  Difficult: {
    bg: "bg-orange-50",
    text: "text-orange-700",
    dot: "bg-orange-500",
  },
  Extreme: { bg: "bg-red-50", text: "text-red-700", dot: "bg-red-500" },
};

interface TrekCardProps {
  trek: Trek;
  index?: number;
}

export function TrekCard({ trek, index = 0 }: TrekCardProps) {
  const diff = DIFFICULTY_CONFIG[trek.difficulty] ?? {
    bg: "bg-muted",
    text: "text-muted-foreground",
    dot: "bg-muted-foreground",
  };
  const minPrice = Number(trek.priceRange.minINR).toLocaleString("en-IN");
  const altitudeFt = Number(trek.maxAltitudeFt).toLocaleString("en-IN");
  const firstHighlight = trek.highlights[0] ?? "";
  const secondHighlight = trek.highlights[1] ?? "";

  return (
    <Link
      to="/treks/$slug"
      params={{ slug: trek.slug }}
      data-ocid={`trek.item.${index + 1}`}
      className="group flex flex-col rounded-xl overflow-hidden bg-card border border-border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
      style={{ minHeight: "460px" }}
    >
      {/* Hero image */}
      <div className="relative h-56 overflow-hidden bg-muted flex-shrink-0">
        {trek.imageUrl ? (
          <img
            src={trek.imageUrl}
            alt={trek.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-muted">
            <Mountain className="text-muted-foreground" size={48} />
          </div>
        )}
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        {/* Difficulty badge */}
        <div
          className={`absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold font-body ${diff.bg} ${diff.text}`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${diff.dot}`} />
          {trek.difficulty}
        </div>
        {/* Region label bottom */}
        <div className="absolute bottom-3 left-3 right-3">
          <span className="text-xs text-white/80 font-body tracking-wide uppercase">
            {trek.region}, {trek.state}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <h3 className="font-display text-xl font-bold text-foreground leading-tight mb-3">
          {trek.name}
        </h3>

        {/* Badges row */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-muted text-xs font-medium font-body text-muted-foreground">
            <Clock size={11} />
            {Number(trek.durationDays)} Days / {Number(trek.durationNights)}{" "}
            Nights
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-muted text-xs font-medium font-body text-muted-foreground">
            <Mountain size={11} />
            {altitudeFt} ft
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-muted text-xs font-medium font-body text-muted-foreground">
            <Calendar size={11} />
            {trek.bestSeason}
          </span>
        </div>

        {/* Highlights snippet */}
        {(firstHighlight || secondHighlight) && (
          <ul className="mb-4 space-y-1">
            {firstHighlight && (
              <li className="flex items-start gap-2 text-xs text-muted-foreground font-body">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-primary flex-shrink-0" />
                <span className="line-clamp-1">{firstHighlight}</span>
              </li>
            )}
            {secondHighlight && (
              <li className="flex items-start gap-2 text-xs text-muted-foreground font-body">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-primary flex-shrink-0" />
                <span className="line-clamp-1">{secondHighlight}</span>
              </li>
            )}
          </ul>
        )}

        {/* Spacer */}
        <div className="flex-1" />

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div>
            <p className="text-xs text-muted-foreground font-body">
              Starting from
            </p>
            <p
              className="text-lg font-bold font-body"
              style={{ color: "#C04000" }}
            >
              ₹{minPrice}
            </p>
            <p className="text-xs text-muted-foreground font-body">
              per person
            </p>
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold font-body text-white transition-all duration-200 hover:opacity-90 active:scale-95"
            style={{ backgroundColor: "#C04000" }}
          >
            Explore Trek
            <ChevronRight size={15} />
          </button>
        </div>
      </div>
    </Link>
  );
}
