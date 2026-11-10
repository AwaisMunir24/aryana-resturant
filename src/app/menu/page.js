"use client";
import { useState } from "react";
import DishCard from "../../components/DishCard";
import { MENU, CATS } from "../../lib/menu";
export default function MenuPage() {
  const [cat, setCat] = useState("All");
  return (
    <section className="sec">
      <h2>Our menu</h2>
      <div className="tabs">{["All", ...CATS].map((c) => <button key={c} className={c === cat ? "on" : ""} onClick={() => setCat(c)}>{c}</button>)}</div>
      <div className="grid">{MENU.filter((m) => cat === "All" || m.c === cat).map((d) => <DishCard key={d.id} dish={d} />)}</div>
    </section>
  );
}
