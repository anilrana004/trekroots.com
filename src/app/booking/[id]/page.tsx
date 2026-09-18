import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Book a Trek",
  description: "WhatsApp enquiry for TrekRoots Himalayan trips.",
  path: "/booking",
  noIndex: true,
});

export { default } from "@/views/BookingPage";
