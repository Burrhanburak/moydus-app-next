"use client";

import Link from "next/link";
import React from "react";

type Feature = { text: string };

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

export default function CommerceCard() {
  return (
    <div
      data-border
      className="w-full overflow-hidden"
      style={{
        padding: 5,
        borderWidth: 1,
        borderColor: "rgba(204, 61, 0, 0.7)",
        borderStyle: "solid",
        backdropFilter: "blur(10px)",
        backgroundColor: "rgba(0, 0, 0, 0)",
        borderRadius: 20,
        boxShadow: "0px 0px 15px 0px rgba(204, 61, 0, 0.7)",
        willChange: "transform",
      }}
    >
      <div
        className="p-6"
        style={{
          borderWidth: 0,
          background:
            "linear-gradient(180deg, rgba(204, 61, 0, 0.93) 0%, rgba(204, 61, 0, 0.02) 100%)",
          borderRadius: 16,
          height: "min-content",
        }}
      >
        <div className="flex flex-col gap-3 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between gap-2">
            <h4 className="text-white text-lg font-semibold">Commerce Suite</h4>
            <div className="rounded-[20px] bg-white px-3 py-1">
              <p className="text-[14px] font-medium text-[rgb(204,61,0)]">
                Most Popular
              </p>
            </div>
          </div>

          {/* Subtitle */}
          <p className="text-white/80 text-sm">
            B2C + B2B commerce (wholesale, pricing rules, RFQ)
          </p>

          {/* ✅ Trust note – EKLENDİ */}
          <p className="text-white/60 text-xs italic">
            Most clients start here.
          </p>

          {/* Included */}
          <div className="rounded-xl border border-white/15 bg-white/5 px-3 py-2 mt-1">
            <p className="text-[11px] font-semibold text-white/85 tracking-wide">
              INCLUDED
            </p>
            <p className="text-xs text-white/75 mt-1 leading-relaxed">
              B2B accounts • RFQ • Price lists • Multi-region
            </p>
          </div>

          {/* Pricing */}
          <div className="flex flex-col gap-1 pt-2">
            <div className="flex items-baseline gap-2">
              <p className="text-white text-4xl md:text-5xl font-semibold">
                $5,950+
              </p>
            </div>
            <p className="text-white/75 text-md text-left">starting from</p>

            <div className="flex flex-col gap-1 pt-2 border-t border-white/10">
              <p className="text-white/70 text-sm text-left">
                Maintenance - $175 - $275 per month (recurring)
              </p>
              <p className="text-white/70 text-sm text-left">
                Delivery: 3–6 weeks
              </p>
            </div>
          </div>

          {/* Features */}
          <div className="flex flex-col gap-4 flex-1 mt-2 md:pt-16">
            {[
              "Custom commerce storefront (B2C) + catalog",
              "B2B accounts (company + employees)",
              "Employee spending limits (optional)",
              "Request for quote (RFQ) + quotation management",
              "Bulk add-to-cart + bulk product uploads",
              "Customer groups + price lists + discounts",
              "Cart approval flows (optional)",
              "Custom payment methods (optional)",
              "Multi-region store (currencies/taxes/rules)",
              "Advanced search + filtering",
              "SEO + product schema + indexing hygiene",
              "Transactional email flows",
              "Bot protection & rate limiting",
              "Private VPS included",
              "Performance + security hardening",
            ].map((t, i) => (
              <CheckItem key={i} text={t} />
            ))}
          </div>

          {/* CTA */}
          <Link
            href="https://app.moydus.com"
            target="_blank"
            rel="noopener"
            className="mt-2 inline-flex items-center justify-center gap-2 rounded-[27px] bg-[#ff4d00] text-black w-full"
            style={{
              borderWidth: 0,
              backdropFilter: "none",
              borderRadius: 27,
              width: "100%",
              padding: "15px 6px 15px 15px",
              willChange: "auto",
            }}
          >
            <span className="text-sm font-medium text-white">
              Request Proposal
            </span>
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
