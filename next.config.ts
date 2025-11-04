import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Temporarily disable type checking during build if needed
    ignoreBuildErrors: false,
  },
  experimental: {
    // Ensure consistent type generation
    typedRoutes: false,
  },
  /* config options here */
};

export default nextConfig;
