import ContentFeedWithFilters from "@/app/_components/ContentFeedWithFilters";
import { getCompareList } from "@/app/actions/compare-actions";
import { extractLaravelCollection } from "@/lib/extract-laravel-array";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compare | Moydus - Side-by-Side Comparisons",
  description:
    "Compare digital solutions, tools, and services side-by-side. Make informed decisions with our comprehensive comparison guides.",
  keywords: [
    "compare tools",
    "side-by-side comparison",
    "tool comparison",
    "service comparison",
    "digital solutions comparison",
    "compare platforms",
  ],
  alternates: {
    canonical: "https://www.moydus.com/compare",
  },
  openGraph: {
    type: "website",
    url: "https://www.moydus.com/compare",
    title: "Compare | Moydus",
    description: "Side-by-side comparisons for digital solutions.",
    siteName: "Moydus",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Compare | Moydus",
    description: "Side-by-side comparisons for digital solutions.",
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

const MAX_COMPARE_ITEMS = 10;

const selectMixedItems = (list: any[], limit = MAX_COMPARE_ITEMS) => {
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
      typeof item?.city === "string" ? item.city : item?.city?.slug || item?.city?.name;
    const state =
      typeof item?.state === "string" ? item.state : item?.state?.slug || item?.state?.name;
    const country =
      typeof item?.country === "string" ? item.country : item?.country?.slug || item?.country?.name;
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

export default async function ComparePage({
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

  // Fetch compare list with diverse mode
  const feedResult = await getCompareList({
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
      href: `/compare/${slug}`,
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
        href: isActive ? "/compare" : `/compare?category=${slug}`,
        count: data.count,
        badge: isActive ? "Active" : "Category",
      };
    })
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
      ? `Compare ${activeCategoryLabel} Solutions in ${activeCountryLabel} (Side-by-Side ${year})`
      : activeCategory
        ? `Compare ${activeCategoryLabel} Tools & Services (Side-by-Side ${year})`
        : activeCountry
          ? `Compare Digital Solutions in ${activeCountryLabel} (Expert Insights ${year})`
          : `Compare Tools & Digital Solutions (Side-by-Side ${year}) | Moydus`;

  const heroDescription =
    activeCategory && activeCountry
      ? `Compare ${activeCategoryLabel?.toLowerCase() ?? ""} solutions and providers in ${activeCountryLabel}. Side-by-side analysis, expert insights, and feature breakdowns for ${year}.`
      : activeCategory
        ? `Side-by-side comparison of leading ${activeCategoryLabel?.toLowerCase() ?? ""} tools and services. Updated rankings, expert evaluations, and feature insights for ${year}.`
        : activeCountry
          ? `Compare top tools, platforms, and agencies available in ${activeCountryLabel}. Expert insights, side-by-side breakdowns, and performance reviews for ${year}.`
          : `Compare digital tools, platforms, and services side-by-side. Make informed decisions with expert evaluations, feature breakdowns, and structured comparison insights for ${year}.`;

  return (
    <ContentFeedWithFilters
      items={items}
      baseUrl="/compare"
      sectionTitle="Compare"
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
