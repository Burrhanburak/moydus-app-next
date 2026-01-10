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
  Code,
  Server,
  Database,
  Cloud,
  Shield,
  Zap,
  CheckCircle2,
  ArrowRight,
  Globe,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Web Development Company – Custom Website Development Services | Moydus",
  description: "Professional web development company building custom websites, e-commerce platforms, and SaaS applications. Full-stack development services for businesses worldwide across 150+ countries.",
  keywords: [
    "web development company",
    "website development company",
    "custom web development",
    "full-stack development",
    "e-commerce development",
    "SaaS development",
    "web application development",
    "global web development",
  ],
  alternates: {
    canonical: "https://www.moydus.com/web-development-company",
  },
  openGraph: {
    title: "Web Development Company – Custom Website Development Services | Moydus",
    description: "Professional web development company building custom websites for businesses worldwide.",
    url: "https://www.moydus.com/web-development-company",
    type: "website",
    locale: "en_US",
    siteName: "Moydus",
    images: [
      {
        url: "/web-development-company/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Web Development Company – Custom Website Development Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Development Company – Custom Website Development Services | Moydus",
    description: "Professional web development company building custom websites for businesses worldwide.",
    images: ["/web-development-company/opengraph-image"],
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
    icon: Code,
    title: "Frontend Development",
    description: "Modern, responsive frontend development using React, Next.js, and cutting-edge technologies.",
  },
  {
    icon: Server,
    title: "Backend Development",
    description: "Scalable backend systems built with Node.js, Python, and cloud-native architectures.",
  },
  {
    icon: Database,
    title: "Database Solutions",
    description: "Optimized database design and management for performance and scalability globally.",
  },
  {
    icon: Cloud,
    title: "Cloud Infrastructure",
    description: "Cloud deployment and DevOps solutions for reliable, scalable applications worldwide.",
  },
  {
    icon: Shield,
    title: "Security & Compliance",
    description: "Enterprise-grade security measures and compliance with international standards.",
  },
  {
    icon: Zap,
    title: "Performance Optimization",
    description: "Fast-loading websites optimized for speed, SEO, and user experience globally.",
  },
];


export default function WebDevelopmentCompanyPage() {
  const breadcrumbs = [
    { name: "Home", url: "https://www.moydus.com" },
    {
      name: "Web Development Company",
      url: "https://www.moydus.com/web-development-company",
    },
  ];

  // Set publication and update dates for SEO (Google recommendation)
  const datePublished = "2024-01-15T00:00:00Z";
  const dateModified = new Date().toISOString();

  const pageSchema = buildWebPageSchema({
    url: "https://www.moydus.com/web-development-company",
    title: "Web Development Company – Custom Website Development Services | Moydus",
    description:
      "Professional web development company building custom websites, e-commerce platforms, and SaaS applications. Full-stack development services for businesses worldwide across 150+ countries.",
    datePublished,
    dateModified,
    image: {
      url: "https://www.moydus.com/web-development-company/opengraph-image",
      width: 1200,
      height: 630,
      alt: "Web Development Company – Custom Website Development Services",
    },
    breadcrumbItems: breadcrumbs,
    speakable: true,
  });

  const organizationSchema = buildOrganizationSchema();

  const serviceSchema = buildServiceSchema({
    url: "https://www.moydus.com/web-development-company",
    name: "Web Development Company Services",
    description:
      "Professional web development company building custom websites, e-commerce platforms, and SaaS applications. Full-stack development services for businesses worldwide across 150+ countries.",
    category: "Web Development",
    image: {
      url: "https://www.moydus.com/web-development-company/opengraph-image",
      width: 1200,
      height: 630,
      alt: "Web Development Company Services",
    },
    areaServed: "Worldwide",
  });

  const faqs = [
    {
      question: "What services does a web development company offer?",
      answer:
        "A web development company offers frontend development, backend development, full-stack development, database solutions, cloud infrastructure deployment, API development, performance optimization, and ongoing maintenance. These companies build scalable, secure web applications using modern technologies like React, Next.js, Node.js, and cloud platforms, serving businesses worldwide.",
    },
    {
      question: "What is the difference between web design and web development?",
      answer:
        "Web design focuses on the visual appearance, user interface, and user experience of a website, while web development involves building the functional, technical aspects using code. Designers create mockups and prototypes, while developers write code to make websites functional, fast, and secure. Many companies offer both services to deliver complete web solutions.",
    },
    {
      question: "How long does web development take?",
      answer:
        "Web development timelines vary based on project complexity. A simple website typically takes 4-8 weeks, while custom web applications or e-commerce platforms may take 8-16 weeks or longer. Full-stack SaaS applications can take 3-6 months or more. Professional companies provide detailed timelines and milestones, keeping you informed throughout the development process.",
    },
    {
      question: "What technologies do web development companies use?",
      answer:
        "Professional web development companies use modern technologies including React, Next.js, TypeScript for frontend; Node.js, Python, PostgreSQL, MongoDB for backend; AWS, Vercel, Docker for cloud infrastructure; and various APIs and integrations. They stay updated with the latest frameworks, tools, and best practices to deliver cutting-edge solutions.",
    },
    {
      question: "Do web development companies provide hosting and maintenance?",
      answer:
        "Yes, most web development companies offer hosting, deployment, and ongoing maintenance services. This includes cloud infrastructure setup, CI/CD pipelines, security updates, performance monitoring, and technical support. Monthly maintenance packages ensure your application remains secure, fast, and up-to-date with the latest technologies.",
    },
    {
      question: "Can a web development company help scale my application?",
      answer:
        "Yes, professional web development companies build scalable architectures from the start, using cloud infrastructure, load balancing, database optimization, and caching strategies. They can also help scale existing applications by refactoring code, optimizing databases, implementing CDN, and upgrading infrastructure to handle increased traffic and users as your business grows globally.",
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
            Web Development Company
            <br />
            <span className="text-white/80">Building Scalable Web Solutions Worldwide</span>
          </h1>
          <p className="text-white/70 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-8">
            We develop custom websites, e-commerce platforms, and SaaS applications using modern technologies. 
            Full-stack development services trusted by 10,000+ customers across 150+ countries.
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
        <div
          id="services"
          data-narration-section
          data-title="Our Development Services"
          data-text="We offer comprehensive web development services including frontend development, backend development, database solutions, cloud infrastructure, security and compliance, and performance optimization."
          className="mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-semibold mb-12 text-white text-center">
            Our Development Services
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
        <div
          id="main-content"
          data-narration-section
          data-title="What is a Professional Web Development Company?"
          data-text="A professional web development company specializes in building custom websites, web applications, and digital platforms using modern technologies and best practices. Unlike template-based solutions, professional companies deliver scalable, secure, and high-performing applications that drive business growth across all markets and regions worldwide."
          className="mb-20 max-w-4xl mx-auto"
        >
          <div className="prose prose-invert prose-lg max-w-none">
            <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-white">
              What is a Professional Web Development Company?
            </h2>
            <p className="text-white/80 text-base md:text-lg leading-relaxed mb-6">
              A professional web development company specializes in building
              custom websites, web applications, and digital platforms using
              modern technologies and best practices. Unlike template-based
              solutions, professional companies deliver scalable, secure, and
              high-performing applications that drive business growth across all
              markets and regions worldwide.
            </p>
            <p className="text-white/80 text-base md:text-lg leading-relaxed mb-6">
              At Moydus, we combine technical expertise with business acumen to
              build web solutions that not only function flawlessly but also
              scale with your business. Our global team serves businesses
              worldwide across 150+ countries, ensuring your web application
              performs optimally regardless of geographic location or user base
              size.
            </p>

            <h3 className="text-2xl md:text-3xl font-semibold mb-4 text-white mt-12">
              Why Choose a Professional Web Development Company?
            </h3>
            <p className="text-white/80 text-base md:text-lg leading-relaxed mb-4">
              Investing in professional web development services offers numerous
              advantages over DIY solutions or off-the-shelf platforms. Here&apos;s
              why businesses worldwide trust professional companies:
            </p>
            <ul className="text-white/80 text-base md:text-lg leading-relaxed mb-6 space-y-3 list-disc list-inside">
              <li>
                <strong className="text-white">Custom Solutions:</strong>{" "}
                Every application is built to your exact specifications,
                ensuring it perfectly fits your business needs and workflows
                across different markets.
              </li>
              <li>
                <strong className="text-white">Scalable Architecture:</strong>{" "}
                Professional developers build applications that can grow with
                your business, handling increased traffic and users as you expand
                globally.
              </li>
              <li>
                <strong className="text-white">Security & Compliance:</strong>{" "}
                Your application will be built with security best practices and
                compliance standards, protecting your data and users worldwide.
              </li>
              <li>
                <strong className="text-white">Performance Optimization:</strong>{" "}
                Fast loading times, efficient code, and optimized databases
                ensure your application performs well for users around the globe.
              </li>
              <li>
                <strong className="text-white">Ongoing Support:</strong>{" "}
                Professional companies provide continuous maintenance, updates, and
                optimization to keep your application running smoothly
                internationally.
              </li>
            </ul>

            <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-white mt-16">
              The Impact of Professional Web Development on Your Business
            </h2>
            <p className="text-white/80 text-base md:text-lg leading-relaxed mb-6">
              A professionally developed web application is a powerful business
              tool that can significantly impact your operations and revenue.
              Well-built applications improve efficiency, reduce costs, and
              enable your business to serve customers more effectively. For
              businesses operating globally, professional web development ensures
              your application maintains consistent performance and reliability
              across all markets and regions.
            </p>
            <p className="text-white/80 text-base md:text-lg leading-relaxed mb-6">
              When users interact with your web application, they expect fast,
              reliable, and intuitive experiences. A professional development
              approach ensures your application meets these expectations,
              building trust and encouraging continued use. For international
              businesses, this reliability is even more critical as it
              establishes credibility with users who may be accessing your
              application from different time zones and locations.
            </p>
            <p className="text-white/80 text-base md:text-lg leading-relaxed mb-6">
              Beyond functionality, professional web development improves
              scalability and maintainability. Clean code, proper architecture,
              and modern technologies make it easier to add features, fix issues,
              and scale your application as your business grows. These factors
              directly contribute to lower long-term costs and increased
              flexibility. Additionally, SEO-optimized development helps your
              application rank higher in search results, making it easier for
              potential customers worldwide to discover your services.
            </p>
          </div>
        </div>

        {/* FAQ Section */}
        <div
          id="faq"
          data-narration-section
          data-title="Frequently Asked Questions"
          data-text="Common questions about web development company services, technologies used, timelines, hosting and maintenance, and scalability solutions."
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
          data-title="Ready to Build Your Web Application?"
          data-text="Let our expert developers create a custom web solution for your business. Available for companies worldwide with scalable delivery and clear timelines."
          className="bg-[#0a0a0a] border border-[#262626] rounded-2xl p-8 md:p-12 text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-white">
            Ready to Build Your Web Application?
          </h2>
          <p className="text-white/60 text-lg mb-8 max-w-2xl mx-auto">
            Let our expert developers create a custom web solution for your business. 
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
                title: "Web Development Services",
                description: "Explore our comprehensive development services.",
                href: "/services?category=web-development",
              },
              {
                title: "Web Design Agency",
                description: "Professional design agency services.",
                href: "/web-design-agency",
              },
              {
                title: "Web Design Company",
                description: "Custom website design solutions.",
                href: "/web-design-company",
              },
              {
                title: "E-Commerce Development",
                description: "Online store development services.",
                href: "/ecommerce-website-development",
              },
              {
                title: "Development Blog",
                description: "Latest insights and trends in web development.",
                href: "/blog",
              },
              {
                title: "Best Development Tools",
                description: "Compare top development platforms and tools.",
                href: "/best?category=web-development-tools",
              },
              {
                title: "How To Guides",
                description: "Learn web development best practices.",
                href: "/how-to",
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
            href="/web-design-company"
            className="text-white/60 hover:text-white transition-colors"
          >
            Web Design Company
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

