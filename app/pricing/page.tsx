"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import Script from "next/script";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  TrendingUp,
  Clock,
  Store,
  Building2,
  Users,
  Package,
  Wallet,
  ShieldCheck,
  Globe,
  Sparkles,
  MessageCircle,
  CheckCircle2,
} from "lucide-react";

import {
  buildWebPageSchema,
  buildOrganizationSchema,
  buildServiceSchema,
  buildFAQPageSchema,
} from "@/seo/json-ld/index";

type PlanKey = "starter" | "commerce" | "marketplace" | "custom";

type Plan = {
  key: PlanKey;
  name: string;
  highlight?: boolean;
  price: string;
  priceNote: string;
  maintenance: string;
  delivery: string;
  ctaLabel: string;
  ctaHref: string;

  badges?: string[];
  includedLine?: string;
  highlights?: { icon: React.ReactNode; text: string }[];
};

type Row = {
  label: string;
  values: Record<PlanKey, boolean | string>;
};

/* ================= ICONS ================= */

function CheckIcon() {
  return (
    <svg viewBox="0 0 256 256" className="size-5 text-white/90 shrink-0">
      <path
        d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm45.66,85.66-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35a8,8,0,0,1,11.32,11.32Z"
        fill="currentColor"
      />
    </svg>
  );
}

function MinusIcon() {
  return (
    <span className="inline-flex items-center justify-center size-5 text-white/30">
      —
    </span>
  );
}

function Cell({ value }: { value: boolean | string }) {
  if (typeof value === "string") {
    return <span className="text-sm text-white/80">{value}</span>;
  }
  return value ? <CheckIcon /> : <MinusIcon />;
}

/* ================= SMALL UI PIECES ================= */

function BadgePill({ text }: { text: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[11px] leading-none text-white/80">
      {text}
    </span>
  );
}

function HighlightLine({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) {
  return (
    <div className="flex items-start gap-2 text-xs text-white/70 leading-relaxed">
      <span className="mt-0.5 text-white/70">{icon}</span>
      <span>{text}</span>
    </div>
  );
}

/* ================= FAQ ================= */

function PricingFAQ() {
  const items = [
    {
      value: "choose",
      trigger: "Which package should I choose?",
      content: (
        <div className="space-y-3">
          <p>
            If you need a fast, premium website with strong SEO/GEO foundations,
            go with <b>Starter</b>.
          </p>
          <p>
            If you need <b>B2C + B2B commerce</b> (catalog, pricing rules, quote
            flows, automation), choose <b>Commerce Suite</b>.
          </p>
          <p>
            If you need a <b>multi-vendor marketplace</b> (vendors, payouts,
            commissions), choose <b>Marketplace Suite</b>. For complex custom
            requirements, go <b>Custom</b>.
          </p>

          <div className="pt-2 flex flex-wrap gap-2">
            <Button asChild size="sm" className="text-white">
              <Link href="/contact">Get a recommendation</Link>
            </Button>
            <Button asChild size="sm" variant="outline" className="text-black">
              <Link href="/contact?type=commerce">Talk to sales</Link>
            </Button>
          </div>
        </div>
      ),
    },
    {
      value: "delivery",
      trigger: "When does the timeline start?",
      content: (
        <div className="space-y-3">
          <p>
            Timelines start after scope is confirmed and we have the required
            access + assets. If content isn’t ready, we help define what’s
            needed and keep progress moving.
          </p>
        </div>
      ),
    },
    {
      value: "maintenance",
      trigger: "What does monthly maintenance include?",
      content: (
        <div className="space-y-3">
          <p>
            Monitoring, backups, security updates, performance checks (CWV),
            small iterative improvements, and priority support for
            fixes/optimizations based on real traffic signals.
          </p>
        </div>
      ),
    },
    {
      value: "seo",
      trigger: "What makes your SEO + GEO setup advanced?",
      content: (
        <div className="space-y-3">
          <p>
            Per-page schema, dynamic sitemap/robots strategy, canonical/indexing
            hygiene, and scalable programmatic local pages. Commerce/Marketplace
            adds content workflows + automation.
          </p>
        </div>
      ),
    },
    {
      value: "revisions",
      trigger: "Do you include revisions?",
      content: (
        <div className="space-y-3">
          <p>
            Yes—revisions are included. We iterate in clear phases (design →
            build → SEO/GEO → launch) and confirm milestones before moving
            forward.
          </p>
        </div>
      ),
    },
  ];

  return (
    <Card className="w-full border-white/10 bg-white/5 text-white">
      <CardHeader>
        <CardTitle className="text-white">FAQ</CardTitle>
        <CardDescription className="text-white/60">
          Quick answers about packages, delivery, maintenance, and growth.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion
          type="single"
          collapsible
          defaultValue="choose"
          className="rounded-md"
        >
          {items.map((item) => (
            <AccordionItem
              key={item.value}
              value={item.value}
              className="border-white/20"
            >
              <AccordionTrigger className="text-white">
                {item.trigger}
              </AccordionTrigger>
              <AccordionContent className="text-white/75">
                {item.content}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}

/* ================= MAIN ================= */

function PlanHeader({ p }: { p: Plan }) {
  return (
    <div className="py-8">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-2xl font-semibold text-white">{p.name}</h3>
        {p.highlight ? (
          <span className="rounded-full bg-white text-black px-2.5 py-1 text-[11px] font-semibold">
            Most Popular
          </span>
        ) : null}
      </div>

      {p.badges?.length ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {p.badges.map((b) => (
            <BadgePill key={b} text={b} />
          ))}
        </div>
      ) : null}

      {/* ✅ INCLUDED LINE (premium) */}
      {p.includedLine ? (
        <div
          className={`mt-3 rounded-xl border bg-white/5 px-3 py-2 ${
            p.highlight ? "border-white/20" : "border-white/10"
          }`}
        >
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-white/80 tracking-wide">
            <CheckCircle2 className="size-3.5 text-white/70" />
            INCLUDED
          </div>
          <div className="mt-1 text-xs text-white/70 leading-relaxed">
            {p.includedLine}
          </div>
        </div>
      ) : null}

      {p.price !== "Custom" ? (
        <div className="mt-4">
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-semibold text-white">{p.price}</p>
            <span className="text-white/60 text-sm">{p.priceNote}</span>
          </div>
          <p className="text-white/60 text-sm mt-1">{p.maintenance}</p>
          <p className="text-white/60 text-sm mt-1">Delivery: {p.delivery}</p>
        </div>
      ) : (
        <div className="mt-4 space-y-1">
          <p className="text-white/60 text-sm">{p.priceNote}</p>
          <p className="text-white/60 text-sm">{p.maintenance}</p>
          <p className="text-white/60 text-sm">Delivery: {p.delivery}</p>
        </div>
      )}

      <Link
        href={p.ctaHref}
        className="mt-5 inline-flex justify-center w-full rounded-md bg-white text-black px-4 py-2 text-sm font-medium transition"
      >
        {p.ctaLabel}
      </Link>

      {p.highlights?.length ? (
        <div className="mt-5 space-y-2.5">
          {p.highlights.map((h, idx) => (
            <HighlightLine key={idx} icon={h.icon} text={h.text} />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default function PricingComparisonAdvancedStable() {
  const plans: Plan[] = useMemo(
    () => [
      {
        key: "starter",
        name: "Starter",
        price: "$3,250+",
        priceNote: "one-time setup",
        maintenance: "$125–$175 / month",
        delivery: "5–10 business days",
        ctaLabel: "Get Started",
        ctaHref: "/contact?type=starter",
        badges: ["Premium website", "SEO/GEO base", "Fast delivery"],
        highlights: [
          {
            icon: <Sparkles className="size-4" />,
            text: "High-end UI + conversion-ready layout.",
          },
          {
            icon: <Globe className="size-4" />,
            text: "Indexing hygiene + schema + dynamic sitemap/robots.",
          },
          {
            icon: <ShieldCheck className="size-4" />,
            text: "Secure baseline, CDN/caching, backups.",
          },
        ],
      },
      {
        key: "commerce",
        name: "Commerce Suite",
        highlight: true,
        price: "$5,950+",
        priceNote: "starting from",
        maintenance: "$175–$275 / month",
        delivery: "3–6 weeks",
        ctaLabel: "Request Proposal",
        ctaHref: "/contact?type=commerce",
        badges: ["B2C + B2B", "RFQ / Quotes", "Automation-ready"],
        includedLine: "B2B accounts • RFQ • Price lists • Multi-region",
        highlights: [
          {
            icon: <Store className="size-4" />,
            text: "Modern e-commerce storefront + advanced catalog.",
          },
          {
            icon: <Building2 className="size-4" />,
            text: "Company & employee accounts + price lists/discounts.",
          },
          {
            icon: <Package className="size-4" />,
            text: "Bulk add-to-cart + bulk uploads + customer groups.",
          },
          {
            icon: <MessageCircle className="size-4" />,
            text: "Request-for-Quote + quotation management.",
          },
        ],
      },
      {
        key: "marketplace",
        name: "Marketplace Suite",
        price: "$8,000+",
        priceNote: "starting from",
        maintenance: "$250–$450 / month",
        delivery: "6–10 weeks",
        ctaLabel: "Start a Conversation",
        ctaHref: "/contact?type=marketplace",
        badges: ["Multi-vendor", "Payouts & commissions", "Vendor dashboard"],
        includedLine:
          "Vendor onboarding • Payouts • Commissions • Unified checkout",
        highlights: [
          {
            icon: <Users className="size-4" />,
            text: "Vendor onboarding, verification, profiles & reviews.",
          },
          {
            icon: <Wallet className="size-4" />,
            text: "Split payments + automated payouts + commissions.",
          },
          {
            icon: <Package className="size-4" />,
            text: "Unified multi-vendor checkout + order routing.",
          },
          {
            icon: <Globe className="size-4" />,
            text: "Multi-region rules + multi-channel setups.",
          },
        ],
      },
      {
        key: "custom",
        name: "Custom",
        price: "Custom",
        priceNote: "scoped per project",
        maintenance: "Ongoing development",
        delivery: "8–12+ weeks",
        ctaLabel: "Start a Conversation",
        ctaHref: "/contact?type=custom",
        badges: [
          "Complex builds",
          "Integrations",
          "Multi-tenant / AI workflows",
        ],
        highlights: [
          {
            icon: <ShieldCheck className="size-4" />,
            text: "Custom architecture, compliance-ready patterns.",
          },
          {
            icon: <Globe className="size-4" />,
            text: "ERP/PIM, multi-system commerce stacks, custom logic.",
          },
          {
            icon: <Sparkles className="size-4" />,
            text: "AI workflows, automation, growth experiments.",
          },
        ],
      },
    ],
    []
  );

  const groups = useMemo(() => {
    const pageStructure: Row[] = [
      {
        label: "Total number of pages",
        values: {
          starter: "5–10",
          commerce: "10–25",
          marketplace: "25–50",
          custom: "Unlimited",
        },
      },
      {
        label: "Homepage (Landing)",
        values: {
          starter: true,
          commerce: true,
          marketplace: true,
          custom: true,
        },
      },
      {
        label: "About Us",
        values: {
          starter: true,
          commerce: true,
          marketplace: true,
          custom: true,
        },
      },
      {
        label: "Service pages",
        values: {
          starter: true,
          commerce: true,
          marketplace: true,
          custom: true,
        },
      },
      {
        label: "Contact page",
        values: {
          starter: true,
          commerce: true,
          marketplace: true,
          custom: true,
        },
      },
      {
        label: "Legal / Privacy / Terms",
        values: {
          starter: true,
          commerce: true,
          marketplace: true,
          custom: true,
        },
      },
      {
        label: "Blog",
        values: {
          starter: "Optional",
          commerce: true,
          marketplace: true,
          custom: true,
        },
      },
      {
        label: "Custom landing pages",
        values: {
          starter: "Optional",
          commerce: true,
          marketplace: true,
          custom: true,
        },
      },
      {
        label: "Language-based pages",
        values: {
          starter: "Optional",
          commerce: true,
          marketplace: true,
          custom: true,
        },
      },
    ];

    const seoGeo: Row[] = [
      {
        label: "Advanced SEO + GEO (page-level)",
        values: {
          starter: true,
          commerce: true,
          marketplace: true,
          custom: true,
        },
      },
      {
        label: "Dynamic sitemap.xml",
        values: {
          starter: true,
          commerce: true,
          marketplace: true,
          custom: true,
        },
      },
      {
        label: "robots.txt crawl strategy",
        values: {
          starter: true,
          commerce: true,
          marketplace: true,
          custom: true,
        },
      },
      {
        label: "Multi-language sitemap + hreflang",
        values: {
          starter: "Optional",
          commerce: true,
          marketplace: true,
          custom: true,
        },
      },
      {
        label: "Schema (Service / FAQ / Local / Product)",
        values: {
          starter: "Basic",
          commerce: true,
          marketplace: true,
          custom: true,
        },
      },
      {
        label: "Programmatic local pages",
        values: {
          starter: "Optional",
          commerce: true,
          marketplace: true,
          custom: true,
        },
      },
      {
        label: "Geo-based content (IP detection)",
        values: {
          starter: false,
          commerce: "Optional",
          marketplace: true,
          custom: true,
        },
      },
      {
        label: "Indexing optimization",
        values: {
          starter: true,
          commerce: true,
          marketplace: true,
          custom: true,
        },
      },
      {
        label: "Competitor analysis",
        values: {
          starter: "Optional",
          commerce: "Basic",
          marketplace: "Advanced",
          custom: true,
        },
      },
      {
        label: "Language-based content & linking",
        values: {
          starter: "Optional",
          commerce: true,
          marketplace: true,
          custom: true,
        },
      },
    ];

    const contentLinking: Row[] = [
      {
        label: "SEO-friendly page structure",
        values: {
          starter: true,
          commerce: true,
          marketplace: true,
          custom: true,
        },
      },
      {
        label: "Service & landing page framework",
        values: {
          starter: true,
          commerce: true,
          marketplace: true,
          custom: true,
        },
      },
      {
        label: "Content freshness detection",
        values: {
          starter: false,
          commerce: "Optional",
          marketplace: true,
          custom: true,
        },
      },
      {
        label: "Internal linking recommendations",
        values: {
          starter: "Basic",
          commerce: true,
          marketplace: true,
          custom: true,
        },
      },
      {
        label: "Automated internal linking",
        values: {
          starter: false,
          commerce: "Optional",
          marketplace: true,
          custom: true,
        },
      },
      {
        label: "Topical map & content clusters",
        values: {
          starter: false,
          commerce: "Optional",
          marketplace: true,
          custom: true,
        },
      },
    ];

    const brandingDesign: Row[] = [
      {
        label: "UI / UX design",
        values: {
          starter: true,
          commerce: true,
          marketplace: true,
          custom: true,
        },
      },
      {
        label: "Brand colors & typography",
        values: {
          starter: true,
          commerce: true,
          marketplace: true,
          custom: true,
        },
      },
      {
        label: "Logo refinement / optimization",
        values: {
          starter: "Optional",
          commerce: true,
          marketplace: true,
          custom: true,
        },
      },
      {
        label: "AI-assisted image generation",
        values: {
          starter: "Optional",
          commerce: true,
          marketplace: true,
          custom: true,
        },
      },
      {
        label: "AI image editing (crop / background)",
        values: {
          starter: false,
          commerce: "Optional",
          marketplace: true,
          custom: true,
        },
      },
      {
        label: "Landing hero visuals",
        values: {
          starter: true,
          commerce: true,
          marketplace: true,
          custom: true,
        },
      },
    ];

    const platform: Row[] = [
      {
        label: "Admin panel (subdomain)",
        values: {
          starter: false,
          commerce: "Optional",
          marketplace: true,
          custom: true,
        },
      },
      {
        label: "Roles & permissions (RBAC)",
        values: {
          starter: "Optional",
          commerce: true,
          marketplace: true,
          custom: true,
        },
      },
      {
        label: "Approval & publishing workflows",
        values: {
          starter: false,
          commerce: true,
          marketplace: true,
          custom: true,
        },
      },
      {
        label: "Audit logs",
        values: {
          starter: false,
          commerce: "Optional",
          marketplace: true,
          custom: true,
        },
      },
    ];

    const commerceMarketplace: Row[] = [
      {
        label: "B2C store (standard e-commerce)",
        values: {
          starter: "Optional",
          commerce: true,
          marketplace: true,
          custom: true,
        },
      },
      {
        label: "B2B accounts (company & employees)",
        values: {
          starter: false,
          commerce: true,
          marketplace: true,
          custom: true,
        },
      },
      {
        label: "Employee spending limits",
        values: {
          starter: false,
          commerce: "Optional",
          marketplace: true,
          custom: true,
        },
      },
      {
        label: "Request for quote (RFQ) + quotation management",
        values: {
          starter: false,
          commerce: true,
          marketplace: true,
          custom: true,
        },
      },
      {
        label: "Bulk add-to-cart + bulk product upload",
        values: {
          starter: false,
          commerce: true,
          marketplace: true,
          custom: true,
        },
      },
      {
        label: "Price lists, discounts & customer groups",
        values: {
          starter: false,
          commerce: true,
          marketplace: true,
          custom: true,
        },
      },
      {
        label: "Cart approval flows",
        values: {
          starter: false,
          commerce: "Optional",
          marketplace: true,
          custom: true,
        },
      },
      {
        label: "Custom payment methods",
        values: {
          starter: false,
          commerce: "Optional",
          marketplace: true,
          custom: true,
        },
      },
      {
        label: "Multi-region store (currencies/taxes/rules)",
        values: {
          starter: false,
          commerce: true,
          marketplace: true,
          custom: true,
        },
      },
      {
        label: "Multi-system stack (ERP/PIM integration)",
        values: {
          starter: false,
          commerce: "Optional",
          marketplace: true,
          custom: true,
        },
      },

      {
        label: "Multi-vendor marketplace",
        values: {
          starter: false,
          commerce: false,
          marketplace: true,
          custom: true,
        },
      },
      {
        label: "Unified multi-vendor checkout",
        values: {
          starter: false,
          commerce: false,
          marketplace: true,
          custom: true,
        },
      },
      {
        label: "Split payments & payouts",
        values: {
          starter: false,
          commerce: false,
          marketplace: true,
          custom: true,
        },
      },
      {
        label: "Vendor dashboard (products/orders)",
        values: {
          starter: false,
          commerce: false,
          marketplace: true,
          custom: true,
        },
      },
      {
        label: "Vendor verification, commissions & profiles",
        values: {
          starter: false,
          commerce: false,
          marketplace: true,
          custom: true,
        },
      },
      {
        label: "Vendor reviews + buyer–seller messaging",
        values: {
          starter: false,
          commerce: false,
          marketplace: "Optional",
          custom: true,
        },
      },
      {
        label: "Advanced search & filtering",
        values: {
          starter: "Basic",
          commerce: true,
          marketplace: true,
          custom: true,
        },
      },
    ];

    const productFeeds: Row[] = [
      {
        label: "Google Merchant Center setup",
        values: {
          starter: false,
          commerce: true,
          marketplace: true,
          custom: true,
        },
      },
      {
        label: "Product feed (XML / scheduled fetch)",
        values: {
          starter: false,
          commerce: true,
          marketplace: true,
          custom: true,
        },
      },
      {
        label: "Feed rules & error management",
        values: {
          starter: false,
          commerce: "Basic",
          marketplace: true,
          custom: true,
        },
      },
      {
        label: "Free listings & Shopping Ads ready",
        values: {
          starter: false,
          commerce: "Optional",
          marketplace: true,
          custom: true,
        },
      },
      {
        label: "Meta (Facebook / Instagram) catalog",
        values: {
          starter: false,
          commerce: "Optional",
          marketplace: true,
          custom: true,
        },
      },
      {
        label: "TikTok / Pinterest catalog",
        values: {
          starter: false,
          commerce: false,
          marketplace: "Optional",
          custom: true,
        },
      },
    ];

    const llmAi: Row[] = [
      {
        label: "LLM-ready page structure",
        values: {
          starter: true,
          commerce: true,
          marketplace: true,
          custom: true,
        },
      },
      {
        label: "Knowledge graph & entity signals",
        values: {
          starter: "Basic",
          commerce: true,
          marketplace: true,
          custom: true,
        },
      },
      {
        label: "Programmatic FAQ & Q/A blocks",
        values: {
          starter: false,
          commerce: "Optional",
          marketplace: true,
          custom: true,
        },
      },
      {
        label: "AI snippets & service summaries",
        values: {
          starter: false,
          commerce: "Optional",
          marketplace: true,
          custom: true,
        },
      },
    ];

    const analyticsPerformance: Row[] = [
      {
        label: "Google Analytics 4 (GA4)",
        values: {
          starter: true,
          commerce: true,
          marketplace: true,
          custom: true,
        },
      },
      {
        label: "Google Search Console",
        values: {
          starter: true,
          commerce: true,
          marketplace: true,
          custom: true,
        },
      },
      {
        label: "Country / city traffic tracking",
        values: {
          starter: "Basic",
          commerce: true,
          marketplace: true,
          custom: true,
        },
      },
      {
        label: "Page & CWV performance reports",
        values: {
          starter: "Basic",
          commerce: true,
          marketplace: true,
          custom: true,
        },
      },
      {
        label: "Event & conversion tracking",
        values: {
          starter: false,
          commerce: "Optional",
          marketplace: true,
          custom: true,
        },
      },
      {
        label: "Heatmaps & session recordings",
        values: {
          starter: false,
          commerce: "Optional",
          marketplace: true,
          custom: true,
        },
      },
    ];

    const emailContact: Row[] = [
      {
        label: "Business email accounts (info@, sales@)",
        values: {
          starter: true,
          commerce: true,
          marketplace: true,
          custom: true,
        },
      },
      {
        label: "SMTP / IMAP setup",
        values: {
          starter: true,
          commerce: true,
          marketplace: true,
          custom: true,
        },
      },
      {
        label: "Google Workspace / Business Email",
        values: {
          starter: "Optional",
          commerce: "Optional",
          marketplace: true,
          custom: true,
        },
      },
      {
        label: "Contact & quote forms",
        values: {
          starter: true,
          commerce: true,
          marketplace: true,
          custom: true,
        },
      },
      {
        label: "Form → email routing",
        values: {
          starter: true,
          commerce: true,
          marketplace: true,
          custom: true,
        },
      },
      {
        label: "Email deliverability (SPF / DKIM / DMARC)",
        values: {
          starter: "Optional",
          commerce: true,
          marketplace: true,
          custom: true,
        },
      },
    ];

    const socialLocal: Row[] = [
      {
        label: "Google Business Profile",
        values: {
          starter: "Optional",
          commerce: true,
          marketplace: true,
          custom: true,
        },
      },
      {
        label: "Apple Business Connect",
        values: {
          starter: false,
          commerce: "Optional",
          marketplace: true,
          custom: true,
        },
      },
      {
        label: "Map pin & NAP consistency",
        values: {
          starter: false,
          commerce: true,
          marketplace: true,
          custom: true,
        },
      },
      {
        label: "Review monitoring & alerts",
        values: {
          starter: false,
          commerce: "Optional",
          marketplace: true,
          custom: true,
        },
      },
    ];

    const infraSecurity: Row[] = [
      {
        label: "Private VPS",
        values: {
          starter: true,
          commerce: true,
          marketplace: true,
          custom: "VPS / Cloud",
        },
      },
      {
        label: "CDN + caching + image optimization",
        values: {
          starter: true,
          commerce: true,
          marketplace: true,
          custom: true,
        },
      },
      {
        label: "Backups & restore",
        values: {
          starter: "Basic",
          commerce: true,
          marketplace: true,
          custom: true,
        },
      },
      {
        label: "Bot protection & rate limiting",
        values: {
          starter: true,
          commerce: true,
          marketplace: true,
          custom: true,
        },
      },
      {
        label: "SSL & security headers",
        values: {
          starter: true,
          commerce: true,
          marketplace: true,
          custom: true,
        },
      },
    ];

    return [
      { title: "PAGE STRUCTURE", rows: pageStructure },
      { title: "SEO & GEO", rows: seoGeo },
      { title: "CONTENT & LINKING", rows: contentLinking },
      { title: "BRANDING & DESIGN", rows: brandingDesign },
      { title: "PLATFORM", rows: platform },
      { title: "E-COMMERCE & MARKETPLACE", rows: commerceMarketplace },
      { title: "PRODUCT FEEDS & CHANNELS", rows: productFeeds },
      { title: "LLM & AI VISIBILITY", rows: llmAi },
      { title: "ANALYTICS & PERFORMANCE", rows: analyticsPerformance },
      { title: "EMAIL & CONTACT", rows: emailContact },
      { title: "SOCIAL & LOCAL", rows: socialLocal },
      { title: "INFRASTRUCTURE & SECURITY", rows: infraSecurity },
    ];
  }, []);

  const [open, setOpen] = useState<PlanKey>("commerce");

  const pricingSchemas = useMemo(() => {
    const datePublished = "2024-01-15T00:00:00Z";
    const dateModified = new Date().toISOString();

    const pageSchema = buildWebPageSchema({
      url: "https://www.moydus.com/pricing",
      title: "Pricing – Web, Commerce & Marketplace Packages | Moydus",
      description:
        "Transparent pricing for premium websites, B2B/B2C commerce, and multi-vendor marketplaces. Choose Starter, Commerce Suite, Marketplace Suite, or Custom.",
      datePublished,
      dateModified,
    });

    const organizationSchema = buildOrganizationSchema();

    const serviceSchema = buildServiceSchema({
      url: "https://www.moydus.com/pricing",
      name: "Web, Commerce & Marketplace Development",
      description:
        "Premium websites, B2B/B2C commerce, and multi-vendor marketplaces with SEO/GEO and automation foundations.",
      category: "Web & Commerce Development",
      areaServed: "Worldwide",
      priceFrom: 3250,
      priceTo: 8000,
      currency: "USD",
    });

    const faqSchema = buildFAQPageSchema([
      {
        question: "Which package should I choose?",
        answer:
          "Starter is best for a fast premium website. Commerce Suite is best for B2B/B2C commerce with pricing rules and quote flows. Marketplace Suite is for multi-vendor marketplaces with payouts, commissions, and vendor dashboards. Custom is for complex requirements and integrations.",
      },
      {
        question: "When does the timeline start?",
        answer:
          "Timelines start after scope is confirmed and required access + assets are provided.",
      },
      {
        question: "What does monthly maintenance include?",
        answer:
          "Monitoring, backups, security updates, performance checks (CWV), small iterative improvements, and priority support.",
      },
      {
        question: "Do you include revisions?",
        answer:
          "Yes—revisions are included and delivered in phases with milestone approvals.",
      },
    ]);

    return [pageSchema, organizationSchema, serviceSchema, faqSchema];
  }, []);

  return (
    <>
      <Script
        id="pricing-json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingSchemas) }}
      />

      <section className="py-32">
        <div className="container mx-auto px-5 font-medium">
          {/* MOBILE */}
          <div className="md:hidden">
            <div className="flex flex-wrap gap-2 mb-6">
              {plans.map((p) => (
                <button
                  key={p.key}
                  onClick={() => setOpen(p.key)}
                  className={`px-3 py-2 rounded-full text-sm border transition ${
                    open === p.key
                      ? "bg-white text-black border-white"
                      : "text-white/80 border-white/15"
                  }`}
                >
                  {p.name}
                </button>
              ))}
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 px-6">
              <PlanHeader p={plans.find((x) => x.key === open)!} />
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 my-8">
              <div className="flex items-center gap-2 text-white">
                <Clock className="size-4 text-white/80" />
                <span className="text-sm text-white/80">
                  Delivery:{" "}
                  <b className="text-white">
                    {plans.find((p) => p.key === open)?.delivery}
                  </b>
                </span>
              </div>
            </div>

            {groups.map((g) => (
              <div key={g.title} className="mb-8">
                <h3 className="text-lg font-semibold text-white mb-2">
                  {g.title}
                </h3>
                <div className="border border-white/10 rounded-xl overflow-hidden">
                  {g.rows.map((r, idx) => (
                    <div
                      key={r.label}
                      className={`grid grid-cols-2 px-4 py-3 ${
                        idx !== g.rows.length - 1
                          ? "border-b border-white/10"
                          : ""
                      }`}
                    >
                      <span className="text-white/80 text-sm">{r.label}</span>
                      <div className="flex justify-end">
                        <Cell value={r.values[open]} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="mt-10">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h3 className="text-white text-xl font-semibold">
                  Choose a Package
                </h3>
                <p className="text-white/60 text-sm mt-2">
                  Tell us what you need — we’ll recommend the best plan and ship
                  fast.
                </p>
                <div className="mt-4 flex gap-2">
                  <Button asChild className="w-full">
                    <Link
                      href="https://app.moydus.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Choose Package
                      <TrendingUp className="size-4 text-white ml-2" />
                    </Link>
                  </Button>
                </div>
                <p className="text-white/50 text-xs mt-4">
                  Response within 24 hours • Clear scope • No hidden fees
                </p>
              </div>

              <div className="mt-8">
                <PricingFAQ />
              </div>
            </div>
          </div>

          {/* TABLET (md) */}
          <div className="hidden md:block lg:hidden">
            <div className="overflow-x-auto -mx-5 px-5 pb-2">
              <div className="inline-grid grid-cols-[90px_repeat(4,minmax(190px,220px))] gap-4 min-w-max">
                {/* Left labels */}
                <div className="sticky left-0 z-10 bg-[#070204] pr-4">
                  <div className="h-[160px]" />
                  {groups.map((g) => (
                    <div key={g.title} className="mt-10">
                      <h3 className="min-h-16 flex items-center text-sm font-semibold text-white">
                        {g.title}
                      </h3>
                      {g.rows.map((r) => (
                        <div
                          key={r.label}
                          className="py-4 border-b border-white/10 text-white/80 text-xs leading-relaxed"
                        >
                          {r.label}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>

                {/* Plan columns */}
                {plans.map((p) => (
                  <div
                    key={p.key}
                    className={`px-5 rounded-2xl border w-[220px] ${
                      p.highlight
                        ? "bg-white/5 border-white/25"
                        : "border-white/10"
                    }`}
                  >
                    <PlanHeader p={p} />

                    {groups.map((g) => (
                      <div key={g.title}>
                        <div className="min-h-16" />
                        {g.rows.map((r) => (
                          <div
                            key={r.label}
                            className="py-4 border-b border-white/20 flex items-center justify-center"
                          >
                            <Cell value={r.values[p.key]} />
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-16 space-y-6">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h3 className="text-white text-xl font-semibold">
                  Choose a Package
                </h3>
                <p className="text-white/60 text-sm mt-2 leading-relaxed">
                  Not sure which one fits? Tell us your goals — we&apos;ll
                  recommend the best package and provide a clear roadmap.
                </p>

                <div className="mt-4 flex flex-col gap-2">
                  <Button asChild className="w-full">
                    <Link
                      href="https://app.moydus.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Choose Package
                      <TrendingUp className="size-4 text-white ml-2" />
                    </Link>
                  </Button>

                  <Button asChild variant="outline" className="w-full">
                    <Link href="/contact?type=commerce">Request Proposal</Link>
                  </Button>
                </div>

                <p className="text-white/50 text-xs mt-4">
                  Response within 24 hours • Clear scope • No hidden fees
                </p>
              </div>

              <PricingFAQ />
            </div>
          </div>

          {/* DESKTOP (lg+) */}
          <div className="hidden lg:grid lg:grid-cols-5 gap-4">
            {/* Left labels */}
            <div>
              <div className="h-[160px]" />
              {groups.map((g) => (
                <div key={g.title} className="mt-10">
                  <h3 className="min-h-16 flex items-center text-lg font-semibold text-white">
                    {g.title}
                  </h3>
                  {g.rows.map((r) => (
                    <div
                      key={r.label}
                      className="py-4 border-b border-white/10 text-white/80 text-sm"
                    >
                      {r.label}
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Plan columns */}
            {plans.map((p) => (
              <div
                key={p.key}
                className={`px-6 rounded-2xl border ${
                  p.highlight ? "bg-white/5 border-white/25" : "border-white/10"
                }`}
              >
                <PlanHeader p={p} />

                {groups.map((g) => (
                  <div key={g.title}>
                    <div className="min-h-16" />
                    {g.rows.map((r) => (
                      <div
                        key={r.label}
                        className="py-4 border-b border-white/20"
                      >
                        <Cell value={r.values[p.key]} />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* DESKTOP Bottom CTA + FAQ */}
          <div className="hidden lg:block mt-16">
            <div className="grid grid-cols-12 gap-6 items-start">
              <div className="col-span-5">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
                  <h3 className="text-white text-2xl font-semibold">
                    Choose a Package
                  </h3>
                  <p className="text-white/60 text-sm mt-2 leading-relaxed">
                    Not sure which one fits? Tell us your goals (website,
                    e-commerce, marketplace, automation, local growth) — we’ll
                    recommend the best package and provide a clear roadmap.
                  </p>

                  <div className="mt-6 flex flex-col gap-3">
                    <Button asChild className="w-full">
                      <Link
                        href="https://app.moydus.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Choose Package
                        <TrendingUp className="size-4 text-white ml-2" />
                      </Link>
                    </Button>

                    <Button asChild variant="outline" className="w-full">
                      <Link href="/contact?type=marketplace">
                        Request Proposal
                      </Link>
                    </Button>
                  </div>

                  <p className="text-white/50 text-xs mt-4">
                    Response within 24 hours • Clear scope • No hidden fees
                  </p>
                </div>
              </div>

              <div className="col-span-7">
                <PricingFAQ />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
