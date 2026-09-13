import Stripe from "stripe";

/**
 * Server-side Stripe client.
 * -------------------------------------------------------------
 * Add STRIPE_SECRET_KEY in Vercel Environment Variables.
 * Use test keys (sk_test_...) until your Stripe account is
 * verified for live payments; switch to sk_live_... when ready.
 * See PAYMENTS_SETUP.md for full instructions.
 * -------------------------------------------------------------
 */
let stripeClient: Stripe | null = null;

export function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  if (!stripeClient) {
    stripeClient = new Stripe(key, {
      apiVersion: "2025-02-24.acacia",
    });
  }
  return stripeClient;
}

export function isStripeConfigured(): boolean {
  return Boolean(process.env.STRIPE_SECRET_KEY);
}

// File contains AI-generated response based on internal company sources
