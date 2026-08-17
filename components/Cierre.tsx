import Image from "next/image";

/*
  La acuarela se ajusta al ancho de la pantalla y ya trae los ramos
  incorporados. El versículo va superpuesto: su caja baja unos píxeles
  por debajo del borde de la acuarela, que al tener el borde inferior
  roto hace que se lea como si estuviera apoyado encima.

  El margen inferior negativo recorta las 37 filas transparentes con las
  que termina el PNG, que ocupaban espacio sin mostrar nada. Va en
  porcentaje —37 de los 1223px de ancho del archivo— porque los márgenes
  en porcentaje se calculan sobre el ancho del contenedor, que acá es el
  mismo ancho de la imagen; así el recorte acompaña a la ilustración a
  cualquier tamaño de pantalla.
*/
export default function Cierre() {
  return (
    <section className="relative mt-[63px]" style={{ marginBottom: "-3.03%" }}>
      {/*
        Ocupa todo el ancho de la pantalla, de borde a borde. El tamaño
        real (1223x1318) se declara solo para fijar la proporción;
        `sizes` le indica a Next que ocupa el ancho completo para que
        elija la resolución adecuada en cada dispositivo.
      */}
      <Image
        src="/images/logos/image 13 (1).png"
        alt="Acuarela de los novios"
        width={1223}
        height={1318}
        quality={90}
        sizes="100vw"
        className="h-auto w-full"
      />

      {/*
        Ahora la sección termina justo donde termina la acuarela, así que
        esta distancia se mide desde el borde inferior de la ilustración.

        En vw y no en px: la acuarela ocupa el 100% del ancho de
        pantalla, así que su alto renderizado también escala con el
        viewport. Un offset en px se queda fijo mientras la imagen
        crece o encoge, y el texto termina viéndose más arriba o más
        abajo según la pantalla. En vw, el offset escala igual que la
        imagen y el texto queda siempre en el mismo punto relativo
        sobre ella. 12.44vw = 50px en los 402px del frame de diseño.
      */}
      <span
        className="t-script absolute leading-none"
        style={{ fontSize: 24, color: "#9e9674", right: "12.44vw", bottom: "12.44vw" }}
      >
        Jeremías 29:11
      </span>
    </section>
  );
}
