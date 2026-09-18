import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { getCategoryBySlug } from "@/lib/sanity";
import { buildPageMetadata, truncateMeta } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 60;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category || !category.posts?.length) {
    return { title: "Category not found", robots: { index: false, follow: false } };
  }
  return buildPageMetadata({
    title: `${category.title} — TrekRoots Blog`,
    description: truncateMeta(
      category.description ||
        `Guides and stories in ${category.title} from TrekRoots.`,
    ),
    path: `/blog/category/${slug}`,
    absoluteTitle: true,
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category || !category.posts?.length) notFound();

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: category.title, path: `/blog/category/${slug}` },
  ];

  return (
    <>
      <JsonLd id="schema-category-breadcrumb" data={breadcrumbSchema(crumbs)} />
      <div className="mx-auto max-w-[1120px] px-4 py-8 md:px-6 md:py-12 lg:px-8">
        <Breadcrumbs items={crumbs} className="mb-6" />
        <header className="mb-10 max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#888888]">
            Category
          </p>
          <h1 className="mt-2 font-[family-name:var(--font-instrument)] text-4xl text-[#1A1A1A] md:text-5xl">
            {category.title}
          </h1>
          {category.description ? (
            <p className="mt-4 text-base leading-relaxed text-[#555555]">
              {category.description}
            </p>
          ) : null}
        </header>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {category.posts.map((post) => (
            <ArticleCard key={post._id} post={post} />
          ))}
        </div>
      </div>
    </>
  );
}
