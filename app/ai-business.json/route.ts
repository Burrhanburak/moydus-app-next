import { getAiBusiness } from "@/app/actions/ai-actions";
import { NextResponse } from "next/server";


export async function GET() {
  const result = await getAiBusiness();

  if (!result.success) {
    return NextResponse.json(
      { error: result.error || "Failed to fetch AI business info" },
      { status: 500 }
    );
  }

  return NextResponse.json({
    generated_at: new Date().toISOString(),
    ...result.data,
  });
}

