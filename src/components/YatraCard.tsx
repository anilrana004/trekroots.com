"use client";

import type { Yatra } from "@/data";
import Link from "next/link";
import { Calendar, ChevronRight, Clock, MapPin } from "lucide-react";
import { ZoomInCard } from "@/components/ZoomInCard";

interface YatraCardProps {
  yatra: Yatra;
  index?: number;
}

// Decorative Ganesh silhouette SVG — semi-transparent orange watermark
function GaneshWatermark() {
  return (
    <svg
      viewBox="0 0 200 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute bottom-0 right-0 w-36 h-44 pointer-events-none select-none"
      aria-hidden="true"
      style={{ opacity: 0.15, color: "#FFD54F" }}
    >
      {/* Simplified Ganesh silhouette: large head, ears, trunk, crown */}
      {/* Crown / Mukut */}
      <path d="M80 10 L100 2 L120 10 L115 28 L85 28 Z" fill="#FFD54F" />
      <circle cx="100" cy="8" r="5" fill="#FFD54F" />
      {/* Large ears */}
      <ellipse cx="55" cy="70" rx="22" ry="30" fill="#FFD54F" />
      <ellipse cx="145" cy="70" rx="22" ry="30" fill="#FFD54F" />
      {/* Round head */}
      <circle cx="100" cy="65" r="48" fill="#FFD54F" />
      {/* Trunk curling left */}
      <path
        d="M80 90 Q55 110 60 130 Q65 148 80 145 Q90 142 88 130 Q86 118 75 115 Q70 112 75 105 Z"
        fill="#FFD54F"
      />
      {/* Eyes */}
      <circle cx="84" cy="55" r="5" fill="white" />
      <circle cx="116" cy="55" r="5" fill="white" />
      <circle cx="85" cy="56" r="2.5" fill="#F5F5F5" />
      <circle cx="117" cy="56" r="2.5" fill="#F5F5F5" />
      {/* Body */}
      <ellipse cx="100" cy="165" rx="52" ry="55" fill="#FFD54F" />
      {/* Belly circle (Lambodara) */}
      <circle
        cx="100"
        cy="170"
        r="25"
        fill="#FFD54F"
        stroke="white"
        strokeWidth="2"
        strokeOpacity="0.3"
      />
      {/* Arms */}
      <ellipse
        cx="52"
        cy="145"
        rx="14"
        ry="28"
        fill="#FFD54F"
        transform="rotate(-20 52 145)"
      />
      <ellipse
        cx="148"
        cy="145"
        rx="14"
        ry="28"
        fill="#FFD54F"
        transform="rotate(20 148 145)"
      />
      {/* Lotus flower at base */}
      <ellipse cx="100" cy="228" rx="30" ry="8" fill="#FFD54F" />
      <path
        d="M80 220 Q100 208 120 220"
        stroke="#FFD54F"
        strokeWidth="3"
        fill="none"
      />
    </svg>
  );
}

export function YatraCard({ yatra, index = 0 }: YatraCardProps) {
  const minPrice = Number(yatra.priceRange.minINR).toLocaleString("en-IN");
  const startPoint = yatra.route.split("→")[0]?.trim() ?? "";
  const templeCount = yatra.temples.length;

  return (
    <ZoomInCard index={index}>
      <Link
        href={`/yatra/${yatra.slug}`}
        data-ocid={`yatra.item.${index + 1}`}
        className="group flex flex-col h-full rounded-xl overflow-hidden bg-card border border-border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        style={{ minHeight: "460px" }}
      >
      {/* Hero image */}
      <div className="relative h-56 overflow-hidden bg-muted flex-shrink-0">
        {yatra.imageUrl ? (
          <img
            src={yatra.imageUrl}
            alt={yatra.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-muted">
            <span className="text-5xl">🛕</span>
          </div>
        )}
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        {/* Season badge */}
        <div className="absolute top-3 left-3">
          <span
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold font-body backdrop-blur-sm"
            style={{ backgroundColor: "rgba(192,64,0,0.85)", color: "white" }}
          >
            <Calendar size={11} />
            {yatra.season}
          </span>
        </div>
        {/* Temple count badge */}
        {templeCount > 0 && (
          <div className="absolute top-3 right-3">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold font-body backdrop-blur-sm bg-black/40 text-white">
              🛕 {templeCount} Temples
            </span>
          </div>
        )}
        {/* Start point at bottom */}
        <div className="absolute bottom-3 left-3 right-3">
          <span className="text-xs text-white/80 font-body tracking-wide uppercase">
            {startPoint}
          </span>
        </div>
      </div>

      {/* Content with Ganesh watermark */}
      <div className="relative flex flex-col flex-1 p-5 overflow-hidden">
        {/* Ganesh watermark behind content */}
        <GaneshWatermark />

        <h3 className="font-display text-xl font-bold text-foreground leading-tight mb-2 relative z-10">
          {yatra.name}
        </h3>

        {/* Spiritual significance 2-line snippet */}
        <p className="text-sm text-muted-foreground font-body mb-4 line-clamp-2 leading-relaxed relative z-10">
          {yatra.spiritualSignificance}
        </p>

        {/* Detail badges */}
        <div className="flex flex-wrap gap-2 mb-4 relative z-10">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-muted text-xs font-medium font-body text-muted-foreground">
            <Clock size={11} />
            {yatra.duration}
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-muted text-xs font-medium font-body text-muted-foreground">
            <MapPin size={11} />
            {startPoint}
          </span>
          {yatra.helicopterInfo && (
            <span
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium font-body"
              style={{ backgroundColor: "#FFF3E8", color: "#FFC107" }}
            >
              🚁 Heli Available
            </span>
          )}
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-border relative z-10">
          <div>
            <p className="text-xs text-muted-foreground font-body">
              Starting from
            </p>
            <p
              className="text-lg font-bold font-body"
              style={{ color: "#FFC107" }}
            >
              ₹{minPrice}
            </p>
            <p className="text-xs text-muted-foreground font-body">
              per person
            </p>
          </div>
          <span
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold font-body text-black transition-all duration-200 group-hover:opacity-90"
            style={{ backgroundColor: "#FFC107" }}
          >
            Explore Yatra
            <ChevronRight size={15} />
          </span>
        </div>
      </div>
    </Link>
    </ZoomInCard>
  );
}
