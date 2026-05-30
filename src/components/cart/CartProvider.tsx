"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

type Item = { slug: string; qty: number };
type Ctx = {
  items: Item[];
  add: (slug: string) => void;
  remove: (slug: string) => void;
  setQty: (slug: string, qty: number) => void;
  clear: () => void;
  count: number;
};

const CartCtx = createContext<Ctx | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Item[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("az_cart");
      if (raw) setItems(JSON.parse(raw));
    } catch {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) localStorage.setItem("az_cart", JSON.stringify(items));
  }, [items, loaded]);

  const add = useCallback((slug: string) => {
    setItems((p) => {
      const e = p.find((i) => i.slug === slug);
      return e ? p.map((i) => (i.slug === slug ? { ...i, qty: i.qty + 1 } : i)) : [...p, { slug, qty: 1 }];
    });
  }, []);
  const remove = useCallback((slug: string) => setItems((p) => p.filter((i) => i.slug !== slug)), []);
  const setQty = useCallback((slug: string, qty: number) => {
    setItems((p) => (qty <= 0 ? p.filter((i) => i.slug !== slug) : p.map((i) => (i.slug === slug ? { ...i, qty } : i))));
  }, []);
  const clear = useCallback(() => setItems([]), []);
  const count = items.reduce((s, i) => s + i.qty, 0);

  return <CartCtx.Provider value={{ items, add, remove, setQty, clear, count }}>{children}</CartCtx.Provider>;
}

export const useCart = () => {
  const c = useContext(CartCtx);
  if (!c) throw new Error("useCart debe usarse dentro de CartProvider");
  return c;
};
