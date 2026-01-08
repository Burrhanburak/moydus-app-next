import { client, urlFor } from "@/lib/sanity";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Template Categories | Moydus",
  description: "Browse our collection of templates organized by category",
};

interface Category {
  title: string;
  slug: string;
  description?: string;
  group?: string;
  order?: number;
  thumbnails?: Array<{
    asset: {
      url: string;
    };
  }>;
  templateCount: number;
  previewTemplates: Array<{
    thumbnails?: Array<{
      asset: {
        url: string;
      };
    }>;
  }>;
}

const groupLabels: Record<string, string> = {
  business: "Business Templates",
  community: "Community Templates",
  creative: "Creative Templates",
  style: "Style Templates",
};

async function getCategories() {
  if (!client) {
    return [];
  }
  const categories = await client.fetch(
    `*[_type == "category"]{
      title,
      "slug": slug.current,
      description,
      group,
      order,
      thumbnails,
      "templateCount": count(*[_type == "template" && published == true && (primaryCategory._ref == ^._id || ^._id in categories[]->_ref)]),
      "previewTemplates": *[_type == "template" && published == true && (primaryCategory._ref == ^._id || ^._id in categories[]->_ref)] | order(_createdAt desc)[0...3]{
        thumbnails
      }
    } | order(order asc, title asc)`
  );
  return categories;
}

export default async function CategoryPage() {
  const categories = await getCategories();

  // Filter out categories without a group (group is empty, null, or "None")
  // Only show categories that have a valid group assigned
  const categoriesWithGroup = categories.filter((category: Category) => {
    const group = category.group?.trim();
    return group && group !== "" && ["business", "community", "creative", "style"].includes(group.toLowerCase());
  });

  // Debug: Log categories to see what we're getting
  console.log(
    "All categories:",
    categories.map((c: Category) => ({
      title: c.title,
      group: c.group,
      slug: c.slug,
    }))
  );
  console.log(
    "Categories with valid group:",
    categoriesWithGroup.map((c: Category) => ({
      title: c.title,
      group: c.group,
    }))
  );

  // Helper function to infer group from category title when group is null
  // Note: This is now mainly for backward compatibility, as we filter out categories without groups
  function inferGroupFromTitle(
    title: string,
    existingGroup: string | null | undefined
  ): string {
    // If group is already set and valid, use it
    if (existingGroup) {
      const normalized = existingGroup.toLowerCase().trim();
      if (["business", "community", "creative", "style"].includes(normalized)) {
        return normalized;
      }
    }

    // Otherwise, infer from title (fallback for edge cases)
    const titleLower = title.toLowerCase();

    // Business group categories
    if (
      titleLower === "ai" ||
      titleLower === "saas" ||
      titleLower === "technology" ||
      titleLower === "business" ||
      titleLower.includes("business")
    ) {
      return "business";
    }

    // Community group
    if (titleLower === "community" || titleLower.includes("community")) {
      return "community";
    }

    // Style group
    if (titleLower === "style" || titleLower.includes("style")) {
      return "style";
    }

    // Creative group
    if (titleLower === "creative" || titleLower.includes("creative")) {
      return "creative";
    }

    return "other";
  }

  // Group categories by their group field (only categories with valid groups)
  const groupedCategories = categoriesWithGroup.reduce(
    (acc: Record<string, Category[]>, category: Category) => {
      // Use the group directly since we've already filtered for valid groups
      const group = category.group?.toLowerCase().trim() || inferGroupFromTitle(category.title, category.group);
      
      // Only include valid groups
      if (!["business", "community", "creative", "style"].includes(group)) {
        return acc; // Skip invalid groups
      }
      
      if (!acc[group]) {
        acc[group] = [];
      }
      acc[group].push(category);
      return acc;
    },
    {}
  );

  // Debug: Log grouped categories (after inference)
  console.log(
    "Grouped categories (after inference):",
    Object.keys(groupedCategories).map((key) => ({
      group: key,
      count: groupedCategories[key].length,
      titles: groupedCategories[key].map((c: Category) => c.title),
    }))
  );

  // Define group order
  const groupOrder = ["business", "community", "creative", "style"];

  return (
    <div className="min-h-screen bg-[#000000] text-white">
      <div className="container mx-auto max-w-7xl px-4 md:px-6 py-16">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-semibold mb-4 md:text-6xl">
            Categories
          </h1>
          <p className="text-white/60 text-lg max-w-2xl">
            Discover templates organized by category groups
          </p>
        </div>

        {/* Grouped Categories */}
        {groupOrder.map((groupKey) => {
          const groupCategories = groupedCategories[groupKey] || [];
          // Debug: Log what's being rendered
          if (groupKey === "business") {
            console.log(
              `Rendering business group with ${groupCategories.length} categories:`,
              groupCategories.map((c: Category) => c.title)
            );
          }
          if (groupCategories.length === 0) return null;

          return (
            <div key={groupKey} className="mb-16">
              {/* Group Header */}
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-semibold mb-2">
                    {groupLabels[groupKey] ||
                      groupKey.charAt(0).toUpperCase() + groupKey.slice(1)}
                  </h2>
                  <p className="text-white/60 text-sm">
                    {groupCategories.length}{" "}
                    {groupCategories.length === 1 ? "category" : "categories"}
                  </p>
                </div>
                {groupCategories.length > 0 && (
                  <Link
                    href={`/marketplace/templates/category/${groupKey}`}
                    className="text-label text-white/70 hover:text-white transition-colors flex items-center gap-1 text-sm font-medium"
                  >
                    See All →
                  </Link>
                )}
              </div>

              {/* Categories Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-2.5">
                {groupCategories.map((category: Category) => (
                  <Link
                    key={category.slug}
                    href={`/marketplace/templates/category/${category.slug}`}
                    className="group rounded-lg bg-[#1C1C1C] hover:bg-[#262626] transition-colors flex flex-col overflow-hidden"
                  >
                    {/* Images Grid */}
                    <div className="grid grid-cols-2 gap-[5px] p-[5px] pb-0">
                      {/* Use category thumbnails if available, otherwise use template thumbnails */}
                      {category.thumbnails && category.thumbnails.length > 0 ? (
                        <>
                          {/* First image from category thumbnails */}
                          {category.thumbnails[0] && (
                            <div className="col-span-1 aspect-[4/3] relative overflow-hidden rounded-[3px]">
                              <Image
                                src={urlFor(category.thumbnails[0])
                                  .width(200)
                                  .height(150)
                                  .url()}
                                alt={`${category.title} thumbnail 1`}
                                fill
                                className="object-cover outline outline-1 outline-white/10 outline-offset-[-1px] rounded-[3px]"
                              />
                            </div>
                          )}
                          {/* Second image from category thumbnails */}
                          {category.thumbnails[1] ? (
                            <div className="col-span-1 aspect-[4/3] relative overflow-hidden rounded-[3px]">
                              <Image
                                src={urlFor(category.thumbnails[1])
                                  .width(200)
                                  .height(150)
                                  .url()}
                                alt={`${category.title} thumbnail 2`}
                                fill
                                className="object-cover outline outline-1 outline-white/10 outline-offset-[-1px] rounded-[3px]"
                              />
                            </div>
                          ) : (
                            <div className="col-span-1 aspect-[4/3] bg-[#0a0a0a] rounded-[3px]" />
                          )}
                        </>
                      ) : category.previewTemplates &&
                        category.previewTemplates.length > 0 ? (
                        <>
                          {/* Fallback to template thumbnails if category thumbnails don't exist */}
                          {category.previewTemplates[0]?.thumbnails?.[0] && (
                            <div className="col-span-1 aspect-[4/3] relative overflow-hidden rounded-[3px]">
                              <Image
                                src={urlFor(
                                  category.previewTemplates[0].thumbnails[0]
                                )
                                  .width(200)
                                  .height(150)
                                  .url()}
                                alt={`${category.title} template 1`}
                                fill
                                className="object-cover outline outline-1 outline-white/10 outline-offset-[-1px] rounded-[3px]"
                              />
                            </div>
                          )}
                          {category.previewTemplates[1]?.thumbnails?.[0] ? (
                            <div className="col-span-1 aspect-[4/3] relative overflow-hidden rounded-[3px]">
                              <Image
                                src={urlFor(
                                  category.previewTemplates[1].thumbnails[0]
                                )
                                  .width(200)
                                  .height(150)
                                  .url()}
                                alt={`${category.title} template 2`}
                                fill
                                className="object-cover outline outline-1 outline-white/10 outline-offset-[-1px] rounded-[3px]"
                              />
                            </div>
                          ) : (
                            <div className="col-span-1 aspect-[4/3] bg-[#0a0a0a] rounded-[3px]" />
                          )}
                        </>
                      ) : (
                        <>
                          <div className="col-span-1 aspect-[4/3] bg-[#0a0a0a] rounded-[3px]" />
                          <div className="col-span-1 aspect-[4/3] bg-[#0a0a0a] rounded-[3px]" />
                        </>
                      )}
                    </div>
                    {/* Category Info */}
                    <div className="p-[15px]">
                      <h4 className="text-sm font-medium truncate mb-0">
                        {category.title}
                      </h4>
                      <p className="text-xs text-white/60 mt-0">
                        {(() => {
                          const count = Number(category.templateCount) || 0;
                          // Format: 1000+ için K formatı
                          if (count >= 1000) {
                            const kValue = (count / 1000).toFixed(1);
                            // Remove trailing zero if needed (e.g., 2.0K -> 2K)
                            const formatted = kValue.endsWith(".0")
                              ? `${parseInt(kValue)}K`
                              : `${kValue}K`;
                            return formatted;
                          }
                          return count > 0 ? count.toString() : "0";
                        })()}{" "}
                        {(() => {
                          const count = Number(category.templateCount) || 0;
                          return count === 1 ? "template" : "templates";
                        })()}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}

        {/* Show categories without group at the end */}
        {groupedCategories["other"] &&
          groupedCategories["other"].length > 0 && (
            <div className="mb-16">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">
                  Other Categories
                </h2>
                <p className="text-white/60 text-sm">
                  {groupedCategories["other"].length}{" "}
                  {groupedCategories["other"].length === 1
                    ? "category"
                    : "categories"}
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-2.5">
                {groupedCategories["other"].map((category: Category) => (
                  <Link
                    key={category.slug}
                    href={`/marketplace/templates/category/${category.slug}`}
                    className="group rounded-lg bg-[#1C1C1C] hover:bg-[#262626] transition-colors flex flex-col overflow-hidden"
                  >
                    <div className="grid grid-cols-2 gap-[5px] p-[5px] pb-0">
                      {category.thumbnails && category.thumbnails[0] ? (
                        <>
                          <div className="col-span-1 relative overflow-hidden rounded-[3px]">
                            <Image
                              src={urlFor(category.thumbnails[0])
                                .width(200)
                                .height(150)
                                .url()}
                              alt={`${category.title} thumbnail`}
                              fill
                              className="object-cover outline outline-1 outline-white/10 outline-offset-[-1px] rounded-[3px]"
                            />
                          </div>
                          {category.thumbnails[1] ? (
                            <div className="col-span-1 aspect-[4/3] relative overflow-hidden rounded-[3px]">
                              <Image
                                src={urlFor(category.thumbnails[1])
                                  .width(200)
                                  .height(150)
                                  .url()}
                                alt={`${category.title} thumbnail 2`}
                                fill
                                className="object-cover outline outline-1 outline-white/10 outline-offset-[-1px] rounded-[3px]"
                              />
                            </div>
                          ) : (
                            <div className="col-span-1 aspect-[4/3] bg-[#0a0a0a] rounded-[3px]" />
                          )}
                        </>
                      ) : (
                        <>
                          <div className="col-span-1 aspect-[4/3] bg-[#0a0a0a] rounded-[3px]" />
                          <div className="col-span-1 aspect-[4/3] bg-[#0a0a0a] rounded-[3px]" />
                        </>
                      )}
                    </div>
                    <div className="p-[15px]">
                      <h4 className="text-sm font-medium truncate mb-0">
                        {category.title}
                      </h4>
                      <p className="text-xs text-white/60 mt-0">
                        {category.templateCount || 0}{" "}
                        {category.templateCount === 1
                          ? "template"
                          : "templates"}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
      </div>
    </div>
  );
}
