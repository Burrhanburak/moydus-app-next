"use client";

import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import React, { useMemo, useRef, useEffect, useCallback, memo } from "react";
import Image from "next/image";
import { cdn, r2cdn } from "@/lib/cdn";

type Media = {
  type: "image" | "video";
  src: string;
  poster?: string;
  aspect?: number; // width / height
};

type Card = {
  media: Media;
};

type Column = {
  items: Card[];
  parallax?: number; // multiplier for y transform
};

export default function GridTemplate(): React.JSX.Element {
  const columns: Column[] = useMemo(
    () => [
      {
        parallax: 0.18,
        items: [
          {
            media: {
              type: "image",
              src: "/grid/grid1.png",
              aspect: 720 / 900,
            },
          },
          {
            media: {
              type: "image",
              src: "/grid/grid2.png",
              aspect: 720 / 540,
            },
          },
          {
            media: {
              type: "image",
              src: "/ai.png",
              aspect: 720 / 540,
            },
          },
          {
            media: {
              type: "image",
              src: "/grid/grid4.png",
              aspect: 720 / 960,
            },
          },
        ],
      },
      {
        parallax: 0.25,
        items: [
          {
            media: {
              type: "image",

              src: "/grid/grid20.png",
              aspect: 720 / 960,
            },
          },

          {
            media: {
              type: "video",
              src: "/grid/gridvideo1..mp4",
              poster: "/grid/grid6.png",
              aspect: 720 / 1040,
            },
          },

          {
            media: {
              type: "image",
              src: "/grid/grid9.png",
              aspect: 740 / 1260,
            },
          },
        ],
      },
      {
        parallax: 0.4,
        items: [
          {
            media: {
              type: "video",
              src: "/grid/gridvideo-2.mp4",
              poster: "/grid/grid10.png",
              aspect: 1,
            },
          },
          {
            media: {
              type: "image",
              src: "/grid/grid11.png",
              aspect: 720 / 780,
            },
          },
          {
            media: {
              type: "video",
              src: "/grid/grid-video3.mp4",
              poster: "/grid/grid13.png",
              aspect: 720 / 840,
            },
          },
          {
            media: {
              type: "image",
              src: "/grid/grid14.png",
              aspect: 480 / 1039,
            },
          },
        ],
      },
      {
        parallax: 0.2,
        items: [
          {
            media: {
              type: "image",
              src: "/grid/grid16.png",
              aspect: 480 / 987,
            },
          },
          {
            media: {
              type: "video",
              src: "/grid/gridvideo-4.mp4",
              poster: "/grid/grid17.png",
              aspect: 400 / 864,
            },
          },
        ],
      },
      {
        parallax: 0.12,
        items: [
          {
            media: {
              type: "image",
              src: "/grid/grid18.png",
              aspect: 720 / 852,
            },
          },
          {
            media: {
              type: "image",
              src: "/grid/grid19.png",
              aspect: 720 / 578,
            },
          },
          {
            media: {
              type: "image",
              src: "/grid/grid8.png",
              aspect: 720 / 1290,
            },
          },
        ],
      },
    ],
    []
  );

  const rowRef = useRef<HTMLDivElement>(null);

  return (
    <section
      className="grid-section mx-auto  px-4 md:px-0"
      style={{ position: "relative" }}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @media (max-width: 809.98px) {
              .grid-section {width: 380px !important; margin-left: auto; margin-right: auto;         height: 580px !important; }
              .grid-row { width: 100% !important; }
            }
            @media (min-width: 810px) {
              .grid-section { width: 100% !important; }
              .grid-row { width: min-content !important; gap: 4px !important; }
            }
            @media (min-width: 1200px) {
              .grid-section { width: 1600px !important; }
              .grid-row { gap: 4px !important; }
            }
          `,
        }}
      />
      <div className="flex flex-col items-center py-8 md:py-12">
        <div
          ref={rowRef}
          className="grid-row flex flex-row items-start justify-center md:gap-4"
        >
          {columns.map((col, idx) => (
            <ParallaxColumn key={idx} column={col} rootRef={rowRef} />
          ))}
        </div>
      </div>
    </section>
  );
}

const ParallaxColumn = memo(function ParallaxColumn({
  column,
  rootRef,
}: {
  column: Column;
  rootRef: React.RefObject<HTMLDivElement | null>;
}): React.JSX.Element {
  const shouldReduceMotion = useReducedMotion();

  // Delay parallax start until the row enters deeper into viewport
  // Using smoother offset for better scroll performance
  const { scrollYProgress } = useScroll({
    target: rootRef,
    offset: ["start 0.95", "end 0.05"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [0, -600 * (column.parallax ?? 0.3)],
    {
      clamp: false, // Allow smooth scrolling without clamping
    }
  );

  return (
    <motion.div
      style={{
        y,
        willChange: shouldReduceMotion ? "auto" : "transform",
      }}
      className="w-[120px] md:w-[200px] lg:w-[360px] flex flex-col items-center gap-2 flex-shrink-0"
    >
      {column.items.map((card, i) => (
        <CardItem key={i} card={card} />
      ))}
    </motion.div>
  );
});
const CardItem = memo(function CardItem({
  card,
}: {
  card: Card;
}): React.JSX.Element {
  const { media } = card;
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Calculate responsive image width based on container size
  // Mobile: 120px, Tablet: 200px, Desktop: 360px
  // Use larger width for better quality on retina displays
  // Default to desktop size for SSR, will be optimized on client
  const imageWidth = 720; // lg: 360px * 2 for retina (default)

  // Optimized video play handler with useCallback
  const handleVideoPlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.readyState >= 2) {
      // Video has loaded enough data
      video.play().catch(() => {
        // Ignore autoplay errors - browser policy
      });
    } else {
      const playOnLoad = () => {
        video.play().catch(() => {
          // Ignore autoplay errors
        });
      };
      video.addEventListener("loadeddata", playOnLoad, { once: true });
      video.addEventListener("canplay", playOnLoad, { once: true });
    }
  }, []);

  // Video autoplay with Intersection Observer - optimized for Next.js 16
  useEffect(() => {
    if (media.type !== "video" || !videoRef.current || !containerRef.current) {
      return;
    }

    const video = videoRef.current;
    const container = containerRef.current;

    // Intersection Observer callback - optimized with useCallback pattern
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Video is visible, try to play
          handleVideoPlay();
        } else {
          // Video is not visible, pause to save resources
          video.pause();
        }
      });
    };

    // Intersection Observer with optimized options
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.1, // Trigger when 10% of video is visible
      rootMargin: "50px", // Start loading slightly before it's fully visible
    });

    observer.observe(container);

    // Fallback: check if already visible using requestAnimationFrame for better performance
    const checkVisibility = () => {
      if (typeof window === "undefined") return;

      requestAnimationFrame(() => {
        const rect = container.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

        if (isVisible) {
          handleVideoPlay();
        }
      });
    };

    // Use requestIdleCallback if available, otherwise setTimeout
    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      (
        window as Window & { requestIdleCallback: typeof requestIdleCallback }
      ).requestIdleCallback(checkVisibility, { timeout: 2000 });
    } else {
      setTimeout(checkVisibility, 100);
    }

    return () => {
      observer.disconnect();
    };
  }, [media.type, media.src, handleVideoPlay]);

  return (
    <motion.div
      initial={{ y: 24, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ type: "spring", stiffness: 160, damping: 20, mass: 0.6 }}
      className="mx-auto flex-shrink-0 rounded-xl"
      style={{
        backgroundColor: "#000",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "16px",
        padding: "0px",
        boxShadow: "0 30px 60px rgba(0,0,0,0.55), 0 12px 24px rgba(0,0,0,0.35)", // Ana gölge
        overflow: "hidden",
      }}
    >
      {/* Media Container */}
      <div
        ref={containerRef}
        className="relative w-[120px] md:w-[200px] lg:w-[360px]"
        style={{
          paddingTop: media.aspect ? `${100 / media.aspect}%` : "100%",
          background: "#000",
        }}
      >
        <div className="absolute inset-0">
          {media.type === "image" ? (
            <Image
              src={cdn(media.src, imageWidth, 80)}
              width={100}
              height={100}
              loading={media.src === "/grid/grid4.png" ? "eager" : "lazy"}
              fetchPriority={media.src === "/grid/grid4.png" ? "high" : "auto"}
              alt="Template showcase gallery"
              unoptimized
              sizes="(max-width: 768px) 120px, (max-width: 1024px) 200px, 360px"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
                borderRadius: "16px",
              }}
            />
          ) : (
            <video
              ref={videoRef}
              src={r2cdn(media.src, undefined, undefined)}
              poster={
                media.poster ? cdn(media.poster, imageWidth, 80) : undefined
              }
              playsInline
              loop
              muted
              preload="metadata"
              autoPlay
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "16px",
              }}
            />
          )}

          {/* Alttan Gradient (Framer Tarzı) */}
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              height: "45%",
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.45) 40%, rgba(0,0,0,0.85) 100%)",
              pointerEvents: "none",
            }}
          />
        </div>
      </div>
    </motion.div>
  );
});
