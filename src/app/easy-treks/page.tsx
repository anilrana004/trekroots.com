import type { Metadata } from "next";
import { Suspense } from "react";
import TreksPage from "@/views/TreksPage";
import { JsonLd } from "@/components/JsonLd";
import { buildPageMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = buildPageMetadata({
  title: "Easy Treks",
  description:
    "Nag Tibba · Devkund · Andharban · Rajmachi — best beginner Himalayan treks with TrekRoots from Dehradun.",
  path: "/easy-treks",
});

const CRUMBS = [
  { name: "Home", path: "/" },
  { name: "Treks", path: "/treks" },
  { name: "Easy Treks", path: "/easy-treks" },
];

export default function Page() {
  return (
    <>
      <JsonLd
        id="schema-easy-treks-breadcrumb"
        data={breadcrumbSchema(CRUMBS)}
      />
      <Suspense fallback={<div className="min-h-[40vh] bg-white" />}>
        <TreksPage forcedDifficulty="Easy" />
      </Suspense>
    </>
  );
}
