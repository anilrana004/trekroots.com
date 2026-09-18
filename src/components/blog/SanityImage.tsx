import Image from "next/image";
import { cn } from "@/lib/utils";
import { sanityImageUrl } from "@/lib/sanity/image";
import type { SanityImage } from "@/lib/sanity/types";

type Props = {
  image?: SanityImage | null;
  alt?: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
};

export function SanityImage({
  image,
  alt,
  width,
  height,
  className,
  priority = false,
  sizes = "(max-width: 768px) 100vw, 80vw",
}: Props) {
  const src = sanityImageUrl(image, width, height);
  if (!src) return null;

  return (
    <Image
      src={src}
      alt={alt || image?.alt || ""}
      width={width}
      height={height}
      className={cn("h-auto w-full object-cover", className)}
      priority={priority}
      loading={priority ? "eager" : "lazy"}
      sizes={sizes}
      placeholder={image?.asset?.metadata?.lqip ? "blur" : "empty"}
      blurDataURL={image?.asset?.metadata?.lqip}
    />
  );
}
