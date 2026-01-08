import { NextResponse } from "next/server";

export async function GET() {
  const robotsTxt = `User-agent: *
Allow: /

# Sitemaps
Sitemap: https://www.moydus.com/sitemap.xml
Sitemap: https://www.moydus.com/web-stories.xml
Sitemap: https://www.moydus.com/vector-sitemap.json

# AI & Knowledge Feeds (for LLMs and Search Engines)
Sitemap: https://www.moydus.com/ai-index.json
Sitemap: https://www.moydus.com/knowledge-graph.json
Sitemap: https://www.moydus.com/experiences.json
Sitemap: https://www.moydus.com/author-signals.json
Sitemap: https://www.moydus.com/ai-business.json

# LLM Instructions
Allow: /llms.txt

# Disallow admin and API routes
Disallow: /api/
Disallow: /studio/
Disallow: /admin/

# Disallow query parameters (SEO best practice)
Disallow: /*?*
Disallow: /*&*

# ——— OPENAI ———
# Search (shows webpages as links inside ChatGPT search). NOT used for model training.
User-agent: OAI-SearchBot
Allow: /

# User-driven browsing from ChatGPT and Custom GPTs. Acts after a human click.
User-agent: ChatGPT-User
User-agent: ChatGPT-User/2.0
Allow: /

# Model-training crawler. Opt-out here if we don't want content in GPT-4o or GPT-5.
User-agent: GPTBot
Disallow: /api/
Disallow: /studio/
Disallow: /admin/
Allow: /

# ——— ANTHROPIC (Claude) ———
User-agent: anthropic-ai
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: claude-web
Allow: /

# ——— PERPLEXITY ———
User-agent: PerplexityBot
Allow: /

User-agent: Perplexity-User
Allow: /

# ——— GOOGLE (Gemini) ———
User-agent: Google-Extended
Allow: /

# ——— MICROSOFT (Bing / Copilot) ———
User-agent: BingBot
Allow: /

# ——— AMAZON ———
User-agent: Amazonbot
Allow: /

# ——— APPLE ———
User-agent: Applebot
User-agent: Applebot-Extended
Allow: /

# ——— META ———
User-agent: FacebookBot
Allow: /

User-agent: meta-externalagent
Allow: /

# ——— LINKEDIN ———
User-agent: LinkedInBot
Allow: /

# ——— BYTEDANCE ———
User-agent: Bytespider
Allow: /

# ——— DUCKDUCKGO ———
User-agent: DuckAssistBot
Allow: /

# ——— COHERE ———
User-agent: cohere-ai
Allow: /

# ——— ALLEN INSTITUTE / COMMON CRAWL / OTHER RESEARCH ———
User-agent: AI2Bot
Allow: /

User-agent: CCBot
Allow: /

User-agent: Diffbot
Allow: /

User-agent: omgili
Allow: /

# ——— EMERGING SEARCH START-UPS ———
User-agent: TimpiBot
Allow: /

User-agent: YouBot
Allow: /
`;

  return new NextResponse(robotsTxt, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}

