import dynamic from "next/dynamic";
import Precarga from "@/components/Precarga";
import type { Invitado } from "@/data/invitados";

/*
  Cada sección se carga en su propio chunk en vez de ir en el bundle
  principal. `Precarga` precarga estos mismos módulos antes de revelar
  la página, así que para cuando React los pide ya están descargados y
  esto no añade una espera adicional en pantalla.
*/
const Hero = dynamic(() => import("@/components/Hero"));
const Flor = dynamic(() => import("@/components/Flor"));
const Portada = dynamic(() => import("@/components/Portada"));
const Reproductor = dynamic(() => import("@/components/Reproductor"));
const Invitacion = dynamic(() => import("@/components/Invitacion"));
const Ceremonia = dynamic(() => import("@/components/Ceremonia"));
const Rsvp = dynamic(() => import("@/components/Rsvp"));
const Sobres = dynamic(() => import("@/components/Sobres"));
const Itinerario = dynamic(() => import("@/components/Itinerario"));
const Cierre = dynamic(() => import("@/components/Cierre"));
const Reveal = dynamic(() => import("@/components/Reveal"));

/* Estructura completa de la invitación, siempre ligada a un invitado. */
export default function PaginaInvitacion({ invitado }: { invitado: Invitado }) {
  return (
    <Precarga>
      <main>
        {/*
          El hero va fuera de la columna para ocupar todo el ancho, y sin
          animación: es lo primero que se ve, no tiene sentido revelarlo.
        */}
        <Hero />

        <div className="frame">
          {/*
            Ramo superior: 13px por debajo del hero y metido 62px hacia la
            izquierda.

            El `min` hace que, al ensanchar la ventana, se vaya destapando
            la parte escondida: mientras el margen de papel es menor a
            62px manda el -62px del diseño; cuando lo supera, el ramo se
            ancla al borde de la pantalla en vez de quedar flotando.
          */}
          <Flor
            w={120}
            h={424}
            style={{
              top: 13,
              left: "min(-62px, calc((var(--frame) - 100vw) / 2))",
            }}
          />

          <Reveal>
            <Portada />
          </Reveal>

          {/* Control de la canción, entre el versículo y los nombres */}
          <Reveal className="mt-[40px]">
            <Reproductor />
          </Reveal>
          <Reveal>
            <Invitacion />
          </Reveal>
          <Reveal>
            <Ceremonia />
          </Reveal>
          <Reveal>
            <Rsvp invitado={invitado} />
          </Reveal>
          <Reveal>
            <Sobres />
          </Reveal>
          <Reveal>
            <Itinerario />
          </Reveal>
        </div>

        {/* Igual que el hero: fuera de la columna para llegar a los bordes */}
        <Reveal>
          <Cierre />
        </Reveal>
      </main>
    </Precarga>
  );
}
