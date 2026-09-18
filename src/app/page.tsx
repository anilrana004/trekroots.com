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
  title: "TrekRoots - Himalayan Treks That Transform Lives",
  description:
    "Join guided Himalayan treks, sacred yatras and mountain stays with TrekRoots — Dehradun experts for Kedarkantha, Valley of Flowers, Char Dham and more.",
  path: "/",
  absoluteTitle: true,
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
