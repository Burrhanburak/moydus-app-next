import { getAiIndex } from "@/app/actions/ai-actions";
import { NextResponse } from "next/server";

// Static export compatibility
export const dynamic = "force-static";
export const revalidate = 3600; // Revalidate every hour

interface PageItem {
  title: string;
  snippet?: string;
  path?: string;
  url?: string;
  category?: string;
  city?: string;
  state?: string;
  country?: string;
  keywords?: string[];
  updated_at?: string;
}

export async function GET() {
  const result = await getAiIndex();

  if (!result.success) {
    return NextResponse.json(
      { error: result.error || "Failed to fetch AI index" },
      { status: 500 }
    );
  }

  // Root-level money pages and service pages for AI search
  const rootPages: PageItem[] = [
    {
      title: "Web Design Agency",
      snippet: "Professional web design agency creating high-performing websites, e-commerce stores, and SaaS platforms for brands worldwide.",
      path: "/web-design-agency",
      url: "https://moydus.com/web-design-agency",
      category: "web-design",
      keywords: ["web design agency", "professional web design", "custom website design"],
    },
    {
      title: "Web Design Company",
      snippet: "Leading web design company specializing in custom websites, e-commerce platforms, and SaaS solutions.",
      path: "/web-design-company",
      url: "https://moydus.com/web-design-company",
      category: "web-design",
      keywords: ["web design company", "website design company", "custom web design"],
    },
    {
      title: "Web Development Company",
      snippet: "Professional web development company building custom websites, e-commerce platforms, and SaaS applications.",
      path: "/web-development-company",
      url: "https://moydus.com/web-development-company",
      category: "web-development",
      keywords: ["web development company", "website development", "full-stack development"],
    },
    {
      title: "Digital Marketing Services",
      snippet: "Comprehensive digital marketing services including SEO, content marketing, and performance marketing.",
      path: "/digital-marketing-services",
      url: "https://moydus.com/digital-marketing-services",
      category: "digital-marketing",
      keywords: ["digital marketing services", "SEO services", "content marketing"],
    },
    {
      title: "Services Hub",
      snippet: "Explore our comprehensive range of digital services including web design, SEO, marketing, and more.",
      path: "/services",
      url: "https://moydus.com/services",
      category: "services",
      keywords: ["digital services", "web design services", "SEO services"],
    },
  ];

  // If the API returns a list directly, format it
  if (Array.isArray(result.data)) {
    const feed = (result.data as PageItem[]).map((p) => ({
      title: p.title,
      snippet: p.snippet,
      url: `https://moydus.com${p.path || p.url || ""}`,
      category: p.category,
      city: p.city,
      state: p.state,
      country: p.country,
      keywords: p.keywords,
      updated_at: p.updated_at,
    }));

    // Add root pages to feed
    const rootPagesFormatted = rootPages.map((p) => ({
      title: p.title,
      snippet: p.snippet,
      url: p.url,
      category: p.category,
      keywords: p.keywords,
      updated_at: new Date().toISOString(),
    }));

    return NextResponse.json({
      generated_at: new Date().toISOString(),
      total: feed.length + rootPagesFormatted.length,
      items: [...rootPagesFormatted, ...feed],
    });
  }

  // Otherwise return the data as-is with root pages added
  const responseData = result.data as any;
  const rootPagesFormatted = rootPages.map((p) => ({
    title: p.title,
    snippet: p.snippet,
    url: p.url,
    category: p.category,
    keywords: p.keywords,
    updated_at: new Date().toISOString(),
  }));

  return NextResponse.json({
    generated_at: new Date().toISOString(),
    ...responseData,
    root_pages: rootPagesFormatted,
  });
}
