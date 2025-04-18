/**
 * ---------------------------------------------------------------------------------
 * This file has been generated by Sanity TypeGen.
 * Command: `sanity typegen generate`
 *
 * Any modifications made directly to this file will be overwritten the next time
 * the TypeScript definitions are generated. Please make changes to the Sanity
 * schema definitions and/or GROQ queries if you need to update these types.
 *
 * For more information on how to use Sanity TypeGen, visit the official documentation:
 * https://www.sanity.io/docs/sanity-typegen
 * ---------------------------------------------------------------------------------
 */

// Source: schema.json
export type SanityImagePaletteSwatch = {
  _type: 'sanity.imagePaletteSwatch'
  background?: string
  foreground?: string
  population?: number
  title?: string
}

export type SanityImagePalette = {
  _type: 'sanity.imagePalette'
  darkMuted?: SanityImagePaletteSwatch
  lightVibrant?: SanityImagePaletteSwatch
  darkVibrant?: SanityImagePaletteSwatch
  vibrant?: SanityImagePaletteSwatch
  dominant?: SanityImagePaletteSwatch
  lightMuted?: SanityImagePaletteSwatch
  muted?: SanityImagePaletteSwatch
}

export type SanityImageDimensions = {
  _type: 'sanity.imageDimensions'
  height?: number
  width?: number
  aspectRatio?: number
}

export type Geopoint = {
  _type: 'geopoint'
  lat?: number
  lng?: number
  alt?: number
}

export type AboutSection = {
  _type: 'aboutSection'
  heading?: string
  description?: string
}

export type WorkCategory = {
  _id: string
  _type: 'workCategory'
  _createdAt: string
  _updatedAt: string
  _rev: string
  title?: string
  slug?: Slug
  description?: string
  order?: number
}

export type Category = {
  _id: string
  _type: 'category'
  _createdAt: string
  _updatedAt: string
  _rev: string
  title?: string
  slug?: Slug
  description?: string
  image?: {
    asset?: {
      _ref: string
      _type: 'reference'
      _weak?: boolean
      [internalGroqTypeReferenceTo]?: 'sanity.imageAsset'
    }
    hotspot?: SanityImageHotspot
    crop?: SanityImageCrop
    _type: 'image'
  }
}

export type Post = {
  _id: string
  _type: 'post'
  _createdAt: string
  _updatedAt: string
  _rev: string
  title?: string
  slug?: Slug
  description?: string
  mainImage?: {
    asset?: {
      _ref: string
      _type: 'reference'
      _weak?: boolean
      [internalGroqTypeReferenceTo]?: 'sanity.imageAsset'
    }
    hotspot?: SanityImageHotspot
    crop?: SanityImageCrop
    _type: 'image'
  }
  categories?: Array<{
    _ref: string
    _type: 'reference'
    _weak?: boolean
    _key: string
    [internalGroqTypeReferenceTo]?: 'category'
  }>
  publishedAt?: string
  body?: Array<
    | {
        children?: Array<{
          marks?: Array<string>
          text?: string
          _type: 'span'
          _key: string
        }>
        style?: 'normal' | 'h1' | 'h2' | 'h3' | 'h4' | 'blockquote'
        listItem?: 'bullet'
        markDefs?: Array<{
          href?: string
          _type: 'link'
          _key: string
        }>
        level?: number
        _type: 'block'
        _key: string
      }
    | {
        asset?: {
          _ref: string
          _type: 'reference'
          _weak?: boolean
          [internalGroqTypeReferenceTo]?: 'sanity.imageAsset'
        }
        hotspot?: SanityImageHotspot
        crop?: SanityImageCrop
        _type: 'image'
        _key: string
      }
  >
}

export type ImageFullScreenSection = {
  _type: 'imageFullScreenSection'
  image?: {
    asset?: {
      _ref: string
      _type: 'reference'
      _weak?: boolean
      [internalGroqTypeReferenceTo]?: 'sanity.imageAsset'
    }
    hotspot?: SanityImageHotspot
    crop?: SanityImageCrop
    _type: 'image'
  }
  alt?: string
  caption?: string
}

export type ContactSection = {
  _type: 'contactSection'
  heading?: string
  subheading?: string
  contactInfo?: {
    email?: string
    phone?: string
    address?: string
  }
  formFields?: Array<{
    fieldName?: string
    fieldType?: 'text' | 'email' | 'tel' | 'textarea'
    required?: boolean
    placeholder?: string
    _key: string
  }>
  submitButtonText?: string
  successMessage?: string
}

export type BlogSection = {
  _type: 'blogSection'
  heading?: string
  subheading?: string
  posts?: Array<{
    _ref: string
    _type: 'reference'
    _weak?: boolean
    _key: string
    [internalGroqTypeReferenceTo]?: 'post'
  }>
}

export type WorkVideoFullScreenSection = {
  _type: 'workVideoFullScreenSection'
  videoUrl?: string
  overlayHeading?: string
}

export type Process = {
  _id: string
  _type: 'process'
  _createdAt: string
  _updatedAt: string
  _rev: string
  title?: string
  description?: string
  stepNumber?: number
  icon?: {
    asset?: {
      _ref: string
      _type: 'reference'
      _weak?: boolean
      [internalGroqTypeReferenceTo]?: 'sanity.imageAsset'
    }
    hotspot?: SanityImageHotspot
    crop?: SanityImageCrop
    _type: 'image'
  }
  color?: string
}

export type ProcessSection = {
  _type: 'processSection'
  processes?: Array<{
    _ref: string
    _type: 'reference'
    _weak?: boolean
    _key: string
    [internalGroqTypeReferenceTo]?: 'process'
  }>
}

export type HeroSection = {
  _type: 'heroSection'
  heroImage?: {
    asset?: {
      _ref: string
      _type: 'reference'
      _weak?: boolean
      [internalGroqTypeReferenceTo]?: 'sanity.imageAsset'
    }
    hotspot?: SanityImageHotspot
    crop?: SanityImageCrop
    _type: 'image'
  }
  heroVideo?: string
  heroTitle?: string
  heroSubtitle?: string
  heroLogos?: Array<{
    asset?: {
      _ref: string
      _type: 'reference'
      _weak?: boolean
      [internalGroqTypeReferenceTo]?: 'sanity.imageAsset'
    }
    hotspot?: SanityImageHotspot
    crop?: SanityImageCrop
    _type: 'image'
    _key: string
  }>
}

export type WorkSection = {
  _type: 'workSection'
  sectionTitle?: string
  works?: Array<{
    _ref: string
    _type: 'reference'
    _weak?: boolean
    _key: string
    [internalGroqTypeReferenceTo]?: 'work'
  }>
}

export type TestimonialSection = {
  _type: 'testimonialSection'
  testimonials?: Array<{
    _ref: string
    _type: 'reference'
    _weak?: boolean
    _key: string
    [internalGroqTypeReferenceTo]?: 'testimonial'
  }>
}

export type Work = {
  _id: string
  _type: 'work'
  _createdAt: string
  _updatedAt: string
  _rev: string
  title?: string
  slug?: Slug
  client?: {
    _ref: string
    _type: 'reference'
    _weak?: boolean
    [internalGroqTypeReferenceTo]?: 'client'
  }
  categories?: Array<{
    _ref: string
    _type: 'reference'
    _weak?: boolean
    _key: string
    [internalGroqTypeReferenceTo]?: 'workCategory'
  }>
  description?: string
  technologies?: Array<string>
  completionDate?: string
  coverImage?: {
    asset?: {
      _ref: string
      _type: 'reference'
      _weak?: boolean
      [internalGroqTypeReferenceTo]?: 'sanity.imageAsset'
    }
    hotspot?: SanityImageHotspot
    crop?: SanityImageCrop
    _type: 'image'
  }
  gallery?: Array<{
    asset?: {
      _ref: string
      _type: 'reference'
      _weak?: boolean
      [internalGroqTypeReferenceTo]?: 'sanity.imageAsset'
    }
    hotspot?: SanityImageHotspot
    crop?: SanityImageCrop
    _type: 'image'
    _key: string
  }>
  projectUrl?: string
  testimonial?: string
  core?: {
    producerName?: string
    clientName?: string
    projectTitle?: string
    projectCategory?: string
    projectChallenge?: string
    projectTechStack?: Array<string>
  }
  brandDevelopment?: {
    purpose?: {
      title?: string
      description?: string
    }
    audience?: {
      title?: string
      description?: string
    }
    archetypes?: Array<{
      title?: string
      description?: string
      _key: string
    }>
    mood?: Array<{
      title?: string
      description?: string
      _key: string
    }>
  }
  webDesign?: {
    designSystem?: {
      title?: string
      description?: string
      media?: {
        asset?: {
          _ref: string
          _type: 'reference'
          _weak?: boolean
          [internalGroqTypeReferenceTo]?: 'sanity.fileAsset'
        }
        _type: 'file'
      }
      link?: string
    }
  }
  webDevelopment?: {
    features?: Array<{
      title?: string
      description?: string
      media?: Array<{
        asset?: {
          _ref: string
          _type: 'reference'
          _weak?: boolean
          [internalGroqTypeReferenceTo]?: 'sanity.fileAsset'
        }
        _type: 'file'
        _key: string
      }>
      link?: string
      _key: string
    }>
  }
}

export type SanityFileAsset = {
  _id: string
  _type: 'sanity.fileAsset'
  _createdAt: string
  _updatedAt: string
  _rev: string
  originalFilename?: string
  label?: string
  title?: string
  description?: string
  altText?: string
  sha1hash?: string
  extension?: string
  mimeType?: string
  size?: number
  assetId?: string
  uploadId?: string
  path?: string
  url?: string
  source?: SanityAssetSourceData
}

export type Client = {
  _id: string
  _type: 'client'
  _createdAt: string
  _updatedAt: string
  _rev: string
  title?: string
}

export type Page = {
  _id: string
  _type: 'page'
  _createdAt: string
  _updatedAt: string
  _rev: string
  orderRank?: string
  title?: string
  slug?: Slug
  sections?: Array<
    | ({
        _key: string
      } & HeroSection)
    | ({
        _key: string
      } & WorkSection)
    | ({
        _key: string
      } & ProcessSection)
    | ({
        _key: string
      } & WorkVideoFullScreenSection)
    | ({
        _key: string
      } & BlogSection)
    | ({
        _key: string
      } & ContactSection)
    | ({
        _key: string
      } & ImageFullScreenSection)
    | ({
        _key: string
      } & AboutSection)
  >
}

export type Slug = {
  _type: 'slug'
  current?: string
  source?: string
}

export type Testimonial = {
  _id: string
  _type: 'testimonial'
  _createdAt: string
  _updatedAt: string
  _rev: string
  author?: string
  role?: string
  content?: string
  avatar?: {
    asset?: {
      _ref: string
      _type: 'reference'
      _weak?: boolean
      [internalGroqTypeReferenceTo]?: 'sanity.imageAsset'
    }
    hotspot?: SanityImageHotspot
    crop?: SanityImageCrop
    _type: 'image'
  }
}

export type BlockContent = Array<
  | {
      children?: Array<{
        marks?: Array<string>
        text?: string
        _type: 'span'
        _key: string
      }>
      style?: 'normal' | 'h1' | 'h2' | 'h3' | 'h4' | 'blockquote'
      listItem?: 'bullet'
      markDefs?: Array<{
        href?: string
        _type: 'link'
        _key: string
      }>
      level?: number
      _type: 'block'
      _key: string
    }
  | {
      asset?: {
        _ref: string
        _type: 'reference'
        _weak?: boolean
        [internalGroqTypeReferenceTo]?: 'sanity.imageAsset'
      }
      hotspot?: SanityImageHotspot
      crop?: SanityImageCrop
      _type: 'image'
      _key: string
    }
>

export type SanityImageCrop = {
  _type: 'sanity.imageCrop'
  top?: number
  bottom?: number
  left?: number
  right?: number
}

export type SanityImageHotspot = {
  _type: 'sanity.imageHotspot'
  x?: number
  y?: number
  height?: number
  width?: number
}

export type SanityImageAsset = {
  _id: string
  _type: 'sanity.imageAsset'
  _createdAt: string
  _updatedAt: string
  _rev: string
  originalFilename?: string
  label?: string
  title?: string
  description?: string
  altText?: string
  sha1hash?: string
  extension?: string
  mimeType?: string
  size?: number
  assetId?: string
  uploadId?: string
  path?: string
  url?: string
  metadata?: SanityImageMetadata
  source?: SanityAssetSourceData
}

export type SanityAssetSourceData = {
  _type: 'sanity.assetSourceData'
  name?: string
  id?: string
  url?: string
}

export type SanityImageMetadata = {
  _type: 'sanity.imageMetadata'
  location?: Geopoint
  dimensions?: SanityImageDimensions
  palette?: SanityImagePalette
  lqip?: string
  blurHash?: string
  hasAlpha?: boolean
  isOpaque?: boolean
}

export type AllSanitySchemaTypes =
  | SanityImagePaletteSwatch
  | SanityImagePalette
  | SanityImageDimensions
  | Geopoint
  | AboutSection
  | WorkCategory
  | Category
  | Post
  | ImageFullScreenSection
  | ContactSection
  | BlogSection
  | WorkVideoFullScreenSection
  | Process
  | ProcessSection
  | HeroSection
  | WorkSection
  | TestimonialSection
  | Work
  | SanityFileAsset
  | Client
  | Page
  | Slug
  | Testimonial
  | BlockContent
  | SanityImageCrop
  | SanityImageHotspot
  | SanityImageAsset
  | SanityAssetSourceData
  | SanityImageMetadata
export declare const internalGroqTypeReferenceTo: unique symbol
