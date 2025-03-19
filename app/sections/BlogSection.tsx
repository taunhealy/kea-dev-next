"use client";

import { client } from "@/lib/sanity";
import { urlForImage } from "@/lib/urlForImage";
import Link from "next/link";
import Image from "next/image";

interface BlogPost {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  mainImage?: any;
  publishedAt: string;
  description?: string;
  categories?: BlogCategory[];
}

interface BlogCategory {
  _key: string;
  title: string;
}

interface BlogSectionProps {
  data?: any; // For section config
  posts: BlogPost[]; // Actual blog posts
}

export default function BlogSection({ data, posts }: BlogSectionProps) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-primary font-bold text-gray-900 mb-4">
            Latest Blog Posts
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-primary">
            Insights, updates, and stories from our team
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts?.length > 0 ? (
            posts.map((post) => (
              <article
                key={post._id}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 group"
              >
                <Link href={`/blog/${post.slug.current}`} className="block">
                  {/* Image Container */}
                  <div className="relative h-48 overflow-hidden">
                    {post.mainImage && (
                      <Image
                        src={urlForImage(post.mainImage)
                          .width(600)
                          .height(400)
                          .url()}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transform group-hover:scale-105 transition-transform duration-300"
                      />
                    )}
                  </div>

                  {/* Content Container */}
                  <div className="p-6">
                    {/* Date */}
                    <div className="text-sm text-gray-500 mb-2 font-primary">
                      {new Date(post.publishedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300 font-primary">
                      {post.title}
                    </h3>

                    {/* Categories */}
                    {post.categories && post.categories.length > 0 && (
                      <div className="flex gap-2 mb-2">
                        {post.categories.map((category) => (
                          <span
                            key={category._key}
                            className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded font-primary"
                          >
                            {category.title}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Description */}
                    {post.description && (
                      <p className="text-gray-600 line-clamp-2 font-primary">
                        {post.description}
                      </p>
                    )}

                    {/* Read More Link */}
                    <div className="mt-4 flex items-center text-blue-600 font-medium font-primary">
                      Read More
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform duration-300"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </Link>
              </article>
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-600 font-primary">
                No posts found, please come back later.
              </p>
            </div>
          )}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            href="/blog"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300 font-primary"
          >
            View All Posts
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
