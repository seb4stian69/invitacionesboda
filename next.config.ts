import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /*
      Next 16 solo permite calidad 75 por defecto y coerciona cualquier otro
      valor al más cercano. Se habilita 90 para las ilustraciones de línea
      fina (monograma, íconos), donde los artefactos de compresión se notan.
    */
    qualities: [75, 90],
  },
};

export default nextConfig;
