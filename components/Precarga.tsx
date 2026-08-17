"use client";

import { useEffect, useRef, useState } from "react";
import MusicaFondo from "@/components/MusicaFondo";

const CANCION = "/audio/cancion.mp3";

/*
  Mismos módulos que PaginaInvitacion carga con next/dynamic: se
  precargan aquí para que, cuando React los pida, el chunk ya esté
  descargado y la invitación no se revele a medio construir.
*/
const MODULOS = [
  () => import("@/components/Hero"),
  () => import("@/components/Flor"),
  () => import("@/components/Portada"),
  () => import("@/components/Invitacion"),
  () => import("@/components/Ceremonia"),
  () => import("@/components/Rsvp"),
  () => import("@/components/Sobres"),
  () => import("@/components/Itinerario"),
  () => import("@/components/Cierre"),
  () => import("@/components/Reveal"),
];

/* Fotos que se ven sin necesidad de bajar la página. */
const IMAGENES = [
  "/images/logos/InitialBG-1.png",
  "/images/logos/InitialBG-2.png",
  "/images/logos/monograma.png",
];

function precargarImagen(src: string): Promise<void> {
  return new Promise((resolve) => {
    const img = new window.Image();
    img.onload = () => resolve();
    img.onerror = () => resolve();
    img.src = src;
  });
}

function esperarAudio(audio: HTMLAudioElement): Promise<void> {
  return new Promise((resolve) => {
    if (audio.readyState >= 4) {
      resolve();
      return;
    }
    audio.addEventListener("canplaythrough", () => resolve(), { once: true });
    audio.addEventListener("error", () => resolve(), { once: true });
  });
}

/*
  Pantalla de carga que tapa la invitación hasta que las secciones, las
  fotos que se ven sin hacer scroll y la música están listas. Así el
  scroll arranca con la experiencia completa, música incluida, en vez
  de ir completándose a medida que el usuario avanza.
*/
export default function Precarga({ children }: { children: React.ReactNode }) {
  const [lista, setLista] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    let cancelado = false;
    const audio = audioRef.current;

    Promise.all([
      ...MODULOS.map((cargar) => cargar()),
      ...IMAGENES.map(precargarImagen),
      audio ? esperarAudio(audio) : Promise.resolve(),
    ]).then(() => {
      if (!cancelado) setLista(true);
    });

    return () => {
      cancelado = true;
    };
  }, []);

  return (
    <>
      {/*
        Bajo `.js` es donde se oculta esta pantalla; sin JavaScript
        `lista` nunca cambia de `false`, así que si el ocultamiento no
        dependiera de esa clase la invitación quedaría cubierta para
        siempre. Ver el mismo razonamiento en `.reveal` (globals.css).
      */}
      <div
        className={`precarga-overlay ${lista ? "precarga-oculta" : ""}`}
        aria-hidden={lista}
      >
        <span className="t-script" style={{ fontSize: 32, color: "#9e9674" }}>
          Johana &amp; Sebastián
        </span>
      </div>

      <div className={`precarga-contenido ${lista ? "precarga-lista" : ""}`}>
        {children}
      </div>

      <audio ref={audioRef} src={CANCION} loop preload="auto" />
      <MusicaFondo audioRef={audioRef} activar={lista} />
    </>
  );
}
