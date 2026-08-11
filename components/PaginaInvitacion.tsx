import Ceremonia from "@/components/Ceremonia";
import Cierre from "@/components/Cierre";
import Flor from "@/components/Flor";
import Hero from "@/components/Hero";
import Invitacion from "@/components/Invitacion";
import Itinerario from "@/components/Itinerario";
import Portada from "@/components/Portada";
import Reveal from "@/components/Reveal";
import Rsvp from "@/components/Rsvp";
import Sobres from "@/components/Sobres";
import type { Invitado } from "@/data/invitados";

/* Estructura completa de la invitación, siempre ligada a un invitado. */
export default function PaginaInvitacion({ invitado }: { invitado: Invitado }) {
  return (
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
  );
}
