import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { POSTS, getPost, formatDate } from "@/lib/posts";

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) return { title: "Artículo no encontrado · AZ" };
  return {
    title: `${p.title} · Diario AZ`,
    description: p.excerpt,
    openGraph: { title: p.title, description: p.excerpt, images: [p.img], type: "article" },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) notFound();

  return (
    <>
      <SiteHeader />
      <section className="sec">
        <div className="wrap">
          <article className="article">
            <Link href="/diario" className="product-back">← Volver al Diario</Link>
            <div className="post-meta" style={{ marginTop: "1.5rem" }}>{formatDate(p.date)} · {p.readTime} de lectura</div>
            <h1>{p.title}</h1>
            <div className="article-img" style={{ backgroundImage: `url('${p.img}')` }} />
            {p.body.map((par, i) => <p key={i}>{par}</p>)}
            <div className="note" style={{ marginTop: "2.5rem" }}>
              ¿Te gustaría una pieza pensada para ti? <Link href="/a-medida">Confección a medida →</Link>
            </div>
          </article>
        </div>
      </section>
      <SiteFooter />
    </>
  );
}
