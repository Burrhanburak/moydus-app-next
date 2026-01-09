"use client";

import React from "react";
import { motion } from "framer-motion";
import { Rocket, ShoppingBag, Globe, Users } from "lucide-react";

type Client = {
  title: string;
  desc: string;
  icon: React.ReactNode;
};

function Card({ title, desc, icon, delay = 0 }: Client & { delay?: number }) {
  return (
    <motion.li
      className="bg-[#000000] hover:bg-[#0a0a0a] relative cursor-pointer gap-2 overflow-hidden px-4 py-3 rounded-[20px] border border-[#262626] transition-colors"
      style={{
        marginBlock: "10px",
        minHeight: "110px",
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ type: "spring", duration: 0.6, bounce: 0.1, delay }}
    >
      <div className="flex h-fit items-center gap-3 pl-1 pt-1">
        <div className="w-6 h-6 flex items-center justify-center text-white shrink-0">
          {icon}
        </div>
        <span className="text-sm tracking-tight text-white font-medium">
          {title}
        </span>
      </div>
      <p className="px-1 pt-2 pb-1 text-sm text-white/70">{desc}</p>
    </motion.li>
  );
}

const clients: Client[] = [
  {
    title: "Startups Building Their First Product",
    desc: "We help startups design, build, and launch their first digital products with clear roadmaps, fast iteration cycles, and scalable technical foundations.",
    icon: <Rocket className="w-6 h-6" />,
  },
  {
    title: "Growing E-Commerce Brands",
    desc: "We partner with e-commerce brands ready to scale, optimizing storefronts, performance, automation, and infrastructure to support increasing demand and revenue.",
    icon: <ShoppingBag className="w-6 h-6" />,
  },
  {
    title: "SaaS Companies Scaling Globally",
    desc: "We support SaaS teams scaling globally with robust architecture, performance optimization, and development processes designed for international growth.",
    icon: <Globe className="w-6 h-6" />,
  },
  {
    title: "Agencies & Teams Needing Technical Partners",
    desc: "We act as a reliable technical partner for agencies and teams, delivering high-quality development, automation, and infrastructure support when needed.",
    icon: <Users className="w-6 h-6" />,
  },
];

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

      <div className="flex flex-col items-center gap-[25px] w-full max-w-[600px] md:max-w-[1100px]">
        <div className="flex flex-col items-center gap-0 md:gap-[20px] w-full">
          <motion.h2
            className="text-white text-[32px] md:text-[40px] lg:text-4xl leading-[1.1] tracking-[-0.02em] font-semibold text-center md:leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ type: "spring", duration: 0.6, bounce: 0.05 }}
          >
            Who We Work With
          </motion.h2>
        </div>

        <ul className="grid w-full mx-auto gap-[10px] md:gap-[15px] grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-min list-none p-0 m-0">
          {clients.map((c, i) => (
            <Card
              key={i}
              title={c.title}
              desc={c.desc}
              icon={c.icon}
              delay={i * 0.12}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}
