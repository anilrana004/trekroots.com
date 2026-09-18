import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { ArticlePage } from "@/components/blog/ArticlePage";
import {
  getBlogPostBySlug,
  getBlogSlugs,
  sanityImageUrl,
} from "@/lib/sanity";
import { buildPageMetadata, truncateMeta } from "@/lib/seo";
import {
  articleSchemaFromSanity,
  breadcrumbSchema,
  faqPageSchema,
} from "@/lib/schema";
import { absoluteUrl } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return { title: "Post not found" };

  const og =
    sanityImageUrl(post.seo?.ogImage || post.heroImage, 1200, 630) ||
    undefined;

  const meta = buildPageMetadata({
    title: post.seoTitle || post.title,
    description: truncateMeta(post.seoDescription || post.excerpt || post.title),
    path: `/blog/${slug}`,
    ogImage: og,
    noIndex: Boolean(post.seoNoIndex),
    absoluteTitle: Boolean(post.seo?.metaTitle),
  });

  if (post.seo?.canonicalUrl) {
    return {
      ...meta,
      alternates: { canonical: post.seo.canonicalUrl },
      openGraph: {
        ...meta.openGraph,
        type: "article",
        url: post.seo.canonicalUrl,
        publishedTime: post.publishedAt || undefined,
        modifiedTime: post.updatedAt || post.publishedAt || undefined,
        authors: post.author?.name ? [post.author.name] : undefined,
      },
    };
  }

  return {
    ...meta,
    openGraph: {
      ...meta.openGraph,
      type: "article",
      url: absoluteUrl(`/blog/${slug}`),
      publishedTime: post.publishedAt || undefined,
      modifiedTime: post.updatedAt || post.publishedAt || undefined,
      authors: post.author?.name ? [post.author.name] : undefined,
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    ...(post.category?.title && post.category.slug
      ? [
          {
            name: post.category.title,
            path: `/blog/category/${post.category.slug}`,
          },
        ]
      : []),
    { name: post.title, path: `/blog/${post.slug}` },
  ];

  const faqs =
    post.faqs
      ?.filter((f) => f.question && f.answer)
      .map((f) => ({ q: f.question, a: f.answer })) || [];

  return (
    <>
      <JsonLd id="schema-article" data={articleSchemaFromSanity(post)} />
      <JsonLd id="schema-article-breadcrumb" data={breadcrumbSchema(crumbs)} />
      {faqs.length ? (
        <JsonLd id="schema-article-faq" data={faqPageSchema(faqs)} />
      ) : null}
      <ArticlePage post={post} crumbs={crumbs} />
    </>
  );
}
