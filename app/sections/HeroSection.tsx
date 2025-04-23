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
import InDevelopment from "@/app/components/InDevelopment";

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
  inDevelopmentItems?: Array<{
    _type: string;
    _key: string;
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
    figmaUrl?: string;
  }>;
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
  const mazeRef = useRef(null);

  // Add GSAP version check here
  useEffect(() => {
    console.log("GSAP version:", gsap.version);
  }, []);

  // Add pyramid animation
  useEffect(() => {
    const pyramidLayers = document.querySelectorAll(".pyramid-path");

    if (pyramidLayers.length) {
      // Set initial state - all layers invisible
      gsap.set(pyramidLayers, { opacity: 0, visibility: "hidden" });

      // Create staggered animation
      gsap
        .timeline()
        .to(".pyramid-layer-1", {
          opacity: 0.8,
          visibility: "visible",
          duration: 0.8,
          ease: "power2.out",
          delay: 0.5,
        })
        .to(
          ".pyramid-layer-2",
          {
            opacity: 0.7,
            visibility: "visible",
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.4"
        )
        .to(
          ".pyramid-layer-3",
          {
            opacity: 0.6,
            visibility: "visible",
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.4"
        )
        .to(
          ".pyramid-layer-4",
          {
            opacity: 0.4,
            visibility: "visible",
            duration: 0.8,
            ease: "power2.out",
            onComplete: () => {
              // Add the breathing animation class after fade-in
              document
                .querySelector(".pyramid-layer-4")
                ?.classList.add("animate-breathing");
            },
          },
          "-=0.4"
        );
    }
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
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-20 hidden md:block">
          {/* Glass effect container - removed border and changed background */}
          <div className="relative rounded-xl backdrop-blur-md bg-black/20 p-8">
            <div className="flex flex-col items-center space-y-8">
              {/* Pyramid removed */}

              {/* Brand title and subtitle */}
              <div className="flex flex-col items-center space-y-3">
                <div className="flex flex-col items-center">
                  <h1 className="text-white font-primary text-2xl sm:text-[16px] font-normal tracking-[-0.02em] leading-tight mb-3">
                    Kea Logic
                  </h1>
                  <div className="w-full border-b border-white/20 mb-3"></div>

                  <div className="flex flex-col items-center space-y-3">
                    <h2 className="text-white/80 font-primary text-base sm:text-[24px] tracking-[-0.015em] leading-snug">
                      Web Architecture
                    </h2>
                    <div className="w-full border-b border-white/20 mb-3"></div>
                    <span className="px-2 py-1 text-[12px] bg-black/40 border border-white/20 rounded-md text-white/70">
                      Design & Development
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col h-full py-8 px-4 sm:px-8 md:px-12 lg:px-20 relative z-20">
          <div className="flex flex-col h-full md:justify-center justify-start pt-20 md:pt-0 max-w-7xl mx-auto w-full">
            {/* Top section with title and in-development */}
            <div className="flex flex-col lg:flex-row justify-between items-center w-full gap-8">
              {/* Left column with title and Custom Solutions */}
              <div className="flex flex-col gap-8 max-w-full lg:max-w-[420px]">
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
                        className="flex items-center text-base text-[16px]"
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

              {/* Center pyramid and titles are already positioned absolutely */}

              {/* Right sidebar */}
              <div className="w-full lg:w-[350px] flex flex-col gap-6">
                {/* In Development Section - now as a component */}
                <InDevelopment
                  inDevelopment={data?.inDevelopment}
                  inDevelopmentItems={data?.inDevelopmentItems}
                  fallbackImage={data?.heroImage}
                />

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
