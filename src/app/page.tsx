import type { Metadata } from "next";
import HomePage from "@/views/HomePage";
import { JsonLd } from "@/components/JsonLd";
import { HOME_FAQS } from "@/data/home-faqs";
import { getTrekCoverImage } from "@/data";
import { buildCldSrcSet, resolveMediaUrl } from "@/lib/cloudinary";
import { getHomeJournal } from "@/lib/sanity";
import { buildPageMetadata } from "@/lib/seo";
import { faqPageSchema } from "@/lib/schema";

export const revalidate = 60;

export const metadata: Metadata = buildPageMetadata({
  title: "Himalayan Treks, Yatras & Stays",
  description:
    "Plan Himalayan treks, sacred yatras, curated packages and mountain stays with TrekRoots — Dehradun-based guides for Uttarakhand and beyond.",
  path: "/",
});

const LCP_OPTS = {
  width: 1920,
  height: 1080,
  crop: "fill" as const,
  gravity: "auto" as const,
  quality: "auto:good" as const,
  format: "auto" as const,
};

export default async function Page() {
  const lcpSrc = getTrekCoverImage("valley-of-flowers");
  const lcpHref = resolveMediaUrl(lcpSrc, LCP_OPTS);
  const lcpSrcSet = buildCldSrcSet(lcpSrc, LCP_OPTS);
  const journal = await getHomeJournal();

  return (
    <>
      {lcpHref ? (
        <link
          rel="preload"
          as="image"
          href={lcpHref}
          imageSrcSet={lcpSrcSet || undefined}
          imageSizes="100vw"
          fetchPriority="high"
        />
      ) : null}
      <JsonLd id="schema-home-faq" data={faqPageSchema(HOME_FAQS)} />
      <HomePage journal={journal} />
    </>
  );
}
