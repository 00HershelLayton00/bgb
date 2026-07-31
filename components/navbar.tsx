"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

const links = [
  { href: "#servicios", label: "Servicios" },
  { href: "#equipo", label: "Equipo" },
  { href: "#contacto", label: "Contacto" }
];

function openChatbot() {
  window.dispatchEvent(new Event("bgb-open-chatbot"));
}

export default function Navbar() {
  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55 }}
      className="fixed inset-x-0 top-0 z-40 px-4 pt-4 sm:px-6 lg:px-8"
    >
      <div className="glass mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 rounded-3xl px-5 py-4">
        <a href="#" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0066FF] text-lg font-black shadow-[0_0_40px_rgba(0,102,255,0.45)]">
            BGB
          </div>
          <div>
            <p className="text-sm font-semibold tracking-[0.35em] text-white/100">BGB TECH</p>
            <p className="text-xs text-white/100">Tecnologia premium</p>
          </div>
        </a>

        <nav className="flex flex-wrap items-center gap-3 text-sm text-white/100">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 transition hover:bg-white/10 hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          onClick={openChatbot}
          className="inline-flex items-center gap-2 rounded-full bg-[#0066FF] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_35px_rgba(0,102,255,0.38)] transition hover:scale-[1.02] hover:bg-[#0a73ff]"
        >
          <Sparkles className="h-4 w-4" />
          Hablar ahora
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </motion.header>
  );
}
