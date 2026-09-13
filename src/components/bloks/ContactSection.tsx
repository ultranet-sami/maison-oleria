"use client";
import { useState, FormEvent } from "react";
import { storyblokEditable } from "@storyblok/react";
import Wrapper from "./Wrapper";
import { BaseBlokProps } from "./types";
import { trackContact, trackLead } from "@/lib/tracking";

interface ContactFields {
  title?: string;
  subtitle?: string;
  success_message?: string;
}

export default function ContactSection({ blok }: BaseBlokProps<ContactFields>) {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setSent(true);
        trackLead({ contentName: "contact_form" });
        trackContact({ contentName: "contact_form" });
        form.reset();
      } else {
        setError("Une erreur est survenue. Veuillez reessayer.");
      }
    } catch {
      setError("Une erreur est survenue. Veuillez reessayer.");
    }
  }

  return (
    <Wrapper blok={blok} defaultBg="bg-ivory">
      <div {...storyblokEditable(blok)} className="max-w-xl mx-auto text-center">
        {blok.subtitle && <p className="section-subtitle mb-4">{blok.subtitle}</p>}
        {blok.title && <h2 className="section-title mb-8">{blok.title}</h2>}
        {sent ? (
          <p className="font-montserrat text-sm text-gold">
            {blok.success_message || "Merci ! Votre message a bien ete envoye."}
          </p>
        ) : (
          <form className="space-y-4 text-left" onSubmit={handleSubmit}>
            <input name="name" placeholder="Nom" required className="w-full border border-taupe/40 px-4 py-3 font-montserrat text-sm bg-transparent" />
            <input name="email" type="email" placeholder="Email" required className="w-full border border-taupe/40 px-4 py-3 font-montserrat text-sm bg-transparent" />
            <textarea name="message" placeholder="Message" rows={4} className="w-full border border-taupe/40 px-4 py-3 font-montserrat text-sm bg-transparent" />
            {error && <p className="text-red-600 text-xs">{error}</p>}
            <button type="submit" className="btn-primary w-full text-center">Envoyer</button>
          </form>
        )}
      </div>
    </Wrapper>
  );
}

// File contains AI-generated response based on internal company sources
