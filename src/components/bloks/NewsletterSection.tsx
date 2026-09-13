"use client";
import { useState, FormEvent } from "react";
import { storyblokEditable } from "@storyblok/react";
import Wrapper from "./Wrapper";
import { BaseBlokProps } from "./types";
import { trackNewsletter, trackLead } from "@/lib/tracking";

interface NewsletterFields {
  title?: string;
  description?: string;
  success_message?: string;
}

export default function NewsletterSection({ blok }: BaseBlokProps<NewsletterFields>) {
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setSent(true);
        trackLead({ contentName: "newsletter_section" });
        trackNewsletter({ contentName: "newsletter_section" });
        form.reset();
      }
    } catch {
      // best-effort, ignore
    }
  }

  return (
    <Wrapper blok={blok} defaultBg="bg-black" className="text-center">
      <div {...storyblokEditable(blok)} className="max-w-xl mx-auto">
        {blok.title && <h2 className="font-playfair text-3xl text-white mb-3">{blok.title}</h2>}
        {blok.description && <p className="font-montserrat text-sm text-[#C8B8A6] mb-6">{blok.description}</p>}
        {sent ? (
          <p className="text-gold text-sm">{blok.success_message || "Merci pour votre inscription !"}</p>
        ) : (
          <form className="flex gap-3" onSubmit={handleSubmit}>
            <input name="email" type="email" required placeholder="Votre email" className="flex-1 border border-gold/30 bg-transparent px-4 py-3 text-white text-sm" />
            <button type="submit" className="btn-gold">S&apos;inscrire</button>
          </form>
        )}
      </div>
    </Wrapper>
  );
}

// File contains AI-generated response based on internal company sources
