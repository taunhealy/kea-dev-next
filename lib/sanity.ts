import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

// Configure Sanity client
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-06-19",
  useCdn: process.env.NODE_ENV === "production",
  token: process.env.SANITY_API_TOKEN,
});

// Image URL builder
const builder = imageUrlBuilder(client);
export const urlForImage = (source: any) => builder.image(source);

// Query helper
export async function sanityFetch<QueryResponse>({
  query,
  params = {},
  tags,
}: {
  query: string;
  params?: Record<string, unknown>;
  tags?: string[];
}) {
  return client.fetch<QueryResponse>(query, params, {
    next: { revalidate: 15, tags },
  });
}
