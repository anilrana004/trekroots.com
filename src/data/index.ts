export * from './types'
export { treks } from './treks'
export { yatras } from './yatras'
export { packages } from './packages'
export { stays } from './stays'
export { blogPosts } from './blog'
export { getTrekHeroImages, getTrekCoverImage, trekSlugFromPath, TREK_HERO_GALLERIES } from './trek-media'
export { getTrekFacts } from './trek-facts'
export type { TrekFact } from './trek-facts'

import type { SearchResults, Trek } from './types'
import { treks } from './treks'
import { yatras } from './yatras'
import { packages } from './packages'
import { stays } from './stays'
import { blogPosts } from './blog'
import { getTrekHeroImages } from './trek-media'

function withTrekMedia(trek: Trek): Trek {
  const heroes = getTrekHeroImages(trek.slug, trek.imageUrl)
  if (!heroes.length) return trek
  return {
    ...trek,
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
  return yatras
}
export function getYatraBySlug(slug: string) {
  return yatras.find((y) => y.slug === slug) ?? null
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
    yatras: yatras.filter((y) => match(y.name) || match(y.description)),
    packages: packages.filter((p) => match(p.name) || match(p.description)),
    stays: stays.filter(
      (s) => match(s.name) || match(s.location) || match(s.description),
    ),
    blogPosts: blogPosts.filter(
      (b) => match(b.title) || match(b.excerpt) || match(b.content),
    ),
  }
}
