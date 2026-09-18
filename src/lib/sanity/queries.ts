import { defineQuery } from "next-sanity";

const imageFields = /* groq */ `
  ...,
  asset->{
    _id,
    url,
    metadata { lqip, dimensions }
  }
`;

const trekCardFields = /* groq */ `
  _id,
  name,
  "slug": slug.current,
  location,
  duration,
  altitude,
  difficulty,
  season,
  startingPoint,
  distance,
  url,
  excerpt,
  heroImage { ${imageFields} }
`;

const authorFields = /* groq */ `
  _id,
  name,
  "slug": slug.current,
  role,
  bio,
  photo { ${imageFields} }
`;

const categoryFields = /* groq */ `
  _id,
  title,
  "slug": slug.current,
  description
`;

const postCardFields = /* groq */ `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  updatedAt,
  readingTime,
  featured,
  heroImage { ${imageFields} },
  category->{ ${categoryFields} },
  author->{ name, "slug": slug.current, photo { ${imageFields} } },
  "seoNoIndex": seo.noIndex == true
`;

/** Published, indexable posts only (drafts excluded by published perspective). */
const publishedFilter = /* groq */ `
  _type == "blogPost"
  && defined(slug.current)
  && defined(publishedAt)
  && publishedAt <= now()
  && seo.noIndex != true
`;

export const BLOG_INDEX_QUERY = defineQuery(`{
  "featured": *[${publishedFilter} && featured == true] | order(publishedAt desc)[0]{
    ${postCardFields}
  },
  "latest": *[${publishedFilter}] | order(publishedAt desc)[0...12]{
    ${postCardFields}
  },
  "categories": *[_type == "category" && count(*[${publishedFilter} && references(^._id)]) > 0] | order(title asc){
    ${categoryFields},
    "postCount": count(*[${publishedFilter} && references(^._id)])
  }
}`);

export const BLOG_SLUGS_QUERY = defineQuery(`
  *[${publishedFilter}]{ "slug": slug.current }
`);

export const BLOG_SITEMAP_QUERY = defineQuery(`
  *[${publishedFilter}]{
    "slug": slug.current,
    publishedAt,
    updatedAt
  }
`);

export const BLOG_POST_BY_SLUG_QUERY = defineQuery(`
  *[_type == "blogPost"
    && slug.current == $slug
    && defined(publishedAt)
    && publishedAt <= now()
  ][0]{
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    updatedAt,
    readingTime,
    featured,
    heroImage { ${imageFields} },
    category->{ ${categoryFields} },
    tags[]->{ _id, title, "slug": slug.current },
    author->{ ${authorFields} },
    content[]{
      ...,
      _type == "articleImage" => { ${imageFields} },
      _type == "imageGallery" => {
        images[]{ ${imageFields} }
      },
      _type == "trekEmbed" => {
        trek->{ ${trekCardFields} }
      },
      _type == "relatedArticleEmbed" => {
        article->{ ${postCardFields} }
      },
      markDefs[]{
        ...,
        _type == "internalLink" => {
          "slug": reference->slug.current,
          "docType": reference->_type,
          "title": coalesce(reference->title, reference->name)
        }
      }
    },
    trek->{ ${trekCardFields} },
    trekInfo,
    itinerary[]{
      _key,
      dayNumber,
      title,
      description,
      distance,
      duration,
      altitude,
      accommodation,
      meals,
      notes,
      image { ${imageFields} }
    },
    faqs[]{ _key, question, answer },
    relatedTreks[]->{ ${trekCardFields} },
    relatedArticles[]->{ ${postCardFields} },
    seo {
      metaTitle,
      metaDescription,
      canonicalUrl,
      noIndex,
      ogImage { ${imageFields} }
    },
    "seoTitle": coalesce(seo.metaTitle, title),
    "seoDescription": coalesce(seo.metaDescription, excerpt),
    "seoNoIndex": seo.noIndex == true
  }
`);

export const CATEGORY_BY_SLUG_QUERY = defineQuery(`
  *[_type == "category" && slug.current == $slug][0]{
    ${categoryFields},
    "posts": *[${publishedFilter} && references(^._id)] | order(publishedAt desc){
      ${postCardFields}
    }
  }
`);

export const TAG_BY_SLUG_QUERY = defineQuery(`
  *[_type == "tag" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    "posts": *[${publishedFilter} && references(^._id)] | order(publishedAt desc){
      ${postCardFields}
    }
  }
`);

/** Homepage / related guides: match by trek reference or name needle. */
export const RELATED_BLOGS_FOR_TRIP_QUERY = defineQuery(`
  *[${publishedFilter}
    && (
      trek->slug.current == $slug
      || title match $needle
      || excerpt match $needle
    )
  ] | order(publishedAt desc)[0...$limit]{
    ${postCardFields}
  }
`);

export const HOME_JOURNAL_QUERY = defineQuery(`{
  "featured": *[${publishedFilter} && featured == true] | order(publishedAt desc)[0]{
    ${postCardFields}
  },
  "latest": *[${publishedFilter}] | order(publishedAt desc)[0...5]{
    ${postCardFields}
  },
  "categories": *[_type == "category" && count(*[${publishedFilter} && references(^._id)]) > 0] | order(title asc)[0...8]{
    ${categoryFields}
  }
}`);
