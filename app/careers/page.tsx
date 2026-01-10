import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { r2cdn } from "@/lib/cdn";

export const metadata: Metadata = {
  title: "Careers at Moydus – Web, SaaS & Automation (Remote)",
  description:
    "Join Moydus to build high-performing websites, e-commerce experiences, SaaS platforms, and AI-powered automation for operators worldwide. Remote-first roles in engineering, design, and customer success.",
  keywords: [
    "Moydus careers",
    "remote jobs",
    "Next.js jobs",
    "Laravel jobs",
    "SaaS jobs",
    "e-commerce jobs",
    "automation jobs",
    "web design and development careers",
  ],
  openGraph: {
    title: "Careers at Moydus – Build Web, SaaS & Automation",
    description:
      "Remote-first team building websites, e-commerce, SaaS, and AI automation for operators worldwide.",
    type: "website",
    locale: "en_US",
    siteName: "Moydus",
  },
  alternates: { canonical: "https://www.moydus.com/careers" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  other: {
    "geo.region": "Global",
    "geo.placename": "Worldwide",
  },
};

const highlightCard = {
  title: "About Moydus",
  subtitle: "What we build for operators and modern teams",
  href: "/about",
  image: { src: "/moydus-tree.png", alt: "Moydus team collaborating" },
};

const principles = [
  {
    title: "Operator-first delivery",
    desc: "We build with outcomes in mind: growth, clarity, and operational speed.",
  },
  {
    title: "Performance & SEO by default",
    desc: "Fast pages, clean structure, and measurable improvements — not just visuals.",
  },
  {
    title: "Automation where it matters",
    desc: "AI workflows, integrations, and dashboards that reduce manual work.",
  },
  {
    title: "Small teams, high ownership",
    desc: "Clear scope, tight feedback loops, and shipping with quality.",
  },
];

const benefits = [
  {
    title: "Home Office Allowance",
    description: "Up to $2,000 to craft your ideal remote setup.",
    tag: "Global",
  },
  {
    title: "20 Days PTO",
    description: "Time to recharge and return ready to ship.",
    tag: "Global",
  },
  {
    title: "Unlimited Sick Days",
    description: "Take the time you need to recover and stay well.",
    tag: "Global",
  },
  {
    title: "Annual Retreat",
    description: "Meet the team in person somewhere inspiring each year.",
    tag: "Global",
  },
  {
    title: "Choose Your Holidays",
    description: "Pick 10 public holidays that match where you live.",
    tag: "Global",
  },
  {
    title: "Learning Budget",
    description: "Support for courses, tools, and growth in your craft.",
    tag: "Global",
  },
];

const positions = [
  {
    title: "Full-Stack Engineer (Next.js / Laravel)",
    location: "Remote / Full-time",
    href: "#",
  },
  {
    title: "Frontend Engineer (Next.js / UI Systems)",
    location: "Remote / Full-time",
    href: "#",
  },
  {
    title: "Automation Engineer (AI Workflows & Integrations)",
    location: "Remote / Full-time",
    href: "#",
  },
  {
    title: "UI/UX Designer (Web + SaaS)",
    location: "Remote / Contract or Full-time",
    href: "#",
  },
  {
    title: "Customer Success (Templates & Platform Support)",
    location: "Remote / Full-time",
    href: "#",
  },
];

const testimonials = [
  {
    quote:
      "We ship fast without sacrificing craft — performance, structure, and details always matter here.",
    name: "Team at Moydus",
    role: "Delivery principle",
  },
  {
    quote:
      "Operator-first means we build what actually moves the business: leads, conversions, automation, and clarity.",
    name: "Team at Moydus",
    role: "Product mindset",
  },
];

function CareersPage() {
  return (
    <div className="text-white">
      <main className="mx-auto w-full max-w-6xl px-6 pb-24">
        {/* HERO */}
        <section className="pt-24 text-center">
          <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-white/70">
            Remote-first • Global • Web • SaaS • Automation
          </p>

          <h1 className="mt-6 text-[34px] md:text-5xl lg:text-[3.25rem] font-semibold leading-tight">
            Build websites, SaaS, and automation that operators rely on
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base md:text-lg text-white/70">
            Moydus builds high-performing web experiences, e-commerce stores,
            custom admin panels, and AI-powered workflows for modern businesses.
            We care about speed, quality, and measurable outcomes.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="#open-positions"
              className="inline-flex items-center justify-center rounded-2xl bg-white px-6 py-3 text-base font-semibold text-black transition hover:opacity-90"
            >
              View open roles
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-base font-semibold text-white transition hover:bg-white/10"
            >
              Learn about Moydus
            </Link>
          </div>
        </section>

        {/* ABOUT + PRINCIPLES */}
        <section className="mt-14">
          <div className="grid gap-6 md:grid-cols-2">
            <Link
              href={highlightCard.href}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-7 transition hover:border-white/25"
            >
              <h2 className="text-xl font-semibold">{highlightCard.title}</h2>
              <p className="mt-2 text-sm text-white/70">
                {highlightCard.subtitle}
              </p>
              <div className="mt-6 overflow-hidden rounded-xl border border-white/10">
                <Image
                  src={r2cdn(highlightCard.image.src)}
                  alt={highlightCard.image.alt}
                  width={900}
                  height={520}
                  className="h-48 w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                  unoptimized
                />
              </div>
            </Link>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-7">
              <h2 className="text-xl font-semibold">How we work</h2>
              <div className="mt-5 grid gap-4">
                {principles.map((p) => (
                  <div
                    key={p.title}
                    className="rounded-xl border border-white/10 bg-black/20 p-4"
                  >
                    <p className="text-sm font-semibold text-white">
                      {p.title}
                    </p>
                    <p className="mt-1 text-sm text-white/70">{p.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* BENEFITS */}
        <section className="mt-20 text-center">
          <h2 className="text-[28px] md:text-4xl font-semibold">
            Benefits built for remote builders
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base md:text-lg text-white/70">
            A simple set of global benefits so you can focus on doing your best
            work.
          </p>

          <div className="mx-auto mt-10 grid w-full max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((b) => (
              <div
                key={b.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 text-left"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-semibold">{b.title}</h3>
                  <span className="shrink-0 rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
                    {b.tag}
                  </span>
                </div>
                <p className="mt-2 text-sm text-white/70">{b.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* OPEN POSITIONS */}
        <section id="open-positions" className="pt-20 scroll-mt-24">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-[28px] md:text-4xl font-semibold">
              Open roles
            </h2>
            <p className="mt-4 text-base md:text-lg text-white/70">
              If you care about craft, performance, and shipping real outcomes,
              we’d love to meet.
            </p>

            <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 text-left">
              <ul className="divide-y divide-white/10">
                {positions.map((p) => (
                  <li key={`${p.title}-${p.location}`}>
                    <Link
                      href={p.href}
                      className="block px-6 py-5 transition hover:bg-white/5"
                    >
                      <p className="text-base font-medium">{p.title}</p>
                      <p className="mt-1 text-sm text-white/60">{p.location}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 flex justify-center gap-3">
              <Link
                href="/careers/how-we-hire"
                className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
              >
                How we hire
              </Link>
              <Link
                href="/careers/all-roles"
                className="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black hover:opacity-90"
              >
                View all roles
              </Link>
            </div>
          </div>
        </section>

        {/* SOCIAL PROOF (LIGHT) */}
        <section className="mt-16">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-[28px] md:text-4xl font-semibold text-center">
              What we optimize for
            </h2>
            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {testimonials.map((t) => (
                <blockquote
                  key={t.role}
                  className="rounded-2xl border border-white/10 bg-white/5 p-7"
                >
                  <p className="text-sm leading-relaxed text-white/80">
                    “{t.quote}”
                  </p>
                  <div className="mt-5 border-t border-white/10 pt-4 text-sm text-white/60">
                    <p className="font-medium text-white">{t.name}</p>
                    <p>{t.role}</p>
                  </div>
                </blockquote>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="mt-16">
          <div className="mx-auto max-w-5xl rounded-2xl border border-white/10 bg-white/5 p-8 md:p-10 text-center">
            <h2 className="text-2xl md:text-3xl font-semibold">
              Ready to build with Moydus?
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm md:text-base text-white/70">
              We build web, e-commerce, SaaS, and automation systems that help
              operators move faster.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="#open-positions"
                className="inline-flex items-center justify-center rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-black hover:opacity-90"
              >
                View open roles
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
              >
                Contact recruiting
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default CareersPage;
