import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import LandingFx from "@/components/LandingFx";
import { fetchProducts, formatCop } from "@/lib/products";

export const revalidate = 300;

const bg = (url: string) => ({ backgroundImage: `url('${url}')` });

const STEPS = [
  ["01", "Consulta", "Conversamos sobre tu ocasión, estilo y telas. Presencial o virtual."],
  ["02", "Medidas", "Tomas tus medidas con nuestra guía o te las tomamos en el atelier."],
  ["03", "Diseño & Tela", "Elegimos el patrón, la caída y el textil que mejor te sienta."],
  ["04", "Confección", "Cortamos y cosemos tu prenda a mano sobre tus proporciones exactas."],
  ["05", "Prueba", "Ajustamos cada detalle en una o más pruebas hasta el calce perfecto."],
  ["06", "Entrega", "Recibes tu pieza terminada, lista para acompañarte por años."],
];

const MEASURES = [
  ["Contorno de busto", "Cinta horizontal sobre la parte más alta"],
  ["Contorno de cintura", "En la parte más estrecha del torso"],
  ["Contorno de cadera", "Sobre la zona más prominente"],
  ["Talle de espalda", "De la nuca a la cintura"],
  ["Largo de la prenda", "Del hombro al largo deseado"],
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ClothingStore",
  name: "AZ · Amelia Zárate",
  description: "Atelier de alta costura y confección a medida, hecha a mano.",
  url: "https://azameliazarate.com",
  image: "https://azameliazarate.com/opengraph-image",
  areaServed: { "@type": "Country", name: "Colombia" },
  knowsLanguage: "es",
  makesOffer: { "@type": "Offer", itemOffered: { "@type": "Service", name: "Confección de vestidos a medida" } },
};

export default async function Home() {
  const COLLECTION = (await fetchProducts(true)).slice(0, 6);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SiteHeader />

      {/* HERO */}
      <section className="hero" id="inicio">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <div className="hero-eyebrow label">Atelier de alta costura · Est. 2019</div>
            <h1>
              <span className="ln"><span>El oficio</span></span>
              <span className="ln"><span>de vestir</span></span>
              <span className="ln"><span><em>a medida.</em></span></span>
            </h1>
            <p className="hero-sub">
              Prendas construidas a mano sobre tus propias proporciones. Sin tallas estándar.
              Solo tú, la tela y la precisión.
            </p>
            <div className="hero-actions">
              <Link href="/coleccion" className="btn btn-solid">Ver colección</Link>
              <Link href="/a-medida" className="btn btn-ghost">Confección a medida</Link>
            </div>
          </div>
          <div className="hero-media">
            <div className="hero-img" style={bg("https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1000&auto=format&fit=crop")} />
            <div className="hero-tag">
              <div className="num serif">19</div>
              <div className="txt">Medidas tomadas<br />por prenda</div>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee">
        <div className="marquee-track">
          {Array.from({ length: 2 }).flatMap((_, k) =>
            ["Hecho a mano", "Confección a medida", "Telas naturales", "Pruebas personalizadas"].map((t) => (
              <span key={`${k}-${t}`}>{t}</span>
            ))
          )}
        </div>
      </div>

      {/* PHILOSOPHY */}
      <section className="sec philo">
        <div className="wrap philo-grid">
          <div className="philo-img" data-reveal style={bg("https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=900&auto=format&fit=crop")} />
          <div data-reveal>
            <span className="label">Nuestra filosofía</span>
            <p style={{ marginTop: "1.5rem" }}>
              Creemos en la <em>elegancia silenciosa</em>: la prenda que no grita, pero que se nota.
              Cada pieza nace de la conversación, la medida exacta y la paciencia del trabajo hecho a mano.
            </p>
            <div className="sign">Amelia Zárate<small>Fundadora & Directora Creativa</small></div>
          </div>
        </div>
      </section>

      {/* COLECCION */}
      <section className="sec" id="coleccion">
        <div className="wrap">
          <div className="sec-head" data-reveal>
            <div>
              <span className="label">Vestidos ya hechos</span>
              <h2>La <em>Colección</em></h2>
            </div>
            <p style={{ maxWidth: "30ch", color: "var(--ink-soft)", fontSize: ".95rem" }}>
              Piezas listas para llevar, disponibles en tallas seleccionadas y ajustables sin costo a tus medidas.
            </p>
          </div>
          <div className="coll-grid">
            {COLLECTION.map((c) => (
              <Link className="card" data-reveal key={c.slug} href={`/coleccion/${c.slug}`}>
                <div className="card-img" style={bg(c.image_url || "")}><span className="quick">Ver detalle</span></div>
                <div className="card-meta">
                  <div><h3>{c.name}</h3><div className="cat">{c.category}</div></div>
                  <span className="price">{formatCop(c.price_cop)}</span>
                </div>
              </Link>
            ))}
          </div>
          <div className="coll-foot" data-reveal><Link href="/coleccion" className="btn btn-ghost">Ver toda la colección</Link></div>
        </div>
      </section>

      {/* A MEDIDA */}
      <section className="sec medida" id="medida">
        <div className="wrap">
          <div className="sec-head" data-reveal>
            <div>
              <span className="label">Confección a medida</span>
              <h2>De la idea <em>a tu cuerpo</em></h2>
            </div>
            <p style={{ maxWidth: "32ch", color: "rgba(242,238,229,.6)", fontSize: ".95rem" }}>
              Un proceso pensado para que recibas una prenda hecha solo para ti, paso a paso.
            </p>
          </div>
          <div className="steps" data-reveal>
            {STEPS.map(([n, h, p]) => (
              <div className="step" key={n}>
                <div className="n">{n}</div><h4>{h}</h4><p>{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MEDIDAS / UPLOAD */}
      <section className="sec" id="medidas">
        <div className="wrap">
          <div className="sec-head" data-reveal>
            <div>
              <span className="label">Guía de medidas · Súbelas tú misma</span>
              <h2>Aprende a <em>medirte</em></h2>
            </div>
            <p style={{ maxWidth: "32ch", color: "var(--ink-soft)", fontSize: ".95rem" }}>
              Con una cinta métrica flexible y cinco minutos. Te guiamos en cada una.
            </p>
          </div>
          <div className="upload-grid">
            <ul className="measure-list" data-reveal>
              {MEASURES.map(([n, h]) => (
                <li key={n}><span className="mname">{n}</span><span className="mhint">{h}</span></li>
              ))}
            </ul>
            <div className="upload-card" data-reveal>
              <h3>Crea tu perfil de medidas</h3>
              <p>Regístrate una vez y guarda tus medidas para todos tus encargos. Todo en centímetros y privado.</p>
              <div className="field-row">
                <div className="field"><label>Busto (cm)</label><input type="number" placeholder="92" /></div>
                <div className="field"><label>Cintura (cm)</label><input type="number" placeholder="70" /></div>
              </div>
              <div className="field-row">
                <div className="field"><label>Cadera (cm)</label><input type="number" placeholder="98" /></div>
                <div className="field"><label>Talle espalda (cm)</label><input type="number" placeholder="41" /></div>
              </div>
              <div className="field"><label>Largo deseado (cm)</label><input type="number" placeholder="120" /></div>
              <Link href="/cuenta" className="btn btn-solid" style={{ display: "block" }}>
                Crear cuenta y guardar mis medidas
              </Link>
              <div className="upload-note">
                <span>↳</span>
                <span>Tus medidas son datos personales: las guardamos de forma segura y solo se usan para tu confección. Puedes borrarlas cuando quieras.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ATELIER */}
      <section className="sec atelier" id="atelier">
        <div className="wrap atelier-grid">
          <div className="atelier-img" data-reveal style={bg("https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?q=80&w=900&auto=format&fit=crop")} />
          <div data-reveal>
            <span className="label" style={{ display: "block", marginBottom: "1.4rem" }}>El Atelier</span>
            <h2>Un taller donde el <em>tiempo</em> es el lujo</h2>
            <p>
              Amelia Zárate fundó AZ con una idea sencilla: que cada mujer merece una prenda pensada
              para su cuerpo y nadie más. Lo que comenzó como un taller pequeño hoy viste a clientas
              que vuelven temporada tras temporada.
            </p>
            <p>
              Trabajamos con telas naturales, patrones propios y una sola promesa — que lo que te
              lleves sea verdaderamente tuyo.
            </p>
            <div className="stats">
              <div className="stat"><div className="num serif">600+</div><div className="lab">Prendas a medida</div></div>
              <div className="stat"><div className="num serif">7</div><div className="lab">Años de oficio</div></div>
              <div className="stat"><div className="num serif">100%</div><div className="lab">Hecho a mano</div></div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="sec testi">
        <div className="wrap" data-reveal>
          <span className="label">Lo que dicen</span>
          <blockquote id="quote" style={{ marginTop: "2.5rem" }}>
            “Nunca un vestido me había quedado así. Sentí que estaba hecho para mí, porque lo estaba.”
          </blockquote>
          <div className="who" id="who">Valentina R. · Vestido de gala a medida</div>
          <div className="dots" id="dots"><i className="on" /><i /><i /></div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="sec news" id="contacto">
        <div className="wrap" data-reveal>
          <span className="label" style={{ color: "var(--sand)" }}>Mantente cerca</span>
          <h2 style={{ marginTop: "1.5rem" }}>Únete al <em>círculo</em> AZ</h2>
          <p>Nuevas colecciones, fechas de citas disponibles y notas del atelier. Sin ruido.</p>
          <form className="news-form" action="#">
            <input type="email" placeholder="tu@correo.com" />
            <button type="submit">Suscribirme</button>
          </form>
        </div>
      </section>

      <SiteFooter />
      <LandingFx />
    </>
  );
}
