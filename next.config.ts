import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:8000/api/:path*",
      },
    ];
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.indianexpress.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.shutterstock.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'rukminim2.flixcart.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.denofgeek.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com',
        pathname: '/**',
      },
    ],
  },

};

export default nextConfig;
