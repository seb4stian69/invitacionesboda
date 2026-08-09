import type { Metadata, Viewport } from "next";
import { Great_Vibes, Gulzar } from "next/font/google";
import "./globals.css";

const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-great-vibes",
  display: "swap",
});

const gulzar = Gulzar({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-gulzar",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Johana & Sebastián · 09.10.2026",
  description:
    "Nos casamos el viernes 9 de octubre de 2026 en Canasto Picnic, Sincelejo. Acompáñanos a celebrar.",
  openGraph: {
    title: "Johana & Sebastián · 09.10.2026",
    description: "Acompáñanos a celebrar nuestro amor.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#faf6ec",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${greatVibes.variable} ${gulzar.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
