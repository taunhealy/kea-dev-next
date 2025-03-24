"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { CATEGORY_COLORS } from "@/app/constants/colors";

export default function HeroBeams() {
  const containerRef = useRef<HTMLDivElement>(null);
  const beamsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!containerRef.current) return;

      const fastWord = document.querySelector(".word-fast");
      const minimalWord = document.querySelector(".word-minimal");
      const contentWord = document.querySelector(".word-content");

      // Make container visible
      containerRef.current.classList.remove("invisible");

      // Container animation
      gsap.to(containerRef.current, {
        opacity: 1,
        duration: 0.5,
        ease: "power2.inOut",
      });

      // Set initial word colors
      gsap.set([fastWord, minimalWord, contentWord], {
        color: "white",
      });

      // Beam animations
      beamsRef.current.forEach((beam, index) => {
        if (!beam) return;

        const isLeftBeam = index < 10; // First 10 beams go left-to-right
        const baseDelay = index * 0.2;

        beam.style.opacity = "0";
        beam.classList.remove("invisible");

        gsap.to(beam, {
          opacity: 1,
          duration: 0.3,
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
            onUpdate: function () {
              const progress = this.progress();
              if (progress > 0.2 && progress < 0.4) {
                if (index % 3 === 0)
                  gsap.to(fastWord, {
                    color: CATEGORY_COLORS["web-design"],
                    duration: 0.3,
                  });
                if (index % 3 === 1)
                  gsap.to(minimalWord, {
                    color: CATEGORY_COLORS["web-development"],
                    duration: 0.3,
                  });
                if (index % 3 === 2)
                  gsap.to(contentWord, {
                    color: CATEGORY_COLORS["brand-identity"],
                    duration: 0.3,
                  });
              } else {
                if (index % 3 === 0)
                  gsap.to(fastWord, {
                    color: "white",
                    duration: 0.5,
                  });
                if (index % 3 === 1)
                  gsap.to(minimalWord, {
                    color: "white",
                    duration: 0.5,
                  });
                if (index % 3 === 2)
                  gsap.to(contentWord, {
                    color: "white",
                    duration: 0.5,
                  });
              }
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="beams-container absolute inset-0 -z-10 invisible opacity-0"
    >
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            beamsRef.current[i] = el;
          }}
          className={`beam absolute h-[16px] w-[120px] rounded-lg mix-blend-screen blur-[1px] shadow-lg invisible
            ${
              i % 3 === 0
                ? "bg-tertiary/90 shadow-tertiary/50"
                : i % 3 === 1
                  ? "bg-quaternary/90 shadow-quaternary/50"
                  : "bg-secondary/90 shadow-secondary/50"
            }`}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}
