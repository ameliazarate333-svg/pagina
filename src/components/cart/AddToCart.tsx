"use client";

import { useState } from "react";
import { useCart } from "./CartProvider";

export default function AddToCart({ slug }: { slug: string }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  return (
    <button
      className="btn btn-solid"
      onClick={() => { add(slug); setAdded(true); setTimeout(() => setAdded(false), 1600); }}
    >
      {added ? "Añadido al carrito ✓" : "Añadir al carrito"}
    </button>
  );
}
