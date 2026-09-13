"use client";
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";


export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {

    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Connexion impossible.");
        setLoading(false);
        return;
      }
      router.push("/admin");
      router.refresh();
    } catch {
      setError("Une erreur reseau est survenue.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <div className="font-playfair text-2xl tracking-widest text-white">MAISON</div>
          <div className="font-montserrat text-[10px] tracking-[0.4em] text-gold uppercase">OLERIA — Admin</div>
        </div>
        <form onSubmit={handleSubmit} className="bg-[#1F1F1F] border border-gold/20 p-8 space-y-5">
          <div>
            <label className="block font-montserrat text-[10px] tracking-[0.2em] uppercase text-white/40 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-transparent border border-gold/30 text-white px-4 py-3 font-montserrat text-sm outline-none focus:border-gold"
            />
          </div>
          <div>
            <label className="block font-montserrat text-[10px] tracking-[0.2em] uppercase text-white/40 mb-2">Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-transparent border border-gold/30 text-white px-4 py-3 font-montserrat text-sm outline-none focus:border-gold"
            />
          </div>
          {error && (
            <div className="font-montserrat text-xs text-red-400">{error}</div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gold text-black font-montserrat text-[11px] tracking-[0.2em] uppercase py-3 hover:bg-[#A8894E] transition-colors disabled:opacity-50"
          >
            {loading ? "Connexion..." : "Se Connecter"}
          </button>
        </form>
      </div>
    </div>
  );
}

// File contains AI-generated response based on internal company sources
