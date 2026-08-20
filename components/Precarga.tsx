"use client";

import { useEffect, useRef, useState } from "react";
import MusicaFondo from "@/components/MusicaFondo";
import { ProveedorAudio } from "@/components/AudioContexto";

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
  () => import("@/components/Reproductor"),
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
  const [pidiendoVolumen, setPidiendoVolumen] = useState(false);
  const [abierta, setAbierta] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    let cancelado = false;
    const audio = audioRef.current;

    /*
      No hay forma de leer el volumen real del dispositivo desde la
      web: por privacidad, ningún navegador expone esa información. Se
      deja alto porque, aun con el volumen del celular al máximo, un
      volumen bajo acá se escuchaba casi nada.
    */
    if (audio) audio.volume = 0.8;

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

  function avanzar() {
    if (pidiendoVolumen) {
      setAbierta(true);
    } else {
      setPidiendoVolumen(true);
    }
  }

  return (
    <>
      {/*
        Primer clic: pide subir el volumen (no hay forma de verificarlo,
        solo de pedirlo). Segundo clic: recién ahí se abre la
        invitación. Todo el overlay es el objetivo, no solo las letras.
      */}
      <div
        className={`precarga-overlay ${abierta ? "precarga-oculta" : ""} ${cargado ? "precarga-clicable" : ""}`}
        aria-hidden={abierta}
        role={cargado ? "button" : undefined}
        tabIndex={cargado ? 0 : undefined}
        onClick={cargado ? avanzar : undefined}
        onKeyDown={
          cargado
            ? (evento) => {
                if (evento.key === "Enter" || evento.key === " ") {
                  evento.preventDefault();
                  avanzar();
                }
              }
            : undefined
        }
      >
        {pidiendoVolumen ? (
          <div className="precarga-volumen">
            <p className="t-parrafo" style={{ color: "rgb(113 103 53 / 0.7)" }}>
              Sube el volumen de tu celular
              <br />
              para disfrutar la música
            </p>
            <span className="precarga-texto">Toca para continuar</span>
          </div>
        ) : (
          <span className="precarga-texto">
            {cargado ? "Toca para abrir" : "Cargando…"}
          </span>
        )}

        <span
          className={`t-script precarga-marca ${cargado ? "precarga-marca-oculta" : ""}`}
        >
          Johana &amp; Sebastián
        </span>
      </div>

      <div className={`precarga-contenido ${abierta ? "precarga-lista" : ""}`}>
        <ProveedorAudio audioRef={audioRef}>{children}</ProveedorAudio>
      </div>

      <audio ref={audioRef} src={CANCION} loop preload="auto" />
      <MusicaFondo audioRef={audioRef} armado={abierta} />
    </>
  );
}
