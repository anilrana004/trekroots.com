"use client";

import { Search } from "lucide-react";
import { DISCOVER } from "./tokens";

type DiscoverySearchBannerProps = {
  title: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  ocid?: string;
};

export function DiscoverySearchBanner({
  title,
  placeholder,
  value,
  onChange,
  ocid = "discovery.search",
}: DiscoverySearchBannerProps) {
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: DISCOVER.ink }}
      data-ocid={`${ocid}.banner`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 80% 60% at 15% 100%, rgba(255,193,7,0.35), transparent 55%), radial-gradient(ellipse 50% 40% at 90% 0%, rgba(255,255,255,0.08), transparent 50%)",
        }}
        aria-hidden
      />
      <div className="relative mx-auto max-w-[1400px] px-4 py-8 md:px-6 md:py-10">
        <h1 className="mb-4 text-center font-display text-xl font-bold text-white md:mb-5 md:text-2xl">
          {title}
        </h1>
        <label className="relative mx-auto block max-w-2xl">
          <span className="sr-only">{placeholder}</span>
          <Search
            size={18}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#8A9A90]"
            aria-hidden
          />
          <input
            data-ocid={`${ocid}.input`}
            type="search"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full rounded-full border-0 bg-white py-3.5 pl-11 pr-5 font-body text-sm text-[#1A1A1A] shadow-lg outline-none ring-2 ring-transparent placeholder:text-[#8A9A90] focus:ring-[#FFC107]/60"
          />
        </label>
      </div>
    </section>
  );
}
