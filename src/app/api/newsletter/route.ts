import { NextResponse } from "next/server";
import { saveLead } from "@/lib/leads";
import { rateLimitByIp } from "@/lib/security/rateLimit";
import { verifyCaptcha } from "@/lib/security/captcha";
import { newsletterSchema, safeValidate } from "@/lib/validation";
import { getClientIp, logSecurity } from "@/lib/logger";

export async function POST(req: Request) {
  try {
    const ip = getClientIp(req);

    const limit = await rateLimitByIp(ip, "newsletter", { limit: 5, windowMs: 10 * 60 * 1000 });
    if (!limit.allowed) {
      await logSecurity("newsletter", "Rate limit exceeded", { ip }, req);
      return NextResponse.json({ error: "Trop de tentatives. Veuillez reessayer plus tard." }, { status: 429 });
    }

    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Requete invalide (JSON attendu)." }, { status: 400 });
    }

    const validation = safeValidate(newsletterSchema, body);
    if (validation.success === false) {
      const errorMessage: string = validation.error;
      return NextResponse.json({ error: errorMessage }, { status: 400 });
    }
    const { email, captchaToken } = validation.data;

    const captcha = await verifyCaptcha(captchaToken, ip);
    if (!captcha.success) {
      await logSecurity("newsletter", "Captcha verification failed", { ip, reason: captcha.reason }, req);
      return NextResponse.json({ error: "Verification anti-spam echouee. Veuillez reessayer." }, { status: 403 });
    }

    // Persist the lead first so nothing is lost even if downstream
    // integrations (Mailchimp/Resend) fail.
    await saveLead({ type: "newsletter", email });


    // ---------------------------------------------------------------
    // MAILCHIMP INTEGRATION
    // 1. Creer un compte sur mailchimp.com
    // 2. Creer une liste/audience
    // 3. Obtenir votre API Key et Audience ID
    // 4. Dans Vercel Settings → Environment Variables ajouter :
    //    MAILCHIMP_API_KEY = votre_cle
    //    MAILCHIMP_AUDIENCE_ID = votre_audience_id
    //    MAILCHIMP_SERVER = us1 (ou us2, us3... selon votre compte)
    // ---------------------------------------------------------------

    if (process.env.MAILCHIMP_API_KEY && process.env.MAILCHIMP_AUDIENCE_ID) {
      const server = process.env.MAILCHIMP_SERVER || "us1";
      const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;

      await fetch(
        `https://${server}.api.mailchimp.com/3.0/lists/${audienceId}/members`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${Buffer.from(`anystring:${process.env.MAILCHIMP_API_KEY}`).toString("base64")}`,
          },
          body: JSON.stringify({
            email_address: email,
            status: "subscribed",
            tags: ["newsletter", "maison-oleria"],
          }),
        }
      );
    }

    // Also send via Resend to deliver the free guide
    if (process.env.RESEND_API_KEY) {
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: "Maison Oleria <info.oleria@maison-oleria.com>",
        to: [email],
        subject: "Votre Guide Gratuit — Les 10 Regles d'Or de l'Elegance Parisienne",
        html: `
          <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px; background: #FCFAF7;">
            <h1 style="font-family: Georgia; color: #1F1F1F; letter-spacing: 0.3em; text-align: center;">MAISON OLERIA</h1>
            <div style="width: 40px; height: 1px; background: #C6A46A; margin: 10px auto 30px;"></div>
            <h2 style="font-family: Georgia; color: #1F1F1F;">Bienvenue dans la communaute Maison Oleria !</h2>
            <p style="font-family: 'Montserrat', sans-serif; color: #555; line-height: 1.8;">
              Merci pour votre inscription. Votre guide exclusif
              <strong>"Les 10 Regles d'Or de l'Elegance Parisienne"</strong>
              sera disponible tres prochainement.
            </p>
            <p style="font-family: 'Montserrat', sans-serif; color: #555;">
              En attendant, decouvrez nos services sur
              <a href="https://maison-oleria.com" style="color: #C6A46A;">maison-oleria.com</a>
            </p>
            <div style="text-align: center; margin-top: 30px;">
              <a href="https://maison-oleria.com/reserver"
                style="background: #C6A46A; color: white; padding: 12px 30px; text-decoration: none; font-family: Montserrat; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase;">
                Reserver une Consultation
              </a>
            </div>
          </div>
        `,
      });
    }

    console.log("Newsletter signup:", email);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Newsletter error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// File contains AI-generated response based on internal company sources
