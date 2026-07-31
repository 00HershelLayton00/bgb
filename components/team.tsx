"use client";

import { motion } from "framer-motion";

const team = [
  {
    initials: "E",
    title: "Estrategia",
    text: "Convertimos ideas en una propuesta clara, elegante y facil de explicar."
  },
  {
    initials: "D",
    title: "Desarrollo",
    text: "Construimos la parte visual y tecnica con una base limpia y moderna."
  },
  {
    initials: "S",
    title: "Soporte",
    text: "Acompañamos despues de la entrega para que todo siga funcionando bien."
  }
];

export default function Team() {
  return (
    <section id="equipo" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-[#7fb2ff]">Equipo</p>
          <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
            Un equipo pequeño, rapido y enfocado en resultados que se notan.
          </h2>
          <p className="mt-4 max-w-xl text-white/100">
            Ideal para clientes que quieren una imagen seria sin complicarse con detalles tecnicos.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {team.map((member, index) => (
            <motion.article
              key={member.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              className="glass rounded-[1.75rem] p-6 text-center"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0066FF] text-2xl font-black shadow-[0_0_35px_rgba(0,102,255,0.34)]">
                {member.initials}
              </div>
              <h3 className="mt-5 text-lg font-bold">{member.title}</h3>
              <p className="mt-3 text-sm leading-6 text-white/100">{member.text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
