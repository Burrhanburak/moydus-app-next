"use client";

import React from "react";
import { motion } from "framer-motion";

export default function Stats() {
  return (
    <motion.section
      id="metrics"
      className="bg-[#000000] flex flex-col items-center gap-[70px] w-full relative overflow-hidden z-[1] px-5 md:px-[100px] py-8 md:py-12"
      style={{ height: "min-content" }}
      initial={{ opacity: 0, y: 50, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ type: "spring", duration: 0.8, bounce: 0.01 }}
    >
      <div className="flex flex-col items-center gap-[43px] w-full max-w-[1100px]">
        <div className="text-center">
          <h2 className="text-white text-[32px] md:text-[40px] lg:text-4xl leading-[1.1] tracking-[-0.02em] font-semibold md:leading-tight">
            Performance You Can Measure
          </h2>
        </div>
        <div className="flex w-full items-stretch md:items-center justify-between flex-col md:flex-row gap-8 md:gap-0">
          <motion.div
            className="flex flex-col items-start gap-[5px] w-min h-min"
            initial={{ opacity: 0, y: 50, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ type: "spring", duration: 0.8, bounce: 0.01 }}
          >
            <p className="text-white text-[52px] md:text-[65px] leading-[1.2] tracking-[-0.05em] font-semibold text-left">
              99.7%
            </p>
            <p className="text-white/70 text-base md:text-lg text-left">Projects Delivered</p>
          </motion.div>
          <motion.div
            className="flex flex-col items-start gap-[5px] w-min h-min"
            initial={{ opacity: 0, y: 50, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ type: "spring", duration: 0.8, bounce: 0.01, delay: 0.1 }}
          >
            <p className="text-white text-[52px] md:text-[65px] leading-[1.2] tracking-[-0.05em] font-semibold text-left">
              $250M+
            </p>
            <p className="text-white/70 text-base md:text-lg text-left">Customer Engagement</p>
          </motion.div>
          <motion.div
            className="flex flex-col items-start gap-[5px] w-min h-min"
            initial={{ opacity: 0, y: 50, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ type: "spring", duration: 0.8, bounce: 0.01, delay: 0.2 }}
          >
            <p className="text-white text-[52px] md:text-[65px] leading-[1.2] tracking-[-0.05em] font-semibold text-left">
              120+
            </p>
            <p className="text-white/70 text-base md:text-lg text-left">Automated Workflows</p>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
