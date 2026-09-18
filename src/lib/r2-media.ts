/**
 * Cloudflare R2 media (media.trekroots.com) — video only.
 * Images stay on Cloudinary; do not route stills through this host.
 */

const R2_MEDIA_HOST = "https://media.trekroots.com";

/** Hero / cinematic clips keyed by trek or yatra slug. */
export const R2_VIDEOS = {
  intro: `${R2_MEDIA_HOST}/intro/still%20on%20my%20mind_2160p.mp4`,
  "valley-of-flowers":
    `${R2_MEDIA_HOST}/uttarakhand/valley%20of%20flower/vidssave.com%20Into%20The%20%27Valley%20Of%20Flowers%27%20-%20Cinematic%20Travel%20Film%20720P.mp4`,
} as const;

export type R2VideoSlug = keyof typeof R2_VIDEOS;

export function r2VideoUrl(slug: R2VideoSlug): string {
  return R2_VIDEOS[slug];
}
