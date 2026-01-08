import { NextResponse } from "next/server";

const DEFAULT_SCRIPT_URL =
  "https://cdn.platform.openai.com/deployments/chatkit/chatkit.js";

export async function GET() {
  const sourceUrl = process.env.CHATKIT_SCRIPT_SRC || DEFAULT_SCRIPT_URL;

  try {
    const response = await fetch(sourceUrl, {
      // Let the CDN set caching headers; we add a fallback here too
      cache: "no-store",
    });

    if (!response.ok) {
      const text = await response.text();
      return NextResponse.json(
        {
          error: "Failed to fetch ChatKit script",
          status: response.status,
          body: text.slice(0, 500),
        },
        { status: 502 }
      );
    }

    const body = await response.text();
    return new NextResponse(body, {
      status: 200,
      headers: {
        "Content-Type": "text/javascript; charset=utf-8",
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch (error) {
    console.error("ChatKit script proxy error", error);
    return NextResponse.json(
      { error: "Failed to proxy ChatKit script" },
      { status: 500 }
    );
  }
}
