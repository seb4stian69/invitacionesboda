import Image from "next/image";
import type { CSSProperties } from "react";

/*
  Ramo decorativo que asoma por los bordes. Va en posición absoluta y
  detrás del texto, sin capturar toques, para que nunca estorbe la
  lectura ni los botones.
*/
export default function Flor({
  src = "/images/logos/flores.png",
  w,
  h,
  espejada = false,
  rotacion = 0,
  style,
}: {
  src?: string;
  /* Tamaño al que se muestra, tomado del diseño */
  w: number;
  h: number;
  /* Voltea la imagen en horizontal */
  espejada?: boolean;
  /* Giro en grados, en sentido horario */
  rotacion?: number;
  style?: CSSProperties;
}) {
  /*
    El orden importa: primero se recolocan (el translate que venga en
    `style`), después se gira y por último se voltea.
  */
  const transformaciones = [
    style?.transform,
    rotacion ? `rotate(${rotacion}deg)` : null,
    espejada ? "scaleX(-1)" : null,
  ].filter(Boolean);

  return (
    <Image
      src={src}
      alt=""
      aria-hidden="true"
      /* Se pide al triple del tamaño de diseño para que no se vea suave */
      width={w * 3}
      height={h * 3}
      quality={90}
      className="pointer-events-none absolute max-w-none select-none"
      style={{
        /*
          Por defecto quedan detrás del texto. Va antes del `style` para
          que quien lo necesite pueda subirlas de capa: sobre una
          ilustración opaca, un z-index negativo las escondería.
        */
        zIndex: -1,
        ...style,
        width: w,
        height: h,
        transform: transformaciones.length
          ? transformaciones.join(" ")
          : undefined,
      }}
    />
  );
}
