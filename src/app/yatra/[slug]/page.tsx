import type { Metadata } from "next";
import { notFound } from "next/navigation";
import YatraDetailPage from "@/views/YatraDetailPage";
import { JsonLd } from "@/components/JsonLd";
import { getAllYatras, getYatraBySlug } from "@/data";
import { getRelatedBlogCardsForTrip } from "@/lib/sanity";
import { buildPageMetadata, truncateMeta } from "@/lib/seo";
import {
  breadcrumbSchema,
  faqPageSchema,
  yatraSchema,
} from "@/lib/schema";

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 60;

export function generateStaticParams() {
  return getAllYatras().map((y) => ({ slug: y.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const yatra = getYatraBySlug(slug);
  if (!yatra) return { title: "Yatra not found" };

  const title = `${yatra.name} (${yatra.duration}) | Yatra`;
  const description = truncateMeta(
    `${yatra.name}: ${yatra.duration}, season ${yatra.season}. Route: ${yatra.route}. From ₹${Number(yatra.priceRange.minINR).toLocaleString("en-IN")}. ${yatra.tagline || yatra.spiritualSignificance || ""}`,
  );

  return buildPageMetadata({
    title,
    description,
    path: `/yatra/${slug}`,
    absoluteTitle: true,
    ogImage: yatra.imageUrl,
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const yatra = getYatraBySlug(slug);
  if (!yatra) notFound();

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Yatra", path: "/yatra" },
    { name: yatra.name, path: `/yatra/${yatra.slug}` },
  ];

  const relatedGuides = await getRelatedBlogCardsForTrip(
    yatra.name,
    yatra.slug,
    3,
  );

  return (
    <>
      <JsonLd id="schema-yatra" data={yatraSchema(yatra)} />
      <JsonLd
        id="schema-yatra-faq"
        data={faqPageSchema(yatra.faqs ?? [])}
      />
      <JsonLd id="schema-yatra-breadcrumb" data={breadcrumbSchema(crumbs)} />
      <YatraDetailPage relatedGuides={relatedGuides} />
    </>
  );
}
