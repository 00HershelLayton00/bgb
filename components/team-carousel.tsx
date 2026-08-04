"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

type TeamCarouselProps = {
  photos: string[];
};

export default function TeamCarousel({ photos }: TeamCarouselProps) {
  const [index, setIndex] = useState(0);
  const total = photos.length;
  const current = total > 0 ? index % total : 0;

  function go(direction: number) {
    setIndex((prev) => (prev + direction + total) % total);
  }

  if (total === 0) {
    return (
      <div className="glass rounded-[2rem] p-5 sm:p-6">
        <p className="py-10 text-center text-sm text-white/50">Sin fotos por ahora.</p>
      </div>
    );
  }

  return (
    <div className="glass rounded-[2rem] p-5 sm:p-6">
      <div className="relative aspect-[2/1] overflow-hidden rounded-3xl border border-white/10 bg-black/30">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.3 }}
            className="h-full w-full"
          >
            <img
              src={photos[current]}
              alt={`Foto ${current + 1}`}
              className="h-full w-full object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-4 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Foto anterior"
          className="rounded-full border border-white/10 bg-white/10 p-2.5 text-white/80 transition hover:bg-white/15 hover:text-white"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-2">
          {Array.from({ length: total }, (_, dotIndex) => (
            <button
              key={dotIndex}
              type="button"
              onClick={() => setIndex(dotIndex)}
              aria-label={`Ir a la foto ${dotIndex + 1}`}
              className={`h-2 rounded-full transition-all ${
                dotIndex === current ? "w-6 bg-[#0066FF]" : "w-2 bg-white/25 hover:bg-white/40"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Foto siguiente"
          className="rounded-full border border-white/10 bg-white/10 p-2.5 text-white/80 transition hover:bg-white/15 hover:text-white"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <p className="mt-3 text-center text-xs text-white/45">Fotos del equipo</p>
    </div>
  );
}