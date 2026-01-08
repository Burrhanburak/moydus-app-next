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

const DATA_DIR = path.resolve(
  process.env.MOY_LARAVEL_DATA_DIR ||
    "/Users/burakozcan/Sites/moy-app/resources/data"
);

const outputDir = path.resolve(
  process.cwd(),
  "resources",
  "content-engine-batches"
);

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

function buildBatch(
  missingCategories: Category[],
  batchSize: number,
  offset: number
) {
  return missingCategories.slice(offset, offset + batchSize).map(
    (category, index) => ({
      category_slug: category.slug,
      title: `{{TITLE_GOES_HERE}} — ${category.name}`,
      slug: `/blog/${category.slug}-${Date.now()}-${index + offset}`,
      meta_title: "",
      meta_description: "",
      keyword: "",
      intent: "",
      snippet: "",
      post_type: "blog",
      notes: "AUTO-GENERATED WORK ITEM",
    })
  );
}

function main() {
  const categories = loadJson<Category[]>("categories.json");
  const blogPosts = loadJson<ContentFile>("blog-posts.json");
  const services = loadJson<ContentFile>("services.json");

  const missingBlogCategories = getMissingCategorySlugs(categories, blogPosts);
  const missingServiceCategories = getMissingCategorySlugs(categories, services);

  console.log("Total categories:", categories.length);
  console.log("Blog posts:", blogPosts.length);
  console.log("Services:", services.length);
  console.log("Missing blog categories:", missingBlogCategories.length);
  console.log("Missing service categories:", missingServiceCategories.length);

  ensureDir(outputDir);

  const batchSize = Number(process.argv[2] || 10);
  const batchIndex = Number(process.argv[3] || 0);
  const batchStart = batchIndex * batchSize;

  const blogBatch = buildBatch(missingBlogCategories, batchSize, batchStart);
  const serviceBatch = buildBatch(missingServiceCategories, batchSize, batchStart);

  const timestamp = Date.now();

  const blogOutputPath = path.join(
    outputDir,
    `blog-batch-${batchIndex + 1}-${timestamp}.json`
  );
  const serviceOutputPath = path.join(
    outputDir,
    `service-batch-${batchIndex + 1}-${timestamp}.json`
  );

  fs.writeFileSync(blogOutputPath, JSON.stringify(blogBatch, null, 2));
  fs.writeFileSync(serviceOutputPath, JSON.stringify(serviceBatch, null, 2));

  console.log("Blog batch saved to:", blogOutputPath);
  console.log("Service batch saved to:", serviceOutputPath);
  console.log("Use these files with the MOYDUS Content Engine prompt to fill in full content.");
}

main();
