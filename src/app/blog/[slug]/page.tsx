import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPostPage from "@/views/BlogPostPage";
import { JsonLd } from "@/components/JsonLd";
import { getAllBlogPosts, getBlogPostBySlug } from "@/data";
import { buildPageMetadata, truncateMeta } from "@/lib/seo";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllBlogPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return { title: "Post not found" };

  return buildPageMetadata({
    title: post.title,
    description: truncateMeta(post.excerpt || post.title),
    path: `/blog/${slug}`,
    ogImage: post.imageUrl,
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: post.title, path: `/blog/${post.slug}` },
  ];

  return (
    <>
      <JsonLd id="schema-article" data={articleSchema(post)} />
      <JsonLd id="schema-article-breadcrumb" data={breadcrumbSchema(crumbs)} />
      <BlogPostPage />
    </>
  );
}
