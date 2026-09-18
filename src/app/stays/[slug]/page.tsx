import type { Metadata } from "next";
import { notFound } from "next/navigation";
import StayDetailPage from "@/views/StayDetailPage";
import { JsonLd } from "@/components/JsonLd";
import { getAllStays, getStayBySlug } from "@/data";
import { buildPageMetadata, truncateMeta } from "@/lib/seo";
import { breadcrumbSchema, staySchema } from "@/lib/schema";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllStays().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const stay = getStayBySlug(slug);
  if (!stay) return { title: "Stay not found" };

  const title = `${stay.name} — ${stay.location.split(",")[0]}`;
  const description = truncateMeta(
    `${stay.name} (${stay.stayType}) in ${stay.location}. From ₹${stay.pricePerNightMin}/night. ${stay.description}`,
  );

  return buildPageMetadata({
    title,
    description,
    path: `/stays/${slug}`,
    absoluteTitle: true,
    ogImage: stay.imageUrl,
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const stay = getStayBySlug(slug);
  if (!stay) notFound();

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Stays", path: "/stays" },
    { name: stay.name, path: `/stays/${stay.slug}` },
  ];

  return (
    <>
      <JsonLd id="schema-stay" data={staySchema(stay)} />
      <JsonLd id="schema-stay-breadcrumb" data={breadcrumbSchema(crumbs)} />
      <StayDetailPage />
    </>
  );
}
