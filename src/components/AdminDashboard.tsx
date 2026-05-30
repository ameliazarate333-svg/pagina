"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { MEASURE_GROUPS, ALL_MEASURE_KEYS, ORDER_STATUSES } from "@/lib/measures";

type Tab = "clientas" | "pedidos" | "citas";
type Profile = { id: string; full_name: string | null; email: string | null; phone: string | null; created_at: string; is_admin: boolean };
type Meas = { user_id: string; data: Record<string, number>; updated_at: string };
type Order = { id: string; user_id: string; name: string; status: number; created_at: string };
type Appt = { id: string; user_id: string; type: string; mode: string; date: string; time: string };

const LABELS: Record<string, string> = Object.fromEntries(
  MEASURE_GROUPS.flatMap((g) => g.items.map((i) => [i.k, i.l]))
);

export default function AdminDashboard({ adminName }: { adminName: string }) {
  const router = useRouter();
  const clientRef = useRef<ReturnType<typeof createClient> | null>(null);
  const getClient = () => (clientRef.current ??= createClient());

  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<Tab>("clientas");
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [meas, setMeas] = useState<Record<string, Record<string, number>>>({});
  const [orders, setOrders] = useState<Order[]>([]);
  const [appts, setAppts] = useState<Appt[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [toast, setToast] = useState("");
  const [newOrder, setNewOrder] = useState({ user_id: "", name: "" });
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = (m: string) => {
    setToast(m);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(""), 2600);
  };

  useEffect(() => {
    (async () => {
      const supabase = getClient();
      const [{ data: profs }, { data: ms }, { data: ords }, { data: aps }] = await Promise.all([
        supabase.from("profiles").select("id, full_name, email, phone, created_at, is_admin").order("created_at", { ascending: false }),
        supabase.from("measurements").select("user_id, data, updated_at"),
        supabase.from("orders").select("id, user_id, name, status, created_at").order("created_at", { ascending: false }),
        supabase.from("appointments").select("id, user_id, type, mode, date, time, created_at").order("date", { ascending: true }),
      ]);
      setProfiles((profs as Profile[]) || []);
      const map: Record<string, Record<string, number>> = {};
      (ms as Meas[] | null)?.forEach((m) => { map[m.user_id] = (m.data as Record<string, number>) || {}; });
      setMeas(map);
      setOrders((ords as Order[]) || []);
      setAppts((aps as Appt[]) || []);
      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const clientas = profiles.filter((p) => !p.is_admin);
  const nameOf = (id: string) => profiles.find((p) => p.id === id)?.full_name || "Clienta";
  const today = new Date().toISOString().slice(0, 10);
  const activeOrders = orders.filter((o) => o.status < ORDER_STATUSES.length - 1).length;
  const futureAppts = appts.filter((a) => a.date >= today).length;

  async function changeStatus(id: string, status: number) {
    setOrders((os) => os.map((o) => (o.id === id ? { ...o, status } : o)));
    const { error } = await getClient().from("orders").update({ status }).eq("id", id);
    showToast(error ? "Error al actualizar" : "Estado actualizado ✓");
  }

  async function createOrder(e: React.FormEvent) {
    e.preventDefault();
    if (!newOrder.user_id || !newOrder.name.trim()) { showToast("Elige clienta y nombre"); return; }
    const { data, error } = await getClient()
      .from("orders")
      .insert({ user_id: newOrder.user_id, name: newOrder.name.trim(), status: 0 })
      .select()
      .single();
    if (error) { showToast("Error al crear pedido"); return; }
    setOrders((os) => [data as Order, ...os]);
    setNewOrder({ user_id: "", name: "" });
    showToast("Pedido creado ✓");
  }

  async function logout() {
    await getClient().auth.signOut();
    router.push("/");
    router.refresh();
  }

  if (loading) return <div className="acct"><div className="loader">Cargando administración…</div></div>;

  const NAV: [Tab, string, number][] = [
    ["clientas", "Clientas", clientas.length],
    ["pedidos", "Pedidos", orders.length],
    ["citas", "Citas", futureAppts],
  ];

  return (
    <div className="acct">
      <div className="app">
        <header className="dash-top">
          <Link href="/" aria-label="AZ">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="dash-logo" src="/logo-az-mark.svg" alt="AZ" />
          </Link>
          <div className="dash-user">
            <span className="uname" style={{ fontSize: ".82rem", letterSpacing: ".2em", textTransform: "uppercase", color: "var(--muted)", fontFamily: "var(--sans)" }}>Administración</span>
            <button className="out" onClick={logout}>Cerrar sesión</button>
          </div>
        </header>

        <div className="dash-body">
          <aside className="dash-nav">
            {NAV.map(([t, label, n]) => (
              <button key={t} className={`navbtn${tab === t ? " on" : ""}`} onClick={() => { setTab(t); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
                <span className="ic" />{label} <span style={{ opacity: .5, marginLeft: "auto" }}>{n}</span>
              </button>
            ))}
          </aside>

          <main className="dash-main">
            {/* stats */}
            <div className="view-head"><h1>Hola, {adminName.split(" ")[0]}</h1><p>Panel del atelier — clientas, medidas, pedidos y citas.</p></div>
            <div className="cards">
              <div className="scard"><div className="label">Clientas</div><div className="big">{clientas.length}</div><div className="sub">registradas</div></div>
              <div className="scard"><div className="label">Pedidos activos</div><div className="big">{activeOrders}</div><div className="sub">en proceso</div></div>
              <div className="scard"><div className="label">Citas próximas</div><div className="big">{futureAppts}</div><div className="sub">por atender</div></div>
            </div>

            {/* CLIENTAS */}
            {tab === "clientas" && (
              <section>
                <h3 style={{ fontFamily: "var(--serif)", fontSize: "1.6rem", margin: "1rem 0 1.4rem" }}>Clientas</h3>
                {clientas.length === 0 && <p className="muted-empty">Aún no hay clientas registradas.</p>}
                {clientas.map((c) => {
                  const md = meas[c.id] || {};
                  const filled = ALL_MEASURE_KEYS.filter((k) => md[k] != null).length;
                  const pct = Math.round((filled / ALL_MEASURE_KEYS.length) * 100);
                  const cOrders = orders.filter((o) => o.user_id === c.id);
                  const open = expanded === c.id;
                  return (
                    <div className="adm-item" key={c.id}>
                      <div className="adm-head" onClick={() => setExpanded(open ? null : c.id)}>
                        <div>
                          <h3>{c.full_name || "Sin nombre"}</h3>
                          <div className="adm-sub">{c.email || "—"}{c.phone ? ` · ${c.phone}` : ""}<br />Cliente desde {new Date(c.created_at).toLocaleDateString("es-CO", { dateStyle: "long" })}</div>
                        </div>
                        <div style={{ display: "flex", gap: ".5rem", alignItems: "center" }}>
                          <span className="adm-pill">{pct}% medidas</span>
                          <span className="adm-pill">{cOrders.length} pedidos</span>
                          <span style={{ color: "var(--muted)" }}>{open ? "▲" : "▼"}</span>
                        </div>
                      </div>
                      {open && (
                        <div className="adm-detail">
                          <h5>Medidas (cm)</h5>
                          {filled === 0 ? <p className="muted-empty">La clienta aún no ha ingresado medidas.</p> : (
                            <div className="adm-meas">
                              {ALL_MEASURE_KEYS.filter((k) => md[k] != null).map((k) => (
                                <div className="mm" key={k}><span>{LABELS[k]}</span><b>{md[k]}</b></div>
                              ))}
                            </div>
                          )}
                          <h5>Pedidos</h5>
                          {cOrders.length === 0 ? <p className="muted-empty">Sin pedidos.</p> : cOrders.map((o) => (
                            <div key={o.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem", padding: ".5rem 0", borderBottom: "1px dotted var(--line)" }}>
                              <span style={{ fontFamily: "var(--serif)", fontSize: "1.05rem" }}>{o.name}</span>
                              <select className="statusSel" value={o.status} onChange={(e) => changeStatus(o.id, Number(e.target.value))}>
                                {ORDER_STATUSES.map((s, i) => <option key={s} value={i}>{s}</option>)}
                              </select>
                            </div>
                          ))}
                          <form className="inline-form" onSubmit={createOrder} onClick={(e) => e.stopPropagation()}>
                            <div className="mfield" style={{ flex: 2 }}>
                              <label style={{ fontSize: ".6rem", letterSpacing: ".14em", textTransform: "uppercase", color: "var(--muted)" }}>Nuevo pedido para esta clienta</label>
                              <input value={newOrder.user_id === c.id ? newOrder.name : ""} onChange={(e) => setNewOrder({ user_id: c.id, name: e.target.value })} placeholder="Ej: Vestido de gala a medida" style={{ width: "100%", background: "transparent", border: "none", borderBottom: "1px solid var(--line)", padding: ".5rem 0", fontFamily: "var(--serif)", fontSize: "1.05rem", color: "var(--ink)" }} />
                            </div>
                            <button type="submit" className="btn btn-sm">Crear pedido</button>
                          </form>
                        </div>
                      )}
                    </div>
                  );
                })}
              </section>
            )}

            {/* PEDIDOS */}
            {tab === "pedidos" && (
              <section>
                <h3 style={{ fontFamily: "var(--serif)", fontSize: "1.6rem", margin: "1rem 0 1.4rem" }}>Todos los pedidos</h3>
                <div className="panel">
                  <h3 style={{ fontSize: "1.2rem" }}>Crear pedido</h3>
                  <form className="inline-form" onSubmit={createOrder}>
                    <div className="mfield">
                      <label>Clienta</label>
                      <select className="select" value={newOrder.user_id} onChange={(e) => setNewOrder((n) => ({ ...n, user_id: e.target.value }))}>
                        <option value="">Elige…</option>
                        {clientas.map((c) => <option key={c.id} value={c.id}>{c.full_name || c.email}</option>)}
                      </select>
                    </div>
                    <div className="mfield" style={{ flex: 2 }}>
                      <label>Prenda / descripción</label>
                      <input className="select" value={newOrder.name} onChange={(e) => setNewOrder((n) => ({ ...n, name: e.target.value }))} placeholder="Vestido de novia civil" />
                    </div>
                    <button type="submit" className="btn btn-sm">Crear</button>
                  </form>
                </div>
                {orders.length === 0 ? <p className="muted-empty">Aún no hay pedidos.</p> : orders.map((o) => {
                  const done = o.status >= ORDER_STATUSES.length - 1;
                  return (
                    <div className="adm-item" key={o.id}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
                        <div>
                          <h3 style={{ fontFamily: "var(--serif)", fontSize: "1.25rem" }}>{o.name}</h3>
                          <div className="adm-sub">{nameOf(o.user_id)} · {new Date(o.created_at).toLocaleDateString("es-CO", { dateStyle: "long" })}</div>
                        </div>
                        <div style={{ display: "flex", gap: ".7rem", alignItems: "center" }}>
                          <span className={`badge${done ? " done" : ""}`}>{ORDER_STATUSES[o.status]}</span>
                          <select className="statusSel" value={o.status} onChange={(e) => changeStatus(o.id, Number(e.target.value))}>
                            {ORDER_STATUSES.map((s, i) => <option key={s} value={i}>{s}</option>)}
                          </select>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </section>
            )}

            {/* CITAS */}
            {tab === "citas" && (
              <section>
                <h3 style={{ fontFamily: "var(--serif)", fontSize: "1.6rem", margin: "1rem 0 1.4rem" }}>Citas solicitadas</h3>
                {appts.length === 0 ? <p className="muted-empty">No hay citas solicitadas.</p> : appts.map((a) => (
                  <div className="adm-item" key={a.id}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
                      <div>
                        <h3 style={{ fontFamily: "var(--serif)", fontSize: "1.2rem" }}>{a.type} — {nameOf(a.user_id)}</h3>
                        <div className="adm-sub">{a.mode}</div>
                      </div>
                      <span className="adm-pill">{new Date(a.date + "T00:00").toLocaleDateString("es-CO", { dateStyle: "long" })} · {a.time}</span>
                    </div>
                  </div>
                ))}
              </section>
            )}
          </main>
        </div>

        <div className={`toast${toast ? " show" : ""}`}>{toast}</div>
      </div>
    </div>
  );
}
