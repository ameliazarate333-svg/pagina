import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Model3D from "@/components/Model3D";
import { GUIDE, GUIDE_TIPS } from "@/lib/measureGuide";

export const metadata = {
  title: "Guía de Medidas · AZ — Amelia Zárate",
  description: "Aprende dónde y cómo tomar cada medida para tu prenda a medida.",
};

const cardBg = (key: string) => ({
  background: `url('/guia/${key}.png') center/cover no-repeat, linear-gradient(135deg, var(--greige), var(--sand))`,
});

export default function GuiaMedidas() {
  let n = 0;
  return (
    <>
      <SiteHeader />

      {/* HERO */}
      <section className="sec guide-hero">
        <div className="wrap">
          <span className="label">Libreta de la modista</span>
          <h1>Aprende a <em>medirte</em></h1>
          <p>Una guía visual, paso a paso, de dónde se coloca la cinta métrica para cada medida.
            Con una cinta flexible y cinco minutos, tus prendas quedarán a tu medida exacta.</p>
        </div>
      </section>

      {/* MODELO 3D interactivo */}
      <section className="wrap">
        <div className="model3d live">
          <div className="model3d-badge">Modelo 3D · arrástralo para girar</div>
          <Model3D src="/guia/busto.glb" />
        </div>
      </section>

      {/* TIPS */}
      <section className="sec guide-tips-sec">
        <div className="wrap">
          <span className="label">Antes de empezar</span>
          <div className="guide-tips">
            {GUIDE_TIPS.map((t, i) => (
              <div className="gtip" key={i}><span className="gtip-n">{String(i + 1).padStart(2, "0")}</span><p>{t}</p></div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORÍAS */}
      {GUIDE.map((cat) => (
        <section className="sec guide-cat" id={cat.id} key={cat.id}>
          <div className="wrap">
            <div className="guide-cat-head">
              <h2>{cat.title}</h2>
              <p>{cat.intro}</p>
            </div>
            <div className="guide-grid">
              {cat.items.map((it) => {
                n += 1;
                return (
                  <article className="gcard" key={it.key}>
                    <div className="gcard-img" style={cardBg(it.key)}>
                      <span className="gcard-num">{String(n).padStart(2, "0")}</span>
                    </div>
                    <h4>{it.name}</h4>
                    <p>{it.desc}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="sec news" id="cta-guia">
        <div className="wrap">
          <span className="label" style={{ color: "var(--sand)" }}>¿Lista?</span>
          <h2 style={{ marginTop: "1.5rem" }}>Guarda tus <em>medidas</em></h2>
          <p>Crea tu perfil y guárdalas para todos tus encargos.</p>
          <a href="/cuenta" className="btn btn-ghost" style={{ borderColor: "var(--sand)", color: "var(--bone)", marginTop: "1rem" }}>Ir a mi cuenta</a>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
