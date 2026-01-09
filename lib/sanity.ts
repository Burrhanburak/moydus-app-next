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

/**
 * Optimized Sanity image URL builder with best practices for Next.js 16
 * - Auto format conversion (WebP/AVIF)
 * - Quality optimization
 * - Responsive sizing
 * - Blur placeholder support
 */
export function urlForOptimized(
  source: any,
  options?: {
    width?: number;
    height?: number;
    quality?: number;
    format?: 'webp' | 'avif' | 'auto';
    blur?: number; // For blur placeholder (1-100)
  }
) {
  if (!builder) {
    console.warn('[Sanity] Client not initialized - missing valid projectId');
    return { url: () => '' };
  }

  const {
    width,
    height,
    quality = 85,
    format = 'auto',
    blur,
  } = options || {};

  let imageBuilder = builder.image(source);

  if (width) imageBuilder = imageBuilder.width(width);
  if (height) imageBuilder = imageBuilder.height(height);
  
  // Quality optimization
  imageBuilder = imageBuilder.quality(quality);
  
  // Auto format conversion (WebP/AVIF)
  if (format === 'auto') {
    imageBuilder = imageBuilder.auto('format');
  } else {
    imageBuilder = imageBuilder.format(format);
  }

  // Blur placeholder for better UX
  if (blur) {
    imageBuilder = imageBuilder.blur(blur);
  }

  return imageBuilder;
}

/**
 * Generate blur placeholder data URL for Sanity images
 * Returns a tiny blurred version of the image as base64 data URL
 */
export function urlForBlurPlaceholder(source: any): string {
  if (!builder) return '';
  
  return builder
    .image(source)
    .width(20)
    .height(20)
    .quality(20)
    .blur(50)
    .format('webp')
    .url();
}

