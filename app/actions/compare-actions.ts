// actions/compare-actions.ts
"use server";

import { safeApiGet, ApiResult } from "@/lib/api";

export interface ComparePageParams {
  country: string;
  state?: string | null;
  city?: string | null;
  category: string;
  slug: string;
}

/**
 * Get compare page by location (using query parameters for flexibility)
 */
export async function getComparePageByLocation(
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
  const endpoint = `/v1/compare/show-by-query?${queryString}`;

  return safeApiGet(endpoint, {
    revalidate: 60 * 60 * 24, // 24 saat
    tags: [`compare-page-loc:${country}:${category}:${slug}`],
  });
}

/**
 * Get compare page (legacy - kept for backward compatibility)
 */
export async function getComparePage(
  params: ComparePageParams
): Promise<ApiResult<any>> {
  return getComparePageByLocation(
    params.country,
    params.state || null,
    params.city || null,
    params.category,
    params.slug
  );
}

export interface CompareListParams {
  country?: string;
  state?: string;
  city?: string;
  category?: string;
  page?: number;
  perPage?: number;
  diverse?: boolean;
}

/**
 * Get compare list
 */
export async function getCompareList(
  paramsOrCountry?: CompareListParams | string,
  state?: string,
  city?: string,
  category?: string,
  page?: number,
  perPage?: number,
  diverse?: boolean
): Promise<ApiResult<any>> {
  // Support both object and individual parameters for backward compatibility
  let params: CompareListParams;

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
  const endpoint = queryString ? `/v1/compare?${queryString}` : `/v1/compare`;

  return safeApiGet(endpoint, {
    revalidate: 60 * 60, // 1 saat
    tags: [
      `compare-list:${params.country || ""}:${params.state || ""}:${params.city || ""}`,
    ],
  });
}
