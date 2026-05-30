import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { PRODUCTS, getProduct } from "@/lib/products";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return { title: "Vestido no encontrado · AZ" };
  return {
    title: `${p.name} · AZ — Amelia Zárate`,
    description: p.desc,
    openGraph: { title: `${p.name} · AZ`, description: p.desc, images: [p.img] },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) notFound();

  const waText = encodeURIComponent(`Hola AZ, me interesa el "${p.name}" (${p.price}). ¿Me das más información?`);

  return (
    <>
      <SiteHeader />
      <section className="sec product">
        <div className="wrap product-grid">
          <div className="product-img" style={{ backgroundImage: `url('${p.img}')` }} />
          <div className="product-info">
            <Link href="/coleccion" className="product-back">← Volver a la colección</Link>
            <span className="cat">{p.cat}</span>
            <h1>{p.name}</h1>
            <div className="price">{p.price}</div>
            <p className="desc">{p.desc}</p>
            <div className="specs">
              <div><span>Tela</span><b>{p.fabric}</b></div>
              <div><span>Tallas</span><b>{p.sizes.join(" · ")}</b></div>
            </div>
            <div className="product-cta">
              <a href={`https://wa.me/573122222222?text=${waText}`} target="_blank" rel="noopener" className="btn btn-solid">Consultar por WhatsApp</a>
              <Link href="/a-medida" className="btn btn-ghost">Pedir a medida</Link>
            </div>
            <p className="product-note">↳ Todas nuestras piezas se ajustan <strong>sin costo</strong> a tus medidas. ¿Aún no las tienes guardadas? <Link href="/cuenta" style={{ textDecoration: "underline" }}>Crea tu perfil</Link>.</p>
          </div>
        </div>
      </section>
      <SiteFooter />
    </>
  );
}
