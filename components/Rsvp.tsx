import Boton from "@/components/Boton";
import type { Invitado } from "@/data/invitados";

/*
  PENDIENTE DE CONFIRMAR: número de WhatsApp que recibe las confirmaciones.
  Formato wa.me: indicativo + número, sin espacios ni signos.
*/
const WHATSAPP = "573007625809";

function mensaje(invitado: Invitado): string {
  return encodeURIComponent(
    `¡Hola! Somos ${invitado.ref}. Confirmamos nuestra asistencia a la boda de Johana y Sebastián el 9 de octubre de 2026. Contamos con ${invitado.cupos} cupos.`,
  );
}

export default function Rsvp({ invitado }: { invitado: Invitado }) {
  return (
    <section className="flex flex-col items-center text-center">
      {/* Dirección -> título: 40px */}
      <h2
        className="t-script mt-[40px] leading-none"
        style={{ fontSize: 35, color: "#9e9674" }}
      >
        R.S.V.P
      </h2>

      {/* Título -> botón: 10px */}
      <Boton
        href={`https://wa.me/${WHATSAPP}?text=${mensaje(invitado)}`}
        ancho={145}
        className="mt-[10px]"
      >
        Confirmar asistencia
      </Boton>

      {/* Botón -> bloque: 40px. Las líneas se separan con el interlineado de 38px */}
      <p
        className="t-body mt-[70px]"
        style={{
          fontSize: 25,
          lineHeight: "38px",
          color: "rgb(118 107 58 / 0.7)",
        }}
      >
        {invitado.ref}
        <br />
        Cupos Disponibles
        <br />({invitado.cupos})
      </p>
    </section>
  );
}
