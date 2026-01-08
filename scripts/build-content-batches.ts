import fs from "fs";
import path from "path";

type Category = {
  name: string;
  slug: string;
  description?: string;
};

type ContentFile = Array<{
  category_id?: number | null;
  category_slug?: string | null;
  slug?: string;
  title?: string;
  [key: string]: any;
}>;

const DATA_DIR =
  process.env.MOY_LARAVEL_DATA_DIR ||
  "/Users/burakozcan/Sites/moy-app/resources/data";

const OUTPUT_DIR = path.resolve(
  process.cwd(),
  "resources",
  "content-engine-batches"
);

const FILE_CONFIG = [
  { name: "services", filename: "services.json" },
  { name: "howto", filename: "howto-pages.json" },
  { name: "top", filename: "top-pages.json" },
  { name: "compare", filename: "compare-pages.json" },
  { name: "blog", filename: "blog-posts.json" },
];

function loadJson<T>(filename: string): T {
  const fullPath = path.join(DATA_DIR, filename);
  const contents = fs.readFileSync(fullPath, "utf8");
  return JSON.parse(contents) as T;
}

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function getMissingCategorySlugs(
  categories: Category[],
  existing: ContentFile
) {
  const seen = new Set(
    existing
      .map((entry) => entry.category_slug || entry.category?.slug || null)
      .filter((slug): slug is string => Boolean(slug))
  );

  return categories.filter((category) => !seen.has(category.slug));
}

function buildTemplateBucket(
  type: string,
  category: Category,
  index: number,
  templateSeed: string
) {
  const baseSlug = category.slug;
  const timestamp = Date.now();

  const slugRoot =
    type === "service"
      ? `/services/${baseSlug}-${timestamp}-${index}`
      : `/blog/${baseSlug}-${timestamp}-${index}`;

  return {
    category_slug: category.slug,
    slug: slugRoot,
    title: `${templateSeed} — ${category.name}`,
    meta_title: "",
    meta_description: "",
    keyword: "",
    intent: "",
    snippet: "",
    post_type: type === "service" ? "service" : "blog",
    notes: "AUTO-GENERATED WORK ITEM",
  };
}

function buildBatches(
  missingCategories: Category[],
  type: string,
  batchSize: number,
  offset: number
) {
  return missingCategories
    .slice(offset, offset + batchSize)
    .map((category, index) => {
      switch (type) {
        case "services":
          return buildTemplateBucket(
            "service",
            category,
            index + offset,
            "Service Page Placeholder"
          );
        case "howto":
          return buildTemplateBucket(
            "blog",
            category,
            index + offset,
            `How to Choose ${category.name}`
          );
        case "top":
          return buildTemplateBucket(
            "blog",
            category,
            index + offset,
            `Top ${category.name} Companies`
          );
        case "compare":
          return buildTemplateBucket(
            "blog",
            category,
            index + offset,
            `${category.name} Comparison Guide`
          );
        case "blog":
        default:
          return buildTemplateBucket(
            "blog",
            category,
            index + offset,
            `${category.name} Deep Dive`
          );
      }
    });
}

function main() {
  const categories = loadJson<Category[]>("categories.json");
  ensureDir(OUTPUT_DIR);

  const batchSize = Number(process.argv[2] || 10);
  const batchIndex = Number(process.argv[3] || 0);
  const batchStart = batchIndex * batchSize;

  FILE_CONFIG.forEach(({ name, filename }) => {
    const existing = loadJson<ContentFile>(filename);
    const missingCategories = getMissingCategorySlugs(categories, existing);

    console.log(`${name} current entries: ${existing.length}`);
    console.log(`${name} missing categories: ${missingCategories.length}`);

    const batch = buildBatches(
      missingCategories,
      name,
      batchSize,
      batchStart
    );

    const outputPath = path.join(
      OUTPUT_DIR,
      `${name}-batch-${batchIndex + 1}-${Date.now()}.json`
    );

    fs.writeFileSync(outputPath, JSON.stringify(batch, null, 2));
    console.log(`${name} batch saved to: ${outputPath}`);
  });
}

main();
