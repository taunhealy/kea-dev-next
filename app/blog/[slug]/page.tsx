import Image from "next/image";
import { client } from "@/lib/sanity";
import { urlForImage } from "@/lib/urlForImage";
import FormattedDate from "@/app/components/FormattedDate";

type BlogPostProps = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  const posts = await client.fetch(`*[_type == "post"]`);
  return posts.map((post: any) => ({
    slug: post.slug.current,
  }));
}

export default async function BlogPost({ params }: BlogPostProps) {
  const post = await client.fetch(
    `*[_type == "post" && slug.current == $slug][0]`,
    { slug: params.slug },
    { next: { revalidate: 3600 } }
  );

  return (
    <article className="pt-20">
      <div className="relative w-full">
        {post.heroImage && (
          <Image
            width={1020}
            height={510}
            src={urlForImage(post.heroImage).url()}
            alt={post.heroImage.alt || "Blog post image"}
            className="mx-auto block rounded-lg shadow-lg"
            priority
          />
        )}
      </div>
      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="mb-8 text-center">
          <div className="mb-4 text-gray-500 font-primary">
            <FormattedDate date={post.pubDate} />
            {post.updatedDate && (
              <div className="mt-2 italic text-gray-400">
                Last updated on <FormattedDate date={post.updatedDate} />
              </div>
            )}
          </div>
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl font-primary">
            {post.title}
          </h1>
          <hr className="mx-auto w-1/4 border-t-2 border-gray-200" />
        </div>
        <div className="prose prose-lg max-w-none text-gray-600 font-primary">
          {post.content}
        </div>
      </div>
    </article>
  );
}
