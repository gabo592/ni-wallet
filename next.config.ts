import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fznyppjnohyvwdqcakid.supabase.co',
        port: '',
      },
    ],
  },
};

export default nextConfig;
