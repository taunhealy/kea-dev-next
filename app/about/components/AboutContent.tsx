"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@/app/components/ui/button";

interface AboutContentProps {
  aboutData: {
    title?: string;
    description?: string;
    images?: { url: string }[];
  };
}

export function AboutContent({ aboutData }: AboutContentProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [resetTimer, setResetTimer] = useState(0);

  useEffect(() => {
    if (!aboutData?.images?.length) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((current) =>
        current === (aboutData.images?.length ?? 1) - 1 ? 0 : current + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [aboutData?.images?.length, resetTimer]);

  // Function to handle thumbnail click
  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index);
    setResetTimer((prev) => prev + 1); // Increment to trigger useEffect and reset timer
  };

  // Array of colors for thumbnails from our color system
  const thumbnailColors = [
    "var(--color-primary)",
    "var(--color-secondary)",
    "var(--color-tertiary)",
    "var(--color-quaternary)",
  ];

  return (
    <div className="flex flex-col min-h-screen bg-black">
      {/* Hero Section */}
      <section className="overflow-hidden pt-32">
        <div className="flex flex-col min-h-[600px] relative bg-black">
          <div className="flex flex-col justify-start h-full">
            {/* Title section with consistent padding */}
            <div className="px-8 mb-8">
              <h1 className="text-color-primary text-xl md:text-3xl font-primary font-normal tracking-tight">
                About Us
              </h1>
            </div>

            {/* Content section with consistent padding */}
            <div className="px-8">
              <div className="flex flex-col md:flex-row items-start gap-8 max-w-[1200px]">
                <div className="titles-container flex flex-col gap-8 relative md:w-1/2">
                  <div className="space-y-6">
                    <p className="text-white/60 text-base md:text-lg font-primary leading-relaxed">
                      We&apos;re a small team focused on building effective
                      digital solutions for businesses and organizations.
                    </p>
                    <p className="text-white/60 text-base md:text-lg font-primary leading-relaxed">
                      Named after the Kea, New Zealand&apos;s alpine parrot
                      known for its intelligence and problem-solving abilities.
                      Like our namesake, we approach challenges with creativity
                      and adaptability, finding innovative solutions in complex
                      environments.
                    </p>
                  </div>
                </div>

                <div className="md:w-1/2 flex flex-col gap-6">
                  {aboutData?.images && aboutData.images.length > 0 && (
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
                      {aboutData.images.map(
                        (image: { url: string }, index: number) => (
                          <Image
                            key={image.url}
                            src={image.url}
                            alt={`About Kea Logic ${index + 1}`}
                            fill
                            className={`object-cover transition-opacity duration-500 absolute top-0 left-0
                            ${index === currentImageIndex ? "opacity-100" : "opacity-0"}`}
                            priority={index === 0}
                          />
                        )
                      )}

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
                          {aboutData.images.map((image, index) => (
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
                                    ? thumbnailColors[
                                        index % thumbnailColors.length
                                      ]
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
                                  index === currentImageIndex
                                    ? "opacity-80"
                                    : "opacity-40"
                                }`}
                                sizes="(max-width: 640px) 32px, 48px"
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="container-large py-24 border-t border-white/10">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          <div>
            <h2 className="text-2xl md:text-3xl font-primary font-normal tracking-tight mb-6">
              Our <span className="text-color-primary">Story</span>
            </h2>
            <p className="text-white/60 font-primary mb-8">
              Kea Logic was founded with a clear mission: to solve real business
              challenges through technology. We partner with businesses to build
              elegant digital solutions that address specific pain points and
              create tangible value. Our specialized custom systems streamline
              operations and enhance customer experiences, helping businesses
              reduce costs while maintaining complete control over their digital
              presence.
            </p>
          </div>

          <div className="space-y-8">
            {/* Values */}
            <div className="card">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-black font-primary font-medium">
                  1
                </div>
                <div>
                  <h3 className="font-primary font-medium text-lg mb-2">
                    Solution-Focused
                  </h3>
                  <p className="font-primary text-white/60">
                    We approach every project by first understanding the
                    business challenge, then crafting technology solutions that
                    directly address those specific needs.
                  </p>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[var(--color-secondary)] flex items-center justify-center text-black font-primary font-medium">
                  2
                </div>
                <div>
                  <h3 className="font-primary font-medium text-lg mb-2">
                    Client Partnership
                  </h3>
                  <p className="font-primary text-white/60">
                    We value open communication and collaboration, working
                    directly with clients to understand their challenges and
                    develop effective solutions together.
                  </p>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[var(--color-tertiary)] flex items-center justify-center text-black font-primary font-medium">
                  3
                </div>
                <div>
                  <h3 className="font-primary font-medium text-lg mb-2">
                    Innovation with Purpose
                  </h3>
                  <p className="font-primary text-white/60">
                    We leverage modern technology not for its own sake, but to
                    solve real business problems with efficient, reliable, and
                    sustainable solutions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="container-large py-24 border-t border-white/10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-primary font-normal tracking-tight mb-6">
            Meet Our <span className="text-color-primary">Team</span>
          </h2>
          <p className="text-white/60 font-primary">
            Our team combines technical expertise with practical business
            experience to deliver effective web solutions.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Team cards would go here */}
          <div className="card">
            <div className="aspect-square bg-white/5 rounded-lg mb-4"></div>
            <h3 className="font-primary font-medium text-lg mb-1">
              Taun Healy
            </h3>
            <p className="text-white/60 font-primary text-sm">
              Director & Developer
            </p>
          </div>
          <div className="card">
            <div className="aspect-square bg-white/5 rounded-lg mb-4"></div>
            <h3 className="font-primary font-medium text-lg mb-1">John Doe</h3>
            <p className="text-white/60 font-primary text-sm">Freelancer</p>
          </div>
          <div className="card">
            <div className="aspect-square bg-white/5 rounded-lg mb-4"></div>
            <h3 className="font-primary font-medium text-lg mb-1">John Doe</h3>
            <p className="text-white/60 font-primary text-sm">Freelancer</p>
          </div>
          {/* Add more team members as needed */}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container-large py-24 border-t border-white/10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-primary font-normal tracking-tight mb-6">
            Ready to start your{" "}
            <span className="text-color-primary">project</span>?
          </h2>
          <p className="text-white/60 font-primary mb-8">
            Have a project in mind? We'd love to hear about it and discuss how
            we can help.
          </p>
          <Button variant="outline" size="lg" asChild>
            <a href="mailto:hello@kea.dev">Get in Touch</a>
          </Button>
        </div>
      </section>
    </div>
  );
}
