import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const email = String(body.email || "").trim();
    const projectType = String(body.projectType || "website").trim();
    const budget = String(body.budget || "").trim();
    const timeline = String(body.timeline || "").trim();
    const brief = String(body.brief || "").trim();

    if (!email || !brief) {
      return NextResponse.json(
        { success: false, error: "Missing required fields: email, brief." },
        { status: 400 }
      );
    }

    const upstream = await fetch("https://api.moydus.com/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // "X-MOYDUS-AGENT-KEY": process.env.MOYDUS_AGENT_KEY ?? "",
      body: JSON.stringify({
        email,
        projectType,
        budget,
        timeline,
        brief,
        source: "chatkit",
        metadata: body.metadata ?? { page: null, userAgent: null },
      }),
    });

    const data = await upstream.json().catch(() => null);

    if (!upstream.ok) {
      return NextResponse.json(
        {
          success: false,
          error:
            data?.error || `Lead API error: ${upstream.status} ${upstream.statusText}`,
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: Boolean(data?.success ?? true),
      leadId: data?.leadId ?? data?.id ?? null,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Server error." },
      { status: 500 }
    );
  }
}
