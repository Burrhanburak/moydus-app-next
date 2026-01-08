// lib/og-image.ts

export interface OGImageParams {
  city?: string;
  category?: string;
  country?: string;
  state?: string;
  template?: "default" | "city-category" | "comparison" | "blog";
  currency?: string;
  price?: string;
  year?: string;

  // For comparison
  option1?: string;
  option2?: string;

  // For blog template
  title?: string;
  readTime?: string;
}

export class OGImageGenerator {
  private baseUrl: string;

  constructor(baseUrl = "https://moydus.com") {
    this.baseUrl = baseUrl;
  }

  /** City + Category OG Image */
  generateCityCategoryImage(params: OGImageParams): string {
    const searchParams = new URLSearchParams({
      template: "city-category",
      city: params.city ?? "",
      category: params.category ?? "",
      country: params.country ?? "",
      year: params.year ?? new Date().getFullYear().toString(),
    });

    if (params.state) searchParams.set("state", params.state);
    if (params.currency) searchParams.set("currency", params.currency);
    if (params.price) searchParams.set("price", params.price);

    return `${this.baseUrl}/api/og?${searchParams.toString()}`;
  }

  /** Comparison OG Image */
  generateComparisonImage(
    params: OGImageParams & { option1: string; option2: string }
  ): string {
    const searchParams = new URLSearchParams({
      template: "comparison",
      option1: params.option1,
      option2: params.option2,
      year: params.year ?? new Date().getFullYear().toString(),
    });

    if (params.city) searchParams.set("city", params.city);
    if (params.category) searchParams.set("category", params.category);

    return `${this.baseUrl}/api/og?${searchParams.toString()}`;
  }

  /** Blog OG Image */
  generateBlogImage(params: OGImageParams & { title: string }): string {
    const searchParams = new URLSearchParams({
      template: "blog",
      title: params.title,
      year: params.year ?? new Date().getFullYear().toString(),
    });

    if (params.readTime) searchParams.set("readTime", params.readTime);
    if (params.category) searchParams.set("category", params.category);

    return `${this.baseUrl}/api/og?${searchParams.toString()}`;
  }

  /** Default OG Image */
  generateDefaultImage(params: OGImageParams): string {
    const searchParams = new URLSearchParams({
      template: "default",
      city: params.city ?? "",
      category: params.category ?? "",
      country: params.country ?? "",
      year: params.year ?? new Date().getFullYear().toString(),
    });

    if (params.state) searchParams.set("state", params.state);

    return `${this.baseUrl}/api/og?${searchParams.toString()}`;
  }

  /** Auto-select OG image type */
  generateAutoImage(params: OGImageParams): string {
    if (params.option1 && params.option2) {
      return this.generateComparisonImage(params as any);
    }

    if (params.template === "blog" && params.title) {
      return this.generateBlogImage(params as any);
    }

    if (params.city && params.category) {
      return this.generateCityCategoryImage(params);
    }

    return this.generateDefaultImage(params);
  }

  /** Social sharing URLs */
  generateSocialSharingUrls(
    pageUrl: string,
    ogImageUrl: string,
    title: string
  ) {
    const encodedUrl = encodeURIComponent(pageUrl);
    const encodedTitle = encodeURIComponent(title);
    const encodedImage = encodeURIComponent(ogImageUrl);

    return {
      twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      pinterest: `https://pinterest.com/pin/create/button/?url=${encodedUrl}&media=${encodedImage}&description=${encodedTitle}`,
    };
  }

  /** Structured Data for OG Image */
  generateImageStructuredData(ogImageUrl: string, params: OGImageParams) {
    const { city, category, country, state } = params;

    const location = state
      ? `${city}, ${state}`
      : city
        ? `${city}, ${country}`
        : country;

    return {
      "@type": "ImageObject",
      url: ogImageUrl,
      width: 1200,
      height: 630,
      caption: `${category} services in ${location}`,
      description: `Professional ${category} services in ${location}. Pricing, reviews and comparison.`,
      keywords: [
        category,
        location,
        "professional services",
        "business services",
      ].join(", "),
    };
  }

  /** Pre-generate OG images for sitemap pages */
  async preGenerateImages(
    pages: Array<{ url: string; params: OGImageParams }>
  ) {
    const results = [];

    for (const page of pages) {
      try {
        const ogImageUrl = this.generateAutoImage(page.params);
        await fetch(ogImageUrl);

        results.push({ url: page.url, ogImageUrl, success: true });
      } catch (error) {
        results.push({
          url: page.url,
          ogImageUrl: this.generateDefaultImage(page.params),
          success: false,
        });
      }
    }

    return results;
  }

  /** Image variations (Twitter, Facebook, etc.) */
  generateImageVariations(baseParams: OGImageParams) {
    return [
      {
        name: "primary",
        url: this.generateCityCategoryImage(baseParams),
        description: "Main OG image",
      },
      {
        name: "twitter",
        url: this.generateCityCategoryImage(baseParams),
        description: "Optimized for Twitter",
      },
      {
        name: "facebook",
        url: this.generateCityCategoryImage(baseParams),
        description: "Optimized for Facebook",
      },
    ];
  }
}

/** Singleton Instance */
export const ogImageGenerator = new OGImageGenerator();

/** Helper for Metadata API */
export function generateMetaWithOGImage(
  params: OGImageParams,
  title: string,
  description: string
) {
  const ogImageUrl = ogImageGenerator.generateAutoImage(params);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: "https://moydus.com",
      siteName: "Moydus",
      images: [{ url: ogImageUrl, width: 1200, height: 630 }],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
    },
  };
}
