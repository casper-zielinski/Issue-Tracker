import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.daisyui.com",
      },
    ],
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@/generated/prisma': path.resolve(process.cwd(), 'src/generated/prisma'),
      '@/generated': path.resolve(process.cwd(), 'src/generated'),
    };
    return config;
  },
};

export default nextConfig;
