import { client } from "@/lib/sanity";
import { homePageQuery } from "@/lib/queries";
import BlogSection from "./sections/BlogSection";
import WorkSection from "@/app/sections/WorkSection";
import HeroSection from "@/app/sections/HeroSection";

export default async function Home() {
  const data = await client.fetch(homePageQuery);

  // Add console log to debug
  console.log("Home data:", {
    workData: data.work,
    works: data.works,
    categories: data.categories,
  });

  return (
    <>
      <HeroSection data={data.hero} />
      <WorkSection
        data={{ sectionTitle: "Our Work" }} // Default section title
        works={data.works}
        categories={data.categories}
      />
      <BlogSection data={data.blog} posts={data.posts} />
      {/* Add other sections */}
    </>
  );
}
