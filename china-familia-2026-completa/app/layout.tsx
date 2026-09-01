import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "China 2026 · Plan familiar interactivo",
  description: "Comparador de hoteles, transporte, atracciones, presupuesto y reservas para un viaje familiar a China en 2026.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased">{children}</body>
    </html>
  );
}
