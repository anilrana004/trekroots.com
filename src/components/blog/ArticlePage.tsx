import { ArticleHero } from "./ArticleHero";
import { ArticleTOC } from "./ArticleTOC";
import { TrekOverview } from "./TrekOverview";
import { ArticleBody } from "./ArticleBody";
import { Itinerary } from "./Itinerary";
import { FAQSection } from "./FAQSection";
import { RelatedTreks } from "./RelatedTreks";
import { RelatedArticles } from "./RelatedArticles";
import { AuthorCard } from "./AuthorCard";
import { ArticleCTA } from "./ArticleCTA";
import {
  extractToc,
  mergeTrekFacts,
} from "@/lib/sanity/fetch";
import type { SanityBlogPost } from "@/lib/sanity/types";
import type { Crumb } from "@/lib/schema";

export function ArticlePage({
  post,
  crumbs,
}: {
  post: SanityBlogPost;
  crumbs: Crumb[];
}) {
  const toc = extractToc(post.content);
  const facts = mergeTrekFacts(post.trek, post.trekInfo);
  const relatedTreks = [
    ...(post.trek ? [post.trek] : []),
    ...(post.relatedTreks || []),
  ].filter(
    (t, i, arr) => t && arr.findIndex((x) => x?._id === t._id) === i,
  );

  return (
    <article className="bg-white pb-16 md:pb-24">
      <ArticleHero post={post} crumbs={crumbs} />

      <div className="mx-auto max-w-[1120px] px-4 md:px-6 lg:px-8">
        {facts.length ? (
          <div className="mt-10 md:mt-12">
            <TrekOverview facts={facts} />
          </div>
        ) : null}

        <div className="mt-8 lg:mt-12 lg:grid lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-12 xl:grid-cols-[240px_minmax(0,1fr)] xl:gap-16">
          <aside className="mb-8 lg:mb-0">
            <ArticleTOC items={toc} />
          </aside>

          <div className="min-w-0 max-w-[42rem] xl:max-w-[46rem]">
            <ArticleBody value={post.content} />
            {post.itinerary?.length ? (
              <Itinerary days={post.itinerary} />
            ) : null}
            {post.faqs?.length ? <FAQSection faqs={post.faqs} /> : null}
            <AuthorCard author={post.author} />
          </div>
        </div>

        <RelatedTreks treks={relatedTreks.filter(Boolean)} />
        <RelatedArticles posts={post.relatedArticles || []} />
        <div className="mt-14 md:mt-16">
          <ArticleCTA trek={post.trek} />
        </div>
      </div>
    </article>
  );
}
