"use server";

import { z } from "zod";
import { Resend } from "resend";

const feedbackSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  happiness: z.number().min(1).max(4),
  feedback: z.string().min(1, {
    message: "Feedback cannot be empty.",
  }),
  templateSlug: z.string().optional(),
});

export async function submitFeedback(formData: FormData) {
  const rawFormData = {
    email: formData.get("email") as string,
    happiness: Number(formData.get("happiness")),
    feedback: formData.get("feedback") as string,
    templateSlug: formData.get("templateSlug") as string | undefined,
  };

  const result = feedbackSchema.safeParse(rawFormData);

  if (!result.success) {
    return {
      success: false,
      error: result.error.flatten().fieldErrors,
    };
  }

  const resend = process.env.RESEND_API_KEY
    ? new Resend(process.env.RESEND_API_KEY)
    : null;

  if (!resend) {
    return {
      success: false,
      error: { message: ["Resend API key is not set"] },
    };
  }

  const happinessLabels = {
    4: "Very Happy 😄",
    3: "Happy 😊",
    2: "Neutral 😐",
    1: "Unhappy 😞",
  };

  try {
    await resend.emails.send({
      from: "info@moydus.com",
      to: "info@moydus.com",
      subject: `Template Feedback - ${happinessLabels[result.data.happiness as keyof typeof happinessLabels]}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #ddd; padding-bottom: 10px;">
            Template Feedback Received
          </h2>
          <div style="margin-top: 20px;">
            <p><strong>Email:</strong> ${result.data.email}</p>
            <p><strong>Rating:</strong> ${happinessLabels[result.data.happiness as keyof typeof happinessLabels]}</p>
            ${result.data.templateSlug ? `<p><strong>Template:</strong> ${result.data.templateSlug}</p>` : ""}
            <p><strong>Feedback:</strong></p>
            <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin-top: 10px;">
              ${result.data.feedback.replace(/\n/g, "<br>")}
            </div>
          </div>
        </div>
      `,
    });

    return {
      success: true,
    };
  } catch (error) {
    console.error("Feedback submission error:", error);
    return {
      success: false,
      error: { message: ["Failed to send feedback. Please try again."] },
    };
  }
}
