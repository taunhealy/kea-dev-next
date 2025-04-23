"use client";

import React, { useState } from "react";
import Image from "next/image";
import { urlForImage } from "@/lib/urlForImage";
import { PortableText, PortableTextBlock } from "@portabletext/react";
import {
  FigmaLogoIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
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
                    <span className="px-2 py-1 bg-black/40 border border-white/20 rounded-md text-white/70 inline-block mt-1">
                      {currentWorkItem?.workType?.title || "Booking System"}
                    </span>
                  </p>

                  {currentWorkItem?.figmaUrl && (
                    <a
                      href={currentWorkItem.figmaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-black/40 border border-white/20 rounded-md text-white/70 hover:bg-black/60 transition-colors flex items-center gap-2"
                    >
                      <FigmaLogoIcon className="w-4 h-4" />
                      <span className="font-primary text-sm">Figma</span>
                    </a>
                  )}
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
          <p className="text-white/50 font-primary text-xs flex items-center space-x-3">
            <span className="inline-block w-2 h-2 bg-primary rounded-full animate-pulse"></span>
            <span className="px-3 py-1.5 bg-black/40 border border-white/20 rounded-md text-white/70">
              {currentWorkItem?.workType?.title || "Booking System"}
            </span>
          </p>

          {currentWorkItem?.figmaUrl && (
            <a
              href={currentWorkItem.figmaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-black/40 border border-white/20 rounded-md text-white/70 hover:bg-black/60 transition-colors"
              aria-label="View in Figma"
            >
              <FigmaLogoIcon className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
