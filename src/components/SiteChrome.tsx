"use client";

import type { ReactNode } from "react";
import { Footer } from "@/components/Footer";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import { Navbar } from "@/components/Navbar";
import { WhatsAppFloatButton } from "@/components/WhatsAppFloatButton";
import { useScrollHeaderVisibility } from "@/hooks/use-scroll-header";

export function SiteChrome({ children }: { children: ReactNode }) {
  useScrollHeaderVisibility();

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      <Navbar />
      <main className="flex-1 pt-[68px]">{children}</main>
      <Footer />
      <div className="h-14 md:hidden" aria-hidden="true" />
      <MobileBottomNav />
      <WhatsAppFloatButton />
    </div>
  );
}
