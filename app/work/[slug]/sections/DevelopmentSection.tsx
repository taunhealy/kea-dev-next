import { forwardRef, useState } from "react";
import { SectionProps } from "../types";
import Image from "next/image";
import Link from "next/link";
import { createPortal } from "react-dom";

const DevelopmentSection = forwardRef<HTMLDivElement, SectionProps>(
  ({ work, color = "#FFFFFF" }, ref) => {
    const [expandedItems, setExpandedItems] = useState<number[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedMicroFeature, setSelectedMicroFeature] = useState<any>(null);

    const toggleExpand = (index: number) => {
      setExpandedItems((prev) =>
        prev.includes(index)
          ? prev.filter((i) => i !== index)
          : [...prev, index]
      );
    };

    const openMicroFeatureModal = (microFeature: any) => {
      setSelectedMicroFeature(microFeature);
      setIsModalOpen(true);
    };

    return (
      <div
        ref={ref}
        id="development-section"
        className="scroll-mt-24 transition-all duration-300 ease-in-out"
      >
        <h2 className="text-2xl font-primary font-medium mb-8 flex items-center">
          <span
            className="inline-block w-3 h-3 rounded-full mr-3"
            style={{ backgroundColor: color }}
          ></span>
          Web Development
        </h2>

        <div className="space-y-16">
          {work?.webDevelopment?.features?.map((feature: any, i: number) => (
            <div key={i} className="feature-container">
              {i > 0 && <div className="border-t border-white/5 my-12"></div>}

              {/* Main Feature */}
              <div className="p-6 md:p-8 rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm">
                <div className="flex flex-col md:flex-row gap-8">
                  {/* Content */}
                  <div className="md:w-2/3">
                    <h3 className="text-xl font-primary font-medium mb-4">
                      {feature.title}
                    </h3>
                    <p
                      className={`text-white/80 font-primary leading-relaxed max-w-prose ${
                        !expandedItems.includes(i) &&
                        feature.description?.length > 200
                          ? "line-clamp-3"
                          : ""
                      }`}
                    >
                      {feature.description || ""}
                    </p>

                    {feature.description?.length > 200 && (
                      <button
                        onClick={() => toggleExpand(i)}
                        className="mt-3 text-sm font-primary font-medium text-white/60 hover:text-white transition-colors"
                      >
                        {expandedItems.includes(i) ? "Show less" : "Read more"}
                      </button>
                    )}

                    {feature.link && (
                      <div className="mt-6">
                        <Link
                          href={feature.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-all font-primary text-sm"
                        >
                          <span className="mr-2">View Feature</span>
                          <ArrowIcon />
                        </Link>
                      </div>
                    )}
                  </div>

                  {/* Image */}
                  <div className="md:w-1/3 flex-shrink-0">
                    {feature.media && feature.media.length > 0 && (
                      <div className="relative rounded-lg overflow-hidden aspect-video shadow-lg ring-1 ring-white/10">
                        <Image
                          src={feature.media[0].asset.url}
                          alt={feature.title}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Micro Features */}
              {feature.microFeatures && feature.microFeatures.length > 0 && (
                <div className="mt-8 pl-2 md:pl-6 border-l-2 border-white/10">
                  <h4 className="text-lg font-primary font-medium mb-4 md:mb-6 text-white/90">
                    {feature.title} Features
                  </h4>

                  {/* Grid-based structure for micro features */}
                  <div className="overflow-hidden rounded-lg border border-white/10 shadow-lg">
                    {/* Table header - hidden on mobile */}
                    <div className="hidden md:grid grid-cols-4 gap-4 bg-white/8 p-4 font-primary text-sm font-medium text-white/90">
                      <div>Feature</div>
                      <div>Description</div>
                      <div className="text-center">Image</div>
                      <div className="text-center">Link</div>
                    </div>

                    {/* Mobile-friendly list view */}
                    <div className="divide-y divide-white/5">
                      {feature.microFeatures.map(
                        (microFeature: any, j: number) => (
                          <div
                            key={j}
                            className="p-4 hover:bg-white/8 transition-colors cursor-pointer"
                            onClick={() => openMicroFeatureModal(microFeature)}
                          >
                            {/* Mobile view - only title and description */}
                            <div className="md:grid md:grid-cols-4 gap-4">
                              <div className="font-primary font-medium pr-2 mb-2 md:mb-0">
                                {microFeature.title}
                              </div>
                              <div className="font-primary text-sm text-white/80 pr-2 md:mb-0">
                                {microFeature.description &&
                                microFeature.description.length > 100
                                  ? `${microFeature.description.substring(0, 100)}...`
                                  : microFeature.description}
                              </div>

                              {/* Image and Link indicators - only visible on desktop */}
                              <div className="hidden md:block md:text-center">
                                {microFeature.media &&
                                  microFeature.media.length > 0 && (
                                    <span className="inline-block w-2 h-2 rounded-full bg-white/60"></span>
                                  )}
                              </div>
                              <div className="hidden md:block md:text-center">
                                {microFeature.link && (
                                  <span className="inline-block w-2 h-2 rounded-full bg-white/60"></span>
                                )}
                              </div>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Modal for micro features */}
        {isModalOpen &&
          selectedMicroFeature &&
          typeof document !== "undefined" &&
          createPortal(
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
              <div
                className="bg-black border border-white/20 rounded-xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-xl font-primary font-medium">
                    {selectedMicroFeature.title}
                  </h3>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="text-white/60 hover:text-white transition-colors p-1"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>

                <div className="space-y-8">
                  <p className="font-primary text-white/80 leading-relaxed">
                    {selectedMicroFeature.description}
                  </p>

                  {selectedMicroFeature.media &&
                    selectedMicroFeature.media.length > 0 && (
                      <div className="space-y-4">
                        <h4 className="font-primary font-medium text-white/90">
                          Images
                        </h4>
                        <div className="grid grid-cols-1 gap-6">
                          {selectedMicroFeature.media.map(
                            (media: any, i: number) => (
                              <div
                                key={i}
                                className="relative rounded-lg overflow-hidden aspect-video shadow-lg ring-1 ring-white/10"
                              >
                                <Image
                                  src={media.asset.url}
                                  alt={`${selectedMicroFeature.title} image ${i + 1}`}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    )}

                  {selectedMicroFeature.link && (
                    <div className="mt-6">
                      <Link
                        href={selectedMicroFeature.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-all font-primary text-sm"
                      >
                        <span className="mr-2">View Feature</span>
                        <ArrowIcon />
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>,
            document.body
          )}
      </div>
    );
  }
);

const ArrowIcon = ({ className = "" }: { className?: string }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <polyline
      points="15 3 21 3 21 9"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <line
      x1="10"
      y1="14"
      x2="21"
      y2="3"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

DevelopmentSection.displayName = "DevelopmentSection";

export default DevelopmentSection;
