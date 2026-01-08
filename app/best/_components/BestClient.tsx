"use client";

import React from "react";
import Link from "next/link";
import { processHtmlImages } from "@/lib/r2-image";
import { buildBreadcrumbSchema } from "@/seo/json-ld/builders";

interface BestPageData {
  country?: { name?: string } | string;
  state?: { name?: string } | string;
  city?: { name?: string } | string;
  category?: { name?: string } | string;
  title?: string;
  meta_description?: string;
  content_html?: string;
  featured_image?: string;
  snippet?: string;
  faqs?: Array<{ question: string; answer: string }>;
  related_articles?: Array<{
    slug: string;
    title: string;
    excerpt?: string;
    featured_image?: string;
  }>;
  [key: string]: unknown;
}

interface BestClientProps {
  bestPage: BestPageData;
  params: {
    country: string;
    state: string | null;
    city: string | null;
    category: string;
    slug: string;
  };
}

const formatLabel = (slug: string) => {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

// Separate content component to avoid TypeScript issues
function ContentSection({ html }: { html: string }): React.ReactElement {
  if (html && html.length > 0) {
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
          prose-strong:text-white prose-strong:font-bold
          prose-em:text-white/60 prose-em:italic
          prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-5 prose-ul:space-y-2
          prose-ol:list-decimal prose-ol:pl-6 prose-ol:mb-5 prose-ol:space-y-2
          prose-li:text-white/60 prose-li:mb-1 prose-li:leading-relaxed
          prose-blockquote:border-l-4 prose-blockquote:border-white prose-blockquote:pl-6 prose-blockquote:pr-4 prose-blockquote:py-2 prose-blockquote:italic prose-blockquote:text-white/60 prose-blockquote:bg-[#000000] prose-blockquote:rounded-r-lg prose-blockquote:my-6
          prose-code:text-white prose-code:bg-[#000000] prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-code:font-mono prose-code:before:content-[''] prose-code:after:content-['']
          prose-pre:bg-[#000000] prose-pre:text-white prose-pre:p-5 prose-pre:rounded-xl prose-pre:overflow-x-auto prose-pre:shadow-lg prose-pre:my-6 prose-pre:border prose-pre:border-[#1a1c1d]
          prose-pre code:bg-transparent prose-pre code:text-white prose-pre code:px-0 prose-pre code:py-0
          prose-img:rounded-xl prose-img:shadow-lg prose-img:my-8 prose-img:border prose-img:border-[#1a1c1d] prose-img:w-full prose-img:h-auto
          prose-figure:my-8
          prose-figcaption:text-sm prose-figcaption:text-white/60 prose-figcaption:text-center prose-figcaption:mt-2
          prose-table:w-full prose-table:border-collapse prose-table:mb-6 prose-table:shadow-sm prose-table:rounded-lg prose-table:overflow-hidden
          prose-th:bg-gray-100 prose-th:font-bold prose-th:text-left prose-th:p-4 prose-th:border prose-th:border-gray-300 prose-th:text-gray-900 prose-th:text-sm prose-th:uppercase prose-th:tracking-wide
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
          [&_blockquote]:border-l-4 [&_blockquote]:border-white [&_blockquote]:pl-4 [&_blockquote]:py-2 [&_blockquote]:my-4 [&_blockquote]:bg-[#000000] [&_blockquote]:rounded-r
          [&_code]:bg-[#000000] [&_code]:text-white [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm [&_code]:font-mono
          [&_pre]:bg-[#000000] [&_pre]:text-white [&_pre]:p-4 [&_pre]:rounded-lg [&_pre]:overflow-x-auto [&_pre]:my-4
          [&_a]:text-white [&_a]:font-medium [&_a]:hover:underline
          [&_strong]:font-bold [&_strong]:text-white
          [&_img]:rounded-lg [&_img]:shadow-md [&_img]:my-4 [&_img]:max-w-full [&_img]:h-auto
          [&_table]:w-full [&_table]:border-collapse [&_table]:my-4
          [&_th]:bg-[#000000] [&_th]:font-bold [&_th]:p-2 [&_th]:border [&_th]:border-[#1a1c1d] [&_th]:text-left
          [&_td]:p-2 [&_td]:border [&_td]:border-[#1a1c1d] [&_td]:text-white/60"
        dangerouslySetInnerHTML={{ __html: processHtmlImages(html) }}
      />
    );
  }
  return (
    <div className="bg-[#000000] rounded-2xl p-8 text-center">
      <p className="text-white/60">
        Content is being prepared. Please check back soon.
      </p>
    </div>
  );
}

export default function BestClient({ bestPage, params }: BestClientProps) {
  const countryName =
    typeof bestPage.country === "object" && bestPage.country !== null
      ? (bestPage.country as { name?: string }).name
      : formatLabel(params.country);
  const stateName = params.state
    ? typeof bestPage.state === "object" && bestPage.state !== null
      ? (bestPage.state as { name?: string }).name
      : formatLabel(params.state)
    : null;
  const cityName = params.city
    ? typeof bestPage.city === "object" && bestPage.city !== null
      ? (bestPage.city as { name?: string }).name
      : formatLabel(params.city)
    : null;
  const categoryName =
    typeof bestPage.category === "object" && bestPage.category !== null
      ? (bestPage.category as { name?: string }).name
      : formatLabel(params.category);

  const geoLabel = [cityName, stateName, countryName]
    .filter(Boolean)
    .join(", ");

  // Build breadcrumb items
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Best Lists", href: "/best" },
    { label: countryName || params.country, href: `/best/${params.country}` },
  ];

  if (params.state) {
    breadcrumbItems.push({
      label: stateName || params.state,
      href: `/best/${params.country}/${params.state}`,
    });

    if (params.city) {
      breadcrumbItems.push({
        label: cityName || params.city,
        href: `/best/${params.country}/${params.state}/${params.city}`,
      });
      breadcrumbItems.push({
        label: categoryName || params.category,
        href: `/best/${params.country}/${params.state}/${params.city}/${params.category}`,
      });
    } else {
      breadcrumbItems.push({
        label: categoryName || params.category,
        href: `/best/${params.country}/${params.state}/${params.category}`,
      });
    }
  } else {
    // Country only - no state or city
    breadcrumbItems.push({
      label: categoryName || params.category,
      href: `/best/${params.country}/${params.category}`,
    });
  }

  const title =
    (bestPage.title as string) ||
    (bestPage.meta_title as string) ||
    "Best Lists";
  const description = String(bestPage.meta_description ?? "");
  const contentHtml = String(bestPage.content_html ?? "");
  const faqs = bestPage.faqs as
    | Array<{ question: string; answer: string }>
    | undefined;
  const featuredImage = bestPage.featured_image as string | undefined;

  // Intent and Snippet (from category or content_data)
  const categoryData = bestPage.category as
    | { searchIntent?: string; snippet?: string }
    | undefined;
  const contentData = bestPage.content_data as
    | { intent?: string; snippet?: string }
    | undefined;

  const searchIntent =
    categoryData?.searchIntent ||
    contentData?.intent ||
    (bestPage as any).search_intent ||
    (bestPage as any).intent;
  const snippet =
    (bestPage as any).snippet || categoryData?.snippet || contentData?.snippet;
  const keywords = (bestPage as any).keywords || (bestPage as any).keyword;

  const internalLinksRaw = bestPage.internal_links || bestPage.internalLinks;

  // Build URL from geo object and slug
  const buildBestUrl = (link: any): string | null => {
    if (!link) return null;

    // If URL is already provided, use it
    if (link.url) {
      return link.url.startsWith("http") ? link.url : link.url;
    }

    // If slug exists, build URL from geo
    if (link.slug) {
      const geo = link.geo || {};
      const parts = ["/best"];

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
          return `/best?category=${geo.category}`;
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
    }

    return null;
  };

  // Process internal links: show all as they come from API
  const internalLinks = Array.isArray(internalLinksRaw)
    ? internalLinksRaw
        .map((link: any) => {
          const url = buildBestUrl(link);
          if (!url) return null;

          return {
            text: link.anchor || link.text || link.label || url,
            url: url,
          };
        })
        .filter((link: any) => link !== null) // Filter out invalid links
    : undefined;

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

  const publishedAt = bestPage.published_at as string | undefined;
  const updatedAt = bestPage.updated_at as string | undefined;
  const formattedPublishDate = formatDate(publishedAt, true); // Include weekday for Google format
  const formattedUpdateDate = formatDate(updatedAt);

  // Build breadcrumb schema
  const breadcrumbSchema = buildBreadcrumbSchema(
    breadcrumbItems.map((item) => ({
      name: item.label,
      url: `https://moydus.com${item.href}`,
    }))
  );

  return (
    <main className="min-h-screen bg-[#000000] text-white px-6 py-10">
      <div className="max-w-5xl mx-auto py-12 space-y-8 overflow-hidden">
        {/* Breadcrumb */}
        <nav className="flex flex-wrap items-center gap-2 text-sm text-white/60">
          {breadcrumbItems.map((item, index) => (
            <span key={index} className="flex items-center gap-2">
              {index > 0 && (
                <svg
                  className="h-4 w-4 text-white/60"
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
              alt={title}
              className="w-full h-full object-cover"
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
          <h1 className="text-3xl md:text-4xl font-bold text-white">{title}</h1>
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
          {description && (
            <p className="text-lg text-white/60 leading-relaxed">
              {description}
            </p>
          )}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
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
          </div>
        </header>

        {/* Content */}
        <ContentSection html={contentHtml} />

        {/* FAQ */}
        {faqs && faqs.length > 0 && (
          <section className="space-y-6 border-t border-[#1a1c1d] pt-10">
            <h2 className="text-2xl font-bold text-white">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
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

        {/* Internal links */}
        <section className="space-y-4 border-t border-[#1a1c1d] pt-10">
          <h2 className="text-xl font-bold text-white">Related Best Lists</h2>
          {internalLinks && internalLinks.length > 0 ? (
            <div className="grid gap-3 sm:grid-cols-2">
              {internalLinks
                .filter((link) => link.url) // Filter out links without URL
                .map((link, idx) => (
                  <Link
                    key={idx}
                    href={link.url}
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
                      {link.text || link.url}
                    </span>
                  </Link>
                ))}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-[#1a1c1d] bg-[#000000] p-6 text-center">
              <p className="text-sm text-gray-500">
                No related best lists available at this time.
              </p>
            </div>
          )}
        </section>

        {/* JSON-LD */}
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbSchema),
          }}
        />
        {bestPage.schema_json && (
          <script
            type="application/ld+json"
            suppressHydrationWarning
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(bestPage.schema_json),
            }}
          />
        )}
      </div>
    </main>
  );
}
