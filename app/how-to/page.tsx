import ContentFeedWithFilters from "@/app/_components/ContentFeedWithFilters";
import { getHowToList } from "@/app/actions/howto-actions";
import { extractLaravelCollection } from "@/lib/extract-laravel-array";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How-To Guides | Moydus - Step-by-Step Tutorials",
  description:
    "Explore our comprehensive how-to guides featuring step-by-step tutorials on web design, SEO, marketing, and digital solutions worldwide.",
  keywords: [
    "how-to guides",
    "tutorials",
    "step-by-step guides",
    "web design tutorials",
    "SEO tutorials",
    "digital marketing guides",
    "learning resources",
  ],
  alternates: {
    canonical: "https://www.moydus.com/how-to",
  },
  openGraph: {
    type: "website",
    url: "https://www.moydus.com/how-to",
    title: "How-To Guides | Moydus",
    description: "Step-by-step tutorials and guides for digital solutions.",
    siteName: "Moydus",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "How-To Guides | Moydus",
    description: "Step-by-step tutorials and guides for digital solutions.",
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

export default async function HowToPage({
  searchParams,
}: {
  searchParams?: { category?: string; country?: string };
}) {
  const activeCategory =
    typeof searchParams?.category === "string" &&
    searchParams.category.length > 0
      ? searchParams.category
      : undefined;

  const activeCountry =
    typeof searchParams?.country === "string" && searchParams.country.length > 0
      ? searchParams.country
      : undefined;

  // Fetch how-to list with diverse mode
  const feedResult = await getHowToList({
    country: activeCountry,
    category: activeCategory,
    perPage: 100,
    diverse: !activeCategory, // Use diverse mode only when no specific category is selected
  });

  const allItems =
    feedResult.success && feedResult.data
      ? extractLaravelCollection(feedResult.data)
      : [];
  const items = allItems.slice(0, 10);

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
      href: `/how-to/${slug}`,
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
        href: isActive ? "/how-to" : `/how-to?category=${slug}`,
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
      ? `How-To ${activeCategoryLabel} Guides in ${activeCountryLabel} (Step-by-Step ${year})`
      : activeCategory
        ? `How-To ${activeCategoryLabel} Guides & Tutorials (Step-by-Step ${year})`
        : activeCountry
          ? `How-To Guides & Tutorials in ${activeCountryLabel} (Updated ${year})`
          : `How-To Guides – Step-by-Step Tutorials | Moydus`;

  const heroDescription =
    activeCategory && activeCountry
      ? `Learn ${activeCategoryLabel?.toLowerCase() ?? ""} with step-by-step tutorials and practical guides tailored for users in ${activeCountryLabel}. Updated ${year}.`
      : activeCategory
        ? `Master ${activeCategoryLabel?.toLowerCase() ?? ""} with detailed, step-by-step tutorials, walkthroughs, and actionable guides. Updated ${year}.`
        : activeCountry
          ? `Explore actionable how-to guides and tutorials specific to ${activeCountryLabel}. Practical steps, expert insights, and updated instructions for ${year}.`
          : `Explore step-by-step how-to guides covering web design, SEO, marketing, and digital solutions. Practical tutorials to help you learn and implement — updated for ${year}.`;

  return (
    <ContentFeedWithFilters
      items={items}
      baseUrl="/how-to"
      sectionTitle="How-To Guides"
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
