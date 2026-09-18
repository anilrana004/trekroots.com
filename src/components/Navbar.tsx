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
import type { FacetGroup, MegaPopularItem } from "@/data";
import {
  packageMegaMenu,
  popularTreks,
  stayMegaMenu,
  trekFacetGroups,
  yatraMegaMenu,
} from "@/data";
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

type MenuKey = "treks" | "yatra" | "packages" | "stays";

type NavMega = {
  key: MenuKey;
  label: string;
  href: string;
  groups: FacetGroup[];
  popularTitle: string;
  popular: MegaPopularItem[];
  footerHint: string;
  footerCta: string;
  pathPrefix: string;
};

const TREK_GROUPS = trekFacetGroups();
const TREK_POPULAR: MegaPopularItem[] = popularTreks(6).map((trek) => ({
  label: trek.name,
  href: `/treks/${trek.slug}`,
  meta: `${formatINR(Number(trek.priceRange.minINR))} · ${Number(trek.durationDays)} days`,
}));

const YATRA_MEGA = yatraMegaMenu();
const PACKAGE_MEGA = packageMegaMenu();
const STAY_MEGA = stayMegaMenu();

const NAV_MEGAS: NavMega[] = [
  {
    key: "treks",
    label: "All Treks",
    href: "/treks",
    groups: TREK_GROUPS,
    popularTitle: "Popular treks",
    popular: TREK_POPULAR,
    footerHint: "Not sure which trek suits you? Talk to a trek expert.",
    footerCta: "Browse all treks",
    pathPrefix: "/treks",
  },
  {
    key: "yatra",
    label: "Yatra",
    href: "/yatra",
    groups: YATRA_MEGA.groups,
    popularTitle: YATRA_MEGA.popularTitle,
    popular: YATRA_MEGA.popular,
    footerHint: YATRA_MEGA.footerHint,
    footerCta: YATRA_MEGA.footerCta,
    pathPrefix: "/yatra",
  },
  {
    key: "packages",
    label: "Packages",
    href: "/packages",
    groups: PACKAGE_MEGA.groups,
    popularTitle: PACKAGE_MEGA.popularTitle,
    popular: PACKAGE_MEGA.popular,
    footerHint: PACKAGE_MEGA.footerHint,
    footerCta: PACKAGE_MEGA.footerCta,
    pathPrefix: "/packages",
  },
  {
    key: "stays",
    label: "Stays",
    href: "/stays",
    groups: STAY_MEGA.groups,
    popularTitle: STAY_MEGA.popularTitle,
    popular: STAY_MEGA.popular,
    footerHint: STAY_MEGA.footerHint,
    footerCta: STAY_MEGA.footerCta,
    pathPrefix: "/stays",
  },
];

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

function MegaMenuPanel({
  menu,
  onNavigate,
}: {
  menu: NavMega;
  onNavigate: () => void;
}) {
  const cols = Math.min(menu.groups.length + 1, 5);

  return (
    <div
      data-ocid={`navbar.mega_menu.${menu.key}`}
      className="absolute left-0 right-0 top-full bg-white border-t shadow-xl"
      style={{ borderColor: "#E8E8E8" }}
    >
      <div
        className="w-full max-w-[1400px] mx-auto px-6 py-8 grid gap-8"
        style={{
          gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
        }}
      >
        {menu.groups.map((group) => (
          <div key={group.title}>
            <p
              className="text-[11px] font-body font-semibold uppercase tracking-widest mb-4"
              style={{ color: "#888888" }}
            >
              {group.title}
            </p>
            <ul className="space-y-2.5">
              {group.items.map((item) => (
                <li key={`${group.title}-${item.href}-${item.label}`}>
                  <Link
                    href={item.href}
                    onClick={onNavigate}
                    className="group flex items-center justify-between text-[13px] font-body transition-colors"
                    style={{ color: "#555555" }}
                  >
                    <span className="group-hover:text-[#1A1A1A] line-clamp-1 pr-2">
                      {item.label}
                    </span>
                    {item.count > 1 ? (
                      <span
                        className="text-[11px] tabular-nums shrink-0"
                        style={{ color: "#BBBBBB" }}
                      >
                        {item.count}
                      </span>
                    ) : null}
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
            {menu.popularTitle}
          </p>
          <ul className="space-y-2.5">
            {menu.popular.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onNavigate}
                  className="group block text-[13px] font-body"
                  style={{ color: "#555555" }}
                >
                  <span className="group-hover:text-[#1A1A1A] line-clamp-1">
                    {item.label}
                  </span>
                  <span
                    className="block text-[11px] line-clamp-1"
                    style={{ color: "#BBBBBB" }}
                  >
                    {item.meta}
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
        <div className="w-full max-w-[1400px] mx-auto px-6 py-3.5 flex items-center justify-between gap-4">
          <p className="text-[12px] font-body" style={{ color: "#888888" }}>
            {menu.footerHint}
          </p>
          <Link
            href={menu.href}
            onClick={onNavigate}
            data-ocid={`navbar.mega_menu.${menu.key}.browse_all`}
            className="flex items-center gap-1.5 text-[13px] font-body font-semibold shrink-0"
            style={{ color: "#1A1A1A" }}
          >
            {menu.footerCta} <ArrowRight size={13} />
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
  const [expanded, setExpanded] = useState<string | null>("treks");

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
        {NAV_MEGAS.map((menu) => {
          const isOpen = expanded === menu.key;
          return (
            <div
              key={menu.key}
              className="mb-3 rounded-lg border overflow-hidden"
              style={{ borderColor: "#E8E8E8" }}
            >
              <div className="flex items-stretch">
                <Link
                  href={menu.href}
                  onClick={onNavigate}
                  data-ocid={`navbar.mobile_link.${menu.key}`}
                  className="flex-1 flex items-center justify-between px-4 py-3.5 text-[15px] font-body font-semibold text-black"
                  style={{
                    backgroundColor: isOpen ? "#FFF8E1" : undefined,
                  }}
                >
                  {menu.label}
                  <ArrowRight size={15} style={{ color: "#FFC107" }} />
                </Link>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-label={`${isOpen ? "Collapse" : "Expand"} ${menu.label} menu`}
                  onClick={() => setExpanded(isOpen ? null : menu.key)}
                  className="no-retro px-3.5 border-l"
                  style={{ borderColor: "#E8E8E8", color: "#555555" }}
                >
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
              </div>

              {isOpen ? (
                <div className="border-t pb-2" style={{ borderColor: "#E8E8E8" }}>
                  {menu.groups.map((group) => (
                    <div key={group.title} className="pt-3">
                      <p
                        className="px-4 pb-1.5 text-[11px] font-body font-semibold uppercase tracking-widest"
                        style={{ color: "#888888" }}
                      >
                        {group.title}
                      </p>
                      <ul>
                        {group.items.map((item) => (
                          <li key={`${menu.key}-${item.href}-${item.label}`}>
                            <Link
                              href={item.href}
                              onClick={onNavigate}
                              className="flex items-center justify-between pl-5 pr-4 py-2 text-[13px] font-body"
                              style={{ color: "#555555" }}
                            >
                              <span className="line-clamp-1 pr-2">{item.label}</span>
                              {item.count > 1 ? (
                                <span style={{ color: "#BBBBBB" }}>
                                  {item.count}
                                </span>
                              ) : null}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  <p
                    className="px-4 pt-3 pb-1.5 text-[11px] font-body font-semibold uppercase tracking-widest"
                    style={{ color: "#888888" }}
                  >
                    {menu.popularTitle}
                  </p>
                  <ul>
                    {menu.popular.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={onNavigate}
                          className="block pl-5 pr-4 py-2 text-[13px] font-body"
                          style={{ color: "#555555" }}
                        >
                          <span className="line-clamp-1">{item.label}</span>
                          <span
                            className="block text-[11px]"
                            style={{ color: "#BBBBBB" }}
                          >
                            {item.meta}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          );
        })}

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
          Chat on WhatsApp
        </a>
      </nav>
    </div>
  );
}

export function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<MenuKey | null>(null);
  const pathname = usePathname();
  const megaId = useId();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: pathname triggers close intentionally
  useEffect(() => {
    setDrawerOpen(false);
    setOpenMenu(null);
    document.body.style.overflow = "";
  }, [pathname]);

  useEffect(() => {
    if (!openMenu) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenMenu(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openMenu]);

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

  const openMega = (key: MenuKey) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(key);
  };
  const scheduleCloseMega = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 120);
  };

  const activeMega = NAV_MEGAS.find((m) => m.key === openMenu) ?? null;

  return (
    <>
      <UtilityBar />

      <header
        data-ocid="navbar"
        className="sticky top-0 left-0 right-0 z-50 bg-white"
        style={{ borderBottom: "1px solid #E8E8E8" }}
      >
        <div className="w-full max-w-[1400px] mx-auto px-4 lg:px-6 h-[60px] lg:h-[68px] grid grid-cols-3 items-center lg:flex lg:justify-between lg:gap-3">
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
            {NAV_MEGAS.map((menu) => {
              const active = pathname.startsWith(menu.pathPrefix);
              const isOpen = openMenu === menu.key;
              return (
                <div
                  key={menu.key}
                  onMouseEnter={() => openMega(menu.key)}
                  onMouseLeave={scheduleCloseMega}
                  className="relative"
                >
                  <button
                    type="button"
                    data-ocid={`navbar.link.${menu.key}`}
                    aria-expanded={isOpen}
                    aria-controls={isOpen ? megaId : undefined}
                    onClick={() =>
                      setOpenMenu((v) => (v === menu.key ? null : menu.key))
                    }
                    className="no-retro flex items-center gap-1 px-3.5 py-1.5 text-[13px] font-body font-medium tracking-wide rounded transition-colors"
                    style={{
                      color: active || isOpen ? "#FFC107" : "#555555",
                      fontWeight: active ? 600 : undefined,
                    }}
                  >
                    {menu.label}
                    <ChevronDown
                      size={13}
                      className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                </div>
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

        {activeMega ? (
          <div
            id={megaId}
            className="hidden lg:block"
            onMouseEnter={() => openMega(activeMega.key)}
            onMouseLeave={scheduleCloseMega}
          >
            <MegaMenuPanel
              menu={activeMega}
              onNavigate={() => setOpenMenu(null)}
            />
          </div>
        ) : null}
      </header>

      <MobileDrawer open={drawerOpen} onNavigate={closeDrawer} />
    </>
  );
}
