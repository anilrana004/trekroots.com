/**
 * Cloudinary asset helpers for TrekRoots.
 *
 * Delivery URLs are safe for the client (cloud name only).
 * Signed uploads use the server SDK via `getCloudinary()`.
 */

export type CldTransform = {
  width?: number
  height?: number
  crop?: "fill" | "fit" | "limit" | "scale" | "thumb"
  quality?: "auto" | number
  format?: "auto" | "webp" | "jpg" | "png"
  gravity?: "auto" | "face" | "center"
  dpr?: "auto" | number
}

const DEFAULT_CLOUD =
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
  process.env.CLOUDINARY_CLOUD_NAME ||
  ""

function cloudName(): string {
  return DEFAULT_CLOUD.trim()
}

function isConfigured(): boolean {
  return cloudName().length > 0
}

function encodePath(value: string): string {
  return value
    .split("/")
    .map((part) => encodeURIComponent(part))
    .join("/")
}

function transformSegment(opts: CldTransform = {}): string {
  const parts: string[] = []
  if (opts.width) parts.push(`w_${opts.width}`)
  if (opts.height) parts.push(`h_${opts.height}`)
  if (opts.crop) parts.push(`c_${opts.crop}`)
  if (opts.gravity) parts.push(`g_${opts.gravity}`)
  if (opts.dpr) parts.push(`dpr_${opts.dpr}`)
  parts.push(`f_${opts.format ?? "auto"}`)
  parts.push(`q_${opts.quality ?? "auto"}`)
  return parts.join(",")
}

function hasMeaningfulTransform(opts: CldTransform = {}): boolean {
  return Boolean(
    opts.width ||
      opts.height ||
      opts.crop ||
      opts.gravity ||
      opts.dpr ||
      opts.quality ||
      opts.format,
  )
}

/** True when the URL is already a Cloudinary delivery URL. */
export function isCloudinaryUrl(url: string): boolean {
  return /res\.cloudinary\.com\//i.test(url)
}

/**
 * Inject (or replace) transformation segment on an existing Cloudinary delivery URL.
 * Without this, full-resolution originals are served and LCP tanks.
 */
export function applyCldTransform(
  url: string,
  opts: CldTransform = {},
): string {
  if (!isCloudinaryUrl(url) || !hasMeaningfulTransform(opts)) return url

  const match = url.match(
    /^(https:\/\/res\.cloudinary\.com\/[^/]+\/image\/(?:upload|fetch)\/)(.+)$/i,
  )
  if (!match) return url

  const [, prefix, path] = match
  const first = path.split("/")[0] ?? ""
  const looksLikeTransform =
    first.includes(",") ||
    /^(w_|h_|c_|g_|f_|q_|dpr_|e_|b_|a_|fl_)/i.test(first)

  const assetPath = looksLikeTransform
    ? path.slice(first.length + 1)
    : path

  if (!assetPath) return url
  return `${prefix}${transformSegment(opts)}/${assetPath}`
}

/**
 * Build a delivery URL for an uploaded Cloudinary public_id.
 * Example: cldUrl("trekroots/treks/kedarkantha", { width: 1200, crop: "fill" })
 */
export function cldUrl(publicId: string, opts: CldTransform = {}): string {
  const cloud = cloudName()
  if (!cloud || !publicId) return publicId
  const cleanId = publicId
    .replace(/^\/+/, "")
    .replace(/\.(jpg|jpeg|png|webp|gif|avif)$/i, "")
  const t = transformSegment(opts)
  return `https://res.cloudinary.com/${cloud}/image/upload/${t}/${encodePath(cleanId)}`
}

/**
 * Proxy + optimize any remote image through Cloudinary fetch.
 * Useful until assets are uploaded into the Cloudinary media library.
 */
export function cldFetch(remoteUrl: string, opts: CldTransform = {}): string {
  const cloud = cloudName()
  if (!cloud || !remoteUrl) return remoteUrl
  if (isCloudinaryUrl(remoteUrl)) return applyCldTransform(remoteUrl, opts)
  if (remoteUrl.startsWith("/")) return remoteUrl
  const t = transformSegment(opts)
  return `https://res.cloudinary.com/${cloud}/image/fetch/${t}/${encodeURIComponent(remoteUrl)}`
}

/**
 * Resolve any catalog / local / remote image to a Cloudinary-optimized URL when possible.
 */
export function resolveMediaUrl(
  src: string | null | undefined,
  opts: CldTransform = {},
): string {
  if (!src) return ""
  if (!isConfigured()) {
    return isCloudinaryUrl(src) ? applyCldTransform(src, opts) : src
  }

  if (isCloudinaryUrl(src)) return applyCldTransform(src, opts)

  // Already a Cloudinary public id style path used in our media map
  if (src.startsWith("trekroots/") || src.startsWith("cloudinary:")) {
    const id = src.replace(/^cloudinary:/, "")
    return cldUrl(id, opts)
  }

  if (/^https?:\/\//i.test(src)) {
    return cldFetch(src, opts)
  }

  // Local public/ assets stay local (or map via MEDIA_PUBLIC_IDS)
  return src
}

/** Responsive srcset widths for catalog imagery. */
export function buildCldSrcSet(
  src: string,
  base: CldTransform,
  widths: number[] = [640, 960, 1280, 1920],
): string {
  return widths
    .map((w) => {
      const url = resolveMediaUrl(src, {
        ...base,
        width: w,
        height: base.height
          ? Math.round((base.height / (base.width || w)) * w)
          : undefined,
      })
      return `${url} ${w}w`
    })
    .join(", ")
}

/** Named media registry — Cloudinary public IDs under this cloud. */
export const MEDIA = {
  logo: "ChatGPT_Image_Jul_14_2026_07_18_09_PM",
  placeholder: "trekroots/brand/placeholder",
  home: {
    carouselValleyOfFlowers: "trekroots/home/carousel-valley-of-flowers",
    carouselKedarkantha: "trekroots/home/carousel-kedarkantha",
    carouselBrahmatal: "trekroots/home/carousel-brahmatal",
    carouselCharDham: "trekroots/home/carousel-char-dham",
    carouselKedarnath: "trekroots/home/carousel-kedarnath",
    trekKedarkantha: "trekroots/home/trek-kedarkantha",
    trekValleyFlowers: "trekroots/home/trek-valley-flowers",
    trekChopta: "trekroots/home/trek-chopta-tungnath",
    trekHampta: "trekroots/home/trek-hampta-pass",
    yatraCharDham: "trekroots/home/yatra-chardham",
    yatraKedarnath: "trekroots/home/yatra-kedarnath",
    packageSpiti: "trekroots/home/package-spiti",
  },
} as const

/** Direct delivery URL for the brand logo (uploaded asset). */
export const LOGO_URL =
  "https://res.cloudinary.com/cxqk8vbe/image/upload/v1789461417/ChatGPT_Image_Jul_14_2026_07_18_09_PM.png"

/** Fallback remote images used until Cloudinary uploads exist. */
export const MEDIA_FALLBACKS: Record<string, string> = {
  [MEDIA.logo]: LOGO_URL,
  [MEDIA.placeholder]: "/assets/images/placeholder.svg",
  [MEDIA.home.carouselValleyOfFlowers]:
    "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=1920",
  [MEDIA.home.carouselKedarkantha]:
    "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=1920",
  [MEDIA.home.carouselBrahmatal]:
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920",
  [MEDIA.home.carouselCharDham]:
    "https://images.unsplash.com/photo-1629116596704-e3c2b10f5e2b?w=1920",
  [MEDIA.home.carouselKedarnath]:
    "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1920",
  [MEDIA.home.trekKedarkantha]:
    "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=800",
  [MEDIA.home.trekValleyFlowers]:
    "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800",
  [MEDIA.home.trekChopta]:
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
  [MEDIA.home.trekHampta]:
    "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800",
  [MEDIA.home.yatraCharDham]:
    "https://images.unsplash.com/photo-1629116596704-e3c2b10f5e2b?w=800",
  [MEDIA.home.yatraKedarnath]:
    "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800",
  [MEDIA.home.packageSpiti]:
    "https://images.unsplash.com/photo-1586794002204-8f3f3b0f1c1f?w=800",
}

/**
 * Prefer Cloudinary public_id when available; otherwise fall back + fetch via Cloudinary.
 */
export function mediaUrl(
  publicId: string,
  opts: CldTransform = {},
): string {
  // Brand logo: pin the exact uploaded version so CDN cache stays in sync
  if (publicId === MEDIA.logo) {
    if (!opts.width && !opts.height && !opts.crop) {
      return LOGO_URL
    }
    return cldUrl(MEDIA.logo, opts)
  }

  const fallback = MEDIA_FALLBACKS[publicId]
  // Use fetch fallback until the asset is uploaded under this public_id
  if (fallback) {
    if (fallback.startsWith("/")) return fallback
    return resolveMediaUrl(fallback, opts)
  }
  return cldUrl(publicId, opts)
}
