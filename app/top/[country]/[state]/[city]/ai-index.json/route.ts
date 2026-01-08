import { getAiIndexCity, getLocalFacts } from "@/app/actions/ai-actions";
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
  context: { params: Promise<{ country: string; state: string; city: string }> }
) {
  const resolvedParams = await Promise.resolve(context.params);
  const { country, state, city } = resolvedParams;
  
  const aiIndexResult = await getAiIndexCity();
  const localFactsResult = await getLocalFacts(city);
  
  if (!aiIndexResult.success) {
    return NextResponse.json(
      { error: aiIndexResult.error || "Failed to fetch AI index for city" },
      { status: 500 }
    );
  }
  
  let feed: any[] = [];
  
  if (Array.isArray(aiIndexResult.data)) {
    feed = (aiIndexResult.data as PageItem[])
      .filter((p) => {
        const matchesCountry = 
          p.country?.toLowerCase() === country.toLowerCase() ||
          p.path?.includes(`/${country}/`) ||
          p.url?.includes(`/${country}/`);
        const matchesState = 
          p.state?.toLowerCase() === state.toLowerCase() ||
          p.path?.includes(`/${state}/`) ||
          p.url?.includes(`/${state}/`);
        const matchesCity = 
          p.city?.toLowerCase() === city.toLowerCase() ||
          p.path?.includes(`/${city}/`) ||
          p.url?.includes(`/${city}/`);
        return matchesCountry && matchesState && matchesCity;
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
  }
  
  return NextResponse.json({
    generated_at: new Date().toISOString(),
    country: country,
    state: state,
    city: city,
    ai_index: {
      total: feed.length,
      items: feed,
    },
    local_facts: localFactsResult.success ? localFactsResult.data : null,
  });
}

