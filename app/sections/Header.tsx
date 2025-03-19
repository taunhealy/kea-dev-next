"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Button from "@/app/components/Button";

export default function Header() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [pages, setPages] = useState<Array<{ title: string; slug: string }>>([
    { title: "Home", slug: "home" },
    { title: "About", slug: "about" },
    { title: "Services", slug: "services" },
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
      <nav className="px-[32px]">
        <div className="flex items-center justify-between h-[90px]">
          <div className="hidden md:flex items-center space-x-8">
            {pages.map((page) => (
              <Link
                key={page.slug}
                href={page.slug === "home" ? "/" : `/${page.slug}`}
                className={`transition-colors duration-300 ${
                  theme === "dark" ? "text-white" : "text-black"
                }`}
              >
                {page.title}
              </Link>
            ))}
          </div>
          <Button variant="primary">Contact</Button>
        </div>
      </nav>
    </header>
  );
}
