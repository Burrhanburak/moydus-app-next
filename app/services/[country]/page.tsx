import ServicesFeedWithFilters from "@/app/services/_components/ServicesFeedWithFilters";
import { getServicesList } from "@/app/actions/service-actions";
import { extractLaravelCollection } from "@/lib/extract-laravel-array";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ country: string }>;
}): Promise<Metadata> {
  const resolvedParams = await Promise.resolve(params);
  const countryName = resolvedParams.country
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return {
    title: `${countryName} Services | Moydus`,
    description: `Professional digital services in ${countryName}. Web design, SEO, marketing, and digital solutions.`,
    alternates: {
      canonical: `https://moydus.com/services/${resolvedParams.country}`,
      types: {
        "application/json": `https://moydus.com/services/${resolvedParams.country}/ai-index.json`,
      },
    },
    openGraph: {
      type: "website",
      url: `https://moydus.com/services/${resolvedParams.country}`,
      title: `${countryName} Services | Moydus`,
      description: `Professional digital services in ${countryName}.`,
      siteName: "Moydus",
    },
    twitter: {
      card: "summary_large_image",
      title: `${countryName} Services | Moydus`,
      description: `Professional digital services in ${countryName}.`,
    },
  };
}

export default async function ServicesCountryPage({
  params,
}: {
  params: Promise<{
    country: string;
  }>;
}) {
  const resolvedParams = await Promise.resolve(params);

  const countrySlug = resolvedParams.country.toLowerCase();
  const hyphenCount = (countrySlug.match(/-/g) || []).length;

  if (hyphenCount > 2) {
    notFound();
  }

  const countryName = resolvedParams.country
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  // Fetch country services feed with diverse categories
  const countryFeedResult = await getServicesList({
    country: resolvedParams.country,
    perPage: 100,
    diverse: true,
  });
  const countryServices =
    countryFeedResult.success && countryFeedResult.data
      ? extractLaravelCollection(countryFeedResult.data)
      : [];

  // Extract unique states from services
  const stateMap = new Map<string, { count: number; name?: string }>();
  countryServices.forEach((service: any) => {
    const stateSlug = typeof service.state === "string"
      ? service.state
      : service.state?.slug;
    const stateName = typeof service.state === "string"
      ? service.state
      : service.state?.name || service.state?.slug;

    if (stateSlug) {
      const existing = stateMap.get(stateSlug) || { count: 0 };
      stateMap.set(stateSlug, {
        count: existing.count + 1,
        name: stateName,
      });
    }
  });

  const stateItems: Array<{
    title: string;
    href: string;
    count: number;
    badge?: string;
  }> = Array.from(stateMap.entries())
    .map(([slug, data]) => ({
      title: data.name || slug,
      href: `/services/${resolvedParams.country}/${slug}`,
      count: data.count,
      badge: "State",
    }))
    .sort((a, b) => b.count - a.count);

  const totalServices = countryServices.length;

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: countryName, href: `/services/${resolvedParams.country}` },
  ];

  return (
    <ServicesFeedWithFilters
      services={countryServices}
      title={`${countryName} – ${totalServices} Services`}
      description={`Professional digital services in ${countryName}. Web design, SEO, marketing, and digital solutions.`}
      breadcrumbs={breadcrumbs}
      stateFilters={stateItems}
      showStateFilters={true}
      totalCount={totalServices}
    />
  );
}

