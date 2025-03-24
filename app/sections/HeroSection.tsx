"use client";

import { useEffect, useState } from "react";
import { client } from "@/lib/sanity";
import HeroBeams from "@/app/components/HeroBeams";
import Image from "next/image";
import { urlForImage } from "@/lib/urlForImage";
import gsap from "gsap";
import { Button } from "@/app/components/ui/button";

interface SectionData {
  heroTitle: string;
  heroSubtitle: string;
  heroImage?: {
    _type: "image";
    asset: {
      _ref: string;
      _type: string;
    };
  };
  heroLogos?: Array<{
    _key: string;
    asset: {
      _ref: string;
      _type: string;
    };
    alt?: string;
  }>;
}

export default function HeroSection({ data }: { data?: SectionData }) {
  const [sectionData, setSectionData] = useState<SectionData | null>(
    data || null
  );
  const [hasImageError, setHasImageError] = useState(false);

  // Enhanced debugging
  useEffect(() => {
    console.groupCollapsed("[HeroSection] Data Debug");
    if (data) {
      console.log(
        "%c✅ Received content data",
        "color: #4CAF50; font-weight: bold"
      );
      console.table({
        "Has Title": !!data.heroTitle,
        "Has Subtitle": !!data.heroSubtitle,
        "Image Present": !!data.heroImage,
        "Logos Count": data.heroLogos?.length || 0,
      });
      console.log("%cImage Metadata:", "color: #2196F3", data.heroImage);
      console.log("%cLogos Metadata:", "color: #2196F3", data.heroLogos);
    } else {
      console.warn(
        "%c⚠️ No content data provided",
        "color: #FF9800; font-weight: bold"
      );
    }
    console.groupEnd();
  }, [data]);

  console.log("HeroSection received data:", data);

  useEffect(() => {
    // GSAP animation for beams container
    const beamsTimeline = gsap.timeline({
      repeat: -1,
      defaults: { duration: 3, ease: "power3.inOut" },
    });

    beamsTimeline
      .to(".beams-container", {
        rotate: 15,
        scale: 1.8,
      })
      .to(".beams-container", {
        rotate: -5,
        scale: 0.7,
      })
      .to(".beams-container", {
        rotate: 0,
        scale: 1,
      }); // Return to initial state

    return () => {
      beamsTimeline.kill(); // Cleanup animation on unmount
    };
  }, []);

  return (
    <div className="overflow-hidden">
      <section className="beams-text-section flex flex-col h-[100vh] relative z-0 bg-black">
        <div className="flex flex-col justify-between h-full py-0 px-8">
          <div className="flex flex-col items-start gap-[90px] pt-[120px]">
            <div className="titles-container flex flex-col gap-[16px] max-w-[540px] relative">
              <div className="absolute inset-0 -m-4 blur-sm bg-black/20 rounded-xl backdrop-opacity-10" />
              <h4 className="text-white font-primary relative">Kea Logic</h4>
              <h1 className="text-white font-primary relative">
                <span>Custom</span> <span>websites</span> that solve business
                <span> challenges</span>.
              </h1>
            </div>
            <HeroBeams />
          </div>

          <div className="tech-stack-container flex flex-wrap gap-4 p-2 justify-center mb-0 w-full">
            <div className="w-full max-w-[600px]">
              <div className="h-px bg-white/20 w-full mb-6"></div>

              <div className="flex flex-wrap gap-3 justify-center">
                {[
                  {
                    name: "React",
                    description:
                      "A JavaScript library for building user interfaces",
                    url: "https://reactjs.org/",
                  },
                  {
                    name: "Next.js",
                    description:
                      "React framework for production with server-side rendering",
                    url: "https://nextjs.org/",
                  },
                  {
                    name: "TypeScript",
                    description:
                      "Strongly typed programming language that builds on JavaScript",
                    url: "https://www.typescriptlang.org/",
                  },
                  {
                    name: "Tailwind CSS",
                    description:
                      "Utility-first CSS framework for rapid UI development",
                    url: "https://tailwindcss.com/",
                  },
                  {
                    name: "Sanity",
                    description: "Headless CMS platform for structured content",
                    url: "https://www.sanity.io/",
                  },
                  {
                    name: "Figma",
                    description: "Collaborative interface design tool",
                    url: "https://www.figma.com/",
                  },
                ].map((tech) => (
                  <div key={tech.name} className="relative group">
                    <Button
                      variant="outline"
                      size="sm"
                      className="font-primary"
                      onClick={() =>
                        window.open(tech.url, "_blank", "noopener,noreferrer")
                      }
                    >
                      {tech.name}
                    </Button>
                    <div className="absolute bottom-full left-0 mb-2 w-48 p-2 bg-black border border-white/20 rounded-lg text-white font-primary text-sm opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                      {tech.description}
                      <div className="mt-1 text-xs text-white/70">
                        Click to visit website
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="h-px bg-white/20 w-full mt-6"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
