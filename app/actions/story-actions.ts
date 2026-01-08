// actions/story-actions.ts
"use server";

import { apiGet, apiPost, safeApiGet, safeApiPost, ApiResult } from "@/lib/api";

export async function getStories(): Promise<ApiResult<any>> {
  // Force fresh data - no cache
  return safeApiGet("/stories", {
    // @ts-ignore - Next.js cache options
    cache: "no-store",
    tags: ["stories"],
  });
}

export async function getStory(slug: string): Promise<ApiResult<any>> {
  const safeSlug = encodeURIComponent(slug);
  return safeApiGet(`/story/${safeSlug}`, {
    revalidate: 60 * 60,
    tags: [`story:${safeSlug}`],
  });
}

export interface GenerateStoryPayload {
  source_type: "blog" | "service";
  source_id: number | string;
}

export async function generateStory(
  payload: GenerateStoryPayload
): Promise<ApiResult<any>> {
  return safeApiPost("/story/generate", payload);
}
