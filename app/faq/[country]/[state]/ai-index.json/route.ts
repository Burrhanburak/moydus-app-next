import { getAiIndexState } from "@/app/actions/ai-actions";
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
  context: { params: Promise<{ country: string; state: string }> }
) {
  const resolvedParams = await Promise.resolve(context.params);
  const { country, state } = resolvedParams;
  
  const result = await getAiIndexState();
  
  if (!result.success) {
    return NextResponse.json(
      { error: result.error || "Failed to fetch AI index for state" },
      { status: 500 }
    );
  }
  
  if (Array.isArray(result.data)) {
    const feed = (result.data as PageItem[])
      .filter((p) => {
        const matchesCountry = 
          p.country?.toLowerCase() === country.toLowerCase() ||
          p.path?.includes(`/${country}/`) ||
          p.url?.includes(`/${country}/`);
        const matchesState = 
          p.state?.toLowerCase() === state.toLowerCase() ||
          p.path?.includes(`/${state}/`) ||
          p.url?.includes(`/${state}/`);
        return matchesCountry && matchesState;
      })
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
      state: state,
      total: feed.length,
      items: feed,
    });
  }
  
  return NextResponse.json({
    generated_at: new Date().toISOString(),
    country: country,
    state: state,
    ...result.data,
  });
}

