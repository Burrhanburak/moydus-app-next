import BlogFeedWithFilters from "@/app/blog/_components/BlogFeedWithFilters";
import { formatSegmentLabel } from "@/app/blog/_lib/location-utils";
import { getBlogList } from "@/app/actions/blog-actions";
import { extractLaravelCollection } from "@/lib/extract-laravel-array";
import type { Metadata } from "next";

export async function generateMetadata({
  searchParams,
}: {
  searchParams?: { category?: string };
}): Promise<Metadata> {
  const activeCategory =
    typeof searchParams?.category === "string" &&
    searchParams.category.length > 0
      ? searchParams.category
      : undefined;

  const year = new Date().getFullYear();

  // DEFAULT GLOBAL BLOG PAGE
  if (!activeCategory) {
    return {
      title: `Global Blog – Expert Insights from 50+ Countries | Moydus ${year}`,
      description: `Discover expert insights, local expertise, and digital trends from ${year}. Covering 50+ countries with web design, SEO, development, AI automation, and digital marketing guides. Multi-geo content hub for global businesses.`,
      keywords: [
        "global digital insights",
        `web design trends ${year}`,
        "international SEO",
        "multi-geo content",
        "local digital expertise",
        "global marketing trends",
        "AI automation worldwide",
        "international web development",
        "geo-targeted content",
        "digital transformation global",
      ],
      alternates: {
        canonical: "https://www.moydus.com/blog",
      },
      openGraph: {
        type: "website",
        url: "https://www.moydus.com/blog",
        title: `Global Blog – Expert Insights from 50+ Countries | Moydus`,
        description: `Expert insights, local expertise, and digital trends from ${year}. Multi-geo content covering web design, SEO, development, and digital solutions worldwide.`,
        siteName: "Moydus",
        locale: "en_US",
      },
      twitter: {
        card: "summary_large_image",
        title: `Global Blog – Expert Insights | Moydus`,
        description: `Discover insights from 50+ countries. Web design, SEO, development, and digital trends.`,
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
      other: {
        "geo.region": "Global",
        "geo.placename": "Worldwide",
        "article:publisher": "https://www.moydus.com",
        "article:author": "Moydus Editorial Team",
      },
    };
  }

  // CATEGORY-BASED BLOG PAGE
  const label = formatSegmentLabel(activeCategory);

  return {
    title: `${label} – Global Insights & Expert Guides ${year} | Moydus`,
    description: `Explore expert ${label.toLowerCase()} insights, comprehensive guides, and ${year} trends from every region. Local expertise meets global best practices in ${label.toLowerCase()}.`,
    keywords: [
      `${label.toLowerCase()} global trends`,
      `${label.toLowerCase()} ${year}`,
      `international ${label.toLowerCase()}`,
      `${label.toLowerCase()} best practices`,
      `${label.toLowerCase()} expert insights`,
    ],
    alternates: {
      canonical: `https://www.moydus.com/blog?category=${activeCategory}`,
    },
    openGraph: {
      type: "article",
      url: `https://www.moydus.com/blog?category=${activeCategory}`,
      title: `${label} – Global Insights & Guides | Moydus`,
      description: `Expert ${label.toLowerCase()} insights from every region. Local expertise meets global best practices.`,
      siteName: "Moydus",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: `${label} – Global Insights | Moydus`,
      description: `Expert ${label.toLowerCase()} insights and global guides.`,
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
}

function shuffle<T>(array: T[]): T[] {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

function buildSmartDiversifiedFeed(posts: any[]) {
  if (!posts || posts.length === 0) return [];

  const templateMap = new Map<string, any>();

  for (const post of posts) {
    if (!post?.title) continue;
    const templateKey = post.title
      .toLowerCase()
      .replace(/in\s+[A-Za-zÀ-ÿ\s,]+/i, "")
      .replace(/\s+\|\s+.*/, "")
      .trim();

    if (!templateMap.has(templateKey)) {
      templateMap.set(templateKey, post);
    }
  }

  const uniqueTemplates = Array.from(templateMap.values());

  const categoryMap = new Map<string, any>();

  for (const post of uniqueTemplates) {
    const cat =
      (typeof post?.category === "string"
        ? post?.category
        : post?.category?.slug) || "";
    const normalizedCategory = cat.toLowerCase();
    if (!categoryMap.has(normalizedCategory)) {
      categoryMap.set(normalizedCategory, post);
    }
  }

  const categoryPicks = Array.from(categoryMap.values()).slice(0, 7);

  const remaining = uniqueTemplates.filter(
    (post) => !categoryPicks.includes(post)
  );

  const extra = shuffle(remaining).slice(0, 3);

  return [...categoryPicks, ...extra];
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams?: { category?: string };
}) {
  const safeGetBlogList = async (
    params?: Parameters<typeof getBlogList>[0]
  ) => {
    try {
      return await getBlogList(params);
    } catch (error) {
      console.error("[Blog Page] getBlogList failed:", params, error);
      return { success: false, error: "Request failed" } as const;
    }
  };

  const activeCategory =
    typeof searchParams?.category === "string" &&
    searchParams.category.length > 0
      ? searchParams.category
      : undefined;

  // Fetch global blog feed (mixed from all countries) with diverse categories
  const globalFeedResult = await safeGetBlogList(
    activeCategory
      ? { category: activeCategory, perPage: 100, diverse: true }
      : { perPage: 100, diverse: true } // Always use diverse mode for the main blog page
  );
  const globalPosts =
    globalFeedResult.success && globalFeedResult.data
      ? extractLaravelCollection(globalFeedResult.data)
      : [];

  // Fetch country groups for filter section
  const countryGroupsResult = await safeGetBlogList({ groupBy: "country" });
  const countryItems: Array<{
    title: string;
    subtitle?: string;
    href: string;
    count: number;
    badge?: string;
  }> = [];

  if (countryGroupsResult.success && countryGroupsResult.data) {
    type CountryGroup = {
      country?: { slug?: string; name?: string; code?: string } | null;
      post_count?: number;
    };

    const countryGroups = extractLaravelCollection<CountryGroup>(
      countryGroupsResult.data
    );

    countryItems.push(
      ...countryGroups
        .filter((group) => group.country?.slug)
        .map((group) => ({
          title: group.country?.name || group.country?.slug || "Country",
          subtitle: group.country?.code?.toUpperCase(),
          href: `/blog/${group.country?.slug}`,
          count: group.post_count ?? 0,
          badge: "Country",
        }))
    );
  }

  // Fetch category groups for filter section
  const categoryGroupsResult = await safeGetBlogList({ groupBy: "category" });
  const categoryItems: Array<{
    title: string;
    href: string;
    count: number;
    badge?: string;
  }> = [];

  let categoryGroups: Array<{
    category?: { slug?: string; name?: string } | null;
    post_count?: number;
  }> = [];

  if (categoryGroupsResult.success && categoryGroupsResult.data) {
    type CategoryGroup = {
      category?: { slug?: string; name?: string } | null;
      post_count?: number;
    };

    categoryGroups = extractLaravelCollection<CategoryGroup>(
      categoryGroupsResult.data
    );

    categoryItems.push(
      ...categoryGroups
        .filter((group) => group.category?.slug)
        .map((group) => {
          const slug = group.category?.slug || "general";
          const isActive = activeCategory === slug;
          return {
            title: group.category?.name || formatSegmentLabel(slug),
            href: isActive ? "/blog" : `/blog?category=${slug}`,
            count: group.post_count ?? 0,
            badge: isActive ? "Active" : "Category",
          };
        })
    );
  }

  const year = new Date().getFullYear();

  const activeCategoryLabel = activeCategory
    ? formatSegmentLabel(activeCategory)
    : undefined;

  const heroTitle = activeCategory
    ? `${activeCategoryLabel} – Global Insights from 50+ Countries (${year})`
    : `Global Digital Intelligence Hub – Expert Insights from 50+ Countries`;

  const heroDescription = activeCategory
    ? `Discover ${activeCategoryLabel?.toLowerCase() ?? ""} insights, expert guides, and ${year} trends from every region worldwide. Local expertise combined with global best practices. Real-world case studies, implementation guides, and proven strategies from ${activeCategoryLabel?.toLowerCase()} leaders across continents.`
    : `Your gateway to global digital expertise. Explore ${year} insights, local knowledge, and proven strategies across web design, SEO, development, AI automation, and digital marketing from 50+ countries. Multi-geo content powered by local experts and global trends.`;
  let mixedPosts = [...globalPosts];

  if (!activeCategory && categoryGroups.length > 0) {
    const additionalCategorySlugs = categoryGroups
      .filter(
        (group) =>
          group.category?.slug &&
          group.category?.slug !== "web-design" &&
          (group.post_count ?? 0) > 0
      )
      .sort((a, b) => (b.post_count ?? 0) - (a.post_count ?? 0))
      .slice(0, 12)
      .map((group) => group.category?.slug as string);

    if (additionalCategorySlugs.length > 0) {
      const categoryFeeds = await Promise.all(
        additionalCategorySlugs.map((slug) =>
          safeGetBlogList({ category: slug, perPage: 12, diverse: true })
        )
      );

      for (const feed of categoryFeeds) {
        if (feed.success && feed.data) {
          const posts = extractLaravelCollection(feed.data);
          mixedPosts.push(...posts);
        }
      }
    }
  }

  const uniquePosts = buildSmartDiversifiedFeed(mixedPosts);

  return (
    <BlogFeedWithFilters
      blogList={uniquePosts}
      title={heroTitle}
      description={heroDescription}
      countryFilters={countryItems}
      categoryFilters={categoryItems}
      showCountryFilters={true}
      showCategoryFilters={true}
      totalCount={uniquePosts.length}
    />
  );
}
