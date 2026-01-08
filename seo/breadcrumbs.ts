export function generateBreadcrumbs(
  type: "blog" | "services",
  segments: string[]
) {
  const base = `/${type}`;

  const map = [
    { name: segments[0]?.toUpperCase(), url: `${base}/${segments[0]}` },
    segments[1] && {
      name: capitalize(segments[1]),
      url: `${base}/${segments[0]}/${segments[1]}`,
    },
    segments[2] && {
      name: capitalize(segments[2]),
      url: `${base}/${segments[0]}/${segments[1]}/${segments[2]}`,
    },
    segments[3] && {
      name: formatSlug(segments[3]),
      url: `${base}/${segments.join("/")}`,
    },
  ].filter(Boolean) as { name: string; url: string }[];

  return map;
}

function capitalize(str?: string) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).replace(/-/g, " ");
}

function formatSlug(slug: string) {
  return slug.replace(/-/g, " ");
}

export function buildBreadcrumbs(items: string[], baseUrl: string) {
  let url = baseUrl;
  return items.map((item) => {
    url += `/${item.toLowerCase()}`;
    return { name: item, url };
  });
}
