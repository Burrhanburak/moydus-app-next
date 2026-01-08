/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import {
  Loader,
  Paperclip,
  ArrowUpRight,
  ChevronDown,
  Rocket,
  Plus,
  ShieldCheck,
  MapPin,
  Flag,
} from "lucide-react";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const steps = [
  "Analyzing search results...",
  "Generating summary...",
  "Checking for relevant information...",
  "Finalizing analysis...",
  "Setting up lazy loading...",
  "Configuring caching strategies...",
  "Running performance tests...",
  "Finalizing optimizations...",
];

// One Flow Process Card
function OneFlowCard() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const items = [
    "Web design & UI planning",
    "Website and SaaS development",
    "Accessibility & performance optimization",
    "Website optimization services",
    "End-to-end delivery workflow",
    "Enterprise-grade deployment",
  ];

  useEffect(() => {
    let animationFrame: number;
    let position = 0;
    const speed = 0.3;
    const maxScroll = 200; // Adjust based on content height

    const animate = () => {
      position += speed;
      if (position > maxScroll) {
        position = 0;
      }
      setScrollPosition(position);
      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  return (
    <motion.div
      variants={cardVariants}
      className="bg-[#000000] flex flex-col gap-6 overflow-hidden rounded-xl py-6 border border-[#262626]"
    >
      <div className="flex h-[246px] items-end justify-center">
        <div className="w-full max-w-[280px] space-y-4">
          <div className="text-white/60 flex items-center gap-1.5 px-3 py-1.5 font-medium">
            <Loader className="size-5 animate-spin" aria-hidden="true" />
            <span className="text-sm">Running delivery workflow...</span>
          </div>
          <div className="relative overflow-hidden rounded-t-xl">
            <div className="bg-[#000000] relative flex h-[138px] w-full flex-col gap-2 overflow-hidden px-3 py-4">
              <motion.div
                className="flex flex-col gap-2"
                style={{
                  transform: `translateY(-${scrollPosition}px)`,
                }}
              >
                {items.map((item, index) => (
                  <motion.div
                    key={index}
                    className="text-white flex items-center text-sm font-medium"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: index * 0.3,
                      duration: 0.5,
                    }}
                  >
                    <div className="w-6 pr-3 select-none">{index + 1}.</div>
                    <div className="line-clamp-1 flex-1">{item}</div>
                  </motion.div>
                ))}
                {/* Duplicate items for seamless scroll */}
                {items.map((item, index) => (
                  <div
                    key={`duplicate-${index}`}
                    className="text-white flex items-center text-sm font-medium"
                  >
                    <div className="w-6 pr-3 select-none">{index + 1}.</div>
                    <div className="line-clamp-1 flex-1">{item}</div>
                  </div>
                ))}
              </motion.div>
            </div>
            <div className="from-[#0a0a0a] pointer-events-none absolute inset-x-0 top-0 h-12 bg-gradient-to-b to-transparent" />
          </div>
        </div>
      </div>
      <div className="space-y-4 px-6">
        <h3 className="text-2xl font-semibold text-white">
          One Workflow. From Design to Optimization.
        </h3>
        <p className="text-white/60 text-lg">
          Design, development, testing, and optimization—handled in one
          streamlined process to deliver faster, cleaner websites.
        </p>
      </div>
    </motion.div>
  );
}

// Color Contrast Validation Card
function ColorContrastCard() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const contrastCards = [
    {
      title: "Desktop",
      device: "Desktop",
      pageSpeed: "99",
      lcp: "1.2s",
      fid: "8ms",
      cls: "0.05",
      status: "success",
      bgColor: "bg-primary",
      textColor: "text-primary-foreground",
      scale: 0.8,
      bottom: 32,
    },
    {
      title: "Mobile",
      device: "Mobile",
      pageSpeed: "72",
      lcp: "2.8s",
      fid: "120ms",
      cls: "0.15",
      status: "orange",
      image: "/status-orange.jpeg",
      bgColor: "bg-secondary",
      textColor: "text-secondary-foreground",
      scale: 0.9,
      bottom: 16,
    },
    {
      title: "Mobile",
      device: "Mobile",
      pageSpeed: "45",
      lcp: "4.2s",
      fid: "280ms",
      cls: "0.25",
      status: "warning",
      bgColor: "bg-red-500",
      textColor: "text-white",
      scale: 1,
      bottom: 0,
    },
  ];

  // Auto-rotate cards continuously
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % contrastCards.length);
    }, 5000); // Change every 5 seconds (slower)

    return () => clearInterval(interval);
  }, [contrastCards.length]);

  return (
    <motion.div
      variants={cardVariants}
      className="bg-[#000000] flex flex-col gap-6 overflow-hidden rounded-xl py-6 border border-[#262626] md:max-lg:flex-row flex-1 sm:col-span-2"
    >
      <div className="flex-1">
        <div className="bg-[#000000] flex flex-col rounded-xl py-6 h-full justify-between gap-12 overflow-hidden border-0 pb-0 shadow-none md:gap-8">
          <div className="grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6">
            <div className="text-xl font-semibold text-white">
              Website Performance Optimization (PageSpeed + Core Web Vitals)
            </div>
            <div className="text-white/60 text-base">
              Improve PageSpeed scores and Core Web Vitals with performance
              checks, faster loading, and smoother UX—built for
              conversion-focused websites.
            </div>
          </div>
          <div className="relative mx-auto flex h-64 w-full max-w-lg items-end">
            {contrastCards.map((card, index) => {
              // Calculate position in the stack based on currentIndex
              const position =
                (index - currentIndex + contrastCards.length) %
                contrastCards.length;
              const isActive = position === 0;
              const isNext = position === 1;

              // Determine z-index, scale, and bottom based on position
              let zIndex = 1;
              let scale = 0.8;
              let bottom = 32;

              if (isActive) {
                zIndex = 3;
                scale = 1;
                bottom = 0;
              } else if (isNext) {
                zIndex = 2;
                scale = 0.9;
                bottom = 16;
              } else {
                zIndex = 1;
                scale = 0.8;
                bottom = 32;
              }

              return (
                <motion.div
                  key={index}
                  className="absolute inset-x-3 h-60"
                  style={{
                    transformOrigin: "center top",
                    zIndex: zIndex,
                    bottom: `${bottom}px`,
                  }}
                  animate={{
                    opacity: 1,
                    scale: scale,
                    y: 0,
                  }}
                  transition={{
                    duration: 1.2,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <motion.div
                    className="bg-[#0a0a0a] flex flex-col rounded-xl gap-0 border border-[#262626] p-0 shadow-none"
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                  >
                    <div className="overflow-hidden rounded-lg border border-[#262626]">
                      <div className="flex items-center justify-between border-b border-[#262626] px-4 py-2">
                        <h3 className="text-sm font-medium text-white">
                          {card.device}
                        </h3>
                        <div
                          className={`flex items-center gap-1 ${
                            card.status === "success"
                              ? "text-green-500"
                              : card.status === "orange"
                                ? "text-orange-500"
                                : "text-red-500"
                          }`}
                        >
                          <span className="text-sm font-medium">
                            {card.pageSpeed}
                          </span>
                          <span>
                            {card.status === "success"
                              ? "✓"
                              : card.status === "orange"
                                ? "△"
                                : "⚠"}
                          </span>
                        </div>
                      </div>
                      <div className="grid grid-cols-3">
                        <div className="flex grow items-center justify-center bg-transparent">
                          <div className="flex flex-col items-center justify-center gap-3">
                            <div className="relative flex items-center justify-center w-32 h-32">
                              <svg
                                width="128"
                                height="128"
                                viewBox="0 0 128 128"
                                className="absolute inset-0"
                              >
                                {/* Background circle */}
                                <circle
                                  cx="64"
                                  cy="64"
                                  r="56"
                                  fill="none"
                                  stroke="#262626"
                                  strokeWidth="8"
                                />
                                {/* Progress circle */}
                                <circle
                                  cx="64"
                                  cy="64"
                                  r="56"
                                  fill="none"
                                  stroke={
                                    card.status === "success"
                                      ? "#22c55e"
                                      : card.status === "orange"
                                        ? "#f97316"
                                        : "#ef4444"
                                  }
                                  strokeWidth="8"
                                  strokeLinecap="round"
                                  strokeDasharray={`${(parseInt(card.pageSpeed) / 100) * 351.86} 351.86`}
                                  strokeDashoffset="87.965"
                                  transform="rotate(-90 64 64)"
                                  className="transition-all duration-700 ease-out"
                                />
                              </svg>
                              <div
                                className={`text-6xl font-bold ${
                                  card.status === "success"
                                    ? "text-green-500"
                                    : card.status === "orange"
                                      ? "text-orange-500"
                                      : "text-red-500"
                                }`}
                              >
                                {card.pageSpeed}
                              </div>
                            </div>
                            <div className="flex items-center gap-2 text-xs">
                              <div className="flex items-center gap-1">
                                <div className="w-2 h-2 rounded-full bg-red-500" />
                                <span className="text-white/60">0-49</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <div className="w-2 h-2 rounded-full bg-orange-500" />
                                <span className="text-white/60">50-89</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <div className="w-2 h-2 rounded-full bg-green-500" />
                                <span className="text-white/60">90-100</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-span-2 border-l border-[#262626]">
                          <div className="border-b border-[#262626] p-3">
                            <div className="text-white/60 mb-2 text-xs font-medium uppercase">
                              Core Web Vitals
                            </div>
                            <div className="mb-2 flex items-center gap-2">
                              <div
                                className={`size-6 rounded border border-[#262626] ${card.bgColor}`}
                              />
                              <div className="grow truncate text-xs font-medium text-white">
                                LCP: {card.lcp}
                              </div>
                            </div>
                            <div className="bg-[#0a0a0a] overflow-visible rounded p-1 font-mono text-xs whitespace-nowrap text-white/80">
                              FID: {card.fid}
                            </div>
                          </div>
                          <div className="p-3">
                            <div className="text-white/60 mb-2 text-xs font-medium uppercase">
                              CLS Score
                            </div>
                            <div className="mb-2 flex items-center gap-2">
                              <div
                                className={`size-6 rounded border border-[#262626] bg-current ${card.textColor}`}
                              />
                              <div className="grow truncate text-xs font-medium text-white">
                                CLS: {card.cls}
                              </div>
                            </div>
                            <div className="bg-[#0a0a0a] overflow-visible rounded p-1 font-mono text-xs whitespace-nowrap text-white/80">
                              {card.device}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
            <div className="from-[#000000] pointer-events-none absolute inset-x-0 -bottom-px z-10 h-6 bg-gradient-to-t to-transparent" />
          </div>
        </div>
      </div>
      <div className="md:max-lg:w-1/2">
        <div className="bg-[#000000] flex flex-col gap-6 rounded-xl py-6 h-full justify-between overflow-hidden border-0 pb-0 shadow-none">
          <div className="grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6">
            <div className="text-xl font-semibold text-white">
              Design System Theme Registry
            </div>
            <div className="text-white/60 text-base">
              Access your personal registry of custom themes generated with the
              Theme Generator, alongside the built-in theme registry.
            </div>
          </div>
          <div className="relative z-10 flex flex-col items-center gap-10">
            <div className="bg-[#0a0a0a] w-full max-w-[280px] rounded-md border border-[#262626] px-3 text-center">
              <div className="overflow-hidden py-1">
                <p className="text-sm text-white font-mono">
                  $ we are building custom theme generator for your website
                </p>
              </div>
            </div>
            <div className="bg-[#0a0a0a] flex items-center gap-1.5 rounded-lg border border-[#262626] px-2.5 py-1.5">
              <p className="text-sm font-medium text-white">
                we are sharing real time website theme generator with you
              </p>
            </div>
            <div className="border-white/20 absolute top-[30px] left-1/2 -z-10 h-[114px] w-px border-l">
              <span className="to-white absolute -left-px h-6 w-px -translate-y-full bg-gradient-to-b from-transparent" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Targeted Visibility Card (Enterprise-friendly)
function TargetedVisibilityCard() {
  const badges = [
    {
      label: "Geo-based I18n",
      icon: MapPin,
      position: "top-8 left-[48px]",
      rotation: "-rotate-6",
      delay: 0,
    },
    {
      label: "Bot & IP",
      icon: Flag,
      position: "bottom-10 left-8",
      rotation: "rotate-6",
      delay: 0.1,
    },
    {
      label: "Rate Limiting",
      icon: Rocket,
      position: "top-8 right-5",
      rotation: "-rotate-8",
      delay: 0.2,
    },
    {
      label: "Role-Based ",
      icon: ShieldCheck,
      position: "right-10 bottom-10",
      rotation: "rotate-8",
      delay: 0.3,
    },
  ];

  return (
    <motion.div
      variants={cardVariants}
      className="bg-[#000000] flex flex-col rounded-xl border border-[#262626] py-6 h-full gap-0 pt-0 shadow-none"
    >
      <div className="relative flex h-full justify-center">
        {/* Concentric Circles */}
        <svg
          width="1em"
          height="1em"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-white pointer-events-none size-[180px] select-none"
        >
          <circle
            strokeOpacity="0.3"
            cx="100"
            cy="100"
            r="94"
            fill="var(--card)"
            stroke="var(--border)"
            strokeWidth="1.485"
            style={{
              transform: "scale(0.900122)",
              transformOrigin: "50% 50%",
              transformBox: "fill-box",
            }}
          />
          <circle
            strokeOpacity="0.6"
            cx="100"
            cy="100"
            r="76"
            fill="#000000"
            stroke="#262626"
            strokeWidth="1.485"
            style={{
              transform: "scale(0.902147)",
              transformOrigin: "50% 50%",
              transformBox: "fill-box",
            }}
          />
          <circle
            strokeOpacity="0.9"
            cx="100"
            cy="100"
            r="53"
            fill="#000000"
            stroke="#262626"
            strokeWidth="1.485"
            style={{
              transform: "scale(0.906237)",
              transformOrigin: "50% 50%",
              transformBox: "fill-box",
            }}
          />
        </svg>

        {/* Center "control" icon */}
        <div className="absolute top-1/2 -translate-y-1/2">
          <span className="relative flex shrink-0 overflow-hidden size-16 rounded-full border border-[#262626] shadow-lg bg-[#0a0a0a]">
            <span className="flex size-full items-center justify-center bg-white text-black shrink-0 rounded-sm">
              <ShieldCheck className="size-8 stroke-1" aria-hidden="true" />
            </span>
          </span>
          <span className="inline-flex shrink-0 items-center justify-center gap-1 overflow-hidden border border-transparent py-0.5 text-xs font-medium whitespace-nowrap bg-white text-black absolute top-0 right-0 size-5 rounded-full px-1">
            <Plus className="size-2.5" aria-hidden="true" />
          </span>
        </div>

        {/* Badges */}
        {badges.map((badge, index) => {
          const Icon = badge.icon;
          return (
            <motion.div
              key={index}
              className={`absolute ${badge.position} ${badge.rotation}`}
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1, margin: "-50px" }}
              animate={{ y: [0, -3, 0] }}
              transition={{
                opacity: { delay: badge.delay, duration: 0.5 },
                y: { duration: 2, repeat: Infinity, delay: badge.delay + 0.5 },
              }}
            >
              <span className="inline-flex w-fit shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#262626] text-xs font-medium whitespace-nowrap focus-visible:ring-[3px] bg-[#0a0a0a] text-white gap-2.5 px-3 py-1.5 transition-shadow duration-200 hover:shadow-sm">
                <Icon className="size-3.5" aria-hidden="true" />
                {badge.label}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Copy */}
      <div className="px-6 flex flex-col gap-4">
        <h5 className="text-2xl font-semibold text-white">
          Enterprise-friendly Launch Control for Your Website
        </h5>
        <p className="text-white/60 text-lg">
          Control feature availability with geo rules, rate limiting, and access
          controls—ensuring safe and controlled launches.
        </p>
      </div>
    </motion.div>
  );
}

// Simplify Product Management Card
function SimplifyProductCard() {
  return (
    <motion.div
      variants={cardVariants}
      className="bg-[#000000] flex flex-col gap-6 overflow-hidden rounded-xl pb-6 border border-[#262626]"
    >
      <div className="relative min-h-[284px] flex-1">
        {/* Video Background */}
        <div className="absolute inset-0 z-0 rounded-lg overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/moydus-video.mp4" type="video/mp4" />
          </video>
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/40" />
        </div>
        <Link
          href="/contact"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center justify-center gap-2 text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 hover:bg-white/60 border border-black/30 shadow-xs absolute top-6 left-6 z-10 size-[42px] rounded-full bg-black backdrop-blur-sm"
        >
          <Rocket className="size-5 text-white" aria-hidden="true" />
        </Link>
      </div>
      <div className="space-y-2 px-6">
        <h3 className="text-2xl font-semibold text-white">
          SaaS & Web Application Development, Built to Scale
        </h3>
        <p className="text-white/60 text-sm">
          Track users, monitor performance, and ship updates with confidence.
          Built for growing SaaS products and enterprise web applications.
        </p>
      </div>
    </motion.div>
  );
}

function PickToolCard() {
  const aiLogos = [
    {
      src: "https://cdn.shadcnstudio.com/ss-assets/blocks/bento-grid/image-88.png",
      alt: "Copilot AI Logo",
      delay: 0,
    },
    {
      src: "https://cdn.shadcnstudio.com/ss-assets/blocks/bento-grid/image-89.png",
      alt: "MidJourney AI Logo",
      delay: 0.125,
    },
    {
      src: "https://cdn.shadcnstudio.com/ss-assets/blocks/bento-grid/image-90.png",
      alt: "Gemini AI Logo",
      delay: 0.25,
    },
    {
      src: "https://cdn.shadcnstudio.com/ss-assets/blocks/bento-grid/image-91.png",
      alt: "Grok AI Logo",
      delay: 0.375,
    },
    {
      src: "https://cdn.shadcnstudio.com/ss-assets/blocks/bento-grid/image-92.png",
      alt: "Claude AI Logo",
      delay: 0.5,
    },
    {
      src: "https://cdn.shadcnstudio.com/ss-assets/blocks/bento-grid/image-93.png",
      alt: "Open AI Logo",
      delay: 0.625,
    },
    {
      src: "https://cdn.shadcnstudio.com/ss-assets/blocks/bento-grid/image-98.png",
      alt: "Perplexity AI Logo",
      delay: 0.75,
    },
    {
      src: "https://cdn.shadcnstudio.com/ss-assets/blocks/bento-grid/image-99.png",
      alt: "DeepSeek AI Logo",
      delay: 0.875,
    },
  ];

  const path =
    "M 151.082 1.08203 L 257.148 45.016 L 301.082 151.082 L 257.148 257.148 L 151.082 301.082 L 45.016 257.148 L 1.08203 151.082 L 45.016 45.016 L 151.082 1.08203 Z";

  return (
    <motion.div
      variants={cardVariants}
      className="bg-[#000000] group flex flex-col gap-6 overflow-hidden rounded-xl py-6 border border-[#262626] max-lg:order-1"
    >
      <div className="relative h-[246px] overflow-hidden">
        <svg
          width="143"
          height="100"
          viewBox="0 0 143 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute top-0 left-1/2 -translate-x-1/2"
        >
          <path
            d="M0.5 42.9458V0.5H142.5V42.9458L71.1411 99.2143L0.5 42.9458Z"
            fill="#000000"
            fillOpacity="0.3"
            stroke="#262626"
          />
        </svg>
        <div className="bg-[#262626] absolute top-[100px] left-1/2 h-[146px] w-px -translate-x-1/2" />
        <div
          className="absolute top-[60px] left-1/2 grid size-20 -translate-x-1/2 place-content-center rounded-md border border-[#262626] bg-black shadow-xl  "
          style={{
            filter:
              "drop-shadow(0 10px 20px rgba(255, 255, 255, 0.25)) drop-shadow(0 6px 12px rgba(255, 255, 255, 0.0)) drop-shadow(0 3px 6px rgba(255, 255, 255, 0.10))",
          }}
        >
          <Image
            src="/m.svg"
            alt="Moydus"
            width={100}
            height={100}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 filter drop-shadow-lg shadow-white/20 -translate-y-1/2 object-contain scale-70"
          />
        </div>
        {/* Animated AI Logos */}
        <div className="absolute top-10 right-1/2 -translate-x-[58px]">
          <svg
            width="303"
            height="303"
            viewBox="0 0 303 303"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M151.082 1.08203L257.148 45.016L301.082 151.082L257.148 257.148L151.082 301.082L45.016 257.148L1.08203 151.082L45.016 45.016L151.082 1.08203Z"
              stroke="#262626"
              strokeWidth="2"
              fill="#000000"
              fillOpacity="0.3"
            />
          </svg>
          {aiLogos.map((logo, index) => (
            <motion.div
              key={index}
              className="absolute top-0 left-0"
              style={{
                offsetPath: `path("${path}")`,
                offsetRotate: "0deg",
                offsetDistance: `${10.9137 + index * 12.5}%`,
              }}
              animate={{
                offsetDistance: [
                  `${10.9137 + index * 12.5}%`,
                  `${10.9137 + index * 12.5 + 100}%`,
                ],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
                delay: logo.delay,
              }}
            >
              <div className="bg-[#0a0a0a] grid size-[42px] place-content-center rounded-full border border-[#262626] shadow-sm">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={25}
                  height={25}
                  className="size-[25px] invert"
                />
              </div>
            </motion.div>
          ))}
        </div>
        <div className="from-[#000000] pointer-events-none absolute inset-x-0 top-0 h-5 bg-gradient-to-b to-transparent" />
        <div className="from-[#000000] pointer-events-none absolute inset-y-0 right-0 w-3 bg-gradient-to-l to-transparent" />
        <div className="from-[#000000] pointer-events-none absolute inset-x-0 bottom-0 h-5 bg-gradient-to-t to-transparent" />
        <div className="from-[#000000] pointer-events-none absolute inset-y-0 left-0 w-3 bg-gradient-to-r to-transparent" />
      </div>
      <div className="space-y-4 px-6">
        <h3 className="text-2xl font-semibold text-white">
          Web Design Agency Toolstack
        </h3>
        <p className="text-white/60 text-lg">
          From AI-assisted design to modern web development and SEO tooling—we
          build fast, reliable, and future-proof websites for growing teams.
        </p>
      </div>
    </motion.div>
  );
}

export default function BentoGrid() {
  return (
    <section className="bg-[#000000] py-8 sm:py-16 lg:py-24">
      <motion.div
        className="mx-auto grid max-w-7xl grid-cols-1 gap-3 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 lg:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1, margin: "-50px" }}
        variants={containerVariants}
      >
        {/* Secure access */}
        <motion.div
          variants={cardVariants}
          className="bg-black border border-white/10 flex flex-col gap-6 overflow-hidden rounded-xl py-6"
        >
          <div className="relative h-61.5">
            <div className="absolute top-1/2 left-1/2 grid size-[168px] -translate-x-1/2 -translate-y-1/2 place-content-center bg-[radial-gradient(rgba(0,0,0,0.4)_40%,transparent_90%)]">
              <svg
                width="119"
                height="148"
                viewBox="0 0 119 148"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
              >
                <defs>
                  <linearGradient
                    id="paint0_linear_secure"
                    x1="59.3185"
                    y1="0.913086"
                    x2="59.3185"
                    y2="146.954"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#ffffff" />
                    <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient
                    id="paint1_linear_secure"
                    x1="59.3185"
                    y1="13.083"
                    x2="59.3185"
                    y2="134.783"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#ffffff" />
                    <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient
                    id="paint2_linear_secure"
                    x1="59.3189"
                    y1="27.126"
                    x2="59.3189"
                    y2="120.742"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#ffffff" />
                    <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  opacity="0.8"
                  d="M117.725 81.2252C117.725 117.729 92.1721 135.981 61.8008 146.567C60.2104 147.106 58.4828 147.08 56.9092 146.494C26.4649 135.981 0.912109 117.729 0.912109 81.2252V30.1196C0.912109 28.1833 1.6813 26.3263 3.05047 24.9571C4.41963 23.588 6.27662 22.8188 8.21291 22.8188C22.8145 22.8188 41.0665 14.0578 53.7699 2.96059C55.3166 1.63914 57.2842 0.913086 59.3185 0.913086C61.3528 0.913086 63.3204 1.63914 64.8671 2.96059C77.6435 14.1308 95.8225 22.8188 110.424 22.8188C112.36 22.8188 114.217 23.588 115.587 24.9571C116.956 26.3263 117.725 28.1833 117.725 30.1196V81.2252Z"
                  fill="transparent"
                  stroke="url(#paint0_linear_secure)"
                  strokeWidth="1.8252"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  opacity="0.8"
                  d="M107.99 80.0097C107.99 110.43 86.6965 125.64 61.387 134.462C60.0617 134.911 58.6221 134.889 57.3108 134.401C31.9405 125.64 10.6465 110.43 10.6465 80.0097V37.4217C10.6465 35.8082 11.2875 34.2607 12.4284 33.1197C13.5694 31.9787 15.1169 31.3377 16.7305 31.3377C28.8985 31.3377 44.1085 24.0369 54.6946 14.7893C55.9836 13.6881 57.6232 13.083 59.3185 13.083C61.0138 13.083 62.6534 13.6881 63.9423 14.7893C74.5893 24.0978 89.7385 31.3377 101.906 31.3377C103.52 31.3377 105.068 31.9787 106.209 33.1197C107.349 34.2607 107.99 35.8082 107.99 37.4217V80.0097Z"
                  fill="transparent"
                  stroke="url(#paint1_linear_secure)"
                  strokeWidth="1.521"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  opacity="0.6"
                  d="M96.7589 78.6081C96.7589 102.008 80.3789 113.708 60.9101 120.494C59.8906 120.84 58.7832 120.823 57.7745 120.447C38.2589 113.708 21.8789 102.008 21.8789 78.6081V45.8481C21.8789 44.6069 22.372 43.4165 23.2496 42.5388C24.1273 41.6612 25.3177 41.1681 26.5589 41.1681C35.9189 41.1681 47.6189 35.5521 55.7621 28.4385C56.7536 27.5914 58.0148 27.126 59.3189 27.126C60.623 27.126 61.8842 27.5914 62.8757 28.4385C71.0657 35.5989 82.7189 41.1681 92.0789 41.1681C93.3201 41.1681 94.5105 41.6612 95.3882 42.5388C96.2658 43.4165 96.7589 44.6069 96.7589 45.8481V78.6081Z"
                  fill="transparent"
                  stroke="url(#paint2_linear_secure)"
                  strokeWidth="1.17"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M84.2774 77.0499C84.2774 92.6499 73.3574 100.45 60.3782 104.974C59.6986 105.204 58.9603 105.193 58.2878 104.943C45.2774 100.45 34.3574 92.6499 34.3574 77.0499V55.2099C34.3574 54.3824 34.6861 53.5889 35.2712 53.0037C35.8564 52.4186 36.6499 52.0899 37.4774 52.0899C43.7174 52.0899 51.5174 48.3459 56.9462 43.6035C57.6072 43.0388 58.448 42.7285 59.3174 42.7285C60.1868 42.7285 61.0276 43.0388 61.6886 43.6035C67.1486 48.3771 74.9174 52.0899 81.1574 52.0899C81.9849 52.0899 82.7785 52.4186 83.3636 53.0037C83.9487 53.5889 84.2774 54.3824 84.2774 55.2099V77.0499Z"
                  fill="#000000"
                />
              </svg>
            </div>
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(transparent_20%,black_70%)]" />
          </div>
          <div className="space-y-4 px-6">
            <h3 className="text-2xl font-semibold text-white">
              Secure Enterprise Web Development for Your Company
            </h3>
            <p className="text-white/60 text-lg">
              Built-in protection against bots, fake signups, and abusive
              requests using email reputation checks, traffic analysis, and
              automated rate limiting.
            </p>
          </div>
        </motion.div>

        {/* One-flow process */}
        <OneFlowCard />

        {/* Pick your tool */}
        <PickToolCard />

        {/* Build things with simple prompt */}
        <motion.div
          className="bg-[#000000] flex flex-col overflow-hidden rounded-xl pb-6 border border-[#262626]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1, margin: "-50px" }}
          transition={{ type: "spring", duration: 0.8, bounce: 0.01 }}
        >
          <div className="group relative flex min-h-[300px] items-center justify-center overflow-hidden p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.1, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Image
                src="https://cdn.shadcnstudio.com/ss-assets/blocks/bento-grid/image-59.png"
                alt="Build Things"
                width={800}
                height={400}
                className="absolute inset-0 -z-10 h-full object-cover opacity-0 transition-opacity group-hover:opacity-100 dark:hidden"
                style={{
                  maskImage:
                    "radial-gradient(circle 150px at 0px 0px, black 0%, transparent 100%)",
                  WebkitMaskImage:
                    "radial-gradient(circle 150px at 0px 0px, black 0%, transparent 100%)",
                }}
              />
            </motion.div>
            <motion.div
              className="group/prompt relative w-full max-w-[484px] flex-col gap-8 rounded-xl border border-[#262626] shadow-md bg-[#0a0a0a]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <textarea
                className="border-0 bg-transparent text-white placeholder:text-white/60 focus-visible:ring-0 flex w-full text-base transition-[color,box-shadow] outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm field-sizing-content max-h-[120px] min-h-[126px] resize-none rounded-xl p-4 text-lg shadow-none"
                id="text-prompt"
                placeholder="What can i do for your company?"
              />
              <motion.div
                className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.1, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <div className="flex items-center gap-3">
                  <motion.button
                    type="button"
                    className="inline-flex shrink-0 items-center justify-center text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 hover:bg-white/10 h-8 gap-1.5 rounded-md px-3 has-[>svg]:px-2.5 text-white"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Image
                      src="https://cdn.shadcnstudio.com/ss-assets/blocks/bento-grid/image-96.png"
                      alt="GPT-5-mini"
                      width={18}
                      height={18}
                      className="size-[18px]"
                    />
                    <span>GPT-5-mini</span>
                    <ChevronDown className="size-4" aria-hidden="true" />
                  </motion.button>
                  <span className="bg-[#262626] h-5 w-px" />
                  <motion.button
                    type="button"
                    className="inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 size-9 bg-white/10 text-white hover:bg-white/20 focus-visible:ring-white/20 size-7"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Paperclip className="size-4" aria-hidden="true" />
                    <span className="sr-only">Attach a file</span>
                  </motion.button>
                </div>
                <motion.button
                  type="button"
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 bg-white text-black hover:bg-white/90 size-9 size-7"
                  disabled
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                  <span className="sr-only">Open in new tab</span>
                </motion.button>
              </motion.div>
            </motion.div>
            <div className="from-[#000000] pointer-events-none absolute inset-x-0 top-0 h-8 bg-gradient-to-b to-transparent" />
            <div className="from-[#000000] pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l to-transparent" />
            <div className="from-[#000000] pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t to-transparent" />
            <div className="from-[#000000] pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r to-transparent" />
          </div>
          <motion.div
            className="space-y-4 px-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.1, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-2xl font-semibold text-white">
              Web Design Company — From Prompt to Website
            </h3>
            <p className="text-white/60 text-lg">
              Turn simple requirements into pages, components, and launch-ready
              content for fast website development and consistent delivery
            </p>
          </motion.div>
        </motion.div>

        {/* Voice assistant */}
        <motion.div
          variants={cardVariants}
          className="bg-black border border-white/10 flex flex-col gap-6 overflow-hidden rounded-xl py-6"
        >
          <div className="flex h-61.5 flex-1 items-center justify-center">
            <div className="relative flex w-full max-w-50 flex-col items-center gap-3">
              <button
                type="button"
                className="group hover:bg-accent bg-white flex size-14 cursor-pointer items-center justify-center rounded-xl transition-colors"
              >
                <div
                  className="bg-primary pointer-events-none size-5 animate-spin rounded-sm"
                  style={{ animationDuration: "3s" }}
                />
              </button>
              <span className="text-white font-mono text-sm font-light transition-opacity duration-300">
                00:02
              </span>
              <div className="flex h-4 w-49.5 items-center text-white justify-center gap-0.5 px-1 py-0.5">
                {Array.from({ length: 48 }).map((_, i) => {
                  const height = 20 + ((i * 13) % 80);
                  return (
                    <div
                      key={`bar-${height}-${i}`}
                      className="w-0.5 bg-white rounded-full text-white transition-all duration-300 bg-primary/80 animate-pulse"
                      style={{
                        height: `${height}%`,
                        animationDelay: `${i * 0.05}s`,
                      }}
                    />
                  );
                })}
              </div>
              <p className="text-white/80">Listening...</p>
            </div>
          </div>
          <div className="space-y-4 px-6">
            <h3 className="text-2xl font-semibold text-white">
              Voice assistant
            </h3>
            <p className="text-white text-lg">
              Ask, command, and get instant responses.
            </p>
          </div>
        </motion.div>

        {/* Targeted Visibility Card */}
        <TargetedVisibilityCard />

        {/* Simplify Product Card */}
        <SimplifyProductCard />

        {/* Color Contrast Card */}
        <ColorContrastCard />
      </motion.div>
    </section>
  );
}
