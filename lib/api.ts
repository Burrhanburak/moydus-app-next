// lib/api.ts - Central API helper for Laravel backend
"use server";

import { ApiError } from "./api-error";

// API base URL configuration
// Supports: NEXT_PUBLIC_API_URL, LARAVEL_API_URL, or defaults to https://moydu-app.test
const getApiBaseUrl = () => {
  const rawUrl =
    process.env.NEXT_PUBLIC_API_URL ??
    process.env.LARAVEL_API_URL ??
    "https://moydu-app.test";

  // Remove trailing slashes
  let cleanUrl = rawUrl.replace(/\/+$/, "");

  // If URL doesn't end with /api, add it
  if (!cleanUrl.endsWith("/api")) {
    cleanUrl = `${cleanUrl}/api`;
  }

  return cleanUrl;
};

const API_BASE_URL = getApiBaseUrl();

// Debug: Log API base URL in development (server-side only)
if (process.env.NODE_ENV === "development" && typeof window === "undefined") {
  console.log("[API Config] Base URL:", API_BASE_URL);
  console.log(
    "[API Config] NEXT_PUBLIC_API_URL:",
    process.env.NEXT_PUBLIC_API_URL
  );
  console.log("[API Config] LARAVEL_API_URL:", process.env.LARAVEL_API_URL);
}

// Debug: Log API base URL in development
if (process.env.NODE_ENV === "development") {
  console.log("[API] Base URL:", API_BASE_URL);
}

export type ApiResult<T> =
  | { success: true; data: T }
  | { success: false; error: string; status?: number };

interface FetchOptions {
  revalidate?: number;
  authToken?: string;
  tags?: string[];
  suppressErrorLog?: boolean;
  cache?: RequestCache; // 'default' | 'force-cache' | 'no-store' | 'no-cache' | 'reload' | 'only-if-cached'
}

/**
 * Generic GET request helper
 */
export async function apiGet<T = unknown>(
  endpoint: string,
  options?: FetchOptions
): Promise<T> {
  // Ensure endpoint starts with /
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  const url = `${API_BASE_URL}${cleanEndpoint}`;

  // Debug logging in development
  if (process.env.NODE_ENV === "development" && typeof window === "undefined") {
    console.log(`[API GET] ${url}`);
  }

  const headers: HeadersInit = {
    Accept: "application/json",
  };

  if (options?.authToken) {
    headers["Authorization"] = `Bearer ${options.authToken}`;
  }

  // Build fetch options - avoid cache conflict
  const fetchOptions: RequestInit = {
    method: "GET",
    headers,
  };

  // Handle cache options - Next.js 16 format
  if (options?.cache) {
    // Explicit cache option takes precedence
    fetchOptions.cache = options.cache;
    // Still include next options for revalidate/tags if provided
    if (options?.revalidate !== undefined || options?.tags) {
      fetchOptions.next = {
        ...(options.revalidate !== undefined && { revalidate: options.revalidate }),
        ...(options.tags && { tags: options.tags }),
      };
    }
  } else if (options?.revalidate !== undefined) {
    // Use revalidate with force-cache for read-only content
    fetchOptions.cache = "force-cache";
    fetchOptions.next = {
      revalidate: options.revalidate,
      ...(options.tags && { tags: options.tags }),
    };
  } else {
    // Default: no-store for fresh data (user-specific, auth, mutations)
    fetchOptions.cache = "no-store";
    if (options?.tags) {
      fetchOptions.next = {
        tags: options.tags,
      };
    }
  }

  const res = await fetch(url, fetchOptions);

  // Read response as text first to check content
  const contentType = res.headers.get("content-type") || "";
  const responseText = await res.text();

  // Debug: Log response details
  if (process.env.NODE_ENV === "development" && typeof window === "undefined") {
    console.log(`[API Response] ${res.status} ${res.statusText} for ${url}`);
    console.log(`[API Response] Content-Type: ${contentType}`);
    console.log(`[API Response] Body length: ${responseText.length} bytes`);
    if (responseText.length > 0 && responseText.length < 500) {
      console.log(
        `[API Response] Body preview: ${responseText.substring(0, 200)}`
      );
    }
  }

  if (!res.ok) {
    // Truncate HTML responses for cleaner error messages
    const errorText =
      responseText.length > 500
        ? responseText.substring(0, 500) + "..."
        : responseText || res.statusText;

    // Log full URL for debugging
    if (!options?.suppressErrorLog) {
      console.error(`[API Error] ${res.status} ${res.statusText}`);
      console.error(`[API Error] URL: ${url}`);
      console.error(`[API Error] Response: ${errorText.substring(0, 200)}`);
    }

    throw new ApiError(
      `API error ${res.status}: ${errorText}`,
      res.status,
      url
    );
  }

  // Handle empty response
  if (!responseText || responseText.trim().length === 0) {
    if (
      process.env.NODE_ENV === "development" &&
      typeof window === "undefined"
    ) {
      console.warn(`[API Warning] Empty response from ${url}`);
    }
    return null as T;
  }

  // Parse JSON
  try {
    const data = JSON.parse(responseText);
    // Debug: Log successful response in development
    if (
      process.env.NODE_ENV === "development" &&
      typeof window === "undefined"
    ) {
      const dataType = Array.isArray(data)
        ? `Array(${data.length})`
        : data && typeof data === "object" && "data" in data
          ? `Object with data: ${Array.isArray(data.data) ? `Array(${data.data.length})` : typeof data.data}`
          : typeof data;
      console.log(`[API Success] ${url} - Response type:`, dataType);
    }
    return data as T;
  } catch (error) {
    // If not JSON, log the actual response
    if (
      process.env.NODE_ENV === "development" &&
      typeof window === "undefined"
    ) {
      console.error(`[API Parse Error] ${url}:`, error);
      console.error(
        `[API Parse Error] Response was not JSON. Content-Type: ${contentType}`
      );
      console.error(
        `[API Parse Error] Response body (first 500 chars):`,
        responseText.substring(0, 500)
      );
    }
    // Return null instead of throwing to allow graceful handling
    return null as T;
  }
}

/**
 * Generic POST request helper
 */
export async function apiPost<T = unknown>(
  endpoint: string,
  body?: unknown,
  options?: Omit<FetchOptions, "revalidate">
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers: HeadersInit = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  if (options?.authToken) {
    headers["Authorization"] = `Bearer ${options.authToken}`;
  }

  const res = await fetch(url, {
    method: "POST",
    headers,
    body: body ? JSON.stringify(body) : undefined,
    next: {
      tags: options?.tags,
    },
  });

  // Read response as text first to check content
  const contentType = res.headers.get("content-type") || "";
  const responseText = await res.text();

  // Debug: Log response details
  if (process.env.NODE_ENV === "development" && typeof window === "undefined") {
    console.log(`[API Response] ${res.status} ${res.statusText} for ${url}`);
    console.log(`[API Response] Content-Type: ${contentType}`);
    console.log(`[API Response] Body length: ${responseText.length} bytes`);
  }

  if (!res.ok) {
    const errorText =
      responseText.length > 500
        ? responseText.substring(0, 500) + "..."
        : responseText || res.statusText;

    if (!options?.suppressErrorLog) {
      console.error(`[API Error] ${res.status} ${res.statusText}`);
      console.error(`[API Error] URL: ${url}`);
      console.error(`[API Error] Response: ${errorText.substring(0, 200)}`);
    }

    throw new ApiError(
      `API error ${res.status}: ${errorText}`,
      res.status,
      url
    );
  }

  // Handle empty response
  if (!responseText || responseText.trim().length === 0) {
    if (
      process.env.NODE_ENV === "development" &&
      typeof window === "undefined"
    ) {
      console.warn(`[API Warning] Empty response from ${url}`);
    }
    return null as T;
  }

  // Parse JSON
  try {
    return JSON.parse(responseText) as T;
  } catch (e) {
    if (
      process.env.NODE_ENV === "development" &&
      typeof window === "undefined"
    ) {
      console.error(`[API Error] JSON parse error for URL: ${url}`, e);
      console.error(
        `[API Error] Response was not JSON. Content-Type: ${contentType}`
      );
      console.error(
        `[API Error] Response body (first 500 chars):`,
        responseText.substring(0, 500)
      );
    }
    return null as T;
  }
}

/**
 * Safe GET that returns ApiResult instead of throwing
 */
export async function safeApiGet<T = unknown>(
  endpoint: string,
  options?: FetchOptions
): Promise<ApiResult<T>> {
  try {
    const data = await apiGet<T>(endpoint, {
      ...options,
      suppressErrorLog: true,
    });
    return { success: true, data };
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        success: false,
        error: error.message,
        status: error.status,
      };
    }
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Generic PUT request helper
 */
export async function apiPut<T = unknown>(
  endpoint: string,
  body?: unknown,
  options?: Omit<FetchOptions, "revalidate">
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers: HeadersInit = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  if (options?.authToken) {
    headers["Authorization"] = `Bearer ${options.authToken}`;
  }

  const res = await fetch(url, {
    method: "PUT",
    headers,
    body: body ? JSON.stringify(body) : undefined,
    next: {
      tags: options?.tags,
    },
  });

  const contentType = res.headers.get("content-type") || "";
  const responseText = await res.text();

  if (process.env.NODE_ENV === "development" && typeof window === "undefined") {
    console.log(`[API Response] ${res.status} ${res.statusText} for ${url}`);
    console.log(`[API Response] Content-Type: ${contentType}`);
    console.log(`[API Response] Body length: ${responseText.length} bytes`);
  }

  if (!res.ok) {
    const errorText =
      responseText.length > 500
        ? responseText.substring(0, 500) + "..."
        : responseText || res.statusText;

    if (!options?.suppressErrorLog) {
      console.error(`[API Error] ${res.status} ${res.statusText}`);
      console.error(`[API Error] URL: ${url}`);
      console.error(`[API Error] Response: ${errorText.substring(0, 200)}`);
    }

    throw new ApiError(
      `API error ${res.status}: ${errorText}`,
      res.status,
      url
    );
  }

  if (!responseText || responseText.trim().length === 0) {
    if (
      process.env.NODE_ENV === "development" &&
      typeof window === "undefined"
    ) {
      console.warn(`[API Warning] Empty response from ${url}`);
    }
    return null as T;
  }

  try {
    return JSON.parse(responseText) as T;
  } catch (e) {
    if (
      process.env.NODE_ENV === "development" &&
      typeof window === "undefined"
    ) {
      console.error(`[API Error] JSON parse error for URL: ${url}`, e);
      console.error(
        `[API Error] Response was not JSON. Content-Type: ${contentType}`
      );
      console.error(
        `[API Error] Response body (first 500 chars):`,
        responseText.substring(0, 500)
      );
    }
    return null as T;
  }
}

/**
 * Generic DELETE request helper
 */
export async function apiDelete<T = unknown>(
  endpoint: string,
  options?: Omit<FetchOptions, "revalidate">
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers: HeadersInit = {
    Accept: "application/json",
  };

  if (options?.authToken) {
    headers["Authorization"] = `Bearer ${options.authToken}`;
  }

  const res = await fetch(url, {
    method: "DELETE",
    headers,
    next: {
      tags: options?.tags,
    },
  });

  const contentType = res.headers.get("content-type") || "";
  const responseText = await res.text();

  if (process.env.NODE_ENV === "development" && typeof window === "undefined") {
    console.log(`[API Response] ${res.status} ${res.statusText} for ${url}`);
    console.log(`[API Response] Content-Type: ${contentType}`);
    console.log(`[API Response] Body length: ${responseText.length} bytes`);
  }

  if (!res.ok) {
    const errorText =
      responseText.length > 500
        ? responseText.substring(0, 500) + "..."
        : responseText || res.statusText;

    if (!options?.suppressErrorLog) {
      console.error(`[API Error] ${res.status} ${res.statusText}`);
      console.error(`[API Error] URL: ${url}`);
      console.error(`[API Error] Response: ${errorText.substring(0, 200)}`);
    }

    throw new ApiError(
      `API error ${res.status}: ${errorText}`,
      res.status,
      url
    );
  }

  if (!responseText || responseText.trim().length === 0) {
    if (
      process.env.NODE_ENV === "development" &&
      typeof window === "undefined"
    ) {
      console.warn(`[API Warning] Empty response from ${url}`);
    }
    return null as T;
  }

  try {
    return JSON.parse(responseText) as T;
  } catch (e) {
    if (
      process.env.NODE_ENV === "development" &&
      typeof window === "undefined"
    ) {
      console.error(`[API Error] JSON parse error for URL: ${url}`, e);
      console.error(
        `[API Error] Response was not JSON. Content-Type: ${contentType}`
      );
      console.error(
        `[API Error] Response body (first 500 chars):`,
        responseText.substring(0, 500)
      );
    }
    return null as T;
  }
}

/**
 * Safe POST that returns ApiResult instead of throwing
 */
export async function safeApiPost<T = unknown>(
  endpoint: string,
  body?: unknown,
  options?: Omit<FetchOptions, "revalidate">
): Promise<ApiResult<T>> {
  try {
    const data = await apiPost<T>(endpoint, body, {
      ...options,
      suppressErrorLog: true,
    });
    return { success: true, data };
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        success: false,
        error: error.message,
        status: error.status,
      };
    }
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Safe PUT that returns ApiResult instead of throwing
 */
export async function safeApiPut<T = unknown>(
  endpoint: string,
  body?: unknown,
  options?: Omit<FetchOptions, "revalidate">
): Promise<ApiResult<T>> {
  try {
    const data = await apiPut<T>(endpoint, body, {
      ...options,
      suppressErrorLog: true,
    });
    return { success: true, data };
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        success: false,
        error: error.message,
        status: error.status,
      };
    }
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Safe DELETE that returns ApiResult instead of throwing
 */
export async function safeApiDelete<T = unknown>(
  endpoint: string,
  options?: Omit<FetchOptions, "revalidate">
): Promise<ApiResult<T>> {
  try {
    const data = await apiDelete<T>(endpoint, {
      ...options,
      suppressErrorLog: true,
    });
    return { success: true, data };
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        success: false,
        error: error.message,
        status: error.status,
      };
    }
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

// ===== Support Tickets API =====

/**
 * Get all support tickets
 */
export async function getSupportTickets(
  options?: FetchOptions
): Promise<ApiResult<any>> {
  return safeApiGet("/support-tickets", options);
}

/**
 * Get a single support ticket by ID
 */
export async function getSupportTicket(
  id: string,
  options?: FetchOptions
): Promise<ApiResult<any>> {
  const safeId = encodeURIComponent(id);
  return safeApiGet(`/support-tickets/${safeId}`, options);
}

/**
 * Create a new support ticket
 */
export async function createSupportTicket(
  data: any,
  options?: Omit<FetchOptions, "revalidate">
): Promise<ApiResult<any>> {
  return safeApiPost("/support-tickets", data, options);
}

/**
 * Update an existing support ticket
 */
export async function updateSupportTicket(
  id: string,
  data: any,
  options?: Omit<FetchOptions, "revalidate">
): Promise<ApiResult<any>> {
  const safeId = encodeURIComponent(id);
  return safeApiPut(`/support-tickets/${safeId}`, data, options);
}

/**
 * Get support tickets for a specific user
 */
export async function getUserSupportTickets(
  userId: string,
  options?: FetchOptions
): Promise<ApiResult<any>> {
  const safeUserId = encodeURIComponent(userId);
  return safeApiGet(`/users/${safeUserId}/support-tickets`, options);
}

// ===== Feedbacks API =====

/**
 * Get all feedbacks
 */
export async function getFeedbacks(
  options?: FetchOptions
): Promise<ApiResult<any>> {
  return safeApiGet("/feedbacks", options);
}

/**
 * Get a single feedback by ID
 */
export async function getFeedback(
  id: string,
  options?: FetchOptions
): Promise<ApiResult<any>> {
  const safeId = encodeURIComponent(id);
  return safeApiGet(`/feedbacks/${safeId}`, options);
}

/**
 * Create a new feedback
 */
export async function createFeedback(
  data: any,
  options?: Omit<FetchOptions, "revalidate">
): Promise<ApiResult<any>> {
  return safeApiPost("/feedbacks", data, options);
}

/**
 * Update an existing feedback
 */
export async function updateFeedback(
  id: string,
  data: any,
  options?: Omit<FetchOptions, "revalidate">
): Promise<ApiResult<any>> {
  const safeId = encodeURIComponent(id);
  return safeApiPut(`/feedbacks/${safeId}`, data, options);
}

/**
 * Delete a feedback
 */
export async function deleteFeedback(
  id: string,
  options?: Omit<FetchOptions, "revalidate">
): Promise<ApiResult<any>> {
  const safeId = encodeURIComponent(id);
  return safeApiDelete(`/feedbacks/${safeId}`, options);
}

/**
 * Get feedbacks for a specific user
 */
export async function getUserFeedbacks(
  userId: string,
  options?: FetchOptions
): Promise<ApiResult<any>> {
  const safeUserId = encodeURIComponent(userId);
  return safeApiGet(`/users/${safeUserId}/feedbacks`, options);
}
