import { Button } from "@/app/components/ui/button";
import { useEffect } from "react";

const techItems = [
  {
    name: "React",
    description: "A JavaScript library for building user interfaces",
    url: "https://reactjs.org/",
  },
  {
    name: "Next.js",
    description: "React framework for production with server-side rendering",
    url: "https://nextjs.org/",
  },
  {
    name: "TypeScript",
    description:
      "Strongly typed programming language that builds on JavaScript",
    url: "https://www.typescriptlang.org/",
  },
  {
    name: "Tailwind",
    description: "Utility-first CSS framework for rapid UI development",
    url: "https://tailwindcss.com/",
  },
  {
    name: "Sanity",
    description: "Headless CMS platform for structured content",
    url: "https://www.sanity.io/",
  },
  {
    name: "Figma",
    description: "Collaborative interface design tool",
    url: "https://www.figma.com/",
  },
];

export default function TechStack() {
  return (
    <div className="border border-white/20 rounded-lg p-4 bg-black/40 backdrop-blur-sm relative w-full">
      {/* Subtle gradient glow effect */}
      <div className="absolute inset-0 -z-10 animate-pulse">
        <div className="absolute inset-0 bg-black blur-lg"></div>
      </div>

      <h3 className="text-white font-primary text-lg mb-4 border-b border-white/20 pb-2">
        Tech Stack
      </h3>

      <div className="grid grid-cols-3 gap-3">
        {techItems.map((tech) => (
          <div key={tech.name} className="relative group">
            <Button
              variant="outline"
              size="sm"
              className="font-primary text-white border border-white/40 hover:bg-white/10 w-full justify-center"
              onClick={() =>
                window.open(tech.url, "_blank", "noopener,noreferrer")
              }
            >
              {tech.name}
            </Button>
            <div className="absolute bottom-full left-0 mb-2 w-48 p-2 z-50 bg-black border border-white/20 rounded-lg text-white font-primary text-sm opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 backdrop-blur-sm">
              {tech.description}
              <div className="mt-2 text-xs text-white/70">
                Click to visit website
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
