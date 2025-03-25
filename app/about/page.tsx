import { client } from "@/lib/sanity";
import { aboutQuery } from "@/lib/queries";
import { AboutSection } from "../sections/AboutSection";

export default async function AboutPage() {
  const aboutData = await client.fetch(aboutQuery);
  return <AboutSection aboutData={aboutData} />;
}
