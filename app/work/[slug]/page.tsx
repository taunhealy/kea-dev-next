// Server Component
import { client } from "@/lib/sanity";
import { workDetailQuery } from "@/lib/queries";
import WorkDetailTabs from "./WorkDetailTabs";
import { groq } from "next-sanity";

// Generate static params for all work items
export async function generateStaticParams() {
  const slugs = await client.fetch(
    groq`*[_type == "work"] {
      "slug": slug.current
    }`
  );
  return slugs;
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // Await the params object before using it
  const resolvedParams = await params;

  // Now use the resolved params
  const work = await client.fetch(workDetailQuery, {
    slug: resolvedParams.slug,
  });

  if (!work) return <div>Work not found</div>;

  return (
    <main className="min-h-screen bg-black text-white">
      <WorkDetailTabs work={work} />
    </main>
  );
}
