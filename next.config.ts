import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['ryungbucket.s3.ap-northeast-2.amazonaws.com'],
  },
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/meetings',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
