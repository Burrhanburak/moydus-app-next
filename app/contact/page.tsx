import React from "react";
import { ContactForm } from "@/components/form/ContactFrom";
import type { Metadata } from "next";
import { JsonLd } from "@/seo/json-ld";
import {
  buildWebPageSchema,
  buildOrganizationSchema,
} from "@/seo/json-ld/index";

export const metadata: Metadata = {
  title: "Contact Moydus – Get in Touch | Global Digital Solutions Support",
  description:
    "Contact Moydus for web design, e-commerce solutions, SaaS platforms, and AI automation services. We serve businesses worldwide across 150+ countries. Email: info@moydus.com",
  keywords: [
    "contact moydus",
    "web design contact",
    "digital solutions support",
    "global services",
    "worldwide support",
  ],
  alternates: {
    canonical: "https://www.moydus.com/contact",
  },
  openGraph: {
    title: "Contact Moydus – Get in Touch",
    description: "Contact our team for global digital solutions and support.",
    url: "https://www.moydus.com/contact",
    type: "website",
    locale: "en_US",
    siteName: "Moydus",
    images: [
      {
        url: "/contact/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Contact Moydus – Get in Touch | Global Digital Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Moydus – Get in Touch",
    description: "Contact our team for global digital solutions and support.",
    images: ["/contact/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  other: {
    "geo.region": "Global",
    "geo.placename": "Worldwide",
  },
};

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={[
          buildOrganizationSchema(),
          buildWebPageSchema({
            url: "https://www.moydus.com/contact",
            title: "Contact Moydus – Get in Touch",
            description:
              "Contact our team for global digital solutions and support.",
          }),
        ]}
      />
      <section className="relative h-full min-h-screen w-full overflow-x-hidden py-32 bg-[#000000]">
        <div className="container mx-auto px-6 md:px-7 static z-10 max-w-full">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
            {/* Sol taraf - Yazı */}
            <div className="flex-1 flex flex-col gap-10">
              <h1 className="font-playfair text-[32px] md:text-5xl lg:text-7xl font-medium tracking-tight text-white">
                Contact Us <br /> We Are Here to Help You Worldwide
              </h1>
              <p className="max-w-xl font-medium leading-relaxed text-base md:text-lg text-white/70">
                Reach out to our global team for web design, e-commerce
                solutions, SaaS platforms, and AI automation services. Email us
                at <span className="text-[#ff5309]">info@moydus.com</span>, and
                our team will get back to you as soon as possible.
              </p>
              <div className="flex items-center gap-4">
                <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:ring-[3px] bg-[#FF4D00] text-white shadow-xs hover:bg-[#FF4D00]/90 h-9 px-4 py-2 text-md rounded-xl ">
                  Explore{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-arrow-right -rotate-45"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </button>
                <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:ring-[3px] bg-white/10 text-white shadow-xs hover:bg-white/20 h-9 px-4 py-2 text-md rounded-xl ">
                  Documentation{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-arrow-right -rotate-45"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </button>
              </div>
              <div className="flex items-center justify-start gap-7">
                <div className="text-right">
                  <h2 className="text-left text-3xl md:text-4xl tracking-tight text-white font-medium">
                    $1.2M
                  </h2>
                  <p className="text-white/70 text-sm md:text-base">
                    Developer Trust
                  </p>
                </div>
                <div className="bg-white/20 h-24 w-px"></div>
                <div className="text-left">
                  <h2 className="text-3xl md:text-4xl tracking-tight text-white font-medium">
                    95.1%
                  </h2>
                  <p className="text-white/70 text-sm md:text-base">
                    Less Dev Time
                  </p>
                </div>
              </div>
            </div>

            {/* Sağ taraf - Form */}
            <div className="flex-1 w-full lg:max-w-lg">
              <ContactForm />
            </div>
          </div>
        </div>
        <div className="h-96 md:h-[40rem] w-full absolute bottom-0 left-0 right-0 bg-gradient-to-b from-transparent to-[#ff5309] z-0"></div>

        <div
          className="absolute bottom-0  inset-x-0 pointer-events-none"
          style={{
            boxShadow:
              "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset",
          }}
        ></div>
      </section>
    </>
  );
}
