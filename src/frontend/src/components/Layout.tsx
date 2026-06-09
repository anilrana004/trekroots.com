import type { ReactNode } from "react";
import { Footer } from "./Footer";
import { MobileBottomNav } from "./MobileBottomNav";
import { Navbar } from "./Navbar";

interface LayoutProps {
  children: ReactNode;
  /** Remove the 68px top padding — use when a page has its own full-bleed hero */
  noTopPad?: boolean;
}

export function Layout({ children, noTopPad = false }: LayoutProps) {
  return (
    <div
      className="min-h-screen flex flex-col font-body"
      style={{ backgroundColor: "#FAFAF7" }}
    >
      <Navbar />
      <main
        id="main-content"
        className={`flex-1 ${noTopPad ? "" : "pt-[68px]"}`}
        style={{ color: "#1A1A1A" }}
      >
        {children}
      </main>
      <Footer />
      {/* Mobile only: push content above bottom nav */}
      <div className="h-14 md:hidden" aria-hidden="true" />
      <MobileBottomNav />
    </div>
  );
}
