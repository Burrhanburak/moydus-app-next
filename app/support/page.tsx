import React from "react";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import type { Metadata } from "next";
import { getAllSupportTickets } from "@/app/actions/support-actions";
import SupportTicketsClient from "./_components/SupportTicketsClient";

export const metadata: Metadata = {
  title: "Support – Get Help from Moydus | Global Customer Support",
  description:
    "Get help from our global support team. Product support, billing assistance, and emergency support available 24/7 for customers worldwide across 150+ countries.",
  keywords: [
    "moydus support",
    "customer support",
    "technical support",
    "global support",
    "help center",
    "worldwide support",
  ],
  openGraph: {
    title: "Support – Get Help from Moydus",
    description:
      "Get help from our global support team. Available 24/7 worldwide.",
    type: "website",
    locale: "en_US",
    siteName: "Moydus",
  },
  alternates: {
    canonical: "https://www.moydus.com/support",
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

async function SupportPage() {
  // Fetch support tickets on server side
  const ticketsResult = await getAllSupportTickets();
  const tickets =
    ticketsResult.success && ticketsResult.data
      ? Array.isArray(ticketsResult.data)
        ? ticketsResult.data
        : ticketsResult.data.data || []
      : [];

  return (
    <div className="relative flex py-25 mx-auto min-h-screen items-center justify-center bg-[#000000] gap-[120px] px-4 md:pr-[100px] md:pl-[100px] font-sans overflow-hidden">
      <div className="container max-w-[1000px] flex flex-col gap-8 items-center justify-center w-full">
        <div className="flex flex-col gap-4 items-center text-center">
          <h1 className="text-white text-[32px] md:text-4xl lg:text-5xl font-bold">
            Support
          </h1>
          <p className="text-white/70 text-base md:text-lg text-center font-normal max-w-2xl">
            Get help from our global team. Use the AI assistant in the bottom
            right corner for instant help, or contact us directly below.
          </p>
        </div>

        <div className="flex flex-col gap-4 w-full md:grid md:grid-cols-2 lg:grid-cols-3 md:items-stretch">
          {/* Billing Support Card */}
          <Card className="w-full max-w-full h-[218px] bg-[#000000] border border-white/10 rounded-[15px] flex flex-col items-start justify-between gap-1 p-[30px] relative overflow-hidden will-change-transform md:col-span-1">
            <div className="flex-none flex flex-col items-start gap-5 w-full h-min p-0 relative overflow-visible">
              <div className="framer-nQ26K framer-1vz58le">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-white"
                >
                  <path
                    d="M20 4H4C2.89 4 2.01 4.89 2.01 6L2 18C2 19.11 2.89 20 4 20H20C21.11 20 22 19.11 22 18V6C22 4.89 21.11 4 20 4ZM20 18H4V12H20V18ZM20 8H4V6H20V8Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-white text-lg md:text-xl font-semibold">
                  Billing Support
                </h3>
                <p className="text-white/70 text-[15px] md:text-base font-normal">
                  Fix account or billing issues.
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <SupportTicketsClient category="billing" />
            </div>
          </Card>

          {/* Emergency Support Card */}
          <Card className="w-full max-w-full h-[218px] bg-[#000000] border border-white/10 rounded-[15px] flex flex-col items-start justify-between gap-1 p-[30px] relative overflow-hidden will-change-transform md:col-span-1">
            <div className="flex-none flex flex-col items-start gap-5 w-full h-min p-0 relative overflow-visible">
              <div className="framer-eg3kN framer-elj8bw">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-white"
                >
                  <path
                    d="M1 21H23L12 2L1 21ZM13 18H11V16H13V18ZM13 14H11V10H13V14Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-white text-lg md:text-xl font-semibold">
                  Emergency Support
                </h3>
                <p className="text-white/70 text-[15px] md:text-base font-normal">
                  Urgent help when your site&apos;s down.
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <SupportTicketsClient category="emergency" priority="urgent" />
            </div>
          </Card>

          {/* Talk to Sales Card */}
          <Card className="w-full max-w-full h-[218px] bg-[#000000] border border-white/10 rounded-[15px] flex flex-col items-start justify-between gap-1 p-[30px] relative overflow-hidden will-change-transform md:col-span-1">
            <div className="flex-none flex flex-col items-start gap-5 w-full h-min p-0 relative overflow-visible">
              <div className="framer-eg3kN framer-elj8bw">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-message-circle-icon lucide-message-circle"
                >
                  <path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719" />
                </svg>
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-white text-lg md:text-xl font-semibold">
                  Talk to Sales
                </h3>
                <p className="text-white/70 text-[15px] md:text-base font-normal">
                  Work with our team on enterprise solutions.
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <a
                href="https://wa.me/15054605392?text=Hi%2C%20I%27d%20like%20to%20discuss%20enterprise%20solutions"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 text-white rounded-full px-3 py-2 text-sm font-medium hover:opacity-90 transition-opacity inline-block"
              >
                Talk to sales
              </a>
            </div>
          </Card>
        </div>

        {/* AI Assistant CTA */}
        <Card className="w-full max-w-full bg-[#000000] border border-white/10 rounded-[15px] flex flex-col items-center gap-4 p-[30px] text-center">
          <div className="flex flex-col gap-2">
            <h3 className="text-white text-xl md:text-2xl font-semibold">
              Need instant help?
            </h3>
            <p className="text-white/70 text-[15px] md:text-base font-normal">
              Use our AI assistant in the bottom right corner for instant
              answers about pricing, scope, support, and more.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default SupportPage;
