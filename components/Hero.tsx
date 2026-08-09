import Image from "next/image";

/* La curva inferior viene recortada en el propio PNG. */
export default function Hero() {
  return (
    <section>
      <Image
        src="/images/logos/InitialBG.png"
        alt=""
        width={526}
        height={581}
        priority
        sizes="100vw"
        className="h-auto w-full"
      />
    </section>
  );
}
