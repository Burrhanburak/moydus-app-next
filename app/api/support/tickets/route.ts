import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const email = String(body.email || "").trim();
    const subject = String(body.subject || "").trim();
    const message = String(body.message || "").trim();
    const category = String(body.category || "template").trim();
    const priority = String(body.priority || "medium").trim();
    const siteUrl = body.siteUrl ? String(body.siteUrl) : null;

    if (!email || !subject || !message) {
      return NextResponse.json(
        { success: false, error: "Missing required fields." },
        { status: 400 }
      );
    }

    if (category === "emergency" && (!siteUrl || !siteUrl.trim())) {
      return NextResponse.json(
        { success: false, error: "Emergency tickets require siteUrl." },
        { status: 400 }
      );
    }

    const upstream = await fetch("https://api.moydus.com/api/support/tickets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // "X-MOYDUS-AGENT-KEY": process.env.MOYDUS_AGENT_KEY ?? "",
      },
      body: JSON.stringify({
        email,
        subject,
        message,
        category,
        priority,
        siteUrl,
        metadata: body.metadata ?? { language: "en", page: null, userAgent: null },
        transcript: body.transcript ?? "",
      }),
    });

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
  } catch (err) {
    return NextResponse.json(
      { success: false, error: "Server error." },
      { status: 500 }
    );
  }
}
