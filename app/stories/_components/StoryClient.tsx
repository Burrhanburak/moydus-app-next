import Link from "next/link";

type RawSlide = {
  image?: string;
  text?: string;
};

type Story = {
  id?: string | number;
  slug?: string;
  title?: string;
  description?: string;
  excerpt?: string;
  snippet?: string;
  summary?: string;
  meta_description?: string;
  poster_url?: string;
  poster?: string;
  image_url?: string;
  cover_image?: string;
  featured_image?: string;
  hero_image?: string;
  slides?: RawSlide[];
  slide_count?: number;
  published_at?: string;
  created_at?: string;
  author_name?: string;
};

type StoryClientProps = {
  stories: unknown;
  title?: string;
  description?: string;
};

const tryExtractStoryArray = (value: unknown): Story[] => {
  if (!value) return [];
  if (Array.isArray(value)) {
    return value as Story[];
  }
  if (typeof value === "object") {
    const nested = (value as { data?: unknown }).data;
    if (Array.isArray(nested)) {
      return nested as Story[];
    }
  }
  return [];
};

const normalizeStories = (raw: unknown): Story[] => {
  if (!raw) return [];

  const direct = tryExtractStoryArray(raw);
  if (direct.length) {
    return direct;
  }

  if (typeof raw === "object" && raw !== null) {
    const obj = raw as Record<string, unknown>;
    const keysToInspect = ["stories", "items", "data", "results", "list"];

    for (const key of keysToInspect) {
      if (!(key in obj)) continue;
      const nextValue = obj[key];
      if (nextValue === raw) continue;
      const candidate = normalizeStories(nextValue);
      if (candidate.length) {
        return candidate;
      }
    }
  }

  return [];
};

const sanitizeSlug = (slug: string): string => {
  const trimmed = slug.trim().replace(/^\/+|\/+$/g, "");
  return trimmed.replace(/^stories\//i, "");
};

const getStoryImage = (story: Story): string | null => {
  // Debug: log story object in development
  if (process.env.NODE_ENV === "development") {
    console.log("🔍 getStoryImage called with:", {
      story,
      poster_url: story.poster_url,
      poster: story.poster,
      hasPosterUrl: !!story.poster_url,
      hasPoster: !!story.poster,
    });
  }
  
  // Prioritize poster_url (already normalized from backend)
  const directImage =
    story.poster_url ||
    story.poster ||
    story.image_url ||
    story.cover_image ||
    story.featured_image ||
    story.hero_image;

  if (directImage) {
    // Ensure URL is absolute (for external images)
    if (typeof directImage === 'string' && (directImage.startsWith('http://') || directImage.startsWith('https://'))) {
      return directImage;
    }
    // If relative, assume it's from CDN
    if (typeof directImage === 'string') {
      return directImage.startsWith('/') 
        ? `https://cdn.moydus.com${directImage}`
        : `https://cdn.moydus.com/${directImage}`;
    }
  }

  // Fallback to first slide image
  if (Array.isArray(story.slides)) {
    const slideWithImage = story.slides.find((slide) => !!slide?.image);
    if (slideWithImage?.image) {
      const slideImage = slideWithImage.image;
      // Ensure URL is absolute
      if (typeof slideImage === 'string' && (slideImage.startsWith('http://') || slideImage.startsWith('https://'))) {
        return slideImage;
      }
      if (typeof slideImage === 'string') {
        return slideImage.startsWith('/') 
          ? `https://cdn.moydus.com${slideImage}`
          : `https://cdn.moydus.com/${slideImage}`;
      }
    }
  }

  return null;
};

const getStoryDescription = (story: Story): string | null => {
  const fields = [
    story.description,
    story.excerpt,
    story.snippet,
    story.summary,
    story.meta_description,
  ];

  for (const field of fields) {
    if (typeof field === "string" && field.trim().length > 0) {
      return field.trim();
    }
  }

  return null;
};

const formatPublishedDate = (value?: string): string | null => {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const hasUsableSlug = (story: Story): story is Story & { slug: string } =>
  typeof story.slug === "string" && story.slug.trim().length > 0;

const getSlideCount = (story: Story): number | null => {
  if (typeof story.slide_count === "number" && story.slide_count > 0) {
    return story.slide_count;
  }
  if (Array.isArray(story.slides)) {
    return story.slides.length;
  }
  return null;
};

export default function StoryClient({
  stories,
  title = "Web Stories",
  description = "Explore lightweight visual narratives powered by Moydus.",
}: StoryClientProps) {
  // Use stories directly like in detail page - API already returns array with all fields
  const storiesArray = Array.isArray(stories) 
    ? stories 
    : [];
  
  const normalizedStories = storiesArray.filter(hasUsableSlug);

  if (normalizedStories.length === 0) {
    return (
      <main className="min-h-[60vh] bg-[#000000] text-white px-4 py-16 ">
        <div className="mx-auto max-w-5xl text-center space-y-4">
          <p className="text-xs uppercase tracking-[0.3em] text-white/40">
            Web Stories
          </p>
          <h1 className="text-3xl font-semibold">Stories will be back soon</h1>
          <p className="text-white/60">
            We could not find any published stories at the moment. Please check
            again later.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white px-6 py-19">
      <div className="mx-auto flex max-w-6xl flex-col gap-12">
        <header className="space-y-4 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-white/40">
            Web Stories
          </p>
          <h1 className="text-4xl font-semibold">{title}</h1>
          {description && (
            <p className="text-lg text-white/60">{description}</p>
          )}
        </header>

        <section className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          {normalizedStories.map((story, index) => {
            const slug = sanitizeSlug(story.slug || '');
            const href = `/stories/${slug}`;
            const image = getStoryImage(story);
            const summary = getStoryDescription(story);
            const published = formatPublishedDate(
              story.published_at || story.created_at
            );
            const slideCount = getSlideCount(story);

            return (
              <article
                key={`${slug}-${index}`}
                className="flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] shadow-[0_20px_50px_rgba(0,0,0,0.35)] transition hover:border-white/20"
              >
                <div className="relative aspect-[3/4] w-full bg-white/5">
                  {image ? (
                    <img
                      src={image}
                      alt={story.title || `Story ${index + 1}`}
                      className="h-full w-full object-cover"
                      loading="lazy"
                      onError={(e) => {
                        // Fallback to first slide image if poster fails to load
                        if (Array.isArray(story.slides)) {
                          const slideWithImage = story.slides.find((slide: any) => !!slide?.image);
                          if (slideWithImage?.image) {
                            (e.target as HTMLImageElement).src = slideWithImage.image;
                          }
                        }
                      }}
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-white/40">
                      Poster coming soon
                    </div>
                  )}

                  <span className="absolute left-4 top-4 inline-flex items-center rounded-full bg-black/60 px-3 py-1 text-xs uppercase tracking-[0.25em] text-white">
                    Story
                  </span>
                  {slideCount !== null && (
                    <span className="absolute bottom-4 left-4 rounded-full bg-black/60 px-3 py-1 text-xs text-white">
                      {slideCount} slide{slideCount === 1 ? "" : "s"}
                    </span>
                  )}
                </div>

                <div className="flex flex-1 flex-col gap-4 p-6">
                  {published && (
                    <p className="text-xs uppercase tracking-[0.3em] text-white/40">
                      {published}
                    </p>
                  )}
                  <h2 className="text-2xl font-semibold">
                    {story.title || "Untitled story"}
                  </h2>
                  {summary && (
                    <p className="text-sm leading-relaxed text-white/70">
                      {summary}
                    </p>
                  )}

                  <div className="mt-auto flex items-center justify-between">
                    <Link
                      href={href}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-200 transition hover:text-white"
                    >
                      Read story
                      <span aria-hidden="true">→</span>
                    </Link>
                    {story.author_name && (
                      <p className="text-sm text-white/60">
                        {story.author_name}
                      </p>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </section>
      </div>
    </main>
  );
}
