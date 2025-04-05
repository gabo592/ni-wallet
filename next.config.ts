import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  images: {
    remotePatterns: [
      {
        hostname: 'uorregrbashtzbyxjtjp.supabase.co',
        protocol: 'https',
      },
    ],
  },
};

export default nextConfig;
