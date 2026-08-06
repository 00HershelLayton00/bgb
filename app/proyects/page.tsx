import type { Metadata } from "next";
import { ArrowLeft, FolderKanban } from "lucide-react";
import { projects, type Estado } from "@/lib/proyects";

export const metadata: Metadata = {
  title: "Proyectos | BGB Tech",
  description: "Proyectos de BGB Tech y su estado."
};

const estadoStyle: Record<Estado, string> = {
  "En progreso": "border-[#0066FF]/50 bg-[#0066FF]/15 text-[#8fb8ff]",
  Completado: "border-emerald-400/40 bg-emerald-400/10 text-emerald-300",
  "En pausa": "border-amber-400/40 bg-amber-400/10 text-amber-300",
  Mejorable: "border-orange-500/40 bg-orange-500/10 text-orange-300"
};

const estadoDot: Record<Estado, string> = {
  "En progreso": "bg-[#4d8dff]",
  Completado: "bg-emerald-400",
  "En pausa": "bg-amber-400",
  Mejorable: "bg-orange-500"
};

export default function ProyectsPage() {
  return (
    <div className="relative min-h-screen overflow-hidden text-white">
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_top_left,rgba(0,102,255,0.09),transparent_22%),radial-gradient(circle_at_bottom_right,rgba(0,102,255,0.05),transparent_26%)]" />
      <div className="grid-overlay pointer-events-none absolute inset-0 z-[1] opacity-10" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-14 pb-16 sm:px-6 lg:px-8">
        <a
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 backdrop-blur transition hover:bg-white/10 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al inicio
        </a>

        <header className="mt-10 max-w-3xl">
          <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.4em] text-[#7fb2ff]">
            <FolderKanban className="h-4 w-4" />
            Proyectos
          </p>
          <h1 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Nuestros proyectos y su estado.
          </h1>
          <p className="mt-4 text-base leading-7 text-white/60">
            Registro interno de los proyectos de {projects.length} de BGB Tech.
          </p>
        </header>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <article key={project.nombre} className="glass group rounded-[1.75rem] p-6 transition hover:border-white/20">
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-display text-xl font-semibold">{project.nombre}</h3>
                <span
                  className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${estadoStyle[project.estado]}`}
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${estadoDot[project.estado]}`} />
                  {project.estado}
                </span>
              </div>
              <p className="mt-3 text-sm leading-6 text-white/70">{project.descripcion}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
