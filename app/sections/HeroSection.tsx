"use client";

import { useEffect, useState } from "react";
import { client } from "@/lib/sanity";
import HeroBeams from "@/app/components/HeroBeams";
import Image from "next/image";
import { urlForImage } from "@/lib/urlForImage";
import gsap from "gsap";

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
    // GSAP animation for beams
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
                <span className="word-fast">Custom</span>{" "}
                <span className="word-minimal">websites</span> that solve
                business
                <span className="word-content"> challenges</span>.
              </h1>
            </div>
            <HeroBeams />
          </div>

          <div className="tech-stack-container flex flex-wrap gap-4 p-2 justify-left mb-8">
            {sectionData?.heroLogos?.length ? (
              sectionData.heroLogos.map((logo) => {
                if (!logo?.asset) {
                  console.warn("Invalid logo:", logo);
                  return null;
                }

                const imageUrl = urlForImage(logo).width(100).height(100).url();

                return (
                  <Image
                    key={logo._key}
                    src={imageUrl || "/fallback-logo.png"}
                    width={100}
                    height={100}
                    alt={logo.alt || "Technology stack logo"}
                    className="h-12 w-auto object-contain"
                    priority
                    onError={(e) => {
                      console.error(
                        `%c🖼️ Failed to load logo: ${logo._key}`,
                        "background: #FFEBEE; color: #B71C1C"
                      );
                      e.currentTarget.src = "/fallback-logo.png";
                      e.currentTarget.alt = "Fallback technology logo";
                    }}
                  />
                );
              })
            ) : (
              <div className="w-full min-h-[200px] border-2 border-dashed border-gray-600 rounded-lg flex items-center justify-center">
                <span className="text-gray-400 font-primary">
                  Tech stack logos not available
                </span>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
