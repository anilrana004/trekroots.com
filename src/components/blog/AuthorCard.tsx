import Link from "next/link";
import { SanityImage } from "./SanityImage";
import type { SanityAuthor } from "@/lib/sanity/types";

export function AuthorCard({ author }: { author?: SanityAuthor | null }) {
  if (!author?.name) return null;

  return (
    <section
      aria-labelledby="author-heading"
      className="mt-14 border-t border-[#E8E8E8] pt-12 md:mt-16 md:pt-14"
    >
      <h2
        id="author-heading"
        className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#888888]"
      >
        About the author
      </h2>
      <div className="mt-6 flex gap-5 md:gap-6">
        {author.photo ? (
          <div className="h-16 w-16 shrink-0 overflow-hidden bg-[#F5F5F5] md:h-20 md:w-20">
            <SanityImage
              image={author.photo}
              alt={author.photo.alt || author.name}
              width={160}
              height={160}
              sizes="80px"
              className="h-full w-full object-cover"
            />
          </div>
        ) : (
          <div
            className="flex h-16 w-16 shrink-0 items-center justify-center bg-[#1A1A1A] text-lg font-semibold text-rootsYellow md:h-20 md:w-20"
            aria-hidden
          >
            {author.name.charAt(0)}
          </div>
        )}
        <div className="min-w-0">
          <p className="text-lg font-semibold text-[#1A1A1A]">
            {author.slug ? (
              <Link href={`/blog?author=${author.slug}`} className="hover:underline">
                {author.name}
              </Link>
            ) : (
              author.name
            )}
          </p>
          {author.role ? (
            <p className="mt-0.5 text-sm text-[#666666]">{author.role}</p>
          ) : null}
          {author.bio ? (
            <p className="mt-3 max-w-[60ch] text-sm leading-relaxed text-[#444444] md:text-[0.975rem]">
              {author.bio}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
