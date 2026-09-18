import type { Metadata } from "next";
import { Suspense } from "react";
import TreksPage from "@/views/TreksPage";
import TreksIndexLoading from "./loading";
import { JsonLd } from "@/components/JsonLd";
import { buildPageMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = buildPageMetadata({
  title: "Himalayan Treks in Uttarakhand, Himachal & Maharashtra",
  description:
    "Browse TrekRoots Himalayan treks by region, difficulty, duration and season — from Kedarkantha and Valley of Flowers to Hampta Pass.",
  path: "/treks",
});

const CRUMBS = [
  { name: "Home", path: "/" },
  { name: "Treks", path: "/treks" },
];

export default function Page() {
  return (
    <>
      <JsonLd id="schema-treks-breadcrumb" data={breadcrumbSchema(CRUMBS)} />
      <Suspense fallback={<TreksIndexLoading />}>
        <TreksPage />
      </Suspense>
    </>
  );
}
