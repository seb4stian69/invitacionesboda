"use client";

import { createContext, useContext, type ReactNode, type RefObject } from "react";

/*
  El elemento <audio> lo monta `Precarga`, porque necesita esperar a que
  la canción esté lista antes de revelar la página. El reproductor vive
  mucho más abajo en el árbol, así que la referencia viaja por contexto
  en vez de por props: de otro modo habría que pasarla a mano por cada
  sección intermedia, o montar un segundo <audio> y descargar el mp3 dos
  veces.
*/
const AudioContexto = createContext<RefObject<HTMLAudioElement | null> | null>(
  null,
);

export function ProveedorAudio({
  audioRef,
  children,
}: {
  audioRef: RefObject<HTMLAudioElement | null>;
  children: ReactNode;
}) {
  return (
    <AudioContexto.Provider value={audioRef}>{children}</AudioContexto.Provider>
  );
}

export function useAudio() {
  return useContext(AudioContexto);
}
