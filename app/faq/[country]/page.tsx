import ContentFeedWithFilters from "@/app/_components/ContentFeedWithFilters";
import { getFaqList } from "@/app/actions/faq-actions";
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
    title: `FAQ in ${countryName} – Common Questions & Answers (${year}) | Moydus`,
    description: `Browse commonly asked questions and clear answers for users in ${countryName}. Updated for ${year}.`,
    keywords: [
      `FAQ ${countryName}`,
      `frequently asked questions ${countryName}`,
      `${countryName} help center`,
      `${countryName} common questions`,
      `${countryName} digital solutions FAQ`,
    ],
    alternates: {
      canonical: `https://www.moydus.com/faq/${countrySlug}`,
    },
    openGraph: {
      type: "website",
      url: `https://www.moydus.com/faq/${countrySlug}`,
      title: `FAQ in ${countryName} | Moydus`,
      description: `Commonly asked questions and answers for users in ${countryName}.`,
      siteName: "Moydus",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: `FAQ in ${countryName} | Moydus`,
      description: `Commonly asked questions and answers for users in ${countryName}.`,
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

export default async function FaqCountryPage({
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

  // Fetch FAQ list for this country
  const feedResult = await getFaqList({
    country: countrySlug,
    category: activeCategory,
    perPage: 100,
    diverse: !activeCategory,
  });

  const allItems =
    feedResult.success && feedResult.data
      ? extractLaravelCollection(feedResult.data)
      : [];
  const items = allItems.slice(0, 10);

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
          ? `/faq/${countrySlug}`
          : `/faq/${countrySlug}?category=${slug}`,
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
    ? `${activeCategoryLabel} FAQ in ${countryName} – Answers to Common Questions (${year})`
    : `FAQ in ${countryName} – Common Questions & Answers (${year})`;

  const heroDescription = activeCategory
    ? `Find the most frequently asked questions about ${activeCategoryLabel?.toLowerCase() ?? ""} in ${countryName}. Clear, expert-backed answers updated for ${year}.`
    : `Browse commonly asked questions and clear answers for users in ${countryName}. Updated for ${year}.`;

  return (
    <ContentFeedWithFilters
      items={items}
      baseUrl={`/faq/${countrySlug}`}
      sectionTitle="FAQ"
      title={heroTitle}
      description={heroDescription}
      categoryFilters={categoryItems}
      showCategoryFilters={true}
      totalCount={items.length}
    />
  );
}

