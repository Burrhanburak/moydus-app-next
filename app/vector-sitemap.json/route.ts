import { getVectorSitemap } from "@/app/actions/ai-actions";
import { NextResponse } from "next/server";

export async function GET() {
  const result = await getVectorSitemap();

  if (!result.success) {
    return NextResponse.json(
      { error: result.error || "Failed to fetch vector sitemap" },
      { status: 500 }
    );
  }

  return NextResponse.json({
    generated_at: new Date().toISOString(),
    ...result.data,
  });
}

