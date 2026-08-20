"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { useAudio } from "@/components/AudioContexto";

const TITULO = "Dos oruguitas";
const ARTISTA = "Sebastián Yatra";

/* Segundos que saltan los botones laterales */
const SALTO = 10;

function mmss(segundos: number): string {
  if (!Number.isFinite(segundos) || segundos < 0) return "0:00";
  const min = Math.floor(segundos / 60);
  const seg = Math.floor(segundos % 60);
  return `${min}:${String(seg).padStart(2, "0")}`;
}

function Icono({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export default function Reproductor() {
  const audioRef = useAudio();
  const [sonando, setSonando] = useState(false);
  const [tiempo, setTiempo] = useState(0);
  const [duracion, setDuracion] = useState(0);
  const [repitiendo, setRepitiendo] = useState(true);

  /*
    El audio puede estar sonando desde antes de que este componente se
    monte (la música arranca con el primer scroll), así que primero se
    lee su estado actual y después se escuchan los cambios.
  */
  useEffect(() => {
    const audio = audioRef?.current;
    if (!audio) return;

    const alReproducir = () => setSonando(true);
    const alPausar = () => setSonando(false);
    const alAvanzar = () => setTiempo(audio.currentTime);
    const alMedir = () => setDuracion(audio.duration || 0);

    setSonando(!audio.paused);
    setTiempo(audio.currentTime);
    setDuracion(audio.duration || 0);
    setRepitiendo(audio.loop);

    audio.addEventListener("play", alReproducir);
    audio.addEventListener("pause", alPausar);
    audio.addEventListener("timeupdate", alAvanzar);
    audio.addEventListener("loadedmetadata", alMedir);
    audio.addEventListener("durationchange", alMedir);

    return () => {
      audio.removeEventListener("play", alReproducir);
      audio.removeEventListener("pause", alPausar);
      audio.removeEventListener("timeupdate", alAvanzar);
      audio.removeEventListener("loadedmetadata", alMedir);
      audio.removeEventListener("durationchange", alMedir);
    };
  }, [audioRef]);

  function alternar() {
    const audio = audioRef?.current;
    if (!audio) return;
    if (audio.paused) void audio.play().catch(() => {});
    else audio.pause();
  }

  function mover(segundos: number) {
    const audio = audioRef?.current;
    if (!audio) return;
    const destino = Math.min(
      Math.max(audio.currentTime + segundos, 0),
      audio.duration || 0,
    );
    audio.currentTime = destino;
    setTiempo(destino);
  }

  function reiniciar() {
    const audio = audioRef?.current;
    if (!audio) return;
    audio.currentTime = 0;
    setTiempo(0);
  }

  function alternarRepeticion() {
    const audio = audioRef?.current;
    if (!audio) return;
    audio.loop = !audio.loop;
    setRepitiendo(audio.loop);
  }

  function buscar(evento: React.ChangeEvent<HTMLInputElement>) {
    const audio = audioRef?.current;
    const destino = Number(evento.target.value);
    setTiempo(destino);
    if (audio) audio.currentTime = destino;
  }

  const avance = duracion > 0 ? (tiempo / duracion) * 100 : 0;

  return (
    <section className="reproductor">
      <p className="reproductor-titulo t-script">{TITULO}</p>
      <p className="reproductor-artista t-body">{ARTISTA}</p>

      <input
        className="reproductor-barra"
        type="range"
        min={0}
        max={duracion || 0}
        step={0.1}
        value={tiempo}
        onChange={buscar}
        aria-label="Avance de la canción"
        style={{ "--avance": `${avance}%` } as CSSProperties}
      />

      <div className="reproductor-tiempos t-body">
        <span>{mmss(tiempo)}</span>
        <span>{mmss(duracion)}</span>
      </div>

      <div className="reproductor-controles">
        <button
          type="button"
          className="reproductor-boton"
          onClick={reiniciar}
          aria-label="Volver al inicio"
        >
          <Icono>
            <path d="M3 12a9 9 0 1 0 3-6.7" />
            <path d="M3 4v5h5" />
          </Icono>
        </button>

        <button
          type="button"
          className="reproductor-boton"
          onClick={() => mover(-SALTO)}
          aria-label={`Retroceder ${SALTO} segundos`}
        >
          <Icono>
            <path d="M11 6 4 12l7 6V6Z" fill="currentColor" />
            <path d="M20 6l-7 6 7 6V6Z" fill="currentColor" />
          </Icono>
        </button>

        <button
          type="button"
          className="reproductor-play"
          onClick={alternar}
          aria-label={sonando ? "Pausar la música" : "Reproducir la música"}
        >
          {sonando ? (
            <Icono>
              <path d="M9.5 5v14M14.5 5v14" strokeWidth="2" />
            </Icono>
          ) : (
            <Icono>
              <path d="M8 5.5v13l11-6.5-11-6.5Z" fill="currentColor" />
            </Icono>
          )}
        </button>

        <button
          type="button"
          className="reproductor-boton"
          onClick={() => mover(SALTO)}
          aria-label={`Adelantar ${SALTO} segundos`}
        >
          <Icono>
            <path d="M13 6l7 6-7 6V6Z" fill="currentColor" />
            <path d="M4 6l7 6-7 6V6Z" fill="currentColor" />
          </Icono>
        </button>

        <button
          type="button"
          className={`reproductor-boton ${repitiendo ? "" : "reproductor-apagado"}`}
          onClick={alternarRepeticion}
          aria-label="Repetir la canción"
          aria-pressed={repitiendo}
        >
          <Icono>
            <path d="M17 2l4 4-4 4" />
            <path d="M3 11V9a4 4 0 0 1 4-4h14" />
            <path d="M7 22l-4-4 4-4" />
            <path d="M21 13v2a4 4 0 0 1-4 4H3" />
          </Icono>
        </button>
      </div>
    </section>
  );
}
