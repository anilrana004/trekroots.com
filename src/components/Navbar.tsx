"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowRight,
  ChevronDown,
  Menu,
  Phone,
  Search,
  Star,
  X,
} from "lucide-react";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import type { FacetGroup } from "@/data";
import { popularTreks, trekFacetGroups } from "@/data";
import {
  PHONE_DISPLAY,
  PHONE_HREF,
  whatsappLink,
} from "@/data/contact";
import { formatINR } from "@/lib/price";
import { LOGO_URL } from "@/lib/cloudinary";

/** Thin row above the main bar. Scrolls away rather than sticking. */
const UTILITY_LINKS = [
  { label: "About Us", to: "/about" },
  { label: "Blog", to: "/blog" },
  { label: "Contact Us", to: "/contact" },
] as const;

const PRIMARY_LINKS = [
  { label: "Yatra", to: "/yatra" },
  { label: "Packages", to: "/packages" },
  { label: "Stays", to: "/stays" },
] as const;

const FACET_GROUPS: FacetGroup[] = trekFacetGroups();
const POPULAR = popularTreks(6);

function UtilityBar() {
  return (
    <div
      data-ocid="navbar.utility"
      className="hidden lg:block border-b text-[12px] font-body"
      style={{ backgroundColor: "#1A1A1A", borderColor: "#2A2A2A" }}
    >
      <div className="w-full max-w-[1400px] mx-auto px-6 h-9 flex items-center justify-between">
        <div className="flex items-center gap-2 text-white/70">
          <Star size={12} style={{ color: "#FFC107" }} fill="#FFC107" />
          <span>4.9/5 from 800+ trekkers</span>
          <span className="text-white/25">·</span>
          <span>Operating since 2018</span>
        </div>
        <div className="flex items-center gap-5">
          {UTILITY_LINKS.map(({ label, to }) => (
            <Link
              key={to}
              href={to}
              data-ocid={`navbar.utility.${label.toLowerCase().replace(/\s/g, "_")}`}
              className="text-white/70 hover:text-[#FFC107] transition-colors"
            >
              {label}
            </Link>
          ))}
          <a
            href={PHONE_HREF}
            data-ocid="navbar.utility.phone"
            className="flex items-center gap-1.5 font-medium hover:brightness-110 transition-all"
            style={{ color: "#FFC107" }}
          >
            <Phone size={12} />
            {PHONE_DISPLAY}
          </a>
        </div>
      </div>
    </div>
  );
}

function MegaMenu({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div
      data-ocid="navbar.mega_menu"
      className="absolute left-0 right-0 top-full bg-white border-t shadow-xl"
      style={{ borderColor: "#E8E8E8" }}
    >
      <div className="w-full max-w-[1400px] mx-auto px-6 py-8 grid grid-cols-5 gap-8">
        {FACET_GROUPS.map((group) => (
          <div key={group.title}>
            <p
              className="text-[11px] font-body font-semibold uppercase tracking-widest mb-4"
              style={{ color: "#888888" }}
            >
              {group.title}
            </p>
            <ul className="space-y-2.5">
              {group.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onNavigate}
                    className="group flex items-center justify-between text-[13px] font-body transition-colors"
                    style={{ color: "#555555" }}
                  >
                    <span className="group-hover:text-[#1A1A1A]">
                      {item.label}
                    </span>
                    <span
                      className="text-[11px] tabular-nums"
                      style={{ color: "#BBBBBB" }}
                    >
                      {item.count}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <p
            className="text-[11px] font-body font-semibold uppercase tracking-widest mb-4"
            style={{ color: "#888888" }}
          >
            Popular treks
          </p>
          <ul className="space-y-2.5">
            {POPULAR.map((trek) => (
              <li key={trek.slug}>
                <Link
                  href={`/treks/${trek.slug}`}
                  onClick={onNavigate}
                  className="group block text-[13px] font-body"
                  style={{ color: "#555555" }}
                >
                  <span className="group-hover:text-[#1A1A1A]">
                    {trek.name}
                  </span>
                  <span className="block text-[11px]" style={{ color: "#BBBBBB" }}>
                    {formatINR(Number(trek.priceRange.minINR))} ·{" "}
                    {Number(trek.durationDays)} days
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div
        className="border-t"
        style={{ backgroundColor: "#FAFAFA", borderColor: "#E8E8E8" }}
      >
        <div className="w-full max-w-[1400px] mx-auto px-6 py-3.5 flex items-center justify-between">
          <p className="text-[12px] font-body" style={{ color: "#888888" }}>
            Not sure which trek suits you? Talk to a trek expert.
          </p>
          <Link
            href="/treks"
            onClick={onNavigate}
            data-ocid="navbar.mega_menu.all_treks"
            className="flex items-center gap-1.5 text-[13px] font-body font-semibold"
            style={{ color: "#1A1A1A" }}
          >
            Browse all treks <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </div>
  );
}

function MobileDrawer({
  open,
  onNavigate,
}: {
  open: boolean;
  onNavigate: () => void;
}) {
  const [expanded, setExpanded] = useState<string | null>("By region");

  return (
    <div
      data-ocid="navbar.mobile_drawer"
      aria-hidden={!open}
      className={`fixed inset-0 z-40 lg:hidden bg-white overflow-y-auto transition-all duration-300 ${
        open
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
      style={{ paddingTop: "60px", borderTop: "1px solid #E8E8E8" }}
    >
      <nav className="px-5 pt-5 pb-10" aria-label="Mobile navigation">
        <Link
          href="/treks"
          onClick={onNavigate}
          data-ocid="navbar.mobile_link.all_treks"
          className="flex items-center justify-between px-4 py-3.5 rounded-lg text-[15px] font-body font-semibold text-black"
          style={{ backgroundColor: "#FFF8E1" }}
        >
          All Treks
          <ArrowRight size={15} style={{ color: "#FFC107" }} />
        </Link>

        {/* Facet groups collapse so the drawer stays scannable on a phone */}
        <div className="mt-3 rounded-lg border" style={{ borderColor: "#E8E8E8" }}>
          {FACET_GROUPS.map((group, i) => {
            const isOpen = expanded === group.title;
            return (
              <div
                key={group.title}
                className={i > 0 ? "border-t" : undefined}
                style={i > 0 ? { borderColor: "#E8E8E8" } : undefined}
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setExpanded(isOpen ? null : group.title)}
                  className="no-retro w-full flex items-center justify-between px-4 py-3.5 text-[14px] font-body font-medium"
                  style={{ color: "#1A1A1A" }}
                >
                  {group.title}
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
                    style={{ color: "#888888" }}
                  />
                </button>
                {isOpen && (
                  <ul className="pb-2">
                    {group.items.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={onNavigate}
                          className="flex items-center justify-between pl-7 pr-4 py-2.5 text-[13px] font-body"
                          style={{ color: "#555555" }}
                        >
                          {item.label}
                          <span style={{ color: "#BBBBBB" }}>{item.count}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-5 flex flex-col">
          {PRIMARY_LINKS.map(({ label, to }) => (
            <Link
              key={to}
              href={to}
              onClick={onNavigate}
              data-ocid={`navbar.mobile_link.${label.toLowerCase()}`}
              className="flex items-center justify-between px-4 py-3.5 text-[15px] font-body font-medium border-b"
              style={{ color: "#1A1A1A", borderColor: "#E8E8E8" }}
            >
              {label}
              <ArrowRight size={15} style={{ color: "#FFC107", opacity: 0.8 }} />
            </Link>
          ))}
        </div>

        <Link
          href="/contact"
          onClick={onNavigate}
          data-ocid="navbar.mobile_cta"
          className="mt-6 flex items-center justify-center gap-2 px-4 py-3.5 rounded text-[15px] font-semibold font-body text-black"
          style={{ backgroundColor: "#FFC107" }}
        >
          Plan Your Trip <ArrowRight size={15} />
        </Link>
        <a
          href={PHONE_HREF}
          data-ocid="navbar.mobile_phone"
          className="mt-2 flex items-center justify-center gap-2 px-4 py-3 rounded text-[14px] font-medium font-body border"
          style={{ color: "#1A1A1A", borderColor: "#E8E8E8" }}
        >
          <Phone size={15} style={{ color: "#FFC107" }} />
          {PHONE_DISPLAY}
        </a>
        <a
          href={whatsappLink("Hi TrekRoots! I'd like to plan a trip.")}
          target="_blank"
          rel="noopener noreferrer"
          data-ocid="navbar.mobile_whatsapp"
          className="mt-2 flex items-center justify-center gap-2 px-4 py-3 rounded text-[14px] font-medium font-body border"
          style={{ color: "#FFC107", borderColor: "#FFC107" }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Chat on WhatsApp
        </a>
      </nav>
    </div>
  );
}

export function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const pathname = usePathname();
  const megaId = useId();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: pathname triggers close intentionally
  useEffect(() => {
    setDrawerOpen(false);
    setMegaOpen(false);
    document.body.style.overflow = "";
  }, [pathname]);

  useEffect(() => {
    if (!megaOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMegaOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [megaOpen]);

  const toggleDrawer = () => {
    setDrawerOpen((v) => {
      document.body.style.overflow = v ? "" : "hidden";
      return !v;
    });
  };

  const closeDrawer = useCallback(() => {
    setDrawerOpen(false);
    document.body.style.overflow = "";
  }, []);

  /** Small grace period so the pointer can cross the gap into the panel. */
  const openMega = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMegaOpen(true);
  };
  const scheduleCloseMega = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMegaOpen(false), 120);
  };

  const treksActive = pathname.startsWith("/treks");

  return (
    <>
      <UtilityBar />

      <header
        data-ocid="navbar"
        className="sticky top-0 left-0 right-0 z-50 bg-white"
        style={{ borderBottom: "1px solid #E8E8E8" }}
      >
        <div className="w-full max-w-[1400px] mx-auto px-4 lg:px-6 h-[60px] lg:h-[68px] grid grid-cols-3 items-center lg:flex lg:justify-between lg:gap-3">
          {/* Left: hamburger (phone) / logo (desktop) */}
          <div className="flex items-center justify-start min-w-0">
            <button
              type="button"
              data-ocid="navbar.mobile_menu_toggle"
              aria-label={drawerOpen ? "Close menu" : "Open menu"}
              aria-expanded={drawerOpen}
              onClick={toggleDrawer}
              className="lg:hidden -ml-1.5 p-2 rounded hover:bg-[#FFC107]/10 transition-colors"
              style={{ color: "#1A1A1A" }}
            >
              {drawerOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            <Link
              href="/"
              data-ocid="navbar.logo"
              className="hidden lg:flex items-center min-w-0 shrink-0 rounded-md overflow-hidden"
              aria-label="TrekRoots — Explore New Heights"
            >
              <Image
                src={LOGO_URL}
                alt="TrekRoots — Explore New Heights"
                width={200}
                height={56}
                className="h-12 w-auto object-contain object-left"
                priority
                unoptimized
              />
            </Link>
          </div>

          {/* Center logo — phone only, truly centered in the bar */}
          <Link
            href="/"
            data-ocid="navbar.logo.mobile"
            className="lg:hidden flex items-center justify-center justify-self-center"
            aria-label="TrekRoots — Explore New Heights"
          >
            <Image
              src={LOGO_URL}
              alt="TrekRoots — Explore New Heights"
              width={160}
              height={44}
              className="h-9 w-auto object-contain"
              priority
              unoptimized
            />
          </Link>

          <nav
            className="hidden lg:flex items-center gap-0.5"
            aria-label="Main navigation"
          >
            <div
              onMouseEnter={openMega}
              onMouseLeave={scheduleCloseMega}
              className="relative"
            >
              <button
                type="button"
                data-ocid="navbar.link.all_treks"
                aria-expanded={megaOpen}
                aria-controls={megaId}
                onClick={() => setMegaOpen((v) => !v)}
                className="no-retro flex items-center gap-1 px-3.5 py-1.5 text-[13px] font-body font-medium tracking-wide rounded transition-colors"
                style={{
                  color: treksActive || megaOpen ? "#FFC107" : "#555555",
                  fontWeight: treksActive ? 600 : undefined,
                }}
              >
                All Treks
                <ChevronDown
                  size={13}
                  className={`transition-transform ${megaOpen ? "rotate-180" : ""}`}
                />
              </button>
            </div>

            {PRIMARY_LINKS.map(({ label, to }) => {
              const active = pathname.startsWith(to);
              return (
                <Link
                  key={to}
                  href={to}
                  data-ocid={`navbar.link.${label.toLowerCase()}`}
                  className="px-3.5 py-1.5 text-[13px] font-body font-medium tracking-wide rounded transition-colors"
                  style={{
                    color: active ? "#FFC107" : "#555555",
                    fontWeight: active ? 600 : undefined,
                  }}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center justify-end gap-1.5 shrink-0">
            <Link
              href="/search"
              data-ocid="navbar.search"
              aria-label="Search"
              className="p-2 rounded hover:bg-[#FFC107]/10 transition-colors"
              style={{ color: "#FFC107" }}
            >
              <Search size={18} />
            </Link>
            <Link
              href="/contact"
              data-ocid="navbar.cta"
              className="hidden lg:flex items-center gap-1.5 px-4 py-1.5 rounded text-[13px] font-semibold font-body text-black transition-colors hover:brightness-110"
              style={{ backgroundColor: "#FFC107" }}
            >
              Plan Your Trip <ArrowRight size={13} />
            </Link>
          </div>
        </div>

        {megaOpen && (
          <div
            id={megaId}
            className="hidden lg:block"
            onMouseEnter={openMega}
            onMouseLeave={scheduleCloseMega}
          >
            <MegaMenu onNavigate={() => setMegaOpen(false)} />
          </div>
        )}
      </header>

      <MobileDrawer open={drawerOpen} onNavigate={closeDrawer} />
    </>
  );
}
