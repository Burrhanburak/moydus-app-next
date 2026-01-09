import type { MetadataRoute } from "next";

export const dynamic = "force-static";
export const revalidate = 3600;

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Moydus – Software Company & Web Design Agency",
    short_name: "Moydus",
    description:
      "Custom e-commerce platforms, SaaS products and AI automation tools by leading software company and web design agency. Trusted by 10,000+ customers across 150+ countries.",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#000000",
    orientation: "portrait-primary",
    icons: [
      {
        src: "/lomn.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable",
      },
      {
        src: "/logo.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/logo.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
    categories: ["business", "productivity", "developer"],
    lang: "en-US",
    dir: "ltr",
    scope: "/",
    prefer_related_applications: false,
  };
}
