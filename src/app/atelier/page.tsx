import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata = {
  title: "El Atelier · AZ — Amelia Zárate",
  description: "La historia del atelier AZ · Amelia Zárate: un taller donde el tiempo es el lujo y cada prenda se hace a mano.",
};

const bg = (url: string) => ({ backgroundImage: `url('${url}')` });

export default function Atelier() {
  return (
    <>
      <SiteHeader />

      <section className="sec guide-hero">
        <div className="wrap">
          <span className="label">El Atelier</span>
          <h1>Un taller donde el <em>tiempo</em> es el lujo</h1>
          <p>Amelia Zárate fundó AZ con una idea sencilla: que cada mujer merece una prenda pensada
            para su cuerpo y nadie más.</p>
        </div>
      </section>

      <section className="sec philo" style={{ paddingTop: "clamp(2rem,4vw,3rem)" }}>
        <div className="wrap philo-grid">
          <div className="philo-img" style={bg("https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=900&auto=format&fit=crop")} />
          <div>
            <p style={{ marginBottom: "1.5rem" }}>
              Lo que comenzó como un <em>taller pequeño</em> hoy viste a clientas que vuelven temporada tras
              temporada, buscando esa elegancia que no necesita demostrarse.
            </p>
            <p style={{ color: "var(--ink-soft)", lineHeight: 1.9, fontFamily: "var(--sans)", fontSize: "1rem" }}>
              Trabajamos con telas naturales, patrones propios y una sola promesa: que lo que te lleves sea
              verdaderamente tuyo. Aquí no hay producción en serie ni tallas impuestas — hay paciencia, oficio
              y manos que conocen su trabajo.
            </p>
            <div className="sign" style={{ marginTop: "2.5rem" }}>Amelia Zárate<small>Fundadora & Directora Creativa</small></div>
          </div>
        </div>
      </section>

      <section className="sec atelier">
        <div className="wrap atelier-grid">
          <div className="atelier-img" style={bg("https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?q=80&w=900&auto=format&fit=crop")} />
          <div>
            <span className="label" style={{ display: "block", marginBottom: "1.4rem" }}>Nuestro oficio</span>
            <h2>Hecho a mano, <em>de principio a fin</em></h2>
            <p>Cada pieza pasa por las mismas manos: del patrón al corte, de la costura a la última puntada.
              Es la única forma que conocemos de garantizar que una prenda dure y siente como debe.</p>
            <div className="stats">
              <div className="stat"><div className="num serif">600+</div><div className="lab">Prendas a medida</div></div>
              <div className="stat"><div className="num serif">7</div><div className="lab">Años de oficio</div></div>
              <div className="stat"><div className="num serif">100%</div><div className="lab">Hecho a mano</div></div>
            </div>
            <div className="product-cta" style={{ marginTop: "2.5rem" }}>
              <Link href="/a-medida" className="btn btn-ghost" style={{ borderColor: "var(--line)" }}>Confección a medida</Link>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
