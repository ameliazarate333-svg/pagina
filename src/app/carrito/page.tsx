"use client";

import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { useCart } from "@/components/cart/CartProvider";
import { getProduct, priceToCop, formatCop } from "@/lib/products";

export default function Carrito() {
  const { items, setQty, remove } = useCart();
  const lines = items.map((i) => ({ ...i, p: getProduct(i.slug)! })).filter((l) => l.p);
  const total = lines.reduce((s, l) => s + priceToCop(l.p.price) * l.qty, 0);

  function checkout() {
    const lineText = lines.map((l) => `• ${l.p.name} x${l.qty} — ${formatCop(priceToCop(l.p.price) * l.qty)}`).join("\n");
    const msg = `Hola AZ, quiero comprar:\n${lineText}\n\nTotal: ${formatCop(total)}`;
    window.open(`https://wa.me/573122222222?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
  }

  return (
    <>
      <SiteHeader />
      <section className="sec">
        <div className="wrap">
          <div style={{ marginBottom: "clamp(2rem,5vw,3.5rem)" }}>
            <span className="label">Compra</span>
            <h2 style={{ fontFamily: "var(--serif)", fontWeight: 300, fontSize: "clamp(2.2rem,5vw,3.4rem)", marginTop: ".8rem" }}>
              Tu <em style={{ fontStyle: "italic", color: "var(--taupe)" }}>carrito</em>
            </h2>
          </div>

          {lines.length === 0 ? (
            <div className="cart-empty">
              <span className="serif">Tu carrito está vacío</span>
              Aún no has añadido vestidos. <Link href="/coleccion" style={{ textDecoration: "underline" }}>Explora la colección</Link>.
            </div>
          ) : (
            <div className="cart-layout">
              <div className="cart-lines">
                {lines.map((l) => (
                  <div className="cart-line" key={l.slug}>
                    <Link href={`/coleccion/${l.slug}`} className="ci-img" style={{ backgroundImage: `url('${l.p.img}')` }} />
                    <div className="ci-main">
                      <Link href={`/coleccion/${l.slug}`}><h3>{l.p.name}</h3></Link>
                      <div className="cat">{l.p.cat}</div>
                      <div className="qty">
                        <button onClick={() => setQty(l.slug, l.qty - 1)} aria-label="Restar">–</button>
                        <span>{l.qty}</span>
                        <button onClick={() => setQty(l.slug, l.qty + 1)} aria-label="Sumar">+</button>
                      </div>
                      <button className="ci-remove" onClick={() => remove(l.slug)}>Quitar</button>
                    </div>
                    <div className="ci-price">{formatCop(priceToCop(l.p.price) * l.qty)}</div>
                  </div>
                ))}
              </div>

              <div className="cart-summary">
                <h4>Resumen</h4>
                <div className="row"><span>Productos ({lines.reduce((s, l) => s + l.qty, 0)})</span><span>{formatCop(total)}</span></div>
                <div className="row"><span>Envío</span><span>A convenir</span></div>
                <div className="row total"><span>Total</span><span>{formatCop(total)}</span></div>
                <button className="btn btn-solid" onClick={checkout}>Finalizar por WhatsApp</button>
                <p className="cart-note">↳ Coordinamos el pago y el envío por WhatsApp. Próximamente: pago en línea con tarjeta, PSE y Nequi.</p>
                <Link href="/coleccion" style={{ display: "block", textAlign: "center", marginTop: "1rem", fontSize: ".75rem", letterSpacing: ".1em", textTransform: "uppercase", color: "var(--muted)" }}>Seguir comprando</Link>
              </div>
            </div>
          )}
        </div>
      </section>
      <SiteFooter />
    </>
  );
}
