import type { Metadata } from "next";
import HomePage from "@/views/HomePage";
import { JsonLd } from "@/components/JsonLd";
import { HOME_FAQS } from "@/data/home-faqs";
import { getHomeJournal } from "@/lib/sanity";
import { r2VideoUrl } from "@/lib/r2-media";
import { buildPageMetadata } from "@/lib/seo";
import { faqPageSchema } from "@/lib/schema";

export const revalidate = 60;

export const metadata: Metadata = buildPageMetadata({
  title: "Himalayan Treks, Yatras & Stays",
  description:
    "Plan Himalayan treks, sacred yatras, curated packages and mountain stays with TrekRoots — Dehradun-based guides for Uttarakhand and beyond.",
  path: "/",
});

export default async function Page() {
  const journal = await getHomeJournal();
  const heroVideo = r2VideoUrl("valley-of-flowers");

  return (
    <>
      <link rel="preload" as="video" href={heroVideo} type="video/mp4" />
      <JsonLd id="schema-home-faq" data={faqPageSchema(HOME_FAQS)} />
      <HomePage journal={journal} />
    </>
  );
}
