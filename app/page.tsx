import { client } from "@/lib/sanity";
import { homePageQuery } from "@/lib/queries";
import BlogSection from "./sections/BlogSection";
import WorkSection from "@/app/sections/WorkSection";
import HeroSection from "@/app/sections/HeroSection";

export default async function Home() {
  const data = await client.fetch(
    homePageQuery,
    {},
    {
      next: { revalidate: 3600 },
    }
  );

  return (
    <>
      <HeroSection data={data.hero} />
      <WorkSection
        data={data.work}
        works={data.works}
        categories={data.categories}
      />
      <BlogSection data={data.blog} posts={data.posts} />
      {/* Add other sections */}
    </>
  );
}
