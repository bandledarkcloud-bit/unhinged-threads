import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // This forces Next.js to ignore the Turbopack engine
  experimental: {
    turbo: undefined, 
  },
};

export default nextConfig;