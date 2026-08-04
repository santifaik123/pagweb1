import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  devIndicators: false,
  images: {
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
    qualities: [75, 90, 92, 95],
    minimumCacheTTL: 31536000,
  },
};

export default nextConfig;
