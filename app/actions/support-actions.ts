// actions/support-actions.ts
"use server";

import {
  getSupportTickets,
  getSupportTicket,
  createSupportTicket,
  updateSupportTicket,
  getUserSupportTickets,
  ApiResult,
} from "@/lib/api";

/**
 * Get all support tickets
 */
export async function getAllSupportTickets(): Promise<ApiResult<any>> {
  return getSupportTickets({
    revalidate: 60, // 1 minute cache for support tickets
    tags: ["support-tickets"],
  });
}

/**
 * Get a single support ticket by ID
 */
export async function getSupportTicketById(
  id: string
): Promise<ApiResult<any>> {
  return getSupportTicket(id, {
    revalidate: 60,
    tags: [`support-ticket:${id}`],
  });
}

/**
 * Create a new support ticket
 */
export interface CreateSupportTicketPayload {
  subject: string;
  message: string;
  category?: string;
  priority?: "low" | "medium" | "high" | "urgent";
  user_id?: string;
  email?: string;
  [key: string]: any;
}

export async function createNewSupportTicket(
  data: CreateSupportTicketPayload
): Promise<ApiResult<any>> {
  return createSupportTicket(data);
}

/**
 * Update an existing support ticket
 */
export interface UpdateSupportTicketPayload {
  subject?: string;
  message?: string;
  status?: "open" | "in_progress" | "resolved" | "closed";
  priority?: "low" | "medium" | "high" | "urgent";
  [key: string]: any;
}

export async function updateExistingSupportTicket(
  id: string,
  data: UpdateSupportTicketPayload
): Promise<ApiResult<any>> {
  return updateSupportTicket(id, data);
}

/**
 * Get support tickets for a specific user
 */
export async function getUserTickets(
  userId: string
): Promise<ApiResult<any>> {
  return getUserSupportTickets(userId, {
    revalidate: 60,
    tags: [`user-support-tickets:${userId}`],
  });
}

