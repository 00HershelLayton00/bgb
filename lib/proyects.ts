export type Estado = "En progreso" | "Completado" | "En pausa" | "Mejorable";

export type Project = {
  nombre: string;
  descripcion: string;
  estado: Estado;
};

export const projects: Project[] = [
  {
    nombre: "BGB Tech (web)",
    descripcion: "Página web de la empresa.",
    estado: "Completado"
  },
  {
    nombre: "BGB Menu",
    descripcion: "Menú digital de restaurante.",
    estado: "En progreso"
  },
  {
    nombre: "BGB Shop",
    descripcion: "Tienda online.",
    estado: "En progreso"
  },
  {
    nombre: "BookReader",
    descripcion: "Lector de ebooks.",
    estado: "Mejorable"
  },
  {
    nombre: "Gemini Fotos",
    descripcion: "CLI con Gemini para analizar fotos y generar imágenes.",
    estado: "En progreso"
  },
  {
    nombre: "El Escapao",
    descripcion: "App de restaurante.",
    estado: "Completado"
  },
  {
    nombre: "Las Vegas en Cuba",
    descripcion: "App de restaurante.",
    estado: "En pausa"
  },
  {
    nombre: "Entrenador PC",
    descripcion: "Entrenador de Codeforces.",
    estado: "En pausa"
  },
  {
    nombre: "MTG CUI",
    descripcion: "App de cartas Magic.",
    estado: "Mejorable"
  },
  {
    nombre: "Mando",
    descripcion: "Usar el móvil como mando de PC.",
    estado: "En pausa"
  },
  {
    nombre: "Bot Mágico",
    descripcion: "Bot de WhatsApp para pedidos.",
    estado: "En progreso"
  },
  {
    nombre: "Bot BTC",
    descripcion: "Bot y notebook de trading de Bitcoin.",
    estado: "En pausa"
  },
  {
    nombre: "RPG C++",
    descripcion: "Juego RPG en C++.",
    estado: "En pausa"
  },
  {
    nombre: "Negocios Holguín",
    descripcion: "APK de directorio de negocios.",
    estado: "Completado"
  },
  {
    nombre: "Choferes",
    descripcion: "App de taxis y choferes.",
    estado: "En pausa"
  }
];
