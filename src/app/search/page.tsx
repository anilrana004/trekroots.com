import type { Metadata } from "next";
import { Suspense } from "react";
import SearchPage from "@/views/SearchPage";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Search",
  description: "Search TrekRoots treks, yatras, packages and stays.",
  path: "/search",
  noIndex: true,
});

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-[40vh] bg-white" />}>
      <SearchPage />
    </Suspense>
  );
}
