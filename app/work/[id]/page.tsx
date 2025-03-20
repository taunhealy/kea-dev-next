import { client } from "@/lib/sanity";
import { notFound } from "next/navigation";
import WorkDetailTabs from "./WorkDetailTabs";
import { urlForImage } from "@/lib/urlForImage";
import Image from "next/image";

export async function generateStaticParams() {
  const works = await client.fetch(`*[_type == "work"]{slug}`);
  return works.map((work: any) => ({
    id: work.slug.current,
  }));
}

export default async function WorkDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const work = await client.fetch(
    `*[_type == "work" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      description,
      coverImage,
      core,
      brandDevelopment,
      webDesign,
      webDevelopment
    }`,
    { slug: params.id }
  );

  if (!work) notFound();

  return (
    <main className="bg-black text-white min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          {work.coverImage && (
            <Image
              src={urlForImage(work.coverImage).url()}
              alt={work.title}
              fill
              className="object-cover"
              priority
            />
          )}
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="relative z-10 h-full flex items-end container-large pb-16">
          <div className="flex flex-col gap-4">
            <h1 className="text-4xl md:text-5xl font-primary">{work.title}</h1>
            {work.core?.projectCategory && (
              <span className="px-3 py-1.5 rounded-full bg-white/10 text-sm font-primary w-fit">
                {work.core.projectCategory}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <WorkDetailTabs work={work} />
    </main>
  );
}
