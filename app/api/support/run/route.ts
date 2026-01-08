import { NextResponse } from "next/server";

// Use Node.js runtime (not Edge) because workflow uses Node.js APIs
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Skip during build - this route uses @openai/agents which has build-time issues
export const revalidate = false;

// Lazy import to avoid build-time errors with @openai/agents
export async function POST(req: Request) {
  // Skip during build
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    return NextResponse.json({ error: "Route not available during build" }, { status: 503 });
  }

  try {
    // Dynamic import to avoid build-time evaluation
    const { runWorkflow } = await import("@/lib/support/workflow");
    
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
