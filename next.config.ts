import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Temporarily disable type checking during build
    ignoreBuildErrors: true,
  },
  typedRoutes: false,
  /* config options here */
};

export default nextConfig;
