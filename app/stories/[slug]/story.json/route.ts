import { getStory } from "@/app/actions/story-actions";
import { NextResponse } from "next/server";

export const dynamic = "force-static";
export const revalidate = 3600;

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: Promise<{
      slug: string;
    }>;
  }
) {
  const resolvedParams = await Promise.resolve(params);
  const storyResult = await getStory(resolvedParams.slug);

  if (!storyResult.success || !storyResult.data) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const story = storyResult.data;

  return NextResponse.json({
    title: story.title,
    slug: story.slug,
    url: `https://moydus.com/stories/${resolvedParams.slug}`,
    content: story.content,
    excerpt: story.excerpt,
    image: story.image_url,
    author: story.author_name || "Moydus Editorial Team",
    published_at: story.published_at,
    updated_at: story.updated_at,
    tags: story.tags ?? [],
    related_stories: story.related_stories ?? [],
  });
}
