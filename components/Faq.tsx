"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqData = [
  {
    question: "What makes Moydus different from a typical web agency?",
    answer:
      "Moydus is built for enterprise delivery—design, development, performance, and security handled as one workflow. We ship production-ready websites with bot protection, rate limiting, email reputation checks, and performance-first engineering (Core Web Vitals, Lighthouse, and real-world loading).",
  },
  {
    question: "Do you work with startups and non-technical teams?",
    answer:
      "Yes. We can run the full process end-to-end, or plug into your team’s workflow. You get clear milestones, fast feedback loops, and a structure that works even if you don’t have in-house engineering.",
  },
  {
    question: "How do you handle security for enterprise websites?",
    answer:
      "We implement layered protection: bot filtering, abusive-request throttling, safer forms (spam prevention), email reputation rules (e.g., suspicious disposable domains), and secure deployment practices. Access can be scoped by role, environment, and release stage.",
  },
  {
    question:
      "Can you optimize an existing site (PageSpeed / Core Web Vitals)?",
    answer:
      "Absolutely. We improve real-world performance with caching strategy, image/code optimization, critical rendering fixes, and monitoring. The goal isn’t just a score—it’s faster UX, lower bounce, and better conversion.",
  },
  {
    question: "Do you support controlled launches and rollouts?",
    answer:
      "Yes—feature flags, segmented rollouts, geo rules, and staged releases. This keeps enterprise launches safer and reduces the risk of breaking production during updates.",
  },
];

export default function Faq() {
  return (
    <section id="faq" className="relative w-full bg-[#000000] px-4">
      <div className="mx-auto flex w-full max-w-[1100px] flex-col items-center justify-center gap-10 sm:py-8 md:py-12 py-12 md:py-24">
        {/* Heading */}
        <motion.div
          className="w-full"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ type: "spring", stiffness: 120, damping: 18 }}
        >
          <h2 className="text-center text-white font-semibold text-[32px] md:text-[40px] lg:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-center text-white/70 text-sm md:text-base lg:text-lg">
            Quick answers about delivery, security, performance, and rollouts.
          </p>
        </motion.div>

        {/* FAQ List */}
        <div className="relative z-10 w-full">
          <Accordion
            type="single"
            collapsible
            className="mx-auto w-full max-w-[867px] flex flex-col gap-3"
            defaultValue="item-0"
          >
            {faqData.map((item, index) => (
              <AccordionItem
                key={`faq-${index}`}
                value={`item-${index}`}
                className="border-none overflow-hidden rounded-[15px]"
                style={{
                  border: "1px solid #1c0e0e",
                  backgroundColor: "#000000",
                }}
              >
                <AccordionTrigger className="p-5 hover:no-underline hover:opacity-90 transition-opacity [&>svg]:hidden [&[data-state=open]_.plus-icon-v]:opacity-0 [&[data-state=closed]_.plus-icon-v]:opacity-100 [&[data-state=open]_.question-text]:text-[#ff4d00]">
                  <h3 className="question-text text-white font-semibold text-lg md:text-xl flex-1 text-left transition-colors duration-300">
                    {item.question}
                  </h3>

                  {/* Custom Plus Icon */}
                  <div
                    className="relative ml-4 flex shrink-0 items-center justify-center"
                    style={{
                      width: "20px",
                      height: "22px",
                      padding: "2px 0 0",
                      pointerEvents: "none",
                    }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div
                        className="absolute w-full h-[2px] rounded-[1px]"
                        style={{ backgroundColor: "rgb(255, 77, 0)" }}
                      />
                      <div
                        className="plus-icon-v absolute w-[2px] h-full rounded-[1px] transition-opacity duration-300 ease-out"
                        style={{ backgroundColor: "rgb(255, 77, 0)" }}
                      />
                    </div>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="px-5 pb-5">
                  <p className="text-white/80 text-left text-[15px] md:text-base lg:text-lg leading-relaxed">
                    {item.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>

      {/* background layer placeholder (optional) */}
      <div className="pointer-events-none absolute inset-0 z-0" />
    </section>
  );
}
