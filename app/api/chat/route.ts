import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const message = String(body.message || "");
    const sessionId = String(body.sessionId || "");

    if (!message.trim()) {
      return NextResponse.json(
        { reply: "Please type a message." },
        { status: 400 }
      );
    }

    const AGENT_ENDPOINT = process.env.AGENT_ENDPOINT!;
    const AGENT_API_KEY = process.env.AGENT_API_KEY!;

    if (!AGENT_ENDPOINT || !AGENT_API_KEY) {
      console.error("Missing AGENT_ENDPOINT or AGENT_API_KEY");
      return NextResponse.json(
        {
          reply:
            "Chat service is not configured. Please contact us via WhatsApp or email.",
          actions: [
            {
              kind: "WHATSAPP",
              label: "Chat on WhatsApp",
              value: "https://wa.me/15054605392",
            },
            {
              kind: "EMAIL",
              label: "Email us",
              value: "mailto:inbfo@moydus.com?subject=Project%20Inquiry",
            },
          ],
        },
        { status: 503 }
      );
    }

    // Example payload (adjust to your AgentBuilder spec)
    const upstream = await fetch(AGENT_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${AGENT_API_KEY}`,
      },
      body: JSON.stringify({
        sessionId,
        input: message,
      }),
    });

    if (!upstream.ok) {
      const txt = await upstream.text();
      console.error("Upstream error:", upstream.status, txt);
      return NextResponse.json(
        {
          reply:
            "We hit an upstream error. Please contact us via WhatsApp/email.",
          actions: [
            {
              kind: "WHATSAPP",
              label: "Chat on WhatsApp",
              value: "https://wa.me/15054605392",
            },
            {
              kind: "EMAIL",
              label: "Email us",
              value: "mailto:inbfo@moydus.com?subject=Project%20Inquiry",
            },
          ],
        },
        { status: 502 }
      );
    }

    const data = await upstream.json();

    // We expect agent to return { reply, actions, lead }
    // If your agent returns plain text, wrap it here.
    if (typeof data === "string") {
      return NextResponse.json({ reply: data, actions: [] });
    }

    return NextResponse.json({
      reply: data.reply ?? "Thanks—can you share a bit more detail?",
      actions: Array.isArray(data.actions) ? data.actions : [],
      lead: data.lead ?? { intent: "low" },
    });
  } catch (err) {
    console.error("Chat API error:", err);
    return NextResponse.json(
      {
        reply: "Server error. Please reach us via WhatsApp or email.",
        actions: [
          {
            kind: "WHATSAPP",
            label: "Chat on WhatsApp",
            value: "https://wa.me/15054605392",
          },
          {
            kind: "EMAIL",
            label: "Email us",
            value: "mailto:inbfo@moydus.com?subject=Project%20Inquiry",
          },
        ],
      },
      { status: 500 }
    );
  }
}

