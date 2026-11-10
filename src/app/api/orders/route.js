import { NextResponse } from "next/server";
import { saveOrder } from "../../../lib/store";
import { MENU, money } from "../../../lib/menu";

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
    return m && q ? { name: m.n, qty: q, price: m.p, line: +(m.p * q).toFixed(2) } : null;
  }).filter(Boolean);
  if (!name || !phone || !items.length) return NextResponse.json({ error: "Name, phone and at least one item are required." }, { status: 400 });

  const address = String(b.address || "").trim().slice(0, 200);
  const order = {
    id: newId(), time: new Date().toISOString(), name, phone,
    type: address ? "Delivery" : "Collection", address, notes: String(b.notes || "").trim().slice(0, 200),
    payment: b.payment === "Payment via QR" ? "Payment via QR" : "Payment link",
    items, total: +items.reduce((s, i) => s + i.line, 0).toFixed(2),
  };

  // 1) save the order (order id + full details)
  let saved = false;
  if (process.env.ORDER_WEBHOOK_URL) {
    try {
      const r = await fetch(process.env.ORDER_WEBHOOK_URL, { method: "POST", headers: { "Content-Type": "text/plain" }, body: JSON.stringify(order) });
      saved = r.ok;
    } catch (e) { console.error("webhook failed", e); }
  }
  try { await saveOrder(order); saved = true; } catch (e) { console.error("saveOrder failed", e); }

  // 2) WhatsApp message for the owner
  const msg = `*New Order ${order.id}*\n\n` + items.map((i) => `${i.qty} x ${i.name} - ${money(i.line)}`).join("\n") +
    `\n\n*Total: ${money(order.total)}*\n${order.type}${address ? ": " + address : ""}\nPayment: ${order.payment}\n\nName: ${name}\nPhone: ${phone}${order.notes ? "\nNotes: " + order.notes : ""}`;
  const whatsappUrl = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  return NextResponse.json({ id: order.id, total: order.total, whatsappUrl, saved });
}