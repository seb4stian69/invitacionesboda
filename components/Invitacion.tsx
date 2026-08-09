import Contador from "@/components/Contador";

const OLIVA = "rgb(118 107 58 / 0.7)";
const PARRAFO = "rgb(113 103 53 / 0.7)";
const FECHA = "rgb(173 143 124 / 0.7)";
const LINEA = "rgb(164 138 119 / 0.7)";

/*
  Cada extremo del bloque de fecha es un "sándwich": línea, palabra, línea.
  El alto fijo hace que las reglas caigan a la altura del 09.
*/
function Extremo({ texto }: { texto: string }) {
  return (
    <div className="flex h-[24px] w-[80px] flex-col justify-between"  style={{ marginTop: -10 }}>
      <span className="h-px w-full" style={{ backgroundColor: LINEA }} />
      <span
        className="t-body mt-[4px] text-center leading-none"
        style={{ fontSize: 10, letterSpacing: "0.16em", color: FECHA }}
      >
        {texto}
      </span>
      <span className="h-px w-full" style={{ backgroundColor: LINEA }} />
    </div>
  );
}

export default function Invitacion() {
  return (
    <section className="flex flex-col items-center text-center">
      {/* Eclesiastés -> nombres: 55px. Entre líneas de nombres: 15px */}
      <div
        className="t-body mt-[55px] flex flex-col gap-[15px] leading-none"
        style={{ fontSize: 25, color: OLIVA }}
      >
        <span>Johana Vasquez Estrada</span>
        <span>&amp;</span>
        <span>Sebastian Santis Hernandez</span>
      </div>

      {/* Nombres -> párrafo: 50px */}
      <p className="t-parrafo mt-[50px]" style={{ fontSize: 9, color: PARRAFO }}>
        Con enorme alegría en nuestros corazones,
        <br />
        queremos invitarte a ser parte de uno de los
        <br />
        días más especiales de nuestras vidas.
        <br />
        Acompáñanos a celebrar nuestro amor y el
        <br />
        inicio de esta nueva historia que soñamos
        <br />
        compartir junto a quienes más queremos.
      </p>

      {/* Párrafo -> bloque de fecha: 13px */}
      <div className="mt-[13px] flex flex-col items-center">
        <span
          className="t-body mb-[12px] leading-none"
          style={{ fontSize: 10, letterSpacing: "0.16em", color: FECHA, marginTop: 10 }}
        >
          OCTUBRE
        </span>

        <div className="flex items-center justify-center">
          <Extremo texto="VIERNES" />
          <span
            className="t-body mx-[14px] leading-none"
            style={{ fontSize: 40, color: FECHA }}
          >
            09
          </span>
          <Extremo texto="2026" />
        </div>
      </div>

      {/* Cuenta regresiva, calculada con el reloj de quien abre la invitación */}
      <div className="mt-[26px]">
        <Contador />
      </div>
    </section>
  );
}
