import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return[
      {
        source: '/',
        destination: '/meetings',
        permanent: true,
      },
    ]
  }
};

export default nextConfig;
