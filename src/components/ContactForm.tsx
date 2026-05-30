"use client";

import { useState } from "react";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");

  function send(e: React.FormEvent) {
    e.preventDefault();
    const text = encodeURIComponent(`Hola AZ, soy ${name || "una clienta"}. ${msg}`);
    window.open(`https://wa.me/573122222222?text=${text}`, "_blank", "noopener");
  }

  return (
    <form className="contact-card" onSubmit={send}>
      <div className="field"><label>Tu nombre</label><input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Amelia Zárate" required /></div>
      <div className="field"><label>Tu mensaje</label><textarea rows={4} value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="Cuéntanos qué buscas: ocasión, fecha, idea…" required /></div>
      <button type="submit" className="btn btn-solid" style={{ width: "100%" }}>Escribir por WhatsApp</button>
      <p style={{ fontSize: ".72rem", color: "var(--muted)", marginTop: "1rem", lineHeight: 1.6 }}>Se abrirá WhatsApp con tu mensaje listo para enviar.</p>
    </form>
  );
}
