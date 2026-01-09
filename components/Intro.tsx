"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Layers,
  Circle,
  Aperture,
  Sparkles,
  Bolt,
  Boxes,
} from "lucide-react";

const logos = [
  { label: "Wealthro", icon: ShieldCheck },
  { label: "Finyon", icon: Layers },
  { label: "Aegra", icon: Circle },
  { label: "Portivio", icon: Aperture },
  { label: "Vaultic", icon: Sparkles },
  { label: "Altoris", icon: Bolt },
  { label: "Quantora", icon: Boxes },
  { label: "Fundara", icon: Layers },
];

export default function Intro() {
  return (
    <section
      id="intro"
      className="w-full flex flex-col  container mx-auto items-center relative overflow-hidden z-[1]"
      style={{ height: "min-content" }}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @media (max-width: 809.98px) {
              .intro-section {  padding: 32px 20px; }
            }
          `,
        }}
      />
      <div
        className="intro-section flex flex-col items-center gap-[50px] md:gap-[120px] px-4 md:px-[100px] py-8 md:py-12"
        style={{ height: "min-content" }}
      >
        {/* Trusted by */}
        <motion.section
          className="flex flex-col items-center gap-6 w-full"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ type: "spring", duration: 0.6, bounce: 0.05 }}
        >
          <h2 className="text-white text-[25px] md:text-xl font-medium">
            Trusted by High-Growth Digital Brands Worldwide{" "}
          </h2>
          <p className="text-white/80 text-[14px] m-2 md:text-lg text-center w-full md:max-w-[700px] leading-[1.5] md:leading-relaxed px-6 md:px-0">
            Global brands trust Moydus to build scalable websites, SaaS
            platforms, and automation systems that perform across markets.
          </p>
          {/* Logos Marquee */}
          <div
            className="w-full flex items-center justify-center"
            style={{
              overflow: "visible",
              maskImage:
                "linear-gradient(to right, rgba(0,0,0,0) 0%, rgb(0,0,0) 17.5%, rgb(0,0,0) 82.5%, rgba(0,0,0,0) 100%)",
              WebkitMaskImage:
                "linear-gradient(to right, rgba(0,0,0,0) 0%, rgb(0,0,0) 17.5%, rgb(0,0,0) 82.5%, rgba(0,0,0,0) 100%)",
            }}
          >
            {/* Outer container (like framer-ptb27k-container) */}
            <div
              className="logos-container"
              style={{
                flex: "none",
                width: "100%",
                maxWidth: "1000px",
                height: "33px",
                position: "relative",
              }}
            >
              {/* Masked viewport fills container */}
              <div
                className="logos-viewport absolute inset-0"
                style={{
                  overflow: "hidden",
                }}
              >
                <motion.ul
                  className="logos-list flex items-center w-full h-full max-w-full max-h-full list-none gap-[60px] relative flex-row"
                  initial={{ x: 0 }}
                  animate={{ x: [0, "-50%", 0] }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  aria-label="Company logos"
                  style={{ willChange: "transform" }}
                >
                  {[...logos, ...logos].map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <li
                        key={`${item.label}-${i}`}
                        className="flex-shrink-0 text-white"
                      >
                        <div className="logo-item flex items-center gap-2 md:gap-3">
                          <div className="grid place-items-center h-9 w-9 md:h-11 md:w-11 text-white/90">
                            <Icon
                              className="text-white"
                              size={24}
                              strokeWidth={1.6}
                            />
                          </div>
                          <p className="text-white text-sm md:text-base font-medium">
                            {item.label}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </motion.ul>
                <style
                  dangerouslySetInnerHTML={{
                    __html: `
                    @media (max-width: 809.98px) {
                      .logos-list { gap: 30px !important; }
                        .logos-list { justify-content: center !important; }
                        .logo-item { align-items: center !important; }
                        .logo-item p { text-align: center !important; color: white !important; font-weight: 600 !important; }
                        .logos-viewport { overflow: hidden !important; }
                        .logos-viewport { -webkit-mask-image: none !important; mask-image: none !important; }
                    }
                  `,
                  }}
                />
              </div>
            </div>
          </div>
        </motion.section>
        {/* Main */}
        <div className="w-full max-w-[1000px] mx-auto grid grid-cols-1 md:grid-cols-[260px_minmax(0,1fr)] gap-6 md:gap-8 items-center px-0">
          {/* Feature Visual */}
          <motion.div
            className="flex flex-col items-center justify-center h-[188px] md:h-[288px]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              type: "spring",
              duration: 0.6,
              bounce: 0.05,
              delay: 0.05,
            }}
          >
            <div
              className="flex items-center justify-between w-[242px] rounded-[22px]"
              style={{
                background:
                  "linear-gradient(90deg, rgba(46,46,46,0.4) 12%, rgba(209,63,0,0.7) 51%, rgba(46,46,46,0.4) 91%)",
                position: "relative",
                padding: "8px 12px",
                overflow: "visible",
              }}
            >
              <motion.div
                className="rounded-full"
                style={{
                  width: 12,
                  height: 12,
                  backgroundColor: "#ffffff",
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  zIndex: 0,
                  willChange: "transform",
                }}
                aria-hidden
                initial={{
                  x: -90,
                  y: -8,
                  boxShadow: "0 0 16px 1px rgba(255,77,0,0.8)",
                }}
                animate={{
                  x: 90,
                  y: [-8, -10, -8, -6, -8],
                  boxShadow: [
                    "0 0 12px 0px rgba(255,77,0,0.6)",
                    "0 0 20px 1px rgba(255,77,0,0.9)",
                    "0 0 12px 0px rgba(255,77,0,0.6)",
                    "0 0 18px 1px rgba(255,77,0,0.85)",
                    "0 0 16px 1px rgba(255,77,0,0.8)",
                  ],
                }}
                transition={{
                  x: {
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "linear",
                  },
                  y: {
                    duration: 1.2,
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "easeInOut",
                  },
                  boxShadow: {
                    duration: 1.2,
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "easeInOut",
                  },
                }}
              />
              <motion.div
                className="rounded-full"
                style={{
                  width: 28,
                  height: 28,
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  background:
                    "radial-gradient(closest-side, rgba(255,77,0,0.6), rgba(255,77,0,0))",
                  filter: "blur(8px)",
                  zIndex: -1,
                  willChange: "transform, opacity",
                }}
                aria-hidden
                initial={{ x: -90, y: -8, opacity: 0.9 }}
                animate={{
                  x: 90,
                  y: [-8, -10, -8, -6, -8],
                  opacity: [0.85, 1, 0.9, 1, 0.85],
                }}
                transition={{
                  x: {
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "linear",
                  },
                  y: {
                    duration: 1.2,
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "easeInOut",
                  },
                  opacity: {
                    duration: 1.2,
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "easeInOut",
                  },
                }}
              />
              <div className="h-11 w-11 grid place-items-center text-white relative z-[1]">
                <Aperture size={28} />
              </div>
              <div className="h-11 w-11 grid place-items-center text-white relative z-[1]">
                <Sparkles size={28} />
              </div>
            </div>
            <div
              className="absolute pointer-events-none"
              style={{ opacity: 0.58 }}
              aria-hidden
            />
          </motion.div>

          {/* Heading & Button */}
          <motion.div
            className="flex flex-col items-center md:items-start gap-5 md:gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              type: "spring",
              duration: 0.6,
              bounce: 0.05,
              delay: 0.1,
            }}
          >
            <div className="flex flex-col items-center md:items-start gap-6 w-full max-w-[320px] md:max-w-[700px] px-0 mx-0">
              <h2 className="text-white text-[28px] md:text-[38px] lg:text-[42px] leading-[1.15] md:leading-[1.1] tracking-[-0.02em] font-semibold text-center md:text-left break-words">
                A Full-Service Software Company for Modern Businesses
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                <div>
                  <h3 className="text-white text-lg md:text-xl font-semibold mb-2">
                    Custom Web Design & Development
                  </h3>
                  <p className="text-white/70 text-[15px] md:text-base leading-relaxed">
                    We design and develop modern, high-performing websites
                    focused on speed, usability, and conversion, tailored to
                    your brand, goals, and long-term growth strategy.
                  </p>
                </div>
                <div>
                  <h3 className="text-white text-lg md:text-xl font-semibold mb-2">
                    Scalable E-Commerce Platforms
                  </h3>
                  <p className="text-white/70 text-[15px] md:text-base leading-relaxed">
                    We build scalable e-commerce platforms optimized for
                    performance, growth, and global sales, using modern
                    technologies and flexible architectures that scale with your
                    business.
                  </p>
                </div>
                <div>
                  <h3 className="text-white text-lg md:text-xl font-semibold mb-2">
                    SaaS Product Development
                  </h3>
                  <p className="text-white/70 text-[15px] md:text-base leading-relaxed">
                    From MVP to production, we develop custom SaaS products with
                    secure architecture, intuitive UX, and scalable
                    infrastructure built for long-term success.
                  </p>
                </div>
                <div>
                  <h3 className="text-white text-lg md:text-xl font-semibold mb-2">
                    AI-Powered Automation Solutions
                  </h3>
                  <p className="text-white/70 text-[15px] md:text-base leading-relaxed">
                    We create AI-powered automation tools that streamline
                    workflows, reduce manual work, and help teams operate
                    faster, smarter, and more efficiently.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
