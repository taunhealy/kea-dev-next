"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@/app/components/ui/button";
import { ImageSlider } from "@/app/components/ImageSlider";

interface AboutContentProps {
  aboutData: {
    title?: string;
    description?: string;
    images?: { url: string }[];
    teamHeading?: string;
    teamDescription?: string;
    teamMembers?: {
      name: string;
      role: string;
      image: {
        url: string;
        alt?: string;
      };
    }[];
  };
}

export function AboutSection({ aboutData }: AboutContentProps) {
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
      <section className="overflow-hidden">
        <div className="flex flex-col min-h-[600px] relative z-0 bg-black">
          <div className="container-large mt-32">
            <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
              {/* Left side - About content */}
              <div className="flex flex-col gap-6">
                <div className="titles-container">
                  <h1 className="text-xl md:text-3xl font-primary font-normal tracking-tight text-white mb-6">
                    About Us
                  </h1>
                  <p className="text-white/60 text-base font-primary leading-relaxed mb-4">
                    Hi, my name is Taun. I focus on building simple, elegant and
                    effective digital solutions for businesses and organizations
                    that increases profit and saves time.
                  </p>
                  <p className="text-white/60 text-base font-primary leading-relaxed">
                    Named after the Kea, New Zealand's alpine parrot known for
                    its problem-solving abilities. Like our namesake, we
                    approach challenges with creativity and adaptability,
                    finding innovative solutions in complex environments.
                  </p>
                </div>
              </div>

              {/* Right side - Image Slider */}
              <div className="w-full">
                {aboutData?.images && aboutData.images.length > 0 && (
                  <ImageSlider images={aboutData.images} />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="container-large py-24 border-t border-white/10">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          <div>
            <h2 className="text-[20px] md:text-3xl font-primary font-normal tracking-tight mb-6">
              Our <span className="text-color-primary">Story</span>
            </h2>
            <p className="text-white/60 text-base font-primary leading-relaxed mb-8">
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
                  <p className="font-primary text-base text-white/60 leading-relaxed">
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
                  <p className="font-primary text-base text-white/60 leading-relaxed">
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
                  <p className="font-primary text-base text-white/60 leading-relaxed">
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
          <h2 className="text-[20px] md:text-3xl font-primary font-normal tracking-tight mb-6">
            {aboutData?.teamHeading || "Meet Our"}{" "}
            <span className="text-color-primary">Team</span>
          </h2>
          <p className="text-white/60 text-base font-primary leading-relaxed">
            {aboutData?.teamDescription ||
              "Our team combines technical expertise with practical business experience to deliver effective digital solutions."}
          </p>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {aboutData?.teamMembers && aboutData.teamMembers.length > 0 ? (
            aboutData.teamMembers.map((member, index) => (
              <div className="card" key={index}>
                <div className="aspect-square bg-white/5 rounded-lg mb-4 overflow-hidden">
                  {member.image?.url && (
                    <Image
                      src={member.image.url}
                      alt={
                        member.image.alt || `${member.name} - ${member.role}`
                      }
                      width={400}
                      height={400}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <h3 className="font-primary font-medium text-lg mb-1">
                  {member.name}
                </h3>
                <p className="text-white/60 font-primary text-sm">
                  {member.role}
                </p>
              </div>
            ))
          ) : (
            // Fallback content if no team members are defined
            <>
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
                <h3 className="font-primary font-medium text-lg mb-1">
                  John Doe
                </h3>
                <p className="text-white/60 font-primary text-sm">Freelancer</p>
              </div>
              <div className="card">
                <div className="aspect-square bg-white/5 rounded-lg mb-4"></div>
                <h3 className="font-primary font-medium text-lg mb-1">
                  John Doe
                </h3>
                <p className="text-white/60 font-primary text-sm">Freelancer</p>
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container-large py-24 border-t border-white/10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-[20px] md:text-3xl font-primary font-normal tracking-tight mb-6">
            Ready to start your{" "}
            <span className="text-color-primary">project</span>?
          </h2>
          <p className="text-white/60 text-base font-primary leading-relaxed mb-8">
            Have a project in mind? We'd love to hear about it and discuss how
            we can help.
          </p>
          <Button variant="outline" size="lg" asChild>
            <a href="taunhealy@kealogic.dev">Get in Touch</a>
          </Button>
        </div>
      </section>
    </div>
  );
}
