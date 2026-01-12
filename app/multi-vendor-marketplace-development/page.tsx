import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import Image from "next/image";
import { JsonLd } from "@/seo/json-ld";
import ScrollNarrator from "@/components/ScrollNarrator";
import {
  buildWebPageSchema,
  buildOrganizationSchema,
  buildServiceSchema,
  buildFAQPageSchema,
} from "@/seo/json-ld/index";
import {
  Building2,
  Users,
  ShoppingCart,
  Store,
  Network,
  Shield,
  Zap,
  CheckCircle2,
  ArrowRight,
  Globe,
  CreditCard,
  BarChart3,
} from "lucide-react";
import { cdn } from "@/lib/cdn";

export const metadata: Metadata = {
  title: "Multi-Vendor Marketplace Development – Custom B2B & B2C Platform Solutions | Moydus",
  description: "Professional multi-vendor marketplace development. Custom B2B and B2C marketplace platforms, vendor management systems, and e-commerce solutions built to scale. Serving businesses worldwide across 150+ countries.",
  keywords: [
    "multi-vendor marketplace",
    "marketplace development",
    "B2B marketplace",
    "B2C marketplace",
    "vendor management system",
    "multi-vendor platform",
    "e-commerce marketplace",
    "custom marketplace",
    "multi-seller platform",
    "marketplace platform development",
    "global marketplace development",
  ],
  alternates: {
    canonical: "https://www.moydus.com/multi-vendor-marketplace-development",
  },
  openGraph: {
    title: "Multi-Vendor Marketplace Development – Custom B2B & B2C Platform Solutions | Moydus",
    description: "Professional multi-vendor marketplace development for B2B and B2C businesses worldwide.",
    url: "https://www.moydus.com/multi-vendor-marketplace-development",
    type: "website",
    locale: "en_US",
    siteName: "Moydus",
    images: [
      {
        url: "/multi-vendor-marketplace-development/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Multi-Vendor Marketplace Development – Custom B2B & B2C Platform Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Multi-Vendor Marketplace Development – Custom B2B & B2C Platform Solutions | Moydus",
    description: "Professional multi-vendor marketplace development for B2B and B2C businesses worldwide.",
    images: ["/multi-vendor-marketplace-development/opengraph-image"],
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
    icon: Building2,
    title: "B2B Marketplace Platforms",
    description: "Custom B2B marketplace solutions connecting businesses with suppliers, distributors, and partners globally.",
  },
  {
    icon: Users,
    title: "B2C Marketplace Solutions",
    description: "Consumer-focused marketplace platforms with vendor management, payment processing, and order fulfillment.",
  },
  {
    icon: Store,
    title: "Multi-Vendor Platforms",
    description: "Scalable multi-vendor e-commerce platforms supporting thousands of sellers with advanced vendor dashboards.",
  },
  {
    icon: Network,
    title: "Vendor Management Systems",
    description: "Comprehensive vendor onboarding, management, and analytics tools for marketplace operators worldwide.",
  },
  {
    icon: CreditCard,
    title: "Payment & Commission Systems",
    description: "Secure payment processing, commission management, and automated payout systems for global marketplaces.",
  },
  {
    icon: BarChart3,
    title: "Analytics & Reporting",
    description: "Advanced analytics dashboards for vendors, customers, and marketplace operators with real-time insights.",
  },
];

export default function MultiVendorMarketplaceDevelopmentPage() {
  const breadcrumbs = [
    { name: "Home", url: "https://www.moydus.com" },
    {
      name: "Multi-Vendor Marketplace Development",
      url: "https://www.moydus.com/multi-vendor-marketplace-development",
    },
  ];

  // Set publication and update dates for SEO (Google recommendation)
  const datePublished = "2024-01-15T00:00:00Z";
  const dateModified = new Date().toISOString();

  const pageSchema = buildWebPageSchema({
    url: "https://www.moydus.com/multi-vendor-marketplace-development",
    title: "Multi-Vendor Marketplace Development – Custom B2B & B2C Platform Solutions | Moydus",
    description:
      "Professional multi-vendor marketplace development. Custom B2B and B2C marketplace platforms, vendor management systems, and e-commerce solutions built to scale. Serving businesses worldwide across 150+ countries.",
    datePublished,
    dateModified,
    image: {
      url: "https://www.moydus.com/multi-vendor-marketplace-development/opengraph-image",
      width: 1200,
      height: 630,
      alt: "Multi-Vendor Marketplace Development – Custom B2B & B2C Platform Solutions",
    },
    breadcrumbItems: breadcrumbs,
    speakable: true,
  });

  const organizationSchema = buildOrganizationSchema();

  const serviceSchema = buildServiceSchema({
    url: "https://www.moydus.com/multi-vendor-marketplace-development",
    name: "Multi-Vendor Marketplace Development Services",
    description:
      "Professional multi-vendor marketplace development. Custom B2B and B2C marketplace platforms, vendor management systems, and e-commerce solutions built to scale. Serving businesses worldwide across 150+ countries.",
    category: "Multi-Vendor Marketplace Development",
    image: {
      url: "https://www.moydus.com/multi-vendor-marketplace-development/opengraph-image",
      width: 1200,
      height: 630,
      alt: "Multi-Vendor Marketplace Development Services",
    },
    areaServed: "Worldwide",
  });

  const faqs = [
    {
      question: "What is multi-vendor marketplace development?",
      answer:
        "Multi-vendor marketplace development involves building e-commerce platforms that allow multiple vendors to sell products on a single platform. These marketplaces support both B2B (business-to-business) and B2C (business-to-consumer) models, enabling vendors to manage their stores, products, inventory, and orders while providing customers with diverse product selections and seamless shopping experiences.",
    },
    {
      question: "What features are included in a multi-vendor marketplace platform?",
      answer:
        "A comprehensive multi-vendor marketplace platform includes vendor onboarding and management, product catalog management, inventory tracking, order management, payment processing with commission handling, vendor dashboards, customer reviews and ratings, shipping integration, tax calculation, analytics and reporting, and admin panels for marketplace operators. These features ensure smooth operations for vendors, customers, and platform administrators worldwide.",
    },
    {
      question: "How long does it take to build a multi-vendor marketplace platform?",
      answer:
        "Multi-vendor marketplace platform development timelines vary based on complexity. A basic multi-vendor platform typically takes 12-20 weeks, while enterprise-grade marketplaces with advanced features may take 6-12 months. Factors affecting timeline include vendor management complexity, payment integration requirements, custom features, third-party integrations, and scalability needs. Professional development teams provide detailed timelines and milestones.",
    },
    {
      question: "What technologies are used for multi-vendor marketplace development?",
      answer:
        "Professional multi-vendor marketplace platforms are built using modern technologies including React, Next.js for frontend; Node.js, Python, PostgreSQL for backend; payment gateways like Stripe, PayPal; cloud infrastructure (AWS, Vercel); real-time notification systems; and advanced analytics tools. These technologies ensure scalability, security, and performance for marketplaces serving global audiences.",
    },
    {
      question: "How do commission and payment systems work in multi-vendor marketplaces?",
      answer:
        "Multi-vendor marketplaces use automated commission systems that calculate fees based on sales, product categories, or vendor tiers. Payment processing handles customer payments, holds funds in escrow, deducts commissions, and distributes payouts to vendors on scheduled intervals. These systems support multiple payment methods, currencies, and comply with international financial regulations for global operations.",
    },
    {
      question: "Can a multi-vendor marketplace platform scale to support thousands of vendors?",
      answer:
        "Yes, professional multi-vendor marketplace platforms are built with scalability in mind, using cloud infrastructure, load balancing, database optimization, and microservices architecture. They can handle thousands of vendors, millions of products, and high transaction volumes. Scalable platforms include vendor onboarding automation, efficient search and filtering, CDN for global content delivery, and robust infrastructure that grows with your business across all markets.",
    },
  ];

  const faqSchema = buildFAQPageSchema(faqs);

  return (
    <>
      <JsonLd data={[organizationSchema, pageSchema, serviceSchema, faqSchema]} />
      <section className="min-h-screen bg-[#000000] text-white px-4 md:px-7 py-10 md:py-16 lg:py-20">
        <div className="container mx-auto max-w-7xl">
          {/* Hero Section */}
          <div className="text-center pt-8 md:pt-12 mb-8 md:mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-6 text-white">
              Multi-Vendor Marketplace Development
              <br />
              <span className="text-white/80">Custom B2B & B2C Platform Solutions</span>
            </h1>
            <p className="text-white/70 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-8">
              We build custom multi-vendor marketplace platforms, B2B and B2C e-commerce solutions, and vendor management systems. 
              Scalable marketplace development trusted by businesses worldwide across 150+ countries.
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

          {/* Featured Image */}
          <div className="w-full aspect-video rounded-2xl overflow-hidden bg-[#000000] mb-8 md:mb-12">
            <Image
              src={cdn("/multi-vendor-marketplace-development/hero.jpg", 1920, 90) || "/multi-vendor-marketplace-development/hero.jpg"}
              alt="Multi-Vendor Marketplace Development – Custom B2B & B2C Platform Solutions"
              width={1920}
              height={1080}
              className="w-full h-full object-cover"
              loading="eager"
              priority
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                if (!target.src.includes("/multi-vendor-marketplace-development/hero.jpg")) {
                  target.src = "/multi-vendor-marketplace-development/hero.jpg";
                }
              }}
            />
          </div>

          {/* Services Grid */}
          <div
            id="services"
            data-narration-section
            data-title="Our Multi-Vendor Marketplace Solutions"
            data-text="We offer comprehensive marketplace development services including B2B marketplace platforms, B2C marketplace solutions, multi-vendor platforms, vendor management systems, payment and commission systems, and analytics and reporting."
            className="mb-20"
          >
            <h2 className="text-3xl md:text-4xl font-semibold mb-12 text-white text-center">
              Our Multi-Vendor Marketplace Solutions
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
          <div
            id="main-content"
            data-narration-section
            data-title="What is Multi-Vendor Marketplace Development?"
            data-text="Multi-vendor marketplace development involves building e-commerce platforms that allow multiple vendors to sell products on a single platform. These marketplaces support both B2B and B2C models, enabling vendors to manage their stores, products, inventory, and orders while providing customers with diverse product selections and seamless shopping experiences across all markets worldwide."
            className="mb-20 max-w-4xl mx-auto"
          >
            <div className="prose prose-invert prose-lg max-w-none">
              <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-white">
                What is Multi-Vendor Marketplace Development?
              </h2>
              <p className="text-white/80 text-base md:text-lg leading-relaxed mb-6">
                Multi-vendor marketplace development involves building sophisticated e-commerce platforms 
                that allow multiple vendors to sell products on a single unified platform. These 
                marketplaces support both B2B (business-to-business) and B2C (business-to-consumer) 
                models, enabling vendors to manage their stores, products, inventory, and orders while 
                providing customers with diverse product selections and seamless shopping experiences. 
                Multi-vendor platforms are versatile solutions for businesses operating globally.
              </p>
              <p className="text-white/80 text-base md:text-lg leading-relaxed mb-6">
                At Moydus, we specialize in building custom multi-vendor marketplace platforms that 
                scale with your business. Our solutions include vendor management systems, payment 
                processing, commission handling, order fulfillment, and advanced analytics. We serve 
                businesses worldwide across 150+ countries, ensuring your marketplace platform performs 
                optimally regardless of geographic location, vendor count, or transaction volume.
              </p>

              <h3 className="text-2xl md:text-3xl font-semibold mb-4 text-white mt-12">
                Why Choose Professional Multi-Vendor Marketplace Development?
              </h3>
              <p className="text-white/80 text-base md:text-lg leading-relaxed mb-4">
                Building a successful multi-vendor marketplace platform requires expertise in e-commerce, 
                vendor management, payment systems, and scalability. Here&apos;s why businesses worldwide 
                trust professional development companies:
              </p>
              <ul className="text-white/80 text-base md:text-lg leading-relaxed mb-6 space-y-3 list-disc list-inside">
                <li>
                  <strong className="text-white">Vendor Management:</strong>{" "}
                  Comprehensive vendor onboarding, dashboard, and management tools that enable 
                  vendors to operate efficiently across different markets and regions.
                </li>
                <li>
                  <strong className="text-white">Payment & Commission Systems:</strong>{" "}
                  Secure payment processing with automated commission calculation, escrow 
                  management, and scheduled payouts supporting multiple currencies globally.
                </li>
                <li>
                  <strong className="text-white">Scalability:</strong>{" "}
                  Platforms built to handle thousands of vendors, millions of products, and 
                  high transaction volumes as your marketplace grows internationally.
                </li>
                <li>
                  <strong className="text-white">Security & Compliance:</strong>{" "}
                  Enterprise-grade security measures, PCI compliance, and international 
                  financial regulations to protect vendors, customers, and platform operators.
                </li>
                <li>
                  <strong className="text-white">Advanced Analytics:</strong>{" "}
                  Real-time insights for vendors, customers, and administrators with 
                  comprehensive reporting and data visualization tools.
                </li>
              </ul>

              <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-white mt-16">
                The Impact of Multi-Vendor Marketplace Platforms on Your Business
              </h2>
              <p className="text-white/80 text-base md:text-lg leading-relaxed mb-6">
                A well-built multi-vendor marketplace platform creates new revenue streams, expands your 
                product catalog without inventory investment, and connects you with vendors and customers 
                globally. Marketplace platforms enable businesses to scale rapidly by leveraging vendor 
                networks, reducing operational costs, and increasing market reach across different regions 
                and countries.
              </p>
              <p className="text-white/80 text-base md:text-lg leading-relaxed mb-6">
                For vendors, multi-vendor marketplace platforms provide access to established customer 
                bases, marketing support, and payment infrastructure. For customers, they offer diverse 
                product selections, competitive pricing, and convenient shopping experiences. For platform 
                operators, marketplaces generate revenue through commissions, subscription fees, and premium 
                features while building valuable vendor and customer relationships worldwide.
              </p>
              <p className="text-white/80 text-base md:text-lg leading-relaxed mb-6">
                Professional multi-vendor marketplace development ensures your platform handles complex 
                operations seamlessly, from vendor onboarding to order fulfillment. Advanced features like 
                real-time inventory sync, automated commission calculations, and multi-currency support 
                enable your marketplace to operate efficiently across international markets, time zones, 
                and regulatory environments.
              </p>
            </div>
          </div>

          {/* FAQ Section */}
          <div
            id="faq"
            data-narration-section
            data-title="Frequently Asked Questions"
            data-text="Common questions about multi-vendor marketplace platforms, platform features, development timelines, technologies used, payment systems, and scalability solutions."
            className="mb-20"
          >
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
          <div
            id="cta"
            data-narration-section
            data-title="Ready to Build Your Multi-Vendor Marketplace Platform?"
            data-text="Let our expert developers create a custom multi-vendor marketplace solution for your business. Available for companies worldwide with scalable delivery and clear timelines."
            className="bg-[#0a0a0a] border border-[#262626] rounded-2xl p-8 md:p-12 text-center mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-white">
              Ready to Build Your Multi-Vendor Marketplace Platform?
            </h2>
            <p className="text-white/60 text-lg mb-8 max-w-2xl mx-auto">
              Let our expert developers create a custom multi-vendor marketplace solution for your business. 
              Available for companies worldwide with scalable delivery and clear timelines.
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
                  title: "E-Commerce Development",
                  description: "Online store development services.",
                  href: "/ecommerce-website-development",
                },
                {
                  title: "Web Development",
                  description: "Custom web development solutions.",
                  href: "/web-development",
                },
                {
                  title: "Custom Software Development",
                  description: "Custom software solutions.",
                  href: "/custom-software-development",
                },
                {
                  title: "Web Design",
                  description: "Custom website design solutions.",
                  href: "/web-design",
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
              href="/ecommerce-website-development"
              className="text-white/60 hover:text-white transition-colors"
            >
              E-Commerce Development
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
              href="/custom-software-development"
              className="text-white/60 hover:text-white transition-colors"
            >
              Custom Software Development
            </Link>
            <span className="text-white/40">|</span>
            <Link
              href="/web-design"
              className="text-white/60 hover:text-white transition-colors"
            >
              Web Design
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

