import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { PRODUCTS } from "@/lib/products";

export const metadata = {
  title: "Colección · AZ — Amelia Zárate",
  description: "Vestidos ya hechos del atelier AZ · Amelia Zárate. Piezas listas para llevar, ajustables a tus medidas.",
};

const bg = (url: string) => ({ backgroundImage: `url('${url}')` });

export default function Coleccion() {
  return (
    <>
      <SiteHeader />
      <section className="sec">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <span className="label">Vestidos ya hechos</span>
              <h2>La <em>Colección</em></h2>
            </div>
            <p style={{ maxWidth: "34ch", color: "var(--ink-soft)", fontSize: ".95rem" }}>
              Piezas listas para llevar, disponibles en tallas seleccionadas y <strong>ajustables sin costo</strong> a
              tus medidas. ¿Quieres algo único? También las hacemos <Link href="/a-medida" style={{ textDecoration: "underline" }}>a medida</Link>.
            </p>
          </div>
          <div className="coll-grid">
            {PRODUCTS.map((c) => (
              <Link className="card" key={c.slug} href={`/coleccion/${c.slug}`}>
                <div className="card-img" style={bg(c.img)}><span className="quick">Ver detalle</span></div>
                <div className="card-meta">
                  <div><h3>{c.name}</h3><div className="cat">{c.cat}</div></div>
                  <span className="price">{c.price}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <SiteFooter />
    </>
  );
}
