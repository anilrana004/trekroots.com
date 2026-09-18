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
  /** Layout hint for srcset selection. Pass "100vw" for full-bleed images. */
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
      quality: transform?.quality ?? "auto:good",
      format: transform?.format ?? "auto",
      gravity: transform?.gravity,
      dpr: transform?.dpr,
    }),
    [width, height, transform],
  );

  const srcSet = useMemo(
    () => (failed ? undefined : buildCldSrcSet(src, opts) || undefined),
    [src, opts, failed],
  );

  // Fall back to a 2× URL so non-srcset paths still render crisp on HiDPI.
  const resolved = useMemo(
    () => resolveMediaUrl(src, srcSet ? opts : { ...opts, dpr: "auto" }),
    [src, opts, srcSet],
  );

  const finalSrc = failed ? src : resolved || src;

  // An empty src makes the browser re-request the current page as an image, so
  // hold the box with a neutral block instead.
  if (!finalSrc) {
    return <div aria-hidden className={className} />;
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={finalSrc}
      srcSet={srcSet}
      sizes={
        sizes ??
        (opts.width ? `(max-width: ${opts.width}px) 100vw, ${opts.width}px` : undefined)
      }
      alt={alt}
      width={width}
      height={height}
      className={className}
      loading={priority ? "eager" : lazy ? "lazy" : undefined}
      fetchPriority={priority ? "high" : lazy ? "low" : "auto"}
      decoding={priority ? "async" : "async"}
      onClick={onClick}
      onError={() => setFailed(true)}
    />
  );
}
