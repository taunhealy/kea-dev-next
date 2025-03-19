"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface PartyModeBeamsProps {
  isActive: boolean;
}

export default function PartyModeBeams({ isActive }: PartyModeBeamsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const beamsRef = useRef<(HTMLDivElement | null)[]>([]);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const mountedRef = useRef(false);

  // Generate consistent random values using a seeded approach
  const getRandomValues = (index: number) => {
    // Use a deterministic seed based on the beam index
    const seed = index * 1000;
    return {
      animationDelay: `${-(seed % 2000) / 1000}s`,
      left: `${seed % 100}vw`,
      width: `${60 + (seed % 40)}px`,
    };
  };

  useEffect(() => {
    // Prevent double initialization
    if (mountedRef.current) return;
    mountedRef.current = true;

    if (!containerRef.current) return;

    // Cleanup function to ensure we remove all animations
    const cleanup = () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
        timelineRef.current = null;
      }
      beamsRef.current.forEach((beam) => {
        if (beam) {
          beam.classList.remove("animate-distance-beams");
          beam.style.visibility = "hidden";
        }
      });
      if (containerRef.current) {
        containerRef.current.style.visibility = "hidden";
      }
    };

    if (isActive) {
      cleanup(); // Clean up any existing animations first
      // Create new timeline
      timelineRef.current = gsap.timeline();

      // Reset container visibility
      containerRef.current.style.visibility = "visible";
      containerRef.current.style.opacity = "0";

      // Container animation
      timelineRef.current.to(containerRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.inOut",
      });

      // Beam animations
      beamsRef.current.forEach((beam, index) => {
        if (!beam) return;

        // Reset beam visibility
        beam.style.visibility = "visible";
        beam.style.opacity = "0";

        timelineRef.current?.to(
          beam,
          {
            opacity: 1,
            duration: 0.2,
            delay: index * 0.03,
            onComplete: () => {
              beam.classList.add("animate-distance-beams");
            },
          },
          "<+=0.05"
        );
      });
    } else {
      cleanup();
    }

    return () => {
      cleanup();
      mountedRef.current = false;
    };
  }, [isActive]);

  return (
    <div
      ref={containerRef}
      className="beams-container absolute inset-0 z-[99]"
      style={{ visibility: "hidden" }}
    >
      {Array.from({ length: 20 }).map((_, i) => {
        const randomValues = getRandomValues(i);
        return (
          <div
            key={i}
            ref={(el) => {
              beamsRef.current[i] = el;
            }}
            className={`beam absolute h-[3px] w-[80px] rounded-full 
              ${i % 3 === 0 ? "animate-strobe" : "animate-color-shift"} 
              mix-blend-screen blur-[1px] shadow-lg`}
            style={{
              visibility: "hidden",
              animationDelay: randomValues.animationDelay,
              left: randomValues.left,
              width: randomValues.width,
            }}
          />
        );
      })}
    </div>
  );
}
