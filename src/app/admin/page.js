"use client";
import { useState } from "react";
import { money } from "../../lib/menu";

const time = (t) => new Date(t).toLocaleTimeString("en-GB", { timeZone: "Europe/London", hour: "2-digit", minute: "2-digit" });

export default function Admin() {
  const [pw, setPw] = useState(""), [date, setDate] = useState(""), [d, setD] = useState(null), [err, setErr] = useState("");
  const H = { "x-admin-password": pw };

  async function load(day = date) {
    setErr("");
    const r = await fetch("/api/admin/orders" + (day ? `?date=${day}` : ""), { headers: H });
    const j = await r.json();
    if (!r.ok) { setD(null); return setErr(j.error); }
    setD(j); setDate(j.date);
  }
  async function mark(id, delivered) {
    await fetch("/api/admin/orders", { method: "POST", headers: { ...H, "Content-Type": "application/json" }, body: JSON.stringify({ id, delivered }) });
    load();
  }

  if (!d) return (
    <section className="sec" style={{ maxWidth: 420 }}>
      <h2>Orders dashboard</h2>
      <label>Admin password<input type="password" value={pw} onChange={(e) => setPw(e.target.value)} onKeyDown={(e) => e.key === "Enter" && load("")} /></label>
      {err && <p className="err">{err}</p>}
      <button className="btn red w" onClick={() => load("")}>Open dashboard</button>
    </section>
  );

  const stats = [["Orders", d.count], ["Delivered", d.delivered], ["Pending", d.count - d.delivered], ["Sales", money(d.revenue)]];
  return (
    <section className="sec">
      <div className="row" style={{ flexWrap: "wrap" }}>
        <h2>{d.date === d.today ? "Today's orders" : "Orders on " + d.date}</h2>
        <div><input type="date" value={date} onChange={(e) => { setDate(e.target.value); load(e.target.value); }} style={{ width: "auto", display: "inline-block" }} /> <button className="add" onClick={() => load()}>Refresh</button></div>
      </div>
      <div className="feat">{stats.map(([k, v]) => <div key={k}><p className="mut" style={{ margin: 0 }}>{k}</p><h2>{v}</h2></div>)}</div>

      <h3 style={{ marginTop: 36 }}>Food ordered</h3>
      {d.food.length === 0 ? <p className="mut">No orders on this day.</p> : (
        <div style={{ overflowX: "auto" }}><table style={{ width: "100%", borderCollapse: "collapse", marginTop: 12 }}>
          <thead><tr style={{ textAlign: "left" }}><th>Dish</th><th>Ordered</th><th>Delivered</th></tr></thead>
          <tbody>{d.food.map((f) => <tr key={f.name} style={{ borderTop: "1px solid var(--line)" }}><td style={{ padding: "8px 0" }}>{f.name}</td><td>{f.qty}</td><td>{f.delivered}</td></tr>)}</tbody>
        </table></div>
      )}

      <h3 style={{ marginTop: 36 }}>All orders</h3>
      <div className="grid">{d.orders.map((o) => (
        <div className="card" key={o.id}><div className="b">
          <div className="row"><b>{o.id}</b><span className="mut">{time(o.time)}</span></div>
          <p style={{ margin: "8px 0" }}>{o.items.map((i) => `${i.qty} x ${i.name}`).join(", ")}</p>
          <p className="mut" style={{ margin: 0 }}>{o.name} · {o.phone}<br />{o.type}{o.address ? ": " + o.address : ""}{o.notes ? <><br />Note: {o.notes}</> : null}</p>
          <div className="row" style={{ marginTop: 12 }}>
            <span className="price">{money(o.total)}</span>
            {o.delivered ? <button className="add grey" style={{ margin: 0 }} onClick={() => mark(o.id, false)}>Delivered ✓ Undo</button> : <button className="add" onClick={() => mark(o.id, true)}>Mark delivered</button>}
          </div>
        </div></div>
      ))}</div>
    </section>
  );
}

