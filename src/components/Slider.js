"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
// Set img to "/images/hero-1.jpg" etc. once you add the photos to public/images
const SLIDES = [
  { k: "Welcome to Aryana", t: ["Authentic ", "Afghan", " flavours"], s: "Slow-cooked rice, tender lamb and fresh-baked bread, made the traditional way.", img: null },
  { k: "From the charcoal", t: ["Grilled fresh, ", "every", " order"], s: "Marinated, skewered and cooked over live charcoal for that smoky taste.", img: null },
  { k: "Easy online ordering", t: ["Order in ", "minutes", ""], s: "Add your favourites to the cart and send your order on WhatsApp.", img: null },
];
export default function Slider() {
  const [i, setI] = useState(0);
  const x0 = useRef(0);
  const n = SLIDES.length;
  useEffect(() => { const t = setTimeout(() => setI((v) => (v + 1) % n), 6000); return () => clearTimeout(t); }, [i, n]);
  const go = (d) => setI((v) => (v + d + n) % n);
  return (
    <section className="hs" onTouchStart={(e) => (x0.current = e.touches[0].clientX)} onTouchEnd={(e) => { const d = e.changedTouches[0].clientX - x0.current; if (Math.abs(d) > 50) go(d < 0 ? 1 : -1); }}>
      {SLIDES.map((x, k) => (
        <div key={k} className={"sl" + (k === i ? " on" : "")} aria-hidden={k !== i}>
          <div className="t">
            <div className="tag">{x.k}</div>
            <h1>{x.t[0]}<em>{x.t[1]}</em>{x.t[2]}</h1>
            <p>{x.s}</p>
            <p><Link className="btn" href="/menu">Order now</Link> <Link className="btn ghost" href="/contact">Visit us</Link></p>
          </div>
          <div className="arch" style={x.img ? { backgroundImage: `url(${x.img})` } : undefined}>{x.img ? "" : "Your photo here"}</div>
        </div>
      ))}
      <button className="sa p" onClick={() => go(-1)} aria-label="Previous slide">‹</button>
      <button className="sa n" onClick={() => go(1)} aria-label="Next slide">›</button>
      <div className="cnt2">{i + 1} / {n}</div>
      <div className="bar" key={i} />
      <div className="dots">{SLIDES.map((_, k) => <i key={k} className={k === i ? "on" : ""} onClick={() => setI(k)} />)}</div>
    </section>
  );
}
