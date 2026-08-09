"use client";

import { useEffect, useRef, useState } from "react";

/*
  Revela su contenido cuando entra en pantalla, con una aparición suave
  y un leve desplazamiento hacia arriba. Solo se dispara una vez: al
  hacerse visible deja de observarse, así el contenido no vuelve a
  desaparecer si el usuario sube de nuevo.
*/
export default function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  /* Retardo en milisegundos, para escalonar elementos vecinos */
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const elemento = ref.current;
    if (!elemento) return;

    /* Navegadores sin soporte: mostrar sin animar */
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observador = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          if (entrada.isIntersecting) {
            setVisible(true);
            observador.unobserve(entrada.target);
          }
        }
      },
      /*
        Se dispara cuando asoma un 10% del bloque, descontando un 8% de
        la parte baja de la pantalla para que la animación no arranque
        justo en el borde y se sienta más natural.
      */
      { threshold: 0.1, rootMargin: "0px 0px -8% 0px" },
    );

    observador.observe(elemento);
    return () => observador.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "reveal-visible" : ""} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
