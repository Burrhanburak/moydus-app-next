import Link from "next/link";
import BlogClient from "./BlogClient";
import type { GeoListItem } from "./BlogGeoList";

type BlogFeedWithFiltersProps = {
  blogList: unknown;
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

const GRID_CARD =
  "group flex items-center justify-between rounded-2xl border border-[#1a1c1d] bg-[#000000] px-4 py-3 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg";

export default function BlogFeedWithFilters({
  blogList,
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
}: BlogFeedWithFiltersProps) {
  const articleEstimate =
    typeof totalCount === "number"
      ? totalCount
      : Array.isArray(blogList)
        ? blogList.length
        : 0;

  const stats = [
    { label: "Articles", value: articleEstimate || 0 },
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

  const renderFilterSection = (
    heading: string,
    items: GeoListItem[],
    accentClass: string
  ) => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-white/60">
          {heading}
        </h3>
        <span className="text-xs text-white/60">
          {items.length} destinations
        </span>
      </div>
      <div className="space-y-3">
        {items.slice(0, 6).map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`${GRID_CARD} ${accentClass}`}
          >
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-400">
                {item.badge || heading}
              </p>
              <h4 className="text-base font-semibold text-white">
                {item.title}
              </h4>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-white">{item.count}</p>
              <p className="text-xs text-gray-400">articles</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );

  return (
    <main className="container mx-auto max-w-7xl py-20 px-4">
      {/* Hero */}
      <section className="mb-10 rounded-3xl bg-gradient-to-br from-[lab(0_0_0)] via-[lab(27_31.49_44.29)] to-black p-10 text-white shadow-2xl">
        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-gray-400">
              Global Intelligence Hub
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

      <section className="grid gap-3 lg:grid-cols-[minmax(0,2.2fr)_minmax(280px,1fr)]">
        <div className="space-y-12">
          <div>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-white mb-2 p-2">
                Latest Articles
              </h2>
            </div>
            <BlogClient blogList={blogList} title="" description="" />
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
                      <p className="text-xs text-white/60">articles</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>

        <aside className="space-y-8">
          {showCountryFilters && countryFilters.length > 0 && (
            <section className="rounded-3xl  bg-[#000000] p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-white">
                🌎 Country Navigator
              </h3>
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
                      <p className="text-xs text-white/60">articles</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {showStateFilters && stateFilters.length > 0 && (
            <section className="rounded-3xl  bg-[#000000] p-6 shadow-lg">
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
