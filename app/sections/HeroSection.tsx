"use client";

import { useEffect, useState } from "react";
import { client } from "@/lib/sanity";
import HeroBeams from "@/app/components/HeroBeams";
import Image from "next/image";
import { urlForImage } from "@/lib/urlForImage";
import gsap from "gsap";
import { Button } from "@/app/components/ui/button";
import TechStack from "@/app/components/TechStack";

interface SectionData {
  _type: string;
  _key: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImage?: {
    _type: string;
    asset: {
      _ref: string;
      _type: string;
    };
  };
  heroLogos?: Array<{
    _type: string;
    _key: string;
    asset: {
      _ref: string;
      _type: string;
    };
    alt?: string;
  }>;
  inDevelopment?: {
    _type: string;
    _ref: string;
    title?: string;
    mainImage?: {
      _type: string;
      asset: {
        _ref: string;
        _type: string;
      };
    };
    description?: string;
    workItemId?: string;
    workType?: string;
    coverImage?: {
      _type: string;
      asset: {
        _ref: string;
        _type: string;
      };
    };
    core?: {
      projectDescription?: string;
    };
  };
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
            <div className="flex justify-between w-full">
              {/* Left column with title and Custom Solutions */}
              <div className="flex flex-col gap-8 max-w-[420px]">
                <div className="titles-container flex flex-col gap-[16px] relative">
                  <div className="absolute inset-0 -m-4 blur-sm bg-black/20 rounded-xl backdrop-opacity-10" />
                  <h4 className="text-white font-primary relative">
                    Kea Logic
                  </h4>
                  <h1 className="text-xl md:text-3xl font-primary font-normal tracking-tight text-white mb-6">
                    <span>Custom</span> <span>websites</span> that solve
                    business
                    <span> challenges</span>.
                  </h1>
                </div>

                {/* Custom Solutions directly below title */}
                <div className="border border-white/20 rounded-lg p-4 bg-black/40 backdrop-blur-sm overflow-hidden relative w-full">
                  {/* Subtle gradient glow effect */}
                  <div className="absolute inset-0 -z-10 animate-pulse">
                    <div className="absolute inset-0 bg-gradient-to-r from-tertiary via-secondary to-quaternary opacity-10 blur-lg"></div>
                  </div>

                  <h3 className="text-white font-primary text-lg mb-4 border-b border-white/20 pb-2">
                    Custom Solutions
                  </h3>
                  <ul className="text-white/80 font-primary space-y-2">
                    {[
                      {
                        text: "Custom Checkout Systems",
                        color: "var(--color-primary)",
                      },
                      {
                        text: "Booking & Reservation Platforms",
                        color: "var(--color-secondary)",
                      },
                      {
                        text: "E-commerce Solutions",
                        color: "var(--color-tertiary)",
                      },
                      {
                        text: "Content Management Systems",
                        color: "var(--color-quaternary)",
                      },
                      {
                        text: "Interactive Dashboards",
                        color: "gray-200",
                      },
                    ].map((solution, index) => (
                      <li key={index} className="flex items-center">
                        <span
                          className="inline-block w-1.5 h-1.5 rounded-full mr-2"
                          style={{ backgroundColor: solution.color }}
                        ></span>
                        {solution.text}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right sidebar */}
              <div className="w-[350px] mr-8 flex flex-col gap-6">
                {/* In Development Section */}
                <div className="in-development-container relative border border-white/20 rounded-lg p-4 bg-black/40 backdrop-blur-sm overflow-hidden">
                  {/* Animated border glow effect */}
                  <div className="absolute inset-0 -z-10 animate-pulse">
                    <div className="absolute inset-0 bg-black blur-sm"></div>
                  </div>

                  <h3 className="text-white font-primary text-lg mb-3 border-b border-white/20 pb-2">
                    In Development
                  </h3>

                  <div className="project-card mb-3">
                    <h4 className="text-white font-primary text-base mb-2">
                      {data?.inDevelopment?.title || "Project Horizon"}
                    </h4>
                    {data?.inDevelopment?.mainImage ||
                    data?.inDevelopment?.coverImage ? (
                      <div className="relative h-28 w-full rounded-md overflow-hidden mb-2">
                        <Image
                          src={urlForImage(
                            data.inDevelopment.mainImage ||
                              data.inDevelopment.coverImage
                          ).url()}
                          alt={data.inDevelopment.title || "Current project"}
                          fill
                          className="object-cover"
                          onError={() => setHasImageError(true)}
                        />
                      </div>
                    ) : (
                      data?.heroImage && (
                        <div className="relative h-28 w-full rounded-md overflow-hidden mb-2">
                          <Image
                            src={urlForImage(data.heroImage).url()}
                            alt="Current project"
                            fill
                            className="object-cover"
                            onError={() => setHasImageError(true)}
                          />
                        </div>
                      )
                    )}
                    <p className="text-white/70 font-primary text-sm">
                      {data?.inDevelopment?.description ||
                        data?.inDevelopment?.core?.projectDescription ||
                        "Custom e-commerce platform with integrated analytics dashboard"}
                    </p>
                  </div>

                  <div className="sanity-reference mt-3 pt-3 border-t border-white/20">
                    <p className="text-white/50 font-primary text-xs flex items-center">
                      <span className="inline-block w-2 h-2 bg-primary rounded-full mr-2 animate-pulse"></span>
                      Work Type:{" "}
                      {data?.inDevelopment?.workType || "Web Development"}
                    </p>
                  </div>
                </div>

                {/* Tech Stack */}
                <TechStack />
              </div>
            </div>

            <HeroBeams />
          </div>
        </div>
      </section>
    </div>
  );
}
