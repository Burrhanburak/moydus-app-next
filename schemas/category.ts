// schemas/category.ts
export default {
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    //
    // BASIC INFO
    //
    {
      name: "title",
      title: "Category Title",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    //
    // GROUP (Framer sections)
    //
    {
      name: "group",
      title: "Category Group",
      type: "string",
      description:
        "Used to group categories like Framer (Business / Community / Creative / Style).",
      options: {
        list: [
          { title: "— None —", value: "" },
          { title: "Business Templates", value: "business" },
          { title: "Community Templates", value: "community" },
          { title: "Creative Templates", value: "creative" },
          { title: "Style Templates", value: "style" },
        ],
      },
      validation: (Rule: any) => Rule.optional(),
    },
    {
      name: "parent",
      title: "Parent Category",
      type: "reference",
      to: [{ type: "category" }],
      description:
        "If this is a subcategory, select its parent (e.g. AI → Technology, SaaS → Technology). Leave empty for main categories.",
    },
    //
    // CONTENT
    //
    {
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      description: "Short intro text for the category landing page.",
    },
    {
      name: "thumbnails",
      title: "Category Thumbnails",
      type: "array",
      of: [{ type: "image" }],
      description: "1–3 images used for marketplace cards or category headers.",
      validation: (Rule: any) => Rule.max(3),
    },
    //
    // ORDER & VISIBILITY
    //
    {
      name: "order",
      title: "Order",
      type: "number",
      description:
        "Controls display order inside its group (lower = shown first).",
    },
    {
      name: "isFeatured",
      title: "Featured Category",
      type: "boolean",
      initialValue: false,
      description:
        "Show this category in featured sections or homepage blocks.",
    },
    //
    // SEO
    //
    {
      name: "seo",
      title: "SEO Settings",
      type: "object",
      fields: [
        {
          name: "metaTitle",
          title: "Meta Title",
          type: "string",
        },
        {
          name: "metaDescription",
          title: "Meta Description",
          type: "text",
          rows: 2,
        },
        {
          name: "ogImage",
          title: "OpenGraph Image",
          type: "image",
          description: "Used for social sharing previews.",
        },
      ],
    },
  ],
  //
  // STUDIO PREVIEW (çok önemli UX)
  //
  preview: {
    select: {
      title: "title",
      group: "group",
      parentTitle: "parent.title",
      media: "thumbnails.0",
    },
    prepare({ title, group, parentTitle, media }: any) {
      const subtitle = parentTitle
        ? `${group ? group.charAt(0).toUpperCase() + group.slice(1) : "Category"} → ${parentTitle}`
        : group
          ? group.charAt(0).toUpperCase() + group.slice(1)
          : "Category";
      return {
        title,
        subtitle,
        media,
      };
    },
  },
};
