import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  async redirects() {
    return [
      // /ssi was the old FAQ URL — keep bookmarks and search results working.
      {
        source: "/ssi",
        destination: "/intrebari-frecvente",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
