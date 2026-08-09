/*
  Botón tipo píldora del diseño. Todos comparten alto, colores, tipografía
  y radio; solo cambia el ancho.
*/
export default function Boton({
  href,
  ancho,
  className = "",
  children,
}: {
  href: string;
  ancho: number;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`t-body flex h-[19px] items-center justify-center uppercase ${className}`}
      style={{
        width: ancho,
        fontSize: 9,
        borderRadius: 9.5,
        backgroundColor: "#e6c49f",
        color: "#927250",
        paddingTop: 4,
      }}
    >
      {children}
    </a>
  );
}
