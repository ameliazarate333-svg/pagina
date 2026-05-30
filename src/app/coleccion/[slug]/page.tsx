import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import AddToCart from "@/components/cart/AddToCart";
import FavoriteButton from "@/components/FavoriteButton";
import { fetchProducts, fetchProduct, formatCop } from "@/lib/products";

export const revalidate = 60;

export async function generateStaticParams() {
  const products = await fetchProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = await fetchProduct(slug);
  if (!p) return { title: "Vestido no encontrado · AZ" };
  return {
    title: `${p.name} · AZ — Amelia Zárate`,
    description: p.description || undefined,
    openGraph: { title: `${p.name} · AZ`, description: p.description || undefined, images: p.image_url ? [p.image_url] : [] },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = await fetchProduct(slug);
  if (!p) notFound();

  const waText = encodeURIComponent(`Hola AZ, me interesa el "${p.name}" (${formatCop(p.price_cop)}). ¿Me das más información?`);

  return (
    <>
      <SiteHeader />
      <section className="sec product">
        <div className="wrap product-grid">
          <div className="product-img" style={{ backgroundImage: `url('${p.image_url || ""}')` }}>
            {!p.available && <span className="sold-badge lg">Agotado</span>}
          </div>
          <div className="product-info">
            <Link href="/coleccion" className="product-back">← Volver a la colección</Link>
            <span className="cat">{p.category}</span>
            <h1>{p.name}</h1>
            <div className="price">{formatCop(p.price_cop)}</div>
            {p.description && <p className="desc">{p.description}</p>}
            <div className="specs">
              <div><span>Tela</span><b>{p.fabric || "—"}</b></div>
              <div><span>Tallas</span><b>{p.sizes?.length ? p.sizes.join(" · ") : "—"}</b></div>
            </div>
            <div className="product-cta">
              {p.available
                ? <AddToCart slug={p.slug} />
                : <button className="btn btn-ghost" disabled style={{ cursor: "not-allowed", opacity: .6 }}>Agotado</button>}
              <FavoriteButton slug={p.slug} />
            </div>
            <div className="product-links">
              <a href={`https://wa.me/573122222222?text=${waText}`} target="_blank" rel="noopener">Consultar por WhatsApp</a>
              <Link href="/a-medida">Pedir a medida</Link>
            </div>
            <p className="product-note">↳ Todas nuestras piezas se ajustan <strong>sin costo</strong> a tus medidas. ¿Aún no las tienes guardadas? <Link href="/cuenta" style={{ textDecoration: "underline" }}>Crea tu perfil</Link>.</p>
          </div>
        </div>
      </section>
      <SiteFooter />
    </>
  );
}
