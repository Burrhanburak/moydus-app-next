"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { ArrowRight, RedoDot } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { r2cdn } from "@/lib/cdn";

const collections = [
  {
    title: "Business Templates",
    subtitle: "See business templates",
    image: "/mc.gif",
    size: "350px",
    href: "/marketplace/templates",
  },
  {
    title: "Service Categories",
    subtitle: "View all categories",

    image: "/muis.gif",
    href: "/marketplace/templates/category",
  },
];

export default function Collec() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const cardWidth = 366; // 350px card + 16px gap

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? collections.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= collections.length - 1 ? 0 : prev + 1));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const difference = touchStartX.current - touchEndX.current;
    const threshold = 50;

    if (difference > threshold) {
      handleNext();
    } else if (difference < -threshold) {
      handlePrev();
    }
  };

  useEffect(() => {
    if (sliderRef.current) {
      // Calculate card width based on screen size
      const cardWidthValue =
        window.innerWidth >= 1024 ? cardWidth : window.innerWidth - 40; // 40px for padding
      sliderRef.current.style.transform = `translate3d(-${
        currentIndex * cardWidthValue
      }px, 0px, 0px)`;
    }
  }, [currentIndex, cardWidth]);

  return (
    <motion.section
      data-section="section.cardWithCta"
      className="mx-auto flex max-w-max-screen flex-col gap-6 py-8 md:py-12 lg:py-16"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", duration: 0.2, bounce: 0.1 }}
    >
      <div className="container mx-auto max-w-7xl px-10 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
          <div className="flex flex-col gap-3 flex-1">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <h2 className="text-[32px] md:text-[40px] lg:text-4xl font-semibold text-white">
                Explore Our Templates
              </h2>
              <Link
                href="/marketplace/templates"
                className="group hidden lg:flex items-center justify-center gap-2 rounded-[47px] bg-white px-6 py-3 transition-all duration-300 ease-in-out shrink-0"
              >
                <div className="transition-all duration-300 ease-out group-hover:translate-x-1">
                  <ArrowRight className="size-4" />
                </div>
                <span className="text-sm font-medium">view all templates</span>
              </Link>
            </div>
            <p className="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed">
              Discover professionally designed templates for websites,
              e-commerce stores, SaaS platforms, and automation tools.
              Ready-to-use solutions built for global brands and scalable
              businesses worldwide.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-5 lg:px-5">
        <div className="relative h-full overflow-x-hidden !pb-10">
          <div
            ref={sliderRef}
            className="flex gap-4 transition-transform duration-300 ease-out"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {collections.map((collection, idx) => (
              <div
                key={idx}
                className="group relative flex-shrink-0 w-full min-w-[calc(100%-20px)] lg:min-w-[350px] lg:flex-1 cursor-pointer"
              >
                <Link href={collection.href}>
                  <div className="relative w-full overflow-hidden rounded-2xl">
                    <Image
                      alt={collection.title}
                      decoding="async"
                      loading="lazy"
                      className="h-full w-full object-cover object-center transition-all duration-500 ease-out group-hover:scale-105"
                      height={400}
                      width={300}
                      src={r2cdn(collection.image)}
                      unoptimized
                      style={{
                        aspectRatio: "3 / 4",
                      }}
                    />
                  </div>
                  <div className="absolute bottom-6 left-6 min-w-[75%] max-w-[90%] rounded-2xl bg-white px-6 py-4 transition-all duration-500 ease-out group-hover:bg-black group-hover:text-white">
                    <div className="flex flex-col items-start">
                      <h5 className="body-m line-clamp-1 truncate text-nowrap text-[15px] md:text-base">
                        {collection.title}
                      </h5>
                      <div className="flex items-center gap-4">
                        <h4 className="text-xl md:text-2xl font-semibold">
                          {collection.subtitle}
                        </h4>
                        <ArrowRight className="size-4 transition-all duration-500 group-hover:invert" />
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          <div className="absolute bottom-0 left-1/2 h-[2px] w-[240px] -translate-x-1/2 rounded bg-[#e5e7eb] lg:hidden">
            <div
              className="h-[2px] rounded bg-black"
              style={{
                width: "100px",
                transform: `translateX(${
                  (currentIndex / (collections.length - 1)) * (240 - 100)
                }px)`,
                transition: "transform 0.3s ease-out",
              }}
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-10 lg:px-10">
        <Link
          href="/marketplace/templates"
          className="group shadow-[0_0_10px_rgba(0,0,0,0.1)] mx-auto mt-4 flex w-fit items-center justify-center gap-2 rounded-[47px] bg-white px-6 py-3 transition-all duration-300 ease-in-out lg:hidden"
        >
          <div className="transition-all duration-300 ease-out group-hover:translate-x-1"></div>
          <span className="text-sm font-medium">view all templates</span>
          <RedoDot className="size-4 transition-all duration-500 group-hover:invert" />
        </Link>
      </div>
    </motion.section>
  );
}
