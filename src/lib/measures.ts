/** Configuración de tallas de referencia y medidas que la clienta puede guardar. */
export type MeasureItem = { k: string; l: string; h: string; ej: string };

/** Medidas exactas (en cm) que necesita el atelier. */
export const MEASURES: MeasureItem[] = [
  { k: "busto", l: "Contorno de busto", h: "Sobre la parte más prominente del pecho.", ej: "92" },
  { k: "cintura", l: "Contorno de cintura", h: "En la parte más estrecha del torso.", ej: "74" },
  { k: "cadera", l: "Contorno de cadera", h: "Sobre la zona más prominente.", ej: "102" },
  { k: "largoDelantero", l: "Largo delantero", h: "Del hombro a la cintura por el frente.", ej: "42" },
  { k: "largoEspalda", l: "Largo de espalda", h: "De la nuca a la cintura por detrás.", ej: "40" },
  { k: "largoPrenda", l: "Largo de prenda (vestido/pantalón)", h: "Del hombro al largo final deseado.", ej: "105" },
];

export const MEASURE_KEYS = MEASURES.map((m) => m.k);

/** Tallas comerciales de referencia. */
export const TALLAS_SUPERIOR = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];
export const TALLAS_INFERIOR = ["4", "6", "8", "10", "12", "14", "16", "18", "20"];

/** Claves no numéricas que también se guardan en measurements.data */
export const TALLA_KEYS = ["tallaSuperior", "tallaInferior"] as const;
export const NOTES_KEY = "notas";

export const ORDER_STATUSES = [
  "Medidas recibidas",
  "En diseño",
  "En corte",
  "En confección",
  "Lista para prueba",
  "Entregada",
];
