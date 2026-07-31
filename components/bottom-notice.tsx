"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

function openChatbot() {
  window.dispatchEvent(new Event("bgb-open-chatbot"));
}

export default function BottomNotice() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7, duration: 0.5 }}
      className="fixed bottom-4 left-1/2 z-30 w-[min(92vw,40rem)] -translate-x-1/2 rounded-full border border-white/10 bg-black/55 px-4 py-3 text-center shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl"
    >
      <button
        type="button"
        onClick={openChatbot}
        className="flex w-full items-center justify-center gap-2 text-sm text-white/85 transition hover:text-white"
      >
        <Sparkles className="h-4 w-4 text-[#6fa4ff]" />
        Prueba a Nova: responde dudas y te guía hacia la mejor solución para tu negocio.
      </button>
    </motion.div>
  );
}
