import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { JsonLd } from "@/seo/json-ld";
import ScrollNarrator from "@/components/ScrollNarrator";
import {
  buildWebPageSchema,
  buildOrganizationSchema,
  buildServiceSchema,
  buildFAQPageSchema,
} from "@/seo/json-ld/index";
import {
  Code2,
  Cloud,
  Database,
  Zap,
  Shield,
  Users,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Custom Software Development – Professional Software Solutions | Moydus",
  description:
    "Professional custom software development services. Building custom SaaS platforms, web applications, and automation tools. Full-stack software development for businesses worldwide across 150+ countries.",
  keywords: [
    "custom software development",
    "software development",
    "SaaS development",
    "web application development",
    "software solutions",
    "enterprise software",
    "custom software company",
    "global software development",
  ],
  alternates: {
    canonical: "https://www.moydus.com/custom-software-development",
  },
  openGraph: {
    title: "Custom Software Development – Professional Software Solutions | Moydus",
    description:
      "Professional custom software development services for businesses worldwide.",
    url: "https://www.moydus.com/custom-software-development",
    type: "website",
    locale: "en_US",
    siteName: "Moydus",
    images: [
      {
        url: "/custom-software-development/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Custom Software Development – Professional Software Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Software Development – Professional Software Solutions | Moydus",
    description:
      "Professional custom software development services for businesses worldwide.",
    images: ["/custom-software-development/opengraph-image"],
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

const services = [
  {
    icon: Code2,
    title: "Custom Software Development",
    description:
      "Tailored software solutions built to meet your specific business requirements globally.",
  },
  {
    icon: Cloud,
    title: "SaaS Platform Development",
    description:
      "Scalable SaaS platforms designed for growth and international expansion.",
  },
  {
    icon: Database,
    title: "Enterprise Software",
    description:
      "Robust enterprise solutions for large-scale operations worldwide.",
  },
  {
    icon: Zap,
    title: "Automation Tools",
    description:
      "AI-powered automation tools that streamline business processes globally.",
  },
  {
    icon: Shield,
    title: "Security & Compliance",
    description:
      "Secure software solutions meeting international security and compliance standards.",
  },
  {
    icon: Users,
    title: "API Development",
    description:
      "RESTful APIs and integrations for seamless connectivity worldwide.",
  },
];

export default function CustomSoftwareDevelopmentPage() {
  const breadcrumbs = [
    { name: "Home", url: "https://www.moydus.com" },
    {
      name: "Custom Software Development",
      url: "https://www.moydus.com/custom-software-development",
    },
  ];

  // Set publication and update dates for SEO (Google recommendation)
  const datePublished = "2024-01-15T00:00:00Z";
  const dateModified = new Date().toISOString();

  const pageSchema = buildWebPageSchema({
    url: "https://www.moydus.com/custom-software-development",
    title: "Custom Software Development – Professional Software Solutions | Moydus",
    description:
      "Professional custom software development services. Building custom SaaS platforms, web applications, and automation tools. Full-stack software development for businesses worldwide across 150+ countries.",
    datePublished,
    dateModified,
    image: {
      url: "https://www.moydus.com/custom-software-development/opengraph-image",
      width: 1200,
      height: 630,
      alt: "Custom Software Development – Professional Software Solutions",
    },
    breadcrumbItems: breadcrumbs,
    speakable: true,
  });

  const organizationSchema = buildOrganizationSchema();

  const serviceSchema = buildServiceSchema({
    url: "https://www.moydus.com/custom-software-development",
    name: "Custom Software Development Services",
    description:
      "Professional custom software development services. Building custom SaaS platforms, web applications, and automation tools. Full-stack software development for businesses worldwide across 150+ countries.",
    category: "Custom Software Development",
    image: {
      url: "https://www.moydus.com/custom-software-development/opengraph-image",
      width: 1200,
      height: 630,
      alt: "Custom Software Development Services",
    },
    areaServed: "Worldwide",
  });

  const faqs = [
    {
      question: "What is custom software development?",
      answer:
        "Custom software development involves building tailored software solutions specifically designed to meet your unique business requirements. Unlike off-the-shelf software, custom solutions are built from scratch to perfectly fit your workflows, processes, and business needs. Professional custom software development companies create scalable, secure applications using modern technologies to solve specific business problems and drive growth worldwide.",
    },
    {
      question: "How much does custom software development cost?",
      answer:
        "Custom software development costs vary significantly based on complexity, features, and scope. Simple applications may start around $10,000-$25,000, while enterprise-level SaaS platforms can range from $50,000-$500,000 or more. Factors affecting cost include development time, team size, technology stack, integrations, and ongoing maintenance requirements.",
    },
    {
      question: "How long does it take to develop custom software?",
      answer:
        "Custom software development timelines vary based on complexity. Simple applications typically take 2-4 months, while enterprise SaaS platforms can take 6-12 months or longer. Timeline factors include feature scope, integrations, testing requirements, and iteration cycles. Professional companies provide detailed project plans with milestones and regular updates.",
    },
    {
      question: "What technologies are used for custom software development?",
      answer:
        "Professional custom software development companies use modern technologies including React, Next.js, TypeScript for frontend; Node.js, Python, Java for backend; PostgreSQL, MongoDB for databases; AWS, Azure, GCP for cloud infrastructure; Docker, Kubernetes for containerization; and various APIs and microservices architectures. They choose technologies based on project requirements and scalability needs.",
    },
    {
      question:
        "Do custom software development companies provide ongoing support and maintenance?",
      answer:
        "Yes, most professional custom software development companies offer ongoing support and maintenance services. This includes bug fixes, security updates, performance optimization, feature additions, technical support, and infrastructure monitoring. Maintenance packages typically range from 15-25% of initial development cost annually, ensuring your software remains secure, updated, and performing optimally.",
    },
    {
      question: "Can custom software development companies help scale existing applications?",
      answer:
        "Yes, professional custom software development companies can help scale existing applications through code refactoring, database optimization, cloud migration, load balancing, caching strategies, and architecture improvements. They analyze your current system, identify bottlenecks, and implement scalable solutions to handle increased users, traffic, and data as your business grows globally.",
    },
  ];

  const faqSchema = buildFAQPageSchema(faqs);

  return (
    <>
      <JsonLd
        data={[organizationSchema, pageSchema, serviceSchema, faqSchema]}
      />
      <section className="min-h-screen bg-[#000000] text-white px-4 md:px-7 py-10 md:py-16 lg:py-20">
        <div className="container mx-auto max-w-7xl">
          {/* Hero Section */}
          <div className="text-center pt-8 md:pt-12 mb-8 md:mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-6 text-white">
              Custom Software Development
              <br />
              <span className="text-white/80">
                Building Tailored Software Solutions Worldwide
              </span>
            </h1>
            <p className="text-white/70 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-8">
              We develop custom software, SaaS platforms, and automation tools
              that help businesses grow and scale globally. Trusted by 10,000+
              customers across 150+ countries.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-white/90 transition-colors inline-flex items-center justify-center gap-2"
              >
                Get Started
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/marketplace/templates"
                className="bg-[#0a0a0a] border border-white/10 text-white px-8 py-3 rounded-full font-semibold hover:border-white/20 transition-colors inline-flex items-center justify-center gap-2"
              >
                View Templates
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Services Grid */}
          <div className="mb-20">
            <h2 className="text-3xl md:text-4xl font-semibold mb-12 text-white text-center">
              Our Custom Software Development Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <div
                    key={index}
                    className="bg-[#0a0a0a] border border-[#262626] rounded-2xl p-6 hover:border-white/20 transition-colors"
                  >
                    <div className="bg-white/10 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-white">
                      {service.title}
                    </h3>
                    <p className="text-white/70 text-base leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Main Content Section */}
          <div className="mb-20 max-w-4xl mx-auto">
            <div className="prose prose-invert prose-lg max-w-none">
              <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-white">
                What is Custom Software Development?
              </h2>
              <p className="text-white/80 text-base md:text-lg leading-relaxed mb-6">
                Custom software development involves building tailored software
                solutions specifically designed to meet your unique business
                requirements. Unlike off-the-shelf software, custom solutions are
                built from scratch to perfectly fit your workflows, processes, and
                business needs across all markets and regions worldwide.
              </p>
              <p className="text-white/80 text-base md:text-lg leading-relaxed mb-6">
                At Moydus, we combine technical expertise with business
                understanding to build custom software solutions that not only
                function flawlessly but also drive measurable business results.
                Our global team serves businesses worldwide across 150+ countries,
                ensuring your software performs optimally regardless of
                geographic location or industry.
              </p>

              <h3 className="text-2xl md:text-3xl font-semibold mb-4 text-white mt-12">
                Why Choose Custom Software Development?
              </h3>
              <p className="text-white/80 text-base md:text-lg leading-relaxed mb-4">
                Investing in custom software development offers numerous
                advantages over off-the-shelf solutions or generic software.
                Here&apos;s why businesses worldwide trust custom development:
              </p>
              <ul className="text-white/80 text-base md:text-lg leading-relaxed mb-6 space-y-3 list-disc list-inside">
                <li>
                  <strong className="text-white">Tailored Solutions:</strong>{" "}
                  Every software application is built to your exact
                  specifications, ensuring it perfectly fits your business
                  processes and requirements across different markets.
                </li>
                <li>
                  <strong className="text-white">Scalable Architecture:</strong>{" "}
                  Professional developers build applications that can grow with
                  your business, handling increased users and data as you expand
                  globally.
                </li>
                <li>
                  <strong className="text-white">Security & Compliance:</strong>{" "}
                  Your software will be built with security best practices and
                  compliance standards, protecting your data and users
                  worldwide.
                </li>
                <li>
                  <strong className="text-white">Modern Technologies:</strong>{" "}
                  Custom development uses the latest technologies and best
                  practices, ensuring your software remains competitive and
                  maintainable internationally.
                </li>
                <li>
                  <strong className="text-white">Ongoing Support:</strong>{" "}
                  Professional companies provide continuous maintenance,
                  updates, and optimization to keep your software running
                  smoothly across all markets.
                </li>
              </ul>

              <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-white mt-16">
                The Impact of Custom Software Development on Your Business
              </h2>
              <p className="text-white/80 text-base md:text-lg leading-relaxed mb-6">
                Custom software development is a powerful business tool that can
                significantly impact your operations and efficiency. Well-built
                custom software improves productivity, reduces costs, and enables
                your business to serve customers more effectively. For businesses
                operating globally, custom software development ensures your
                applications maintain consistent performance and reliability across
                all markets and regions.
              </p>
              <p className="text-white/80 text-base md:text-lg leading-relaxed mb-6">
                When users interact with your custom software, they expect fast,
                reliable, and intuitive experiences. A professional development
                approach ensures your application meets these expectations,
                building trust and encouraging continued use. For international
                businesses, this reliability is even more critical as it
                establishes credibility with users who may be accessing your
                software from different time zones and locations.
              </p>
              <p className="text-white/80 text-base md:text-lg leading-relaxed mb-6">
                Beyond functionality, custom software development improves
                scalability and maintainability. Clean code, proper architecture,
                and modern technologies make it easier to add features, fix issues,
                and scale your application as your business grows. These factors
                directly contribute to lower long-term costs and increased
                flexibility. Additionally, well-architected custom software helps
                your business operate more efficiently, enabling you to serve more
                customers and expand into new markets worldwide.
              </p>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mb-20">
            <div className="max-w-4xl mx-auto space-y-4 border-t border-white/10 pt-10">
              <h2 className="text-2xl font-semibold text-white">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {faqs.map((faq, idx) => (
                  <details
                    key={idx}
                    className="rounded-xl border border-white/10 bg-white/5 p-4"
                  >
                    <summary className="cursor-pointer font-medium text-white">
                      {faq.question}
                    </summary>
                    <p className="mt-2 text-sm text-white/80 leading-relaxed">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-[#0a0a0a] border border-[#262626] rounded-2xl p-8 md:p-12 text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-white">
              Ready to Build Your Custom Software Solution?
            </h2>
            <p className="text-white/60 text-lg mb-8 max-w-2xl mx-auto">
              Let our expert developers create custom software for your
              business. Available for companies worldwide with scalable delivery
              and clear timelines.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-white/90 transition-colors inline-block"
              >
                Start Your Project
              </Link>
            </div>
          </div>

          {/* Related Services & Resources */}
          <div className="mb-20">
            <h2 className="text-3xl md:text-4xl font-semibold mb-12 text-white text-center">
              Related Services & Resources
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "Web Design",
                  description: "Custom website design solutions.",
                  href: "/web-design",
                },
                {
                  title: "Web Development",
                  description: "Full-stack web development services.",
                  href: "/web-development",
                },
                {
                  title: "E-Commerce Development",
                  description: "Online store development services.",
                  href: "/ecommerce-website-development",
                },
                {
                  title: "Multi-Vendor Marketplace",
                  description: "Marketplace platform development.",
                  href: "/multi-vendor-marketplace-development",
                },
              ].map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="bg-[#0a0a0a] border border-[#262626] rounded-xl p-6 hover:border-white/20 transition-colors block"
                >
                  <h3 className="text-lg font-semibold mb-2 text-white">
                    {item.title}
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          <div className="mt-16 pt-8 border-t border-[#262626] flex flex-wrap gap-4 text-sm justify-center">
            <Link
              href="/web-design"
              className="text-white/60 hover:text-white transition-colors"
            >
              Web Design
            </Link>
            <span className="text-white/40">|</span>
            <Link
              href="/web-development"
              className="text-white/60 hover:text-white transition-colors"
            >
              Web Development
            </Link>
            <span className="text-white/40">|</span>
            <Link
              href="/ecommerce-website-development"
              className="text-white/60 hover:text-white transition-colors"
            >
              E-Commerce Development
            </Link>
            <span className="text-white/40">|</span>
            <Link
              href="/multi-vendor-marketplace-development"
              className="text-white/60 hover:text-white transition-colors"
            >
              Multi-Vendor Marketplace
            </Link>
            <span className="text-white/40">|</span>
            <Link
              href="/contact"
              className="text-white/60 hover:text-white transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
      <ScrollNarrator />
    </>
  );
}

