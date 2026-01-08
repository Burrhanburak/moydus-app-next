import Link from "next/link";
import { getR2ImageUrl } from "@/lib/r2-image";

export type GeoListItem = {
  title: string;
  href: string;
  count: number;
  subtitle?: string;
  badge?: string;
};

type ContentItem = {
  id?: string | number;
  slug?: string;
  title: string;
  category?: string | { slug?: string; name?: string };
  country?: string | { slug?: string; name?: string };
  state?: string | { slug?: string; name?: string };
  city?: string | { slug?: string; name?: string };
  meta_description?: string;
  reading_time?: number;
  published_at?: string;
  featured_image?: string;
};

type ContentFeedWithFiltersProps = {
  items: ContentItem[];
  baseUrl: string; // e.g., "/how-to", "/top", "/faq", "/compare"
  sectionTitle: string; // e.g., "How-To Guides", "Top Lists", "FAQ", "Compare"
  title: string;
  description?: string;
  countryFilters?: GeoListItem[];
  stateFilters?: GeoListItem[];
  cityFilters?: GeoListItem[];
  categoryFilters?: GeoListItem[];
  showCountryFilters?: boolean;
  showStateFilters?: boolean;
  showCityFilters?: boolean;
  showCategoryFilters?: boolean;
  totalCount?: number;
};

const formatSegmentLabel = (slug?: string | null) => {
  if (!slug) return "";
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const normalizeCategorySlug = (
  category?: string | { slug?: string; name?: string } | null
): string => {
  if (!category) return "general";
  if (typeof category === "string") return category.toLowerCase();
  return (
    category.slug?.toLowerCase() ||
    category.name?.toLowerCase().replace(/\s+/g, "-") ||
    "general"
  );
};

const normalizeGeoSlug = (
  geo?: string | { slug?: string; name?: string } | null
): string | null => {
  if (!geo) return null;
  if (typeof geo === "string") return geo.toLowerCase().replace(/\s+/g, "-");
  return (
    geo.slug?.toLowerCase() ||
    geo.name?.toLowerCase().replace(/\s+/g, "-") ||
    null
  );
};

const buildContentPath = (item: ContentItem, baseUrl: string): string => {
  const countrySlug = normalizeGeoSlug(item.country);
  const stateSlug = normalizeGeoSlug(item.state);
  const citySlug = normalizeGeoSlug(item.city);
  const categorySlug = normalizeCategorySlug(item.category);

  // Use the actual slug from API
  const itemSlug = item.slug;

  // If no slug, we can't build a proper detail URL
  if (!itemSlug || !countrySlug) {
    return baseUrl;
  }

  const pathParts = [baseUrl, countrySlug];

  if (stateSlug) {
    pathParts.push(stateSlug);
    if (citySlug && citySlug !== stateSlug) {
      pathParts.push(citySlug);
    }
  }

  pathParts.push(categorySlug, itemSlug);

  return pathParts.join("/");
};

const GRID_CARD =
  "group flex items-center justify-between rounded-2xl border border-[#1a1c1d] bg-[#000000] px-4 py-3 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg";

function ContentCard({
  item,
  baseUrl,
}: {
  item: ContentItem;
  baseUrl: string;
}) {
  const href = buildContentPath(item, baseUrl);
  const categoryName =
    typeof item.category === "string"
      ? formatSegmentLabel(item.category)
      : item.category?.name || formatSegmentLabel(item.category?.slug || "");
  const locationParts = [
    normalizeGeoSlug(item.city) ||
      normalizeGeoSlug(item.state) ||
      normalizeGeoSlug(item.country),
    normalizeGeoSlug(item.country),
  ].filter(Boolean);
  const location = locationParts.join(", ");

  return (
    <Link
      href={href}
      className="group rounded-2xl border border-[#1a1c1d] bg-[#000000] overflow-hidden shadow-sm transition-all hover:-translate-y-1 hover:border-white/20 hover:shadow-xl"
    >
      {/* Featured Image */}
      {item.featured_image && (
        <div className="aspect-video w-full overflow-hidden bg-gray-100">
          <img
            src={getR2ImageUrl(item.featured_image) || item.featured_image}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <div className="p-6">
        <div className="mb-3">
          <span className="text-xs font-semibold uppercase tracking-wide text-white">
            {categoryName || "Guide"}
          </span>
        </div>
        <h2 className="text-xl font-bold text-white mb-2 line-clamp-2">
          {item.title}
        </h2>
        {item.meta_description && (
          <p className="text-sm text-white/60 mb-4 line-clamp-2">
            {item.meta_description}
          </p>
        )}
        {location && <p className="text-xs text-white/60 mb-4">{location}</p>}
        <div className="flex items-center justify-between">
          {item.reading_time && (
            <span className="text-xs text-white/60">
              {item.reading_time} min read
            </span>
          )}
          <span className="text-white font-semibold text-sm group-hover:underline">
            Read more →
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function ContentFeedWithFilters({
  items,
  baseUrl,
  sectionTitle,
  title,
  description,
  countryFilters = [],
  stateFilters = [],
  cityFilters = [],
  categoryFilters = [],
  showCountryFilters = false,
  showStateFilters = false,
  showCityFilters = false,
  showCategoryFilters = false,
  totalCount,
}: ContentFeedWithFiltersProps) {
  const itemEstimate =
    typeof totalCount === "number"
      ? totalCount
      : Array.isArray(items)
        ? items.length
        : 0;

  const stats = [
    { label: sectionTitle, value: itemEstimate || 0 },
    { label: "Countries", value: countryFilters.length },
    { label: "States", value: stateFilters.length },
    { label: "Cities", value: cityFilters.length },
    { label: "Categories", value: categoryFilters.length },
  ].filter((stat, index) => index === 0 || stat.value > 0);

  const quickGeoLinks = countryFilters.slice(0, 4);
  const quickStateLinks = stateFilters.slice(0, 4);
  const quickCategoryLinks = categoryFilters.slice(0, 4);
  const quickCityLinks = cityFilters.slice(0, 4);
  const quickLinks = [
    ...quickGeoLinks.map((item) => ({
      label: item.title,
      href: item.href,
      badge: "Country",
    })),
    ...quickStateLinks.map((item) => ({
      label: item.title,
      href: item.href,
      badge: "State",
    })),
    ...quickCityLinks.map((item) => ({
      label: item.title,
      href: item.href,
      badge: "City",
    })),
    ...quickCategoryLinks.map((item) => ({
      label: item.title,
      href: item.href,
      badge: "Category",
    })),
  ].slice(0, 9);

  // Determine hub label based on sectionTitle
  const hubLabel = sectionTitle.includes("How-To")
    ? "How-To Intelligence Hub"
    : sectionTitle.includes("Top")
      ? "Top Lists Intelligence Hub"
      : sectionTitle.includes("FAQ")
        ? "FAQ Intelligence Hub"
        : sectionTitle.includes("Compare")
          ? "Compare Intelligence Hub"
          : sectionTitle.includes("Best")
            ? "Best Lists Intelligence Hub"
            : `${sectionTitle} Intelligence Hub`;

  const renderFilterSection = (
    heading: string,
    filterItems: GeoListItem[],
    accentClass: string
  ) => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-white/60">
          {heading}
        </h3>
        <span className="text-xs text-white/60">
          {filterItems.length} destinations
        </span>
      </div>
      <div className="space-y-3">
        {filterItems.slice(0, 6).map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`${GRID_CARD} ${accentClass}`}
          >
            <div>
              <p className="text-xs uppercase tracking-wide text-white/60">
                {item.badge || heading}
              </p>
              <p className="mt-1 text-base font-semibold text-white">
                {item.title}
              </p>
              {item.subtitle && (
                <p className="mt-0.5 text-xs text-white/60">{item.subtitle}</p>
              )}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-white">{item.count}</span>
              <svg
                className="h-4 w-4 text-white/60 transition-transform group-hover:translate-x-1"
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
            </div>
          </Link>
        ))}
      </div>
    </div>
  );

  return (
    <main className="container mx-auto max-w-7xl py-20 px-4 ">
      {/* Hero */}
      <section className="mb-10 rounded-3xl bg-gradient-to-br from-[lab(0_0_0)] via-[lab(27_31.49_44.29)] to-black p-5 text-white shadow-2xl">
        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-gray-400">
              {hubLabel}
            </p>
            <h1 className="mt-4 text-4xl md:text-5xl font-bold">{title}</h1>
            {description && (
              <p className="mt-4 max-w-3xl text-base md:text-lg text-gray-300">
                {description}
              </p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4 text-center md:grid-cols-5 lg:text-right">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-2xl bg-white/5 p-4">
                <p className="text-2xl font-bold text-white">
                  {stat.value.toLocaleString()}
                </p>
                <p className="text-xs uppercase tracking-wider text-white/60">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {quickLinks.length > 0 && (
          <div className="flex flex-wrap gap-3">
            {quickLinks.map((item) => (
              <Link
                key={`${item.badge}-${item.label}`}
                href={item.href}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/20"
              >
                <span className="text-xs uppercase tracking-wider text-gray-300">
                  {item.badge}
                </span>
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </section>

      <section className="grid gap-12 lg:grid-cols-[minmax(0,2.2fr)_minmax(280px,1fr)]">
        <div className="space-y-12 text-white">
          <div>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-white mb-2 p-2">
                Latest {sectionTitle}
              </h2>
            </div>
            {!items || items.length === 0 ? (
              <div className="rounded-2xl bg-[#000000] border border-[#1a1c1d] px-6 py-16 text-center">
                <p className="text-2xl font-semibold text-white mb-2">
                  No content found
                </p>
                <p className="text-white/60">
                  Please check back later for fresh content.
                </p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {items.map((item, index) => (
                  <ContentCard
                    key={item.id || item.slug || index}
                    item={item}
                    baseUrl={baseUrl}
                  />
                ))}
              </div>
            )}
          </div>

          {showCategoryFilters && categoryFilters.length > 0 && (
            <section className="rounded-3xl  bg-[#000000] p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-white mb-4">
                Browse by Category
              </h3>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {categoryFilters.slice(0, 12).map((item) => (
                  <Link key={item.href} href={item.href} className={GRID_CARD}>
                    <div>
                      <p className="text-xs uppercase tracking-wide text-white">
                        Category
                      </p>
                      <h4 className="text-base font-semibold text-white">
                        {item.title}
                      </h4>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-white">
                        {item.count}
                      </p>
                      <p className="text-xs text-white/60">items</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>

        <aside className="space-y-8">
          {/* Filters Section */}
          {showCountryFilters && countryFilters.length > 0 && (
            <section className="rounded-3xl  bg-[#000000] p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-white">
                🌎 Country Navigator
              </h3>
              <p className="text-sm text-gray-500">
                Top regions driving content velocity
              </p>
              <div className="mt-5 space-y-3">
                {countryFilters.slice(0, 6).map((item) => (
                  <Link key={item.href} href={item.href} className={GRID_CARD}>
                    <div>
                      <p className="text-xs uppercase tracking-wide text-white">
                        Country
                      </p>
                      <h4 className="text-base font-semibold text-white">
                        {item.title}
                      </h4>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-white">
                        {item.count}
                      </p>
                      <p className="text-xs text-white/60">items</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {showStateFilters && stateFilters.length > 0 && (
            <section className="rounded-3xl border border-[#323334] bg-[#000000] p-6 shadow-lg">
              {renderFilterSection(
                "States",
                stateFilters,
                "hover:border-white/20"
              )}
            </section>
          )}

          {showCityFilters && cityFilters.length > 0 && (
            <section className="rounded-3xl  bg-[#000000] p-6 shadow-lg">
              {renderFilterSection(
                "Cities",
                cityFilters,
                "hover:border-white/20"
              )}
            </section>
          )}
        </aside>
      </section>
    </main>
  );
}
