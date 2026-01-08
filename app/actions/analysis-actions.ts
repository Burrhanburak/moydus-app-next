// actions/analysis-actions.ts
"use server";

import { apiGet, apiPost, safeApiGet, safeApiPost, ApiResult } from "@/lib/api";

// ---------- INTENT DETECT ----------
export interface IntentDetectPayload {
  title: string;
  content: string;
  keyword?: string;
  city?: string;
}

export async function detectIntent(
  payload: IntentDetectPayload
): Promise<ApiResult<any>> {
  return safeApiPost("/intent/detect", payload);
}

// ---------- ENTITIES ----------
export async function getEntities(slug: string): Promise<ApiResult<any>> {
  const safeSlug = encodeURIComponent(slug);
  return safeApiGet(`/entities/${safeSlug}`, {
    revalidate: 60 * 60 * 6,
    tags: [`entities:${safeSlug}`],
  });
}

// ---------- COMPETITORS ----------
export async function getCompetitors(params: {
  country: string;
  state: string;
  city: string;
  category: string;
}): Promise<ApiResult<any>> {
  const c = encodeURIComponent(params.country.toLowerCase());
  const s = encodeURIComponent(params.state.toLowerCase());
  const ci = encodeURIComponent(params.city.toLowerCase());
  const cat = encodeURIComponent(params.category.toLowerCase());

  const path = `/competitors/${c}/${s}/${ci}/${cat}`;

  return safeApiGet(path, {
    revalidate: 60 * 60 * 6, // daily-ish
    tags: [`competitors:${path}`],
  });
}

// ---------- BEHAVIOR TRACK ----------
export interface BehaviorTrackPayload {
  session_id: string;
  page_url: string;
  event_type:
    | "scroll"
    | "hover"
    | "dwell"
    | "copy"
    | "click_faq"
    | "click_comparison"
    | string;
  scroll_depth?: number;
  dwell_time?: number;
  [key: string]: any;
}

export async function trackBehavior(
  payload: BehaviorTrackPayload
): Promise<ApiResult<any>> {
  return safeApiPost("/behavior-track", payload);
}

// ---------- PENALTY CHECK ----------
export async function checkPenalty(slug: string): Promise<ApiResult<any>> {
  const safeSlug = encodeURIComponent(slug);
  return safeApiGet(`/penalty-check/${safeSlug}`, {
    revalidate: 60 * 60, // light cache
    tags: [`penalty-check:${safeSlug}`],
  });
}
