import Link from "next/link";
import { resolveTrekHref } from "@/lib/sanity/fetch";
import type { SanityTrek } from "@/lib/sanity/types";

export function ArticleCTA({ trek }: { trek?: SanityTrek | null }) {
  if (!trek?.name) return null;
  const href = resolveTrekHref(trek);
  if (!href) return null;

  return (
    <section className="mt-14 bg-[#1A1A1A] px-6 py-12 text-center text-white md:mt-16 md:px-10 md:py-16">
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-rootsYellow">
        Ready for the Himalayas?
      </p>
      <h2 className="mx-auto mt-4 max-w-[22ch] font-[family-name:var(--font-instrument)] text-3xl leading-tight md:text-4xl">
        Explore the {trek.name} with TrekRoots
      </h2>
      <p className="mx-auto mt-4 max-w-[42ch] text-sm leading-relaxed text-white/75 md:text-base">
        Guided departures, local expertise, and carefully planned itineraries from our Dehradun base.
      </p>
      <Link
        href={href}
        className="mt-8 inline-flex border-2 border-black bg-rootsYellow px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-black shadow-[4px_4px_0_#000] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#000] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rootsYellow"
      >
        Explore trek
      </Link>
    </section>
  );
}
