/**
 * LLM.TS - AI Entity Recognition & Semantic Analysis Helpers
 *
 * This module provides utilities for AI-powered SEO and entity extraction
 * to enhance content understanding by LLMs (ChatGPT, Perplexity, Google AI)
 */

// ============================================================================
// GEO ENTITY EXTRACTION
// ============================================================================

export interface GeoEntity {
  country?: string;
  state?: string;
  city?: string;
  region?: string;
  continent?: string;
}

export interface SemanticEntity {
  type: 'location' | 'service' | 'technology' | 'industry' | 'intent';
  value: string;
  confidence: number;
  context?: string;
}

/**
 * Extract geographic entities from text content
 * Useful for AI to understand local context
 */
export function extractGeoEntities(text: string): GeoEntity[] {
  const entities: GeoEntity[] = [];

  // Common patterns for location mentions
  const locationPatterns = [
    /in ([A-Z][a-z]+(?:\s[A-Z][a-z]+)*),\s*([A-Z][a-z]+(?:\s[A-Z][a-z]+)*)/gi, // "in Paris, France"
    /([A-Z][a-z]+(?:\s[A-Z][a-z]+)*)-based/gi, // "France-based"
    /from ([A-Z][a-z]+(?:\s[A-Z][a-z]+)*)/gi, // "from Switzerland"
  ];

  locationPatterns.forEach(pattern => {
    const matches = text.matchAll(pattern);
    for (const match of matches) {
      entities.push({
        city: match[1],
        country: match[2],
      });
    }
  });

  return entities;
}

// ============================================================================
// SEMANTIC KEYWORD GENERATION
// ============================================================================

/**
 * Generate semantic keywords for AI understanding
 * Combines geo + service + intent signals
 */
export function generateSemanticKeywords(params: {
  category: string;
  geo: GeoEntity;
  intent?: string;
  year?: number;
}): string[] {
  const { category, geo, intent, year = new Date().getFullYear() } = params;

  const keywords: string[] = [];

  // Core semantic signals
  const geoLabel = [geo.city, geo.state, geo.country].filter(Boolean).join(' ');

  if (geoLabel) {
    keywords.push(
      `${category} ${geoLabel}`,
      `${geoLabel} ${category}`,
      `${category} services ${geoLabel}`,
      `${category} agencies ${geoLabel}`,
      `${category} experts ${geoLabel}`,
      `local ${category} ${geoLabel}`,
    );
  }

  // Intent-based keywords
  if (intent) {
    keywords.push(
      `${intent} ${category}`,
      `${category} ${intent}`,
      `${intent} ${category} ${geoLabel}`,
    );
  }

  // Temporal keywords
  keywords.push(
    `${category} ${year}`,
    `${category} trends ${year}`,
    `best ${category} ${year}`,
  );

  return keywords.filter(Boolean);
}

// ============================================================================
// ENTITY CONFIDENCE SCORING
// ============================================================================

/**
 * Calculate entity confidence score for AI ranking
 * Higher score = more relevant for AI to surface
 */
export function calculateEntityConfidence(params: {
  titleMatch: boolean;
  contentMentions: number;
  geoMatch: boolean;
  categoryMatch: boolean;
}): number {
  const { titleMatch, contentMentions, geoMatch, categoryMatch } = params;

  let score = 0;

  if (titleMatch) score += 40;
  if (geoMatch) score += 30;
  if (categoryMatch) score += 20;

  // Content mentions contribute up to 10 points
  score += Math.min(contentMentions * 2, 10);

  return Math.min(score, 100);
}

// ============================================================================
// SEMANTIC CLUSTER GENERATION
// ============================================================================

export interface SemanticCluster {
  topic: string;
  entities: SemanticEntity[];
  relatedTopics: string[];
  geoContext: GeoEntity;
}

/**
 * Build semantic clusters for AI understanding
 * Groups related entities for better context
 */
export function buildSemanticCluster(params: {
  mainTopic: string;
  relatedTopics: string[];
  geo: GeoEntity;
  keywords: string[];
}): SemanticCluster {
  const { mainTopic, relatedTopics, geo, keywords } = params;

  const entities: SemanticEntity[] = keywords.map(keyword => ({
    type: inferEntityType(keyword),
    value: keyword,
    confidence: calculateKeywordConfidence(keyword, mainTopic),
  }));

  return {
    topic: mainTopic,
    entities,
    relatedTopics,
    geoContext: geo,
  };
}

function inferEntityType(keyword: string): SemanticEntity['type'] {
  const lowerKeyword = keyword.toLowerCase();

  if (/\b(city|country|state|region)\b/.test(lowerKeyword)) {
    return 'location';
  }
  if (/\b(seo|web design|development|marketing|automation)\b/.test(lowerKeyword)) {
    return 'service';
  }
  if (/\b(ai|ml|react|next\.?js|node|python)\b/.test(lowerKeyword)) {
    return 'technology';
  }
  if (/\b(guide|how to|best|top|complete)\b/.test(lowerKeyword)) {
    return 'intent';
  }

  return 'industry';
}

function calculateKeywordConfidence(keyword: string, mainTopic: string): number {
  const lowerKeyword = keyword.toLowerCase();
  const lowerTopic = mainTopic.toLowerCase();

  // Exact match = high confidence
  if (lowerKeyword.includes(lowerTopic)) return 90;

  // Partial match = medium confidence
  const topicWords = lowerTopic.split(/\s+/);
  const matchingWords = topicWords.filter(word => lowerKeyword.includes(word));
  if (matchingWords.length > 0) {
    return 60 + (matchingWords.length / topicWords.length) * 30;
  }

  // No match = low confidence
  return 40;
}

// ============================================================================
// AI-FRIENDLY CONTENT STRUCTURE
// ============================================================================

export interface AIContentStructure {
  headline: string;
  snippet: string;
  entities: SemanticEntity[];
  geoSignals: GeoEntity;
  intent: string;
  semanticKeywords: string[];
  internalLinks: Array<{ text: string; url: string; relevance: number }>;
}

/**
 * Structure content for optimal AI understanding
 * Used by LLMs for RAG (Retrieval-Augmented Generation)
 */
export function structureForAI(params: {
  title: string;
  content: string;
  geo: GeoEntity;
  category: string;
  intent?: string;
  keywords?: string[];
}): AIContentStructure {
  const { title, content, geo, category, intent = 'informational', keywords = [] } = params;

  // Extract snippet (first 160 chars for AI preview)
  const snippet = content.substring(0, 160).trim() + '...';

  // Extract entities from content
  const geoEntities = extractGeoEntities(content);
  const primaryGeo = geoEntities[0] || geo;

  // Generate semantic keywords
  const semanticKeywords = generateSemanticKeywords({
    category,
    geo: primaryGeo,
    intent,
  });

  // Build entities list
  const entities: SemanticEntity[] = [
    { type: 'location', value: [primaryGeo.city, primaryGeo.state, primaryGeo.country].filter(Boolean).join(', '), confidence: 95 },
    { type: 'service', value: category, confidence: 90 },
    { type: 'intent', value: intent, confidence: 85 },
    ...keywords.map(k => ({
      type: 'industry' as const,
      value: k,
      confidence: 70,
    })),
  ];

  return {
    headline: title,
    snippet,
    entities,
    geoSignals: primaryGeo,
    intent,
    semanticKeywords: [...new Set([...semanticKeywords, ...keywords])],
    internalLinks: [],
  };
}

// ============================================================================
// EXPORT ALL HELPERS
// ============================================================================

export const LLMHelpers = {
  extractGeoEntities,
  generateSemanticKeywords,
  calculateEntityConfidence,
  buildSemanticCluster,
  structureForAI,
};

export default LLMHelpers;
