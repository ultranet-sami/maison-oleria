import { readLeads } from "@/lib/leads";

// This page reads from the database via Prisma on every request. It
// must not be statically prerendered at build time (the build
// environment may not have a live DATABASE_URL connection), so we
// force dynamic rendering here.
export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {

  const leads = await readLeads();

  const stats = {
    total: leads.length,
    contact: leads.filter((l) => l.type === "contact").length,
    newsletter: leads.filter((l) => l.type === "newsletter").length,
    reservation: leads.filter((l) => l.type === "reservation").length,
    paid: leads.filter((l) => l.paymentStatus === "paid").length,
  };

  return (
    <div>
      <h1 className="font-playfair text-3xl mb-8">Leads</h1>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">
        {[
          ["Total", stats.total],
          ["Contact", stats.contact],
          ["Newsletter", stats.newsletter],
          ["Reservations", stats.reservation],
          ["Payes", stats.paid],
        ].map(([label, value]) => (
          <div key={label as string} className="bg-[#1F1F1F] border border-gold/20 p-5 text-center">
            <div className="font-playfair text-2xl text-gold">{value as number}</div>
            <div className="font-montserrat text-[9px] tracking-widest uppercase text-white/50 mt-1">{label}</div>
          </div>
        ))}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-gold/20 text-left">
              <th className="py-2 pr-4 font-montserrat text-[9px] tracking-widest uppercase text-white/40">Date</th>
              <th className="py-2 pr-4 font-montserrat text-[9px] tracking-widest uppercase text-white/40">Type</th>
              <th className="py-2 pr-4 font-montserrat text-[9px] tracking-widest uppercase text-white/40">Nom</th>
              <th className="py-2 pr-4 font-montserrat text-[9px] tracking-widest uppercase text-white/40">Email</th>
              <th className="py-2 pr-4 font-montserrat text-[9px] tracking-widest uppercase text-white/40">Service</th>
              <th className="py-2 pr-4 font-montserrat text-[9px] tracking-widest uppercase text-white/40">Paiement</th>
            </tr>
          </thead>
          <tbody>
            {leads.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-white/40 font-montserrat text-xs">
                  Aucun lead pour le moment.
                </td>
              </tr>
            ) : (
              leads.map((l) => (
                <tr key={l.id} className="border-b border-white/5">
                  <td className="py-2 pr-4 text-white/60 text-xs">{new Date(l.createdAt).toLocaleString("fr-FR")}</td>
                  <td className="py-2 pr-4 text-white/80 text-xs uppercase">{l.type}</td>
                  <td className="py-2 pr-4 text-white/80 text-xs">{l.name || "—"}</td>
                  <td className="py-2 pr-4 text-white/80 text-xs">{l.email}</td>
                  <td className="py-2 pr-4 text-white/80 text-xs">{l.service || "—"}</td>
                  <td className="py-2 pr-4 text-xs">
                    {l.paymentStatus ? (
                      <span
                        className={
                          l.paymentStatus === "paid"
                            ? "text-green-400"
                            : l.paymentStatus === "failed"
                              ? "text-red-400"
                              : "text-yellow-400"
                        }
                      >
                        {l.paymentStatus}
                      </span>
                    ) : (
                      "—"
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// File contains AI-generated response based on internal company sources
