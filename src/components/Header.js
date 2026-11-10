"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { useCart } from "./CartContext";

export default function Header() {
  const path = usePathname();
  const { count, setOpen } = useCart();
  const [menu, setMenu] = useState(false);
  const links = [["/", "Home"], ["/menu", "Menu"], ["/contact", "Contact"]];

  // close the mobile menu after navigating
  useEffect(() => { setMenu(false); }, [path]);

  return (
    <header className="hdr">
      <Link href="/"><Logo /></Link>
      <div className="hr">
        <nav className={menu ? "open" : ""}>
          {links.map(([h, t]) => (
            <Link key={h} href={h} className={path === h ? "on" : ""}>{t}</Link>
          ))}
        </nav>
        <button className="cartbtn" onClick={() => setOpen(true)}>Cart ({count})</button>
        <button
          className={`burger${menu ? " x" : ""}`}
          aria-label="Toggle menu"
          aria-expanded={menu}
          onClick={() => setMenu((m) => !m)}
        >
          <span /><span /><span />
        </button>
      </div>
    </header>
  );
}