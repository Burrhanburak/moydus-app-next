import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Website Templates Marketplace – Professional Templates | Moydus",
  description:
    "Browse professional website templates for e-commerce, business, portfolios, and more. High-quality designs ready to customize. Free and premium templates available.",
  keywords: [
    "website templates",
    "web templates",
    "e-commerce templates",
    "business templates",
    "premium templates",
    "free templates",
  ],
  alternates: {
    canonical: "https://www.moydus.com/marketplace/templates",
  },
  openGraph: {
    title: "Website Templates Marketplace – Professional Templates | Moydus",
    description:
      "Browse professional website templates for e-commerce, business, and more.",
    url: "https://www.moydus.com/marketplace/templates",
    type: "website",
    locale: "en_US",
    siteName: "Moydus",
  },
  twitter: {
    card: "summary_large_image",
    title: "Website Templates Marketplace | Moydus",
    description: "Browse professional website templates.",
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

export default function TemplatesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

