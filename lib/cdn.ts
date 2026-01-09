/**
 * Cloudflare Images CDN Helper
 * 
 * Converts public image paths to Cloudflare Images CDN URLs
 * for optimized image delivery with automatic format conversion and resizing.
 */

// Cloudflare Images Configuration
const CLOUDFLARE_IMAGES_ACCOUNT_HASH = "AFBYEz1Zu2EiD4WrO7qTHg";
const CLOUDFLARE_IMAGES_BASE_URL = `https://imagedelivery.net/${CLOUDFLARE_IMAGES_ACCOUNT_HASH}`;

// R2 Public URL (fallback if Cloudflare Images not available)
const R2_PUBLIC_URL = process.env.NEXT_PUBLIC_R2_PUBLIC_URL || 
  process.env.R2_PUBLIC_URL || 
  'https://cdn.moydus.com';

const BUCKET_NAME = 'moydus';

// R2 prefix - görseller moydus-nextjs/grid/ altında olabilir
// Set NEXT_PUBLIC_R2_PREFIX to override (e.g., "moydus-nextjs" or "")
const R2_PREFIX = process.env.NEXT_PUBLIC_R2_PREFIX || 'moydus-nextjs';

// Check if bucket name should be included in custom domain path
// Some R2 custom domain configs require bucket name in path, some don't
// Default to false - custom domains usually don't need bucket name in path
// Set NEXT_PUBLIC_R2_INCLUDE_BUCKET_IN_PATH=true if your custom domain requires it
const INCLUDE_BUCKET_IN_PATH = process.env.NEXT_PUBLIC_R2_INCLUDE_BUCKET_IN_PATH === 'true';

/**
 * Image ID mapping for Cloudflare Images
 * When you upload images to Cloudflare Images, you get unique IDs.
 * Map your public paths to Cloudflare Images IDs here.
 * 
 * To get the ID: Upload image to Cloudflare Images → Click on image → Copy "Image ID"
 */
const CLOUDFLARE_IMAGES_ID_MAP: Record<string, string> = {
  // Grid images - Updated IDs
  "/grid/grid1.png": "da6aea57-c600-4336-c678-77f041305700", // ✅ Updated
  "/grid/grid2.png": "4679e8a4-47f7-4985-1d1c-cc5029590500", // ✅ Updated
  "/grid/grid3.png": "03f499fc-a902-4ad4-5cb4-2683ac9f0f00", // ✅ Added
  "/grid/grid4.png": "6c74ab1d-d490-4c6e-e16e-167c696bed00", // ✅ Updated
  "/grid/grid6.png": "2022be27-0729-4715-0a7e-cd8b62af8000", // ✅ Updated
  "/grid/grid8.png": "c8a6ac78-8d39-4ffb-d829-1abe61349e00", // ✅ Updated
  "/grid/grid9.png": "8c04c7fb-1908-4c7a-b813-2ed06c588700", // ✅ Updated
  "/grid/grid10.png": "dc501ae3-2576-4252-41e6-e6f45aa9ee00", // ✅ Updated (used as video poster)
  "/grid/grid11.png": "cf1ceecc-4e9d-42b9-04cd-c29da4289700", // ✅ Updated
  "/grid/grid13.png": "fe6c5b41-839f-40e6-c029-c64b87f02f00", // ✅ Updated (used as video poster)
  "/grid/grid14.png": "ee9fc87b-2531-454d-d2c8-b501eac03c00", // ✅ Updated
  "/grid/grid16.png": "105e237b-a717-4c1f-5a6f-de9cbcb0c000", // ✅ Updated
  "/grid/grid17.png": "b9491cb3-7619-48ff-1bb3-990eb235da00", // ✅ Updated (used as video poster)
  "/grid/grid18.png": "5463c2a0-5614-4d4a-f348-b9238c14bc00", // ✅ Updated
  "/grid/grid19.png": "087e7d97-0acb-4221-36b6-a47e312c1500", // ✅ Updated
  "/grid/grid20.png": "5910f810-401c-4beb-7f96-321231b51300", // ✅ Updated
  
  // Other images
  "/ai.png": "29cec669-f053-4947-58b9-0f7357bb4300", // ✅ Updated
  "/moydus.png": "7539a07d-2a21-4250-58fe-fe329e471b00", // ✅ Added
  "/grid/b2b-moy.png": "69c6b56c-cd21-4324-9527-a086662aae00", // ✅ Updated
  "/grid/b2b-moys.png": "69c6b56c-cd21-4324-9527-a086662aae00", // ✅ Added (same file, different name)
  
  // Navigation images
  "/nav-tem-1.webp": "fe43c588-1de7-4a3a-10e6-798a36ee2a00", // ✅ Added
  "/nav-temp-2.webp": "867e2a9a-77ef-45f2-9273-fe3c80928600", // ✅ Added
  "/bg-features.webp": "197f7533-b48b-44ff-1aa5-6d44449cb600", // ✅ Added
};

/**
 * Convert public image path to Cloudflare Images CDN URL
 * 
 * @param path - Image path from public folder (e.g., "/grid/grid1.png" or "grid/grid1.png")
 * @param width - Optional width for image resizing
 * @param quality - Optional quality (1-100, default: 80)
 * @param format - Optional format (auto, webp, avif, jpeg, png)
 * @returns Cloudflare Images CDN URL
 * 
 * @example
 * cdn("/grid/grid1.png", 800) 
 * // Returns: "https://imagedelivery.net/AFBYEz1Zu2EiD4WrO7qTHg/{image_id}/public?width=800&quality=80&format=auto"
 * 
 * Note: You need to upload images to Cloudflare Images first and add their IDs to CLOUDFLARE_IMAGES_ID_MAP
 */
export function cdn(
  path: string,
  width?: number,
  quality: number = 80,
  format: "auto" | "webp" | "avif" | "jpeg" | "png" = "auto"
): string {
  // Normalize path
  const pathWithSlash = path.startsWith("/") ? path : `/${path}`;
  
  // Get Cloudflare Images ID from mapping
  const imageId = CLOUDFLARE_IMAGES_ID_MAP[pathWithSlash];
  
  // If no ID found or ID is empty, fallback to R2 CDN
  if (!imageId || imageId === "") {
    // Fallback to R2 CDN (no warning needed - R2 is a valid fallback)
    // Note: R2 doesn't support transformations, so width/quality params are ignored
    return r2cdn(path);
  }
  
  // Use "public" as variant name (default variant)
  // You can create custom variants in Cloudflare Images dashboard
  const variantName = "public";
  
  // Build query string for transformations
  const params = new URLSearchParams();
  if (width) {
    params.set("width", width.toString());
  }
  params.set("quality", quality.toString());
  params.set("format", format);
  
  const queryString = params.toString();
  const url = `${CLOUDFLARE_IMAGES_BASE_URL}/${imageId}/${variantName}${queryString ? `?${queryString}` : ""}`;
  
  return url;
}

/**
 * Get R2 CDN URL (fallback if Cloudflare Images not configured)
 * 
 * @param path - Image path from public folder (e.g., "/grid/grid1.png" or "grid/grid1.png")
 * @param width - Optional width for query params
 * @param quality - Optional quality (default: 80)
 * @returns R2 CDN URL
 * 
 * Note: Custom domain (cdn.moydus.com) is already bound to the bucket,
 * so we don't need to include bucket name in the path.
 * R2 structure: moydus/grid/grid1.png
 * Custom domain URL: https://cdn.moydus.com/grid/grid1.png (bucket name not in path)
 */
export function r2cdn(
  path: string,
  width?: number,
  quality: number = 80
): string {
  // Normalize path: remove leading slash if present
  const normalizedPath = path.startsWith("/") ? path.slice(1) : path;
  
  // Build R2 path
  // R2 structure based on user's setup:
  // - If R2_PREFIX is set: {R2_PREFIX}/grid/grid1.png (e.g., moydus-nextjs/grid/grid1.png)
  // - If INCLUDE_BUCKET_IN_PATH: {BUCKET_NAME}/grid/grid1.png (e.g., moydus/grid/grid1.png)
  // - Otherwise: grid/grid1.png
  let r2Path = normalizedPath;
  
  if (R2_PREFIX && !normalizedPath.startsWith(`${R2_PREFIX}/`)) {
    // Prepend R2 prefix (e.g., moydus-nextjs)
    r2Path = `${R2_PREFIX}/${normalizedPath}`;
  } else if (INCLUDE_BUCKET_IN_PATH && !normalizedPath.startsWith(`${BUCKET_NAME}/`)) {
    // Prepend bucket name if required
    r2Path = `${BUCKET_NAME}/${normalizedPath}`;
  }
  
  // Note: R2 doesn't support transformations (resize, quality, format conversion)
  // R2 is just storage - no image processing capabilities
  // For transformations, use Cloudflare Images (cdn() function) instead
  // R2 is only used as fallback for files not in Cloudflare Images
  return `${R2_PUBLIC_URL}/${r2Path}`;
}

/**
 * Next.js Image loader for Cloudflare Images
 * This can be used with Next.js Image component's loader prop
 */
export const cloudflareImagesLoader = ({ src, width, quality }: {
  src: string;
  width: number;
  quality?: number;
}) => {
  // Remove leading slash if present
  const path = src.startsWith("/") ? src.slice(1) : src;
  
  // Use Cloudflare Images CDN
  return cdn(path, width, quality || 80, "auto");
};

