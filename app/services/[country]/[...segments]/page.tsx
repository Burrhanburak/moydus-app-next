import ServicesFeedWithFilters from "@/app/services/_components/ServicesFeedWithFilters";
import { getServicesList, getServicePageByLocation } from "@/app/actions/service-actions";
import { extractLaravelCollection } from "@/lib/extract-laravel-array";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ServiceDetailClient from "./_components/ServiceDetailClient";

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
// Service URL format: /services/{country}/{state?}/{city?}/{slug}
// NOTE: NO CATEGORY in service URLs!
// Possible patterns:
// [slug] -> detail page (country only)
// [state, slug] -> detail page (country + state)
// [state, city] -> city page
// [state, city, slug] -> detail page (country + state + city)
function parseSegments(segments: string[]) {
  const len = segments.length;
  
  if (len === 1) {
    // [slug] -> detail page (country only, no state/city)
    return { 
      type: "detail_country_only", 
      state: null, 
      city: null, 
      slug: segments[0] 
    };
  }
  
  if (len === 2) {
    // [state, slug] -> detail page (country + state, no city)
    return { 
      type: "detail_no_city", 
      state: segments[0], 
      city: null, 
      slug: segments[1] 
    };
  }
  
  if (len === 3) {
    // [state, city, slug] -> detail page (country + state + city)
    return { 
      type: "detail", 
      state: segments[0], 
      city: segments[1], 
      slug: segments[2] 
    };
  }
  
  // More than 3 segments - invalid
  return { type: "invalid" };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { country, segments } = await Promise.resolve(params);
  const parsed = parseSegments(segments);
  const countryName = formatLabel(country);
  
  if (parsed.type === "state") {
    const stateName = formatLabel(parsed.state);
    return {
      title: `${stateName}, ${countryName} Services | Moydus`,
      description: `Professional digital services in ${stateName}, ${countryName}.`,
      alternates: {
        canonical: `https://moydus.com/services/${country}/${parsed.state}`,
        types: {
          "application/json": `https://moydus.com/services/${country}/${parsed.state}/ai-index.json`,
        },
      },
    };
  }
  
  if (parsed.type === "city") {
    const stateName = formatLabel(parsed.state);
    const cityName = formatLabel(parsed.city!);
    return {
      title: `${cityName}, ${stateName} Services | Moydus`,
      description: `Professional digital services in ${cityName}, ${stateName}, ${countryName}.`,
      alternates: {
        canonical: `https://moydus.com/services/${country}/${parsed.state}/${parsed.city}`,
        types: {
          "application/json": `https://moydus.com/services/${country}/${parsed.state}/${parsed.city}/ai-index.json`,
        },
      },
    };
  }
  
  if (parsed.type === "detail") {
    // Fetch service for canonical URL
    const serviceResult = await getServicePageByLocation(
      country,
      parsed.state,
      parsed.city!,
      parsed.slug!
    );

    const stateName = formatLabel(parsed.state);
    const cityName = formatLabel(parsed.city!);
    
    if (serviceResult.success && serviceResult.data) {
      const service = (serviceResult.data as { data?: unknown })?.data || serviceResult.data;
      const canonicalUrl = (service as { canonical_url?: string })?.canonical_url;
      const metaTitle = (service as { meta_title?: string })?.meta_title;
      const metaDescription = (service as { meta_description?: string })?.meta_description;

      return {
        title: metaTitle || `Services in ${cityName}, ${stateName} | Moydus`,
        description: metaDescription || `Professional services in ${cityName}, ${stateName}, ${countryName}.`,
        alternates: {
          canonical: canonicalUrl || `https://moydus.com/services/${country}/${parsed.state}/${parsed.city}/${parsed.slug}`,
        },
      };
    }

    return {
      title: `Services in ${cityName}, ${stateName} | Moydus`,
      description: `Professional services in ${cityName}, ${stateName}, ${countryName}.`,
      alternates: {
        canonical: `https://moydus.com/services/${country}/${parsed.state}/${parsed.city}/${parsed.slug}`,
      },
    };
  }

  if (parsed.type === "detail_no_city") {
    // Fetch service for canonical URL
    const serviceResult = await getServicePageByLocation(
      country,
      parsed.state,
      null,
      parsed.slug!
    );

    const stateName = formatLabel(parsed.state);
    
    if (serviceResult.success && serviceResult.data) {
      const service = (serviceResult.data as { data?: unknown })?.data || serviceResult.data;
      const canonicalUrl = (service as { canonical_url?: string })?.canonical_url;
      const metaTitle = (service as { meta_title?: string })?.meta_title;
      const metaDescription = (service as { meta_description?: string })?.meta_description;

      return {
        title: metaTitle || `Services in ${stateName} | Moydus`,
        description: metaDescription || `Professional services in ${stateName}, ${countryName}.`,
        alternates: {
          canonical: canonicalUrl || `https://moydus.com/services/${country}/${parsed.state}/${parsed.slug}`,
        },
      };
    }

    return {
      title: `Services in ${stateName} | Moydus`,
      description: `Professional services in ${stateName}, ${countryName}.`,
      alternates: {
        canonical: `https://moydus.com/services/${country}/${parsed.state}/${parsed.slug}`,
      },
    };
  }

  if (parsed.type === "detail_country_only") {
    // Fetch service for canonical URL
    const serviceResult = await getServicePageByLocation(
      country,
      null,
      null,
      parsed.slug!
    );
    
    if (serviceResult.success && serviceResult.data) {
      const service = (serviceResult.data as { data?: unknown })?.data || serviceResult.data;
      const canonicalUrl = (service as { canonical_url?: string })?.canonical_url;
      const metaTitle = (service as { meta_title?: string })?.meta_title;
      const metaDescription = (service as { meta_description?: string })?.meta_description;

      return {
        title: metaTitle || `Services in ${countryName} | Moydus`,
        description: metaDescription || `Professional services in ${countryName}.`,
        alternates: {
          canonical: canonicalUrl || `https://moydus.com/services/${country}/${parsed.slug}`,
        },
      };
    }

    return {
      title: `Services in ${countryName} | Moydus`,
      description: `Professional services in ${countryName}.`,
      alternates: {
        canonical: `https://moydus.com/services/${country}/${parsed.slug}`,
      },
    };
  }
  
  return {
    title: "Services | Moydus",
    description: "Professional digital services.",
  };
}

export default async function ServicesCatchAllPage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { country, segments } = await Promise.resolve(params);
  const parsed = parseSegments(segments);
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
    
    const services = feedResult.success && feedResult.data
      ? extractLaravelCollection(feedResult.data)
      : [];
    
    // Extract cities
    const cityMap = new Map<string, { count: number; name?: string }>();
    services.forEach((service: { city?: string | { slug?: string; name?: string } }) => {
      const citySlug = typeof service.city === "string" ? service.city : service.city?.slug;
      const cityName = typeof service.city === "string" ? service.city : service.city?.name;
      if (citySlug) {
        const existing = cityMap.get(citySlug) || { count: 0 };
        cityMap.set(citySlug, { count: existing.count + 1, name: cityName });
      }
    });
    
    const cityItems = Array.from(cityMap.entries())
      .map(([slug, data]) => ({
        title: data.name || formatLabel(slug),
        href: `/services/${country}/${parsed.state}/${slug}`,
        count: data.count,
        badge: "City",
      }))
      .sort((a, b) => b.count - a.count);
    
    const breadcrumbs = [
      { label: "Home", href: "/" },
      { label: "Services", href: "/services" },
      { label: countryName, href: `/services/${country}` },
      { label: stateName, href: `/services/${country}/${parsed.state}` },
    ];
    
    return (
      <ServicesFeedWithFilters
        services={services}
        title={`${stateName}, ${countryName} – ${services.length} Services`}
        description={`Professional digital services in ${stateName}, ${countryName}.`}
        breadcrumbs={breadcrumbs}
        cityFilters={cityItems}
        showCityFilters={true}
        totalCount={services.length}
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
    
    const services = feedResult.success && feedResult.data
      ? extractLaravelCollection(feedResult.data)
      : [];
    
    // Extract categories
    const categoryMap = new Map<string, { count: number; name?: string }>();
    services.forEach((service: { category?: string | { slug?: string; name?: string } }) => {
      const categorySlug = typeof service.category === "string" ? service.category : service.category?.slug;
      const categoryName = typeof service.category === "string" ? service.category : service.category?.name;
      if (categorySlug) {
        const existing = categoryMap.get(categorySlug) || { count: 0 };
        categoryMap.set(categorySlug, { count: existing.count + 1, name: categoryName });
      }
    });
    
    // Note: We no longer filter by category in URLs
    // Categories are shown in the service cards but not used for routing

    const breadcrumbs = [
      { label: "Home", href: "/" },
      { label: "Services", href: "/services" },
      { label: countryName, href: `/services/${country}` },
      { label: stateName, href: `/services/${country}/${parsed.state}` },
      { label: cityName, href: `/services/${country}/${parsed.state}/${parsed.city}` },
    ];

    return (
      <ServicesFeedWithFilters
        services={services}
        title={`${cityName}, ${stateName} – ${services.length} Services`}
        description={`Professional digital services in ${cityName}, ${stateName}.`}
        breadcrumbs={breadcrumbs}
        totalCount={services.length}
      />
    );
  }
  
  // DETAIL PAGE (with city)
  if (parsed.type === "detail") {
    // Try to fetch the service
    const serviceResult = await getServicePageByLocation(
      country,
      parsed.state,
      parsed.city!,
      parsed.slug!
    );

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
          slug: parsed.slug!,
        }}
      />
    );
  }
  
  // DETAIL PAGE (without city - e.g., /services/country/state/slug)
  if (parsed.type === "detail_no_city") {
    const serviceResult = await getServicePageByLocation(
      country,
      parsed.state,
      null, // no city
      parsed.slug!
    );

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
          slug: parsed.slug!,
        }}
      />
    );
  }

  // DETAIL PAGE (country only - e.g., /services/country/slug)
  if (parsed.type === "detail_country_only") {
    const serviceResult = await getServicePageByLocation(
      country,
      null, // no state
      null, // no city
      parsed.slug!
    );

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
          slug: parsed.slug!,
        }}
      />
    );
  }
  
  notFound();
}

