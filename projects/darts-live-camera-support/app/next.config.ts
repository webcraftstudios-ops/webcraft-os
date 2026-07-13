import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
  // If deployed to user.github.io/webcraft-os, we need the basePath.
  // In GitHub Actions, we can set GITHUB_PAGES=true or pass a specific base path.
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
};

export default nextConfig;
