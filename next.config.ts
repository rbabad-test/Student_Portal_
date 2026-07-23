import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/home", // Keep paths lowercase to avoid casing/routing mismatches
        permanent: false, 
      },
    ];
  },
};

export default nextConfig;