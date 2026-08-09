import Ilustracion from "@/components/Ilustracion";

const LINEA = "#a48a77";
const TEXTO = "rgb(118 107 58 / 0.7)";

type Hito = {
  src: string;
  alt: string;
  /* Tamaño al que se muestra, tomado del diseño */
  w: number;
  h: number;
  hora: string;
  evento: string;
  iconoIzquierda: boolean;
};

function Icono({ hito }: { hito: Hito }) {
  return (
    <Ilustracion src={hito.src} alt={hito.alt} w={hito.w} h={hito.h} />
  );
}

const HITOS: Hito[] = [
  {
    src: "/images/logos/FotoLugar.png",
    alt: "Kiosco de la ceremonia",
    w: 70,
    h: 53,
    hora: "5:30 PM",
    evento: "Ceremonia",
    iconoIzquierda: true,
  },
  {
    src: "/images/logos/image 13.png",
    alt: "Reloj sobre un plato",
    w: 58,
    h: 57,
    hora: "6:30 PM",
    evento: "Hora de comer",
    iconoIzquierda: false,
  },
  {
    src: "/images/logos/image 14.png",
    alt: "Copas brindando",
    w: 71,
    h: 58,
    hora: "8:30 PM",
    evento: "Coctel / Brindis",
    iconoIzquierda: true,
  },
  {
    src: "/images/logos/image 15.png",
    alt: "Pareja bailando",
    w: 63,
    h: 57,
    hora: "9:00 PM",
    evento: "¡A bailar todos!",
    iconoIzquierda: false,
  },
  {
    src: "/images/logos/image 16.png",
    alt: "Auto de recién casados",
    w: 77,
    h: 50,
    hora: "10:30 PM",
    evento: "Nos vamos ...",
    iconoIzquierda: true,
  },
];

function Texto({ hito }: { hito: Hito }) {
  return (
    <p
      className="t-body uppercase"
      style={{ fontSize: 10, lineHeight: "13px", color: TEXTO }}
    >
      {hito.hora}
      <br />
      {hito.evento}
    </p>
  );
}

/* PENDIENTE: el mt-[60px] es provisional, falta la separación desde "Lluvia de sobres". */
export default function Itinerario() {
  return (
    <section className="mt-[60px] flex flex-col items-center">
      <h2
        className="t-script leading-none"
        style={{ fontSize: 35, color: "#9e9674" }}
      >
        Itinerario
      </h2>

      {/* Título -> primer hito: 15px */}
      <div className="relative mt-[15px] w-full">
        {/* Línea central de 321px con sus topes de 15px arriba y abajo */}
        <div
          className="absolute top-0 left-1/2 h-[321px] w-px -translate-x-1/2"
          style={{ backgroundColor: LINEA }}
          aria-hidden="true"
        >
          <span
            className="absolute top-0 left-1/2 h-px w-[15px] -translate-x-1/2"
            style={{ backgroundColor: LINEA }}
          />
          <span
            className="absolute bottom-0 left-1/2 h-px w-[15px] -translate-x-1/2"
            style={{ backgroundColor: LINEA }}
          />
        </div>

        {/* Entre hitos: 10px. A cada lado de la línea: 10px */}
        <div className="flex flex-col gap-[10px]">
          {HITOS.map((hito) =>
            hito.iconoIzquierda ? (
              <div key={hito.hora} className="grid grid-cols-2 items-center">
                <div className="flex justify-end pr-[10px]">
                  <Icono hito={hito} />
                </div>
                <div className="pl-[10px] text-left">
                  <Texto hito={hito} />
                </div>
              </div>
            ) : (
              <div key={hito.hora} className="grid grid-cols-2 items-center">
                <div className="pr-[10px] text-right">
                  <Texto hito={hito} />
                </div>
                <div className="flex justify-start pl-[10px]">
                  <Icono hito={hito} />
                </div>
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
