import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* other config options can stay here */
  async redirects() {
    return [
      {
        source: "/login",
        destination: "http://192.168.221.118:8082",
        permanent: false,
      },
      {
        source: "/logout",
        destination: "http://192.168.221.118:8082/logout",
        permanent: false,
      },
      {
        source: "/login/oauth2/code/keycloak",
        destination: "http://192.168.221.118:8082/login/oauth2/code/keycloak",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
