import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TrekDetailPage from "@/views/TrekDetailPage";
import { JsonLd } from "@/components/JsonLd";
import { getAllTreks, getTrekBySlug, getTrekHeroImages } from "@/data";
import { DEFAULT_TREK_FAQS } from "@/data/default-trek-faqs";
import { buildCldSrcSet, resolveMediaUrl } from "@/lib/cloudinary";
import { getRelatedBlogCardsForTrip } from "@/lib/sanity";
import { buildPageMetadata, truncateMeta } from "@/lib/seo";
import {
  breadcrumbSchema,
  faqPageSchema,
  trekSchema,
} from "@/lib/schema";

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 60;

const HERO_OPTS = {
  width: 1920,
  height: 1080,
  crop: "fill" as const,
  gravity: "auto" as const,
  quality: "auto:good" as const,
  format: "auto" as const,
};

export function generateStaticParams() {
  return getAllTreks().map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const trek = getTrekBySlug(slug);
  if (!trek) return { title: "Trek not found" };

  const title = `${trek.name} (${trek.maxAltitudeM} m) | ${trek.region}`;
  const description = truncateMeta(
    `${trek.name} in ${trek.region}: ${trek.durationDays} days, ${trek.difficulty}, best ${trek.bestSeason}. From ₹${Number(trek.priceRange.minINR).toLocaleString("en-IN")}. Starts ${trek.startPoint}. ${trek.tagline || ""}`,
  );

  return buildPageMetadata({
    title,
    description,
    path: `/treks/${slug}`,
    absoluteTitle: true,
    ogImage: trek.imageUrl,
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const trek = getTrekBySlug(slug);
  if (!trek) notFound();

  const faqs =
    trek.faqs && trek.faqs.length > 0 ? trek.faqs : DEFAULT_TREK_FAQS;
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Treks", path: "/treks" },
    { name: trek.region, path: `/treks?state=${encodeURIComponent(trek.state)}` },
    { name: trek.name, path: `/treks/${trek.slug}` },
  ];

  const hero = getTrekHeroImages(trek.slug, trek.imageUrl)[0] || trek.imageUrl;
  const lcpHref = resolveMediaUrl(hero, HERO_OPTS);
  const lcpSrcSet = buildCldSrcSet(hero, HERO_OPTS);
  const relatedGuides = await getRelatedBlogCardsForTrip(
    trek.name,
    trek.slug,
    3,
  );

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
      <JsonLd id="schema-trek" data={trekSchema(trek)} />
      <JsonLd id="schema-trek-faq" data={faqPageSchema(faqs)} />
      <JsonLd id="schema-trek-breadcrumb" data={breadcrumbSchema(crumbs)} />
      <TrekDetailPage relatedGuides={relatedGuides} />
    </>
  );
}
