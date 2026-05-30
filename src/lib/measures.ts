/** Configuración de las medidas que la clienta puede guardar. */
export type MeasureItem = { k: string; l: string; ess: boolean; h: string };
export type MeasureGroup = { g: string; gl: string; items: MeasureItem[] };

export const MEASURE_GROUPS: MeasureGroup[] = [
  {
    g: "Contornos del torso",
    gl: "Lo básico",
    items: [
      { k: "busto", l: "Contorno de busto", ess: true, h: "Sobre la parte más prominente del pecho." },
      { k: "cintura", l: "Contorno de cintura", ess: true, h: "En la parte más estrecha del torso." },
      { k: "cadera", l: "Contorno de cadera", ess: true, h: "Sobre la zona más prominente." },
      { k: "bajobusto", l: "Contorno bajo busto", ess: false, h: "Justo debajo del pecho." },
    ],
  },
  {
    g: "Largos y talle",
    gl: "Proporción",
    items: [
      { k: "talleesp", l: "Talle de espalda", ess: true, h: "De la nuca a la cintura. Pide ayuda." },
      { k: "largo", l: "Largo deseado de la prenda", ess: true, h: "Del hombro al largo que quieres." },
      { k: "altura", l: "Altura", ess: true, h: "De la coronilla al piso." },
      { k: "talledel", l: "Talle delantero", ess: false, h: "Del hombro a la cintura por el frente." },
    ],
  },
  {
    g: "Hombros y espalda",
    gl: "Ajuste superior",
    items: [
      { k: "anchoesp", l: "Ancho de espalda", ess: false, h: "De axila a axila por detrás." },
      { k: "hombro", l: "Largo de hombro", ess: false, h: "Del cuello al extremo del hombro." },
      { k: "cuello", l: "Contorno de cuello", ess: false, h: "Alrededor de la base del cuello." },
      { k: "sisa", l: "Contorno de sisa", ess: false, h: "Alrededor de la axila." },
    ],
  },
  {
    g: "Brazos",
    gl: "Mangas",
    items: [
      { k: "largobrazo", l: "Largo de brazo", ess: false, h: "Del hombro a la muñeca." },
      { k: "brazo", l: "Contorno de brazo", ess: false, h: "En la parte más ancha (bíceps)." },
      { k: "muneca", l: "Contorno de muñeca", ess: false, h: "Alrededor de la muñeca." },
    ],
  },
];

export const ALL_MEASURE_KEYS = MEASURE_GROUPS.flatMap((g) => g.items.map((i) => i.k));

export const ORDER_STATUSES = [
  "Medidas recibidas",
  "En diseño",
  "En corte",
  "En confección",
  "Lista para prueba",
  "Entregada",
];
