"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useLang } from "@/context/LanguageContext";

export default function Navbar() {
  const { t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [serviceOpen, setServiceOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const serviceLinks = [
    { label: "Tous les Services", href: "/services" },
    { label: "Analyse Colorimetrique", href: "/color-analysis" },
    { label: "Stylisme Personnel", href: "/personal-styling" },
    { label: "Image Professionnelle", href: "/professional-image" },
    { label: "Stylisme Mariage", href: "/wedding-styling" },
    { label: "Occasions & Evenements", href: "/evenements" },
  ];

  const navLinks = [
    { label: t("nav_home"), href: "/" },
    { label: t("nav_about"), href: "/about" },
    { label: "Evenements", href: "/evenements" },
    { label: t("nav_testimonials"), href: "/testimonials" },
    { label: t("nav_blog"), href: "/blog" },
    { label: t("nav_contact"), href: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-[#FCFAF7]/95 backdrop-blur shadow-sm py-3" : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex flex-col items-center leading-none">
          <span className="font-playfair text-xl tracking-widest text-black">MAISON</span>
          <span className="font-montserrat text-[10px] tracking-[0.4em] text-gold uppercase">OLERIA</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.slice(0, 2).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-montserrat text-[11px] tracking-[0.2em] uppercase text-black hover:text-gold transition-colors duration-300"
            >
              {link.label}
            </Link>
          ))}

          {/* Services dropdown */}
          <div
            className="relative group"
            onMouseEnter={() => setServiceOpen(true)}
            onMouseLeave={() => setServiceOpen(false)}
          >
            <span className="font-montserrat text-[11px] tracking-[0.2em] uppercase text-black hover:text-gold transition-colors duration-300 cursor-pointer">
              {t("nav_services")}
            </span>
            {serviceOpen && (
              <div className="absolute top-full left-0 mt-4 bg-[#FCFAF7] shadow-lg border-t border-gold min-w-[240px] py-2 z-50">
                {serviceLinks.map((s) => (
                  <Link
                    key={s.href}
                    href={s.href}
                    className="block px-6 py-3 font-montserrat text-[10px] tracking-[0.15em] uppercase text-black hover:text-gold hover:bg-ivory transition-colors duration-200"
                  >
                    {s.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {navLinks.slice(2).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-montserrat text-[11px] tracking-[0.2em] uppercase text-black hover:text-gold transition-colors duration-300"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right: CTA (language handled by Google Translate widget) */}
        <div className="hidden lg:flex items-center gap-4">
          <Link href="/reserver" className="btn-gold">
            {t("nav_consultation")}
          </Link>
        </div>

        {/* Mobile toggle */}
        <div className="lg:hidden flex items-center gap-3">
          <button
            className="text-black"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#FCFAF7] border-t border-gold/30 px-6 py-8">
          {navLinks.slice(0, 2).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block py-3 font-montserrat text-[11px] tracking-[0.2em] uppercase text-black hover:text-gold border-b border-ivory"
            >
              {link.label}
            </Link>
          ))}
          {/* Services mobile */}
          <div className="py-3 border-b border-ivory">
            <div className="font-montserrat text-[11px] tracking-[0.2em] uppercase text-black mb-2">{t("nav_services")}</div>
            {serviceLinks.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                onClick={() => setMobileOpen(false)}
                className="block pl-4 py-2 font-montserrat text-[10px] tracking-[0.15em] uppercase text-taupe hover:text-gold"
              >
                {s.label}
              </Link>
            ))}
          </div>
          {navLinks.slice(2).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block py-3 font-montserrat text-[11px] tracking-[0.2em] uppercase text-black hover:text-gold border-b border-ivory"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/reserver"
            className="btn-gold mt-6 block text-center"
            onClick={() => setMobileOpen(false)}
          >
            {t("nav_consultation")}
          </Link>
        </div>
      )}
    </header>
  );
}

// File contains AI-generated response based on internal company sources
