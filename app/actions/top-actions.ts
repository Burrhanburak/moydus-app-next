// actions/top-actions.ts
"use server";

import { safeApiGet, ApiResult } from "@/lib/api";

export interface TopPageParams {
  country: string;
  state?: string | null;
  city?: string | null;
  category: string;
  slug: string;
}

/**
 * Get top page by location (using query parameters for flexibility)
 */
export async function getTopPageByLocation(
  country: string,
  state: string | null,
  city: string | null,
  category: string | null,
  slug: string
): Promise<ApiResult<any>> {
  const searchParams = new URLSearchParams();
  searchParams.set("country", country);
  if (state) searchParams.set("state", state);
  if (city) searchParams.set("city", city);
  if (category) searchParams.set("category", category);
  searchParams.set("slug", slug);

  const queryString = searchParams.toString();
  const endpoint = `/v1/top/show-by-query?${queryString}`;

  return safeApiGet(endpoint, {
    revalidate: 60 * 60 * 24, // 24 saat
    tags: [`top-page-loc:${country}:${category}:${slug}`],
  });
}

/**
 * Get top page (legacy - kept for backward compatibility)
 */
export async function getTopPage(
  params: TopPageParams
): Promise<ApiResult<any>> {
  return getTopPageByLocation(
    params.country,
    params.state || null,
    params.city || null,
    params.category,
    params.slug
  );
}

export interface TopListParams {
  country?: string;
  state?: string;
  city?: string;
  category?: string;
  page?: number;
  perPage?: number;
  diverse?: boolean;
}

/**
 * Get top list
 */
export async function getTopList(
  paramsOrCountry?: TopListParams | string,
  state?: string,
  city?: string,
  category?: string,
  page?: number,
  perPage?: number,
  diverse?: boolean
): Promise<ApiResult<any>> {
  // Support both object and individual parameters for backward compatibility
  let params: TopListParams;

  if (typeof paramsOrCountry === "object" && paramsOrCountry !== null) {
    params = paramsOrCountry;
  } else {
    params = {
      country: paramsOrCountry,
      state,
      city,
      category,
      page,
      perPage,
      diverse,
    };
  }

  const searchParams = new URLSearchParams();
  if (params.country) searchParams.set("country", params.country);
  if (params.state) searchParams.set("state", params.state);
  if (params.city) searchParams.set("city", params.city);
  if (params.category) searchParams.set("category", params.category);
  if (params.page) searchParams.set("page", params.page.toString());
  if (params.perPage) searchParams.set("per_page", params.perPage.toString());
  if (params.diverse) searchParams.set("diverse", "1");

  const queryString = searchParams.toString();
  const endpoint = queryString ? `/v1/top?${queryString}` : `/v1/top`;

  return safeApiGet(endpoint, {
    revalidate: 60 * 60, // 1 saat
    tags: [
      `top-list:${params.country || ""}:${params.state || ""}:${params.city || ""}`,
    ],
  });
}
