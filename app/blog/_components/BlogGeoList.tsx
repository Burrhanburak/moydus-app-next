import Link from "next/link";

export type GeoListItem = {
  title: string;
  href: string;
  count: number;
  subtitle?: string;
  badge?: string;
};

interface BlogGeoListProps {
  heading: string;
  description?: string;
  items: GeoListItem[];
  emptyTitle?: string;
  emptyDescription?: string;
}

export function BlogGeoList({
  heading,
  description,
  items,
  emptyTitle = "No data available",
  emptyDescription = "Please check back later for fresh content.",
}: BlogGeoListProps) {
  return (
    <main className="container mx-auto max-w-5xl py-12 px-2">
      <header className="mb-10">
        <p className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-3">
          Blog Explorer
        </p>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          {heading}
        </h1>
        {description && (
          <p className="text-lg text-gray-600 max-w-3xl">{description}</p>
        )}
      </header>

      {items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 px-6 py-16 text-center">
          <p className="text-2xl font-semibold text-white/80 mb-2">
            {emptyTitle}
          </p>
          <p className="text-white/80">{emptyDescription}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {items.map((item) => (
            <Link
              key={`${item.title}-${item.href}`}
              href={item.href}
              className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-white/20 hover:shadow-xl"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wide text-white">
                    {item.badge || "Region"}
                  </p>
                  <h2 className="text-2xl font-bold text-gray-900 mt-1">
                    {item.title}
                  </h2>
                  {item.subtitle && (
                    <p className="text-gray-500 mt-1">{item.subtitle}</p>
                  )}
                </div>
                <div className="flex flex-col items-end text-right">
                  <span className="text-3xl font-bold text-gray-900">
                    {item.count}
                  </span>
                  <span className="text-xs text-gray-500">articles</span>
                </div>
              </div>
              <div className="mt-6 flex items-center text-blue-600 font-semibold">
                <span>Browse content</span>
                <svg
                  className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
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
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
