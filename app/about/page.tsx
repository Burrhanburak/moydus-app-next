import React from "react";
import Image from "next/image";
import type { Metadata } from "next";
import { JsonLd } from "@/seo/json-ld";
import {
  buildWebPageSchema,
  buildOrganizationSchema,
} from "@/seo/json-ld/index";

export const metadata: Metadata = {
  title:
    "About Moydus – Building the Modern Software Development Platform | Global Digital Solutions",
  description:
    "We deliver high-performing e-commerce websites, custom web design, SaaS platforms, AI-powered automation tools, and global digital solutions. Trusted by 10,000+ customers across 150+ countries worldwide.",
  keywords: [
    "about moydus",
    "software development platform",
    "global digital solutions",
    "web design agency",
    "e-commerce solutions",
    "worldwide services",
  ],
  alternates: {
    canonical: "https://www.moydus.com/about",
  },
  openGraph: {
    title: "About Moydus – Building the Modern Software Development Platform",
    description:
      "We deliver high-performing e-commerce websites, custom web design, SaaS platforms, AI-powered automation tools, and global digital solutions. Trusted by 10,000+ customers across 150+ countries worldwide.",
    url: "https://www.moydus.com/about",
    type: "website",
    locale: "en_US",
    siteName: "Moydus",
    images: [
      {
        url: "/about/opengraph-image",
        width: 1200,
        height: 630,
        alt: "About Moydus – Building the Modern Software Development Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@moydus",
    title: "About Moydus – Building the Modern Software Development Platform",
    description:
      "We deliver high-performing e-commerce websites, custom web design, SaaS platforms, AI-powered automation tools, and global digital solutions.",
    images: ["/about/opengraph-image"],
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

function AboutPage() {
  const breadcrumbs = [
    { name: "Home", url: "https://www.moydus.com" },
    { name: "About", url: "https://www.moydus.com/about" },
  ];

  const pageSchema = buildWebPageSchema({
    url: "https://www.moydus.com/about",
    title: "About Moydus – Building the Modern Software Development Platform",
    description:
      "We deliver high-performing e-commerce websites, custom web design, SaaS platforms, AI-powered automation tools, and global digital solutions. Trusted by 10,000+ customers across 150+ countries worldwide.",
    image: {
      url: "https://www.moydus.com/about/opengraph-image",
      width: 1200,
      height: 630,
      alt: "About Moydus – Building the Modern Software Development Platform",
    },
    breadcrumbItems: breadcrumbs,
    speakable: true,
  });

  const organizationSchema = buildOrganizationSchema();

  return (
    <>
      <JsonLd data={[organizationSchema, pageSchema]} />
      <section className="py-22 bg-[#000000] min-h-screen px-4 md:px-7">
        <div className="container relative mx-auto flex flex-col gap-28">
          <div className="mx-auto w-full max-w-5xl px-6 md:max-w-7xl">
            <Image
              src="/about-logo-moydus.png"
              alt="Moydus company logo - Global digital solutions provider"
              width={280}
              height={380}
              className="mx-auto"
            />
            <h1 className="mb-2.5 text-[32px] md:text-[48px] lg:text-5xl font-semibold text-white text-center">
              Building the <br />
              Modern Software Development Platform
            </h1>
            <p className="text-base md:text-lg lg:text-[1.125rem] md:leading-[1.5] text-white/70 font-normal text-balance text-center mt-6">
              The web has come a long way in the last ten years, but why is
              software development stuck in the past?
              <br />
              It doesn&apos;t have to be that way. We want to change that. We
              want to reimagine software development for businesses worldwide.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <Image
              src="/moydus-two.png"
              alt="Moydus team working on global digital solutions and software development"
              width={800}
              height={400}
              className="size-full max-h-96 rounded-2xl object-cover"
            />
            <div className="bg-white/5 flex flex-col justify-between gap-10 rounded-2xl p-10">
              <p className="text-white/60 text-sm font-medium uppercase tracking-wide">
                OUR MISSION
              </p>
              <p className="text-lg md:text-xl font-medium text-white">
                We believe that building software should be insanely easy. That
                everyone should have the freedom to create the tools they need,
                without any developers, designers or drama. We want to create a
                platform that is easy to use, easy to understand, and accessible
                to businesses worldwide.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-6 md:gap-20">
            <div className="max-w-xl">
              <h2 className="mb-2.5 text-[32px] md:text-[40px] lg:text-5xl font-semibold text-white">
                We Make Creating Software Ridiculously Easy
              </h2>
              <p className="text-white/70 text-base md:text-lg">
                We aim to help empower 1,000,000 teams worldwide to create their
                own software. Here is how we plan on doing it.
              </p>
            </div>
            <div className="grid gap-10 md:grid-cols-3">
              <div className="flex flex-col">
                <div className="bg-accent mb-5 flex size-12 items-center justify-center rounded-2xl">
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
                    className="lucide lucide-files size-5"
                    aria-hidden="true"
                  >
                    <path d="M20 7h-3a2 2 0 0 1-2-2V2"></path>
                    <path d="M9 18a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h7l4 4v10a2 2 0 0 1-2 2Z"></path>
                    <path d="M3 7.6v12.8A1.6 1.6 0 0 0 4.6 22h9.8"></path>
                  </svg>
                </div>
                <h3 className="mb-3 mt-2 text-xl md:text-2xl font-semibold text-white">
                  Being Radically Open
                </h3>
                <p className="text-white/70 text-base md:text-lg">
                  We believe there&apos;s no room for big egos and there&apos;s
                  always time to help each other. We strive to give and receive
                  feedback, ideas, perspectives
                </p>
              </div>
              <div className="flex flex-col">
                <div className="bg-accent mb-5 flex size-12 items-center justify-center rounded-2xl">
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
                    className="lucide lucide-circle-arrow-right size-5"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M8 12h8"></path>
                    <path d="m12 16 4-4-4-4"></path>
                  </svg>
                </div>
                <h3 className="mb-3 mt-2 text-xl md:text-2xl font-semibold text-white">
                  Moving the Needle
                </h3>
                <p className="text-white/70 text-base md:text-lg">
                  Boldly, bravely and with clear aims. We seek out the big
                  opportunities and double down on the most important things to
                  work on.
                </p>
              </div>
              <div className="flex flex-col">
                <div className="bg-accent mb-5 flex size-12 items-center justify-center rounded-2xl">
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
                    className="lucide lucide-settings size-5"
                    aria-hidden="true"
                  >
                    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                </div>
                <h3 className="mb-3 mt-2 text-xl md:text-2xl font-semibold text-white">
                  Optimizing for Empowerment
                </h3>
                <p className="text-white/70 text-base md:text-lg">
                  We believe that everyone should be empowered to do whatever
                  they think is in the company&apos;s best interests.
                </p>
              </div>
            </div>
          </div>
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <p className="text-white/60 mb-10 text-sm font-medium uppercase tracking-wide">
                JOIN OUR TEAM
              </p>
              <h2 className="mb-2.5 text-[32px] md:text-[40px] lg:text-5xl font-semibold text-white">
                We&apos;re Changing How Software is Made Worldwide
              </h2>
            </div>
            <div>
              <Image
                src="/team-moydus.png"
                alt="Team of moydus in the office"
                width={800}
                height={144}
                className="mb-6 max-h-96 w-full rounded-xl object-cover"
              />
              <p className="text-white/70 text-base md:text-lg">
                And we&apos;re looking for the right people to help us do it. If
                you&apos;re passionate about making change in the world and
                building global digital solutions, this might be the place for
                you.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default AboutPage;
