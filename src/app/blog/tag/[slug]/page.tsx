import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { getTagBySlug } from "@/lib/sanity";
import { buildPageMetadata, truncateMeta } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 60;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tag = await getTagBySlug(slug);
  if (!tag || !tag.posts?.length) {
    return { title: "Tag not found", robots: { index: false, follow: false } };
  }
  return buildPageMetadata({
    title: `${tag.title} — TrekRoots Blog`,
    description: truncateMeta(`Articles tagged ${tag.title} from TrekRoots.`),
    path: `/blog/tag/${slug}`,
    absoluteTitle: true,
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const tag = await getTagBySlug(slug);
  if (!tag || !tag.posts?.length) notFound();

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: tag.title, path: `/blog/tag/${slug}` },
  ];

  return (
    <>
      <JsonLd id="schema-tag-breadcrumb" data={breadcrumbSchema(crumbs)} />
      <div className="mx-auto max-w-[1120px] px-4 py-8 md:px-6 md:py-12 lg:px-8">
        <Breadcrumbs items={crumbs} className="mb-6" />
        <header className="mb-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#888888]">
            Tag
          </p>
          <h1 className="mt-2 font-[family-name:var(--font-instrument)] text-4xl text-[#1A1A1A] md:text-5xl">
            {tag.title}
          </h1>
        </header>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {tag.posts.map((post) => (
            <ArticleCard key={post._id} post={post} />
          ))}
        </div>
      </div>
    </>
  );
}
