export function formatSegmentLabel(value?: string | null) {
  if (!value) return "";
  return value
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function resolveCitySegment(
  state?: string | null,
  city?: string | null
) {
  if (!city || city.trim().length === 0) {
    return null;
  }

  const normalizedCity = city.toLowerCase();
  const normalizedState = state?.toLowerCase() || "";

  if (normalizedCity === normalizedState) {
    return null;
  }

  return city;
}

export function buildBlogDetailPath({
  country,
  state,
  city,
  category,
  slug,
}: {
  country?: string | null;
  state?: string | null;
  city?: string | null;
  category?: string | null;
  slug?: string | null;
}) {
  const segments = ["blog"];

  if (country) segments.push(country);
  if (state) segments.push(state);
  if (city) segments.push(city);
  if (category) segments.push(category);
  if (slug) segments.push(slug);

  return `/${segments.join("/")}`;
}
