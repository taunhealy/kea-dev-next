import { forwardRef } from "react";
import { SectionProps } from "../types";

const DetailItem = ({ label, value }: { label: string; value?: string }) => {
  if (!value) return null;
  return (
    <div>
      <h3 className="mb-2">{label}</h3>
      <h4>{value}</h4>
    </div>
  );
};

const CoreSection = forwardRef<HTMLDivElement, SectionProps>(
  ({ work }, ref) => {
    return (
      <div
        ref={ref}
        id="core-section"
        className="scroll-mt-24 transition-all duration-300 ease-in-out"
      >
        <h2 className="text-2xl font-primary font-medium mb-8 flex items-center">
          <span
            className="inline-block w-3 h-3 rounded-full mr-3"
            style={{ backgroundColor: "white" }}
          ></span>
          Core
        </h2>
        <div className="grid md:grid-cols-2 gap-8 font-primary">
          <div className="p-8 rounded-xl border border-white/10 space-y-6 bg-white/10">
            <DetailItem label="Producer" value={work?.core?.producerName} />
            <DetailItem label="Client" value={work?.core?.clientName} />
            <DetailItem
              label="Project Title"
              value={work?.core?.projectTitle}
            />
            {work?.projectUrl && (
              <div>
                <h3 className="mb-2">Live Project</h3>
                <h4>
                  <a
                    href={work.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "var(--color-primary)" }}
                    className="hover:underline font-primary"
                  >
                    {work.projectUrl}
                  </a>
                </h4>
              </div>
            )}
          </div>
          <div className="p-8 rounded-xl bg-white/10 border border-white/10 space-y-6">
            <DetailItem label="Category" value={work?.core?.projectCategory} />
            <DetailItem
              label="Challenge"
              value={work?.core?.projectChallenge}
            />
            {work?.core?.projectTechStack &&
              work.core.projectTechStack.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium mb-3">Tech Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {work?.core?.projectTechStack.map(
                      (tech: string, i: number) => (
                        <span
                          key={i}
                          className="tech-stack-item"
                          style={{
                            borderColor: "white",
                          }}
                        >
                          {tech}
                        </span>
                      )
                    )}
                  </div>
                </div>
              )}
          </div>
        </div>
        <div className="mt-24 border-b border-white/10"></div>
      </div>
    );
  }
);

CoreSection.displayName = "CoreSection";

export default CoreSection;
