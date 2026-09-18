import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import { dataset, projectId } from "./env";

const builder = createImageUrlBuilder({ projectId, dataset });

export function urlForImage(source: SanityImageSource) {
  return builder.image(source);
}

export function sanityImageUrl(
  source: SanityImageSource | null | undefined,
  width: number,
  height?: number,
): string | null {
  if (!source) return null;
  try {
    let img = urlForImage(source).width(width).auto("format").quality(80);
    if (height) img = img.height(height).fit("crop");
    return img.url();
  } catch {
    return null;
  }
}
