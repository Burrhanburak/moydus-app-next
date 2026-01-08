import ContentFeedWithFilters from "@/app/_components/ContentFeedWithFilters";
import { getBestList } from "@/app/actions/best-actions";
import { extractLaravelCollection } from "@/lib/extract-laravel-array";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Best Lists | Moydus - Expert Rankings & Reviews",
  description:
    "Discover the best rankings, expert reviews, and top-rated solutions for web design, SEO, marketing, and digital solutions worldwide.",
  keywords: [
    "best lists",
    "expert rankings",
    "best agencies",
    "top rated",
    "best companies",
    "expert reviews",
    "best solutions",
  ],
  alternates: {
    canonical: "https://www.moydus.com/best",
  },
  openGraph: {
    type: "website",
    url: "https://www.moydus.com/best",
    title: "Best Lists | Moydus",
    description: "Expert rankings and reviews for digital solutions.",
    siteName: "Moydus",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Lists | Moydus",
    description: "Expert rankings and reviews for digital solutions.",
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

const formatSegmentLabel = (slug?: string | null) => {
  if (!slug) return "";
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const MAX_BEST_ITEMS = 10;

const selectMixedItems = (list: any[], limit = MAX_BEST_ITEMS) => {
  if (!Array.isArray(list) || list.length === 0) return [];

  const result: any[] = [];
  const usedCategories = new Set<string>();
  const usedLocations = new Set<string>();

  const getCategorySlug = (item: any) => {
    if (!item) return "general";
    const category = item.category;
    if (!category) return "general";
    if (typeof category === "string") return category.toLowerCase();
    return (
      category.slug?.toLowerCase() ||
      category.name?.toLowerCase().replace(/\s+/g, "-") ||
      "general"
    );
  };

  const getLocationKey = (item: any) => {
    const city =
      typeof item?.city === "string"
        ? item.city
        : item?.city?.slug || item?.city?.name;
    const state =
      typeof item?.state === "string"
        ? item.state
        : item?.state?.slug || item?.state?.name;
    const country =
      typeof item?.country === "string"
        ? item.country
        : item?.country?.slug || item?.country?.name;
    return city || state || country || "";
  };

  for (const item of list) {
    const categorySlug = getCategorySlug(item);
    if (usedCategories.has(categorySlug)) continue;
    result.push(item);
    usedCategories.add(categorySlug);
    if (result.length >= limit) return result;
  }

  for (const item of list) {
    if (result.includes(item)) continue;
    const locKey = getLocationKey(item);
    if (locKey && usedLocations.has(locKey)) continue;
    result.push(item);
    if (locKey) usedLocations.add(locKey);
    if (result.length >= limit) return result;
  }

  for (const item of list) {
    if (result.includes(item)) continue;
    result.push(item);
    if (result.length >= limit) break;
  }

  return result;
};

export default async function BestPage({
  searchParams,
}: {
  searchParams?: Promise<{ category?: string; country?: string }>;
}) {
  const resolvedParams = (await Promise.resolve(searchParams)) as
    | { category?: string; country?: string }
    | undefined;

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

  // Fetch best list with diverse mode
  const feedResult = await getBestList({
    country: activeCountry,
    category: activeCategory,
    perPage: 100,
    diverse: !activeCategory, // Use diverse mode when no category filter
  });

  const allItems =
    feedResult.success && feedResult.data
      ? extractLaravelCollection(feedResult.data)
      : [];
  const items = selectMixedItems(allItems);

  // Extract unique countries
  const countryMap = new Map<
    string,
    { count: number; name?: string; code?: string }
  >();
  allItems.forEach(
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
      href: `/best/${slug}`,
      count: data.count,
      badge: "Country",
    }))
    .sort((a, b) => b.count - a.count);

  // Extract unique categories
  const categoryMap = new Map<string, { count: number; name?: string }>();
  allItems.forEach(
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
    .map(([slug, data]) => {
      const isActive = activeCategory === slug;
      return {
        title: data.name || formatSegmentLabel(slug),
        href: isActive ? "/best" : `/best?category=${slug}`,
        count: data.count,
        badge: isActive ? "Active" : "Category",
      };
    })
    .sort((a, b) => b.count - a.count);
  const year = new Date().getFullYear();

  // Resolve dynamic labels from item data later if needed:
  const activeCategoryLabel = activeCategory
    ? formatSegmentLabel(activeCategory)
    : undefined;
  const activeCountryLabel = activeCountry
    ? formatSegmentLabel(activeCountry)
    : undefined;

  const heroTitle =
    activeCategory && activeCountry
      ? `Best ${activeCategoryLabel} Agencies in ${activeCountryLabel} (Expert Ranked ${year})`
      : activeCategory
        ? `Best ${activeCategoryLabel} Agencies Worldwide (Expert Ranked ${year})`
        : activeCountry
          ? `Best Companies & Agencies in ${activeCountryLabel} (Expert Ranked ${year})`
          : `Best Pages & Rankings Worldwide (Expert Insights ${year}) | Moydus`;

  const heroDescription =
    activeCategory && activeCountry
      ? `Explore expert-ranked ${activeCategoryLabel.toLowerCase()} agencies in ${activeCountryLabel}. High-performing, trusted companies rated for ${year}.`
      : activeCategory
        ? `Top-rated ${activeCategoryLabel.toLowerCase()} agencies worldwide. Expert curated rankings, reviews, and performance insights for ${year}.`
        : activeCountry
          ? `Discover top companies and digital service providers in ${activeCountryLabel}. Expert insights, updated rankings, and geo-specific recommendations for ${year}.`
          : `Explore worldwide best pages, expert rankings, and digital service reviews in web design, SEO, marketing, and more — updated for ${year}.`;
  return (
    <ContentFeedWithFilters
      items={items}
      baseUrl="/best"
      sectionTitle="Best Lists"
      title={heroTitle}
      description={heroDescription}
      countryFilters={countryItems}
      categoryFilters={categoryItems}
      showCountryFilters={true}
      showCategoryFilters={true}
      totalCount={items.length}
    />
  );
}
