"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, ArrowUpRight } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    date: "March 10, 2025",
    title: "UX That Converts (Motion + Accessibility)",
    description:
      "How we design fast, accessible interfaces that increase engagement without adding complexity.",
    image: "/2.webp",
    alt: "UX That Converts (Motion + Accessibility)",
  },
  {
    id: 2,
    date: "February 22, 2025",
    title: "Social Media Campaigns That Drive Growth",
    description:
      "Data-driven content, targeted ads, and performance tracking—turning social platforms into measurable growth channels.",
    image: "/m-social.png",
    alt: "Social Media Campaigns That Drive Growth",
  },
];

export default function SectionGrid() {
  return (
    <section className="bg-[#000000] py-16 md:py-24">
      <div className="container mx-auto">
        <div className="flex flex-col gap-10 px-4">
          {/* Header */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-12 md:items-end">
            <h2 className="md:col-span-5 text-3xl font-bold text-white md:text-5xl">
              Recent work & insights
            </h2>

            <p className="md:col-span-5 text-white/70 text-sm md:text-base leading-relaxed">
              High-performing websites, e-commerce platforms, and SaaS builds—
              shipped with security, performance, and clean UI systems.
            </p>

            <div className="md:col-span-2 flex md:justify-end">
              <Button
                asChild
                className="bg-white text-black hover:bg-white/90 rounded-xl"
              >
                <Link href="/contact">
                  Contact us
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 gap-2 md:grid-cols-4">
            {/* Small cards */}
            {blogPosts.map((post) => (
              <Card
                key={post.id}
                className="bg-[#000000] text-white flex flex-col gap-6 col-span-1 rounded-xl border border-[#262626] p-4 shadow-none"
              >
                <div className="flex h-full w-full flex-col justify-between gap-4">
                  <div className="relative w-full">
                    <Image
                      alt={post.alt}
                      className="size-24 rounded-xl lg:size-32 object-cover"
                      src={post.image}
                      width={128}
                      height={128}
                    />
                    <div className="absolute right-0 top-0">
                      <span className="inline-flex items-center justify-center">
                        <Plus
                          className="bg-[#262626] rounded-full p-0.5 text-white"
                          aria-hidden="true"
                        />
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <span className="text-white/60 text-xs">{post.date}</span>
                    <h3 className="text-lg font-semibold text-white">
                      {post.title}
                    </h3>
                    <p className="text-white/60 text-sm leading-relaxed">
                      {post.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}

            {/* Featured */}
            <Card className="text-white flex flex-col gap-6 min-h-[30rem] rounded-xl border border-[#262626] bg-[#000000] py-0 shadow-none md:col-span-2 md:min-h-[32rem] overflow-hidden">
              <Link href="/contact" className="block h-full">
                <div className="relative h-full w-full">
                  <Image
                    alt="Inside our delivery process"
                    className="h-full w-full object-cover"
                    src="/1.webp"
                    width={800}
                    height={600}
                    priority={false}
                  />

                  <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/90" />

                  <div className="absolute top-0 flex w-full items-center justify-between p-6">
                    <div className="text-sm font-semibold text-white/90">
                      moydus®
                    </div>
                    <Plus
                      className="bg-[#262626] rounded-full p-0.5 text-white"
                      aria-hidden="true"
                    />
                  </div>

                  <div className="absolute bottom-0 w-full p-8 md:p-10">
                    <h3 className="text-white text-xl font-semibold md:text-3xl lg:text-4xl">
                      How we ship enterprise sites without surprises
                    </h3>
                    <p className="mt-3 max-w-xl text-white/70 text-sm md:text-base">
                      A practical look at our workflow: design → build → QA →
                      performance → secure release.
                    </p>
                  </div>
                </div>
              </Link>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
