import Image from "next/image";
import { PortableTextComponents } from "@portabletext/react";
import { urlForOptimized, urlForBlurPlaceholder } from "@/lib/sanity";

export const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value) return null;

      const imageUrl = urlForOptimized(value, {
        width: 1200, // Higher resolution for better quality
        quality: 85,
        format: 'auto',
      }).url();

      const blurDataUrl = urlForBlurPlaceholder(value);

      return (
        <Image
          className="rounded-lg w-full h-auto my-4"
          src={imageUrl}
          alt={value?.alt || ""}
          width={1200}
          height={900}
          loading="lazy"
          placeholder={blurDataUrl ? "blur" : undefined}
          blurDataURL={blurDataUrl}
          quality={85}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
        />
      );
    },
  },
  block: {
    h1: ({ children }) => (
      <h1 className="text-3xl font-bold mb-4 mt-6">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-semibold mb-3 mt-5">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-semibold mb-2 mt-4">{children}</h3>
    ),
    normal: ({ children }) => (
      <p className="mb-3 leading-relaxed">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-white/20 pl-4 italic my-4 text-white/70">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="bg-white/10 px-1.5 py-0.5 rounded text-sm font-mono">
        {children}
      </code>
    ),
    link: ({ children, value }) => {
      const href = value?.href || "";
      return (
        <a
          href={href}
          className="text-white underline hover:text-white/80"
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      );
    },
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside space-y-2 mb-4">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside space-y-2 mb-4">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="ml-4">{children}</li>,
    number: ({ children }) => <li className="ml-4">{children}</li>,
  },
};
