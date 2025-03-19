import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/lib/sanity";

const builder = imageUrlBuilder(client);

export function urlForImage(source: any) {
  return builder.image(source);
}
