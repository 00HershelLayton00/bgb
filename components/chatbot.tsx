"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, Send, Sparkles, X } from "lucide-react";
import { getBotReply } from "@/lib/chatbot";

type Message = {
  id: number;
  role: "user" | "bot";
  text: string;
};

const STORAGE_KEY = "bgb-tech-chatbot-usage-v1";
const LIMIT_PER_HOUR = 20;

function loadUsage() {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((value) => typeof value === "number") : [];
  } catch {
    return [];
  }
}

function saveUsage(values: number[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(values));
}

function openChatbot() {
  window.dispatchEvent(new Event("bgb-open-chatbot"));
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "bot",
      text: "Hola, soy el asistente de BGB Tech. Preguntame por servicios, precios o contacto."
    }
  ]);
  const [typing, setTyping] = useState(false);
  const [usage, setUsage] = useState<number[]>([]);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const timersRef = useRef<number[]>([]);

  useEffect(() => {
    setUsage(loadUsage());

    const handleOpen = () => setOpen(true);
    window.addEventListener("bgb-open-chatbot", handleOpen);

    return () => window.removeEventListener("bgb-open-chatbot", handleOpen);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing, open]);

  useEffect(() => {
    return () => {
      timersRef.current.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  const recentUsage = useMemo(() => {
    const now = Date.now();
    const hourAgo = now - 60 * 60 * 1000;
    return usage.filter((timestamp) => timestamp >= hourAgo);
  }, [usage]);

  const remaining = Math.max(0, LIMIT_PER_HOUR - recentUsage.length);
  const blocked = remaining === 0;

  function registerQuestion() {
    const now = Date.now();
    const hourAgo = now - 60 * 60 * 1000;
    const freshUsage = [...recentUsage.filter((timestamp) => timestamp >= hourAgo), now];
    setUsage(freshUsage);
    saveUsage(freshUsage);
  }

  function sendMessage(text?: string) {
    const value = (text ?? input).trim();
    if (!value || typing || blocked) return;

    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      text: value
    };

    setMessages((current) => [...current, userMessage]);
    setInput("");
    registerQuestion();
    setTyping(true);

    const timer = window.setTimeout(() => {
      const reply: Message = {
        id: Date.now() + 1,
        role: "bot",
        text: getBotReply(value)
      };
      setMessages((current) => [...current, reply]);
      setTyping(false);
    }, 750);

    timersRef.current.push(timer);
  }

  const quickPrompts = [
    "Que servicios ofrecen?",
    "Hacen apps Android?",
    "Pueden ayudar con WhatsApp e Instagram?",
    "Como contacto a BGB?"
  ];

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOpen((value) => !value)}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        className="fixed right-4 bottom-24 z-40 flex h-16 w-16 items-center justify-center rounded-full bg-[#0066FF] text-white shadow-[0_0_40px_rgba(0,102,255,0.4)] sm:right-6 sm:bottom-28"
        aria-label="Abrir chatbot"
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-black/20">
          <Bot className="h-7 w-7" />
        </span>
      </motion.button>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: 22, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 22, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            className="fixed right-4 bottom-40 z-50 w-[min(92vw,24rem)] overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#07090e]/90 shadow-[0_30px_80px_rgba(0,0,0,0.5)] backdrop-blur-xl sm:right-6 sm:bottom-44"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0066FF] text-sm font-black text-white shadow-[0_0_25px_rgba(0,102,255,0.4)]">
                  BGB
                </div>
                <div>
                  <p className="font-semibold text-white">BGB Assistant</p>
                  <p className="text-xs text-white/100">
                    {blocked ? "Limite alcanzado por ahora" : `${remaining} preguntas disponibles esta hora`}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full border border-white/10 bg-white/10 p-2 text-white/100 transition hover:bg-white/10 hover:text-white"
                aria-label="Cerrar chatbot"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="max-h-[26rem] space-y-4 overflow-y-auto px-4 py-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[84%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                      message.role === "user"
                        ? "bg-[#0066FF] text-white"
                        : "bg-white/10 text-white/90"
                    }`}
                  >
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
                    className="rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-xs text-white/100 transition hover:bg-white/10 hover:text-white"
                    disabled={blocked}
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
                <div className="flex flex-1 items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-2">
                  <Sparkles className="h-4 w-4 shrink-0 text-[#86b5ff]" />
                  <input
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    placeholder={blocked ? "Limite temporal alcanzado" : "Escribe tu pregunta..."}
                    className="w-full bg-transparent text-sm outline-none placeholder:text-white/30 disabled:cursor-not-allowed"
                    disabled={blocked}
                  />
                </div>

                <button
                  type="submit"
                  disabled={!input.trim() || blocked}
                  className="rounded-full bg-[#0066FF] p-3 text-white transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-45"
                  aria-label="Enviar mensaje"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>

              <button
                type="button"
                onClick={openChatbot}
                className="mt-3 text-xs text-white/50 transition hover:text-white/100"
              >
                Abrir chatbot desde la pagina
              </button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
