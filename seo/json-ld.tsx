// SEO JSON-LD helpers and components
"use client";

import Script from "next/script";

interface JsonLdProps {
  data: any;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <Script
      id="json-ld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// ===== SERVER-SIDE SCHEMA BUILDERS =====
// These are exported from here but can be used in server components
// They don't have "use client" directive

// Blog Posting Schema Builder
export interface BlogPostingSchemaOptions {
  url: string;
  title: string;
  description: string;
  image?: { url: string; alt: string };
  author: {
    name: string;
    type: string;
    url?: string;
  };
  geo?: {
    country: string;
    state: string;
    city: string;
  };
  keywords?: string[];
  datePublished?: string;
  dateModified?: string;
  readTimeMinutes?: number;
}

export function buildBlogPostingSchema(options: BlogPostingSchemaOptions) {
  const schema: any = {
    "@type": "BlogPosting",
    headline: options.title,
    description: options.description,
    url: options.url,
  };

  if (options.image) {
    schema.image = {
      "@type": "ImageObject",
      url: options.image.url,
      caption: options.image.alt,
    };
  }

  if (options.author) {
    schema.author = {
      "@type":
        options.author.type === "Organization" ? "Organization" : "Person",
      name: options.author.name,
    };
    if (options.author.url) {
      schema.author.url = options.author.url;
    }
  }

  if (options.geo) {
    schema.contentLocation = {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressCountry: options.geo.country,
        addressRegion: options.geo.state,
        addressLocality: options.geo.city,
      },
    };
  }

  if (options.keywords && options.keywords.length > 0) {
    schema.keywords = options.keywords.join(", ");
  }

  if (options.datePublished) {
    schema.datePublished = options.datePublished;
  }

  if (options.dateModified) {
    schema.dateModified = options.dateModified;
  } else if (options.datePublished) {
    schema.dateModified = options.datePublished;
  }

  if (options.readTimeMinutes) {
    schema.timeRequired = `PT${options.readTimeMinutes}M`;
  }

  return schema;
}

// Breadcrumb Schema Builder
export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function buildBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// WebPage Schema Builder
export interface WebPageSchemaOptions {
  url: string;
  title: string;
  description: string;
  breadcrumbItems?: BreadcrumbItem[];
}

export function buildWebPageSchema(options: WebPageSchemaOptions) {
  const schema: any = {
    "@type": "WebPage",
    url: options.url,
    name: options.title,
    description: options.description,
  };

  if (options.breadcrumbItems && options.breadcrumbItems.length > 0) {
    schema.breadcrumb = buildBreadcrumbSchema(options.breadcrumbItems);
  }

  return schema;
}

// WebStory Schema Builder
export interface WebStorySchemaOptions {
  url: string;
  headline: string;
  description: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  author?: {
    name: string;
    type: string;
  };
}

export function buildWebStorySchema(options: WebStorySchemaOptions) {
  const schema: any = {
    "@type": "WebStory",
    url: options.url,
    headline: options.headline,
    description: options.description,
  };

  if (options.image) {
    schema.image = options.image;
  }

  if (options.author) {
    schema.author = {
      "@type":
        options.author.type === "Organization" ? "Organization" : "Person",
      name: options.author.name,
    };
  }

  if (options.datePublished) {
    schema.datePublished = options.datePublished;
  }

  if (options.dateModified) {
    schema.dateModified = options.dateModified;
  } else if (options.datePublished) {
    schema.dateModified = options.datePublished;
  }

  return schema;
}

