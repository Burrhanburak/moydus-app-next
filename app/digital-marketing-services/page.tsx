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
  Search,
  MapPin,
  TrendingUp,
  Target,
  BarChart3,
  Megaphone,
  ArrowRight,
} from "lucide-react";
import { cdn } from "@/lib/cdn";

export const metadata: Metadata = {
  title:
    "Digital Marketing Services – SEO, Content & Performance Marketing | Moydus",
  description:
    "Comprehensive digital marketing services including SEO, local SEO, content marketing, and performance marketing. Drive growth and visibility for your business worldwide.",
  keywords: [
    "digital marketing services",
    "SEO services",
    "local SEO",
    "content marketing",
    "performance marketing",
    "search engine optimization",
    "marketing agency",
    "digital marketing agency",
  ],
  alternates: {
    canonical: "https://www.moydus.com/digital-marketing-services",
  },
  openGraph: {
    title:
      "Digital Marketing Services – SEO, Content & Performance Marketing | Moydus",
    description:
      "Comprehensive digital marketing services to drive growth and visibility for your business.",
    url: "https://www.moydus.com/digital-marketing-services",
    type: "website",
    locale: "en_US",
    siteName: "Moydus",
    images: [
      {
        url: "/digital-marketing-services/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Digital Marketing Services – SEO, Content & Performance Marketing",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Digital Marketing Services – SEO, Content & Performance Marketing | Moydus",
    description:
      "Comprehensive digital marketing services to drive growth and visibility for your business.",
    images: ["/digital-marketing-services/opengraph-image"],
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
};

const services = [
  {
    icon: Search,
    title: "SEO Services",
    description:
      "Comprehensive search engine optimization to improve your visibility and rankings.",
    href: "/services?category=seo-services",
  },
  {
    icon: MapPin,
    title: "Local SEO",
    description:
      "Target local customers and improve your presence in local search results.",
    href: "/services?category=local-seo",
  },
  {
    icon: Megaphone,
    title: "Content Marketing",
    description:
      "Strategic content creation and distribution to engage and convert your audience.",
    href: "/services?category=content-marketing",
  },
  {
    icon: TrendingUp,
    title: "Performance Marketing",
    description:
      "Data-driven campaigns that deliver measurable results and ROI.",
    href: "/services?category=performance-marketing",
  },
  {
    icon: Target,
    title: "Social Media Marketing",
    description:
      "Build your brand presence and engage with customers on social platforms.",
    href: "/services?category=social-media-marketing",
  },
  {
    icon: BarChart3,
    title: "Analytics & Reporting",
    description:
      "Track performance and optimize campaigns with comprehensive analytics.",
    href: "/services?category=analytics",
  },
];

export default function DigitalMarketingServicesPage() {
  const breadcrumbs = [
    { name: "Home", url: "https://www.moydus.com" },
    {
      name: "Digital Marketing Services",
      url: "https://www.moydus.com/digital-marketing-services",
    },
  ];

  // Set publication and update dates for SEO (Google recommendation)
  const datePublished = "2024-01-15T00:00:00Z";
  const dateModified = new Date().toISOString();

  const pageSchema = buildWebPageSchema({
    url: "https://www.moydus.com/digital-marketing-services",
    title:
      "Digital Marketing Services – SEO, Content & Performance Marketing | Moydus",
    description:
      "Comprehensive digital marketing services including SEO, content marketing, and performance marketing to help your business grow and reach customers globally. Trusted by businesses across 150+ countries.",
    datePublished,
    dateModified,
    image: {
      url: "https://www.moydus.com/digital-marketing-services/opengraph-image",
      width: 1200,
      height: 630,
      alt: "Digital Marketing Services – SEO, Content & Performance Marketing",
    },
    breadcrumbItems: breadcrumbs,
    speakable: true,
  });

  const organizationSchema = buildOrganizationSchema();

  const serviceSchema = buildServiceSchema({
    url: "https://www.moydus.com/digital-marketing-services",
    name: "Digital Marketing Services",
    description:
      "Comprehensive digital marketing services including SEO, content marketing, and performance marketing to help your business grow and reach customers globally.",
    category: "Digital Marketing",
    image: {
      url: "https://www.moydus.com/digital-marketing-services/opengraph-image",
      width: 1200,
      height: 630,
      alt: "Digital Marketing Services",
    },
    areaServed: "Worldwide",
  });

  const faqs = [
    {
      question: "What digital marketing services do you offer?",
      answer:
        "We offer comprehensive digital marketing services including SEO (search engine optimization), local SEO, content marketing, performance marketing, social media marketing, and analytics & reporting. These services help businesses improve visibility, drive traffic, generate leads, and increase revenue across all markets worldwide.",
    },
    {
      question: "How long does it take to see results from digital marketing?",
      answer:
        "Digital marketing results vary by service type. SEO typically shows initial improvements in 3-6 months, with significant results in 6-12 months. Content marketing and social media can show engagement within weeks. Performance marketing (paid ads) can show immediate results. Most strategies require consistent effort and optimization for long-term success.",
    },
    {
      question: "Do you work with businesses globally?",
      answer:
        "Yes, we serve businesses worldwide across 150+ countries. Our digital marketing strategies are tailored to different markets, languages, and cultural contexts. We understand international SEO requirements, local search optimization, and global content distribution to help your business reach customers regardless of geographic location.",
    },
    {
      question: "What is the difference between SEO and performance marketing?",
      answer:
        "SEO (search engine optimization) focuses on improving organic search rankings through content, technical optimization, and link building—it's a long-term strategy with free traffic. Performance marketing (paid ads) delivers immediate, measurable results through platforms like Google Ads and social media ads—it requires ongoing budget but provides instant visibility and conversions.",
    },
    {
      question: "How do you measure digital marketing success?",
      answer:
        "We measure success through key performance indicators (KPIs) including organic traffic growth, search rankings, conversion rates, lead generation, revenue attribution, return on ad spend (ROAS), and customer acquisition cost (CAC). We provide comprehensive analytics and regular reporting to track performance and optimize campaigns for maximum ROI.",
    },
    {
      question: "Can digital marketing help my business rank higher in Google?",
      answer:
        "Yes, professional SEO services help your business rank higher in Google search results. This includes on-page optimization, technical SEO, content creation, link building, and local SEO strategies. Higher rankings lead to increased organic traffic, more leads, and improved brand visibility. SEO is a long-term investment that builds sustainable organic growth.",
    },
  ];

  const faqSchema = buildFAQPageSchema(faqs);

  return (
    <>
      <JsonLd
        data={[organizationSchema, pageSchema, serviceSchema, faqSchema]}
      />
      <section className="min-h-screen bg-[#000000] text-white px-4 md:px-7 py-18 md:py-16 lg:py-20">
        <div className="container mx-auto max-w-7xl">
          {/* Hero Section */}
          <div className="text-center pt-8 md:pt-12 mb-8 md:mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-6 text-white">
              Digital Marketing Services
              <br />
              <span className="text-white/80">
                Drive Growth & Visibility Worldwide
              </span>
            </h1>
            <p className="text-white/70 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-8">
              Comprehensive digital marketing services including SEO, content
              marketing, and performance marketing to help your business grow
              and reach customers globally. Trusted by businesses across 150+
              countries.
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
                href="/services"
                className="bg-[#0a0a0a] border border-white/10 text-white px-8 py-3 rounded-full font-semibold hover:border-white/20 transition-colors inline-flex items-center justify-center gap-2"
              >
                Explore All Services
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Featured Image */}
          <div className="w-full aspect-video rounded-2xl overflow-hidden bg-[#000000] mb-8 md:mb-12">
            <Image
              src={cdn("/digital-marketing-services/hero.jpg", 1920, 90) || "/digital-marketing-services/hero.jpg"}
              alt="Digital Marketing Services – SEO, Content & Performance Marketing"
              width={1920}
              height={1080}
              className="w-full h-full object-cover"
              loading="eager"
              priority
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                if (!target.src.includes("/digital-marketing-services/hero.jpg")) {
                  target.src = "/digital-marketing-services/hero.jpg";
                }
              }}
            />
          </div>

          {/* Services Grid */}
          <div className="mb-20">
            <h2 className="text-3xl md:text-4xl font-semibold mb-12 text-white text-center">
              Our Digital Marketing Services
            </h2>

            <div className="grid gap-10 md:grid-cols-2 px-2">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <div key={index} className="flex flex-col">
                    <Link href={service.href} className="group">
                      <div className="bg-accent mb-5 flex size-12 items-center justify-center rounded-2xl group-hover:bg-accent/80 transition-colors">
                        <Icon className="w-6 h-6 text-black" />
                      </div>
                      <h3 className="mb-3 mt-2 text-xl md:text-2xl font-semibold text-white group-hover:text-white/90 transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-white/70 text-base md:text-lg">
                        {service.description}
                      </p>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Main Content Section */}
          <div className="mb-20 max-w-4xl mx-auto">
            <div className="prose prose-invert prose-lg max-w-none">
              <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-white">
                What is Digital Marketing?
              </h2>
              <p className="text-white/80 text-base md:text-lg leading-relaxed mb-6">
                Digital marketing encompasses all marketing efforts that use
                digital channels to reach and engage customers. This includes
                SEO, content marketing, social media, email marketing, and
                performance marketing. For businesses operating globally,
                digital marketing provides scalable strategies to reach
                customers across different markets and regions worldwide.
              </p>
              <p className="text-white/80 text-base md:text-lg leading-relaxed mb-6">
                At Moydus, we combine data-driven strategies with creative
                execution to help your business grow and reach customers
                globally. Our global team serves businesses worldwide across
                150+ countries, ensuring your marketing campaigns perform
                optimally regardless of geographic location or target market.
              </p>

              <h3 className="text-2xl md:text-3xl font-semibold mb-4 text-white mt-12">
                Why Invest in Professional Digital Marketing?
              </h3>
              <p className="text-white/80 text-base md:text-lg leading-relaxed mb-4">
                Investing in professional digital marketing services offers
                numerous advantages over DIY approaches or generic campaigns.
                Here&apos;s why businesses worldwide trust professional
                agencies:
              </p>
              <ul className="text-white/80 text-base md:text-lg leading-relaxed mb-6 space-y-3 list-disc list-inside">
                <li>
                  <strong className="text-white">Increased Visibility:</strong>{" "}
                  Professional SEO and content marketing strategies improve your
                  search rankings, making it easier for customers worldwide to
                  discover your business.
                </li>
                <li>
                  <strong className="text-white">Higher ROI:</strong>{" "}
                  Data-driven campaigns optimize your marketing spend,
                  delivering better results and higher returns on investment
                  across all markets.
                </li>
                <li>
                  <strong className="text-white">Targeted Reach:</strong>{" "}
                  Professional marketers understand how to target specific
                  audiences, ensuring your campaigns reach the right customers
                  at the right time globally.
                </li>
                <li>
                  <strong className="text-white">Scalable Growth:</strong>{" "}
                  Digital marketing strategies can scale with your business,
                  accommodating growth across different markets and regions.
                </li>
                <li>
                  <strong className="text-white">Measurable Results:</strong>{" "}
                  Professional tools and analytics provide clear insights into
                  campaign performance, enabling continuous optimization for
                  businesses operating internationally.
                </li>
              </ul>

              <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-white mt-16">
                The Impact of Digital Marketing on Your Business
              </h2>
              <p className="text-white/80 text-base md:text-lg leading-relaxed mb-6">
                Professional digital marketing is a powerful business tool that
                can significantly impact your growth and revenue. Well-executed
                campaigns increase brand awareness, drive qualified traffic, and
                generate leads and sales. For businesses operating globally,
                professional digital marketing ensures your brand maintains
                consistent visibility and engagement across all markets and
                regions.
              </p>
              <p className="text-white/80 text-base md:text-lg leading-relaxed mb-6">
                When customers search for products or services online, they
                expect to find relevant, trustworthy businesses. Professional
                SEO and content marketing ensure your business appears in search
                results, building credibility and encouraging engagement. For
                international businesses, this visibility is even more critical
                as it establishes your presence in markets where you may not
                have physical locations.
              </p>
              <p className="text-white/80 text-base md:text-lg leading-relaxed mb-6">
                Beyond visibility, professional digital marketing improves
                conversion rates and customer lifetime value. Targeted
                campaigns, optimized landing pages, and personalized messaging
                increase the likelihood that visitors become customers. These
                factors directly contribute to higher revenue and improved
                business performance. Additionally, SEO-optimized content helps
                your business rank higher in search results, making it easier
                for potential customers worldwide to discover your services.
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
                  title: "Web Design Agency",
                  description: "Professional design agency services.",
                  href: "/web-design-agency",
                },
                {
                  title: "Web Development Company",
                  description: "Full-stack development services.",
                  href: "/web-development-company",
                },
                {
                  title: "All Services",
                  description: "Explore all our digital services.",
                  href: "/services",
                },
                {
                  title: "Blog",
                  description: "Latest marketing insights and tips.",
                  href: "/blog",
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
              Ready to Grow Your Business?
            </h2>
            <p className="text-white/60 text-lg mb-8 max-w-2xl mx-auto">
              Let our digital marketing experts help you reach more customers
              and drive growth. Available for businesses worldwide with scalable
              strategies and clear results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-white/90 transition-colors inline-block"
              >
                Start Your Campaign
              </Link>
            </div>
          </div>

          {/* Footer Links */}
          <div className="mt-16 pt-8 border-t border-[#262626] flex flex-wrap gap-4 text-sm justify-center">
            <Link
              href="/services"
              className="text-white/60 hover:text-white transition-colors"
            >
              All Services
            </Link>
            <span className="text-white/40">|</span>
            <Link
              href="/services?category=seo-services"
              className="text-white/60 hover:text-white transition-colors"
            >
              SEO Services
            </Link>
            <span className="text-white/40">|</span>
            <Link
              href="/services?category=content-marketing"
              className="text-white/60 hover:text-white transition-colors"
            >
              Content Marketing
            </Link>
            <span className="text-white/40">|</span>
            <Link
              href="/blog"
              className="text-white/60 hover:text-white transition-colors"
            >
              Blog
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
