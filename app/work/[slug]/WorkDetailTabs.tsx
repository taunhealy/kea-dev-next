"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/app/components/ui/tooltip";
import { Button } from "@/app/components/ui/button";
import {
  CATEGORY_COLORS,
  CategoryColor,
  getColorForCategory,
} from "@/app/constants/colors";

interface MediaAsset {
  _id: string;
  url: string;
  originalFilename: string;
  mimeType: string;
}

interface MediaItem {
  asset: MediaAsset;
}

export default function WorkDetailTabs({ work }: { work: any }) {
  const [activeTab, setActiveTab] = useState("core");
  const sectionRefs = {
    core: useRef<HTMLDivElement>(null),
    "brand-identity": useRef<HTMLDivElement>(null),
    "web-design": useRef<HTMLDivElement>(null),
    "web-development": useRef<HTMLDivElement>(null),
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
    return Boolean(work?.webDesign?.length > 0);
  };

  const hasDevelopmentSectionData = () => {
    return Boolean(work?.webDevelopment?.features?.length);
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
  ] as const;

  // Get color for tab based on tab ID
  const getTabColor = (tabId: string): string => {
    if (tabId === "core") return "white";
    return CATEGORY_COLORS[tabId as keyof typeof CATEGORY_COLORS] || "white";
  };

  // Scroll to section when tab is clicked
  const scrollToSection = (tabId: string) => {
    setActiveTab(tabId);
    const sectionRef = sectionRefs[tabId as keyof typeof sectionRefs];
    if (sectionRef?.current) {
      const navbarHeight = navbarRef.current?.offsetHeight || 0;
      const sectionTop = sectionRef.current.offsetTop - navbarHeight - 20;
      window.scrollTo({ top: sectionTop, behavior: "smooth" });
    }
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
    <div className="container-large py-16">
      {/* Sticky Navbar */}
      <div
        ref={navbarRef}
        className="sticky top-0 z-50 bg-black/90 backdrop-blur-sm py-4 border-b border-white/10"
      >
        <div className="grid grid-cols-4 gap-2 bg-black/80 border border-white/20 p-1 rounded-full max-w-2xl mx-auto">
          {ALL_TABS.map((tab) => (
            <TooltipProvider key={tab.id}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => tab.hasData && scrollToSection(tab.id)}
                    className={`font-primary text-sm rounded-full transition-all py-2 px-4 border-2
                      ${
                        tab.hasData
                          ? activeTab === tab.id
                            ? "text-white"
                            : "text-white/60 hover:bg-white/10 border-transparent"
                          : "text-white/30 cursor-not-allowed border-transparent"
                      }`}
                    style={{
                      borderColor:
                        activeTab === tab.id && tab.hasData
                          ? getTabColor(tab.id)
                          : "transparent",
                      boxShadow:
                        activeTab === tab.id && tab.hasData
                          ? `0 0 10px rgba(${getTabColor(tab.id).replace(/[^\d,]/g, "")}, 0.3)`
                          : "none",
                    }}
                  >
                    {tab.name}
                  </button>
                </TooltipTrigger>
                {!tab.hasData && (
                  <TooltipContent>
                    <p className="font-primary text-sm">
                      No {tab.name.toLowerCase()} information available
                    </p>
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </div>

      {/* Content Sections */}
      <div className="mt-12 space-y-24">
        {/* Core Section */}
        {hasCoreSectionData() && (
          <div
            ref={sectionRefs.core}
            id="core-section"
            className="scroll-mt-24 transition-all duration-300 ease-in-out"
          >
            <h2 className="text-2xl font-primary font-medium mb-8 flex items-center">
              <span
                className="inline-block w-3 h-3 rounded-full mr-3"
                style={{ backgroundColor: "white" }}
              ></span>
              Core
            </h2>
            <div className="grid md:grid-cols-2 gap-8 font-primary">
              <div className="space-y-6">
                <DetailItem label="Producer" value={work?.core?.producerName} />
                <DetailItem label="Client" value={work?.core?.clientName} />
                <DetailItem
                  label="Project Title"
                  value={work?.core?.projectTitle}
                />
              </div>
              <div className="space-y-6">
                <DetailItem
                  label="Category"
                  value={work?.core?.projectCategory}
                />
                <DetailItem
                  label="Challenge"
                  value={work?.core?.projectChallenge}
                />
                {work?.core?.projectTechStack?.length > 0 && (
                  <div>
                    <h3 className="text-lg font-medium mb-3">Tech Stack</h3>
                    <div className="flex flex-wrap gap-2">
                      {work?.core?.projectTechStack.map(
                        (tech: string, i: number) => (
                          <span
                            key={i}
                            className="tech-stack-item"
                            style={{
                              borderColor: "white",
                            }}
                          >
                            {tech}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="mt-24 border-b border-white/10"></div>
          </div>
        )}

        {/* Brand Development Section */}
        {hasBrandSectionData() && (
          <div
            ref={sectionRefs["brand-identity"]}
            id="brand-section"
            className="scroll-mt-24 transition-all duration-300 ease-in-out"
          >
            <h2 className="text-2xl font-primary font-medium mb-8 flex items-center">
              <span
                className="inline-block w-3 h-3 rounded-full mr-3"
                style={{ backgroundColor: CATEGORY_COLORS["brand-identity"] }}
              ></span>
              Brand
            </h2>
            <div className="grid md:grid-cols-2 gap-8 font-primary">
              <div className="space-y-6">
                <SectionBlock
                  title="Purpose"
                  content={`${work?.brandDevelopment?.purpose?.title}\n${work?.brandDevelopment?.purpose?.description}`}
                  color={CATEGORY_COLORS["brand-identity"]}
                />
              </div>
              <div className="space-y-6">
                <SectionBlock
                  title="Audience"
                  content={`${work?.brandDevelopment?.audience?.title}\n${work?.brandDevelopment?.audience?.description}`}
                  color={CATEGORY_COLORS["brand-identity"]}
                />
              </div>
            </div>
            <div className="mt-12 border-t border-white/5 pt-12">
              <ArraySection
                title="Associations"
                items={work?.brandDevelopment?.archetypes}
                color={CATEGORY_COLORS["brand-identity"]}
              />
              <div className="border-t border-white/5 my-12"></div>
              <ArraySection
                title="Brand Mood"
                items={work?.brandDevelopment?.mood}
                color={CATEGORY_COLORS["brand-identity"]}
              />
            </div>
            <div className="mt-24 border-b border-white/10"></div>
          </div>
        )}

        {/* Web Design Section */}
        {hasDesignSectionData() && (
          <div
            ref={sectionRefs["web-design"]}
            id="design-section"
            className="scroll-mt-24 transition-all duration-300 ease-in-out"
          >
            <h2 className="text-2xl font-primary font-medium mb-8 flex items-center">
              <span
                className="inline-block w-3 h-3 rounded-full mr-3"
                style={{ backgroundColor: CATEGORY_COLORS["web-design"] }}
              ></span>
              Web Design
            </h2>
            <div className="font-primary space-y-12">
              {work?.webDesign?.map((designPage: any, index: number) => (
                <div key={index} className="space-y-8">
                  {index > 0 && (
                    <div className="border-t border-white/5 my-8 pt-8"></div>
                  )}

                  <div className="space-y-4">
                    <h3 className="text-xl font-medium">{designPage.title}</h3>
                    <p className="text-white/60 max-w-2xl">
                      {designPage.description}
                    </p>
                    {designPage.link && (
                      <a
                        href={designPage.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm hover:text-secondary transition-colors"
                        style={{
                          color: CATEGORY_COLORS["web-design"],
                        }}
                      >
                        <span>View More</span>
                        <ArrowIcon />
                      </a>
                    )}
                  </div>

                  {designPage.media && (
                    <MediaPreview
                      media={designPage.media}
                      link={designPage.link}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="mt-24 border-b border-white/10"></div>
          </div>
        )}

        {/* Web Development Section */}
        {hasDevelopmentSectionData() && (
          <div
            ref={sectionRefs["web-development"]}
            id="development-section"
            className="scroll-mt-24 transition-all duration-300 ease-in-out"
          >
            <h2 className="text-2xl font-primary font-medium mb-8 flex items-center">
              <span
                className="inline-block w-3 h-3 rounded-full mr-3"
                style={{ backgroundColor: CATEGORY_COLORS["web-development"] }}
              ></span>
              Web Development
            </h2>
            <div className="space-y-12">
              {work?.webDevelopment?.features?.map(
                (feature: any, i: number) => (
                  <div key={i}>
                    {i > 0 && (
                      <div className="border-t border-white/5 my-12"></div>
                    )}
                    <div className="grid md:grid-cols-2 gap-8">
                      {/* Feature Content */}
                      <div className="p-6 rounded-xl bg-black border border-white/10">
                        <div className="space-y-4">
                          <h3 className="text-xl font-medium">
                            {feature.title}
                          </h3>
                          <p className="text-white/60">{feature.description}</p>
                          {feature.link && (
                            <a
                              href={feature.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 text-sm hover:text-secondary transition-colors"
                              style={{
                                color: CATEGORY_COLORS["web-development"],
                              }}
                            >
                              <span>View More</span>
                              <ArrowIcon />
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Feature Media Slider Placeholder */}
                      <div className="relative">
                        {feature.media && feature.media.length > 0 ? (
                          <FeatureMediaSlider
                            media={feature.media}
                            color={CATEGORY_COLORS["web-development"]}
                            link={feature.link}
                          />
                        ) : (
                          <div className="relative aspect-video rounded-xl border border-white/10 bg-black">
                            <div className="absolute inset-0 flex items-center justify-center text-white/40">
                              No media available
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Helper Components
const DetailItem = ({ label, value }: { label: string; value: string }) => {
  if (!value) return null;
  return (
    <div>
      <h3 className="text-lg font-medium mb-2">{label}</h3>
      <p className="text-white/70">{value}</p>
    </div>
  );
};

const SectionBlock = ({
  title,
  content,
  color,
}: {
  title: string;
  content: string;
  color: string;
}) => {
  if (!content) return null;

  const [heading, ...paragraphs] = content.split("\n").filter(Boolean);

  return (
    <div className="p-8 rounded-xl bg-black border border-white/10">
      <h3 className="text-lg font-medium mb-5">{title}</h3>
      <h4 className="text-xl font-medium mb-4" style={{ color }}>
        {heading}
      </h4>
      {paragraphs.map((paragraph, i) => (
        <p key={i} className="text-white/70 mb-3">
          {paragraph}
        </p>
      ))}
    </div>
  );
};

const ArraySection = ({
  title,
  items,
  color,
}: {
  title: string;
  items: Array<{ title: string; description: string }>;
  color: string;
}) => {
  if (!items || items.length === 0) return null;

  return (
    <div>
      <h3 className="text-lg font-medium mb-6">{title}</h3>
      <div
        className={
          title === "Associations"
            ? "flex flex-wrap gap-3"
            : "grid md:grid-cols-2 gap-6"
        }
      >
        {items.map((item, i) => (
          <div
            key={i}
            className={
              title === "Associations"
                ? "tech-stack-item inline-block"
                : "brand-card"
            }
            style={{ borderColor: color }}
          >
            {title === "Associations" ? (
              item.title
            ) : (
              <>
                <h4 className="font-primary font-medium text-lg mb-3">
                  {item.title}
                </h4>
                <p className="font-primary text-white/70 leading-relaxed">
                  {item.description}
                </p>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const MediaPreview = ({
  media,
  link,
}: {
  media: any; // Using any to accommodate different Sanity file structures
  link?: string;
}) => {
  if (!media || !media.asset?.url) return null;

  return (
    <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10 max-w-3xl mx-auto">
      <Image
        src={media.asset.url}
        alt="Design preview"
        fill
        className="object-contain"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
      {link && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
        >
          <span className="font-primary text-white flex items-center gap-2">
            View Design <ArrowIcon />
          </span>
        </a>
      )}
    </div>
  );
};

const ArrowIcon = ({ className = "" }: { className?: string }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M8 1L15 8L8 15"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15 8H1"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const FeatureMediaSlider = ({
  media,
  color,
  link,
}: {
  media: MediaItem[];
  color: string;
  link?: string;
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  if (!media || media.length === 0) {
    return (
      <div className="relative aspect-video rounded-xl border border-white/10 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center text-white/40">
          Image not available
        </div>
      </div>
    );
  }

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? media.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev === media.length - 1 ? 0 : prev + 1));
  };

  const ImageComponent = (
    <div className="relative h-full transition-opacity duration-500 group">
      {media[currentSlide]?.asset?.url ? (
        <>
          <Image
            src={media[currentSlide].asset.url}
            alt={media[currentSlide].asset.originalFilename || "Feature image"}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          {link && (
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span className="font-primary text-white flex items-center gap-2">
                View Feature <ArrowIcon />
              </span>
            </div>
          )}
        </>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center text-white/40">
          Image not available
        </div>
      )}
    </div>
  );

  return (
    <div className="relative aspect-video rounded-xl border border-white/10 overflow-hidden">
      {/* Current Slide */}
      {link ? (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="block h-full"
          onClick={(e) => e.stopPropagation()} // Prevent navigation when clicking arrows
        >
          {ImageComponent}
        </a>
      ) : (
        ImageComponent
      )}

      {/* Navigation Arrows */}
      <button
        onClick={(e) => {
          e.preventDefault();
          handlePrevSlide();
        }}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors z-10"
        style={{ border: `1px solid ${color}` }}
      >
        <ArrowIcon className="rotate-180" />
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          handleNextSlide();
        }}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors z-10"
        style={{ border: `1px solid ${color}` }}
      >
        <ArrowIcon />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {media.map((_, index) => (
          <div
            key={index}
            className="w-2 h-2 rounded-full bg-white/20 cursor-pointer"
            style={{
              backgroundColor:
                index === currentSlide ? color : "rgba(255,255,255,0.2)",
            }}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setCurrentSlide(index);
            }}
          />
        ))}
      </div>
    </div>
  );
};
