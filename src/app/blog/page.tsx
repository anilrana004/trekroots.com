import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { BlogIndex } from "@/components/blog/BlogIndex";
import { getBlogIndex } from "@/lib/sanity";
import { buildPageMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";

export const revalidate = 60;

export const metadata: Metadata = buildPageMetadata({
  title: "Himalayan Trek Guides & Travel Blog",
  description:
    "TrekRoots guides to Kedarkantha, Char Dham, Valley of Flowers, winter treks and Himalayan travel planning.",
  path: "/blog",
});

const CRUMBS = [
  { name: "Home", path: "/" },
  { name: "Blog", path: "/blog" },
];

export default async function Page() {
  const data = await getBlogIndex();

  return (
    <>
      <JsonLd id="schema-blog-breadcrumb" data={breadcrumbSchema(CRUMBS)} />
      <BlogIndex data={data} />
    </>
  );
}
