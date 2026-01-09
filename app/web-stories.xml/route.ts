import { getStories } from "@/app/actions/story-actions";
import { NextResponse } from "next/server";
export const dynamic = "force-static";
export const revalidate = 3600;


interface Story {
  slug: string;
  title?: string;
  description?: string;
  excerpt?: string;
  snippet?: string;
  poster_url?: string;
  poster?: string;
  image_url?: string;
  published_at?: string;
}

function buildEmptyFeed(): string {
  const baseUrl = "https://moydus.com";
  const feedUrl = `${baseUrl}/web-stories.xml`;
  const now = new Date().toISOString();

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>Moydus Web Stories</title>
    <link>${baseUrl}/stories</link>
    <description>Latest web stories from Moydus</description>
    <language>en-US</language>
    <lastBuildDate>${now}</lastBuildDate>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml"/>
  </channel>
</rss>`;
}

function buildStoryItem(story: Story): string {
  const baseUrl = "https://moydus.com";
  const storyUrl = `${baseUrl}/stories/${story.slug}`;
  const posterUrl = story.poster_url || story.poster || story.image_url || "";
  const pubDate = story.published_at
    ? new Date(story.published_at).toUTCString()
    : new Date().toUTCString();
  const description =
    story.description || story.excerpt || story.snippet || story.title || "";
  const title = story.title || "";

  return `
    <item>
      <title><![CDATA[${title}]]></title>
      <link>${storyUrl}</link>
      <guid isPermaLink="true">${storyUrl}</guid>
      <description><![CDATA[${description}]]></description>
      <pubDate>${pubDate}</pubDate>
      ${
        posterUrl
          ? `<media:content url="${posterUrl}" type="image/jpeg" medium="image">
        <media:title><![CDATA[${title}]]></media:title>
      </media:content>`
          : ""
      }
      <content:encoded><![CDATA[${description}]]></content:encoded>
    </item>`;
}

export async function GET() {
  const storiesResult = await getStories();

  if (!storiesResult.success) {
    return new NextResponse(buildEmptyFeed(), {
      status: 200,
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    });
  }

  const stories: Story[] = Array.isArray(storiesResult.data)
    ? storiesResult.data
    : (storiesResult.data as { stories?: Story[]; items?: Story[] })?.stories ||
      (storiesResult.data as { stories?: Story[]; items?: Story[] })?.items ||
      [];

  const baseUrl = "https://moydus.com";
  const feedUrl = `${baseUrl}/web-stories.xml`;
  const now = new Date().toISOString();

  // RSS/Atom feed format for Google Web Stories
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>Moydus Web Stories</title>
    <link>${baseUrl}/stories</link>
    <description>Latest web stories from Moydus</description>
    <language>en-US</language>
    <lastBuildDate>${now}</lastBuildDate>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml"/>
    ${stories.map(buildStoryItem).join("")}
  </channel>
</rss>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
