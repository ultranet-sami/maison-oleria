import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conditions Generales de Vente | Maison Oleria",
  description: "Conditions Generales de Vente (CGV) applicables aux prestations et consultations Maison Oleria.",
};

export default function CGVPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24 text-taupe">
      <h1 className="font-cormorant text-4xl text-ebony mb-8">Conditions Generales de Vente</h1>

      <section className="space-y-6 font-montserrat text-sm leading-relaxed">
        <div>
          <h2 className="font-cormorant text-2xl text-ebony mb-2">1. Objet</h2>
          <p>
            Les presentes Conditions Generales de Vente regissent les prestations de conseil en image
            et stylisme proposees par Maison Oleria, reservables via le site et payables en ligne
            (paiement securise par Stripe).
          </p>
        </div>

        <div>
          <h2 className="font-cormorant text-2xl text-ebony mb-2">2. Reservation et paiement</h2>
          <p>
            Toute reservation implique le paiement integral ou partiel de la prestation choisie au
            moment de la reservation, selon la formule selectionnee. Les paiements sont traites par
            Stripe ; aucune donnee bancaire n&apos;est stockee par Maison Oleria.
          </p>
        </div>

        <div>
          <h2 className="font-cormorant text-2xl text-ebony mb-2">3. Annulation et remboursement</h2>
          <p>
            Toute demande d&apos;annulation ou de modification doit etre adressee par email dans les
            delais indiques lors de la reservation. Les modalites de remboursement dependent du
            delai de prevenance et de la formule choisie.
          </p>
        </div>

        <div>
          <h2 className="font-cormorant text-2xl text-ebony mb-2">4. Responsabilite</h2>
          <p>
            Maison Oleria s&apos;engage a fournir ses prestations avec professionnalisme. Sa
            responsabilite ne saurait etre engagee en cas de force majeure ou de circonstances hors
            de son controle.
          </p>
        </div>

        <div>
          <h2 className="font-cormorant text-2xl text-ebony mb-2">5. Droit applicable</h2>
          <p>
            Les presentes CGV sont soumises au droit francais. Tout litige sera de la competence
            exclusive des tribunaux francais.
          </p>
        </div>
      </section>
    </main>
  );
}

// File contains AI-generated response based on internal company sources
