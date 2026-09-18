import type { Metadata } from "next";
import StaysPage from "@/views/StaysPage";
import { JsonLd } from "@/components/JsonLd";
import { buildPageMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = buildPageMetadata({
  title: "Himalayan Homestays & Mountain Stays",
  description:
    "Stay at TrekRoots-owned and partner Himalayan homestays near popular trek base villages across Uttarakhand.",
  path: "/stays",
});

const CRUMBS = [
  { name: "Home", path: "/" },
  { name: "Stays", path: "/stays" },
];

export default function Page() {
  return (
    <>
      <JsonLd id="schema-stays-breadcrumb" data={breadcrumbSchema(CRUMBS)} />
      <StaysPage />
    </>
  );
}
