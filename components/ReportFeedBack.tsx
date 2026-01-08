"use client";

import { Angry, Check, Frown, Laugh, Loader2, Smile, Mail } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { cn } from "@/lib/utils";
import { submitFeedback } from "@/app/actions/feedback";

const feedback = [
  { happiness: 4, emoji: Laugh, color: "text-green-600" },
  { happiness: 3, emoji: Smile, color: "text-green-400" },
  { happiness: 2, emoji: Frown, color: "text-yellow-400" },
  { happiness: 1, emoji: Angry, color: "text-red-600" },
];

interface ReportFeedBackProps {
  templateSlug?: string;
}

export const ReportFeedBack = ({ templateSlug }: ReportFeedBackProps) => {
  const textRef = useRef<HTMLTextAreaElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const [happiness, setHappiness] = useState<null | number>(null);
  const [isSubmitted, setSubmissionState] = useState(false);
  const [isLoading, setLoadingState] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!happiness) {
      //cleaning up textarea and email
      if (textRef.current) textRef.current!.value = "";
      if (emailRef.current) emailRef.current!.value = "";
      setError(null);
    }
  }, [happiness]);

  const handleSubmit = async () => {
    if (!happiness) return;

    const email = emailRef.current?.value || "";
    const feedbackText = textRef.current?.value || "";

    // Basic validation
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    if (!feedbackText.trim()) {
      setError("Please enter your feedback");
      return;
    }

    setLoadingState(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("happiness", happiness.toString());
      formData.append("feedback", feedbackText);
      if (templateSlug) {
        formData.append("templateSlug", templateSlug);
      }

      const result = await submitFeedback(formData);

      if (result.success) {
        setSubmissionState(true);
        setTimeout(() => {
          setHappiness(null);
          if (textRef.current) textRef.current!.value = "";
          if (emailRef.current) emailRef.current!.value = "";
          setSubmissionState(false);
        }, 2000);
      } else {
        const errorMessage =
          (result.error &&
            "message" in result.error &&
            result.error.message?.[0]) ||
          (result.error &&
            "email" in result.error &&
            result.error.email?.[0]) ||
          (result.error &&
            "feedback" in result.error &&
            result.error.feedback?.[0]) ||
          "Failed to submit feedback";
        setError(errorMessage);
      }
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setLoadingState(false);
    }
  };

  return (
    <motion.div
      layout
      initial={{ borderRadius: "2rem" }}
      animate={
        happiness ? { borderRadius: "0.5rem" } : { borderRadius: "2rem" }
      }
      className={twMerge(
        "w-fit overflow-hidden border py-2 shadow-sm border-white/10 dark:bg-neutral-950"
      )}
    >
      <span className="flex items-center justify-center gap-3 pl-4 pr-2">
        <div className="text-sm text-white dark:text-neutral-400">
          Like this template?
        </div>
        <div className="flex items-center text-neutral-400">
          {feedback.map((e) => {
            const EmojiIcon = e.emoji;
            return (
              <button
                onClick={() =>
                  setHappiness((prev) =>
                    e.happiness === prev ? null : e.happiness
                  )
                }
                className={twMerge(
                  "flex h-9 w-9 items-center justify-center rounded-full transition-all",
                  happiness === e.happiness
                    ? e.color
                    : "text-neutral-500 dark:text-neutral-400"
                )}
                key={e.happiness}
              >
                <EmojiIcon size={18} />
              </button>
            );
          })}
        </div>
      </span>
      <motion.div
        aria-hidden={happiness ? false : true}
        initial={{ height: 0, y: 15 }}
        className="px-2"
        transition={{ ease: "easeInOut", duration: 0.3 }}
        animate={happiness ? { height: "auto", width: "330px" } : {}}
      >
        <AnimatePresence>
          {!isSubmitted ? (
            <motion.span exit={{ opacity: 0 }} initial={{ opacity: 1 }}>
              <div className="space-y-2 pb-4">
                <div className="relative">
                  <Mail className="absolute left-2 top-2.5 h-4 w-4 text-neutral-400" />
                  <input
                    ref={emailRef}
                    type="email"
                    placeholder="Your email address"
                    className="w-full rounded-md border bg-transparent p-2 pl-8 text-sm placeholder-neutral-400 focus:border-neutral-400 focus:outline-0 border-white/10 focus:dark:border-white/10"
                  />
                </div>
                <textarea
                  ref={textRef}
                  placeholder="Tell us why you're reporting this template"
                  className="min-h-32 w-full resize-none rounded-md border bg-transparent p-2 text-sm placeholder-neutral-400 focus:border-neutral-400 focus:outline-0 border-white/10 focus:dark:border-white/10"
                />
                {error && <p className="text-xs text-red-400">{error}</p>}
                <div className="flex h-fit w-full justify-end">
                  <button
                    onClick={handleSubmit}
                    className={cn(
                      "mt-1 flex h-9 items-center justify-center rounded-md border border-white/10 bg-[#1c1c1c] px-2 text-sm text-white dark:bg-white dark:text-neutral-950",
                      {
                        "bg-neutral-500 dark:bg-white dark:text-neutral-500 border-white/10":
                          isLoading,
                      }
                    )}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Loading
                      </>
                    ) : (
                      "Submit"
                    )}
                  </button>
                </div>
              </div>
            </motion.span>
          ) : (
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="flex h-full w-full flex-col items-center justify-start gap-2 pt-9 text-sm font-normal"
            >
              <motion.div
                variants={item}
                className="flex h-8 min-h-8 w-8 min-w-8 items-center justify-center rounded-full bg-blue-500 dark:bg-sky-500"
              >
                <Check strokeWidth={2.5} size={16} className="stroke-white" />
              </motion.div>
              <motion.div variants={item}>
                Your feedback has been received!
              </motion.div>
              <motion.div variants={item}>Thank you for your help.</motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

const container = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
      staggerChildren: 0.04,
    },
  },
};

const item = {
  hidden: { y: 10 },
  show: { y: 0 },
};
