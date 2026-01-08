import { getServicePage } from "@/app/actions/service-actions";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: Promise<{
      country: string;
      state: string;
      city: string;
      category: string;
      slug: string;
    }>;
  }
) {
  const resolvedParams = await Promise.resolve(params);
  const serviceResult = await getServicePage(resolvedParams.slug);

  if (!serviceResult.success || !serviceResult.data) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const page = serviceResult.data;

  return NextResponse.json({
    title: page.title,
    summary: page.snippet || page.meta_description || "",
    url: `https://moydus.com/services/${resolvedParams.country}/${resolvedParams.state}/${resolvedParams.city}/${resolvedParams.category}/${resolvedParams.slug}`,
    key_points: page.key_points ?? [],
    faqs: page.faqs ?? [],
    pricing: page.pricing ?? null,
    category: page.business_type || page.page_role || resolvedParams.category,
    location: {
      country: resolvedParams.country,
      state: resolvedParams.state,
      city: resolvedParams.city,
      category: resolvedParams.category,
      slug: resolvedParams.slug,
    },
    keywords: page.keywords ?? [],
    intent: page.intent ?? null,
    updated_at: page.updated_at,
  });
}
