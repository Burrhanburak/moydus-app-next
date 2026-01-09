import { NextResponse } from "next/server";
import { fetchBlogPostByGeo } from "@/app/blog/_lib/fetch-blog-post";
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

  const faqs =
    Array.isArray(post.faqs) && post.faqs.length > 0
      ? post.faqs
      : [
          {
            question: `Why focus on ${formatSegmentLabel(resolved.category)} in ${formatSegmentLabel(resolved.city)}?`,
            answer: `Local demand in ${formatSegmentLabel(resolved.city)} and the broader ${formatSegmentLabel(resolved.state)} ecosystem makes ${formatSegmentLabel(resolved.category).toLowerCase()} strategies critical.`,
          },
          {
            question: `Who is the article written for?`,
            answer:
              "Digital teams, marketers, and founders looking for playbooks that mix AI, creative, and engineering best practices.",
          },
          {
            question: `How can Moydus help ${formatSegmentLabel(resolved.city)} brands?`,
            answer:
              "By deploying turnkey squads for design, SEO, and automation projects backed by our global delivery playbooks.",
          },
        ];

  return NextResponse.json({
    title: post.title,
    faqs,
  });
}
