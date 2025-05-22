import { client } from "@/lib/sanity";
import { homePageQuery, debugPageData } from "@/lib/queries";
import WorkSection from "@/app/sections/WorkSection";
import HeroSection from "@/app/sections/HeroSection";
import { HeroAboutSection } from "@/app/sections/HeroAboutSection";
import { CTASection } from "@/app/sections/CTASection";

export default async function Home() {
  const data = await client.fetch(
    homePageQuery,
    {},
    {
      cache: "no-store",
      next: { tags: ["all-data"] },
    }
  );

  return (
    <>
      <HeroSection data={data.hero} />
      <HeroAboutSection aboutData={data.about} />
      <WorkSection
        data={{ sectionTitle: "Our Work" }} // Default section title
        works={data.works}
        categories={data.categories}
      />
      <CTASection />
    </>
  );
}
