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
  "chopta-tungnath": [
    "https://res.cloudinary.com/cxqk8vbe/image/upload/v1789589092/prashant-bamnawat-BiXaZqqW53w-unsplash.jpg",
    "https://res.cloudinary.com/cxqk8vbe/image/upload/v1789589094/prashant-bamnawat-JW_Tbqa82CY-unsplash_1.jpg",
    "https://res.cloudinary.com/cxqk8vbe/image/upload/v1789589100/ashwini-chaudhary-monty-bsVt1_On_gk-unsplash.jpg",
    "https://res.cloudinary.com/cxqk8vbe/image/upload/v1789589100/mangesh-kosare-BXpHbpdXi94-unsplash.jpg",
    "https://res.cloudinary.com/cxqk8vbe/image/upload/v1789589101/anubhav-sonker-AAg3RbOfCPQ-unsplash.jpg",
    "https://res.cloudinary.com/cxqk8vbe/image/upload/v1789589105/devang-saklani-GOFSTSCF24E-unsplash.jpg",
    "https://res.cloudinary.com/cxqk8vbe/image/upload/v1789589105/ankit-mishra-c_gt-Iv9BpU-unsplash_2.jpg",
    "https://res.cloudinary.com/cxqk8vbe/image/upload/v1789589106/joshi-milestoner-L-5MISkafM4-unsplash_1.jpg",
  ],
  "har-ki-dun": [
    "https://res.cloudinary.com/cxqk8vbe/image/upload/v1789589369/pexels-amanjakhar-2314983.jpg",
    "https://res.cloudinary.com/cxqk8vbe/image/upload/v1789589370/pexels-ranjeet-kumar-singh-20197144-12532343.jpg",
    "https://res.cloudinary.com/cxqk8vbe/image/upload/v1789589376/pexels-tobiandchris-27114089.jpg",
    "https://res.cloudinary.com/cxqk8vbe/image/upload/v1789589376/pexels-shubhamdhage-31874584.jpg",
    "https://res.cloudinary.com/cxqk8vbe/image/upload/v1789589378/pexels-thenexcanpictures-12200385.jpg",
    "https://res.cloudinary.com/cxqk8vbe/image/upload/v1789589380/pexels-vijay-richhiya-2155208704-36781453.jpg",
  ],
  brahmatal: [
    "https://res.cloudinary.com/cxqk8vbe/image/upload/v1789589713/pexels-amanjot-singh-311045324-14825945.jpg",
    "https://res.cloudinary.com/cxqk8vbe/image/upload/v1789589712/pexels-ashok-sharma-78565317-10839894.jpg",
    "https://res.cloudinary.com/cxqk8vbe/image/upload/v1789589712/pexels-lakhi0709-35080071_1.jpg",
    "https://res.cloudinary.com/cxqk8vbe/image/upload/v1789589711/pexels-maksim-zaviktorin-907965128-32902572.jpg",
    "https://res.cloudinary.com/cxqk8vbe/image/upload/v1789589710/pexels-himanshu-badola-2159053419-37155314.jpg",
    "https://res.cloudinary.com/cxqk8vbe/image/upload/v1789589709/pexels-ikbalphoto-7421349.jpg",
  ],
  "valley-of-flowers": [
    "https://res.cloudinary.com/cxqk8vbe/image/upload/v1789590249/pexels-darina-belonogova-9159958.jpg",
    "https://res.cloudinary.com/cxqk8vbe/image/upload/v1789590272/pexels-imadclicks-27496409.jpg",
    "https://res.cloudinary.com/cxqk8vbe/image/upload/v1789590254/pexels-suju-38276373.jpg",
    "https://res.cloudinary.com/cxqk8vbe/image/upload/v1789590265/pexels-mario-vogt-2627668-13183163.jpg",
    "https://res.cloudinary.com/cxqk8vbe/image/upload/v1789590249/pexels-r-rajkumar-padmanabhan-1342414039-39441995.jpg",
    "https://res.cloudinary.com/cxqk8vbe/image/upload/v1789590260/pexels-dhiraj-singh-11435727-32126841.jpg",
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
