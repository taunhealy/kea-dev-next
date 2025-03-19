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
    <section className="flex flex-col h-[100vh] relative z-0 bg-black">
      <div className="flex flex-col items-start py-0 gap-[90px] pt-[120px] px-8">
        <div className="titles-container flex flex-col gap-[16px] max-w-[540px] h-full relative">
          <div className="absolute inset-0 -m-4 blur-sm bg-black/20 rounded-xl  backdrop-opacity-10" />
          <h4 className="text-white font-primary relative">Kea Logic</h4>
          <h1 className="text-white font-primary relative">
            <span className="word-fast">Custom</span>{" "}
            <span className="word-minimal">websites</span> that solve business
            <span className="word-content"> challenges</span>.
          </h1>
        </div>
        <HeroBeams />
      </div>
    </section>
  );
}
