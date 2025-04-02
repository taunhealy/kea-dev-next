import { useState, useEffect, useRef } from "react";
import type { Work } from "../types/workType";
import gsap from "gsap";
import { client as sanityClient } from "@/lib/sanity";
import { groq } from "next-sanity";

const BORDER_WIDTHS = ["3px", "5px", "7px"];

// Add this interface at the top of your file
interface Props {
  categories: { title: string; slug: { current: string } }[];
}

// MAIN COMPONENT
export default function WorkGallery() {
  // STATE AND REFS
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filteredWorks, setFilteredWorks] = useState<Work[]>([]);
  const [works, setWorks] = useState<Work[]>([]);
  const [categories, setCategories] = useState<Props["categories"]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // DATA FETCHING
  useEffect(() => {
    const fetchData = async () => {
      try {
        const query = groq`
          {
            "works": *[_type == "work"] | order(orderRank) {
              ...,
              categories[]->{ title, slug { current } }
            },
            "categories": *[_type == "category"] | order(title asc) { title, slug { current } }
          }
        `;

        const result = await sanityClient.fetch<{
          works: Work[];
          categories: Props["categories"];
        }>(query);

        setWorks(result.works);
        setCategories(result.categories);
        setFilteredWorks(result.works);
        setError(null);
      } catch (err) {
        setError("Failed to load works");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ANIMATION EFFECT
  useEffect(() => {
    if (!containerRef.current) return;

    const cards = containerRef.current.children;

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

    const imageContainers =
      containerRef.current.querySelectorAll(".work-card-image");
    const cards = containerRef.current.querySelectorAll(".work-card");

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
  }, []);

  return (
    <div className="flex flex-col gap-4 md:gap-8 px-4 md:px-8">
      {/* CATEGORY FILTERS */}
      <div className="work-filter-buttons flex flex-wrap gap-2 md:gap-4">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full text-white text-sm md:text-base border border-white/20 transition-all flex items-center gap-2
            ${!selectedCategory ? "opacity-100" : "opacity-70"}`}
        >
          <div
            className={`indicator-dot w-3 md:w-4 h-1.5 md:h-2 rounded-full bg-white transition-all duration-200
            ${
              !selectedCategory ? "opacity-100 scale-100" : "opacity-0 scale-0"
            }`}
          />
          All
        </button>
        {categories.map((category) => (
          <button
            key={category.slug.current}
            onClick={() => setSelectedCategory(category.slug.current)}
            className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full text-white text-sm md:text-base border border-white/20 transition-all flex items-center gap-2
              ${
                selectedCategory === category.slug.current
                  ? "opacity-100"
                  : "opacity-60 hover:opacity-80"
              }`}
          >
            <div
              className={`w-2 md:w-3 h-2 md:h-3 rounded-full transition-all duration-300
                ${
                  selectedCategory === category.slug.current
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-0"
                }`}
              style={{
                backgroundColor:
                  CATEGORY_COLORS[
                    categories.indexOf(category) % CATEGORY_COLORS.length
                  ],
              }}
            />
            {category.title}
          </button>
        ))}
      </div>

      {/* WORK CARDS GRID */}
      <div
        ref={containerRef}
        className="work-items-container min-h-[586px] flex-1 flex flex-col md:flex-row gap-4 md:gap-[54px] overflow-x-auto scrollbar-thin pb-4 md:pb-0"
      >
        {filteredWorks.map((work) => (
          <a
            key={work.slug.current}
            href={`/work/${work.slug.current}`}
            className="min-w-[280px] md:min-w-[400px] max-w-[280px] md:max-w-[400px] group cursor-pointer flex-shrink-0 work-card"
          >
            <div className="relative aspect-[4/3] mb-3 md:mb-4 w-full h-[300px] overflow-hidden rounded-lg work-card-image">
              {/* Square Border Container */}
              <div
                className="absolute inset-0 border-4 rounded-lg transition-all duration-300 group-hover:border-0 work-card-border"
                style={{
                  borderColor:
                    CATEGORY_COLORS[
                      works.indexOf(work) % CATEGORY_COLORS.length
                    ],
                  borderWidth: "2px",
                }}
              />

              {/* Image with hover effect */}
              <img
                src={work.coverImage.asset.url}
                alt={work.title}
                className="w-full h-full object-cover transition-all duration-300 scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-[85%]"
              />

              {/* Category indicators */}
              <div className="absolute top-4 left-4 flex gap-1.5">
                {work.categories.map((category, index) => (
                  <div
                    key={category.slug.current}
                    className="w-2 h-2 rounded-full border border-white"
                    style={{
                      backgroundColor:
                        CATEGORY_COLORS[index % CATEGORY_COLORS.length],
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Card Content */}
            <h3 className="text-xl font-medium text-white">{work.title}</h3>
            <p className="text-white/60 mt-1 line-clamp-2">
              {work.description}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}
