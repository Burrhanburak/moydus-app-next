// actions/search-actions.ts
"use server";

import { safeApiGet, ApiResult } from "@/lib/api";

/**
 * AI-powered search
 */
export async function aiSearch(query: string): Promise<ApiResult<any>> {
  const q = encodeURIComponent(query);
  return safeApiGet(`/search?q=${q}`, {
    revalidate: 60, // search live; cache düşük
  });
}
