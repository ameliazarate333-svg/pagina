import { publicClient } from "@/lib/supabase/public";

/** Vestido del catálogo (vive en la tabla `products` de Supabase). */
export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string | null;
  price_cop: number;
  fabric: string | null;
  sizes: string[];
  description: string | null;
  image_url: string | null;
  available: boolean;
};

/** Formatea 320000 → "$320.000" (COP). */
export const formatCop = (n: number) => "$" + (n || 0).toLocaleString("es-CO");

/** Lee el catálogo. `onlyAvailable` filtra solo los disponibles. */
export async function fetchProducts(onlyAvailable = false): Promise<Product[]> {
  const sb = publicClient();
  let q = sb.from("products").select("*").order("sort", { ascending: true });
  if (onlyAvailable) q = q.eq("available", true);
  const { data } = await q;
  return (data as Product[]) || [];
}

/** Lee un vestido por su slug. */
export async function fetchProduct(slug: string): Promise<Product | null> {
  const sb = publicClient();
  const { data } = await sb.from("products").select("*").eq("slug", slug).maybeSingle();
  return (data as Product) || null;
}
