import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const category = String(body?.category ?? "general");
    const email = String(body?.email ?? "");
    const subject = String(body?.subject ?? "");
    const message = String(body?.message ?? "");
    const priority = String(body?.priority ?? "medium");
    const siteUrl = body?.siteUrl ? String(body.siteUrl) : null;

    if (!email || !subject || !message) {
      return NextResponse.json(
        { success: false, error: "email, subject, message are required" },
        { status: 400 }
      );
    }

    if (category === "emergency" && !siteUrl) {
      return NextResponse.json(
        { success: false, error: "Emergency requires siteUrl" },
        { status: 400 }
      );
    }

    const res = await fetch("https://api.moydus.com/api/support/tickets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        subject,
        message,
        category,
        priority,
        siteUrl,
        metadata: {
          language: "en",
          page: body?.page ?? null,
          userAgent: body?.userAgent ?? null,
        },
        transcript: body?.transcript ?? "",
      }),
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      return NextResponse.json(
        { success: false, error: data?.error || `Upstream error ${res.status}` },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: Boolean(data?.success),
      ticketId: data?.ticketId,
      publicId: data?.publicId,
      error: data?.error,
    });
  } catch (e: any) {
    return NextResponse.json(
      { success: false, error: e?.message ?? "Server error" },
      { status: 500 }
    );
  }
}
