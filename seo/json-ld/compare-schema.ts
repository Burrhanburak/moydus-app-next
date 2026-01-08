type CompareSchemaInput = {
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

export function buildComparePageSchema(input: CompareSchemaInput) {
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
    "@type": "WebPage",
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

  // İstersen karşılaştırılan iki opsiyonu da ekleyebilirsin
  if (data?.option1 || data?.option2) {
    base.hasPart = [
      {
        "@type": "WebPageElement",
        name: data.option1 ?? "Option 1",
      },
      {
        "@type": "WebPageElement",
        name: data.option2 ?? "Option 2",
      },
    ];
  }

  return base;
}
