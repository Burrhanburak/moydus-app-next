// app/api/ai-summary/[...path]/route.ts
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  context: { params: Promise<{ path: string[] }> }
) {
  const resolvedParams = await Promise.resolve(context.params);
  const path = resolvedParams.path.join("/");

  // Örnek: /services/usa/texas/austin/web-design
  // veya: /blog/usa/texas/austin/best-web-design-agencies
  const apiBase = process.env.LARAVEL_API_URL || "https://api.moydus.com";

  const res = await fetch(`${apiBase}/api/page/${path}`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: "Page not found", path },
      { status: 404 }
    );
  }

  const data = await res.json();

  return NextResponse.json({
    title: data.title,
    snippet: data.snippet,
    url: `https://www.moydus.com/${path}`,
    category: data.category,
    city: data.city,
    state: data.state,
    country: data.country,
    updated_at: data.updated_at,
    keywords: data.keywords,
    faq: data.faq || [],
    // ekstra AI-friendly alanlar:
    reading_time: data.reading_time ?? null,
    intent: data.intent ?? null,
  });
}
