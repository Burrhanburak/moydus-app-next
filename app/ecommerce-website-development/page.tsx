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
  ShoppingCart,
  CreditCard,
  Package,
  TrendingUp,
  Globe,
  Shield,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "E-Commerce Website Development | Moydus",
  description:
    "Professional e-commerce website development services. Build high-converting online stores, shopping carts, and payment systems for businesses worldwide. Trusted by 10,000+ customers across 150+ countries.",
  keywords: [
    "e-commerce website development",
    "online store development",
    "e-commerce platform",
    "shopping cart development",
    "payment integration",
    "e-commerce solutions",
    "global e-commerce",
    "worldwide online stores",
  ],
  alternates: {
    canonical: "https://www.moydus.com/ecommerce-website-development",
  },
  openGraph: {
    title:
      "E-Commerce Website Development – Online Store Development Services | Moydus",
    description:
      "Professional e-commerce website development services for businesses worldwide.",
    url: "https://www.moydus.com/ecommerce-website-development",
    type: "website",
    locale: "en_US",
    siteName: "Moydus",
    images: [
      {
        url: "/ecommerce-website-development/opengraph-image",
        width: 1200,
        height: 630,
        alt: "E-Commerce Website Development – Online Store Development Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "E-Commerce Website Development – Online Store Development Services | Moydus",
    description:
      "Professional e-commerce website development services for businesses worldwide.",
    images: ["/ecommerce-website-development/opengraph-image"],
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
    icon: ShoppingCart,
    title: "Custom E-Commerce Stores",
    description:
      "Fully customized online stores tailored to your brand and business needs worldwide.",
  },
  {
    icon: CreditCard,
    title: "Payment Integration",
    description:
      "Secure payment gateways supporting multiple currencies and payment methods globally.",
  },
  {
    icon: Package,
    title: "Inventory Management",
    description:
      "Advanced inventory and order management systems for efficient operations.",
  },
  {
    icon: TrendingUp,
    title: "Conversion Optimization",
    description:
      "Data-driven optimization to maximize sales and conversion rates internationally.",
  },
  {
    icon: Globe,
    title: "Multi-Language & Currency",
    description:
      "E-commerce platforms supporting multiple languages and currencies worldwide.",
  },
  {
    icon: Shield,
    title: "Security & Compliance",
    description:
      "PCI-compliant secure payment processing and data protection globally.",
  },
];

export default function EcommerceWebsiteDevelopmentPage() {
  const breadcrumbs = [
    { name: "Home", url: "https://www.moydus.com" },
    {
      name: "E-Commerce Website Development",
      url: "https://www.moydus.com/ecommerce-website-development",
    },
  ];

  // Set publication and update dates for SEO (Google recommendation)
  const datePublished = "2024-01-15T00:00:00Z";
  const dateModified = new Date().toISOString();

  const pageSchema = buildWebPageSchema({
    url: "https://www.moydus.com/ecommerce-website-development",
    title:
      "E-Commerce Website Development – Online Store Development Services | Moydus",
    description:
      "Professional e-commerce website development services. Build high-converting online stores, shopping carts, and payment systems for businesses worldwide. Trusted by 10,000+ customers across 150+ countries.",
    datePublished,
    dateModified,
    image: {
      url: "https://www.moydus.com/ecommerce-website-development/opengraph-image",
      width: 1200,
      height: 630,
      alt: "E-Commerce Website Development – Online Store Development Services",
    },
    breadcrumbItems: breadcrumbs,
    speakable: true,
  });

  const organizationSchema = buildOrganizationSchema();

  const serviceSchema = buildServiceSchema({
    url: "https://www.moydus.com/ecommerce-website-development",
    name: "E-Commerce Website Development Services",
    description:
      "Professional e-commerce website development services. Build high-converting online stores, shopping carts, and payment systems for businesses worldwide.",
    category: "E-Commerce Development",
    image: {
      url: "https://www.moydus.com/ecommerce-website-development/opengraph-image",
      width: 1200,
      height: 630,
      alt: "E-Commerce Website Development Services",
    },
    areaServed: "Worldwide",
  });

  const faqs = [
    {
      question: "What is e-commerce website development?",
      answer:
        "E-commerce website development involves building custom online stores that enable businesses to sell products and services directly to customers through the internet. This includes shopping cart functionality, payment processing, inventory management, order tracking, and customer accounts. Professional e-commerce development creates scalable, secure platforms optimized for conversions and sales worldwide.",
    },
    {
      question: "How much does e-commerce website development cost?",
      answer:
        "E-commerce development costs vary based on features, complexity, and integrations. Basic online stores typically start around $3,000-$5,000, while custom e-commerce platforms with advanced features can range from $10,000-$50,000 or more. Factors affecting cost include product catalog size, payment gateways, shipping integrations, custom features, and ongoing maintenance requirements.",
    },
    {
      question: "How long does it take to build an e-commerce website?",
      answer:
        "E-commerce website development typically takes 6-16 weeks depending on complexity. Simple stores with standard features may take 6-8 weeks, while custom platforms with advanced functionality can take 12-16 weeks or longer. Timeline factors include design complexity, custom features, integrations, product catalog size, and testing requirements.",
    },
    {
      question:
        "What payment methods can be integrated into an e-commerce site?",
      answer:
        "Professional e-commerce platforms support multiple payment methods including credit/debit cards (via Stripe, PayPal, Square), digital wallets (Apple Pay, Google Pay), bank transfers, buy now pay later options, and cryptocurrency. Payment integration depends on your target markets, as different regions prefer different payment methods. We ensure PCI-compliant, secure payment processing worldwide.",
    },
    {
      question: "Do e-commerce websites work on mobile devices?",
      answer:
        "Yes, professional e-commerce websites are fully responsive and optimized for mobile devices. Mobile commerce (m-commerce) is essential, as over 60% of online purchases are made on mobile devices. We ensure your store provides excellent mobile shopping experiences with fast loading times, easy navigation, and streamlined checkout processes across all devices.",
    },
    {
      question: "Can you help with e-commerce SEO and marketing?",
      answer:
        "Yes, we build SEO-friendly e-commerce platforms with optimized product pages, category structures, and technical SEO. We also offer digital marketing services including SEO, content marketing, and performance marketing to help drive traffic and sales. Our integrated approach ensures your online store ranks well in search results and converts visitors into customers.",
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
              E-Commerce Website Development
              <br />
              <span className="text-white/80">
                Building High-Converting Online Stores Worldwide
              </span>
            </h1>
            <p className="text-white/70 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-8">
              We develop custom e-commerce websites, online stores, and shopping
              platforms that drive sales and scale globally. Trusted by 10,000+
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
                View E-Commerce Templates
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Services Grid */}
          <div className="mb-20">
            <h2 className="text-3xl md:text-4xl font-semibold mb-12 text-white text-center">
              Our E-Commerce Development Services
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
                What is E-Commerce Website Development?
              </h2>
              <p className="text-white/80 text-base md:text-lg leading-relaxed mb-6">
                E-commerce website development involves building custom online
                stores that enable businesses to sell products and services
                directly to customers through the internet. Unlike
                template-based solutions, professional e-commerce development
                delivers scalable, secure, and high-converting platforms that
                drive sales across all markets and regions worldwide.
              </p>
              <p className="text-white/80 text-base md:text-lg leading-relaxed mb-6">
                At Moydus, we combine technical expertise with e-commerce best
                practices to build online stores that not only look professional
                but also convert visitors into customers. Our global team serves
                businesses worldwide across 150+ countries, ensuring your
                e-commerce platform performs optimally regardless of geographic
                location or target market.
              </p>

              <h3 className="text-2xl md:text-3xl font-semibold mb-4 text-white mt-12">
                Why Choose Professional E-Commerce Development?
              </h3>
              <p className="text-white/80 text-base md:text-lg leading-relaxed mb-4">
                Investing in professional e-commerce development offers numerous
                advantages over DIY solutions or generic platforms. Here&apos;s
                why businesses worldwide trust professional developers:
              </p>
              <ul className="text-white/80 text-base md:text-lg leading-relaxed mb-6 space-y-3 list-disc list-inside">
                <li>
                  <strong className="text-white">Custom Solutions:</strong>{" "}
                  Every e-commerce platform is built to your exact
                  specifications, ensuring it perfectly fits your business model
                  and workflows across different markets.
                </li>
                <li>
                  <strong className="text-white">
                    Conversion Optimization:
                  </strong>{" "}
                  Professional developers implement best practices for product
                  pages, checkout processes, and user experience, maximizing
                  sales potential globally.
                </li>
                <li>
                  <strong className="text-white">Security & Compliance:</strong>{" "}
                  Your platform will be built with PCI-compliant payment
                  processing and security measures, protecting customer data
                  worldwide.
                </li>
                <li>
                  <strong className="text-white">Scalability:</strong>{" "}
                  Professional e-commerce platforms can handle increased traffic
                  and sales as your business grows internationally.
                </li>
                <li>
                  <strong className="text-white">SEO Optimization:</strong>{" "}
                  Built-in SEO features help your products rank in search
                  results, making it easier for customers worldwide to discover
                  your store.
                </li>
              </ul>

              <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-white mt-16">
                The Impact of Professional E-Commerce Development on Your
                Business
              </h2>
              <p className="text-white/80 text-base md:text-lg leading-relaxed mb-6">
                A professionally developed e-commerce platform is a powerful
                business tool that can significantly impact your sales and
                revenue. Well-built online stores improve user experience,
                increase conversion rates, and enable your business to serve
                customers more effectively. For businesses operating globally,
                professional e-commerce development ensures your platform
                maintains consistent performance and reliability across all
                markets and regions.
              </p>
              <p className="text-white/80 text-base md:text-lg leading-relaxed mb-6">
                When customers shop online, they expect fast, secure, and
                intuitive experiences. A professional development approach
                ensures your e-commerce platform meets these expectations,
                building trust and encouraging purchases. For international
                businesses, this reliability is even more critical as it
                establishes credibility with customers who may be shopping from
                different countries and currencies.
              </p>
              <p className="text-white/80 text-base md:text-lg leading-relaxed mb-6">
                Beyond functionality, professional e-commerce development
                improves scalability and maintainability. Clean code, proper
                architecture, and modern technologies make it easier to add
                products, process orders, and scale your store as your business
                grows. These factors directly contribute to lower long-term
                costs and increased flexibility. Additionally, SEO-optimized
                development helps your products rank higher in search results,
                making it easier for potential customers worldwide to discover
                your store.
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
                  title: "Custom Software Development",
                  description: "Custom software solutions.",
                  href: "/custom-software-development",
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

          {/* CTA Section */}
          <div className="bg-[#0a0a0a] border border-[#262626] rounded-2xl p-8 md:p-12 text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-white">
              Ready to Launch Your Online Store?
            </h2>
            <p className="text-white/60 text-lg mb-8 max-w-2xl mx-auto">
              Let our team build a high-converting e-commerce website for your
              business. Available for brands worldwide with scalable solutions
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

          {/* Footer Links */}
          <div className="mt-16 pt-8 border-t border-[#262626] flex flex-wrap gap-4 text-sm justify-center">
            <Link
              href="/web-design-agency"
              className="text-white/60 hover:text-white transition-colors"
            >
              Web Design Agency
            </Link>
            <span className="text-white/40">|</span>
            <Link
              href="/web-design-company"
              className="text-white/60 hover:text-white transition-colors"
            >
              Web Design Company
            </Link>
            <span className="text-white/40">|</span>
            <Link
              href="/web-development-company"
              className="text-white/60 hover:text-white transition-colors"
            >
              Web Development Company
            </Link>
            <span className="text-white/40">|</span>
            <Link
              href="/software-company"
              className="text-white/60 hover:text-white transition-colors"
            >
              Software Company
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
