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
      /*
        El script de abajo agrega la clase `js` antes de que React
        hidrate, así que el className del servidor y el del cliente
        difieren a propósito. Sin esto, React lo reporta como error de
        hidratación.
      */
      suppressHydrationWarning
      className={`${greatVibes.variable} ${gulzar.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        {/*
          Marca que hay JavaScript disponible. El CSS de las animaciones
          solo oculta elementos bajo `.js`, de modo que si esto no llega
          a ejecutarse la invitación se ve completa igual.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('js')`,
          }}
        />
        {/*
          Lienzo del ancho de la ventana que recorta lo que sobresale a
          los lados. Tiene que ser un elemento normal: si el recorte se
          pone en <html>, el navegador lo traslada al viewport y el
          documento igual se ensancha por dentro, arrastrando el resto
          del contenido.
        */}
        <div className="lienzo">{children}</div>
      </body>
    </html>
  );
}
