"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const LINKS = [
  ["#coleccion", "Colección"],
  ["#medida", "A Medida"],
  ["#medidas", "Guía de Medidas"],
  ["#atelier", "El Atelier"],
  ["#contacto", "Contacto"],
];

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="announce">
        Citas presenciales y virtuales · Confección a medida en todo el país
      </div>
      <header className={`siteHeader${scrolled ? " scrolled" : ""}`}>
        <div className="wrap nav">
          <Link href="/" className="brand" aria-label="AZ · Amelia Zárate">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="brand-logo" src="/logo-az.svg" alt="AZ · Amelia Zárate" />
          </Link>
          <nav>
            <ul
              className="nav-links"
              style={
                open
                  ? {
                      display: "flex",
                      position: "fixed",
                      inset: "84px 0 auto",
                      background: "var(--ivory)",
                      flexDirection: "column",
                      padding: "2rem",
                      gap: "1.5rem",
                      borderBottom: "1px solid var(--line)",
                    }
                  : undefined
              }
            >
              {LINKS.map(([href, label]) => (
                <li key={href}>
                  <a href={href} onClick={() => setOpen(false)}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <Link href="/cuenta" className="nav-cta">
            Mi cuenta
          </Link>
          <button className="burger" aria-label="Menú" onClick={() => setOpen((o) => !o)}>
            <span /><span /><span />
          </button>
        </div>
      </header>
    </>
  );
}
