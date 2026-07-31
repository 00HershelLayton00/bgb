const FAQ_MAP: Array<{ test: RegExp; reply: string }> = [
  {
    test: /servicios|que hacen|que ofrecen|que brindan/i,
    reply:
      "BGB Tech ofrece desarrollo de apps Android, sitios web, software de escritorio, IA para WhatsApp e Instagram, instalación de sistemas operativos y soporte técnico."
  },
  {
    test: /apk|android|aplicacion/i,
    reply:
      "Sí, desarrollamos aplicaciones Android (APKs) pensadas para negocio, ventas, reservas, catálogos o automatización."
  },
  {
    test: /pagina web|sitio web|web|landing/i,
    reply:
      "Sí, hacemos páginas web modernas, rápidas y responsivas, desde landing pages hasta sitios corporativos completos."
  },
  {
    test: /escritorio|desktop|windows|linux/i,
    reply:
      "También creamos software de escritorio para procesos internos, control, gestión y automatización."
  },
  {
    test: /whatsapp|instagram|ia/i,
    reply:
      "Implementamos automatización e inteligencia artificial para WhatsApp e Instagram, para atención, respuesta y captación de clientes."
  },
  {
    test: /sistema operativo|instalacion|formateo|soporte tecnico|soporte/i,
    reply:
      "Hacemos instalación de sistemas operativos, mantenimiento y soporte técnico para equipos y negocios."
  },
  {
    test: /precio|costo|cuesta|presupuesto/i,
    reply:
      "El precio depende del alcance del proyecto. Cuéntame qué necesitas y te guiamos con la mejor opción."
  },
  {
    test: /contacto|contactar|whatsapp|telefono|hablar/i,
    reply:
      "Puedes pedir un presupuesto desde la sección de contacto o escribirnos directamente para revisar tu caso."
  }
];

export function isFaqQuestion(message: string) {
  const normalized = message.trim();
  return FAQ_MAP.some(({ test }) => test.test(normalized));
}

export function getFaqReply(message: string) {
  const normalized = message.trim();
  const found = FAQ_MAP.find(({ test }) => test.test(normalized));
  return found?.reply ?? null;
}

export function getQuickPrompts() {
  return [
    "Que servicios ofrecen?",
    "Hacen apps Android?",
    "Pueden hacer una pagina web?",
    "Cuanto cuesta?"
  ];
}
