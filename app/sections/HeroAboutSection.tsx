"use client";

import { Button } from "@/app/components/ui/button";
import Link from "next/link";

interface AboutContentProps {
  aboutData: {
    title?: string;
    description?: string;
  };
}

export function HeroAboutSection({ aboutData }: AboutContentProps) {
  return (
    <section className="py-16 md:py-24 bg-black relative overflow-hidden border-t border-white/10 border-b border-white/10">
      <div className="container-large">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-4xl font-primary font-normal tracking-tight text-white mb-6">
            Digital Solutions That{" "}
            <span className="text-color-primary">Drive Results</span>
          </h2>

          <p className="text-white/80 text-base md:text-lg font-primary leading-relaxed mb-8">
            We build custom web applications and digital experiences that solve
            real business challenges, increase efficiency, and help you grow
            your business.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-[54px]">
            <div className="flex flex-col gap-2">
              <div className="text-[var(--color-primary)] text-xl font-primary font-medium">
                Improve SEO
              </div>
              <div className="text-white/60 text-sm">Rank higher in search</div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-[var(--color-secondary)] text-xl font-primary font-medium">
                Increase Sales
              </div>
              <div className="text-white/60 text-sm">Convert more visitors</div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-[var(--color-tertiary)] text-xl font-primary font-medium">
                Better User Experience
              </div>
              <div className="text-white/60 text-sm">Engage customers</div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mt-[32px] md: pt-5">
            <Button size="lg" asChild>
              <Link href="/contact">Work With Us</Link>
            </Button>

            <Button variant="outline" size="lg" asChild>
              <Link href="/work">View Our Work</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
