import { client } from "@/lib/sanity";
import { homePageQuery, debugPageData } from "@/lib/queries";
import WorkSection from "@/app/sections/WorkSection";
import HeroSection from "@/app/sections/HeroSection";
import { AboutSection } from "@/app/sections/AboutSection";

export default async function Home() {
  const data = await client.fetch(
    homePageQuery,
    {},
    {
      cache: "no-store",
      next: { tags: ["all-data"] },
    }
  );

  console.log("Dataset Metadata:", {
    queryDataset: data.meta.dataset,
    envDataset: process.env.SANITY_DATASET,
    projectId: process.env.SANITY_PROJECT_ID,
  });

  return (
    <>
      <HeroSection data={data.hero} />
      <WorkSection
        data={{ sectionTitle: "Our Work" }} // Default section title
        works={data.works}
        categories={data.categories}
      />
      <AboutSection aboutData={data.about} />
    </>
  );
}
