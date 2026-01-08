import Link from "next/link";
import {
  buildBlogDetailPath,
  resolveCitySegment,
} from "@/app/blog/_lib/location-utils";
import { getR2ImageUrl } from "@/lib/r2-image";

const normalizeSlugSegment = (value?: string | null) => {
  if (!value) return null;
  const cleaned = value.replace(/^\/+|\/+$/g, "");
  if (!cleaned) return null;
  const parts = cleaned.split("/");
  return parts[parts.length - 1] || null;
};

// Extract the actual category slug returned by the API
const extractCategorySlug = (slug?: string | null): string | null => {
  if (!slug) return null;
  return normalizeSlugSegment(slug)?.toLowerCase() || null;
};

const normalizeTemplateTitle = (title?: string | null) => {
  if (!title) return "";
  return title
    .toLowerCase()
    .replace(/\s+\|\s+.*$/, "")
    .replace(/\s+in\s+[^\|]+$/i, "")
    .trim();
};

type GeoRelation = string | { slug?: string; name?: string } | null;

type BlogPost = {
  id?: string | number;
  slug?: string;
  title: string;
  excerpt?: string;
  meta_description?: string;
  image_url?: string;
  featured_image?: string; // Primary featured image field
  published_at?: string;
  author_name?: string;
  category?: string | { slug?: string; name?: string } | null;
  read_time_minutes?: number;
  reading_time?: number; // Alternative field name from Laravel
  // Location fields for building correct URLs
  // Can be string (slug) or object with slug property
  country?: GeoRelation;
  state?: GeoRelation;
  city?: GeoRelation;
  // Laravel internal_links structure
  internal_links?: Array<{
    geo?: {
      country?: string;
      state?: string;
      city?: string;
      category?: string;
    };
    slug?: string;
    type?: string;
  }>;
};

type BlogClientProps = {
  blogList: unknown;
  title?: string;
  description?: string;
};

export default function BlogClient({
  blogList,
  title = "Blog",
  description,
}: BlogClientProps) {
  // Handle different possible response structures
  let posts: BlogPost[] = [];

  if (Array.isArray(blogList)) {
    posts = blogList as BlogPost[];
  } else if (blogList && typeof blogList === "object") {
    const obj = blogList as {
      data?: BlogPost[];
      posts?: BlogPost[];
      blogs?: BlogPost[];
    };
    if (Array.isArray(obj.data)) {
      posts = obj.data;
    } else if (Array.isArray(obj.posts)) {
      posts = obj.posts;
    } else if (Array.isArray(obj.blogs)) {
      posts = obj.blogs;
    }
  }

  // Ensure we only show one post per template (title/category combo)
  if (posts.length > 1) {
    const templateCounts = new Map<string, number>();
    const MAX_PER_TEMPLATE = 8;
    posts = posts.filter((post) => {
      const normalizedTitle = normalizeTemplateTitle(post.title);
      const categorySlug =
        typeof post.category === "string"
          ? post.category
          : post.category?.slug || "";
      if (!normalizedTitle) {
        return true;
      }
      const templateKey = `${normalizedTitle}|${categorySlug}`;
      const currentCount = templateCounts.get(templateKey) ?? 0;
      if (currentCount >= MAX_PER_TEMPLATE) {
        return false;
      }
      templateCounts.set(templateKey, currentCount + 1);
      return true;
    });
  }

  // Derive dynamic category labels from titles so repeated templates appear unique
  const deriveCategoryFromTitle = (title?: string) => {
    if (!title) return null;
    const match = title.match(/in\s+([A-Za-zÀ-ÿ\s,]+)/i);
    if (match && match[1]) {
      return match[1]
        .split(",")[0]
        .trim()
        .split(" ")
        .slice(-2)
        .join(" ")
        .toLowerCase()
        .replace(/\s+/g, "-");
    }
    return null;
  };

  if (!posts || posts.length === 0) {
    return (
      <main className="min-h-screen bg-[#000000] text-white px-6 py-10">
        <div className="max-w-5xl mx-auto py-16 space-y-10">
          <h1 className="text-3xl md:text-4xl font-semibold">{title}</h1>
          {description && (
            <p className="text-white/70 text-lg">{description}</p>
          )}
          <p className="text-white/60">No blog posts found.</p>
        </div>
      </main>
    );
  }

  // If title is empty, don't show header (used when embedded in BlogFeedWithFilters)
  const showHeader = title && title.trim() !== "";

  return (
    <div
      className={
        showHeader ? "min-h-screen bg-[#000000] text-white px-6 py-10" : ""
      }
    >
      {/* Header Section */}
      {showHeader && (
        <div className="max-w-5xl mx-auto py-16 space-y-6">
          <h1 className="text-3xl md:text-4xl font-semibold text-balance">
            {title}
          </h1>
          {description && (
            <p className="text-white/70 text-lg leading-relaxed">
              {description}
            </p>
          )}
        </div>
      )}

      {/* Blog Grid */}
      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${showHeader ? "max-w-5xl mx-auto" : ""}`}
      >
        {posts.map((post: BlogPost, index: number) => {
          // Extract location slugs (handle both string and object formats)
          const resolveSlug = (
            value: GeoRelation | undefined
          ): string | null => {
            if (!value) return null;
            return typeof value === "string" ? value : value?.slug || null;
          };

          const countrySlug = resolveSlug(post.country);
          const stateSlug = resolveSlug(post.state);
          const citySlug = resolveSlug(post.city);

          // Get reading time from either field
          const readTime = post.read_time_minutes || post.reading_time;

          const safeSlug = normalizeSlugSegment(post.slug) || post.slug || "";

          // Try to extract category from multiple sources:
          // 1. Direct category field
          // 2. internal_links with type "related_service_category"
          let categorySlug: string | null = null;

          const rawCategory =
            typeof post.category === "string"
              ? post.category
              : post.category?.slug;
          // Use normalizeCategorySlug to convert long slugs to proper category names
          const normalizedCategory = extractCategorySlug(rawCategory);

          if (normalizedCategory && normalizedCategory !== safeSlug) {
            categorySlug = normalizedCategory;
          } else if (post.internal_links) {
            // Look for category in internal_links
            const categoryLink = post.internal_links.find(
              (link) => link.geo?.category
            );
            if (categoryLink?.geo?.category) {
              const derivedCategory = extractCategorySlug(
                categoryLink.geo.category
              );
              if (
                derivedCategory &&
                derivedCategory !== safeSlug // IMPORTANT: Don't use slug as category
              ) {
                categorySlug = derivedCategory;
              }
            }
          }

          if (!categorySlug) {
            const derived = deriveCategoryFromTitle(post.title);
            if (derived) {
              categorySlug = derived;
            }
          }

          // Build URL: /blog/{country}/{state}/{city}/{category}/{slug}
          let href = `/blog/${safeSlug}`; // Fallback

          // Determine final category - use "general" if no category or category equals slug
          const finalCategory =
            categorySlug && categorySlug !== safeSlug
              ? categorySlug
              : "general";

          if (countrySlug && stateSlug && safeSlug) {
            const citySegment = resolveCitySegment(stateSlug, citySlug);
            href = buildBlogDetailPath({
              country: countrySlug,
              state: stateSlug,
              city: citySegment,
              category: finalCategory,
              slug: safeSlug,
            });
          } else if (countrySlug && safeSlug) {
            href = `/blog/${countrySlug}/${finalCategory}/${safeSlug}`;
          }

          const linkKey = `${post.id || ""}:${safeSlug || index}`;

          return (
            <Link
              key={linkKey}
              href={href}
              className="group bg-[#000000] rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-[#1a1c1d] hover:border-white/20"
              prefetch={true} // Enable prefetch for blog post detail pages (high-value pages)
            >
              {/* Image */}
              {/* {(post.featured_image || post.image_url) && (
                <div className="aspect-video w-full overflow-hidden bg-[#000000]">
                  <img
                    src={
                      getR2ImageUrl(post.featured_image || post.image_url) ||
                      post.featured_image ||
                      post.image_url
                    }
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )} */}

              <div className="p-6">
                {/* Location Tag - Shows where this post is from */}
                {(citySlug || stateSlug || countrySlug) && (
                  <div className="flex items-center gap-1.5 mb-2 text-xs text-white/60">
                    <svg
                      className="w-3.5 h-3.5"
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
                    <span>
                      {citySlug && (
                        <span className="font-medium text-white">
                          {citySlug
                            .split("-")
                            .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                            .join(" ")}
                        </span>
                      )}
                      {citySlug && (stateSlug || countrySlug) && (
                        <span>, </span>
                      )}
                      {stateSlug && !citySlug && (
                        <span className="font-medium text-white">
                          {stateSlug
                            .split("-")
                            .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                            .join(" ")}
                        </span>
                      )}
                      {stateSlug && !citySlug && countrySlug && <span>, </span>}
                      {countrySlug && (
                        <span className="text-white">
                          {countrySlug
                            .split("-")
                            .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                            .join(" ")}
                        </span>
                      )}
                    </span>
                  </div>
                )}

                {/* Category Badge + Read Time */}
                {(categorySlug || readTime) && (
                  <div className="flex items-center gap-2 mb-3">
                    {categorySlug && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#000000] text-white border border-[#1a1c1d]">
                        {categorySlug
                          .split("-")
                          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                          .join(" ")}
                      </span>
                    )}
                    {readTime && (
                      <span className="text-xs text-white/60">
                        {readTime} min read
                      </span>
                    )}
                  </div>
                )}

                {/* Title */}
                <h2 className="text-xl font-bold mb-3 line-clamp-2 text-white transition-colors">
                  {post.title}
                </h2>

                {/* Excerpt */}
                {(post.excerpt || post.meta_description) && (
                  <p className="text-white/60 mb-4 line-clamp-3 text-sm leading-relaxed">
                    {post.excerpt || post.meta_description}
                  </p>
                )}

                {/* Footer Meta */}
                <div className="flex items-center justify-between text-sm">
                  {post.author_name && (
                    <span className="text-white/60 text-xs">
                      By {post.author_name}
                    </span>
                  )}
                  {post.published_at && (
                    <time
                      dateTime={post.published_at}
                      className="text-white/60 text-xs"
                    >
                      {new Date(post.published_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </time>
                  )}
                </div>

                {/* Read More Arrow */}
                <div className="mt-4 flex items-center text-white font-semibold text-sm group-hover:translate-x-1 transition-transform">
                  <span>Read article</span>
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Empty State */}
      {posts.length === 0 && (
        <div className="text-center py-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 mb-4">
            <svg
              className="w-8 h-8 text-white/40"
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
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">
            No posts found
          </h3>
          <p className="text-white/60">
            Check back later for new content in this category.
          </p>
        </div>
      )}
    </div>
  );
}
