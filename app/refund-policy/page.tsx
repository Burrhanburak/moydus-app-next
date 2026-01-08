import React from "react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund Policy – Moydus | Global Refund Terms & Conditions",
  description:
    "Moydus Refund Policy. Learn about our refund terms, eligibility criteria, and process for services worldwide across 150+ countries.",
  keywords: [
    "refund policy",
    "money back guarantee",
    "refund terms",
    "service cancellation",
    "refund process",
    "global refund policy",
  ],
  alternates: {
    canonical: "https://www.moydus.com/refund-policy",
  },
  openGraph: {
    title: "Refund Policy – Moydus",
    description:
      "Learn about our refund terms and process for services worldwide.",
    type: "website",
    locale: "en_US",
    siteName: "Moydus",
    url: "https://www.moydus.com/refund-policy",
  },
  twitter: {
    card: "summary_large_image",
    title: "Refund Policy – Moydus",
    description:
      "Learn about our refund terms and process for services worldwide.",
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

function RefundPolicyPage() {
  return (
    <section className="min-h-screen bg-[#000000] text-white px-4 md:px-7 py-20">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-semibold mb-4 text-white">
            Refund Policy
          </h1>
          <p className="text-white/60 text-lg">
            Last updated:{" "}
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
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
                At Moydus, we strive to provide exceptional software development
                services and products. We understand that sometimes
                circumstances change, and you may need to request a refund. This
                Refund Policy outlines the terms and conditions under which
                refunds may be granted.
              </p>
              <p className="text-white/70 leading-relaxed">
                By using our services or purchasing our products, you agree to
                this Refund Policy. If you do not agree with any part of this
                policy, please do not use our services.
              </p>
            </section>

            {/* Refund Eligibility */}
            <section>
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-white">
                Refund Eligibility
              </h2>
              <p className="mb-4 text-white/70 leading-relaxed">
                Refunds may be considered under the following circumstances:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-white/70 mb-4">
                <li>
                  <strong className="text-white">Service Cancellation:</strong>{" "}
                  If you cancel a service within 48 hours of purchase and before
                  work has commenced, you may be eligible for a full refund.
                </li>
                <li>
                  <strong className="text-white">Non-Delivery:</strong> If we
                  fail to deliver the promised service or product within the
                  agreed timeframe and cannot provide a satisfactory resolution.
                </li>
                <li>
                  <strong className="text-white">Technical Issues:</strong> If
                  you experience significant technical problems that prevent you
                  from using our services and we are unable to resolve them
                  within 30 days.
                </li>
                <li>
                  <strong className="text-white">Duplicate Charges:</strong> If
                  you have been charged multiple times for the same service or
                  product.
                </li>
                <li>
                  <strong className="text-white">Billing Errors:</strong> If
                  there has been an error in billing or charging.
                </li>
              </ul>
            </section>

            {/* Non-Refundable Items */}
            <section>
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-white">
                Non-Refundable Items
              </h2>
              <p className="mb-4 text-white/70 leading-relaxed">
                The following items are generally not eligible for refunds:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-white/70 mb-4">
                <li>Services that have already been completed and delivered</li>
                <li>
                  Custom development work that has been started or completed
                </li>
                <li>Digital products that have been downloaded or accessed</li>
                <li>Subscription fees for periods that have already elapsed</li>
                <li>Services cancelled after the 48-hour window</li>
                <li>
                  Refunds requested due to change of mind after service delivery
                </li>
              </ul>
            </section>

            {/* Refund Process */}
            <section>
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-white">
                Refund Process
              </h2>
              <p className="mb-4 text-white/70 leading-relaxed">
                To request a refund, please follow these steps:
              </p>
              <ol className="list-decimal pl-6 space-y-3 text-white/70 mb-4">
                <li>
                  <strong className="text-white">Contact Us:</strong> Send an
                  email to{" "}
                  <Link
                    href="mailto:info@moydus.com"
                    className="text-white underline hover:text-white/80 transition-colors"
                  >
                    info@moydus.com
                  </Link>{" "}
                  with the subject line &quot;Refund Request&quot; and include:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Your order or transaction number</li>
                    <li>Date of purchase</li>
                    <li>Reason for refund request</li>
                    <li>Any supporting documentation</li>
                  </ul>
                </li>
                <li>
                  <strong className="text-white">Review Period:</strong> We will
                  review your request within 5-7 business days and may contact
                  you for additional information if needed.
                </li>
                <li>
                  <strong className="text-white">Decision:</strong> You will
                  receive an email notification regarding the approval or denial
                  of your refund request.
                </li>
                <li>
                  <strong className="text-white">Processing:</strong> If
                  approved, refunds will be processed to the original payment
                  method within 10-14 business days.
                </li>
              </ol>
            </section>

            {/* Refund Timeframes */}
            <section>
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-white">
                Refund Timeframes
              </h2>
              <div className="bg-[#0a0a0a] border border-[#262626] rounded-xl p-6 mb-4">
                <ul className="space-y-3 text-white/70">
                  <li>
                    <strong className="text-white">
                      Service Cancellation:
                    </strong>{" "}
                    48 hours from purchase date
                  </li>
                  <li>
                    <strong className="text-white">Processing Time:</strong> 5-7
                    business days for review, 10-14 business days for refund to
                    appear in your account
                  </li>
                  <li>
                    <strong className="text-white">Technical Issues:</strong>{" "}
                    Must be reported within 30 days of purchase
                  </li>
                </ul>
              </div>
            </section>

            {/* Partial Refunds */}
            <section>
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-white">
                Partial Refunds
              </h2>
              <p className="mb-4 text-white/70 leading-relaxed">
                In some cases, we may offer partial refunds:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-white/70 mb-4">
                <li>
                  If work has been partially completed, we may refund the unused
                  portion
                </li>
                <li>
                  If there are minor issues that don&apos;t prevent full use of
                  the service
                </li>
                <li>
                  If both parties agree to a partial refund as a resolution
                </li>
              </ul>
            </section>

            {/* Subscription Refunds */}
            <section>
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-white">
                Subscription Services
              </h2>
              <p className="mb-4 text-white/70 leading-relaxed">
                For subscription-based services:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-white/70 mb-4">
                <li>You may cancel your subscription at any time</li>
                <li>
                  Refunds are only available for the current billing period if
                  cancelled within 48 hours of the charge
                </li>
                <li>No refunds for previous billing periods</li>
                <li>
                  Your access will continue until the end of the current billing
                  period
                </li>
              </ul>
            </section>

            {/* Disputes */}
            <section>
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-white">
                Disputes and Appeals
              </h2>
              <p className="mb-4 text-white/70 leading-relaxed">
                If your refund request is denied and you believe the decision
                was made in error, you may:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-white/70 mb-4">
                <li>Request a review by our management team</li>
                <li>Provide additional documentation or evidence</li>
                <li>Contact us to discuss alternative resolutions</li>
              </ul>
            </section>

            {/* Contact Information */}
            <section>
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-white">
                Contact Us
              </h2>
              <p className="mb-4 text-white/70 leading-relaxed">
                If you have questions about this Refund Policy or need to
                request a refund, please contact us:
              </p>
              <div className="bg-[#0a0a0a] border border-[#262626] rounded-xl p-6">
                <ul className="space-y-2 text-white/70">
                  <li>
                    <strong className="text-white">Email:</strong>{" "}
                    <Link
                      href="mailto:info@moydus.com"
                      className="text-white underline hover:text-white/80 transition-colors"
                    >
                      info@moydus.com
                    </Link>
                  </li>
                  <li>
                    <strong className="text-white">Support Page:</strong>{" "}
                    <Link
                      href="/support"
                      className="text-white underline hover:text-white/80 transition-colors"
                    >
                      /support
                    </Link>
                  </li>
                  <li>
                    <strong className="text-white">Response Time:</strong> We
                    typically respond within 24-48 hours during business days
                  </li>
                </ul>
              </div>
            </section>

            {/* Policy Updates */}
            <section>
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-white">
                Policy Updates
              </h2>
              <p className="mb-4 text-white/70 leading-relaxed">
                We reserve the right to update this Refund Policy at any time.
                Changes will be effective immediately upon posting to this page.
                We encourage you to review this policy periodically to stay
                informed about our refund practices.
              </p>
              <p className="text-white/70 leading-relaxed">
                Your continued use of our services after any changes to this
                policy constitutes acceptance of those changes.
              </p>
            </section>

            {/* Legal Rights */}
            <section>
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-white">
                Your Legal Rights
              </h2>
              <p className="mb-4 text-white/70 leading-relaxed">
                Nothing in this Refund Policy affects your statutory rights as a
                consumer. If you are located in a jurisdiction that provides
                additional consumer protection rights, those rights are in
                addition to the terms outlined in this policy.
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
            href="/terms-of-service"
            className="text-white/60 hover:text-white transition-colors"
          >
            Terms of Service
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

export default RefundPolicyPage;
