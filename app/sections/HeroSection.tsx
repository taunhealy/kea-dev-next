"use client";

import { useEffect, useState } from "react";
import { client } from "@/lib/sanity";
import HeroBeams from "@/app/components/HeroBeams";

interface SectionData {
  _id: string;
  heading: string;
  subheading?: string;
  // Add other Sanity fields as needed
}

export default function HeroSection({ data }: { data?: SectionData }) {
  const [sectionData, setSectionData] = useState<SectionData | null>(
    data || null
  );

  useEffect(() => {
    const fetchData = async () => {
      const data = await client.fetch(`
        *[_type == "hero"][0] {
          _id,
          heading,
          subheading
        }
      `);
      setSectionData(data);
    };

    if (!data) fetchData();
  }, [data]);

  return (
    <section className="flex flex-col h-[100vh] relative z-0 bg-primary">
      <div className="section-padding flex flex-col items-start py-0 gap-[90px] pt-[120px]">
        <div className="titles-container flex flex-col gap-[16px] max-w-[540px] h-full px-[32px]">
          <h4 className="text-white font-primary">Kea Logic</h4>
          <h1 className="text-white font-primary">
            Creating <span className="word-fast">performant</span> and{" "}
            <span className="word-minimal">interactive</span>{" "}
            <span className="word-content">websites</span>.
          </h1>
        </div>
        <HeroBeams />
      </div>
    </section>
  );
}
