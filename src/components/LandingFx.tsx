"use client";

import { useEffect } from "react";

const QUOTES: [string, string][] = [
  [
    "“Nunca un vestido me había quedado así. Sentí que estaba hecho para mí, porque lo estaba.”",
    "Valentina R. · Vestido de gala a medida",
  ],
  [
    "“El proceso es tan cuidado como la prenda. Subí mis medidas desde casa y el calce fue perfecto.”",
    "Camila S. · Vestido de novia civil",
  ],
  [
    "“AZ entiende la elegancia que no necesita demostrarse. Es mi atelier de cabecera.”",
    "Daniela M. · Colección a medida",
  ],
];

export default function LandingFx() {
  useEffect(() => {
    // scroll reveal
    const els = Array.from(document.querySelectorAll("[data-reveal]"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e, i) => {
          if (e.isIntersecting) {
            setTimeout(() => (e.target as HTMLElement).classList.add("in"), i * 70);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.14 }
    );
    els.forEach((el) => io.observe(el));

    // testimonials
    const q = document.getElementById("quote");
    const w = document.getElementById("who");
    const dots = Array.from(document.querySelectorAll<HTMLElement>("#dots i"));
    let qi = 0;
    const show = (i: number) => {
      if (!q || !w) return;
      q.style.opacity = "0";
      w.style.opacity = "0";
      setTimeout(() => {
        q.textContent = QUOTES[i][0];
        w.textContent = QUOTES[i][1];
        q.style.opacity = "1";
        w.style.opacity = "1";
      }, 300);
      dots.forEach((d, j) => d.classList.toggle("on", j === i));
    };
    dots.forEach((d, i) => (d.onclick = () => { qi = i; show(i); }));
    const timer = setInterval(() => { qi = (qi + 1) % QUOTES.length; show(qi); }, 6000);

    return () => { io.disconnect(); clearInterval(timer); };
  }, []);

  return null;
}
