import BlogFeedWithFilters from "@/app/blog/_components/BlogFeedWithFilters";
import { formatSegmentLabel } from "@/app/blog/_lib/location-utils";
import { getBlogList } from "@/app/actions/blog-actions";
import { extractLaravelCollection } from "@/lib/extract-laravel-array";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

type PageParams = {
  country: string;
  state: string;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const resolvedParams = await Promise.resolve(params);
  const { country, state } = resolvedParams;

  const countryName = formatSegmentLabel(country);
  const stateName = formatSegmentLabel(state);
  const year = new Date().getFullYear();

  return {
    title: `${stateName}, ${countryName} – Expert Insights & Local Guides ${year} | Moydus`,
    description: `Discover ${stateName} insights, local expertise, and ${year} trends. Expert articles on web design, SEO, development, and digital solutions from ${stateName}, ${countryName}.`,
    alternates: {
      canonical: `https://moydus.com/blog/${country}/${state}`,
      types: {
        "application/json": `https://moydus.com/blog/${country}/${state}/ai-index.json`,
      },
    },
    keywords: [
      `${stateName} digital services`,
      `${stateName} web design`,
      `${stateName} SEO`,
      `${stateName} development`,
      `${countryName} ${stateName} insights`,
      `${stateName} agencies`,
      `${stateName} tech trends ${year}`,
    ],
    openGraph: {
      type: "website",
      url: `https://moydus.com/blog/${country}/${state}`,
      title: `${stateName}, ${countryName} – Expert Insights & Guides`,
      description: `Discover ${stateName} insights, local expertise, and trends from ${countryName}.`,
      siteName: "Moydus",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: `${stateName}, ${countryName} – Expert Insights`,
      description: `Local expertise and trends from ${stateName}, ${countryName}.`,
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
  };
}

export default async function BlogStatePage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const resolvedParams = await Promise.resolve(params);
  const { country, state } = resolvedParams;

  // Validation: ensure we have both country and state
  if (!country || !state) {
    notFound();
  }

  const countryName = formatSegmentLabel(country);
  const stateName = formatSegmentLabel(state);

  // Fetch state blog feed (mixed from all cities in this state)
  const stateFeedResult = await getBlogList({
    country,
    state,
    perPage: 100,
  });

  const statePosts =
    stateFeedResult.success && stateFeedResult.data
      ? extractLaravelCollection(stateFeedResult.data)
      : [];

  // Fetch city groups for filter section
  const cityGroupsResult = await getBlogList({
    country,
    state,
    groupBy: "city",
  });

  const cityItems: Array<{
    title: string;
    subtitle?: string;
    href: string;
    count: number;
    badge?: string;
  }> = [];

  if (cityGroupsResult.success && cityGroupsResult.data) {
    type CityGroup = {
      city?: { slug?: string; name?: string } | null;
      post_count?: number;
    };

    const cityGroups = extractLaravelCollection<CityGroup>(
      cityGroupsResult.data
    );

    cityItems.push(
      ...cityGroups
        .filter((group) => group.city?.slug)
        .map((group) => ({
          title: group.city?.name || formatSegmentLabel(group.city?.slug || ""),
          href: `/blog/${country}/${state}/${group.city?.slug}`,
          count: group.post_count ?? 0,
          badge: "City",
        }))
        .sort((a, b) => b.count - a.count)
    );
  }

  // Fetch category groups for quick links
  const categoryGroupsResult = await getBlogList({
    country,
    state,
    groupBy: "category",
  });

  const categoryItems: Array<{
    title: string;
    href: string;
    count: number;
    badge?: string;
  }> = [];

  if (categoryGroupsResult.success && categoryGroupsResult.data) {
    type CategoryGroup = {
      category?: { slug?: string; name?: string } | null;
      post_count?: number;
    };

    const categoryGroups = extractLaravelCollection<CategoryGroup>(
      categoryGroupsResult.data
    );

    categoryItems.push(
      ...categoryGroups
        .filter((group) => group.category?.slug)
        .map((group) => ({
          title:
            group.category?.name ||
            formatSegmentLabel(group.category?.slug || ""),
          href: `/blog/${country}/${state}?category=${group.category?.slug}`,
          count: group.post_count ?? 0,
          badge: "Category",
        }))
        .sort((a, b) => b.count - a.count)
    );
  }

  const totalPosts = statePosts.length;

  return (
    <BlogFeedWithFilters
      blogList={statePosts}
      title={`${stateName}, ${countryName} – ${totalPosts} Articles`}
      description={`Discover expert insights, local expertise, and trends from ${stateName}, ${countryName}. Covering web design, SEO, development, and digital solutions.`}
      cityFilters={cityItems}
      categoryFilters={categoryItems}
      showCityFilters={cityItems.length > 0}
      showCategoryFilters={categoryItems.length > 0}
      totalCount={totalPosts}
    />
  );
}
