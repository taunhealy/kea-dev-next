"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/app/components/ui/button";
import { gsap } from "gsap";
import { Info as InfoIcon } from "lucide-react";

interface ImageSliderProps {
  images: { url: string }[];
}

export function ImageSlider({ images }: ImageSliderProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [resetTimer, setResetTimer] = useState(0);
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const factBubbleRef = useRef<HTMLDivElement>(null);
  const factIconRef = useRef<HTMLDivElement>(null);
  const factContentRef = useRef<HTMLDivElement>(null);

  // Array of colors for thumbnails from our color system
  const thumbnailColors = [
    "var(--color-primary)",
    "var(--color-secondary)",
    "var(--color-tertiary)",
    "var(--color-quaternary)",
  ];

  // Array of Kea bird facts
  const keaFacts = [
    "Kea are the world's only alpine parrot species.",
    "Kea are known for their intelligence and curiosity.",
    "Kea can solve complex puzzles and use tools.",
    "Kea birds are endemic to New Zealand's South Island.",
    "Kea have been observed moving traffic cones on roads.",
    "Kea have bright orange feathers under their wings that flash during flight.",
    "Kea are omnivorous and have a diverse diet including plants, insects, and even sheep fat.",
    "The name 'Kea' comes from the sound of their call - a loud 'keee-aaa'.",
    "Kea are endangered with only 3,000-7,000 birds remaining in the wild.",
    "Kea can live up to 20 years in the wild, making them one of the longer-lived parrot species.",
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

  // Animation for fact bubble
  useEffect(() => {
    if (
      !factBubbleRef.current ||
      !factIconRef.current ||
      !factContentRef.current
    )
      return;

    const animateFactBubble = () => {
      const tl = gsap.timeline();

      // Initial state
      gsap.set(factBubbleRef.current, { scale: 0, opacity: 0 });
      gsap.set(factIconRef.current, { scale: 1, opacity: 1 });
      gsap.set(factContentRef.current, { opacity: 0 });

      // Animation sequence
      tl.to(factBubbleRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: "back.out(1.7)",
      })
        .to(
          factIconRef.current,
          {
            scale: 0.7,
            opacity: 0.7,
            duration: 0.3,
          },
          "-=0.2"
        )
        .to(
          factContentRef.current,
          {
            opacity: 1,
            duration: 0.3,
          },
          "-=0.1"
        )
        .to({}, { duration: 5 }) // Display for 5 seconds
        .to(factBubbleRef.current, {
          scale: 0,
          opacity: 0,
          duration: 0.5,
          ease: "back.in(1.7)",
          onComplete: () => {
            // Move to next fact
            setCurrentFactIndex((prev) => (prev + 1) % keaFacts.length);
          },
        });

      return tl;
    };

    const masterTimeline = gsap.timeline({ repeat: -1, repeatDelay: 3 });
    masterTimeline.add(animateFactBubble());

    return () => {
      masterTimeline.kill();
    };
  }, [currentFactIndex, keaFacts.length]);

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

      {/* Fact Bubble */}
      <div
        ref={factBubbleRef}
        className="absolute top-2 sm:top-4 left-2 sm:left-4 z-10 bg-black/50 backdrop-blur-md rounded-lg p-3 max-w-[250px] sm:max-w-[300px] transform-origin-center"
      >
        <div className="flex items-start gap-3">
          <div ref={factIconRef} className="flex-shrink-0 mt-0.5">
            <InfoIcon className="w-5 h-5 text-primary" />
          </div>
          <div ref={factContentRef} className="flex-grow">
            <h4 className="text-white font-primary text-sm font-medium mb-1">
              Did You Know?
            </h4>
            <p className="text-white/90 font-primary text-xs">
              {keaFacts[currentFactIndex]}
            </p>
          </div>
        </div>
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
              className={`w-12 h-12 sm:w-10 sm:h-10 rounded-sm transition-all duration-300 overflow-hidden relative ${
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
                sizes="(max-width: 640px) 48px, 40px"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
