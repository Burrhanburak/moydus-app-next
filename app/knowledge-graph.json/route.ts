import { getKnowledgeGraph } from "@/app/actions/ai-actions";
import { NextResponse } from "next/server";

export async function GET() {
  const result = await getKnowledgeGraph();

  if (!result.success) {
    return NextResponse.json(
      { error: result.error || "Failed to fetch knowledge graph" },
      { status: 500 }
    );
  }

  // Root-level money pages and service pages relationships for knowledge graph
  const rootPagesRelationships = {
    "web-design-agency": {
      about: "/web-design-agency",
      service: "/services?category=web-design",
      related_services: [
        "/services?category=web-design",
        "/services?category=ui-ux-design",
        "/web-design-company",
      ],
    },
    "web-design-company": {
      about: "/web-design-company",
      service: "/services?category=web-design",
      related_services: [
        "/services?category=web-design",
        "/web-design-agency",
        "/web-development-company",
      ],
    },
    "web-development-company": {
      about: "/web-development-company",
      service: "/services?category=web-development",
      related_services: [
        "/services?category=web-development",
        "/web-design-agency",
        "/software-company",
      ],
    },
    "digital-marketing-services": {
      about: "/digital-marketing-services",
      service: "/services?category=digital-marketing",
      related_services: [
        "/services?category=seo-services",
        "/services?category=content-marketing",
        "/services?category=performance-marketing",
      ],
    },
  };

  const responseData = result.data as any;

  return NextResponse.json({
    generated_at: new Date().toISOString(),
    ...responseData,
    root_pages: rootPagesRelationships,
  });
}

