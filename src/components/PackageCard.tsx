"use client";

import type { Package } from "@/data";
import Link from "next/link";
import { ArrowRight, Clock, Users } from "lucide-react";
import { ZoomInCard } from "@/components/ZoomInCard";
import { CloudinaryImage } from "@/components/CloudinaryImage";

interface PackageCardProps {
  pkg: Package;
  index?: number;
}

const CATEGORY_COLORS: Record<string, string> = {
  Adventure: "bg-emerald-100 text-emerald-700",
  Spiritual: "bg-amber-100 text-amber-700",
  Luxury: "bg-purple-100 text-purple-700",
  Family: "bg-sky-100 text-sky-700",
  Solo: "bg-rose-100 text-rose-700",
  Corporate: "bg-slate-100 text-slate-700",
  Ladakh: "bg-orange-100 text-orange-800",
  Spiti: "bg-cyan-100 text-cyan-800",
  Himachal: "bg-lime-100 text-lime-800",
  Uttarakhand: "bg-teal-100 text-teal-800",
  Kerala: "bg-green-100 text-green-800",
};

export function PackageCard({ pkg, index = 0 }: PackageCardProps) {
  const min = Number(pkg.priceRange.minINR);
  const max = Number(pkg.priceRange.maxINR);
  const priceLabel =
    min <= 0
      ? "On Request"
      : max > min
        ? `₹${min.toLocaleString("en-IN")}–₹${max.toLocaleString("en-IN")}`
        : `₹${min.toLocaleString("en-IN")}`;
  const catClass =
    CATEGORY_COLORS[pkg.category] || "bg-muted text-muted-foreground";

  return (
    <ZoomInCard index={index}>
      <Link
        href={`/packages/${pkg.slug}`}
        data-ocid={`package.item.${index + 1}`}
        className="group block h-full rounded-xl overflow-hidden bg-card border border-border shadow-sm hover:shadow-md transition-smooth"
      >
      <div className="relative h-52 overflow-hidden bg-muted">
        {pkg.imageUrl ? (
          <CloudinaryImage
            src={pkg.imageUrl}
            alt={pkg.name}
            width={800}
            height={416}
            className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
            transform={{ width: 800, height: 416, crop: "fill", gravity: "auto" }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-muted">
            <span className="text-4xl">🏔️</span>
          </div>
        )}
        <span
          className={`absolute top-3 left-3 text-[11px] font-semibold px-2.5 py-1 rounded-full font-body ${catClass}`}
        >
          {pkg.category}
        </span>
        <span className="absolute top-3 right-3 text-[11px] font-medium px-2 py-1 rounded-full font-body bg-black/50 text-white backdrop-blur-sm">
          <Clock size={11} className="inline mr-1" />
          {pkg.duration}
        </span>
      </div>
      <div className="p-4">
        <h3 className="font-display text-lg font-semibold text-foreground leading-snug mb-1.5 group-hover:text-primary transition-colors">
          {pkg.name}
        </h3>
        <p className="text-xs text-accent font-quote italic mb-3 line-clamp-2">
          {pkg.problemSolved}
        </p>
        <div className="flex items-center gap-3 text-xs text-muted-foreground font-body mb-3">
          <span className="flex items-center gap-1">
            <Users size={12} />
            {pkg.groupSize}
          </span>
          <span>·</span>
          <span>{pkg.accommodationType}</span>
        </div>
        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div>
            <span className="text-xs text-muted-foreground font-body">
              From
            </span>
            <span className="ml-1 text-sm font-semibold text-foreground font-mono">
              {priceLabel}
            </span>
          </div>
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary font-body group-hover:gap-2 transition-all">
            View Package <ArrowRight size={13} />
          </span>
        </div>
      </div>
    </Link>
    </ZoomInCard>
  );
}
