// actions/blog-actions.ts
"use server";

import { safeApiGet, safeApiPost, ApiResult } from "@/lib/api";
import { revalidatePath } from "next/cache";

export interface BlogListParams {
  country?: string;
  state?: string;
  city?: string;
  category?: string;
  page?: number;
  perPage?: number;
  groupBy?: "country" | "state" | "city" | "category";
  diverse?: boolean;
}

/**
 * Unified Blog List Fetcher (Laravel: /api/v1/blog)
 */
export async function getBlogList(
  params: BlogListParams = {}
): Promise<ApiResult<any>> {
  const searchParams = new URLSearchParams();

  if (params.country) searchParams.set("country", params.country);
  if (params.state) searchParams.set("state", params.state);
  if (params.city) searchParams.set("city", params.city);
  if (params.category) searchParams.set("category", params.category);

  if (params.page) searchParams.set("page", String(params.page));
  if (params.perPage) searchParams.set("per_page", String(params.perPage));

  if (params.groupBy) searchParams.set("group_by", params.groupBy);
  if (params.diverse) searchParams.set("diverse", "1");

  const qs = searchParams.toString();

  const endpoint = qs ? `/v1/blog?${qs}` : `/v1/blog`;

  if (process.env.NODE_ENV === "development") {
    console.log("[Blog] Fetch:", endpoint);
  }

  return safeApiGet(endpoint, {
    revalidate: 3600,
    tags: [
      `blog-list:${params.country || ""}:${params.state || ""}:${
        params.city || ""
      }:${params.category || ""}:${params.groupBy || ""}`,
    ],
  });
}

/**
 * Fetch blog post by slug
 */
export async function getBlogPost(slug: string): Promise<ApiResult<any>> {
  const endpoint = `/v1/blog/${encodeURIComponent(slug)}`;

  if (process.env.NODE_ENV === "development") {
    console.log("[Blog] Single:", endpoint);
  }

  return safeApiGet(endpoint, {
    revalidate: 3600,
    tags: [`blog-post:${slug}`],
  });
}

/**
 * Fetch blog post by location path
 * /blog/france/state/city/category/slug
 */
export async function getBlogPostByLocation(
  country: string,
  state: string | null,
  city: string | null,
  category: string | null,
  slug: string
) {
  const pieces = ["/v1/blog", country];

  if (state) pieces.push(state);
  if (city) pieces.push(city);
  if (category) pieces.push(category);

  pieces.push(slug);

  const endpoint = pieces.join("/");

  if (process.env.NODE_ENV === "development") {
    console.log("[Blog] Location Fetch:", endpoint);
  }

  return safeApiGet(endpoint, {
    revalidate: 3600,
    tags: [`blog-post-loc:${country}:${slug}`],
  });
}
