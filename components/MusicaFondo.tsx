"use client";

import { useEffect, type RefObject } from "react";

/*
  Solo maneja cuándo suena, no el elemento <audio> en sí: lo monta
  `Precarga`, que necesita esa misma referencia para esperar a que la
  canción esté lista antes de revelar la página. Tener un único
  elemento evita descargar el mp3 dos veces.

  El primer scroll es el disparador principal, pero Chrome no siempre
  lo cuenta como gesto válido para permitir sonido: si el navegador
  rechaza el play(), se reintenta con el siguiente toque, clic o tecla
  en vez de quedarse en silencio para siempre.
*/
export default function MusicaFondo({
  audioRef,
  activar,
}: {
  audioRef: RefObject<HTMLAudioElement | null>;
  activar: boolean;
}) {
  useEffect(() => {
    if (!activar) return;
    const audio = audioRef.current;
    if (!audio) return;

    let sonando = false;

    const intentarReproducir = () => {
      if (sonando) return;
      audio
        .play()
        .then(() => {
          sonando = true;
          desuscribir();
        })
        .catch(() => {
          /* Bloqueado por el navegador: se reintenta con el próximo gesto */
        });
    };

    const eventos = ["scroll", "touchstart", "pointerdown", "keydown"] as const;
    const desuscribir = () => {
      for (const evento of eventos) {
        window.removeEventListener(evento, intentarReproducir);
      }
    };

    for (const evento of eventos) {
      window.addEventListener(evento, intentarReproducir, { passive: true });
    }

    return desuscribir;
  }, [audioRef, activar]);

  return null;
}
