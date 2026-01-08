import ContentFeedWithFilters from "@/app/_components/ContentFeedWithFilters";
import { getFaqList } from "@/app/actions/faq-actions";
import { extractLaravelCollection } from "@/lib/extract-laravel-array";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ | Moydus - Frequently Asked Questions",
  description:
    "Find answers to frequently asked questions about web design, SEO, marketing, and digital solutions worldwide.",
  keywords: [
    "FAQ",
    "frequently asked questions",
    "help center",
    "common questions",
    "digital solutions FAQ",
    "web design FAQ",
    "SEO FAQ",
  ],
  alternates: {
    canonical: "https://www.moydus.com/faq",
  },
  openGraph: {
    type: "website",
    url: "https://www.moydus.com/faq",
    title: "FAQ | Moydus",
    description: "Frequently asked questions about digital solutions.",
    siteName: "Moydus",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ | Moydus",
    description: "Frequently asked questions about digital solutions.",
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

export default async function FaqPage({
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

  // Fetch FAQ list with diverse mode
  const feedResult = await getFaqList({
    country: activeCountry,
    category: activeCategory,
    perPage: 100,
    diverse: !activeCategory, // Use diverse mode when no category filter
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
      href: `/faq/${slug}`,
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
        href: isActive ? "/faq" : `/faq?category=${slug}`,
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
      ? `${activeCategoryLabel} FAQ in ${activeCountryLabel} – Answers to Common Questions (${year})`
      : activeCategory
        ? `${activeCategoryLabel} FAQ – Answers to Common Questions (${year})`
        : activeCountry
          ? `FAQ in ${activeCountryLabel} – Common Questions & Answers (${year})`
          : `FAQ – Frequently Asked Questions | Moydus`;

  const heroDescription =
    activeCategory && activeCountry
      ? `Find the most frequently asked questions about ${activeCategoryLabel?.toLowerCase() ?? ""} in ${activeCountryLabel}. Clear, expert-backed answers updated for ${year}.`
      : activeCategory
        ? `Explore frequently asked questions about ${activeCategoryLabel?.toLowerCase() ?? ""}. Expert explanations and practical answers updated for ${year}.`
        : activeCountry
          ? `Browse commonly asked questions and clear answers for users in ${activeCountryLabel}. Updated for ${year}.`
          : `Find answers to the most frequently asked questions about web design, SEO, marketing, and digital solutions. Expert explanations and updated insights for ${year}.`;

  return (
    <ContentFeedWithFilters
      items={items}
      baseUrl="/faq"
      sectionTitle="FAQ"
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
