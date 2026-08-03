"use client";

import { type FormEvent, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Mail, MessageCircle, PhoneCall, Send, Sparkles } from "lucide-react";
import { business, whatsappLink } from "@/lib/faq";

type FormState = {
  name: string;
  service: string;
  details: string;
};

const initialForm: FormState = {
  name: "",
  service: "",
  details: ""
};

export default function Contact() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [copied, setCopied] = useState(false);

  const mailtoLink = useMemo(() => {
    const subject = encodeURIComponent(`Nuevo proyecto ${business.name}: ${form.service || "Consulta general"}`);
    const body = encodeURIComponent(
      `Nombre: ${form.name || "No indicado"}\nServicio: ${form.service || "No indicado"}\n\nDetalle:\n${form.details || "Sin detalles"}`
    );
    return `mailto:${business.email}?subject=${subject}&body=${body}`;
  }, [form]);

  const waLink = useMemo(
    () =>
      whatsappLink(
        `Hola ${business.name}, te escribo desde la web.\nServicio: ${form.service || "Consulta general"}\n\nDetalle:\n${form.details || "Sin detalles"}`
      ),
    [form]
  );

  function openChatbot() {
    window.dispatchEvent(new Event("bgb-open-chatbot"));
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(business.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    window.location.href = mailtoLink;
  }

  return (
    <section id="contacto" className="mx-auto max-w-7xl px-4 py-24 pb-36 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-[#7fb2ff]">Contacto</p>
          <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
            Cuentanos tu idea y la convertimos en una propuesta elegante.
          </h2>
          <p className="mt-4 max-w-xl text-white/100">
            Puedes escribirnos por correo, usar el chatbot o dejar tus datos en el formulario rapido.
          </p>

          <div className="mt-8 grid gap-4">
            {[
              {
                icon: Mail,
                title: "Correo",
                text: business.email,
                href: `mailto:${business.email}`
              },
              {
                icon: PhoneCall,
                title: "WhatsApp",
                text: business.whatsapp.display,
                href: whatsappLink(business.whatsapp.intro)
              },
              {
                icon: Sparkles,
                title: "Enfoque",
                text: "Imagen premium, claridad y soporte tecnico"
              }
            ].map((item) => {
              const Icon = item.icon;
              const content = (
                <>
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#0066FF]/20 text-[#9ec1ff]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="mt-1 text-sm text-white/100">{item.text}</p>
                  </div>
                </>
              );
              return item.href ? (
                <a
                  key={item.title}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="glass flex items-start gap-4 rounded-[1.5rem] p-5 transition hover:border-[#0066FF]/40"
                >
                  {content}
                </a>
              ) : (
                <div key={item.title} className="glass flex items-start gap-4 rounded-[1.5rem] p-5">
                  {content}
                </div>
              );
            })}
          </div>
        </div>

        <motion.form
          onSubmit={submitForm}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="glass rounded-[2rem] p-6 sm:p-8"
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-white/50">Formulario rapido</p>
              <h3 className="mt-2 text-2xl font-bold">Pide tu propuesta</h3>
            </div>
            <button
              type="button"
              onClick={openChatbot}
              className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold text-white/90 transition hover:bg-white/10"
            >
              Preguntar al chatbot
            </button>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2">
              <span className="text-sm text-white/100">Nombre</span>
              <input
                value={form.name}
                onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none ring-0 placeholder:text-white/30 focus:border-[#0066FF]/100"
                placeholder="Tu nombre"
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm text-white/100">Servicio que buscas</span>
              <input
                value={form.service}
                onChange={(event) => setForm((prev) => ({ ...prev, service: event.target.value }))}
                className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none ring-0 placeholder:text-white/30 focus:border-[#0066FF]/100"
                placeholder="Web, APK, IA, soporte..."
              />
            </label>
          </div>

          <label className="mt-4 grid gap-2">
            <span className="text-sm text-white/100">Detalle del proyecto</span>
            <textarea
              value={form.details}
              onChange={(event) => setForm((prev) => ({ ...prev, details: event.target.value }))}
              rows={5}
              className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none ring-0 placeholder:text-white/30 focus:border-[#0066FF]/100"
              placeholder="Cuentanos lo que necesitas y te respondemos con una idea clara."
            />
          </label>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-full bg-[#0066FF] px-5 py-3 font-semibold text-white shadow-[0_0_35px_rgba(0,102,255,0.35)] transition hover:scale-[1.02]"
            >
              <Send className="h-4 w-4" />
              Enviar por correo
            </button>
            <a
              href={waLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 font-semibold text-[#04210f] transition hover:scale-[1.02]"
            >
              <MessageCircle className="h-4 w-4" />
              Enviar por WhatsApp
            </a>
            <button
              type="button"
              onClick={copyEmail}
              className="rounded-full border border-white/10 bg-white/10 px-5 py-3 font-semibold text-white/90 transition hover:bg-white/10"
            >
              {copied ? "Correo copiado" : "Copiar correo"}
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  );
}
