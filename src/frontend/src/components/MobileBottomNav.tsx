import { Link, useLocation } from "@tanstack/react-router";
import { BedDouble, Home, Mountain, Package, Sun } from "lucide-react";

const NAV_ITEMS = [
  { to: "/", label: "Home", icon: Home, ocid: "mobile_nav.home" },
  { to: "/treks", label: "Treks", icon: Mountain, ocid: "mobile_nav.treks" },
  { to: "/yatra", label: "Yatra", icon: Sun, ocid: "mobile_nav.yatra" },
  {
    to: "/packages",
    label: "Packages",
    icon: Package,
    ocid: "mobile_nav.packages",
  },
  { to: "/stays", label: "Stays", icon: BedDouble, ocid: "mobile_nav.stays" },
] as const;

export function MobileBottomNav() {
  const { pathname } = useLocation();
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden h-14 flex items-stretch"
      style={{
        backgroundColor: "#3C1414",
        borderTop: "1px solid rgba(230,190,138,0.15)",
      }}
      aria-label="Mobile navigation"
    >
      {NAV_ITEMS.map(({ to, label, icon: Icon, ocid }) => {
        const active = to === "/" ? pathname === "/" : pathname.startsWith(to);
        return (
          <Link
            key={to}
            to={to}
            data-ocid={ocid}
            className="flex-1 flex flex-col items-center justify-center gap-0.5 text-[10px] font-body font-medium tracking-wide relative transition-all"
            style={{ color: active ? "#E6BE8A" : "rgba(255,255,255,0.5)" }}
            aria-current={active ? "page" : undefined}
          >
            <Icon size={19} strokeWidth={active ? 2.2 : 1.6} />
            <span>{label}</span>
            {active && (
              <span
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[2px] rounded-full"
                style={{ backgroundColor: "#E6BE8A" }}
                aria-hidden="true"
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
