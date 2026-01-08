import React from "react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy – Moydus | Global Data Protection & Privacy",
  description: "Moydus Privacy Policy. Learn how we protect your data, handle personal information, and ensure privacy compliance across 150+ countries worldwide.",
  keywords: [
    "privacy policy",
    "data protection",
    "privacy compliance",
    "GDPR",
    "data security",
    "global privacy",
  ],
  openGraph: {
    title: "Privacy Policy – Moydus",
    description: "Learn how we protect your data and ensure privacy compliance worldwide.",
    type: "website",
    locale: "en_US",
    siteName: "Moydus",
  },
  alternates: {
    canonical: "https://www.moydus.com/privacy-policy",
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

function PrivacyPolicyPage() {
  return (
    <section className="min-h-screen bg-[#000000] text-white px-4 md:px-7 py-20">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-semibold mb-4 text-white">
            Privacy Policy
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
                At Moydus, we are committed to protecting your privacy and ensuring 
                the security of your personal information. This Privacy Policy explains 
                how we collect, use, disclose, and safeguard your information when you 
                use our services, visit our website, or interact with us.
              </p>
              <p className="text-white/70 leading-relaxed">
                We operate globally and serve customers across 150+ countries. This 
                policy applies to all users worldwide and complies with international 
                data protection standards including GDPR, CCPA, and other applicable 
                privacy laws.
              </p>
            </section>

            {/* Information We Collect */}
            <section>
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-white">
                Information We Collect
              </h2>
              <p className="mb-4 text-white/70 leading-relaxed">
                We collect information that you provide directly to us and information 
                that is automatically collected when you use our services:
              </p>
              <h3 className="text-xl md:text-2xl font-semibold mb-3 text-white mt-6">
                Personal Information
              </h3>
              <ul className="list-disc pl-6 space-y-2 text-white/70 mb-4">
                <li>Name, email address, phone number, and contact information</li>
                <li>Business information and company details</li>
                <li>Payment and billing information</li>
                <li>Account credentials and authentication data</li>
                <li>Communication preferences</li>
              </ul>
              <h3 className="text-xl md:text-2xl font-semibold mb-3 text-white mt-6">
                Automatically Collected Information
              </h3>
              <ul className="list-disc pl-6 space-y-2 text-white/70 mb-4">
                <li>IP address and location data</li>
                <li>Browser type and device information</li>
                <li>Usage data and analytics</li>
                <li>Cookies and tracking technologies</li>
                <li>Log files and system information</li>
              </ul>
            </section>

            {/* How We Use Information */}
            <section>
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-white">
                How We Use Your Information
              </h2>
              <p className="mb-4 text-white/70 leading-relaxed">
                We use the information we collect for the following purposes:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-white/70 mb-4">
                <li>To provide, maintain, and improve our services</li>
                <li>To process transactions and manage your account</li>
                <li>To communicate with you about our services and updates</li>
                <li>To personalize your experience and provide relevant content</li>
                <li>To analyze usage patterns and improve our platform</li>
                <li>To ensure security and prevent fraud</li>
                <li>To comply with legal obligations and enforce our terms</li>
              </ul>
            </section>

            {/* Data Sharing */}
            <section>
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-white">
                Data Sharing and Disclosure
              </h2>
              <p className="mb-4 text-white/70 leading-relaxed">
                We do not sell your personal information. We may share your information 
                only in the following circumstances:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-white/70 mb-4">
                <li>With service providers who assist us in operating our platform</li>
                <li>When required by law or to protect our rights</li>
                <li>In connection with a business transfer or merger</li>
                <li>With your explicit consent</li>
                <li>To comply with legal obligations across different jurisdictions</li>
              </ul>
            </section>

            {/* Data Security */}
            <section>
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-white">
                Data Security
              </h2>
              <p className="mb-4 text-white/70 leading-relaxed">
                We implement industry-standard security measures to protect your 
                information:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-white/70 mb-4">
                <li>Encryption of data in transit and at rest</li>
                <li>Regular security audits and assessments</li>
                <li>Access controls and authentication mechanisms</li>
                <li>Secure data storage and backup systems</li>
                <li>Employee training on data protection</li>
              </ul>
            </section>

            {/* Your Rights */}
            <section>
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-white">
                Your Privacy Rights
              </h2>
              <p className="mb-4 text-white/70 leading-relaxed">
                Depending on your location, you may have the following rights:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-white/70 mb-4">
                <li><strong className="text-white">Access:</strong> Request access to your personal data</li>
                <li><strong className="text-white">Correction:</strong> Request correction of inaccurate data</li>
                <li><strong className="text-white">Deletion:</strong> Request deletion of your personal data</li>
                <li><strong className="text-white">Portability:</strong> Request transfer of your data</li>
                <li><strong className="text-white">Objection:</strong> Object to processing of your data</li>
                <li><strong className="text-white">Restriction:</strong> Request restriction of processing</li>
                <li><strong className="text-white">Withdraw Consent:</strong> Withdraw consent at any time</li>
              </ul>
              <p className="text-white/70 leading-relaxed mt-4">
                To exercise these rights, please contact us at{" "}
                <Link 
                  href="mailto:privacy@moydus.com" 
                  className="text-white underline hover:text-white/80 transition-colors"
                >
                  privacy@moydus.com
                </Link>
              </p>
            </section>

            {/* Cookies */}
            <section>
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-white">
                Cookies and Tracking Technologies
              </h2>
              <p className="mb-4 text-white/70 leading-relaxed">
                We use cookies and similar tracking technologies to enhance your 
                experience, analyze usage, and improve our services. You can control 
                cookies through your browser settings.
              </p>
            </section>

            {/* International Data Transfers */}
            <section>
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-white">
                International Data Transfers
              </h2>
              <p className="mb-4 text-white/70 leading-relaxed">
                As a global service provider, we may transfer your data across 
                borders. We ensure appropriate safeguards are in place to protect 
                your data in accordance with applicable privacy laws, including 
                standard contractual clauses and other approved mechanisms.
              </p>
            </section>

            {/* Children's Privacy */}
            <section>
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-white">
                Children&apos;s Privacy
              </h2>
              <p className="mb-4 text-white/70 leading-relaxed">
                Our services are not intended for individuals under the age of 18. 
                We do not knowingly collect personal information from children. If 
                you believe we have collected information from a child, please contact 
                us immediately.
              </p>
            </section>

            {/* Changes to Policy */}
            <section>
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-white">
                Changes to This Privacy Policy
              </h2>
              <p className="mb-4 text-white/70 leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify 
                you of any material changes by posting the new policy on this page and 
                updating the &quot;Last updated&quot; date. We encourage you to review 
                this policy periodically.
              </p>
            </section>

            {/* Contact Information */}
            <section>
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-white">
                Contact Us
              </h2>
              <p className="mb-4 text-white/70 leading-relaxed">
                If you have questions about this Privacy Policy or our data practices, 
                please contact us:
              </p>
              <div className="bg-[#0a0a0a] border border-[#262626] rounded-xl p-6">
                <ul className="space-y-2 text-white/70">
                  <li>
                    <strong className="text-white">Email:</strong>{" "}
                    <Link 
                      href="mailto:privacy@moydus.com" 
                      className="text-white underline hover:text-white/80 transition-colors"
                    >
                      privacy@moydus.com
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
                    <strong className="text-white">Data Protection Officer:</strong>{" "}
                    <Link 
                      href="mailto:dpo@moydus.com" 
                      className="text-white underline hover:text-white/80 transition-colors"
                    >
                      dpo@moydus.com
                    </Link>
                  </li>
                </ul>
              </div>
            </section>

            {/* Legal Basis */}
            <section>
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-white">
                Legal Basis for Processing
              </h2>
              <p className="mb-4 text-white/70 leading-relaxed">
                We process your personal data based on:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-white/70 mb-4">
                <li>Your consent when you provide it</li>
                <li>Performance of a contract with you</li>
                <li>Compliance with legal obligations</li>
                <li>Legitimate business interests</li>
                <li>Protection of vital interests</li>
              </ul>
            </section>

            {/* Data Retention */}
            <section>
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-white">
                Data Retention
              </h2>
              <p className="mb-4 text-white/70 leading-relaxed">
                We retain your personal data only for as long as necessary to fulfill 
                the purposes outlined in this policy, unless a longer retention period 
                is required or permitted by law. When data is no longer needed, we 
                securely delete or anonymize it.
              </p>
            </section>
          </div>
        </div>

        {/* Footer Links */}
        <div className="mt-12 pt-8 border-t border-[#262626] flex flex-wrap gap-4 text-sm">
          <Link 
            href="/terms-of-service" 
            className="text-white/60 hover:text-white transition-colors"
          >
            Terms of Service
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

export default PrivacyPolicyPage;
