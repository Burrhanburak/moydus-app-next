"use server";

import "server-only";
import { revalidatePath } from "next/cache";

const API = process.env.LARAVEL_APP_URL;
// Örn: https://moy-app.test/api

// -----------------------------------------------------
// GLOBAL FETCH HELPER (Next.js 16 / React 19 için optimize)
// -----------------------------------------------------
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API}${endpoint}`;

  const res = await fetch(url, {
    ...options,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(options.headers ?? {}),
    },
    // Next.js 16 → Action içinden fetch edilecekse kesinlikle no-store olmalı
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    console.error("API ERROR:", url, res.status, text);
    throw new Error(`API Error ${res.status} → ${endpoint}`);
  }

  return res.json() as Promise<T>;
}

// -----------------------------------------------------
// AI SUMMARY
// -----------------------------------------------------
export async function getAISummary(slug: string, type: "blog" | "service") {
  return apiRequest(`/ai-summary/${type}/${slug}`);
}

// -----------------------------------------------------
// SITEMAP FEEDS
// -----------------------------------------------------
export async function getSitemapCountries() {
  return apiRequest(`/sitemap/countries`);
}
export async function getSitemapStates() {
  return apiRequest(`/sitemap/states`);
}
export async function getSitemapCities() {
  return apiRequest(`/sitemap/cities`);
}
export async function getSitemapServices() {
  return apiRequest(`/sitemap/services`);
}

// -----------------------------------------------------
// GLOBAL AI INDEX (ai-index.json)
// -----------------------------------------------------
export async function getAIIndexFeed() {
  return apiRequest(`/all-pages`);
}

// -----------------------------------------------------
// REVALIDATE HELPERS
// -----------------------------------------------------
export async function refreshServicePage(path: string) {
  revalidatePath(path);
}
