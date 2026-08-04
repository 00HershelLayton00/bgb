export const business = {
  name: "BGB Tech",
  chatbotName: "Nova",
  tagline: "Tecnología premium que se entiende",
  email: "bgbcuba@gmail.com",
  whatsapp: {
    display: "+53 54797723",
    link: "https://wa.me/5354797723",
    intro: "Hola BGB Tech, quiero información sobre un proyecto."
  },
  aiLimitPerHour: 10
};

export const services = [
  "APKs y apps Android",
  "Páginas web",
  "Instalación y desarrollo de softwares de escritorio",
  "IA para WhatsApp",
  "IA para Instagram",
  "Instalación de sistemas",
  "Soporte técnico",
  "Automatización y mejoras"
];

export function whatsappLink(message?: string) {
  const base = business.whatsapp.link;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

export type BotReply = {
  text: string;
  image?: string | null;
};

type FaqRule = {
  test: RegExp;
  reply: BotReply;
};

const FAQ_MAP: FaqRule[] = [
  {
    test: /servicios|que hacen|que ofrecen|que brindan|servicio/i,
    reply: {
      image: null,
      text: `En ${business.name} ofrecemos: ${services.join(", ")}. Si quieres, te explico cualquiera en palabras simples. ¿Ya tienes una idea? Escríbenos por WhatsApp (${business.whatsapp.display}) o al correo ${business.email} y te preparamos una propuesta clara.`
    }
  },
  {
    test: /apk|android|aplicacion/i,
    reply: {
      image: null,
      text: "Sí, desarrollamos apps Android (APKs) con diseño moderno, pensadas para ventas, catálogos, reservas o mostrar tu negocio. Cuéntanos tu idea y te hacemos una propuesta."
    }
  },
  {
    test: /pagina web|paginas web|sitio web|web|landing/i,
    reply: {
      image: null,
      text: "Sí, diseñamos páginas web y landing pages premium: rápidas, responsivas y fáciles de entender, pensadas para convertir visitas en clientes."
    }
  },
  {
    test: /escritorio|desktop|windows|linux|software/i,
    reply: {
      image: null,
      text: "También hacemos instalación y desarrollo de softwares de escritorio para procesos internos, control, gestión y automatización. Herramientas claras y enfocadas en tareas reales de trabajo."
    }
  },
  {
    test: /whatsapp|instagram|ia|bot|automatizacion/i,
    reply: {
      image: null,
      text: "Sí, montamos IA y respuestas automáticas para WhatsApp e Instagram para atender, responder y captar clientes más rápido. Es como me estás usando ahora, pero en tus canales. ¿Quieres detalles? Escríbenos por WhatsApp."
    }
  },
  {
    test: /sistema operativo|instalacion|formateo|soporte tecnico|soporte|mantenimiento/i,
    reply: {
      image: null,
      text: "Hacemos instalación de sistemas operativos, mantenimiento y soporte técnico para dejar tu equipo y tu negocio listos para funcionar."
    }
  },
  {
    test: /precio|costo|cuesta|presupuesto|cuanto/i,
    reply: {
      image: null,
      text: `El precio depende del alcance del proyecto (tipo de servicio, páginas y características). Escríbenos por WhatsApp (${business.whatsapp.display}) o al correo ${business.email} con tu idea y te damos una propuesta clara y sin compromiso.`
    }
  },
  {
    test: /tiempo|entrega|plazo|cuanto tardan/i,
    reply: {
      image: null,
      text: "Los tiempos dependen del proyecto: una web pequeña es más rápida; apps o IA según su complejidad. Cuéntanos qué necesitas (por WhatsApp o correo) y te confirmamos un plazo concreto."
    }
  },
  {
    test: /contacto|contactar|correo|whatsapp|telefono|hablar|llamar/i,
    reply: {
      image: null,
      text: `Puedes escribirnos directo por WhatsApp al ${business.whatsapp.display}, enviar un correo a ${business.email} o usar el formulario de la sección de contacto. Te respondemos con una orientación clara.`
    }
  },
  {
    test: /equipo|quienes|quien son|ustedes/i,
    reply: {
      image: null,
      text: `${business.name} es un equipo pequeño enfocado en estrategia, desarrollo y soporte para negocios que quieren verse y funcionar mejor, sin complicarse con la tecnología.`
    }
  }
];

const fallbackReply: BotReply = {
  image: null,
  text: `Puedo ayudarte con servicios, precios, tiempos o contacto. Si prefieres hablar con alguien directo, escríbenos por WhatsApp (${business.whatsapp.display}) o al correo ${business.email}.`
};

export function isFaqQuestion(message: string) {
  const normalized = message.trim();
  return FAQ_MAP.some(({ test }) => test.test(normalized));
}

export function getFaqReply(message: string): BotReply | null {
  const normalized = message.trim();
  const found = FAQ_MAP.find(({ test }) => test.test(normalized));
  return found?.reply ?? null;
}

export function getFaqText(message: string) {
  return getFaqReply(message)?.text ?? fallbackReply.text;
}

export function getQuickPrompts() {
  return [
    "¿Qué servicios ofrecen?",
    "¿Hacen apps Android?",
    "¿Pueden hacer una página web?",
    "¿Cuánto cuesta?"
  ];
}

export function getBotReply(rawInput: string) {
  const input = rawInput.toLowerCase().trim();

  if (!input) {
    return "Escribe una pregunta corta y te respondo.";
  }

  const found = FAQ_MAP.find(({ test }) => test.test(input));
  return found?.reply.text ?? fallbackReply.text;
}