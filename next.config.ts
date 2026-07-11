import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Lets you open the dev site from your phone on the same Wi‑Fi.
  allowedDevOrigins: ["192.168.1.253", "localhost", "127.0.0.1"],
  images: {
    // Allow ?v=mtime cache-bust params when you replace photos with the same filename
    localPatterns: [
      { pathname: "/portfolio/**" },
      { pathname: "/about/**" },
    ],
  },
};

export default nextConfig;
