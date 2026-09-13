"use client";
import { Mail, Phone, MapPin, Clock, Instagram, Facebook, Linkedin } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const services = [
  "Conseil en Image Personnalise",
  "Analyse Colorimetrique",
  "Stylisme Personnel",
  "Image Professionnelle",
  "Stylisme Mariage",
  "Shopping Accompagne",
  "Garde-Robe Capsule",
  "Stylisme Voyage",
  "Planning Saisonnier",
  "Autre",
];

const CALENDLY_URL = "https://calendly.com/votre-username/consultation-maison-oleria";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      service: (form.elements.namedItem("service") as HTMLSelectElement).value,
      budget: (form.elements.namedItem("budget") as HTMLSelectElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const openCalendly = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const win = window as any;
    if (typeof window !== "undefined" && win.Calendly) {
      win.Calendly.initPopupWidget({ url: CALENDLY_URL });
    } else {
      window.open(CALENDLY_URL, "_blank");
    }
  };

  return (
    <>
      {/* HERO */}
      <motion.section
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.15 } } }}
        className="pt-40 pb-24 bg-ivory"
      >
        <div className="max-w-7xl mx-auto px-6">
          <motion.p variants={fadeUp} className="section-subtitle mb-4">Nous Contacter</motion.p>
          <motion.h1 variants={fadeUp} className="section-title max-w-2xl mb-6">
            Commençons Votre<br />
            <em className="text-gold">Transformation Ensemble</em>
          </motion.h1>
          <motion.span variants={fadeUp} className="block w-16 h-px bg-gold mb-8" />
          <motion.p variants={fadeUp} className="font-montserrat text-sm text-black/60 max-w-xl leading-relaxed">
            Prete a investir dans votre image ? Prenez rendez-vous pour une consultation
            decouverte et parlons de vos objectifs, vos besoins et la transformation
            que vous souhaitez accomplir.
          </motion.p>
        </div>
      </motion.section>

      {/* BOOKING CTA */}
      <section className="py-16 bg-black">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="section-subtitle mb-4 text-gold">Reservation en Ligne</p>
          <h2 className="font-playfair text-3xl text-[#FCFAF7] mb-4">
            Reservez Votre Consultation Directement
          </h2>
          <p className="font-montserrat text-sm text-[#C8B8A6] mb-8 max-w-xl mx-auto">
            Choisissez le creneau qui vous convient le mieux dans notre agenda en ligne.
          </p>
          <button onClick={openCalendly} className="btn-gold inline-block">
            Voir les Disponibilites
          </button>
        </div>
      </section>

      {/* MAIN FORM */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Contact Info */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          >
            <motion.div variants={fadeUp}>
              <p className="section-subtitle mb-4">Informations</p>
              <h2 className="section-title mb-8">Parlons de Vous</h2>
              <p className="font-montserrat text-sm text-black/70 leading-relaxed mb-10">
                Chaque transformation commence par une conversation.
              </p>
            </motion.div>

            <div className="space-y-6 mb-10">
              {[
                { Icon: MapPin, label: "Adresse", main: "Paris, France", sub: "Consultations sur rendez-vous" },
                { Icon: Phone, label: "Telephone", main: "+33 6 00 00 00 00", link: "tel:+33600000000" },
                { Icon: Mail, label: "Email", main: "info.oleria@maison-oleria.com", link: "mailto:info.oleria@maison-oleria.com" },
                { Icon: Clock, label: "Disponibilites", main: "Lundi - Samedi : 9h - 19h", sub: "Visioconference pour clientele internationale" },
              ].map(({ Icon, label, main, sub, link }) => (
                <motion.div key={label} variants={fadeUp} className="flex items-start gap-4">
                  <div className="w-10 h-10 border border-gold/30 flex items-center justify-center shrink-0">
                    <Icon size={16} className="text-gold" />
                  </div>
                  <div>
                    <div className="font-montserrat text-[10px] tracking-[0.2em] uppercase text-black/40 mb-1">{label}</div>
                    {link ? (
                      <a href={link} className="font-montserrat text-sm text-black/70 hover:text-gold transition-colors">{main}</a>
                    ) : (
                      <div className="font-montserrat text-sm text-black/70">{main}</div>
                    )}
                    {sub && <div className="font-montserrat text-xs text-black/50">{sub}</div>}
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div variants={fadeUp}>
              <div className="font-montserrat text-[10px] tracking-[0.3em] uppercase text-black/40 mb-4">Reseaux Sociaux</div>
              <div className="flex gap-3">
                {[
                  { Icon: Instagram, label: "@maison.oleria", href: "https://instagram.com/maison.oleria" },
                  { Icon: Facebook, label: "Maison Oleria", href: "https://facebook.com/maisonoleria" },
                  { Icon: Linkedin, label: "Maison Oleria", href: "https://linkedin.com/company/maison-oleria" },
                ].map(({ Icon, label, href }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 border border-taupe/30 px-4 py-2 hover:border-gold transition-colors duration-300">
                    <Icon size={14} className="text-gold" />
                    <span className="font-montserrat text-[10px] text-black/60">{label}</span>
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="bg-ivory p-10"
          >
            <h3 className="font-playfair text-2xl mb-2">Demande de Consultation</h3>
            <p className="font-montserrat text-xs text-black/50 mb-8">Reponse garantie sous 24h ouvrables</p>

            {status === "sent" ? (
              <div className="text-center py-12">
                <div className="font-playfair text-3xl text-gold mb-4">Merci !</div>
                <p className="font-montserrat text-sm text-black/70">
                  Votre message a ete envoye. Nous vous recontacterons sous 24 heures.
                </p>
              </div>
            ) : (
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-montserrat text-[10px] tracking-[0.2em] uppercase text-black/40 block mb-2">Prenom *</label>
                    <input name="name" type="text" required className="w-full border border-taupe/40 bg-white px-4 py-3 font-montserrat text-sm focus:border-gold focus:outline-none" />
                  </div>
                  <div>
                    <label className="font-montserrat text-[10px] tracking-[0.2em] uppercase text-black/40 block mb-2">Nom</label>
                    <input name="lastname" type="text" className="w-full border border-taupe/40 bg-white px-4 py-3 font-montserrat text-sm focus:border-gold focus:outline-none" />
                  </div>
                </div>
                <div>
                  <label className="font-montserrat text-[10px] tracking-[0.2em] uppercase text-black/40 block mb-2">Email *</label>
                  <input name="email" type="email" required className="w-full border border-taupe/40 bg-white px-4 py-3 font-montserrat text-sm focus:border-gold focus:outline-none" />
                </div>
                <div>
                  <label className="font-montserrat text-[10px] tracking-[0.2em] uppercase text-black/40 block mb-2">Telephone</label>
                  <input name="phone" type="tel" className="w-full border border-taupe/40 bg-white px-4 py-3 font-montserrat text-sm focus:border-gold focus:outline-none" />
                </div>
                <div>
                  <label className="font-montserrat text-[10px] tracking-[0.2em] uppercase text-black/40 block mb-2">Service Souhaite *</label>
                  <select name="service" required className="w-full border border-taupe/40 bg-white px-4 py-3 font-montserrat text-sm focus:border-gold focus:outline-none">
                    <option value="">Selectionnez un service</option>
                    {services.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="font-montserrat text-[10px] tracking-[0.2em] uppercase text-black/40 block mb-2">Budget Envisage</label>
                  <select name="budget" className="w-full border border-taupe/40 bg-white px-4 py-3 font-montserrat text-sm focus:border-gold focus:outline-none">
                    <option value="">Selectionnez une fourchette</option>
                    {["Moins de 200€", "200€ - 500€", "500€ - 1000€", "1000€ - 2000€", "Plus de 2000€", "Je souhaite discuter"].map((b) => (
                      <option key={b}>{b}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-montserrat text-[10px] tracking-[0.2em] uppercase text-black/40 block mb-2">Votre Message *</label>
                  <textarea
                    name="message"
                    rows={5}
                    required
                    placeholder="Parlez-nous de vous, de vos objectifs..."
                    className="w-full border border-taupe/40 bg-white px-4 py-3 font-montserrat text-sm focus:border-gold focus:outline-none resize-none"
                  />
                </div>
                <button type="submit" disabled={status === "sending"} className="btn-primary w-full disabled:opacity-60">
                  {status === "sending" ? "Envoi en cours..." : "Envoyer Ma Demande"}
                </button>
                {status === "error" && (
                  <p className="font-montserrat text-xs text-red-500 text-center">
                    Une erreur est survenue. Contactez-nous directement : info.oleria@maison-oleria.com
                  </p>
                )}
              </form>
            )}
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-ivory">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="section-subtitle mb-4">Questions Frequentes</p>
            <h2 className="section-title mb-4">Avant de Nous Contacter</h2>
            <span className="gold-divider" />
          </div>
          <div className="space-y-6">
            {[
              { q: "Combien coute une consultation ?", a: "Nos tarifs varient selon le service choisi. Nous proposons une consultation decouverte gratuite de 20 minutes pour evaluer vos besoins avant tout engagement." },
              { q: "Travaillez-vous en ligne ?", a: "Oui, nous proposons des consultations en visioconference pour notre clientele hors Paris et internationale." },
              { q: "Comment vous contacter rapidement ?", a: "Envoyez un email a info.oleria@maison-oleria.com ou remplissez le formulaire ci-dessus. Reponse garantie sous 24h." },
              { q: "Faut-il avoir un budget mode important ?", a: "Absolument pas. Notre expertise s'adapte a tous les budgets." },
            ].map((faq) => (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white p-6 border-l-2 border-gold"
              >
                <h3 className="font-playfair text-base mb-3">{faq.q}</h3>
                <p className="font-montserrat text-sm text-black/60 leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
