"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const showcaseItems = [
  {
    id: 1,
    title: "Web Development",
    href: "/web-development",
    category: "Web Development",
    description:
      "Modern, responsive frontend development using React, Next.js, and cutting-edge technologies.",
    image: "/grid/grid6.png",
    alt: "Web Development",
  },
  {
    id: 2,
    title: "Web Design",
    href: "/web-design",
    category: "Web Design",
    description:
      "Custom, brand-focused designs tailored to your business goals and target audience worldwide.",
    image: "/grid/grid9.png",
    alt: "Web Design",
  },
  {
    id: 3,
    title: "E-Commerce Development",
    href: "/ecommerce-website-development",
    category: "E-Commerce Development",
    description:
      "Scalable e-commerce solutions built with Shopify, WooCommerce, and cutting-edge technologies.",
    image: "/grid/grid10.png",
    alt: "E-Commerce Development",
  },
  {
    id: 4,
    title: "Software Development",
    href: "/custom-software-development",
    category: "Software Development",
    description:
      "Custom software solutions built to meet your specific business requirements globally.",
    image: "/grid/grid20.png",
    alt: "Software Development",
  },
  {
    id: 5,
    title: "Multi-Vendor Marketplace",
    href: "/multi-vendor-marketplace-development",
    category: "Multi-Vendor Marketplace Development",
    description:
      "Custom B2B & B2C solutions & multi-vendor platforms built to meet your specific business requirements globally.",
    image: "/grid/b2b-moy.png",
    alt: "Multi-Vendor Marketplace Development",
  },
];

export default function GridTemp() {
  return (
    <section className="py-8 md:py-12 bg-[#000000]">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Header */}
        <motion.div
          className="mb-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ type: "spring", duration: 0.8, bounce: 0.01 }}
        >
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="text-white/60 inline-flex items-center gap-2 text-sm font-medium tracking-wide">
              <div className="bg-white h-2 w-2 rounded-full" />
              Enterprise Web Development Showcase
            </span>
          </motion.div>

          <motion.div
            className="flex flex-col items-center justify-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="text-6xl font-black leading-none tracking-tight text-white md:text-8xl lg:text-9xl">
              <span className="block">BUILDING</span>
              <span className="block">SYSTEMS</span>
            </h1>
            <p className="max-w-2xl text-white/70 text-[15px] md:text-base lg:text-lg leading-relaxed">
              High-performance websites, SaaS platforms, and secure enterprise
              builds—designed, shipped, and optimized end-to-end.
            </p>
          </motion.div>
        </motion.div>

        {/* Grid */}
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 md:grid-cols-2">
          {showcaseItems.map((item, index) => (
            <motion.div
              key={item.id}
              className="group relative cursor-pointer overflow-hidden rounded-3xl bg-black shadow-2xl"
              tabIndex={0}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                type: "spring",
                duration: 0.8,
                bounce: 0.01,
                delay: index * 0.1,
              }}
            >
              <Link href={item.href}>
                <div className="relative aspect-[5/5] overflow-hidden">
                  <Image
                    alt={item.alt}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    src={item.image}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                  {/* Category Badge */}
                  <motion.div
                    className="absolute left-4 top-4"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                  >
                    <span className="inline-block rounded-full border border-white/20 bg-black/50 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
                      {item.category}
                    </span>
                  </motion.div>

                  {/* Arrow Icon */}
                  <motion.div
                    className="absolute right-4 top-4 translate-x-2 transform opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 0, x: 10 }}
                    whileHover={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/30 bg-white/20 backdrop-blur-sm">
                      <ArrowUpRight
                        className="h-4 w-4 text-white"
                        aria-hidden="true"
                      />
                    </div>
                  </motion.div>

                  {/* Title & Description */}
                  <motion.div
                    className="absolute bottom-4 left-4 right-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 + 0.4 }}
                  >
                    <h3 className="mb-1 text-white text-[24px] md:text-2xl lg:text-3xl font-semibold tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-white/70 text-[15px] md:text-base lg:text-lg leading-relaxed opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      {item.description}
                    </p>
                  </motion.div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
