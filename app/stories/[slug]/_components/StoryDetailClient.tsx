"use client";

import { JsonLd } from "@/seo/json-ld";

interface StoryDetailClientProps {
  story: any;
  storySchema: any;
}

export default function StoryDetailClient({ story, storySchema }: StoryDetailClientProps) {
  const data = story;
  const slug = data.slug;
  
  // Title 70 karakterden kısa olmalı (Google best practice)
  const title = data.title?.length > 70 
    ? data.title.substring(0, 67) + "..." 
    : data.title || "Web Story";
  
  const description = data.description || data.snippet || data.excerpt || title;
  // Use poster_url first (already normalized URL from backend), fallback to poster, then image_url
  // Backend already returns normalized URLs, so we don't need to normalize again
  // Ensure URL is absolute (AMP requirement)
  let posterUrl = data.poster_url || data.poster || data.image_url || "";
  
  // Ensure URL is absolute (AMP requirement)
  if (posterUrl && !posterUrl.startsWith('http://') && !posterUrl.startsWith('https://')) {
    posterUrl = posterUrl.startsWith('/') 
      ? `https://cdn.moydus.com${posterUrl}`
      : `https://cdn.moydus.com/${posterUrl}`;
  }
  
  // Backend already returns normalized slide images via slides_with_images accessor
  // Use slides directly (they already have normalized URLs from backend)
  // Ensure URLs are absolute (required for AMP)
  const normalizedSlides = data.slides && Array.isArray(data.slides) 
    ? data.slides.map((slide: any) => {
        let imageUrl = slide.image || null;
        
        // Ensure URL is absolute (AMP requirement)
        if (imageUrl && !imageUrl.startsWith('http://') && !imageUrl.startsWith('https://')) {
          // If relative, make it absolute
          imageUrl = imageUrl.startsWith('/') 
            ? `https://cdn.moydus.com${imageUrl}`
            : `https://cdn.moydus.com/${imageUrl}`;
        }
        
        return {
          ...slide,
          image: imageUrl,
        };
      })
    : [];
  
  // If no poster URL, use first slide image as fallback
  if (!posterUrl && normalizedSlides.length > 0 && normalizedSlides[0]?.image) {
    posterUrl = normalizedSlides[0].image;
  }
  
  // Debug: log image URLs in development
  if (process.env.NODE_ENV === "development") {
    console.log("🖼️ Story Image Debug:", {
      poster_url: data.poster_url,
      poster: data.poster,
      finalPosterUrl: posterUrl,
      posterUrlEmpty: !posterUrl,
      rawSlides: data.slides,
      normalizedSlides,
      firstSlideImage: normalizedSlides[0]?.image,
    });
  }

  // Ensure logo is at least 96x96 (Google requirement)
  const logoUrl = "https://www.moydus.com/logo.png";

  return (
    <>
      <JsonLd data={storySchema} />
      {/* AMP runtime scripts */}
      <script async src="https://cdn.ampproject.org/v0.js" />
      <script
        async
        custom-element="amp-story"
        src="https://cdn.ampproject.org/v0/amp-story-1.0.js"
      />
      
      <amp-story
        standalone
        title={title}
        publisher="Moydus LLC"
        publisher-logo-src={logoUrl}
        poster-portrait-src={posterUrl || undefined}
        poster-square-src={posterUrl || undefined}
        poster-landscape-src={posterUrl || undefined}
      >
        {normalizedSlides.map((slide: any, i: number) => (
          <amp-story-page id={`page-${i}`} key={i}>
            <amp-story-grid-layer template="fill">
              {slide.image ? (
                <amp-img
                  src={slide.image}
                  width="720"
                  height="1280"
                  layout="responsive"
                  alt={slide.text || title}
                />
              ) : (
                // Fallback: solid color background if no image
                <div style={{ 
                  width: "100%", 
                  height: "100%", 
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" 
                }} />
              )}
            </amp-story-grid-layer>

            {/* Text layer - Max 280 chars per page (Google best practice) */}
            {slide.text && (
              <amp-story-grid-layer template="vertical" style={{ padding: "20px" }}>
                <p 
                  style={{ 
                    color: "white", 
                    fontSize: "24px",
                    fontWeight: "600",
                    lineHeight: "1.4",
                    textShadow: "0 2px 4px rgba(0,0,0,0.5)",
                    maxWidth: "100%",
                    wordWrap: "break-word",
                  }}
                >
                  {slide.text.length > 280 ? slide.text.substring(0, 277) + "..." : slide.text}
                </p>
              </amp-story-grid-layer>
            )}
          </amp-story-page>
        ))}
        
        {/* Story bookend with close option */}
        <amp-story-bookend layout="nodisplay">
          <script type="application/json">
            {JSON.stringify({
              bookendVersion: "v1.0",
              shareProviders: [],
              components: [
                {
                  type: "heading",
                  text: "Story Ended",
                },
                {
                  type: "cta-link",
                  links: [
                    {
                      text: "← Back to Stories",
                      url: "/stories",
                    },
                  ],
                },
              ],
            })}
          </script>
        </amp-story-bookend>
      </amp-story>
      
      {/* Story action buttons - positioned on the left */}
      <div 
        id="story-action-buttons"
        style={{
          position: 'fixed',
          top: '15px',
          left: '15px',
          zIndex: 10000,
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}
      >
        {/* Close button */}
        <button
          id="story-close-button"
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            border: '2px solid rgba(255, 255, 255, 0.4)',
            transition: 'all 0.2s ease',
            WebkitTapHighlightColor: 'transparent',
            padding: 0,
            margin: 0,
          }}
          onClick={() => {
            if (typeof window !== 'undefined') {
              window.location.href = '/stories';
            }
          }}
          onTouchStart={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
            e.currentTarget.style.transform = 'scale(0.95)';
          }}
          onTouchEnd={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
            e.currentTarget.style.transform = 'scale(1)';
          }}
          role="button"
          aria-label="Close story"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {/* Share button */}
        <button
          id="story-share-button"
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            border: '2px solid rgba(255, 255, 255, 0.4)',
            transition: 'all 0.2s ease',
            WebkitTapHighlightColor: 'transparent',
            padding: 0,
            margin: 0,
          }}
          onClick={async () => {
            if (typeof window !== 'undefined' && navigator.share) {
              try {
                await navigator.share({
                  title: title,
                  text: description,
                  url: window.location.href,
                });
              } catch (err) {
                // User cancelled or share failed, fallback to copy
                if (err instanceof Error && err.name !== 'AbortError') {
                  // Copy to clipboard as fallback
                  await navigator.clipboard.writeText(window.location.href);
                  alert('Link copied to clipboard!');
                }
              }
            } else {
              // Fallback: copy to clipboard
              if (typeof window !== 'undefined') {
                await navigator.clipboard.writeText(window.location.href);
                alert('Link copied to clipboard!');
              }
            }
          }}
          onTouchStart={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
            e.currentTarget.style.transform = 'scale(0.95)';
          }}
          onTouchEnd={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
            e.currentTarget.style.transform = 'scale(1)';
          }}
          role="button"
          aria-label="Share story"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="18" cy="5" r="3"></circle>
            <circle cx="6" cy="12" r="3"></circle>
            <circle cx="18" cy="19" r="3"></circle>
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
          </svg>
        </button>
      </div>
      
      {/* Mobile responsive styles */}
      <style jsx global>{`
        /* Hide navbar on mobile ONLY when amp-story is present (story detail page) */
        @media (max-width: 768px) {
          /* Use :has() selector to only hide navbar when amp-story exists */
          body:has(amp-story) header,
          body:has(amp-story) nav,
          body:has(amp-story) [data-navbar],
          body:has(amp-story) [data-header],
          body:has(amp-story) [role="navigation"],
          body:has(amp-story) nav[aria-label],
          body:has(amp-story) header > nav {
            display: none !important;
            visibility: hidden !important;
            opacity: 0 !important;
            height: 0 !important;
            overflow: hidden !important;
          }
          
          amp-story {
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            width: 100vw !important;
            height: 100vh !important;
            max-width: 100% !important;
            max-height: 100% !important;
            z-index: 1;
          }
        }
        
        /* Story action buttons container */
        #story-action-buttons {
          pointer-events: auto;
        }
        
        /* Button hover effects */
        #story-close-button:hover,
        #story-share-button:hover {
          background-color: rgba(0, 0, 0, 0.8) !important;
        }
        
        #story-close-button:active,
        #story-share-button:active {
          background-color: rgba(0, 0, 0, 0.9) !important;
          transform: scale(0.95) !important;
        }
        
        /* Ensure buttons are always visible and clickable */
        #story-close-button,
        #story-share-button {
          pointer-events: auto;
          -webkit-tap-highlight-color: transparent;
        }
      `}</style>
    </>
  );
}
