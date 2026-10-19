import "@fontsource-variable/dm-sans";
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource/cormorant-garamond/600.css";
import "@fontsource/cormorant-garamond/600-italic.css";
import { salon } from "@/content/salon";
import type { Metadata } from "next";
import "./globals.css";

const localBusinessLabel = `${salon.location.city}, ${salon.location.province}`;

export const metadata: Metadata = {
  title: `${salon.name} | Peluquería en ${salon.location.city}`,
  description:
    `Conocé los servicios de ${salon.name} en ${localBusinessLabel}. Consultas y turnos por WhatsApp.`,
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
  openGraph: {
    title: `${salon.name} | Peluquería en ${salon.location.city}`,
    description:
      `Servicios de peluquería en ${localBusinessLabel}. Consultas y turnos por WhatsApp.`,
    locale: "es_AR",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-AR">
      <body>{children}</body>
    </html>
  );
}
