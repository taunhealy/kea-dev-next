// Server Component
import { client } from "@/lib/sanity";
import { workDetailQuery, getRelatedWorksQuery } from "@/lib/queries";
import WorkDetailTabs from "./WorkDetailTabs";
import { notFound } from "next/navigation";

export default async function WorkDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const work = await client.fetch(workDetailQuery, { slug: params.slug });

  if (!work) {
    notFound();
  }

  // Get related works data
  const relatedData = await client.fetch(getRelatedWorksQuery, {
    slug: params.slug,
  });

  // Find next and previous works based on orderRank
  let nextWork = null;
  let prevWork = null;

  if (relatedData.currentWork && relatedData.allWorks) {
    // Get primary category ID from current work
    const primaryCategoryId = relatedData.currentWork.categories?.[0]?._id;

    // Filter works by the same primary category
    const worksInSameCategory = relatedData.allWorks.filter((w) =>
      w.categories.some((c: { _id: string }) => c._id === primaryCategoryId)
    );

    // Find current work index in the filtered list
    const currentIndex = worksInSameCategory.findIndex(
      (w: { _id: string }) => w._id === relatedData.currentWork._id
    );

    if (currentIndex !== -1) {
      // Get next work (if not at the end)
      if (currentIndex < worksInSameCategory.length - 1) {
        nextWork = {
          title: worksInSameCategory[currentIndex + 1].title,
          slug: worksInSameCategory[currentIndex + 1].slug,
          description: worksInSameCategory[currentIndex + 1].description,
          categories: worksInSameCategory[currentIndex + 1].categories.map(
            (c: any) => ({
              slug: c.slug.current,
            })
          ),
          coverImage: {
            url: worksInSameCategory[currentIndex + 1].coverImage?.asset?.url,
          },
        };
      }

      // Get previous work (if not at the beginning)
      if (currentIndex > 0) {
        prevWork = {
          title: worksInSameCategory[currentIndex - 1].title,
          slug: worksInSameCategory[currentIndex - 1].slug,
          description: worksInSameCategory[currentIndex - 1].description,
          categories: worksInSameCategory[currentIndex - 1].categories.map(
            (c: any) => ({
              slug: c.slug.current,
            })
          ),
          coverImage: {
            url: worksInSameCategory[currentIndex - 1].coverImage?.asset?.url,
          },
        };
      }
    }
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <WorkDetailTabs work={work} nextWork={nextWork} prevWork={prevWork} />
    </main>
  );
}
