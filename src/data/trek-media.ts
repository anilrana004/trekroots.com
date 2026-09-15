/** Per-trek Cloudinary hero / gallery assets */

export const TREK_HERO_GALLERIES: Record<string, string[]> = {
  kedarkantha: [
    "https://res.cloudinary.com/cxqk8vbe/image/upload/v1789461002/shubham-dhage-SavVAs7k41w-unsplash.jpg",
    "https://res.cloudinary.com/cxqk8vbe/image/upload/v1789460994/shubham-dhage-eRGjr4bPuQ4-unsplash.jpg",
    "https://res.cloudinary.com/cxqk8vbe/image/upload/v1789460989/shubham-dhage-yYIv8LrjzGc-unsplash.jpg",
    "https://res.cloudinary.com/cxqk8vbe/image/upload/v1789460989/palak-pitroda-JWyfa7H24X0-unsplash.jpg",
    "https://res.cloudinary.com/cxqk8vbe/image/upload/v1789460875/shubham-dhage-i0BF7G6HDG8-unsplash.jpg",
    "https://res.cloudinary.com/cxqk8vbe/image/upload/v1789460871/shubham-dhage-0bIx160leQ8-unsplash.jpg",
  ],
  "kuari-pass": [
    "https://res.cloudinary.com/cxqk8vbe/image/upload/v1789464318/pexels-pranavsinh232-12764359.jpg",
    "https://res.cloudinary.com/cxqk8vbe/image/upload/v1789464316/pexels-reeshav-das-2153705165-33345174.jpg",
    "https://res.cloudinary.com/cxqk8vbe/image/upload/v1789464315/pexels-shovan-datta-3275479-6149893.jpg",
    "https://res.cloudinary.com/cxqk8vbe/image/upload/v1789464452/kuari-pass-trek-on-the-way.jpg",
    "https://res.cloudinary.com/cxqk8vbe/image/upload/v1789464455/view-of-mountain.jpg",
    "https://res.cloudinary.com/cxqk8vbe/image/upload/v1789464458/beautiful-mountains-3.jpg",
  ],
}

export function getTrekHeroImages(
  slug: string,
  fallback?: string | null,
): string[] {
  const gallery = TREK_HERO_GALLERIES[slug]
  if (gallery?.length) return gallery
  return fallback ? [fallback] : []
}

/** Primary card / listing cover (first hero frame). */
export function getTrekCoverImage(
  slug: string,
  fallback?: string | null,
): string {
  return getTrekHeroImages(slug, fallback)[0] ?? fallback ?? ""
}

/** Strip leading /treks/ from homepage paths when looking up media. */
export function trekSlugFromPath(pathOrSlug: string): string {
  return pathOrSlug.replace(/^\/treks\//, "").replace(/^\//, "")
}
