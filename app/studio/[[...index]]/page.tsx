"use client";

import { NextStudio } from "next-sanity/studio";
// Import directly from the sanity folder to avoid version conflicts
import config from "../../../sanity/sanity.config";
// or using absolute path:
// import config from "@/sanity/sanity.config";

export default function StudioPage() {
  // Cast the config to any to bypass type checking
  return <NextStudio config={config as any} />;
}
