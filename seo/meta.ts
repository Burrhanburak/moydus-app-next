import { buildCanonical } from "./canonical";
import { buildHreflang } from "./hreflang";

export function buildMoydusMeta({
  title,
  description,
  path,
  images = [],
  published,
  modified,
  schema = [],
  faq = [],
  breadcrumbs = [],
}: {
  title: string;
  description: string;
  path: string;
  images?: string[];
  published?: string;
  modified?: string;
  schema?: any[];
  faq?: { q: string; a: string }[];
  breadcrumbs?: Array<{ name: string; url: string }>;
}) {
  const canonical = buildCanonical(path);
  const hre = buildHreflang(path);

  const ld = [];

  if (breadcrumbs.length) {
    ld.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbs.map((b, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: b.name,
        item: b.url,
      })),
    });
  }

  if (faq.length) {
    ld.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.a,
        },
      })),
    });
  }

  if (schema.length) ld.push(...schema);

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        [hre.hreflang]: hre.url,
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      images,
    },
    other: {
      "script:ld+json": JSON.stringify(ld),
    },
  };
}

import { buildHreflang } from "./hreflang";

export async function generateMetadata({ params }) {
  const data = await fetchService(params); // Laravel API’den veri alıyor
  const canonical = `https://moydus.com${data.path}`;

  const { hreflang, url } = buildHreflang(data.path);

  return {
    title: data.title,
    description: data.description,
    alternates: {
      canonical,
      languages: {
        [hreflang]: url,
      },
    },
  };
}
