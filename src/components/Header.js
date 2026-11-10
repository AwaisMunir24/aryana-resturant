"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { useCart } from "./CartContext";
export default function Header() {
  const path = usePathname();
  const { count, setOpen } = useCart();
  const links = [["/", "Home"], ["/menu", "Menu"], ["/contact", "Contact"]];
  return (
    <header className="hdr">
      <Link href="/"><Logo /></Link>
      <div className="hr">
        <nav>{links.map(([h, t]) => <Link key={h} href={h} className={path === h ? "on" : ""}>{t}</Link>)}</nav>
        <button className="cartbtn" onClick={() => setOpen(true)}>Cart ({count})</button>
      </div>
    </header>
  );
}
