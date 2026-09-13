import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions legales | Maison Oleria",
  description: "Mentions legales de Maison Oleria — informations sur l'editeur du site, l'hebergeur et la propriete intellectuelle.",
};

export default function MentionsLegalesPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24 text-taupe">
      <h1 className="font-cormorant text-4xl text-ebony mb-8">Mentions legales</h1>

      <section className="space-y-6 font-montserrat text-sm leading-relaxed">
        <div>
          <h2 className="font-cormorant text-2xl text-ebony mb-2">Editeur du site</h2>
          <p>
            Maison Oleria — Conseil en image et stylisme.
            <br />
            Contact : {process.env.NEXT_PUBLIC_PRIVACY_CONTACT_EMAIL || "contact@maison-oleria.com"}
          </p>
        </div>

        <div>
          <h2 className="font-cormorant text-2xl text-ebony mb-2">Hebergement</h2>
          <p>
            Le site est heberge par Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, Etats-Unis.
          </p>
        </div>

        <div>
          <h2 className="font-cormorant text-2xl text-ebony mb-2">Propriete intellectuelle</h2>
          <p>
            L&apos;ensemble des contenus presents sur ce site (textes, images, logos, mise en page) est
            la propriete exclusive de Maison Oleria, sauf mention contraire, et ne peut etre reproduit
            sans autorisation prealable.
          </p>
        </div>

        <div>
          <h2 className="font-cormorant text-2xl text-ebony mb-2">Donnees personnelles</h2>
          <p>
            Pour toute information sur le traitement de vos donnees personnelles, veuillez consulter
            notre{" "}
            <a href="/confidentialite" className="text-gold hover:underline">
              Politique de confidentialite
            </a>
            .
          </p>
        </div>
      </section>
    </main>
  );
}

// File contains AI-generated response based on internal company sources
