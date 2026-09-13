import { z } from "zod";

/**
 * Centralized Zod validation schemas for all public API routes
 * (Phase 2 — Security: input validation / injection hardening).
 * -------------------------------------------------------------
 * Keeping schemas here (rather than duplicated inline per route)
 * ensures consistent, reusable, testable validation across the
 * application and makes it easy to audit exactly what shape of
 * data each endpoint accepts.
 * -------------------------------------------------------------
 */

const emailSchema = z.string().trim().min(3).max(254).email();
const captchaTokenSchema = z.string().max(4000).optional().nullable();

export const contactSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: emailSchema,
  service: z.string().trim().max(200).optional(),
  message: z.string().trim().max(5000).optional(),
  captchaToken: captchaTokenSchema,
});
export type ContactInput = z.infer<typeof contactSchema>;

export const newsletterSchema = z.object({
  email: emailSchema,
  captchaToken: captchaTokenSchema,
});
export type NewsletterInput = z.infer<typeof newsletterSchema>;

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1).max(200),
  captchaToken: captchaTokenSchema,
});
export type LoginInput = z.infer<typeof loginSchema>;

export const checkoutSchema = z.object({
  formuleId: z.string().trim().min(1).max(100),
  formuleName: z.string().trim().min(1).max(200),
  amount: z.number().positive().max(1_000_000),
  paymentMode: z.enum(["full", "deposit", "installments"]).optional(),
  email: emailSchema,
  name: z.string().trim().min(1).max(120),
  occasion: z.string().trim().max(200).optional(),
  morpho: z.string().trim().max(200).optional(),
  saison: z.string().trim().max(200).optional(),
  styleGoal: z.string().trim().max(200).optional(),
  captchaToken: captchaTokenSchema,
});
export type CheckoutInput = z.infer<typeof checkoutSchema>;

/**
 * Small helper to run a Zod schema against an unknown body and
 * return either the parsed data or a formatted error message,
 * without throwing — keeps API route code concise and consistent.
 */
export function safeValidate<T>(schema: z.ZodSchema<T>, data: unknown):
  | { success: true; data: T }
  | { success: false; error: string } {
  const result = schema.safeParse(data);
  if (result.success) return { success: true, data: result.data };
  const message = result.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join("; ");
  return { success: false, error: message };
}

// File contains AI-generated response based on internal company sources
