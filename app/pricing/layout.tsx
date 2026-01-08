import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing – Web Design & Development Packages | Moydus",
  description:
    "Transparent pricing for web design, e-commerce development, and SaaS solutions. Choose from Starter, CMS Suite, Business, or Custom packages. Starting from $2,150 one-time setup.",
  keywords: [
    "web design pricing",
    "website development pricing",
    "e-commerce pricing",
    "SaaS pricing",
    "web design packages",
    "website packages",
    "custom website pricing",
  ],
  alternates: {
    canonical: "https://www.moydus.com/pricing",
  },
  openGraph: {
    title: "Pricing – Web Design & Development Packages | Moydus",
    description:
      "Transparent pricing for web design, e-commerce, and SaaS solutions. Starting from $2,150.",
    url: "https://www.moydus.com/pricing",
    type: "website",
    locale: "en_US",
    siteName: "Moydus",
    images: [
      {
        url: "/pricing/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Pricing – Web Design & Development Packages",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pricing – Web Design & Development Packages | Moydus",
    description: "Transparent pricing for web design, e-commerce, and SaaS solutions.",
    images: ["/pricing/opengraph-image"],
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

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

