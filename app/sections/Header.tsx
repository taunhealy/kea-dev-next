"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/app/components/ui/button";
import PartyButton from "@/app/components/PartyButton";

export default function Header() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [pages, setPages] = useState<Array<{ title: string; slug: string }>>([
    { title: "Home", slug: "home" },
    { title: "About", slug: "about" },
    { title: "Work", slug: "work" },
    // Add any default pages you want to show
  ]);

  // Remove the fetch for now until API is ready
  // useEffect(() => {
  //   const fetchPages = async () => {
  //     const response = await fetch("/api/pages");
  //     const data = await response.json();
  //     setPages(data);
  //   };
  //   fetchPages();
  // }, []);

  return (
    <header
      className="fixed w-full backdrop-blur-md z-50 transition-[background-color,color] duration-700"
      data-theme={theme}
    >
      <nav className="container-large">
        <div className="flex justify-center items-center h-[90px] px-8">
          <div className="flex items-center space-x-8 bg-black/80 border border-white/20 p-2 px-4 rounded-full">
            {pages.map((page) => (
              <Link
                key={page.slug}
                href={page.slug === "home" ? "/" : `/${page.slug}`}
                className={`font-primary text-sm transition-colors duration-300 ${
                  theme === "dark" ? "text-white" : "text-black"
                }`}
              >
                {page.title}
              </Link>
            ))}
            <Button
              variant="outline"
              data-party-mode
              className="font-primary text-sm"
            >
              Contact
            </Button>
            <PartyButton />
          </div>
        </div>
      </nav>
    </header>
  );
}
