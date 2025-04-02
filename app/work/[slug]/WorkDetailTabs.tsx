"use client";

import { useState, useEffect, useRef } from "react";
import { CATEGORY_COLORS, getColorForCategory } from "@/app/constants/colors";
import { WorkProps } from "./types";
import TabNavigation from "@/app/work/[slug]/sections/TabNavigation";
import CoreSection from "@/app/work/[slug]/sections/CoreSection";
import BrandSection from "@/app/work/[slug]/sections/BrandSection";
import DesignSection from "@/app/work/[slug]/sections/DesignSection";
import DevelopmentSection from "@/app/work/[slug]/sections/DevelopmentSection";
import MediaSection from "@/app/work/[slug]/sections/MediaSection";

export default function WorkDetailTabs({ work }: { work: WorkProps }) {
  const [activeTab, setActiveTab] = useState("core");
  const [clickedTab, setClickedTab] = useState<string | null>(null);
  const sectionRefs = {
    core: useRef<HTMLDivElement>(null),
    "brand-identity": useRef<HTMLDivElement>(null),
    "web-design": useRef<HTMLDivElement>(null),
    "web-development": useRef<HTMLDivElement>(null),
    media: useRef<HTMLDivElement>(null),
  };
  const navbarRef = useRef<HTMLDivElement>(null);

  // Simplified helper functions to check if sections have data
  const hasCoreSectionData = () => {
    return Object.values(work?.core || {}).some((value) =>
      Array.isArray(value) ? value.length > 0 : Boolean(value)
    );
  };

  const hasBrandSectionData = () => {
    const { purpose, audience, archetypes, mood } =
      work?.brandDevelopment || {};
    return Boolean(
      (purpose?.title && purpose?.description) ||
        (audience?.title && audience?.description) ||
        archetypes?.length ||
        mood?.length
    );
  };

  const hasDesignSectionData = () => {
    return Boolean(work?.webDesign && work.webDesign.length > 0);
  };

  const hasDevelopmentSectionData = () => {
    return Boolean(work?.webDevelopment?.features?.length);
  };

  const hasMediaSectionData = () => {
    return Boolean(work?.mediaContent && work.mediaContent.length > 0);
  };

  const ALL_TABS = [
    { id: "core", name: "Core", hasData: hasCoreSectionData() },
    { id: "brand-identity", name: "Brand", hasData: hasBrandSectionData() },
    { id: "web-design", name: "Design", hasData: hasDesignSectionData() },
    {
      id: "web-development",
      name: "Development",
      hasData: hasDevelopmentSectionData(),
    },
    { id: "media", name: "Media", hasData: hasMediaSectionData() },
  ] as const;

  // Get color for tab based on tab ID
  const getTabColor = (tabId: string): string => {
    if (tabId === "core") return "white";
    return CATEGORY_COLORS[tabId as keyof typeof CATEGORY_COLORS] || "white";
  };

  // Scroll to section when tab is clicked
  const scrollToSection = (tabId: string) => {
    setActiveTab(tabId);
    setClickedTab(tabId);
    const sectionRef = sectionRefs[tabId as keyof typeof sectionRefs];
    if (sectionRef?.current) {
      const navbarHeight = navbarRef.current?.offsetHeight || 0;
      const sectionTop = sectionRef.current.offsetTop - navbarHeight - 20;
      window.scrollTo({ top: sectionTop, behavior: "smooth" });
    }

    // Clear clicked tab after animation
    setTimeout(() => {
      setClickedTab(null);
    }, 1000);
  };

  // Update active tab based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition =
        window.scrollY + (navbarRef.current?.offsetHeight || 0) + 100;

      // Find the section that is currently in view
      for (const tab of ALL_TABS) {
        const sectionRef = sectionRefs[tab.id as keyof typeof sectionRefs];
        if (sectionRef?.current) {
          const sectionTop = sectionRef.current.offsetTop;
          const sectionBottom = sectionTop + sectionRef.current.offsetHeight;

          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            setActiveTab(tab.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [ALL_TABS]);

  return (
    <div className="container-large py-20">
      {/* Sticky Navbar */}
      <TabNavigation
        ref={navbarRef}
        tabs={ALL_TABS}
        activeTab={activeTab}
        clickedTab={clickedTab}
        getTabBorderColor={getTabColor}
        scrollToSection={scrollToSection}
      />

      {/* Content Sections */}
      <div className="mt-16 space-y-32">
        {/* Core Section */}
        {hasCoreSectionData() && (
          <CoreSection ref={sectionRefs.core} work={work} />
        )}

        {/* Brand Development Section */}
        {hasBrandSectionData() && (
          <BrandSection
            ref={sectionRefs["brand-identity"]}
            work={work}
            color={CATEGORY_COLORS["brand-identity"]}
          />
        )}

        {/* Web Design Section */}
        {hasDesignSectionData() && (
          <DesignSection
            ref={sectionRefs["web-design"]}
            work={work}
            color={CATEGORY_COLORS["web-design"]}
          />
        )}

        {/* Web Development Section */}
        {hasDevelopmentSectionData() && (
          <DevelopmentSection
            ref={sectionRefs["web-development"]}
            work={work}
            color={CATEGORY_COLORS["web-development"]}
          />
        )}

        {/* Media Section */}
        {hasMediaSectionData() && (
          <MediaSection
            ref={sectionRefs.media}
            work={work}
            color={CATEGORY_COLORS.media}
          />
        )}
      </div>
    </div>
  );
}
