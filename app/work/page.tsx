import { Metadata } from "next";
import { client } from "@/lib/sanity";
import { workPageQuery } from "@/lib/queries";
import WorkSection from "@/app/sections/WorkSection";
import { Button } from "@/app/components/ui/button";

export const metadata: Metadata = {
  title: "Our Work | Kea Logic",
  description:
    "Explore our portfolio of web design, development, and brand identity projects.",
};

export default async function WorkPage() {
  // Fetch data using the dedicated workPageQuery
  const data = await client.fetch(
    workPageQuery,
    {},
    {
      cache: "no-store",
      next: { tags: ["all-data"] },
    }
  );

  return (
    <div className="flex flex-col min-h-screen bg-black">
      {/* Hero Section */}
      <section className="overflow-hidden">
        <div className="flex flex-col h-[50vh] min-h-[400px] relative z-0 bg-black">
          <div className="flex flex-col justify-center h-full py-0 px-8">
            <div className="flex flex-col items-start gap-6 max-w-[540px]">
              <div className="titles-container flex flex-col gap-4 relative">
                <h1 className="text-xl md:text-3xl font-primary font-normal tracking-tight text-white">
                  Our <span className="text-color-primary">Work</span>
                </h1>
                <p className="text-white/60 text-lg md:text-lg font-primary leading-relaxed">
                  Explore our portfolio of innovative digital solutions. From
                  brand identity and web design to full-stack development and
                  media production, we create experiences that drive results.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Work Portfolio Section */}
      <WorkSection
        data={{ sectionTitle: "Our Work" }}
        works={data.works}
        categories={data.categories}
      />

      {/* Process Section */}
      <section className="container-large py-24 border-t border-white/10">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          <div>
            <h2 className="text-2xl md:text-3xl font-primary font-normal tracking-tight mb-6">
              Our <span className="text-color-primary">Process</span>
            </h2>
            <p className="text-white/60 font-primary mb-8">
              We follow a collaborative, iterative approach to ensure your
              project meets both business objectives and user needs. Our process
              combines strategic thinking with technical expertise.
            </p>
          </div>

          <div className="space-y-8">
            {/* Process Steps */}
            <div className="card">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-black font-primary font-medium">
                  1
                </div>
                <div>
                  <h3 className="font-primary font-medium text-lg mb-2">
                    Discovery & Strategy
                  </h3>
                  <p className="font-primary text-white/60">
                    We begin by understanding your business, audience, and
                    objectives to develop a strategic roadmap for your project.
                  </p>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-[var(--color-secondary)] flex items-center justify-center text-black font-primary font-medium">
                  2
                </div>
                <div>
                  <h3 className="font-primary font-medium text-lg mb-2">
                    Design & Prototyping
                  </h3>
                  <p className="font-primary text-white/60">
                    Our design team creates intuitive, visually compelling
                    interfaces that align with your brand and engage your users.
                  </p>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-[var(--color-tertiary)] flex items-center justify-center text-black font-primary font-medium">
                  3
                </div>
                <div>
                  <h3 className="font-primary font-medium text-lg mb-2">
                    Development & Testing
                  </h3>
                  <p className="font-primary text-white/60">
                    We build robust, scalable solutions using modern
                    technologies, with rigorous testing throughout the
                    development process.
                  </p>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-[var(--color-quaternary)] flex items-center justify-center text-black font-primary font-medium">
                  4
                </div>
                <div>
                  <h3 className="font-primary font-medium text-lg mb-2">
                    Launch & Optimization
                  </h3>
                  <p className="font-primary text-white/60">
                    After launch, we monitor performance and provide ongoing
                    support to ensure your digital solution continues to deliver
                    results.
                  </p>
                </div>
              </div>
            </div>
          </div>
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
            Let's discuss how we can help bring your vision to life with our
            expertise in design, development, and digital strategy.
          </p>
          <Button variant="outline" size="lg" asChild>
            <a href="/contact">Get in Touch</a>
          </Button>
        </div>
      </section>
    </div>
  );
}
