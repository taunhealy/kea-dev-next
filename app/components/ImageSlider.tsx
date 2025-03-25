"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Button } from "@/app/components/ui/button";

interface ImageSliderProps {
  images: { url: string }[];
}

export function ImageSlider({ images }: ImageSliderProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [resetTimer, setResetTimer] = useState(0);

  // Array of colors for thumbnails from our color system
  const thumbnailColors = [
    "var(--color-primary)",
    "var(--color-secondary)",
    "var(--color-tertiary)",
    "var(--color-quaternary)",
  ];

  useEffect(() => {
    if (!images?.length) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((current) =>
        current === (images?.length ?? 1) - 1 ? 0 : current + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [images?.length, resetTimer]);

  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index);
    setResetTimer((prev) => prev + 1);
  };

  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg">
      {images.map((image, index) => (
        <Image
          key={image.url}
          src={image.url}
          alt={`About Kea Logic ${index + 1}`}
          fill
          className={`object-cover transition-opacity duration-500 absolute top-0 left-0
            ${index === currentImageIndex ? "opacity-100" : "opacity-0"}`}
          priority={index === 0}
        />
      ))}

      {/* Learn More button - top right */}
      <div className="absolute top-2 sm:top-4 right-2 sm:right-4 z-10">
        <Button
          variant="outline"
          size="sm"
          asChild
          className="backdrop-blur-sm bg-black/30 hover:bg-black/50 font-primary text-xs sm:text-sm"
        >
          <a
            href="https://en.wikipedia.org/wiki/Kea"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn More
          </a>
        </Button>
      </div>

      {/* Thumbnail navigation with glass effect */}
      <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 z-10">
        {/* Glass background */}
        <div className="absolute inset-0 bg-black/30 backdrop-blur-md rounded-md -m-2 p-2"></div>

        {/* Thumbnails */}
        <div className="flex gap-1 sm:gap-2 relative">
          {images.map((image, index) => (
            <button
              key={`thumb-${index}`}
              onClick={() => handleThumbnailClick(index)}
              className={`w-8 h-8 sm:w-12 sm:h-12 rounded-sm transition-all duration-300 overflow-hidden relative ${
                index === currentImageIndex
                  ? "ring-2 scale-110"
                  : "ring-1 ring-opacity-30"
              }`}
              style={{
                borderColor:
                  index === currentImageIndex
                    ? thumbnailColors[index % thumbnailColors.length]
                    : "rgba(255, 255, 255, 0.3)",
                boxShadow:
                  index === currentImageIndex
                    ? `0 0 0 1px ${thumbnailColors[index % thumbnailColors.length]}`
                    : "0 0 0 1px rgba(255, 255, 255, 0.3)",
              }}
              aria-label={`View image ${index + 1}`}
            >
              <Image
                src={image.url}
                alt={`Thumbnail ${index + 1}`}
                fill
                className={`object-cover transition-opacity duration-300 ${
                  index === currentImageIndex ? "opacity-80" : "opacity-40"
                }`}
                sizes="(max-width: 640px) 32px, 48px"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
