"use client";

import { useState, useEffect, useRef } from "react";
import type { Work } from "../types/workType";
import gsap from "gsap";
import { urlForImage } from "@/lib/sanity";

const BORDER_WIDTHS = ["3px", "5px", "7px"];

interface WorkSectionProps {
  data?: any;
  works: Work[];
  categories: { title: string; slug: { current: string } }[];
}

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
  const containerRef = useRef<HTMLDivElement>(null);

  // Add console log to debug
  useEffect(() => {
    console.log("Categories:", categories);
    console.log("Works:", works);
  }, [categories, works]);

  // ANIMATION EFFECT
  useEffect(() => {
    if (!containerRef.current) return;

    const cards = Array.from(containerRef.current.children); // Convert HTMLCollection to Array

    // Create single timeline for better performance
    const tl = gsap.timeline();

    tl.to(cards, {
      opacity: 0,
      duration: 0.7,
      stagger: 0.02,
      onComplete: () => {
        if (selectedCategory) {
          const filtered = works.filter((work) =>
            work.categories.some((cat) => cat.slug.current === selectedCategory)
          );
          setFilteredWorks(filtered);
        } else {
          setFilteredWorks(works);
        }
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

  return (
    <section className="flex flex-col min-h-[630px] w-full relative overflow-hidden pt-8 gap-8 bg-black">
      <div className="px-8">
        <h4 className="text-color-primary font-primary">Our Work</h4>
      </div>

      {/* CATEGORY FILTERS */}
      <div className="work-filter-buttons flex flex-wrap gap-4 px-8">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-4 py-2 rounded-full text-white text-base font-primary border border-white/20 transition-all flex items-center gap-2
            ${!selectedCategory ? "opacity-100" : "opacity-70"}`}
        >
          <div
            className={`w-4 h-2 rounded-full bg-white transition-all duration-200
            ${!selectedCategory ? "opacity-100 scale-100" : "opacity-0 scale-0"}`}
          />
          All
        </button>
        {categories.map((category, index) => (
          <button
            key={category.slug.current}
            onClick={() => setSelectedCategory(category.slug.current)}
            className={`px-4 py-2 rounded-full text-white text-base font-primary border border-white/20 transition-all flex items-center gap-2
              ${selectedCategory === category.slug.current ? "opacity-100" : "opacity-60 hover:opacity-80"}`}
          >
            <div
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                selectedCategory === category.slug.current
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-0"
              }`}
              style={{
                backgroundColor:
                  index % 5 === 0
                    ? "var(--color-primary)"
                    : index % 5 === 1
                      ? "var(--color-secondary)"
                      : index % 5 === 2
                        ? "var(--color-tertiary)"
                        : index % 5 === 3
                          ? "var(--brand-highlight)"
                          : "var(--brand-cta)",
              }}
            />
            {category.title}
          </button>
        ))}
      </div>

      {/* WORK CARDS GRID */}
      <div
        ref={containerRef}
        className="work-items-container min-h-[586px] flex-1 flex flex-row gap-[54px] overflow-x-auto scrollbar-thin px-8 pb-8"
      >
        {filteredWorks.map((work, index) => (
          <a
            key={work.slug.current}
            href={`/work/${work.slug.current}`}
            className="min-w-[400px] max-w-[400px] group cursor-pointer flex-shrink-0 work-card"
          >
            <div className="relative aspect-[4/3] mb-4 w-full h-[300px] overflow-hidden rounded-lg work-card-image">
              {/* Square Border Container */}
              <div
                className="absolute inset-0 border-4 rounded-lg transition-all duration-300 group-hover:border-0 work-card-border"
                style={{
                  borderColor:
                    index % 5 === 0
                      ? "var(--color-primary)"
                      : index % 5 === 1
                        ? "var(--color-secondary)"
                        : index % 5 === 2
                          ? "var(--color-tertiary)"
                          : index % 5 === 3
                            ? "var(--brand-highlight)"
                            : "var(--brand-cta)",
                  borderWidth: "2px",
                }}
              />

              {/* Image with hover effect - UPDATED */}
              {work.coverImage && work.coverImage.asset && (
                <img
                  src={urlForImage(work.coverImage).url()}
                  alt={work.title}
                  className="w-full h-full object-cover transition-all duration-300 scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-[85%]"
                />
              )}

              {/* Category indicators */}
              <div className="absolute top-4 left-4 flex gap-1.5">
                {work.categories.map((category, catIndex) => (
                  <div
                    key={category.slug.current}
                    className="w-2 h-2 rounded-full border border-white"
                    style={{
                      backgroundColor:
                        catIndex % 5 === 0
                          ? "var(--color-primary)"
                          : catIndex % 5 === 1
                            ? "var(--color-secondary)"
                            : catIndex % 5 === 2
                              ? "var(--color-tertiary)"
                              : catIndex % 5 === 3
                                ? "var(--brand-highlight)"
                                : "var(--brand-cta)",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Card Content */}
            <h3 className="text-xl font-medium text-white font-primary">
              {work.title}
            </h3>
            <p className="text-white/60 mt-1 line-clamp-2 font-primary">
              {work.description}
            </p>
          </a>
        ))}
      </div>
    </section>
  );
}
