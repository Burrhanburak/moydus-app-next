import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import LenisScrollProvider from "@/components/providers/lenis-provider";
import HeaderRadix from "@/components/Header";
import ChatWidget from "@/components/chat/ChatWidget";
import { buildWebsiteSchema, buildOrganizationSchema } from "@/seo/json-ld/index";

// Load ChatKit script directly from CDN to avoid frame URL issues
// If proxy is needed, use NEXT_PUBLIC_CHATKIT_SCRIPT_URL env var
const chatKitScriptUrl =
  process.env.NEXT_PUBLIC_CHATKIT_SCRIPT_URL ||
  "https://cdn.platform.openai.com/deployments/chatkit/chatkit.js";

// Font optimization: font-display: swap for better Core Web Vitals
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap", // Critical for performance - prevents FOIT
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap", // Critical for performance - prevents FOIT
  preload: false, // Only preload primary font
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.moydus.com"),

  title: "Software Company & Web Design Agency | Moydus®", // 52 karakter → mükemmel
  description:
    "Software company & web design agency delivering custom e-commerce, SaaS and AI automation solutions. Trusted by 1,200+ brands.", // 132 karakter → %100 görünür

  keywords: [
    "software company",
    "web design agency",
    "web development company",
    "e-commerce agency",
    "e-commerce development",
    "saas development",
    "web designer",
    "digital agency",
    "web design company near me",
  ],

  openGraph: {
    title: "Moydus® – Software Company & Web Design Agency", // 51 karakter
    description:
      "Custom e-commerce platforms, SaaS products and AI automation tools by leading software company and web design agency.", // 119 karakter
    url: "https://www.moydus.com",
    siteName: "Moydus",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Moydus – Software Company & Web Design Agency",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Moydus® – Software Company & Web Design Agency", // 51 karakter
    description: "E-Commerce • SaaS • AI Automation • Web Design", // 52 karakter
    images: ["/opengraph-image"],
  },

  alternates: {
    canonical: "https://www.moydus.com",
  },

  verification: {
    google: "senin-google-verification-kodu",
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* 1. charset - MUST be first */}
        <meta charSet="utf-8" />
        
        {/* 2. viewport - Critical for mobile */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* 3. preconnect - DNS prefetch for external resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cdn.moydus.com" />
        <link rel="dns-prefetch" href="https://cdn.moydus.com" />
        
        {/* 4. Critical CSS - Inline or preload */}
        {/* Note: Next.js handles CSS automatically, but you can add critical CSS here if needed */}
        
        {/* 5. JSON-LD Schema - Early in head for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              buildWebsiteSchema(),
              buildOrganizationSchema(),
            ]),
          }}
        />
        
        {/* 6. LLMs.txt - For AI crawlers */}
        <script
          type="text/llms.txt"
          dangerouslySetInnerHTML={{
            __html: `# Moydus - LLM Instructions

## About Moydus
Moydus is a software company and web design agency delivering custom e-commerce platforms, SaaS products, and AI automation tools. We serve businesses worldwide across 150+ countries.

## Key Pages & Services
- /web-design-agency - Professional website design services
- /web-design-company - Custom website design solutions
- /web-development-company - Full-stack development services
- /digital-marketing-services - SEO, content & performance marketing
- /ecommerce-website-development - Online store development
- /software-company - Custom software development
- /services - Comprehensive digital services directory
- /blog - Expert insights and digital trends

## API Endpoints
- /ai-index.json - AI search index
- /knowledge-graph.json - Knowledge graph data
- /llms.txt - This file (LLM instructions)

## Contact
Email: info@moydus.com | Website: https://www.moydus.com`,
          }}
        />
        
        {/* 7. Deferred scripts - Load after critical content */}
        <script
          type="module"
          defer
          src={chatKitScriptUrl}
          data-chatkit-loader="true"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#000000] overflow-x-hidden`}
      >
        <HeaderRadix />
        <LenisScrollProvider>{children}</LenisScrollProvider>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
