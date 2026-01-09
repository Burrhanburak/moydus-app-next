import { NextResponse } from "next/server";
import { fetchBlogPostByGeo } from "@/app/blog/_lib/fetch-blog-post";
// Static export compatibility
export const dynamic = "force-static";
export const revalidate = 3600; // Revalidate every hour
import { formatSegmentLabel } from "@/app/blog/_lib/location-utils";

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

  const facts = [
    {
      label: "Country",
      value: formatSegmentLabel(resolved.country),
    },
    {
      label: "State",
      value: formatSegmentLabel(resolved.state),
    },
    {
      label: "City",
      value: formatSegmentLabel(resolved.city),
    },
    {
      label: "Category",
      value: formatSegmentLabel(resolved.category),
    },
    {
      label: "Author",
      value: post.author_name ?? "Moydus Editorial Team",
    },
    {
      label: "Published",
      value: post.published_at ?? "n/a",
    },
    {
      label: "Updated",
      value: post.updated_at ?? post.published_at ?? "n/a",
    },
    {
      label: "Read Time",
      value: post.read_time_minutes
        ? `${post.read_time_minutes} min`
        : post.reading_time
        ? `${post.reading_time} min`
        : "n/a",
    },
    {
      label: "Keywords",
      value:
        Array.isArray(post.keywords) && post.keywords.length > 0
          ? post.keywords.join(", ")
          : "n/a",
    },
  ];

  return NextResponse.json({
    title: post.title,
    facts,
  });
}
