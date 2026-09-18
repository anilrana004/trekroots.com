export * from './types'
export { treks } from './treks'
export { yatras } from './yatras'
export { packages } from './packages'
export { stays } from './stays'
export { blogPosts } from './blog'
export {
  getTrekHeroImages,
  getTrekCoverImage,
  getYatraHeroImages,
  getYatraCoverImage,
  hasTrekGallery,
  trekSlugFromPath,
  TREK_HERO_GALLERIES,
  YATRA_HERO_GALLERIES,
} from './media'
export {
  DURATION_BUCKETS,
  matchesDuration,
  matchesSeason,
  popularTreks,
  SEASON_BUCKETS,
  trekFacetGroups,
  treksForMonth,
} from './trek-facets'
export type { FacetGroup, FacetItem } from './trek-facets'
export {
  packageFacetGroups,
  packageMegaMenu,
  popularPackages,
  popularStays,
  popularYatras,
  stayFacetGroups,
  stayMegaMenu,
  yatraFacetGroups,
  yatraMegaMenu,
} from './nav-menus'
export type { MegaMenuConfig, MegaPopularItem } from './nav-menus'
export { getTrekFacts } from './trek-facts'
export type { TrekFact } from './trek-facts'
export { getYatraFacts } from './yatra-facts'
export {
  CONTACT_EMAIL,
  CONTACT_EMAIL_HREF,
  PHONE_DISPLAY,
  PHONE_HREF,
  PHONE_NUMBER,
  SOCIAL_FACEBOOK,
  SOCIAL_INSTAGRAM,
  SOCIAL_SAME_AS,
  SOCIAL_YOUTUBE,
  WHATSAPP_DISPLAY,
  WHATSAPP_NUMBER,
  whatsappLink,
} from './contact'
export { SITE_SITELINKS } from './sitelinks'
export type { SiteSitelink } from './sitelinks'

import type { SearchResults, Trek, Yatra } from './types'
import { treks } from './treks'
import { yatras } from './yatras'
import { packages } from './packages'
import { stays } from './stays'
import { blogPosts } from './blog'
import { getTrekHeroImages, getYatraHeroImages } from './media'

function withTrekMedia(trek: Trek): Trek {
  const heroes = getTrekHeroImages(trek.slug, trek.imageUrl)
  if (!heroes.length) return trek
  return {
    ...trek,
    imageUrl: heroes[0],
  }
}

function withYatraMedia(yatra: Yatra): Yatra {
  const heroes = getYatraHeroImages(yatra.slug, yatra.imageUrl)
  if (!heroes.length) return yatra
  return {
    ...yatra,
    imageUrl: heroes[0],
  }
}

export function getAllTreks() {
  return treks.map(withTrekMedia)
}
export function getTrekBySlug(slug: string) {
  const trek = treks.find((t) => t.slug === slug) ?? null
  return trek ? withTrekMedia(trek) : null
}
export function getTreksByState(state: string) {
  return treks.filter((t) => t.state === state).map(withTrekMedia)
}

export function getAllYatras() {
  return yatras.map(withYatraMedia)
}
export function getYatraBySlug(slug: string) {
  const yatra = yatras.find((y) => y.slug === slug) ?? null
  return yatra ? withYatraMedia(yatra) : null
}

export function getAllPackages() {
  return packages
}
export function getPackageBySlug(slug: string) {
  return packages.find((p) => p.slug === slug) ?? null
}

export function getAllStays() {
  return stays
}
export function getStayBySlug(slug: string) {
  return stays.find((s) => s.slug === slug) ?? null
}

export function getAllBlogPosts() {
  return blogPosts
}
export function getBlogPostBySlug(slug: string) {
  return blogPosts.find((b) => b.slug === slug) ?? null
}

export function searchAll(term: string): SearchResults {
  const q = term.toLowerCase()
  const match = (s: string) => s.toLowerCase().includes(q)
  return {
    treks: treks
      .filter(
        (t) => match(t.name) || match(t.region) || match(t.description),
      )
      .map(withTrekMedia),
    yatras: yatras
      .filter((y) => match(y.name) || match(y.description))
      .map(withYatraMedia),
    packages: packages.filter((p) => match(p.name) || match(p.description)),
    stays: stays.filter(
      (s) => match(s.name) || match(s.location) || match(s.description),
    ),
    blogPosts: blogPosts.filter(
      (b) => match(b.title) || match(b.excerpt) || match(b.content),
    ),
  }
}
