import Boton from "@/components/Boton";
import Flor from "@/components/Flor";
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
      <div className="relative mt-[10px] flex w-full justify-center">
        <Boton
          href={`https://wa.me/${WHATSAPP}?text=${mensaje(invitado)}`}
          ancho={145}
        >
          Confirmar asistencia
        </Boton>

        {/*
          Ramo inferior: espejado y con su centro 29px por debajo del
          centro del botón. Este contenedor mide justo lo que el botón,
          así que `top: 50%` cae en su centro y el margen lo baja desde
          ahí.

          A 402px queda metido 56px, que es el 50% de sus 111px de
          ancho. Ese es el punto de partida: al ensanchar la ventana el
          `min` va destapando lo escondido, y cuando el margen de papel
          supera esos 56px el ramo se ancla al borde de la pantalla.
        */}
        <Flor
          w={111}
          h={424}
          espejada
          style={{
            top: "50%",
            right: "min(-56px, calc((var(--frame) - 100vw) / 2))",
            marginTop: 29,
            transform: "translateY(-50%)",
          }}
        />
      </div>

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
