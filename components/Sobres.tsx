import Ilustracion from "@/components/Ilustracion";

/* Sección decorativa: solo la ilustración y el título. */
export default function Sobres() {
  return (
    <section className="flex flex-col items-center text-center">
      {/* "(5)" -> ilustración: 40px */}
      <Ilustracion
        src="/images/logos/LogoSobre.png"
        alt="Ilustración de sobres"
        w={165}
        h={123}
        className="mt-[40px]"
      />

      {/* Ilustración -> título: 10px */}
      <h2
        className="t-script mt-[10px] leading-none"
        style={{ fontSize: 35, color: "#9e9674" }}
      >
        Lluvia de sobres
      </h2>
    </section>
  );
}
