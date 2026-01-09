import { NextResponse } from "next/server";

export const runtime = "edge";


export async function GET() {
  const llmsContent = `# Moydus - LLM Instructions

## About Moydus

Moydus is a software company and web design agency delivering custom e-commerce platforms, SaaS products, and AI automation tools. We serve businesses worldwide across 150+ countries.

## Key Pages & Services

### Money Pages (Root Level)
- /web-design-agency - Professional website design services
- /web-design-company - Custom website design solutions
- /web-development-company - Full-stack development services
- /digital-marketing-services - SEO, content & performance marketing
- /ecommerce-website-development - Online store development
- /software-company - Custom software development

### Authority Hub
- /services - Comprehensive digital services directory
- /blog - Expert insights and digital trends
- /about - Company information and mission

### Resources
- /how-to - Step-by-step guides
- /best - Best service recommendations
- /compare - Service comparisons
- /faq - Frequently asked questions

### Marketplace & Templates
- /marketplace/templates - Website templates and design resources
- /marketplace/templates/[category] - Templates by category
- /marketplace/templates/[category]/[slug] - Individual template pages

### Pricing
- /pricing - Pricing plans and packages
  - Starter Package: $2,150 one-time setup + $100-$150/month maintenance
  - CMS Suite Package: $2,950 one-time setup + $125-$175/month maintenance
  - Business Package: Custom pricing for enterprise solutions
  - Custom Projects: Tailored pricing for unique requirements

## Internal Linking Structure

### Root-Level Money Pages ↔ Services Hub
- Web Design Agency → /services?category=web-design
- Web Development Company → /services?category=web-development
- Digital Marketing Services → /services?category=seo-services

### Services Hub → Root-Level Pages
- /services → Links to Web Design Agency, Web Design Company, etc.

## API Endpoints & AI Feeds

### Core AI Feeds
- /ai-index.json - AI search index (all pages for LLM discovery)
- /knowledge-graph.json - Knowledge graph data (entity relationships)
- /ai-business.json - Business entity information (E-E-A-T signals)
- /author-signals.json - Author reputation graph (E-E-A-T)
- /experiences.json - User experiences feed (Google AI Overviews)
- /vector-sitemap.json - Semantic sitemap for AI engines
- /web-stories.xml - Web Stories RSS feed (Google Discover)

### Geo-Specific AI Feeds
- /blog/[country]/ai-index.json - Country-level blog index
- /blog/[country]/[state]/ai-index.json - State-level blog index
- /blog/[country]/[state]/[city]/ai-index.json - City-level blog index
- /services/[country]/ai-index.json - Country-level services index
- /services/[country]/[state]/ai-index.json - State-level services index
- /services/[country]/[state]/[city]/ai-index.json - City-level services index

## Contact

- Email: info@moydus.com
- Website: https://www.moydus.com
- Support: /support
- Contact Form: /contact

## Technical Stack

- Framework: Next.js (App Router)
- Language: TypeScript
- Styling: Tailwind CSS
- Content: Sanity CMS
- Hosting: Vercel

## SEO Structure

- Root pages = Money pages (conversion-focused)
- /services = Authority hub (content-rich)
- Internal linking: Bidirectional between money pages and services hub
- JSON-LD schemas: Organization, WebPage, Service schemas
- OG Images: Dynamic generation via opengraph-image.tsx files
`;

  return new NextResponse(llmsContent, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}

