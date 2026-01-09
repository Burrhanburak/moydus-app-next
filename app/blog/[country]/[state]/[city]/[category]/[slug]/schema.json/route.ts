import { NextResponse } from "next/server";
import { fetchBlogPostByGeo } from "@/app/blog/_lib/fetch-blog-post";
import { buildBlogDetailPath } from "@/app/blog/_lib/location-utils";
import {
  buildBlogPostingSchema,
  buildBreadcrumbSchema,
  buildWebPageSchema,
} from "@/seo/json-ld-builders";


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

  const breadcrumbItems = [
    { name: "Home", url: "https://moydus.com" },
    { name: "Blog", url: "https://moydus.com/blog" },
    {
      name: resolved.country,
      url: `https://moydus.com/blog/${resolved.country}`,
    },
    {
      name: resolved.state,
      url: `https://moydus.com/blog/${resolved.country}/${resolved.state}`,
    },
  ];

  if (resolved.city && resolved.city !== resolved.state) {
    breadcrumbItems.push({
      name: resolved.city,
      url: `https://moydus.com/blog/${resolved.country}/${resolved.state}/${resolved.city}`,
    });
  }

  breadcrumbItems.push({
    name: resolved.category,
    url: `https://moydus.com/blog/${resolved.country}/${resolved.state}/${resolved.city && resolved.city !== resolved.state ? resolved.city + "/" : ""}${resolved.category}`,
  });

  breadcrumbItems.push({
    name: post.title,
    url,
  });

  const breadcrumb = buildBreadcrumbSchema(breadcrumbItems);

  const blogSchema = buildBlogPostingSchema({
    url,
    title: post.title,
    description: post.meta_description ?? post.excerpt ?? "",
    image: post.image_url
      ? { url: post.image_url, alt: post.title }
      : undefined,
    author: {
      name: post.author_name ?? "Moydus Editorial Team",
      type: "Organization",
      url: "https://moydus.com",
    },
    geo: {
      country: resolved.country,
      state: resolved.state,
      city: resolved.city || resolved.state,
    },
    keywords: post.keywords ?? [],
    datePublished: post.published_at,
    dateModified: post.updated_at ?? post.published_at,
    readTimeMinutes: post.read_time_minutes ?? post.reading_time ?? undefined,
  });

  const pageSchema = buildWebPageSchema({
    url,
    title: post.title,
    description: post.meta_description ?? post.excerpt ?? "",
    breadcrumbItems,
  });

  return NextResponse.json({
    "@context": "https://schema.org",
    "@graph": [blogSchema, breadcrumb, pageSchema],
  });
}
