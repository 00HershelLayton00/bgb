import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tecnología premium | BGB Tech",
  description:
    "Apps Android, páginas web, software de escritorio, IA para WhatsApp e Instagram, instalación de sistemas y soporte técnico. Haz que tu negocio se vea serio, moderno y listo para vender más."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
