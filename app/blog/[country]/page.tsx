import BlogFeedWithFilters from "@/app/blog/_components/BlogFeedWithFilters";
import { getBlogList } from "@/app/actions/blog-actions";
import { extractLaravelCollection } from "@/lib/extract-laravel-array";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ country: string }>;
}): Promise<Metadata> {
  const resolvedParams = await Promise.resolve(params);
  const countrySlug = resolvedParams.country;
  const countryName = countrySlug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const year = new Date().getFullYear();

  return {
    title: `${countryName} – Local Insights & Expert Guides ${year} | Moydus`,
    description: `Discover ${countryName} digital insights, local expertise, and ${year} trends. Expert articles covering web design, SEO, development, AI automation, and digital marketing from ${countryName}. Geo-targeted content for ${countryName} businesses.`,
    keywords: [
      `${countryName} digital services`,
      `${countryName} web design`,
      `${countryName} SEO`,
      `${countryName} development`,
      `${countryName} agencies`,
      `${countryName} digital trends ${year}`,
      `${countryName} tech insights`,
      `${countryName} marketing`,
      `${countryName} AI automation`,
      `${countryName} local expertise`,
    ],
    alternates: {
      canonical: `https://moydus.com/blog/${countrySlug}`,
      types: {
        "application/json": `https://moydus.com/blog/${countrySlug}/ai-index.json`,
      },
    },
    openGraph: {
      type: "website",
      url: `https://moydus.com/blog/${countrySlug}`,
      title: `${countryName} – Local Insights & Expert Guides | Moydus`,
      description: `Discover ${countryName} insights, local expertise, and digital trends. Expert articles on web design, SEO, development, and digital solutions.`,
      siteName: "Moydus",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: `${countryName} – Local Insights | Moydus`,
      description: `${countryName} digital insights and local expertise.`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    other: {
      "geo.region": countrySlug.toUpperCase(),
      "geo.placename": countryName,
      "article:publisher": "https://moydus.com",
      "article:author": "Moydus Editorial Team",
    },
  };
}

export default async function BlogCountryPage({
  params,
}: {
  params: Promise<{
    country: string;
  }>;
}) {
  const resolvedParams = await Promise.resolve(params);

  // Basic validation: If country parameter looks like a blog slug (has multiple hyphens),
  // it's probably not a country - return 404
  // Known country slugs are usually short (1-2 words, max 1-2 hyphens)
  const countrySlug = resolvedParams.country.toLowerCase();
  const hyphenCount = (countrySlug.match(/-/g) || []).length;

  // If it has more than 2 hyphens, it's likely a blog slug, not a country
  if (hyphenCount > 2) {
    notFound();
  }

  const countryName = resolvedParams.country
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  // Fetch country blog feed (mixed from all states/cities in this country)
  const countryFeedResult = await getBlogList({
    country: resolvedParams.country,
  });
  const countryPosts =
    countryFeedResult.success && countryFeedResult.data
      ? extractLaravelCollection(countryFeedResult.data)
      : [];

  // Fetch state groups for filter section
  const stateGroupsResult = await getBlogList({
    country: resolvedParams.country,
    groupBy: "state",
  });

  const stateItems: Array<{
    title: string;
    href: string;
    count: number;
    badge?: string;
  }> = [];

  if (stateGroupsResult.success && stateGroupsResult.data) {
    type StateGroup = {
      state?: { slug?: string; name?: string } | null;
      post_count?: number;
    };

    const stateGroups = extractLaravelCollection<StateGroup>(
      stateGroupsResult.data
    );

    stateItems.push(
      ...stateGroups
        .filter((group) => group.state?.slug)
        .map((group) => ({
          title: group.state?.name || group.state?.slug || "Region",
          href: `/blog/${resolvedParams.country}/${group.state?.slug}`,
          count: group.post_count ?? 0,
          badge: "State",
        }))
    );
  }

  // Get total post count for header
  const totalPosts = countryPosts.length;

  const year = new Date().getFullYear();

  return (
    <BlogFeedWithFilters
      blogList={countryPosts}
      title={`${countryName} – ${totalPosts} Expert Articles (${year})`}
      description={`Your comprehensive ${countryName} digital intelligence hub. Discover local insights, regional expertise, and ${year} trends across web design, SEO, development, AI automation, and digital marketing. Real case studies and proven strategies from ${countryName} market leaders and local experts.`}
      stateFilters={stateItems}
      showStateFilters={true}
      totalCount={totalPosts}
    />
  );
}
