import { client } from "@/lib/sanity";
import { urlForImage } from "@/lib/urlForImage";

interface AboutData {
  _id: string;
  heading: string;
  description: string;
}

interface Props {
  heading?: string;
}

export default async function AboutSection({ heading }: Props) {
  // Fetch data directly in server component
  const aboutData = await client.fetch<AboutData>(`
    *[_type == "about"][0] {
      _id,
      heading,
      description
    }
  `);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-primary font-bold text-gray-900 mb-4">
            {heading || aboutData?.heading}
          </h2>
        </div>

        {aboutData?.description && (
          <div className="max-w-3xl mx-auto text-lg text-gray-600 font-primary">
            <p>{aboutData.description}</p>
          </div>
        )}
      </div>
    </section>
  );
}
