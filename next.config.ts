import type { NextConfig } from "next";

const isStaticExport = process.env.NEXT_OUTPUT === "export";

const nextConfig: NextConfig = {
  // Skip TypeScript errors during build (fix later)
  typescript: {
    ignoreBuildErrors: true,
  },

  // Static export when explicitly requested (e.g. Cloudflare Pages)
  ...(isStaticExport ? { output: "export" } : {}),
  
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
      {
        protocol: "https",
        hostname: "imagedelivery.net", // Cloudflare Images CDN
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
    optimizeCss: true, // Optimize CSS delivery
    // Avoid serving legacy JavaScript to modern browsers
    esmExternals: true, // Use ESM externals for better tree-shaking
  },
  
  // Modern JavaScript output - avoid legacy polyfills
  swcMinify: true, // Use SWC minifier (faster and better, default but explicit)
  
  // Optimize CSS loading
  optimizeFonts: true,
  
  // Note: rewrites() is not supported in static export mode
};

export default nextConfig;
