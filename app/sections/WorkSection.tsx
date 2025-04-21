"use client";

import { useState, useEffect, useRef, TouchEvent } from "react";
import type { Work } from "../types/workType";
import gsap from "gsap";
import { urlForImage } from "@/lib/sanity";
import { CATEGORY_COLORS } from "@/app/constants/colors";

const BORDER_WIDTHS = ["3px", "5px", "7px"];

interface WorkSectionProps {
  data?: any;
  works: Work[];
  categories: { title: string; slug: { current: string } }[];
}

// Add these helper functions before your component
const getCategoryColor = (slug: string): string => {
  return CATEGORY_COLORS[slug as keyof typeof CATEGORY_COLORS] || "#ffffff";
};

const getColorByIndex = (index: number): string => {
  const colorKeys = Object.keys(CATEGORY_COLORS);
  const colorKey = colorKeys[index % colorKeys.length];
  return CATEGORY_COLORS[colorKey as keyof typeof CATEGORY_COLORS] || "#ffffff";
};

// MAIN COMPONENT
export default function WorkSection({
  data,
  works,
  categories,
}: WorkSectionProps) {
  // STATE AND REFS
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filteredWorks, setFilteredWorks] = useState<Work[]>([]);
  const [loading, setLoading] = useState(!works || !categories);
  const [error, setError] = useState<string | null>(null);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Check if we need to show scroll indicators
  useEffect(() => {
    setShowScrollIndicator(filteredWorks.length > 3);
    // Reset current slide when filtered works change
    setCurrentSlide(0);
  }, [filteredWorks]);

  // Handle navigation
  const handlePrev = () => {
    setCurrentSlide((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => Math.min(filteredWorks.length - 3, prev + 1));
  };

  // Handle touch events for mobile swiping
  const handleTouchStart = (e: TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setTouchEnd(null);
  };

  const handleTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && currentSlide < filteredWorks.length - 1) {
      handleNext();
    }

    if (isRightSwipe && currentSlide > 0) {
      handlePrev();
    }

    // Reset values
    setTouchStart(null);
    setTouchEnd(null);
  };

  // ANIMATION EFFECT
  useEffect(() => {
    if (!containerRef.current) return;

    const cards = Array.from(containerRef.current.children);

    // Create single timeline for better performance
    const tl = gsap.timeline();

    tl.to(cards, {
      opacity: 0,
      duration: 0.7,
      stagger: 0.02,
      onComplete: () => {
        // Filter works based on category only
        let filtered = works;

        if (selectedCategory) {
          filtered = filtered.filter((work) =>
            work.categories.some((cat) => cat.slug.current === selectedCategory)
          );
        }

        setFilteredWorks(filtered);
      },
    }).to(cards, {
      opacity: 1,
      duration: 0.3,
      stagger: 0.02,
      delay: 0.1,
    });

    return () => {
      tl.kill();
    };
  }, [selectedCategory, works]);

  // Slide animation effect
  useEffect(() => {
    if (!containerRef.current) return;

    // Use a responsive approach with Tailwind breakpoints in mind
    const cardWidth = window.innerWidth >= 768 ? 400 : 280;
    const cardGap = window.innerWidth >= 768 ? 54 : 30;

    gsap.to(containerRef.current, {
      x: -currentSlide * (cardWidth + cardGap),
      duration: 0.5,
      ease: "power2.out",
    });
  }, [currentSlide]);

  useEffect(() => {
    if (!containerRef.current) return;

    const imageContainers = Array.from(
      containerRef.current.querySelectorAll(".work-card-image")
    );
    const cards = Array.from(
      containerRef.current.querySelectorAll(".work-card")
    );

    // Set initial opacity to 0
    gsap.set(imageContainers, { opacity: 0 });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Simple stagger reveal animation
            gsap.to(imageContainers, {
              opacity: 1,
              duration: 0.7,
              stagger: 0.1,
              delay: 0.3,
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    // Observe the container
    observer.observe(containerRef.current);

    // Add hover events to each card
    cards.forEach((card, index) => {
      card.addEventListener("mouseenter", () => {
        gsap.to(imageContainers, {
          opacity: 0.3,
          duration: 0.3,
        });

        gsap.to(imageContainers[index], {
          opacity: 1,
          duration: 0.3,
        });
      });

      card.addEventListener("mouseleave", () => {
        gsap.to(imageContainers, {
          opacity: 1,
          duration: 0.3,
        });
      });
    });

    return () => {
      observer.disconnect();
      cards.forEach((card) => {
        card.removeEventListener("mouseenter", () => {});
        card.removeEventListener("mouseleave", () => {});
      });
    };
  }, [filteredWorks]);

  // Visible works based on current slide
  const visibleWorks = filteredWorks;

  useEffect(() => {
    // Check if we're in a browser environment
    if (typeof window === "undefined") return;

    // Make sure refs are available
    if (!containerRef.current) {
      console.warn("WorkSection: Container ref is null");
      return;
    }

    // Use a timeout to ensure DOM is ready
    const timer = setTimeout(() => {
      try {
        // Add null check here
        if (!containerRef.current) return;

        // Select elements using the containerRef as context
        const elements = containerRef.current.querySelectorAll(".work-item");

        if (elements.length === 0) {
          console.warn("WorkSection: No work items found");
          return;
        }

        gsap.set(elements, {
          opacity: 0,
          y: 50,
        });

        gsap.to(elements, {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        });
      } catch (error) {
        console.error("WorkSection animation error:", error);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="flex flex-col min-h-screen md:min-h-[630px] w-full relative overflow-hidden pt-40 md:pt-40 gap-6 md:gap-8 bg-black border-b border-white/10">
      {/* Title and description */}
      <div className="px-6 md:px-8">
        <h1 className="text-xl md:text-3xl font-primary font-normal tracking-tight text-white mb-2 md:mb-3">
          Our Work
        </h1>
        <p className="text-white/60 text-base md:text-lg font-primary max-w-2xl">
          Explore our portfolio of innovative digital solutions. From brand
          identity and web design to full-stack development and media
          production, we create experiences that drive results.
        </p>
      </div>

      {/* FILTER CONTROLS - ONLY CATEGORIES */}
      <div className="flex flex-col md:flex-row gap-4 px-6 md:px-8">
        {/* CATEGORY FILTERS */}
        <div className="work-filter-buttons flex flex-wrap md:flex-nowrap overflow-x-auto md:flex-wrap gap-2 md:gap-4 pb-2 md:pb-0">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full text-white text-sm md:text-base font-primary border border-white/20 transition-all flex items-center gap-2 whitespace-nowrap
              ${!selectedCategory ? "opacity-100" : "opacity-70"}`}
          >
            <div
              className={`w-3 md:w-4 h-2 rounded-full transition-all duration-200
              ${!selectedCategory ? "opacity-100 scale-100" : "opacity-0 scale-0"}`}
              style={{ backgroundColor: "white" }}
            />
            All Categories
          </button>

          {/* Categories buttons - existing code with responsive classes */}
          {categories
            .sort((a, b) => {
              // Get the keys of CATEGORY_COLORS to determine order
              const colorKeys = Object.keys(CATEGORY_COLORS);
              const indexA = colorKeys.indexOf(a.slug.current);
              const indexB = colorKeys.indexOf(b.slug.current);

              // If both categories are in CATEGORY_COLORS, sort by their order
              if (indexA !== -1 && indexB !== -1) {
                return indexA - indexB;
              }
              // If only one is in CATEGORY_COLORS, prioritize it
              if (indexA !== -1) return -1;
              if (indexB !== -1) return 1;
              // Otherwise, fall back to alphabetical sorting
              return a.title.localeCompare(b.title);
            })
            .map((category) => (
              <button
                key={category.slug.current}
                onClick={() => setSelectedCategory(category.slug.current)}
                className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full text-white text-sm md:text-base font-primary border border-white/20 transition-all flex items-center gap-2 group whitespace-nowrap
                  ${selectedCategory === category.slug.current ? "opacity-100" : "opacity-60 hover:opacity-80"}`}
              >
                <div
                  className={`w-2.5 md:w-3 h-2.5 md:h-3 rounded-full transition-all duration-300 ${
                    selectedCategory === category.slug.current
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-0 group-hover:opacity-70 group-hover:scale-100"
                  }`}
                  style={{
                    backgroundColor: getCategoryColor(category.slug.current),
                  }}
                />
                {category.title}
              </button>
            ))}
        </div>
      </div>

      {/* WORK CARDS GRID */}
      <div className="relative w-full overflow-hidden mb-8 md:mb-0">
        <div
          ref={containerRef}
          className="work-items-container min-h-[350px] md:min-h-[586px] flex flex-row flex-wrap justify-center md:justify-start gap-y-[32px] gap-x-[20px] md:gap-[54px] px-6 md:px-8 transition-transform duration-500"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {filteredWorks.map((work, index) => {
            const isTideRaider =
              work.title === "Tide Raider" ||
              work.slug.current === "tide-raider";

            // Get the border color for this card
            const borderColor = selectedCategory
              ? getCategoryColor(selectedCategory)
              : getColorByIndex(index);

            return (
              <a
                key={work.slug.current}
                href={`/work/${work.slug.current}`}
                className="min-w-[280px] w-[280px] md:min-w-[400px] md:w-[400px] group cursor-pointer work-card work-item"
              >
                <div className="relative aspect-[4/3] mb-3 md:mb-4 w-full h-[180px] md:h-[300px] overflow-hidden rounded-lg work-card-image">
                  {/* Pulsing animation border for Tide Raider */}
                  {isTideRaider && (
                    <div
                      className="absolute -inset-1 rounded-lg opacity-75 -z-10 transition-opacity duration-3000 animate-pulse-slow"
                      style={{
                        background: `linear-gradient(45deg, ${borderColor}, var(--color-quaternary), var(--color-tertiary))`,
                        animation: "pulse-opacity 3s ease-in-out infinite",
                      }}
                    ></div>
                  )}

                  {/* Top Feature Badge for Tide Raider */}
                  {isTideRaider && (
                    <div className="absolute top-2 md:top-4 right-2 md:right-4 text-white font-primary text-xs px-2 md:px-3 py-0.5 md:py-1 rounded-full z-10 shadow-lg border border-white">
                      Feature-Rich
                    </div>
                  )}

                  {/* Work Type Badge - bottom right of image */}
                  {work.workType && (
                    <div className="absolute bottom-2 md:bottom-4 right-2 md:right-4 text-white font-primary text-xs px-2 md:px-3 py-0.5 md:py-1 rounded-full z-10 shadow-lg bg-black/50 border border-white/20">
                      {work.workType.title}
                    </div>
                  )}

                  {/* Square Border Container */}
                  <div
                    className="absolute inset-0 border-2 md:border-4 rounded-lg transition-all duration-300 group-hover:border-0 work-card-border"
                    style={{
                      borderColor: borderColor,
                    }}
                  />

                  {/* Image with hover effect */}
                  {work.coverImage && work.coverImage.asset && (
                    <img
                      src={urlForImage(work.coverImage).url()}
                      alt={work.title}
                      className="w-full h-full object-cover scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-[85%] transition-all duration-300"
                    />
                  )}

                  {/* Category indicators */}
                  <div className="absolute top-2 md:top-4 left-2 md:left-4 flex gap-1 md:gap-1.5">
                    {work.categories.map((category) => (
                      <div
                        key={category.slug.current}
                        className="w-2 md:w-3 h-2 md:h-3 rounded-full opacity-40 group-hover:opacity-100 transition-opacity duration-300"
                        style={{
                          backgroundColor: getCategoryColor(
                            category.slug.current
                          ),
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Card Content */}
                <div className="work-card-content relative">
                  <h3 className="text-white text-base md:text-lg font-primary">
                    {work.title}
                  </h3>

                  <p className="text-white/60 mt-1 md:mt-1 line-clamp-2 text-sm md:text-base font-primary">
                    {work.description}
                  </p>
                </div>
              </a>
            );
          })}
        </div>

        {/* Mobile pagination dots - removed since we're not using a slider on mobile */}
        {/* Navigation arrows - visible only on desktop */}
        {showScrollIndicator && (
          <>
            <button
              onClick={handlePrev}
              disabled={currentSlide === 0}
              className={`hidden md:flex absolute left-2 md:left-4 lg:left-10 top-1/2 -translate-y-1/2 z-10 items-center justify-center ${
                currentSlide === 0
                  ? "opacity-30 cursor-not-allowed"
                  : "opacity-100 cursor-pointer"
              }`}
              aria-label="Previous slide"
            >
              <div className="scroll-arrow-indicator flex items-center justify-center bg-black/50 backdrop-blur-sm rounded-full p-2 md:p-3">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="rotate-180 w-5 h-5 md:w-6 md:h-6 text-white"
                >
                  <path
                    d="M9 5L16 12L9 19"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </button>

            <button
              onClick={handleNext}
              disabled={currentSlide >= filteredWorks.length - 3}
              className={`hidden md:flex absolute right-2 md:right-4 lg:right-10 top-1/2 -translate-y-1/2 z-10 items-center justify-center ${
                currentSlide >= filteredWorks.length - 3
                  ? "opacity-30 cursor-not-allowed"
                  : "opacity-100 cursor-pointer"
              }`}
              aria-label="Next slide"
            >
              <div className="scroll-arrow-indicator flex items-center justify-center bg-black/50 backdrop-blur-sm rounded-full p-2 md:p-3">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 md:w-6 md:h-6 text-white"
                >
                  <path
                    d="M9 5L16 12L9 19"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </button>
          </>
        )}
      </div>
    </section>
  );
}
