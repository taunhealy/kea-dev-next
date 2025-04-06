"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { getColorForCategory } from "@/app/constants/colors";
import { client } from "@/lib/sanity";
import { getRelatedWorksQuery } from "@/lib/queries";

async function fetchRelatedWorks(slug: string) {
  const relatedData = await client.fetch(getRelatedWorksQuery, { slug });

  // Process the data
  let nextWork = null;
  let prevWork = null;
  let primaryCategory = null;

  if (relatedData.currentWork && relatedData.allWorks) {
    const primaryCategoryId = relatedData.currentWork.categories?.[0]?._id;
    const worksInSameCategory = relatedData.allWorks.filter((w) =>
      w.categories.some((c: { _id: string }) => c._id === primaryCategoryId)
    );

    const currentIndex = worksInSameCategory.findIndex(
      (w: { _id: string }) => w._id === relatedData.currentWork._id
    );

    if (currentIndex !== -1) {
      if (currentIndex < worksInSameCategory.length - 1) {
        const nextWorkData = worksInSameCategory[currentIndex + 1];
        nextWork = {
          title: nextWorkData.title,
          slug: nextWorkData.slug,
          description: nextWorkData.description,
          categories: nextWorkData.categories.map((c: any) => ({
            slug: c.slug.current,
          })),
          coverImage: {
            url: nextWorkData.coverImage?.asset?.url,
          },
        };
      }

      if (currentIndex > 0) {
        const prevWorkData = worksInSameCategory[currentIndex - 1];
        prevWork = {
          title: prevWorkData.title,
          slug: prevWorkData.slug,
          description: prevWorkData.description,
          categories: prevWorkData.categories.map((c: any) => ({
            slug: c.slug.current,
          })),
          coverImage: {
            url: prevWorkData.coverImage?.asset?.url,
          },
        };
      }
    }

    primaryCategory = relatedData.currentWork.categories?.[0]?.slug?.current;
  }

  return { nextWork, prevWork, primaryCategory };
}

export default function RelatedWork({ slug }: { slug: string }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["relatedWorks", slug],
    queryFn: () => fetchRelatedWorks(slug),
  });

  if (isLoading) return <div className="animate-pulse">Loading...</div>;
  if (error) return null;
  if (!data?.nextWork && !data?.prevWork) return null;

  const categoryColor = data.primaryCategory
    ? getColorForCategory(
        data.primaryCategory as
          | "brand-identity"
          | "web-design"
          | "web-development"
          | "media"
      )
    : "white";

  return (
    <div className="container-large py-20 border-t border-gray-200">
      <h2 className="text-3xl font-primary font-semibold mb-12">
        Related Work
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {data.prevWork && (
          <RelatedWorkCard
            work={data.prevWork}
            direction="Previous"
            categoryColor={categoryColor}
          />
        )}

        {data.nextWork && (
          <RelatedWorkCard
            work={data.nextWork}
            direction="Next"
            categoryColor={categoryColor}
          />
        )}
      </div>
    </div>
  );
}

interface RelatedWorkCardProps {
  work: WorkProps;
  direction: "Next" | "Previous";
  categoryColor: string;
}

function RelatedWorkCard({
  work,
  direction,
  categoryColor,
}: RelatedWorkCardProps) {
  // Ensure slug is a string
  const slug = typeof work.slug === "string" ? work.slug : "";

  return (
    <Link href={`/work/${slug}`} className="group">
      <div className="relative overflow-hidden rounded-lg transition-all duration-300 hover:shadow-lg">
        <div className="aspect-w-16 aspect-h-9 relative">
          {work.coverImage?.url && (
            <Image
              src={work.coverImage.url}
              alt={work.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          )}
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"
            style={{ opacity: 0.8 }}
          />
        </div>

        <div className="absolute bottom-0 left-0 p-6 w-full">
          <div className="flex items-center mb-2">
            <div
              className="h-1 w-8 mr-3 rounded-full"
              style={{ backgroundColor: categoryColor }}
            />
            <span className="text-sm text-white/80 font-primary">
              {direction} Project
            </span>
          </div>
          <h3 className="text-xl md:text-2xl font-primary font-semibold text-white">
            {work.title}
          </h3>
          <p className="text-white/80 mt-1 font-primary text-sm line-clamp-2">
            {work.description}
          </p>
        </div>
      </div>
    </Link>
  );
}
