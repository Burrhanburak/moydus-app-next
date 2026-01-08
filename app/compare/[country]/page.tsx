import ContentFeedWithFilters from "@/app/_components/ContentFeedWithFilters";
import { getCompareList } from "@/app/actions/compare-actions";
import { extractLaravelCollection } from "@/lib/extract-laravel-array";
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
    title: `Compare Digital Solutions in ${countryName} (Expert Insights ${year}) | Moydus`,
    description: `Compare top tools, platforms, and agencies available in ${countryName}. Expert insights, side-by-side breakdowns, and performance reviews for ${year}.`,
    keywords: [
      `compare tools ${countryName}`,
      `compare platforms ${countryName}`,
      `side-by-side comparison ${countryName}`,
      `${countryName} digital solutions`,
      `${countryName} tool comparison`,
      `${countryName} service comparison`,
    ],
    alternates: {
      canonical: `https://www.moydus.com/compare/${countrySlug}`,
    },
    openGraph: {
      type: "website",
      url: `https://www.moydus.com/compare/${countrySlug}`,
      title: `Compare Digital Solutions in ${countryName} | Moydus`,
      description: `Side-by-side comparisons for digital solutions in ${countryName}.`,
      siteName: "Moydus",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: `Compare Digital Solutions in ${countryName} | Moydus`,
      description: `Side-by-side comparisons for digital solutions in ${countryName}.`,
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

export default async function CompareCountryPage({
  params,
  searchParams,
}: {
  params: Promise<{ country: string }>;
  searchParams?: Promise<{ category?: string }>;
}) {
  const resolvedParams = await Promise.resolve(params);
  const resolvedSearchParams = (await Promise.resolve(searchParams)) as
    | { category?: string }
    | undefined;

  const countrySlug = resolvedParams.country;
  const countryName = countrySlug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const activeCategory =
    typeof resolvedSearchParams?.category === "string" &&
    resolvedSearchParams.category.length > 0
      ? resolvedSearchParams.category
      : undefined;

  // Fetch compare list for this country
  const feedResult = await getCompareList({
    country: countrySlug,
    category: activeCategory,
    perPage: 100,
    diverse: !activeCategory,
  });

  const allItems =
    feedResult.success && feedResult.data
      ? extractLaravelCollection(feedResult.data)
      : [];
  const items = selectMixedItems(allItems);

  // Extract unique categories for filters
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
        href: isActive
          ? `/compare/${countrySlug}`
          : `/compare/${countrySlug}?category=${slug}`,
        count: data.count,
        badge: isActive ? "Active" : "Category",
      };
    })
    .sort((a, b) => b.count - a.count);

  const year = new Date().getFullYear();
  const activeCategoryLabel = activeCategory
    ? formatSegmentLabel(activeCategory)
    : undefined;

  const heroTitle = activeCategory
    ? `Compare ${activeCategoryLabel} Solutions in ${countryName} (Side-by-Side ${year})`
    : `Compare Digital Solutions in ${countryName} (Expert Insights ${year})`;

  const heroDescription = activeCategory
    ? `Compare ${activeCategoryLabel?.toLowerCase() ?? ""} solutions and providers in ${countryName}. Side-by-side analysis, expert insights, and feature breakdowns for ${year}.`
    : `Compare top tools, platforms, and agencies available in ${countryName}. Expert insights, side-by-side breakdowns, and performance reviews for ${year}.`;

  return (
    <ContentFeedWithFilters
      items={items}
      baseUrl={`/compare/${countrySlug}`}
      sectionTitle="Compare"
      title={heroTitle}
      description={heroDescription}
      categoryFilters={categoryItems}
      showCategoryFilters={true}
      totalCount={items.length}
    />
  );
}

