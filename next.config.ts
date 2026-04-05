import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  turbopack: {},
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "alwniehcmhtwaapyezwm.supabase.co",
      },
    ],
  },
};

export default nextConfig;
