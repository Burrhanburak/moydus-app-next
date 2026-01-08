import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.moydus.com", // Cloudflare R2 custom domain
      },
      {
        protocol: "https",
        hostname: "moydus-r2.cloudflare.r2.dev", // raw domain kullanıyorsan
      },
      {
        protocol: "https",
        hostname: "5e5f8a26d62e3255d96f4410baf43d73.r2.cloudflarestorage.com", // Cloudflare R2 endpoint
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "deifkwefumgah.cloudfront.net", // CloudFront CDN for shadcn blocks
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.shadcnstudio.com", // Shadcn Studio CDN
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "framerusercontent.com", // Framer CDN for images
        pathname: "/**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/blog/:country/:state/:category/:slug",
        destination:
          "/blog/:country/:state/:state/:category/:slug",
      },
      {
        source: "/blog/:country/:state/:category/:slug/ai-summary.json",
        destination:
          "/blog/:country/:state/:state/:category/:slug/ai-summary.json",
      },
      {
        source: "/blog/:country/:state/:category/:slug/ai-qna.json",
        destination:
          "/blog/:country/:state/:state/:category/:slug/ai-qna.json",
      },
      {
        source: "/blog/:country/:state/:category/:slug/ai-facts.json",
        destination:
          "/blog/:country/:state/:state/:category/:slug/ai-facts.json",
      },
      {
        source: "/blog/:country/:state/:category/:slug/schema.json",
        destination:
          "/blog/:country/:state/:state/:category/:slug/schema.json",
      },
    ];
  },
};

export default nextConfig;
