import type { Metadata } from "next";
import { Suspense } from "react";
import YatraPage from "@/views/YatraPage";
import { JsonLd } from "@/components/JsonLd";
import { buildPageMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = buildPageMetadata({
  title: "Sacred Yatra & Pilgrimage Journeys",
  description:
    "Char Dham, Kedarnath, Adi Kailash and more — TrekRoots guided Himalayan yatras from Dehradun with permits, stays and local expertise.",
  path: "/yatra",
});

const CRUMBS = [
  { name: "Home", path: "/" },
  { name: "Yatra", path: "/yatra" },
];

export default function Page() {
  return (
    <>
      <JsonLd id="schema-yatra-index-breadcrumb" data={breadcrumbSchema(CRUMBS)} />
      <Suspense fallback={<div className="min-h-[40vh] bg-white" />}>
        <YatraPage />
      </Suspense>
    </>
  );
}
