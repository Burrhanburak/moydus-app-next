"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import React, { useMemo, useRef } from "react";
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

export default function GridTemplate(): JSX.Element {
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

function ParallaxColumn({
  column,
  rootRef,
}: {
  column: Column;
  rootRef: React.RefObject<HTMLElement>;
}): JSX.Element {
  // Delay parallax start until the row enters deeper into viewport
  const { scrollYProgress } = useScroll({
    target: rootRef,
    offset: ["start 0.98", "end 1"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -600 * (column.parallax ?? 0.3)]
  );

  return (
    <motion.div
      style={{ y }}
      className="w-[120px] md:w-[200px] lg:w-[360px] flex flex-col items-center gap-2 flex-shrink-0"
    >
      {column.items.map((card, i) => (
        <CardItem key={i} card={card} />
      ))}
    </motion.div>
  );
}
function CardItem({ card }: { card: Card }): JSX.Element {
  const { media } = card;

  // Calculate responsive image width based on container size
  // Mobile: 120px, Tablet: 200px, Desktop: 360px
  // Use larger width for better quality on retina displays
  // Default to desktop size for SSR, will be optimized on client
  const imageWidth = 720; // lg: 360px * 2 for retina (default)

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
              src={r2cdn(media.src, undefined, undefined)}
              poster={
                media.poster ? cdn(media.poster, imageWidth, 80) : undefined
              }
              playsInline
              loop
              muted
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
}
