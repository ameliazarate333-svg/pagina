import type { MetadataRoute } from "next";
import { fetchProducts } from "@/lib/products";
import { POSTS } from "@/lib/posts";

const BASE = "https://azameliazarate.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const PRODUCTS = await fetchProducts();
  const fixed: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${BASE}/coleccion`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/a-medida`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/guia-medidas`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/atelier`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/contacto`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    { url: `${BASE}/diario`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${BASE}/preguntas-frecuentes`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/envios`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/privacidad`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/terminos`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/cookies`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];
  const products: MetadataRoute.Sitemap = PRODUCTS.map((p) => ({
    url: `${BASE}/coleccion/${p.slug}`, lastModified: now, changeFrequency: "monthly", priority: 0.7,
  }));
  const posts: MetadataRoute.Sitemap = POSTS.map((p) => ({
    url: `${BASE}/diario/${p.slug}`, lastModified: new Date(p.date), changeFrequency: "yearly", priority: 0.5,
  }));
  return [...fixed, ...products, ...posts];
}
