import { NextResponse } from "next/server";

export const runtime = "nodejs";

const ELEVEN_API_KEY = process.env.ELEVENLABS_API_KEY!;
const DEFAULT_VOICE_ID =
  process.env.ELEVENLABS_VOICE_ID || "21m00Tcm4TlvDq8ikWAM"; // örnek

export async function POST(req: Request) {
  try {
    if (!ELEVEN_API_KEY) {
      return NextResponse.json(
        { error: "Missing ELEVENLABS_API_KEY" },
        { status: 500 }
      );
    }

    const { text, voiceId } = await req.json();

    if (!text || typeof text !== "string") {
      return NextResponse.json({ error: "Missing text" }, { status: 400 });
    }

    const vId =
      typeof voiceId === "string" && voiceId.trim()
        ? voiceId.trim()
        : DEFAULT_VOICE_ID;

    const elevenRes = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${encodeURIComponent(vId)}`,
      {
        method: "POST",
        headers: {
          "xi-api-key": ELEVEN_API_KEY,
          "Content-Type": "application/json",
          Accept: "audio/mpeg",
        },
        body: JSON.stringify({
          text,
          model_id: "eleven_multilingual_v2",
          voice_settings: {
            stability: 0.4,
            similarity_boost: 0.8,
            style: 0.2,
            use_speaker_boost: true,
          },
        }),
      }
    );

    if (!elevenRes.ok) {
      const details = await elevenRes.text().catch(() => "");
      return NextResponse.json(
        { error: "ElevenLabs failed", status: elevenRes.status, details },
        { status: 502 }
      );
    }

    const audio = await elevenRes.arrayBuffer();

    return new NextResponse(audio, {
      status: 200,
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "no-store",
      },
    });
  } catch (e: any) {
    return NextResponse.json(
      { error: "Server error", details: e?.message },
      { status: 500 }
    );
  }
}
