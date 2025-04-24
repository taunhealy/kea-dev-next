"use client";

import React, { useState } from "react";
import Image from "next/image";
import { urlForImage } from "@/lib/urlForImage";
import { PortableText, PortableTextBlock } from "@portabletext/react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  GitHubLogoIcon,
} from "@radix-ui/react-icons";
import { Button } from "@/app/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import * as DialogPrimitive from "@radix-ui/react-dialog";

interface WorkItem {
  _type?: string;
  _key?: string;
  _ref?: string;
  title?: string;
  mainImage?: {
    _type: string;
    asset: {
      _ref: string;
      _type: string;
    };
  };
  description?: PortableTextBlock[] | string;
  workItemId?: string;
  workType?: {
    _type: string;
    _key: string;
    title: string;
  };
  coverImage?: {
    _type: string;
    asset: {
      _ref: string;
      _type: string;
    };
  };
  core?: {
    projectDescription?: string;
  };
  figmaUrl?: string;
  githubUrl?: string;
}

interface InDevelopmentProps {
  inDevelopment?: WorkItem;
  inDevelopmentItems?: WorkItem[];
  fallbackImage?: any;
}

const SimpleDialogContent = ({
  children,
  ...props
}: { children: React.ReactNode } & DialogPrimitive.DialogContentProps) => {
  return (
    <DialogContent
      className="w-[90vw] max-w-[800px] max-h-[85vh] overflow-y-auto"
      {...props}
    >
      {children}
    </DialogContent>
  );
};

export default function InDevelopment({
  inDevelopment,
  inDevelopmentItems,
  fallbackImage,
}: InDevelopmentProps) {
  const [hasImageError, setHasImageError] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentWorkItemIndex, setCurrentWorkItemIndex] = useState(0);

  // Get all work items in development (single item or array)
  const getWorkItems = () => {
    if (inDevelopmentItems && inDevelopmentItems.length > 0) {
      return inDevelopmentItems;
    } else if (inDevelopment) {
      return [inDevelopment];
    }
    return [];
  };

  const workItems = getWorkItems();
  const currentWorkItem = workItems[currentWorkItemIndex];

  // Debug logging
  console.log("All work items:", workItems);
  console.log("Current work item:", currentWorkItem);
  console.log("Figma URL:", currentWorkItem?.figmaUrl);
  console.log("GitHub URL:", currentWorkItem?.githubUrl);

  const hasMultipleItems = workItems.length > 1;

  const nextWorkItem = () => {
    setCurrentWorkItemIndex((prev) =>
      prev === workItems.length - 1 ? 0 : prev + 1
    );
  };

  const prevWorkItem = () => {
    setCurrentWorkItemIndex((prev) =>
      prev === 0 ? workItems.length - 1 : prev - 1
    );
  };

  // Get the project description with proper fallbacks
  const getProjectDescription = (item: WorkItem = currentWorkItem) => {
    const description =
      item?.description ||
      item?.core?.projectDescription ||
      "Custom e-commerce platform with integrated analytics dashboard";

    return typeof description === "string"
      ? description
      : "Custom e-commerce platform with integrated analytics dashboard";
  };

  if (workItems.length === 0) {
    return null;
  }

  return (
    <div className="hidden md:block in-development-container relative border border-white/20 rounded-lg p-6 bg-black/40 backdrop-blur-sm overflow-hidden">
      {/* Animated border glow effect */}
      <div className="absolute inset-0 -z-10 animate-pulse">
        <div className="absolute inset-0 bg-black blur-sm"></div>
      </div>

      <div className="flex justify-between items-center mb-5 border-b border-white/20 pb-3">
        <h3 className="text-white font-primary text-lg">In Development</h3>

        {hasMultipleItems && (
          <div className="flex items-center space-x-2">
            <button
              onClick={prevWorkItem}
              className="p-1 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Previous project"
            >
              <ChevronLeftIcon className="w-4 h-4 text-white/70" />
            </button>
            <span className="text-white/50 text-xs font-primary">
              {currentWorkItemIndex + 1}/{workItems.length}
            </span>
            <button
              onClick={nextWorkItem}
              className="p-1 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Next project"
            >
              <ChevronRightIcon className="w-4 h-4 text-white/70" />
            </button>
          </div>
        )}
      </div>

      <div className="project-card mb-5">
        <h4 className="text-white font-primary text-base mb-5">
          {currentWorkItem?.title || "Project Horizon"}
        </h4>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            {currentWorkItem?.mainImage || currentWorkItem?.coverImage ? (
              <div className="relative h-32 w-full rounded-md overflow-hidden mb-5 cursor-pointer hover:opacity-90 transition-opacity">
                <Image
                  src={urlForImage(
                    currentWorkItem.mainImage || currentWorkItem.coverImage
                  ).url()}
                  alt={currentWorkItem.title || "Current project"}
                  fill
                  priority
                  className="object-cover"
                  onError={() => setHasImageError(true)}
                />
              </div>
            ) : (
              fallbackImage && (
                <div className="relative h-32 w-full rounded-md overflow-hidden mb-5 cursor-pointer hover:opacity-90 transition-opacity">
                  <Image
                    src={urlForImage(fallbackImage).url()}
                    alt="Current project"
                    fill
                    priority
                    className="object-cover"
                    onError={() => setHasImageError(true)}
                  />
                </div>
              )
            )}
          </DialogTrigger>

          <SimpleDialogContent
            className="dialog-content"
            title={currentWorkItem?.title || "Project Details"}
          >
            <div className="flex flex-col gap-4">
              <div className="relative h-60 w-full rounded-md overflow-hidden mb-4">
                <Image
                  src={urlForImage(
                    currentWorkItem?.mainImage ||
                      currentWorkItem?.coverImage ||
                      fallbackImage
                  ).url()}
                  alt={currentWorkItem?.title || "Current project"}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="space-y-4">
                {typeof currentWorkItem?.description === "object" ? (
                  <div className="text-white/80 font-primary">
                    <PortableText
                      value={currentWorkItem.description as PortableTextBlock[]}
                      components={{
                        block: {
                          normal: ({ children }) => {
                            return (
                              <p className="mb-4 font-primary">{children}</p>
                            );
                          },
                          h1: ({ children }) => (
                            <h1 className="text-xl font-primary mb-4">
                              {children}
                            </h1>
                          ),
                          h2: ({ children }) => (
                            <h2 className="text-lg font-primary mb-3">
                              {children}
                            </h2>
                          ),
                        },
                        list: {
                          bullet: ({ children }) => (
                            <ul className="list-disc pl-5 mb-4 space-y-2">
                              {children}
                            </ul>
                          ),
                          number: ({ children }) => (
                            <ol className="list-decimal pl-5 mb-4 space-y-2">
                              {children}
                            </ol>
                          ),
                        },
                        listItem: {
                          bullet: ({ children }) => (
                            <li className="mb-2 font-primary">{children}</li>
                          ),
                          number: ({ children }) => (
                            <li className="mb-2 font-primary">{children}</li>
                          ),
                        },
                        marks: {
                          link: ({ value, children }) => {
                            const target = (value?.href || "").startsWith(
                              "http"
                            )
                              ? "_blank"
                              : undefined;
                            return (
                              <a
                                href={value?.href}
                                target={target}
                                rel={
                                  target === "_blank"
                                    ? "noopener noreferrer"
                                    : undefined
                                }
                                className="text-primary hover:underline"
                              >
                                {children}
                              </a>
                            );
                          },
                          strong: ({ children }) => (
                            <strong className="font-semibold">
                              {children}
                            </strong>
                          ),
                          em: ({ children }) => (
                            <em className="italic">{children}</em>
                          ),
                        },
                      }}
                    />
                  </div>
                ) : (
                  <p className="text-white/80 font-primary">
                    {getProjectDescription()}
                  </p>
                )}

                <div className="flex items-center justify-between">
                  <p className="text-white/60 font-primary text-sm">
                    Category:{" "}
                    <span className="px-2 py-1 bg-black/40 border border-white/20 rounded-md text-white/70 inline-block mt-1 ml-2">
                      {currentWorkItem?.workType?.title || "Booking System"}
                    </span>
                  </p>

                  <div className="flex items-center gap-2">
                    {/* GitHub icon - always show */}
                    <a
                      href={currentWorkItem?.githubUrl || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-black/40 border border-white/20 rounded-md text-white/70 hover:bg-black/60 transition-colors flex items-center gap-2"
                    >
                      <GitHubLogoIcon className="w-4 h-4" />
                      <span className="font-primary text-sm">GitHub</span>
                    </a>

                    {/* Figma icon - always show */}
                    <a
                      href={currentWorkItem?.figmaUrl || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-black/40 border border-white/20 rounded-md text-white/70 hover:bg-black/60 transition-colors flex items-center gap-2"
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4"
                      >
                        <path
                          d="M8 24C10.2091 24 12 22.2091 12 20V16H8C5.79086 16 4 17.7909 4 20C4 22.2091 5.79086 24 8 24Z"
                          fill="currentColor"
                        />
                        <path
                          d="M4 12C4 9.79086 5.79086 8 8 8H12V16H8C5.79086 16 4 14.2091 4 12Z"
                          fill="currentColor"
                        />
                        <path
                          d="M4 4C4 1.79086 5.79086 0 8 0H12V8H8C5.79086 8 4 6.20914 4 4Z"
                          fill="currentColor"
                        />
                        <path
                          d="M12 0H16C18.2091 0 20 1.79086 20 4C20 6.20914 18.2091 8 16 8H12V0Z"
                          fill="currentColor"
                        />
                        <path
                          d="M20 12C20 14.2091 18.2091 16 16 16C13.7909 16 12 14.2091 12 12C12 9.79086 13.7909 8 16 8C18.2091 8 20 9.79086 20 12Z"
                          fill="currentColor"
                        />
                      </svg>
                      <span className="font-primary text-sm">Figma</span>
                    </a>
                  </div>
                </div>
              </div>

              <Button
                variant="outline"
                className="mt-4 self-end"
                onClick={() => setDialogOpen(false)}
              >
                Close
              </Button>
            </div>
          </SimpleDialogContent>
        </Dialog>
      </div>

      <div className="sanity-reference mt-5 pt-3 border-t border-white/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="inline-block w-2 h-2 bg-primary rounded-full animate-pulse"></span>
            <span className="px-3 py-1.5 bg-black/40 border border-white/20 rounded-md text-white/70 font-primary text-xs">
              {currentWorkItem?.workType?.title || "Booking System"}
            </span>

            {/* Always render icons for testing */}
            <div className="flex items-center gap-2">
              {/* GitHub icon - always show */}
              <a
                href={currentWorkItem?.githubUrl || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 bg-black/40 border border-white/20 rounded-md text-white/70 hover:bg-black/60 transition-colors"
                aria-label="View on GitHub"
              >
                <GitHubLogoIcon className="w-3.5 h-3.5" />
              </a>

              {/* Figma icon - always show */}
              <a
                href={currentWorkItem?.figmaUrl || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 bg-black/40 border border-white/20 rounded-md text-white/70 hover:bg-black/60 transition-colors"
                aria-label="View in Figma"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3.5 h-3.5"
                >
                  <path
                    d="M8 24C10.2091 24 12 22.2091 12 20V16H8C5.79086 16 4 17.7909 4 20C4 22.2091 5.79086 24 8 24Z"
                    fill="currentColor"
                  />
                  <path
                    d="M4 12C4 9.79086 5.79086 8 8 8H12V16H8C5.79086 16 4 14.2091 4 12Z"
                    fill="currentColor"
                  />
                  <path
                    d="M4 4C4 1.79086 5.79086 0 8 0H12V8H8C5.79086 8 4 6.20914 4 4Z"
                    fill="currentColor"
                  />
                  <path
                    d="M12 0H16C18.2091 0 20 1.79086 20 4C20 6.20914 18.2091 8 16 8H12V0Z"
                    fill="currentColor"
                  />
                  <path
                    d="M20 12C20 14.2091 18.2091 16 16 16C13.7909 16 12 14.2091 12 12C12 9.79086 13.7909 8 16 8C18.2091 8 20 9.79086 20 12Z"
                    fill="currentColor"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Status indicator */}
          <div className="flex items-center">
            <span className="text-white/50 font-primary text-xs">
              In Progress
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
