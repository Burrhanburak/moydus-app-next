import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import {
  CheckCircle2,
  TrendingUp,
  Users,
  Globe,
  Zap,
  Shield,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Customers – Trusted by Industry Leaders | Moydus",
  description:
    "Join thousands of companies worldwide who trust Moydus. See customer success stories, testimonials, and industry leaders using our platform across 150+ countries.",
  keywords: [
    "moydus customers",
    "customer success stories",
    "client testimonials",
    "industry leaders",
    "trusted companies",
    "customer reviews",
  ],
  alternates: {
    canonical: "https://www.moydus.com/customers",
  },
  openGraph: {
    title: "Customers – Trusted by Industry Leaders | Moydus",
    description:
      "Join thousands of companies worldwide who trust Moydus for their digital infrastructure.",
    type: "website",
    locale: "en_US",
    siteName: "Moydus",
    url: "https://www.moydus.com/customers",
  },
  twitter: {
    card: "summary_large_image",
    title: "Customers – Trusted by Industry Leaders | Moydus",
    description: "See customer success stories and testimonials from companies worldwide.",
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

const stats = [
  {
    value: "10,000+",
    label: "Active Customers",
    icon: Users,
  },
  {
    value: "150+",
    label: "Countries Served",
    icon: Globe,
  },
  {
    value: "99.9%",
    label: "Uptime SLA",
    icon: Shield,
  },
  {
    value: "4.8/5",
    label: "Customer Rating",
    icon: TrendingUp,
  },
];

const customerStories = [
  {
    name: "Sarah Chen",
    role: "CTO, TechFlow Inc.",
    company: "TechFlow Inc.",
    industry: "SaaS",
    quote:
      "Moydus transformed our development workflow. We reduced deployment time by 60% and our team productivity increased significantly. The platform's intuitive interface made it easy for our developers to adopt.",
    results: [
      "60% faster deployments",
      "40% increase in productivity",
      "Zero downtime migrations",
    ],
    image: "/placeholder-3.svg",
  },
  {
    name: "Marcus Rodriguez",
    role: "Founder, Digital Commerce Co.",
    company: "Digital Commerce Co.",
    industry: "E-commerce",
    quote:
      "As a growing e-commerce business, we needed a platform that could scale with us. Moydus not only handled our traffic spikes during Black Friday but also helped us launch new features faster than ever.",
    results: [
      "3x traffic capacity",
      "50% faster feature launches",
      "99.9% uptime during peak",
    ],
    image: "/placeholder-3.svg",
  },
  {
    name: "Emily Watson",
    role: "Product Manager, HealthTech Solutions",
    company: "HealthTech Solutions",
    industry: "Healthcare",
    quote:
      "Compliance and security were our top priorities. Moydus provided enterprise-grade security features that helped us meet HIPAA requirements while maintaining excellent performance.",
    results: [
      "HIPAA compliant",
      "Zero security incidents",
      "30% cost reduction",
    ],
    image: "/placeholder-3.svg",
  },
  {
    name: "David Kim",
    role: "Engineering Lead, FinTech Innovations",
    company: "FinTech Innovations",
    industry: "Finance",
    quote:
      "The automation capabilities of Moydus saved us countless hours. Our CI/CD pipeline is now fully automated, and we can focus on building features instead of managing infrastructure.",
    results: ["90% automation", "80% faster releases", "24/7 monitoring"],
    image: "/placeholder-3.svg",
  },
  {
    name: "Lisa Anderson",
    role: "CEO, Creative Agency Pro",
    company: "Creative Agency Pro",
    industry: "Agency",
    quote:
      "We manage multiple client projects simultaneously. Moydus allows us to create isolated environments for each client, making project management seamless and secure.",
    results: [
      "100+ client projects",
      "Isolated environments",
      "50% faster onboarding",
    ],
    image: "/placeholder-3.svg",
  },
  {
    name: "James Thompson",
    role: "Head of Engineering, StartupHub",
    company: "StartupHub",
    industry: "Startup",
    quote:
      "As a startup, we needed a cost-effective solution that could grow with us. Moydus provided exactly that - powerful features at a fraction of the cost of traditional solutions.",
    results: ["70% cost savings", "Unlimited scaling", "Quick setup"],
    image: "/placeholder-3.svg",
  },
];

const industries = [
  { name: "SaaS", count: "2,500+", icon: Zap },
  { name: "E-commerce", count: "1,800+", icon: TrendingUp },
  { name: "Healthcare", count: "1,200+", icon: Shield },
  { name: "Finance", count: "1,000+", icon: CheckCircle2 },
  { name: "Education", count: "800+", icon: Users },
  { name: "Media & Entertainment", count: "600+", icon: Globe },
];

export default function CustomersPage() {
  return (
    <section className="min-h-screen bg-[#000000] text-white px-4 md:px-7 py-23">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-semibold mb-4 text-white">
            Trusted by Industry Leaders
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Join thousands of companies worldwide who rely on Moydus to power
            their digital infrastructure and accelerate their growth.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-[#0a0a0a] border border-[#262626] rounded-xl p-6 text-center"
              >
                <Icon className="w-8 h-8 text-white/60 mx-auto mb-3" />
                <div className="text-3xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-white/60">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Customer Stories */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-white text-center mb-12">
            Customer Success Stories
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {customerStories.map((story, index) => (
              <div
                key={index}
                className="bg-[#0a0a0a] border border-[#262626] rounded-xl p-6 flex flex-col"
              >
                <div className="mb-4">
                  <div className="w-12 h-12 bg-[#262626] rounded-full mb-3 flex items-center justify-center">
                    <span className="text-white font-semibold">
                      {story.name.charAt(0)}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-1">
                    {story.name}
                  </h3>
                  <p className="text-sm text-white/60 mb-1">{story.role}</p>
                  <span className="inline-block px-2 py-1 bg-[#262626] text-xs text-white/80 rounded">
                    {story.industry}
                  </span>
                </div>
                <p className="text-white/70 mb-4 flex-grow leading-relaxed">
                  &quot;{story.quote}&quot;
                </p>
                <div className="space-y-2 pt-4 border-t border-[#262626]">
                  {story.results.map((result, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#ff4d00] flex-shrink-0" />
                      <span className="text-sm text-white/70">{result}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Industries */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-white text-center mb-12">
            Serving Diverse Industries
          </h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
            {industries.map((industry, index) => {
              const Icon = industry.icon;
              return (
                <div
                  key={index}
                  className="bg-[#0a0a0a] border border-[#262626] rounded-xl p-6 text-center hover:border-white/20 transition-colors"
                >
                  <Icon className="w-8 h-8 text-white/60 mx-auto mb-3" />
                  <div className="text-lg font-semibold text-white mb-1">
                    {industry.name}
                  </div>
                  <div className="text-sm text-white/60">{industry.count}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-[#000000] border border-[#262626] rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-white">
            Ready to Join Our Growing Community?
          </h2>
          <p className="text-white/60 text-lg mb-8 max-w-2xl mx-auto">
            See how Moydus can transform your development workflow and help you
            build better software faster.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-white/90 transition-colors inline-block"
            >
              Get Started
            </Link>
            <Link
              href="/marketplace/templates"
              className="bg-[#0a0a0a] border border-white/10 text-white px-8 py-3 rounded-full font-semibold hover:border-white/20 transition-colors inline-block"
            >
              Explore Templates
            </Link>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="mt-20">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-white text-center mb-12">
            What Our Customers Say
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-[#0a0a0a] border border-[#262626] rounded-xl p-6">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-[#ff4d00]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-white/80 mb-4 leading-relaxed">
                &quot;Moydus has been a game-changer for our team. The platform
                is intuitive, powerful, and reliable. We&apos;ve seen
                significant improvements in our development velocity.&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#262626] rounded-full"></div>
                <div>
                  <div className="font-semibold text-white">Alex Morgan</div>
                  <div className="text-sm text-white/60">
                    Engineering Manager
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#0a0a0a] border border-[#262626] rounded-xl p-6">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-[#ff4d00]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-white/80 mb-4 leading-relaxed">
                &quot;The support team is exceptional. They&apos;re always
                responsive and helpful. The platform itself is robust and
                handles our scale perfectly.&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#262626] rounded-full"></div>
                <div>
                  <div className="font-semibold text-white">Rachel Park</div>
                  <div className="text-sm text-white/60">CTO, ScaleUp</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="mt-16 pt-8 border-t border-[#262626] flex flex-wrap gap-4 text-sm justify-center">
          <Link
            href="/about"
            className="text-white/60 hover:text-white transition-colors"
          >
            About Us
          </Link>
          <span className="text-white/40">|</span>
          <Link
            href="/contact"
            className="text-white/60 hover:text-white transition-colors"
          >
            Contact Sales
          </Link>
          <span className="text-white/40">|</span>
          <Link
            href="/support"
            className="text-white/60 hover:text-white transition-colors"
          >
            Support
          </Link>
        </div>
      </div>
    </section>
  );
}
