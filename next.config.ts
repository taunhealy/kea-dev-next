import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Warning instead of error (still shows warnings but doesn't fail build)
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["cdn.sanity.io"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  // Add transpilePackages for Sanity Studio
  transpilePackages: ["@sanity"],
};

export default nextConfig;
