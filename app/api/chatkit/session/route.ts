import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { currentClientSecret } = body;

    console.log("ChatKit session request:", { currentClientSecret: !!currentClientSecret });

    // ChatKit API credentials from environment variables
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
    const CHATKIT_WORKFLOW_ID = process.env.CHATKIT_WORKFLOW_ID;

    console.log("ChatKit env check:", {
      hasApiKey: !!OPENAI_API_KEY,
      hasWorkflowId: !!CHATKIT_WORKFLOW_ID,
    });

    if (!OPENAI_API_KEY || !CHATKIT_WORKFLOW_ID) {
      console.error("Missing OPENAI_API_KEY or CHATKIT_WORKFLOW_ID");
      return NextResponse.json(
        { 
          error: "ChatKit API not configured",
          client_secret: "" // ChatKit'in beklediği format
        },
        { status: 503 }
      );
    }

    // OpenAI ChatKit API'ye bağlanarak client_secret alıyoruz
    try {
      const payload = {
        workflow: {
          id: CHATKIT_WORKFLOW_ID,
        },
        user: "moydus-guest",
      } as const;

      console.log("ChatKit request payload:", payload, {
        workflowType: typeof payload.workflow,
        userType: typeof payload.user,
      });

      const response = await fetch("https://api.openai.com/v1/chatkit/sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          "OpenAI-Beta": "chatkit_beta=v1",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("OpenAI ChatKit API error:", response.status, errorText);
        return NextResponse.json(
          {
            error: `OpenAI ChatKit API error: ${response.status}`,
            detail: errorText.slice(0, 500),
            client_secret: "",
          },
          { status: response.status }
        );
      }

      const data = await response.json();
      console.log("ChatKit: Received client_secret from OpenAI", {
        hasClientSecret: !!data?.client_secret,
      });
      return NextResponse.json({
        client_secret: data.client_secret,
      });
    } catch (apiError) {
      console.error("OpenAI API call failed:", apiError);
      // Fallback: Eğer OpenAI API çağrısı başarısız olursa, hata döndür
      return NextResponse.json(
        { 
          error: "Failed to create ChatKit session",
          client_secret: ""
        },
        { status: 502 }
      );
    }
  } catch (err) {
    console.error("ChatKit session error:", err);
    return NextResponse.json(
      { 
        error: "Failed to create session",
        client_secret: ""
      },
      { status: 500 }
    );
  }
}
