import { z } from "zod";
import { Agent, AgentInputItem, Runner, withTrace, tool } from "@openai/agents";
import type { AgentResponse, Category, AgentAction } from "./types";

const WHATSAPP_PHONE_DIGITS = "15054605392";
const WHATSAPP_DISPLAY = "+1 (505) 460-5392";
const SUPPORT_EMAIL = "info@moydus.com";
const GOOGLE_MAPS_URL = "https://maps.app.goo.gl/qUTdYwJ1BtU4AEGo8";

const ClassifySchema = z.object({
  category: z.enum(["general", "template", "billing", "emergency", "career", "idea"]),
});

const classify = new Agent({
  name: "Moydus Classifier",
  model: "gpt-4.1",
  outputType: ClassifySchema,
  modelSettings: { temperature: 0 },
  instructions: `You are a careful classification assistant.
Choose exactly one category:
general | template | billing | emergency | career | idea

Definitions:
- general: pricing, packages, services, company info, sales questions, features, partnerships
- template: template/product/technical help, setup, how-to, bugs, feature questions
- billing: payments, subscription, invoices, refunds, account billing
- emergency: site down/unreachable, cannot publish due to errors, critical malfunction without user input
- career: jobs, hiring, applying
- idea: brainstorming, idea feedback, MVP planning

Rules:
- Prefer "general" unless clearly another.
- Prefer "emergency" ONLY if strict emergency definition matches.

Output JSON only: {"category":"general|template|billing|emergency|career|idea"}`,
});

const CreateTicketInput = z.object({
  email: z.string().email(),
  subject: z.string().min(3),
  message: z.string().min(5),
  category: z.enum(["general", "template", "billing", "emergency", "career", "idea"]),
  priority: z.enum(["low", "medium", "high", "urgent"]),
  siteUrl: z.string().nullable().optional(),
  metadata: z
    .object({
      language: z.literal("en"),
      page: z.string().nullable().optional(),
      userAgent: z.string().nullable().optional(),
    })
    .optional(),
  transcript: z.string().optional(),
});

const CreateTicketOutput = z.object({
  success: z.boolean(),
  ticketId: z.string().optional(),
  publicId: z.string().optional(),
  error: z.string().optional(),
});

// Conditional tool creation to avoid build-time errors
let create_support_ticket: ReturnType<typeof tool> | null = null;

try {
  // Only create tool at runtime, not during build
  if (typeof window === 'undefined' && process.env.NEXT_PHASE !== 'phase-production-build') {
    create_support_ticket = tool({
      name: "create_support_ticket",
      description: "Create a support ticket in Moydus Laravel helpdesk. Emergency requires siteUrl.",
      inputSchema: CreateTicketInput,
      outputSchema: CreateTicketOutput,
      execute: async (input) => {
    if (input.category === "emergency") {
      const url = (input.siteUrl ?? "").trim();
      if (!url) return { success: false, error: "Emergency tickets require siteUrl." };
    }

    const res = await fetch("https://api.moydus.com/api/support/tickets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: input.email,
        subject: input.subject,
        message: input.message,
        category: input.category,
        priority: input.priority,
        siteUrl: input.siteUrl ?? null,
        metadata: input.metadata ?? { language: "en", page: null, userAgent: null },
        transcript: input.transcript ?? "",
      }),
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      return {
        success: false,
        error: data?.error || `Ticket API error: ${res.status} ${res.statusText}`,
      };
    }

    return {
      success: Boolean(data?.success),
      ticketId: data?.ticketId,
      publicId: data?.publicId,
      error: data?.error,
    };
  },
});

function buildSupportActions(category: Category): AgentAction[] {
  const subject =
    category === "emergency"
      ? "Emergency Support Request"
      : category === "billing"
        ? "Billing Support Request"
        : category === "career"
          ? "Careers Inquiry"
          : category === "template"
            ? "Template / Technical Support"
            : category === "idea"
              ? "Idea / Consultation"
              : "Moydus Inquiry";

  return [
    { kind: "WHATSAPP", label: `WhatsApp (${WHATSAPP_DISPLAY})`, value: `https://wa.me/${WHATSAPP_PHONE_DIGITS}` },
    { kind: "EMAIL", label: `Email (${SUPPORT_EMAIL})`, value: `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(subject)}` },
    { kind: "TICKET", label: "Create a ticket", value: "ticket.create" },
    { kind: "MAPS", label: "Directions (Google Maps)", value: GOOGLE_MAPS_URL },
  ];
}

function extractFirstUrl(text: string): string | null {
  const m = text.match(/(https?:\/\/\S+|www\.\S+)/i);
  return m?.[0] ?? null;
}

function wantsSupport(text: string): boolean {
  const s = text.toLowerCase();
  return (
    s.includes("support") ||
    s.includes("human") ||
    s.includes("ticket") ||
    s.includes("whatsapp") ||
    s.includes("email") ||
    s.includes("contact")
  );
}

function looksBlocked(text: string): boolean {
  const s = text.toLowerCase();
  return (
    s.includes("can't publish") ||
    s.includes("cannot publish") ||
    s.includes("publish failed") ||
    s.includes("site is down") ||
    s.includes("unreachable") ||
    s.includes("payment failed") ||
    s.includes("blocked")
  );
}

const MoydusConcierge = new Agent({
  name: "Moydus Concierge",
  model: "gpt-4.1",
  tools: create_support_ticket ? [create_support_ticket] : [],
  modelSettings: { temperature: 0.6, maxTokens: 1400 },
  instructions: `You are "Moydus Concierge" on moydus.com. Always respond in English.

Hard rules:
- Do not invent facts (pricing, timelines, policies) beyond COMPANY FACTS.
- If a detail is missing, say: “I don’t have that confirmed yet—share 1–2 details and I’ll guide you.” Offer WhatsApp/email/ticket.
- Keep answers concise (3–8 sentences) unless user asks for more. Ask 1–2 questions at a time.
- Never ask for passwords, API keys, full card numbers, CVV, or one-time codes.

Pricing behavior:
- If user asks “How much?” ask 2–4 questions: project type, pages/features, CMS/admin needs, deadline, budget (optional).
- Recommend one package if it matches. Provide the published price/range + timeline, then offer next step.
- Never promise an exact date without content readiness.

Emergency:
- Emergency ONLY if: site down/unreachable, publishing blocked by errors, or critical malfunction without user input.
- Collect website URL before escalation or ticket for emergency.

Support escalation:
- If user asks for a human, is blocked, or after 2–3 troubleshooting turns: show contact options (WhatsApp, Email, Ticket, Maps when applicable).

You will receive CATEGORY in system context:
CATEGORY=general|template|billing|emergency|career|idea

Category behavior:
- general: answer; for quotes ask scope/timeline; avoid inventing prices.
- template: ask template name + page URL optional; give short steps.
- billing: ask account email + exact error; give safe steps.
- career: ask role + location/remote + portfolio/LinkedIn.
- idea: ask target user, problem, MVP scope; propose fastest plan.
- emergency: ask for website URL FIRST. Do not escalate without URL.

COMPANY FACTS (only use these):
- Name: Moydus. Type: Web design & development studio + platform (Next.js / Laravel / Filament, SEO + GEO, automations). Timezone: Europe/Istanbul. Primary language: English.
- Contact: info@moydus.com, WhatsApp/Phone: +1 505 460 5392 (https://wa.me/15054605392). Address: 1209 Mountain Road Place Northeast, Ste N, Albuquerque, NM 87110, United States. Maps: https://maps.app.goo.gl/qUTdYwJ1BtU4AEGo8.
- Services: Websites (Next.js), CMS/Admin (Laravel/Filament), E-commerce & B2B/Wholesale, SEO + GEO foundations, automations/integrations/analytics, optional GBP/Apple Business Connect/reviews/social workflows.
- Packages:
  1) Starter — $2,150 one-time (standard scope). Scope: 1–3 pages + lead capture. Delivery: 3–7 business days after content ready. Maintenance: $100–$150/mo.
  2) CMS Suite (recommended) — $2,950 one-time. Scope: 5–12 pages + admin panel + roles/permissions + workflows. Delivery: 10–20 business days (2–4 weeks). Maintenance: $125–$175/mo.
  3) Business (E-commerce / growth automation) — starting from $4,950 (depends on catalog/payments/shipping/integrations). Delivery: 4–8 weeks (longer if integrations complex). Maintenance: $175–$250/mo.
  4) Custom (SaaS / multi-tenant / advanced integrations) — priced after discovery. Delivery: 6–12+ weeks depending on features/QA. Maintenance: project-specific retainer.
- Delivery rules: timelines start after scope confirmed + access/assets provided + deposit/payment (if applicable). Faster possible for Starter if content ready.
- Maintenance: updates, monitoring, backups, performance/security, minor improvements (larger features are scoped separately).

Escalation:
- If user asks for support/human/ticket or appears blocked, offer support options. Emergency requires siteUrl before showing support actions.`,
});

export async function runWorkflow(input_as_text: string): Promise<AgentResponse> {
  return await withTrace("Moydus Concierge Workflow", async () => {
    const runner = new Runner({ traceMetadata: { __trace_source__: "moydus" } });

    const userText = input_as_text.trim();

    const classifyRun = await runner.run(classify, [
      { role: "user", content: [{ type: "input_text", text: userText }] },
    ]);
    const category = classifyRun.finalOutput?.category as Category | undefined;
    if (!category) throw new Error("Classifier output missing.");

    const contextMsg: AgentInputItem = {
      role: "system",
      content: [{ type: "input_text", text: `CATEGORY=${category}` }],
    };

    const conciergeRun = await runner.run(MoydusConcierge, [
      contextMsg,
      { role: "user", content: [{ type: "input_text", text: userText }] },
    ]);

    const replyText =
      (conciergeRun as any)?.finalOutputText ||
      (typeof (conciergeRun as any)?.finalOutput === "string"
        ? (conciergeRun as any).finalOutput
        : (conciergeRun as any)?.finalOutput?.reply ||
          (conciergeRun as any)?.finalOutput?.text ||
          "");

    if (!replyText) throw new Error("Agent output missing.");

    const url = extractFirstUrl(userText);
    const needSupportUI = wantsSupport(userText) || looksBlocked(userText);

    const emergencyNeedsUrl = category === "emergency" && !url;

    const actions =
      needSupportUI && !emergencyNeedsUrl ? buildSupportActions(category) : undefined;

    return {
      category,
      reply: replyText,
      actions,
      lead: {
        intent: needSupportUI ? "high" : "low",
        summary: needSupportUI ? `Support requested (${category})` : undefined,
      },
    };
  });
}
