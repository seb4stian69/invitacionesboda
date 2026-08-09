export type Invitado = {
  id: string;
  ref: string;
  cupos: number;
};

export const INVITADOS: Invitado[] = [
  { id: "uuid-1", ref: "Familia Jaimes Estrada", cupos: 5 },
];

/*
  El código que va en la URL es el id en base64: uuid-1 -> dXVpZC0x.
  Se usa la variante "url-safe" (- y _ en lugar de + y /) para que
  ningún código rompa la dirección; para ids como estos el resultado es
  el mismo, pero evita sorpresas con ids más largos.
*/
export function codificar(id: string): string {
  return Buffer.from(id, "utf8")
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export function buscarPorCodigo(codigo: string): Invitado | undefined {
  const normalizado = codigo.replace(/-/g, "+").replace(/_/g, "/");
  /*
    Buffer.from no falla con base64 inválido: devuelve bytes basura.
    Por eso no hace falta try/catch, el find simplemente no encuentra
    nada y se responde 404.
  */
  const id = Buffer.from(normalizado, "base64").toString("utf8");
  return INVITADOS.find((invitado) => invitado.id === id);
}
