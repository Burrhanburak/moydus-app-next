import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// Validate projectId - must only contain a-z, 0-9 and dashes
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const isValidProjectId = projectId && projectId !== 'YOUR_PROJECT_ID' && /^[a-z0-9-]+$/.test(projectId);

let client: ReturnType<typeof createClient> | null = null;
let builder: ReturnType<typeof imageUrlBuilder> | null = null;

try {
  if (isValidProjectId) {
    client = createClient({
      projectId,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
      useCdn: true,
      apiVersion: '2024-01-01',
    });
    builder = imageUrlBuilder(client);
  }
} catch (error) {
  // Silently fail if Sanity client cannot be created
  console.warn('[Sanity] Failed to initialize client:', error);
  client = null;
  builder = null;
}

export { client };

export function urlFor(source: any) {
  if (!builder) {
    console.warn('[Sanity] Client not initialized - missing valid projectId');
    return { url: () => '' };
  }
  return builder.image(source);
}

