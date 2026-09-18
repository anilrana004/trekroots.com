import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Search",
  description: "Search TrekRoots treks, yatras, packages and stays.",
  path: "/search",
  noIndex: true,
});

export { default } from "@/views/SearchPage";
