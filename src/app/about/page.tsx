import type { Metadata } from "next";
import AboutPage from "@/views/AboutPage";
import { JsonLd } from "@/components/JsonLd";
import { buildPageMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = buildPageMetadata({
  title: "About TrekRoots",
  description:
    "TrekRoots is a Dehradun-based Himalayan trek and yatra operator — operating since 2018 across Uttarakhand, Himachal Pradesh and Maharashtra.",
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
