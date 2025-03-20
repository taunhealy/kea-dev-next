import { createClient } from "next-sanity";

export async function verifySanityConnection() {
  const client = createClient({
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: process.env.SANITY_DATASET,
    useCdn: false,
    token: process.env.SANITY_API_TOKEN,
  });

  try {
    const data = await client.fetch(`*[_type == "systemSettings"][0]{
      _id,
      _type,
      "dataset": select(
        defined(^._dataset) => ^._dataset,
        "unknown"
      )
    }`);

    console.log("Sanity Connection Verified:");
    console.table({
      ProjectID: process.env.SANITY_PROJECT_ID,
      Dataset: process.env.SANITY_DATASET,
      ServerDataset: data?.dataset || "not found",
      DocumentID: data?._id || "none",
      TokenPresent: !!process.env.SANITY_API_TOKEN,
    });
  } catch (error) {
    console.error("Sanity Connection Error:", error);
  }
}
