//json-ld/*

//JSON-LD blog schema

// JSON-LD service schema

// JSON-LD organization schema

// JSON-LD story schema
// seo/json-ld/index.ts
export type MoydusGeo = {
  country: string;
  state?: string | null;
  city?: string | null;
};

export type MoydusImage = {
  url: string;
  width?: number;
  height?: number;
  alt?: string;
};

export type MoydusAuthor = {
  name: string;
  url?: string;
  type?: "Person" | "Organization";
};

export type MoydusBreadcrumbItem = {
  name: string;
  url?: string;
};

const SCHEMA_CONTEXT = "https://schema.org";

/* -------------------------
 * ORGANIZATION
 * ------------------------*/
export function buildOrganizationSchema() {
  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "Organization",
    name: "Moydus LLC",
    legalName: "Moydus LLC",
    url: "https://www.moydus.com",
    logo: {
      "@type": "ImageObject",
      url: "https://www.moydus.com/logo.png",
      width: 512,
      height: 512,
      caption: "Moydus Logo",
    },
    image: {
      "@type": "ImageObject",
      url: "https://www.moydus.com/logo.png",
      width: 512,
      height: 512,
      caption: "Moydus Logo",
      creator: {
        "@type": "Organization",
        name: "Moydus LLC",
      },
      copyrightHolder: {
        "@type": "Organization",
        name: "Moydus LLC",
      },
      license: "https://www.moydus.com/terms-of-service",
    },
    description:
      "Moydus LLC is a US-based web design, software development and AI-powered digital agency serving businesses worldwide across 150+ countries.",
    email: "info@moydus.com",
    telephone: "+1-505-460-5392",
    address: {
      "@type": "PostalAddress",
      streetAddress: "1209 Mountain Road Place Northeast, Ste N",
      addressLocality: "Albuquerque",
      addressRegion: "New Mexico",
      postalCode: "87110",
      addressCountry: "US",
    },
    foundingDate: "2020",
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      value: "10-50",
    },
    areaServed: {
      "@type": "Place",
      name: "Worldwide",
      description: "Serving businesses globally across 150+ countries",
    },
    sameAs: [
      "https://www.linkedin.com/company/moydus",
      "https://x.com/moydus",
      "https://www.facebook.com/moydus",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-505-460-5392",
      contactType: "Customer Service",
      email: "info@moydus.com",
      areaServed: "Worldwide",
      availableLanguage: ["English"],
    },
  };
}

/* -------------------------
 * WEBSITE
 * ------------------------*/
export function buildWebsiteSchema() {
  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "WebSite",
    name: "Moydus",
    url: "https://moydus.com/",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://moydus.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };
}

/* -------------------------
 * WEBPAGE (GENERIC)
 * ------------------------*/
export function buildWebPageSchema(params: {
  url: string;
  title: string;
  description: string;
  breadcrumbItems?: MoydusBreadcrumbItem[];
  image?: MoydusImage;
  datePublished?: string;
  dateModified?: string;
  speakable?: boolean;
  mainEntity?: any;
}) {
  const { url, title, description, breadcrumbItems, image, speakable, mainEntity } = params;

  const base: any = {
    "@context": SCHEMA_CONTEXT,
    "@type": "WebPage",
    url,
    name: title,
    headline: title,
    description,
    inLanguage: "en-US",
    isPartOf: {
      "@type": "WebSite",
      name: "Moydus",
      url: "https://www.moydus.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Moydus LLC",
      url: "https://www.moydus.com",
      logo: {
        "@type": "ImageObject",
        url: "https://www.moydus.com/logo.png",
        width: 512,
        height: 512,
      },
    },
  };

  if (params.datePublished) base.datePublished = params.datePublished;
  if (params.dateModified) base.dateModified = params.dateModified;

  if (image) {
    base.image = {
      "@type": "ImageObject",
      url: image.url,
      width: image.width ?? 1200,
      height: image.height ?? 630,
      caption: image.alt || title,
      creator: {
        "@type": "Organization",
        name: "Moydus LLC",
      },
      copyrightHolder: {
        "@type": "Organization",
        name: "Moydus LLC",
      },
    };
  }

  if (speakable) {
    base.speakable = {
      "@type": "SpeakableSpecification",
      xPath: [
        "/html/head/title",
        "/html/head/meta[@name='description']/@content",
      ],
    };
  }

  if (breadcrumbItems && breadcrumbItems.length) {
    base.breadcrumb = buildBreadcrumbSchema(breadcrumbItems);
  }

  if (mainEntity) {
    base.mainEntity = mainEntity;
  }

  return base;
}

/* -------------------------
 * BREADCRUMB
 * ------------------------*/
export function buildBreadcrumbSchema(items: MoydusBreadcrumbItem[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(item.url ? { item: item.url } : {}),
    })),
  };
}

/* -------------------------
 * BLOG POSTING
 * ------------------------*/
export function buildBlogPostingSchema(params: {
  url: string;
  title: string;
  description: string;
  image?: MoydusImage;
  author: MoydusAuthor;
  geo?: MoydusGeo;
  keywords?: string[];
  datePublished: string;
  dateModified?: string;
  readTimeMinutes?: number;
}) {
  const {
    url,
    title,
    description,
    image,
    author,
    geo,
    keywords,
    datePublished,
    dateModified,
    readTimeMinutes,
  } = params;

  const data: any = {
    "@context": SCHEMA_CONTEXT,
    "@type": "BlogPosting",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    headline: title,
    description,
    articleSection: "Blog",
    datePublished,
    dateModified: dateModified ?? datePublished,
    isAccessibleForFree: true,
    author: {
      "@type": author.type ?? "Person",
      name: author.name,
      ...(author.url ? { url: author.url } : {}),
    },
    publisher: {
      "@type": "Organization",
      name: "Moydus LLC",
      logo: {
        "@type": "ImageObject",
        url: "https://moydus.com/logo.png",
      },
    },
  };

  if (image) {
    data.image = {
      "@type": "ImageObject",
      url: image.url,
      width: image.width ?? 1200,
      height: image.height ?? 630,
    };
  }

  if (geo?.city || geo?.country) {
    data.contentLocation = {
      "@type": "Place",
      name: [geo.city, geo.state, geo.country].filter(Boolean).join(", "),
      address: {
        "@type": "PostalAddress",
        addressLocality: geo.city,
        addressRegion: geo.state,
        addressCountry: geo.country,
      },
    };
  }

  if (keywords?.length) {
    data.keywords = keywords.join(", ");
  }

  if (readTimeMinutes) {
    data.timeRequired = `PT${Math.max(1, readTimeMinutes)}M`;
  }

  return data;
}

/* -------------------------
 * SERVICE SCHEMA (ADVANCED)
 * ------------------------*/
export function buildServiceSchema(params: {
  url: string;
  name: string;
  description: string;
  category: string;
  image?: MoydusImage;
  priceFrom?: number;
  priceTo?: number;
  currency?: string;
  areaServed?: string | string[];
}) {
  const { url, name, description, category, image } = params;

  const priceRange =
    params.priceFrom && params.priceTo && params.currency
      ? `${params.currency} ${params.priceFrom} - ${params.priceTo}`
      : undefined;

  const areaServed = params.areaServed || "Worldwide";
  const areaServedArray = Array.isArray(areaServed) ? areaServed : [areaServed];

  const data: any = {
    "@context": SCHEMA_CONTEXT,
    "@type": "Service",
    name,
    description,
    url,
    serviceType: category,
    provider: {
      "@type": "Organization",
      name: "Moydus LLC",
      url: "https://www.moydus.com",
      logo: {
        "@type": "ImageObject",
        url: "https://www.moydus.com/logo.png",
        width: 512,
        height: 512,
      },
      address: {
        "@type": "PostalAddress",
        streetAddress: "1209 Mountain Road Place Northeast, Ste N",
        addressLocality: "Albuquerque",
        addressRegion: "New Mexico",
        postalCode: "87110",
        addressCountry: "US",
      },
      telephone: "+1-505-460-5392",
      email: "info@moydus.com",
    },
    areaServed: areaServedArray.map((area) => ({
      "@type": "Place",
      name: area,
    })),
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: url,
      serviceType: category,
    },
  };

  if (image) {
    data.image = {
      "@type": "ImageObject",
      url: image.url,
      width: image.width ?? 1200,
      height: image.height ?? 630,
      caption: image.alt || name,
      creator: {
        "@type": "Organization",
        name: "Moydus LLC",
      },
      copyrightHolder: {
        "@type": "Organization",
        name: "Moydus LLC",
      },
    };
  }

  if (priceRange) {
    data.offers = {
      "@type": "Offer",
      price: priceRange,
      priceCurrency: params.currency || "USD",
      availability: "https://schema.org/InStock",
      url: url,
    };
  }

  return data;
}

/* -------------------------
 * FAQ PAGE
 * ------------------------*/
export type FaqItem = {
  question: string;
  answer: string;
};

export function buildFAQPageSchema(faqs: FaqItem[]) {
  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };
}

/* -------------------------
 * WEB STORY (AMP STORY)
 * ------------------------*/
export function buildWebStorySchema(params: {
  url: string;
  title: string;
  description: string;
  poster: MoydusImage; // poster-portrait-src
  publisherName: string;
  publisherLogo: string;
  datePublished: string;
  dateModified?: string;
}) {
  const { url, title, description, poster, publisherName, publisherLogo } =
    params;

  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "WebPage",
    "@id": url,
    isPartOf: {
      "@type": "WebSite",
      name: "Moydus",
      url: "https://moydus.com",
    },
    name: title,
    description,
    datePublished: params.datePublished,
    dateModified: params.dateModified ?? params.datePublished,
    image: {
      "@type": "ImageObject",
      url: poster.url,
      width: poster.width ?? 640,
      height: poster.height ?? 853,
    },
    publisher: {
      "@type": "Organization",
      name: publisherName,
      logo: {
        "@type": "ImageObject",
        url: publisherLogo,
        width: 96,
        height: 96,
      },
    },
  };
}

/* -------------------------
 * IMAGE OBJECT (OG ile entegre)
 * ------------------------*/
export function buildImageObject(params: MoydusImage) {
  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "ImageObject",
    contentUrl: params.url,
    url: params.url,
    width: params.width ?? 1200,
    height: params.height ?? 630,
    description: params.alt,
  };
}
