import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
  },
  env: {
    NEXT_PUBLIC_API_URL_DEVELOPMENT: "http://localhost:3333",
  },
};

export default nextConfig;
