import { NextResponse } from "next/server";
import { fetchBlogPostByGeo } from "@/app/blog/_lib/fetch-blog-post";
// Static export compatibility
export const dynamic = "force-static";
export const revalidate = 3600; // Revalidate every hour
import {
  buildBlogDetailPath,
  formatSegmentLabel,
} from "@/app/blog/_lib/location-utils";

type RouteParams = {
  country: string;
  state: string;
  city: string;
  category: string;
  slug: string;
};

export async function GET(
  _request: Request,
  context: { params: Promise<RouteParams> }
) {
  const resolved = await Promise.resolve(context.params);
  const post = await fetchBlogPostByGeo(resolved);

  if (!post) {
    return NextResponse.json(
      { error: "Post not found" },
      { status: 404, statusText: "Not Found" }
    );
  }

  const canonicalPath = buildBlogDetailPath(resolved);
  const url = `https://moydus.com${canonicalPath}`;

  return NextResponse.json({
    title: post.title,
    summary:
      post.meta_description ||
      post.excerpt ||
      `Insights on ${formatSegmentLabel(resolved.category)} from ${formatSegmentLabel(resolved.city)}.`,
    excerpt: post.excerpt,
    keywords: post.keywords ?? [],
    author: post.author_name ?? "Moydus Editorial Team",
    category: resolved.category,
    geo: {
      country: resolved.country,
      state: resolved.state,
      city: resolved.city,
    },
    published_at: post.published_at,
    updated_at: post.updated_at || post.published_at,
    read_time_minutes: post.read_time_minutes ?? post.reading_time ?? null,
    url,
  });
}
