import { forwardRef, useState } from "react";
import { SectionProps } from "../types";
import Image from "next/image";
import Link from "next/link";

const MediaSection = forwardRef<HTMLDivElement, SectionProps>(
  ({ work, color = "#FFFFFF" }, ref) => {
    // Collect all media items into a single array for the slider
    const allMediaItems =
      work?.mediaContent?.flatMap((mediaItem: any) => {
        if (mediaItem.media) {
          if (Array.isArray(mediaItem.media)) {
            return mediaItem.media.map((item: any) => ({
              ...item,
              title: mediaItem.title,
              description: mediaItem.description,
              link: mediaItem.link,
            }));
          } else {
            return [
              {
                ...mediaItem.media,
                title: mediaItem.title,
                description: mediaItem.description,
                link: mediaItem.link,
              },
            ];
          }
        }
        return [];
      }) || [];

    return (
      <div
        ref={ref}
        id="media-section"
        className="scroll-mt-24 transition-all duration-300 ease-in-out"
      >
        <h2 className="text-2xl font-primary font-medium mb-6 flex items-center">
          <span
            className="inline-block w-3 h-3 rounded-full mr-3"
            style={{ backgroundColor: color }}
          ></span>
          Media
        </h2>

        {allMediaItems.length > 0 && (
          <MediaSlider media={allMediaItems} color={color} />
        )}
      </div>
    );
  }
);

// Helper Components
const MediaSlider = ({ media, color }: { media: any[]; color: string }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % media.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + media.length) % media.length
    );
  };

  if (!media || media.length === 0) return null;

  const currentItem = media[currentIndex];

  return (
    <div className="font-primary space-y-6">
      <div className="space-y-3 min-h-[120px]">
        <h3>{currentItem.title}</h3>
        <p className="text-white/60 max-w-2xl">{currentItem.description}</p>
        {currentItem.link && (
          <a
            href={currentItem.link}
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

      <div className="relative max-w-3xl mx-auto">
        <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10">
          {currentItem.asset?.url && (
            <Image
              src={currentItem.asset.url}
              alt={currentItem.title || `Media slide ${currentIndex + 1}`}
              fill
              className="object-contain rounded-xl"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          )}
          {currentItem.link && (
            <a
              href={currentItem.link}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-xl"
            >
              <span className="font-primary text-white flex items-center gap-2">
                View Media <ArrowIcon />
              </span>
            </a>
          )}
        </div>

        {media.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center hover:bg-black/70 transition-colors"
              aria-label="Previous slide"
            >
              <ArrowIcon className="rotate-180" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center hover:bg-black/70 transition-colors"
              aria-label="Next slide"
            >
              <ArrowIcon />
            </button>

            <div className="flex justify-center gap-2 mt-4">
              {media.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className="w-2 h-2 rounded-full transition-colors"
                  style={{
                    backgroundColor:
                      currentIndex === index
                        ? color
                        : "rgba(255, 255, 255, 0.3)",
                  }}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
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

MediaSection.displayName = "MediaSection";

export default MediaSection;
