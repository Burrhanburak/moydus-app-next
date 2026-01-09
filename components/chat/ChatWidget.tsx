"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { X } from "lucide-react";
import { ChatKit, useChatKit } from "@openai/chatkit-react";
import type { ChatKitOptions, HostedApiConfig } from "@openai/chatkit";
import { AIInput } from "./AIInput";
import { cn } from "@/lib/utils";
import { Turnstile } from "next-turnstile";

// Official Moydus info
const MOYDUS_ADDRESS_LINE =
  "1209 Mountain Road Place Northeast, Ste N, Albuquerque, NM 87110, United States";
const MOYDUS_MAPS_DIRECTIONS = "https://maps.app.goo.gl/BMXB9HcvDLrJsAWY6";
const MOYDUS_DOCS = "https://docs.moydus.com";
const WHATSAPP_PHONE_DIGITS = "15054605392"; // +1 505 460 5392
const WHATSAPP_DISPLAY = "+1 (505) 460-5392";
const SUPPORT_EMAIL = "info@moydus.com";
const MOYDUS_EMAIL_MAILTO = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(
  "Moydus Support Request"
)}`;

type TicketCategory = "template" | "billing" | "emergency";
type TicketPriority = "low" | "medium" | "high" | "urgent";

type Role = "user" | "assistant";
type Msg = { id: string; role: Role; text: string };

function uid() {
  return Math.random().toString(16).slice(2) + Date.now().toString(16);
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [mountKey, setMountKey] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  const [error, setError] = useState<string | null>(null);
  const [scriptError, setScriptError] = useState<string | null>(null);
  const [scriptReady, setScriptReady] = useState(
    typeof window !== "undefined" && !!customElements.get("openai-chatkit")
  );

  const [messages, setMessages] = useState<Msg[]>([]);
  const [actions, setActions] = useState<any[]>([]);

  // Ticket modal state
  const [showModal, setShowModal] = useState(false);
  const [category, setCategory] = useState<TicketCategory>("template");
  const [priority, setPriority] = useState<TicketPriority>("medium");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("Support request");
  const [message, setMessage] = useState("");
  const [siteUrl, setSiteUrl] = useState("");
  const [submitBusy, setSubmitBusy] = useState(false);
  const [submitOk, setSubmitOk] = useState<{
    ticketId?: string;
    publicId?: string;
  } | null>(null);
  const [submitErr, setSubmitErr] = useState<string | null>(null);
  const [turnstileStatus, setTurnstileStatus] = useState<
    "success" | "error" | "expired" | "required"
  >("required");
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  const envScriptUrl = process.env.NEXT_PUBLIC_CHATKIT_SCRIPT_URL;
  const isEnvUrlValid =
    envScriptUrl?.startsWith("http://") || envScriptUrl?.startsWith("https://");

  const primaryScriptUrl = isEnvUrlValid
    ? envScriptUrl
    : "https://cdn.platform.openai.com/deployments/chatkit/chatkit.js";

  const proxyScriptUrl = "/api/chatkit/script";
  const fallbackScriptUrl = "/chatkit.js";

  // Load the ChatKit web component script
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (customElements.get("openai-chatkit")) {
      setScriptReady(true);
      return;
    }

    // Check if script is already being loaded by layout.tsx
    const existingScript = document.querySelector(
      'script[data-chatkit-loader="true"]'
    );
    if (existingScript) {
      // Wait for the existing script to load
      const checkInterval = setInterval(() => {
        if (customElements.get("openai-chatkit")) {
          setScriptReady(true);
          clearInterval(checkInterval);
        }
      }, 100);

      const timeout = setTimeout(() => {
        clearInterval(checkInterval);
        // If still not loaded after 10 seconds, try our own loading
        if (!customElements.get("openai-chatkit")) {
          // Continue with loading logic below
        }
      }, 10000);

      return () => {
        clearInterval(checkInterval);
        clearTimeout(timeout);
      };
    }

    if (envScriptUrl && !isEnvUrlValid) {
      setScriptError(
        `Invalid ChatKit script URL: "${envScriptUrl}". Use full http(s).`
      );
      return;
    }

    // Remove fallbackScriptUrl since it doesn't exist and causes 404
    const scriptUrls = [
      primaryScriptUrl,
      proxyScriptUrl,
    ].filter((u, i, arr) => !!u && arr.indexOf(u) === i);

    let cancelled = false;
    let timeoutId: number | null = null;
    let currentScript: HTMLScriptElement | null = null;
    let attempt = 0;

    const cleanup = () => {
      if (currentScript) {
        currentScript.removeEventListener("error", onErr);
        currentScript.removeEventListener("load", onLoad);
      }
      if (timeoutId) window.clearTimeout(timeoutId);
    };

    const onErr = () => {
      if (cancelled) return;
      cleanup();
      attempt += 1;
      if (attempt < scriptUrls.length && scriptUrls[attempt]) {
        load(scriptUrls[attempt]!);
      } else {
        setScriptError(
          "Chat interface failed to load. Allow CDN domain, use /api/chatkit/script, or put chatkit.js in /public."
        );
      }
    };

    const onLoad = () => {
      if (cancelled) return;
      if (customElements.get("openai-chatkit")) {
        setScriptReady(true);
        cleanup();
      } else {
        onErr();
      }
    };

    const load = (url: string) => {
      const s = document.createElement("script");
      currentScript = s;
      s.src = url;
      s.async = true;
      s.type = "module";
      s.crossOrigin = "anonymous";
      s.dataset.chatkitLoader = "true";
      s.addEventListener("error", onErr);
      s.addEventListener("load", onLoad);
      document.body.appendChild(s);

      timeoutId = window.setTimeout(() => {
        if (!customElements.get("openai-chatkit")) onErr();
      }, 8000);
    };

    if (scriptUrls[attempt]) load(scriptUrls[attempt]!);

    return () => {
      cancelled = true;
      cleanup();
    };
  }, [
    primaryScriptUrl,
    proxyScriptUrl,
    fallbackScriptUrl,
    envScriptUrl,
    isEnvUrlValid,
  ]);

  const openLink = (url: string) => {
    try {
      window.open(url, "_blank", "noreferrer");
    } catch (e) {
      console.warn("Failed to open link", e);
    }
  };

  const openTicketModal = (
    preset?: Partial<{ category: TicketCategory; subject: string }>
  ) => {
    setSubmitOk(null);
    setSubmitErr(null);
    setEmail("");
    setMessage("");
    setSiteUrl("");
    const cat = preset?.category ?? "template";
    setCategory(cat);
    setPriority(
      cat === "emergency" ? "urgent" : cat === "billing" ? "medium" : "medium"
    );
    setSubject(preset?.subject ?? "Support request");
    setShowModal(true);
  };

  const options = useMemo<ChatKitOptions>(
    () => ({
      api: {
        async getClientSecret(currentClientSecret: string | null) {
          try {
            const response = await fetch("/api/chatkit/session", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ currentClientSecret }),
            });

            if (!response.ok) {
              const t = await response.text();
              console.error("ChatKit session error:", response.status, t);
              throw new Error(`API error: ${response.status}`);
            }

            const data = await response.json();
            const clientSecret = data.client_secret || data.clientSecret || "";
            if (!clientSecret)
              setError(
                "Chat service is not configured. Please check API settings."
              );
            return clientSecret;
          } catch (err) {
            console.error(err);
            setError("Chat service is not configured. Please contact support.");
            return "";
          }
        },
      } as HostedApiConfig,

      onError(event: unknown) {
        console.error("ChatKit error:", event);
        setError(
          event && typeof event === "object" && "message" in event
            ? String((event as { message: unknown }).message)
            : "Chat service encountered an error."
        );
      },

      theme: {
        colorScheme: "dark",
        radius: "pill",
        density: "normal",
        color: {
          grayscale: { hue: 0, tint: 0, shade: -4 },
          surface: { background: "#000000", foreground: "#141414" },
        },
        typography: {
          baseSize: 16,
          fontFamily:
            '"OpenAI Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
          fontFamilyMono:
            'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Courier New", monospace',
          fontSources: [
            {
              family: "OpenAI Sans",
              src: "https://cdn.openai.com/common/fonts/openai-sans/v2/OpenAISans-Regular.woff2",
              weight: 400,
              style: "normal",
              display: "swap",
            },
            {
              family: "OpenAI Sans",
              src: "https://cdn.openai.com/common/fonts/openai-sans/v2/OpenAISans-Medium.woff2",
              weight: 500,
              style: "normal",
              display: "swap",
            },
            {
              family: "OpenAI Sans",
              src: "https://cdn.openai.com/common/fonts/openai-sans/v2/OpenAISans-SemiBold.woff2",
              weight: 600,
              style: "normal",
              display: "swap",
            },
          ],
        },
      },

      composer: {
        placeholder: "Tell us confirm scope, pricing, or support…",
        attachments: { enabled: true, maxCount: 5, maxSize: 10 * 1024 * 1024 },
        tools: [
          {
            id: "pricing",
            label: "Pricing & packages",
            shortLabel: "Pricing",
            placeholderOverride: "Tell us your goals + deadline…",
            icon: "circle-question",
            pinned: true,
          },
          {
            id: "scope",
            label: "Define project scope",
            shortLabel: "Scope",
            placeholderOverride: "Describe your project briefly…",
            icon: "circle-question",
            pinned: true,
          },
          {
            id: "support",
            label: "Support",
            shortLabel: "Support",
            placeholderOverride: "Describe the issue…",
            icon: "circle-question",
            pinned: true,
          },
          {
            id: "search_docs",
            label: "Search docs",
            shortLabel: "Docs",
            placeholderOverride: "Search documentation…",
            icon: "book-open",
            pinned: false,
          },
          {
            id: "maps",
            label: "Directions",
            shortLabel: "Maps",
            placeholderOverride: "Open directions…",
            icon: "circle-question",
            pinned: false,
          },
        ],
      },

      startScreen: {
        greeting: "Welcome to Moydus",
        prompts: [
          {
            icon: "circle-question" as const,
            label: "Define project scope",
            prompt:
              "Help me define the scope for a project. Ask 2–4 key questions, then summarize pages, features, integrations, and deliverables.",
          },
          {
            icon: "circle-question" as const,
            label: "Estimate timeline & budget range",
            prompt:
              "Estimate timeline & budget range using Moydus packages. Ask 2–4 clarifying questions first, then map to Starter / CMS Suite / Business / Custom.",
          },
          {
            icon: "circle-question" as const,
            label: "Recommend the right package",
            prompt:
              "Help me choose the right Moydus package based on goals, timeline, and required features. Ask 2–4 clarifying questions, then recommend exactly one package.",
          },
          {
            icon: "circle-question" as const,
            label: "Share an idea (feedback)",
            prompt:
              "I want to share a product idea. Ask 2–4 questions, list top risks, and propose the fastest MVP plan (weeks + milestones). Keep it short.",
          },
          {
            icon: "book-open" as const,
            label: "Search documentation",
            prompt: "Search the documentation for: ",
          },
          {
            icon: "circle-question" as const,
            label: "Support",
            prompt:
              "I need support. Show the support options widget (WhatsApp / Email / Ticket). If emergency, ask for the website URL first.",
          },
          {
            icon: "circle-question" as const,
            label: "Directions",
            prompt:
              "Where is Moydus LLC located? Provide the official Albuquerque, NM address and the Google Maps directions link.",
          },
        ],
      },

      header: {
        enabled: true,
        title: { text: "Moydus Assistant" },
      },

      widgets: {
        async onAction(action: any) {
          const type = action?.type as string | undefined;
          const payload = action?.payload ?? {};

          const openLink = (url: string) => {
            try {
              window.open(url, "_blank", "noreferrer");
            } catch (e) {
              console.warn("Failed to open link", e);
            }
          };

          // WhatsApp
          if (type === "whatsapp.open") {
            const phone = String(payload.phone || WHATSAPP_PHONE_DIGITS);
            const msg = String(payload.message || "");
            const encoded = msg ? `?text=${encodeURIComponent(msg)}` : "";
            openLink(`https://wa.me/${phone}${encoded}`);
            return { ok: true };
          }

          // Email
          if (type === "email.send") {
            const fields = action?.fields || action?.formData || action?.data || {};
            const to =
              String(fields["email.to"] || payload.to || SUPPORT_EMAIL).trim() || SUPPORT_EMAIL;
            const subject = String(
              fields["email.subject"] || payload.subject || "Moydus Support Request"
            ).trim();
            const body = String(fields["email.body"] || payload.body || "").trim();

            const mailto =
              `mailto:${encodeURIComponent(to)}` +
              `?subject=${encodeURIComponent(subject)}` +
              (body ? `&body=${encodeURIComponent(body)}` : "");

            openLink(mailto);
            return { ok: true };
          }

          // Clipboard copy
          if (type === "clipboard.copy") {
            const fields = action?.fields || action?.formData || action?.data || {};
            const fieldName = String(payload.field || "");
            const text = String(payload.text || (fieldName ? fields[fieldName] : "") || "").trim();
            if (text) {
              await navigator.clipboard.writeText(text);
              return { ok: true };
            }
            return { ok: false, error: "No text to copy." };
          }

          // Ticket create -> POST to Next.js proxy
          if (type === "ticket.create") {
            const fields =
              action?.fields || action?.formData || action?.data || {};

            const email = String(fields["ticket.email"] || fields.email || "");
            const subject = String(
              fields["ticket.subject"] || fields.subject || ""
            );
            const category = String(
              fields["ticket.category"] || fields.category || "template"
            ) as TicketCategory;
            const priority = String(
              fields["ticket.priority"] || fields.priority || "medium"
            ) as TicketPriority;
            const siteUrl = String(
              fields["ticket.siteUrl"] || fields.siteUrl || ""
            );
            const message = String(
              fields["ticket.message"] || fields.message || ""
            );

            if (!email || !subject || !message)
              return { ok: false, error: "Missing required fields." };
            if (category === "emergency" && !siteUrl.trim())
              return {
                ok: false,
                error: "Emergency tickets require a website URL.",
              };

            const res = await fetch("/api/support/tickets", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email,
                subject,
                message,
                category,
                priority,
                siteUrl: siteUrl || null,
                metadata: {
                  language: "en",
                  page: window.location?.href || null,
                  userAgent: navigator.userAgent || null,
                },
                transcript: "",
              }),
            });

            const data = await res.json().catch(() => null);

            if (!res.ok || !data?.success) {
              return {
                ok: false,
                error: data?.error || `Ticket API failed (${res.status})`,
              };
            }
            return {
              ok: true,
              ticketId: data.ticketId,
              publicId: data.publicId,
            };
          }

          // Lead create -> POST to Next.js proxy
          if (type === "lead.create") {
            const fields = action?.fields || action?.data || {};
            const email = String(fields["lead.email"] || fields.email || "");
            const projectType = String(fields["lead.projectType"] || "website");
            const budget = String(fields["lead.budget"] || "");
            const timeline = String(fields["lead.timeline"] || "");
            const brief = String(fields["lead.brief"] || "");

            if (!email || !brief)
              return { ok: false, error: "Email and brief are required." };

            const res = await fetch("/api/leads", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email,
                projectType,
                budget,
                timeline,
                brief,
                metadata: {
                  page:
                    typeof window !== "undefined" ? window.location.href : null,
                  userAgent:
                    typeof navigator !== "undefined"
                      ? navigator.userAgent
                      : null,
                },
              }),
            });

            const data = await res.json().catch(() => null);
            if (!res.ok || !data?.success) {
              return {
                ok: false,
                error: data?.error || `Lead API failed (${res.status})`,
              };
            }
            return { ok: true, leadId: data.leadId };
          }

          return { ok: false, error: "Unknown action." };
        },
      },

      onClientTool: async (toolCall: any) => {
        const id = toolCall?.tool?.id || toolCall?.id;

        if (id === "maps") {
          openLink(MOYDUS_MAPS_DIRECTIONS);
          return { opened: MOYDUS_MAPS_DIRECTIONS };
        }

        if (id === "search_docs") {
          openLink(MOYDUS_DOCS);
          return { opened: MOYDUS_DOCS, note: "Opened docs.moydus.com" };
        }

        if (id === "support") {
          // Immediately open our ticket/support modal so we don't depend on agent text
          openTicketModal({ category: "template", subject: "Support request" });
          return { mode: "support", opened: "ticket_modal" };
        }

        if (id === "pricing") {
          return { note: "Ask 2–4 questions and recommend a Moydus package." };
        }

        if (id === "scope") {
          return { note: "Ask 2–4 key scope questions then summarize." };
        }

        return {};
      },
    }),
    [envScriptUrl, isEnvUrlValid]
  );

  const { control } = useChatKit(options);
  const uiError = error || scriptError;

  const playClickSound = React.useCallback(() => {
    try {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      const audioContext = new AudioContextClass();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.value = 800;
      oscillator.type = "sine";

      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        audioContext.currentTime + 0.1
      );

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
    } catch {
      // ignore
    }
  }, []);

  // Scroll reveal
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const scrollDelta = currentScrollY - lastScrollY;

          if (!hasScrolled && currentScrollY > 100 && scrollDelta < 0) {
            setHasScrolled(true);
            setIsVisible(true);
            playClickSound();
          } else if (hasScrolled) {
            if (scrollDelta > 0 && currentScrollY > 100) {
              if (scrollTimeoutRef.current)
                clearTimeout(scrollTimeoutRef.current);
              scrollTimeoutRef.current = setTimeout(
                () => setIsVisible(false),
                300
              );
            } else if (scrollDelta < 0) {
              if (scrollTimeoutRef.current)
                clearTimeout(scrollTimeoutRef.current);
              setIsVisible(true);
            }
          }

          lastScrollY = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, [hasScrolled, playClickSound]);

  // Ticket submit via modal
  const submitTicket = async () => {
    setSubmitBusy(true);
    setSubmitOk(null);
    setSubmitErr(null);

    try {
      // Turnstile verification check
      if (turnstileStatus !== "success" || !turnstileToken) {
        setSubmitErr("Please verify you are not a robot");
        setSubmitBusy(false);
        return;
      }

      const isEmergency = category === "emergency";
      if (!email.trim()) throw new Error("Email is required.");
      if (!subject.trim()) throw new Error("Subject is required.");
      if (!message.trim()) throw new Error("Message is required.");
      if (isEmergency && !siteUrl.trim())
        throw new Error("Website URL is required for Emergency.");

      const res = await fetch("/api/support/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          subject,
          message,
          category,
          priority,
          siteUrl: isEmergency ? siteUrl : null,
          turnstileToken, // Include Turnstile token
          metadata: {
            language: "en",
            page:
              typeof window !== "undefined" ? window.location.pathname : null,
            userAgent:
              typeof window !== "undefined" ? navigator.userAgent : null,
          },
          transcript: "",
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data?.success) {
        throw new Error(data?.error || `Ticket API error: ${res.status}`);
      }

      setSubmitOk({ ticketId: data.ticketId, publicId: data.publicId });
    } catch (e: any) {
      setSubmitErr(
        e?.message || "Failed to submit. Please try WhatsApp or email."
      );
    } finally {
      setSubmitBusy(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-[9999]">
      <style jsx global>{`
        openai-chatkit {
          display: block;
          height: 100%;
          width: 100%;
          background: #000 !important;
          color-scheme: dark;
        }
      `}</style>

      {!open && (
        <div
          className={cn(
            "fixed bottom-5 right-5 z-[9999] w-[92vw] sm:w-[380px]",
            "transition-all duration-300 ease-out",
            isVisible
              ? "opacity-100 translate-y-0 translate-x-0"
              : "opacity-0 translate-y-4 translate-x-full"
          )}
        >
          <AIInput
            placeholder="Ask Moydus… (pricing, scope, support)"
            onSubmit={(value) => {
              if (value.trim()) {
                playClickSound();
                setOpen(true);
              }
            }}
            onFocus={() => {
              playClickSound();
              setOpen(true);
            }}
            className="w-full"
            minHeight={56}
          />
        </div>
      )}

      {open && (
        <div className="w-[92vw] sm:w-[380px] h-[70vh] sm:h-[520px] rounded-lg bg-black shadow-2xl border border-white/10 flex flex-col overflow-visible relative">
          <div className="absolute top-2 right-2 z-[100]">
            <button
              onClick={() => {
                setOpen(false);
                setMountKey((k) => k + 1);
              }}
              className="rounded-md px-2 py-1.5 text-xs text-white/70 hover:text-white hover:bg-white/10 transition bg-black"
              aria-label="Close chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 min-h-0 w-full relative">
            {uiError ? (
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <div className="text-center text-white/70 text-sm">
                  <p className="mb-2">{uiError}</p>
                  <p className="text-xs text-white/50">
                    Please configure ChatKit script & API settings.
                  </p>
                </div>
              </div>
            ) : !scriptReady ? (
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <div className="text-center text-white/70 text-sm">
                  <p className="mb-2">Loading chat interface…</p>
                  <p className="text-xs text-white/50">
                    If this persists, check the ChatKit script URL / allowlist.
                  </p>
                </div>
              </div>
            ) : (
              <ChatKit
                key={mountKey}
                control={control}
                style={{
                  flex: 1,
                  minHeight: 0,
                  width: "100%",
                  height: "100%",
                  background: "#000",
                }}
              />
            )}
          </div>

          {/* Support Bar */}
          <div className="border-t border-white/10 bg-black px-3 py-2 flex items-center gap-2">
            <span className="inline-flex items-center gap-2 text-xs text-white/70">
              <span className="size-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,.55)]" />
              Support
            </span>

            <div className="ml-auto flex gap-2">
              <button
                onClick={() =>
                  openLink(`https://wa.me/${WHATSAPP_PHONE_DIGITS}`)
                }
                className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs font-semibold text-white/80 hover:bg-white/10 hover:text-white transition"
                title={WHATSAPP_DISPLAY}
              >
                WhatsApp
              </button>

              <button
                onClick={() => openLink(MOYDUS_EMAIL_MAILTO)}
                className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs font-semibold text-white/80 hover:bg-white/10 hover:text-white transition"
              >
                Email
              </button>

              <button
                onClick={() =>
                  openTicketModal({
                    category: "template",
                    subject: "Support request",
                  })
                }
                className="rounded-md bg-white text-black px-2.5 py-1.5 text-xs font-semibold hover:opacity-95 transition"
              >
                Create Ticket
              </button>
            </div>
          </div>

          {/* Ticket Modal */}
          {showModal && (
            <div className="fixed inset-0 z-[10000] bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-3">
              <div className="w-[calc(100vw-1.5rem)] max-w-[360px] rounded-2xl border border-white/10 bg-[#0b0b0b] text-white shadow-2xl overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
                  <div className="flex flex-col">
                    <div className="text-sm font-semibold">
                      Create Support Ticket
                    </div>
                    <div className="text-xs text-white/60">
                      We’ll reply by email as soon as possible.
                    </div>
                  </div>
                  <button
                    onClick={() => setShowModal(false)}
                    className="rounded-md px-2 py-1 text-white/70 hover:text-white hover:bg-white/10 transition"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-4 space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs text-white/60">Category</label>
                      <select
                        className="mt-1 w-full rounded-lg bg-black border border-white/10 px-3 py-2 text-sm outline-none focus:border-white/20"
                        value={category}
                        onChange={(e) => {
                          const v = e.target.value as TicketCategory;
                          setCategory(v);
                          setPriority(
                            v === "emergency"
                              ? "urgent"
                              : v === "billing"
                                ? "medium"
                                : "medium"
                          );
                        }}
                      >
                        <option value="template">Template</option>
                        <option value="billing">Billing</option>
                        <option value="emergency">Emergency</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs text-white/60">Priority</label>
                      <select
                        className="mt-1 w-full rounded-lg bg-black border border-white/10 px-3 py-2 text-sm outline-none focus:border-white/20"
                        value={priority}
                        onChange={(e) =>
                          setPriority(e.target.value as TicketPriority)
                        }
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                        <option value="urgent">Urgent</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-white/60">Email *</label>
                    <input
                      className="mt-1 w-full rounded-lg bg-black border border-white/10 px-3 py-2 text-sm outline-none focus:border-white/20"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      inputMode="email"
                      autoComplete="email"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-white/60">Subject *</label>
                    <input
                      className="mt-1 w-full rounded-lg bg-black border border-white/10 px-3 py-2 text-sm outline-none focus:border-white/20"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="Support request"
                    />
                  </div>

                  {category === "emergency" && (
                    <div>
                      <label className="text-xs text-white/60">
                        Website URL (required for Emergency) *
                      </label>
                      <input
                        className="mt-1 w-full rounded-lg bg-black border border-white/10 px-3 py-2 text-sm outline-none focus:border-white/20"
                        value={siteUrl}
                        onChange={(e) => setSiteUrl(e.target.value)}
                        placeholder="https://yourwebsite.com"
                      />
                    </div>
                  )}

                  <div>
                    <label className="text-xs text-white/60">
                      Describe the issue *
                    </label>
                    <textarea
                      className="mt-1 w-full rounded-lg bg-black border border-white/10 px-3 py-2 text-sm outline-none focus:border-white/20 min-h-[110px]"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="What happened? What did you expect? Any error messages?"
                    />
                  </div>

                  <div className="flex justify-center">
                    <Turnstile
                      siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
                      retry="auto"
                      refreshExpired="auto"
                      sandbox={process.env.NODE_ENV === "development"}
                      onError={() => {
                        setTurnstileStatus("error");
                        setSubmitErr("Security check failed. Please try again.");
                      }}
                      onExpire={() => {
                        setTurnstileStatus("expired");
                        setSubmitErr("Security check expired. Please verify again.");
                      }}
                      onLoad={() => {
                        setTurnstileStatus("required");
                        setSubmitErr(null);
                      }}
                      onVerify={(token) => {
                        setTurnstileStatus("success");
                        setTurnstileToken(token);
                        setSubmitErr(null);
                      }}
                    />
                  </div>

                  {submitErr && (
                    <div className="text-xs text-red-300">{submitErr}</div>
                  )}
                  {submitOk && (
                    <div className="text-xs text-green-300">
                      Submitted ✅ Ticket ID: {submitOk.ticketId || "—"}
                    </div>
                  )}

                  <div className="flex gap-2">
                    <button
                      onClick={submitTicket}
                      disabled={submitBusy}
                      className="flex-1 rounded-lg bg-white text-black px-4 py-2 text-sm font-semibold disabled:opacity-60"
                    >
                      {submitBusy ? "Submitting…" : "Submit ticket"}
                    </button>

                    <button
                      onClick={() =>
                        openLink(`https://wa.me/${WHATSAPP_PHONE_DIGITS}`)
                      }
                      className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold hover:bg-white/10 transition"
                      title={WHATSAPP_DISPLAY}
                    >
                      WhatsApp
                    </button>
                  </div>

                  <div className="text-[11px] text-white/50">
                    Prefer email?{" "}
                    <a
                      className="underline underline-offset-4"
                      href={`mailto:${SUPPORT_EMAIL}`}
                    >
                      {SUPPORT_EMAIL}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
