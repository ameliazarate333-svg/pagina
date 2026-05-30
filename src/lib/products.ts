/** Catálogo de vestidos ya hechos. Las imágenes son provisionales (Unsplash);
 *  se reemplazan por las fotos reales de Amelia. */
export type Product = {
  slug: string;
  name: string;
  cat: string;
  price: string;
  img: string;
  fabric: string;
  sizes: string[];
  desc: string;
};

export const PRODUCTS: Product[] = [
  {
    slug: "vestido-lino",
    name: "Vestido Lino",
    cat: "Día · Lino belga",
    price: "$320.000",
    img: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=900&auto=format&fit=crop",
    fabric: "100% lino belga",
    sizes: ["XS", "S", "M", "L", "XL"],
    desc: "Un vestido de día de caída fluida en lino natural, fresco y elegante. Corte recto que favorece sin marcar, ideal para el calor con un acabado impecable.",
  },
  {
    slug: "tunica-hueso",
    name: "Túnica Hueso",
    cat: "Cóctel · Seda",
    price: "$480.000",
    img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=900&auto=format&fit=crop",
    fabric: "Seda lavada color hueso",
    sizes: ["XS", "S", "M", "L"],
    desc: "Túnica de seda con movimiento líquido y un tono hueso atemporal. Perfecta para un cóctel donde la elegancia se nota sin esfuerzo.",
  },
  {
    slug: "slip-greige",
    name: "Slip Greige",
    cat: "Noche · Satén",
    price: "$540.000",
    img: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=900&auto=format&fit=crop",
    fabric: "Satén de viscosa greige",
    sizes: ["XS", "S", "M", "L"],
    desc: "Vestido slip de tiras finas y espalda fluida, en un greige sofisticado. La pieza de noche que define el lujo silencioso.",
  },
  {
    slug: "vestido-arena",
    name: "Vestido Arena",
    cat: "Gala · Crepé",
    price: "$690.000",
    img: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=900&auto=format&fit=crop",
    fabric: "Crepé de alta caída",
    sizes: ["XS", "S", "M", "L", "XL"],
    desc: "Vestido largo de gala en crepé color arena, con un drapeado que esculpe la silueta. Hecho para los momentos que se recuerdan.",
  },
  {
    slug: "camisero-taupe",
    name: "Camisero Taupe",
    cat: "Día · Algodón",
    price: "$295.000",
    img: "https://images.unsplash.com/photo-1623609163859-ca93c959b98a?q=80&w=900&auto=format&fit=crop",
    fabric: "Algodón peinado taupe",
    sizes: ["XS", "S", "M", "L", "XL"],
    desc: "Vestido camisero en algodón de tacto suave, versátil de día a tarde. Cinturón de la misma tela para marcar la cintura a tu gusto.",
  },
  {
    slug: "vestido-marfil",
    name: "Vestido Marfil",
    cat: "Novia civil · Crepé",
    price: "$820.000",
    img: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?q=80&w=900&auto=format&fit=crop",
    fabric: "Crepé marfil",
    sizes: ["XS", "S", "M", "L"],
    desc: "Vestido midi en marfil, depurado y luminoso, pensado para la novia de boda civil que busca sobriedad con carácter.",
  },
  {
    slug: "vestido-sage",
    name: "Vestido Sage",
    cat: "Cóctel · Lino mezcla",
    price: "$390.000",
    img: "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?q=80&w=900&auto=format&fit=crop",
    fabric: "Mezcla de lino y viscosa, tono salvia",
    sizes: ["XS", "S", "M", "L"],
    desc: "Un verde salvia apagado en una mezcla fresca de lino. Silueta envolvente que cae con gracia, para una tarde de eventos.",
  },
  {
    slug: "vestido-noche-oxido",
    name: "Vestido Óxido",
    cat: "Gala · Satén",
    price: "$750.000",
    img: "https://images.unsplash.com/photo-1568252542512-9fe8fe9c87bb?q=80&w=900&auto=format&fit=crop",
    fabric: "Satén color óxido",
    sizes: ["XS", "S", "M", "L"],
    desc: "Vestido largo en satén color óxido cálido, con escote sereno y caída que abraza. Una declaración de elegancia para la noche.",
  },
];

export const getProduct = (slug: string) => PRODUCTS.find((p) => p.slug === slug);

/** Convierte "$320.000" → 320000 (para sumar en el carrito). */
export const priceToCop = (price: string) => Number(price.replace(/[^0-9]/g, ""));

/** Formatea 320000 → "$320.000" (COP). */
export const formatCop = (n: number) => "$" + n.toLocaleString("es-CO");
