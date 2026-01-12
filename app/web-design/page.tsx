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
  Layout,
  Rocket,
  Users,
  Target,
  TrendingUp,
  Award,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { cdn } from "@/lib/cdn";

export const metadata: Metadata = {
  title: "Website Designer & Web Design Agency – Custom Website Design Services | Moydus",
  description: "Professional website designer and web design agency specializing in custom websites, e-commerce platforms, and SaaS solutions. Serving businesses worldwide with scalable design services across 150+ countries.",
  keywords: [
    "website designer",
    "web design",
    "web design agency",
    "web design company",
    "website design company",
    "custom web design",
    "professional web design",
    "responsive web design",
    "custom website design",
    "e-commerce design",
    "SaaS design services",
    "global web design",
  ],
  alternates: {
    canonical: "https://www.moydus.com/web-design",
  },
  openGraph: {
    title: "Website Designer & Web Design Agency – Custom Website Design Services | Moydus",
    description: "Professional website designer and web design agency specializing in custom websites for businesses worldwide.",
    url: "https://www.moydus.com/web-design",
    type: "website",
    locale: "en_US",
    siteName: "Moydus",
    images: [
      {
        url: "/web-design/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Website Designer & Web Design Agency – Custom Website Design Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Website Designer & Web Design Agency – Custom Website Design Services | Moydus",
    description: "Professional website designer and web design agency specializing in custom websites for businesses worldwide.",
    images: ["/web-design/opengraph-image"],
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

export default function WebDesignPage() {
  const breadcrumbs = [
    { name: "Home", url: "https://www.moydus.com" },
    { name: "Web Design", url: "https://www.moydus.com/web-design" },
  ];

  // Set publication and update dates for SEO (Google recommendation)
  const datePublished = "2024-01-15T00:00:00Z";
  const dateModified = new Date().toISOString();

  const pageSchema = buildWebPageSchema({
    url: "https://www.moydus.com/web-design",
    title: "Website Designer & Web Design Agency – Custom Website Design Services | Moydus",
    description:
      "Professional website designer and web design agency specializing in custom websites, e-commerce platforms, and SaaS solutions. Serving businesses worldwide with scalable design services across 150+ countries.",
    datePublished,
    dateModified,
    image: {
      url: "https://www.moydus.com/web-design/opengraph-image",
      width: 1200,
      height: 630,
      alt: "Website Designer & Web Design Agency – Custom Website Design Services",
    },
    breadcrumbItems: breadcrumbs,
    speakable: true,
  });

  const organizationSchema = buildOrganizationSchema();

  const serviceSchema = buildServiceSchema({
    url: "https://www.moydus.com/web-design",
    name: "Website Designer & Web Design Agency Services",
    description:
      "Professional website designer and web design agency specializing in custom websites, e-commerce platforms, and SaaS solutions. Serving businesses worldwide with scalable design services across 150+ countries.",
    category: "Web Design",
    image: {
      url: "https://www.moydus.com/web-design/opengraph-image",
      width: 1200,
      height: 630,
      alt: "Website Designer & Web Design Agency Services",
    },
    areaServed: "Worldwide",
  });

  const faqs = [
    {
      question: "What is a website designer?",
      answer:
        "A website designer is a professional who creates the visual appearance and user experience of websites. Website designers combine creative design skills with technical knowledge to build custom, responsive websites that reflect your brand identity and drive business results. Professional website designers understand current design trends, user behavior patterns, and conversion optimization techniques applicable to international markets.",
    },
    {
      question: "What is the difference between a website designer and a web design agency?",
      answer:
        "A website designer typically refers to an individual professional who creates website designs, while a web design agency is a company that provides comprehensive web design services with a team of designers, developers, and strategists. Web design agencies offer broader services including branding, marketing, and ongoing support. Both deliver professional, custom websites tailored to your business needs worldwide.",
    },
    {
      question: "How do I choose the right website designer or web design agency?",
      answer:
        "Choose a website designer or web design agency based on their portfolio, client testimonials, technical expertise, communication style, pricing transparency, and ability to scale with your business. Look for professionals or agencies with experience in your industry, proven track records, and global service capabilities. Ensure they offer ongoing support and use modern technologies.",
    },
    {
      question: "Do website designers work with businesses globally?",
      answer:
        "Yes, many professional website designers and web design agencies serve businesses worldwide across 150+ countries. They offer remote collaboration, multi-language support, and understand international market requirements. Look for designers or agencies with global experience, flexible communication channels, and timezone-friendly support to ensure smooth collaboration regardless of your location.",
    },
    {
      question: "What technologies do website designers use?",
      answer:
        "Professional website designers use modern technologies including React, Next.js, TypeScript, Tailwind CSS, and various CMS platforms like WordPress, Sanity, or custom solutions. They stay updated with the latest design trends, performance optimization techniques, and SEO best practices to deliver cutting-edge websites that rank well in search results.",
    },
    {
      question: "Can a website designer redesign my existing website?",
      answer:
        "Yes, website designers and web design agencies specialize in website redesigns, improving existing sites with modern design, better performance, enhanced user experience, and updated technologies. They analyze your current site, identify improvement opportunities, and create a redesign plan that maintains your brand identity while improving functionality and conversion rates.",
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
              Website Designer & Web Design Agency
              <br />
              <span className="text-white/80">Building Digital Experiences for Global Brands</span>
            </h1>
            <p className="text-white/70 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-8">
              As a professional website designer and leading web design agency, we create custom websites, 
              e-commerce platforms, and SaaS solutions that help businesses grow and scale internationally. 
              Trusted by 10,000+ customers across 150+ countries.
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

          {/* Featured Image */}
          <div className="w-full aspect-video rounded-2xl overflow-hidden bg-[#000000] mb-8 md:mb-12">
            <Image
              src={cdn("/web-design/hero.jpg", 1920, 90) || "/web-design/hero.jpg"}
              alt="Website Designer & Web Design Agency – Custom Website Design Services"
              width={1920}
              height={1080}
              className="w-full h-full object-cover"
              loading="eager"
              priority
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                if (!target.src.includes("/web-design/hero.jpg")) {
                  target.src = "/web-design/hero.jpg";
                }
              }}
            />
          </div>

          {/* Services Grid */}
          <div className="mb-20">
            <h2 className="text-3xl md:text-4xl font-semibold mb-12 text-white text-center">
              Our Web Design Services
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
                What is a Professional Website Designer?
              </h2>
              <p className="text-white/80 text-base md:text-lg leading-relaxed mb-6">
                A professional website designer specializes in creating custom, high-performing websites 
                tailored to your business needs. Unlike template-based solutions, professional website 
                designers and web design agencies deliver unique designs that reflect your brand identity, 
                improve user experience, and drive measurable business results across all markets and 
                regions worldwide.
              </p>
              <p className="text-white/80 text-base md:text-lg leading-relaxed mb-6">
                At Moydus, we combine creative design expertise with technical excellence to build 
                websites that not only look stunning but also perform exceptionally well across all 
                devices and platforms. As a leading web design agency, our global team serves businesses 
                worldwide across 150+ countries, ensuring your website reaches and engages your target 
                audience effectively, regardless of geographic location.
              </p>

              <h3 className="text-2xl md:text-3xl font-semibold mb-4 text-white mt-12">
                Why Choose a Professional Website Designer or Web Design Agency?
              </h3>
              <p className="text-white/80 text-base md:text-lg leading-relaxed mb-4">
                Investing in professional website design services offers numerous advantages over DIY 
                solutions or generic templates. Here&apos;s why businesses worldwide trust professional 
                website designers and web design agencies:
              </p>
              <ul className="text-white/80 text-base md:text-lg leading-relaxed mb-6 space-y-3 list-disc list-inside">
                <li>
                  <strong className="text-white">Custom Solutions:</strong>{" "}
                  Every website is uniquely designed to match your brand and business objectives, 
                  ensuring you stand out from competitors globally.
                </li>
                <li>
                  <strong className="text-white">Expert Knowledge:</strong>{" "}
                  Professional website designers understand current design trends, user behavior 
                  patterns, and conversion optimization techniques applicable to international markets.
                </li>
                <li>
                  <strong className="text-white">Technical Excellence:</strong>{" "}
                  Your website will be built with clean code, fast loading times, and optimal SEO 
                  performance to rank well in search results worldwide.
                </li>
                <li>
                  <strong className="text-white">Scalability:</strong>{" "}
                  Professional designs are built to grow with your business, accommodating future 
                  features and expansions across different markets.
                </li>
                <li>
                  <strong className="text-white">Ongoing Support:</strong>{" "}
                  Unlike one-time solutions, professional website designers and web design agencies 
                  provide continuous maintenance, updates, and optimization for businesses operating globally.
                </li>
              </ul>

              <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-white mt-16">
                The Impact of Professional Website Design on Your Business
              </h2>
              <p className="text-white/80 text-base md:text-lg leading-relaxed mb-6">
                A professionally designed website is more than just an online presence—it&apos;s a 
                powerful business tool that can significantly impact your bottom line. Studies show that 
                well-designed websites generate higher conversion rates, improve brand perception, and 
                increase customer trust. For businesses operating globally, professional website design 
                ensures your brand maintains consistent quality and credibility across all markets and regions.
              </p>
              <p className="text-white/80 text-base md:text-lg leading-relaxed mb-6">
                When visitors land on your website, they form an opinion within seconds. A professional 
                website designer creates designs that immediately communicate credibility, quality, and 
                attention to detail. This first impression can make the difference between a visitor 
                becoming a customer or leaving to find a competitor. For international businesses, this 
                first impression is even more critical as it establishes trust with audiences who may be 
                unfamiliar with your brand.
              </p>
              <p className="text-white/80 text-base md:text-lg leading-relaxed mb-6">
                Beyond aesthetics, professional website design improves functionality and user experience. 
                Fast loading times, mobile responsiveness, and intuitive navigation keep visitors engaged 
                and encourage them to explore your offerings. These factors directly contribute to higher 
                conversion rates and increased revenue. Additionally, SEO-optimized designs help your 
                website rank higher in search results, making it easier for potential customers worldwide 
                to discover your services.
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
              Partner with our professional website designer and web design agency to create a website 
              that drives results. Available for businesses worldwide with clear timelines and measurable outcomes.
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

          {/* Footer Links */}
          <div className="mt-16 pt-8 border-t border-[#262626] flex flex-wrap gap-4 text-sm justify-center">
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
              href="/custom-software-development"
              className="text-white/60 hover:text-white transition-colors"
            >
              Custom Software Development
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

