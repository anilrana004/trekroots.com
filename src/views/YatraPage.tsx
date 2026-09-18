"use client";

import { getAllYatras } from "@/data";
import { SectionHeader } from "@/components/SectionHeader";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { YatraCard } from "@/components/YatraCard";
const SKELETON_YATRAS = [1, 2, 3, 4, 5, 6];

// Large decorative Ganesh for section background
function SectionGaneshDecor() {
  return (
    <div
      className="pointer-events-none select-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Left large Ganesh */}
      <svg
        viewBox="0 0 200 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute -left-16 top-8 w-64 h-80"
        style={{ opacity: 0.06, color: "#FFD54F" }}
        aria-hidden="true"
      >
        <path d="M80 10 L100 2 L120 10 L115 28 L85 28 Z" fill="#FFD54F" />
        <circle cx="100" cy="8" r="5" fill="#FFD54F" />
        <ellipse cx="55" cy="70" rx="22" ry="30" fill="#FFD54F" />
        <ellipse cx="145" cy="70" rx="22" ry="30" fill="#FFD54F" />
        <circle cx="100" cy="65" r="48" fill="#FFD54F" />
        <path
          d="M80 90 Q55 110 60 130 Q65 148 80 145 Q90 142 88 130 Q86 118 75 115 Q70 112 75 105 Z"
          fill="#FFD54F"
        />
        <ellipse cx="100" cy="165" rx="52" ry="55" fill="#FFD54F" />
        <circle cx="100" cy="170" r="25" fill="#FFD54F" />
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
        <ellipse cx="100" cy="228" rx="30" ry="8" fill="#FFD54F" />
      </svg>
      {/* Right large Ganesh */}
      <svg
        viewBox="0 0 200 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute -right-16 bottom-8 w-72 h-96"
        style={{ opacity: 0.05, color: "#FFD54F" }}
        aria-hidden="true"
      >
        <path d="M80 10 L100 2 L120 10 L115 28 L85 28 Z" fill="#FFD54F" />
        <circle cx="100" cy="8" r="5" fill="#FFD54F" />
        <ellipse cx="55" cy="70" rx="22" ry="30" fill="#FFD54F" />
        <ellipse cx="145" cy="70" rx="22" ry="30" fill="#FFD54F" />
        <circle cx="100" cy="65" r="48" fill="#FFD54F" />
        <path
          d="M80 90 Q55 110 60 130 Q65 148 80 145 Q90 142 88 130 Q86 118 75 115 Q70 112 75 105 Z"
          fill="#FFD54F"
        />
        <ellipse cx="100" cy="165" rx="52" ry="55" fill="#FFD54F" />
        <circle cx="100" cy="170" r="25" fill="#FFD54F" />
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
        <ellipse cx="100" cy="228" rx="30" ry="8" fill="#FFD54F" />
      </svg>
    </div>
  );
}

export default function YatraPage() {
  const yatras = getAllYatras();
  const isLoading = false;
  return (
    <div
      className="relative min-h-screen"
      style={{
        background: "linear-gradient(to bottom, #FFF8F0 0%, #FFFAF5 100%)",
      }}
    >
      {/* Decorative Om symbol strip at top */}
      <div
        className="w-full py-2 text-center text-sm font-body tracking-[0.4em] overflow-hidden"
        style={{
          color: "#FFD54F",
          opacity: 0.6,
          borderBottom: "1px solid #FFD54F22",
        }}
      >
        ॐ &nbsp;&nbsp; ॐ &nbsp;&nbsp; ॐ &nbsp;&nbsp; ॐ &nbsp;&nbsp; ॐ
        &nbsp;&nbsp; ॐ &nbsp;&nbsp; ॐ &nbsp;&nbsp; ॐ &nbsp;&nbsp; ॐ &nbsp;&nbsp;
        ॐ &nbsp;&nbsp; ॐ &nbsp;&nbsp; ॐ
      </div>

      <div className="relative container mx-auto px-4 py-12">
        <SectionGaneshDecor />

        <div className="relative z-10">
          <Breadcrumbs
            className="mb-4"
            items={[
              { name: "Home", path: "/" },
              { name: "Yatra", path: "/yatra" },
            ]}
          />
          <SectionHeader
            as="h1"
            title="Yatra & Pilgrimage"
            subtitle="Sacred journeys to the abode of the gods — char dham, panch kedar, and beyond."
          />

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {SKELETON_YATRAS.map((n) => (
                <div
                  key={n}
                  className="rounded-xl bg-muted animate-pulse"
                  style={{ minHeight: "460px" }}
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {yatras.map((y, i) => (
                <YatraCard key={String(y.id)} yatra={y} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Om divider */}
      <div
        className="w-full py-2 text-center text-sm font-body tracking-[0.4em]"
        style={{
          color: "#FFD54F",
          opacity: 0.5,
          borderTop: "1px solid #FFD54F22",
        }}
      >
        ॐ &nbsp;&nbsp; ॐ &nbsp;&nbsp; ॐ &nbsp;&nbsp; ॐ &nbsp;&nbsp; ॐ
        &nbsp;&nbsp; ॐ &nbsp;&nbsp; ॐ &nbsp;&nbsp; ॐ
      </div>
    </div>
  );
}
