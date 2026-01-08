import { getAiIndexCountry } from "@/app/actions/ai-actions";
import { NextResponse } from "next/server";

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

export async function GET(
  _request: Request,
  context: { params: Promise<{ country: string }> }
) {
  const resolvedParams = await Promise.resolve(context.params);
  const country = resolvedParams.country;

  const result = await getAiIndexCountry();

  if (!result.success) {
    return NextResponse.json(
      { error: result.error || "Failed to fetch AI index for country" },
      { status: 500 }
    );
  }

  // If the API returns a list directly, format it
  if (Array.isArray(result.data)) {
    const feed = (result.data as PageItem[])
      .filter((p) => 
        p.country?.toLowerCase() === country.toLowerCase() ||
        p.path?.includes(`/${country}/`) ||
        p.url?.includes(`/${country}/`)
      )
      .map((p) => ({
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

    return NextResponse.json({
      generated_at: new Date().toISOString(),
      country: country,
      total: feed.length,
      items: feed,
    });
  }

  // Otherwise return the data as-is
  return NextResponse.json({
    generated_at: new Date().toISOString(),
    country: country,
    ...result.data,
  });
}

