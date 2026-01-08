import { getBlogPostByLocation } from "@/app/actions/blog-actions";

type FetchArgs = {
  country: string;
  state: string;
  city?: string | null;
  category: string;
  slug: string;
};

export async function fetchBlogPostByGeo({
  country,
  state,
  city,
  category,
  slug,
}: FetchArgs) {
  const cityParam = city && city.trim().length > 0 ? city : state;
  const result = await getBlogPostByLocation(
    country,
    state,
    cityParam,
    category,
    slug
  );

  if (!result.success || !result.data) {
    return null;
  }

  // API response might be { data: {...} } format
  // Extract the actual post data
  const postData = (result.data as any)?.data || result.data;

  // Debug: Log extracted data
  if (process.env.NODE_ENV === "development") {
    console.log("[fetchBlogPostByGeo] Extracted post data:", {
      title: postData?.title,
      hasContentHtml: !!postData?.content_html,
      contentHtmlLength: postData?.content_html?.length || 0,
      keys: Object.keys(postData || {}),
    });
  }

  return postData;
}
