import { forwardRef } from "react";
import { SectionProps } from "../types";
import Image from "next/image";

const BrandSection = forwardRef<HTMLDivElement, SectionProps>(
  ({ work, color = "#FFFFFF" }, ref) => {
    const { purpose, audience, archetypes, mood } = work?.brandDevelopment || {};

    return (
      <div
        ref={ref}
        id="brand-section"
        className="scroll-mt-24 transition-all duration-300 ease-in-out"
      >
        <h2 className="text-2xl font-primary font-medium mb-8 flex items-center">
          <span
            className="inline-block w-3 h-3 rounded-full mr-3"
            style={{ backgroundColor: color }}
          ></span>
          Brand Identity
        </h2>

        <div className="space-y-16 font-primary">
          {/* Purpose & Audience */}
          {(purpose?.title || audience?.title) && (
            <div className="grid md:grid-cols-2 gap-8">
              {purpose?.title && (
                <div className="p-8 rounded-xl border border-white/10 bg-white/5">
                  <h3 className="text-xl font-medium mb-4">{purpose.title}</h3>
                  <p className="text-white/80">{purpose.description}</p>
                </div>
              )}

              {audience?.title && (
                <div className="p-8 rounded-xl border border-white/10 bg-white/5">
                  <h3 className="text-xl font-medium mb-4">{audience.title}</h3>
                  <p className="text-white/80">{audience.description}</p>
                </div>
              )}
            </div>
          )}

          {/* Archetypes */}
          {archetypes && archetypes.length > 0 && (
            <div>
              <h3 className="text-xl font-medium mb-6">Brand Archetypes</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {archetypes.map((archetype, i) => (
                  <div
                    key={i}
                    className="p-6 rounded-xl border border-white/10 bg-white/5 text-center"
                  >
                    {archetype.icon && (
                      <div className="mb-4 flex justify-center">
                        <Image
                          src={archetype.icon.asset.url}
                          alt={archetype.title}
                          width={48}
                          height={48}
                          className="w-12 h-12 object-contain"
                        />
                      </div>
                    )}
                    <h4 className="text-lg font-medium">{archetype.title}</h4>
                    <p className="text-sm text-white/70 mt-2">
                      {archetype.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Mood Board */}
          {mood && mood.length > 0 && (
            <div>
              <h3 className="text-xl font-medium mb-6">Mood Board</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {mood.map((item, i) => (
                  <div
                    key={i}
                    className="p-6 rounded-xl border border-white/10 bg-white/5"
                  >
                    <h4 className="text-lg font-medium mb-3">{item.title}</h4>
                    <p className="text-white/80">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
);

BrandSection.displayName = "BrandSection";

export default BrandSection; 