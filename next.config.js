/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable Turbopack
  experimental: {
    // turbopack is causing constant crashes
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;