"use client";

import { client, urlFor, urlForOptimized, urlForBlurPlaceholder } from "@/lib/sanity";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatedDrawer } from "@/components/DrawerFilter";

interface Category {
  title: string;
  slug: string;
  templateCount: number;
  views?: number;
  thumbnails?: Array<{
    asset: {
      url: string;
    };
  }>;
  previewTemplates: Array<{
    thumbnails?: Array<{
      asset: {
        url: string;
      };
    }>;
  }>;
}

interface Template {
  title: string;
  slug: string;
  designer: string;
  description: string;
  thumbnails?: Array<{
    asset: {
      url: string;
    };
  }>;
  tags?: string[];
  categories: Array<{
    title: string;
    slug: string;
  }>;
  primaryCategory?: {
    title: string;
    slug: string;
  };
}

async function getCategories() {
  const categories = await client.fetch(
    `*[_type == "category" && defined(group) && group != ""]{
      title,
      "slug": slug.current,
      description,
      views,
      thumbnails,
      group,
      "templateCount": count(*[_type == "template" && published == true && (primaryCategory._ref == ^._id || ^._id in categories[]->_ref)]),
      "previewTemplates": *[_type == "template" && published == true && (primaryCategory._ref == ^._id || ^._id in categories[]->_ref)] | order(_createdAt desc)[0...3]{
        thumbnails
      }
    }`
  );

  // Shuffle array randomly and take first 5
  const shuffled = [...categories].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 5);
}

async function getTemplates(
  categorySlug?: string | null
) {
  let query = `*[_type == "template" && published == true`;

  const conditions: string[] = [];
  const params: Record<string, string> = {};

  if (categorySlug) {
    conditions.push(`($categorySlug in categories[]->slug.current || primaryCategory->slug.current == $categorySlug)`);
    params.categorySlug = categorySlug;
  }

  if (conditions.length > 0) {
    query += ` && ${conditions.join(" && ")}`;
  }

  query += `] | order(_createdAt desc){
    title,
    "slug": slug.current,
    designer,
    description,
    thumbnails,
    tags,
    categories[]->{title, "slug": slug.current},
    primaryCategory->{title, "slug": slug.current}
  }`;

  return client.fetch(query, params);
}

export function generateTemplateJsonLd(template: any) {
  // Eğer custom override varsa → onu kullan
  if (template?.jsonLdOverrides?.customJson) {
    return template.jsonLdOverrides.customJson;
  }

  if (template?.jsonLdOverrides?.disableAuto) {
    return null;
  }

  const data: any = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: template.title,
    description: template.description,
    image: template.thumbnails?.map((img: any) => img.url) || [],
    brand: {
      "@type": "Organization",
      name: "Moydus LLC",
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      url: template.demoUrl,
      availability: "https://schema.org/InStock",
    },
    category: template.categories?.map((c: any) => c.title),
    keywords: template.seo?.keywords,
    url: `https://moydus.com/templates/${template.slug?.current}`,
  };

  // Breadcrumbs
  data.breadcrumb = {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Templates",
        item: "https://moydus.com/templates",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: template.title,
        item: `https://moydus.com/templates/${template.slug?.current}`,
      },
    ],
  };

  return JSON.stringify(data, null, 2);
}

export default function MarketplaceTemplatesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        setError(null);
        console.log("Loading categories and templates...");
        const [cats, temps] = await Promise.all([
          getCategories(),
          getTemplates(),
        ]);
        console.log("Categories:", cats);
        console.log(
          "Categories with previews:",
          cats?.map((c: Category) => ({
            title: c.title,
            views: c.views,
            templateCount: c.templateCount,
            previewCount: c.previewTemplates?.length,
            previews: c.previewTemplates?.map((p) => ({
              hasThumbnails: !!p.thumbnails,
              thumbnailsCount: p.thumbnails?.length,
            })),
          }))
        );
        console.log("Templates:", temps);
        setCategories(cats || []);
        setTemplates(temps || []);
      } catch (err) {
        console.error("Error loading data:", err);
        setError(err instanceof Error ? err.message : "Failed to load data");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  useEffect(() => {
    async function loadTemplates() {
      try {
        setLoading(true);
        setError(null);
        const temps = await getTemplates(
          selectedCategory || undefined
        );
        console.log("Filtered templates:", temps);
        setTemplates(temps || []);
      } catch (err) {
        console.error("Error loading templates:", err);
        setError(
          err instanceof Error ? err.message : "Failed to load templates"
        );
      } finally {
        setLoading(false);
      }
    }
    loadTemplates();
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-[#000000]  text-white">
      <div className="container mx-auto max-w-7xl px-4 md:px-6 py-16">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-semibold mb-4 md:text-6xl">Templates</h1>
          <p className="text-white/60 text-lg max-w-2xl">
            Discover beautiful email templates crafted by talented designers
          </p>
        </div>

        {/* Categories Section */}
        {categories.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Categories</h2>
              <Link
                href="/marketplace/templates/category"
                className="text-sm text-white/60 hover:text-white transition-colors"
              >
                See All →
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-2.5">
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/marketplace/templates/category/${category.slug}`}
                  className="group rounded-lg bg-[#1C1C1C] hover:bg-[#262626] transition-colors flex flex-col overflow-hidden"
                >
                  {/* Images Grid */}
                  <div className="grid grid-cols-2  gap-[5px] p-[5px] pb-0">
                    {/* Use category thumbnails if available, otherwise use template thumbnails */}
                    {category.thumbnails && category.thumbnails.length > 0 ? (
                      <>
                        {/* First image from category thumbnails */}
                        {category.thumbnails[0] && (
                          <>
                            {/* Desktop/Tablet: spans 2 columns, first row */}
                            <div className="hidden md:block md:col-span-2 aspect-[4/3] relative overflow-hidden rounded-[3px]">
                              <Image
                                src={urlForOptimized(category.thumbnails[0], {
                                  width: 800,
                                  height: 600,
                                  quality: 85,
                                  format: 'auto',
                                }).url()}
                                alt={`${category.title} thumbnail 1`}
                                fill
                                loading="lazy"
                                placeholder="blur"
                                blurDataURL={urlForBlurPlaceholder(category.thumbnails[0])}
                                sizes="(max-width: 768px) 50vw, 66vw"
                                className="object-cover outline outline-1 outline-white/10 outline-offset-[-1px] rounded-[3px]"
                              />
                            </div>
                            {/* Mobile: shows as first image */}
                            <div className="col-span-1 md:hidden aspect-[4/3] relative overflow-hidden rounded-[3px]">
                              <Image
                                src={urlForOptimized(category.thumbnails[0], {
                                  width: 400,
                                  height: 300,
                                  quality: 85,
                                  format: 'auto',
                                }).url()}
                                alt={`${category.title} thumbnail 1`}
                                fill
                                loading="lazy"
                                placeholder="blur"
                                blurDataURL={urlForBlurPlaceholder(category.thumbnails[0])}
                                sizes="100vw"
                                className="object-cover outline outline-1 outline-white/10 outline-offset-[-1px] rounded-[3px]"
                              />
                            </div>
                          </>
                        )}
                        {/* Second image from category thumbnails */}
                        {category.thumbnails[1] ? (
                          <div className="col-span-1 aspect-[4/3] relative overflow-hidden rounded-[3px]">
                            <Image
                              src={urlForOptimized(category.thumbnails[1], {
                                width: 400,
                                height: 300,
                                quality: 85,
                                format: 'auto',
                              }).url()}
                              alt={`${category.title} thumbnail 2`}
                              fill
                              loading="lazy"
                              placeholder="blur"
                              blurDataURL={urlForBlurPlaceholder(category.thumbnails[1])}
                              sizes="(max-width: 768px) 50vw, 33vw"
                              className="object-cover outline outline-1 outline-white/10 outline-offset-[-1px] rounded-[3px]"
                            />
                          </div>
                        ) : (
                          <div className="col-span-1 aspect-[4/3] bg-[#0a0a0a] rounded-[3px]" />
                        )}
                        {/* Third image from category thumbnails or template */}
                        {category.thumbnails[2] ? (
                          <div className="hidden md:block col-span-1 aspect-[4/3] relative overflow-hidden rounded-[3px]">
                            <Image
                              src={urlForOptimized(category.thumbnails[2], {
                                width: 400,
                                height: 300,
                                quality: 85,
                                format: 'auto',
                              }).url()}
                              alt={`${category.title} thumbnail 3`}
                              fill
                              className="object-cover outline outline-1 outline-white/10 outline-offset-[-1px] rounded-[3px]"
                            />
                          </div>
                        ) : category.previewTemplates?.[0]?.thumbnails?.[0] ? (
                          <div className="hidden md:block col-span-1 aspect-[4/3] relative overflow-hidden rounded-[3px]">
                            <Image
                              src={urlForOptimized(
                                category.previewTemplates[0].thumbnails[0],
                                { width: 400, height: 300, quality: 85, format: 'auto' }
                              ).url()}
                              alt={`${category.title} template 3`}
                              fill
                              loading="lazy"
                              placeholder="blur"
                              blurDataURL={urlForBlurPlaceholder(category.previewTemplates[0].thumbnails[0])}
                              sizes="33vw"
                              className="object-cover outline outline-1 outline-white/10 outline-offset-[-1px] rounded-[3px]"
                            />
                          </div>
                        ) : (
                          <div className="hidden md:block col-span-1 aspect-[4/3] bg-[#0a0a0a] rounded-[3px]" />
                        )}
                      </>
                    ) : category.previewTemplates &&
                      category.previewTemplates.length > 0 ? (
                      <>
                        {/* Fallback to template thumbnails if category thumbnails don't exist */}
                        {category.previewTemplates[0]?.thumbnails?.[0] && (
                          <>
                            <div className="hidden md:block md:col-span-2 aspect-[4/3] relative overflow-hidden rounded-[3px]">
                              <Image
                                src={urlForOptimized(
                                  category.previewTemplates[0].thumbnails[0],
                                  { width: 800, height: 600, quality: 85, format: 'auto' }
                                ).url()}
                                alt={`${category.title} template 1`}
                                fill
                                loading="lazy"
                                placeholder="blur"
                                blurDataURL={urlForBlurPlaceholder(category.previewTemplates[0].thumbnails[0])}
                                sizes="(max-width: 768px) 100vw, 66vw"
                                className="object-cover outline outline-1 outline-white/10 outline-offset-[-1px] rounded-[3px]"
                              />
                            </div>
                            <div className="col-span-1 md:hidden aspect-[4/3] relative overflow-hidden rounded-[3px]">
                              <Image
                                src={urlForOptimized(
                                  category.previewTemplates[0].thumbnails[0],
                                  { width: 400, height: 300, quality: 85, format: 'auto' }
                                ).url()}
                                alt={`${category.title} template 1`}
                                fill
                                loading="lazy"
                                placeholder="blur"
                                blurDataURL={urlForBlurPlaceholder(category.previewTemplates[0].thumbnails[0])}
                                sizes="100vw"
                                className="object-cover outline outline-1 outline-white/10 outline-offset-[-1px] rounded-[3px]"
                              />
                            </div>
                          </>
                        )}
                        {category.previewTemplates[1]?.thumbnails?.[0] && (
                          <div className="col-span-1 aspect-[4/3] relative overflow-hidden rounded-[3px]">
                            <Image
                              src={urlForOptimized(
                                category.previewTemplates[1].thumbnails[0],
                                { width: 400, height: 300, quality: 85, format: 'auto' }
                              ).url()}
                              alt={`${category.title} template 2`}
                              fill
                              className="object-cover outline outline-1 outline-white/10 outline-offset-[-1px] rounded-[3px]"
                            />
                          </div>
                        )}
                        {category.previewTemplates[2]?.thumbnails?.[0] && (
                          <div className="hidden md:block col-span-1 aspect-[4/3] relative overflow-hidden rounded-[3px]">
                            <Image
                              src={urlFor(
                                category.previewTemplates[2].thumbnails[0]
                              )
                                .width(200)
                                .height(150)
                                .url()}
                              alt={`${category.title} template 3`}
                              fill
                              className="object-cover outline outline-1 outline-white/10 outline-offset-[-1px] rounded-[3px]"
                            />
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="col-span-2 aspect-[4/3] bg-[#0a0a0a] rounded-[3px]" />
                    )}
                  </div>
                  {/* Category Info */}
                  <div className="p-[15px]">
                    <h4 className="text-sm font-medium truncate mb-0">
                      {category.title}
                    </h4>
                    <p className="text-xs text-white/60 mt-0">
                      {(() => {
                        const views = Number(category.views) || 0;
                        const count = Number(category.templateCount) || 0;
                        const value = views > 0 ? views : count;

                        // Format: 1000+ için K formatı
                        if (value >= 1000) {
                          const kValue = (value / 1000).toFixed(1);
                          // Remove trailing zero if needed (e.g., 2.0K -> 2K)
                          const formatted = kValue.endsWith(".0")
                            ? `${parseInt(kValue)}K`
                            : `${kValue}K`;
                          return formatted;
                        }
                        return value > 0 ? value.toString() : "0";
                      })()}{" "}
                      {(() => {
                        const views = Number(category.views) || 0;
                        const count = Number(category.templateCount) || 0;
                        const value = views > 0 ? views : count;
                        return value >= 1000 ? "views" : "templates";
                      })()}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-between gap-3">
            <div className="flex flex-wrap gap-3 ">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-5 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategory === null
                    ? "bg-[#1C1C1C] text-white/90 border border-white/10"
                    : "bg-[#1C1C1C] text-white/70 hover:bg-[#262626] border border-white/10"
                }`}
              >
                All
              </button>
            </div>
            <AnimatedDrawer
              categories={categories}
              selectedCategory={selectedCategory}
              selectedPrice={null}
              onCategoryChange={setSelectedCategory}
              onPriceChange={() => {}}
            />
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-md">
            <p className="text-red-400 text-sm">Error: {error}</p>
          </div>
        )}

        {/* Templates Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="aspect-[4/3] bg-[#1C1C1C] rounded-[3px] animate-pulse"
              />
            ))}
          </div>
        ) : templates.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {templates.map((template) => (
              <Link
                key={template.slug}
                href={`/marketplace/templates/${template.categories?.[0]?.slug || "uncategorized"}/${template.slug}`}
                className="group relative overflow-hidden rounded-[4px] transition-all duration-300"
              >
                {/* Thumbnail */}
                {template.thumbnails && template.thumbnails[0] && (
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#0a0a0a] rounded-[10px]">
                    {/* Main Image */}
                    <Image
                      src={urlFor(template.thumbnails[0])
                        .width(800)
                        .height(600)
                        .url()}
                      alt={template.title}
                      fill
                      className="object-cover transition-opacity duration-300 group-hover:opacity-0 rounded-[4px]"
                    />
                    {/* Hover Image (second thumbnail) */}
                    {template.thumbnails[1] && (
                      <Image
                        src={urlFor(template.thumbnails[1])
                          .width(800)
                          .height(600)
                          .url()}
                        alt={`${template.title} - Hover`}
                        fill
                        className="object-cover opacity-0 rounded-[3px] transition-opacity duration-300 group-hover:opacity-100"
                      />
                    )}
                    {/* Arrow Icon */}
                    <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm p-2 rounded-full z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <TrendingUp className="w-4 h-4 text-white" />
                    </div>
                  </div>
                )}

                {/* Content */}
                <div className="p-2 ">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-base font-semibold line-clamp-1 group-hover:text-white/90">
                      {template.title}
                    </h3>
                  </div>
                  {template.designer && (
                    <p className="text-xs text-white/50 mb-2">
                      by {template.designer}
                    </p>
                  )}
                  {template.tags && template.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {template.tags.slice(0, 2).map((tag: string) => (
                        <span
                          key={tag}
                          className="text-[10px] text-white/40 bg-white/5 px-2  rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-white/60 text-lg">
              No templates found in this category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
