import { MetadataRoute } from "next";
import { safeApiGet } from "@/lib/api";
import { extractLaravelCollection } from "@/lib/extract-laravel-array";
import { client as sanityClient } from "@/lib/sanity";

const BASE_URL = "https://www.moydus.com";

interface SitemapEntry {
  url: string;
  lastModified?: Date | string;
  changeFrequency?:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  priority?: number;
}

/**
 * Dynamic Sitemap Generator
 * Fetches all published content from Laravel API and generates sitemap
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: SitemapEntry[] = [];

  try {
    // 1. Static pages
    entries.push(
      {
        url: `${BASE_URL}`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 1.0,
      },
      {
        url: `${BASE_URL}/services`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 0.9,
      },
      {
        url: `${BASE_URL}/blog`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 0.9,
      },
      {
        url: `${BASE_URL}/best`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      },
      {
        url: `${BASE_URL}/top`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      },
      {
        url: `${BASE_URL}/how-to`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      },
      {
        url: `${BASE_URL}/faq`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      },
      {
        url: `${BASE_URL}/compare`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      },
      {
        url: `${BASE_URL}/marketplace/templates`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 0.8,
      },
      {
        url: `${BASE_URL}/marketplace/templates/category`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 0.7,
      },
      {
        url: `${BASE_URL}/stories`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 0.8,
      }
    );

    // 2. Service Pages
    const servicesResult = await safeApiGet("/v1/services?per_page=10000");
    if (servicesResult.success && servicesResult.data) {
      const services = extractLaravelCollection(servicesResult.data);
      services.forEach((service: any) => {
        const country =
          typeof service.country === "object"
            ? service.country?.slug
            : service.country;
        const state =
          typeof service.state === "object"
            ? service.state?.slug
            : service.state;
        const city =
          typeof service.city === "object" ? service.city?.slug : service.city;
        const slug = service.slug;

        if (!country || !slug) return;

        const pathParts = [BASE_URL, "services", country];
        if (state) pathParts.push(state);
        if (city) pathParts.push(city);
        pathParts.push(slug);

        entries.push({
          url: pathParts.join("/"),
          lastModified:
            service.updated_at || service.published_at || new Date(),
          changeFrequency: "daily",
          priority: 0.9,
        });
      });
    }

    // 3. Blog Posts
    const blogResult = await safeApiGet("/v1/blog?per_page=10000");
    if (blogResult.success && blogResult.data) {
      const posts = extractLaravelCollection(blogResult.data);
      posts.forEach((post: any) => {
        const country =
          typeof post.country === "object" ? post.country?.slug : post.country;
        const state =
          typeof post.state === "object" ? post.state?.slug : post.state;
        const city =
          typeof post.city === "object" ? post.city?.slug : post.city;
        const category =
          typeof post.category === "object"
            ? post.category?.slug
            : post.category;
        const slug = post.slug;

        if (!country || !category || !slug) return;

        const pathParts = [BASE_URL, "blog", country];
        if (state) pathParts.push(state);
        if (city && city !== state) pathParts.push(city);
        pathParts.push(category, slug);

        entries.push({
          url: pathParts.join("/"),
          lastModified: post.updated_at || post.published_at || new Date(),
          changeFrequency: "weekly",
          priority: 0.8,
        });
      });
    }

    // 4. Best Pages
    const bestResult = await safeApiGet("/v1/best?per_page=10000");
    if (bestResult.success && bestResult.data) {
      const pages = extractLaravelCollection(bestResult.data);
      pages.forEach((page: any) => {
        const country =
          typeof page.country === "object" ? page.country?.slug : page.country;
        const state =
          typeof page.state === "object" ? page.state?.slug : page.state;
        const city =
          typeof page.city === "object" ? page.city?.slug : page.city;
        const category =
          typeof page.category === "object"
            ? page.category?.slug
            : page.category;
        const slug = page.slug;

        if (!country || !category || !slug) return;

        const pathParts = [BASE_URL, "best", country];
        if (state) pathParts.push(state);
        if (city) pathParts.push(city);
        pathParts.push(category, slug);

        entries.push({
          url: pathParts.join("/"),
          lastModified: page.updated_at || page.published_at || new Date(),
          changeFrequency: "weekly",
          priority: 0.7,
        });
      });
    }

    // 5. Top Pages
    const topResult = await safeApiGet("/v1/top?per_page=10000");
    if (topResult.success && topResult.data) {
      const pages = extractLaravelCollection(topResult.data);
      pages.forEach((page: any) => {
        const country =
          typeof page.country === "object" ? page.country?.slug : page.country;
        const state =
          typeof page.state === "object" ? page.state?.slug : page.state;
        const city =
          typeof page.city === "object" ? page.city?.slug : page.city;
        const category =
          typeof page.category === "object"
            ? page.category?.slug
            : page.category;
        const slug = page.slug;

        if (!country || !category || !slug) return;

        const pathParts = [BASE_URL, "top", country];
        if (state) pathParts.push(state);
        if (city) pathParts.push(city);
        pathParts.push(category, slug);

        entries.push({
          url: pathParts.join("/"),
          lastModified: page.updated_at || page.published_at || new Date(),
          changeFrequency: "weekly",
          priority: 0.7,
        });
      });
    }

    // 6. How-To Pages
    const howtoResult = await safeApiGet("/v1/howto?per_page=10000");
    if (howtoResult.success && howtoResult.data) {
      const pages = extractLaravelCollection(howtoResult.data);
      pages.forEach((page: any) => {
        const country =
          typeof page.country === "object" ? page.country?.slug : page.country;
        const state =
          typeof page.state === "object" ? page.state?.slug : page.state;
        const city =
          typeof page.city === "object" ? page.city?.slug : page.city;
        const category =
          typeof page.category === "object"
            ? page.category?.slug
            : page.category;
        const slug = page.slug;

        if (!country || !category || !slug) return;

        const pathParts = [BASE_URL, "how-to", country];
        if (state) pathParts.push(state);
        if (city) pathParts.push(city);
        pathParts.push(category, slug);

        entries.push({
          url: pathParts.join("/"),
          lastModified: page.updated_at || page.published_at || new Date(),
          changeFrequency: "weekly",
          priority: 0.7,
        });
      });
    }

    // 7. FAQ Pages
    const faqResult = await safeApiGet("/v1/faq?per_page=10000");
    if (faqResult.success && faqResult.data) {
      const pages = extractLaravelCollection(faqResult.data);
      pages.forEach((page: any) => {
        const country =
          typeof page.country === "object" ? page.country?.slug : page.country;
        const state =
          typeof page.state === "object" ? page.state?.slug : page.state;
        const city =
          typeof page.city === "object" ? page.city?.slug : page.city;
        const category =
          typeof page.category === "object"
            ? page.category?.slug
            : page.category;
        const slug = page.slug;

        if (!country || !category || !slug) return;

        const pathParts = [BASE_URL, "faq", country];
        if (state) pathParts.push(state);
        if (city) pathParts.push(city);
        pathParts.push(category, slug);

        entries.push({
          url: pathParts.join("/"),
          lastModified: page.updated_at || page.published_at || new Date(),
          changeFrequency: "weekly",
          priority: 0.7,
        });
      });
    }

    // 8. Compare Pages
    const compareResult = await safeApiGet("/v1/compare?per_page=10000");
    if (compareResult.success && compareResult.data) {
      const pages = extractLaravelCollection(compareResult.data);
      pages.forEach((page: any) => {
        const country =
          typeof page.country === "object" ? page.country?.slug : page.country;
        const state =
          typeof page.state === "object" ? page.state?.slug : page.state;
        const city =
          typeof page.city === "object" ? page.city?.slug : page.city;
        const category =
          typeof page.category === "object"
            ? page.category?.slug
            : page.category;
        const slug = page.slug;

        if (!country || !category || !slug) return;

        const pathParts = [BASE_URL, "compare", country];
        if (state) pathParts.push(state);
        if (city) pathParts.push(city);
        pathParts.push(category, slug);

        entries.push({
          url: pathParts.join("/"),
          lastModified: page.updated_at || page.published_at || new Date(),
          changeFrequency: "weekly",
          priority: 0.7,
        });
      });
    }

    // 9. Marketplace Templates (from Sanity CMS)
    if (sanityClient && typeof sanityClient.fetch === "function") {
      try {
        const templates = await sanityClient.fetch(
          `*[_type == "template" && published == true]{
          "slug": slug.current,
          updatedAt,
          primaryCategory->{"slug": slug.current},
          categories[]->{"slug": slug.current}
        }`
        );

        templates.forEach((template: any) => {
          const categorySlug =
            template.primaryCategory?.slug ||
            template.categories?.[0]?.slug ||
            "uncategorized";

          if (!template.slug) return;

          entries.push({
            url: `${BASE_URL}/marketplace/templates/${categorySlug}/${template.slug}`,
            lastModified: template.updatedAt
              ? new Date(template.updatedAt)
              : new Date(),
            changeFrequency: "weekly",
            priority: 0.7,
          });
        });

        // Marketplace Categories
        const categories = await sanityClient.fetch(
          `*[_type == "category" && defined(group) && group != ""]{
          "slug": slug.current,
          _updatedAt
        }`
        );

        categories.forEach((category: any) => {
          if (!category.slug) return;

          entries.push({
            url: `${BASE_URL}/marketplace/templates/category/${category.slug}`,
            lastModified: category._updatedAt
              ? new Date(category._updatedAt)
              : new Date(),
            changeFrequency: "weekly",
            priority: 0.7,
          });
        });
      } catch (sanityError) {
        console.error(
          "[Sitemap] Error fetching marketplace templates:",
          sanityError
        );
        // Continue without marketplace templates if Sanity fails
      }
    }

    // 10. Web Stories
    try {
      const storiesResult = await safeApiGet("/stories");
      if (storiesResult.success && storiesResult.data) {
        const stories = Array.isArray(storiesResult.data)
          ? storiesResult.data
          : (storiesResult.data as { stories?: any[]; items?: any[] })
              ?.stories ||
            (storiesResult.data as { stories?: any[]; items?: any[] })?.items ||
            [];

        stories.forEach((story: any) => {
          const slug = story.slug;
          if (!slug) return;

          entries.push({
            url: `${BASE_URL}/stories/${slug}`,
            lastModified: story.updated_at || story.published_at || new Date(),
            changeFrequency: "weekly",
            priority: 0.7,
          });
        });
      }
    } catch (storiesError) {
      console.error("[Sitemap] Error fetching stories:", storiesError);
      // Continue without stories if API fails
    }
  } catch (error) {
    console.error("[Sitemap] Error generating sitemap:", error);
    // Return at least static pages on error
  }

  return entries;
}
