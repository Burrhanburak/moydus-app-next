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
      <p className="text-white/90 text-md text-font-medium">{text}</p>
    </div>
  );
}

export default function CustomCard() {
  return (
    <div
      data-border
      className="w-full overflow-hidden"
      style={{
        borderBottomWidth: "1px",
        borderLeftWidth: "1px",
        borderRightWidth: "1px",
        borderTopWidth: "1px",
        borderColor: "rgba(80, 78, 78, 0.3)",
        borderStyle: "solid",
        backdropFilter: "blur(1px)",
        backgroundColor: "#070204",
        borderRadius: "20px",
      }}
    >
      <div
        className="p-6"
        style={{
          height: "min-content",
          margin: "5px",
          borderColor: "rgba(138, 138, 138, 0.3)",
          borderStyle: "solid",
          backgroundColor: "rgba(46, 46, 46, 0.4)",
          borderRadius: "16px",
        }}
      >
        <div className="flex flex-col gap-10 h-full overflow-hidden">
          <div className="flex flex-col gap-4">
            <h4 className="text-white text-lg font-semibold">
              Need Something Custom?
            </h4>

            <p className="text-white/70 text-sm leading-relaxed">
              Custom panels, integrations, AI workflows & internal tools — built
              around your needs.
            </p>

            {/* Tags */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              {[
                "Custom Panels",
                "AI Workflows",
                "Integrations",
                "Automations",
              ].map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full text-xs font-medium text-white/80 bg-white/5 border border-white/10"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Custom Quote Section */}
            <div className="flex flex-col gap-3 pt-2 border-t border-white/10">
              <div className="flex flex-col gap-1">
                <p className="text-white text-2xl font-semibold">
                  Custom Project
                </p>

                <p className="text-white/70 text-sm leading-relaxed">
                  Scoping, architecture & delivery tailored to your
                  requirements.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 flex-1 h-1/2 md:pt-16">
            {[
              "Custom Panel Development",
              "AI-Powered Workflows",
              "Third-Party Integrations",
              "Real-Time Dashboards & Analytics",
              "Workflow Automation",
              "Custom Authentication Systems",
              "Multi-Tenant Ready",
              "Scalable Infrastructure Setup",
              "Dedicated Support & Maintenance",
              "Private VPS & Cloud Resources",
              "Ongoing Development & Updates",
            ].map((t, i) => (
              <CheckItem key={i} text={t} />
            ))}
          </div>

          <Link
            href="/contact"
            className="starter-btn group mt-2 inline-flex items-center justify-center gap-2 rounded-[27px] bg-white/85 text-black w-full hover:bg-white transition-colors"
            style={{
              borderBottomWidth: 0,
              borderLeftWidth: 0,
              borderRightWidth: 0,
              borderTopWidth: 0,
              backdropFilter: "none",
              backgroundColor: "rgba(255, 255, 255, 0.85)",
              borderRadius: 27,
              boxShadow: "rgba(255, 255, 255, 0.15) 0px 0px 6px 3px inset",
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
