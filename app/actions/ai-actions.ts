// actions/ai-actions.ts
"use server";

import { apiGet, safeApiGet, ApiResult } from "@/lib/api";

// AI Index – genel (6 saat cache)
export async function getAiIndex(): Promise<ApiResult<any>> {
  return safeApiGet("/ai-index", {
    revalidate: 60 * 60 * 6,
    tags: ["ai-index"],
  });
}

export async function getAiIndexCountry(): Promise<ApiResult<any>> {
  return safeApiGet("/ai-index-country", {
    revalidate: 60 * 60 * 6,
    tags: ["ai-index-country"],
  });
}

export async function getAiIndexState(): Promise<ApiResult<any>> {
  return safeApiGet("/ai-index-state", {
    revalidate: 60 * 60 * 6,
    tags: ["ai-index-state"],
  });
}

export async function getAiIndexCity(): Promise<ApiResult<any>> {
  return safeApiGet("/ai-index-city", {
    revalidate: 60 * 60 * 6,
    tags: ["ai-index-city"],
  });
}

// AI Business (E-E-A-T, org info) – 7 gün cache
export async function getAiBusiness(): Promise<ApiResult<any>> {
  return safeApiGet("/ai-business", {
    revalidate: 60 * 60 * 24 * 7,
    tags: ["ai-business"],
  });
}

// Local Facts – city intelligence (1 gün cache)
export async function getLocalFacts(city: string): Promise<ApiResult<any>> {
  const safeCity = encodeURIComponent(city.toLowerCase());
  return safeApiGet(`/local/${safeCity}/facts`, {
    revalidate: 60 * 60 * 24,
    tags: [`local-facts:${safeCity}`],
  });
}

// Vector Sitemap – 1 gün cache
export async function getVectorSitemap(): Promise<ApiResult<any>> {
  return safeApiGet("/vector-sitemap", {
    revalidate: 60 * 60 * 24,
    tags: ["vector-sitemap"],
  });
}

// Knowledge Graph – 1 gün cache
export async function getKnowledgeGraph(): Promise<ApiResult<any>> {
  return safeApiGet("/knowledge-graph", {
    revalidate: 60 * 60 * 24,
    tags: ["knowledge-graph"],
  });
}

// Author Signals – 7 gün cache
export async function getAuthorSignals(): Promise<ApiResult<any>> {
  return safeApiGet("/author-signals", {
    revalidate: 60 * 60 * 24 * 7,
    tags: ["author-signals"],
  });
}

// Experiences – 3 gün cache
export async function getExperiences(): Promise<ApiResult<any>> {
  return safeApiGet("/experiences", {
    revalidate: 60 * 60 * 24 * 3,
    tags: ["experiences"],
  });
}

// Priority Countries – 7 gün cache
export async function getPriorityCountries(): Promise<ApiResult<any>> {
  return safeApiGet("/priority-countries", {
    revalidate: 60 * 60 * 24 * 7,
    tags: ["priority-countries"],
  });
}
