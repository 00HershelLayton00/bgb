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
    <motion.nav
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55 }}
      className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[#07090e]/85 backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-7xl flex-nowrap items-center justify-between gap-2 px-3 py-2 sm:gap-4 sm:px-5 sm:py-2.5">
        <a href="#" className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#0066FF] text-xs font-black text-white sm:h-9 sm:w-9 sm:text-sm">
            BGB
          </div>
          <span className="hidden font-display text-xs font-semibold tracking-[0.25em] text-white/100 min-[440px]:inline sm:text-sm">
            BGB TECH
          </span>
        </a>

        <nav className="flex flex-nowrap items-center gap-0.5 sm:gap-2">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="whitespace-nowrap rounded-full px-2 py-1.5 text-[11px] text-white/80 transition hover:bg-white/10 hover:text-white sm:px-3.5 sm:text-sm"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          onClick={openChatbot}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#0066FF] px-3 py-1.5 text-[11px] font-semibold text-white transition hover:bg-[#0a73ff] sm:px-4 sm:py-2 sm:text-xs"
        >
          <Sparkles className="h-3.5 w-3.5" />
          <span className="hidden min-[380px]:inline">Hablar</span> ahora
          <ArrowRight className="hidden h-3.5 w-3.5 sm:inline" />
        </button>
      </div>
    </motion.nav>
  );
}