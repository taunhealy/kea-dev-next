import { groq } from "next-sanity";

export const homePageQuery = groq`{
  "hero": *[_type == "hero"][0],
  "workSection": *[_type == "page" && slug.current == "home"][0].sections[_type == "workSection"][0],
  "works": *[_type == "work"] | order(orderRank) {
    ...,
    categories[]->{ title, slug { current } }
  },
  "categories": *[_type == "workCategory"] | order(order asc) { 
    title, 
    slug { current } 
  }
}`;

export const pageQuery = `*[_type == "page" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  sections[]{
    _type,
    _key,
    heading,
    subheading,
    content,
    sectionType,
    sectionContent {
      ...,
      featuredWork[]->{
        _id,
        title,
        slug,
        description,
        coverImage,
        categories[]->{title}
      },
      testimonials[]->{
        _id,
        author,
        role,
        content
      }
    }
  }
}`;

export const blogPostsQuery = `*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  mainImage,
  publishedAt,
  description,
  categories[]->{title}
}`;

export const postQuery = `*[_type == "post" && slug.current == $slug][0]{
    _id,
    title,
    content,
    mainImage,
    publishedAt,
    updatedAt,
    "slug": slug.current,
    categories[]->{title}
  }`;

export const workSectionQuery = groq`{
  "works": *[_type == "work"] | order(orderRank) {
    ...,
    categories[]->{ title, slug { current } }
  },
  "categories": *[_type == "category"] | order(title asc) { title, slug { current } }
}`;
