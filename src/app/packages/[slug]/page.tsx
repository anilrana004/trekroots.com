import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PackageDetailPage from "@/views/PackageDetailPage";
import { JsonLd } from "@/components/JsonLd";
import { getAllPackages, getPackageBySlug } from "@/data";
import { buildPageMetadata, truncateMeta } from "@/lib/seo";
import { breadcrumbSchema, packageSchema } from "@/lib/schema";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllPackages().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const pkg = getPackageBySlug(slug);
  if (!pkg) return { title: "Package not found" };

  const title = `${pkg.name} | ${pkg.duration}`;
  const description = truncateMeta(
    `${pkg.name}: ${pkg.duration} Himalayan package from ₹${Number(pkg.priceRange.minINR).toLocaleString("en-IN")}. ${pkg.tagline || pkg.problemSolved || pkg.description}`,
  );

  return buildPageMetadata({
    title,
    description,
    path: `/packages/${slug}`,
    absoluteTitle: true,
    ogImage: pkg.imageUrl,
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const pkg = getPackageBySlug(slug);
  if (!pkg) notFound();

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Packages", path: "/packages" },
    { name: pkg.name, path: `/packages/${pkg.slug}` },
  ];

  return (
    <>
      <JsonLd id="schema-package" data={packageSchema(pkg)} />
      <JsonLd id="schema-package-breadcrumb" data={breadcrumbSchema(crumbs)} />
      <PackageDetailPage />
    </>
  );
}
