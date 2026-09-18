import type { Metadata } from "next";
import { Suspense } from "react";
import TreksPage from "@/views/TreksPage";
import { JsonLd } from "@/components/JsonLd";
import { buildPageMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = buildPageMetadata({
  title: "Easy–moderate treks",
  description:
    "Kedarkantha · Dayara Bugyal · Chopta Tungnath · Valley of Flowers · Har Ki Dun — easy to moderate Himalayan treks with TrekRoots.",
  path: "/easy-moderate-treks",
});

const CRUMBS = [
  { name: "Home", path: "/" },
  { name: "Treks", path: "/treks" },
  { name: "Easy–moderate treks", path: "/easy-moderate-treks" },
];

export default function Page() {
  return (
    <>
      <JsonLd
        id="schema-easy-moderate-treks-breadcrumb"
        data={breadcrumbSchema(CRUMBS)}
      />
      <Suspense fallback={<div className="min-h-[40vh] bg-white" />}>
        <TreksPage forcedDifficulty="Easy to Moderate" />
      </Suspense>
    </>
  );
}
