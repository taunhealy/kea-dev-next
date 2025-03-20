"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { urlForImage } from "@/lib/urlForImage";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/app/components/ui/tooltip";

export default function WorkDetailTabs({ work }: { work: any }) {
  const [activeTab, setActiveTab] = useState("core");
  const sectionRefs = {
    core: useRef<HTMLDivElement>(null),
    brand: useRef<HTMLDivElement>(null),
    design: useRef<HTMLDivElement>(null),
    development: useRef<HTMLDivElement>(null),
  };
  const navbarRef = useRef<HTMLDivElement>(null);

  const getColor = (index: number) => {
    const colors = [
      "var(--color-primary)",
      "var(--color-secondary)",
      "var(--color-tertiary)",
    ];
    return colors[index % colors.length];
  };

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
    return Boolean(work?.webDesign?.designSystem);
  };

  const hasDevelopmentSectionData = () => {
    return Boolean(work?.webDevelopment?.features?.length);
  };

  const tabs = [
    { id: "core", name: "Core", hasData: hasCoreSectionData() },
    { id: "brand", name: "Brand", hasData: hasBrandSectionData() },
    { id: "design", name: "Design", hasData: hasDesignSectionData() },
    {
      id: "development",
      name: "Development",
      hasData: hasDevelopmentSectionData(),
    },
  ].filter((tab) => tab.hasData);

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
      for (const tab of tabs) {
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
  }, [tabs]);

  return (
    <div className="container-large py-16">
      {/* Sticky Navbar */}
      <div
        ref={navbarRef}
        className="sticky top-0 z-50 bg-black py-4 border-b border-white/10"
      >
        <div className="grid grid-cols-4 gap-2 bg-black border border-white/20 p-1 rounded-full max-w-2xl mx-auto">
          {tabs.map((tab, index) => (
            <button
              key={tab.id}
              onClick={() => scrollToSection(tab.id)}
              className={`font-primary text-sm rounded-full transition-all py-2 px-4 border-2
                ${
                  activeTab === tab.id
                    ? "text-white"
                    : "text-white/60 hover:bg-white/10 border-transparent"
                }`}
              style={{
                borderColor:
                  activeTab === tab.id ? getColor(index) : "transparent",
              }}
            >
              {tab.name}
            </button>
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
            className="scroll-mt-24"
          >
            <h2 className="text-2xl font-primary font-medium mb-8">Core</h2>
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
                            className="px-3 py-1.5 rounded-full bg-white/10 text-sm"
                            style={{ border: `1px solid ${getColor(i)}` }}
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
            ref={sectionRefs.brand}
            id="brand-section"
            className="scroll-mt-24"
          >
            <h2 className="text-2xl font-primary font-medium mb-8">Brand</h2>
            <div className="space-y-12 font-primary">
              <SectionBlock
                title={work?.brandDevelopment?.purpose?.title}
                content={work?.brandDevelopment?.purpose?.description}
                color={getColor(0)}
              />
              <SectionBlock
                title={work?.brandDevelopment?.audience?.title}
                content={work?.brandDevelopment?.audience?.description}
                color={getColor(1)}
              />
              <ArraySection
                title="Brand Archetypes"
                items={work?.brandDevelopment?.archetypes}
                color={getColor(2)}
              />
              <ArraySection
                title="Brand Mood"
                items={work?.brandDevelopment?.mood}
                color={getColor(3)}
              />
            </div>
            <div className="mt-24 border-b border-white/10"></div>
          </div>
        )}

        {/* Web Design Section */}
        {hasDesignSectionData() && (
          <div
            ref={sectionRefs.design}
            id="design-section"
            className="scroll-mt-24"
          >
            <h2 className="text-2xl font-primary font-medium mb-8">Design</h2>
            {work?.webDesign?.designSystem && (
              <div className="font-primary space-y-8">
                <div className="space-y-4">
                  <h3 className="text-xl font-medium">
                    {work.webDesign.designSystem.title}
                  </h3>
                  <p className="text-white/60 max-w-2xl">
                    {work.webDesign.designSystem.description}
                  </p>
                </div>

                {work.webDesign.designSystem.media && (
                  <MediaPreview media={work.webDesign.designSystem.media} />
                )}

                {work.webDesign.designSystem.link && (
                  <a
                    href={work.webDesign.designSystem.link}
                    target="_blank"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                  >
                    <span>View Design System</span>
                    <ArrowIcon />
                  </a>
                )}
              </div>
            )}
            <div className="mt-24 border-b border-white/10"></div>
          </div>
        )}

        {/* Web Development Section */}
        {hasDevelopmentSectionData() && (
          <div
            ref={sectionRefs.development}
            id="development-section"
            className="scroll-mt-24"
          >
            <h2 className="text-2xl font-primary font-medium mb-8">
              Development
            </h2>
            <div className="grid md:grid-cols-2 gap-8 font-primary">
              {work?.webDevelopment?.features?.map(
                (feature: any, i: number) => (
                  <div
                    key={i}
                    className="p-6 rounded-xl bg-white/5 border border-white/10"
                  >
                    <div className="space-y-4">
                      <h3 className="text-xl font-medium">{feature.title}</h3>
                      <p className="text-white/60">{feature.description}</p>
                      {feature.media && <MediaPreview media={feature.media} />}
                      {feature.link && (
                        <a
                          href={feature.link}
                          target="_blank"
                          className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
                        >
                          <span>View Feature</span>
                          <ArrowIcon />
                        </a>
                      )}
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

// Helper components
const DetailItem = ({ label, value }: { label: string; value?: string }) =>
  value && (
    <div>
      <span className="text-sm text-white/60">{label}</span>
      <p className="text-lg">{value}</p>
    </div>
  );

const SectionBlock = ({
  title,
  content,
  color,
}: {
  title?: string;
  content?: string;
  color: string;
}) =>
  title &&
  content && (
    <div className="border-l-4 pl-6" style={{ borderColor: color }}>
      <h3 className="text-xl font-medium mb-2">{title}</h3>
      <p className="text-white/60">{content}</p>
    </div>
  );

const ArraySection = ({
  title,
  items,
  color,
}: {
  title: string;
  items?: any[];
  color: string;
}) =>
  items?.length ? (
    <div>
      <h3 className="text-xl font-medium mb-6">{title}</h3>
      <div className="grid md:grid-cols-2 gap-6">
        {items.map((item, i) => (
          <div
            key={i}
            className="p-6 rounded-xl bg-black border border-white/10"
            style={{ borderColor: color + "30" }}
          >
            <h4 className="font-medium mb-2">{item.title}</h4>
            <p className="text-white/60">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  ) : null;

const MediaPreview = ({ media }: { media?: any }) => {
  if (!media?.asset?.mimeType) return null;

  return (
    <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10">
      {media.asset.mimeType.startsWith("video/") ? (
        <video controls className="w-full h-full object-cover">
          <source src={media.asset.url} type={media.asset.mimeType} />
        </video>
      ) : (
        <Image
          src={urlForImage(media).url()}
          alt="Media preview"
          fill
          className="object-cover"
        />
      )}
    </div>
  );
};

const ArrowIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2.66675 8H13.3334"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9 4L13.3333 8L9 12"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
