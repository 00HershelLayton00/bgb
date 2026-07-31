import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BGB Tech | Tecnologia premium para negocios",
  description:
    "Landing page premium para BGB Tech con servicios de apps, web, software, IA en WhatsApp e Instagram, instalacion de sistemas y soporte tecnico."
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
