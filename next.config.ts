import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  allowedDevOrigins: ["192.168.1.116", "192.168.1.108"],
  reactStrictMode: false,
};

export default nextConfig;
