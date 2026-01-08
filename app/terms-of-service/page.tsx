import React from "react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service – Moydus | Global Service Terms & Conditions",
  description: "Moydus Terms of Service. Read our terms and conditions for using our web design, e-commerce, SaaS, and AI automation services worldwide across 150+ countries.",
  keywords: [
    "terms of service",
    "terms and conditions",
    "service agreement",
    "user agreement",
    "legal terms",
    "global terms",
  ],
  openGraph: {
    title: "Terms of Service – Moydus",
    description: "Read our terms and conditions for using Moydus services worldwide.",
    type: "website",
    locale: "en_US",
    siteName: "Moydus",
  },
  alternates: {
    canonical: "https://www.moydus.com/terms-of-service",
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

function TermsOfServicePage() {
  return (
    <section className="min-h-screen bg-[#000000] text-white px-4 md:px-7 py-20">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-semibold mb-4 text-white">
            Terms of Service
          </h1>
          <p className="text-white/60 text-lg">
            Last updated: {new Date().toLocaleDateString("en-US", { 
              year: "numeric", 
              month: "long", 
              day: "numeric" 
            })}
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none prose-invert">
          <div className="space-y-8 text-white/80 leading-relaxed">
            {/* Introduction */}
            <section>
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-white">
                Introduction
              </h2>
              <p className="mb-4 text-white/70 leading-relaxed">
                Welcome to Moydus. These Terms of Service (&quot;Terms&quot;) govern your 
                access to and use of our website, services, and platform (collectively, 
                the &quot;Services&quot;) provided by Moydus (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;).
              </p>
              <p className="text-white/70 leading-relaxed">
                By accessing or using our Services, you agree to be bound by these 
                Terms. If you do not agree to these Terms, please do not use our Services. 
                We serve customers globally across 150+ countries, and these Terms apply 
                to all users worldwide.
              </p>
            </section>

            {/* Acceptance of Terms */}
            <section>
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-white">
                Acceptance of Terms
              </h2>
              <p className="mb-4 text-white/70 leading-relaxed">
                By accessing, browsing, or using our Services, you acknowledge that you 
                have read, understood, and agree to be bound by these Terms and our Privacy 
                Policy. These Terms constitute a legally binding agreement between you and Moydus.
              </p>
            </section>

            {/* Description of Services */}
            <section>
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-white">
                Description of Services
              </h2>
              <p className="mb-4 text-white/70 leading-relaxed">
                Moydus provides digital solutions including:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-white/70 mb-4">
                <li>Web design and development services</li>
                <li>E-commerce platform development and management</li>
                <li>SaaS platform creation and hosting</li>
                <li>AI-powered automation tools and solutions</li>
                <li>Digital marketing and analytics services</li>
                <li>Custom software development</li>
                <li>Cloud infrastructure and hosting services</li>
              </ul>
              <p className="text-white/70 leading-relaxed">
                We reserve the right to modify, suspend, or discontinue any aspect of 
                our Services at any time without prior notice.
              </p>
            </section>

            {/* User Accounts */}
            <section>
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-white">
                User Accounts
              </h2>
              <p className="mb-4 text-white/70 leading-relaxed">
                To access certain features of our Services, you may need to create an 
                account. You agree to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-white/70 mb-4">
                <li>Provide accurate, current, and complete information</li>
                <li>Maintain and update your account information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Accept responsibility for all activities under your account</li>
                <li>Notify us immediately of any unauthorized access</li>
              </ul>
            </section>

            {/* Acceptable Use */}
            <section>
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-white">
                Acceptable Use
              </h2>
              <p className="mb-4 text-white/70 leading-relaxed">
                You agree not to use our Services:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-white/70 mb-4">
                <li>In any way that violates applicable laws or regulations</li>
                <li>To infringe upon intellectual property rights</li>
                <li>To transmit harmful, offensive, or illegal content</li>
                <li>To interfere with or disrupt our Services</li>
                <li>To attempt unauthorized access to our systems</li>
                <li>To engage in fraudulent or deceptive practices</li>
                <li>To collect or harvest user information without consent</li>
                <li>To use automated systems to access our Services without permission</li>
              </ul>
            </section>

            {/* Intellectual Property */}
            <section>
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-white">
                Intellectual Property Rights
              </h2>
              <p className="mb-4 text-white/70 leading-relaxed">
                All content, features, and functionality of our Services, including but 
                not limited to text, graphics, logos, images, software, and code, are 
                owned by Moydus or its licensors and are protected by international 
                copyright, trademark, and other intellectual property laws.
              </p>
              <p className="text-white/70 leading-relaxed">
                You may not reproduce, distribute, modify, create derivative works, 
                publicly display, or exploit any content from our Services without 
                our express written permission.
              </p>
            </section>

            {/* Payment Terms */}
            <section>
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-white">
                Payment Terms
              </h2>
              <p className="mb-4 text-white/70 leading-relaxed">
                For paid services:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-white/70 mb-4">
                <li>All fees are stated in the currency specified at the time of purchase</li>
                <li>Payment is due according to the terms of your service agreement</li>
                <li>We accept various payment methods including credit cards and bank transfers</li>
                <li>Prices may vary by region and are subject to applicable taxes</li>
                <li>Refunds are governed by our Refund Policy</li>
                <li>We reserve the right to change pricing with advance notice</li>
              </ul>
            </section>

            {/* Service Availability */}
            <section>
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-white">
                Service Availability
              </h2>
              <p className="mb-4 text-white/70 leading-relaxed">
                While we strive to provide reliable Services, we do not guarantee 
                uninterrupted or error-free operation. Our Services may be unavailable 
                due to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-white/70 mb-4">
                <li>Scheduled maintenance and updates</li>
                <li>Technical issues or system failures</li>
                <li>Force majeure events</li>
                <li>Third-party service disruptions</li>
              </ul>
            </section>

            {/* Limitation of Liability */}
            <section>
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-white">
                Limitation of Liability
              </h2>
              <p className="mb-4 text-white/70 leading-relaxed">
                To the maximum extent permitted by applicable law:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-white/70 mb-4">
                <li>Moydus shall not be liable for indirect, incidental, or consequential damages</li>
                <li>Our total liability shall not exceed the amount you paid for the Services</li>
                <li>We provide Services &quot;as is&quot; without warranties of any kind</li>
                <li>We do not guarantee specific results or outcomes</li>
              </ul>
            </section>

            {/* Indemnification */}
            <section>
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-white">
                Indemnification
              </h2>
              <p className="mb-4 text-white/70 leading-relaxed">
                You agree to indemnify and hold harmless Moydus, its affiliates, 
                officers, directors, employees, and agents from any claims, damages, 
                losses, liabilities, and expenses arising from:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-white/70 mb-4">
                <li>Your use of our Services</li>
                <li>Your violation of these Terms</li>
                <li>Your violation of any rights of another party</li>
                <li>Your content or materials</li>
              </ul>
            </section>

            {/* Termination */}
            <section>
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-white">
                Termination
              </h2>
              <p className="mb-4 text-white/70 leading-relaxed">
                We may terminate or suspend your access to our Services immediately, 
                without prior notice, for:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-white/70 mb-4">
                <li>Violation of these Terms</li>
                <li>Fraudulent or illegal activity</li>
                <li>Non-payment of fees</li>
                <li>Request by law enforcement</li>
                <li>Extended periods of inactivity</li>
              </ul>
              <p className="text-white/70 leading-relaxed">
                Upon termination, your right to use the Services will cease immediately, 
                and we may delete your account and data.
              </p>
            </section>

            {/* Governing Law */}
            <section>
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-white">
                Governing Law and Jurisdiction
              </h2>
              <p className="mb-4 text-white/70 leading-relaxed">
                These Terms shall be governed by and construed in accordance with the 
                laws of the United States, without regard to its conflict of law provisions. 
                For users outside the United States, these Terms are subject to applicable 
                local laws and regulations.
              </p>
              <p className="text-white/70 leading-relaxed">
                Any disputes arising from these Terms shall be resolved through binding 
                arbitration or in the courts of competent jurisdiction as specified in 
                your service agreement.
              </p>
            </section>

            {/* Changes to Terms */}
            <section>
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-white">
                Changes to Terms
              </h2>
              <p className="mb-4 text-white/70 leading-relaxed">
                We reserve the right to modify these Terms at any time. We will notify 
                you of material changes by posting the updated Terms on this page and 
                updating the &quot;Last updated&quot; date. Your continued use of our 
                Services after such changes constitutes acceptance of the modified Terms.
              </p>
            </section>

            {/* Contact Information */}
            <section>
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-white">
                Contact Us
              </h2>
              <p className="mb-4 text-white/70 leading-relaxed">
                If you have questions about these Terms of Service, please contact us:
              </p>
              <div className="bg-[#0a0a0a] border border-[#262626] rounded-xl p-6">
                <ul className="space-y-2 text-white/70">
                  <li>
                    <strong className="text-white">Email:</strong>{" "}
                    <Link 
                      href="mailto:legal@moydus.com" 
                      className="text-white underline hover:text-white/80 transition-colors"
                    >
                      legal@moydus.com
                    </Link>
                  </li>
                  <li>
                    <strong className="text-white">General Inquiries:</strong>{" "}
                    <Link 
                      href="mailto:info@moydus.com" 
                      className="text-white underline hover:text-white/80 transition-colors"
                    >
                      info@moydus.com
                    </Link>
                  </li>
                  <li>
                    <strong className="text-white">Support:</strong>{" "}
                    <Link 
                      href="/support" 
                      className="text-white underline hover:text-white/80 transition-colors"
                    >
                      /support
                    </Link>
                  </li>
                </ul>
              </div>
            </section>

            {/* Severability */}
            <section>
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-white">
                Severability
              </h2>
              <p className="mb-4 text-white/70 leading-relaxed">
                If any provision of these Terms is found to be unenforceable or invalid, 
                that provision shall be limited or eliminated to the minimum extent 
                necessary, and the remaining provisions shall remain in full force and effect.
              </p>
            </section>

            {/* Entire Agreement */}
            <section>
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-white">
                Entire Agreement
              </h2>
              <p className="mb-4 text-white/70 leading-relaxed">
                These Terms, together with our Privacy Policy and Refund Policy, 
                constitute the entire agreement between you and Moydus regarding the 
                use of our Services and supersede all prior agreements and understandings.
              </p>
            </section>
          </div>
        </div>

        {/* Footer Links */}
        <div className="mt-12 pt-8 border-t border-[#262626] flex flex-wrap gap-4 text-sm">
          <Link 
            href="/privacy-policy" 
            className="text-white/60 hover:text-white transition-colors"
          >
            Privacy Policy
          </Link>
          <span className="text-white/40">|</span>
          <Link 
            href="/refund-policy" 
            className="text-white/60 hover:text-white transition-colors"
          >
            Refund Policy
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
  );
}

export default TermsOfServicePage;
