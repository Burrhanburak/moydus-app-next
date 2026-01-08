/**
 * Cloudflare R2 Image URL Helper
 * 
 * Converts relative image paths or full URLs to Cloudflare R2 URLs
 * for better performance and CDN delivery.
 */

// R2 Public URL Configuration
// Custom domain (recommended): https://cdn.moydus.com
// R2 endpoint: https://{account-id}.r2.cloudflarestorage.com/{bucket-name}
// 
// IMPORTANT: Custom domain format depends on R2 configuration
// Option 1: Custom domain WITH bucket name in path: https://cdn.moydus.com/moydus/blog-posts/...
// Option 2: Custom domain WITHOUT bucket name: https://cdn.moydus.com/blog-posts/...
// 
// Based on user's working URL: https://cdn.moydus.com/moydus/blog-posts/...
// So bucket name IS in the path for custom domain
const R2_PUBLIC_URL = process.env.NEXT_PUBLIC_R2_PUBLIC_URL || 
  process.env.R2_PUBLIC_URL || 
  'https://cdn.moydus.com'; // Default to custom domain

// Bucket name (used in paths)
const BUCKET_NAME = 'moydus';

// Check if custom domain is used (doesn't contain r2.cloudflarestorage.com)
const IS_CUSTOM_DOMAIN = !R2_PUBLIC_URL.includes('r2.cloudflarestorage.com');

/**
 * Normalize image URL to use Cloudflare R2
 * 
 * @param imageUrl - Image URL from API (can be relative, absolute, or already R2)
 * @returns Normalized R2 URL
 * 
 * Examples:
 * - '/storage/images/photo.jpg' -> 'https://...r2.cloudflarestorage.com/moydus/storage/images/photo.jpg'
 * - 'https://example.com/image.jpg' -> 'https://...r2.cloudflarestorage.com/moydus/image.jpg' (if from same domain)
 * - Already R2 URL -> returns as-is
 */
export function getR2ImageUrl(imageUrl: string | null | undefined): string | null {
  if (!imageUrl) return null;

  // Debug logging
  if (process.env.NODE_ENV === 'development') {
    console.log('🖼️ [R2] Input URL:', imageUrl);
  }

  // If already a full R2 URL, return as-is
  if (imageUrl.includes('r2.cloudflarestorage.com') || imageUrl.includes('cdn.moydus.com')) {
    // Check if URL already has bucket name in path
    const urlObj = new URL(imageUrl);
    const pathParts = urlObj.pathname.split('/').filter(Boolean);
    
    // If bucket name is already in path (e.g., /moydus/blog-posts/...), return as-is
    if (pathParts[0] === BUCKET_NAME) {
      if (process.env.NODE_ENV === 'development') {
        console.log('🖼️ [R2] Already R2 URL with bucket name, returning as-is');
      }
      return imageUrl;
    }
    
    // If URL is from cdn.moydus.com but doesn't have bucket name, add it
    if (imageUrl.includes('cdn.moydus.com') && pathParts[0] !== BUCKET_NAME) {
      const newPath = `/${BUCKET_NAME}${urlObj.pathname}`;
      const finalUrl = `${urlObj.origin}${newPath}${urlObj.search}${urlObj.hash}`;
      if (process.env.NODE_ENV === 'development') {
        console.log('🖼️ [R2] Adding bucket name to CDN URL:', { original: imageUrl, final: finalUrl });
      }
      return finalUrl;
    }
    
    if (process.env.NODE_ENV === 'development') {
      console.log('🖼️ [R2] Already R2 URL, returning as-is');
    }
    return imageUrl;
  }

  // If it's already a full URL (http/https), check if it's from our domain
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    // If it's from our Laravel backend, convert to R2
    const url = new URL(imageUrl);
    
    // Check if it's from our backend (moy-app.test, localhost, or production domain)
    if (url.hostname.includes('moy-app.test') || 
        url.hostname.includes('localhost') || 
        url.hostname.includes('moydus.com')) {
      // Extract path and convert to R2
      let path = url.pathname;
      
      // Remove leading slash if present
      const cleanPath = path.startsWith('/') ? path.slice(1) : path;
      
      // RichEditor attachments are typically in blog-posts/ directory
      // Format should be: https://cdn.moydus.com/moydus/blog-posts/{filename}
      // If path already starts with bucket name, don't duplicate
      let finalUrl: string;
      if (!cleanPath.startsWith(`${BUCKET_NAME}/`)) {
        finalUrl = `${R2_PUBLIC_URL}/${BUCKET_NAME}/${cleanPath}`;
      } else {
        finalUrl = `${R2_PUBLIC_URL}/${cleanPath}`;
      }
      
      if (process.env.NODE_ENV === 'development') {
        console.log('🖼️ [R2] Converted:', { original: imageUrl, final: finalUrl });
      }
      
      return finalUrl;
    }
    
    // External URL, return as-is
    return imageUrl;
  }

  // Relative path - prepend R2 base URL with bucket name
  const cleanPath = imageUrl.startsWith('/') ? imageUrl.slice(1) : imageUrl;
  
  // Check if this is just a filename (no path separators)
  // RichEditor attachments are stored in blog-posts/ directory
  // If URL is just a filename like "01KBN0H67F5AH8TMHWFRZA8VXV.png",
  // we need to prepend "blog-posts/"
  let finalPath = cleanPath;
  
  // If it's just a filename (no slashes), assume it's from RichEditor blog-posts directory
  if (!cleanPath.includes('/') && !cleanPath.startsWith(`${BUCKET_NAME}/`)) {
    // Check if it looks like a RichEditor attachment (long alphanumeric filename)
    // or if it's a common image extension
    const isImageFile = /\.(jpg|jpeg|png|gif|webp|svg|bmp|ico)$/i.test(cleanPath);
    if (isImageFile) {
      finalPath = `blog-posts/${cleanPath}`;
      if (process.env.NODE_ENV === 'development') {
        console.log('🖼️ [R2] Detected RichEditor attachment, prepending blog-posts/');
      }
    }
  }
  
  // RichEditor paths might be like: "blog-posts/image.png" or "/blog-posts/image.png"
  // For custom domain WITH bucket name: "https://cdn.moydus.com/moydus/blog-posts/image.png"
  // For R2 endpoint: "https://...r2.cloudflarestorage.com/moydus/blog-posts/image.png"
  let finalUrl: string;
  
  // Always include bucket name in path (both custom domain and R2 endpoint)
  if (!finalPath.startsWith(`${BUCKET_NAME}/`)) {
    finalUrl = `${R2_PUBLIC_URL}/${BUCKET_NAME}/${finalPath}`;
  } else {
    finalUrl = `${R2_PUBLIC_URL}/${finalPath}`;
  }
  
  if (process.env.NODE_ENV === 'development') {
    console.log('🖼️ [R2] Relative path converted:', { 
      original: imageUrl, 
      cleanPath,
      finalPath,
      final: finalUrl,
      isCustomDomain: IS_CUSTOM_DOMAIN,
      r2PublicUrl: R2_PUBLIC_URL,
      bucketName: BUCKET_NAME,
    });
  }
  
  return finalUrl;
}

/**
 * Get optimized image URL with optional transformations
 * Cloudflare R2 + Cloudflare Images can be used for transformations
 * 
 * @param imageUrl - Image URL
 * @param options - Optional transformation options
 * @returns Optimized R2 URL
 */
export function getOptimizedImageUrl(
  imageUrl: string | null | undefined,
  options?: {
    width?: number;
    height?: number;
    quality?: number;
    format?: 'webp' | 'avif' | 'jpeg' | 'png';
  }
): string | null {
  const r2Url = getR2ImageUrl(imageUrl);
  if (!r2Url) return null;

  // If Cloudflare Images is configured, add transformations
  // For now, just return the R2 URL
  // TODO: Add Cloudflare Images transformations if needed
  
  return r2Url;
}

/**
 * Process HTML content and convert all image URLs to R2 URLs
 * This is useful for RichEditor content (content_html) that contains img tags
 * 
 * @param htmlContent - HTML content string (e.g., from RichEditor)
 * @returns HTML content with all img src attributes converted to R2 URLs
 */
export function processHtmlImages(htmlContent: string | null | undefined): string {
  if (!htmlContent) return '';

  // Debug: Check if HTML contains img tags or figure tags (TipTap might use figure)
  if (process.env.NODE_ENV === 'development') {
    const hasImgTags = htmlContent.includes('<img');
    const hasEscapedImgTags = htmlContent.includes('&lt;img') || htmlContent.includes('&lt;img');
    const hasFigureTags = htmlContent.includes('<figure');
    const hasImageData = htmlContent.includes('image') || htmlContent.includes('Image');
    
    // Check for image file extensions in the content
    const imageExtensions = /\.(jpg|jpeg|png|gif|webp|svg|bmp|ico)/gi;
    const imageFileMatches = htmlContent.match(imageExtensions);
    
    // Find all potential image-related patterns
    const imgPatterns = [
      /<img[^>]*>/gi,
      /&lt;img[^>]*&gt;/gi, // Escaped HTML
      /<figure[^>]*>.*?<\/figure>/gi,
      /data-image[^>]*/gi,
      /src\s*=\s*["'][^"']*\.(jpg|jpeg|png|gif|webp|svg)/gi,
    ];
    
    const foundPatterns: string[] = [];
    imgPatterns.forEach((pattern, idx) => {
      const matches = htmlContent.match(pattern);
      if (matches && matches.length > 0) {
        foundPatterns.push(`Pattern ${idx}: ${matches.length} matches`);
        if (matches.length <= 3) {
          foundPatterns.push(`  Examples: ${matches.slice(0, 3).map(m => m.substring(0, 100)).join(', ')}`);
        }
      }
    });
    
    // Find all occurrences of the image filename
    const imageFileName = '01KBN0H67F5AH8TMHWFRZA8VXV.png';
    const fileNameMatches = htmlContent.match(new RegExp(imageFileName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi'));
    
    // Find the context around the image filename if it exists
    let imageContext = '';
    if (fileNameMatches && fileNameMatches.length > 0) {
      const fileNameIndex = htmlContent.indexOf(imageFileName);
      if (fileNameIndex !== -1) {
        const start = Math.max(0, fileNameIndex - 200);
        const end = Math.min(htmlContent.length, fileNameIndex + imageFileName.length + 200);
        imageContext = htmlContent.substring(start, end);
      }
    }
    
    // Also search for the filename in different formats
    const allImageFilePatterns = [
      imageFileName, // 01KBN0H67F5AH8TMHWFRZA8VXV.png
      imageFileName.replace('.png', ''), // 01KBN0H67F5AH8TMHWFRZA8VXV
      `blog-posts/${imageFileName}`, // blog-posts/01KBN0H67F5AH8TMHWFRZA8VXV.png
      `/blog-posts/${imageFileName}`, // /blog-posts/01KBN0H67F5AH8TMHWFRZA8VXV.png
    ];
    
    const foundPatternsInHtml: string[] = [];
    allImageFilePatterns.forEach(pattern => {
      if (htmlContent.includes(pattern)) {
        const index = htmlContent.indexOf(pattern);
        const context = htmlContent.substring(
          Math.max(0, index - 100),
          Math.min(htmlContent.length, index + pattern.length + 100)
        );
        foundPatternsInHtml.push(`Found "${pattern}" at index ${index}: ...${context}...`);
      }
    });
    
    // Search for any image-related patterns more aggressively
    const allImagePatterns = [
      /<img[^>]*>/gi,
      /&lt;img[^>]*&gt;/gi,
      /<figure[^>]*>.*?<\/figure>/gis,
      /src\s*=\s*["'][^"']*\.(jpg|jpeg|png|gif|webp|svg)/gi,
      /data-src\s*=\s*["'][^"']*/gi,
      /data-image\s*=\s*["'][^"']*/gi,
      /background-image\s*:\s*url\([^)]+\)/gi,
      /url\([^)]*\.(jpg|jpeg|png|gif|webp|svg)[^)]*\)/gi,
    ];
    
    const foundImagePatterns: Array<{ pattern: string; matches: number; examples: string[] }> = [];
    allImagePatterns.forEach((pattern, idx) => {
      const matches = htmlContent.match(pattern);
      if (matches && matches.length > 0) {
        foundImagePatterns.push({
          pattern: `Pattern ${idx}`,
          matches: matches.length,
          examples: matches.slice(0, 3).map(m => m.substring(0, 150)),
        });
      }
    });
    
    console.log('🖼️ [processHtmlImages] Starting:', {
      htmlLength: htmlContent.length,
      hasImgTags,
      hasEscapedImgTags,
      hasFigureTags,
      hasImageData,
      imageFileMatches: imageFileMatches ? imageFileMatches.length : 0,
      fileNameMatches: fileNameMatches ? fileNameMatches.length : 0,
      foundPatterns,
      containsImageFileName: htmlContent.includes(imageFileName),
      imageContext: imageContext || 'No image filename found in HTML',
      foundPatternsInHtml: foundPatternsInHtml.length > 0 ? foundPatternsInHtml : ['No image patterns found'],
      foundImagePatterns: foundImagePatterns.length > 0 ? foundImagePatterns : [{ pattern: 'None', matches: 0, examples: [] }],
      pngReferences: (htmlContent.match(/[^"'\s]+\.png/gi) || []).slice(0, 10),
      first2000Chars: htmlContent.substring(0, 2000),
      // Check for common TipTap/RichEditor image formats
      hasTipTapImage: htmlContent.includes('tiptap-image') || htmlContent.includes('ProseMirror-selectednode'),
      hasDataAttributes: htmlContent.includes('data-') && htmlContent.includes('image'),
    });
  }

  // Most robust approach: find ALL img tags and replace src attributes
  // This handles any order of attributes: <img src="..." class="..." alt="...">
  // TipTap/RichEditor might also use <figure> tags with images inside
  let processedHtml = htmlContent;
  
  // Find all img tags using a simple regex that matches the entire tag
  // Updated regex to handle self-closing tags: <img ... /> or <img ... >
  const imgTagRegex = /<img\s+([^>]*?)(?:\/?>)/gi;
  const imgTags: Array<{ fullMatch: string; attributes: string }> = [];
  
  let match;
  while ((match = imgTagRegex.exec(htmlContent)) !== null) {
    imgTags.push({
      fullMatch: match[0],
      attributes: match[1] || '',
    });
  }
  
  // Also check for figure tags that might contain images (TipTap format)
  const figureTagRegex = /<figure[^>]*>.*?<\/figure>/gis;
  const figureTags: Array<{ fullMatch: string }> = [];
  let figureMatch;
  while ((figureMatch = figureTagRegex.exec(htmlContent)) !== null) {
    figureTags.push({ fullMatch: figureMatch[0] });
  }
  
  if (process.env.NODE_ENV === 'development') {
    console.log('🖼️ [processHtmlImages] Found figure tags:', figureTags.length);
    figureTags.forEach((tag, idx) => {
      console.log(`🖼️ [processHtmlImages] Figure ${idx + 1}:`, tag.fullMatch.substring(0, 300));
    });
  }
  
  if (process.env.NODE_ENV === 'development') {
    console.log('🖼️ [processHtmlImages] Found img tags:', imgTags.length);
    imgTags.forEach((tag, idx) => {
      console.log(`🖼️ [processHtmlImages] Tag ${idx + 1}:`, tag.fullMatch.substring(0, 200));
    });
  }
  
  // Process each img tag
  imgTags.forEach(({ fullMatch, attributes }) => {
    // Extract src attribute value (handles both " and ')
    const srcMatch = attributes.match(/\bsrc\s*=\s*["']([^"']+)["']/i);
    
    if (srcMatch) {
      const originalSrc = srcMatch[1];
      const srcAttr = srcMatch[0]; // The full src="..." attribute
      
      if (process.env.NODE_ENV === 'development') {
        console.log('🖼️ [processHtmlImages] Processing image:', {
          originalSrc,
          fullMatch: fullMatch.substring(0, 200),
        });
      }
      
      // Convert to R2 URL
      const r2Url = getR2ImageUrl(originalSrc);
      
      if (process.env.NODE_ENV === 'development') {
        console.log('🖼️ [processHtmlImages] Converted:', {
          original: originalSrc,
          r2: r2Url,
        });
      }
      
      // Replace src attribute in attributes string
      const newAttributes = attributes.replace(
        srcAttr,
        ` src="${r2Url || originalSrc}"`
      );
      
      // Replace the entire img tag (preserve self-closing format if present)
      const isSelfClosing = fullMatch.endsWith('/>');
      const newImgTag = isSelfClosing 
        ? `<img ${newAttributes} />`
        : `<img ${newAttributes}>`;
      processedHtml = processedHtml.replace(fullMatch, newImgTag);
      
      if (process.env.NODE_ENV === 'development') {
        console.log('🖼️ [processHtmlImages] Replaced:', {
          old: fullMatch.substring(0, 150),
          new: newImgTag.substring(0, 150),
        });
      }
    } else {
      if (process.env.NODE_ENV === 'development') {
        console.warn('🖼️ [processHtmlImages] No src found in img tag:', fullMatch.substring(0, 150));
      }
    }
  });
  
  // Process figure tags that contain images (TipTap/RichEditor format)
  figureTags.forEach(({ fullMatch }) => {
    // Find img tags inside figure
    const imgInFigure = fullMatch.match(/<img\s+([^>]*?)src\s*=\s*["']([^"']+)["']/i);
    if (imgInFigure && imgInFigure[2]) {
      const originalSrc = imgInFigure[2];
      const r2Url = getR2ImageUrl(originalSrc);
      
      if (r2Url && r2Url !== originalSrc) {
        const newFigureContent = fullMatch.replace(
          new RegExp(`src\\s*=\\s*["']${originalSrc.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["']`, 'i'),
          `src="${r2Url}"`
        );
        processedHtml = processedHtml.replace(fullMatch, newFigureContent);
        
        if (process.env.NODE_ENV === 'development') {
          console.log('🖼️ [processHtmlImages] Processed figure tag:', {
            originalSrc,
            r2Url,
          });
        }
      }
    }
  });

  // Debug: Check if any replacements were made
  if (process.env.NODE_ENV === 'development') {
    const originalImgCount = (htmlContent.match(/<img/gi) || []).length;
    const processedImgCount = (processedHtml.match(/<img/gi) || []).length;
    console.log('🖼️ [processHtmlImages] Finished:', {
      originalImgCount,
      processedImgCount,
      changed: htmlContent !== processedHtml,
    });
  }

  return processedHtml;
}
