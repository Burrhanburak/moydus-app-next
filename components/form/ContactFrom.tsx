"use client";

import { useActionState, useTransition, useEffect, useState } from "react";
import { submitContactForm } from "@/app/actions/contact";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Turnstile } from "next-turnstile";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CostumInput } from "../custom-input";
import { Mail, User, Building2 } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { CountryDropdown } from "../country-dropdown";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  company: z.string().refine((val) => val === "" || val.length >= 2, {
    message: "Company name must be at least 2 characters.",
  }),
  country: z.string().refine((val) => val === "" || val.length >= 2, {
    message: "Country name must be at least 2 characters.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    submitContactForm,
    null
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      company: "",
      country: "",
      message: "",
    },
  });

  const [isTransitioning, startTransition] = useTransition();
  const [turnstileStatus, setTurnstileStatus] = useState<
    "success" | "error" | "expired" | "required"
  >("required");
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileError, setTurnstileError] = useState<string | null>(null);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Turnstile verification check
    if (turnstileStatus !== "success" || !turnstileToken) {
      setTurnstileError("Please verify you are not a robot");
      return;
    }

    setTurnstileError(null);
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("company", values.company);
    formData.append("country", values.country);
    formData.append("message", values.message);
    formData.append("turnstileToken", turnstileToken);

    startTransition(async () => {
      await formAction(formData);
    });
  }

  // State değiştiğinde form'u resetle
  useEffect(() => {
    if (state?.success) {
      form.reset();
    }
  }, [state, form]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5 relative z-10"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-2">
              <FormLabel className="text-left text-sm text-white">
                Name
              </FormLabel>
              <FormControl>
                <CostumInput
                  type="text"
                  className="w-full bg-white/10 border-white/20 focus-within:border-white/20 text-white placeholder:text-[#999999] text-white"
                  icon={<User size={20} className="text-white" />}
                  placeholder="First and last name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-2">
              <FormLabel className="text-left text-sm text-white">
                Email
              </FormLabel>
              <FormControl>
                <CostumInput
                  type="email"
                  className="w-full bg-white/10 border-white/20 focus-within:border-white/20 text-white placeholder:text-[#999999] text-white"
                  icon={<Mail size={20} className="text-white" />}
                  placeholder="Work email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-2">
              <FormLabel className="text-left text-sm text-white">
                Company
              </FormLabel>
              <FormControl>
                <CostumInput
                  type="text"
                  className="w-full bg-white/10 border-white/20 focus-within:border-white/20 text-white placeholder:text-[#999999] text-white"
                  icon={<Building2 size={20} className="text-white" />}
                  placeholder="Company"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-2">
              <FormLabel className="text-left text-sm text-white">
                Country
              </FormLabel>
              <FormControl>
                <CountryDropdown
                  placeholder="Select country"
                  defaultValue={field.value}
                  onChange={(country) => field.onChange(country.name)}
                />
              </FormControl>
              <FormMessage />
              {state?.errors?.country && (
                <p className="text-sm text-red-500">
                  {state.errors.country[0]}
                </p>
              )}
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-2">
              <FormLabel className="text-left text-sm text-white">
                How can we help?
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us about your enterprise needs"
                  className="bg-white/10 border-white/20 focus:border-white/20 focus:outline-none focus-visible:border-white/20 focus-visible:outline-none text-white placeholder:text-[#999999] min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
              {state?.errors?.message && (
                <p className="text-sm text-red-500">
                  {state.errors.message[0]}
                </p>
              )}
            </FormItem>
          )}
        />

        <div className="flex justify-center w-full rounded-xl bg-white/10 border-white/20 focus-within:border-white/20 text-white placeholder:text-[#999999] text-white">
          <Turnstile
            className="w-full rounded-xl bg-white/10 border-white/20 focus-within:border-white/20 text-white placeholder:text-[#999999] text-white"
            siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
            retry="auto"
            refreshExpired="auto"
            sandbox={process.env.NODE_ENV === "development"}
            onError={() => {
              setTurnstileStatus("error");
              setTurnstileError("Security check failed. Please try again.");
            }}
            onExpire={() => {
              setTurnstileStatus("expired");
              setTurnstileError("Security check expired. Please verify again.");
            }}
            onLoad={() => {
              setTurnstileStatus("required");
              setTurnstileError(null);
            }}
            onVerify={(token) => {
              setTurnstileStatus("success");
              setTurnstileToken(token);
              setTurnstileError(null);
            }}
          />
        </div>

        {turnstileError && (
          <p className="text-sm text-red-500">{turnstileError}</p>
        )}

        {state?.success && (
          <p className="text-sm text-green-500">{state.message}</p>
        )}

        <div className="flex justify-end pt-2">
          <Button
            type="submit"
            disabled={isPending || isTransitioning}
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:ring-[3px] bg-[#FF4D00] text-white shadow-xs hover:bg-[#FF4D00]/90 h-10 px-6 text-md rounded-xl"
          >
            {isPending || isTransitioning ? "Submitting..." : "Get in touch"}{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-arrow-right -rotate-45"
              aria-hidden="true"
            >
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </Button>
        </div>
      </form>
    </Form>
  );
}
