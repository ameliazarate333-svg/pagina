"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function LoginForm() {
  const router = useRouter();
  const search = useSearchParams();
  const next = search.get("next") || "/cuenta";

  const [tab, setTab] = useState<"login" | "register">("login");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [ok, setOk] = useState("");

  // login fields
  const [liEmail, setLiEmail] = useState("");
  const [liPass, setLiPass] = useState("");
  // register fields
  const [rgName, setRgName] = useState("");
  const [rgEmail, setRgEmail] = useState("");
  const [rgPhone, setRgPhone] = useState("");
  const [rgPass, setRgPass] = useState("");
  const [rgConsent, setRgConsent] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setErr(""); setOk(""); setBusy(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({
        email: liEmail.trim().toLowerCase(),
        password: liPass,
      });
      if (error) { setErr("Correo o contraseña incorrectos."); return; }
      router.push(next);
      router.refresh();
    } catch {
      setErr("No se pudo conectar. Revisa la configuración de Supabase.");
    } finally {
      setBusy(false);
    }
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setErr(""); setOk("");
    if (rgPass.length < 6) { setErr("La contraseña debe tener al menos 6 caracteres."); return; }
    if (!rgConsent) { setErr("Debes autorizar el tratamiento de datos para continuar."); return; }
    setBusy(true);
    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signUp({
        email: rgEmail.trim().toLowerCase(),
        password: rgPass,
        options: { data: { full_name: rgName.trim(), phone: rgPhone.trim(), consent: true } },
      });
      if (error) { setErr(error.message); return; }
      if (data.session) {
        router.push(next);
        router.refresh();
      } else {
        setOk("¡Cuenta creada! Revisa tu correo para confirmarla y luego inicia sesión.");
        setTab("login");
      }
    } catch {
      setErr("No se pudo conectar. Revisa la configuración de Supabase.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="acct">
      <div className="auth">
        <div
          className="auth-visual"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1100&auto=format&fit=crop')" }}
        >
          <div className="vtext">
            <span className="label">El círculo AZ</span>
            <h2>Tus medidas, guardadas. Tu próxima pieza, más cerca.</h2>
          </div>
        </div>

        <div className="auth-panel">
          <Link className="back" href="/">← Volver al sitio</Link>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="auth-logo" src="/logo-az.svg" alt="AZ · Amelia Zárate" />

          <div className="auth-tabs">
            <button className={`auth-tab${tab === "login" ? " on" : ""}`} onClick={() => { setTab("login"); setErr(""); }}>Iniciar sesión</button>
            <button className={`auth-tab${tab === "register" ? " on" : ""}`} onClick={() => { setTab("register"); setErr(""); }}>Crear cuenta</button>
          </div>

          {err && <div className="err">{err}</div>}
          {ok && <div className="ok">{ok}</div>}

          {tab === "login" ? (
            <form onSubmit={handleLogin} autoComplete="off">
              <div className="field"><label>Correo electrónico</label><input type="email" value={liEmail} onChange={(e) => setLiEmail(e.target.value)} placeholder="tu@correo.com" required /></div>
              <div className="field"><label>Contraseña</label><input type="password" value={liPass} onChange={(e) => setLiPass(e.target.value)} placeholder="••••••••" required /></div>
              <button type="submit" className="btn" disabled={busy}>{busy ? "Entrando…" : "Entrar a mi cuenta"}</button>
              <p className="auth-foot">¿No tienes cuenta? <a onClick={() => setTab("register")} style={{ cursor: "pointer" }}>Créala aquí</a></p>
            </form>
          ) : (
            <form onSubmit={handleRegister} autoComplete="off">
              <div className="field"><label>Nombre completo</label><input type="text" value={rgName} onChange={(e) => setRgName(e.target.value)} placeholder="Amelia Zárate" required /></div>
              <div className="field"><label>Correo electrónico</label><input type="email" value={rgEmail} onChange={(e) => setRgEmail(e.target.value)} placeholder="tu@correo.com" required /></div>
              <div className="field"><label>WhatsApp / Teléfono</label><input type="tel" value={rgPhone} onChange={(e) => setRgPhone(e.target.value)} placeholder="+57 300 000 0000" /></div>
              <div className="field"><label>Contraseña</label><input type="password" value={rgPass} onChange={(e) => setRgPass(e.target.value)} placeholder="Mínimo 6 caracteres" required /></div>
              <label className="consent">
                <input type="checkbox" checked={rgConsent} onChange={(e) => setRgConsent(e.target.checked)} />
                <span>Autorizo el tratamiento de mis datos personales y medidas conforme a la <a href="/privacidad" target="_blank" rel="noopener">Política de Privacidad</a> (Ley 1581 de 2012).</span>
              </label>
              <button type="submit" className="btn" disabled={busy}>{busy ? "Creando…" : "Crear mi cuenta"}</button>
              <p className="auth-foot">¿Ya tienes cuenta? <a onClick={() => setTab("login")} style={{ cursor: "pointer" }}>Inicia sesión</a></p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
