"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, Search, X } from "lucide-react";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "Treks", to: "/treks" },
  { label: "Yatra", to: "/yatra" },
  { label: "Packages", to: "/packages" },
  { label: "Stays", to: "/stays" },
  { label: "Blog", to: "/blog" },
  { label: "About", to: "/about" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // biome-ignore lint/correctness/useExhaustiveDependencies: pathname triggers close intentionally
  useEffect(() => {
    setOpen(false);
    document.body.style.overflow = "";
  }, [pathname]);

  const toggleMenu = () => {
    setOpen((v) => {
      document.body.style.overflow = v ? "" : "hidden";
      return !v;
    });
  };

  return (
    <>
      <header
        data-ocid="navbar"
        className="fixed top-0 left-0 right-0 z-50 h-[68px] flex items-center bg-white"
        style={{
          borderBottom: "1px solid #E8E8E8",
        }}
      >
        <div className="w-full max-w-[1400px] mx-auto px-6 flex items-center justify-between">
          <Link
            href="/"
            data-ocid="navbar.logo"
            className="flex items-center min-w-0 shrink-0 rounded-md overflow-hidden"
            aria-label="TrekRoots — Explore New Heights"
          >
            <Image
              src="/assets/images/logo.png"
              alt="TrekRoots"
              width={200}
              height={56}
              className="h-12 w-auto object-contain object-left"
              priority
            />
          </Link>

          <nav
            className="hidden md:flex items-center gap-0.5 absolute left-1/2 -translate-x-1/2"
            aria-label="Main navigation"
          >
            {NAV_LINKS.map(({ label, to }) => {
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

          <div className="flex items-center gap-1.5 shrink-0">
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
              className="hidden md:flex items-center gap-1.5 px-4 py-1.5 rounded text-[13px] font-semibold font-body text-black transition-colors hover:brightness-110"
              style={{ backgroundColor: "#FFC107" }}
            >
              Plan Your Trip <ArrowRight size={13} />
            </Link>
            <button
              type="button"
              data-ocid="navbar.mobile_menu_toggle"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={toggleMenu}
              className="md:hidden p-2 rounded hover:bg-[#FFC107]/10 transition-colors"
              style={{ color: "#FFC107" }}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      <div
        data-ocid="navbar.mobile_drawer"
        aria-hidden={!open}
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        style={{
          backgroundColor: "#FFFFFF",
          paddingTop: "68px",
          borderTop: "1px solid #E8E8E8",
        }}
      >
        <nav
          className="flex flex-col px-6 pt-6 pb-8 gap-1"
          aria-label="Mobile navigation"
        >
          {NAV_LINKS.map(({ label, to }) => (
            <Link
              key={to}
              href={to}
              data-ocid={`navbar.mobile_link.${label.toLowerCase()}`}
              className="flex items-center justify-between px-4 py-3.5 text-[15px] font-body font-medium transition-colors border-b last:border-0"
              style={{ color: "#1A1A1A", borderColor: "#E8E8E8" }}
            >
              {label}
              <ArrowRight
                size={15}
                style={{ color: "#FFC107", opacity: 0.8 }}
              />
            </Link>
          ))}
          <Link
            href="/contact"
            data-ocid="navbar.mobile_cta"
            className="mt-6 flex items-center justify-center gap-2 px-4 py-3.5 rounded text-[15px] font-semibold font-body text-black transition-colors"
            style={{ backgroundColor: "#FFC107" }}
          >
            Plan Your Trip <ArrowRight size={15} />
          </Link>
          <a
            href="https://wa.me/919999999999?text=Hi%20TrekRoots!%20I'd%20like%20to%20plan%20a%20trip."
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="navbar.mobile_whatsapp"
            className="mt-2 flex items-center justify-center gap-2 px-4 py-3 rounded text-[14px] font-medium font-body transition-colors border"
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
    </>
  );
}
