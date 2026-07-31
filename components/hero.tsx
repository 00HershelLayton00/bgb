"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, ShieldCheck, Zap } from "lucide-react";

function openChatbot() {
  window.dispatchEvent(new Event("bgb-open-chatbot"));
}

const stats = [
  { value: "8", label: "Servicios claros" },
  { value: "100%", label: "Responsive" },
  { value: "20/h", label: "Chatbot limitado" }
];

export default function Hero() {
  return (
    <section className="relative mx-auto flex min-h-screen max-w-7xl items-center px-4 pt-32 pb-20 sm:px-6 lg:px-8">
      <div className="absolute inset-x-0 top-20 -z-10 mx-auto h-72 w-72 rounded-full bg-[#0066FF] opacity-20 blur-3xl" />
      <div className="grid w-full items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-white/100"
          >
            <Sparkles className="h-4 w-4 text-[#7fb2ff]" />
            BGB Tech | Tecnologia que se entiende
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.06 }}
            className="max-w-4xl text-5xl font-black leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl"
          >
            Tecnologia premium para hacer que tu negocio se vea serio, moderno y listo para vender mas.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.14 }}
            className="mt-6 max-w-2xl text-lg leading-8 text-white/100 sm:text-xl"
          >
            Creamos apps Android, paginas web, software de escritorio, IA para WhatsApp e Instagram, instalacion de sistemas y soporte tecnico con una experiencia simple para personas que no son expertas en tecnologia.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <a
              href="#servicios"
              className="inline-flex items-center gap-2 rounded-full bg-[#0066FF] px-6 py-3 font-semibold text-white shadow-[0_0_35px_rgba(0,102,255,0.38)] transition hover:scale-[1.02]"
            >
              Ver servicios
              <ArrowRight className="h-4 w-4" />
            </a>
            <button
              type="button"
              onClick={openChatbot}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-6 py-3 font-semibold text-white/90 transition hover:bg-white/10"
            >
              <Zap className="h-4 w-4 text-[#7fb2ff]" />
              Preguntarle al chatbot
            </button>
          </motion.div>

          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.22 + index * 0.08 }}
                className="glass rounded-3xl p-5"
              >
                <div className="text-3xl font-black text-white">{stat.value}</div>
                <div className="mt-1 text-sm text-white/100">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.08 }}
          className="relative"
        >
          <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-[#0066FF] opacity-20 blur-3xl" />
          <div className="glass relative overflow-hidden rounded-[2rem] p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/50">BGB Dashboard</p>
                <h2 className="mt-2 text-2xl font-bold">Una presencia digital de alto nivel</h2>
              </div>
              <div className="rounded-2xl bg-[#0066FF]/20 p-3 text-[#8eb8ff]">
                <ShieldCheck className="h-6 w-6" />
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                {
                  title: "Entrega clara",
                  text: "Proyectos ordenados, faciles de entender y listos para avanzar."
                },
                {
                  title: "Estilo premium",
                  text: "Dark mode, brillo neón y una interfaz que transmite confianza."
                },
                {
                  title: "Chat inteligente",
                  text: "Responde preguntas basicas sin usar una API real."
                },
                {
                  title: "Escalable",
                  text: "Base limpia para crecer luego con backend, CRM o automatizaciones."
                }
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.16 + index * 0.05 }}
                  className="rounded-3xl border border-white/10 bg-black/20 p-5"
                >
                  <p className="font-semibold text-white">{item.title}</p>
                  <p className="mt-2 text-sm leading-6 text-white/100">{item.text}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 rounded-3xl border border-[#0066FF]/20 bg-[#0066FF]/10 p-5">
              <p className="text-sm uppercase tracking-[0.24em] text-[#95bdff]">Mensaje destacado</p>
              <p className="mt-2 text-lg leading-7 text-white/90">
                Tu negocio no necesita verse complicado. Necesita verse confiable, moderno y facil de usar.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
