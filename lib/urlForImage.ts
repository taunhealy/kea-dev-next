import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/lib/sanity";

// Initialize the image URL builder with our Sanity client
const builder = imageUrlBuilder(client);

/**
 * Converts a Sanity image reference to an ImageUrlBuilder
 * @param source - Sanity image object (contains _type, asset, etc.)
 * @returns ImageUrlBuilder instance that can be further customized
 *
 * Usage examples:
 * - Basic: urlForImage(image).url()
 * - With transformations: urlForImage(image).width(300).height(200).url()
 * - With format: urlForImage(image).format('webp').url()
 */
export function urlForImage(source: any) {
  return builder.image(source);
}

// Note: Always call .url() at the end when using with Next.js Image component
// Example: <Image src={urlForImage(image).url()} alt="..." />
