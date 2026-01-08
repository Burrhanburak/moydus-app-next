import ContentFeedWithFilters from "@/app/_components/ContentFeedWithFilters";
import ServiceDetailClient from "@/app/services/[country]/[...segments]/_components/ServiceDetailClient";
import { getServicesList, getServicePageByLocation } from "@/app/actions/service-actions";
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
// Similar to blog, services, FAQ, Top, Compare, Best, and How-To
function parseSegments(segments: string[]) {
  const len = segments.length;
  
  if (process.env.NODE_ENV === "development") {
    console.log("[NearMe parseSegments] Input:", { segments, len });
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
    // - Have year (2024, 2025, etc.)
    // - Start with "best-", "top-", "how-to-", "guide-", etc.
    // - Are very long and descriptive (30+ chars, 5+ words)
    const looksLikePostSlug = 
      /\d{4}/.test(third) || // Has year
      /^(best|top|how-to|guide|complete|ultimate|step-by-step|comprehensive|build|create|make)/.test(third) || // Starts with common post prefixes
      (third.length > 30 && third.split('-').length > 5 && !looksLikeCategorySlug); // Very long and descriptive
    
    if (process.env.NODE_ENV === "development") {
      console.log("[NearMe parseSegments] 3 segments:", {
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
    
    // If category and slug are identical, treat as detail (no city)
    if (segments[1] === segments[2]) {
      return {
        type: "detail_no_city",
        state: segments[0],
        city: null,
        category: segments[1],
        slug: segments[2],
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
    
    // If category and slug are identical, still treat as detail
    if (segments[2] === segments[3]) {
      return { type: "detail", state: segments[0], city: segments[1], category: segments[2], slug: segments[3] };
    }
    
    // Check if last segment looks like a category slug
    const fourth = segments[3];
    const looksLikeCategorySlug = 
      /-(agency|services|development|automation|marketing|design|seo|consulting|solutions|platform|software|tools|systems)$/.test(fourth);
    
    // Check if last segment looks like a post slug
    const looksLikePostSlug = 
      /\d{4}/.test(fourth) || // Has year
      /^(best|top|how-to|guide|complete|ultimate|step-by-step|comprehensive|build|create|make)/.test(fourth) || // Starts with common post prefixes
      (fourth.length > 30 && fourth.split('-').length > 5 && !looksLikeCategorySlug); // Very long and descriptive
    
    if (looksLikeCategorySlug && !looksLikePostSlug) {
      // Already handled duplicate category above; fallback to category
      return { type: "category", state: segments[0], city: segments[1], category: segments[2] };
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
      title: `Services Near Me in ${stateName}, ${countryName} | Moydus`,
      description: `Find professional services near you in ${stateName}, ${countryName}.`,
      alternates: {
        canonical: `https://moydus.com/near-me/${country}/${parsed.state}`,
        types: {
          "application/json": `https://moydus.com/near-me/${country}/${parsed.state}/ai-index.json`,
        },
      },
    };
  }
  
  if (parsed.type === "city") {
    const stateName = formatLabel(parsed.state);
    const cityName = formatLabel(parsed.city!);
    return {
      title: `Services Near Me in ${cityName}, ${stateName} | Moydus`,
      description: `Find professional services near you in ${cityName}, ${stateName}, ${countryName}.`,
      alternates: {
        canonical: `https://moydus.com/near-me/${country}/${parsed.state}/${parsed.city}`,
        types: {
          "application/json": `https://moydus.com/near-me/${country}/${parsed.state}/${parsed.city}/ai-index.json`,
        },
      },
    };
  }
  
  if (parsed.type === "category") {
    const stateName = formatLabel(parsed.state);
    const cityName = formatLabel(parsed.city!);
    const categoryName = formatLabel(parsed.category!);
    return {
      title: `${categoryName} Near Me in ${cityName}, ${stateName} | Moydus`,
      description: `Find ${categoryName} services near you in ${cityName}, ${stateName}.`,
    };
  }
  
  if (parsed.type === "detail" || parsed.type === "detail_no_city" || parsed.type === "detail_country_only") {
    // Only fetch service metadata if we have a slug
    if (parsed.slug) {
      const serviceResult = await getServicePageByLocation({
        country,
        slug: parsed.slug!,
        state: parsed.state || null,
        city: parsed.city || null,
      });
      
      if (serviceResult.success && serviceResult.data) {
        const service = (serviceResult.data as { data?: unknown })?.data || serviceResult.data;
        const serviceData = service as { title?: string; meta_title?: string; meta_description?: string };
        
        return {
          title: serviceData.meta_title || serviceData.title || "Services Near Me | Moydus",
          description: serviceData.meta_description || "Find professional services near you.",
        };
      }
    }
  }
  
  return {
    title: "Services Near Me | Moydus",
    description: "Find professional services near you.",
  };
}

export default async function NearMeCatchAllPage({
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
    
    const feedResult = await getServicesList({
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
        href: `/near-me/${country}/${parsed.state}/${slug}`,
        count: data.count,
        badge: "City",
      }))
      .sort((a, b) => b.count - a.count);
    
    return (
      <ContentFeedWithFilters
        items={items}
        baseUrl="/near-me"
        sectionTitle="Near Me"
        title={`Services Near Me in ${stateName}, ${countryName} – ${items.length} Services`}
        description={`Find professional services near you in ${stateName}, ${countryName}.`}
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
    
    const feedResult = await getServicesList({
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
        href: `/near-me/${country}/${parsed.state}/${parsed.city}/${slug}`,
        count: data.count,
        badge: "Category",
      }))
      .sort((a, b) => b.count - a.count);
    
    return (
      <ContentFeedWithFilters
        items={items}
        baseUrl="/near-me"
        sectionTitle="Near Me"
        title={`Services Near Me in ${cityName}, ${stateName} – ${items.length} Services`}
        description={`Find professional services near you in ${cityName}, ${stateName}.`}
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
    
    const feedResult = await getServicesList({
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
        baseUrl="/near-me"
        sectionTitle="Near Me"
        title={`${categoryName} Near Me in ${cityName}, ${stateName} – ${items.length} Services`}
        description={`Find ${categoryName} services near you in ${cityName}, ${stateName}.`}
        totalCount={items.length}
      />
    );
  }
  
  // DETAIL PAGE (with city)
  if (parsed.type === "detail") {
    const serviceResult = await getServicePageByLocation({
      country,
      slug: parsed.slug!,
      state: parsed.state,
      city: parsed.city!,
    });
    
    if (!serviceResult.success || !serviceResult.data) {
      notFound();
    }
    
    const service = (serviceResult.data as { data?: unknown })?.data || serviceResult.data;
    
    return (
      <ServiceDetailClient 
        servicePage={service as Record<string, unknown>} 
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
    const serviceResult = await getServicePageByLocation({
      country,
      slug: parsed.slug!,
      state: parsed.state,
      city: null,
    });
    
    if (!serviceResult.success || !serviceResult.data) {
      notFound();
    }
    
    const service = (serviceResult.data as { data?: unknown })?.data || serviceResult.data;
    
    return (
      <ServiceDetailClient 
        servicePage={service as Record<string, unknown>} 
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
    const serviceResult = await getServicePageByLocation({
      country,
      slug: parsed.slug!,
      state: null,
      city: null,
    });
    
    if (!serviceResult.success || !serviceResult.data) {
      notFound();
    }
    
    const service = (serviceResult.data as { data?: unknown })?.data || serviceResult.data;
    
    return (
      <ServiceDetailClient 
        servicePage={service as Record<string, unknown>} 
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





