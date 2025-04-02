import { forwardRef } from "react";
import { SectionProps } from "../types";
import Image from "next/image";
import Link from "next/link";

const DesignSection = forwardRef<HTMLDivElement, SectionProps>(
  ({ work, color = "#FFFFFF" }, ref) => {
    return (
      <div
        ref={ref}
        id="design-section"
        className="scroll-mt-24 transition-all duration-300 ease-in-out"
      >
        <h2 className="text-2xl font-primary font-medium mb-8 flex items-center">
          <span
            className="inline-block w-3 h-3 rounded-full mr-3"
            style={{ backgroundColor: color }}
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
                <h3 className="">{designPage.title}</h3>
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
                      color: color,
                    }}
                  >
                    <span>View More</span>
                    <ArrowIcon />
                  </a>
                )}
              </div>

              {designPage.media && (
                <MediaPreview media={designPage.media} link={designPage.link} />
              )}
            </div>
          ))}
        </div>
        <div className="mt-24 border-b border-white/10"></div>
      </div>
    );
  }
);

// Helper Components
const MediaPreview = ({ media, link }: { media: any; link?: string }) => {
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

DesignSection.displayName = "DesignSection";

export default DesignSection;
