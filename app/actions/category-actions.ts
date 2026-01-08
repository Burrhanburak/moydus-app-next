// actions/category-actions.ts
"use server";

import { safeApiGet, ApiResult } from "@/lib/api";

/**
 * Get all categories
 */
export async function getCategories(
  page?: number,
  perPage?: number
): Promise<ApiResult<any>> {
  const params = new URLSearchParams();
  if (page) params.set("page", page.toString());
  if (perPage) params.set("per_page", perPage.toString());

  const queryString = params.toString();
  const endpoint = queryString ? `/v1/categories?${queryString}` : `/v1/categories`;
  
  return safeApiGet(endpoint, {
    revalidate: 60 * 60 * 24, // 1 gün
    tags: ["categories"],
  });
}

/**
 * Get single category by slug
 */
export async function getCategory(slug: string): Promise<ApiResult<any>> {
  const safeSlug = encodeURIComponent(slug);
  return safeApiGet(`/v1/categories/${safeSlug}`, {
    revalidate: 60 * 60 * 24, // 1 gün
    tags: [`category:${safeSlug}`],
  });
}

