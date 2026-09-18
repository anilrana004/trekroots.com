import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ArticleCard } from "./ArticleCard";
import { SanityImage } from "./SanityImage";
import type { BlogIndexData } from "@/lib/sanity/types";

function formatDate(iso?: string | null) {
  if (!iso) return null;
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function BlogIndex({ data }: { data: BlogIndexData }) {
  const { featured, latest, categories } = data;
  const rest = featured
    ? latest.filter((p) => p._id !== featured._id)
    : latest;
  const lead = featured || rest[0] || null;
  const grid = lead && !featured ? rest.slice(1) : rest;
  const secondary = grid.slice(0, 4);
  const more = grid.slice(4);

  return (
    <div className="bg-white pb-16 md:pb-24">
      {categories.length > 0 ? (
        <div
          className="border-y border-[#E8D48A]"
          style={{ backgroundColor: "#FFC107" }}
        >
          <div className="mx-auto flex max-w-[1200px] gap-1 overflow-x-auto px-4 py-2.5 md:px-6 lg:px-8">
            <Link
              href="/blog"
              className="no-retro shrink-0 px-3 py-1.5 font-body text-[11px] font-bold uppercase tracking-[0.12em] text-[#1A1A1A]"
            >
              All stories
            </Link>
            {categories.map((cat) =>
              cat.slug ? (
                <Link
                  key={cat._id}
                  href={`/blog/category/${cat.slug}`}
                  className="no-retro shrink-0 px-3 py-1.5 font-body text-[11px] font-bold uppercase tracking-[0.12em] text-[#1A1A1A]/80 hover:text-[#1A1A1A]"
                >
                  {cat.title}
                </Link>
              ) : null,
            )}
          </div>
        </div>
      ) : null}

      <div className="mx-auto max-w-[1200px] px-4 pt-6 md:px-6 md:pt-10 lg:px-8">
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
          ]}
          className="mb-6 md:mb-8"
        />

        <header className="mb-8 max-w-3xl md:mb-12">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#888888]">
            TrekRoots Journal
          </p>
          <h1 className="mt-3 font-[family-name:var(--font-instrument)] text-4xl leading-tight tracking-tight text-[#1A1A1A] md:text-5xl lg:text-[3.25rem]">
            Himalayan guides &amp; field notes
          </h1>
          <p className="mt-4 max-w-[52ch] text-base leading-relaxed text-[#555555] md:text-lg">
            Practical trekking guides, seasonal advice, and stories from the trails — written for travellers who want clarity before they climb.
          </p>
        </header>

        {lead ? (
          <section aria-labelledby="featured-heading" className="mb-12 md:mb-16">
            <h2 id="featured-heading" className="sr-only">
              Featured story
            </h2>
            <article className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-10 lg:items-center">
              <Link
                href={`/blog/${lead.slug}`}
                className="group relative block overflow-hidden bg-[#F5F5F5]"
              >
                <SanityImage
                  image={lead.heroImage}
                  alt={lead.heroImage?.alt || lead.title}
                  width={1400}
                  height={875}
                  priority
                  sizes="(max-width: 1023px) 100vw, 60vw"
                  className="aspect-[16/10] transition duration-500 group-hover:scale-[1.02] motion-reduce:group-hover:scale-100"
                />
              </Link>
              <div>
                {lead.category?.title ? (
                  <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#666666]">
                    {lead.category.title}
                  </p>
                ) : null}
                <h2 className="font-[family-name:var(--font-instrument)] text-3xl leading-tight text-[#1A1A1A] md:text-4xl">
                  <Link href={`/blog/${lead.slug}`} className="hover:underline">
                    {lead.title}
                  </Link>
                </h2>
                {lead.excerpt ? (
                  <p className="mt-4 text-base leading-relaxed text-[#555555] md:text-lg">
                    {lead.excerpt}
                  </p>
                ) : null}
                <p className="mt-4 text-sm text-[#666666]">
                  {[
                    lead.author?.name,
                    formatDate(lead.publishedAt),
                    lead.readingTime ? `${lead.readingTime} min read` : null,
                  ]
                    .filter(Boolean)
                    .join(" · ")}
                </p>
                <Link
                  href={`/blog/${lead.slug}`}
                  className="mt-6 inline-flex px-5 py-2.5 text-xs font-bold uppercase tracking-wide text-[#1A1A1A]"
                  style={{ backgroundColor: "#FFC107" }}
                >
                  Read the story
                </Link>
              </div>
            </article>
          </section>
        ) : (
          <section className="mb-16 border border-[#E8E8E8] bg-[#FAFAFA] px-6 py-14 text-center">
            <h2 className="font-[family-name:var(--font-instrument)] text-3xl text-[#1A1A1A]">
              Stories are on the way
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-[#666666]">
              Publish your first article in Sanity Studio and it will appear here automatically.
            </p>
          </section>
        )}

        {secondary.length > 0 ? (
          <section aria-labelledby="latest-heading" className="mb-14">
            <h2
              id="latest-heading"
              className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#888888]"
            >
              Latest stories
            </h2>
            <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {secondary.map((post) => (
                <ArticleCard key={post._id} post={post} variant="compact" />
              ))}
            </div>
          </section>
        ) : null}

        {more.length > 0 ? (
          <section aria-labelledby="more-heading">
            <h2
              id="more-heading"
              className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#888888]"
            >
              More from the journal
            </h2>
            <div className="mt-6 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {more.map((post) => (
                <ArticleCard key={post._id} post={post} variant="standard" />
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </div>
  );
}
