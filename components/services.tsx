"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bot,
  ChevronDown,
  Globe,
  MessageSquare,
  Monitor,
  Settings2,
  Smartphone,
  Sparkles,
  Wrench
} from "lucide-react";

const services = [
  {
    icon: Smartphone,
    title: "APKs y apps Android",
    text: "Aplicaciones moviles funcionales, modernas y listas para presentar a clientes."
  },
  {
    icon: Globe,
    title: "Paginas web",
    text: "Landing pages, sitios corporativos y presencia digital con aspecto premium."
  },
  {
    icon: Monitor,
    title: "Instalación y desarrollo de softwares de escritorio",
    text: "Herramientas para PC organizadas, rapidas y pensadas para el trabajo real."
  },
  {
    icon: Bot,
    title: "IA en WhatsApp",
    text: "Respuestas automatizadas, soporte inicial y asistentes de venta simples."
  },
  {
    icon: MessageSquare,
    title: "IA en Instagram",
    text: "Atencion automatica para captar clientes y responder mensajes comunes."
  },
  {
    icon: Settings2,
    title: "Instalacion de sistemas",
    text: "Puesta a punto de Windows, Linux y configuraciones esenciales."
  },
  {
    icon: Wrench,
    title: "Soporte tecnico",
    text: "Mantenimiento, limpieza digital y solucion practica de problemas."
  }
];

export default function Services() {
  const [open, setOpen] = useState(false);

  return (
    <section id="servicios" className="mx-auto max-w-7xl px-4 pt-12 pb-12 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-[#7fb2ff]">
            Servicios
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Ocho formas de ayudar a tu negocio a verse mejor y funcionar mejor.
          </h2>
        </div>

        <motion.button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="group relative inline-flex items-center gap-4 overflow-hidden rounded-full border border-[#0066FF]/45 bg-[#0b1220]/80 py-5 pr-5 pl-7 font-display text-lg font-bold tracking-tight text-white shadow-[0_0_45px_rgba(0,102,255,0.25)] backdrop-blur-md transition-colors duration-300 hover:border-[#4d8dff]/80 sm:gap-5 sm:pl-9 sm:text-2xl"
        >
          <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_28%_50%,rgba(0,102,255,0.4),transparent_65%)] opacity-70 transition-opacity duration-300 group-hover:opacity-100" />
          <span className="pointer-events-none absolute -top-16 left-1/2 h-24 w-40 -translate-x-1/2 rounded-full bg-[#4d8dff] opacity-30 blur-3xl transition-opacity duration-300 group-hover:opacity-50" />
          <Sparkles className="h-6 w-6 shrink-0 text-[#8fb8ff] transition-transform duration-300 group-hover:rotate-12 sm:h-7 sm:w-7" />
          <span>{open ? "Ocultar servicios" : "Mostrar servicios"}</span>
          <span
            className={`flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#4d8dff] to-[#0066FF] text-white shadow-[0_0_35px_rgba(0,102,255,0.55)] transition-transform duration-300 sm:h-16 sm:w-16 ${
              open ? "rotate-180" : ""
            }`}
          >
            <ChevronDown className="h-7 w-7 sm:h-8 sm:w-8" />
          </span>
        </motion.button>
      </div>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            key="services-grid"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="grid gap-5 pt-10 md:grid-cols-2 xl:grid-cols-4">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <motion.article
                    key={service.title}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.45, delay: index * 0.04 }}
                    whileHover={{ y: -6 }}
                    className="glass group rounded-[1.75rem] p-6 transition"
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0066FF]/20 text-[#9ec1ff] transition group-hover:bg-[#0066FF] group-hover:text-white">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-5 font-display text-xl font-semibold">{service.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-white/100">{service.text}</p>
                  </motion.article>
                );
              })}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
