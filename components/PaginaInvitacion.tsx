import Ceremonia from "@/components/Ceremonia";
import Cierre from "@/components/Cierre";
import Hero from "@/components/Hero";
import Invitacion from "@/components/Invitacion";
import Itinerario from "@/components/Itinerario";
import Portada from "@/components/Portada";
import Rsvp from "@/components/Rsvp";
import Sobres from "@/components/Sobres";
import type { Invitado } from "@/data/invitados";

/* Estructura completa de la invitación, siempre ligada a un invitado. */
export default function PaginaInvitacion({ invitado }: { invitado: Invitado }) {
  return (
    <main>
      {/* El hero va fuera de la columna para poder ocupar todo el ancho */}
      <Hero />

      <div className="frame">
        <Portada />
        <Invitacion />
        <Ceremonia />
        <Rsvp invitado={invitado} />
        <Sobres />
        <Itinerario />
      </div>

      {/* Igual que el hero: fuera de la columna para llegar a los bordes */}
      <Cierre />
    </main>
  );
}
