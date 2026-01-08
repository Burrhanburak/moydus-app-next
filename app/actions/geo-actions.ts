// actions/geo-actions.ts
"use server";

import { safeApiGet, ApiResult } from "@/lib/api";

/**
 * Get all countries
 */
export async function getCountries(): Promise<ApiResult<any>> {
  return safeApiGet("/v1/geo/countries", {
    revalidate: 60 * 60 * 24 * 7, // 7 gün
    tags: ["geo-countries"],
  });
}

/**
 * Get states for a country
 */
export async function getStates(country: string): Promise<ApiResult<any>> {
  const safeCountry = encodeURIComponent(country);
  return safeApiGet(`/v1/geo/countries/${safeCountry}/states`, {
    revalidate: 60 * 60 * 24 * 7, // 7 gün
    tags: [`geo-states:${safeCountry}`],
  });
}

/**
 * Get cities for a country
 */
export async function getCities(country: string): Promise<ApiResult<any>> {
  const safeCountry = encodeURIComponent(country);
  return safeApiGet(`/v1/geo/countries/${safeCountry}/cities`, {
    revalidate: 60 * 60 * 24 * 7, // 7 gün
    tags: [`geo-cities:${safeCountry}`],
  });
}

