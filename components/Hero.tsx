"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

/* Las dos fotos miden 1097x1600 y traen la curva inferior ya recortada. */
const FOTOS = [
  "/images/logos/InitialBG-1.png",
  "/images/logos/InitialBG-2.png",
];

const INTERVALO = 3500;
const FUNDIDO = 1000;

export default function Hero() {
  const [actual, setActual] = useState(0);

  useEffect(() => {
    /*
      Con "reducir movimiento" activado no se cicla: se queda en la
      primera foto. Un cambio automático y repetido es justo el tipo de
      efecto que molesta a quien activa esa preferencia.
    */
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = setInterval(
      () => setActual((i) => (i + 1) % FOTOS.length),
      INTERVALO,
    );
    return () => clearInterval(id);
  }, []);

  return (
    /*
      La proporción de la caja es la de las fotos, así que `object-cover`
      las encaja sin recortar nada y el alto sale solo del ancho.
    */
    <section className="relative w-full" style={{ aspectRatio: "1097 / 1600" }}>
      {FOTOS.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt=""
          fill
          /*
            Ambas con prioridad: si la segunda no estuviera cargada al
            cumplirse los 2.5s, el fundido llevaría a una imagen vacía.
          */
          priority
          sizes="100vw"
          quality={90}
          className="object-cover"
          style={{
            opacity: i === actual ? 1 : 0,
            transition: `opacity ${FUNDIDO}ms ease-in-out`,
          }}
        />
      ))}
    </section>
  );
}
