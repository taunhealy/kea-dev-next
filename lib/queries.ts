import { groq } from "next-sanity";
import { client } from "./sanity";
import { defineQuery } from "groq";

export const homePageQuery = defineQuery(`{
  "hero": *[_type == "page" && slug.current == "home"][0].sections[_type == "heroSection"][0]{
    _type,
    _key,
    heroTitle,
    heroSubtitle,
    heroImage,
    heroLogos[] {
      _type,
      _key,
      asset
    }
  },
  "works": *[_type == "work"] | order(orderRank) {
    ...,
    categories[]->{ title, slug { current } },
    webDevelopment {
      features[] {
        _key,
        title,
        description,
        link,
        media {
          asset-> {
            _id,
            url,
            originalFilename,
            mimeType
          }
        }
      }
    }
  },
  "categories": *[_type == "workCategory"] | order(order asc) { 
    title, 
    slug { current } 
  },
  "blog": *[_type == "page" && slug.current == "blog"][0].sections[_type == "blogSection"][0],
  "posts": *[_type == "post"] | order(publishedAt desc)[0...3] {
    _id,
    title,
    "slug": slug.current,
    mainImage,
    publishedAt,
    description
  },
  "meta": {
    "dataset": *[_type == "systemSettings"][0]{
      "dataset": select(defined(^._dataset) => ^._dataset, "unknown")
    }
  }
}`);

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

export const workDetailQuery = groq`*[_type == "work" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  description,
  completionDate,
  technologies,
  coverImage {
    _type,
    asset-> {
      _id,
      url,
      metadata,
      originalFilename,
      mimeType
    }
  },
  orderRank,
  categories[]-> {
    _id,
    title,
    slug {
      current,
      _type
    }
  },
  client->,
  core {
    projectTitle,
    clientName,
    projectCategory,
    projectChallenge,
    producerName,
    projectTechStack
  },
  brandDevelopment {
    purpose {
      title,
      description
    },
    audience {
      title,
      description
    },
    archetypes[] {
      title,
      description
    },
    mood[] {
      title,
      description
    }
  },
  webDesign[] {
    title,
    description,
    media {
      asset-> {
        _id,
        url,
        originalFilename,
        mimeType
      }
    },
    link
  },
  webDevelopment {
    features[] {
      _key,
      title,
      description,
      media[] {
        asset-> {
          _id,
          url,
          originalFilename,
          mimeType
        }
      },
      link
    }
  }
}`;

// Debug utility
export async function debugPageData() {
  console.group("🔍 Page Data Debug");
  try {
    const result = await client.fetch(homePageQuery);
    console.log("Full query result:", result);
    console.log("Hero section data:", result.hero);
    console.log("Works data:", result.works?.length || 0, "items");
    console.log("Categories:", result.categories?.length || 0, "items");
  } catch (error) {
    console.error("Query error:", error);
  }
  console.groupEnd();
}
