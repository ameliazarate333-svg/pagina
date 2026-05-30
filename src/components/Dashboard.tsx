"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { MEASURES, MEASURE_KEYS, TALLA_KEYS, NOTES_KEY, TALLAS_SUPERIOR, TALLAS_INFERIOR, ORDER_STATUSES } from "@/lib/measures";

type View = "resumen" | "medidas" | "pedidos" | "citas" | "perfil";
type Profile = { full_name: string | null; phone: string | null; created_at: string };
type Order = { id: string; name: string; status: number; created_at: string };
type Appt = { id: string; type: string; mode: string; date: string; time: string };

const NAV: [View, string][] = [
  ["resumen", "Resumen"],
  ["medidas", "Mis medidas"],
  ["pedidos", "Mis pedidos"],
  ["citas", "Citas"],
  ["perfil", "Mi perfil"],
];

export default function Dashboard() {
  const router = useRouter();
  // El cliente se crea de forma perezosa, solo en el navegador (nunca al renderizar en el servidor).
  const clientRef = useRef<ReturnType<typeof createClient> | null>(null);
  const getClient = () => (clientRef.current ??= createClient());

  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [profile, setProfile] = useState<Profile>({ full_name: "", phone: "", created_at: "" });
  const [measures, setMeasures] = useState<Record<string, string>>({});
  const [savedMeta, setSavedMeta] = useState("Aún no has guardado medidas.");
  const [orders, setOrders] = useState<Order[]>([]);
  const [appts, setAppts] = useState<Appt[]>([]);
  const [view, setView] = useState<View>("resumen");
  const [toast, setToast] = useState("");

  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const showToast = useCallback((m: string) => {
    setToast(m);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(""), 2600);
  }, []);

  // ---- load everything ----
  useEffect(() => {
    (async () => {
      const supabase = getClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.replace("/login"); return; }
      setUserId(user.id);
      setEmail(user.email || "");

      const [{ data: prof }, { data: meas }, { data: ords }, { data: aps }] = await Promise.all([
        supabase.from("profiles").select("full_name, phone, created_at").eq("id", user.id).maybeSingle(),
        supabase.from("measurements").select("data, updated_at").eq("user_id", user.id).maybeSingle(),
        supabase.from("orders").select("id, name, status, created_at").eq("user_id", user.id).order("created_at", { ascending: false }),
        supabase.from("appointments").select("id, type, mode, date, time, created_at").eq("user_id", user.id).order("created_at", { ascending: false }),
      ]);

      if (prof) setProfile({ full_name: prof.full_name ?? "", phone: prof.phone ?? "", created_at: prof.created_at });
      if (meas?.data) {
        const obj: Record<string, string> = {};
        Object.entries(meas.data as Record<string, number>).forEach(([k, v]) => { obj[k] = String(v); });
        setMeasures(obj);
        if (Object.keys(obj).length && meas.updated_at)
          setSavedMeta("Última actualización: " + new Date(meas.updated_at).toLocaleString("es-CO", { dateStyle: "long", timeStyle: "short" }));
      }
      if (ords) setOrders(ords as Order[]);
      if (aps) setAppts(aps as Appt[]);
      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  const firstName = (profile.full_name || "").split(" ")[0] || "bienvenida";
  const filled = MEASURE_KEYS.filter((k) => measures[k] != null && measures[k] !== "").length;
  const pct = Math.round((filled / MEASURE_KEYS.length) * 100);
  const activeOrders = orders.filter((o) => o.status < ORDER_STATUSES.length - 1).length;
  const nextAppt = appts[0];

  async function saveMeasures(e: React.FormEvent) {
    e.preventDefault();
    if (!userId) return;
    const supabase = getClient();
    const data: Record<string, number | string> = {};
    MEASURE_KEYS.forEach((k) => { if (measures[k] !== "" && measures[k] != null) data[k] = parseFloat(measures[k]); });
    TALLA_KEYS.forEach((k) => { if (measures[k]) data[k] = measures[k]; });
    if (measures[NOTES_KEY]?.trim()) data[NOTES_KEY] = measures[NOTES_KEY].trim();
    const { error } = await supabase.from("measurements").upsert({ user_id: userId, data, updated_at: new Date().toISOString() });
    if (error) { showToast("Error al guardar"); return; }
    setSavedMeta("Última actualización: " + new Date().toLocaleString("es-CO", { dateStyle: "long", timeStyle: "short" }));
    showToast("Medidas guardadas ✓");
  }

  async function requestAppt(e: React.FormEvent) {
    e.preventDefault();
    if (!userId) return;
    const supabase = getClient();
    const form = e.target as HTMLFormElement;
    const fd = new FormData(form);
    const row = { user_id: userId, type: String(fd.get("type")), mode: String(fd.get("mode")), date: String(fd.get("date")), time: String(fd.get("time")) };
    const { data, error } = await supabase.from("appointments").insert(row).select().single();
    if (error) { showToast("Error al agendar"); return; }
    setAppts((a) => [data as Appt, ...a]);
    form.reset();
    showToast("Cita solicitada ✓");
  }

  async function saveProfile(e: React.FormEvent) {
    e.preventDefault();
    if (!userId) return;
    const supabase = getClient();
    const { error } = await supabase.from("profiles").update({ full_name: profile.full_name, phone: profile.phone }).eq("id", userId);
    if (error) { showToast("Error al guardar"); return; }
    showToast("Perfil actualizado ✓");
  }

  async function logout() {
    const supabase = getClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  async function deleteData() {
    if (!userId) return;
    if (!confirm("¿Seguro? Esto elimina tus medidas, pedidos y citas de forma permanente.")) return;
    const supabase = getClient();
    await Promise.all([
      supabase.from("measurements").update({ data: {} }).eq("user_id", userId),
      supabase.from("orders").delete().eq("user_id", userId),
      supabase.from("appointments").delete().eq("user_id", userId),
      supabase.from("profiles").update({ phone: null }).eq("id", userId),
    ]);
    showToast("Tus datos fueron eliminados");
    setTimeout(() => logout(), 1200);
  }

  if (loading) return <div className="acct"><div className="loader">Cargando tu espacio…</div></div>;

  return (
    <div className="acct">
      <div className="app">
        <header className="dash-top">
          <Link href="/" aria-label="AZ">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="dash-logo" src="/logo-az.svg" alt="AZ · Amelia Zárate" />
          </Link>
          <div className="dash-user">
            <span className="uname">{firstName}</span>
            <button className="out" onClick={logout}>Cerrar sesión</button>
          </div>
        </header>

        <div className="dash-body">
          <aside className="dash-nav">
            {NAV.map(([v, label]) => (
              <button key={v} className={`navbtn${view === v ? " on" : ""}`} onClick={() => { setView(v); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
                <span className="ic" />{label}
              </button>
            ))}
          </aside>

          <main className="dash-main">
            {/* RESUMEN */}
            {view === "resumen" && (
              <section>
                <div className="view-head"><h1>Hola, {firstName}</h1><p>Bienvenida a tu espacio en el atelier. Aquí guardas tus medidas y sigues tus encargos.</p></div>
                <div className="cards">
                  <div className="scard"><div className="label">Medidas</div><div className="big">{pct}<small>%</small></div><div className="sub">de tu perfil completo</div></div>
                  <div className="scard"><div className="label">Pedidos activos</div><div className="big">{activeOrders}</div><div className="sub">en proceso</div></div>
                  <div className="scard"><div className="label">Próxima cita</div><div className="big serif" style={{ fontSize: "1.5rem" }}>{nextAppt ? new Date(nextAppt.date + "T00:00").toLocaleDateString("es-CO", { day: "numeric", month: "short" }) : "—"}</div><div className="sub">{nextAppt ? nextAppt.type : "sin agendar"}</div></div>
                </div>
                <div className="panel">
                  <h3>Completa tu perfil de medidas</h3>
                  <p className="ph-sub">Con tus medidas guardadas, cada encargo empieza más rápido y con un calce más preciso.</p>
                  <div className="row-actions">
                    <button className="btn btn-sm" onClick={() => setView("medidas")}>Subir / editar mis medidas</button>
                    <button className="btn btn-ghost btn-sm" onClick={() => setView("citas")}>Agendar una cita</button>
                  </div>
                </div>
              </section>
            )}

            {/* MEDIDAS */}
            {view === "medidas" && (
              <section>
                <div className="view-head"><h1>Mis medidas</h1><p>Tus tallas comerciales de referencia y tus medidas exactas en centímetros. ¿No sabes cómo medirte? <Link href="/#medidas">¿Cómo medirme?</Link></p></div>
                <form onSubmit={saveMeasures}>
                  {/* Tallas de referencia */}
                  <div className="mgroup">
                    <h4>Tallas de referencia<span className="g-label">Para una mejor asesoría</span></h4>
                    <div className="mgrid">
                      <div className="mfield">
                        <label>Talla superior (camiseta / blusa)</label>
                        <select className="select" value={measures.tallaSuperior ?? ""} onChange={(e) => setMeasures((m) => ({ ...m, tallaSuperior: e.target.value }))}>
                          <option value="">Selecciona…</option>
                          {TALLAS_SUPERIOR.map((t) => <option key={t} value={t}>{t}</option>)}
                        </select>
                      </div>
                      <div className="mfield">
                        <label>Talla inferior (jean / pantalón)</label>
                        <select className="select" value={measures.tallaInferior ?? ""} onChange={(e) => setMeasures((m) => ({ ...m, tallaInferior: e.target.value }))}>
                          <option value="">Selecciona…</option>
                          {TALLAS_INFERIOR.map((t) => <option key={t} value={t}>{t}</option>)}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Medidas exactas */}
                  <div className="mgroup">
                    <h4>Medidas detalladas<span className="g-label">En centímetros</span></h4>
                    <div className="mgrid">
                      {MEASURES.map((it) => (
                        <div className="mfield" key={it.k}>
                          <label>{it.l}</label>
                          <div className="mwrap">
                            <input type="number" step="0.5" min="0" placeholder={`Ej. ${it.ej}`} value={measures[it.k] ?? ""} onChange={(e) => setMeasures((m) => ({ ...m, [it.k]: e.target.value }))} />
                            <span className="unit">cm</span>
                          </div>
                          <div className="mhint">{it.h}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Notas */}
                  <div className="mgroup">
                    <h4>Notas para nuestras modistas<span className="g-label">Opcional</span></h4>
                    <textarea className="notes-area" rows={4} placeholder="Especificaciones adicionales… (ej: prefiero el largo a la rodilla, tela fresca, alergia a ciertos materiales)" value={measures.notas ?? ""} onChange={(e) => setMeasures((m) => ({ ...m, notas: e.target.value }))} />
                  </div>

                  <div className="save-bar">
                    <div>
                      <div className="meta">{savedMeta}</div>
                      <div className="progress"><i style={{ width: pct + "%" }} /></div>
                    </div>
                    <button type="submit" className="btn btn-sm">Guardar mis medidas</button>
                  </div>
                </form>
              </section>
            )}

            {/* PEDIDOS */}
            {view === "pedidos" && (
              <section>
                <div className="view-head"><h1>Mis pedidos</h1><p>Sigue el estado de cada prenda, paso a paso.</p></div>
                {orders.length === 0 ? (
                  <div className="empty"><span className="serif">Aún no tienes pedidos</span>Cuando inicies un encargo a medida, aparecerá aquí con su seguimiento.</div>
                ) : (
                  orders.map((o) => {
                    const done = o.status >= ORDER_STATUSES.length - 1;
                    return (
                      <div className="order" key={o.id}>
                        <div className="order-top">
                          <div><h3>{o.name}</h3><div className="oid">Pedido {o.id.slice(0, 8).toUpperCase()} · {new Date(o.created_at).toLocaleDateString("es-CO", { dateStyle: "long" })}</div></div>
                          <span className={`badge${done ? " done" : ""}`}>{ORDER_STATUSES[o.status]}</span>
                        </div>
                        <div className="track">
                          {ORDER_STATUSES.map((s, i) => (
                            <div className={`tstep${i <= o.status ? " active" : ""}`} key={s}><span className="dot" /><div className="tlabel">{s}</div></div>
                          ))}
                        </div>
                      </div>
                    );
                  })
                )}
              </section>
            )}

            {/* CITAS */}
            {view === "citas" && (
              <section>
                <div className="view-head"><h1>Citas</h1><p>Agenda tu consulta o prueba, presencial o virtual.</p></div>
                {nextAppt && (
                  <div className="upcoming">
                    <div className="cal"><div className="d">{new Date(nextAppt.date + "T00:00").getDate()}</div><div className="m">{new Date(nextAppt.date + "T00:00").toLocaleDateString("es-CO", { month: "short" })}</div></div>
                    <div><strong style={{ fontFamily: "var(--serif)", fontSize: "1.2rem" }}>{nextAppt.type}</strong><div style={{ fontSize: ".82rem", color: "var(--muted)", marginTop: ".3rem" }}>{nextAppt.mode} · {nextAppt.time}</div></div>
                  </div>
                )}
                <div className="panel">
                  <h3>Agendar una cita</h3>
                  <p className="ph-sub">Te confirmaremos por WhatsApp.</p>
                  <form onSubmit={requestAppt}>
                    <div className="appt-grid">
                      <div className="mfield"><label>Tipo de cita</label><select className="select" name="type" defaultValue="Consulta inicial"><option>Consulta inicial</option><option>Toma de medidas</option><option>Prueba de prenda</option></select></div>
                      <div className="mfield"><label>Modalidad</label><select className="select" name="mode" defaultValue="Presencial — Atelier"><option>Presencial — Atelier</option><option>Virtual — Videollamada</option></select></div>
                      <div className="mfield"><label>Fecha</label><input type="date" name="date" required /></div>
                      <div className="mfield"><label>Hora</label><input type="time" name="time" required /></div>
                    </div>
                    <div className="row-actions"><button type="submit" className="btn btn-sm">Solicitar cita</button></div>
                  </form>
                </div>
              </section>
            )}

            {/* PERFIL */}
            {view === "perfil" && (
              <section>
                <div className="view-head"><h1>Mi perfil</h1><p>Tus datos de contacto y privacidad.</p></div>
                <div className="panel">
                  <h3>Datos personales</h3>
                  <p className="ph-sub">Mantén tu información al día para tus pedidos.</p>
                  <form onSubmit={saveProfile}>
                    <div className="appt-grid">
                      <div className="mfield"><label>Nombre completo</label><input type="text" value={profile.full_name ?? ""} onChange={(e) => setProfile((p) => ({ ...p, full_name: e.target.value }))} /></div>
                      <div className="mfield"><label>WhatsApp / Teléfono</label><input type="tel" value={profile.phone ?? ""} onChange={(e) => setProfile((p) => ({ ...p, phone: e.target.value }))} /></div>
                      <div className="mfield"><label>Correo (no editable)</label><input type="email" value={email} disabled style={{ color: "var(--muted)" }} /></div>
                      <div className="mfield"><label>Cliente desde</label><input type="text" value={profile.created_at ? new Date(profile.created_at).toLocaleDateString("es-CO", { dateStyle: "long" }) : ""} disabled style={{ color: "var(--muted)" }} /></div>
                    </div>
                    <div className="row-actions"><button type="submit" className="btn btn-sm">Guardar cambios</button></div>
                  </form>
                  <div className="danger">
                    <h4>Eliminar mis datos</h4>
                    <p>Borra permanentemente tus medidas, pedidos y citas. Es tu derecho conforme a la Ley 1581 de 2012 (Habeas Data).</p>
                    <button className="link-danger" onClick={deleteData}>Eliminar mis datos</button>
                  </div>
                </div>
              </section>
            )}
          </main>
        </div>

        <div className={`toast${toast ? " show" : ""}`}>{toast}</div>
      </div>
    </div>
  );
}
