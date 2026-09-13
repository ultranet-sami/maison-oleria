"use client";
import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useLang } from "@/context/LanguageContext";

type MsgRole = "bot" | "user";
interface Msg { role: MsgRole; text: string; }

type ChatStep =
  | "greeting"
  | "menu"
  | "services"
  | "collect_name"
  | "collect_email"
  | "collect_message"
  | "done";

interface FormData { name: string; email: string; service: string; message: string; }

export default function Chatbot() {
  const { t, dir } = useLang();
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [step, setStep] = useState<ChatStep>("greeting");
  const [input, setInput] = useState("");
  const formRef = useRef<FormData>({ name: "", email: "", service: "", message: "" });
  const [unread, setUnread] = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);

  // Init greeting — run once on mount
  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;
    const greeting = t("chat_greeting");
    setTimeout(() => {
      setMsgs([{ role: "bot", text: greeting }]);
      setStep("menu");
    }, 500);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Re-init when language changes (after first render)
  const prevLangRef = useRef(t);
  useEffect(() => {
    if (prevLangRef.current === t) return;
    prevLangRef.current = t;
    setMsgs([{ role: "bot", text: t("chat_greeting") }]);
    setStep("menu");
  }, [t]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs]);

  useEffect(() => {
    if (!open && msgs.length > 1) setUnread((u) => u + 1);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [msgs]);

  useEffect(() => {
    if (open) setUnread(0);
  }, [open]);

  const addBot = (text: string, delay = 600) => {
    setTimeout(() => {
      setMsgs((prev) => [...prev, { role: "bot", text }]);
    }, delay);
  };

  const addUser = (text: string) => {
    setMsgs((prev) => [...prev, { role: "user", text }]);
  };

  const handleQuickReply = (label: string, value: string) => {
    addUser(label);
    if (value === "services") {
      addBot(t("chat_q1"), 700);
      setStep("services");
    } else if (value === "appointment") {
      addBot(t("chat_name_ask"), 700);
      setStep("collect_name");
    } else if (value === "pricing") {
      addBot(dir === "rtl"
        ? "خدماتنا مخصصة بالكامل. يرجى التواصل معنا للحصول على عرض سعر شخصي مجاني."
        : "Our services are fully tailored. Please contact us for a free personalized quote.", 700);
      setTimeout(() => addBot(t("chat_q3"), 1400), 0);
      setStep("menu");
    } else if (value === "message") {
      addBot(t("chat_name_ask"), 700);
      setStep("collect_name");
    } else if (["color", "styling", "pro", "wedding", "other"].includes(value)) {
      formRef.current.service = label;
      addBot(t("chat_name_ask"), 700);
      setStep("collect_name");
    }
  };

  const handleSend = () => {
    const val = input.trim();
    if (!val) return;
    setInput("");
    addUser(val);

    if (step === "collect_name") {
      formRef.current.name = val;
      addBot(t("chat_email_ask"), 700);
      setStep("collect_email");
    } else if (step === "collect_email") {
      formRef.current.email = val;
      addBot(t("chat_msg_ask"), 700);
      setStep("collect_message");
    } else if (step === "collect_message") {
      formRef.current.message = val;
      addBot(t("chat_thanks"), 800);
      setStep("done");
      // In production: send formRef.current to your API here
      // fetch("/api/contact", { method: "POST", body: JSON.stringify(formRef.current) })
    } else {
      addBot(t("chat_greeting"), 700);
      setStep("menu");
    }
  };

  const menuItems = [
    { label: t("chat_q2"), value: "services" },
    { label: t("chat_q3"), value: "appointment" },
    { label: t("chat_q4"), value: "pricing" },
    { label: t("chat_q5"), value: "message" },
  ];

  const serviceItems = [
    { label: t("chat_a_color"), value: "color" },
    { label: t("chat_a_styling"), value: "styling" },
    { label: t("chat_a_pro"), value: "pro" },
    { label: t("chat_a_wedding"), value: "wedding" },
    { label: t("chat_a_other"), value: "other" },
  ];

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-black flex items-center justify-center shadow-lg hover:bg-gold transition-colors duration-300"
        aria-label="Chat"
      >
        {open ? <X size={22} className="text-[#FCFAF7]" /> : <MessageCircle size={22} className="text-[#FCFAF7]" />}
        {!open && unread > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-gold rounded-full font-montserrat text-[9px] text-white flex items-center justify-center">
            {unread}
          </span>
        )}
      </button>

      {/* Chat Window */}
      {open && (
        <div
          className={`fixed bottom-24 right-6 z-50 w-80 md:w-96 bg-[#FCFAF7] shadow-2xl flex flex-col border border-taupe/20 ${dir === "rtl" ? "text-right" : ""}`}
          dir={dir}
          style={{ maxHeight: "70vh" }}
        >
          {/* Header */}
          <div className="bg-black px-5 py-4 flex items-center justify-between shrink-0">
            <div>
              <div className="font-playfair text-base text-[#FCFAF7]">{t("chat_title")}</div>
              <div className="font-montserrat text-[9px] tracking-[0.2em] uppercase text-gold">{t("chat_subtitle")}</div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <button onClick={() => setOpen(false)}><X size={16} className="text-[#FCFAF7]" /></button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3" style={{ minHeight: 0 }}>
            {msgs.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? (dir === "rtl" ? "justify-start" : "justify-end") : (dir === "rtl" ? "justify-end" : "justify-start")}`}>
                <div className={`max-w-[80%] px-4 py-2.5 font-montserrat text-xs leading-relaxed ${
                  m.role === "bot" ? "bg-ivory text-black border border-taupe/20" : "bg-black text-[#FCFAF7]"
                }`}>
                  {m.text}
                </div>
              </div>
            ))}

            {/* Quick replies */}
            {step === "menu" && (
              <div className="space-y-2 mt-2">
                {menuItems.map((item) => (
                  <button key={item.value} onClick={() => handleQuickReply(item.label, item.value)}
                    className="w-full text-left px-4 py-2.5 border border-taupe/30 hover:border-gold hover:text-gold font-montserrat text-[10px] tracking-[0.1em] uppercase transition-all duration-200 flex items-center justify-between">
                    {item.label}
                    <ChevronRight size={12} className="text-gold shrink-0" />
                  </button>
                ))}
                <Link href="/reserver" onClick={() => setOpen(false)}
                  className="block w-full text-center px-4 py-2.5 bg-gold text-[#FCFAF7] font-montserrat text-[10px] tracking-[0.2em] uppercase hover:bg-[#A8894E] transition-colors duration-200 mt-2">
                  {t("nav_consultation")}
                </Link>
              </div>
            )}

            {step === "services" && (
              <div className="space-y-2 mt-2">
                {serviceItems.map((item) => (
                  <button key={item.value} onClick={() => handleQuickReply(item.label, item.value)}
                    className="w-full text-left px-4 py-2.5 border border-taupe/30 hover:border-gold hover:text-gold font-montserrat text-[10px] tracking-[0.1em] uppercase transition-all duration-200 flex items-center justify-between">
                    {item.label}
                    <ChevronRight size={12} className="text-gold shrink-0" />
                  </button>
                ))}
              </div>
            )}

            {step === "done" && (
              <div className="mt-2">
                <Link href="/contact" onClick={() => setOpen(false)}
                  className="block w-full text-center px-4 py-2.5 bg-gold text-[#FCFAF7] font-montserrat text-[10px] tracking-[0.2em] uppercase hover:bg-[#A8894E] transition-colors duration-200">
                  {t("nav_contact")}
                </Link>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input */}
          {["collect_name", "collect_email", "collect_message"].includes(step) && (
            <div className="border-t border-taupe/20 p-3 flex gap-2 shrink-0">
              <input
                type={step === "collect_email" ? "email" : "text"}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder={t("chat_placeholder")}
                className="flex-1 border border-taupe/30 px-3 py-2 font-montserrat text-xs focus:border-gold focus:outline-none bg-transparent"
                autoFocus
              />
              <button onClick={handleSend}
                className="bg-black text-[#FCFAF7] w-9 h-9 flex items-center justify-center hover:bg-gold transition-colors duration-200">
                <Send size={14} />
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
