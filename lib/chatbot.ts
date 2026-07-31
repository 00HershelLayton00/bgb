const SERVICES = [
  "APKs y apps Android",
  "Paginas web",
  "Software de escritorio",
  "IA para WhatsApp",
  "IA para Instagram",
  "Instalacion de sistemas",
  "Soporte tecnico",
  "Automatizacion y mejoras"
];

function hasAny(text: string, keywords: string[]) {
  return keywords.some((keyword) => text.includes(keyword));
}

export function getBotReply(rawInput: string) {
  const input = rawInput.toLowerCase().trim();

  if (!input) {
    return "Escribe una pregunta corta y te respondo.";
  }

  if (hasAny(input, ["servicio", "servicios", "que hacen", "qué hacen", "hacen"])) {
    return `En BGB Tech ofrecemos: ${SERVICES.join(", ")}. Si quieres, tambien te explico cada uno en palabras simples.`;
  }

  if (hasAny(input, ["apk", "android", "app", "apps"])) {
    return "Creamos APKs y apps Android con una presentacion moderna, listas para mostrar tu idea o negocio.";
  }

  if (hasAny(input, ["web", "pagina", "paginas", "sitio", "landing"])) {
    return "Diseñamos paginas web y landings premium, faciles de entender y pensadas para convertir visitas en clientes.";
  }

  if (hasAny(input, ["escritorio", "desktop", "pc", "windows", "software"])) {
    return "Tambien hacemos software de escritorio para PC, organizado y enfocado en tareas reales de trabajo.";
  }

  if (hasAny(input, ["whatsapp", "instagram", "ia", "bot", "automatizacion"])) {
    return "Podemos montar respuestas automatizadas e IA para WhatsApp e Instagram, ideal para atender clientes mas rapido.";
  }

  if (hasAny(input, ["sistema", "sistemas", "instalacion", "formateo", "linux"])) {
    return "Hacemos instalacion de sistemas operativos y puesta a punto para dejar el equipo listo para usar.";
  }

  if (hasAny(input, ["soporte", "ayuda", "arreglo", "mantenimiento", "tecnico"])) {
    return "Ofrecemos soporte tecnico para resolver problemas, revisar equipos y mantener todo funcionando.";
  }

  if (hasAny(input, ["precio", "presupuesto", "costo", "cuanto", "cuesta"])) {
    return "Los precios dependen del alcance. Si me dices que necesitas, te preparo una idea mas clara y simple.";
  }

  if (hasAny(input, ["tiempo", "entrega", "cuanto tardan", "plazo"])) {
    return "El tiempo de entrega depende del proyecto, pero siempre buscamos una propuesta clara y ordenada desde el inicio.";
  }

  if (hasAny(input, ["contacto", "correo", "whatsapp", "hablar", "llamar"])) {
    return "Puedes usar el formulario de contacto, abrir el correo o escribirme aqui mismo para orientar tu idea.";
  }

  if (hasAny(input, ["equipo", "quienes", "quien son", "ustedes"])) {
    return "Somos un equipo pequeno enfocado en estrategia, desarrollo y soporte para negocios que quieren verse mejor.";
  }

  return "Puedo ayudarte con servicios, precios, tiempos, contacto o una explicacion simple de cualquier idea.";
}
