import Ilustracion from "@/components/Ilustracion";

/*
  Espaciados tomados del diseño:
  hero -> nombres 30px | nombres -> monograma 14px | monograma -> fecha 20px
  fecha -> versículo 25px | versículo -> referencia 15px
*/
export default function Portada() {
  return (
    <section className="flex flex-col items-center pt-[45px] text-center">
      <h1
        className="t-script t-dorado leading-none"
        style={{ fontSize: 47 }}
      >
        Johana &amp; Sebastian
      </h1>

      <Ilustracion
        src="/images/logos/monograma.png"
        alt="Monograma de Sebastián y Johana"
        w={101}
        h={118}
        priority
        className="mt-[14px]"
      />

      <p
        className="t-body t-dorado leading-none"
        style={{ fontSize: 17, marginTop: 20 }}
      >
        09 - 10 - 2026
      </p>

      {/* Los saltos son explícitos para respetar el corte de línea del diseño */}
      <p
        className="t-parrafo mt-[25px]"
        style={{ fontSize: 9, color: "rgb(113 103 53 / 0.7)" }}
      >
        Uno solo puede ser vencido, pero dos
        <br />
        pueden resistir. ¡La cuerda de tres
        <br />
        hilos no se rompe fácilmente!
      </p>

      {/* Mantiene el trazo más grueso, pero aclarado con alfa para que no pese más que el versículo */}
      <p
        className="t-parrafo t-recio mt-[15px]"
        style={{ color: "rgb(113 103 53 / 0.7)" }}
      >
        Eclesiastés 4:12
      </p>
    </section>
  );
}
