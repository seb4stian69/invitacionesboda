import Image from "next/image";

/*
  Next arma el srcSet a partir del `width` que se le declara, no del
  tamaño al que se ve la imagen. Si se le pasa el tamaño real del archivo
  (por ejemplo 1218px para un ícono de 77px), sirve versiones de 2000px o
  más y la página termina pesando megas.

  Este componente separa las dos cosas: recibe el tamaño del diseño, le
  pide a Next el triple, y fija la presentación por CSS. Así queda nítido
  en pantallas de alta densidad y con margen para hacer zoom, pero el
  archivo servido es proporcional a lo que se ve.

  Requisito: el archivo original debe medir al menos 3x el tamaño de
  diseño; si no, Next lo amplía y se ve suave igual.
*/
const DENSIDAD = 3;

export default function Ilustracion({
  src,
  alt,
  w,
  h,
  className,
  priority = false,
}: {
  src: string;
  alt: string;
  /* Tamaño al que se muestra, tomado del diseño */
  w: number;
  h: number;
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      width={w * DENSIDAD}
      height={h * DENSIDAD}
      quality={90}
      priority={priority}
      className={className}
      style={{ width: w, height: h }}
    />
  );
}
