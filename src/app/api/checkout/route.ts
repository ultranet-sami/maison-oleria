import { NextResponse } from "next/server";
import { getStripe, isStripeConfigured } from "@/lib/stripe";
import { saveLead } from "@/lib/leads";
import { rateLimitByIp } from "@/lib/security/rateLimit";
import { verifyCaptcha } from "@/lib/security/captcha";
import { checkoutSchema, safeValidate } from "@/lib/validation";
import { getClientIp, logSecurity } from "@/lib/logger";

/**
 * Creates a Stripe Checkout Session for a reservation (card + Klarna).
 * -------------------------------------------------------------
 * Expects JSON body:
 *  {
 *    formuleId, formuleName, amount (in EUR, e.g. 150.00),
 *    paymentMode: "full" | "deposit" | "installments",
 *    email, name, occasion?, morpho?, saison?, styleGoal?
 *  }
 *
 * Creates a pending lead in the local store first (paymentStatus:
 * "pending"), then a Stripe Checkout Session with metadata.leadId
 * so the webhook can mark it "paid" once payment succeeds.
 *
 * Klarna is only offered for supported amounts/currencies. Stripe
 * automatically filters unsupported payment methods per Klarna's
 * own rules (currency, amount, customer country), so we simply
 * request both "card" and "klarna" and let Stripe decide what to
 * show at checkout.
 * -------------------------------------------------------------
 */
export async function POST(req: Request) {
  try {
    const ip = getClientIp(req);

    const limit = await rateLimitByIp(ip, "checkout", { limit: 10, windowMs: 10 * 60 * 1000 });
    if (!limit.allowed) {
      await logSecurity("checkout", "Rate limit exceeded", { ip }, req);
      return NextResponse.json({ error: "Trop de tentatives. Veuillez reessayer plus tard." }, { status: 429 });
    }

    if (!isStripeConfigured()) {
      return NextResponse.json(
        { error: "Le paiement en ligne n'est pas encore configure. Voir PAYMENTS_SETUP.md" },
        { status: 503 }
      );
    }

    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Requete invalide." }, { status: 400 });
    }

    const validation = safeValidate(checkoutSchema, body);
    if (validation.success === false) {
      const errorMessage: string = validation.error;
      return NextResponse.json({ error: errorMessage }, { status: 400 });
    }
    const { formuleId, formuleName, amount, paymentMode, email, name, occasion, morpho, saison, styleGoal, captchaToken } =
      validation.data;

    const captcha = await verifyCaptcha(captchaToken, ip);
    if (!captcha.success) {
      await logSecurity("checkout", "Captcha verification failed", { ip, reason: captcha.reason }, req);
      return NextResponse.json({ error: "Verification anti-spam echouee. Veuillez reessayer." }, { status: 403 });
    }

    const amountCents = Math.round(Number(amount) * 100);
    if (!Number.isFinite(amountCents) || amountCents <= 0) {
      return NextResponse.json({ error: "Montant invalide." }, { status: 400 });
    }

    const lead = await saveLead({
      type: "reservation",
      name,
      email,
      service: formuleName,
      formule: formuleId,
      price: amount,
      paymentMode,
      paymentStatus: "pending",
      occasion,
      morpho,
      saison,
      styleGoal,
    });

    const stripe = getStripe()!;
    const origin = req.headers.get("origin") || process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card", "klarna"],
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: formuleName,
              description: `Maison Oleria — ${paymentMode === "deposit" ? "Acompte" : paymentMode === "installments" ? "1ere mensualite" : "Paiement complet"}`,
            },
            unit_amount: amountCents,
          },
          quantity: 1,
        },
      ],
      metadata: {
        leadId: lead.id,
        formuleId,
        paymentMode: paymentMode || "full",
      },
      success_url: `${origin}/reserver?payment=success&leadId=${lead.id}`,
      cancel_url: `${origin}/reserver?payment=cancelled&leadId=${lead.id}`,
    });

    return NextResponse.json({ url: session.url, leadId: lead.id });
  } catch (error) {
    console.error("Checkout API error:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de la creation du paiement." },
      { status: 500 }
    );
  }
}

// File contains AI-generated response based on internal company sources
