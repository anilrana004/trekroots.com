import type { ReactNode } from "react";
import Link from "next/link";
import { PortableText, type PortableTextComponents } from "next-sanity";
import { SanityImage } from "./SanityImage";
import { ArticleCard } from "./ArticleCard";
import { resolveTrekHref, slugify } from "@/lib/sanity/fetch";
import type { SanityPostCard, SanityTrek } from "@/lib/sanity/types";
import { cn } from "@/lib/utils";

const CALLOUT_LABELS: Record<string, string> = {
  tip: "Travel tip",
  important: "Important",
  safety: "Safety note",
  weather: "Weather",
  permits: "Permits",
  gear: "Gear",
  pro: "Pro tip",
  packing: "Packing",
  route: "Route",
};

function headingId(children: ReactNode): string {
  const text = flattenText(children);
  return slugify(text || "section");
}

function flattenText(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(flattenText).join("");
  if (typeof node === "object" && node !== null && "props" in node) {
    return flattenText(
      (node as { props?: { children?: ReactNode } }).props?.children,
    );
  }
  return "";
}

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => {
      const id = headingId(children);
      return (
        <h2
          id={id}
          className="mt-12 scroll-mt-28 text-2xl font-semibold tracking-tight text-[#1A1A1A] md:mt-14 md:text-[1.75rem]"
        >
          {children}
        </h2>
      );
    },
    h3: ({ children }) => {
      const id = headingId(children);
      return (
        <h3
          id={id}
          className="mt-9 scroll-mt-28 text-xl font-semibold text-[#1A1A1A] md:text-[1.35rem]"
        >
          {children}
        </h3>
      );
    },
    h4: ({ children }) => (
      <h4 className="mt-7 text-lg font-semibold text-[#1A1A1A]">{children}</h4>
    ),
    normal: ({ children }) => (
      <p className="mt-5 text-[1.0625rem] leading-[1.75] text-[#333333] md:text-[1.125rem] md:leading-[1.8]">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="mt-8 border-l-[3px] border-rootsYellow pl-5 text-[1.05rem] italic leading-relaxed text-[#444444] md:pl-6 md:text-lg">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mt-5 list-disc space-y-2 pl-5 text-[1.0625rem] leading-relaxed text-[#333333] md:text-[1.125rem]">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mt-5 list-decimal space-y-2 pl-5 text-[1.0625rem] leading-relaxed text-[#333333] md:text-[1.125rem]">
        {children}
      </ol>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-[#1A1A1A]">{children}</strong>
    ),
    em: ({ children }) => <em>{children}</em>,
    link: ({ children, value }) => {
      const href = value?.href || "#";
      const external = href.startsWith("http");
      return (
        <a
          href={href}
          className="underline decoration-[#CCCCCC] underline-offset-4 transition hover:decoration-rootsYellow"
          {...(external || value?.openInNewTab
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          {children}
        </a>
      );
    },
    internalLink: ({ children, value }) => {
      const slug = value?.slug as string | undefined;
      const docType = value?.docType as string | undefined;
      let href = "#";
      if (slug) {
        if (docType === "blogPost") href = `/blog/${slug}`;
        else if (docType === "trek") href = `/treks/${slug}`;
        else if (docType === "category") href = `/blog/category/${slug}`;
        else if (docType === "tag") href = `/blog/tag/${slug}`;
      }
      return (
        <Link
          href={href}
          className="underline decoration-[#CCCCCC] underline-offset-4 transition hover:decoration-rootsYellow"
        >
          {children}
        </Link>
      );
    },
  },
  types: {
    articleImage: ({ value }) => {
      if (!value?.asset) return null;
      const layout = value.layout || "standard";
      return (
        <figure
          className={cn(
            "my-10",
            layout === "wide" && "md:-mx-8 lg:-mx-16",
            layout === "fullBleed" && "relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen",
          )}
        >
          <SanityImage
            image={value}
            alt={value.alt || ""}
            width={layout === "fullBleed" ? 1800 : 1200}
            height={layout === "fullBleed" ? 1100 : 800}
            sizes={
              layout === "fullBleed"
                ? "100vw"
                : "(max-width: 768px) 100vw, 800px"
            }
            className={cn(
              "bg-[#F5F5F5]",
              layout === "fullBleed" ? "aspect-[16/10]" : "aspect-[3/2]",
            )}
          />
          {(value.caption || value.credit) && (
            <figcaption className="mt-3 px-4 text-center text-xs leading-relaxed text-[#777777] md:px-0">
              {value.caption}
              {value.caption && value.credit ? " · " : null}
              {value.credit ? <span className="italic">{value.credit}</span> : null}
            </figcaption>
          )}
        </figure>
      );
    },
    callout: ({ value }) => {
      if (!value?.body) return null;
      const label = value.title || CALLOUT_LABELS[value.tone] || "Note";
      return (
        <aside className="my-8 border border-[#E8E8E8] border-l-[3px] border-l-rootsYellow bg-[#FAFAFA] px-5 py-4 md:px-6 md:py-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#666666]">
            {label}
          </p>
          <p className="mt-2 text-[0.975rem] leading-relaxed text-[#333333] md:text-base">
            {value.body}
          </p>
        </aside>
      );
    },
    imageGallery: ({ value }) => {
      const images = value?.images || [];
      if (!images.length) return null;
      return (
        <div className="my-10 grid gap-3 sm:grid-cols-2">
          {images.map((img: { _key?: string; alt?: string }, i: number) => (
            <SanityImage
              key={img._key || i}
              image={img}
              alt={img.alt || ""}
              width={800}
              height={600}
              sizes="(max-width: 640px) 100vw, 50vw"
              className="aspect-[4/3] bg-[#F5F5F5]"
            />
          ))}
        </div>
      );
    },
    trekEmbed: ({ value }) => {
      const trek = value?.trek as SanityTrek | undefined;
      if (!trek?.name) return null;
      const href = resolveTrekHref(trek);
      return (
        <aside className="my-8 flex flex-col gap-4 border border-[#E8E8E8] bg-white p-4 sm:flex-row sm:items-center sm:gap-6 sm:p-5">
          {trek.heroImage ? (
            <div className="w-full shrink-0 overflow-hidden bg-[#F5F5F5] sm:w-40">
              <SanityImage
                image={trek.heroImage}
                alt={trek.heroImage.alt || trek.name}
                width={320}
                height={240}
                sizes="160px"
                className="aspect-[4/3]"
              />
            </div>
          ) : null}
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#888888]">
              Trek
            </p>
            <p className="mt-1 text-lg font-semibold text-[#1A1A1A]">{trek.name}</p>
            {trek.excerpt ? (
              <p className="mt-1 line-clamp-2 text-sm text-[#666666]">{trek.excerpt}</p>
            ) : null}
            {href ? (
              <Link
                href={href}
                className="mt-3 inline-flex text-sm font-semibold text-[#1A1A1A] underline decoration-rootsYellow underline-offset-4"
              >
                Explore trek
              </Link>
            ) : null}
          </div>
        </aside>
      );
    },
    relatedArticleEmbed: ({ value }) => {
      const article = value?.article as SanityPostCard | undefined;
      if (!article?.slug) return null;
      return (
        <div className="my-8 border border-[#E8E8E8] p-4 md:p-5">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#888888]">
            Related reading
          </p>
          <ArticleCard post={article} variant="horizontal" />
        </div>
      );
    },
  },
};

export function ArticleBody({ value }: { value: unknown[] | null | undefined }) {
  if (!Array.isArray(value) || !value.length) return null;
  return (
    <div className="article-body">
      <PortableText value={value} components={components} />
    </div>
  );
}
