"use client";

import Link from "next/link";
import {
  buildBlogPostingSchema,
  buildBreadcrumbSchema,
  buildWebPageSchema,
} from "@/seo/json-ld-builders";
import { JsonLd } from "@/seo/json-ld";
import { getR2ImageUrl, processHtmlImages } from "@/lib/r2-image";

interface BlogDetailClientProps {
  blog: {
    title: string;
    meta_description?: string;
    excerpt?: string;
    image_url?: string;
    featured_image?: string; // Primary featured image field
    author_name?: string;
    keywords?: string | string[];
    published_at?: string;
    updated_at?: string;
    read_time_minutes?: number;
    reading_time?: number;
    content_html?: string;
    content?: string;
    faqs?: Array<{ question: string; answer: string }>;
    internal_links?: any;
    snippet?: string;
    intent?: string;
    category?: { name?: string; searchIntent?: string; snippet?: string };
    content_data?: { intent?: string; snippet?: string };
    [key: string]: any;
  };
  params: {
    country: string;
    state: string | null;
    city?: string | null;
    category: string;
    slug: string;
  };
}

const formatLabel = (slug: string) => {
  if (!slug) return "";
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export default function BlogDetailClient({
  blog: post,
  params: { country, state, city, category, slug },
}: BlogDetailClientProps) {
  const urlParts = ["https://moydus.com/blog", country];
  if (state) urlParts.push(state);
  if (city && city !== state) urlParts.push(city);
  urlParts.push(category, slug);
  const url = urlParts.join("/");

  const countryName = formatLabel(country);
  const stateName = state ? formatLabel(state) : null;
  const cityName = city && city !== state ? formatLabel(city) : null;
  const categoryName =
    typeof post.category === "object" && post.category !== null
      ? post.category.name || formatLabel(category)
      : formatLabel(category);

  const geoLabel = [cityName, stateName, countryName]
    .filter(Boolean)
    .join(", ");

  // Build breadcrumb items
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: countryName || country, href: `/blog/${country}` },
  ];

  if (state) {
    breadcrumbItems.push({
      label: stateName || state,
      href: `/blog/${country}/${state}`,
    });

    if (city && city !== state) {
      breadcrumbItems.push({
        label: cityName || city,
        href: `/blog/${country}/${state}/${city}`,
      });
      breadcrumbItems.push({
        label: categoryName || category,
        href: `/blog/${country}/${state}/${city}/${category}`,
      });
    } else {
      breadcrumbItems.push({
        label: categoryName || category,
        href: `/blog/${country}/${state}/${category}`,
      });
    }
  } else {
    // Country only - no state or city
    breadcrumbItems.push({
      label: categoryName || category,
      href: `/blog/${country}/${category}`,
    });
  }

  // Intent and Snippet (from category or content_data or direct)
  const categoryData = post.category as
    | { searchIntent?: string; snippet?: string }
    | undefined;
  const contentData = post.content_data as
    | { intent?: string; snippet?: string }
    | undefined;

  const searchIntent =
    post.intent || categoryData?.searchIntent || contentData?.intent;
  const snippet = post.snippet || categoryData?.snippet || contentData?.snippet;
  const keywords = post.keywords;

  // Get featured_image (check multiple possible field names like ServiceDetailClient)
  const rawFeaturedImage =
    post.featured_image || post.image_url || (post as any).featuredImage;

  // Convert to R2 URL for better performance
  // Store rawFeaturedImage for fallback if R2 fails
  const featuredImage = getR2ImageUrl(rawFeaturedImage);

  // Debug: log featured_image sources
  if (process.env.NODE_ENV === "development") {
    console.log("🖼️ Featured Image Debug:", {
      rawFeaturedImage,
      featured_image: post.featured_image,
      image_url: post.image_url,
      featuredImage: (post as any).featuredImage,
      r2Url: featuredImage,
      postKeys: Object.keys(post),
    });
  }

  // Internal Links
  const internalLinksRaw = post.internal_links || post.internalLinks;

  // Build URL from geo object and slug
  const buildBlogUrl = (link: any): string | null => {
    if (!link || !link.slug) return null;

    const geo = link.geo || {};
    const parts = ["/blog"];

    // If country exists, build full geo path
    if (geo.country) {
      parts.push(geo.country);
      if (geo.state) {
        parts.push(geo.state);
        if (geo.city) {
          parts.push(geo.city);
        }
      }
      // Add category and slug
      if (geo.category) {
        parts.push(geo.category);
      }
      parts.push(link.slug);
    } else {
      // No country: use category filter or category page
      // For "pillar" type, use category filter
      if (link.type === "pillar" && geo.category) {
        return `/blog?category=${geo.category}`;
      }
      // Otherwise, try to build minimal path
      if (geo.category) {
        parts.push(geo.category);
        parts.push(link.slug);
      } else {
        return null; // Can't build URL without geo info
      }
    }

    return parts.join("/");
  };

  // Process internal links: show all as they come from API
  const internalLinks = Array.isArray(internalLinksRaw)
    ? internalLinksRaw
        .map((link: any) => {
          const url = buildBlogUrl(link);
          if (!url) return null;

          return {
            text: link.anchor || link.text || link.label || url,
            url: url,
          };
        })
        .filter((link: any) => link !== null) // Filter out invalid links
    : undefined;

  const breadcrumb = buildBreadcrumbSchema(
    breadcrumbItems.map((item) => ({
      name: item.label,
      url: `https://moydus.com${item.href}`,
    }))
  );

  // Enhanced AI SEO: Extract entities and build semantic signals
  const semanticKeywords = Array.isArray(keywords)
    ? keywords
    : keywords
      ? typeof keywords === "string"
        ? keywords.split(",").map((k) => k.trim())
        : [String(keywords)]
      : [];

  // Add geo-semantic keywords for AI understanding
  const geoSemanticKeywords = [
    ...semanticKeywords,
    `${cityName || stateName || countryName} digital services`,
    `${categoryName} ${cityName || stateName || countryName}`,
    searchIntent ? `${searchIntent} intent` : "",
  ].filter(Boolean);

  const blogSchema = buildBlogPostingSchema({
    url,
    title: post.title,
    description: post.meta_description ?? post.excerpt ?? snippet ?? "",
    image: featuredImage ? { url: featuredImage, alt: post.title } : undefined,
    author: {
      name: post.author_name ?? "Moydus Editorial Team",
      type: "Organization",
      url: "https://moydus.com",
    },
    geo: {
      country,
      state: state || undefined,
      city: city && city !== state ? city : undefined,
    },
    keywords: geoSemanticKeywords,
    datePublished: post.published_at || undefined,
    dateModified: post.updated_at || post.published_at || undefined,
    readTimeMinutes: post.read_time_minutes ?? post.reading_time ?? 5,
  });

  const pageSchema = buildWebPageSchema({
    url,
    title: post.title,
    description: post.meta_description ?? post.excerpt ?? snippet ?? "",
    breadcrumbItems: [],
  });

  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [blogSchema, breadcrumb, pageSchema],
  };

  // Format date - Google recommended format: "Posted Tuesday, July 20, 2021"
  const formatDate = (dateStr: string | undefined, includeWeekday = false) => {
    if (!dateStr) return null;
    try {
      const date = new Date(dateStr);
      const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      if (includeWeekday) {
        options.weekday = "long";
      }
      return date.toLocaleDateString("en-US", options);
    } catch {
      return null;
    }
  };

  const formattedPublishDate = formatDate(post.published_at, true); // Include weekday for Google format
  const formattedUpdateDate = formatDate(post.updated_at);

  return (
    <>
      <JsonLd data={combinedSchema} />

      <main className="min-h-screen bg-[#000000] text-white px-6 py-10">
        <div className="max-w-5xl mx-auto py-16 space-y-10 overflow-hidden">
          {/* Breadcrumb */}
          <nav className="flex flex-wrap items-center gap-2 text-sm text-white/60">
            {breadcrumbItems.map((item, index) => (
              <span key={index} className="flex items-center gap-2">
                {index > 0 && (
                  <svg
                    className="h-4 w-4 text-gray-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                )}
                <Link
                  href={item.href}
                  className="hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
              </span>
            ))}
          </nav>

          {/* Featured Image */}
          {featuredImage && (
            <div className="w-full aspect-video rounded-2xl overflow-hidden bg-[#000000] mb-8">
              <img
                src={featuredImage}
                alt={post.title}
                className="w-full h-full object-cover"
                loading="lazy"
                onError={(e) => {
                  // Fallback: if R2 image fails, try Laravel backend URL
                  const target = e.target as HTMLImageElement;
                  if (rawFeaturedImage) {
                    // If it's already a full URL, use it; otherwise construct Laravel URL
                    let fallbackUrl = rawFeaturedImage;
                    if (
                      !rawFeaturedImage.startsWith("http://") &&
                      !rawFeaturedImage.startsWith("https://")
                    ) {
                      // Construct Laravel storage URL
                      fallbackUrl = `${process.env.NEXT_PUBLIC_API_URL || "https://moy-app.test"}/storage/blog-posts/${rawFeaturedImage}`;
                    }
                    if (target.src !== fallbackUrl) {
                      console.warn(
                        "🖼️ [Featured Image] R2 URL failed, trying fallback:",
                        fallbackUrl
                      );
                      target.src = fallbackUrl;
                    }
                  }
                }}
              />
            </div>
          )}

          {/* Header */}
          <header className="space-y-4 border-b border-[#1a1c1d] pb-8">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 bg-[#000000] text-white text-xs font-semibold uppercase tracking-wide rounded-full">
                {categoryName}
              </span>
              {/* {searchIntent && (
                <span className="px-3 py-1 bg-[#000000] text-white text-xs font-semibold uppercase tracking-wide rounded-full">
                  Intent: {searchIntent}
                </span>
              )} */}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              {post.title}
            </h1>
            {snippet ? (
              <div className="relative overflow-hidden bg-gradient-to-br from-[#000000] via-[#000000] to-[#000000] border border-[#1a1c1d] rounded-xl p-6 shadow-sm">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#000000] rounded-full -mr-16 -mt-16 opacity-20"></div>
                <div className="relative">
                  <div className="flex items-center gap-2 mb-3">
                    <svg
                      className="h-5 w-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <p className="text-sm font-bold text-white uppercase tracking-wide">
                      Snippet
                    </p>
                  </div>
                  <p className="text-base text-white leading-relaxed font-medium">
                    {snippet}
                  </p>
                </div>
              </div>
            ) : null}
            {/* {keywords && (
              <div className="bg-gradient-to-r from-[#000000] to-[#000000] border border-[#1a1c1d] p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <svg
                    className="h-4 w-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                    />
                  </svg>
                  <p className="text-sm font-semibold text-white">Keywords</p>
                </div>
                <p className="text-sm text-white/60 leading-relaxed">
                  {Array.isArray(keywords)
                    ? keywords.join(", ")
                    : typeof keywords === "string"
                      ? keywords
                      : String(keywords)}
                </p>
              </div>
            )} */}
            {post.meta_description && (
              <p className="text-lg text-white/60 leading-relaxed">
                {post.meta_description}
              </p>
            )}
            <div className="flex flex-wrap items-center gap-4 text-sm text-white/60">
              {geoLabel && (
                <span className="flex items-center gap-2">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  {geoLabel}
                </span>
              )}
              {formattedPublishDate && (
                <span className="flex items-center gap-2">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  Posted {formattedPublishDate}
                </span>
              )}
              {formattedUpdateDate &&
                formattedUpdateDate !== formattedPublishDate && (
                  <span className="flex items-center gap-2">
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                    Updated {formattedUpdateDate}
                  </span>
                )}
              {post.author_name && (
                <span className="flex items-center gap-2 text-white/60z">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  By {post.author_name}
                </span>
              )}
              {(post.read_time_minutes || post.reading_time) && (
                <span className="flex items-center gap-2">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {post.read_time_minutes || post.reading_time} min read
                </span>
              )}
            </div>
          </header>

          {/* Content */}
          {post.content_html ? (
            <>
              {(() => {
                const processedHtml = processHtmlImages(post.content_html);
                return (
                  <article
                    className="prose prose-lg prose-slate max-w-none
                    prose-headings:text-white prose-headings:font-bold prose-headings:tracking-tight
                    prose-h1:text-4xl prose-h1:mt-10 prose-h1:mb-6 prose-h1:border-b prose-h1:border-[#1a1c1d] prose-h1:pb-4
                    prose-h2:text-3xl prose-h2:mt-8 prose-h2:mb-4 prose-h2:text-white
                    prose-h3:text-2xl prose-h3:mt-6 prose-h3:mb-3 prose-h3:text-white
                    prose-h4:text-xl prose-h4:mt-5 prose-h4:mb-2 prose-h4:text-white
                    prose-p:text-white/60 prose-p:leading-relaxed prose-p:mb-5 prose-p:text-base
                    prose-a:text-white prose-a:no-underline prose-a:font-medium hover:prose-a:underline prose-a:transition-all
                    prose-strong:text-gray-900 prose-strong:font-bold
                    prose-em:text-white/60 prose-em:italic
                    prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-5 prose-ul:space-y-2
                    prose-ol:list-decimal prose-ol:pl-6 prose-ol:mb-5 prose-ol:space-y-2
                    prose-li:text-white/60 prose-li:mb-1 prose-li:leading-relaxed
                    prose-blockquote:border-l-4 prose-blockquote:border-white prose-blockquote:pl-6 prose-blockquote:pr-4 prose-blockquote:py-2 prose-blockquote:italic prose-blockquote:text-white/60 prose-blockquote:bg-[#000000] prose-blockquote:rounded-r-lg prose-blockquote:my-6
                    prose-code:text-white prose-code:bg-[#000000] prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-code:font-mono prose-code:before:content-[''] prose-code:after:content-['']
                    prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:p-5 prose-pre:rounded-xl prose-pre:overflow-x-auto prose-pre:shadow-lg prose-pre:my-6 prose-pre:border prose-pre:border-gray-800
                    prose-pre code:bg-transparent prose-pre code:text-white prose-pre code:px-0 prose-pre code:py-0
                    prose-img:rounded-xl prose-img:shadow-lg prose-img:my-8 prose-img:border prose-img:border-[#1a1c1d] prose-img:w-full prose-img:h-auto
                    prose-figure:my-8
                    prose-figcaption:text-sm prose-figcaption:text-white/60 prose-figcaption:text-center prose-figcaption:mt-2
                    prose-table:w-full prose-table:border-collapse prose-table:mb-6 prose-table:shadow-sm prose-table:rounded-lg prose-table:overflow-hidden
                    prose-th:bg-[#000000] prose-th:font-bold prose-th:text-left prose-th:p-4 prose-th:border prose-th:border-[#1a1c1d] prose-th:text-white prose-th:text-sm prose-th:uppercase prose-th:tracking-wide
                    prose-td:p-4 prose-td:border prose-td:border-[#1a1c1d] prose-td:text-white/60
                    prose-tr:hover:bg-[#000000] prose-tr:transition-colors
                    prose-hr:border-[#1a1c1d] prose-hr:my-8
                    [&>*:first-child]:mt-0 [&>*:last-child]:mb-0
                    [&_.ProseMirror]:outline-none
                    [&_p]:mb-4 [&_p]:leading-7
                    [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:mt-8 [&_h1]:mb-4
                    [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-6 [&_h2]:mb-3
                    [&_h3]:text-xl [&_h3]:font-bold [&_h3]:mt-4 [&_h3]:mb-2
                    [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_ul]:space-y-2
                    [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4 [&_ol]:space-y-2
                    [&_li]:mb-1
                    [&_blockquote]:border-l-4 [&_blockquote]:border-blue-500 [&_blockquote]:pl-4 [&_blockquote]:py-2 [&_blockquote]:my-4 [&_blockquote]:bg-blue-50 [&_blockquote]:rounded-r
                    [&_code]:bg-blue-50 [&_code]:text-blue-700 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm [&_code]:font-mono
                    [&_pre]:bg-gray-900 [&_pre]:text-gray-100 [&_pre]:p-4 [&_pre]:rounded-lg [&_pre]:overflow-x-auto [&_pre]:my-4
                    [&_a]:text-white [&_a]:font-medium [&_a]:hover:underline
                    [&_strong]:font-bold [&_strong]:text-white
                    [&_img]:rounded-lg [&_img]:shadow-md [&_img]:my-4 [&_img]:max-w-full [&_img]:h-auto
                    [&_table]:w-full [&_table]:border-collapse [&_table]:my-4
                    [&_th]:bg-[#000000] [&_th]:font-bold [&_th]:p-2 [&_th]:border [&_th]:border-[#1a1c1d] [&_th]:text-left
                    [&_td]:p-2 [&_td]:border [&_td]:border-[#1a1c1d] [&_td]:text-white/60"
                    dangerouslySetInnerHTML={{
                      __html: processedHtml,
                    }}
                  />
                );
              })()}
            </>
          ) : post.content ? (
            <article className="prose prose-lg max-w-none">
              <div className="text-white/60 leading-relaxed whitespace-pre-wrap">
                {post.content}
              </div>
            </article>
          ) : (
            <div className="bg-[#000000] rounded-2xl p-8 text-center">
              <p className="text-white/60">
                Content is being prepared. Please check back soon.
              </p>
            </div>
          )}

          {/* FAQ */}
          {post.faqs && post.faqs.length > 0 && (
            <section className="space-y-6 border-t border-[#1a1c1d] pt-10">
              <h2 className="text-2xl font-bold text-white">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {post.faqs.map((faq, idx) => (
                  <details
                    key={idx}
                    className="group rounded-xl border border-[#1a1c1d] bg-[#000000] p-5 transition-all hover:shadow-md"
                  >
                    <summary className="cursor-pointer font-semibold text-white flex items-center justify-between">
                      {faq.question}
                      <svg
                        className="h-5 w-5 text-white/60 group-open:rotate-180 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </summary>
                    <p className="mt-4 text-white/60 leading-relaxed">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          )}

          {/* Related Services */}
          {post.related_services && post.related_services.length > 0 && (
            <section className="space-y-4 border-t border-[#1a1c1d] pt-10">
              <h2 className="text-2xl font-bold text-white">
                Related Services
              </h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {post.related_services
                  .filter((link: any) => link?.url)
                  .map((link: any, idx: number) => (
                    <Link
                      key={idx}
                      href={link.url}
                      className="flex items-center gap-3 p-4 rounded-xl border border-[#1a1c1d] hover:border-blue-500/50 hover:bg-[#000000] transition-all group"
                    >
                      <svg
                        className="h-5 w-5 text-blue-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      <span className="text-white/60 group-hover:text-white transition-colors">
                        {link.text || link.anchor || link.url}
                      </span>
                    </Link>
                  ))}
              </div>
            </section>
          )}

          {/* Internal links */}
          {internalLinks && internalLinks.length > 0 && (
            <section className="space-y-4 border-t border-[#1a1c1d] pt-10">
              <h2 className="text-2xl font-bold text-white">
                Related Articles
              </h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {internalLinks
                  .filter((link: any) => link?.url) // Filter out links without URL
                  .map((link, idx) => (
                    <Link
                      key={idx}
                      href={link?.url}
                      className="flex items-center gap-3 p-4 rounded-xl border border-[#1a1c1d] hover:border-white/20 hover:bg-[#000000] transition-all group"
                    >
                      <svg
                        className="h-5 w-5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                      <span className="text-white/60 group-hover:text-white transition-colors">
                        {link?.text || link?.url}
                      </span>
                    </Link>
                  ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </>
  );
}
