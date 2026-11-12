import { NextResponse } from "next/server";
import { MENU, money } from "../../../lib/menu";

// WhatsApp number that receives orders: international format, no +, no spaces
const WHATSAPP = "447414294294";

function newId() {
  const d = new Date(), p = (n) => String(n).padStart(2, "0");
  const r = Array.from({ length: 3 }, () => "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"[Math.floor(Math.random() * 32)]).join("");
  return `ARY-${String(d.getFullYear()).slice(2)}${p(d.getMonth() + 1)}${p(d.getDate())}-${p(d.getHours())}${p(d.getMinutes())}-${r}`;
}

export async function POST(req) {
  const b = await req.json().catch(() => ({}));
  const name = String(b.name || "").trim().slice(0, 80), phone = String(b.phone || "").trim().slice(0, 30);
  // prices are re-calculated on the server; never trust the browser
  const items = (Array.isArray(b.items) ? b.items : []).map((i) => {
    const m = MENU.find((x) => x.id === i.id), q = Math.min(Math.max(parseInt(i.q) || 0, 0), 50);
    return m && q ? { name: m.n, qty: q, line: +(m.p * q).toFixed(2) } : null;
  }).filter(Boolean);
  if (!name || !phone || !items.length) return NextResponse.json({ error: "Name, phone and at least one item are required." }, { status: 400 });

  const address = String(b.address || "").trim().slice(0, 200);
  const notes = String(b.notes || "").trim().slice(0, 200);
  const id = newId();
  const total = +items.reduce((s, i) => s + i.line, 0).toFixed(2);
  const type = address ? "Delivery" : "Collection";

  const msg = `*New Order ${id}*\n\n` + items.map((i) => `${i.qty} x ${i.name} - ${money(i.line)}`).join("\n") +
    `\n\n*Total: ${money(total)}*\n${type}${address ? ": " + address : ""}\n\nName: ${name}\nPhone: ${phone}${notes ? "\nNotes: " + notes : ""}\n\nPlease send me the payment link.`;
  const whatsappUrl = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;
  return NextResponse.json({ id, total, whatsappUrl });
}