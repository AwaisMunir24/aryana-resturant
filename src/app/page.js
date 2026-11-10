import Slider from "../components/Slider";
import DishCard from "../components/DishCard";
import { MENU } from "../lib/menu";
export default function Home() {
  return (
    <>
      <Slider />
      <section className="sec"><h2>Swipe through our dishes</h2><div className="rv">{MENU.map((d) => <DishCard key={d.id} dish={d} />)}</div></section>
      <section className="sec"><div className="feat">
        <div><h3>Charcoal grilled</h3><p>Every kebab is grilled fresh over live charcoal.</p></div>
        <div><h3>Fresh ingredients</h3><p>Fresh herbs, spices and halal meat, prepared daily.</p></div>
        <div><h3>Easy ordering</h3><p>No account needed. Add to cart and send your order on WhatsApp.</p></div>
      </div></section>
    </>
  );
}
