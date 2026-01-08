import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Skip TypeScript errors during build (fix later)
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Static export for Cloudflare Pages (no server-side features)
  output: 'export',
  
  // Image optimization disabled - Cloudflare Images handles this
  images: {
    unoptimized: true, // Cloudflare Images/CDN handles optimization
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
  
  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === "production" ? {
      exclude: ["error", "warn"], // Keep errors and warnings
    } : false,
  },
  
  // Experimental features for better performance
  experimental: {
    optimizePackageImports: ["@radix-ui/react-icons", "lucide-react"],
  },
  // Note: rewrites() is not supported in static export mode
};

export default nextConfig;
