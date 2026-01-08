// schemas/template.ts  (templateKind YOK ✅)
export default {
  name: "template",
  title: "Template",
  type: "document",
  fields: [
    //
    // BASIC INFO
    //
    {
      name: "title",
      title: "Template Name",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule: any) => Rule.required(),
    },

    //
    // VISIBILITY / CURATION
    //
    {
      name: "published",
      title: "Published",
      type: "boolean",
      initialValue: true,
    },
    {
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
    },

    //
    // CREATOR
    //
    { name: "designer", title: "Creator", type: "string" },

    //
    // CATEGORIES (Framer-like)
    //
    {
      name: "primaryCategory",
      title: "Primary Category",
      type: "reference",
      to: [{ type: "category" }],
      description:
        "Main category card shown in the marketplace grid (e.g. Technology).",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "categories",
      title: "Subcategories / Tags",
      type: "array",
      of: [{ type: "reference", to: [{ type: "category" }] }],
      description:
        "Used for filtering on the primary category page (e.g. AI, SaaS, Startup).",
      validation: (Rule: any) => Rule.unique(),
    },

    /**
     * LEGACY / COMPAT (Unknown fields fix)
     * Dokümanlarda `category` alanı var gibi görünüyor.
     * primaryCategory varken redundant; ama schema’da tanımlı olmazsa "Unknown fields" uyarısı verir.
     */
    {
      name: "category",
      title: "Category (Legacy)",
      type: "reference",
      to: [{ type: "category" }],
      description: "Legacy field for backward compatibility.",
    },

    //
    // PRICING / COMMERCE
    //
    // {
    //   name: "isFree",
    //   title: "Is Free",
    //   type: "boolean",
    //   initialValue: false,
    // },
    // {
    //   name: "price",
    //   title: "Price",
    //   // Senin verinde "100" string geliyor. İstersen type: "number" yapıp migrasyonla düzeltiriz.
    //   type: "string",
    //   description: "Example: '100' (USD) or '99'.",
    // },
    {
      name: "relatedServices",
      title: "Related Services",
      type: "array",
      of: [{ type: "string" }],
      description: "Example: ['web-design', 'seo', 'automation']",
      options: { layout: "tags" },
    },
    {
      name: "templateType",
      title: "Template Type",
      type: "string",
      initialValue: "agency",
      options: {
        list: [
          { title: "None", value: "none" },
          { title: "Agency", value: "agency" },
          { title: "SaaS", value: "saas" },
          { title: "Portfolio", value: "portfolio" },
          { title: "E-commerce", value: "ecommerce" },
          { title: "Landing Page", value: "landing" },
          { title: "Other", value: "other" },
        ],
      },
    },

    //
    // CONTENT
    //
    { name: "description", title: "Short Description", type: "text" },

    // Rich content (blockContent)
    { name: "about", title: "About this Template", type: "blockContent" },
    { name: "perfectFor", title: "Perfect For", type: "blockContent" },
    { name: "features", title: "Template Features", type: "blockContent" },

    /**
     * EXTRA BLOCKS (Unknown fields fix)
     * Senin dokümanda templateBlocks block array olarak geliyor.
     */
    {
      name: "templateBlocks",
      title: "Template Blocks",
      type: "blockContent",
      description:
        "Optional extra blocks used by some templates (legacy/custom).",
    },

    //
    // MEDIA
    //
    {
      name: "thumbnails",
      title: "Screenshots",
      type: "array",
      of: [{ type: "image" }],
      validation: (Rule: any) => Rule.min(1),
    },

    //
    // TAGS (string tags, optional)
    //
    { name: "tags", title: "Tags", type: "array", of: [{ type: "string" }] },

    //
    // LIVE DEMO
    //
    {
      name: "demoUrl",
      title: "Live Demo URL",
      type: "url",
      validation: (Rule: any) => Rule.required(),
    },

    //
    // OPTIONAL META
    //
    { name: "pages", title: "Number of Pages", type: "number" },
    {
      name: "difficulty",
      title: "Setup Difficulty",
      type: "string",
      options: {
        list: [
          { title: "Beginner Friendly", value: "easy" },
          { title: "Intermediate", value: "medium" },
          { title: "Advanced", value: "hard" },
        ],
      },
    },
    {
      name: "colorPalette",
      title: "Color Palette",
      type: "array",
      of: [{ type: "string" }],
    },

    //
    // ANALYTICS / META (Unknown fields fix)
    //
    {
      name: "views",
      title: "Views",
      type: "number",
      initialValue: 0,
      description: "View counter (if you increment it from your app).",
    },
    {
      name: "updatedAt",
      title: "Updated At",
      type: "datetime",
      description:
        "If you set this from your app. (Sanity already has _updatedAt internally.)",
    },

    //
    // SEO
    //
    {
      name: "seo",
      title: "SEO Settings",
      type: "object",
      fields: [
        { name: "metaTitle", type: "string", title: "Meta Title" },
        { name: "metaDescription", type: "text", title: "Meta Description" },
        {
          name: "keywords",
          type: "string",
          title: "Keywords (comma separated)",
        },
        { name: "serpSnippet", type: "text", title: "SERP Snippet Override" },
        { name: "ogImage", type: "image", title: "OpenGraph Image" },
      ],
    },
  ],
};
