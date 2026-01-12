"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import { cdn } from "@/lib/cdn";

type Testimonial = {
  name: string;
  title: string;
  quote: string;
  avatar: string;
};

const leftCol: Testimonial[] = [
  {
    name: "Dr. Olivia Bennett",
    title: "Clinic Owner",
    quote:
      "We chose the CMS Suite package to manage appointments and clinic content. The admin panel is secure, fast, and very easy to use.",
    avatar: "/trusted/1.png",
  },
  {
    name: "Ethan Carter",
    title: "Operations Manager",
    quote:
      "Using the CMS Suite package, we replaced several internal tools with one clean dashboard. Roles, workflows, and notifications are all centralized now.",
    avatar: "/trusted/2.png",
  },
  {
    name: "Sofia Miller",
    title: "Founder",
    quote:
      "We started with the Starter package, and it gave us a fast, professional website that was ready to grow from day one.",
    avatar: "/trusted/3.png",
  },
  {
    name: "Daniel Brooks",
    title: "Business Owner",
    quote:
      "The Business package helped us structure our operations with proper access control and scalability. Everything feels solid and well thought out.",
    avatar: "/trusted/4.png",
  },
];

const rightCol: Testimonial[] = [
  {
    name: "Marcus Reed",
    title: "E-commerce Business Owner",
    quote:
      "We went with the Business package to manage products and internal workflows. The platform feels fast, secure, and ready to scale.",
    avatar:
      "https://framerusercontent.com/images/5SvmsGUbwyGolmfue9bSL7VCIc.png?width=800&height=1200",
  },
  {
    name: "Isabelle Turner",
    title: "Clinic Operations Manager",
    quote:
      "Using the CMS Suite package, we finally centralized appointments, content, and internal approvals in one secure panel.",
    avatar:
      "https://framerusercontent.com/images/9sOLRhns5l6TC2uP5BRhF14RIUk.png?width=960&height=1200",
  },
  {
    name: "Noah Hayes",
    title: "Technical Consultant",
    quote:
      "The Custom Project option allowed us to build exactly what we needed. The API-first approach made integrations very smooth.",
    avatar:
      "https://framerusercontent.com/images/2T0ZuDGJ91K2VQX5Hu2Mk3YE2no.png?width=960&height=1200",
  },
  {
    name: "Jenna Wallace",
    title: "Startup Founder",
    quote:
      "We started with the Starter package and later expanded our setup. The dashboard and infrastructure adapted perfectly as we grew.",
    avatar:
      "https://framerusercontent.com/images/dPCyMK1mMc6lEw4PNgOWalWDnWg.png?width=1200&height=1200",
  },
];

function Card({ t }: { t: Testimonial }) {
  // Check if avatar is already a full URL (external) or a path (internal)
  const avatarSrc =
    t.avatar.startsWith("http://") || t.avatar.startsWith("https://")
      ? t.avatar // External URL - use directly
      : cdn(t.avatar, 40, 75); // Internal path - use CDN helper

  return (
    <div className="w-full rounded-[15px] border border-white/5 bg-[#0a0a0a] hover:bg-[#0f0f0f] transition-colors">
      <div className="p-4">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-full overflow-hidden relative flex-shrink-0">
            <Image
              src={avatarSrc}
              alt={`${t.name} - ${t.title}`}
              fill
              className="object-cover"
              sizes="40px"
              loading="lazy"
              quality={75}
              unoptimized
            />
          </div>
          <div className="flex flex-col">
            <h4 className="text-white text-base md:text-lg font-semibold">
              {t.name}
            </h4>
            <p className="text-white/70 text-sm md:text-base">{t.title}</p>
          </div>
        </div>
        <p className="mt-4 text-white/80 text-sm leading-relaxed">{t.quote}</p>
      </div>
    </div>
  );
}

export default function Testimional() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "end 20%"],
  });
  const yLeftRaw = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const yRightRaw = useTransform(scrollYProgress, [0, 1], [-60, 60]);
  const yLeft = useSpring(yLeftRaw, { stiffness: 80, damping: 20, mass: 0.5 });
  const yRight = useSpring(yRightRaw, {
    stiffness: 80,
    damping: 20,
    mass: 0.5,
  });

  const xGradientRaw = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const xGradient = useSpring(xGradientRaw, {
    stiffness: 80,
    damping: 20,
    mass: 0.5,
  });

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="bg-[#000000] py-8 md:py-12 flex flex-col items-center gap-[70px] w-full px-[20px] md:px-10 relative overflow-visible"
    >
      {/* Mobile-only top divider across the section */}
      <div className="md:hidden w-full max-w-[580px] mx-auto h-px " />
      <div className="flex w-full max-w-[580px] md:max-w-[1100px] flex-col md:flex-row items-start md:items-start justify-between gap-10 md:gap-0 mx-auto relative">
        {/* Top divider aligned to container top */}
        <div className="absolute inset-x-0 top-0 h-px " />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute hidden md:block z-[1]"
          style={{
            opacity: 0.5,
            zIndex: 1,
            width: 780,
            height: 953,
            bottom: 143,
            left: "calc(12% - 390px)",
            filter: "blur(2px)",
            x: xGradient,
            willChange: "transform",
          }}
        />
        <div className="relative md:sticky md:top-[120px] z-20 flex-1 min-w-0 md:pr-6">
          <div className="max-w-[600px] text-center md:text-left mx-auto md:mx-0">
            <h2 className="text-white text-[32px] md:text-[40px] lg:text-4xl leading-[1.1] tracking-[-0.02em] font-semibold md:leading-tight md:tracking-normal">
              Trusted by Forward-Thinking Customers
            </h2>
            <p className="mt-3 text-white/80 text-[16px] md:text-lg leading-[1.4] md:leading-relaxed">
              Real stories from users who&apos;ve transformed their digital
              business with AI-powered solutions, custom websites, e-commerce
              platforms, and automation tools.
            </p>
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="relative h-[845px] md:h-[845px] sm:h-[500px] overflow-hidden">
            {/* Top fade overlay - yukarıdan fade - daha belirgin */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-[#000000] via-[#000000]/95 via-[#000000]/60 to-transparent z-40" />
            {/* Bottom fade overlay - aşağıdan fade - daha belirgin */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#000000] via-[#000000]/95 via-[#000000]/60 to-transparent z-40" />
            <div className="absolute inset-0 pointer-events-none" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 h-full">
              <motion.div
                className="flex flex-col gap-2"
                style={{ y: yLeft, willChange: "transform" }}
              >
                {leftCol.map((t, i) => (
                  <Card key={`l-${i}`} t={t} />
                ))}
              </motion.div>

              <motion.div
                className="flex flex-col gap-2"
                style={{
                  y: yRight,
                  willChange: "transform",
                }}
              >
                {rightCol.map((t, i) => (
                  <Card key={`r-${i}`} t={t} />
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
