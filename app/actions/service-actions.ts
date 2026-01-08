// actions/service-actions.ts
"use server";

import { apiGet, apiPost, safeApiGet, safeApiPost, ApiResult } from "@/lib/api";
import { revalidatePath } from "next/cache";

export interface ServicePagePayload {
  country: string;
  state?: string;
  city?: string;
  category: string;
  slug: string;
  title: string;
  meta_title?: string;
  canonical_url?: string;
  content_html?: string;
  faqs?: Array<{ question: string; answer: string }>;
  internal_links?: Array<{ text: string; url: string }>;
  schema_json?: any;
  content_data?: any;
}

/**
 * Import/upsert a service page
 */
export async function importServicePage(
  payload: ServicePagePayload
): Promise<ApiResult<any>> {
  return safeApiPost("/service-pages/import", payload);
}

/**
 * Get a service page by slug (legacy endpoint - uses /service-pages/{slug})
 */
export async function getServicePage(slug: string): Promise<ApiResult<any>> {
  const safeSlug = encodeURIComponent(slug);
  return safeApiGet(`/service-pages/${safeSlug}`, {
    revalidate: 60 * 60 * 24, // 24 saat
    tags: [`service-page:${safeSlug}`],
  });
}

/**
 * Get a service page by location (v1 endpoint)
 * Service URL format: /services/{country}/{state?}/{city?}/{slug}
 * NO CATEGORY in service URLs!
 */
export async function getServicePageByLocation(
  country: string,
  state?: string | null,
  city?: string | null,
  slug: string
): Promise<ApiResult<any>> {
  // Build path-based URL: /v1/service-pages/{country}/{state?}/{city?}/{slug}
  const pathParts = ['/v1/service-pages', country];

  if (state) {
    pathParts.push(state);
    if (city) {
      pathParts.push(city);
    }
  }

  pathParts.push(slug);

  const path = pathParts.join('/');

  return safeApiGet(path, {
    revalidate: 60 * 60 * 24, // 24 saat
    tags: [`service-page-v1:${country}:${slug}`],
  });
}

export interface ServicesListParams {
  country?: string;
  state?: string;
  city?: string;
  category?: string;
  page?: number;
  perPage?: number;
  diverse?: boolean;
}

/**
 * Get services list
 */
export async function getServicesList(
  params: ServicesListParams = {}
): Promise<ApiResult<any>> {
  const searchParams = new URLSearchParams();
  if (params.country) searchParams.set("country", params.country);
  if (params.state) searchParams.set("state", params.state);
  if (params.city) searchParams.set("city", params.city);
  if (params.category) searchParams.set("category", params.category);
  if (params.page) searchParams.set("page", params.page.toString());
  if (params.perPage) searchParams.set("per_page", params.perPage.toString());
  if (params.diverse) searchParams.set("diverse", "1");

  const queryString = searchParams.toString();
  const endpoint = queryString ? `/v1/services?${queryString}` : `/v1/services`;
  
  return safeApiGet(endpoint, {
    revalidate: 60 * 60, // 1 saat
    tags: [`services-list:${params.country || ""}:${params.state || ""}:${params.city || ""}`],
  });
}

/**
 * Get services by location (legacy - use getServicesList)
 */
export async function getServicesByLocation(
  country: string,
  state?: string,
  city?: string,
  category?: string
): Promise<ApiResult<any>> {
  return getServicesList(country, state, city, category);
}

/**
 * Manual revalidate helper
 */
export async function refreshServicePage(path: string) {
  revalidatePath(path);
}

