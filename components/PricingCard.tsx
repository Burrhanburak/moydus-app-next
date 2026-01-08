"use client";

import React from "react";
import { motion } from "framer-motion";

import StarterCard from "./pricing/StarterCard";
import CommerceCard from "./pricing/CommerceCard";
import MarketplaceCard from "./pricing/MarketplaceCard";
import CustomCard from "./pricing/CustomCard";

import { Button } from "./ui/button";
import Link from "next/link";
import { MousePointerClick, TrendingUp } from "lucide-react";

export default function PricingCard() {
  return (
    <motion.section
      id="pricing"
      className="flex flex-col items-center gap-[60px] w-full relative"
      style={{ height: "min-content", padding: 0 }}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", duration: 0.2, bounce: 0.1 }}
    >
      <div className="flex flex-col items-center p-3 gap-10 w-full py-16 md:py-20 lg:py-24">
        <div className="flex flex-col items-center gap-6 max-w-2xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="relative inline-flex items-center justify-center"
          >
            <div className="relative flex flex-row items-center justify-center gap-2 h-9 px-4 rounded-full bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm border border-white/20">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <h5 className="text-white text-sm md:text-base font-medium">
                One-time setup + monthly maintenance
              </h5>
            </div>
          </motion.div>

          {/* Title + Sub + PanelManage pill */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex flex-col items-center gap-4"
          >
            <h2 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold text-center leading-tight tracking-tight bg-gradient-to-b from-white to-white/80 bg-clip-text text-transparent">
              Pricing Options
            </h2>

            <p className="text-white/70 text-base md:text-lg lg:text-xl leading-relaxed text-center max-w-xl">
              Premium builds for websites, B2B/B2C commerce, and multi-vendor
              marketplaces — with SEO/GEO and automation foundations.
            </p>

            {/* PanelManage Note Pill */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.26 }}
              className="w-full flex justify-center"
            >
              <div className="group inline-flex items-center text-center justify-center gap-1 h-9 px-3 rounded-full bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm border border-white/20">
                <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
                <span className="text-white/85 text-xs md:text-base font-semibold">
                  Need a CRM or management system?
                </span>

                <span className="h-4 w-px bg-white/15 mx-1" />
                <div className="flex items-center justify-center gap-2">
                  <Link
                    href="https://panelmanage.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-white text-xs md:text-sm font-semibold hover:underline underline-offset-4"
                  >
                    PanelManage
                    <TrendingUp className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="w-full sm:w-auto"
          >
            <Link href="/pricing" className="inline-block w-full sm:w-auto">
              <Button className="group relative w-full sm:w-auto px-8 py-6 text-base font-semibold text-black bg-white hover:bg-white/90 transition-all duration-300 rounded-full shadow-lg shadow-white/20 hover:shadow-xl hover:shadow-white/30 hover:scale-105">
                <span className="relative z-10 flex items-center gap-2">
                  View full comparison
                  <TrendingUp className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </span>

                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white to-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Button>
            </Link>

            <div className="flex items-center justify-center gap-3 mt-4">
              <span className="h-px w-10 bg-white/30" />
              <Link
                href="https://app.moydus.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-white/80 hover:text-white transition-colors underline-offset-4 hover:underline"
              >
                Choose Package
              </Link>
              <MousePointerClick className="w-4 h-4 text-white/90" />
              <span className="h-px w-10 bg-white/30" />
            </div>
          </motion.div>
        </div>

        {/* Cards container */}
        <div className="w-full max-w-[1600px] md:flex md:items-center md:justify-center overflow-visible">
          <div className="w-full max-w-[580px] md:max-w-[1600px] mx-auto md:mx-0 flex flex-col md:flex-row md:flex-nowrap md:gap-4 items-stretch relative overflow-visible">
            {/* Starter */}
            <div className="flex-1 min-w-0 md:flex-[0_1_auto] md:w-[350px] p-[5px] md:order-1 flex flex-col">
              <StarterCard />
            </div>

            {/* Commerce (Most Popular) */}
            <div className="flex-1 min-w-0 md:flex-[0_1_auto] md:w-[350px] p-[5px] md:order-2 flex flex-col">
              <CommerceCard />
            </div>

            {/* Marketplace (wide) */}
            <div className="flex-1 min-w-0 md:flex-[0_1_auto] md:w-[400px] lg:w-[600px] p-[5px] md:order-3 flex flex-col">
              <MarketplaceCard />
            </div>

            {/* Custom */}
            <div className="flex-1 min-w-0 md:flex-[0_1_auto] md:w-[350px] p-[5px] md:order-4 flex flex-col">
              <CustomCard />
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
