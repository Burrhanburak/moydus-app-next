"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

function FeatureCard1() {
  return (
    <motion.div
      className="w-full flex flex-col md:flex-row items-center justify-center gap-5 md:gap-[10px] relative overflow-visible z-[1]"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ type: "spring", duration: 0.8, bounce: 0.01 }}
    >
      {/* Heading - Mobile: order-1, Desktop: normal */}
      <div
        className="flex flex-col w-full md:flex-1 md:min-w-0 md:w-px items-center md:items-start gap-5 md:gap-8 order-1 md:order-none"
        style={{
          padding: "0",
        }}
      >
        <style
          dangerouslySetInnerHTML={{
            __html: `
            @media (min-width: 768px) {
              .feature-card1-content {
                gap: 32px !important;
                padding: 20px 0 0 !important;
              }
            }
          `,
          }}
        />
        <div className="feature-card1-content flex flex-col w-full">
          <div className="flex flex-col gap-3">
            <h3 className="text-white text-[24px] md:text-2xl lg:text-3xl font-semibold tracking-tight">
              AI-Powered Social Media Marketing & Growth
            </h3>
            <p className="text-white/80 text-[15px] md:text-base lg:text-lg leading-relaxed">
              Plan, publish, and optimize social campaigns across platforms.
              Track engagement, reach, and conversions in real time with
              AI-driven insights.
            </p>
          </div>
        </div>
      </div>

      {/* Removed duplicate mobile-only button - unified button exists above */}

      {/* Visual - Mobile: order-3, Desktop: normal */}
      <div className="feature-soone-container w-full md:flex-1 md:min-w-0 md:w-px relative order-3 md:order-none h-[240px] md:h-[365px]">
        <div className="absolute inset-0 rounded-[10px] overflow-hidden">
          {/* Background SVG */}
          <div
            className="feature-soone-bg absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: "url('/soone.svg')",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "cover",
              zIndex: 0,
              opacity: 0.9,
            }}
          />
          <style
            dangerouslySetInnerHTML={{
              __html: `
                @media (max-width: 809.98px) {
                  .feature-soone-container { height: 280px !important; }
                  .feature-soone-bg { background-size: contain !important; background-position: center bottom !important; }
                }
              `,
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}

export default function Feature() {
  return (
    <section
      id="feature"
      className="w-full flex flex-col items-center relative overflow-hidden z-[1] gap-[70px] py-8 md:py-12 px-[20px] lg:gap-[50px] lg:px-[40px]"
      style={{ height: "min-content" }}
    >
      {/* Background Grid */}
      <div
        className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
        aria-hidden
      ></div>

      <div
        className="flex flex-col items-center w-full max-w-[1100px] relative z-[1] gap-[30px] lg:gap-[25px]"
        style={{ height: "min-content" }}
      >
        {/* Heading */}

        {/* Feature Cards */}
        <div
          className="flex flex-col items-center w-full gap-[85px] lg:max-w-[810px] relative"
          style={{ height: "min-content" }}
        >
          {/* Glow Top - Mobile */}
          <div
            className="feature-glow-top-mobile absolute pointer-events-none"
            style={{
              willChange: "transform",
              opacity: 0.58,
            }}
            aria-hidden
          />
          {/* Glow Top - Desktop */}
          <div
            className="feature-glow-top-desktop hidden lg:block absolute pointer-events-none"
            style={{
              willChange: "transform",
              opacity: 0.66,
            }}
            aria-hidden
          />
          {/* Glow Bottom - Mobile */}
          <div
            className="feature-glow-bottom-mobile absolute pointer-events-none"
            style={{
              willChange: "transform",
              opacity: 0.58,
            }}
            aria-hidden
          />
          {/* Glow Bottom - Desktop */}
          <div
            className="feature-glow-bottom-desktop hidden lg:block absolute pointer-events-none"
            style={{
              willChange: "transform",
              opacity: 0.8,
            }}
            aria-hidden
          />

          <FeatureCard1 />
        </div>
      </div>
    </section>
  );
}
