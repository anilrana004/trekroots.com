import { ArticleCard } from "./ArticleCard";
import type { SanityPostCard } from "@/lib/sanity/types";

export function RelatedArticles({ posts }: { posts: SanityPostCard[] }) {
  const items = (posts || []).filter((p) => p?.slug);
  if (!items.length) return null;

  return (
    <section
      aria-labelledby="related-articles-heading"
      className="mt-14 border-t border-[#E8E8E8] pt-12 md:mt-16 md:pt-14"
    >
      <h2
        id="related-articles-heading"
        className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#888888]"
      >
        You may also like
      </h2>
      <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((post) => (
          <ArticleCard key={post._id} post={post} variant="standard" />
        ))}
      </div>
    </section>
  );
}
