"use client";

import { useEffect, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { formatCop, type Product } from "@/lib/products";

type Form = {
  id?: string; slug: string; name: string; category: string; price_cop: string;
  fabric: string; sizes: string; description: string; image_url: string; available: boolean;
};
const BLANK: Form = { slug: "", name: "", category: "", price_cop: "", fabric: "", sizes: "", description: "", image_url: "", available: true };

const slugify = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export default function AdminProducts({ onToast }: { onToast: (m: string) => void }) {
  const clientRef = useRef<ReturnType<typeof createClient> | null>(null);
  const getClient = () => (clientRef.current ??= createClient());

  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState<Form | null>(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  async function load() {
    const { data } = await getClient().from("products").select("*").order("sort", { ascending: true });
    setProducts((data as Product[]) || []);
  }
  useEffect(() => { load(); /* eslint-disable-next-line */ }, []);

  function startNew() { setForm({ ...BLANK }); }
  function startEdit(p: Product) {
    setForm({ id: p.id, slug: p.slug, name: p.name, category: p.category || "", price_cop: String(p.price_cop),
      fabric: p.fabric || "", sizes: (p.sizes || []).join(", "), description: p.description || "", image_url: p.image_url || "", available: p.available });
  }

  async function uploadImage(file: File) {
    if (!form) return;
    setUploading(true);
    try {
      const supabase = getClient();
      const ext = file.name.split(".").pop() || "jpg";
      const path = `${form.slug || slugify(form.name) || "vestido"}-${Date.now()}.${ext}`;
      const { error } = await supabase.storage.from("productos").upload(path, file, { upsert: true });
      if (error) { onToast("Error al subir la imagen"); return; }
      const { data } = supabase.storage.from("productos").getPublicUrl(path);
      setForm((f) => f && { ...f, image_url: data.publicUrl });
      onToast("Imagen subida ✓");
    } finally { setUploading(false); }
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (!form) return;
    if (!form.name.trim()) { onToast("Falta el nombre"); return; }
    setSaving(true);
    try {
      const supabase = getClient();
      const row = {
        slug: form.slug.trim() || slugify(form.name),
        name: form.name.trim(),
        category: form.category.trim() || null,
        price_cop: Number(form.price_cop) || 0,
        fabric: form.fabric.trim() || null,
        sizes: form.sizes.split(/[,\s]+/).map((s) => s.trim()).filter(Boolean),
        description: form.description.trim() || null,
        image_url: form.image_url.trim() || null,
        available: form.available,
      };
      const res = form.id
        ? await supabase.from("products").update(row).eq("id", form.id)
        : await supabase.from("products").insert(row);
      if (res.error) { onToast(res.error.message.includes("duplicate") ? "Ese 'slug' ya existe" : "Error al guardar"); return; }
      onToast(form.id ? "Vestido actualizado ✓" : "Vestido creado ✓");
      setForm(null);
      load();
    } finally { setSaving(false); }
  }

  async function remove(id: string, name: string) {
    if (!confirm(`¿Eliminar "${name}"? Esto no se puede deshacer.`)) return;
    const { error } = await getClient().from("products").delete().eq("id", id);
    if (error) { onToast("Error al eliminar"); return; }
    onToast("Vestido eliminado");
    load();
  }

  async function toggleAvailable(p: Product) {
    setProducts((ps) => ps.map((x) => (x.id === p.id ? { ...x, available: !x.available } : x)));
    await getClient().from("products").update({ available: !p.available }).eq("id", p.id);
  }

  return (
    <section>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem", margin: "1rem 0 1.4rem", flexWrap: "wrap" }}>
        <h3 style={{ fontFamily: "var(--serif)", fontSize: "1.6rem" }}>Productos ({products.length})</h3>
        {!form && <button className="btn btn-sm" onClick={startNew}>+ Nuevo vestido</button>}
      </div>

      {form && (
        <div className="panel">
          <h3 style={{ fontSize: "1.2rem" }}>{form.id ? "Editar vestido" : "Nuevo vestido"}</h3>
          <form onSubmit={save}>
            <div className="appt-grid">
              <div className="mfield"><label>Nombre</label><input className="select" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Vestido Lino" /></div>
              <div className="mfield"><label>Categoría</label><input className="select" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="Día · Lino belga" /></div>
              <div className="mfield"><label>Precio (COP, solo número)</label><input className="select" type="number" value={form.price_cop} onChange={(e) => setForm({ ...form, price_cop: e.target.value })} placeholder="320000" /></div>
              <div className="mfield"><label>Tallas (separadas por coma)</label><input className="select" value={form.sizes} onChange={(e) => setForm({ ...form, sizes: e.target.value })} placeholder="XS, S, M, L, XL" /></div>
              <div className="mfield"><label>Tela</label><input className="select" value={form.fabric} onChange={(e) => setForm({ ...form, fabric: e.target.value })} placeholder="100% lino belga" /></div>
              <div className="mfield"><label>Disponibilidad</label>
                <select className="select" value={form.available ? "1" : "0"} onChange={(e) => setForm({ ...form, available: e.target.value === "1" })}>
                  <option value="1">Disponible</option><option value="0">Agotado</option>
                </select>
              </div>
            </div>
            <div className="mfield" style={{ marginTop: "1.2rem" }}><label>Descripción</label>
              <textarea className="notes-area" rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Descripción del vestido…" />
            </div>
            <div className="mfield" style={{ marginTop: "1.2rem" }}>
              <label>Foto del vestido</label>
              <div style={{ display: "flex", gap: "1.2rem", alignItems: "flex-start", marginTop: ".5rem" }}>
                {form.image_url
                  ? <div style={{ width: "110px", aspectRatio: "3/4", backgroundImage: `url('${form.image_url}')`, backgroundSize: "cover", backgroundPosition: "center", border: "1px solid var(--line)" }} />
                  : <div style={{ width: "110px", aspectRatio: "3/4", background: "var(--greige)", border: "1px solid var(--line)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--muted)", fontSize: ".7rem", textAlign: "center", padding: ".5rem" }}>Sin foto</div>}
                <div>
                  <input type="file" accept="image/png,image/jpeg,image/webp" onChange={(e) => e.target.files?.[0] && uploadImage(e.target.files[0])} style={{ fontSize: ".8rem" }} />
                  <p style={{ fontSize: ".72rem", color: "var(--muted)", marginTop: ".5rem", maxWidth: "30ch" }}>{uploading ? "Subiendo…" : "JPG, PNG o WebP (máx 5MB). Vertical (3:4) se ve mejor."}</p>
                </div>
              </div>
            </div>
            <div className="row-actions" style={{ marginTop: "1.5rem" }}>
              <button type="submit" className="btn btn-sm" disabled={saving || uploading}>{saving ? "Guardando…" : "Guardar"}</button>
              <button type="button" className="btn btn-ghost btn-sm" onClick={() => setForm(null)}>Cancelar</button>
            </div>
          </form>
        </div>
      )}

      {!form && (products.length === 0
        ? <p className="muted-empty">Aún no hay vestidos. Crea el primero.</p>
        : products.map((p) => (
          <div className="adm-item" key={p.id}>
            <div style={{ display: "flex", gap: "1.2rem", alignItems: "center", flexWrap: "wrap" }}>
              <div style={{ width: "54px", height: "72px", backgroundImage: `url('${p.image_url || ""}')`, backgroundSize: "cover", backgroundPosition: "center", backgroundColor: "var(--greige)", border: "1px solid var(--line)", flexShrink: 0 }} />
              <div style={{ flex: 1, minWidth: "140px" }}>
                <h3 style={{ fontFamily: "var(--serif)", fontSize: "1.2rem" }}>{p.name}</h3>
                <div className="adm-sub">{p.category} · {formatCop(p.price_cop)} · Tallas: {(p.sizes || []).join(" ") || "—"}</div>
              </div>
              <button className="statusSel" onClick={() => toggleAvailable(p)} style={{ color: p.available ? "var(--ok)" : "var(--accent)", borderColor: p.available ? "var(--ok)" : "var(--accent)" }}>
                {p.available ? "Disponible" : "Agotado"}
              </button>
              <button className="statusSel" onClick={() => startEdit(p)}>Editar</button>
              <button className="statusSel" onClick={() => remove(p.id, p.name)} style={{ color: "var(--accent)" }}>Eliminar</button>
            </div>
          </div>
        )))}
    </section>
  );
}
