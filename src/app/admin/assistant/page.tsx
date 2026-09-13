"use client";
import { useState, useEffect, useRef, type FormEvent } from "react";

interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export default function AdminAssistantPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeProvider, setActiveProvider] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    fetch("/api/admin/assistant")
      .then((r) => r.json())
      .then((data) => setActiveProvider(data.activeProvider || null))
      .catch(() => {});
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;
    const userMsg: ChatMessage = { role: "user", content: input.trim() };
    const nextHistory = [...messages, userMsg];
    setMessages(nextHistory);
    setInput("");
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg.content, history: messages }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Erreur de l'assistant.");
        setLoading(false);
        return;
      }
      setMessages([...nextHistory, { role: "assistant", content: data.reply }]);
    } catch {
      setError("Une erreur reseau est survenue.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-playfair text-3xl">Assistant IA</h1>
        {activeProvider && (
          <span className="font-montserrat text-[9px] tracking-widest uppercase text-gold border border-gold/30 px-3 py-1">
            {activeProvider}
          </span>
        )}
      </div>

      <div className="bg-[#1F1F1F] border border-gold/20 h-[60vh] flex flex-col">
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.length === 0 && (
            <p className="font-montserrat text-xs text-white/40">
              Posez une question sur vos leads, demandez un email de relance, ou une analyse de vos reservations.
            </p>
          )}
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] px-4 py-3 font-montserrat text-sm whitespace-pre-wrap ${
                  m.role === "user" ? "bg-gold text-black" : "bg-white/5 text-white/90"
                }`}
              >
                {m.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-white/5 text-white/50 px-4 py-3 font-montserrat text-sm">...</div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
        {error && (
          <div className="px-6 py-2 font-montserrat text-xs text-red-400 border-t border-red-500/20">{error}</div>
        )}
        <form onSubmit={sendMessage} className="border-t border-gold/20 p-4 flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ecrire un message..."
            className="flex-1 bg-transparent border border-gold/30 px-4 py-3 font-montserrat text-sm outline-none focus:border-gold text-white"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-gold text-black font-montserrat text-[10px] tracking-widest uppercase px-6 hover:bg-[#A8894E] transition-colors disabled:opacity-50"
          >
            Envoyer
          </button>
        </form>
      </div>
    </div>
  );
}

// File contains AI-generated response based on internal company sources
