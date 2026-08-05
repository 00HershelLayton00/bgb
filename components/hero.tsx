"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Sparkles } from "lucide-react";
import TeamCarousel from "@/components/team-carousel";
import TeamHeading from "@/components/team-heading";

export default function Hero({ teamPhotos }: { teamPhotos: string[] }) {
  return (
    <section className="relative mx-auto flex min-h-screen max-w-7xl items-center px-4 pt-12 pb-16 sm:px-6 lg:px-8">
      <div className="absolute inset-x-0 top-20 -z-10 mx-auto h-72 w-72 rounded-full bg-[#0066FF] opacity-[0.12] blur-3xl" />
      <div className="grid w-full items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 hidden items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-white/100 sm:inline-flex"
          >
            <Sparkles className="h-4 w-4 text-[#7fb2ff]" />
            BGB Tech | Tecnologia que se entiende
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.06 }}
            className="max-w-4xl font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
          >
            BGB{" "}
            <span className="bg-gradient-to-r from-[#8fb8ff] via-[#4d8dff] to-[#0066FF] bg-clip-text text-transparent">
              Tecnología premium
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.14 }}
            className="mt-6 max-w-2xl text-lg font-medium leading-8 text-white/80 sm:text-xl"
          >
            Haz que tu negocio se vea serio, moderno y listo para vender más.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-4 max-w-2xl text-base leading-7 text-white/60"
          >
            Apps Android, páginas web, instalación y desarrollo de softwares de escritorio, IA para
            WhatsApp e Instagram, instalación de sistemas y soporte técnico. Una experiencia simple.
          </motion.p>
        </div>

        {teamPhotos.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.26 }}
            className="lg:hidden"
          >
            <TeamHeading />
            <div className="mt-6">
              <TeamCarousel photos={teamPhotos} />
            </div>
          </motion.div>
        ) : null}

        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.08 }}
          className="relative"
        >
          <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-[#0066FF] opacity-14 blur-3xl" />
          <div className="glass relative overflow-hidden rounded-[2rem] p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/50">BGB Dashboard</p>
                <h2 className="mt-2 font-display text-2xl font-bold">Una presencia digital de alto nivel</h2>
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
                  title: "Chat inteligente",
                  text: "Responde dudas al instante y te guía hacia la mejor solución."
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
                  className="rounded-3xl border border-white/10 bg-black/20 p-4"
                >
                  <p className="text-sm font-semibold text-white">{item.title}</p>
                  <p className="mt-1.5 text-xs leading-5 text-white/80">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
