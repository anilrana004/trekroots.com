import Link from "next/link";
import { SanityImage } from "./SanityImage";
import type { SanityPostCard } from "@/lib/sanity/types";
import { cn } from "@/lib/utils";

function formatDate(iso?: string | null) {
  if (!iso) return null;
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

type Variant = "featured" | "standard" | "compact" | "horizontal";

type Props = {
  post: SanityPostCard;
  variant?: Variant;
  className?: string;
};

export function ArticleCard({ post, variant = "standard", className }: Props) {
  const href = `/blog/${post.slug}`;
  const date = formatDate(post.publishedAt);
  const meta = [
    post.category?.title,
    date,
    post.readingTime ? `${post.readingTime} min read` : null,
  ]
    .filter(Boolean)
    .join(" · ");

  if (variant === "featured") {
    return (
      <article className={cn("group relative", className)}>
        <Link href={href} className="block focus-visible:outline-none">
          <div className="relative aspect-[16/10] overflow-hidden bg-[#F5F5F5] md:aspect-[21/9]">
            <SanityImage
              image={post.heroImage}
              alt={post.heroImage?.alt || post.title}
              width={1600}
              height={900}
              priority
              sizes="100vw"
              className="h-full transition duration-500 group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5 md:p-10 lg:p-12">
              {post.category?.title ? (
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-rootsYellow">
                  {post.category.title}
                </p>
              ) : null}
              <h2 className="max-w-4xl font-[family-name:var(--font-instrument)] text-[1.75rem] leading-tight text-white md:text-4xl lg:text-5xl">
                {post.title}
              </h2>
              {post.excerpt ? (
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/85 md:text-base">
                  {post.excerpt}
                </p>
              ) : null}
              {meta ? (
                <p className="mt-4 text-xs text-white/70 md:text-sm">{meta}</p>
              ) : null}
            </div>
          </div>
        </Link>
      </article>
    );
  }

  if (variant === "horizontal") {
    return (
      <article className={cn("group grid gap-4 sm:grid-cols-[200px_1fr] sm:gap-6", className)}>
        <Link href={href} className="block overflow-hidden bg-[#F5F5F5]">
          <SanityImage
            image={post.heroImage}
            alt={post.heroImage?.alt || post.title}
            width={480}
            height={360}
            sizes="(max-width: 640px) 100vw, 200px"
            className="aspect-[4/3] h-full transition duration-500 group-hover:scale-[1.03] motion-reduce:group-hover:scale-100"
          />
        </Link>
        <div className="flex flex-col justify-center">
          {post.category?.title ? (
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#666666]">
              {post.category.title}
            </p>
          ) : null}
          <h3 className="text-lg font-semibold leading-snug text-[#1A1A1A] md:text-xl">
            <Link href={href} className="hover:underline focus-visible:underline">
              {post.title}
            </Link>
          </h3>
          {post.excerpt ? (
            <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[#666666]">
              {post.excerpt}
            </p>
          ) : null}
          {meta ? <p className="mt-3 text-xs text-[#888888]">{meta}</p> : null}
        </div>
      </article>
    );
  }

  if (variant === "compact") {
    return (
      <article className={cn("group", className)}>
        <Link href={href} className="block">
          <div className="overflow-hidden bg-[#F5F5F5]">
            <SanityImage
              image={post.heroImage}
              alt={post.heroImage?.alt || post.title}
              width={640}
              height={480}
              sizes="(max-width: 768px) 50vw, 280px"
              className="aspect-[4/3] transition duration-500 group-hover:scale-[1.03] motion-reduce:group-hover:scale-100"
            />
          </div>
          {post.category?.title ? (
            <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#666666]">
              {post.category.title}
            </p>
          ) : null}
          <h3 className="mt-1 text-base font-semibold leading-snug text-[#1A1A1A]">
            {post.title}
          </h3>
          {date ? <p className="mt-1 text-xs text-[#888888]">{date}</p> : null}
        </Link>
      </article>
    );
  }

  return (
    <article className={cn("group", className)}>
      <Link href={href} className="block">
        <div className="overflow-hidden bg-[#F5F5F5]">
          <SanityImage
            image={post.heroImage}
            alt={post.heroImage?.alt || post.title}
            width={900}
            height={600}
            sizes="(max-width: 768px) 100vw, 33vw"
            className="aspect-[3/2] transition duration-500 group-hover:scale-[1.03] motion-reduce:group-hover:scale-100"
          />
        </div>
        {post.category?.title ? (
          <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#666666]">
            {post.category.title}
          </p>
        ) : null}
        <h3 className="mt-2 text-xl font-semibold leading-snug text-[#1A1A1A] md:text-[1.35rem]">
          {post.title}
        </h3>
        {post.excerpt ? (
          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-[#666666]">
            {post.excerpt}
          </p>
        ) : null}
        {meta ? <p className="mt-3 text-xs text-[#888888]">{meta}</p> : null}
      </Link>
    </article>
  );
}
