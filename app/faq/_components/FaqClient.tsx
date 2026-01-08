"use client";

interface FaqClientProps {
  faqPage: {
    title?: string;
    meta_title?: string;
    meta_description?: string;
    canonical_url?: string;
    content_html?: string;
    faqs?: Array<{ question: string; answer: string }>;
    internal_links?: Array<{ text: string; url: string }>;
    schema_json?: any;
    content_data?: any;
    [key: string]: any;
  };
}

export default function FaqClient({ faqPage }: FaqClientProps) {
  const featuredImage = faqPage.featured_image as string | undefined;
  const title = faqPage.title || faqPage.meta_title || "FAQ";

  return (
    <main className="min-h-screen bg-[#000000] text-white px-6 py-10">
      <div className="max-w-5xl mx-auto py-16 space-y-10">
        {/* Featured Image */}
        {featuredImage && (
          <div className="w-full aspect-video rounded-2xl overflow-hidden bg-gray-800 mb-8">
            <img
              src={featuredImage}
              alt={title as string}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <h1 className="text-3xl md:text-4xl font-semibold text-balance">
          {title}
        </h1>

        {faqPage.meta_description && (
          <p className="text-white/70 text-lg leading-relaxed">
            {faqPage.meta_description}
          </p>
        )}

        {faqPage.content_html && (
          <article
            className="prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: faqPage.content_html }}
          />
        )}

        {faqPage.faqs && faqPage.faqs.length > 0 && (
          <section className="space-y-4 border-t border-white/10 pt-10">
            <h2 className="text-2xl font-semibold">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqPage.faqs.map((faq, idx) => (
                <details
                  key={idx}
                  className="rounded-xl border border-white/10 bg-white/5 p-4"
                >
                  <summary className="cursor-pointer font-medium">
                    {faq.question}
                  </summary>
                  <p className="mt-2 text-sm text-white/80">{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>
        )}

        {faqPage.internal_links && faqPage.internal_links.length > 0 && (
          <section className="space-y-3 border-t border-white/10 pt-10">
            <h2 className="text-xl font-semibold">Related resources</h2>
            <ul className="space-y-2 text-sm">
              {faqPage.internal_links.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.url}
                    className="text-white/70 hover:text-white underline underline-offset-4"
                  >
                    {link.text || link.url}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}

        {faqPage.schema_json && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(faqPage.schema_json),
            }}
          />
        )}
      </div>
    </main>
  );
}
