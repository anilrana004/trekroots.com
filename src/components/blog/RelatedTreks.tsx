import Link from "next/link";
import { SanityImage } from "./SanityImage";
import { resolveTrekHref } from "@/lib/sanity/fetch";
import type { SanityTrek } from "@/lib/sanity/types";

export function RelatedTreks({ treks }: { treks: SanityTrek[] }) {
  const items = (treks || []).filter((t) => t?.name);
  if (!items.length) return null;

  return (
    <section
      aria-labelledby="related-treks-heading"
      className="mt-14 border-t border-[#E8E8E8] pt-12 md:mt-16 md:pt-14"
    >
      <h2
        id="related-treks-heading"
        className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#888888]"
      >
        More from the Himalayas
      </h2>
      <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((trek) => {
          const href = resolveTrekHref(trek);
          const inner = (
            <>
              <div className="overflow-hidden bg-[#F5F5F5]">
                <SanityImage
                  image={trek.heroImage}
                  alt={trek.heroImage?.alt || trek.name}
                  width={640}
                  height={480}
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="aspect-[4/3] transition duration-500 group-hover:scale-[1.03] motion-reduce:group-hover:scale-100"
                />
              </div>
              <p className="mt-3 text-lg font-semibold text-[#1A1A1A]">{trek.name}</p>
              {(() => {
                const meta = [trek.location, trek.duration, trek.difficulty]
                  .filter(Boolean)
                  .join(" · ");
                return meta ? (
                  <p className="mt-1 text-sm text-[#666666]">{meta}</p>
                ) : null;
              })()}
            </>
          );
          return (
            <li key={trek._id} className="group">
              {href ? <Link href={href}>{inner}</Link> : <div>{inner}</div>}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
