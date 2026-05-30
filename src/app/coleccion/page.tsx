import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { fetchProducts, formatCop } from "@/lib/products";

export const revalidate = 60;

export const metadata = {
  title: "Colección · AZ — Amelia Zárate",
  description: "Vestidos ya hechos del atelier AZ · Amelia Zárate. Piezas listas para llevar, ajustables a tus medidas.",
};

const bg = (url: string) => ({ backgroundImage: `url('${url}')` });

export default async function Coleccion() {
  const products = await fetchProducts();
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
          {products.length === 0 ? (
            <p style={{ color: "var(--muted)" }}>Pronto publicaremos nuestra colección.</p>
          ) : (
            <div className="coll-grid">
              {products.map((c) => (
                <Link className="card" key={c.slug} href={`/coleccion/${c.slug}`}>
                  <div className="card-img" style={bg(c.image_url || "")}>
                    {!c.available && <span className="sold-badge">Agotado</span>}
                    <span className="quick">Ver detalle</span>
                  </div>
                  <div className="card-meta">
                    <div><h3>{c.name}</h3><div className="cat">{c.category}</div></div>
                    <span className="price">{formatCop(c.price_cop)}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
      <SiteFooter />
    </>
  );
}
