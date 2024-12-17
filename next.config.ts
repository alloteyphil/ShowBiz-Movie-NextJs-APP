import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  https: "//image.tmdb.org/t/p/original",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
