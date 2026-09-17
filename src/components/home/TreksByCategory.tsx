"use client";

import Link from "next/link";
import { Clock, Compass, Gauge, MapPin, Mountain, Sun } from "lucide-react";
import type { ReactNode } from "react";
import { SectionHead } from "@/components/home/SectionHead";
import { popularTreks, trekFacetGroups } from "@/data";

const GROUP_ICONS: Record<string, ReactNode> = {
  "By region": <MapPin size={92} />,
  "By difficulty": <Gauge size={92} />,
  "By duration": <Clock size={92} />,
  "By season": <Sun size={92} />,
};

type Column = {
  title: string;
  icon: ReactNode;
  items: { label: string; href: string }[];
};

function columns(): Column[] {
  const facets: Column[] = trekFacetGroups().map((group) => ({
    title: `Treks ${group.title.toLowerCase()}`,
    icon: GROUP_ICONS[group.title] ?? <Compass size={92} />,
    items: group.items.map((item) => ({ label: item.label, href: item.href })),
  }));

  return [
    ...facets,
    {
      title: "Popular treks",
      icon: <Mountain size={92} />,
      items: popularTreks(8).map((trek) => ({
        label: trek.name,
        href: `/treks/${trek.slug}`,
      })),
    },
    {
      title: "More journeys",
      icon: <Compass size={92} />,
      items: [
        { label: "Sacred yatras", href: "/yatra" },
        { label: "Tour packages", href: "/packages" },
        { label: "Homestays & stays", href: "/stays" },
        { label: "Trekking guides", href: "/blog" },
        { label: "About TrekRoots", href: "/about" },
        { label: "Talk to an expert", href: "/contact" },
      ],
    },
  ];
}

export function TreksByCategory() {
  const cols = columns();

  return (
    <section data-ocid="categories.section" className="py-12 md:py-16 bg-white">
      <div className="lux-container">
        <SectionHead title="Treks by Categories" className="mb-8 md:mb-10" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {cols.map((column, i) => (
            <div
              key={column.title}
              data-ocid={`categories.group.${i + 1}`}
              className="relative overflow-hidden rounded-xl border bg-white p-4 pb-16"
              style={{ borderColor: "#E8E8E8" }}
            >
              <h3 className="relative z-10 font-body text-[12.5px] font-bold text-[#1A1A1A] mb-3">
                {column.title}
              </h3>
              <ul className="relative z-10 space-y-1.5">
                {column.items.map((item) => (
                  <li key={`${column.title}-${item.label}`}>
                    <Link
                      href={item.href}
                      className="font-body text-[11.5px] text-muted-foreground hover:text-[#1A1A1A] transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <span
                className="absolute -bottom-4 -right-2 pointer-events-none"
                style={{ color: "#FBEFC4" }}
                aria-hidden
              >
                {column.icon}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
