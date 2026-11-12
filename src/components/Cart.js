"use client";
import { useState } from "react";
import { useCart } from "./CartContext";
import { money } from "../lib/menu";

export default function Cart() {
  const { lines, change, total, clear, open, setOpen, checkout, setCheckout } = useCart();
  const [f, setF] = useState({ name: "", phone: "", address: "", notes: "" });
  const [err, setErr] = useState(""), [busy, setBusy] = useState(false), [done, setDone] = useState(null);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const close = () => { setOpen(false); setCheckout(false); setDone(null); };

  async function place() {
    if (!f.name.trim() || !f.phone.trim()) return setErr("Enter your name and phone number.");
    setBusy(true); setErr("");
    const w = window.open("", "_blank"); // opened on click so the browser allows WhatsApp to open
    try {
      const r = await fetch("/api/orders", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...f, items: lines.map((l) => ({ id: l.id, q: l.q })) }) });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error || "Could not place the order.");
      setDone(d); clear();
      if (w) w.location.href = d.whatsappUrl;
    } catch (e) { if (w) w.close(); setErr(e.message); }
    setBusy(false);
  }

  if (!open) return null;
  return (
    <div className={checkout || done ? "modal" : "drawer"} onClick={(e) => e.target === e.currentTarget && close()}>
      <div className="panel">
        {done ? (
          <div className="ok">
            <div className="big">✅</div><h2>Order received</h2><p>Your order number</p><div className="oid">{done.id}</div>
            <p className="mut">Your order details were sent to our WhatsApp. We'll reply there with your payment link.</p>
            <a className="btn red w" target="_blank" rel="noopener" href={done.whatsappUrl}>Open WhatsApp</a>
            <button className="add grey" onClick={close}>Close</button>
          </div>
        ) : checkout ? (
          <>
            <h2>Checkout</h2><p className="mut">Total: <b>{money(total)}</b></p>
            <label>Name<input value={f.name} onChange={set("name")} /></label>
            <label>Phone<input type="tel" value={f.phone} onChange={set("phone")} /></label>
            <label>Delivery address (leave empty for collection)<textarea rows="2" value={f.address} onChange={set("address")} /></label>
            <label>Notes<input value={f.notes} onChange={set("notes")} /></label>
            {err && <p className="err">{err}</p>}
            <button className="btn red w" disabled={busy} onClick={place}>{busy ? "Placing order…" : "Place order"}</button>
            <button className="add grey" onClick={() => setCheckout(false)}>Back to cart</button>
          </>
        ) : (
          <>
            <div className="row"><h2>Your cart</h2><button className="add" onClick={close}>Close</button></div>
            {lines.length === 0 ? <p>Your cart is empty. Add a dish from the menu.</p> : <>
              {lines.map((l) => (
                <div className="line row" key={l.id}>
                  <div><b>{l.n}</b><br /><span className="price">{money(l.p * l.q)}</span></div>
                  <div className="qty"><button onClick={() => change(l.id, -1)}>−</button> {l.q} <button onClick={() => change(l.id, 1)}>+</button></div>
                </div>))}
              <div className="row tot"><b>Total</b><b className="price">{money(total)}</b></div>
              <button className="btn red w" onClick={() => setCheckout(true)}>Checkout</button></>}
          </>
        )}
      </div>
    </div>
  );
}