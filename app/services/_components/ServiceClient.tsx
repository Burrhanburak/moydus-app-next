import Link from "next/link";
import { getR2ImageUrl } from "@/lib/r2-image";

type Service = {
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

type ServiceClientProps = {
  services: Service[];
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

const buildServicePath = (service: Service): string => {
  const countrySlug = normalizeGeoSlug(service.country);
  const stateSlug = normalizeGeoSlug(service.state);
  const citySlug = normalizeGeoSlug(service.city);

  // Use the actual slug from API, not generated from title
  const serviceSlug = service.slug;

  // If no slug, we can't build a proper detail URL
  if (!serviceSlug || !countrySlug) {
    return `/services`;
  }

  // Service URL format: /services/{country}/{state?}/{city?}/{slug}
  // NO CATEGORY in service URLs!
  const pathParts = ["/services", countrySlug];

  if (stateSlug) {
    pathParts.push(stateSlug);
    if (citySlug && citySlug !== stateSlug) {
      pathParts.push(citySlug);
    }
  }

  // Add slug only (NO CATEGORY!)
  pathParts.push(serviceSlug);

  return pathParts.join("/");
};

export default function ServiceClient({ services }: ServiceClientProps) {
  if (!services || services.length === 0) {
    return (
      <div className="container mx-auto max-w-5xl py-12 px-2">
        <div className="rounded-2xl border border-dashed border-gray-300 px-6 py-16 text-center">
          <p className="text-2xl font-semibold text-white/80 mb-2">
            No services found
          </p>
          <p className="text-white/80">
            Please check back later for fresh content.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-5xl py-12 ">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => {
          const href = buildServicePath(service);
          const categoryName =
            typeof service.category === "string"
              ? formatSegmentLabel(service.category)
              : service.category?.name ||
                formatSegmentLabel(service.category?.slug || "");
          const locationParts = [
            normalizeGeoSlug(service.city) ||
              normalizeGeoSlug(service.state) ||
              normalizeGeoSlug(service.country),
            normalizeGeoSlug(service.country),
          ].filter(Boolean);
          const location = locationParts.join(", ");

          return (
            <Link
              key={service.id || service.slug || index}
              href={href}
              className="group rounded-2xl border border-[#1a1c1d] bg-[#000000] overflow-hidden shadow-sm transition-all hover:-translate-y-1 hover:border-white/20 hover:shadow-xl"
            >
              {/* Featured Image */}
              {service.featured_image && (
                <div className="aspect-video w-full overflow-hidden bg-[#000000]">
                  <img
                    src={
                      getR2ImageUrl(service.featured_image) ||
                      service.featured_image
                    }
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <div className="p-6">
                <div className="mb-3">
                  <span className="text-xs font-semibold uppercase tracking-wide text-white">
                    {categoryName || "Service"}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-white mb-2 line-clamp-2">
                  {service.title}
                </h2>
                {service.meta_description && (
                  <p className="text-sm text-white/60 mb-4 line-clamp-2">
                    {service.meta_description}
                  </p>
                )}
                {location && (
                  <p className="text-xs text-white/60 mb-4">{location}</p>
                )}
                <div className="flex items-center justify-between">
                  {service.reading_time && (
                    <span className="text-xs text-white/60">
                      {service.reading_time} min read
                    </span>
                  )}
                  <span className="text-white font-semibold text-sm group-hover:underline">
                    Read more →
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
