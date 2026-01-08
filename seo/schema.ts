export function schemaLocalBusiness(data) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: data.name,
    image: data.image,
    address: data.address,
    geo: data.geo,
    hasMap: [data.google_map, data.apple_map],
    telephone: data.telephone,
    url: data.url,
  };
}
export function schemaService(data) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: data.name,
    description: data.description,
    areaServed: {
      "@type": "City",
      name: data.city,
      addressRegion: data.state,
      addressCountry: data.country,
    },
    provider: {
      "@type": "Organization",
      name: "Moydus LLC",
      url: "https://moydus.com",
    },
  };
}
export function schemaArticle({
  title,
  description,
  images,
  published,
  modified,
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    image: images,
    datePublished: published,
    dateModified: modified || published,
  };
}

export function schemaProduct(p) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    description: p.description,
    image: p.image,
    sku: p.sku,
    offers: {
      "@type": "Offer",
      price: p.price,
      priceCurrency: p.currency,
      availability: "https://schema.org/InStock",
      url: p.url,
    },
  };
}
