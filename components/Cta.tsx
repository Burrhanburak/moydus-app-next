"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Cta() {
  return (
    <section className="flex flex-col items-center justify-center gap-[10px] w-full h-min relative overflow-visible">
      <div className="h-auto relative px-4 md:px-0 py-5 md:py-0">
        <motion.div
          className="flex flex-col items-center justify-center gap-[30px] w-full max-w-[390px] md:max-w-[1200px] md:w-[1200px] md:mx-auto h-min pb-5 md:p-[100px] relative overflow-hidden rounded-[10px]"
          style={{
            willChange: "transform",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
        >
          {/* CTA Wrapper */}
          <motion.div
            className="flex flex-col items-center justify-center gap-[10px] w-full max-w-[580px] md:max-w-[900px] h-min p-0 relative z-[1] overflow-hidden"
            style={{
              willChange: "transform",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
          >
            {/* Content */}
            <motion.div
              className="flex flex-col items-center justify-center gap-[18px] w-full h-min py-8 md:py-12 px-5 md:px-[60px] relative z-[1] overflow-hidden rounded-[20px]"
              style={{
                border: "1px solid rgb(62, 32, 19)",
                background:
                  "radial-gradient(107% 95% at 50% 105.1%, rgb(250, 187, 0) 0%, rgb(204, 61, 0) 34.36373873873874%, #070204 100%)",
                willChange: "transform",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
            >
              {/* Grid Element - Animated GIF Background - Lazy loaded */}
              <motion.div
                className="absolute inset-0 z-[1] overflow-hidden pointer-events-none rounded-[20px]"
                // style={{
                //   backgroundImage: `url('${r2cdn("/moos.gif")}')`,
                //   backgroundSize: "cover",
                //   backgroundPosition: "center",
                //   backgroundRepeat: "no-repeat",
                //   clipPath: "polygon(0px 0px, 0% 0px, 0% 100%, 0px 100%)",
                //   opacity: 0.15,
                //   contentVisibility: "auto", // Optimize rendering
                // }}
                initial={{
                  clipPath: "polygon(0px 0px, 0% 0px, 0% 100%, 0px 100%)",
                  opacity: 0,
                }}
                animate={{
                  clipPath: "polygon(0px 0px, 100% 0px, 100% 100%, 0px 100%)",
                  opacity: 0.15,
                }}
                transition={{
                  duration: 4,
                  ease: "easeOut",
                }}
              />

              {/* Heading */}
              <motion.h2
                className="text-center text-white font-semibold text-[32px] md:text-[40px] lg:text-4xl relative z-[5]"
                style={{
                  willChange: "transform",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ type: "spring", stiffness: 100, damping: 15 }}
              >
                Let&apos;s Build Something That Scales
              </motion.h2>

              {/* H3 */}
              <motion.h3
                className="text-center text-white/90 font-medium text-lg md:text-xl relative z-[5] mb-2"
                style={{
                  willChange: "transform",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 15,
                  delay: 0.1,
                }}
              >
                Start Your Project with Moydus
              </motion.h3>

              {/* Description */}
              <motion.p
                className="text-center text-white/80 text-[15px] md:text-base lg:text-lg max-w-2xl relative z-[5]"
                style={{
                  willChange: "transform",
                  opacity: 0.81,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.81 }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 15,
                  delay: 0.2,
                }}
              >
                Harness the power of AI and automation to scale your websites,
                e-commerce stores, SaaS platforms, and custom workflows with
                confidence and clarity.
              </motion.p>

              {/* Button */}
              <motion.div
                className="flex items-center justify-center relative z-[5]"
                style={{
                  willChange: "transform",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ type: "spring", stiffness: 100, damping: 15 }}
              >
                <Link
                  href="https://app.moydus.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-[27px] bg-[rgba(255,255,255,0.85)] text-black font-medium hover:bg-white transition-colors"
                  style={{
                    border: "0px solid rgba(0, 0, 0, 0)",
                    backdropFilter: "none",
                  }}
                >
                  <span>Get Started</span>
                  <div
                    className="w-5 h-5 flex items-center justify-center"
                    style={{
                      backgroundColor: "rgb(0, 0, 0)",
                      mask: "radial-gradient(50% 50%, rgb(0, 0, 0) 97.7319%, rgba(0, 0, 0, 0) 100%)",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 256 256"
                      className="w-full h-full"
                      style={{
                        fill: "rgb(255, 255, 255)",
                        display: "inline-block",
                      }}
                    >
                      <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z" />
                    </svg>
                  </div>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
