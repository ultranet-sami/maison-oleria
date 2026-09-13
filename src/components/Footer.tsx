import Link from "next/link";
import { Instagram, Facebook, Linkedin, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-[#FCFAF7]">
      {/* Top band */}
      <div className="border-b border-gold/20 py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="mb-6">
              <div className="font-playfair text-2xl tracking-widest text-white">MAISON</div>
              <div className="font-montserrat text-[10px] tracking-[0.4em] text-gold uppercase">OLERIA</div>
            </div>
            <p className="font-montserrat text-sm text-taupe leading-relaxed mb-6">
              L&apos;art de reveler votre style unique a travers l&apos;elegance francaise et
              l&apos;expertise en conseil en image.
            </p>
            <div className="flex gap-4">
              {[
                { Icon: Instagram, href: "https://instagram.com/maison.oleria" },
                { Icon: Facebook, href: "https://facebook.com/maisonoleria" },
                { Icon: Linkedin, href: "https://linkedin.com/company/maison-oleria" },
              ].map(({ Icon, href }, i) => (
                <a key={i} href={href} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 border border-gold/30 flex items-center justify-center hover:border-gold hover:text-gold transition-all duration-300">
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-montserrat text-[10px] tracking-[0.3em] uppercase text-gold mb-6">Services</h4>
            <ul className="space-y-3">
              {[
                ["Conseil en Image", "/services"],
                ["Analyse Colorimetrique", "/color-analysis"],
                ["Stylisme Personnel", "/personal-styling"],
                ["Image Professionnelle", "/professional-image"],
                ["Stylisme Mariage", "/wedding-styling"],
                ["Occasions & Evenements", "/evenements"],
                ["Quiz de Style", "/quiz-style"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="font-montserrat text-xs text-taupe hover:text-gold transition-colors duration-200">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-montserrat text-[10px] tracking-[0.3em] uppercase text-gold mb-6">Navigation</h4>
            <ul className="space-y-3">
              {[
                ["A Propos", "/about"],
                ["Temoignages", "/testimonials"],
                ["Blog", "/blog"],
                ["Reserver", "/reserver"],
                ["Contact", "/contact"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="font-montserrat text-xs text-taupe hover:text-gold transition-colors duration-200">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-montserrat text-[10px] tracking-[0.3em] uppercase text-gold mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={14} className="text-gold mt-0.5 shrink-0" />
                <span className="font-montserrat text-xs text-taupe">Paris, France</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={14} className="text-gold shrink-0" />
                <a href="tel:+33600000000" className="font-montserrat text-xs text-taupe hover:text-gold transition-colors">
                  +33 6 00 00 00 00
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={14} className="text-gold shrink-0" />
                <a href="mailto:info.oleria@maison-oleria.com" className="font-montserrat text-xs text-taupe hover:text-gold transition-colors">
                  info.oleria@maison-oleria.com
                </a>
              </li>
              <li className="mt-4">
                <Link href="/reserver" className="btn-gold block text-center text-xs">
                  Reserver une Consultation
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Payment logos band */}
      <div className="border-b border-gold/10 py-6">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-montserrat text-[9px] tracking-[0.2em] uppercase text-taupe/60">
              Paiements securises
            </p>
            <div className="flex items-center gap-4 flex-wrap justify-center">
              {/* Visa */}
              <div className="h-8 px-3 border border-gold/15 flex items-center justify-center bg-white/5 hover:border-gold/30 transition-colors">
                <svg height="20" viewBox="0 0 780 500" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M293.2 348.73l33.36-195.76h53.36l-33.4 195.76h-53.32zM540.92 157.13c-10.56-3.96-27.12-8.2-47.79-8.2-52.72 0-89.84 26.56-90.12 64.6-.32 28.1 26.57 43.79 46.85 53.15 20.8 9.6 27.8 15.72 27.72 24.28-.12 13.12-16.6 19.12-31.96 19.12-21.4 0-32.76-2.96-50.32-10.24l-6.88-3.12-7.48 43.84c12.44 5.44 35.44 10.16 59.32 10.4 55.96 0 92.28-26.24 92.72-66.88.2-22.28-14.04-39.24-44.84-53.24-18.68-9.08-30.12-15.12-30-24.32.04-8.16 9.68-16.88 30.6-16.88 17.44-.28 30.08 3.52 39.92 7.48l4.8 2.24 7.26-42.23zM661.72 152.97h-41.24c-12.76 0-22.32 3.48-27.92 16.24l-79.24 179.52h56l11.16-29.24 68.28.04c1.6 6.8 6.48 29.2 6.48 29.2h49.48l-43-195.76zm-65.6 126.68l20.64-53.2c-.28.52 4.28-11.04 6.88-18.2l3.52 16.44s9.92 45.32 12 54.96h-43.04zM230.12 152.97l-52.28 133.48-5.6-27.24c-9.72-31.28-40.04-65.16-73.96-82.12l47.8 171.48 56.44-.08 83.96-195.52h-56.36z" fill="#FCF9F9"/>
                  <path d="M131.96 152.97H48.04l-.68 3.84c65.48 15.8 108.84 54 126.88 99.96l-18.32-88.12c-3.16-12.48-12.32-15.28-24-15.68z" fill="#FCF9F9"/>
                </svg>
              </div>
              {/* Mastercard */}
              <div className="h-8 px-3 border border-gold/15 flex items-center justify-center bg-white/5 hover:border-gold/30 transition-colors">
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-red-500/80" />
                  <div className="w-6 h-6 rounded-full bg-yellow-400/80 -ml-3" />
                </div>
                <span className="font-montserrat text-[8px] text-white/70 ml-2 tracking-wider">MASTERCARD</span>
              </div>
              {/* PayPal */}
              <div className="h-8 px-3 border border-gold/15 flex items-center justify-center bg-white/5 hover:border-gold/30 transition-colors">
                <span className="font-montserrat text-[11px] font-bold tracking-tight">
                  <span className="text-blue-400">Pay</span><span className="text-blue-300">Pal</span>
                </span>
              </div>
              {/* Stripe */}
              <div className="h-8 px-3 border border-gold/15 flex items-center justify-center bg-white/5 hover:border-gold/30 transition-colors">
                <span className="font-montserrat text-[11px] font-bold text-purple-400 tracking-tight">Stripe</span>
              </div>
              {/* Klarna */}
              <div className="h-8 px-3 border border-gold/15 flex items-center justify-center bg-white/5 hover:border-gold/30 transition-colors">
                <span
                  className="font-montserrat text-[11px] font-bold tracking-tight px-1.5 py-0.5 rounded-sm"
                  style={{ backgroundColor: "#FFB3C7", color: "#0B051D" }}
                >
                  Klarna
                </span>
              </div>

              {/* Apple Pay */}
              <div className="h-8 px-3 border border-gold/15 flex items-center justify-center bg-white/5 hover:border-gold/30 transition-colors">
                <span className="font-montserrat text-[11px] font-semibold text-white/80 tracking-tight"> Pay</span>
              </div>
              {/* Google Pay */}
              <div className="h-8 px-3 border border-gold/15 flex items-center justify-center bg-white/5 hover:border-gold/30 transition-colors">
                <span className="font-montserrat text-[11px] font-semibold text-white/80 tracking-tight">G Pay</span>
              </div>
              {/* SSL Badge */}
              <div className="h-8 px-3 border border-gold/15 flex items-center gap-1.5 bg-white/5">
                <svg width="12" height="14" viewBox="0 0 24 28" fill="none">
                  <path d="M12 0L2 4v8c0 6.63 4.29 12.84 10 14.5C17.71 24.84 22 18.63 22 12V4L12 0z" fill="#C6A46A" fillOpacity="0.6"/>
                </svg>
                <span className="font-montserrat text-[8px] text-gold/60 tracking-widest uppercase">SSL</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-montserrat text-[10px] tracking-widest text-taupe">
            &copy; {new Date().getFullYear()} Maison Oleria. Tous droits reserves.
          </p>
          <div className="flex gap-6">
            {[
              ["Mentions legales", "/mentions-legales"],
              ["Politique de confidentialite", "/confidentialite"],
              ["CGV", "/cgv"],
            ].map(([label, href]) => (
              <Link key={href} href={href} className="font-montserrat text-[10px] text-taupe hover:text-gold transition-colors">
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// File contains AI-generated response based on internal company sources
