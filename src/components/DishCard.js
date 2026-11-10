"use client";
import Photo from "./Photo";
// import { useCart } from "./CartContext";
import {useCart} from './CartContext'
import { money } from "../lib/menu";
export default function DishCard({ dish }) {
  const { change } = useCart();
  return (
    <article className="card">
      <div className="tile"><Photo src={dish.img} alt={dish.n} /></div>
      <div className="b">
        <h3>{dish.n}</h3><p>{dish.d}</p>
        <div className="row"><span className="price">{money(dish.p)}</span><button className="add" onClick={() => change(dish.id, 1)}>Add to cart</button></div>
      </div>
    </article>
  );
}
