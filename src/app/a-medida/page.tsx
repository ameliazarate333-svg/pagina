import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata = {
  title: "A Medida · AZ — Amelia Zárate",
  description: "Confección a medida en el atelier AZ: de la idea a tu cuerpo, paso a paso. Prendas hechas a mano sobre tus proporciones.",
};

const STEPS = [
  ["01", "Consulta", "Conversamos sobre tu ocasión, estilo y telas. Presencial o virtual."],
  ["02", "Medidas", "Tomas tus medidas con nuestra guía o te las tomamos en el atelier."],
  ["03", "Diseño & Tela", "Elegimos el patrón, la caída y el textil que mejor te sienta."],
  ["04", "Confección", "Cortamos y cosemos tu prenda a mano sobre tus proporciones exactas."],
  ["05", "Prueba", "Ajustamos cada detalle en una o más pruebas hasta el calce perfecto."],
  ["06", "Entrega", "Recibes tu pieza terminada, lista para acompañarte por años."],
];

export default function AMedida() {
  return (
    <>
      <SiteHeader />

      <section className="sec guide-hero">
        <div className="wrap">
          <span className="label">Confección a medida</span>
          <h1>De la idea <em>a tu cuerpo</em></h1>
          <p>Cada prenda nace de una conversación y se construye a mano sobre tus propias proporciones.
            Sin tallas estándar: solo tú, la tela y la precisión. Así trabajamos, paso a paso.</p>
        </div>
      </section>

      <section className="sec medida">
        <div className="wrap">
          <div className="steps">
            {STEPS.map(([n, h, p]) => (
              <div className="step" key={n}><div className="n">{n}</div><h4>{h}</h4><p>{p}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap philo-grid">
          <div>
            <span className="label">Lo que debes saber</span>
            <h2 style={{ fontFamily: "var(--serif)", fontWeight: 300, fontSize: "clamp(1.8rem,4vw,2.8rem)", margin: "1.2rem 0 1.5rem" }}>
              Tiempos y <em style={{ color: "var(--taupe)" }}>detalles</em>
            </h2>
          </div>
          <div>
            <div className="specs" style={{ borderTop: "none", paddingTop: 0 }}>
              <div><span className="label" style={{ fontSize: ".6rem" }}>Tiempo de entrega</span><b style={{ fontFamily: "var(--serif)", fontSize: "1.3rem", display: "block", marginTop: ".5rem" }}>15 días aprox.</b></div>
              <div><span className="label" style={{ fontSize: ".6rem" }}>Pruebas</span><b style={{ fontFamily: "var(--serif)", fontSize: "1.3rem", display: "block", marginTop: ".5rem" }}>1 a 2</b></div>
            </div>
            <p style={{ color: "var(--ink-soft)", lineHeight: 1.8, marginTop: "1.5rem", maxWidth: "48ch" }}>
              El tiempo y el número de pruebas varían según la complejidad de la prenda. Trabajamos con telas
              naturales y patrones propios. El valor depende del diseño y el textil elegido; lo definimos juntas
              en la consulta.
            </p>
            <div className="product-cta" style={{ marginTop: "2rem" }}>
              <Link href="/cuenta" className="btn btn-solid">Agendar consulta</Link>
              <Link href="/guia-medidas" className="btn btn-ghost">Ver guía de medidas</Link>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
