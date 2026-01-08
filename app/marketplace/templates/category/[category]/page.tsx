import { client, urlFor } from "@/lib/sanity";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { generateCategoryJsonLd } from "@/seo/jsonld-category";
import { TrendingUp } from "lucide-react";

interface Category {
  title: string;
  slug: string;
  description?: string;
  thumbnail?: {
    asset: {
      url: string;
    };
  };
  parent?: {
    title: string;
    slug: string;
    parent?: { title: string; slug: string };
  } | null;
}

type Template = {
  title: string;
  slug: string;
  price?: string;
  designer?: string;
  description?: string;
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
};

type Subcategory = {
  title: string;
  slug: string;
  thumbnails?: Array<{ asset?: { url?: string } }>;
};

const groupLabels: Record<string, string> = {
  business: "Business Templates",
  community: "Community Templates",
  creative: "Creative Templates",
  style: "Style Templates",
};

const validGroups = ["business", "community", "creative", "style"];

async function getCategory(slug: string) {
  const category = await client.fetch(
    `*[_type == "category" && slug.current == $slug][0]{
      title,
      "slug": slug.current,
      description,
      thumbnail,
      thumbnails,
      parent->{title, "slug": slug.current, parent->{title, "slug": slug.current}},
      seo,
      jsonLdAdvanced,
      jsonld,
      disableAutoJsonLd
    }`,
    { slug }
  );
  return category;
}

async function getSubcategories(slug: string) {
  return client.fetch(
    `*[_type == "category" && parent->slug.current == $slug] | order(title asc){
      title,
      parent->{title, "slug": slug.current},
      "slug": slug.current,
      thumbnails
    }`,
    { slug }
  );
}

async function getCategoriesByGroup(group: string) {
  return client.fetch(
    `*[_type == "category" && group == $group && (!defined(parent) || parent == null || parent == "")] | order(order asc, title asc){
      title,
      "slug": slug.current,
      description,
      thumbnails,
      group,
      parent
    }`,
    { group }
  );
}

async function getTemplatesByCategory(
  slug: string,
  selectedTag?: string | null
) {
  let query = `*[_type == "template" && published == true && ($slug in categories[]->slug.current || primaryCategory->slug.current == $slug)`;

  const params: Record<string, string> = { slug };

  if (selectedTag) {
    query += ` && $selectedTag in tags`;
    params.selectedTag = selectedTag;
  }

  query += `] | order(featured desc, _updatedAt desc){
    title,
    "slug": slug.current,
    price,
    designer,
    description,
    thumbnails,
    jsonLdAdvanced,
    views,
    updatedAt,
    tags,
    features,
    perfectFor,
    demoUrl,
    templateType,
    difficulty,
    seo,
    jsonLdAdvanced,
    featured,
    primaryCategory->{title, "slug": slug.current},
    categories[]->{title, "slug": slug.current}
  }`;

  return client.fetch(query, params);
}

async function getTemplatesByGroup(group: string, selectedTag?: string | null) {
  // Get all category slugs in this group (without parent)
  const categories = await client.fetch(
    `*[_type == "category" && group == $group && (!defined(parent) || parent == null || parent == "")]{
      "slug": slug.current
    }`,
    { group }
  );

  const categorySlugs = categories.map((cat: { slug: string }) => cat.slug);

  if (categorySlugs.length === 0) {
    return [];
  }

  // Build query: templates where primaryCategory matches any category in this group
  // OR categories[] contains any category in this group
  const primaryCategoryConditions = categorySlugs
    .map(
      (slug: string, index: number) =>
        `primaryCategory->slug.current == $slug${index}`
    )
    .join(" || ");

  const categoriesConditions = categorySlugs
    .map(
      (slug: string, index: number) =>
        `$slug${index} in categories[]->slug.current`
    )
    .join(" || ");

  const params: Record<string, string> = {};
  categorySlugs.forEach((slug: string, index: number) => {
    params[`slug${index}`] = slug;
  });

  let query = `*[_type == "template" && published == true && (${primaryCategoryConditions} || ${categoriesConditions})`;

  if (selectedTag) {
    query += ` && $selectedTag in tags`;
    params.selectedTag = selectedTag;
  }

  query += `] | order(featured desc, _updatedAt desc){
    title,
    "slug": slug.current,
    price,
    designer,
    description,
    thumbnails,
    jsonLdAdvanced,
    views,
    updatedAt,
    tags,
    features,
    perfectFor,
    demoUrl,
    templateType,
    difficulty,
    seo,
    jsonLdAdvanced,
    featured,
    primaryCategory->{title, "slug": slug.current},
    categories[]->{title, "slug": slug.current}
  }`;

  return client.fetch(query, params);
}

function buildBreadcrumbs(category: Category) {
  const breadcrumbs: Array<{ title: string; slug: string }> = [];

  // Add parent's parent first (if exists)
  if (category.parent?.parent) {
    breadcrumbs.push({
      title: category.parent.parent.title,
      slug: category.parent.parent.slug,
    });
  }

  // Add parent second (if exists)
  if (category.parent) {
    breadcrumbs.push({
      title: category.parent.title,
      slug: category.parent.slug,
    });
  }

  // Add current category last
  breadcrumbs.push({
    title: category.title,
    slug: category.slug,
  });

  return breadcrumbs;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const resolvedParams = await Promise.resolve(params);
  const categorySlug = resolvedParams.category;

  const category = await getCategory(categorySlug);

  if (!category) {
    return {
      title: "Category Not Found",
      description: "The requested category could not be found.",
    };
  }

  const title =
    category.seo?.metaTitle || `${category.title} Templates | Moydus`;
  const description =
    category.seo?.metaDescription ||
    category.description ||
    `Browse ${category.title} templates for your website. Professional designs ready to use.`;
  const canonical = `https://www.moydus.com/marketplace/templates/category/${categorySlug}`;
  const imageUrl =
    category.thumbnail?.asset?.url ||
    category.thumbnails?.[0]?.asset?.url ||
    "https://www.moydus.com/logo.png";

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      type: "website",
      url: canonical,
      title,
      description,
      siteName: "Moydus",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
        "max-video-preview": -1,
      },
    },
  };
}

export default async function CategoryTemplatesPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const resolvedParams = await Promise.resolve(params);
  const categorySlug = resolvedParams.category;

  if (!categorySlug) {
    notFound();
  }

  // Check if slug is a group (business, community, creative, style)
  const isGroup = validGroups.includes(categorySlug.toLowerCase());

  if (isGroup) {
    // Handle group page
    const group = categorySlug.toLowerCase();
    const groupTitle =
      groupLabels[group] ||
      `${group.charAt(0).toUpperCase() + group.slice(1)} Templates`;

    const [categories, templates] = await Promise.all([
      getCategoriesByGroup(group),
      getTemplatesByGroup(group),
    ]);

    // Debug: Log categories to see what we're getting
    console.log(
      `Categories for group "${group}":`,
      categories.map((c: Subcategory) => ({
        title: c.title,
        slug: c.slug,
      }))
    );

    return (
      <div className="min-h-screen bg-[#000000] text-white py-32">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          {/* Breadcrumbs */}
          <div className="mb-8 flex items-center gap-2 text-sm text-white/60 flex-wrap">
            <Link
              href="/marketplace/templates/category"
              className="hover:text-white transition-colors"
            >
              Categories
            </Link>
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="8"
                height="8"
                fill="none"
                className="text-white/40"
              >
                <path
                  d="M 2.5 7 L 5.5 4 L 2.5 1"
                  fill="transparent"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  strokeLinecap="round"
                />
              </svg>
              <span className="text-white">{groupTitle}</span>
            </div>
          </div>

          <div className="mb-12">
            <h1 className="text-4xl font-semibold mb-4 md:text-5xl">
              {groupTitle}
            </h1>
            <p className="text-white/60 text-lg max-w-2xl mb-6">
              Give your small business a professional edge with our business
              templates. Designed to help you attract clients, build trust, and
              grow your business with polished, professional designs that work
              as hard as you do.
            </p>
          </div>

          {/* Categories Filter */}
          {categories.length > 0 && (
            <div className="mb-12">
              <div className="w-full overflow-x-auto overflow-y-hidden -mx-4 px-4">
                <div className="flex gap-[10px] min-w-max">
                  {categories.map((cat: Subcategory) => (
                    <Link
                      key={cat.slug}
                      href={`/marketplace/templates/category/${cat.slug}`}
                      className="h-[50px] rounded-sm bg-white/5 hover:bg-[#262626] transition-colors flex items-center gap-[15px] pl-[2px] pr-[14px] py-[2px] flex-shrink-0"
                    >
                      {cat.thumbnails && cat.thumbnails[0] && (
                        <div className="relative h-full aspect-[5/3] rounded-sm bg-white/10 overflow-hidden flex-shrink-0">
                          <Image
                            src={urlFor(cat.thumbnails[0])
                              .width(200)
                              .height(200)
                              .url()}
                            alt={cat.title}
                            fill
                            className="object-cover rounded-sm outline outline-1 outline-white/20"
                          />
                        </div>
                      )}
                      <span className="text-sm font-medium whitespace-nowrap">
                        {cat.title}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Templates Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {templates.map((template: Template) => {
              // Find the first category slug for this template that matches the group
              const primaryCategory =
                template.categories?.find((cat: { slug: string }) =>
                  categories.some((c: Subcategory) => c.slug === cat.slug)
                ) || template.categories?.[0];

              return (
                <Link
                  key={template.slug}
                  href={`/marketplace/templates/${primaryCategory?.slug || categorySlug}/${template.slug}`}
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
                        className="object-cover transition-opacity duration-300 group-hover:opacity-0 rounded-[3px]"
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
                          className="object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-[3px]"
                        />
                      )}
                      {/* Arrow Icon */}
                      <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm p-2 rounded-full z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <TrendingUp className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-4">
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
                            className="text-[10px] text-white/40 bg-white/5 px-2 py-0.5 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>

          {templates.length === 0 && (
            <div className="text-center py-16">
              <p className="text-white/60 text-lg">
                No templates found in this group yet.
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Handle regular category page
  const [category, templates, subcategories] = await Promise.all([
    getCategory(categorySlug),
    getTemplatesByCategory(categorySlug),
    getSubcategories(categorySlug),
  ]);

  if (!category) {
    notFound();
  }

  const breadcrumbs = buildBreadcrumbs(category);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: category.jsonld
            ? category.jsonld
            : !category.disableAutoJsonLd
              ? JSON.stringify(generateCategoryJsonLd(category, templates))
              : "{}",
        }}
      />
      <div className="min-h-screen bg-[#000000] text-white py-32">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          {/* Breadcrumbs */}
          <div className="mb-8 flex items-center gap-2 text-sm text-white/60 flex-wrap">
            <Link
              href="/marketplace/templates"
              className="hover:text-white transition-colors"
            >
              Categories
            </Link>
            {breadcrumbs.map((crumb, index) => (
              <div key={crumb.slug} className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="8"
                  height="8"
                  fill="none"
                  className="text-white/40"
                >
                  <path
                    d="M 2.5 7 L 5.5 4 L 2.5 1"
                    fill="transparent"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    strokeLinecap="round"
                  />
                </svg>
                {index === breadcrumbs.length - 1 ? (
                  <span className="text-white">{crumb.title}</span>
                ) : (
                  <Link
                    href={`/marketplace/templates/category/${crumb.slug}`}
                    className="hover:text-white transition-colors"
                  >
                    {crumb.title}
                  </Link>
                )}
              </div>
            ))}
          </div>

          <div className="mb-12">
            {category.thumbnail && (
              <div className="relative h-64 w-full mb-6 rounded-2xl overflow-hidden">
                <Image
                  src={urlFor(category.thumbnail).width(1200).height(400).url()}
                  alt={category.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <h1 className="text-4xl font-semibold mb-4 md:text-5xl">
              {category.title}
            </h1>
            {category.description && (
              <p className="text-white/60 text-lg max-w-2xl mb-6">
                {category.description}
              </p>
            )}
          </div>

          {/* Subcategories */}
          {subcategories.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-semibold mb-6">Subcategories</h2>
              <div className="w-full overflow-x-auto overflow-y-hidden -mx-4 px-4">
                <div className="flex gap-[10px] min-w-max">
                  {subcategories.map((sub: Subcategory) => (
                    <Link
                      key={sub.slug}
                      href={`/marketplace/templates/category/${sub.slug}`}
                      className="h-[50px] rounded-sm bg-white/5 hover:bg-[#262626] transition-colors flex items-center gap-[15px] pl-[2px] pr-[14px] py-[2px] flex-shrink-0"
                    >
                      {sub.thumbnails && sub.thumbnails[0] && (
                        <div className="relative h-full aspect-[5/3] rounded-sm bg-white/10 overflow-hidden flex-shrink-0">
                          <Image
                            src={urlFor(sub.thumbnails[0])
                              .width(200)
                              .height(200)
                              .url()}
                            alt={sub.title}
                            fill
                            className="object-cover rounded-sm outline outline-1 outline-white/20"
                          />
                        </div>
                      )}
                      <span className="text-sm font-medium whitespace-nowrap">
                        {sub.title}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {templates.map((template: Template) => (
              <Link
                key={template.slug}
                href={`/marketplace/templates/${categorySlug}/${template.slug}`}
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
                      className="object-cover transition-opacity duration-300 group-hover:opacity-0 rounded-[3px]"
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
                        className="object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-[3px]"
                      />
                    )}
                    {/* Arrow Icon */}
                    <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm p-2 rounded-full z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <TrendingUp className="w-4 h-4 text-white" />
                    </div>
                  </div>
                )}

                {/* Content */}
                <div className="p-4">
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
                          className="text-[10px] text-white/40 bg-white/5 px-2 py-0.5 rounded"
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

          {templates.length === 0 && (
            <div className="text-center py-16">
              <p className="text-white/60 text-lg">
                No templates found in this category yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
