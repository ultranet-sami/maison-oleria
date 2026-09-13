import { NextResponse } from "next/server";
import { getStripe, isStripeConfigured } from "@/lib/stripe";
import { updateLead, getLeadById, type Lead } from "@/lib/leads";
import type Stripe from "stripe";

/**
 * Sends a booking/payment confirmation email to the client once a
 * Stripe Checkout Session is confirmed as paid. Uses Resend if
 * configured (RESEND_API_KEY); silently no-ops otherwise so local
 * testing without email credentials still works.
 */
async function sendPaymentConfirmationEmail(lead: Lead): Promise<void> {
  if (!process.env.RESEND_API_KEY) return;
  try {
    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: "Maison Oleria <info.oleria@maison-oleria.com>",
      to: [lead.email],
      subject: "Confirmation de votre paiement — Maison Oleria",
      html: `
        <div style="font-family: 'Georgia', serif; max-width: 600px; margin: 0 auto; padding: 40px; background: #FCFAF7;">
          <div style="text-align: center; margin-bottom: 40px;">
            <h1 style="font-family: 'Georgia', serif; color: #1F1F1F; letter-spacing: 0.3em; font-size: 24px;">MAISON OLERIA</h1>
            <div style="width: 40px; height: 1px; background: #C6A46A; margin: 10px auto;"></div>
            <p style="color: #C6A46A; font-size: 11px; letter-spacing: 0.3em; text-transform: uppercase;">Paiement Confirme</p>
          </div>
          <div style="background: white; padding: 30px; border-left: 3px solid #C6A46A;">
            <p style="margin: 10px 0;">Bonjour ${lead.name || ""},</p>
            <p style="margin: 10px 0;">
              Votre paiement pour <strong>${lead.service || "votre consultation"}</strong> a bien ete recu.
              Merci pour votre confiance !
            </p>
            <p style="margin: 10px 0;">Notre equipe vous contactera prochainement pour finaliser votre creneau si necessaire.</p>
          </div>
          <p style="color: #999; font-size: 11px; text-align: center; margin-top: 30px;">
            Maison Oleria — maison-oleria.com
          </p>
        </div>
      `,
    });
  } catch (err) {
    // Do not fail the webhook if the email fails to send; log for visibility.
    console.error("Failed to send payment confirmation email:", err);
  }
}


/**
 * Stripe webhook handler.
 * -------------------------------------------------------------
 * Configure in Stripe Dashboard -> Developers -> Webhooks:
 *   Endpoint URL: https://your-domain.com/api/webhook
 *   Events to send: checkout.session.completed,
 *                    checkout.session.async_payment_succeeded,
 *                    checkout.session.async_payment_failed
 *
 * Add the signing secret in Vercel Environment Variables as
 * STRIPE_WEBHOOK_SECRET (whsec_...). See PAYMENTS_SETUP.md.
 *
 * Klarna and some other payment methods are asynchronous: the
 * Checkout Session can complete before the payment is actually
 * confirmed, so we listen for both the sync completed event and
 * the async success/failure events to keep lead status accurate.
 * -------------------------------------------------------------
 */
export async function POST(req: Request) {
  if (!isStripeConfigured()) {
    return NextResponse.json({ error: "Stripe is not configured." }, { status: 503 });
  }

  const stripe = getStripe()!;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const signature = req.headers.get("stripe-signature");
  const payload = await req.text();

  // In production, signature verification is MANDATORY: an unsigned
  // webhook could be used to spoof "payment succeeded" events and
  // mark fraudulent orders as paid. Only allow the unsigned fallback
  // in non-production environments for local testing convenience.
  if (process.env.NODE_ENV === "production" && (!webhookSecret || !signature)) {
    console.error("Webhook rejected: STRIPE_WEBHOOK_SECRET missing or signature header absent in production.");
    return NextResponse.json({ error: "Webhook not configured securely." }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    if (webhookSecret && signature) {
      event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
    } else {
      // Non-production fallback only: parses the raw payload without
      // signature verification, so local testing still works without
      // a configured webhook secret.
      event = JSON.parse(payload) as Stripe.Event;
    }
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
      case "checkout.session.async_payment_succeeded": {
        const session = event.data.object as Stripe.Checkout.Session;
        const leadId = session.metadata?.leadId;
        if (leadId && session.payment_status === "paid") {
          const lead = await getLeadById(leadId);
          if (lead) {
            await updateLead(leadId, { paymentStatus: "paid" });
            await sendPaymentConfirmationEmail(lead);
          }
        }
        break;
      }

      case "checkout.session.async_payment_failed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const leadId = session.metadata?.leadId;
        if (leadId) await updateLead(leadId, { paymentStatus: "failed" });
        break;
      }
      default:
        break;
    }
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook handler error:", error);
    return NextResponse.json({ error: "Webhook handler error." }, { status: 500 });
  }
}

// File contains AI-generated response based on internal company sources
