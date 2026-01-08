import BlogFeedWithFilters from "@/app/blog/_components/BlogFeedWithFilters";
import BlogDetailClient from "@/app/blog/_components/BlogDetailClient";
import { getBlogList, getBlogPostByLocation } from "@/app/actions/blog-actions";
import { extractLaravelCollection } from "@/lib/extract-laravel-array";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

type PageParams = {
  country: string;
  segments: string[];
};

const formatLabel = (slug: string) => {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

// Parse segments to determine what we're looking at
// Possible patterns:
// [state] -> state page
// [state, city] -> city page
// [category, slug] -> detail page (no state, no city)
// [state, category, slug] -> detail page (no city)
// [state, city, category] -> category page
// [state, city, category, slug] -> detail page (with city)
function parseSegments(segments: string[]) {
  const len = segments.length;

  if (process.env.NODE_ENV === "development") {
    console.log("[parseSegments] Input:", { segments, len });
  }

  if (len === 1) {
    // [state] -> state page
    return { type: "state", state: segments[0] };
  }

  if (len === 2) {
    // Could be:
    // [state, city] -> city page
    // [category, slug] -> detail page (no state, no city)

    // Heuristic: If second segment looks like a slug (long, has numbers/years),
    // treat as [category, slug] detail page
    const second = segments[1];
    const looksLikeSlug = second.length > 15 || /\d{4}/.test(second) || second.split('-').length > 3;

    if (looksLikeSlug) {
      return {
        type: "detail_country_only",
        state: null,
        city: null,
        category: segments[0],
        slug: segments[1],
      };
    }

    // Otherwise, it's a city page: [state, city]
    return { type: "city", state: segments[0], city: segments[1] };
  }

  if (len === 3) {
    // Could be:
    // [state, category, slug] -> detail page (no city)
    // [state, city, category] -> category page
    // [city, category, slug] -> detail page (no state)

    const second = segments[1];
    const third = segments[2];

    if (process.env.NODE_ENV === "development") {
      console.log("[parseSegments] 3 segments:", { segments, second, third });
    }

    // Check if second segment looks like a category slug
    const secondIsCategory =
      /-(agency|services|development|automation|marketing|design|seo|consulting|solutions|platform|software|tools|systems)$/.test(second);

    // Category slugs typically end with: -agency, -services, -development, -automation, -marketing, etc.
    const looksLikeCategorySlug =
      /-(agency|services|development|automation|marketing|design|seo|consulting|solutions|platform|software|tools|systems)$/.test(third);

    // Post slugs typically:
    // - Have year (2024, 2025, etc.)
    // - Start with "best-", "top-", "how-to-", "guide-", etc.
    // - Are very long and descriptive (30+ chars, 5+ words)
    // - Or contain "vs", "vs-", "which", "what", "how", "why" (comparison/question posts)
    const looksLikePostSlug =
      /\d{4}/.test(third) || // Has year (e.g., "best-agencies-2025")
      /^(best|top|how-to|guide|complete|ultimate|step-by-step|comprehensive)/.test(third) || // Starts with common post prefixes
      /\b(vs|which|what|how|why|when|where)\b/.test(third) || // Contains comparison/question words
      (third.length > 20 && third.split('-').length > 4 && !looksLikeCategorySlug); // Long and descriptive, but not a category

    if (process.env.NODE_ENV === "development") {
      console.log("[parseSegments] 3 segments check:", {
        secondIsCategory,
        looksLikeCategorySlug,
        looksLikePostSlug,
        thirdLength: third.length,
        thirdWords: third.split('-').length,
      });
    }

    // If second segment is a category and third looks like a post slug, it's a detail page
    if (secondIsCategory && looksLikePostSlug) {
      // Could be [state, category, slug] or [city, category, slug]
      // Since we have 3 segments and second is category, first could be state or city
      // Most common case: [city, category, slug] where city might also be used as state
      // The API will handle matching with proper geo hierarchy
      return {
        type: "detail",
        state: segments[0], // Try as state first
        city: segments[0], // Also try as city (common case where city name is used)
        category: segments[1],
        slug: segments[2]
      };
    }

    // If second segment is NOT a category, it might be a city
    // So [state, city, category] -> category page
    if (!secondIsCategory && looksLikeCategorySlug) {
      return { type: "category", state: segments[0], city: segments[1], category: segments[2] };
    }

    // If second is category but third doesn't look like post slug, still try as detail page
    // (might be a short slug that doesn't match our heuristics)
    if (secondIsCategory) {
      return {
        type: "detail_no_city",
        state: segments[0],
        city: null,
        category: segments[1],
        slug: segments[2]
      };
    }

    // Otherwise, assume it's a category page: [state, city, category]
    return { type: "category", state: segments[0], city: segments[1], category: segments[2] };
  }

  if (len === 4) {
    // Could be:
    // [state, city, category, slug] -> detail page (with city)
    // [state, state, city, category] -> category page (duplicate state)
    // [state, state, category, slug] -> detail page (duplicate state, no city)

    // Check if first two segments are the same (duplicate state)
    if (segments[0] === segments[1]) {
      // [state, state, category, slug] or [state, state, city, category]
      const third = segments[2];
      const fourth = segments[3];
      
      // Check if third looks like category and fourth looks like slug
      const thirdIsCategory = /-(agency|services|development|automation|marketing|design|seo|consulting|solutions|platform|software|tools|systems)$/.test(third);
      const fourthIsSlug = /\d{4}/.test(fourth) || 
        /^(best|top|how-to|guide|complete|ultimate|step-by-step|comprehensive)/.test(fourth) ||
        /\b(vs|which|what|how|why|when|where)\b/.test(fourth) ||
        (fourth.length > 20 && fourth.split('-').length > 4);
      
      if (thirdIsCategory && fourthIsSlug) {
        // [state, state, category, slug] -> detail page (no city)
        return { 
          type: "detail_no_city", 
          state: segments[0], 
          city: null, 
          category: segments[2], 
          slug: segments[3] 
        };
      }
      
      // Otherwise: [state, state, city, category] -> category page
      return { type: "category", state: segments[0], city: segments[2], category: segments[3] };
    }

    // Check if last segment looks like a category slug
    const fourth = segments[3];
    const looksLikeCategorySlug =
      /-(agency|services|development|automation|marketing|design|seo|consulting|solutions|platform|software|tools|systems)$/.test(fourth);

    // Check if last segment looks like a post slug
    const looksLikePostSlug =
      /\d{4}/.test(fourth) || // Has year
      /^(best|top|how-to|guide|complete|ultimate|step-by-step|comprehensive)/.test(fourth) || // Starts with common post prefixes
      /\b(vs|which|what|how|why|when|where)\b/.test(fourth) || // Contains comparison/question words
      (fourth.length > 20 && fourth.split('-').length > 4 && !looksLikeCategorySlug); // Long and descriptive

    if (looksLikeCategorySlug && !looksLikePostSlug) {
      // [state, city, category, category] -> category page (duplicate category)
      if (segments[2] === segments[3]) {
        return { type: "category", state: segments[0], city: segments[1], category: segments[2] };
      }
    }

    // Otherwise, assume detail page: [state, city, category, slug]
    return { type: "detail", state: segments[0], city: segments[1], category: segments[2], slug: segments[3] };
  }

  // Handle 5+ segments: [state, city, category, slug-part1, slug-part2, ...] -> detail page
  // Example: [california, beverly-hills, ai-automation, ai-automation-business-complete-guide-2025]
  // Or: [geneva, seo, best-on-page-seo-companies-2025] (3 segments but might be parsed as detail)
  if (len >= 5) {
    // For 5+ segments, assume: [state, city, category, ...slug-parts]
    // Join all segments from index 3 onwards as the slug
    const slug = segments.slice(3).join('-');

    if (process.env.NODE_ENV === "development") {
      console.log("[parseSegments] 5+ segments:", {
        segments,
        state: segments[0],
        city: segments[1],
        category: segments[2],
        slug,
      });
    }

    return {
      type: "detail",
      state: segments[0],
      city: segments[1],
      category: segments[2],
      slug: slug
    };
  }

  // Invalid
  return { type: "invalid" };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const resolvedParams = await Promise.resolve(params);
  const { country, segments } = resolvedParams;

  // Ensure segments is an array
  const segmentsArray = Array.isArray(segments) ? segments : (segments ? [segments] : []);

  const parsed = parseSegments(segmentsArray);
  const countryName = formatLabel(country);
  const normalizedState =
    parsed.state && parsed.state !== country ? parsed.state : null;
  // If city and state are the same, it means we're using city name as state identifier
  // In this case, treat it as city (common pattern: /blog/country/city/category/slug)
  const normalizedCity =
    parsed.city && parsed.city !== country ? parsed.city : null;
  const metaState =
    parsed.state && parsed.state !== country ? parsed.state : null;
  const metaCity =
    parsed.city && parsed.city !== country ? parsed.city : null;

  const year = new Date().getFullYear();

  if (parsed.type === "state") {
    const stateName = formatLabel(parsed.state);
    return {
      title: `${stateName}, ${countryName} – Local Expert Insights ${year} | Moydus`,
      description: `Discover ${stateName} digital insights, local expertise, and ${year} trends. Expert articles covering web design, SEO, development, and digital solutions from ${stateName}, ${countryName}. Regional content powered by local market knowledge.`,
      keywords: [
        `${stateName} digital services`,
        `${stateName} ${countryName}`,
        `${stateName} web design`,
        `${stateName} SEO`,
        `${stateName} local expertise`,
        `${stateName} trends ${year}`,
      ],
      alternates: {
        canonical: `https://moydus.com/blog/${country}/${parsed.state}`,
        types: {
          "application/json": `https://moydus.com/blog/${country}/${parsed.state}/ai-index.json`,
        },
      },
      openGraph: {
        type: "website",
        url: `https://moydus.com/blog/${country}/${parsed.state}`,
        title: `${stateName}, ${countryName} – Local Insights`,
        description: `Expert insights and trends from ${stateName}, ${countryName}.`,
        siteName: "Moydus",
      },
      robots: {
        index: true,
        follow: true,
      },
      other: {
        "geo.region": `${countryName}-${stateName}`,
        "geo.placename": `${stateName}, ${countryName}`,
      },
    };
  }

  if (parsed.type === "city") {
    const stateName = formatLabel(parsed.state);
    const cityName = formatLabel(parsed.city!);
    return {
      title: `${cityName}, ${stateName} – Hyper-Local Digital Insights ${year} | Moydus`,
      description: `Discover ${cityName} digital insights, hyper-local expertise, and ${year} trends. Expert articles on web design, SEO, development, and digital solutions from ${cityName}, ${stateName}. City-specific content for ${cityName} businesses.`,
      keywords: [
        `${cityName} digital services`,
        `${cityName} ${stateName}`,
        `${cityName} web design`,
        `${cityName} SEO`,
        `${cityName} agencies`,
        `${cityName} local insights`,
        `${cityName} trends ${year}`,
      ],
      alternates: {
        canonical: `https://moydus.com/blog/${country}/${parsed.state}/${parsed.city}`,
        types: {
          "application/json": `https://moydus.com/blog/${country}/${parsed.state}/${parsed.city}/ai-index.json`,
        },
      },
      openGraph: {
        type: "website",
        url: `https://moydus.com/blog/${country}/${parsed.state}/${parsed.city}`,
        title: `${cityName}, ${stateName} – Local Insights`,
        description: `Hyper-local insights from ${cityName}, ${stateName}.`,
        siteName: "Moydus",
      },
      robots: {
        index: true,
        follow: true,
      },
      other: {
        "geo.region": `${countryName}-${stateName}`,
        "geo.placename": `${cityName}, ${stateName}, ${countryName}`,
      },
    };
  }

  if (parsed.type === "category") {
    const stateName = formatLabel(parsed.state);
    const cityName = formatLabel(parsed.city!);
    const categoryName = formatLabel(parsed.category!);
    return {
      title: `${categoryName} in ${cityName}, ${stateName} – Expert Guides ${year} | Moydus`,
      description: `Discover ${categoryName.toLowerCase()} insights, expert guides, and ${year} trends from ${cityName}, ${stateName}. Local ${categoryName.toLowerCase()} expertise combined with proven strategies. Real case studies from ${cityName} businesses.`,
      keywords: [
        `${categoryName} ${cityName}`,
        `${categoryName} ${stateName}`,
        `${cityName} ${categoryName.toLowerCase()}`,
        `${categoryName} agencies ${cityName}`,
        `${categoryName} services ${cityName}`,
      ],
      openGraph: {
        type: "article",
        url: `https://moydus.com/blog/${country}/${parsed.state}/${parsed.city}/${parsed.category}`,
        title: `${categoryName} in ${cityName}, ${stateName}`,
        description: `${categoryName} insights from ${cityName}.`,
        siteName: "Moydus",
      },
      robots: {
        index: true,
        follow: true,
      },
      other: {
        "geo.placename": `${cityName}, ${stateName}`,
      },
    };
  }

  if (parsed.type === "detail" || parsed.type === "detail_no_city" || parsed.type === "detail_country_only") {
    // Only fetch post metadata if we have a slug
    if (parsed.slug) {
      const postResult = await getBlogPostByLocation(
        country,
        normalizedState,
        normalizedCity,
        parsed.category!,
        parsed.slug!
      );

      if (postResult.success && postResult.data) {
        const post = (postResult.data as { data?: unknown })?.data || postResult.data;
        const postData = post as { 
          title?: string; 
          meta_title?: string; 
          meta_description?: string; 
          excerpt?: string;
          canonical_url?: string;
        };

        // Build canonical URL
        const pathParts = [country];
        if (normalizedState) pathParts.push(normalizedState);
        if (normalizedCity && normalizedCity !== normalizedState) pathParts.push(normalizedCity);
        if (parsed.category) pathParts.push(parsed.category);
        pathParts.push(parsed.slug);
        const defaultCanonical = `https://moydus.com/blog/${pathParts.join("/")}`;

        return {
          title: postData.meta_title || postData.title || "Blog Post | Moydus",
          description: postData.meta_description || postData.excerpt || "Blog post from Moydus",
          alternates: {
            canonical: postData.canonical_url || defaultCanonical,
          },
        };
      }
    }
  }

  return {
    title: "Blog | Moydus",
    description: "Blog posts from Moydus",
  };
}

export default async function BlogCatchAllPage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const resolvedParams = await Promise.resolve(params);

  if (process.env.NODE_ENV === "development") {
    console.log("[Blog CatchAll] Raw params:", JSON.stringify({
      params: resolvedParams,
      keys: Object.keys(resolvedParams),
      segmentsValue: resolvedParams.segments,
      segmentsType: typeof resolvedParams.segments,
      segmentsIsArray: Array.isArray(resolvedParams.segments),
    }, null, 2));
  }

  const { country, segments } = resolvedParams;

  // Ensure segments is an array
  // In Next.js App Router, catch-all routes return segments as an array
  const segmentsArray = Array.isArray(segments)
    ? segments
    : segments
      ? [segments]
      : [];

  if (process.env.NODE_ENV === "development") {
    console.log("[Blog CatchAll] After processing:", JSON.stringify({
      country,
      segmentsArray,
      segmentsArrayLength: segmentsArray.length,
    }, null, 2));
  }

  const parsed = parseSegments(segmentsArray);
  const countryName = formatLabel(country);
  const normalizedState =
    parsed.state && parsed.state !== country ? parsed.state : null;
  // If city and state are the same, it means we're using city name as state identifier
  // In this case, treat it as city (common pattern: /blog/country/city/category/slug)
  const normalizedCity =
    parsed.city && parsed.city !== country ? parsed.city : null;

  if (process.env.NODE_ENV === "development") {
    console.log("[Blog CatchAll] Parsed segments:", {
      segments: segmentsArray,
      parsed,
      country,
      normalizedState,
      normalizedCity,
    });
  }

  if (parsed.type === "invalid") {
    notFound();
  }

  // STATE PAGE
  if (parsed.type === "state") {
    const stateName = formatLabel(parsed.state);

    const feedResult = await getBlogList({
      country,
      state: parsed.state,
    });

    const posts = feedResult.success && feedResult.data
      ? extractLaravelCollection(feedResult.data)
      : [];

    // Extract cities
    const cityMap = new Map<string, { count: number; name?: string }>();
    posts.forEach((post: { city?: string | { slug?: string; name?: string } }) => {
      const citySlug = typeof post.city === "string" ? post.city : post.city?.slug;
      const cityName = typeof post.city === "string" ? post.city : post.city?.name;
      if (citySlug) {
        const existing = cityMap.get(citySlug) || { count: 0 };
        cityMap.set(citySlug, { count: existing.count + 1, name: cityName });
      }
    });

    const cityItems = Array.from(cityMap.entries())
      .map(([slug, data]) => ({
        title: data.name || formatLabel(slug),
        href: `/blog/${country}/${parsed.state}/${slug}`,
        count: data.count,
        badge: "City",
      }))
      .sort((a, b) => b.count - a.count);

    return (
      <BlogFeedWithFilters
        blogList={posts}
        title={`${stateName}, ${countryName} – ${posts.length} Articles`}
        description={`Blog posts from ${stateName}, ${countryName}.`}
        cityFilters={cityItems}
        showCityFilters={true}
        totalCount={posts.length}
      />
    );
  }

  // CITY PAGE
  if (parsed.type === "city") {
    const stateName = formatLabel(parsed.state);
    const cityName = formatLabel(parsed.city!);

    const feedResult = await getBlogList({
      country,
      state: parsed.state,
      city: parsed.city,
    });

    const posts = feedResult.success && feedResult.data
      ? extractLaravelCollection(feedResult.data)
      : [];

    // Extract categories
    const categoryMap = new Map<string, { count: number; name?: string }>();
    posts.forEach((post: { category?: string | { slug?: string; name?: string } }) => {
      const categorySlug = typeof post.category === "string" ? post.category : post.category?.slug;
      const categoryName = typeof post.category === "string" ? post.category : post.category?.name;
      if (categorySlug) {
        const existing = categoryMap.get(categorySlug) || { count: 0 };
        categoryMap.set(categorySlug, { count: existing.count + 1, name: categoryName });
      }
    });

    const categoryItems = Array.from(categoryMap.entries())
      .map(([slug, data]) => ({
        title: data.name || formatLabel(slug),
        href: `/blog/${country}/${parsed.state}/${parsed.city}/${slug}`,
        count: data.count,
        badge: "Category",
      }))
      .sort((a, b) => b.count - a.count);

    return (
      <BlogFeedWithFilters
        blogList={posts}
        title={`${cityName}, ${stateName} – ${posts.length} Articles`}
        description={`Blog posts from ${cityName}, ${stateName}.`}
        categoryFilters={categoryItems}
        showCategoryFilters={true}
        totalCount={posts.length}
      />
    );
  }

  // CATEGORY PAGE
  if (parsed.type === "category") {
    const stateName = formatLabel(parsed.state);
    const cityName = formatLabel(parsed.city!);
    const categoryName = formatLabel(parsed.category!);

    if (process.env.NODE_ENV === "development") {
      console.log("[Blog Category Page] Fetching:", {
        country,
        state: parsed.state,
        city: parsed.city,
        category: parsed.category,
      });
    }

    const feedResult = await getBlogList({
      country,
      state: parsed.state,
      city: parsed.city,
      category: parsed.category,
      diverse: true, // Ensure diverse content
    });

    if (process.env.NODE_ENV === "development") {
      console.log("[Blog Category Page] Result:", {
        success: feedResult.success,
        hasData: !!feedResult.data,
      });
    }

    const posts = feedResult.success && feedResult.data
      ? extractLaravelCollection(feedResult.data)
      : [];

    return (
      <BlogFeedWithFilters
        blogList={posts}
        title={`${categoryName} in ${cityName}, ${stateName} – ${posts.length} Articles`}
        description={`${categoryName} blog posts from ${cityName}, ${stateName}.`}
        totalCount={posts.length}
      />
    );
  }

  // DETAIL PAGE (with city)
  if (parsed.type === "detail") {
    if (process.env.NODE_ENV === "development") {
      console.log("[Blog Detail] Fetching with:", {
        country,
        state: parsed.state,
        city: parsed.city,
        category: parsed.category,
        slug: parsed.slug,
      });
    }

    const postResult = await getBlogPostByLocation(
      country,
      normalizedState,
      normalizedCity,
      parsed.category!,
      parsed.slug!
    );

    if (process.env.NODE_ENV === "development") {
      console.log("[Blog Detail] API Result:", {
        success: postResult.success,
        hasData: !!postResult.data,
        error: postResult.error,
      });
    }

    if (!postResult.success || !postResult.data) {
      notFound();
    }

    const post = (postResult.data as { data?: unknown })?.data || postResult.data;

    if (process.env.NODE_ENV === "development") {
      console.log("[Blog Detail] Post data keys:", Object.keys(post as Record<string, unknown>));
      console.log("[Blog Detail] Featured image:", (post as any).featured_image || (post as any).image_url);
    }

    return (
      <BlogDetailClient
        blog={post as Record<string, unknown>}
        params={{
          country,
          state: parsed.state,
          city: parsed.city!,
          category: parsed.category!,
          slug: parsed.slug!,
        }}
      />
    );
  }

  // DETAIL PAGE (without city)
  if (parsed.type === "detail_no_city") {
    const postResult = await getBlogPostByLocation(
      country,
      normalizedState,
      null,
      parsed.category!,
      parsed.slug!
    );

    if (!postResult.success || !postResult.data) {
      notFound();
    }

    const post = (postResult.data as { data?: unknown })?.data || postResult.data;

    return (
      <BlogDetailClient
        blog={post as Record<string, unknown>}
        params={{
          country,
          state: parsed.state,
          city: null,
          category: parsed.category!,
          slug: parsed.slug!,
        }}
      />
    );
  }

  // DETAIL PAGE (country only)
  if (parsed.type === "detail_country_only") {
    const postResult = await getBlogPostByLocation(
      country,
      null,
      null,
      parsed.category!,
      parsed.slug!
    );

    if (!postResult.success || !postResult.data) {
      notFound();
    }

    const post = (postResult.data as { data?: unknown })?.data || postResult.data;

    return (
      <BlogDetailClient
        blog={post as Record<string, unknown>}
        params={{
          country,
          state: null,
          city: null,
          category: parsed.category!,
          slug: parsed.slug!,
        }}
      />
    );
  }

  notFound();
}
