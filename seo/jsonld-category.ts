export function generateCategoryJsonLd(category: any, templates: any[]) {
  const url = `https://moydus.com/marketplace/templates/category/${category.slug}`;

  // Breadcrumbs
  const breadcrumbs = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Templates",
      item: "https://moydus.com/marketplace/templates",
    },
  ];

  if (category.parent) {
    breadcrumbs.push({
      "@type": "ListItem",
      position: 2,
      name: category.parent.title,
      item: `https://moydus.com/marketplace/templates/category/${category.parent.slug}`,
    });
  }

  breadcrumbs.push({
    "@type": "ListItem",
    position: breadcrumbs.length + 1,
    name: category.title,
    item: url,
  });

  // ItemList (Template listesi)
  const itemList = templates.map((t, i) => ({
    "@type": "Product",
    position: i + 1,
    url: `https://moydus.com/marketplace/templates/${category.slug}/${t.slug}`,
    name: t.title,
    image: t.thumbnails?.[0]?.asset?.url ?? "",
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: t.price || "0",
      availability: "https://schema.org/InStock",
    },
  }));

  // FAQ Schema
  const faqSchema = category.faqs?.length
    ? {
        "@type": "FAQPage",
        mainEntity: category.faqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: f.answer,
          },
        })),
      }
    : null;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbs,
      },
      {
        "@type": "CollectionPage",
        name: category.title,
        description: category.description || "",
        url: url,
      },
      {
        "@type": "ItemList",
        itemListElement: itemList,
      },
      ...(faqSchema ? [faqSchema] : []),
    ],
  };
}
