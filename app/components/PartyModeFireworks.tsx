"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface PartyModeFireworksProps {
  isActive: boolean;
}

export default function PartyModeFireworks({
  isActive,
}: PartyModeFireworksProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const fireworksTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Create explosion directly
  const createExplosion = () => {
    if (!containerRef.current || !isActive) return;

    // Clear previous fireworks timeline
    if (fireworksTimelineRef.current) {
      fireworksTimelineRef.current.kill();
    }

    fireworksTimelineRef.current = gsap.timeline();

    // Get brand colors from CSS variables
    const colors = [
      "#22c55e", // Green - hardcoded instead of var
      "#f97316", // Orange - hardcoded instead of var
      "#a855f7", // Purple - hardcoded instead of var
    ];

    // Random position on screen
    const x = Math.floor(Math.random() * 80) + 10; // 10-90% of viewport width
    const y = Math.floor(Math.random() * 60) + 10; // 10-70% of viewport height

    const particles: HTMLDivElement[] = [];
    const particleCount = 30; // More particles for a better effect

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      particle.className = "absolute w-1 h-1 rounded-full";
      particle.style.backgroundColor = colors[i % colors.length];
      particle.style.left = `${x}vw`;
      particle.style.top = `${y}vh`;
      particle.style.zIndex = "9999"; // Ensure high z-index
      containerRef.current.appendChild(particle);
      particles.push(particle);

      // Random direction for each particle
      const angle = Math.PI * 2 * (i / particleCount);
      const distance = 5 + Math.random() * 15;

      // Realistic explosion physics - particles start fast and slow down
      gsap.to(particle, {
        left: `${x + Math.cos(angle) * distance}vw`,
        top: `${y + Math.sin(angle) * distance}vh`,
        opacity: 0,
        scale: 0.5,
        duration: 0.8 + Math.random() * 0.6,
        ease: "power2.out",
        onComplete: () => {
          particle.remove();
        },
      });
    }
  };

  // Create multiple explosions with slight delays
  const createFireworksGroup = () => {
    // Create 3-5 explosions per group
    const explosionCount = Math.floor(Math.random() * 3) + 3;

    for (let i = 0; i < explosionCount; i++) {
      setTimeout(
        () => {
          createExplosion();
        },
        i * (Math.random() * 200 + 100)
      ); // Random delay between explosions in a group
    }
  };

  useEffect(() => {
    // Cleanup function
    const cleanup = () => {
      if (fireworksTimelineRef.current) {
        fireworksTimelineRef.current.kill();
        fireworksTimelineRef.current = null;
      }

      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }

      if (containerRef.current) {
        while (containerRef.current.firstChild) {
          containerRef.current.removeChild(containerRef.current.firstChild);
        }
        containerRef.current.style.visibility = "hidden";
      }
    };

    if (isActive) {
      if (containerRef.current) {
        containerRef.current.style.visibility = "visible";
        containerRef.current.style.opacity = "1";
      }

      // Initial group of explosions
      setTimeout(() => createFireworksGroup(), 100);

      // Create groups of fireworks every 800ms
      intervalRef.current = setInterval(() => {
        createFireworksGroup();
      }, 800);
    } else {
      cleanup();
    }

    return () => {
      cleanup();
    };
  }, [isActive, createFireworksGroup]);

  return (
    <div
      ref={containerRef}
      className="fireworks-container absolute inset-0 z-[9999] pointer-events-none"
      style={{
        visibility: isActive ? "visible" : "hidden",
        opacity: 1,
      }}
    />
  );
}
