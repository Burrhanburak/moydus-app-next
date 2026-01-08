import { NextResponse } from "next/server";

// ChatKit CustomApiConfig için endpoint
// ChatKit bu endpoint'e çeşitli istekler gönderir (sessions, messages, threads, etc.)

export async function POST(req: Request) {
  try {
    const url = new URL(req.url);
    const path = url.pathname.replace("/api/chatkit", "");
    
    console.log("ChatKit API request:", {
      url: req.url,
      pathname: url.pathname,
      path,
      method: req.method,
      headers: Object.fromEntries(req.headers.entries()),
    });

    let body = {};
    try {
      body = await req.json();
      console.log("ChatKit API body:", body);
    } catch (e) {
      console.log("ChatKit API: No body or invalid JSON");
    }

    // ChatKit'in beklediği format için OpenAI API'ye proxy yapıyoruz
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
    const CHATKIT_WORKFLOW_ID = process.env.CHATKIT_WORKFLOW_ID;

    if (!OPENAI_API_KEY || !CHATKIT_WORKFLOW_ID) {
      console.error("Missing OPENAI_API_KEY or CHATKIT_WORKFLOW_ID");
      return NextResponse.json(
        { error: "ChatKit API not configured" },
        { status: 503 }
      );
    }

    // ChatKit'in gönderdiği isteği OpenAI API'ye yönlendiriyoruz
    // ChatKit muhtemelen /sessions, /threads, /messages gibi endpoint'lere istek atıyor
    const openaiPath = path || "/sessions"; // Default to sessions
    
    try {
      const response = await fetch(`https://api.openai.com/v1/chatkit${openaiPath}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          workflow_id: CHATKIT_WORKFLOW_ID,
          ...body,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("OpenAI ChatKit API error:", response.status, errorText);
        return NextResponse.json(
          { error: errorText },
          { status: response.status }
        );
      }

      const data = await response.json();
      console.log("ChatKit: Success response from OpenAI");
      return NextResponse.json(data);
    } catch (apiError) {
      console.error("OpenAI API call failed:", apiError);
      return NextResponse.json(
        { error: "Failed to call OpenAI API" },
        { status: 502 }
      );
    }
  } catch (err) {
    console.error("ChatKit API error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// GET, PUT, DELETE gibi diğer HTTP method'ları için de handler ekleyebiliriz
export async function GET(req: Request) {
  return POST(req);
}

export async function PUT(req: Request) {
  return POST(req);
}

export async function DELETE(req: Request) {
  return POST(req);
}

