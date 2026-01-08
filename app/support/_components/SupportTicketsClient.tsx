"use client";

import { useState, useTransition } from "react";
import { createNewSupportTicket } from "@/app/actions/support-actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import { CostumInput } from "@/components/custom-input";
import { Loader2 } from "lucide-react";

const supportTicketSchema = z.object({
  subject: z.string().min(5, {
    message: "Subject must be at least 5 characters.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  category: z.string().optional(),
  priority: z.enum(["low", "medium", "high", "urgent"]).optional(),
});

type SupportTicketFormValues = z.infer<typeof supportTicketSchema>;

interface SupportTicketsClientProps {
  category?: "product" | "billing" | "emergency";
  priority?: "low" | "medium" | "high" | "urgent";
  buttonText?: string;
  buttonClassName?: string;
}

export default function SupportTicketsClient({
  category = "product",
  priority = "medium",
  buttonText,
  buttonClassName,
}: SupportTicketsClientProps) {
  const [open, setOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [submitStatus, setSubmitStatus] = useState<{
    success: boolean;
    message?: string;
  } | null>(null);

  const form = useForm<SupportTicketFormValues>({
    resolver: zodResolver(supportTicketSchema),
    defaultValues: {
      subject: "",
      message: "",
      email: "",
      category: category,
      priority: priority,
    },
  });

  const getButtonText = () => {
    if (buttonText) return buttonText;
    if (category === "emergency") return "Emergency";
    if (category === "billing") return "Start chat";
    return "Start chat";
  };

  const getButtonClassName = () => {
    if (buttonClassName) return buttonClassName;
    if (category === "product") {
      return "bg-white text-black rounded-full px-6 py-3 text-sm font-medium hover:opacity-90 transition-opacity inline-block";
    }
    return "bg-white/10 text-white rounded-full px-3 py-2 text-sm font-medium hover:opacity-90 transition-opacity";
  };

  async function onSubmit(values: SupportTicketFormValues) {
    startTransition(async () => {
      const result = await createNewSupportTicket({
        subject: values.subject,
        message: values.message,
        email: values.email,
        category: values.category || category,
        priority: values.priority || priority,
      });

      if (result.success) {
        form.reset();
        setOpen(false);
        setAlertOpen(true);
      } else {
        setSubmitStatus({
          success: false,
          message:
            result.error ||
            "Failed to create support ticket. Please try again.",
        });
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          className={getButtonClassName()}
          aria-label={`${category} support`}
        >
          {getButtonText()}
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-[#000000] border-white/10 text-white">
        <DialogHeader>
          <DialogTitle className="text-white">
            {category === "emergency"
              ? "Emergency Support"
              : category === "billing"
                ? "Billing Support"
                : "Template Support"}
          </DialogTitle>
          <DialogDescription className="text-white/70">
            Fill out the form below and we&apos;ll get back to you as soon as
            possible.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Email</FormLabel>
                  <FormControl>
                    <CostumInput
                      placeholder="your@email.com"
                      {...field}
                      className="bg-[#000000] border-white/10 text-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Subject</FormLabel>
                  <FormControl>
                    <CostumInput
                      placeholder="Brief description of your issue"
                      {...field}
                      className="bg-[#000000] border-white/10 text-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Message</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your issue in detail..."
                      className="bg-[#000000] border-white/10 text-white min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {submitStatus && (
              <div
                className={`p-3 rounded-md ${
                  submitStatus.success
                    ? "bg-[#000000] border-white/10 text-white"
                    : "bg-red-500/20 text-red-400"
                }`}
              >
                {submitStatus.message}
              </div>
            )}
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                onClick={() => {
                  setOpen(false);
                  form.reset();
                  setSubmitStatus(null);
                }}
                className="border-white/10 text-white bg-red-500 hover:opacity-90"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isPending}
                className="bg-black text-white hover:opacity-90"
              >
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Ticket"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
      <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
        <AlertDialogContent className="sm:max-w-[425px] bg-[#1a1a1a] border-white/10 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">
              Ticket Created Successfully!
            </AlertDialogTitle>
            <AlertDialogDescription className="text-white/70">
              Your support ticket has been created successfully. We&apos;ll get
              back to you soon.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={() => {
                setAlertOpen(false);
                setSubmitStatus(null);
              }}
              className="bg-white text-black hover:opacity-90"
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Dialog>
  );
}
