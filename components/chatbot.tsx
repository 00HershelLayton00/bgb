"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, MessageCircle, Send, Sparkles, X } from "lucide-react";
import {
  business,
  getFaqReply,
  getFaqText,
  getQuickPrompts,
  isFaqQuestion,
  whatsappLink
} from "@/lib/faq";

type Role = "user" | "assistant";

type Message = {
  id: string;
  role: Role;
  text: string;
  kind?: "faq" | "ai" | "system";
  image?: string | null;
};

type ApiResult =
  | { mode: "faq" | "ai"; reply: string; remaining: number }
  | { mode: "limit"; reply: string; remaining: number; resetAt: number }
  | { mode: "error"; reply: string; remaining: number };

const STORAGE_KEY = "bgb-tech-chat-history-v2";

function createId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function loadHistory(): Message[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveHistory(messages: Message[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-20)));
}

function isClientFaq(text: string) {
  return isFaqQuestion(text) || getFaqReply(text) !== null;
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      kind: "system",
      image: null,
      text: `Hola, soy ${business.chatbotName}, el asistente de ${business.name}. Puedo resolver dudas de servicios, precios, tiempos o dejarte el contacto directo por WhatsApp y correo.`
    }
  ]);
  const [typing, setTyping] = useState(false);
  const [aiRemaining, setAiRemaining] = useState(business.aiLimitPerHour);
  const [resetAt, setResetAt] = useState<number | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const saved = loadHistory();
    if (saved.length > 0) setMessages(saved);

    const handleOpen = () => setOpen(true);
    window.addEventListener("bgb-open-chatbot", handleOpen);
    return () => window.removeEventListener("bgb-open-chatbot", handleOpen);
  }, []);

  useEffect(() => {
    saveHistory(messages);
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const quickPrompts = useMemo(() => getQuickPrompts(), []);

  async function sendMessage(rawText?: string) {
    const text = (rawText ?? input).trim();
    if (!text || typing) return;

    const userMessage: Message = {
      id: createId(),
      role: "user",
      text
    };

    setMessages((current) => [...current, userMessage]);
    setInput("");
    setTyping(true);

    if (isClientFaq(text)) {
      const localReply = getFaqReply(text) ?? { text: getFaqText(text) };
      const assistantMessage: Message = {
        id: createId(),
        role: "assistant",
        kind: "faq",
        text: localReply.text,
        image: localReply.image ?? null
      };
      setMessages((current) => [...current, assistantMessage]);
      setTyping(false);
      return;
    }

    try {
      const history = [...messages, userMessage]
        .filter((m) => m.role === "user" || m.role === "assistant")
        .slice(-12)
        .map((m) => ({ role: m.role, content: m.text }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: text,
          history
        })
      });

      const data = (await response.json()) as ApiResult;

      if ("remaining" in data && typeof data.remaining === "number") {
        setAiRemaining(data.remaining);
      }

      if ("resetAt" in data && typeof data.resetAt === "number") {
        setResetAt(data.resetAt);
      } else if (response.ok) {
        setResetAt(null);
      }

      const assistantMessage: Message = {
        id: createId(),
        role: "assistant",
        kind: data.mode === "ai" ? "ai" : data.mode === "faq" ? "faq" : "system",
        text: data.reply,
        image: null
      };

      setMessages((current) => [...current, assistantMessage]);
    } catch {
      setMessages((current) => [
        ...current,
        {
          id: createId(),
          role: "assistant",
          kind: "system",
          text: "No pude conectar con la IA en este momento. Intenta otra vez."
        }
      ]);
    } finally {
      setTyping(false);
    }
  }

  const formatReset = () => {
    if (!resetAt) return null;
    const diff = Math.max(0, resetAt - Date.now());
    const mins = Math.ceil(diff / 60000);
    return mins <= 1 ? "1 min" : `${mins} min`;
  };

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOpen((value) => !value)}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.98 }}
        className="fixed right-4 bottom-28 z-40 flex h-16 w-16 items-center justify-center rounded-full bg-[#0066FF] text-white shadow-[0_0_30px_rgba(0,102,255,0.3)] sm:right-6 sm:bottom-28"
        aria-label="Abrir chatbot"
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-black/20">
          <Bot className="h-7 w-7" />
        </span>
      </motion.button>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.24 }}
            className="fixed right-4 bottom-56 z-50 w-[min(92vw,25rem)] overflow-hidden rounded-[1.9rem] border border-white/10 bg-[#07090e]/94 shadow-[0_30px_80px_rgba(0,0,0,0.55)] backdrop-blur-xl sm:right-6 sm:bottom-56"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0066FF] text-sm font-black text-white shadow-[0_0_25px_rgba(0,102,255,0.4)]">
                  BGB
                </div>
                <div>
                  <p className="font-semibold text-white">{business.chatbotName} · Asistente IA</p>
                  <p className="text-xs text-white/70">
                    {aiRemaining > 0 ? `${aiRemaining}/${business.aiLimitPerHour} consultas IA disponibles` : `Límite alcanzado${
                      formatReset() ? ` · vuelve en ${formatReset()}` : ""
                    }`}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full border border-white/10 bg-white/10 p-2 text-white/80 transition hover:bg-white/15 hover:text-white"
                aria-label="Cerrar chatbot"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="max-h-[28rem] space-y-4 overflow-y-auto px-4 py-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[86%] whitespace-pre-line rounded-2xl px-4 py-3 text-sm leading-6 ${
                      message.role === "user"
                        ? "bg-[#0066FF] text-white"
                        : message.kind === "faq"
                          ? "bg-white/10 text-white/90"
                          : "bg-white/8 text-white/90"
                    }`}
                  >
                    {message.image ? (
                      <img
                        src={message.image}
                        alt=""
                        className="mb-2 max-h-40 w-full rounded-xl object-cover"
                      />
                    ) : null}
                    {message.text}
                  </div>
                </div>
              ))}

              {typing ? (
                <div className="flex justify-start">
                  <div className="flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-3">
                    <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-[#6fa4ff] [animation-delay:-0.2s]" />
                    <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-[#6fa4ff] [animation-delay:-0.1s]" />
                    <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-[#6fa4ff]" />
                  </div>
                </div>
              ) : null}

              <div ref={bottomRef} />
            </div>

            <div className="border-t border-white/10 p-4">
              <div className="mb-3 flex flex-wrap gap-2">
                {quickPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => sendMessage(prompt)}
                    className="rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-xs text-white/80 transition hover:bg-white/15 hover:text-white"
                  >
                    {prompt}
                  </button>
                ))}
              </div>

              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  sendMessage();
                }}
                className="flex items-center gap-2"
              >
                <div className="flex flex-1 items-center gap-2 rounded-full border border-white/10 bg-black/35 px-3 py-2">
                  <Sparkles className="h-4 w-4 shrink-0 text-[#86b5ff]" />
                  <input
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    placeholder={aiRemaining > 0 ? "Escribe tu pregunta..." : "Usa las preguntas rapidas"}
                    className="w-full bg-transparent text-sm outline-none placeholder:text-white/35"
                  />
                </div>

                <button
                  type="submit"
                  disabled={!input.trim() || typing}
                  className="rounded-full bg-[#0066FF] p-3 text-white transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-45"
                  aria-label="Enviar mensaje"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>

              <a
                href={whatsappLink(business.whatsapp.intro)}
                target="_blank"
                rel="noreferrer"
                className="mt-3 flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs text-white/80 transition hover:bg-white/15 hover:text-white"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                Contactar por WhatsApp · {business.whatsapp.display}
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
