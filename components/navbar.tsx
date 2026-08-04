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
      <div className="glass mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 rounded-3xl px-4 py-3 sm:gap-4 sm:px-5 sm:py-4">
        <a href="#" className="flex items-center gap-2.5 sm:gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#0066FF] text-base font-black shadow-[0_0_30px_rgba(0,102,255,0.32)] sm:h-11 sm:w-11 sm:text-lg">
            BGB
          </div>
          <p className="font-display text-xs font-semibold tracking-[0.3em] text-white/100 sm:text-sm sm:tracking-[0.35em]">BGB TECH</p>
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
          className="inline-flex items-center gap-2 rounded-full bg-[#0066FF] px-4 py-2 text-xs font-semibold text-white shadow-[0_0_25px_rgba(0,102,255,0.3)] transition hover:scale-[1.02] hover:bg-[#0a73ff] sm:px-5 sm:py-2.5 sm:text-sm"
        >
          <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          Hablar ahora
          <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        </button>
      </div>
    </motion.header>
  );
}
