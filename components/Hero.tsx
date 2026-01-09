"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { cdn, r2cdn } from "@/lib/cdn";

export default function Hero() {
  const [badgeVisible, setBadgeVisible] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    // Badge'i component mount olduğunda görünür yap
    const timer = setTimeout(() => {
      setBadgeVisible(true);
    }, 800); // Animasyon süresi + delay

    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="hero"
      className="hero-section"
      style={{
        background:
          "linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.45) 55%, rgba(0, 0, 0, 0.85) 100%)",

        zIndex: 5,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "5px",
        width: "100%",
        height: "100vh",
        padding: 0,
        position: "relative",
        overflow: "hidden",
        WebkitMask:
          "linear-gradient(rgba(0,0,0,0.99) 41%, #000 71%, rgba(0,0,0,0.043) 100%, transparent 100%)",
        mask: "linear-gradient(rgba(0,0,0,0.99) 41%, #000 71%, rgba(0,0,0,0.043) 100%, transparent 100%)",
      }}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @media (max-width: 809.98px) {
              .hero-section {
                width: 100% !important;
              }
            }
            @media (min-width: 810px) and (max-width: 1199.98px) {
              .hero-section {
                width: 130% !important;
              }
            }
            @media (min-width: 1200px) {
              .hero-section {
                width: 160% !important;
              }
            }
            #webgl {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              z-index: 1;
            }
            #webgl canvas {
              width: 100% !important;
              height: 100% !important;
            }
          `,
        }}
      />
      {/* Heading & Supporting Text */}
      <div
        className="heading-supporting-text"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "111px",
          width: "100%",
          height: "655px",
          padding: 0,
          position: "relative",
          overflow: "visible",
        }}
      >
        {/* Heading Container */}
        <div
          className="heading-container"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "15px",
            width: "100%",
            height: "min-content",
            padding: 0,
            position: "relative",
            overflow: "visible",
          }}
        >
          <style
            dangerouslySetInnerHTML={{
              __html: `
                @media (max-width: 809.98px) {
                  .heading-container {
                    gap: 16px;
                  }
                  .hero-h1 {
                    font-size: 60px !important;
                  }
                  .hero-subtitle {
                    width: 368px;
                    max-width: 100%;
                  }
                }
                @media (min-width: 810px) and (max-width: 1199.98px) {
                  .hero-h1 {
                    width: 440px;
                    max-width: 100%;
                  }
                  .hero-subtitle {
                    width: 460px;
                    max-width: 100%;
                  }
                }
                @media (min-width: 1200px) {
                  .hero-h1 {
                    width: 540px;
                    max-width: 100%;
                  }
                  .hero-subtitle {
                    width: 562px;
                    max-width: 100%;
                  }
                }
              `,
            }}
          />

          {/* Heading Content */}
          <div
            className="heading-content"
            style={{
              zIndex: 9,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "25px",
              width: "100%",
              maxWidth: "800px",
              height: "min-content",
              padding: "20px 0px 20px 0px",
              position: "relative",
              overflow: "visible",
            }}
          >
            {/* Main Heading */}
            <div
              className="main-heading-container"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
                width: "100%",

                padding: 0,
                position: "relative",
                overflow: "visible",
              }}
            >
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="hero-h1 text-white md:text-[48px] lg:text-[56px] font-bold leading-[1.2] md:leading-tight text-center"
              >
                Build Better Websites, Faster
              </motion.h1>

              {/* Supporting Text */}
              <motion.p className="hero-subtitle text-white/80 text-[15px] md:text-lg text-center leading-[1.5] md:leading-relaxed px-6 md:px-0">
                Moydus is a full-service <strong>software company</strong> and{" "}
                <strong>web design agency</strong> building{" "}
                <strong>high-performing websites</strong>,{" "}
                <strong>scalable e-commerce platforms</strong>,{" "}
                <strong>custom SaaS products</strong>, and{" "}
                <strong>AI-powered automation</strong> for growing brands
                worldwide.
                <br />
                <br />
                <span className="block mt-2 text-white/70">
                  Trusted by startups and teams with clear timelines, scalable
                  delivery, and measurable business outcomes.
                </span>
              </motion.p>
            </div>

            {/* Buttons */}
            <div
              className="buttons-container"
              style={{
                zIndex: 2,
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: "7px",

                padding: 0,
                position: "relative",
                overflow: "visible",
              }}
            >
              {/* Get Started Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <Link
                  href="https://app.moydus.com"
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center justify-center gap-[10px]"
                  style={{
                    borderBottomWidth: "0px",
                    borderLeftWidth: "0px",
                    borderRightWidth: "0px",
                    borderTopWidth: "0px",
                    borderColor: "rgba(0, 0, 0, 0)",
                    borderStyle: "solid",
                    backdropFilter: "none",
                    backgroundColor: "rgba(255, 255, 255, 0.85)",
                    borderRadius: "27px",
                    boxShadow: "none",
                    padding: "10px 10px 10px 15px",
                    textDecoration: "none",
                  }}
                >
                  <span className="text-sm font-medium text-black">
                    Get Started
                  </span>
                  <span
                    className="shrink-0 size-5 rounded-full grid place-items-center text-white"
                    style={{
                      backgroundColor: "rgb(0, 0, 0)",
                      mask: "radial-gradient(50% 50%, rgb(0, 0, 0) 97.7319%, rgba(0, 0, 0, 0) 100%)",
                    }}
                  >
                    <svg
                      viewBox="0 0 256 256"
                      className="w-3.5 h-3.5"
                      fill="currentColor"
                    >
                      <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z" />
                    </svg>
                  </span>
                </Link>
              </motion.div>

              {/* Learn More Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <Link
                  href="https://docs.moydus.com"
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center justify-center gap-[10px]"
                  style={{
                    borderBottomWidth: "1px",
                    borderLeftWidth: "1px",
                    borderRightWidth: "1px",
                    borderTopWidth: "1px",
                    borderColor: "rgba(255, 255, 255, 0.38)",
                    borderStyle: "solid",
                    backdropFilter: "blur(5px)",
                    backgroundColor: "rgba(138, 138, 138, 0.3)",
                    borderRadius: "27px",
                    boxShadow: "inset 0px 0px 6px 3px rgba(138, 138, 138, 0.3)",
                    padding: "10px 10px 10px 15px",
                    textDecoration: "none",
                  }}
                >
                  <span className="text-sm font-medium text-white">
                    Learn More
                  </span>
                </Link>
              </motion.div>
            </div>

            {/* Social Trust */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="social-trust"
              style={{
                zIndex: 2,
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: "15px",
                width: "100%",
                padding: 0,
                position: "relative",
                overflow: "visible",
              }}
            >
              {/* Avatars */}
              <div
                className="avatars-container"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "10px",
                  width: "min-content",
                  minWidth: "115px",
                  height: "min-content",
                  minHeight: "28px",
                  padding: 0,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {[
                  {
                    src: "/trusted/1.png",
                    marginLeft: 0,
                  },
                  {
                    src: "/trusted/2.png",
                    marginLeft: "-16px",
                  },
                  {
                    src: "/trusted/3.png",
                    marginLeft: "-16px",
                  },
                  {
                    src: "/trusted/4.png",
                    marginLeft: "-16px",
                  },
                  {
                    src: "/trusted/6.png",
                    marginLeft: "-16px",
                  },
                ].map((avatar, i) => (
                  <div
                    key={i}
                    className="rounded-full overflow-hidden flex-shrink-0 relative"
                    style={{
                      width: "28px",
                      height: "28px",
                      border: "2px solid rgba(255, 255, 255, 0.2)",
                      marginLeft: avatar.marginLeft || 0,
                    }}
                  >
                    <Image
                      src={cdn(avatar.src, 28, 75)}
                      alt="Trusted customer avatar"
                      width={28}
                      height={28}
                      loading="lazy"
                      quality={75}
                      sizes="28px"
                      unoptimized
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                ))}
              </div>

              {/* Trust Text */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="text-white text-sm md:text-base font-medium"
              >
                <span style={{ display: "inline-block" }}>Trusted</span>{" "}
                <span style={{ display: "inline-block" }}>already</span>{" "}
                <span style={{ display: "inline-block" }}>by</span>{" "}
                <span style={{ display: "inline-block" }}>1.2k+</span>
              </motion.p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Shimmer Effects */}
      <div
        className="shimmer-container"
        style={{
          zIndex: 1,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
          width: "100%",
          maxWidth: "1200px",
          height: "100vh",
          padding: "0 35px",
          position: "absolute",
          top: "calc(50% - 50vh)",
          left: "calc(50% - min(1200px, 100%) / 2)",
          overflow: "hidden",
          pointerEvents: "none",
        }}
      >
        <div
          className="shimmer-wrapper"
          style={{
            display: "flex",
            flexDirection: "row",
            flex: "1 0 0",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            width: "1px",
            height: "100vh",
            padding: 0,
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Shimmer Left */}
          <motion.div
            className="shimmer-left"
            style={{
              background:
                "linear-gradient(180deg, #fabb00 0%, #ff4d00 23.1313%, transparent 100%)",
              zIndex: 1,
              flex: "none",
              width: "2px",
              height: "100px",
              position: "absolute",
              bottom: "100px",
              left: "calc(0.0892857% - 1px)",
              overflow: "hidden",
            }}
            initial={{ opacity: 0, y: -800 }}
            animate={{
              opacity: [0, 1, 0],
              y: [100, -800, 100],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Shimmer Right */}
          <motion.div
            className="shimmer-right"
            style={{
              background:
                "linear-gradient(180deg, #fabb00 0%, #ff4d00 23.1313%, transparent 100%)",
              zIndex: 1,
              flex: "none",
              width: "2px",
              height: "200px",
              position: "absolute",
              top: "calc(50% - 100px)",
              left: "calc(99.9029% - 1px)",
              overflow: "hidden",
            }}
            initial={{ opacity: 0, y: -500 }}
            animate={{
              opacity: [0, 1, 0],
              y: [100, -500, 100],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "linear",
              delay: 0.5,
            }}
          />

          {/* Shimmer Left Side */}
          <motion.div
            className="shimmer-left-side"
            style={{
              background:
                "linear-gradient(180deg, #fabb00 0%, #ff4d00 35.5856%, transparent 100%)",
              zIndex: 1,
              flex: "none",
              width: "2px",
              height: "50px",
              position: "absolute",
              top: "calc(50% - 25px)",
              left: "calc(9.01786% - 1px)",
              overflow: "hidden",
            }}
            initial={{ opacity: 0.3, y: -314 }}
            animate={{
              opacity: [0.3, 1, 0.3],
              y: [100, -314, 100],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
              delay: 1,
            }}
          />
        </div>
      </div>

      {/* Visual Container */}
      <div
        className="visual-container"
        style={{
          zIndex: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
          width: "100%",
          height: "100vh",
          padding: 0,
          position: "absolute",
          top: 0,
          left: "0%",
          overflow: "hidden",
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: 1,
            }}
          >
            {/* <Leva hidden={true} />
            <GL hovering={hovering} /> */}
          </div>
          <div className="absolute top-0 left-0 w-full h-full z-0 shadow-2xl blur-sm"></div>
          {/* Optimized: Use MP4 video instead of GIF (26MB → 4.8MB, 82% reduction) */}
          {/* <video
            src={r2cdn("/moos-optimized.mp4")}
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center center",
              zIndex: 0,
            }}
          /> */}
        </motion.div>
      </div>
      <div
        className="relative w-full"
        style={{
          // Maintain aspect ratio using padding hack

          maskImage:
            "linear-gradient(0deg, rgba(0,0,0,0) 10%, rgba(0,0,0,1) 40%)",
          WebkitMaskImage:
            "linear-gradient(0deg, rgba(0,0,0,0) 10%, rgba(0,0,0,1) 40%)",
        }}
      ></div>

      {/* Grid Overlay */}
      <div
        className="grid-overlay"
        style={{
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
          width: "100%",
          height: "100vh",
          padding: 0,
          position: "absolute",
          top: 0,
          right: 0,
          overflow: "hidden",
          pointerEvents: "none",
        }}
      />
    </section>
  );
}
