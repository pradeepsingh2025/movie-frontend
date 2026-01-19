import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://book-movie-ticket-backend.onrender.com/api/:path*",
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
        hostname: 'm.media-amazon.com', //https://m.media-amazon.com
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.firstforwomen.com',
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
