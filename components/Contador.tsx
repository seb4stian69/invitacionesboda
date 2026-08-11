"use client";

import { useEffect, useState } from "react";

const FECHA = "rgb(173 143 124 / 0.7)";

/*
  Instante fijo de la boda: 9 de octubre de 2026, 4:30 PM hora de
  Colombia (-05:00). Se define con el desfase explícito para que sea el
  mismo momento real en cualquier parte del mundo; lo que aporta el
  cliente es su reloj, no su zona horaria.
*/
const OBJETIVO = new Date("2026-10-09T16:30:00-05:00").getTime();

type Restante = {
  dias: number;
  horas: number;
  minutos: number;
  segundos: number;
};

function calcular(): Restante {
  const restanteMs = Math.max(0, OBJETIVO - Date.now());
  const total = Math.floor(restanteMs / 1000);
  return {
    dias: Math.floor(total / 86400),
    horas: Math.floor((total % 86400) / 3600),
    minutos: Math.floor((total % 3600) / 60),
    segundos: total % 60,
  };
}

function Unidad({ valor, etiqueta }: { valor: string; etiqueta: string }) {
  return (
    <div className="flex flex-col items-center">
      <span
        className="t-body leading-none"
        style={{ fontSize: 26, color: FECHA }}
      >
        {valor}
      </span>
      <span
        className="t-body mt-[6px] leading-none"
        style={{ fontSize: 10, letterSpacing: "0.16em", color: FECHA }}
      >
        {etiqueta}
      </span>
    </div>
  );
}

export default function Contador() {
  /*
    Arranca en null para que el servidor y el primer render del cliente
    coincidan: si se calculara de entrada, el HTML del servidor traería
    una hora distinta a la del navegador y React avisaría de un desajuste
    de hidratación. Los guiones reservan el espacio y evitan que el
    contenido salte cuando aparecen los números.
  */
  const [restante, setRestante] = useState<Restante | null>(null);

  useEffect(() => {
    setRestante(calcular());
    const id = setInterval(() => setRestante(calcular()), 1000);
    return () => clearInterval(id);
  }, []);

  const dosDigitos = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="flex items-start justify-center gap-[26px]">
      <Unidad
        valor={restante ? String(restante.dias) : "--"}
        etiqueta="DÍAS"
      />
      <Unidad
        valor={restante ? dosDigitos(restante.horas) : "--"}
        etiqueta="HORAS"
      />
      <Unidad
        valor={restante ? dosDigitos(restante.minutos) : "--"}
        etiqueta="MIN"
      />
      <Unidad
        valor={restante ? dosDigitos(restante.segundos) : "--"}
        etiqueta="SEG"
      />
    </div>
  );
}
