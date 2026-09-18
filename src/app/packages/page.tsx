import type { Metadata } from "next";
import PackagesPage from "@/views/PackagesPage";
import { JsonLd } from "@/components/JsonLd";
import { buildPageMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = buildPageMetadata({
  title: "Curated Himalayan Travel Packages",
  description:
    "Honeymoon, family and group Himalayan packages from TrekRoots — Spiti, Kashmir, Kerala circuits and more with stays and logistics handled.",
  path: "/packages",
});

const CRUMBS = [
  { name: "Home", path: "/" },
  { name: "Packages", path: "/packages" },
];

export default function Page() {
  return (
    <>
      <JsonLd
        id="schema-packages-breadcrumb"
        data={breadcrumbSchema(CRUMBS)}
      />
      <PackagesPage />
    </>
  );
}
