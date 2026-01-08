import { NextResponse } from "next/server";
import { runWorkflow } from "@/lib/support/workflow";

// Use Node.js runtime (not Edge) because workflow uses Node.js APIs
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const text = String(body?.text ?? "").trim();
    if (!text) return NextResponse.json({ error: "Missing text" }, { status: 400 });

    const result = await runWorkflow(text);
    return NextResponse.json(result);
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message ?? "Server error" },
      { status: 500 }
    );
  }
}
