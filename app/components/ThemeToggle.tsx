"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      data-party-mode
      className="bg-white hover:bg-[#00FF88] text-black px-4 py-2 rounded-full shadow-lg transition-colors duration-300"
    >
      {theme === "dark" ? "🌞" : "🌙"}
    </button>
  );
}
