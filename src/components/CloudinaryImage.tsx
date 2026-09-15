"use client";

import {
  buildCldSrcSet,
  resolveMediaUrl,
  type CldTransform,
} from "@/lib/cloudinary";
import { useMemo, useState } from "react";

type CloudinaryImageProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  transform?: CldTransform;
  /** Use native lazy loading (default true). */
  lazy?: boolean;
  priority?: boolean;
  sizes?: string;
  onClick?: () => void;
};

/**
 * Renders catalog / remote images through Cloudinary (fetch or upload delivery).
 * Falls back to the original src if Cloudinary is not configured.
 */
export function CloudinaryImage({
  src,
  alt,
  width,
  height,
  className,
  transform,
  lazy = true,
  priority = false,
  sizes,
  onClick,
}: CloudinaryImageProps) {
  const [failed, setFailed] = useState(false);

  const opts: CldTransform = useMemo(
    () => ({
      width: transform?.width ?? width,
      height: transform?.height ?? height,
      crop: transform?.crop ?? (width && height ? "fill" : "limit"),
      quality: transform?.quality ?? "auto",
      format: transform?.format ?? "auto",
      gravity: transform?.gravity,
      dpr: transform?.dpr ?? "auto",
    }),
    [width, height, transform],
  );

  const resolved = useMemo(() => resolveMediaUrl(src, opts), [src, opts]);

  const srcSet = useMemo(() => {
    if (!opts.width || failed) return undefined;
    return buildCldSrcSet(src, opts);
  }, [src, opts, failed]);

  const finalSrc = failed ? src : resolved || src;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={finalSrc}
      srcSet={srcSet}
      sizes={
        sizes ??
        (priority
          ? "100vw"
          : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw")
      }
      alt={alt}
      width={width}
      height={height}
      className={className}
      loading={priority ? "eager" : lazy ? "lazy" : undefined}
      fetchPriority={priority ? "high" : "auto"}
      decoding={priority ? "sync" : "async"}
      onClick={onClick}
      onError={() => setFailed(true)}
    />
  );
}
