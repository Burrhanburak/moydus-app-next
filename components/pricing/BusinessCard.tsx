"use client";

import Link from "next/link";
import React from "react";

type Feature = { text: string; orange?: boolean };

function CheckItem({ text }: Feature) {
  return (
    <div className="w-full flex items-start gap-3">
      <div className="shrink-0 size-6 text-white">
        <svg viewBox="0 0 256 256" className="w-full h-full">
          <path
            d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm45.66,85.66-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35a8,8,0,0,1,11.32,11.32Z"
            fill="currentColor"
          />
        </svg>
      </div>
      <p className="text-white/90 text-md font-medium">{text}</p>
    </div>
  );
}

export default function BusinessCard() {
  return (
    <div
      data-border
      className="w-full  overflow-hidden"
      style={{
        padding: "5px",
        borderBottomWidth: "1px",
        borderLeftWidth: "1px",
        borderRightWidth: "1px",
        borderTopWidth: "1px",
        borderColor: "rgba(209, 63, 0, 0.7)",
        borderStyle: "solid",
        backdropFilter: "blur(10px)",
        backgroundColor: "rgba(0, 0, 0, 0)",
        borderRadius: "20px",
        boxShadow: "0px 0px 15px 0px rgba(209, 63, 0, 0.7)",
        willChange: "transform",
      }}
    >
      <div
        className="p-6"
        style={{
          borderBottomWidth: 0,
          borderLeftWidth: 0,
          borderRightWidth: 0,

          borderTopWidth: 0,
          borderColor: "rgba(209, 63, 0, 0.7)",
          background:
            "linear-gradient(180deg, rgba(204, 61, 0, 0.93) 0%, rgba(204, 61, 0, 0.02) 100%)",
          borderRadius: "16px",
          height: "min-content",
        }}
      >
        <div className="flex flex-col gap-3 overflow-hidden">
          <div className="flex items-center justify-between gap-2">
            <h4 className="text-white text-lg font-semibold">
              Business Package
            </h4>
            <div className="rounded-[20px] bg-white px-3 py-1">
              <p className="text-[14px] font-medium text-[rgb(204,61,0)]">
                Best value
              </p>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <p className="text-white text-4xl md:text-5xl font-semibold">
              $3,750
            </p>
          </div>
          <p className="text-white/75 text-md text-left">One time</p>

          <div className="flex flex-col gap-1 pt-2 border-t border-white/10">
            <p className="text-white/60 text-sm text-left">
              Maintenance - $150 -$200 per month (recurring)
            </p>
          </div>
          <div className="flex flex-col gap-4 flex-1">
            {[
              "Custom E-Commerce Platform",
              "B2C & B2B / Wholesale Ready",
              "Product & Inventory Management",
              "Order, Invoice & Customer System",
              "Multi-Language Storefront",
              "SEO & Product Schema",
              "Branding Optimization",
              "AI Product Recommendations",
              "Transactional Email Flows",
              "Role-Based Access Control",
              "Bot Protection & Rate Limiting",
              "Checkout & Payment Flows",
              "WhatsApp Commerce Integration",
              "Advanced Analytics & Tracking",
              "Private VPS Included",
              "Enterprise Performance & Security",
            ].map((t, i) => (
              <CheckItem key={i} text={t} />
            ))}
          </div>

          <Link
            href="https://app.moydus.com"
            target="_blank"
            rel="noopener"
            className="mt-2 inline-flex items-center justify-center gap-2 rounded-[27px] bg-[#ff4d00] text-black w-full"
            style={{
              borderBottomWidth: 0,
              borderLeftWidth: 0,
              borderRightWidth: 0,
              borderTopWidth: 0,
              backdropFilter: "none",
              borderRadius: 27,
              width: "100%",
              padding: "15px 6px 15px 15px",
              willChange: "auto",
            }}
          >
            <span className="text-sm font-medium text-white">Get Started</span>
            <span className="shrink-0 size-5 rounded-full bg-black text-white grid place-items-center">
              <svg
                viewBox="0 0 256 256"
                className="w-3.5 h-3.5"
                fill="currentColor"
              >
                <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z" />
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
