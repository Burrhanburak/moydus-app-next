import ContentFeedWithFilters from "@/app/_components/ContentFeedWithFilters";
import { getServicesList } from "@/app/actions/service-actions";
import { extractLaravelCollection } from "@/lib/extract-laravel-array";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services Near Me – Find Local Providers | Moydus",
  description:
    "Find local services near you across multiple categories. Explore providers, compare options, and choose the best fit for your needs worldwide.",
  keywords: [
    "services near me",
    "local services",
    "find providers",
    "local companies",
    "nearby services",
    "local experts",
    "service providers",
  ],
  alternates: {
    canonical: "https://www.moydus.com/near-me",
  },
  openGraph: {
    type: "website",
    url: "https://www.moydus.com/near-me",
    title: "Services Near Me – Find Local Providers | Moydus",
    description: "Find local services and providers near you.",
    siteName: "Moydus",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Services Near Me – Find Local Providers | Moydus",
    description: "Find local services and providers near you.",
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

function formatSegmentLabel(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

const MAX_NEAR_ME_ITEMS = 10;

function buildSmartDiversifiedFeed(
  services: any[],
  limit = MAX_NEAR_ME_ITEMS
) {
  const seenTitles = new Set<string>();
  const categoryCounts = new Map<string, number>();
  const diversified: any[] = [];

  // Count services per category
  services.forEach((service) => {
    const categorySlug =
      typeof service.category === "string"
        ? service.category
        : service.category?.slug;
    if (categorySlug) {
      categoryCounts.set(
        categorySlug,
        (categoryCounts.get(categorySlug) || 0) + 1
      );
    }
  });

  // First pass: add unique titles, prioritizing different categories
  for (const service of services) {
    const title = service.title || "";
    const categorySlug =
      typeof service.category === "string"
        ? service.category
        : service.category?.slug;

    if (!seenTitles.has(title.toLowerCase().trim())) {
      seenTitles.add(title.toLowerCase().trim());
      diversified.push(service);
    }
  }

  return diversified.slice(0, limit);
}

export default async function NearMePage({
  searchParams,
}: {
  searchParams?: Promise<{ category?: string; country?: string }>;
}) {
  const resolvedParams = await Promise.resolve(searchParams || {});
  const activeCategory =
    typeof resolvedParams?.category === "string" &&
    resolvedParams.category.length > 0
      ? resolvedParams.category
      : undefined;
  const activeCountry =
    typeof resolvedParams?.country === "string" &&
    resolvedParams.country.length > 0
      ? resolvedParams.country
      : undefined;

  // Fetch services list with diverse mode
  const feedResult = await getServicesList({
    country: activeCountry,
    category: activeCategory,
    perPage: 100,
    diverse: !activeCategory, // Use diverse mode when no category filter
  });

  const items =
    feedResult.success && feedResult.data
      ? extractLaravelCollection(feedResult.data)
      : [];

  // Build diversified feed (limit to 10 mixed cards)
  const diversifiedItems = buildSmartDiversifiedFeed(items);

  // Extract unique countries
  const countryMap = new Map<
    string,
    { count: number; name?: string; code?: string }
  >();
  diversifiedItems.forEach(
    (item: {
      country?: string | { slug?: string; name?: string; code?: string };
    }) => {
      const countrySlug =
        typeof item.country === "string" ? item.country : item.country?.slug;
      const countryName =
        typeof item.country === "string"
          ? item.country
          : item.country?.name || item.country?.slug;

      if (countrySlug) {
        const existing = countryMap.get(countrySlug) || { count: 0 };
        countryMap.set(countrySlug, {
          count: existing.count + 1,
          name: countryName,
          code:
            typeof item.country === "object" ? item.country?.code : undefined,
        });
      }
    }
  );

  const countryItems = Array.from(countryMap.entries())
    .map(([slug, data]) => ({
      title: data.name || formatSegmentLabel(slug),
      subtitle: data.code?.toUpperCase(),
      href: `/near-me/${slug}`,
      count: data.count,
      badge: "Country",
    }))
    .sort((a, b) => b.count - a.count);

  // Extract unique categories
  const categoryMap = new Map<string, { count: number; name?: string }>();
  diversifiedItems.forEach(
    (item: { category?: string | { slug?: string; name?: string } }) => {
      const categorySlug =
        typeof item.category === "string" ? item.category : item.category?.slug;
      const categoryName =
        typeof item.category === "string"
          ? item.category
          : item.category?.name || item.category?.slug;

      if (categorySlug) {
        const existing = categoryMap.get(categorySlug) || { count: 0 };
        categoryMap.set(categorySlug, {
          count: existing.count + 1,
          name: categoryName,
        });
      }
    }
  );

  const categoryItems = Array.from(categoryMap.entries())
    .map(([slug, data]) => ({
      title: data.name || formatSegmentLabel(slug),
      href: `/near-me?category=${slug}`,
      count: data.count,
      badge: "Category",
    }))
    .sort((a, b) => b.count - a.count);

  const year = new Date().getFullYear();

  const activeCategoryLabel = activeCategory
    ? formatSegmentLabel(activeCategory)
    : undefined;

  const activeCountryLabel = activeCountry
    ? formatSegmentLabel(activeCountry)
    : undefined;

  const heroTitle =
    activeCategory && activeCountry
      ? `${activeCategoryLabel} Services Near Me in ${activeCountryLabel} (Local Experts ${year})`
      : activeCategory
        ? `${activeCategoryLabel} Services Near Me (Local Providers ${year})`
        : activeCountry
          ? `Services Near Me in ${activeCountryLabel} (Local Providers ${year})`
          : `Services Near Me – Find Local Providers | Moydus`;

  const heroDescription =
    activeCategory && activeCountry
      ? `Discover trusted ${activeCategoryLabel?.toLowerCase() ?? ""} services near you in ${activeCountryLabel}. Compare providers, explore details, and find local experts. Updated ${year}.`
      : activeCategory
        ? `Find nearby ${activeCategoryLabel?.toLowerCase() ?? ""} professionals and service providers. Compare local options, reviews, and expertise. Updated ${year}.`
        : activeCountry
          ? `Browse professional services available near you in ${activeCountryLabel}. Explore local providers, compare offerings, and find trusted experts. Updated ${year}.`
          : `Find local services near you across multiple categories. Explore providers, compare options, and choose the best fit. Updated for ${year}.`;

  return (
    <ContentFeedWithFilters
      items={diversifiedItems}
      baseUrl="/near-me"
      sectionTitle="Near Me"
      title={heroTitle}
      description={heroDescription}
      countryFilters={countryItems}
      categoryFilters={categoryItems}
      showCountryFilters={true}
      showCategoryFilters={true}
      totalCount={diversifiedItems.length}
    />
  );
}
