/**
 * Migration script to fix template data:
 * 1. Convert old `category` field to `categories` array
 * 2. Convert `features` string to blockContent format
 * 3. Convert `perfectFor` string to blockContent format
 * 4. Convert `about` string to blockContent format
 *
 * Run with: bunx tsx scripts/migrate-template-data.ts
 */

import { createClient } from "@sanity/client";
import { randomBytes } from "crypto";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  useCdn: false,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN || "", // You'll need to add this to .env.local
});

/**
 * Convert a string to blockContent format
 * Each line becomes a paragraph block
 */
function stringToBlockContent(text: string): Array<{
  _type: string;
  _key: string;
  style: string;
  children: Array<{
    _type: string;
    _key: string;
    text: string;
    marks: string[];
  }>;
}> {
  if (!text || typeof text !== "string" || text.trim().length === 0) {
    return [];
  }

  const lines = text
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  return lines.map((line) => {
    const blockKey = randomBytes(16).toString("hex");
    const spanKey = randomBytes(16).toString("hex");

    return {
      _type: "block",
      _key: blockKey,
      style: "normal",
      children: [
        {
          _type: "span",
          _key: spanKey,
          text: line,
          marks: [],
        },
      ],
    };
  });
}

async function migrateTemplates() {
  console.log("Fetching all templates...");

  const templates = await client.fetch(`
    *[_type == "template"]{
      _id,
      _rev,
      "oldCategory": category,
      "oldFeatures": features,
      "oldPerfectFor": perfectFor,
      "oldAbout": about,
      categories,
      features,
      perfectFor,
      about
    }
  `);

  console.log(`Found ${templates.length} templates`);

  for (const template of templates) {
    const updates: Record<string, unknown> = {};
    let needsUpdate = false;

    // Migrate category to categories
    if (
      template.oldCategory &&
      (!template.categories || template.categories.length === 0)
    ) {
      updates.categories = [template.oldCategory];
      needsUpdate = true;
      console.log(
        `  Template ${template._id}: Migrating category to categories`
      );
    }

    // Migrate features string to blockContent
    if (
      typeof template.oldFeatures === "string" &&
      template.oldFeatures.trim().length > 0
    ) {
      // Check if it's already blockContent (array)
      if (!Array.isArray(template.features)) {
        const blockContent = stringToBlockContent(template.oldFeatures);
        if (blockContent.length > 0) {
          updates.features = blockContent;
          needsUpdate = true;
          console.log(
            `  Template ${template._id}: Converting features string to blockContent (${blockContent.length} blocks)`
          );
        }
      }
    }

    // Migrate perfectFor string to blockContent
    if (
      typeof template.oldPerfectFor === "string" &&
      template.oldPerfectFor.trim().length > 0
    ) {
      // Check if it's already blockContent (array)
      if (!Array.isArray(template.perfectFor)) {
        const blockContent = stringToBlockContent(template.oldPerfectFor);
        if (blockContent.length > 0) {
          updates.perfectFor = blockContent;
          needsUpdate = true;
          console.log(
            `  Template ${template._id}: Converting perfectFor string to blockContent (${blockContent.length} blocks)`
          );
        }
      }
    }

    // Migrate about string to blockContent
    if (
      typeof template.oldAbout === "string" &&
      template.oldAbout.trim().length > 0
    ) {
      // Check if it's already blockContent (array)
      if (!Array.isArray(template.about)) {
        const blockContent = stringToBlockContent(template.oldAbout);
        if (blockContent.length > 0) {
          updates.about = blockContent;
          needsUpdate = true;
          console.log(
            `  Template ${template._id}: Converting about string to blockContent (${blockContent.length} blocks)`
          );
        }
      }
    }

    if (needsUpdate) {
      try {
        await client
          .patch(template._id)
          .set(updates)
          .unset(["category"]) // Remove old category field
          .commit();
        console.log(`  ✓ Updated template ${template._id}`);
      } catch (error) {
        console.error(`  ✗ Error updating template ${template._id}:`, error);
      }
    }
  }

  console.log("\nMigration complete!");
}

migrateTemplates().catch(console.error);
