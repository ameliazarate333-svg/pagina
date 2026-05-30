/** Guía visual de toma de medidas — contenido por categorías.
 *  Cada medida tiene una imagen en /public/guia/<key>.png (la generas en Flow).
 *  Si la imagen aún no existe, se muestra un degradado elegante de marcador. */
export type GuideItem = { key: string; name: string; desc: string };
export type GuideCategory = { id: string; title: string; intro: string; items: GuideItem[] };

export const GUIDE: GuideCategory[] = [
  {
    id: "contornos",
    title: "Contornos (horizontales)",
    intro: "La cinta rodea el cuerpo de forma horizontal, firme pero sin apretar.",
    items: [
      { key: "cuello", name: "Contorno de cuello", desc: "Alrededor del cuello partiendo de la 7ª cervical, pasando por las fosas supraclaviculares (ángulo cuello-hombro), cerrando ligeramente tensionada sobre el manubrio esternal." },
      { key: "busto", name: "Contorno de busto", desc: "Alrededor del tórax sobre la base de los omóplatos, bajo las axilas en forma horizontal, cerrando por la punta de los pezones." },
      { key: "pecho", name: "Contorno de pecho", desc: "Horizontalmente alrededor del tórax, sobre los omóplatos y bajo las axilas, hasta la parte plana por encima del busto." },
      { key: "submamario", name: "Contorno submamario", desc: "Alrededor del tórax pasando por la parte baja del busto (justo debajo del pecho). También llamado contorno bajo busto." },
      { key: "cintura", name: "Contorno de cintura", desc: "Ligeramente tensionada sobre el punto más estrecho del torso, entre la costilla flotante y la cresta ilíaca, cerrando en el centro-frente (zona umbilical)." },
      { key: "cadera", name: "Contorno de cadera", desc: "Horizontal y ligeramente tensionada, sobre las crestas ilíacas, pasando por la parte más sobresaliente de los glúteos." },
    ],
  },
  {
    id: "verticales",
    title: "Medidas verticales",
    intro: "Largos del cuerpo tomados de arriba hacia abajo.",
    items: [
      { key: "talleFrente", name: "Talle frente", desc: "Desde la fosa supraclavicular (ángulo cuello-hombro) hasta la cintura, por el frente (zona umbilical)." },
      { key: "centroFrente", name: "Centro frente", desc: "Desde el centro del manubrio esternal (base del cuello) hasta la cintura, centro-frente (zona umbilical)." },
      { key: "talleAtras", name: "Talle atrás", desc: "Desde la fosa supraclavicular (ángulo cuello-hombro) hasta el inicio de las vértebras lumbares." },
      { key: "centroAtras", name: "Centro atrás", desc: "Desde la 7ª vértebra cervical, siguiendo la línea media de la columna, hasta el inicio de las vértebras lumbares." },
      { key: "largoCostado", name: "Largo de costado", desc: "Verticalmente, desde el punto medio de la fosa axilar hasta la terminación de la reja costal (cintura lateral)." },
      { key: "hombroHombro", name: "Hombro a hombro", desc: "Horizontalmente por la espalda, de un punto acromion al otro." },
      { key: "largoHombro", name: "Largo de hombro", desc: "Desde la fosa supraclavicular (ángulo cuello-hombro) hasta el punto acromion (extremo del hombro)." },
    ],
  },
  {
    id: "superiores",
    title: "Anchos y separaciones (superiores)",
    intro: "Anchos del torso y referencias del busto y el brazo.",
    items: [
      { key: "anchoPecho", name: "Ancho de pecho", desc: "De un pliegue axilar anterior al otro, pasando por la parte plana del tórax (al frente)." },
      { key: "anchoEspalda", name: "Ancho de espalda", desc: "De un pliegue axilar posterior al otro, pasando por los omóplatos (por la espalda)." },
      { key: "separacionBusto", name: "Separación de busto", desc: "Horizontalmente, de un pezón al otro." },
      { key: "alturaBusto", name: "Altura de busto", desc: "Verticalmente, desde la fosa supraclavicular (ángulo cuello-hombro) hasta el pezón." },
      { key: "largoBrazo", name: "Largo exterior del brazo", desc: "Con el brazo doblado y la mano en la cadera, desde el punto acromion, pasando por el codo, hasta la muñeca (apófisis estiloides del cúbito)." },
    ],
  },
  {
    id: "inferiores",
    title: "Contornos y largos (inferiores)",
    intro: "Medidas de la parte baja del cuerpo, para pantalones y faldas.",
    items: [
      { key: "punoAnatomico", name: "Contorno de puño anatómico", desc: "Alrededor de la muñeca, sobre las apófisis estiloides del radio y el cúbito." },
      { key: "punoPrenda", name: "Contorno de puño prenda", desc: "Con el puño cerrado, alrededor de la parte más ancha de la mano." },
      { key: "largoPantalon", name: "Largo de pantalón o falda", desc: "Desde la línea lateral de la cintura, por el costado exterior, hasta el largo deseado de la prenda." },
      { key: "largoTiro", name: "Largo de tiro", desc: "Sentada en una superficie plana, desde la cintura hasta el asiento (zona perineal)." },
      { key: "rodilla", name: "Contorno de rodilla", desc: "Con la pierna ligeramente doblada, alrededor de la rótula." },
      { key: "bota", name: "Contorno de bota", desc: "Con el pie en punta, alrededor del talón y el empeine." },
    ],
  },
];

export const GUIDE_TIPS = [
  "Usa una cinta métrica flexible (de modista), nunca una rígida.",
  "Mídete con ropa interior o ropa muy ajustada.",
  "Mantén la cinta firme pero sin apretar (que no marque la piel).",
  "Párate natural y relajada, mirando al frente.",
  "Pide ayuda para las medidas de espalda y talle.",
  "Mide dos veces cada zona y anota en centímetros.",
];
