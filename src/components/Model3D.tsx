"use client";

import { createElement, useEffect, useState } from "react";

/** Visor 3D interactivo (gira / zoom) basado en <model-viewer> de Google. */
export default function Model3D({ src, alt = "Maniquí 3D — guía de medidas AZ" }: { src: string; alt?: string }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (customElements.get("model-viewer")) { setReady(true); return; }
    const s = document.createElement("script");
    s.type = "module";
    s.src = "https://ajax.googleapis.com/ajax/libs/model-viewer/3.5.0/model-viewer.min.js";
    s.onload = () => setReady(true);
    document.head.appendChild(s);
  }, []);

  if (!ready) {
    return <div className="model3d-loading">Cargando modelo 3D…</div>;
  }

  return createElement("model-viewer", {
    src,
    alt,
    "camera-controls": "",
    "auto-rotate": "",
    "auto-rotate-delay": "0",
    "rotation-per-second": "18deg",
    "shadow-intensity": "0.9",
    "environment-image": "neutral",
    exposure: "1.15",
    "camera-orbit": "0deg 85deg 105%",
    "min-camera-orbit": "auto auto 60%",
    "touch-action": "pan-y",
    "interaction-prompt": "none",
    style: { width: "100%", height: "100%", backgroundColor: "transparent" },
  });
}
