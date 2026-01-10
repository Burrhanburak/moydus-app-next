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
  Layout,
  Rocket,
  Users,
  Target,
  TrendingUp,
  Award,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Web Design Company – Custom Website Design & Development | Moydus",
  description: "Leading web design company specializing in custom websites, e-commerce platforms, and SaaS solutions. Serving businesses worldwide with scalable design services across 150+ countries.",
  keywords: [
    "web design company",
    "website design company",
    "custom web design",
    "professional web design",
    "e-commerce design company",
    "SaaS design services",
    "global web design",
    "worldwide design company",
  ],
  alternates: {
    canonical: "https://www.moydus.com/web-design-company",
  },
  openGraph: {
    title: "Web Design Company – Custom Website Design & Development | Moydus",
    description: "Leading web design company specializing in custom websites for businesses worldwide.",
    url: "https://www.moydus.com/web-design-company",
    type: "website",
    locale: "en_US",
    siteName: "Moydus",
    images: [
      {
        url: "/web-design-company/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Web Design Company – Custom Website Design & Development",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Design Company – Custom Website Design & Development | Moydus",
    description: "Leading web design company specializing in custom websites for businesses worldwide.",
    images: ["/web-design-company/opengraph-image"],
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
    icon: Layout,
    title: "Custom Website Design",
    description: "Tailored designs that reflect your brand identity and drive business results globally.",
  },
  {
    icon: Rocket,
    title: "E-Commerce Solutions",
    description: "High-performing online stores designed to maximize conversions and sales worldwide.",
  },
  {
    icon: Target,
    title: "SaaS Platform Design",
    description: "Intuitive interfaces for software products that users love across all markets.",
  },
  {
    icon: Users,
    title: "User Experience Design",
    description: "UX-focused designs that improve engagement and satisfaction internationally.",
  },
  {
    icon: TrendingUp,
    title: "Conversion Optimization",
    description: "Data-driven designs that increase conversions and revenue globally.",
  },
  {
    icon: Award,
    title: "Brand Identity Design",
    description: "Complete brand identity systems that strengthen your market presence worldwide.",
  },
];


export default function WebDesignCompanyPage() {
  const breadcrumbs = [
    { name: "Home", url: "https://www.moydus.com" },
    { name: "Web Design Company", url: "https://www.moydus.com/web-design-company" },
  ];

  // Set publication and update dates for SEO (Google recommendation)
  const datePublished = "2024-01-15T00:00:00Z";
  const dateModified = new Date().toISOString();

  const pageSchema = buildWebPageSchema({
    url: "https://www.moydus.com/web-design-company",
    title: "Web Design Company – Custom Website Design & Development | Moydus",
    description:
      "Leading web design company specializing in custom websites, e-commerce platforms, and SaaS solutions. Serving businesses worldwide with scalable design services across 150+ countries.",
    datePublished,
    dateModified,
    image: {
      url: "https://www.moydus.com/web-design-company/opengraph-image",
      width: 1200,
      height: 630,
      alt: "Web Design Company – Custom Website Design & Development",
    },
    breadcrumbItems: breadcrumbs,
    speakable: true,
  });

  const organizationSchema = buildOrganizationSchema();

  const serviceSchema = buildServiceSchema({
    url: "https://www.moydus.com/web-design-company",
    name: "Web Design Company Services",
    description:
      "Leading web design company specializing in custom websites, e-commerce platforms, and SaaS solutions. Serving businesses worldwide with scalable design services across 150+ countries.",
    category: "Web Design",
    image: {
      url: "https://www.moydus.com/web-design-company/opengraph-image",
      width: 1200,
      height: 630,
      alt: "Web Design Company Services",
    },
    areaServed: "Worldwide",
  });

  const faqs = [
    {
      question: "What is the difference between a web design company and a web design agency?",
      answer:
        "While both terms are often used interchangeably, a web design company typically focuses on the technical and business aspects of website creation, emphasizing scalable solutions and long-term partnerships. A web design agency may place more emphasis on creative branding and marketing. Both deliver professional, custom websites tailored to your business needs worldwide.",
    },
    {
      question: "How do I choose the right web design company?",
      answer:
        "Choose a web design company based on their portfolio, client testimonials, technical expertise, communication style, pricing transparency, and ability to scale with your business. Look for companies with experience in your industry, proven track records, and global service capabilities. Ensure they offer ongoing support and use modern technologies.",
    },
    {
      question: "Do web design companies work with businesses globally?",
      answer:
        "Yes, many professional web design companies serve businesses worldwide across 150+ countries. They offer remote collaboration, multi-language support, and understand international market requirements. Look for companies with global experience, flexible communication channels, and timezone-friendly support to ensure smooth collaboration regardless of your location.",
    },
    {
      question: "What technologies do web design companies use?",
      answer:
        "Professional web design companies use modern technologies including React, Next.js, TypeScript, Tailwind CSS, and various CMS platforms like WordPress, Sanity, or custom solutions. They stay updated with the latest design trends, performance optimization techniques, and SEO best practices to deliver cutting-edge websites that rank well in search results.",
    },
    {
      question: "Can a web design company redesign my existing website?",
      answer:
        "Yes, web design companies specialize in website redesigns, improving existing sites with modern design, better performance, enhanced user experience, and updated technologies. They analyze your current site, identify improvement opportunities, and create a redesign plan that maintains your brand identity while improving functionality and conversion rates.",
    },
    {
      question: "What should I expect during the web design process?",
      answer:
        "The web design process typically includes discovery and strategy sessions, design mockups and prototypes, client feedback and revisions, development and testing, and final launch with training. Professional companies provide clear timelines, regular updates, and involve you in key decisions throughout the process, ensuring the final product meets your expectations and business goals.",
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
            Web Design Company
            <br />
            <span className="text-white/80">Building Digital Experiences for Global Brands</span>
          </h1>
          <p className="text-white/70 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-8">
            As a leading web design company, we create custom websites, e-commerce platforms, and SaaS solutions 
            that help businesses grow and scale internationally. Trusted by 10,000+ customers across 150+ countries.
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
              View Our Work
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Services Grid */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-semibold mb-12 text-white text-center">
            Our Web Design Services
          </h2>
          <div className="grid gap-10 md:grid-cols-2 px-2">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div key={index} className="flex flex-col">
                  <div className="bg-accent mb-5 flex size-12 items-center justify-center rounded-2xl">
                    <Icon className="w-6 h-6 text-black" />
                  </div>
                  <h3 className="mb-3 mt-2 text-xl md:text-2xl font-semibold text-white">
                    {service.title}
                  </h3>
                  <p className="text-white/70 text-base md:text-lg">
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
              What is a Professional Web Design Company?
            </h2>
            <p className="text-white/80 text-base md:text-lg leading-relaxed mb-6">
              A professional web design company specializes in creating custom,
              high-performing websites tailored to your business needs. Unlike
              template-based solutions, professional companies deliver unique
              designs that reflect your brand identity, improve user experience,
              and drive measurable business results across all markets and
              regions worldwide.
            </p>
            <p className="text-white/80 text-base md:text-lg leading-relaxed mb-6">
              At Moydus, we combine creative design expertise with technical
              excellence to build websites that not only look stunning but also
              perform exceptionally well across all devices and platforms. Our
              global team serves businesses worldwide across 150+ countries,
              ensuring your website reaches and engages your target audience
              effectively, regardless of geographic location.
            </p>

            <h3 className="text-2xl md:text-3xl font-semibold mb-4 text-white mt-12">
              Why Choose a Professional Web Design Company?
            </h3>
            <p className="text-white/80 text-base md:text-lg leading-relaxed mb-4">
              Investing in professional web design services offers numerous
              advantages over DIY solutions or generic templates. Here&apos;s why
              businesses worldwide trust professional companies:
            </p>
            <ul className="text-white/80 text-base md:text-lg leading-relaxed mb-6 space-y-3 list-disc list-inside">
              <li>
                <strong className="text-white">Custom Solutions:</strong>{" "}
                Every website is uniquely designed to match your brand and
                business objectives, ensuring you stand out from competitors
                globally.
              </li>
              <li>
                <strong className="text-white">Expert Knowledge:</strong>{" "}
                Professional designers understand current design trends, user
                behavior patterns, and conversion optimization techniques
                applicable to international markets.
              </li>
              <li>
                <strong className="text-white">Technical Excellence:</strong>{" "}
                Your website will be built with clean code, fast loading times,
                and optimal SEO performance to rank well in search results
                worldwide.
              </li>
              <li>
                <strong className="text-white">Scalability:</strong>{" "}
                Professional designs are built to grow with your business,
                accommodating future features and expansions across different
                markets.
              </li>
              <li>
                <strong className="text-white">Ongoing Support:</strong>{" "}
                Unlike one-time solutions, companies provide continuous
                maintenance, updates, and optimization for businesses operating
                globally.
              </li>
            </ul>

            <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-white mt-16">
              The Impact of Professional Web Design on Your Business
            </h2>
            <p className="text-white/80 text-base md:text-lg leading-relaxed mb-6">
              A professionally designed website is more than just an online
              presence—it&apos;s a powerful business tool that can
              significantly impact your bottom line. Studies show that
              well-designed websites generate higher conversion rates, improve
              brand perception, and increase customer trust. For businesses
              operating globally, professional web design ensures your brand
              maintains consistent quality and credibility across all markets
              and regions.
            </p>
            <p className="text-white/80 text-base md:text-lg leading-relaxed mb-6">
              When visitors land on your website, they form an opinion within
              seconds. A professional design immediately communicates
              credibility, quality, and attention to detail. This first
              impression can make the difference between a visitor becoming a
              customer or leaving to find a competitor. For international
              businesses, this first impression is even more critical as it
              establishes trust with audiences who may be unfamiliar with your
              brand.
            </p>
            <p className="text-white/80 text-base md:text-lg leading-relaxed mb-6">
              Beyond aesthetics, professional web design improves functionality
              and user experience. Fast loading times, mobile responsiveness,
              and intuitive navigation keep visitors engaged and encourage them
              to explore your offerings. These factors directly contribute to
              higher conversion rates and increased revenue. Additionally,
              SEO-optimized designs help your website rank higher in search
              results, making it easier for potential customers worldwide to
              discover your services.
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
            Ready to Build Your Dream Website?
          </h2>
          <p className="text-white/60 text-lg mb-8 max-w-2xl mx-auto">
            Partner with our web design company to create a website that drives results. 
            Available for businesses worldwide with clear timelines and measurable outcomes.
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
                title: "Web Design Services",
                description: "Explore our comprehensive web design services.",
                href: "/services?category=web-design",
              },
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
                title: "E-Commerce Development",
                description: "Online store development services.",
                href: "/ecommerce-website-development",
              },
              {
                title: "Web Design Blog",
                description: "Latest insights and trends in web design.",
                href: "/blog",
              },
              {
                title: "Best Web Design Platforms",
                description: "Compare top web design platforms and tools.",
                href: "/best?category=web-design-platforms",
              },
              {
                title: "Website Redesign Guide",
                description: "Learn how to redesign your website effectively.",
                href: "/how-to?category=website-redesign",
              },
              {
                title: "Software Company",
                description: "Custom software solutions.",
                href: "/software-company",
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
            href="/web-design-agency"
            className="text-white/60 hover:text-white transition-colors"
          >
            Web Design Agency
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
            href="/ecommerce-website-development"
            className="text-white/60 hover:text-white transition-colors"
          >
            E-Commerce Development
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

