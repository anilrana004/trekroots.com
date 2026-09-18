import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SanityImage } from "./SanityImage";
import type { SanityBlogPost } from "@/lib/sanity/types";
import type { Crumb } from "@/lib/schema";

function formatDate(iso?: string | null) {
  if (!iso) return null;
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

type Props = {
  post: SanityBlogPost;
  crumbs: Crumb[];
};

export function ArticleHero({ post, crumbs }: Props) {
  const published = formatDate(post.publishedAt);
  const updated = formatDate(post.updatedAt);
  const showUpdated =
    post.updatedAt &&
    post.publishedAt &&
    new Date(post.updatedAt).getTime() - new Date(post.publishedAt).getTime() >
      24 * 60 * 60 * 1000;

  return (
    <header className="border-b border-[#E8E8E8] bg-white">
      <div className="mx-auto max-w-[1120px] px-4 pt-6 md:px-6 md:pt-10 lg:px-8">
        <Breadcrumbs items={crumbs} className="mb-6 md:mb-8" />

        {post.category?.title ? (
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#666666] md:mb-4">
            {post.category.slug ? (
              <a
                href={`/blog/category/${post.category.slug}`}
                className="hover:text-[#1A1A1A] focus-visible:underline"
              >
                {post.category.title}
              </a>
            ) : (
              post.category.title
            )}
          </p>
        ) : null}

        <h1 className="max-w-[22ch] font-[family-name:var(--font-instrument)] text-[2.15rem] leading-[1.12] tracking-tight text-[#1A1A1A] sm:text-[2.6rem] md:text-5xl lg:text-[3.4rem]">
          {post.title}
        </h1>

        {post.excerpt ? (
          <p className="mt-4 max-w-[62ch] text-[1.05rem] leading-relaxed text-[#555555] md:mt-5 md:text-xl md:leading-relaxed">
            {post.excerpt}
          </p>
        ) : null}

        <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-[#E8E8E8] py-4 text-sm text-[#666666] md:mt-8 md:py-5">
          {post.author?.name ? (
            <span className="font-medium text-[#1A1A1A]">{post.author.name}</span>
          ) : null}
          {published ? (
            <>
              <span aria-hidden className="text-[#CCCCCC]">
                ·
              </span>
              <time dateTime={post.publishedAt || undefined}>{published}</time>
            </>
          ) : null}
          {showUpdated && updated ? (
            <>
              <span aria-hidden className="text-[#CCCCCC]">
                ·
              </span>
              <span>
                Updated <time dateTime={post.updatedAt || undefined}>{updated}</time>
              </span>
            </>
          ) : null}
          {post.readingTime ? (
            <>
              <span aria-hidden className="text-[#CCCCCC]">
                ·
              </span>
              <span>{post.readingTime} min read</span>
            </>
          ) : null}
        </div>
      </div>

      {post.heroImage ? (
        <figure className="mx-auto mt-2 max-w-[1400px] px-0 md:mt-4 md:px-6 lg:px-8">
          <div className="overflow-hidden bg-[#F5F5F5]">
            <SanityImage
              image={post.heroImage}
              alt={post.heroImage.alt || post.title}
              width={1600}
              height={1000}
              priority
              sizes="(max-width: 768px) 100vw, min(1400px, 100vw)"
              className="aspect-[4/3] max-h-[70vh] w-full object-cover md:aspect-[16/9] md:max-h-[min(72vh,820px)]"
            />
          </div>
          {(post.heroImage.caption || post.heroImage.credit) && (
            <figcaption className="mx-auto max-w-[1120px] px-4 py-3 text-xs leading-relaxed text-[#777777] md:px-0">
              {post.heroImage.caption}
              {post.heroImage.caption && post.heroImage.credit ? " · " : null}
              {post.heroImage.credit ? (
                <span className="italic">{post.heroImage.credit}</span>
              ) : null}
            </figcaption>
          )}
        </figure>
      ) : null}
    </header>
  );
}
