import { defineConfig } from "@opennextjs/cloudflare";

export default defineConfig({
  // Cloudflare Pages configuration
  buildCommand: "next build",
  packageJsonPath: "./package.json",
  // Output directory for Cloudflare Pages
  outputDir: ".vercel/output/static",
});

