"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, X } from "lucide-react";

function openChatbot() {
  window.dispatchEvent(new Event("bgb-open-chatbot"));
}

const DISMISS_KEY = "bgb-bottom-notice-dismissed";

export default function BottomNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (window.localStorage.getItem(DISMISS_KEY) === "1") return;
    } catch {
      return;
    }
    const timer = window.setTimeout(() => setVisible(true), 1200);
    return () => window.clearTimeout(timer);
  }, []);

  function dismiss() {
    setVisible(false);
    try {
      window.localStorage.setItem(DISMISS_KEY, "1");
    } catch {
      /* ignore */
    }
  }

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key="notice"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.4 }}
          className="fixed bottom-16 left-1/2 z-30 w-[min(92vw,32rem)] -translate-x-1/2 rounded-2xl border border-white/10 bg-black/45 px-4 py-2.5 shadow-[0_20px_60px_rgba(0,0,0,0.3)] backdrop-blur-xl"
        >
          <button
            type="button"
            onClick={openChatbot}
            className="flex w-full items-center justify-center gap-2 px-6 text-center text-xs text-white/80 transition hover:text-white sm:text-sm"
          >
            <Sparkles className="h-4 w-4 shrink-0 text-[#6fa4ff]" />
            Prueba a Nova, tu asistente de BGB Tech.
          </button>
          <button
            type="button"
            onClick={dismiss}
            aria-label="Cerrar aviso"
            className="absolute top-2 right-2 rounded-full p-1 text-white/40 transition hover:bg-white/10 hover:text-white"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}