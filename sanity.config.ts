import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";

import category from "./schemas/category";
import template from "./schemas/template";
import blockContent from "./schemas/blockContent";

export default defineConfig({
  name: "default",
  title: "Moydus Templates",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "YOUR_PROJECT_ID",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  plugins: [structureTool(), visionTool()],
  schema: {
    types: [category, template, blockContent],
  },
});
