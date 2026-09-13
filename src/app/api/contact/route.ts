import { NextResponse } from "next/server";
import { saveLead } from "@/lib/leads";
import { rateLimitByIp } from "@/lib/security/rateLimit";
import { verifyCaptcha } from "@/lib/security/captcha";
import { contactSchema, safeValidate } from "@/lib/validation";
import { getClientIp, logSecurity } from "@/lib/logger";

export async function POST(req: Request) {
  try {
    const ip = getClientIp(req);

    const limit = await rateLimitByIp(ip, "contact", { limit: 5, windowMs: 10 * 60 * 1000 });
    if (!limit.allowed) {
      await logSecurity("contact", "Rate limit exceeded", { ip }, req);
      return NextResponse.json({ error: "Trop de tentatives. Veuillez reessayer plus tard." }, { status: 429 });
    }

    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Requete invalide (JSON attendu)." }, { status: 400 });
    }

    const validation = safeValidate(contactSchema, body);
    if (!validation.success) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }
    const { name, email, service, message, captchaToken } = validation.data;

    const captcha = await verifyCaptcha(captchaToken, ip);
    if (!captcha.success) {
      await logSecurity("contact", "Captcha verification failed", { ip, reason: captcha.reason }, req);
      return NextResponse.json({ error: "Verification anti-spam echouee. Veuillez reessayer." }, { status: 403 });
    }

    // Persist the lead first so nothing is lost even if email sending fails.
    await saveLead({ type: "contact", name, email, service, message });


    // ----------------------------------------------------------------
    // RESEND EMAIL CONFIGURATION
    // 1. Creer un compte sur resend.com (se connecter avec GitHub)
    // 2. Aller dans "Domains" → ajouter maison-oleria.com → suivre les instructions DNS
    // 3. Aller dans "API Keys" → creer une cle → copier
    // 4. Dans Vercel Settings → Environment Variables → ajouter :
    //    RESEND_API_KEY = re_xxxxxxxxxxxxx
    // 5. Decommenter le bloc ci-dessous
    // ----------------------------------------------------------------

    if (process.env.RESEND_API_KEY) {
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: "Maison Oleria <info.oleria@maison-oleria.com>",
        to: ["info.oleria@maison-oleria.com"],
        subject: `Nouvelle demande de ${name} - ${service || "Consultation"}`,
        html: `
          <div style="font-family: 'Georgia', serif; max-width: 600px; margin: 0 auto; padding: 40px; background: #FCFAF7;">
            <div style="text-align: center; margin-bottom: 40px;">
              <h1 style="font-family: 'Georgia', serif; color: #1F1F1F; letter-spacing: 0.3em; font-size: 24px;">MAISON OLERIA</h1>
              <div style="width: 40px; height: 1px; background: #C6A46A; margin: 10px auto;"></div>
              <p style="color: #C6A46A; font-size: 11px; letter-spacing: 0.3em; text-transform: uppercase;">Nouvelle Demande de Consultation</p>
            </div>
            <div style="background: white; padding: 30px; border-left: 3px solid #C6A46A;">
              <p style="margin: 10px 0;"><strong>Nom :</strong> ${name}</p>
              <p style="margin: 10px 0;"><strong>Email :</strong> <a href="mailto:${email}">${email}</a></p>
              <p style="margin: 10px 0;"><strong>Service :</strong> ${service || "Non specifie"}</p>
              <p style="margin: 10px 0;"><strong>Message :</strong></p>
              <p style="margin: 10px 0; color: #555;">${message || "Aucun message"}</p>
            </div>
            <p style="color: #999; font-size: 11px; text-align: center; margin-top: 30px;">
              Maison Oleria — maison-oleria.com
            </p>
          </div>
        `,
      });
    }

    console.log("New contact form submission:", { name, email, service, message });

    return NextResponse.json({
      success: true,
      message: "Message recu. Nous vous recontacterons sous 24h.",
    });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue. Veuillez reessayer." },
      { status: 500 }
    );
  }
}

// File contains AI-generated response based on internal company sources
