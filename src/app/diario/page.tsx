import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { POSTS, formatDate } from "@/lib/posts";

export const metadata = {
  title: "Diario · AZ — Amelia Zárate",
  description: "Notas del atelier: estilo, oficio y cuidado de tus prendas. El Diario de AZ · Amelia Zárate.",
};

export default function Diario() {
  return (
    <>
      <SiteHeader />
      <section className="sec guide-hero">
        <div className="wrap">
          <span className="label">El Diario</span>
          <h1>Notas del <em>atelier</em></h1>
          <p>Estilo, oficio y los pequeños secretos de vestir bien. Sin ruido, a nuestro ritmo.</p>
        </div>
      </section>

      <section className="sec" style={{ paddingTop: "clamp(1rem,3vw,2rem)" }}>
        <div className="wrap">
          <div className="diario-grid">
            {POSTS.map((p) => (
              <Link className="post-card" key={p.slug} href={`/diario/${p.slug}`}>
                <div className="post-img" style={{ backgroundImage: `url('${p.img}')` }} />
                <div className="post-meta">{formatDate(p.date)} · {p.readTime} de lectura</div>
                <h3>{p.title}</h3>
                <p>{p.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
