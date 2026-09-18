import type { Metadata } from "next";
import BlogPage from "@/views/BlogPage";
import { JsonLd } from "@/components/JsonLd";
import { buildPageMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";

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

export default function Page() {
  return (
    <>
      <JsonLd id="schema-blog-breadcrumb" data={breadcrumbSchema(CRUMBS)} />
      <BlogPage />
    </>
  );
}
