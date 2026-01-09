import { NextResponse } from "next/server";

// Email validation regex (basic)
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Length limits
const MAX_EMAIL_LENGTH = 255;
const MAX_SUBJECT_LENGTH = 200;
const MAX_MESSAGE_LENGTH = 5000;
const MAX_TRANSCRIPT_LENGTH = 10000;
const MAX_METADATA_SIZE = 1000; // Approximate JSON size limit

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validate agent key (required for security)
    const agentKey = process.env.MOYDUS_AGENT_KEY;
    if (!agentKey) {
      console.error("[Support Tickets] MOYDUS_AGENT_KEY not configured");
      return NextResponse.json(
        { success: false, error: "Server misconfigured." },
        { status: 500 }
      );
    }

    // Extract and validate fields
    const email = String(body.email || "").trim();
    const subject = String(body.subject || "").trim();
    const message = String(body.message || "").trim();
    const category = String(body.category || "template").trim();
    const priority = String(body.priority || "medium").trim();
    const siteUrl = body.siteUrl ? String(body.siteUrl).trim() : null;
    const transcript = String(body.transcript || "").trim();
    const metadata = body.metadata || { language: "en", page: null, userAgent: null };

    // Validation: Required fields
    if (!email || !subject || !message) {
      return NextResponse.json(
        { success: false, error: "Missing required fields." },
        { status: 400 }
      );
    }

    // Validation: Email format
    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { success: false, error: "Invalid email format." },
        { status: 400 }
      );
    }

    // Validation: Length limits
    if (email.length > MAX_EMAIL_LENGTH) {
      return NextResponse.json(
        { success: false, error: `Email exceeds maximum length of ${MAX_EMAIL_LENGTH} characters.` },
        { status: 400 }
      );
    }

    if (subject.length > MAX_SUBJECT_LENGTH) {
      return NextResponse.json(
        { success: false, error: `Subject exceeds maximum length of ${MAX_SUBJECT_LENGTH} characters.` },
        { status: 400 }
      );
    }

    if (message.length > MAX_MESSAGE_LENGTH) {
      return NextResponse.json(
        { success: false, error: `Message exceeds maximum length of ${MAX_MESSAGE_LENGTH} characters.` },
        { status: 400 }
      );
    }

    if (transcript.length > MAX_TRANSCRIPT_LENGTH) {
      return NextResponse.json(
        { success: false, error: `Transcript exceeds maximum length of ${MAX_TRANSCRIPT_LENGTH} characters.` },
        { status: 400 }
      );
    }

    // Validation: Metadata size (approximate)
    const metadataStr = JSON.stringify(metadata);
    if (metadataStr.length > MAX_METADATA_SIZE) {
      return NextResponse.json(
        { success: false, error: "Metadata too large." },
        { status: 400 }
      );
    }

    // Validation: Emergency tickets require siteUrl
    if (category === "emergency" && (!siteUrl || !siteUrl.trim())) {
      return NextResponse.json(
        { success: false, error: "Emergency tickets require siteUrl." },
        { status: 400 }
      );
    }

    // Prepare payload
    const payload = {
      email,
      subject,
      message,
      category,
      priority,
      siteUrl,
      metadata,
      transcript,
    };

    // Timeout: 10 seconds
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10_000);

    try {
      const upstream = await fetch("https://api.moydus.com/api/support/tickets", {
        method: "POST",
        cache: "no-store", // Prevent any caching
        signal: controller.signal,
        headers: {
          "Content-Type": "application/json",
          "X-MOYDUS-AGENT-KEY": agentKey,
        },
        body: JSON.stringify(payload),
      });

      clearTimeout(timeout);

      const data = await upstream.json().catch(() => null);

      if (!upstream.ok) {
        return NextResponse.json(
          {
            success: false,
            error: data?.error || `Ticket API error: ${upstream.status} ${upstream.statusText}`,
          },
          { status: 502 }
        );
      }

      return NextResponse.json({
        success: Boolean(data?.success ?? true),
        ticketId: data?.ticketId ?? data?.id ?? null,
        publicId: data?.publicId ?? null,
        error: data?.error ?? null,
      });
    } catch (fetchError: any) {
      clearTimeout(timeout);

      if (fetchError.name === "AbortError") {
        return NextResponse.json(
          { success: false, error: "Request timeout. Please try again." },
          { status: 504 }
        );
      }

      throw fetchError;
    }
  } catch (err) {
    console.error("[Support Tickets] Error:", err);
    return NextResponse.json(
      { success: false, error: "Server error." },
      { status: 500 }
    );
  }
}
