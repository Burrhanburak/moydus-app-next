"use client";

import Link from "next/link";
import React from "react";

type Feature = { text: string };

function CheckItem({ text }: Feature) {
  return (
    <div className="w-full flex items-start gap-3">
      <div className="shrink-0 size-6 text-white/90">
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

export default function MarketplaceCard() {
  return (
    <div
      data-border
      className="w-full overflow-hidden"
      style={{
        borderWidth: 1,
        borderColor: "rgba(80, 78, 78, 0.35)",
        borderStyle: "solid",
        backdropFilter: "blur(1px)",
        backgroundColor: "#070204",
        borderRadius: 20,
      }}
    >
      <div
        className="p-6"
        style={{
          height: "min-content",
          margin: 5,
          borderColor: "rgba(138, 138, 138, 0.25)",
          borderStyle: "solid",
          backgroundColor: "rgba(46, 46, 46, 0.35)",
          borderRadius: 16,
        }}
      >
        <div className="flex flex-col gap-4 h-full overflow-hidden">
          <div className="flex items-center justify-between gap-2">
            <h4 className="text-white text-lg font-semibold">
              Marketplace Suite
            </h4>
            <div className="rounded-[20px] bg-white/10 border border-white/15 px-3 py-1">
              <p className="text-[14px] font-medium text-white/85">
                Multi-vendor
              </p>
            </div>
          </div>

          <p className="text-white/60 text-sm text-left">
            Build a multi-vendor marketplace with payouts, commissions, and
            vendor dashboards.
          </p>

          {/* Included */}
          <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
            <p className="text-[11px] font-semibold text-white/80 tracking-wide">
              INCLUDED
            </p>
            <p className="text-xs text-white/70 mt-1 leading-relaxed">
              Vendor onboarding • Payouts • Commissions • Unified checkout
            </p>
          </div>

          {/* Pricing */}
          <div className="flex flex-col gap-1 pt-1">
            <div className="flex items-baseline gap-2">
              <p className="text-white text-4xl md:text-5xl font-semibold">
                $8,000+
              </p>
            </div>
            <p className="text-white/60 text-sm text-left">starting from</p>

            <div className="flex flex-col gap-1 pt-2 border-t border-white/10">
              <p className="text-white/60 text-sm text-left">
                Maintenance - $250 - $450 per month (recurring)
              </p>
              <p className="text-white/60 text-sm text-left">
                Delivery: 6–10 weeks
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4 flex-1 mt-2 md:pt-16">
            {[
              "Multi-vendor onboarding + verification",
              "Vendor dashboard (products, orders, analytics)",
              "Unified multi-vendor checkout",
              "Split payments + automated payouts",
              "Commission rules + vendor fees",
              "Vendor profiles + reviews (optional)",
              "Real-time buyer–seller messaging (optional)",
              "Advanced search + filtering",
              "Multi-region + multi-channel rules",
              "ERP/PIM integrations (optional)",
              "SEO + schema engine + indexing strategy",
              "Bot protection & rate limiting",
              "Audit logs (optional)",
              "Private VPS included",
              "Performance testing (CWV) + hardening",
            ].map((t, i) => (
              <CheckItem key={i} text={t} />
            ))}
          </div>

          <Link
            href="https://app.moydus.com"
            target="_blank"
            rel="noopener"
            className="starter-btn group mt-2 inline-flex items-center justify-center gap-2 rounded-[27px] bg-white/85 text-black w-full"
            style={{
              borderWidth: 0,
              backdropFilter: "none",
              backgroundColor: "rgba(255, 255, 255, 0.85)",
              borderRadius: 27,
              boxShadow: "rgba(255, 255, 255, 0.12) 0px 0px 6px 3px inset",
              width: "100%",
              padding: "15px 6px 15px 15px",
              willChange: "auto",
            }}
          >
            <span className="text-sm font-medium">Start a Conversation</span>
            <span
              className="starter-arrow shrink-0 size-5 rounded-full text-white grid place-items-center transition-colors"
              style={{
                WebkitMask:
                  "radial-gradient(50% 50%, rgb(0,0,0) 97.7319%, rgba(0,0,0,0) 100%)",
                mask: "radial-gradient(50% 50%, rgb(0,0,0) 97.7319%, rgba(0,0,0,0) 100%)",
              }}
            >
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
