type BasePageSeo = {
  url: string;
  title: string;
  description: string;
  image?: string;
  publishedAt?: string;
  updatedAt?: string;
  breadcrumbs?: { name: string; url?: string }[];
  faq?: { question: string; answer: string }[];
  isLocalService?: boolean;
  geo?: {
    country: string;
    state?: string;
    city?: string;
  };
};

export function buildJsonLd(page: BasePageSeo) {
  const {
    url,
    title,
    description,
    image,
    publishedAt,
    updatedAt,
    breadcrumbs,
    faq,
    isLocalService,
    geo,
  } = page;

  const jsonLd: any[] = [];

  // Article / BlogPosting
  jsonLd.push({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    image: image ? [image] : undefined,
    mainEntityOfPage: url,
    datePublished: publishedAt,
    dateModified: updatedAt ?? publishedAt,
    author: {
      "@type": "Organization",
      name: "Moydus LLC",
    },
    publisher: {
      "@type": "Organization",
      name: "Moydus LLC",
      logo: {
        "@type": "ImageObject",
        url: "https://moydus.com/logo.png",
      },
    },
  });

  // Breadcrumb
  if (breadcrumbs?.length) {
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbs.map((b, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: b.name,
        item: b.url,
      })),
    });
  }

  // FAQ
  if (faq?.length) {
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: f.answer,
        },
      })),
    });
  }

  // LocalBusiness for GEO service pages
  if (isLocalService && geo) {
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: "Moydus LLC",
      url,
      image: "https://moydus.com/office-cover.jpg",
      address: {
        "@type": "PostalAddress",
        addressCountry: geo.country,
        addressRegion: geo.state,
        addressLocality: geo.city,
      },
      // Google My Business / Apple Maps telefon vs ekleriz:
      telephone: "+1-505-460-5392",
    });
  }

  return JSON.stringify(jsonLd);
}
