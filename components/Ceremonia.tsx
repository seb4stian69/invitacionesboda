import Boton from "@/components/Boton";
import Ilustracion from "@/components/Ilustracion";

const MAPA = "https://maps.app.goo.gl/3HSu2PP3mCoKhfFA8";

export default function Ceremonia() {
  return (
    <section className="flex flex-col items-center text-center">
      {/* Bloque de fecha -> título: 70px */}
      <h2
        className="t-script mt-[70px] leading-none"
        style={{ fontSize: 33, color: "#9e9674" }}
      >
        Ceremonia &amp; Recepción
      </h2>

      {/* Título -> ilustración: 20px */}
      <Ilustracion
        src="/images/logos/FotoLugar.png"
        alt="Ilustración del kiosco de Canasto Picnic"
        w={140}
        h={105}
        className="mt-[20px]"
      />

      {/* Ilustración -> botón: 10px */}
      <Boton href={MAPA} ancho={83} className="mt-[10px]">
        Ver mapa
      </Boton>

      <p
        className="t-parrafo mt-[20px]"
        style={{ fontSize: 10, lineHeight: "17px", color: "#ad8f7c" }}
      >
        Canasto Picnic
        <br />
        Sincelejo, Sucre
        <br />
        4:30 PM
      </p>
    </section>
  );
}
