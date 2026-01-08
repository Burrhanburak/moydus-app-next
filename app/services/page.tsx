import ServicesFeedWithFilters from "@/app/services/_components/ServicesFeedWithFilters";
import { formatSegmentLabel } from "@/app/blog/_lib/location-utils";
import { getServicesList } from "@/app/actions/service-actions";
import { extractLaravelCollection } from "@/lib/extract-laravel-array";
import type { Metadata } from "next";
import { JsonLd } from "@/seo/json-ld";
import {
  buildWebPageSchema,
  buildOrganizationSchema,
  buildWebsiteSchema,
} from "@/seo/json-ld/index";

export const metadata: Metadata = {
  title: "Digital Services – Web Design, SEO & Marketing | Moydus",
  description:
    "Explore our comprehensive range of digital services including web design, SEO, marketing, and more across multiple locations worldwide.",
  alternates: {
    canonical: "https://www.moydus.com/services",
  },
  openGraph: {
    type: "website",
    url: "https://www.moydus.com/services",
    title: "Services | Moydus",
    description:
      "Explore our comprehensive range of digital services worldwide.",
    siteName: "Moydus",
    locale: "en_US",
    images: [
      {
        url: "/services/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Digital Services – Web Design, SEO & Marketing",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Services | Moydus",
    description:
      "Explore our comprehensive range of digital services worldwide.",
    images: ["/services/opengraph-image"],
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

function shuffle<T>(array: T[]): T[] {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

type ServiceItem = {
  title?: string;
  category?: string | { slug?: string; name?: string };
  country?: string | { slug?: string; name?: string };
};

const MAX_SERVICE_ITEMS = 10;

function buildSmartDiversifiedFeed(
  services: ServiceItem[],
  limit = MAX_SERVICE_ITEMS
) {
  if (!services || services.length === 0) return [];

  // Remove exact duplicates by title
  const seenTitles = new Set<string>();
  const uniqueServices = services.filter((service) => {
    if (!service?.title) return false;
    const normalizedTitle = service.title.toLowerCase().trim();
    if (seenTitles.has(normalizedTitle)) return false;
    seenTitles.add(normalizedTitle);
    return true;
  });

  // Group by category to ensure diversity
  const categoryGroups = new Map<string, ServiceItem[]>();

  for (const service of uniqueServices) {
    const cat =
      (typeof service?.category === "string"
        ? service?.category
        : service?.category?.slug) || "general";
    const normalizedCategory = cat.toLowerCase();

    if (!categoryGroups.has(normalizedCategory)) {
      categoryGroups.set(normalizedCategory, []);
    }
    categoryGroups.get(normalizedCategory)!.push(service);
  }

  // Take up to 5 services from each category, then shuffle
  const diversified: ServiceItem[] = [];
  const categoryArray = Array.from(categoryGroups.entries());

  // Sort categories by size (largest first)
  categoryArray.sort((a, b) => b[1].length - a[1].length);

  // Take services from each category
  for (const [, categoryServices] of categoryArray) {
    const shuffled = shuffle(categoryServices);
    diversified.push(...shuffled.slice(0, 10));
  }

  // Shuffle the final result and limit to desired count
  return shuffle(diversified).slice(0, limit);
}

export default async function ServicesPage({
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

  // Fetch global services feed (mixed from all countries) with diverse mode
  // Always use diverse to avoid duplicate titles from different locations
  const globalFeedResult = await getServicesList({
    country: activeCountry,
    category: activeCategory,
    perPage: 100,
    diverse: true, // Always diverse to show unique content per country
  });
  const globalServices =
    globalFeedResult.success && globalFeedResult.data
      ? extractLaravelCollection(globalFeedResult.data)
      : [];

  // Use global services directly (diverse mode already provides variety)
  const mixedServices = [...globalServices];

  // Extract unique countries from all services
  const countryMap = new Map<
    string,
    { count: number; name?: string; code?: string }
  >();
  mixedServices.forEach(
    (service: {
      country?: string | { slug?: string; name?: string; code?: string };
    }) => {
      const countrySlug =
        typeof service.country === "string"
          ? service.country
          : service.country?.slug;
      const countryName =
        typeof service.country === "string"
          ? service.country
          : service.country?.name || service.country?.slug;

      if (countrySlug) {
        const existing = countryMap.get(countrySlug) || { count: 0 };
        countryMap.set(countrySlug, {
          count: existing.count + 1,
          name: countryName,
          code:
            typeof service.country === "object"
              ? service.country?.code
              : undefined,
        });
      }
    }
  );

  const countryItems: Array<{
    title: string;
    subtitle?: string;
    href: string;
    count: number;
    badge?: string;
  }> = Array.from(countryMap.entries())
    .map(([slug, data]) => ({
      title: data.name || formatSegmentLabel(slug),
      subtitle: data.code?.toUpperCase(),
      href: `/services/${slug}`,
      count: data.count,
      badge: "Country",
    }))
    .sort((a, b) => b.count - a.count);

  // Extract unique categories from all services
  const categoryMap = new Map<string, { count: number; name?: string }>();
  mixedServices.forEach(
    (service: { category?: string | { slug?: string; name?: string } }) => {
      const categorySlug =
        typeof service.category === "string"
          ? service.category
          : service.category?.slug;
      const categoryName =
        typeof service.category === "string"
          ? service.category
          : service.category?.name || service.category?.slug;

      if (categorySlug) {
        const existing = categoryMap.get(categorySlug) || { count: 0 };
        categoryMap.set(categorySlug, {
          count: existing.count + 1,
          name: categoryName,
        });
      }
    }
  );

  const categoryItems: Array<{
    title: string;
    href: string;
    count: number;
    badge?: string;
  }> = Array.from(categoryMap.entries())
    .map(([slug, data]) => {
      const isActive = activeCategory === slug;
      return {
        title: data.name || formatSegmentLabel(slug),
        href: isActive ? "/services" : `/services?category=${slug}`,
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
      ? `${activeCategoryLabel} Services in ${activeCountryLabel} (Professional ${year}) | Moydus`
      : activeCategory
        ? `${activeCategoryLabel} Services – Global Coverage (Professional ${year}) | Moydus`
        : activeCountry
          ? `Digital Services in ${activeCountryLabel} – Web, SEO & Marketing | Moydus`
          : `Digital Services – Web Design, SEO & Marketing | Moydus`;

  const heroDescription =
    activeCategory && activeCountry
      ? `Discover professional ${activeCategoryLabel?.toLowerCase() ?? ""} services available in ${activeCountryLabel}. Strategy, implementation, and ongoing support from vetted providers — updated for ${year}.`
      : activeCategory
        ? `Explore global ${activeCategoryLabel?.toLowerCase() ?? ""} services across multiple countries and regions. Compare capabilities, specializations, and implementation options — updated ${year}.`
        : activeCountry
          ? `Browse digital services available in ${activeCountryLabel}, including web design, SEO, marketing, and automation. Find the right solutions for your business with up-to-date coverage for ${year}.`
          : `Explore our global catalog of digital services, including web design, SEO, marketing, and automation solutions across multiple locations worldwide. Curated and updated for ${year}.`;

  const uniqueServices = buildSmartDiversifiedFeed(
    mixedServices,
    MAX_SERVICE_ITEMS
  );

  return (
    <ServicesFeedWithFilters
      services={uniqueServices}
      title={heroTitle}
      description={heroDescription}
      countryFilters={countryItems}
      categoryFilters={categoryItems}
      showCountryFilters={true}
      showCategoryFilters={true}
      totalCount={uniqueServices.length}
    />
  );
}
