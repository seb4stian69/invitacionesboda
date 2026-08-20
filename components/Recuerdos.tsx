import Image from "next/image";
import Boton from "@/components/Boton";

const CARPETA =
  "https://drive.google.com/drive/folders/1eKRrSmba9GcBBGuIvz3LtCIwRUxB_9r0?usp=sharing";

export default function Recuerdos() {
  return (
    <section className="flex flex-col items-center text-center">
      <h2
        className="t-script mt-[60px] leading-none"
        style={{ fontSize: 35, color: "#9e9674" }}
      >
        Recuerdos
      </h2>

      <p
        className="t-parrafo mt-[18px]"
        style={{ fontSize: 9, color: "rgb(113 103 53 / 0.7)" }}
      >
        Ayúdanos a completar la historia:
        <br />
        sube acá las fotos y videos
        <br />
        que tomes esa noche.
      </p>

      {/*
        La tarjeta entera es el enlace, no solo el botón: en celular el
        código no se puede escanear desde la misma pantalla, así que
        tocarlo es la forma natural de intentarlo.

        La imagen va sin optimizar a propósito. Pesa 6 KB, menos de lo
        que ocuparía cualquier conversión, y así los cuadros del código
        quedan exactos: una recompresión con pérdida puede ablandar los
        bordes y dificultar el escaneo.
      */}
      <a
        href={CARPETA}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-[20px] rounded-[18px] border border-[rgb(164_138_119_/_0.35)] bg-[rgb(255_253_246_/_0.55)] p-[14px]"
      >
        <Image
          src="/images/qrcode.png"
          alt="Abrir la carpeta para subir fotos y videos"
          width={140}
          height={140}
          unoptimized
        />
      </a>

      <Boton href={CARPETA} ancho={110} className="mt-[16px]">
        Subir fotos
      </Boton>
    </section>
  );
}
