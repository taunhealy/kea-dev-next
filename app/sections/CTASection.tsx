"use client";

import Link from "next/link";
import { Button } from "@/app/components/ui/button";
import { useEffect, useRef } from "react";

interface CTASectionProps {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
  buttonVariant?: "default" | "outline";
}

export function CTASection({
  title = "Ready to start your project?",
  description = "Let's discuss how we can help bring your vision to life with our expertise in design, development, and digital strategy.",
  buttonText = "Get in Touch",
  buttonLink = "mailto:taunhealy@kealogic.dev",
  buttonVariant = "outline",
}: CTASectionProps) {
  const buttonRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    // Add the pulsing border class
    button.classList.add("cta-pulse-border");

    return () => {
      // Cleanup
      button.classList.remove("cta-pulse-border");
    };
  }, []);

  return (
    <section className="container-large py-16 md:py-24 px-6 md:px-8 border-t border-white/10">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-primary font-normal tracking-tight mb-6">
          {title.includes("project") ? (
            <>
              {title.split("project")[0]}
              <span className="text-color-primary">project</span>
              {title.split("project")[1]}
            </>
          ) : (
            title
          )}
        </h2>
        <p className="text-white/60 font-primary mb-8">{description}</p>
        <Button variant={buttonVariant} size="lg" asChild>
          <a href={buttonLink} ref={buttonRef} className="cta-pulse-border">
            {buttonText}
          </a>
        </Button>
      </div>
    </section>
  );
}
