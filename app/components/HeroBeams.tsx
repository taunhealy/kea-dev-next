"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import {
  CATEGORY_COLORS,
  CATEGORY_TAILWIND_CLASSES,
} from "@/app/constants/colors";

export default function HeroBeams() {
  const containerRef = useRef<HTMLDivElement>(null);
  const beamsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!containerRef.current) return;

      // Make container visible
      containerRef.current.classList.remove("invisible");

      // Container animation
      gsap.to(containerRef.current, {
        opacity: 1,
        duration: 0.5,
        ease: "power2.inOut",
      });

      // Beam animations
      beamsRef.current.forEach((beam, index) => {
        if (!beam) return;

        const isLeftBeam = index < 5;
        const baseDelay = index * 0.2;

        beam.style.opacity = "0";
        beam.classList.remove("invisible");

        // Regular animation for all beams
        gsap.to(beam, {
          opacity: 1,
          duration: 0.5,
          delay: baseDelay,
        });

        gsap.fromTo(
          beam,
          {
            x: isLeftBeam ? -200 : "100vw",
            y: (index % 10) * 40,
          },
          {
            x: isLeftBeam ? "100vw" : -200,
            duration: isLeftBeam ? 3 : 2,
            ease: "power2.inOut",
            repeat: -1,
            delay: baseDelay,
            yoyo: true,
          }
        );
      });

      // Fade out the entire container after 15 seconds
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 1.5,
        delay: 7,
        ease: "power2.inOut",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Get array of category keys
  const categories = Object.keys(CATEGORY_COLORS) as Array<
    keyof typeof CATEGORY_COLORS
  >;

  return (
    <div
      ref={containerRef}
      className="beams-container absolute inset-0 -z-10 invisible opacity-0"
    >
      {/* Render each category beam multiple times to increase beam count */}
      {Array(5)
        .fill(0)
        .map((_, multiplier) =>
          categories.map((category, i) => {
            const beamStyle = CATEGORY_TAILWIND_CLASSES[category];
            // Create a unique key by combining multiplier and category index
            const uniqueKey = `beam-${multiplier}-${i}`;
            const beamIndex = multiplier * categories.length + i;

            return (
              <div
                key={uniqueKey}
                ref={(el) => {
                  beamsRef.current[beamIndex] = el;
                }}
                className={`beam absolute h-[16px] w-[120px] rounded-lg mix-blend-screen blur-[1px] shadow-lg invisible ${beamStyle.bg} ${beamStyle.shadow}`}
                aria-hidden="true"
              />
            );
          })
        )}
    </div>
  );
}
