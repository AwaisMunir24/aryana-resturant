import { NextResponse } from "next/server";
import { readOrders, readDelivered, setDelivered, dayOf } from "../../../lib/store";
const allowed = (req) => !!process.env.ADMIN_PASSWORD && req.headers.get("x-admin-password") === process.env.ADMIN_PASSWORD;
const denied = () => NextResponse.json({ error: process.env.ADMIN_PASSWORD ? "Wrong password." : "Set ADMIN_PASSWORD in .env.local and restart the server." }, { status: 401 });

export async function GET(req) {
  if (!allowed(req)) return denied();
  const today = dayOf(Date.now());
  const date = new URL(req.url).searchParams.get("date") || today;
  const dl = await readDelivered();
  const orders = (await readOrders()).filter((o) => dayOf(o.time) === date).map((o) => ({ ...o, delivered: dl[o.id] || null })).reverse();
  const food = {};
  orders.forEach((o) => o.items.forEach((i) => {
    const f = food[i.name] || (food[i.name] = { qty: 0, delivered: 0 });
    f.qty += i.qty; if (o.delivered) f.delivered += i.qty;
  }));
  return NextResponse.json({
    today, date, count: orders.length, delivered: orders.filter((o) => o.delivered).length,
    revenue: +orders.reduce((s, o) => s + o.total, 0).toFixed(2),
    food: Object.entries(food).map(([name, v]) => ({ name, ...v })).sort((a, b) => b.qty - a.qty),
    orders,
  });
}

export async function POST(req) {
  if (!allowed(req)) return denied();
  const { id, delivered } = await req.json().catch(() => ({}));
  if (!id) return NextResponse.json({ error: "Missing order id." }, { status: 400 });
  await setDelivered(id, !!delivered);
  return NextResponse.json({ ok: true });
}