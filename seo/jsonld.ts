// lib/seo/jsonld.ts

type TemplateCategory = {
  title: string;
  slug: string;
};

type TemplateSeo = {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string;
  serpSnippet?: string;
};

type JsonLdAdvanced = {
  disableAutoJsonLd?: boolean;
  customJsonLd?: string;
};

type TemplateDoc = {
  title: string;
  slug: string;
  price?: string;
  description?: string;
  seo?: TemplateSeo;
  demoUrl?: string;
  templateType?: string;
  difficulty?: string;
  updatedAt?: string;
  views?: number;
  categories?: TemplateCategory[];
  jsonLdAdvanced?: JsonLdAdvanced;
};

type CategorySeo = {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string;
  canonicalUrl?: string;
};

type CategoryDoc = {
  title: string;
  slug: string;
  description?: string;
  seo?: CategorySeo;
  parent?: {
    title: string;
    slug: string;
    parent?: { title: string; slug: string } | null;
  } | null;
  jsonLdAdvanced?: JsonLdAdvanced;
};

export function buildTemplateJsonLd(
  template: TemplateDoc,
  baseUrl: string
): any {
  const canonicalUrl = `${baseUrl}/marketplace/templates/${
    template.categories?.[0]?.slug || "template"
  }/${template.slug}`;

  // Eğer custom JSON-LD varsa ve auto kapalıysa → onu dön
  if (template.jsonLdAdvanced?.disableAutoJsonLd) {
    if (template.jsonLdAdvanced.customJsonLd) {
      try {
        return JSON.parse(template.jsonLdAdvanced.customJsonLd);
      } catch {
        // JSON parse hatasında fallback auto
      }
    }
  }

  const name = template.seo?.metaTitle || template.title;
  const description = template.seo?.metaDescription || template.description;

  const price =
    template.price && template.price.toLowerCase() !== "free"
      ? template.price
      : undefined;
  const isFree =
    template.price && template.price.toLowerCase() === "free" ? true : false;

  const jsonLd: any = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    sku: template.slug,
    url: canonicalUrl,
    category: template.categories?.map((c) => c.title),
    isFamilyFriendly: true,
    offers: {
      "@type": "Offer",
      url: canonicalUrl,
      availability: "https://schema.org/InStock",
    },
  };

  if (isFree) {
    jsonLd.offers.price = 0;
    jsonLd.offers.priceCurrency = "USD";
  } else if (price) {
    jsonLd.offers.price = price;
    jsonLd.offers.priceCurrency = "USD";
  }

  if (template.demoUrl) {
    jsonLd.isSimilarTo = template.demoUrl;
  }

  if (template.updatedAt) {
    jsonLd.dateModified = template.updatedAt;
  }

  if (template.views) {
    jsonLd.interactionStatistic = {
      "@type": "InteractionCounter",
      interactionType: "https://schema.org/WatchAction",
      userInteractionCount: template.views,
    };
  }

  return jsonLd;
}

export function buildTemplateBreadcrumbJsonLd(
  template: TemplateDoc,
  baseUrl: string
): any {
  const items: any[] = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Templates",
      item: `${baseUrl}/marketplace/templates`,
    },
  ];

  if (template.categories?.[0]) {
    items.push({
      "@type": "ListItem",
      position: 2,
      name: template.categories[0].title,
      item: `${baseUrl}/marketplace/templates/category/${template.categories[0].slug}`,
    });
  }

  items.push({
    "@type": "ListItem",
    position: items.length + 1,
    name: template.title,
    item: `${baseUrl}/marketplace/templates/${template.categories?.[0]?.slug || "template"}/${template.slug}`,
  });

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items,
  };
}

export function buildCategoryJsonLd(
  category: CategoryDoc,
  baseUrl: string
): any {
  if (category.jsonLdAdvanced?.disableAutoJsonLd) {
    if (category.jsonLdAdvanced.customJsonLd) {
      try {
        return JSON.parse(category.jsonLdAdvanced.customJsonLd);
      } catch {
        // ignore parse error → fallback
      }
    }
  }

  const canonicalUrl =
    category.seo?.canonicalUrl ||
    `${baseUrl}/marketplace/templates/category/${category.slug}`;

  const jsonLd: any = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: category.seo?.metaTitle || category.title,
    description: category.seo?.metaDescription || category.description,
    url: canonicalUrl,
  };

  return jsonLd;
}
