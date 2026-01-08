// schemas/templateStats.ts
export default {
  name: "templateStats",
  title: "Template Stats",
  type: "document",
  description:
    "Keep marketplace metrics separate from Template content (views/likes/installs).",
  fields: [
    {
      name: "templateRef",
      title: "Template",
      type: "reference",
      to: [{ type: "template" }],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "views",
      title: "Views",
      type: "number",
      initialValue: 0,
      validation: (Rule: any) => Rule.min(0),
    },
    {
      name: "likes",
      title: "Likes",
      type: "number",
      initialValue: 0,
      validation: (Rule: any) => Rule.min(0),
    },
    {
      name: "installs",
      title: "Installs",
      type: "number",
      initialValue: 0,
      validation: (Rule: any) => Rule.min(0),
    },
    // Optional: last sync time if you update these from an API/cron
    {
      name: "lastSyncedAt",
      title: "Last Synced At",
      type: "datetime",
    },
  ],
  // Prevent duplicate stats documents for the same template
  // Studio'da duplicate'ı engellemek için preview ekleyelim
  preview: {
    select: {
      templateTitle: "templateRef.title",
      views: "views",
      likes: "likes",
      installs: "installs",
    },
    prepare({ templateTitle, views, likes, installs }: any) {
      return {
        title: templateTitle || "Unnamed Template",
        subtitle: `👁️ ${views || 0} | ❤️ ${likes || 0} | 📥 ${installs || 0}`,
      };
    },
  },
};

