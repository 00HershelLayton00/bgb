"use client";

import { motion } from "framer-motion";
import {
  Bot,
  BriefcaseBusiness,
  Globe,
  MessageSquare,
  Monitor,
  Settings2,
  Smartphone,
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
    title: "Software de escritorio",
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
  },
  {
    icon: BriefcaseBusiness,
    title: "Automatizacion y mejoras",
    text: "Procesos mas ordenados para ahorrar tiempo y verse mas profesional."
  }
];

export default function Services() {
  return (
    <section id="servicios" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="mb-10 max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.4em] text-[#7fb2ff]">
          Servicios
        </p>
        <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
          Ocho formas de ayudar a tu negocio a verse mejor y funcionar mejor.
        </h2>
        <p className="mt-4 text-white/100">
          Todo esta explicado en un lenguaje simple, sin tecnicismos innecesarios.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
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
              <h3 className="mt-5 text-xl font-bold">{service.title}</h3>
              <p className="mt-3 text-sm leading-6 text-white/100">{service.text}</p>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
