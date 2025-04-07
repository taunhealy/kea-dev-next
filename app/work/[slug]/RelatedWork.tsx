"use client";

import Image from "next/image";
import Link from "next/link";
import { WorkProps, RelatedWorkProps } from "./types";

export default function RelatedWork({
  currentWork,
  nextWork,
  prevWork,
  primaryCategory,
}: RelatedWorkProps) {
  return (
    <div className="container-large py-20 border-t border-white">
      <h2 className="text-[30px] leading-[36px] font-primary font-normal tracking-[-0.75px] text-white mb-12">
        Related Work
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <RelatedWorkCard
          work={
            prevWork || {
              title: "No previous work",
              slug: "",
              description: "No data present",
              coverImage: { url: "/placeholder-image.jpg" },
              categories: [{ slug: "" }],
            }
          }
          direction="Previous"
        />
        <RelatedWorkCard
          work={
            nextWork || {
              title: "No next work",
              slug: "",
              description: "No data present",
              coverImage: { url: "/placeholder-image.jpg" },
              categories: [{ slug: "" }],
            }
          }
          direction="Next"
        />
      </div>
    </div>
  );
}

function RelatedWorkCard({
  work,
  direction,
}: {
  work: WorkProps;
  direction: "Next" | "Previous";
}) {
  // Get the slug value regardless of format
  const slugValue =
    typeof work.slug === "object" && "current" in work.slug
      ? work.slug.current
      : work.slug;

  // Get the image URL regardless of format
  const imageUrl = work.coverImage.url || work.coverImage.asset?.url || "";

  return (
    <div className="relative overflow-hidden rounded-lg border border-gray-200 h-64 group">
      {!slugValue ? (
        // Placeholder state
        <div className="h-full w-full bg-gray-50 flex items-center justify-center p-6">
          <p className="text-gray-500 font-primary text-center">
            No {direction.toLowerCase()} work available
          </p>
        </div>
      ) : (
        // Content state
        <Link href={`/work/${slugValue}`} className="block h-full">
          <div className="relative h-full">
            <Image
              src={imageUrl}
              alt={work.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-90"></div>
            <div className="absolute bottom-0 left-0 p-6 w-full">
              <h3 className="text-white font-primary font-medium text-lg">
                {work.title}
              </h3>
              <p className="text-white/80 font-primary text-sm mt-1 line-clamp-2">
                {work.description}
              </p>
            </div>
          </div>
        </Link>
      )}
    </div>
  );
}
