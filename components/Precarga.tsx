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
  fotos que se ven sin hacer scroll y la música están listas. No se
  abre sola: pide un clic (el gesto real que más adelante deja que el
  navegador permita el sonido) y solo con ese clic arranca la pequeña
  animación de apertura. La música en sí espera al primer scroll de
  ahí en adelante, no al clic.
*/
export default function Precarga({ children }: { children: React.ReactNode }) {
  const [cargado, setCargado] = useState(false);
  const [abierta, setAbierta] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    let cancelado = false;
    const audio = audioRef.current;

    /* Volumen por defecto: que suene de fondo, no por encima de todo. */
    if (audio) audio.volume = 0.4;

    Promise.all([
      ...MODULOS.map((cargar) => cargar()),
      ...IMAGENES.map(precargarImagen),
      audio ? esperarAudio(audio) : Promise.resolve(),
    ]).then(() => {
      if (!cancelado) setCargado(true);
    });

    return () => {
      cancelado = true;
    };
  }, []);

  useEffect(() => {
    /*
      Bloquea el scroll mientras se pide el clic de apertura: así el
      "primer scroll" que arranca la música es siempre el que hace el
      usuario ya dentro de la invitación, no uno perdido durante la
      carga. Solo corre en cliente, así que sin JS el body nunca se
      bloquea.
    */
    document.body.style.overflowY = abierta ? "" : "hidden";
    return () => {
      document.body.style.overflowY = "";
    };
  }, [abierta]);

  return (
    <>
      <div
        className={`precarga-overlay ${abierta ? "precarga-oculta" : ""}`}
        aria-hidden={abierta}
      >
        {cargado ? (
          <button
            type="button"
            className="precarga-texto"
            onClick={() => setAbierta(true)}
          >
            Toca para abrir
          </button>
        ) : (
          <span className="precarga-texto">Cargando…</span>
        )}

        <span
          className={`t-script precarga-marca ${cargado ? "precarga-marca-oculta" : ""}`}
        >
          Johana &amp; Sebastián
        </span>
      </div>

      <div className={`precarga-contenido ${abierta ? "precarga-lista" : ""}`}>
        {children}
      </div>

      <audio ref={audioRef} src={CANCION} loop preload="auto" />
      <MusicaFondo audioRef={audioRef} armado={abierta} />
    </>
  );
}
