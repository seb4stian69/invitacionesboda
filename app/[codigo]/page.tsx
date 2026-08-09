import { notFound } from "next/navigation";
import PaginaInvitacion from "@/components/PaginaInvitacion";
import { INVITADOS, buscarPorCodigo, codificar } from "@/data/invitados";

/*
  Pre-genera una página por invitado al compilar, así cada enlace se
  sirve como HTML estático y no depende de que el servidor resuelva nada
  en el momento.
*/
export function generateStaticParams() {
  return INVITADOS.map((invitado) => ({ codigo: codificar(invitado.id) }));
}

export default async function Page({ params }: PageProps<"/[codigo]">) {
  const { codigo } = await params;
  const invitado = buscarPorCodigo(codigo);

  if (!invitado) notFound();

  return <PaginaInvitacion invitado={invitado} />;
}
