"use client";
import { createContext, useContext, useState, useMemo } from "react";
import { MENU } from "../lib/menu";

const Ctx = createContext(null);
export const useCart = () => useContext(Ctx);

export function CartProvider({ children }) {
  const [items, setItems] = useState({});
  const [open, setOpen] = useState(false);
  const [checkout, setCheckout] = useState(false);
  const api = useMemo(() => {
    const change = (id, d) => setItems((s) => { const q = (s[id] || 0) + d; const n = { ...s }; if (q < 1) delete n[id]; else n[id] = q; return n; });
    const lines = Object.entries(items).map(([id, q]) => ({ ...MENU.find((m) => m.id === id), q }));
    return { items, lines, change, clear: () => setItems({}), count: lines.reduce((a, l) => a + l.q, 0), total: lines.reduce((a, l) => a + l.q * l.p, 0), open, setOpen, checkout, setCheckout };
  }, [items, open, checkout]);
  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}