import { notFound } from "next/navigation";

/*
  La invitación solo existe con un código de invitado válido. La raíz no
  muestra nada: cae en la página de "Invitación no válida".
*/
export default function Home() {
  notFound();
}
