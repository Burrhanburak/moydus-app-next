"use server";

import { z } from "zod";
import { Resend } from "resend";

const contactSchema = z.object({
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

type FormState = {
  success: boolean;
  errors?: {
    name?: string[];
    email?: string[];
    company?: string[];
    country?: string[];
    message?: string[];
  };
  message?: string;
} | null;

export async function submitContactForm(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const rawFormData = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    company: formData.get("company") as string,
    country: formData.get("country") as string,
    message: formData.get("message") as string,
  };

  const result = contactSchema.safeParse(rawFormData);

  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
    };
  }

  // Resend ile email gönder
  const resend = process.env.RESEND_API_KEY
    ? new Resend(process.env.RESEND_API_KEY)
    : null;

  if (!resend) {
    return {
      success: false,
      errors: {
        message: ["Resend API key is not set"],
      },
    };
  }

  try {
    await resend.emails.send({
      from: "info@moydus.com",
      to: "info@moydus.com",
      subject: "Contact Form Submission - Moydus",
      html: `<p>Name: ${result.data.name}</p>
      <p>Email: ${result.data.email}</p>
      <p>Company: ${result.data.company || "N/A"}</p>
      <p>Country: ${result.data.country || "N/A"}</p>
      <p>Message: ${result.data.message}</p>`,
    });

    return {
      success: true,
      message: "Form submitted successfully!",
    };
  } catch {
    return {
      success: false,
      errors: {
        message: ["Failed to send email. Please try again."],
      },
    };
  }
}
