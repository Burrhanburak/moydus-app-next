import ContentFeedWithFilters, {
  GeoListItem,
} from "@/app/_components/ContentFeedWithFilters";
import { getTopList } from "@/app/actions/top-actions";
import { extractLaravelCollection } from "@/lib/extract-laravel-array";
import type { Metadata } from "next";

type GeoValue =
  | string
  | {
      slug?: string;
      name?: string;
      code?: string;
    }
  | null
  | undefined;

const formatSegmentLabel = (slug?: string | null) => {
  if (!slug) return "";
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const normalizeSlug = (value?: string | null) => {
  if (!value) return null;
  return value.trim().toLowerCase().replace(/\s+/g, "-");
};

const extractGeoInfo = (value: GeoValue) => {
  if (!value) {
    return {
      slug: null as string | null,
      name: null as string | null,
      code: undefined as string | undefined,
    };
  }

  if (typeof value === "string") {
    const normalized = normalizeSlug(value);
    return {
      slug: normalized,
      name: formatSegmentLabel(value),
      code: undefined as string | undefined,
    };
  }

  const rawSlug = value.slug || value.name;
  const slug = rawSlug ? normalizeSlug(rawSlug) : null;
  const name =
    value.name || (value.slug ? formatSegmentLabel(value.slug) : null);

  return {
    slug,
    name,
    code: value.code,
  };
};

const MAX_TOP_ITEMS = 18;

const selectMixedItems = (list: any[], limit = MAX_TOP_ITEMS) => {
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

const buildStateFilters = (items: any[], country: string): GeoListItem[] => {
  const stateMap = new Map<
    string,
    { count: number; name?: string | null; code?: string }
  >();

  items.forEach((item) => {
    const info = extractGeoInfo(item?.state as GeoValue);
    if (!info.slug) return;

    const existing = stateMap.get(info.slug) || { count: 0 };
    stateMap.set(info.slug, {
      count: existing.count + 1,
      name: info.name,
      code: info.code,
    });
  });

  return Array.from(stateMap.entries())
    .map(([slug, data]) => ({
      title: data.name || formatSegmentLabel(slug),
      subtitle: data.code?.toUpperCase(),
      href: `/top/${country}/${slug}`,
      count: data.count,
      badge: "State",
    }))
    .sort((a, b) => b.count - a.count);
};

const buildCityFilters = (items: any[], country: string): GeoListItem[] => {
  const cityMap = new Map<
    string,
    {
      count: number;
      cityName?: string | null;
      stateSlug?: string | null;
      stateName?: string | null;
    }
  >();

  items.forEach((item) => {
    const stateInfo = extractGeoInfo(item?.state as GeoValue);
    const cityInfo = extractGeoInfo(item?.city as GeoValue);
    if (!stateInfo.slug || !cityInfo.slug) {
      return;
    }
    const key = `${stateInfo.slug}:${cityInfo.slug}`;
    const existing = cityMap.get(key) || { count: 0 };
    cityMap.set(key, {
      count: existing.count + 1,
      cityName: cityInfo.name,
      stateSlug: stateInfo.slug,
      stateName: stateInfo.name,
    });
  });

  return Array.from(cityMap.entries())
    .map(([key, data]) => {
      const [, citySlug] = key.split(":");
      return {
        title: data.cityName || formatSegmentLabel(citySlug),
        subtitle: data.stateName || undefined,
        href: `/top/${country}/${data.stateSlug}/${citySlug}`,
        count: data.count,
        badge: "City",
      };
    })
    .filter((item) => !item.href.includes("undefined"))
    .sort((a, b) => b.count - a.count);
};

const buildCategoryFilters = (
  items: any[],
  country: string,
  activeCategory?: string
): GeoListItem[] => {
  const activeSlug = normalizeSlug(activeCategory || null);
  const categoryMap = new Map<string, { count: number; name?: string | null }>();

  items.forEach((item) => {
    const category = item?.category;
    let slug: string | null = null;
    let name: string | null = null;

    if (typeof category === "string") {
      slug = normalizeSlug(category);
      name = formatSegmentLabel(category);
    } else if (category && typeof category === "object") {
      slug = normalizeSlug(category.slug || category.name || null);
      name =
        category.name ||
        (category.slug ? formatSegmentLabel(category.slug) : null);
    }

    if (!slug) return;
    const existing = categoryMap.get(slug) || { count: 0 };
    categoryMap.set(slug, {
      count: existing.count + 1,
      name,
    });
  });

  return Array.from(categoryMap.entries())
    .map(([slug, data]) => ({
      title: data.name || formatSegmentLabel(slug),
      href:
        slug === activeSlug
          ? `/top/${country}`
          : `/top/${country}?category=${slug}`,
      count: data.count,
      badge: slug === activeSlug ? "Active" : "Category",
    }))
    .sort((a, b) => b.count - a.count);
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ country: string }>;
}): Promise<Metadata> {
  const resolvedParams = await Promise.resolve(params);
  const country = resolvedParams.country;
  const countryName = formatSegmentLabel(country);
  const url = `https://moydus.com/top/${country}`;

  const title = `${countryName} Top Agencies & Rankings | Moydus`;
  const description = `Discover expert-ranked agencies, service providers, and category winners across ${countryName}. Updated insights and reviews tailored to your region.`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      url,
      title,
      description,
    },
  };
}

export default async function TopCountryPage({
  params,
  searchParams,
}: {
  params: Promise<{ country: string }>;
  searchParams?: Promise<{ category?: string }>;
}) {
  const resolvedParams = await Promise.resolve(params);
  const resolvedSearch = (await Promise.resolve(searchParams)) || {};

  const country = resolvedParams.country;
  const countryName = formatSegmentLabel(country);
  const activeCategory =
    typeof resolvedSearch.category === "string" &&
    resolvedSearch.category.length > 0
      ? resolvedSearch.category
      : undefined;
  const activeCategoryLabel = activeCategory
    ? formatSegmentLabel(activeCategory)
    : undefined;

  const feedResult = await getTopList({
    country,
    category: activeCategory,
    perPage: 200,
    diverse: !activeCategory,
  });

  const allItems =
    feedResult.success && feedResult.data
      ? extractLaravelCollection(feedResult.data)
      : [];

  const feedItems =
    activeCategory || allItems.length <= MAX_TOP_ITEMS
      ? allItems
      : selectMixedItems(allItems, MAX_TOP_ITEMS);

  const stateFilters = buildStateFilters(allItems, country);
  const cityFilters = buildCityFilters(allItems, country);
  const categoryFilters = buildCategoryFilters(
    allItems,
    country,
    activeCategory
  );

  const year = new Date().getFullYear();
  const heroTitle = activeCategoryLabel
    ? `Top ${activeCategoryLabel} Agencies in ${countryName} (${year} Rankings)`
    : `Top Agencies & Companies in ${countryName} (Expert Insights ${year})`;

  const heroDescription = activeCategoryLabel
    ? `Compare leading ${activeCategoryLabel.toLowerCase()} specialists operating throughout ${countryName}. Expert-ranked teams with transparent reviews, geo coverage, and performance data for ${year}.`
    : `Explore digital agencies, software partners, and marketing teams operating across ${countryName}. Filter by state, city, or specialty to find the most trusted providers for ${year}.`;

  return (
    <ContentFeedWithFilters
      items={feedItems}
      baseUrl="/top"
      sectionTitle="Top Lists"
      title={heroTitle}
      description={heroDescription}
      stateFilters={stateFilters}
      cityFilters={cityFilters}
      categoryFilters={categoryFilters}
      showStateFilters={stateFilters.length > 0}
      showCityFilters={cityFilters.length > 0}
      showCategoryFilters={categoryFilters.length > 0}
      totalCount={allItems.length}
    />
  );
}
