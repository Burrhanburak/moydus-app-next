import StoryClient from "@/app/stories/_components/StoryClient";
import { getStories } from "@/app/actions/story-actions";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Web Stories – Visual Content & Stories | Moydus",
  description:
    "Explore engaging web stories featuring visual content, interactive experiences, and storytelling across web design, SEO, marketing, and digital solutions.",
  keywords: [
    "web stories",
    "visual stories",
    "interactive stories",
    "storytelling",
    "visual content",
    "web story format",
  ],
  alternates: {
    canonical: "https://www.moydus.com/stories",
  },
  openGraph: {
    type: "website",
    url: "https://www.moydus.com/stories",
    title: "Web Stories – Visual Content & Stories | Moydus",
    description: "Explore engaging web stories and visual content.",
    siteName: "Moydus",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Stories – Visual Content & Stories | Moydus",
    description: "Explore engaging web stories and visual content.",
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

export default async function StoriesPage() {
  const storiesResult = await getStories();

  if (!storiesResult.success) {
    return <div>Error loading stories: {storiesResult.error}</div>;
  }

  // Use data directly like in detail page - API returns array directly
  const stories = Array.isArray(storiesResult.data) 
    ? storiesResult.data 
    : [];

  // Debug: log API response in development
  if (process.env.NODE_ENV === "development") {
    console.log("📚 Stories Page - API Response:", {
      success: storiesResult.success,
      dataType: typeof storiesResult.data,
      isArray: Array.isArray(storiesResult.data),
      storiesCount: stories.length,
      firstStory: stories[0],
      firstStoryKeys: stories[0] ? Object.keys(stories[0]) : null,
    });
  }

  return <StoryClient stories={stories} />;
}
