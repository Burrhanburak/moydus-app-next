import StoryDetailClient from "@/app/stories/[slug]/_components/StoryDetailClient";
import { getStory } from "@/app/actions/story-actions";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { buildWebStorySchema } from "@/seo/json-ld/index";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await Promise.resolve(params);
  const storyResult = await getStory(resolvedParams.slug);

  if (!storyResult.success || !storyResult.data) {
    return {
      title: "Web Story Not Found",
      description: "The requested web story could not be found.",
    };
  }

  const data = storyResult.data;
  const slug = resolvedParams.slug;
  
  // Title 70 karakterden kısa olmalı (Google best practice)
  const title = data.title?.length > 70 
    ? data.title.substring(0, 67) + "..." 
    : data.title || "Web Story";
  
  const description = data.description || data.snippet || data.excerpt || title;
  const posterUrl = data.poster_url || data.poster || data.image_url || "";
  const canonical = `https://www.moydus.com/stories/${slug}`;

  return {
    title: title,
    description: description,
    alternates: {
      canonical: canonical,
    },
    openGraph: {
      type: "article",
      title: title,
      description: description,
      url: canonical,
      siteName: "Moydus",
      images: posterUrl ? [
        {
          url: posterUrl,
          width: 640,
          height: 853,
          alt: title,
        },
      ] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: posterUrl ? [posterUrl] : [],
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
        "max-video-preview": -1,
      },
    },
  };
}

export default async function StoryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await Promise.resolve(params);
  const storyResult = await getStory(resolvedParams.slug);

  if (!storyResult.success) {
    notFound();
  }

  if (!storyResult.data) {
    notFound();
  }

  const data = storyResult.data;
  const slug = resolvedParams.slug;
  
  // Title 70 karakterden kısa olmalı (Google best practice)
  const title = data.title?.length > 70 
    ? data.title.substring(0, 67) + "..." 
    : data.title || "Web Story";
  
  const description = data.description || data.snippet || data.excerpt || title;
  const posterUrl = data.poster_url || data.poster || data.image_url || "";
  const canonical = `https://www.moydus.com/stories/${slug}`;

  // Build Web Story schema on the server
  const storySchema = buildWebStorySchema({
    url: canonical,
    title: title,
    description: description,
    poster: {
      url: posterUrl,
      width: 640,
      height: 853,
      alt: title,
    },
    publisherName: "Moydus LLC",
    publisherLogo: "https://www.moydus.com/logo.png",
    datePublished: data.published_at || new Date().toISOString(),
    dateModified: data.updated_at || data.published_at || new Date().toISOString(),
  });

  return <StoryDetailClient story={data} storySchema={storySchema} />;
}
