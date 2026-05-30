/** Artículos del Diario (blog). Contenido de ejemplo, editable. */
export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  img: string;
  body: string[];
};

export const POSTS: Post[] = [
  {
    slug: "como-elegir-tu-vestido",
    title: "Cómo elegir el vestido perfecto para tu evento",
    excerpt: "Más allá de la tendencia, la clave está en tu cuerpo, la ocasión y la tela. Te contamos cómo pensarlo.",
    date: "2026-05-20",
    readTime: "4 min",
    img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1000&auto=format&fit=crop",
    body: [
      "Elegir un vestido no debería ser una carrera contra la tendencia. La elegancia que perdura nace de tres preguntas simples: qué celebras, cómo es tu cuerpo y qué tela te hace sentir bien.",
      "Para un evento de día, las telas naturales como el lino y el algodón aportan frescura y un aire sereno. Para la noche, el satén y el crepé regalan caída y movimiento. La tela manda más de lo que crees.",
      "El segundo secreto es el calce. Un vestido sencillo, pero hecho a tu medida, siempre se verá más elegante que uno elaborado que no te queda. Por eso insistimos tanto en las medidas exactas.",
      "Y por último: elige lo que te haga sentir tú. La pieza correcta no te disfraza, te revela.",
    ],
  },
  {
    slug: "el-arte-de-la-confeccion-a-medida",
    title: "El arte de la confección a medida",
    excerpt: "Qué significa, en realidad, que una prenda se haga solo para ti. Un recorrido por nuestro oficio.",
    date: "2026-05-08",
    readTime: "5 min",
    img: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1000&auto=format&fit=crop",
    body: [
      "La confección a medida no es un lujo de otra época: es la forma más honesta de vestir. Parte de una idea sencilla — que ningún cuerpo es estándar — y la lleva hasta sus últimas consecuencias.",
      "Todo empieza con la conversación. Antes de cortar una sola tela, escuchamos: la ocasión, lo que te gusta, lo que no, cómo te mueves. Esa información vale tanto como las medidas.",
      "Luego viene el patrón, trazado sobre tus proporciones reales. Cada centímetro cuenta. De ahí al corte, a la costura a mano y a las pruebas, donde la prenda termina de encontrar tu cuerpo.",
      "El resultado no es solo un vestido: es una pieza que dura, que se ajusta a tu vida y que cuenta tu historia. Eso es lo que el tiempo y el oficio hacen posible.",
    ],
  },
  {
    slug: "cuidados-para-que-tu-prenda-dure",
    title: "Cuidados para que tu prenda dure años",
    excerpt: "Una buena prenda merece buenos cuidados. Pequeños gestos que alargan la vida de tus piezas.",
    date: "2026-04-25",
    readTime: "3 min",
    img: "https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?q=80&w=1000&auto=format&fit=crop",
    body: [
      "Una prenda hecha a mano puede acompañarte durante años si la cuidas bien. La buena noticia es que casi todo se reduce a gestos simples.",
      "Lava menos y con suavidad. Muchas piezas se refrescan ventilándolas, sin necesidad de lavado. Cuando toque, prefiere agua fría y, en telas delicadas, lavado a mano o en bolsa.",
      "Guarda con criterio: cuelga lo estructurado y dobla lo de punto para que no se deforme. Evita la luz directa prolongada, que apaga los colores.",
      "Y ante una duda o un pequeño arreglo, escríbenos. Cuidar la prenda también es parte de nuestro trabajo.",
    ],
  },
];

export const getPost = (slug: string) => POSTS.find((p) => p.slug === slug);

export const formatDate = (iso: string) =>
  new Date(iso + "T00:00").toLocaleDateString("es-CO", { day: "numeric", month: "long", year: "numeric" });
