import type { Metadata } from "next";
import AboutPage from "@/views/AboutPage";
import { JsonLd } from "@/components/JsonLd";
import { buildPageMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = buildPageMetadata({
  title: "About TrekRoots — Himalayan Treks & Yatras from Dehradun",
  description:
    "TrekRoots is a Dehradun-based Himalayan travel company operating since 2018 — treks, sacred yatras, packages and owned mountain stays across Uttarakhand and beyond.",
  path: "/about",
});

const CRUMBS = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
];

export default function Page() {
  return (
    <>
      <JsonLd id="schema-about-breadcrumb" data={breadcrumbSchema(CRUMBS)} />
      <AboutPage />
    </>
  );
}
