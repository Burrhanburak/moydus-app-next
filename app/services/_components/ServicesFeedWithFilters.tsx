import Link from "next/link";
import ServiceClient from "./ServiceClient";
import type { GeoListItem } from "@/app/blog/_components/BlogGeoList";

type BreadcrumbItem = {
  label: string;
  href: string;
};

type ServicesFeedWithFiltersProps = {
  services: unknown;
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
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
  "group flex items-center justify-between rounded-2xl  bg-[#000000] px-4 py-3 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg";

export default function ServicesFeedWithFilters({
  services,
  title,
  description,
  breadcrumbs = [],
  countryFilters = [],
  stateFilters = [],
  cityFilters = [],
  categoryFilters = [],
  showCountryFilters = false,
  showStateFilters = false,
  showCityFilters = false,
  showCategoryFilters = false,
  totalCount,
}: ServicesFeedWithFiltersProps) {
  const serviceEstimate =
    typeof totalCount === "number"
      ? totalCount
      : Array.isArray(services)
        ? services.length
        : 0;

  const stats = [
    { label: "Services", value: serviceEstimate || 0 },
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
                className="h-4 w-4 text-gray-400 transition-transform group-hover:translate-x-1"
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

  // Default breadcrumbs if not provided
  const defaultBreadcrumbs: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
  ];
  const allBreadcrumbs =
    breadcrumbs.length > 0 ? breadcrumbs : defaultBreadcrumbs;

  return (
    <main className="container mx-auto max-w-7xl py-16 px-1">
      {/* Breadcrumb */}
      {allBreadcrumbs.length > 0 && (
        <nav className="flex flex-wrap items-center gap-2 text-sm text-gray-500 pl-3 py-9 md:py-10 ">
          {allBreadcrumbs.map((item, index) => (
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
              {index === allBreadcrumbs.length - 1 ? (
                <span className="text-white/80 font-medium">{item.label}</span>
              ) : (
                <Link
                  href={item.href}
                  className="text-white/40 transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </span>
          ))}
        </nav>
      )}

      {/* Hero */}
      <section className="mb-10 rounded-3xl bg-gradient-to-br from-[lab(0_0_0)] via-[lab(27_31.49_44.29)] to-black p-10 text-white shadow-2xl">
        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-white/60">
              Service Intelligence Hub
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
              <div
                key={stat.label}
                className="rounded-2xl bg-white/5 p-4 flex flex-col items-center justify-center"
              >
                <p className="text-2xl font-bold text-white">
                  {stat.value.toLocaleString()}
                </p>
                <p className="text-xs uppercase tracking-wider text-white/60">
                  {/* {stat.label} */}
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
              <h2 className="text-2xl font-semibold text-white">
                Latest Services
              </h2>
            </div>
            <ServiceClient services={Array.isArray(services) ? services : []} />
          </div>

          {showCategoryFilters && categoryFilters.length > 0 && (
            <section className="rounded-3xl bg-[#000000] p-6 shadow-lg">
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
                      <p className="text-xs text-white/60">services</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Root-Level Money Pages */}
          <section className="rounded-3xl bg-[#000000] p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-white mb-4">
              Professional Services
            </h3>
            <p className="text-sm text-white/60 mb-4">
              Explore our core service offerings and specialized solutions
            </p>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {[
                {
                  title: "Web Design Agency",
                  description: "Professional design agency services",
                  href: "/web-design-agency",
                },
                {
                  title: "Web Design Company",
                  description: "Custom website design solutions",
                  href: "/web-design-company",
                },
                {
                  title: "Web Development Company",
                  description: "Full-stack development services",
                  href: "/web-development-company",
                },
                {
                  title: "E-Commerce Development",
                  description: "Online store development",
                  href: "/ecommerce-website-development",
                },
                {
                  title: "Software Company",
                  description: "Custom software solutions",
                  href: "/software-company",
                },
              ].map((page) => (
                <Link key={page.href} href={page.href} className={GRID_CARD}>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-white/60">
                      Service
                    </p>
                    <h4 className="text-base font-semibold text-white">
                      {page.title}
                    </h4>
                    <p className="mt-1 text-xs text-white/50">
                      {page.description}
                    </p>
                  </div>
                  <svg
                    className="h-5 w-5 text-white/40 transition-transform group-hover:translate-x-1"
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
                </Link>
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-8">
          {/* Filters Section */}
          {showCountryFilters && countryFilters.length > 0 && (
            <section className="rounded-3xl bg-[#000000] p-6 shadow-lg">
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
                      <p className="text-xs text-white/60">services</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {showStateFilters && stateFilters.length > 0 && (
            <section className="rounded-3xl border border-[#1a1c1d] bg-[#000000] p-6 shadow-lg">
              {renderFilterSection(
                "States",
                stateFilters,
                "hover:border-white/20"
              )}
            </section>
          )}

          {showCityFilters && cityFilters.length > 0 && (
            <section className="rounded-3xl border border-[#1a1c1d] bg-[#000000] p-6 shadow-lg">
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
