import ContentFeedWithFilters from "@/app/_components/ContentFeedWithFilters";
import { getHowToList } from "@/app/actions/howto-actions";
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
    title: `How-To Guides & Tutorials in ${countryName} (Updated ${year}) | Moydus`,
    description: `Explore actionable how-to guides and tutorials specific to ${countryName}. Practical steps, expert insights, and updated instructions for ${year}.`,
    keywords: [
      `how-to guides ${countryName}`,
      `tutorials ${countryName}`,
      `step-by-step guides ${countryName}`,
      `${countryName} learning resources`,
      `${countryName} digital guides`,
    ],
    alternates: {
      canonical: `https://www.moydus.com/how-to/${countrySlug}`,
    },
    openGraph: {
      type: "website",
      url: `https://www.moydus.com/how-to/${countrySlug}`,
      title: `How-To Guides & Tutorials in ${countryName} | Moydus`,
      description: `Step-by-step tutorials and guides for ${countryName}.`,
      siteName: "Moydus",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: `How-To Guides & Tutorials in ${countryName} | Moydus`,
      description: `Step-by-step tutorials and guides for ${countryName}.`,
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

export default async function HowToCountryPage({
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

  // Fetch how-to list for this country
  const feedResult = await getHowToList({
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
          ? `/how-to/${countrySlug}`
          : `/how-to/${countrySlug}?category=${slug}`,
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
    ? `How-To ${activeCategoryLabel} Guides in ${countryName} (Step-by-Step ${year})`
    : `How-To Guides & Tutorials in ${countryName} (Updated ${year})`;

  const heroDescription = activeCategory
    ? `Learn ${activeCategoryLabel?.toLowerCase() ?? ""} with step-by-step tutorials and practical guides tailored for users in ${countryName}. Updated ${year}.`
    : `Explore actionable how-to guides and tutorials specific to ${countryName}. Practical steps, expert insights, and updated instructions for ${year}.`;

  return (
    <ContentFeedWithFilters
      items={items}
      baseUrl={`/how-to/${countrySlug}`}
      sectionTitle="How-To Guides"
      title={heroTitle}
      description={heroDescription}
      categoryFilters={categoryItems}
      showCategoryFilters={true}
      totalCount={items.length}
    />
  );
}

