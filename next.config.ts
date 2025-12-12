import type { NextConfig } from "next";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
  /* other config options can stay here */
  async redirects() {
    return [
      {
        source: "/login",
        destination: apiUrl,
        permanent: false,
      },
      {
        source: "/logout",
        destination: `${apiUrl}/logout`,
        permanent: false,
      },
      {
        source: "/login/oauth2/code/keycloak",
        destination: `${apiUrl}/login/oauth2/code/keycloak`,
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
