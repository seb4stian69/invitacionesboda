"use client";

import { useEffect, useRef, type RefObject } from "react";

/*
  Solo maneja cuándo suena, no el elemento <audio> en sí: lo monta
  `Precarga`, que necesita esa misma referencia para esperar a que la
  canción esté lista antes de revelar la página. Tener un único
  elemento evita descargar el mp3 dos veces.

  Los listeners se enganchan desde el montaje, no cuando `listo` se
  vuelve true: la pantalla de carga no bloquea el scroll del documento,
  así que si se esperara a que todo cargara para escuchar el gesto, un
  scroll hecho mientras el mp3 (~5MB) todavía está bajando se perdía
  sin que quedara ningún scroll después para volver a dispararlo. Ahora
  el gesto se recuerda y, en cuanto `listo` se pone en true, se
  reproduce con ese gesto ya registrado.

  El primer scroll es el disparador principal, pero Chrome no siempre
  lo cuenta como gesto válido para permitir sonido: si el navegador
  rechaza el play(), se reintenta con el siguiente toque, clic o tecla
  en vez de quedarse en silencio para siempre.
*/
export default function MusicaFondo({
  audioRef,
  listo,
}: {
  audioRef: RefObject<HTMLAudioElement | null>;
  listo: boolean;
}) {
  const listoRef = useRef(listo);
  const gestoPendienteRef = useRef(false);
  const sonandoRef = useRef(false);
  const quitarRef = useRef<() => void>(() => {});

  useEffect(() => {
    listoRef.current = listo;
    if (listo && gestoPendienteRef.current && !sonandoRef.current) {
      reproducir();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listo]);

  function reproducir() {
    if (sonandoRef.current) return;
    const audio = audioRef.current;
    if (!audio) return;
    audio
      .play()
      .then(() => {
        sonandoRef.current = true;
        quitarRef.current();
      })
      .catch(() => {
        /* Bloqueado por el navegador: se reintenta con el próximo gesto */
      });
  }

  useEffect(() => {
    const eventos = ["scroll", "touchstart", "pointerdown", "keydown"] as const;

    const intentar = () => {
      gestoPendienteRef.current = true;
      if (listoRef.current) reproducir();
    };

    quitarRef.current = () => {
      for (const evento of eventos) window.removeEventListener(evento, intentar);
    };

    for (const evento of eventos) {
      window.addEventListener(evento, intentar, { passive: true });
    }

    return quitarRef.current;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
