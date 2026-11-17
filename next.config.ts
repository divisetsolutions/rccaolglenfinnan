import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
      },
      {
        protocol: 'https',
        hostname: 'www.vaticannews.va',
      },
      {
        protocol: 'https',
        hostname: 'www.rcdai.org.uk',
      },
    ],
  },
  // Wedding photos moved into their own folder; old links keep working.
  async redirects() {
    return [
      {
        source: '/img/glenfinnan-church-wedding-:name.jpg',
        destination: '/img/weddings/glenfinnan-church-wedding-:name.jpg',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
