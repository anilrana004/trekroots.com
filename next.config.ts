import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "**.unsplash.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
  },
  // Prefer static generation + long CDN cache for catalog pages
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};

export default nextConfig;
