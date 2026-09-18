import type { NextConfig } from "next";

// Standalone is for the Railway/Docker image. Skip it on Windows local builds
// (symlink EPERM) and on Vercel (its own packager).
const useStandalone =
  process.env.DOCKER_BUILD === "1" || Boolean(process.env.RAILWAY_ENVIRONMENT);

const nextConfig: NextConfig = {
  ...(useStandalone ? { output: "standalone" as const } : {}),
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "**.unsplash.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "cdn.sanity.io" },
    ],
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};

export default nextConfig;
