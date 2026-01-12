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
  Palette,
  Code,
  Smartphone,
  Globe,
  Zap,
  Shield,
  ArrowRight,
  TrendingUp,
  Award,
  Clock,
} from "lucide-react";
import { cdn } from "@/lib/cdn";

export const metadata: Metadata = {
  title: "Web Design Agency – Professional Website Design Services | Moydus",
  description:
    "Professional web design agency creating high-performing websites, e-commerce stores, and SaaS platforms for brands worldwide. Custom design solutions trusted by 10,000+ customers across 150+ countries.",
  keywords: [
    "web design agency",
    "professional web design",
    "custom website design",
    "responsive web design",
    "e-commerce design",
    "SaaS platform design",
    "global web design services",
    "worldwide design agency",
  ],
  alternates: {
    canonical: "https://www.moydus.com/web-design-agency",
  },
  openGraph: {
    title: "Web Design Agency – Professional Website Design Services | Moydus",
    description:
      "Professional web design agency creating high-performing websites for brands worldwide.",
    url: "https://www.moydus.com/web-design-agency",
    type: "website",
    locale: "en_US",
    siteName: "Moydus",
    images: [
      {
        url: "/web-design-agency/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Web Design Agency – Professional Website Design Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Design Agency – Professional Website Design Services | Moydus",
    description:
      "Professional web design agency creating high-performing websites for brands worldwide.",
    images: ["/web-design-agency/opengraph-image"],
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

const features = [
  {
    icon: Palette,
    title: "Custom Design Solutions",
    description:
      "Unique, brand-focused designs tailored to your business goals and target audience worldwide.",
  },
  {
    icon: Code,
    title: "Responsive & Modern",
    description:
      "Mobile-first designs that work seamlessly across all devices and screen sizes globally.",
  },
  {
    icon: Smartphone,
    title: "E-Commerce Design",
    description:
      "High-converting online stores designed to maximize sales and user experience internationally.",
  },
  {
    icon: Globe,
    title: "Multi-Language Support",
    description:
      "Designs optimized for global audiences with multi-language and localization capabilities.",
  },
  {
    icon: Zap,
    title: "Fast Performance",
    description:
      "Lightning-fast websites optimized for speed, SEO, and conversion rates worldwide.",
  },
  {
    icon: Shield,
    title: "Security & Compliance",
    description:
      "Secure designs that meet international standards and compliance requirements globally.",
  },
];

const stats = [
  {
    number: "10,000+",
    label: "Projects Delivered",
    icon: Award,
  },
  {
    number: "150+",
    label: "Countries Served",
    icon: Globe,
  },
  {
    number: "99.7%",
    label: "Client Satisfaction",
    icon: TrendingUp,
  },
  {
    number: "24/7",
    label: "Global Support",
    icon: Clock,
  },
];

export default function WebDesignAgencyPage() {
  const breadcrumbs = [
    { name: "Home", url: "https://www.moydus.com" },
    {
      name: "Web Design Agency",
      url: "https://www.moydus.com/web-design-agency",
    },
  ];

  // Set publication and update dates for SEO (Google recommendation)
  const datePublished = "2024-01-15T00:00:00Z"; // Initial publication date
  const dateModified = new Date().toISOString(); // Last update date

  const pageSchema = buildWebPageSchema({
    url: "https://www.moydus.com/web-design-agency",
    title: "Web Design Agency – Professional Website Design Services | Moydus",
    description:
      "Professional web design agency creating high-performing websites, e-commerce stores, and SaaS platforms for brands worldwide.",
    datePublished,
    dateModified,
    image: {
      url: "https://www.moydus.com/web-design-agency/opengraph-image",
      width: 1200,
      height: 630,
      alt: "Web Design Agency – Professional Website Design Services",
    },
    breadcrumbItems: breadcrumbs,
    speakable: true,
    mainEntity: {
      "@type": "Service",
      name: "Web Design Agency Services",
      description:
        "Professional web design agency creating high-performing websites for brands worldwide.",
    },
  });

  const organizationSchema = buildOrganizationSchema();

  const serviceSchema = buildServiceSchema({
    url: "https://www.moydus.com/web-design-agency",
    name: "Web Design Agency Services",
    description:
      "Professional web design agency creating high-performing websites, e-commerce stores, and SaaS platforms for brands worldwide. Custom design solutions trusted by 10,000+ customers across 150+ countries.",
    category: "Web Design",
    image: {
      url: "https://www.moydus.com/web-design-agency/opengraph-image",
      width: 1200,
      height: 630,
      alt: "Web Design Agency Services",
    },
    areaServed: "Worldwide",
  });

  const faqs = [
    {
      question: "What services does a professional web design agency offer?",
      answer:
        "A professional web design agency offers custom website design, e-commerce design, SaaS platform design, UI/UX design, responsive design, and ongoing maintenance services. These agencies create unique, brand-focused websites tailored to your business needs, ensuring optimal performance across all devices and markets worldwide.",
    },
    {
      question: "How much does professional web design cost?",
      answer:
        "Professional web design costs vary based on project scope, complexity, and requirements. Basic websites typically start around $2,150 for one-time setup, with monthly maintenance ranging from $100-$150. Custom e-commerce platforms and SaaS applications may require higher investment. Most agencies provide transparent pricing and scalable solutions for businesses of all sizes worldwide.",
    },
    {
      question: "How long does it take to design a website?",
      answer:
        "Website design timelines depend on project complexity and requirements. A simple website typically takes 4-8 weeks, while custom e-commerce platforms or SaaS applications may take 8-16 weeks or longer. Professional agencies provide clear timelines and milestones, keeping you informed throughout the design and development process.",
    },
    {
      question: "Do web design agencies provide ongoing support?",
      answer:
        "Yes, most professional web design agencies offer ongoing support and maintenance services. This includes regular updates, security patches, performance optimization, content updates, and technical support. Monthly maintenance packages typically range from $100-$175, ensuring your website remains secure, fast, and up-to-date.",
    },
    {
      question: "Can a web design agency help with SEO?",
      answer:
        "Yes, professional web design agencies build SEO-friendly websites with clean code, fast loading times, mobile responsiveness, and proper structure. Many agencies also offer SEO optimization services, including keyword research, on-page optimization, and technical SEO, helping your website rank higher in search results worldwide.",
    },
    {
      question: "What makes a web design agency professional?",
      answer:
        "A professional web design agency combines creative design expertise with technical excellence, delivers custom solutions tailored to your business, provides ongoing support, uses modern technologies, follows best practices for performance and SEO, and has a proven track record of successful projects. They serve businesses worldwide and understand international market requirements.",
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
              Professional Web Design Agency
              <br />
              <span className="text-white/80">
                Creating High-Performing Websites Worldwide
              </span>
            </h1>
            <p className="text-white/70 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-8">
              We design custom websites, e-commerce stores, and SaaS platforms
              that help brands grow faster and scale globally. Trusted by
              10,000+ customers across 150+ countries.
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
              src={cdn("/web-design-agency/hero.jpg", 1920, 90) || "/web-design-agency/hero.jpg"}
              alt="Web Design Agency – Professional Website Design Services"
              width={1920}
              height={1080}
              className="w-full h-full object-cover"
              loading="eager"
              priority
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                if (!target.src.includes("/web-design-agency/hero.jpg")) {
                  target.src = "/web-design-agency/hero.jpg";
                }
              }}
            />
          </div>

          {/* Main Content Section */}
          <div
            id="main-content"
            data-narration-section
            data-title="What is a Professional Web Design Agency?"
            data-text="A professional web design agency is a specialized company that creates custom, high-performing websites tailored to your business needs. Unlike template-based solutions, professional agencies deliver unique designs that reflect your brand identity, improve user experience, and drive measurable business results."
            className="mb-20 max-w-4xl mx-auto"
          >
            <div className="prose prose-invert prose-lg max-w-none">
              <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-white">
                What is a Professional Web Design Agency?
              </h2>
              <p className="text-white/80 text-base md:text-lg leading-relaxed mb-6">
                A professional web design agency is a specialized company that
                creates custom, high-performing websites tailored to your
                business needs. Unlike template-based solutions, professional
                agencies deliver unique designs that reflect your brand
                identity, improve user experience, and drive measurable business
                results.
              </p>
              <p className="text-white/80 text-base md:text-lg leading-relaxed mb-6">
                At Moydus, we combine creative design expertise with technical
                excellence to build websites that not only look stunning but
                also perform exceptionally well across all devices and
                platforms. Our global team serves businesses worldwide, ensuring
                your website reaches and engages your target audience
                effectively.
              </p>

              <h3 className="text-2xl md:text-3xl font-semibold mb-4 text-white mt-12">
                Why Choose a Professional Web Design Agency?
              </h3>
              <p className="text-white/80 text-base md:text-lg leading-relaxed mb-4">
                Investing in professional web design services offers numerous
                advantages over DIY solutions or generic templates. Here&apos;s
                why businesses worldwide trust professional agencies:
              </p>
              <ul className="text-white/80 text-base md:text-lg leading-relaxed mb-6 space-y-3 list-disc list-inside">
                <li>
                  <strong className="text-white">Custom Solutions:</strong>{" "}
                  Every website is uniquely designed to match your brand and
                  business objectives, ensuring you stand out from competitors.
                </li>
                <li>
                  <strong className="text-white">Expert Knowledge:</strong>{" "}
                  Professional designers understand current design trends, user
                  behavior patterns, and conversion optimization techniques.
                </li>
                <li>
                  <strong className="text-white">Technical Excellence:</strong>{" "}
                  Your website will be built with clean code, fast loading
                  times, and optimal SEO performance.
                </li>
                <li>
                  <strong className="text-white">Scalability:</strong>{" "}
                  Professional designs are built to grow with your business,
                  accommodating future features and expansions.
                </li>
                <li>
                  <strong className="text-white">Ongoing Support:</strong>{" "}
                  Unlike one-time solutions, agencies provide continuous
                  maintenance, updates, and optimization.
                </li>
              </ul>

              <h3 className="text-2xl md:text-3xl font-semibold mb-4 text-white mt-12">
                Our Web Design Services Explained
              </h3>
              <p className="text-white/80 text-base md:text-lg leading-relaxed mb-6">
                We offer comprehensive web design services covering every aspect
                of your online presence. From initial concept to final launch,
                our team handles every detail to ensure your website achieves
                your business goals.
              </p>

              <h4 className="text-xl md:text-2xl font-semibold mb-3 text-white mt-8">
                Custom Website Design
              </h4>
              <p className="text-white/80 text-base md:text-lg leading-relaxed mb-6">
                Our custom website design service creates unique, brand-focused
                websites tailored to your specific business needs. We work
                closely with you to understand your industry, target audience,
                and business objectives, then craft a design that effectively
                communicates your message and drives conversions. Every element
                is carefully considered, from color schemes and typography to
                layout and user flow. Our designs are optimized for search
                engines, ensuring your website ranks well in Google and other
                search platforms worldwide.
              </p>

              <h4 className="text-xl md:text-2xl font-semibold mb-3 text-white mt-8">
                E-Commerce Design
              </h4>
              <p className="text-white/80 text-base md:text-lg leading-relaxed mb-6">
                E-commerce design requires special attention to conversion
                optimization and user experience. Our team creates online stores
                that not only look professional but also make it easy for
                customers to browse, compare, and purchase products. We
                implement best practices for product pages, shopping carts,
                checkout processes, and payment integration to maximize your
                sales potential. Our e-commerce designs are built with SEO in
                mind, helping your products rank in search results and attract
                customers from around the globe.
              </p>

              <h4 className="text-xl md:text-2xl font-semibold mb-3 text-white mt-8">
                SaaS Platform Design
              </h4>
              <p className="text-white/80 text-base md:text-lg leading-relaxed mb-6">
                Software-as-a-Service platforms demand intuitive interfaces that
                users can navigate effortlessly. Our SaaS design expertise
                focuses on creating user-friendly dashboards, clear navigation
                systems, and engaging onboarding experiences. We understand that
                SaaS success depends on user adoption, so we design interfaces
                that make complex software feel simple and accessible.
              </p>

              <h4 className="text-xl md:text-2xl font-semibold mb-3 text-white mt-8">
                UI/UX Design
              </h4>
              <p className="text-white/80 text-base md:text-lg leading-relaxed mb-6">
                User interface and user experience design are critical
                components of successful websites. Our UI/UX design services
                ensure your website is not only visually appealing but also
                highly functional and user-friendly. We conduct user research,
                create wireframes and prototypes, and test designs to ensure
                optimal user satisfaction and engagement.
              </p>

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
                Beyond aesthetics, professional web design improves
                functionality and user experience. Fast loading times, mobile
                responsiveness, and intuitive navigation keep visitors engaged
                and encourage them to explore your offerings. These factors
                directly contribute to higher conversion rates and increased
                revenue. Additionally, SEO-optimized designs help your website
                rank higher in search results, making it easier for potential
                customers worldwide to discover your services.
              </p>
            </div>
          </div>

          {/* Features Grid */}
          <div
            id="features"
            data-narration-section
            data-title="Why Choose Our Web Design Agency"
            data-text="Custom design solutions, mobile-first responsive layouts, e-commerce design, multi-language support, fast performance, and security-focused delivery."
            className="mb-20"
          >
            <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-white text-center mb-12">
              Why Choose Our Web Design Agency
            </h2>
            <div className="grid gap-10 md:grid-cols-2 px-2">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="flex flex-col">
                    <div className="bg-accent mb-5 flex size-12 items-center justify-center rounded-2xl">
                      <Icon className="w-6 h-6 text-black" />
                    </div>
                    <h3 className="mb-3 mt-2 text-xl md:text-2xl font-semibold text-white">
                      {feature.title}
                    </h3>
                    <p className="text-white/70 text-base md:text-lg">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Stats Section */}
          <div
            id="stats"
            data-narration-section
            data-title="Our Achievements"
            className="mb-20"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={index}
                    className="bg-[#0a0a0a] border border-[#262626] rounded-2xl p-6 text-center hover:border-white/20 transition-colors"
                  >
                    <div className="bg-white/10 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-white text-3xl md:text-4xl font-semibold mb-2">
                      {stat.number}
                    </p>
                    <p className="text-white/70 text-sm">{stat.label}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* FAQ Section */}
          <div
            id="faq"
            data-narration-section
            data-title="Frequently Asked Questions"
            data-text="Common questions about web design agency services, pricing, timelines, ongoing support, SEO optimization, and what makes a web design agency professional."
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
            data-title="Ready to Transform Your Online Presence?"
            data-text="Let our global team of designers create a website that drives results for your business. Available for brands worldwide with scalable delivery and clear timelines."
            className="bg-[#0a0a0a] border border-[#262626] rounded-2xl p-8 md:p-12 text-center mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-white">
              Ready to Transform Your Online Presence?
            </h2>
            <p className="text-white/60 text-lg mb-8 max-w-2xl mx-auto">
              Let our global team of designers create a website that drives
              results for your business. Available for brands worldwide with
              scalable delivery and clear timelines.
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
                  title: "UI/UX Design Services",
                  description:
                    "Professional user interface and experience design.",
                  href: "/services?category=ui-ux-design",
                },
                {
                  title: "Web Design Company",
                  description:
                    "Leading web design company for custom solutions.",
                  href: "/web-design-company",
                },
                {
                  title: "Web Development Company",
                  description: "Full-stack development services.",
                  href: "/web-development-company",
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
                  description:
                    "Learn how to redesign your website effectively.",
                  href: "/how-to?category=website-redesign",
                },
                {
                  title: "E-Commerce Development",
                  description: "Online store development services.",
                  href: "/ecommerce-website-development",
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
