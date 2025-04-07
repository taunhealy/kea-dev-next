// Server Component
import { client } from "@/lib/sanity";
import { workDetailQuery } from "@/lib/queries";
import WorkDetailTabs from "./WorkDetailTabs";
import { notFound } from "next/navigation";

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { work, allWorks } = await client.fetch(workDetailQuery, { slug });

  if (!work) {
    notFound();
  }

  // Find next and previous works
  let nextWork = null;
  let prevWork = null;

  const currentIndex = allWorks.findIndex((w: any) => w.slug.current === slug);
  if (currentIndex !== -1) {
    if (currentIndex < allWorks.length - 1) {
      nextWork = allWorks[currentIndex + 1];
    }
    if (currentIndex > 0) {
      prevWork = allWorks[currentIndex - 1];
    }
  }

  // Get primary category from the filtered works data
  const primaryCategory = work.categories?.[0]?.slug?.current;

  return (
    <main className="min-h-screen bg-black text-white">
      <WorkDetailTabs work={work} nextWork={nextWork} prevWork={prevWork} />
    </main>
  );
}
