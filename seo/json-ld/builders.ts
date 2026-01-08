// seo/json-ld/builders.ts

// ---- Common Types ----
export interface BaseLocation {
  city?: string;
  state?: string;
  countryCode?: string; // "US"
  countryName?: string; // "United States"
}

export interface BaseImage {
  url: string;
  width?: number;
  height?: number;
}

export interface BaseOrg {
  name: string;
  url: string;
  logo: string;
  description?: string;
  sameAs?: string[];
  telephone?: string;
  email?: string;
  address?: {
    streetAddress?: string;
    addressLocality?: string;
    addressRegion?: string;
    postalCode?: string;
    addressCountry?: string;
  };
}

// ------- ORGANIZATION + WEBSITE -------

export function buildOrganizationSchema(org: BaseOrg) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: org.name,
    url: org.url,
    logo: org.logo,
    description: org.description,
    sameAs: org.sameAs,
    email: org.email,
    telephone: org.telephone,
    address: org.address && {
      "@type": "PostalAddress",
      ...org.address,
    },
  };
}

export function buildWebsiteSchema(params: {
  siteName: string;
  url: string;
  searchUrl?: string; // https://moydus.com/search?q={search_term_string}
}) {
  const data: any = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: params.siteName,
    url: params.url,
  };

  if (params.searchUrl) {
    data.potentialAction = {
      "@type": "SearchAction",
      target: `${params.searchUrl}`,
      "query-input": "required name=search_term_string",
    };
  }

  return data;
}

// ------- WEBPAGE + BREADCRUMB -------

export function buildWebPageSchema(params: {
  url: string;
  title: string;
  description?: string;
  isPartOf?: string; // parent URL
  datePublished?: string;
  dateModified?: string;
  image?: BaseImage;
}) {
  const data: any = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    url: params.url,
    name: params.title,
    headline: params.title,
    description: params.description,
  };

  if (params.isPartOf) {
    data.isPartOf = {
      "@type": "WebSite",
      "@id": params.isPartOf,
    };
  }

  if (params.datePublished) data.datePublished = params.datePublished;
  if (params.dateModified) data.dateModified = params.dateModified;

  if (params.image) {
    data.image = {
      "@type": "ImageObject",
      url: params.image.url,
      width: params.image.width ?? 1200,
      height: params.image.height ?? 630,
    };
  }

  return data;
}

export function buildBreadcrumbSchema(
  items: Array<{ name: string; url?: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// ------- SERVICE SCHEMA (GEO) -------

export function buildServiceSchema(params: {
  url: string;
  name: string;
  description: string;
  category: string;
  organization: BaseOrg;
  location?: BaseLocation;
  image?: BaseImage;
  priceFrom?: number;
  priceTo?: number;
  currency?: string; // "USD"
}) {
  const geoArea =
    params.location?.city ||
    params.location?.state ||
    params.location?.countryName
      ? {
          "@type": "Place",
          name: [
            params.location?.city,
            params.location?.state,
            params.location?.countryName,
          ]
            .filter(Boolean)
            .join(", "),
          address: {
            "@type": "PostalAddress",
            addressLocality: params.location?.city,
            addressRegion: params.location?.state,
            addressCountry: params.location?.countryCode,
          },
        }
      : undefined;

  const offers =
    params.priceFrom || params.priceTo
      ? {
          "@type": "Offer",
          priceCurrency: params.currency || "USD",
          price: params.priceFrom ?? params.priceTo,
          priceSpecification:
            params.priceFrom && params.priceTo
              ? {
                  "@type": "PriceSpecification",
                  priceCurrency: params.currency || "USD",
                  minPrice: params.priceFrom,
                  maxPrice: params.priceTo,
                }
              : undefined,
          url: params.url,
        }
      : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: params.name,
    description: params.description,
    serviceType: params.category,
    provider: {
      "@type": "Organization",
      name: params.organization.name,
      url: params.organization.url,
      logo: params.organization.logo,
    },
    areaServed: geoArea,
    hasOfferCatalog: undefined,
    offers,
    image:
      params.image &&
      ({
        "@type": "ImageObject",
        url: params.image.url,
        width: params.image.width ?? 1200,
        height: params.image.height ?? 630,
      } as any),
    url: params.url,
  };
}

// ------- BLOG / ARTICLE SCHEMA -------

export function buildBlogSchema(params: {
  url: string;
  title: string;
  description: string;
  body?: string;
  image?: BaseImage;
  authorName: string;
  authorUrl?: string;
  datePublished: string;
  dateModified?: string;
  tags?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": params.url,
    },
    headline: params.title,
    description: params.description,
    articleBody: params.body,
    image:
      params.image &&
      ({
        "@type": "ImageObject",
        url: params.image.url,
        width: params.image.width ?? 1200,
        height: params.image.height ?? 630,
      } as any),
    author: {
      "@type": "Person",
      name: params.authorName,
      url: params.authorUrl,
    },
    datePublished: params.datePublished,
    dateModified: params.dateModified ?? params.datePublished,
    url: params.url,
    keywords: params.tags?.join(", "),
  };
}

// ------- COMPARISON PAGE SCHEMA -------
// Örn: "Shopify vs WordPress Web Design in Austin"

export function buildComparisonSchema(params: {
  url: string;
  title: string; // "Shopify vs WordPress"
  optionA: string;
  optionB: string;
  category?: string;
  location?: BaseLocation;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "QAPage",
    mainEntity: {
      "@type": "Question",
      name: `${params.optionA} vs ${params.optionB} – ${params.category || "comparison"}`,
      acceptedAnswer: {
        "@type": "Answer",
        text: params.title,
      },
    },
    about: [
      {
        "@type": "Thing",
        name: params.optionA,
      },
      {
        "@type": "Thing",
        name: params.optionB,
      },
      params.location?.city && {
        "@type": "Place",
        name: [
          params.location.city,
          params.location.state,
          params.location.countryName,
        ]
          .filter(Boolean)
          .join(", "),
      },
    ].filter(Boolean),
    url: params.url,
  };
}

// ------- TOP PAGE SCHEMA (ItemList) -------
// Örn: "Top 10 Web Design Agencies in Austin"

export function buildTopPageSchema(params: {
  url: string;
  title: string;
  description?: string;
  items: Array<{
    name: string;
    url: string;
    position?: number;
  }>;
  location?: BaseLocation;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: params.title,
    description: params.description,
    itemListElement: params.items.map((item, index) => ({
      "@type": "ListItem",
      position: item.position ?? index + 1,
      url: item.url,
      name: item.name,
    })),
    about:
      params.location &&
      ({
        "@type": "Place",
        name: [
          params.location.city,
          params.location.state,
          params.location.countryName,
        ]
          .filter(Boolean)
          .join(", "),
      } as any),
    url: params.url,
  };
}

// ------- FAQ PAGE SCHEMA -------

export function buildFAQSchema(params: {
  url?: string;
  questions: Array<{ question: string; answer: string }>;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: params.questions.map((qa) => ({
      "@type": "Question",
      name: qa.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: qa.answer,
      },
    })),
    url: params.url,
  };
}

// ------- HOW-TO SCHEMA -------

export function buildHowToSchema(params: {
  url: string;
  name: string;
  description?: string;
  steps: Array<{ title: string; text?: string }>;
  totalTimeISO?: string; // "PT10M"
  estimatedCost?: { currency: string; value: number; description?: string };
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: params.name,
    description: params.description,
    step: params.steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.title,
      text: step.text,
    })),
    totalTime: params.totalTimeISO,
    estimatedCost:
      params.estimatedCost &&
      ({
        "@type": "MonetaryAmount",
        currency: params.estimatedCost.currency,
        value: params.estimatedCost.value,
        description: params.estimatedCost.description,
      } as any),
    url: params.url,
  };
}

// ------- STORY SCHEMA (Web Story / Article) -------

export function buildStorySchema(params: {
  url: string;
  title: string;
  description?: string;
  publisherName: string;
  publisherLogo: string;
  posterImage: string;
  datePublished: string;
  dateModified?: string;
  authorName?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: params.title,
    description: params.description,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": params.url,
    },
    image: [params.posterImage],
    datePublished: params.datePublished,
    dateModified: params.dateModified ?? params.datePublished,
    author: params.authorName && {
      "@type": "Person",
      name: params.authorName,
    },
    publisher: {
      "@type": "Organization",
      name: params.publisherName,
      logo: {
        "@type": "ImageObject",
        url: params.publisherLogo,
      },
    },
    url: params.url,
  };
}

// ------- EVENT SCHEMA -------

export function buildEventSchema(params: {
  name: string;
  url: string;
  startDate: string; // ISO
  endDate?: string;
  description?: string;
  location: {
    name: string;
    streetAddress?: string;
    addressLocality?: string;
    addressRegion?: string;
    postalCode?: string;
    addressCountry?: string;
  };
  organizer?: BaseOrg;
  image?: BaseImage;
  offers?: {
    price: number;
    currency: string;
    url?: string;
    availability?: string; // https://schema.org/InStock
  };
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: params.name,
    startDate: params.startDate,
    endDate: params.endDate,
    description: params.description,
    url: params.url,
    image:
      params.image &&
      ({
        "@type": "ImageObject",
        url: params.image.url,
        width: params.image.width ?? 1200,
        height: params.image.height ?? 630,
      } as any),
    location: {
      "@type": "Place",
      name: params.location.name,
      address: {
        "@type": "PostalAddress",
        streetAddress: params.location.streetAddress,
        addressLocality: params.location.addressLocality,
        addressRegion: params.location.addressRegion,
        postalCode: params.location.postalCode,
        addressCountry: params.location.addressCountry,
      },
    },
    organizer:
      params.organizer &&
      ({
        "@type": "Organization",
        name: params.organizer.name,
        url: params.organizer.url,
        logo: params.organizer.logo,
      } as any),
    offers:
      params.offers &&
      ({
        "@type": "Offer",
        url: params.offers.url ?? params.url,
        price: params.offers.price,
        priceCurrency: params.offers.currency,
        availability: params.offers.availability,
      } as any),
  };
}

// ------- LOCAL BUSINESS (GEO Services) -------

export interface LocalBusinessParams {
  name: string;
  url: string;
  description?: string;
  image?: string;
  telephone?: string;
  email?: string;
  address: {
    streetAddress?: string;
    addressLocality: string; // City
    addressRegion: string; // State
    postalCode?: string;
    addressCountry: string; // Country code (US, CA, etc.)
  };
  geo?: {
    latitude?: number;
    longitude?: number;
  };
  priceRange?: string; // "$", "$$", "$$$", "$$$$"
  openingHours?: string[]; // ["Mo-Fr 09:00-17:00"]
  aggregateRating?: {
    ratingValue: number;
    reviewCount: number;
    bestRating?: number;
    worstRating?: number;
  };
  sameAs?: string[];
}

export function buildLocalBusinessSchema(params: LocalBusinessParams) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: params.name,
    url: params.url,
    description: params.description,
    image: params.image,
    telephone: params.telephone,
    email: params.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: params.address.streetAddress,
      addressLocality: params.address.addressLocality,
      addressRegion: params.address.addressRegion,
      postalCode: params.address.postalCode,
      addressCountry: params.address.addressCountry,
    },
    geo: params.geo && {
      "@type": "GeoCoordinates",
      latitude: params.geo.latitude,
      longitude: params.geo.longitude,
    },
    priceRange: params.priceRange,
    openingHoursSpecification: params.openingHours?.map((hours) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: hours.split(" ")[0], // "Mo-Fr"
      opens: hours.split(" ")[1]?.split("-")[0], // "09:00"
      closes: hours.split(" ")[1]?.split("-")[1], // "17:00"
    })),
    aggregateRating: params.aggregateRating && {
      "@type": "AggregateRating",
      ratingValue: params.aggregateRating.ratingValue,
      reviewCount: params.aggregateRating.reviewCount,
      bestRating: params.aggregateRating.bestRating ?? 5,
      worstRating: params.aggregateRating.worstRating ?? 1,
    },
    sameAs: params.sameAs,
  };
}

