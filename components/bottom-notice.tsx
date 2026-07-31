"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, X } from "lucide-react";

export default function BottomNotice() {
  const [visible, setVisible] = useState(true);

  function openChatbot() {
    window.dispatchEvent(new Event("bgb-open-chatbot"));
  }

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 30, opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-x-0 bottom-4 z-30 px-4"
        >
          <div className="glass mx-auto flex max-w-xl items-center justify-between gap-4 rounded-full px-4 py-3">
            <button
              type="button"
              onClick={openChatbot}
              className="flex items-center gap-3 text-left"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0066FF] text-white">
                <Bot className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-sm font-semibold text-white">Prueba el chatbot BGB</span>
                <span className="block text-xs text-white/100">Responde dudas basicas sobre servicios y contacto.</span>
              </span>
            </button>

            <button
              type="button"
              onClick={() => setVisible(false)}
              className="rounded-full border border-white/10 bg-white/10 p-2 text-white/100 transition hover:bg-white/10 hover:text-white"
              aria-label="Cerrar aviso"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
