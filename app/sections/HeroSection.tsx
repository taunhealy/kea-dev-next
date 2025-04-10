"use client";

import React, { useEffect, useState, useRef } from "react";
import HeroBeams from "@/app/components/HeroBeams";
import Image from "next/image";
import { urlForImage } from "@/lib/urlForImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/app/components/ui/button";
import TechStack from "@/app/components/TechStack";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import { PortableText, PortableTextBlock } from "@portabletext/react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { useGSAP } from "@gsap/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
    description?: PortableTextBlock[] | string;
    workItemId?: string;
    workType?: {
      _type: string;
      _key: string;
      title: string;
    };
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

// Make sure to register all plugins
gsap.registerPlugin(useGSAP, ScrollTrigger);

const SimpleDialogContent = ({
  children,
  ...props
}: { children: React.ReactNode } & DialogPrimitive.DialogContentProps) => {
  return (
    <DialogContent
      className="w-[90vw] max-w-[800px] max-h-[85vh] overflow-y-auto"
      {...props}
    >
      {children}
    </DialogContent>
  );
};

export default function HeroSection({ data }: { data?: SectionData }) {
  const [sectionData, setSectionData] = useState<SectionData | null>(
    data || null
  );
  const [hasImageError, setHasImageError] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Add GSAP version check here
  useEffect(() => {
    console.log("GSAP version:", gsap.version);
  }, []);

  // Character limit for project description
  const CHAR_LIMIT = 100;

  // Get the project description with proper fallbacks
  const getProjectDescription = () => {
    const description =
      data?.inDevelopment?.description ||
      data?.inDevelopment?.core?.projectDescription ||
      "Custom e-commerce platform with integrated analytics dashboard";

    return typeof description === "string"
      ? description
      : "Custom e-commerce platform with integrated analytics dashboard";
  };

  // Truncate description if needed
  const truncateDescription = (text: string) => {
    if (text.length <= CHAR_LIMIT || isDescriptionExpanded) return text;
    return text.substring(0, CHAR_LIMIT) + "...";
  };

  // Project description to display
  const projectDescription = getProjectDescription();
  const displayDescription = truncateDescription(projectDescription);

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

    // Wait for DOM to be fully loaded
    const animateBeams = () => {
      const beamsContainer = document.querySelector(".beams-container");

      if (beamsContainer) {
        console.log("Found beams container, applying animation");
        beamsTimeline
          .to(beamsContainer, {
            rotate: 15,
            scale: 1.8,
          })
          .to(beamsContainer, {
            rotate: -5,
            scale: 0.7,
          })
          .to(beamsContainer, {
            rotate: 0,
            scale: 1,
          }); // Return to initial state
      } else {
        console.warn("Beams container element not found for GSAP animation");
      }
    };

    // Use a small timeout to ensure DOM is ready
    const timer = setTimeout(() => {
      animateBeams();
    }, 500);

    return () => {
      clearTimeout(timer);
      beamsTimeline.kill(); // Cleanup animation on unmount
    };
  }, []);

  return (
    <div className="overflow-hidden">
      <section className="beams-text-section flex flex-col h-[100vh] relative z-0 bg-black">
        {/* Enhanced gradient background effect - lowest z-index */}
        <div className="absolute inset-0 -z-30 overflow-hidden">
          <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-gradient-to-tr from-[#22c55e]/20 via-[#22c55e]/5 to-transparent blur-[120px]"></div>
          <div className="absolute top-20 right-0 w-[50%] h-[50%] bg-gradient-to-bl from-[#f43f5e]/20 via-[#a855f7]/10 to-transparent blur-[120px]"></div>
        </div>

        {/* HeroBeams positioned slightly lower with medium z-index */}
        <div className="absolute inset-0 -z-10 flex items-center justify-center pointer-events-none translate-y-[15%]">
          <div className="beams-container w-full h-full">
            <HeroBeams />
          </div>
        </div>

        {/* Centered Text Logo with beam pass-through effect - alternative */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-20">
          {/* Glass effect container */}
          <div className="relative rounded-xl backdrop-blur-md bg-black/30 border border-white/10 p-6 shadow-lg">
            <div className="relative inline-flex items-center justify-center">
              {/* Square maze with stroke but no fill */}
              <div className="absolute w-[140px] h-[140px] maze-container">
                <svg
                  width="140"
                  height="140"
                  viewBox="0 0 140 140"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  id="maze-svg"
                >
                  {/* Outer square */}
                  <rect
                    x="10"
                    y="10"
                    width="120"
                    height="120"
                    stroke="var(--color-primary)"
                    strokeWidth="1.5"
                    strokeOpacity="0.8"
                    className="maze-path maze-layer-1"
                  />

                  {/* Inner maze elements */}
                  <rect
                    x="25"
                    y="25"
                    width="90"
                    height="90"
                    stroke="var(--color-secondary)"
                    strokeWidth="1.5"
                    strokeOpacity="0.7"
                    className="maze-path maze-layer-2"
                  />
                  <rect
                    x="40"
                    y="40"
                    width="60"
                    height="60"
                    stroke="var(--color-tertiary)"
                    strokeWidth="1.5"
                    strokeOpacity="0.6"
                    className="maze-path maze-layer-3"
                  />

                  {/* Innermost square (quaternary/pink) - interactive with hover effect */}
                  <Link href="/about" passHref>
                    <rect
                      x="55"
                      y="55"
                      width="30"
                      height="30"
                      stroke="var(--color-quaternary)"
                      strokeWidth="2.5"
                      strokeOpacity="0.4"
                      fill="var(--color-quaternary)"
                      fillOpacity="0.1"
                      className="maze-path maze-layer-4 cursor-pointer animate-breathing"
                    />
                  </Link>

                  {/* Connecting lines */}
                  <line
                    x1="70"
                    y1="10"
                    x2="70"
                    y2="25"
                    stroke="var(--color-primary)"
                    strokeWidth="1.5"
                    strokeOpacity="0.8"
                    className="maze-path maze-layer-1"
                  />
                  <line
                    x1="70"
                    y1="115"
                    x2="70"
                    y2="130"
                    stroke="var(--color-primary)"
                    strokeWidth="1.5"
                    strokeOpacity="0.8"
                    className="maze-path maze-layer-1"
                  />
                  <line
                    x1="10"
                    y1="70"
                    x2="25"
                    y2="70"
                    stroke="var(--color-primary)"
                    strokeWidth="1.5"
                    strokeOpacity="0.8"
                    className="maze-path maze-layer-1"
                  />
                  <line
                    x1="115"
                    y1="70"
                    x2="130"
                    y2="70"
                    stroke="var(--color-primary)"
                    strokeWidth="1.5"
                    strokeOpacity="0.8"
                    className="maze-path maze-layer-1"
                  />

                  {/* Diagonal connectors */}
                  <line
                    x1="40"
                    y1="40"
                    x2="25"
                    y2="25"
                    stroke="var(--color-secondary)"
                    strokeWidth="1.5"
                    strokeOpacity="0.7"
                    className="maze-path maze-layer-2"
                  />
                  <line
                    x1="100"
                    y1="40"
                    x2="115"
                    y2="25"
                    stroke="var(--color-secondary)"
                    strokeWidth="1.5"
                    strokeOpacity="0.7"
                    className="maze-path maze-layer-2"
                  />
                  <line
                    x1="40"
                    y1="100"
                    x2="25"
                    y2="115"
                    stroke="var(--color-secondary)"
                    strokeWidth="1.5"
                    strokeOpacity="0.7"
                    className="maze-path maze-layer-2"
                  />
                  <line
                    x1="100"
                    y1="100"
                    x2="115"
                    y2="115"
                    stroke="var(--color-secondary)"
                    strokeWidth="1.5"
                    strokeOpacity="0.7"
                    className="maze-path maze-layer-2"
                  />

                  {/* Additional maze paths */}
                  <path
                    d="M55 70H40"
                    stroke="var(--color-tertiary)"
                    strokeWidth="1.5"
                    strokeOpacity="0.6"
                    className="maze-path maze-layer-3"
                  />
                  <path
                    d="M100 70H85"
                    stroke="var(--color-tertiary)"
                    strokeWidth="1.5"
                    strokeOpacity="0.6"
                    className="maze-path maze-layer-3"
                  />
                  <path
                    d="M70 55V40"
                    stroke="var(--color-tertiary)"
                    strokeWidth="1.5"
                    strokeOpacity="0.6"
                    className="maze-path maze-layer-3"
                  />
                  <path
                    d="M70 100V85"
                    stroke="var(--color-tertiary)"
                    strokeWidth="1.5"
                    strokeOpacity="0.6"
                    className="maze-path maze-layer-3"
                  />
                </svg>
              </div>

              {/* Inner circle with no fill, just text */}
              <div className="w-[130px] h-[130px] rounded-full flex items-center justify-center"></div>
            </div>
          </div>
        </div>

        <div className="flex flex-col h-full py-8 px-4 sm:px-8 relative z-20">
          <div className="flex flex-col h-auto">
            {/* Top section with title and in-development */}
            <div className="flex flex-col lg:flex-row justify-between w-full pt-[80px] gap-8">
              {/* Left column with title and Custom Solutions */}
              <div className="flex flex-col gap-8 max-w-full lg:max-w-[420px]">
                <div className="titles-container flex flex-col gap-[16px] relative">
                  <div className="absolute inset-0 -m-4 blur-sm bg-black/20 rounded-xl backdrop-opacity-10" />
                  <h4 className="text-white font-primary relative">
                    Kea Logic
                  </h4>
                  <h1 className="text-xl md:text-3xl font-primary font-normal tracking-tight text-white mb-6">
                    Custom websites that solve business challenges.
                  </h1>
                </div>

                {/* Custom Solutions section - moved here */}
                <div className="border border-white/20 rounded-lg p-4 sm:p-6 bg-black/40 backdrop-blur-sm overflow-hidden relative">
                  <h3 className="text-white font-primary text-xl sm:text-2xl mb-3 sm:mb-5 border-b border-white/20 pb-3">
                    Custom Solutions
                  </h3>
                  <ul className="text-white/80 font-primary space-y-2 sm:space-y-3">
                    {[
                      {
                        text: "Custom Checkout Systems",
                        color: "var(--color-primary)",
                      },
                      {
                        text: "Booking & Reservation Flows",
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
                    ].map((solution, index) => (
                      <li
                        key={index}
                        className="flex items-center text-base sm:text-lg"
                      >
                        <span
                          className="inline-block w-2 h-2 rounded-full mr-3"
                          style={{ backgroundColor: solution.color }}
                        ></span>
                        {solution.text}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right sidebar */}
              <div className="w-full lg:w-[350px] lg:mr-8 flex flex-col gap-6">
                {/* In Development Section - hidden on mobile */}
                <div className="hidden md:block in-development-container relative border border-white/20 rounded-lg p-4 bg-black/40 backdrop-blur-sm overflow-hidden">
                  {/* Animated border glow effect */}
                  <div className="absolute inset-0 -z-10 animate-pulse">
                    <div className="absolute inset-0 bg-black blur-sm"></div>
                  </div>

                  <h3 className="text-white font-primary text-lg mb-3 border-b border-white/20 pb-2">
                    In Development
                  </h3>

                  <div className="project-card mb-3">
                    <h4 className="text-white font-primary text-base mb-4">
                      {data?.inDevelopment?.title || "Project Horizon"}
                    </h4>

                    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                      <DialogTrigger asChild>
                        {data?.inDevelopment?.mainImage ||
                        data?.inDevelopment?.coverImage ? (
                          <div className="relative h-28 w-full rounded-md overflow-hidden mb-4 cursor-pointer hover:opacity-90 transition-opacity">
                            <Image
                              src={urlForImage(
                                data.inDevelopment.mainImage ||
                                  data.inDevelopment.coverImage
                              ).url()}
                              alt={
                                data.inDevelopment.title || "Current project"
                              }
                              fill
                              priority
                              className="object-cover"
                              onError={() => setHasImageError(true)}
                            />
                          </div>
                        ) : (
                          data?.heroImage && (
                            <div className="relative h-28 w-full rounded-md overflow-hidden mb-4 cursor-pointer hover:opacity-90 transition-opacity">
                              <Image
                                src={urlForImage(data.heroImage).url()}
                                alt="Current project"
                                fill
                                priority
                                className="object-cover"
                                onError={() => setHasImageError(true)}
                              />
                            </div>
                          )
                        )}
                      </DialogTrigger>

                      <SimpleDialogContent
                        className="dialog-content"
                        title={data?.inDevelopment?.title || "Project Details"}
                      >
                        <div className="flex flex-col gap-4">
                          <div className="relative h-60 w-full rounded-md overflow-hidden mb-4">
                            <Image
                              src={urlForImage(
                                data?.inDevelopment?.mainImage ||
                                  data?.inDevelopment?.coverImage ||
                                  data?.heroImage
                              ).url()}
                              alt={
                                data?.inDevelopment?.title || "Current project"
                              }
                              fill
                              className="object-cover"
                            />
                          </div>

                          <div className="space-y-4">
                            {typeof data?.inDevelopment?.description ===
                            "object" ? (
                              <div className="text-white/80 font-primary">
                                <PortableText
                                  value={
                                    data.inDevelopment
                                      .description as PortableTextBlock[]
                                  }
                                  components={{
                                    block: {
                                      normal: ({ children }) => {
                                        return (
                                          <p className="mb-4 font-primary">
                                            {children}
                                          </p>
                                        );
                                      },
                                      h1: ({ children }) => (
                                        <h1 className="text-xl font-primary mb-4">
                                          {children}
                                        </h1>
                                      ),
                                      h2: ({ children }) => (
                                        <h2 className="text-lg font-primary mb-3">
                                          {children}
                                        </h2>
                                      ),
                                    },
                                    list: {
                                      bullet: ({ children }) => (
                                        <ul className="list-disc pl-5 mb-4 space-y-2">
                                          {children}
                                        </ul>
                                      ),
                                      number: ({ children }) => (
                                        <ol className="list-decimal pl-5 mb-4 space-y-2">
                                          {children}
                                        </ol>
                                      ),
                                    },
                                    listItem: {
                                      bullet: ({ children }) => (
                                        <li className="mb-2 font-primary">
                                          {children}
                                        </li>
                                      ),
                                      number: ({ children }) => (
                                        <li className="mb-2 font-primary">
                                          {children}
                                        </li>
                                      ),
                                    },
                                    marks: {
                                      link: ({ value, children }) => {
                                        const target = (
                                          value?.href || ""
                                        ).startsWith("http")
                                          ? "_blank"
                                          : undefined;
                                        return (
                                          <a
                                            href={value?.href}
                                            target={target}
                                            rel={
                                              target === "_blank"
                                                ? "noopener noreferrer"
                                                : undefined
                                            }
                                            className="text-primary hover:underline"
                                          >
                                            {children}
                                          </a>
                                        );
                                      },
                                      strong: ({ children }) => (
                                        <strong className="font-semibold">
                                          {children}
                                        </strong>
                                      ),
                                      em: ({ children }) => (
                                        <em className="italic">{children}</em>
                                      ),
                                    },
                                  }}
                                />
                              </div>
                            ) : (
                              <p className="text-white/80 font-primary">
                                {getProjectDescription()}
                              </p>
                            )}

                            <p className="text-white/60 font-primary text-sm">
                              Category:{" "}
                              <span className="px-2 py-1 bg-black/40 border border-white/20 rounded-md text-white/70 inline-block mt-1">
                                {data?.inDevelopment?.workType?.title ||
                                  "Booking System"}
                              </span>
                            </p>
                          </div>

                          <Button
                            variant="outline"
                            className="mt-4 self-end"
                            onClick={() => setDialogOpen(false)}
                          >
                            Close
                          </Button>
                        </div>
                      </SimpleDialogContent>
                    </Dialog>
                  </div>

                  <div className="sanity-reference mt-3 pt-3 border-t border-white/20">
                    <p className="text-white/50 font-primary text-xs flex items-center">
                      <span className="inline-block w-2 h-2 bg-primary rounded-full mr-2 animate-pulse"></span>
                      <span className="px-2 py-1 bg-black/40 border border-white/20 rounded-md text-white/70">
                        {data?.inDevelopment?.workType?.title ||
                          "Booking System"}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Tech Stack */}
                <TechStack />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
