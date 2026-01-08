interface RawGeoSegments {
  city?: string | null;
  category?: string | null;
  slug: string;
}

function countHyphens(value?: string | null): number {
  if (!value) return 0;
  return (value.match(/-/g) || []).length;
}

export function resolveBlogGeoSegments({
  city,
  category,
  slug,
}: RawGeoSegments) {
  let actualCity = city ?? null;
  let actualCategory = category ?? null;
  let actualSlug = slug;

  const cityHyphenCount = countHyphens(city);
  const categoryHyphenCount = countHyphens(category);

  // If category and slug are the same, category is actually the slug
  // This happens when URL is malformed: /blog/.../category/slug where category === slug
  if (category && slug && category.toLowerCase() === slug.toLowerCase()) {
    actualCategory = null;
    actualSlug = slug; // Keep slug as is
  } else if (city && category && cityHyphenCount <= 1 && categoryHyphenCount >= 2) {
    // City might actually be category (short city name, long category slug)
    actualCity = null;
    const detectedCategory = city.toLowerCase();
    actualCategory = detectedCategory === "general" ? null : city;
    actualSlug = category;
  }
  
  // Keep "general" as-is for API calls - don't convert to null
  // The API expects the actual category value

  return {
    city: actualCity,
    category: actualCategory,
    slug: actualSlug,
  };
}
