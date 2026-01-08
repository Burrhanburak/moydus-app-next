export function buildAiSummary(page) {
  return {
    title: page.title,
    description: page.description,
    url: page.url,
    city: page.city,
    state: page.state,
    country: page.country,
    category: page.category,
    updated_at: page.updated_at,
  };
}
