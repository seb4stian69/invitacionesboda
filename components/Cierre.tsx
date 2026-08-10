import Image from "next/image";

/*
  La acuarela se ajusta al ancho de la columna. El versículo va
  superpuesto: su caja baja unos píxeles por debajo del borde de la
  acuarela, que al tener el borde inferior roto hace que se lea como si
  estuviera apoyado encima.
*/
export default function Cierre() {
  return (
    <section className="relative mt-[63px] pb-[30px]">
      {/*
        Ocupa todo el ancho de la pantalla, de borde a borde. El tamaño
        real (974x705) se declara solo para fijar la proporción; `sizes`
        le indica a Next que ocupa el ancho completo para que elija la
        resolución adecuada en cada dispositivo.
      */}
      <Image
        src="/images/logos/image 13 (1).png"
        alt="Acuarela de la terraza"
        width={974}
        height={705}
        quality={90}
        sizes="100vw"
        className="h-auto w-full"
      />

      <span
        className="t-script absolute right-[30px] bottom-[15px] leading-none"
        style={{ fontSize: 24, color: "#9e9674" }}
      >
        Jeremías 29:11
      </span>
    </section>
  );
}
