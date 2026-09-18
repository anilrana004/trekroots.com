import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHead } from "@/components/home/SectionHead";
import { SanityImage } from "@/components/blog/SanityImage";
import type { HomeJournalData } from "@/lib/sanity/fetch";
import type { SanityPostCard } from "@/lib/sanity/types";

function formatDate(iso?: string | null) {
  if (!iso) return null;
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function StoryMeta({ post }: { post: SanityPostCard }) {
  const parts = [
    post.category?.title,
    formatDate(post.publishedAt),
    post.readingTime ? `${post.readingTime} min` : null,
  ].filter(Boolean);
  if (!parts.length) return null;
  return <p className="font-body text-[11px] text-[#666666]">{parts.join(" · ")}</p>;
}

export function HomeJournal({ data }: { data: HomeJournalData }) {
  const { featured, latest, categories } = data;
  const lead = featured || latest[0] || null;
  const rest = (lead
    ? latest.filter((p) => p._id !== lead._id)
    : latest
  ).slice(0, 4);

  if (!lead && !rest.length) {
    return (
      <section data-ocid="journal.section" className="py-12 md:py-16 bg-white">
        <div className="lux-container">
          <SectionHead
            title="From the TrekRoots Journal"
            aside={
              <Link
                href="/blog"
                data-ocid="journal.all"
                className="no-retro inline-flex items-center gap-1.5 font-body text-xs font-semibold text-[#1A1A1A] hover:gap-2.5 transition-all"
              >
                Visit the journal <ArrowRight size={14} />
              </Link>
            }
            className="mb-6"
          />
          <div className="border border-[#E8E8E8] bg-[#FAFAFA] px-6 py-10 text-center md:py-12">
            <p className="font-display text-xl md:text-2xl text-[#1A1A1A]">
              Field notes are coming soon
            </p>
            <p className="mx-auto mt-3 max-w-md lux-body text-[13px] leading-relaxed">
              Trekking guides, seasonal advice, and Himalayan stories will appear here as we publish them in the journal.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section data-ocid="journal.section" className="py-12 md:py-16 bg-white">
      <div className="lux-container">
        <SectionHead
          title="From the TrekRoots Journal"
          aside={
            <Link
              href="/blog"
              data-ocid="journal.all"
              className="no-retro inline-flex items-center gap-1.5 font-body text-xs font-semibold text-[#1A1A1A] hover:gap-2.5 transition-all"
            >
              View all stories <ArrowRight size={14} />
            </Link>
          }
          className="mb-8 md:mb-10"
        />

        {categories.length > 0 ? (
          <div
            data-ocid="journal.categories"
            className="mb-8 flex flex-wrap gap-2 md:mb-10"
          >
            {categories.map((cat) =>
              cat.slug ? (
                <Link
                  key={cat._id}
                  href={`/blog/category/${cat.slug}`}
                  className="no-retro inline-flex px-3 py-1.5 font-body text-[11px] font-bold uppercase tracking-[0.12em] text-[#1A1A1A] transition hover:brightness-95"
                  style={{ backgroundColor: "#FFC107" }}
                >
                  {cat.title}
                </Link>
              ) : null,
            )}
          </div>
        ) : null}

        {lead ? (
          <article
            data-ocid="journal.featured"
            className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-10 lg:items-center"
          >
            <Link
              href={`/blog/${lead.slug}`}
              className="group relative block overflow-hidden bg-[#F5F5F5]"
            >
              <SanityImage
                image={lead.heroImage}
                alt={lead.heroImage?.alt || lead.title}
                width={1200}
                height={750}
                sizes="(max-width: 1023px) 100vw, 55vw"
                className="aspect-[16/10] transition duration-500 group-hover:scale-[1.02] motion-reduce:group-hover:scale-100"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent lg:hidden" />
            </Link>

            <div className="flex flex-col justify-center">
              {lead.category?.title ? (
                <p className="mb-2 font-body text-[10px] font-bold uppercase tracking-[0.2em] text-[#666666]">
                  {lead.category.title}
                </p>
              ) : null}
              <h3 className="font-display text-2xl leading-tight text-[#1A1A1A] md:text-[28px] lg:text-[32px]">
                <Link
                  href={`/blog/${lead.slug}`}
                  className="no-retro hover:underline focus-visible:underline"
                >
                  {lead.title}
                </Link>
              </h3>
              {lead.excerpt ? (
                <p className="mt-3 lux-body text-[14px] leading-relaxed md:text-[15px]">
                  {lead.excerpt}
                </p>
              ) : null}
              <div className="mt-4">
                <StoryMeta post={lead} />
              </div>
              <div className="mt-6">
                <Link
                  href={`/blog/${lead.slug}`}
                  data-ocid="journal.featured.cta"
                  className="no-retro inline-flex items-center px-5 py-2.5 font-body text-xs font-bold uppercase tracking-wide text-[#1A1A1A]"
                  style={{ backgroundColor: "#FFC107" }}
                >
                  Read the story
                </Link>
              </div>
            </div>
          </article>
        ) : null}

        {rest.length > 0 ? (
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6 md:mt-12">
            {rest.map((post, i) => (
              <article key={post._id} data-ocid={`journal.card.${i + 1}`}>
                <Link href={`/blog/${post.slug}`} className="group block">
                  <div className="overflow-hidden bg-[#F5F5F5]">
                    <SanityImage
                      image={post.heroImage}
                      alt={post.heroImage?.alt || post.title}
                      width={640}
                      height={480}
                      sizes="(max-width: 640px) 100vw, 25vw"
                      className="aspect-[4/3] transition duration-500 group-hover:scale-[1.03] motion-reduce:group-hover:scale-100"
                    />
                  </div>
                  {post.category?.title ? (
                    <p className="mt-3 font-body text-[10px] font-bold uppercase tracking-[0.14em] text-[#666666]">
                      {post.category.title}
                    </p>
                  ) : null}
                  <h4 className="mt-1.5 font-body text-sm font-bold leading-snug text-[#1A1A1A] md:text-[15px]">
                    {post.title}
                  </h4>
                  {post.excerpt ? (
                    <p className="mt-2 line-clamp-2 lux-body text-[12.5px] leading-relaxed">
                      {post.excerpt}
                    </p>
                  ) : null}
                  <p className="mt-2 font-body text-[11px] font-semibold text-[#1A1A1A] underline underline-offset-2">
                    Read more
                  </p>
                </Link>
              </article>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
