export type Invitado = {
  id: string;
  ref: string;
  cupos: number;
};

export const INVITADOS: Invitado[] = [
  { id: "qhqsd75b03kfhv7ha5suu367v", ref: "Mis Papitos Manuel y Johana", cupos: 2 },
  { id: "s1am42ueizh1zkoclrvi0wfqy", ref: "Abuelitos Margarita y Nelson", cupos: 2 },
  { id: "9y7ylln4em9kgvabsgsf03ov9", ref: "Hermanito Nelson Sanchez", cupos: 1 },
  { id: "ayfg5n82p14mkr4zb7xxfpwcd", ref: "Hermanito Andres Sanchez", cupos: 1 },
  { id: "quznmpghpdjghrwqkhifv21dp", ref: "Familia Zuñiga Camargo", cupos: 3 },
  { id: "dn4ulsoo13758w2r1m2rw2lxp", ref: "Familia Bohorquez Camargo", cupos: 2 },
  { id: "gqmlckzimnomcbcm86o8ttrd5", ref: "Familia Santis", cupos: 4 },
  { id: "v2j0hq30focnc0648zyft2n3s", ref: "Tia Lili y Juan", cupos: 2 },
  { id: "5swpy46fuc9jo3xg7r7691y9p", ref: "Familia Jaimes Estrada", cupos: 5 },
  { id: "uxs7ogyh9kp3q3xuyu9hviqlf", ref: "Familia Gonzalez Hernandez", cupos: 5 },
  { id: "dxq5b74b9tc0w606cvb5ycdmj", ref: "Hermanas Ortega", cupos: 2 },
  { id: "nzxtfmfrpt5ie9zroa7lmjn3q", ref: "Sofia Santos", cupos: 1 },
  { id: "299gexpphlexh3x5oifpeewwl", ref: "Maria Jose Carcamo Buelvas", cupos: 1 },
  { id: "ogkvon7e1qsykupti2d9oplgl", ref: "Jasmith Contreras", cupos: 1 },
  { id: "apwahmzdgzznfa7zf0zx4h468", ref: "Simon (Saimon)", cupos: 1 },
  { id: "048kb8c0hpu6wkfy620wc3fd7", ref: "Valentina Contreras", cupos: 1 },
  { id: "muieldnj5pllzg6vlo78femi6", ref: "Ledys Hernandez", cupos: 1 },
  { id: "7azdyiiu5etys5w2jmkt7b9px", ref: "Blanca Hernandez", cupos: 1 },
  { id: "lxzirj3apsxakrrqb1vwxsdvw", ref: "Jose Ruiz", cupos: 1 },
  { id: "fm415iq1qv1yosgg7pspai43w", ref: "Hernan Velasquez", cupos: 1 },
  { id: "8f0g691mshs03p7fbsbu2ij0x", ref: "Santiago Fernandez", cupos: 1 },
  { id: "bl3eg7qcrmhrvq05yee8jdr1l", ref: "Familia Lugo Rodriguez", cupos: 4 },
  { id: "3pb98s6lazyw4sjehrz2v1n98", ref: "Familia Estrada De Oro", cupos: 2 },
];

/*
  El código que va en la URL es el id en base64 url-safe (- y _ en vez
  de + y /), para que ningún código rompa la dirección.
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
