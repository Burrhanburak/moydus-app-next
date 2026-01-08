import ContentFeedWithFilters from "@/app/_components/ContentFeedWithFilters";
import CompareClient from "@/app/compare/_components/CompareClient";
import { getCompareList, getComparePageByLocation } from "@/app/actions/compare-actions";
import { extractLaravelCollection } from "@/lib/extract-laravel-array";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { buildComparePageSchema } from "@/seo/json-ld/compare-schema";

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
// Similar to blog, services, FAQ, and Top
function parseSegments(segments: string[]) {
  const len = segments.length;
  
  if (process.env.NODE_ENV === "development") {
    console.log("[Compare parseSegments] Input:", { segments, len });
  }
  
  if (len === 1) {
    return { type: "state", state: segments[0] };
  }
  
  if (len === 2) {
    // [state, city] -> city page
    // [category, slug] -> detail page (no state, no city) - when both are same
    if (segments[0] === segments[1]) {
      return {
        type: "detail_country_only",
        state: null,
        city: null,
        category: segments[0],
        slug: segments[1],
      };
    }
    return { type: "city", state: segments[0], city: segments[1] };
  }
  
  if (len === 3) {
    // Could be:
    // [state, category, slug] -> detail page (no city)
    // [state, city, category] -> category page
    
    const third = segments[2];
    
    // Category slugs typically end with: -agency, -services, -development, -automation, -marketing, etc.
    const looksLikeCategorySlug = 
      /-(agency|services|development|automation|marketing|design|seo|consulting|solutions|platform|software|tools|systems)$/.test(third);
    
    // Post slugs typically:
    // - Have "vs" or "alternatives" in them
    // - Start with "best-", "top-", "how-to-", "guide-", etc.
    // - Are very long and descriptive (30+ chars, 5+ words)
    const looksLikePostSlug = 
      /(vs|alternatives|comparison|compare)/.test(third) || // Has comparison keywords
      /^(best|top|how-to|guide|complete|ultimate|step-by-step|comprehensive)/.test(third) || // Starts with common post prefixes
      (third.length > 30 && third.split('-').length > 5 && !looksLikeCategorySlug); // Very long and descriptive
    
    if (process.env.NODE_ENV === "development") {
      console.log("[Compare parseSegments] 3 segments:", {
        segments,
        third,
        looksLikeCategorySlug,
        looksLikePostSlug,
      });
    }
    
    if (looksLikePostSlug && !looksLikeCategorySlug) {
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
    
    // Check if first two segments are the same (duplicate state)
    if (segments[0] === segments[1]) {
      return { type: "category", state: segments[0], city: segments[2], category: segments[3] };
    }
    
    // Check if last segment looks like a category slug
    const fourth = segments[3];
    const looksLikeCategorySlug = 
      /-(agency|services|development|automation|marketing|design|seo|consulting|solutions|platform|software|tools|systems)$/.test(fourth);
    
    // Check if last segment looks like a post slug
    const looksLikePostSlug = 
      /(vs|alternatives|comparison|compare)/.test(fourth) || // Has comparison keywords
      /^(best|top|how-to|guide|complete|ultimate|step-by-step|comprehensive)/.test(fourth) || // Starts with common post prefixes
      (fourth.length > 30 && fourth.split('-').length > 5 && !looksLikeCategorySlug); // Very long and descriptive
    
    if (looksLikeCategorySlug && !looksLikePostSlug) {
      // [state, city, category, category] -> category page (duplicate category)
      if (segments[2] === segments[3]) {
        return { type: "category", state: segments[0], city: segments[1], category: segments[2] };
      }
    }
    
    // Otherwise, assume detail page: [state, city, category, slug]
    return { type: "detail", state: segments[0], city: segments[1], category: segments[2], slug: segments[3] };
  }
  
  // More than 4 segments - invalid
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
  
  if (parsed.type === "state") {
    const stateName = formatLabel(parsed.state);
    return {
      title: `${stateName}, ${countryName} Compare | Moydus`,
      description: `Side-by-side comparisons from ${stateName}, ${countryName}.`,
      alternates: {
        canonical: `https://moydus.com/compare/${country}/${parsed.state}`,
        types: {
          "application/json": `https://moydus.com/compare/${country}/${parsed.state}/ai-index.json`,
        },
      },
    };
  }
  
  if (parsed.type === "city") {
    const stateName = formatLabel(parsed.state);
    const cityName = formatLabel(parsed.city!);
    return {
      title: `${cityName}, ${stateName} Compare | Moydus`,
      description: `Side-by-side comparisons from ${cityName}, ${stateName}, ${countryName}.`,
      alternates: {
        canonical: `https://moydus.com/compare/${country}/${parsed.state}/${parsed.city}`,
        types: {
          "application/json": `https://moydus.com/compare/${country}/${parsed.state}/${parsed.city}/ai-index.json`,
        },
      },
    };
  }
  
  if (parsed.type === "category") {
    const stateName = formatLabel(parsed.state);
    const cityName = formatLabel(parsed.city!);
    const categoryName = formatLabel(parsed.category!);
    return {
      title: `${categoryName} Compare in ${cityName}, ${stateName} | Moydus`,
      description: `${categoryName} side-by-side comparisons from ${cityName}, ${stateName}.`,
    };
  }
  
  if (parsed.type === "detail" || parsed.type === "detail_no_city" || parsed.type === "detail_country_only") {
    // Only fetch compare metadata if we have a slug
    if (parsed.slug) {
      const compareResult = await getComparePageByLocation(
        country,
        parsed.state || null,
        parsed.city || null,
        parsed.category!,
        parsed.slug!
      );
      
      if (compareResult.success && compareResult.data) {
        const compare = (compareResult.data as { data?: unknown })?.data || compareResult.data;
        const compareData = compare as { title?: string; meta_title?: string; meta_description?: string; canonical_url?: string };
        
        // Build canonical URL
        const pathParts = [country];
        if (parsed.state) pathParts.push(parsed.state);
        if (parsed.city) pathParts.push(parsed.city);
        if (parsed.category) pathParts.push(parsed.category);
        pathParts.push(parsed.slug);
        const defaultCanonical = `https://moydus.com/compare/${pathParts.join("/")}`;
        
        return {
          title: compareData.meta_title || compareData.title || "Compare | Moydus",
          description: compareData.meta_description || "Side-by-side comparisons from Moydus",
          alternates: {
            canonical: compareData.canonical_url || defaultCanonical,
          },
        };
      }
    }
  }
  
  return {
    title: "Compare | Moydus",
    description: "Side-by-side comparisons from Moydus",
  };
}

export default async function CompareCatchAllPage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const resolvedParams = await Promise.resolve(params);
  
  // Ensure segments is an array
  const segmentsArray = Array.isArray(resolvedParams.segments) 
    ? resolvedParams.segments 
    : resolvedParams.segments 
      ? [resolvedParams.segments] 
      : [];
  
  const { country, segments } = resolvedParams;
  const parsed = parseSegments(segmentsArray);
  const countryName = formatLabel(country);
  
  if (parsed.type === "invalid") {
    notFound();
  }
  
  // STATE PAGE
  if (parsed.type === "state") {
    const stateName = formatLabel(parsed.state);
    
    const feedResult = await getCompareList({
      country,
      state: parsed.state,
      perPage: 100,
      diverse: true,
    });
    
    const items = feedResult.success && feedResult.data
      ? extractLaravelCollection(feedResult.data)
      : [];
    
    // Extract cities
    const cityMap = new Map<string, { count: number; name?: string }>();
    items.forEach((item: { city?: string | { slug?: string; name?: string } }) => {
      const citySlug = typeof item.city === "string" ? item.city : item.city?.slug;
      const cityName = typeof item.city === "string" ? item.city : item.city?.name;
      if (citySlug) {
        const existing = cityMap.get(citySlug) || { count: 0 };
        cityMap.set(citySlug, { count: existing.count + 1, name: cityName });
      }
    });
    
    const cityItems = Array.from(cityMap.entries())
      .map(([slug, data]) => ({
        title: data.name || formatLabel(slug),
        href: `/compare/${country}/${parsed.state}/${slug}`,
        count: data.count,
        badge: "City",
      }))
      .sort((a, b) => b.count - a.count);
    
    return (
      <ContentFeedWithFilters
        items={items}
        baseUrl="/compare"
        sectionTitle="Compare"
        title={`${stateName}, ${countryName} – ${items.length} Comparisons`}
        description={`Side-by-side comparisons from ${stateName}, ${countryName}.`}
        cityFilters={cityItems}
        showCityFilters={true}
        totalCount={items.length}
      />
    );
  }
  
  // CITY PAGE
  if (parsed.type === "city") {
    const stateName = formatLabel(parsed.state);
    const cityName = formatLabel(parsed.city!);
    
    const feedResult = await getCompareList({
      country,
      state: parsed.state,
      city: parsed.city,
      perPage: 100,
      diverse: true,
    });
    
    const items = feedResult.success && feedResult.data
      ? extractLaravelCollection(feedResult.data)
      : [];
    
    // Extract categories
    const categoryMap = new Map<string, { count: number; name?: string }>();
    items.forEach((item: { category?: string | { slug?: string; name?: string } }) => {
      const categorySlug = typeof item.category === "string" ? item.category : item.category?.slug;
      const categoryName = typeof item.category === "string" ? item.category : item.category?.name;
      if (categorySlug) {
        const existing = categoryMap.get(categorySlug) || { count: 0 };
        categoryMap.set(categorySlug, { count: existing.count + 1, name: categoryName });
      }
    });
    
    const categoryItems = Array.from(categoryMap.entries())
      .map(([slug, data]) => ({
        title: data.name || formatLabel(slug),
        href: `/compare/${country}/${parsed.state}/${parsed.city}/${slug}`,
        count: data.count,
        badge: "Category",
      }))
      .sort((a, b) => b.count - a.count);
    
    return (
      <ContentFeedWithFilters
        items={items}
        baseUrl="/compare"
        sectionTitle="Compare"
        title={`${cityName}, ${stateName} – ${items.length} Comparisons`}
        description={`Side-by-side comparisons from ${cityName}, ${stateName}.`}
        categoryFilters={categoryItems}
        showCategoryFilters={true}
        totalCount={items.length}
      />
    );
  }
  
  // CATEGORY PAGE
  if (parsed.type === "category") {
    const stateName = formatLabel(parsed.state);
    const cityName = formatLabel(parsed.city!);
    const categoryName = formatLabel(parsed.category!);
    
    const feedResult = await getCompareList({
      country,
      state: parsed.state,
      city: parsed.city,
      category: parsed.category,
      perPage: 100,
      diverse: true,
    });
    
    const items = feedResult.success && feedResult.data
      ? extractLaravelCollection(feedResult.data)
      : [];
    
    return (
      <ContentFeedWithFilters
        items={items}
        baseUrl="/compare"
        sectionTitle="Compare"
        title={`${categoryName} Compare in ${cityName}, ${stateName} – ${items.length} Comparisons`}
        description={`${categoryName} side-by-side comparisons from ${cityName}, ${stateName}.`}
        totalCount={items.length}
      />
    );
  }
  
  // DETAIL PAGE (with city)
  if (parsed.type === "detail") {
    const compareResult = await getComparePageByLocation(
      country,
      parsed.state,
      parsed.city!,
      parsed.category!,
      parsed.slug!
    );
    
    if (!compareResult.success || !compareResult.data) {
      notFound();
    }
    
    const compare = (compareResult.data as { data?: unknown })?.data || compareResult.data;
    const compareData = compare as { title?: string; meta_title?: string; meta_description?: string; updated_at?: string; updatedAt?: string; data?: unknown; content_data?: unknown };
    
    const schema = buildComparePageSchema({
      url: `https://moydus.com/compare/${country}/${parsed.state}/${parsed.city}/${parsed.category}/${parsed.slug}`,
      title: compareData.title || compareData.meta_title || "",
      description: compareData.meta_description ?? "",
      country: country,
      state: parsed.state,
      city: parsed.city!,
      category: parsed.category!,
      updatedAt: compareData.updated_at || compareData.updatedAt,
      data: compareData.data || compareData.content_data,
    });
    
    return (
      <>
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        <CompareClient 
          comparePage={compare as Record<string, unknown>} 
          params={{
            country,
            state: parsed.state,
            city: parsed.city!,
            category: parsed.category!,
            slug: parsed.slug!,
          }}
        />
      </>
    );
  }
  
  // DETAIL PAGE (without city)
  if (parsed.type === "detail_no_city") {
    const compareResult = await getComparePageByLocation(
      country,
      parsed.state,
      null,
      parsed.category!,
      parsed.slug!
    );
    
    if (!compareResult.success || !compareResult.data) {
      notFound();
    }
    
    const compare = (compareResult.data as { data?: unknown })?.data || compareResult.data;
    const compareData = compare as { title?: string; meta_title?: string; meta_description?: string; updated_at?: string; updatedAt?: string; data?: unknown; content_data?: unknown };
    
    const schema = buildComparePageSchema({
      url: `https://moydus.com/compare/${country}/${parsed.state}/${parsed.category}/${parsed.slug}`,
      title: compareData.title || compareData.meta_title || "",
      description: compareData.meta_description ?? "",
      country: country,
      state: parsed.state,
      city: null,
      category: parsed.category!,
      updatedAt: compareData.updated_at || compareData.updatedAt,
      data: compareData.data || compareData.content_data,
    });
    
    return (
      <>
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        <CompareClient 
          comparePage={compare as Record<string, unknown>} 
          params={{
            country,
            state: parsed.state,
            city: null,
            category: parsed.category!,
            slug: parsed.slug!,
          }}
        />
      </>
    );
  }
  
  // DETAIL PAGE (country only)
  if (parsed.type === "detail_country_only") {
    const compareResult = await getComparePageByLocation(
      country,
      null,
      null,
      parsed.category!,
      parsed.slug!
    );
    
    if (!compareResult.success || !compareResult.data) {
      notFound();
    }
    
    const compare = (compareResult.data as { data?: unknown })?.data || compareResult.data;
    const compareData = compare as { title?: string; meta_title?: string; meta_description?: string; updated_at?: string; updatedAt?: string; data?: unknown; content_data?: unknown };
    
    const schema = buildComparePageSchema({
      url: `https://moydus.com/compare/${country}/${parsed.category}/${parsed.slug}`,
      title: compareData.title || compareData.meta_title || "",
      description: compareData.meta_description ?? "",
      country: country,
      state: null,
      city: null,
      category: parsed.category!,
      updatedAt: compareData.updated_at || compareData.updatedAt,
      data: compareData.data || compareData.content_data,
    });
    
    return (
      <>
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        <CompareClient 
          comparePage={compare as Record<string, unknown>} 
          params={{
            country,
            state: null,
            city: null,
            category: parsed.category!,
            slug: parsed.slug!,
          }}
        />
      </>
    );
  }
  
  notFound();
}

