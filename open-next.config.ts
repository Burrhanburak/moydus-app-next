import { defineConfig } from "@opennextjs/cloudflare";

export default defineConfig({
  // Cloudflare Pages configuration
  buildCommand: "next build",
  packageJsonPath: "./package.json",
});

