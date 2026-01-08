"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Toria",
    handle: "@grapeandfig",
    quote:
      "Amazing team, very personable and easy to work with. Produced all our box sizes perfectly for our new store. Couldn't have asked for more!",
    image: "/placeholder-3.svg",
    bgColor: "bg-[#ff4d00]",
  },
  {
    name: "Maria",
    handle: "@etreldn",
    quote:
      "Team Brand Your offer great ideas for branded packaging. Crucial for managing costs while building brand recognition. They're not just printers.",
    image: "/placeholder-3.svg",
    bgColor: "bg-[#ff4d00]",
  },
  {
    name: "Nicky",
    handle: "@bababoomlondon",
    quote:
      "Super responsive, ensuring spot-on printing. Timely estimates and top-notch quality products. Wouldn't hesitate to recommend!",
    image: "/placeholder-3.svg",
    bgColor: "bg-[#ff4d00]",
  },
  {
    name: "Maia",
    handle: "@maginhawagroup",
    quote:
      "Superb packaging - vibrant colours, crisp graphics! Hands-on throughout design. Outstanding communication and service. Highly recommend!",
    image: "/placeholder-3.svg",
    bgColor: "bg-[#ff4d00]",
  },
  {
    name: "Dan",
    handle: "@its__bagels",
    quote:
      "Detailed and design focused, we found Brand Your to be the perfect match for us. Their product quality is 10/10.",
    image: "/placeholder-3.svg",
    bgColor: "bg-[#ff4d00]",
  },
];

export default function SlideCard() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const cardWidth = 692; // Each slide width including gaps and margins

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= testimonials.length - 1 ? 0 : prev + 1));
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
      sliderRef.current.style.transform = `translate3d(-${
        currentIndex * cardWidth
      }px, 0px, 0px)`;
    }
  }, [currentIndex, cardWidth]);

  return (
    <motion.section
      data-section="section.testimonials"
      className="mx-auto max-w-max-screen pt-16 md:pt-20 lg:pt-24 pb-28 md:pb-36 lg:pb-40 md:px-20 lg:px-0"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", duration: 0.2, bounce: 0.1 }}
    >
      <div className="flex flex-col items-start justify-center gap-6 lg:flex-row lg:gap-2 lg:pl-16">
        <div className="flex w-full flex-col items-start justify-between px-4 lg:h-[450px] lg:w-[445px] lg:pl-4 lg:pt-8">
          <div className="flex w-full flex-col justify-start gap-4 lg:w-72 lg:items-center">
            <div className="text-3xl text-white font-semibold text-pretty">
              Don&apos;t just take our word for it
            </div>
            <div className="text-base text-muted-foreground">
              Big brands. Rising stars. Your local favourites. Hear from those
              we&apos;ve partnered with.
            </div>
          </div>
          <div className="relative hidden w-16 items-center justify-between lg:flex">
            <button onClick={handlePrev} className="!left-0 top-0 after:hidden">
              <ArrowLeft className="size-4 text-white" />
            </button>
            <button
              onClick={handleNext}
              className="!right-0 top-0 after:hidden"
            >
              <ArrowRight className="size-4 text-white" />
            </button>
          </div>
        </div>
        <div className="overflow-hidden px-5 relative w-screen !px-4 !pb-20 lg:!pb-20 lg:!pr-10">
          <div
            ref={sliderRef}
            className="flex gap-2 transition-transform duration-300 ease-out"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="flex-1 flex gap-2 mr-2 last:mr-0">
                <div className="w-[334px] flex-1">
                  <Image
                    alt={testimonial.name}
                    decoding="async"
                    loading="lazy"
                    className="w-full rounded-2xl object-cover"
                    height="400"
                    width="300"
                    src={testimonial.image}
                    style={{
                      aspectRatio: "3 / 4",
                      height: "100%",
                      width: "100%",
                    }}
                  />
                </div>
                <div
                  className={`relative flex h-[450px] w-[334px] flex-1 flex-col items-start justify-end rounded-2xl p-8 ${testimonial.bgColor}`}
                >
                  <Link
                    className="text-xs absolute left-4 top-4 rounded-2xl border border-gray-300 bg-white px-3 py-[6px] text-black"
                    target="_self"
                    href="/"
                  >
                    {testimonial.handle}
                  </Link>
                  <span className="h-20 -rotate-[4deg] text-[100px]">
                    &quot;
                  </span>
                  <div className="text-xl font-semibold">
                    {testimonial.quote}
                  </div>
                  <div className="text-base mt-4">{testimonial.name}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="absolute bottom-0 left-1/2 h-[2px] w-[240px] -translate-x-1/2 rounded bg-[#e5e7e3]">
            <div
              className="h-[2px] rounded bg-black"
              style={{
                width: "100px",
                transform: `translateX(${
                  (currentIndex / (testimonials.length - 1)) * (240 - 100)
                }px)`,
                transition: "transform 0.3s ease-out",
              }}
            />
          </div>
        </div>
      </div>
    </motion.section>
  );
}
