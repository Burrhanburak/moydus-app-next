import ContentFeedWithFilters from "@/app/_components/ContentFeedWithFilters";
import { getBestList } from "@/app/actions/best-actions";
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
    title: `Best Companies & Agencies in ${countryName} (Expert Ranked ${year}) | Moydus`,
    description: `Discover top companies and digital service providers in ${countryName}. Expert insights, updated rankings, and geo-specific recommendations for ${year}.`,
    keywords: [
      `best companies ${countryName}`,
      `best agencies ${countryName}`,
      `top rated ${countryName}`,
      `expert rankings ${countryName}`,
      `${countryName} digital services`,
      `${countryName} web design`,
      `${countryName} SEO`,
      `${countryName} development`,
    ],
    alternates: {
      canonical: `https://www.moydus.com/best/${countrySlug}`,
    },
    openGraph: {
      type: "website",
      url: `https://www.moydus.com/best/${countrySlug}`,
      title: `Best Companies & Agencies in ${countryName} | Moydus`,
      description: `Expert-ranked companies and digital service providers in ${countryName}.`,
      siteName: "Moydus",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: `Best Companies & Agencies in ${countryName} | Moydus`,
      description: `Expert-ranked companies and digital service providers in ${countryName}.`,
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

export default async function BestCountryPage({
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

  // Fetch best list for this country
  const feedResult = await getBestList({
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
          ? `/best/${countrySlug}`
          : `/best/${countrySlug}?category=${slug}`,
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
    ? `Best ${activeCategoryLabel} Agencies in ${countryName} (Expert Ranked ${year})`
    : `Best Companies & Agencies in ${countryName} (Expert Ranked ${year})`;

  const heroDescription = activeCategory
    ? `Explore expert-ranked ${activeCategoryLabel?.toLowerCase()} agencies in ${countryName}. High-performing, trusted companies rated for ${year}.`
    : `Discover top companies and digital service providers in ${countryName}. Expert insights, updated rankings, and geo-specific recommendations for ${year}.`;

  return (
    <ContentFeedWithFilters
      items={items}
      baseUrl={`/best/${countrySlug}`}
      sectionTitle="Best Lists"
      title={heroTitle}
      description={heroDescription}
      categoryFilters={categoryItems}
      showCategoryFilters={true}
      totalCount={items.length}
    />
  );
}

