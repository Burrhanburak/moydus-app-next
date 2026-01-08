type TopPageSchemaInput = {
  url: string;
  title: string;
  description: string;
  country: string;
  state?: string | null;
  city?: string | null;
  category: string;
  updatedAt?: string;
  data?: any;
};

export function buildTopPageSchema(input: TopPageSchemaInput) {
  const {
    url,
    title,
    description,
    country,
    state,
    city,
    category,
    updatedAt,
    data,
  } = input;

  const locationName = city || state || country;

  const base: any = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": url,
    url: url,
    name: title,
    description: description,
    isPartOf: {
      "@type": "Website",
      name: "Moydus",
      url: "https://moydus.com",
    },
    inLanguage: "en",
    about: [
      {
        "@type": "Thing",
        name: category,
      },
      {
        "@type": "Place",
        name: locationName,
      },
    ],
  };

  if (updatedAt) {
    base.dateModified = updatedAt;
  }

  // If data contains a list of items, add them
  if (data?.items && Array.isArray(data.items)) {
    base.itemListElement = data.items.map((item: any, index: number) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Thing",
        name: item.name || item.title,
        description: item.description,
      },
    }));
  }

  return base;
}
























