import Ilustracion from "@/components/Ilustracion";

/*
  Se muestra cuando el código de la URL no corresponde a ningún invitado.
  Vive en la raíz de app/, así que cubre también cualquier otra ruta
  inexistente.
*/
export default function InvitacionNoValida() {
  return (
    <main className="frame flex min-h-screen flex-col items-center justify-center px-8 text-center">
      <Ilustracion
        src="/images/logos/monograma.png"
        alt="Monograma de Sebastián y Johana"
        w={101}
        h={115}
        priority
      />

      <h1
        className="t-script mt-[24px] leading-none"
        style={{ fontSize: 35, color: "#9e9674" }}
      >
        Invitación no válida
      </h1>

      <p
        className="t-parrafo mt-[22px]"
        style={{ fontSize: 9, color: "rgb(113 103 53 / 0.7)" }}
      >
        Este enlace no corresponde a ninguna invitación.
        <br />
        Revisá que esté completo o pedile
        <br />a los novios que te lo reenvíen.
      </p>
    </main>
  );
}
