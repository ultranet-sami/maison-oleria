import Link from "next/link";
import type { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-white">
      <header className="border-b border-gold/20 px-6 py-4 flex items-center justify-between">
        <Link href="/admin" className="flex items-center gap-3">
          <div className="font-playfair text-lg tracking-widest">MAISON</div>
          <div className="font-montserrat text-[9px] tracking-[0.3em] text-gold uppercase">OLERIA — Admin</div>
        </Link>
        <nav className="flex items-center gap-6">
          <Link href="/admin" className="font-montserrat text-[10px] tracking-widest uppercase text-white/60 hover:text-gold transition-colors">
            Leads
          </Link>
          <Link href="/admin/assistant" className="font-montserrat text-[10px] tracking-widest uppercase text-white/60 hover:text-gold transition-colors">
            Assistant IA
          </Link>
          <Link href="/admin/monitoring" className="font-montserrat text-[10px] tracking-widest uppercase text-white/60 hover:text-gold transition-colors">
            Monitoring
          </Link>
          <LogoutButton />

        </nav>
      </header>
      <main className="px-6 py-10 max-w-6xl mx-auto">{children}</main>
    </div>
  );
}

function LogoutButton() {
  return (
    <form action="/api/admin/logout" method="post" onSubmit={undefined}>
      <button
        type="submit"
        className="font-montserrat text-[10px] tracking-widest uppercase text-white/60 hover:text-red-400 transition-colors"
      >
        Deconnexion
      </button>
    </form>
  );
}

// File contains AI-generated response based on internal company sources
