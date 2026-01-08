import { client, urlFor } from "@/lib/sanity";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { portableTextComponents } from "@/lib/portableTextComponents";
import type { Metadata } from "next";
import {
  Eye,
  FileText,
  ShoppingCart,
  Heart,
  Bell,
  Droplet,
  Palette,
  Image as ImageIcon,
  Sun,
  Zap,
  Home,
  File,
  HelpCircle,
  ArrowLeft,
  ArrowRight,
  Mail,
  Megaphone,
  ClockFading,
  UserCheck,
  TrendingUp,
  Cpu,
  Cloud,
  Rocket,
  Briefcase,
  Building,
  Folder,
  BookOpen,
  Users,
  Sparkles,
  Star,
  Award,
  MessageCircle,
  Wrench,
  Settings,
  Shirt,
  Utensils,
  Coffee,
  GraduationCap,
  Book,
  DollarSign,
  Plane,
  MapPin,
  Film,
  Music,
  Target,
  Code,
} from "lucide-react";
import { ReportFeedBack } from "@/components/ReportFeedBack";

import {
  buildTemplateJsonLd,
  buildTemplateBreadcrumbJsonLd,
} from "@/seo/jsonld";
import TemplateDialog from "@/components/TemplateDialog";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await Promise.resolve(params);
  const { category: categorySlug, slug: templateSlug } = resolvedParams;

  const template = await getTemplate(categorySlug, templateSlug);

  if (!template) {
    return {
      title: "Template Not Found | Moydus",
      description: "The requested template could not be found.",
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.moydus.com";
  const primaryCategory =
    template.primaryCategory?.slug === categorySlug
      ? template.primaryCategory
      : template.categories?.find(
          (cat: { slug: string }) => cat.slug === categorySlug
        ) || template.primaryCategory || template.categories?.[0];

  const title =
    template.seo?.metaTitle ||
    `${template.title} - ${primaryCategory?.title || "Template"} | Moydus`;
  const description =
    template.seo?.metaDescription ||
    template.description ||
    `Professional ${template.title} template for your website. ${primaryCategory?.title || "Template"} design ready to use.`;
  const canonical = `${baseUrl}/marketplace/templates/${categorySlug}/${templateSlug}`;
  const imageUrl =
    template.thumbnails?.[0]?.asset?.url ||
    `${baseUrl}/logo.png`;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      type: "website",
      url: canonical,
      title,
      description,
      siteName: "Moydus",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: template.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
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
  };
}

async function getTemplate(categorySlug: string, templateSlug: string) {
  const template = await client.fetch(
    `*[_type == "template" && slug.current == $templateSlug && published == true && ($categorySlug in categories[]->slug.current || primaryCategory->slug.current == $categorySlug)][0]{
      title,
      "slug": slug.current,
      price,
      designer,
      description,
      about,
      pages,
      views,
      updatedAt,
      thumbnails,
      tags,
      features,
      perfectFor,
      demoUrl,
      templateType,
      difficulty,
      seo,
      jsonLdAdvanced,
      primaryCategory->{title, "slug": slug.current},
      categories[]->{title, "slug": slug.current}
    }`,
    { categorySlug, templateSlug }
  );
  return template;
}

async function getMoreFromCreator(
  designer: string,
  excludeSlug: string,
  categorySlug: string
) {
  return client.fetch(
    `*[_type == "template" && published == true && designer == $designer && slug.current != $excludeSlug && ($categorySlug in categories[]->slug.current || primaryCategory->slug.current == $categorySlug)] | order(_createdAt desc)[0...8]{
      title,
      "slug": slug.current,
      price,
      designer,
      thumbnails,
      primaryCategory->{title, "slug": slug.current},
      categories[]->{title, "slug": slug.current}
    }`,
    { designer, excludeSlug, categorySlug }
  );
}

async function getRelatedTemplates(categorySlug: string, excludeSlug: string) {
  return client.fetch(
    `*[_type == "template" && published == true && ($categorySlug in categories[]->slug.current || primaryCategory->slug.current == $categorySlug) && slug.current != $excludeSlug] | order(_createdAt desc)[0...8]{
      title,
      "slug": slug.current,
      price,
      designer,
      thumbnails,
      primaryCategory->{title, "slug": slug.current},
      categories[]->{title, "slug": slug.current}
    }`,
    { categorySlug, excludeSlug }
  );
}

async function getAllCategories() {
  return client.fetch(
    `*[_type == "category"] | order(title asc){
      title,
      "slug": slug.current
    }`
  );
}

function formatDate(dateString: string | undefined) {
  if (!dateString) return "Recently";
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const diffMonths = Math.floor(diffDays / 30);

  if (diffMonths === 0) return "Recently";
  if (diffMonths === 1) return "1 month ago";
  if (diffMonths < 12) return `${diffMonths} months ago`;
  const diffYears = Math.floor(diffMonths / 12);
  return diffYears === 1 ? "1 year ago" : `${diffYears} years ago`;
}

function formatViews(views: number | undefined) {
  if (!views) return "0";
  if (views >= 1000) {
    const kValue = (views / 1000).toFixed(1);
    return kValue.endsWith(".0") ? `${parseInt(kValue)}K` : `${kValue}K`;
  }
  return views.toString();
}

const categoryIcons: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  // Business
  business: Briefcase,
  technology: Cpu,
  saas: Cloud,
  "landing-page": Target,
  services: Settings,
  "professional-services": Bell,
  professional: Zap,
  
  // Ecommerce & Shopping
  ecommerce: ShoppingCart,
  clothing: Shirt,
  fashion: Sparkles,
  
  // Health & Lifestyle
  health: Heart,
  food: Utensils,
  restaurant: Coffee,
  travel: Plane,
  entertainment: Film,
  music: Music,
  
  // Creative & Design
  creative: Palette,
  portfolio: Folder,
  modern: Droplet,
  colorful: Palette,
  illustrative: ImageIcon,
  light: Sun,
  style: Star,
  
  // Community & Social
  community: Users,
  social: MessageCircle,
  blog: BookOpen,
  education: GraduationCap,
  
  // Professional
  agency: Building,
  finance: DollarSign,
  "real-estate": Building,
  
  // Tech
  ai: Cpu,
  app: Code,
  web3: Rocket,
  startup: Rocket,
  
  // Default fallback
  default: FileText,
};

export default async function TemplateDetailPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const resolvedParams = await Promise.resolve(params);
  const { category: categorySlug, slug: templateSlug } = resolvedParams;

  const template = await getTemplate(categorySlug, templateSlug);

  if (!template) {
    notFound();
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.moydus.com";

  const templateJsonLd = buildTemplateJsonLd(template, baseUrl);
  const breadcrumbJsonLd = buildTemplateBreadcrumbJsonLd(template, baseUrl);

  // İlk category'yi breadcrumb ve related templates için kullan
  const primaryCategory =
    template.primaryCategory?.slug === categorySlug
      ? template.primaryCategory
      : template.categories?.find(
          (cat: { slug: string }) => cat.slug === categorySlug
        ) || template.primaryCategory || template.categories?.[0];

  const [moreFromCreator, relatedTemplates, allCategories] = await Promise.all([
    template.designer
      ? getMoreFromCreator(template.designer, template.slug, categorySlug)
      : [],
    getRelatedTemplates(categorySlug, template.slug),
    getAllCategories(),
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(templateJsonLd) }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="min-h-screen bg-[#000000] text-white px-4">
        <div className="mx-auto max-w-[1400px] py-20">
          {/* Breadcrumbs */}
          <div className="mb-8 flex items-center gap-2 text-sm text-white/60">
            <Link
              href="/marketplace/templates"
              className="hover:text-white transition-colors"
            >
              Templates
            </Link>
            {primaryCategory && (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="8"
                  height="8"
                  fill="none"
                  className="text-white/40"
                >
                  <path
                    d="M 2.5 7 L 5.5 4 L 2.5 1"
                    fill="transparent"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    strokeLinecap="round"
                  />
                </svg>
                <Link
                  href={`/marketplace/templates/category/${primaryCategory.slug}`}
                  className="hover:text-white transition-colors"
                >
                  {primaryCategory.title}
                </Link>
              </>
            )}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="8"
              height="8"
              fill="none"
              className="text-white/40"
            >
              <path
                d="M 2.5 7 L 5.5 4 L 2.5 1"
                fill="transparent"
                strokeWidth="1.5"
                stroke="currentColor"
                strokeLinecap="round"
              />
            </svg>
            <span className="text-white">{template.title}</span>
          </div>
          {/* Hero Section */}
          <div className="mb-12 flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
            <div className="flex flex-col gap-4 max-w-[700px]">
              <h1 className="text-3xl font-semibold md:text-5xl text-balance">
                {template.title}
              </h1>
              {template.description && (
                <p className="text-lg text-white/70 text-balance leading-relaxed">
                  {template.description}
                </p>
              )}
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="https://app.moydus.com/"
                  target="_blank"
                  className="bg-white text-black px-6 py-3 rounded-2xl font-semibold hover:bg-white/90 transition-colors whitespace-nowrap"
                >
                  {template.price === "Free" ? "Use for Free" : `Get Template`}
                </Link>
                <Link
                  href="https://app.moydus.com/"
                  target="_blank"
                  className="px-6 py-3 rounded-2xl border border-white/10 hover:border-white/20 transition-colors whitespace-nowrap"
                >
                  Preview
                </Link>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="mb-12 flex flex-wrap gap-x-6 gap-y-6 md:gap-x-8 md:gap-y-4 text-center justify-center w-full pt-8 border-t border-[#1a1c1d]">
            {template.designer && (
              <Link
                href={`/marketplace/templates?designer=${encodeURIComponent(template.designer)}`}
                className="group px-4 md:px-0"
              >
                <div className="flex flex-col items-center gap-2">
                  <div className="relative ">
                    <UserCheck
                      className="w-6 h-6 text-white"
                      strokeWidth={2.5}
                    />
                  </div>
                  <div className="text-center">
                    <div className="text-md font-medium truncate group-hover:text-white transition-colors">
                      {template.designer}
                    </div>
                    <div className="text-xs text-white/60">Creator</div>
                  </div>
                </div>
              </Link>
            )}
            {template.updatedAt && (
              <div className="flex flex-col items-center gap-2 px-4 md:px-0">
                <ClockFading
                  className="w-6 h-6 text-white "
                  strokeWidth={2.5}
                />
                <div className="text-center">
                  <div className="text-md font-medium group-hover:text-white transition-colors">
                    <span className="hidden md:inline truncate">
                      {formatDate(template.updatedAt)}
                    </span>
                    <span className="md:hidden truncate">
                      {formatDate(template.updatedAt)
                        .replace(" months", "mo")
                        .replace(" years", "y")}
                    </span>
                  </div>
                  <div className="text-xs text-white/60">Updated</div>
                </div>
              </div>
            )}
            {template.pages && (
              <div className="hidden md:flex flex-col items-center gap-2 px-4 md:px-0">
                <FileText className="w-6 h-6 text-white" strokeWidth={2.5} />
                <div className="text-center">
                  <div className="text-md font-medium truncate group-hover:text-white transition-colors">
                    {template.pages}
                  </div>
                  <div className="text-xs text-white/60">Pages</div>
                </div>
              </div>
            )}
            {template.views !== undefined && (
              <div className="flex flex-col items-center gap-2 px-4 md:px-0">
                <Eye className="w-6 h-6 text-white" />
                <div className="text-center">
                  <div className="text-md font-medium truncate group-hover:text-white transition-colors">
                    {formatViews(template.views)} K
                  </div>

                  <div className="text-xs text-white/60"> Views</div>
                </div>
              </div>
            )}
          </div>
          {/* Gallery */}
          {template.thumbnails && template.thumbnails.length > 0 && (
            <div className="mb-16 grid grid-cols-1 mx-auto gap-[10px] md:grid-cols-2 md:grid-rows-2 w-full max-w-[1400px] -mx-5  md:mx-auto md:px-0">
              {template.thumbnails
                .slice(0, 4)
                .map(
                  (thumbnail: { asset?: { url?: string } }, index: number) => (
                    <div
                      key={index}
                      className="relative aspect-[4/3] bg-[#0a0a0a] overflow-hidden rounded-2xl outline outline-1 outline-white/10 outline-offset-[-1px]"
                    >
                      <Image
                        src={urlFor(thumbnail).width(1600).height(1200).url()}
                        alt={`${template.title} screenshot ${index + 1}`}
                        fill
                        className="object-cover"
                        priority={index < 2}
                      />
                    </div>
                  )
                )}
            </div>
          )}
          {/* Content Section */}
          <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
            {/* Main Content */}
            <div className="flex-1 space-y-12">
              {/* Description */}
              {template.about && (
                <div className="prose prose-invert max-w-none">
                  <div className="text-white/80 leading-relaxed">
                    <PortableText
                      value={template.about}
                      components={portableTextComponents}
                    />
                  </div>
                </div>
              )}
              {/* Perfect For */}
              {template.perfectFor && (
                <div>
                  <h2 className="text-2xl font-semibold mb-6">Perfect For</h2>
                  <div className="text-white/80 leading-relaxed">
                    <PortableText
                      value={template.perfectFor}
                      components={portableTextComponents}
                    />
                  </div>
                </div>
              )}
              {/* Features */}
              {template.features && (
                <div>
                  <h2 className="text-2xl font-semibold mb-6">Features</h2>
                  <div className="text-white/80 leading-relaxed">
                    <PortableText
                      value={template.features}
                      components={portableTextComponents}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:w-64 space-y-8">
              {/* Categories */}
              <section>
                <h6 className="text-sm font-semibold mb-4 text-white/90">
                  Categories
                </h6>
                <div className="space-y-2">
                  {allCategories
                    .slice(0, 8)
                    .map((cat: { slug: string; title: string }) => {
                      const Icon = categoryIcons[cat.slug] || categoryIcons.default || FileText;
                      return (
                        <Link
                          key={cat.slug}
                          href={`/marketplace/templates/category/${cat.slug}`}
                          className="flex items-center gap-3 text-sm text-white/70 hover:text-white transition-colors py-1"
                        >
                          <Icon className="w-4 h-4" />
                          <span>{cat.title}</span>
                        </Link>
                      );
                    })}
                </div>
              </section>

              {/* Pages */}
              {template.pages && (
                <section>
                  <h6 className="text-sm font-semibold mb-4 text-white/90">
                    Quick Links
                  </h6>
                  <div className="space-y-2">
                    {/* This could be dynamic if we add pages array to schema */}
                    <div className="flex items-center gap-3 text-sm text-white/70 py-1">
                      <Home className="w-4 h-4" />
                      <Link href="/">Home</Link>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-white/70 py-1">
                      <UserCheck className="w-4 h-4" />
                      <Link href="/about">About Us</Link>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-white/70 py-1">
                      <Mail className="w-4 h-4" />
                      <Link href="/contact">Contact</Link>
                    </div>
                  </div>
                </section>
              )}

              {/* Support */}
              <section>
                <h6 className="text-sm font-semibold mb-4 text-white/90">
                  Support
                </h6>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-sm text-white/70 hover:text-white transition-colors py-1">
                    <HelpCircle className="w-4 h-4" />
                    <TemplateDialog template={template} variant="link" />
                  </div>
                  <Link
                    href="/refund-policy"
                    className="flex items-center gap-3 text-sm text-white/70 hover:text-white transition-colors py-1"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Refund Policy</span>
                  </Link>
                  {template.designer && (
                    <Link
                      href={`mailto:info@moydus.com`}
                      className="flex items-center gap-3 text-sm text-white/70 hover:text-white transition-colors py-1"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Contact Creator</span>
                    </Link>
                  )}
                  <button className="flex items-center gap-3 text-sm text-white/70 hover:text-white transition-colors py-1 w-full text-left">
                    <Megaphone className="w-4 h-4" />
                    <Link href="/support">
                      <span>Report Template</span>
                    </Link>
                  </button>
                  <div className="mt-4">
                    <ReportFeedBack templateSlug={template.slug} />
                  </div>
                </div>
              </section>
            </div>
          </div>
          {/* Divider */}
          <hr className="my-10 border-white/10" />

          {/* More from Creator */}
          {moreFromCreator.length > 0 && (
            <div className="mb-16">
              <div className="flex items-center justify-between mb-8 px-2">
                <h2 className="text-2xl font-semibold">
                  More from {template.designer}
                </h2>
                <Link
                  href={`/marketplace/templates?designer=${encodeURIComponent(template.designer || "")}`}
                  className="text-sm text-white hover:text-white transition-colors"
                >
                  See All →
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {moreFromCreator.map(
                  (item: {
                    slug: string;
                    title: string;
                    price?: string;
                    designer?: string;
                    thumbnails?: Array<{ asset?: { url?: string } }>;
                    categories: Array<{ slug: string; title: string }>;
                  }) => {
                    const itemCategory =
                      item.categories?.[0]?.slug || categorySlug;
                    return (
                      <Link
                        key={item.slug}
                        href={`/marketplace/templates/${itemCategory}/${item.slug}`}
                        className="group relative overflow-hidden rounded-[4px] transition-all duration-300"
                      >
                        {/* Thumbnail */}
                        {item.thumbnails && item.thumbnails[0] && (
                          <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#0a0a0a] rounded-[10px]">
                            {/* Main Image */}
                            <Image
                              src={urlFor(item.thumbnails[0])
                                .width(800)
                                .height(600)
                                .url()}
                              alt={item.title}
                              fill
                              className="object-cover transition-opacity duration-300 group-hover:opacity-0 rounded-[4px]"
                            />
                            {/* Hover Image (second thumbnail) */}
                            {item.thumbnails[1] && (
                              <Image
                                src={urlFor(item.thumbnails[1])
                                  .width(800)
                                  .height(600)
                                  .url()}
                                alt={`${item.title} - Hover`}
                                fill
                                className="object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-[4px]"
                              />
                            )}
                            {/* Arrow Icon */}
                            <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm p-2 rounded-full z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <TrendingUp className="w-4 h-4 text-white" />
                            </div>
                          </div>
                        )}

                        {/* Content */}
                        <div className="p-4">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="text-base font-semibold line-clamp-1 group-hover:text-white/90">
                              {item.title}
                            </h3>
                          </div>
                          {item.designer && (
                            <p className="text-xs text-white/50 mb-2">
                              by {item.designer}
                            </p>
                          )}
                        </div>
                      </Link>
                    );
                  }
                )}
              </div>
            </div>
          )}
          {/* Related Templates */}
          {relatedTemplates.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-semibold">Related Templates</h2>
                {primaryCategory && (
                  <Link
                    href={`/marketplace/templates/category/${primaryCategory.slug}`}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    More from {primaryCategory.title} →
                  </Link>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {relatedTemplates.map(
                  (item: {
                    slug: string;
                    title: string;
                    price?: string;
                    designer?: string;
                    thumbnails?: Array<{ asset?: { url?: string } }>;
                    categories: Array<{ slug: string; title: string }>;
                  }) => (
                    <Link
                      key={item.slug}
                      href={`/marketplace/templates/${categorySlug}/${item.slug}`}
                      className="group relative overflow-hidden rounded-[4px] transition-all duration-300"
                    >
                      {/* Thumbnail */}
                      {item.thumbnails && item.thumbnails[0] && (
                        <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#0a0a0a] rounded-[4px]">
                          {/* Main Image */}
                          <Image
                            src={urlFor(item.thumbnails[0])
                              .width(800)
                              .height(600)
                              .url()}
                            alt={item.title}
                            fill
                            className="object-cover opacity-0 rounded-[3px] transition-opacity duration-300 group-hover:opacity-100"
                          />
                          {/* Hover Image (second thumbnail) */}
                          {item.thumbnails[1] && (
                            <Image
                              src={urlFor(item.thumbnails[1])
                                .width(800)
                                .height(600)
                                .url()}
                              alt={`${item.title} - Hover`}
                              fill
                              className="object-cover opacity-0 rounded-[4px] transition-opacity duration-300 group-hover:opacity-100"
                            />
                          )}
                          {/* Arrow Icon */}
                          <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm p-2 rounded-full z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <TrendingUp className="w-4 h-4 text-white" />
                          </div>
                        </div>
                      )}

                      {/* Content */}
                      <div className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-base font-semibold line-clamp-1 group-hover:text-white/90">
                            {item.title}
                          </h3>
                        </div>
                        {item.designer && (
                          <p className="text-xs text-white/50 mb-2">
                            by {item.designer}
                          </p>
                        )}
                      </div>
                    </Link>
                  )
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
